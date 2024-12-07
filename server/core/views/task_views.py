from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from authentication.permissions import IsProjectOwner
from core.models import Task
from core.serializers import TaskDetailSerializer, TaskCreationSerializer


class ListTasksForProjectView(ListCreateAPIView):
    """
        List all tasks or create a task under a specified project
        Takes the project id as a url parameter (name is pk)
    """

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsProjectOwner]

    def get_serializer_class(self):
        method = self.request.method
        return TaskDetailSerializer if method == 'GET' else TaskCreationSerializer

    def get_queryset(self):
        project_id = self.kwargs['pk']
        return Task.objects.filter(project_id=project_id)

    def perform_create(self, serializer):
        project_id = self.kwargs['pk']
        return serializer.save(project_id=project_id)
