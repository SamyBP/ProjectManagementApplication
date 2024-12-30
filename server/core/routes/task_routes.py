from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from authentication.permissions import IsProjectOwner
from core.models import Task
from core.serializers import TaskDetailSerializer, TaskCreationSerializer


def list_tasks_under_project(request: Request, project_id: int) -> Response:
    tasks = Task.objects.filter(project_id=project_id)
    paginator = LimitOffsetPagination()
    paginated_queryset = paginator.paginate_queryset(tasks, request)
    serializer = TaskDetailSerializer(paginated_queryset, many=True)
    return paginator.get_paginated_response(serializer.data)


def create_task(request: Request, project_id: int) -> Response:
    serializer = TaskCreationSerializer(data=request.data, context={'request': request})
    if not serializer.is_valid():
        return Response(serializer.errors, status=400)
    serializer.save(project_id=project_id)
    return Response(serializer.data, status=201)


@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated, IsProjectOwner])
def task_handler(request: Request, project_id: int) -> Response:
    method = request.method
    return list_tasks_under_project(request, project_id) if method == 'GET' else create_task(request, project_id)


def retrieve_task(request: Request, task_id: int) -> Response:
    task = get_object_or_404(Task, id=task_id)
    serializer = TaskDetailSerializer(task)
    return Response(serializer.data, status=200)


def update_task(request: Request, task_id: int) -> Response:
    task = get_object_or_404(Task, id=task_id)
    serializer = TaskCreationSerializer(task, data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=400)
    serializer.save()
    return Response(serializer.data, status=200)


def delete_task(request: Request, task_id: int) -> Response:
    task = get_object_or_404(Task, id=task_id)
    task.delete()
    return Response(status=204)


@api_view(['GET', 'PUT', 'DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated, IsProjectOwner])
def task_detail_handler(request: Request, project_id: int, task_id: int) -> Response:
    allowed_methods = {'GET': retrieve_task, 'PUT': update_task, 'DELETE': delete_task}
    action = allowed_methods[request.method]
    return action(request, task_id)
