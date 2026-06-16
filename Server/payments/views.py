from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import CreateOrderSerializer, VerifyPaymentSerializer, BillingDetailSerializer
from appointment.models import Appointment
from hospital.models import Doctor
from appointment.serializer import AppointmentSerializer
from hospital.serializers import DoctorSerializer
from hospital.models import Test
from hospital.serializers import TestSerializer
from payments.services import client, verify_signature
from payments.models import BillingDetail, Discounts
from django.db import transaction
from users.models import User
from rest_framework.authentication import SessionAuthentication
# Create your views here.

def get_total_amount_and_detail(appointment, discount_code):
    # doctor = get_object_or_404(Doctor, id = appointment.doctor.id)
    discount_info = {"code": discount_code, "discount": 0, "percentage": 0}
    total_amount = 0
    
    with transaction.atomic():
        if appointment.tests:
            test_ids = list(map(lambda x:x['id'], appointment.tests))
            tests = get_list_or_404(Test, id__in = test_ids)
            total_test_amount = sum(float(test.price) for test in tests)
            total_amount = float(appointment.doctor.consultation_fee) + total_test_amount
        else:
            total_amount = float(appointment.doctor.consultation_fee)

        if discount_code:
            discount = get_object_or_404(Discounts, code = discount_code)
            discount_amount = (total_amount // 100) * float(discount.discount)
            discount_info = {"code": discount.code, "discount": discount_amount, "percentage": discount.discount}
            total_amount = total_amount - discount_amount
            
        
        detailed_info = list(map(lambda x:{"test":x.name, "price":float(x.price)}, tests))
        return total_amount, detailed_info, discount_info


class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return  # skip CSRF

# Create your views here.
# Appointment views
# @csrf_exempt

@api_view(['POST'])
@authentication_classes([CsrfExemptSessionAuthentication])
def create_order(request):
    serializer = CreateOrderSerializer(data = request.data)
    serializer.is_valid(raise_exception=True)
    appointment_id = serializer.validated_data['appointment_id']
    discount_code = request.data['discount_code']
    appointment = get_object_or_404(Appointment, id = appointment_id)
    discount_info = {"code": discount_code, "discount": 0, "percentage": 0}
    # discount = 0
    
    # if discount_code:
    #     discount = get_object_or_404(Discounts, code = discount_code)
        
    
    total_amount, detailed_add_ons, discount_info = "", "", ""
    
    # if appointment.tests:
    total_amount, detailed_add_ons, discount_info = get_total_amount_and_detail(appointment, discount_code)
        
    
        # print(total_amount, detailed_add_ons)
        
    # else:
    #     total_amount = appointment.doctor.consultation_fee
    
    order = client.order.create({
        "amount": int(total_amount * 100),
        "currency": "INR"
    })
    
    
    print(order)
    
    return Response({"order_id": order['id'], "Price_details" : {"add_ons": detailed_add_ons, "doctor_consultation": appointment.doctor.consultation_fee, "total_amount": order['amount'] / 100, "currency": order["currency"], "discount_info": discount_info}, "appointment": AppointmentSerializer(appointment).data}, status=status.HTTP_200_OK)


@api_view(['POST'])
@authentication_classes([CsrfExemptSessionAuthentication])
def verify_payment(request):
    
    serializer = VerifyPaymentSerializer(data = request.data)
    serializer.is_valid(raise_exception=True)
    data = {
    "razorpay_order_id": serializer.validated_data["razorpay_order_id"],
    "razorpay_payment_id": serializer.validated_data["razorpay_payment_id"],
    "razorpay_signature": serializer.validated_data["razorpay_signature"],
    }
    
    discount_code = request.data['discount_code']
    discount_info = {"code": discount_code, "discount": 0, "percentage": 0}
    appointment = get_object_or_404(Appointment, id = serializer.validated_data["appointment_id"])
    calculated_total, detailed_add_ons, discount_info = get_total_amount_and_detail(appointment, discount_code) 
    
    # if appointment.tests:
    #     calculated_total, detailed_add_ons = get_total_amount_and_detail(appointment, discount_code) 
    
    payment = None
    
    try:
        already_processed = BillingDetail.objects.filter(razorpay_payment_id=data["razorpay_payment_id"]).exists()

        if already_processed:
            return Response( {"message": "Payment already processed"}, status=status.HTTP_400_BAD_REQUEST )
        
        verify_signature(data)
        payment = client.payment.fetch(data["razorpay_payment_id"])
        
        if payment["status"] != "captured":
            return Response( {"message": "Payment not captured"}, status=status.HTTP_400_BAD_REQUEST )
    
    except Exception as e:
        BillingDetail.objects.create(
        appointment=appointment,
        particular=appointment.reason,
        user=request.user,
        total_amount=calculated_total,
        amount_paid=0,
        transaction_status="FAILED",
        payment_method=payment['method'] if payment else "UPI",
        razorpay_order_id = data["razorpay_order_id"],
        razorpay_payment_id = data["razorpay_payment_id"],
        razorpay_signature  = data["razorpay_signature"]
        )
        import traceback
        traceback.print_exc()
        print(str(e))
        return Response(BillingDetailSerializer(bill).data, status=status.HTTP_400_BAD_REQUEST)
    
    with transaction.atomic():
            bill = BillingDetail.objects.create(
                appointment = appointment,
                particular = appointment.reason,
                user = request.user,
                total_amount = calculated_total,
                add_ons = detailed_add_ons,
                discount = discount_info['discount'],
                discount_code = discount_info['code'],
                discount_percentage = discount_info['percentage'],
                amount_paid = payment['amount'] / 100,
                transaction_status = "SUCCESS",
                payment_method = payment['method'],
                razorpay_order_id = data["razorpay_order_id"],
                razorpay_payment_id = data["razorpay_payment_id"],
                razorpay_signature  = data["razorpay_signature"]
            )
            print("APPOINTMENT SERIALIZER:")
            print(AppointmentSerializer(bill.appointment).data)

            print("BILLING SERIALIZER:")
            print(BillingDetailSerializer(bill).data)
            appointment.status = "CONFIRMED"
            appointment.save()
            
            return Response(BillingDetailSerializer(bill).data, status=status.HTTP_200_OK)