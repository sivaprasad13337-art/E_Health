from rest_framework import serializers
from .models import LifeStyleHabit, Allergy, Surgery, MedicalCondition, MedicalRecord
from hospital.serializers import PatientSerializer

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
        