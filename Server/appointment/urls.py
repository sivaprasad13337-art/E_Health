from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_appointment, name="Create-Appointment"),
    path('get-all/', views.get_appointments, name="Get-Appointments"),
    path('get/<int:id>', views.get_appointment_by_id, name="Get-Appointment-By-Id"),
    path('get/apt-code/<str:apt_code>', views.get_appointment_by_code, name="Get-Appointment-By-Code"),
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
    path('medical-report/create/', views.create_medical_report, name="Get-Medical-Report"),
    path('medical-report/parse/', views.parse, name="Parse-Medical-Report"),
    
    path('life-style-habit/get/<int:patient_id>', views.get_life_style_habits, name="Get-Life-Style-Habit"),
    path('life-style-habit/create/', views.create_life_style_habits, name="Create-Life-Style-Habit"),
    path('life-style-habit/update/<int:id>', views.update_life_style_habit, name="Update-Life-Style-Habit"),
    path('life-style-habit/delete/<int:id>', views.delete_life_style_habit, name="Delete-Life-Style-Habit"),
    
    path('allergy/get/<int:patient_id>', views.get_allergys, name="Get-Allergy"),
    path('allergy/create/', views.create_allergy, name="Create-Allergy"),
    path('allergy/update/<int:id>', views.update_allergy, name="Update-Allergy"),
    path('allergy/delete/<int:id>', views.delete_allergy, name="Delete-Allergy"),
    
    path('medical-condition/get/<int:patient_id>', views.get_medical_conditions, name="Get-Medical-Condition"),
    path('medical-condition/create/', views.create_medical_condition, name="Create-Medical-Condition"),
    path('medical-condition/update/<int:id>', views.update_medical_condition, name="Update-Medical-Condition"),
    path('medical-condition/delete/<int:id>', views.delete_medical_condition, name="Delete-Medical-Condition"),
    
    path('surgery/get/<int:patient_id>', views.get_surgery, name="Get-Surgery"),
    path('surgery/create/', views.create_surgery, name="Create-Surgery"),
    path('surgery/update/<int:id>', views.update_surgery, name="Update-Surgery"),
    path('surgery/delete/<int:id>', views.delete_surgery, name="Delete-Surgery")
]