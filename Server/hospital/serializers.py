from rest_framework import serializers
from .models import Doctor, Patient, Department, Specialization, Test
from users.models import User
from users.serializers import UserSerializer

class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Doctor
        fields = '__all__'
        
        extra_kwargs = {
            "user": {"read_only": True},
            'specialization': {"read_only": True},
            'department': {"read_only": True}
        }
        

class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Patient
        fields = '__all__'
        
        extra_kwargs = {
            "user": {"read_only": True},
        }
        
        
class DepartmentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Department
        fields = '__all__'
        
class SpecializationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Specialization
        fields = '__all__'
   
        
class TestSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Test
        fields = '__all__'
        
        # extra_kwargs = {
        #     'price': {'read_only': True}
        # }