from rest_framework import serializers
from .models import Appointment, MedicalRecord, MedicalReport
from hospital.serializers import DoctorSerializer, PatientSerializer



class AppointmentSerializer(serializers.ModelSerializer):
    # patient = PatientSerializer(read_only=True)
    doctor = DoctorSerializer(read_only=True)
    
    class Meta():
        model = Appointment
        fields = [
            'title',
            'patient',
            'doctor',
            'tests',
            'status',
            'date',
            'time'
        ]
        
        extra_kwargs = {
            'patient': {'read_only' : True},
        }
        
        
        
class MedicalRecordSerializer(serializers.ModelSerializer):
    # patient = PatientSerializer(read_only=True)
    # doctor = DoctorSerializer(read_only=True)
    
    class Meta():
        model = MedicalRecord
        fields = [
            'patient',
            'doctor',
            'medications',
            'diagnoses',
            'allergies',
            'treatment_history',
            'surgery_history',
            'notes'
        ]
        
        extra_kwargs = {
            'patient': {'read_only' : True},
            'doctor': {'read_only' : True}
        }
        

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