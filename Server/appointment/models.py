from django.db import models
from hospital.models import Patient, Doctor

Status_Options = (
('PENDING', 'Pending'),
('CONFIRMED', 'Confirmed'),
('COMPLETED', 'Completed'),
('CANCELLED', 'Cancelled')
)

# Create your models here.
class Appointment(models.Model):
    title = models.CharField(max_length=120, blank=False,null=False)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, blank=False, null=False, related_name='appointments')
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, blank=False, null=False,related_name='appointments')
    tests = models.JSONField(default=list, blank=True)
    # medical_record = models.ForeignKey(MedicalRecord, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=20, choices=Status_Options, default='PENDING', blank=False, null=False)
    date = models.DateField(null=False, blank=False)
    time = models.TimeField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title


class MedicalReport(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='medical_reports')
    doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, null=True)
    appointment = models.ForeignKey(Appointment, on_delete = models.CASCADE, related_name='medical_reports')
    prescription = models.JSONField(default=list, blank=True)
    vitals = models.JSONField(default=list, blank=True)
    tests = models.JSONField(default=list, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    

class MedicalRecord(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='medical_records')
    doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, null=True)
    medications = models.JSONField(default=list, blank=True)
    diagnoses = models.JSONField(default=list, blank=True)
    allergies = models.JSONField(default=list, blank=True)
    treatment_history = models.TextField(blank=True)
    surgery_history = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)