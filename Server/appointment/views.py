from django.shortcuts import get_object_or_404, get_list_or_404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.decorators import api_view, permission_classes, authentication_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from hospital.models import Patient, Doctor
from hospital.serializers import PatientSerializer, DoctorSerializer
from .serializer import AppointmentSerializer, MedicalRecordSerializer, MedicalReportSerializer, LifeStyleHabitSerializer, AllergySerializer, MedicalConditionSerializer, SurgerySerializer
from .models import Appointment, MedicalRecord, MedicalReport, LifeStyleHabit, Allergy, MedicalCondition, Surgery
from utils.utils import get_doc_and_patient, generate_numeric_code
from utils.parse import parse_lab_report
import traceback

# from rest_framework.authentication import SessionAuthentication

# class CsrfExemptSessionAuthentication(SessionAuthentication):
#     def enforce_csrf(self, request):
#         return  # skip CSRF

# Create your views here.
# Appointment views
# @csrf_exempt

@api_view(['POST'])
# @authentication_classes([CsrfExemptSessionAuthentication])
def create_appointment(request):
    # patient_id = request.data.get('patient_id')
    # doctor_id = request.data.get('doctor_id')
    print(request.data)
    patient, doctor = get_doc_and_patient(request)
    
    serializer = AppointmentSerializer(data = request.data)
    # print(f'working: {patient_id}')
    
    if serializer.is_valid():
        print('valid')
        appointment_code = generate_numeric_code(prefix='APT-', length=6)
        serializer.save(patient = patient, doctor = doctor, appointment_code = appointment_code)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    print(serializer.errors)
    return Response(serializer.error_messages, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PATCH'])
def update_appointment(request, id):
    appointment = get_object_or_404(Appointment, id = id)
    serializer = AppointmentSerializer(appointment, data=request.data, partial = True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
        
    return Response({"Message": "Updated", "data": serializer.data}, status=status.HTTP_200_OK)
    


@api_view(['GET'])
def get_appointment_by_id(request,id):
    try:
        appointment = get_object_or_404(Appointment, id = id)
        data = AppointmentSerializer(appointment).data
        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        traceback.print_exc()
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['GET'])
def get_appointment_by_code(request, apt_code):
        appointment = get_object_or_404(Appointment, appointment_code = apt_code)
        data = AppointmentSerializer(appointment).data
        return Response(data, status=status.HTTP_200_OK)
    # except Exception as e:
    #     traceback.print_exc()
    #     return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_appointments(request):
    try:
        appointment = Appointment.objects.all()
        data = AppointmentSerializer(appointment, many = True).data
        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        traceback.print_exc()
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_appointments_by_patient(request, id):
    try:
        appointment = get_list_or_404(Appointment, patient_id = id)
        data = AppointmentSerializer(appointment, many = True).data
        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        traceback.print_exc()
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
 

@api_view(['GET'])
def get_appointments_by_doctor(request, id):
    try:
        appointment = get_list_or_404(Appointment, doctor_id = id)
        data = AppointmentSerializer(appointment, many = True).data
        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        traceback.print_exc()
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
    
# Medical Record Views
@api_view(['POST'])
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
def get_medical_records_by_patient(request, id):
    try:
        medical_records = get_list_or_404(MedicalRecord, patient_id = id)
        data = MedicalRecordSerializer(medical_records, many = True).data
        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        traceback.print_exc()
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
@api_view(['GET'])
def get_medical_record_by_id(request, id):
    try:
        medical_record = get_object_or_404(MedicalRecord, id = id)
        data = MedicalRecordSerializer(medical_record).data
        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        traceback.print_exc()
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PATCH'])
def update_medical_record(request, id):
    data = request.data
    
    medical_record = get_object_or_404(MedicalRecord, id = id)
    serializer = MedicalRecordSerializer(medical_record, data=data)
    
    if serializer.is_valid():
        serializer.save()
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
def delete_medical_record(request, id):
    medical_record = get_object_or_404(MedicalRecord, id = id)
    medical_record.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    
    # [
    #         'patient',
    #         'doctor',
    #         'medications',
    #         'diagnoses',
    #         'allergies',
    #         'treatment_history',
    #         'surgery_history',
    #         'notes'
    #     ]
    

# Medical Report Views
@api_view(['POST'])
def create_medical_report(request):
    data = request.data
    patient, doctor = get_doc_and_patient(request)
    appointment = get_object_or_404(Appointment, id = request.data.get('appointment_id'))
    serializer = MedicalReportSerializer(data=data)
    
    if serializer.is_valid():
        serializer.save(patient=patient, doctor=doctor, appointment=appointment)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['Get'])
def get_medical_report_by_id(request, id):
    try:
        medical_report = get_object_or_404(MedicalReport, id = id)
        data = MedicalReportSerializer(medical_report).data
        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        traceback.print_exc()
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
@api_view(['Get'])
def get_medical_reports_by_patient(request, id):
    try:
        medical_reports = get_list_or_404(MedicalReport, id = id)
        data = MedicalReportSerializer(medical_reports, many = True).data
        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        traceback.print_exc()
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['PATCH'])
def update_medical_report(request, id):
    data = request.data
    medical_report = get_object_or_404(MedicalReport, id = id)
    serializer = MedicalReportSerializer(medical_report, data=data)
    
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#  [
#             'patient',
#             'doctor',
#             'appointment',
#             'prescription',
#             'vitals',
#             'notes'
#         ]

@api_view(['POST'])
@parser_classes([FormParser, MultiPartParser])
def parse(request):
    file = request.FILES.get('pdf')
    
    if file:
        report = parse_lab_report(pdf=file)
        return Response(report, status=status.HTTP_200_OK)

# LifeStyle Views

@api_view(['POST'])
def create_life_style_habits(request):
    patient = get_object_or_404(Patient, id = request.data['patient'])
    serializer = LifeStyleHabitSerializer(data = request.data)
    
    if serializer.is_valid(raise_exception=True):
        serializer.save(patient = patient)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_life_style_habits(request, patient_id):
    life_style_habits = get_list_or_404(LifeStyleHabit, patient_id = patient_id)
    
    return Response(LifeStyleHabitSerializer(life_style_habits, many=True).data, status=status.HTTP_200_OK)


@api_view(['PATCH'])
def update_life_style_habit(request, id):
    life_style_habit = get_object_or_404(LifeStyleHabit, id = id)
    serializer = LifeStyleHabitSerializer(life_style_habit, data = request.data, partial = True)
    
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
def delete_life_style_habit(request, id):
    life_style_habit = get_object_or_404(LifeStyleHabit, id = id)
    life_style_habit.delete()
    
    return Response(status=status.HTTP_204_NO_CONTENT)



# Allergy Views
@api_view(['POST'])
def create_allergy(request):
    patient = get_object_or_404(Patient, id = request.data['patient'])
    serializer = AllergySerializer(data = request.data)
    
    if serializer.is_valid(raise_exception=True):
        serializer.save(patient = patient)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_allergys(request, patient_id):
    allergy = get_list_or_404(Allergy, patient_id = patient_id)
    
    return Response(AllergySerializer(allergy, many=True).data, status=status.HTTP_200_OK)


@api_view(['PATCH'])
def update_allergy(request, id):
    allergy = get_object_or_404(Allergy, id = id)
    serializer = AllergySerializer(allergy, data = request.data, partial = True)
    
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
def delete_allergy(request, id):
    allergy = get_object_or_404(Allergy, id = id)
    allergy.delete()
    
    return Response(status=status.HTTP_204_NO_CONTENT)




# MedicalCondition Views
@api_view(['POST'])
def create_medical_condition(request):
    patient = get_object_or_404(Patient, id = request.data['patient'])
    serializer = MedicalConditionSerializer(data = request.data)
    
    if serializer.is_valid(raise_exception=True):
        serializer.save(patient = patient)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_medical_conditions(request, patient_id):
    medical_condition = get_list_or_404(MedicalCondition, patient_id = patient_id)
    
    return Response(MedicalConditionSerializer(medical_condition, many=True).data, status=status.HTTP_200_OK)


@api_view(['PATCH'])
def update_medical_condition(request, id):
    medical_condition = get_object_or_404(MedicalCondition, id = id)
    serializer = MedicalConditionSerializer(medical_condition, data = request.data, partial = True)
    
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
def delete_medical_condition(request, id):
    medical_condition = get_object_or_404(MedicalCondition, id = id)
    medical_condition.delete()
    
    return Response(status=status.HTTP_204_NO_CONTENT)




# Surgery Views
@api_view(['POST'])
def create_surgery(request):
    patient = get_object_or_404(Patient, id = request.data['patient'])
    serializer = SurgerySerializer(data = request.data)
    
    if serializer.is_valid(raise_exception=True):
        serializer.save(patient = patient)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_surgery(request, patient_id):
    surgery = get_list_or_404(Surgery, patient_id = patient_id)
    
    return Response(SurgerySerializer(surgery, many=True).data, status=status.HTTP_200_OK)


@api_view(['PATCH'])
def update_surgery(request, id):
    surgery = get_object_or_404(Surgery, id = id)
    serializer = SurgerySerializer(surgery, data = request.data, partial = True)
    
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
def delete_surgery(request, id):
    surgery = get_object_or_404(Surgery, id = id)
    surgery.delete()
    
    return Response(status=status.HTTP_204_NO_CONTENT)