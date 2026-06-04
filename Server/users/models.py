from django.contrib.auth.models import AbstractUser
from cloudinary.models import CloudinaryField
from django.db import models

# Create your models here.
class User(AbstractUser):
    profile_img = CloudinaryField('image', blank=True, null=True)
    
    ROLE_CHOICES = (
       ("PATIENT", "Patient"),
        ("DOCTOR", "Doctor"),
        ("ADMIN", "Admin"),
    )
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="PATIENT", blank=False, null=False)
    
    phone = models.CharField(max_length=15, blank=True, null=True)
    
    is_verified = models.BooleanField(default=False)
    