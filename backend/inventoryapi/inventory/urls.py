from django.urls import path
from inventory.views import login_view, get_csfr_token

urlpatterns = [
    path('login/', login_view),
    path("csrf/", get_csfr_token)
]