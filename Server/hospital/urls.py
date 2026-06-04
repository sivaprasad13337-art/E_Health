from django.urls import path
from . import views

urlpatterns = [
    path('patient/get/<int:id>', views.get_patient, name="Get-Patient"),
    path('patient/update/<int:id>', views.update_patient, name="Update-Patient"),
    
    path('doctor/get/<int:id>', views.get_doctor, name="Get-Doctor"),
    path('doctor/update/<int:id>', views.update_doctor, name="Update-Doctor"),
    path('doctor/delete/<int:id>', views.delete_doctor, name="Update-Doctor"),
    
    path('specialization/create/', views.create_specialization, name="Create-Specialization"),
    path('specializations/get/', views.get_specializations, name="Get-Specialization"),
    path('specialization/update/<int:id>', views.update_specialization, name="Update-Specialization"),
    path('specialization/delete/<int:id>', views.delete_specialization, name="Delete-Specialization"),
    
    path('department/create/', views.create_department, name="Create-Department"),
    path('department/get/', views.get_departments, name="Get-Department"),
    path('department/update/<int:id>', views.update_department, name="Update-Department"),
    path('department/delete/<int:id>', views.delete_department, name="Delete-Department"),
    
    path('test/create/', views.create_test, name="Create-Test"),
    path('test/get/', views.get_tests, name="Get-All-Test"),
    path('test/get/<int:id>', views.get_test, name="Get-Test"),
    path('test/update/<int:id>', views.update_test, name="Update-Test"),
    path('test/delete/<int:id>', views.delete_test, name="Delete-Test"),
]