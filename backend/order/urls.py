from django.urls import include, path
from .views import OrderList, OrderDetail

app_name="orders"

urlpatterns = [
    path('', OrderList.as_view(), name='order'),
    path('<int:id>/', OrderDetail.as_view())
]