from django.db import models
from appointment.models import Appointment
from django.conf import settings
import uuid

transaction_status_choices = (
    ('SUCCESS', 'Success'),
    ('FAILED', 'Failed'),
    ('PENDING', 'Pending')
    
)

payment_choices = (
    ('UPI', 'UPI'),
    ('Card', 'Card'),
    ('NEFT', 'NEFT'),
    ('Cash', 'Cash'),
)

# Create your models here.
class BillingDetail(models.Model):
    payment_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    appointment = models.ForeignKey(Appointment, on_delete=models.SET_NULL, null=True)
    particular = models.CharField(max_length=255, null=True, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    add_ons = models.JSONField(default=list, blank=True)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    transaction_status = models.CharField(max_length=20, choices=transaction_status_choices, default='PENDING', null=False, blank=False)
    payment_method = models.CharField(max_length=20, choices=payment_choices, blank=True, null=True)
    razorpay_order_id = models.CharField(max_length=255, null=True, blank=True)
    razorpay_payment_id = models.CharField(max_length=255, null=True, blank=True)
    razorpay_signature  = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
  
    
"""add_ons json format has to be eg: [
  {
    "item": "Echo", str
    "amt": 3500     int
  },
  {
    "item": "ECG",  str
    "amt": 1100     int
  }
] """