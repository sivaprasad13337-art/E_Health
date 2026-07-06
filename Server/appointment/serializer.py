from rest_framework import serializers
from .models import Appointment, MedicalRecord, MedicalReport, LifeStyleHabit, Allergy, Surgery, MedicalCondition
from hospital.serializers import DoctorSerializer, PatientSerializer

# from rest_framework import serializers
from .models import (
    AppointmentReport,
    LabReport,
    ImagingReport,
    SurgeryReport,
    Vitals
)



class AppointmentSerializer(serializers.ModelSerializer):
    # patient = PatientSerializer(read_only=True)
    doctor = DoctorSerializer(read_only=True)
    patient = PatientSerializer(read_only=True)
    class Meta():
        model = Appointment
        fields = [
            'id',
            'reason',
            'appointment_type',
            'appointment_code',
            'symptoms',
            'patient',
            'doctor',
            'tests',
            'status',
            'date',
            'time',
            "created_at",
            "updated_at"
            
        ]
        
        extra_kwargs = {
            'status': {'read_only': True},
            'appointment_code': {'read_only': True},
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True}
            
        }

class MedicalReportSerializer(serializers.ModelSerializer):
    # patient = PatientSerializer(read_only=True)
    doctor = DoctorSerializer(read_only=True, many=True)
    appointment = AppointmentSerializer(read_only=True)

    class Meta:
        model = MedicalReport
        fields = [
            "id",
            "patient",
            "doctor",
            "appointment",
            "title",
            "type",
            "status",
            "follow_up",
            "created_at",
            "updated_at",
        ]
        
        
class VitalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vitals
        fields = "__all__"


class AppointmentReportSerializer(MedicalReportSerializer):
    class Meta(MedicalReportSerializer.Meta):
        model = AppointmentReport
        fields = MedicalReportSerializer.Meta.fields + [
            "notes",
            "prescription",
            "vitals",
            "diagnosis_and_findings",
        ]


class LabReportSerializer(MedicalReportSerializer):
    class Meta(MedicalReportSerializer.Meta):
        model = LabReport
        fields = MedicalReportSerializer.Meta.fields + [
            "lab_details",
            "tests",
            "lab_notes",
            "doctor_notes",
        ]


class ImagingReportSerializer(MedicalReportSerializer):
    class Meta(MedicalReportSerializer.Meta):
        model = ImagingReport
        fields = MedicalReportSerializer.Meta.fields + [
            "scan",
            "findings",
            "impression",
        ]


class SurgeryReportSerializer(MedicalReportSerializer):
    class Meta(MedicalReportSerializer.Meta):
        model = SurgeryReport
        fields = MedicalReportSerializer.Meta.fields + [
            "surgery_name",
            "surgeon_notes",
        ]
        
        
class LifeStyleHabitSerializer(serializers.ModelSerializer):
    class Meta():
        model = LifeStyleHabit
        fields = '__all__'
        
class AllergySerializer(serializers.ModelSerializer):
    class Meta():
        model = Allergy
        fields = '__all__'
        
        
class SurgerySerializer(serializers.ModelSerializer):
    class Meta():
        model = Surgery
        fields = '__all__'
        
        
class MedicalConditionSerializer(serializers.ModelSerializer):
    class Meta():
        model = MedicalCondition
        fields = '__all__'
        
        
        
class MedicalRecordSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    life_style_habits = LifeStyleHabitSerializer(read_only=True)
    
    class Meta():
        model = MedicalRecord
        fields = [
            'patient',
            'medications',
            'life_style_habits',
            'treatment_history',
            'notes'
        ]
        