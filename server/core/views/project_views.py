from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from authentication.permissions import IsProjectOwner
from core.models import Project
from core.serializers import CreateProjectSerializer, ProjectDetailsSerializer


def create_project(request: Request) -> Response:
    serializer = CreateProjectSerializer(context={'request': request}, data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, 400)
    serializer.save()
    return Response(serializer.data, 201)


def list_user_projects(request: Request) -> Response:
    projects = Project.objects.filter(owner=request.user)
    paginator = LimitOffsetPagination()
    paginated_queryset = paginator.paginate_queryset(projects, request)
    serializer = ProjectDetailsSerializer(paginated_queryset, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def project_handler(request: Request) -> Response:
    method = request.method
    return create_project(request) if method == 'POST' else list_user_projects(request)


def retrieve_project(request: Request, project_id: int) -> Response:
    project = get_object_or_404(Project, id=project_id, owner=request.user)
    serializer = ProjectDetailsSerializer(project)
    return Response(serializer.data, status=200)


def update_project(request: Request, project_id: int) -> Response:
    project = get_object_or_404(Project, id=project_id, owner=request.user)
    serializer = CreateProjectSerializer(project, data=request.data, context={'request': request})
    if not serializer.is_valid():
        return Response(serializer.errors, status=400)
    serializer.save()
    return Response(serializer.data, 200)


def delete_project(request: Request, project_id: int) -> Response:
    project = get_object_or_404(Project, id=project_id, owner=request.user)
    project.delete()
    return Response(status=204)


@api_view(['GET', 'PUT', 'DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated, IsProjectOwner])
def project_detail_handler(request: Request, project_id: int) -> Response:
    allowed_methods = {'GET': retrieve_project, 'PUT': update_project, 'DELETE': delete_project}
    action = allowed_methods[request.method]
    return action(request, project_id)
