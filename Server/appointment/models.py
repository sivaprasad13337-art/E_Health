from django.db import models
from hospital.models import Patient, Doctor
from cloudinary.models import CloudinaryField

Status_Options = (
('PENDING', 'Pending'),
('CONFIRMED', 'Confirmed'),
('COMPLETED', 'Completed'),
('CANCELLED', 'Cancelled')
)

Appointment_Types = (
    ("Clinic", "Clinic"),
    ("Video Call", "Video Call"),
    ("Audio Call", "Audio Call"),
    ("Chat", "Chat"),
    ("Home Visit", "Home Visit")
    )

Severity_Options = (
    ("Low", "Low"),
    ("Mod", "Mod"),
    ("High", "High"),
    )

# MedicalReportTypes = (
#     ("")
# )
# Create your models here.
class Appointment(models.Model):
    reason = models.TextField()
    symptoms = models.JSONField(default=list, blank=True)
    appointment_type = models.CharField(max_length= 20, choices=Appointment_Types, default="Clinic", blank=False, null=False)
    appointment_code = models.CharField(max_length= 16, blank=False, null=False, unique=True)
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
    doctor = models.ManyToManyField(Doctor, blank=True, related_name="medical_reports")
    appointment = models.ForeignKey(Appointment, on_delete = models.SET_NULL, blank=True, null=True, related_name='medical_reports')
    title = models.CharField(max_length=100)
    type = models.CharField(max_length=60)
    follow_up = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Vitals(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='vitals')
    heart_rate = models.PositiveSmallIntegerField(null=True, blank=True)
    temperature = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True)
    spo2 = models.PositiveSmallIntegerField(null=True, blank=True)
    weight = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    blood_pressure = models.CharField(max_length=7, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
class AppointmentReport(MedicalReport):
    notes = models.TextField()
    prescription = models.JSONField(default=list, blank=True)
    vitals = models.ForeignKey(Vitals, on_delete=models.SET_NULL, blank=True, null=True, related_name='vitals')
    diagnosis_and_findings = models.JSONField(default=list, blank=True)
    
class LabReport(MedicalReport):
    tests = models.JSONField(default=list, blank=True)
    lab_notes = models.TextField()
    doctor_notes = models.TextField()
    
class ImagingReport(MedicalReport):
    scan = CloudinaryField('image', blank=True, null=True)
    findings = models.TextField()
    impression = models.TextField()
    
class SurgeryReport(MedicalReport):
    surgery_name = models.CharField(max_length=100)
    surgeon_notes = models.TextField()
    

class MedicalCondition(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='medical_conditions')
    condition = models.CharField(max_length=100)
    since = models.CharField(max_length=4)
    management = models.CharField(max_length=100)
    medication = models.CharField(max_length=100)
    
class Allergy(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='allergies')
    allergy = models.CharField(max_length=100)
    severity = models.CharField(max_length=4, choices=Severity_Options, default="Mod")
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