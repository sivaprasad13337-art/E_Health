from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_appointment, name="Create-Appointment"),
    path('get-all/', views.get_appointments, name="Get-Appointments"),
    path('get/<int:id>', views.get_appointment_by_id, name="Get-Appointment-By-Id"),
    path('get/patient/<int:id>', views.get_appointments_by_patient, name="Get-Appointment-By-Patient"),
    path('get/doctor/<int:id>', views.get_appointments_by_doctor, name="Get-Appointment-By-Doctor"),
    path('update-status/<int:id>', views.update_appointment, name="Update_Appointment_Status"),
    
    path('medical-record/create/', views.create_medical_record, name="Create-Medical-Record"),
    path('medical-record/update/<int:id>', views.update_medical_record, name="Update-Medical-Record"),
    path('medical-record/get/patient/<int:id>', views.get_medical_records_by_patient, name="Get-Medical-Records-By-Patient"),
    path('medical-record/get/<int:id>', views.get_medical_record_by_id, name="Get-Medical-Record"),
    
    path('medical-report/create/', views.create_medical_report, name="Get-Medical-Report"),
    path('medical-report/get/<int:id>', views.get_medical_report_by_id, name="Get-Medical-Report"),
    path('medical-report/patient/get/<int:id>', views.get_medical_reports_by_patient, name="Get-Medical-Report-By-Patient"),
    path('medical-report/update/<int:id>', views.update_medical_report, name="Update-Medical-Report"),
]