from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.pagination import LimitOffsetPagination

from authentication.permissions import IsProjectOwner
from core.models import Project
from core.serializers import CreateProjectSerializer, ProjectDetailsSerializer


class ListCreateUserProjectView(generics.ListCreateAPIView):
    """View for creating a project or listing all projects under the authenticate user """

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = LimitOffsetPagination

    def get_serializer_class(self):
        method = self.request.method
        return CreateProjectSerializer if method == 'POST' else ProjectDetailsSerializer

    def get_queryset(self):
        return Project.objects.filter(owner=self.request.user)


class RetrieveUpdateDestroyProjectView(generics.RetrieveUpdateDestroyAPIView):
    """View for retrieving, updating or removing a specific project. Only OWNER can perform these actions"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsProjectOwner]

    def get_serializer_class(self):
        method = self.request.method
        return CreateProjectSerializer if method == 'PUT' else ProjectDetailsSerializer

    def get_queryset(self):
        return Project.objects.filter(owner=self.request.user)
