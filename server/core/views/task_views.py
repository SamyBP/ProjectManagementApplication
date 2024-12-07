from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from authentication.permissions import IsProjectOwner
from core.models import Task
from core.serializers.task_serializers import TaskDetailSerializer


class ListTasksForProjectView(ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsProjectOwner]
    serializer_class = TaskDetailSerializer

    def get_queryset(self):
        project_id = self.kwargs['pk']
        return Task.objects.filter(project_id=project_id)


