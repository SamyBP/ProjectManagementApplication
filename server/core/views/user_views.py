from datetime import timedelta, datetime

from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK
from rest_framework_simplejwt.authentication import JWTAuthentication

from core.decorators import query_params
from core.models import Task, TaskPriority
from core.serializers import TaskDetailSerializer
from core.serializers.task_serializers import TaskStatisticsSerializer
from core.serializers.user_serializers import UserRegisterSerializer, UserSerializer


@swagger_auto_schema(
    method='post',
    operation_description="Register a new user",
    request_body=UserRegisterSerializer,
    responses={HTTP_200_OK: 'Successfully registered', HTTP_400_BAD_REQUEST: 'Invalid payload'}
)
@api_view(['POST'])
def register_user(request: Request) -> Response:
    print(request.data)
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


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@query_params('due_in')
def get_tasks_for_logged_user(request, due_in: str = None) -> Response:
    tasks = Task.objects.filter(assignee=request.user)

    if due_in:
        if int(due_in) < 0:
            return Response(data={'detail': f'param: due_in={due_in} should be a positive integer'}, status=400)
        start_date = datetime.now()
        end_date = datetime.now() + timedelta(days=int(due_in))
        tasks = tasks.filter(deadline__range=(start_date, end_date)).order_by('deadline')

    paginator = LimitOffsetPagination()
    paginated_queryset = paginator.paginate_queryset(tasks, request)
    serializer = TaskDetailSerializer(paginated_queryset, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_statistics_for_user(request: Request) -> Response:
    tasks = Task.objects.filter(assignee=request.user)

    stats = {
        'low': tasks.filter(priority=TaskPriority.LOW.value).count(),
        'medium': tasks.filter(priority=TaskPriority.MEDIUM.value).count(),
        'high': tasks.filter(priority=TaskPriority.HIGH.value).count()
    }

    serializer = TaskStatisticsSerializer(stats)
    return Response(serializer.data)
