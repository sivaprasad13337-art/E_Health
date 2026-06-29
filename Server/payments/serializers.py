from rest_framework import serializers
from .models import Discounts, BillingDetail
from appointment.serializer import AppointmentSerializer

class CreateOrderSerializer(serializers.Serializer):
    appointment_id = serializers.IntegerField()
    # discount_code = serializers.CharField()
    

class VerifyPaymentSerializer(serializers.Serializer):
    appointment_id = serializers.IntegerField()
    razorpay_order_id = serializers.CharField()
    razorpay_payment_id = serializers.CharField()
    razorpay_signature = serializers.CharField()
    
class DiscountSerializer(serializers.ModelSerializer):
    
    class Meta():
        model = Discounts
        fields = '__all__'
        

class BillingDetailSerializer(serializers.ModelSerializer):
    appointment = AppointmentSerializer(read_only = True)
    class Meta():
        model = BillingDetail
        fields = [
                  'appointment',
                  'particular',
                  'total_amount',
                  'add_ons',
                  'discount',
                  'discount_code',
                  'discount_percentage',
                  'amount_paid',
                  'transaction_status',
                  'created_at',
                  'updated_at'
                 ]
        
        extra_kwargs = {
            "created_at": {"read_only": True},
            "updated_at": {"read_only": True},
            "add_ons": {"read_only": True},
            "transaction_status": {"read_only": True},
            "amount_paid": {"read_only": True},
            "discount": {"read_only": True},
            "total_amount": {"read_only": True},
            "discount_percentage": {"read_only": True},
            "discount_code": {"read_only": True},
            
        }
        