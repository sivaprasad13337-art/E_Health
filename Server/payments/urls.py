from django.urls import path
from . import views

urlpatterns = [
    path('create-order/', views.create_order, name="Create-Order"),
    path('verify/', views.verify_payment, name="Verify-Payment"),
    path('get/bill/<int:id>', views.get_Bill, name="Get-Bill"),
    path('get/bill-by-apt/<int:apt_id>', views.get_Bill_by_apt, name="Get-Bill-APT"), 
]