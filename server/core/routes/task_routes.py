from django.shortcuts import get_object_or_404
from rest_framework.request import Request
from rest_framework.response import Response

from core.models import Task
from core.routes.utils import BaseController
from core.serializers import TaskDetailSerializer, TaskCreationSerializer, TaskUpdateSerializer, WorkLogResponseSerializer, WorkLogRequestSerializer
from decorators import paginated, response


class BaseTaskController(BaseController):

    @paginated(serializer_class=TaskDetailSerializer)
    def get(self, request: Request, project_id: int):
        tasks = Task.objects.filter(project_id=project_id)
        return tasks

    @response(serializer_class=TaskDetailSerializer, status_code=201)
    def post(self, request: Request, project_id: int):
        serializer = TaskCreationSerializer(data=request.data, context={'request': request})
        return self.save(serializer, project_id=project_id)


class DetailedTaskController(BaseController):

    @response(serializer_class=TaskDetailSerializer)
    def get(self, request: Request, project_id: int, task_id: int):
        return get_object_or_404(Task, id=task_id)

    @response(serializer_class=TaskDetailSerializer)
    def put(self, request: Request, project_id: int, task_id: int):
        task_to_update = get_object_or_404(Task, id=task_id)
        serializer = TaskUpdateSerializer(task_to_update, data=request.data)
        return self.save(serializer)

    def delete(self, request: Request, project_id: int, task_id: int):
        task_to_delete = get_object_or_404(Task, id=task_id)
        task_to_delete.delete()
        return Response(status=204)


class TaskWorkLogController(BaseController):
    
    @response(serializer_class=WorkLogResponseSerializer, status_code=201)
    def post(self, request: Request, project_id: int, task_id: int):
        task = get_object_or_404(Task, id=task_id, project_id=project_id)
        serializer = WorkLogRequestSerializer(data=request.data, context={'request': request})
        return self.save(serializer, task=task)