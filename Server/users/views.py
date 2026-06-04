from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import FormParser, MultiPartParser
from django.contrib.auth import login, logout, authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from .models import User
from hospital.models import Doctor, Patient
from hospital.serializers import DoctorSerializer, PatientSerializer
from django.db import transaction
from utils.utils import delete_old_cloudinary_file, get_user_data, IsRoleAdmin

# Create your views here.

@api_view(['POST'])
@parser_classes([FormParser, MultiPartParser])
def create_user(request):
    data = request.data
    serializer = UserSerializer(data=data)
    
    if serializer.is_valid():
        user = serializer.save()
        response = {"Message": f"Hello {request.data.get('first_name')} {request.data.get('last_name')}!", "data": UserSerializer(user).data}
        
        return Response(response, status=status.HTTP_201_CREATED)
    
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_profile(request, id):
    user = get_object_or_404(User, id = id)
    # serializer = UserSerializer(data = user)

    data = get_user_data(user)
    return Response(data, status=status.HTTP_200_OK)


@api_view(['PATCH'])
@parser_classes([FormParser, MultiPartParser])
def set_profile(request, id):
    user = get_object_or_404(User, id = id)
    data = request.data
    
    profile_img = request.FILES.get('profile_img')
    print(profile_img)
    
    if profile_img:
        delete_old_cloudinary_file(user.profile_img, profile_img)
        
    serializer = UserSerializer(user ,data = data, partial = True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    
    user_data = get_user_data(user)
    print(user.profile_img.url)
    return Response(user_data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_unverified_list(request):
    list = get_list_or_404(User, is_verified = False)
    
    if list:
        return Response(UserSerializer(list, many=True).data, status=status.HTTP_200_OK)
    
    return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['PATCH'])
def approve_role_request(request, id):
    user = get_object_or_404(User, id = id)
    
    with transaction.atomic():
        if user:
            user.is_verified = True
            user.save()
        if user.role == 'DOCTOR':
            doctor = Doctor.objects.create(user = user)
            doctor.save()
            
            return Response({"Message": "Approved!"}, status=status.HTTP_200_OK)
    
    return Response({}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    



@api_view(['POST'])
def login_user(request):
    
    if request.user.is_authenticated():
        return Response({"Message": "User Already Loggedin Logout First"}, status=status.HTTP_400_BAD_REQUEST)
    
    username = request.data.get('username')
    password = request.data.get('password')
    
    user =  authenticate(request, username=username, password=password)
    
    if user is not None:
        login(user, request)
        return Response({"user": UserSerializer(user).data}, status=status.HTTP_200_OK)
    
    return Response({"error": "Invalid Credentials"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def logout_user(request):
    logout(request)
    return Response({"Message": "Logged out!"}, status=status.HTTP_200_OK)

