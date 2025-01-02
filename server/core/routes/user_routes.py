from datetime import datetime, timedelta

from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.viewsets import ViewSet

from core.exceptions import BaseHttpException
from core.models import Task, TaskPriority
from core.routes.utils import BaseController
from core.serializers import TaskDetailSerializer
from core.serializers.task_serializers import TaskStatisticsSerializer
from core.serializers.user_serializers import UserRegisterSerializer, UserSerializer
from decorators import response, paginated, query_params


class UserController(ViewSet, BaseController):

    @action(detail=False, methods=['post'], permission_classes=[])
    @response(status_code=201)
    def register(self, request: Request):
        serializer = UserRegisterSerializer(data=request.data)
        self.save(serializer)

    @action(detail=False, methods=['get'])
    @response(serializer_class=UserSerializer)
    def me(self, request: Request):
        return request.user

    @action(detail=False, methods=['get'])
    @paginated(serializer_class=TaskDetailSerializer)
    @query_params('due_in')
    def tasks(self, request: Request, due_in: str = None):
        queryset = Task.objects.filter(assignee=request.user)

        if due_in:
            if int(due_in) < 0:
                raise BaseHttpException(status_code=400, details=f'param: due_in={due_in} should be a positive integer')
            start_date = datetime.now()
            end_date = start_date + timedelta(days=int(due_in))
            queryset = queryset.filter(deadline__range=(start_date, end_date)).order_by('deadline')

        return queryset

    @action(detail=False, methods=['get'])
    @response(serializer_class=TaskStatisticsSerializer)
    def stats(self, request: Request):
        tasks = Task.objects.filter(assignee=request.user)
        priorities = [(p.lower(), p) for p in TaskPriority.values()]
        return {p_low: tasks.filter(priority=p_upper).count() for p_low, p_upper in priorities}
