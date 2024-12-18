from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK
from rest_framework_simplejwt.authentication import JWTAuthentication

from core.serializers.user_serializers import UserRegisterSerializer, UserSerializer


@swagger_auto_schema(
    method='post',
    operation_description="Register a new user",
    request_body=UserRegisterSerializer,
    responses={HTTP_200_OK: 'Successfully registered', HTTP_400_BAD_REQUEST: 'Invalid payload'}
)
@api_view(['POST'])
def register_user(request: Request) -> Response:
    serializer = UserRegisterSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    serializer.save()
    return Response(status=HTTP_200_OK)


@swagger_auto_schema(
    method='get',
    operation_description='Retrieve the details of the user making the request',
    responses={HTTP_200_OK: UserSerializer, 401: 'Authentication credentials were not provided.'}
)
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_user_details(request: Request) -> Response:
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data, status=HTTP_200_OK)
