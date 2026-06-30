from rest_framework import serializers
from .models import Appointment, MedicalRecord, MedicalReport, LifeStyleHabit, Allergy, Surgery, MedicalCondition
from hospital.serializers import DoctorSerializer, PatientSerializer


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
        

class MedicalReportSerializer(serializers.ModelSerializer):
    # patient = PatientSerializer(read_only=True)
    # doctor = DoctorSerializer(read_only=True)
    # appointment = AppointmentSerializer(read_only=True)
    
    class Meta():
        model = MedicalReport
        fields = [
            'patient',
            'doctor',
            'appointment',
            'prescription',
            'vitals',
            'tests',
            'notes'
        ]
        
        extra_kwargs = {
            'appointment': {'read_only' : True},
            'patient': {'read_only' : True},
            'doctor': {'read_only' : True}
        }