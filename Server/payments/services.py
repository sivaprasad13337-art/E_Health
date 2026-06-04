import razorpay
from django.conf import settings

client = razorpay.Client(
    auth = (
        settings.RAZORPAY_TEST_API_KEY,
        settings.RAZORPAY_TEST_API_SECRET_KEY
    )
)

def verify_signature(data):
        client.utility.verify_payment_signature(data)