from django.shortcuts import render
from rest_framework import generics,  status, serializers
from .serializer import SaleSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Sale
from product.models import Product
# Create your views here.
class SaleList(generics.ListCreateAPIView):

    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    #permission_classes = (IsAuthenticated,)

    def getSales(self, request):
       
        queryset = self.get_queryset()
        serializer = SaleSerializer(queryset, many = True)
        return Response(serializer.data)


    def addSale(self, request):
        serializer = SaleSerializer(data = request.data)
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SaleDetail(generics.RetrieveUpdateDestroyAPIView):

    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    permission_classes = (IsAuthenticated,)

    def retrieve(self, request, *args, **kwargs):
        id = self.kwargs.get('id')
        sale = Sale.objects.get(id=kwargs['id'])
        serializer = SaleSerializer(sale)
        return Response(serializer.data)

# class SaleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Sale
#         fields = '__all__'

class SalesView(generics.ListCreateAPIView):
    model = Sale
    serializer_class = SaleSerializer
    #  permission_classes = [IsAuthenticated]


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        if serializer.is_valid():
            for obj in serializer.data[:]:
                product = Product.objects.get(id=obj['product'])
                print(product)
                product.available_units -= obj['NumberOfProducts']
                product.save()
                # obj['TotalIncome'] = product.sell_price * obj['NumberOfProducts']
                # obj['Taxes'] = product.tax_percentage
            saved_list = serializer.save()
            
            for obj in saved_list:
                obj.TotalIncome = obj.product.sell_price * obj.NumberOfProducts
                obj.Taxes = obj.product.tax_percentage
                obj.save()
                print(obj)

            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED,
                            headers=headers)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
