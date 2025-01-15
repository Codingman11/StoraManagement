from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# https://simpleisbetterthancomplex.com/tutorial/2018/11/22/how-to-implement-token-authentication-using-django-rest-framework.html
class HelloView(APIView):
    permission_classes = (IsAuthenticated,) 

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)