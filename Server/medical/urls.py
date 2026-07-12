from django.urls import path
from . import views

urlpatterns = [
    path('record/create/', views.create_medical_record, name="Create-Medical-Record"),
    path('record/update/<int:id>', views.update_medical_record, name="Update-Medical-Record"),
    path('record/get/patient/<int:id>', views.get_medical_records_by_patient, name="Get-Medical-Records-By-Patient"),
    path('record/get/<int:id>', views.get_medical_record_by_id, name="Get-Medical-Record"),
    
    path('life-style-habit/get/<int:patient_id>', views.get_life_style_habits, name="Get-Life-Style-Habit"),
    path('life-style-habit/create/', views.create_life_style_habits, name="Create-Life-Style-Habit"),
    path('life-style-habit/update/<int:id>', views.update_life_style_habit, name="Update-Life-Style-Habit"),
    path('life-style-habit/delete/<int:id>', views.delete_life_style_habit, name="Delete-Life-Style-Habit"),
    
    path('allergy/get/<int:patient_id>', views.get_allergys, name="Get-Allergy"),
    path('allergy/create/', views.create_allergy, name="Create-Allergy"),
    path('allergy/update/<int:id>', views.update_allergy, name="Update-Allergy"),
    path('allergy/delete/<int:id>', views.delete_allergy, name="Delete-Allergy"),
    
    path('condition/get/<int:patient_id>', views.get_medical_conditions, name="Get-Medical-Condition"),
    path('condition/create/', views.create_medical_condition, name="Create-Medical-Condition"),
    path('condition/update/<int:id>', views.update_medical_condition, name="Update-Medical-Condition"),
    path('condition/delete/<int:id>', views.delete_medical_condition, name="Delete-Medical-Condition"),
    
    path('surgery/get/<int:patient_id>', views.get_surgery, name="Get-Surgery"),
    path('surgery/create/', views.create_surgery, name="Create-Surgery"),
    path('surgery/update/<int:id>', views.update_surgery, name="Update-Surgery"),
    path('surgery/delete/<int:id>', views.delete_surgery, name="Delete-Surgery")
]