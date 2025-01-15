from django.urls import include, path
from .views import ProductList, ProductDetail

app_name="products"

urlpatterns = [
    path('', ProductList.as_view(), name='product'),
    path('<int:pk>/', ProductDetail.as_view())
]