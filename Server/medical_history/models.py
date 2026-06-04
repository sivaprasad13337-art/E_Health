from django.db import models

# Create your models here.
class MedicalHistory(models.Model):
    medications = models.JSONField(default=list, null=True)
    diagnoses = models.JSONField(default=list, null=True)
    allergies = models.JSONField(default=list, null=True)
    treatment_history = models.CharField(max_length=255, blank=True, null=True)
    surgery_history = models.CharField(max_length=120, blank=True, null=True)
    notes = models.CharField(max_length=255, null=False, blank=True)