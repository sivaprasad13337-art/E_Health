from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import MedicalRecord, Surgery, MedicalCondition, Allergy, LifeStyleHabit
from .serializers import MedicalRecordSerializer, SurgerySerializer, MedicalConditionSerializer, AllergySerializer, LifeStyleHabitSerializer

from hospital.models import Patient
from utils.utils import is_owner_or_admin, is_owner_or_RoleAdmin_or_RoleDoctor, get_doc_and_patient

# Create your views here.

# Medical Record Views
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_medical_record(request):
    data = request.data
    patient, doctor = get_doc_and_patient(request)
    print(f"{patient}, {doctor}")
    
    serializer = MedicalRecordSerializer(data = data)
    
    if serializer.is_valid():
        # serializer.doctor = doctor
        # serializer.patient = patient
        medical_record = serializer.save(doctor=doctor, patient=patient)
        
        return Response({"data": MedicalRecordSerializer(medical_record).data}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_medical_records_by_patient(request, id):
    patient = get_object_or_404(Patient, id = id)
    is_owner_or_RoleAdmin_or_RoleDoctor(request, patient)
    
    medical_records = get_list_or_404(MedicalRecord, patient_id = id)
    data = MedicalRecordSerializer(medical_records, many = True).data
    return Response(data, status=status.HTTP_200_OK)
    
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_medical_record_by_id(request, id):   
    medical_record = get_object_or_404(MedicalRecord, id = id)
    is_owner_or_RoleAdmin_or_RoleDoctor(request, medical_record.patient)
    data = MedicalRecordSerializer(medical_record).data
    return Response(data, status=status.HTTP_200_OK)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_medical_record(request, id):
    data = request.data
    
    medical_record = get_object_or_404(MedicalRecord, id = id)
    is_owner_or_admin(request, medical_record.patient)
    serializer = MedicalRecordSerializer(medical_record, data=data)
    
    if serializer.is_valid():
        serializer.save()
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_medical_record(request, id):
    medical_record = get_object_or_404(MedicalRecord, id = id)
    is_owner_or_admin(request, medical_record.patient)
    medical_record.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# LifeStyle Views

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_life_style_habits(request):
    patient = get_object_or_404(Patient, id = request.data['patient'])
    serializer = LifeStyleHabitSerializer(data = request.data)
    
    if serializer.is_valid(raise_exception=True):
        serializer.save(patient = patient)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_life_style_habits(request, patient_id):
    life_style_habits = get_object_or_404(LifeStyleHabit, patient_id = patient_id)
    is_owner_or_RoleAdmin_or_RoleDoctor(request, life_style_habits.patient)
    
    return Response(LifeStyleHabitSerializer(life_style_habits).data, status=status.HTTP_200_OK)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_life_style_habit(request, id):
    life_style_habit = get_object_or_404(LifeStyleHabit, patient_id = id)
    is_owner_or_admin(request, life_style_habit.patient)
    serializer = LifeStyleHabitSerializer(life_style_habit, data = request.data, partial = True)
    
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_life_style_habit(request, id):
    life_style_habit = get_object_or_404(LifeStyleHabit, id = id)
    is_owner_or_admin(request, life_style_habit.patient)
    life_style_habit.delete()
    
    return Response(status=status.HTTP_204_NO_CONTENT)



# Allergy Views
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_allergy(request):
    patient = get_object_or_404(Patient, id = request.data['patient'])
    serializer = AllergySerializer(data = request.data)
    
    if serializer.is_valid(raise_exception=True):
        serializer.save(patient = patient)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_allergys(request, patient_id):
    allergy = get_list_or_404(Allergy, patient_id = patient_id)
    
    return Response(AllergySerializer(allergy, many=True).data, status=status.HTTP_200_OK)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_allergy(request, id):
    allergy = get_object_or_404(Allergy, id = id)
    serializer = AllergySerializer(allergy, data = request.data, partial = True)
    
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_allergy(request, id):
    allergy = get_object_or_404(Allergy, id = id)
    allergy.delete()
    
    return Response(status=status.HTTP_204_NO_CONTENT)




# MedicalCondition Views
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_medical_condition(request):
    patient = get_object_or_404(Patient, id = request.data['patient'])
    serializer = MedicalConditionSerializer(data = request.data)
    
    if serializer.is_valid(raise_exception=True):
        serializer.save(patient = patient)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_medical_conditions(request, patient_id):
    medical_condition = get_list_or_404(MedicalCondition, patient_id = patient_id)
    
    return Response(MedicalConditionSerializer(medical_condition, many=True).data, status=status.HTTP_200_OK)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_medical_condition(request, id):
    medical_condition = get_object_or_404(MedicalCondition, id = id)
    serializer = MedicalConditionSerializer(medical_condition, data = request.data, partial = True)
    
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_medical_condition(request, id):
    medical_condition = get_object_or_404(MedicalCondition, id = id)
    medical_condition.delete()
    
    return Response(status=status.HTTP_204_NO_CONTENT)




# Surgery Views
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_surgery(request):
    patient = get_object_or_404(Patient, id = request.data['patient'])
    serializer = SurgerySerializer(data = request.data)
    
    if serializer.is_valid(raise_exception=True):
        serializer.save(patient = patient)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_surgery(request, patient_id):
    surgery = get_list_or_404(Surgery, patient_id = patient_id)
    
    return Response(SurgerySerializer(surgery, many=True).data, status=status.HTTP_200_OK)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_surgery(request, id):
    surgery = get_object_or_404(Surgery, id = id)
    serializer = SurgerySerializer(surgery, data = request.data, partial = True)
    
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_surgery(request, id):
    surgery = get_object_or_404(Surgery, id = id)
    surgery.delete()
    
    return Response(status=status.HTTP_204_NO_CONTENT)