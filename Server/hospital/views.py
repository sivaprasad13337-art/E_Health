from django.shortcuts import get_object_or_404
from rest_framework.decorators import permission_classes, api_view, parser_classes
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from utils.utils import is_owner_or_admin, IsOwnerOrSuperAdmin, IsRoleAdmin
from rest_framework.response import Response
from rest_framework import status
from .models import Patient, Doctor, Specialization, Department, Test
from users.models import User
from .serializers import PatientSerializer, DoctorSerializer, SpecializationSerializer, DepartmentSerializer, TestSerializer
from django.db import transaction
from utils.utils import delete_old_cloudinary_file, delete_cloudinary_file

# Create your views here.
# Patient Views
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_patient(request, id):
        res = get_object_or_404(Patient, id = id)
        patient = PatientSerializer(res).data
        return Response(patient, status=status.HTTP_200_OK)
    
    
@api_view(['PATCH'])
# @permission_classes([IsAuthenticated, IsRoleAdmin])
def update_patient(request, id):
    data = request.data
    res = get_object_or_404(Patient, id = id)
    
    # is_owner_or_admin(request, res)
    patient = PatientSerializer(res, data=data, partial=True)
    
    patient.is_valid(raise_exception=True)
    patient.save()
    return Response(patient.data, status=status.HTTP_200_OK)
    
    # return Response(patient.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    

# Doctor Views
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_doctor(request, id):
        res = get_object_or_404(Doctor, id = id)
        doctor = DoctorSerializer(res).data
        return Response(doctor, status=status.HTTP_200_OK)
    

@api_view(['PATCH'])
# @permission_classes([IsAuthenticated, IsOwnerOrAdmin])
def update_doctor(request, id):
    data = request.data
    res = get_object_or_404(Doctor, id = id)
    doctor = DoctorSerializer(res, data=data, partial=True)
    specialization = (get_object_or_404(Specialization, id = data['specialization_id']) if 'specialization_id' in data else res.specialization)
    department = (get_object_or_404(Department, id = data['department_id']) if 'department_id' in data else res.department)
    
    doctor.is_valid(raise_exception=True)
    doctor.save(department=department, specialization=specialization)
    return Response(doctor.data, status=status.HTTP_200_OK)
    
    # return Response(doctor.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
# @permission_classes([IsAuthenticated, IsOwnerOrSuperAdmin])
def delete_doctor(request, id):
    
    with transaction.atomic():
        doctor = get_object_or_404(Doctor, id = id)
        user = get_object_or_404(User, id = doctor.user_id)
        user.is_verified = False
        user.save()
        doctor.delete()
        return Response({"message": "Doctor Deleted!"}, status=status.HTTP_204_NO_CONTENT)


# Specialization Views
@api_view(['POST'])
# @permission_classes([IsAuthenticated, IsRoleAdmin])
def create_specialization(request):
    data = request.data
    specialization = SpecializationSerializer(data=data)
    
    specialization.is_valid(raise_exception=True)
    specialization.save()
    return Response(specialization.data, status=status.HTTP_201_CREATED)
    
    # return Response(specialization.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_specializations(request):
        res = Specialization.objects.all()
        specializations = SpecializationSerializer(res, many = True)
        return Response(specializations.data, status=status.HTTP_200_OK)


@api_view(['PATCH'])
# @permission_classes([IsAuthenticated, IsRoleAdmin])
def update_specialization(request, id):
    data = request.data
    res = get_object_or_404(Specialization, id = id)
    specialization = SpecializationSerializer(res, data=data, partial=True)
    
    specialization.is_valid(raise_exception=True)
    specialization.save()
    return Response(specialization.data, status=status.HTTP_200_OK)
    
    # return Response(specialization.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
# @permission_classes([IsAuthenticated, IsRoleAdmin])
def delete_specialization(request, id):
        specialization = get_object_or_404(Specialization, id = id)
        specialization.delete()
        return Response({"specialization": "deleted!"}, status=status.HTTP_204_NO_CONTENT)



# DepartMnet Views
@api_view(['POST'])
# @permission_classes([IsAuthenticated, IsRoleAdmin])
def create_department(request):
    data = request.data
    department = DepartmentSerializer(data=data)
    
    department.is_valid(raise_exception=True)
    department.save()
    return Response(department.data, status=status.HTTP_201_CREATED)
    
    # return Response(department.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_departments(request):
        res = Department.objects.all()
        departments = DepartmentSerializer(res, many = True)
        return Response(departments.data, status=status.HTTP_200_OK)
    

@api_view(['PATCH'])
# @permission_classes([IsAuthenticated, IsRoleAdmin])
def update_department(request, id):
    data = request.data
    res = get_object_or_404(Department, id = id)
    department = DepartmentSerializer(res, data=data, partial=True)
    
    department.is_valid(raise_exception=True)
    department.save()
    return Response(department.data, status=status.HTTP_200_OK)
    
    # return Response(department.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
# @permission_classes([IsAuthenticated, IsRoleAdmin])
def delete_department(request, id):
        department = get_object_or_404(Department, id = id)
        department.delete()
        return Response({"department": "deleted!"}, status=status.HTTP_204_NO_CONTENT)
    

# Test Views
@api_view(['POST'])
@parser_classes([FormParser, MultiPartParser])
def create_test(request):
    data = request.data
    test = TestSerializer(data=data)
    test.is_valid(raise_exception=True)
    test.save()
    return Response(test.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_tests(request):
    tests = Test.objects.all()
    return Response(TestSerializer(tests, many = True).data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_test(request, id):
    tests = get_object_or_404(Test, id = id)
    return Response(TestSerializer(tests).data, status=status.HTTP_200_OK)


@api_view(['PATCH'])
@parser_classes([FormParser, MultiPartParser])
def update_test(request, id):
    test = get_object_or_404(Test, id = id)
    old_poster = test.poster
    
    serializer = TestSerializer(test, data=request.data, partial = True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    
    if request.FILES and 'poster' in request.Files:
        delete_cloudinary_file(old_poster)
        
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
def delete_test(request, id):
    test = get_object_or_404(Test, id = id)
    delete_cloudinary_file(test.poster)
    test.delete()
        
    return Response(status=status.HTTP_204_NO_CONTENT)
    