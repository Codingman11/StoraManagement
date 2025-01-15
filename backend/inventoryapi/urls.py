"""inventoryapi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token 
from users.views import CustomUserView
from product.views import ProductList, ProductDetail
from sale.views import SalesView
from order.views import OrderView
from django.conf import settings
from django.conf.urls.static import static

from inventoryapi.inventory import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('hello/', views.HelloView.as_view(), name='Hello'),
    path('get-user-details/', CustomUserView.as_view(), name='test'),
    # path('get-user-role/', CustomUserView.getRole(), name='test1'),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),

    path('product/', include('product.urls')),
    path('sale/', include('sale.urls')),
    path('order/', include('order.urls')),
    path('sale-bulk/', SalesView.as_view(), name='sale'),
    path('order-bulk/', OrderView.as_view(), name='order'),
    # https://www.django-rest-framework.org/api-guide/authentication/ add additional elements to the token response
]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


