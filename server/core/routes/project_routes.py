from django.shortcuts import get_object_or_404
from rest_framework.request import Request
from rest_framework.response import Response
from django.contrib.auth.models import User

from core.models import Project
from core.routes.utils import BaseController
from core.serializers import ProjectDetailsSerializer, CreateProjectSerializer
from decorators import paginated, response


class BaseProjectController(BaseController):

    @paginated(serializer_class=ProjectDetailsSerializer)
    def get(self, request: Request):
        projects = Project.objects.filter(owner=request.user)
        return projects

    @response(serializer_class=ProjectDetailsSerializer, status_code=201)
    def post(self, request: Request):
        serializer = CreateProjectSerializer(context={'request': request}, data=request.data)
        return self.save(serializer)


class DetailedProjectController(BaseController):

    @response(serializer_class=ProjectDetailsSerializer)
    def get(self, request: Request, project_id: int):
        return get_object_or_404(Project, id=project_id)

    @response(serializer_class=ProjectDetailsSerializer)
    def put(self, request: Request, project_id: int):
        project_to_update = get_object_or_404(Project, id=project_id)
        serializer = CreateProjectSerializer(project_to_update, data=request.data, context={'request': request})
        return self.save(serializer)

    def delete(self, request: Request, project_id: int):
        project_to_delete = get_object_or_404(Project, id=project_id)
        project_to_delete.delete()
        return Response(status=204)
    
class ProjectContributorController(BaseController):
    
    def post(self, request: Request, project_id: int):
        project = get_object_or_404(Project, id=project_id)
        contributors_ids = request.data.get('contributors')
        contributors = User.objects.filter(id__in=contributors_ids)
        project.contributors.add(*contributors)
        return Response(data={'message': f"added contributors to project: {project.name}"}, status=200)
