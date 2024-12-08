import enum

from django.contrib.auth.models import User
from django.db import models
from django.db.models import CheckConstraint, Q
from django.db.models.functions import Now

from core.models import Project


class BaseChoice(enum.Enum):

    @classmethod
    def choices(cls):
        return [(x.value, x.name) for x in cls]

    @classmethod
    def values(cls):
        return [x.value for x in cls]


class TaskStatus(BaseChoice):
    ASSIGNED = 'ASSIGNED'
    IN_PROGRESS = 'IN_PROGRESS'
    FINISHED = 'FINISHED'
    CLOSED = 'CLOSED'


class TaskPriority(BaseChoice):
    LOW = 'LOW'
    MEDIUM = 'MEDIUM'
    HIGH = 'HIGH'


task_check_constrains = [
    (Q(status__in=TaskStatus.values()), 'task_status_check'),
    (Q(priority__in=TaskPriority.values()), 'task_priority_check'),
    (Q(deadline__gte=Now()), 'task_deadline_check')
]


class Task(models.Model):
    assignee = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    title = models.TextField(unique=True)
    description = models.TextField()
    status = models.CharField(choices=TaskStatus.choices, default=TaskStatus.ASSIGNED.value)
    priority = models.CharField(choices=TaskPriority.choices, blank=False)
    deadline = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [CheckConstraint(condition=x[0], name=x[1]) for x in task_check_constrains]
