from django.db import models
from django.conf import settings
from cloudinary.models import CloudinaryField

BLOOD_GROUPS = (
    ("A+", "A+"),
    ("A-", "A-"),
    ("B+", "B+"),
    ("B-", "B-"),
    ("AB+", "AB+"),
    ("AB-", "AB-"),
    ("O+", "O+"),
    ("O-", "O-"),
)
# Create your models here.
class Department(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    
    def __str__(self):
        return self.name

class Specialization(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    description = models.TextField(null=True)
    
    def __str__(self):
        return self.name
    

class Test(models.Model):
    name = models.CharField(max_length=100)
    short_name = models.CharField(max_length=50)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    poster = CloudinaryField('image')

    
class Patient(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False, null=False)
    age = models.PositiveIntegerField(blank=True, null=True)
    height = models.PositiveIntegerField(blank=True, null=True)
    weight = models.PositiveIntegerField(blank=True, null=True)
    blood_group = models.CharField(max_length=5, choices=BLOOD_GROUPS,  blank=True, null=True)
    
    def __str__(self):
        return self.user.get_full_name() or self.user.username
    
    
class Doctor(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False, blank=False)
    specialization = models.ForeignKey(Specialization, on_delete=models.SET_NULL, blank=True, null=True)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    consultation_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    def __str__(self):
       return f"Dr. {self.user.get_full_name()  or self.user.username}"
    