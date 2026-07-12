from django.db import models
from hospital.models import Patient


Severity_Options = (
    ("Low", "Low"),
    ("Moderate", "Moderate"),
    ("High", "High"),
    )

# Create your models here.
class MedicalCondition(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='medical_conditions')
    condition = models.CharField(max_length=100)
    since = models.CharField(max_length=4)
    management = models.CharField(max_length=100)
    medication = models.CharField(max_length=100)
    
class Allergy(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='allergies')
    allergy = models.CharField(max_length=100)
    severity = models.CharField(max_length=8, choices=Severity_Options, default="Mod")
    note = models.CharField(max_length=100)
    
class LifeStyleHabit(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='life_style_habits')
    smoking =  models.CharField(max_length=50)
    alcohol =  models.CharField(max_length=50)
    activity =  models.CharField(max_length=50)
    diet =  models.CharField(max_length=100)
    sleep =  models.CharField(max_length=50)
    taking_medication =  models.CharField(max_length=3)
    
class Surgery(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='surgeries')
    surgery = models.CharField(max_length=100)
    reason = models.CharField(max_length=100)
    date = models.CharField(max_length=30)
    hospital = models.CharField(max_length=100)
    notes = models.TextField(null=True)
    summary = models.TextField(null=True)
    
class MedicalRecord(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='medical_record')
    # doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, null=True)
    medications = models.JSONField(default=list, blank=True)
    # conditions = models.ForeignKey(MedicalCondition, on_delete=models.CASCADE, related_name="medical_conditions")
    # allergies = models.ForeignKey(Allergy, on_delete=models.CASCADE, related_name="allergies")
    life_style_habits = models.ForeignKey(LifeStyleHabit, on_delete=models.CASCADE, related_name="life_style_habits")
    treatment_history = models.TextField(blank=True)
    # surgery_history = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)