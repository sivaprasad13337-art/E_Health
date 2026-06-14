from django.shortcuts import get_object_or_404, get_list_or_404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from hospital.models import Patient, Doctor
from hospital.serializers import PatientSerializer, DoctorSerializer
from .serializer import AppointmentSerializer, MedicalRecordSerializer, MedicalReportSerializer
from .models import Appointment, MedicalRecord, MedicalReport
from utils.utils import get_doc_and_patient, generate_numeric_code
import traceback

from rest_framework.authentication import SessionAuthentication

class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return  # skip CSRF

# Create your views here.
# Appointment views
# @csrf_exempt

@api_view(['POST'])
@authentication_classes([CsrfExemptSessionAuthentication])
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
    MedicalRecord.objects.delete(id = id)
    
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
    
    if serializer.is_valid():
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