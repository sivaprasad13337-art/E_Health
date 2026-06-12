from rest_framework import serializers
from .models import User
from hospital.models import Doctor, Patient
from django.db import transaction

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'username',
            'profile_img',
            'email',
            'phone',
            'role',
            'password',
            'is_staff'
        ]
        
        extra_kwargs = {
            'password': {'write_only':True},
            'id': {'read_only':True}
        }
        
        
    @transaction.atomic
    def create(self, validated_data):
        role = validated_data.pop('role')
        user = User.objects.create_user(role=role, **validated_data)
        
        if role == 'PATIENT':
            Patient.objects.create(user=user)
            user.is_verified = True
            user.save(update_fields=['is_verified'])
            
        return user