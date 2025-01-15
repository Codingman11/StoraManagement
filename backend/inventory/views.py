from django.shortcuts import render

# Create your views here.
# Testing HttpOnly cookie
from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.middleware.csrf import get_token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.core import serializers

@api_view(['POST'])
def get_csfr_token(request):
    username = request.data['username']
    password = request.data['password']
    user = authenticate(username=username, password=password)
    if user:
        print(user)
        login(request, user)
        serialized_obj = serializers.serialize('json',[user,])

        return Response({'message': 'User logged in','user' : serialized_obj}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def login_view(request):
    username = request.data['username']
    password = request.data['password']
    user = authenticate(username=username, password=password)
    if user:
        print(user)
        login(request, user)
        return Response({'message': 'User logged in','user' : user}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)