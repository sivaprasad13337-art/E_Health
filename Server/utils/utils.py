from django.shortcuts import get_object_or_404
from hospital.models import Patient, Doctor
from hospital.serializers import PatientSerializer, DoctorSerializer
from users.models import User
from users.serializers import UserSerializer
from rest_framework.permissions import BasePermission
from django.core.exceptions import PermissionDenied
import cloudinary.uploader
import rest_framework
print('akubau',rest_framework.__version__)

def get_user_data(user):
    profile = {}
    
    if user.role == 'PATIENT':
        patient = get_object_or_404(Patient, user_id = user.id)
        profile = PatientSerializer(patient)
    elif user.role == 'DOCTOR' and user.is_verified:
        doctor = get_object_or_404(Doctor, user_id = user.id)
        profile = DoctorSerializer(doctor)
    
    return {"profile": profile.data if profile else UserSerializer(user).data}
        

def get_doc_and_patient(request):
    patient_id = request.data.get('patient_id')
    doctor_id = request.data.get('doctor_id')
    patient = get_object_or_404(Patient, id = patient_id)
    doctor = get_object_or_404(Doctor, id = doctor_id)
    
    return [patient, doctor]


def delete_old_cloudinary_file(old_file, new_file):
    if (old_file and new_file and old_file != new_file):
        cloudinary.uploader.destroy(old_file.public_id)
        
def delete_cloudinary_file(file):
    if file:
        cloudinary.uploader.destroy(file.public_id)


def is_owner_or_admin(request, obj):
    if (request.user == obj.user or request.user.is_superuser or (request.user.role == 'ADMIN' and request.user.is_verified)):
        return
    raise PermissionDenied
    
    
class IsRoleAdmin(BasePermission):
    def has_permission(self, request, view):
        return bool((request.user.role == 'ADMIN' and request.user.is_verified) or request.user.is_superuser)


class IsOwnerOrSuperAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        return bool(request.user == obj or request.user.is_superuser)