from django.urls import include, path
from .views import SaleList, SaleDetail

app_name="sales"

urlpatterns = [
    path('', SaleList.as_view(), name='sale'),
    path('<int:id>/', SaleDetail.as_view())
]