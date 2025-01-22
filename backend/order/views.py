from django.shortcuts import render
from rest_framework import generics,  status, serializers
from .serializer import OrderSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Order
from product.models import Product
# Create your views here.
class OrderList(generics.ListCreateAPIView):

    queryset = Order.objects.all()
    serializer_class = OrderSerializer(queryset, many=True)
    #permission_classes = (IsAuthenticated,)

    
    def getOrders(self, request):
       
        queryset = self.get_queryset()
        serializer = OrderSerializer(queryset, many = True)
        return Response(serializer.data)


    def addOrder(self, request):
        serializer = OrderSerializer(data = request.data)
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderDetail(generics.RetrieveUpdateDestroyAPIView):

    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)

    def retrieve(self, request, *args, **kwargs):
        id = self.kwargs.get('id')
        order = Order.objects.get(id=kwargs['id'])
        serializer = OrderSerializer(order)
        return Response(serializer.data)

class OrderView(generics.ListCreateAPIView):
    model = Order
    serializer_class = OrderSerializer
    # permission_classes = [IsAuthenticated]


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        if serializer.is_valid():
            for obj in serializer.data[:]:
                product = Product.objects.get(id=obj['product'])
                product.available_units += obj['NumberOfProducts']
                product.save()

            saved_list = serializer.save()
            
            for obj in saved_list:
                obj.TotalExpense = obj.product.cost_price * obj.NumberOfProducts
                obj.Taxes = obj.product.tax_percentage
                obj.save()
                print(obj)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED,
                            headers=headers)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)