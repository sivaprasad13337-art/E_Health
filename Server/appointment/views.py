from django.shortcuts import get_object_or_404, get_list_or_404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.decorators import api_view, permission_classes, authentication_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from hospital.models import Patient, Doctor
from hospital.serializers import PatientSerializer, DoctorSerializer
from .serializer import AppointmentSerializer, MedicalReportSerializer
from .models import Appointment, MedicalReport, AppointmentReport, ImagingReport, LabReport, SurgeryReport
from utils.utils import get_doc_and_patient, generate_numeric_code, is_owner_or_admin, is_owner_or_admin_or_doctor, is_owner_or_RoleAdmin_or_RoleDoctor, IsRoleAdmin
from utils.parse import parse_lab_report

from .serializer import (
    AppointmentReportSerializer,
    LabReportSerializer,
    ImagingReportSerializer,
    SurgeryReportSerializer,
)


REPORT_SERIALIZERS = {
    "Cardiology": AppointmentReportSerializer,
    "Neurology": AppointmentReportSerializer,
    "Pulmonology": AppointmentReportSerializer,
    "Orthopedics": AppointmentReportSerializer,
    "Dermatology": AppointmentReportSerializer,
    "Lab": LabReportSerializer,
    "Imaging": ImagingReportSerializer,
    "Surgical": SurgeryReportSerializer,
}


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_appointment(request):
    patient, doctor = get_doc_and_patient(request)
    
    serializer = AppointmentSerializer(data = request.data)
    
    if serializer.is_valid():
        print('valid')
        appointment_code = generate_numeric_code(prefix='APT-', length=6)
        serializer.save(patient = patient, doctor = doctor, appointment_code = appointment_code)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    print(serializer.errors)
    return Response(serializer.error_messages, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_appointment(request, id):
    appointment = get_object_or_404(Appointment, id = id)
    
    is_owner_or_admin_or_doctor(request, appointment.patient, appointment.doctor)
    serializer = AppointmentSerializer(appointment, data=request.data, partial = True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response({"Message": "Updated", "data": serializer.data}, status=status.HTTP_200_OK)
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_appointment_by_id(request,id):
    appointment = get_object_or_404(Appointment, id = id)
    data = AppointmentSerializer(appointment).data
    return Response(data, status=status.HTTP_200_OK)

    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_appointment_by_code(request, apt_code):
    appointment = get_object_or_404(Appointment, appointment_code = apt_code)
    data = AppointmentSerializer(appointment).data
    return Response(data, status=status.HTTP_200_OK)
    


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsRoleAdmin])
def get_appointments(request):
    appointments = Appointment.objects.all().order_by("-id")
    data = AppointmentSerializer(appointments, many = True).data
    return Response(data, status=status.HTTP_200_OK)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_appointments_by_patient(request, id):
    patient = get_object_or_404(Patient, id = id)
    is_owner_or_admin(request, patient)
    
    appointments = get_list_or_404(Appointment.objects.filter(patient_id=id).order_by("-date"))
    data = AppointmentSerializer(appointments, many = True).data
    return Response(data, status=status.HTTP_200_OK)
    
 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_appointments_by_doctor(request, id):
    doctor = get_object_or_404(Doctor, id = id)
    is_owner_or_admin(request, doctor)
    
    appointments = get_list_or_404(Appointment.objects.filter(doctor_id=id).order_by("-date"))
    data = AppointmentSerializer(appointments, many = True).data
    return Response(data, status=status.HTTP_200_OK)
   
    
    
    
# # Medical Record Views
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_medical_record(request):
#     data = request.data
#     patient, doctor = get_doc_and_patient(request)
#     print(f"{patient}, {doctor}")
    
#     serializer = MedicalRecordSerializer(data = data)
    
#     if serializer.is_valid():
#         # serializer.doctor = doctor
#         # serializer.patient = patient
#         medical_record = serializer.save(doctor=doctor, patient=patient)
        
#         return Response({"data": MedicalRecordSerializer(medical_record).data}, status=status.HTTP_201_CREATED)
    
#     return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_medical_records_by_patient(request, id):
#     patient = get_object_or_404(Patient, id = id)
#     is_owner_or_RoleAdmin_or_RoleDoctor(request, patient)
    
#     medical_records = get_list_or_404(MedicalRecord, patient_id = id)
#     data = MedicalRecordSerializer(medical_records, many = True).data
#     return Response(data, status=status.HTTP_200_OK)
    
    
    
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_medical_record_by_id(request, id):   
#     medical_record = get_object_or_404(MedicalRecord, id = id)
#     is_owner_or_RoleAdmin_or_RoleDoctor(request, medical_record.patient)
#     data = MedicalRecordSerializer(medical_record).data
#     return Response(data, status=status.HTTP_200_OK)


# @api_view(['PATCH'])
# @permission_classes([IsAuthenticated])
# def update_medical_record(request, id):
#     data = request.data
    
#     medical_record = get_object_or_404(MedicalRecord, id = id)
#     is_owner_or_admin(request, medical_record.patient)
#     serializer = MedicalRecordSerializer(medical_record, data=data)
    
#     if serializer.is_valid():
#         serializer.save()
        
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
#     return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# def delete_medical_record(request, id):
#     medical_record = get_object_or_404(MedicalRecord, id = id)
#     is_owner_or_admin(request, medical_record.patient)
#     medical_record.delete()
#     return Response(status=status.HTTP_204_NO_CONTENT)
    
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
# @api_view(['POST'])
# def create_medical_report(request):
#     data = request.data
#     patient, doctor = get_doc_and_patient(request)
#     appointment = get_object_or_404(Appointment, id = request.data.get('appointment_id'))
#     serializer = MedicalReportSerializer(data=data)
    
#     if serializer.is_valid():
#         serializer.save(patient=patient, doctor=doctor, appointment=appointment)
        
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
#     return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# @api_view(['Get'])
# def get_medical_report_by_id(request, id):
#     try:
#         medical_report = get_object_or_404(MedicalReport, id = id)
#         data = MedicalReportSerializer(medical_report).data
#         return Response(data, status=status.HTTP_200_OK)
#     except Exception as e:
#         traceback.print_exc()
#         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
# @api_view(['Get'])
# def get_medical_reports_by_patient(request, id):
#     try:
#         medical_reports = get_list_or_404(MedicalReport, id = id)
#         data = MedicalReportSerializer(medical_reports, many = True).data
#         return Response(data, status=status.HTTP_200_OK)
#     except Exception as e:
#         traceback.print_exc()
#         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

# @api_view(['PATCH'])
# def update_medical_report(request, id):
#     data = request.data
#     medical_report = get_object_or_404(MedicalReport, id = id)
#     serializer = MedicalReportSerializer(medical_report, data=data)
    
#     if serializer.is_valid(raise_exception=True):
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
#     return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
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
@permission_classes([IsAuthenticated])
def parse(request):
    file = request.FILES.get('pdf')
    
    if file:
        report = parse_lab_report(pdf=file)
        return Response(report, status=status.HTTP_200_OK)
    
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_medical_report(request):

    report_type = request.data.get("type")
    # doctor = get_object_or_404(Doctor, id = request.data["doctor"][0])
    appointment = get_object_or_404(Appointment, id = request.data["appointment"])
    print(request.data)

    serializer_class = REPORT_SERIALIZERS.get(report_type)

    if serializer_class is None:
        return Response(
            {"error": "Invalid report type"},
            status=status.HTTP_400_BAD_REQUEST
        )

    serializer = serializer_class(data=request.data)

    if serializer.is_valid():
        print(serializer.validated_data)
        serializer.save(appointment = appointment, doctor = request.data["doctor"])
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_medical_report(request, report_type, pk):

    serializer_class = REPORT_SERIALIZERS.get(report_type)

    if serializer_class is None:
        return Response(
            {"error": "Invalid report type"},
            status=status.HTTP_400_BAD_REQUEST
        )

    report = serializer_class.Meta.model.objects.get(pk=pk)
    is_owner_or_admin(request, report.patient)

    serializer = serializer_class(
        report,
        data=request.data,
        partial=True
    )
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_medical_reports(request, report_type, id):

    serializer_class = REPORT_SERIALIZERS.get(report_type)

    if serializer_class is None:
        return Response(
            {"error": "Invalid report type"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    reports = (serializer_class.Meta.model.objects.filter(type=report_type, patient_id = id).order_by("-created_at"))

    serializer = serializer_class(reports, many=True)

    return Response(serializer.data)



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_medical_report_by_id(request, report_type, id):

    serializer_class = REPORT_SERIALIZERS.get(report_type)

    if serializer_class is None:
        return Response(
            {"error": "Invalid report type"},
            status=status.HTTP_400_BAD_REQUEST
        )

    report = serializer_class.Meta.model.objects.get(id = id)

    serializer = serializer_class(report)

    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_medical_reports_by_patient(request, id):
    
    patient = get_object_or_404(Patient, id = id)
    is_owner_or_RoleAdmin_or_RoleDoctor(request, patient)
    
    data = []

    appointment_reports = AppointmentReport.objects.filter(patient_id=id)
    lab_reports = LabReport.objects.filter(patient_id=id)
    imaging_reports = ImagingReport.objects.filter(patient_id=id)
    surgery_reports = SurgeryReport.objects.filter(patient_id=id)

    data.extend(AppointmentReportSerializer(appointment_reports, many=True).data)
    data.extend(LabReportSerializer(lab_reports, many=True).data)
    data.extend(ImagingReportSerializer(imaging_reports, many=True).data)
    data.extend(SurgeryReportSerializer(surgery_reports, many=True).data)

    return Response(data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_medical_reports_by_appointment(request, id):
    
    appointment = get_object_or_404(Appointment, id = id)
    is_owner_or_RoleAdmin_or_RoleDoctor(request, appointment.patient)
    
    data = []
# for serializer_class in REPORT_SERIALIZERS.values():
#         reports = serializer_class.Meta.model.objects.filter(appointment_id=id)
#         serializer = serializer_class(reports, many=True)
#         data.extend(serializer.data)

#     return Response(data)
    appointment_reports = AppointmentReport.objects.filter(appointment_id=id)
    lab_reports = LabReport.objects.filter(appointment_id=id)
    imaging_reports = ImagingReport.objects.filter(appointment_id=id)
    surgery_reports = SurgeryReport.objects.filter(appointment_id=id)

    data.extend(AppointmentReportSerializer(appointment_reports, many=True).data)
    data.extend(LabReportSerializer(lab_reports, many=True).data)
    data.extend(ImagingReportSerializer(imaging_reports, many=True).data)
    data.extend(SurgeryReportSerializer(surgery_reports, many=True).data)

    return Response(data)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_medical_report(request, report_type, pk):

    serializer_class = REPORT_SERIALIZERS.get(report_type)

    if serializer_class is None:
        return Response(
            {"error": "Invalid report type"},
            status=status.HTTP_400_BAD_REQUEST
        )

    report = serializer_class.Meta.model.objects.get(pk=pk)
    is_owner_or_admin(request, report.patient)
    report.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)

# # LifeStyle Views

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_life_style_habits(request):
#     patient = get_object_or_404(Patient, id = request.data['patient'])
#     serializer = LifeStyleHabitSerializer(data = request.data)
    
#     if serializer.is_valid(raise_exception=True):
#         serializer.save(patient = patient)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_life_style_habits(request, patient_id):
#     life_style_habits = get_object_or_404(LifeStyleHabit, patient_id = patient_id)
#     is_owner_or_RoleAdmin_or_RoleDoctor(request, life_style_habits.patient)
    
#     return Response(LifeStyleHabitSerializer(life_style_habits).data, status=status.HTTP_200_OK)


# @api_view(['PATCH'])
# @permission_classes([IsAuthenticated])
# def update_life_style_habit(request, id):
#     life_style_habit = get_object_or_404(LifeStyleHabit, patient_id = id)
#     is_owner_or_admin(request, life_style_habit.patient)
#     serializer = LifeStyleHabitSerializer(life_style_habit, data = request.data, partial = True)
    
#     if serializer.is_valid(raise_exception=True):
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_200_OK)


# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# def delete_life_style_habit(request, id):
#     life_style_habit = get_object_or_404(LifeStyleHabit, id = id)
#     is_owner_or_admin(request, life_style_habit.patient)
#     life_style_habit.delete()
    
#     return Response(status=status.HTTP_204_NO_CONTENT)



# # Allergy Views
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_allergy(request):
#     patient = get_object_or_404(Patient, id = request.data['patient'])
#     serializer = AllergySerializer(data = request.data)
    
#     if serializer.is_valid(raise_exception=True):
#         serializer.save(patient = patient)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_allergys(request, patient_id):
#     allergy = get_list_or_404(Allergy, patient_id = patient_id)
    
#     return Response(AllergySerializer(allergy, many=True).data, status=status.HTTP_200_OK)


# @api_view(['PATCH'])
# @permission_classes([IsAuthenticated])
# def update_allergy(request, id):
#     allergy = get_object_or_404(Allergy, id = id)
#     serializer = AllergySerializer(allergy, data = request.data, partial = True)
    
#     if serializer.is_valid(raise_exception=True):
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_200_OK)


# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# def delete_allergy(request, id):
#     allergy = get_object_or_404(Allergy, id = id)
#     allergy.delete()
    
#     return Response(status=status.HTTP_204_NO_CONTENT)




# # MedicalCondition Views
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_medical_condition(request):
#     patient = get_object_or_404(Patient, id = request.data['patient'])
#     serializer = MedicalConditionSerializer(data = request.data)
    
#     if serializer.is_valid(raise_exception=True):
#         serializer.save(patient = patient)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_medical_conditions(request, patient_id):
#     medical_condition = get_list_or_404(MedicalCondition, patient_id = patient_id)
    
#     return Response(MedicalConditionSerializer(medical_condition, many=True).data, status=status.HTTP_200_OK)


# @api_view(['PATCH'])
# @permission_classes([IsAuthenticated])
# def update_medical_condition(request, id):
#     medical_condition = get_object_or_404(MedicalCondition, id = id)
#     serializer = MedicalConditionSerializer(medical_condition, data = request.data, partial = True)
    
#     if serializer.is_valid(raise_exception=True):
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_200_OK)


# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# def delete_medical_condition(request, id):
#     medical_condition = get_object_or_404(MedicalCondition, id = id)
#     medical_condition.delete()
    
#     return Response(status=status.HTTP_204_NO_CONTENT)




# # Surgery Views
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_surgery(request):
#     patient = get_object_or_404(Patient, id = request.data['patient'])
#     serializer = SurgerySerializer(data = request.data)
    
#     if serializer.is_valid(raise_exception=True):
#         serializer.save(patient = patient)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_surgery(request, patient_id):
#     surgery = get_list_or_404(Surgery, patient_id = patient_id)
    
#     return Response(SurgerySerializer(surgery, many=True).data, status=status.HTTP_200_OK)


# @api_view(['PATCH'])
# @permission_classes([IsAuthenticated])
# def update_surgery(request, id):
#     surgery = get_object_or_404(Surgery, id = id)
#     serializer = SurgerySerializer(surgery, data = request.data, partial = True)
    
#     if serializer.is_valid(raise_exception=True):
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_200_OK)


# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# def delete_surgery(request, id):
#     surgery = get_object_or_404(Surgery, id = id)
#     surgery.delete()
    
#     return Response(status=status.HTTP_204_NO_CONTENT)