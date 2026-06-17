from django.urls import path
from . import views

urlpatterns = [
    path('auth/create/', views.create_user, name='Item-List'),
    path('auth/login/', views.login_user, name='Item-List'),
    path('auth/login-out/', views.logout_user, name='Item-List'),
    path('auth/me/', views.me, name='API-Me'),
    path('auth/get-profile/<int:id>', views.get_profile, name="Get-profile"),
    path('auth/set-profile/<int:id>', views.set_profile, name="Set-profile"),
    path('auth/get-request-list/', views.get_unverified_list, name=""),
    path('auth/approve-role-request/', views.approve_role_request, name=""),
]