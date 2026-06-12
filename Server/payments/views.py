from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import CreateOrderSerializer, VerifyPaymentSerializer
from appointment.models import Appointment
from hospital.models import Doctor
from appointment.serializer import AppointmentSerializer
from hospital.serializers import DoctorSerializer
from hospital.models import Test
from hospital.serializers import TestSerializer
from payments.services import client, verify_signature
from payments.models import BillingDetail
from django.db import transaction
from users.models import User
from rest_framework.authentication import SessionAuthentication
# Create your views here.

def get_total_amount_and_detail(appointment):
    # doctor = get_object_or_404(Doctor, id = appointment.doctor.id)
    test_ids = list(map(lambda x:x['id'], appointment.tests))
    tests = get_list_or_404(Test, id__in = test_ids)
    total_test_amount = sum(float(test.price) for test in tests)
    total_amount = float(appointment.doctor.consultation_fee) + total_test_amount
    detailed_info = list(map(lambda x:{"test":x.name, "price":float(x.price)}, tests))
    return total_amount, detailed_info

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
    appointment = get_object_or_404(Appointment, id = appointment_id)
    
    
    total_amount, detailed_add_ons = "", ""
    
    if appointment.tests:
        total_amount, detailed_add_ons = get_total_amount_and_detail(appointment)
    
        print(total_amount, detailed_add_ons)
        
    else:
        total_amount = appointment.doctor.consultation_fee
    
    order = client.order.create({
        "amount": int(total_amount * 100),
        "currency": "INR"
    })
    
    
    print(order)
    
    return Response({"order_id": order['id'], "Price_details" : {"add_ons": detailed_add_ons, "doctor_consultation": appointment.doctor.consultation_fee, "total_amount": order['amount'] / 100, "currency": order["currency"]}}, status=status.HTTP_200_OK)


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
    
    appointment = get_object_or_404(Appointment, id = serializer.validated_data["appointment_id"])
    calculated_total, detailed_add_ons = "", ""
    
    if appointment.tests:
        calculated_total, detailed_add_ons = get_total_amount_and_detail(appointment)
    
    calculated_total, detailed_add_ons = appointment.doctor.consultation_fee, []    
    
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
        particular=appointment.title,
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
        return Response({"message": "Invalied Payment"}, status=status.HTTP_400_BAD_REQUEST)
    
    with transaction.atomic():
            user = get_object_or_404(User, id = 2)
            BillingDetail.objects.create(
                appointment = appointment,
                particular = appointment.reason,
                # user = request.user,
                user = user,
                total_amount = calculated_total,
                add_ons = detailed_add_ons,
                discount_percentage = 0,
                amount_paid = payment['amount'] / 100,
                transaction_status = "SUCCESS",
                payment_method = payment['method'],
                razorpay_order_id = data["razorpay_order_id"],
            )
            
            appointment.status = "CONFIRMED"
            appointment.save()
            
            return Response({"message": "Payment Successfull!"}, status=status.HTTP_200_OK)