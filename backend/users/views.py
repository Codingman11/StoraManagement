from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser

# https://simpleisbetterthancomplex.com/tutorial/2018/11/22/how-to-implement-token-authentication-using-django-rest-framework.html
class CustomUserView(APIView):
    # permission_classes = (IsAuthenticated,) 

    def get(self, request):
        name = request.GET.get('name','')
        user = CustomUser.objects.get(username=name)
        print(user)
        content = str(user)
        return Response(content)

    # def getRole(self, request):
    #     name = request.GET.get('name','')
    #     user = CustomUser.objects.get(username=name)
    
    #     content = user.role
    #     return Response(content)