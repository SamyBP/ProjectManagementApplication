from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from core.exceptions import BaseHttpException


class BaseController(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def save(self, serializer):
        if not serializer.is_valid():
            raise BaseHttpException(details=serializer.errors, status_code=400)
        return serializer.save()
