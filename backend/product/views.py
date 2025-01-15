
from os import stat
from random import randint
from django.http import Http404
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from .serializer import ProductSerializer
from .models import Product
from rest_framework import generics,  status, mixins, permissions


# Create your views here.
class ProductList(generics.ListCreateAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (permissions.AllowAny,)

    
    def get(self, request, *args, **kwargs):
        
        return self.list(request, *args, **kwargs)
        


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        if (serializer.is_valid()):
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ProductDetail(generics.RetrieveUpdateDestroyAPIView):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (permissions.AllowAny,)

    def retrieve(self, request, *args, **kwargs):
        id = self.kwargs.get('pk')
        product = Product.objects.get(pk=kwargs['pk'])
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    

        
# class ProductDetail(generics.RetrieveUpdateDestroyAPIView):

#     permission_classes = (IsAuthenticated,)

#     def get_object(self, id):
#         try:
#             return Product.objects.get(id=id)
#         except Product.DoesNotExist:
#             raise Http404

#     def get(self, request, id):
#         product = self.get_object(id)
#         serializer = ProductSerializer(product)
#         return Response(serializer.data)

    
 
