import enum

from django.contrib.auth.models import User
from django.db import models
from django.db.models import CheckConstraint, Q
from django.db.models.functions import Now

from core.models import Project


class TaskStatus(enum.Enum):
    ASSIGNED = 'ASSIGNED'
    IN_PROGRESS = 'IN_PROGRESS'
    FINISHED = 'FINISHED'
    CLOSED = 'CLOSED'

    @classmethod
    def choices(cls):
        return [(x.value, x.name) for x in cls]

    @classmethod
    def values(cls):
        return [x.value for x in cls]


class TaskPriority(enum.Enum):
    LOW = 'LOW'
    MEDIUM = 'MEDIUM'
    HIGH = 'HIGH'

    @classmethod
    def choices(cls):
        return [(x.value, x.name) for x in cls]

    @classmethod
    def values(cls):
        return [x.value for x in cls]


class Task(models.Model):
    assignee = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    title = models.TextField()
    description = models.TextField()
    status = models.CharField(choices=TaskStatus.choices, default=TaskStatus.ASSIGNED)
    priority = models.CharField(choices=TaskPriority.choices, blank=False)
    deadline = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            CheckConstraint(
                check=Q(status__in=TaskStatus.values()),
                name='task_status_check'
            ),
            CheckConstraint(
                check=Q(priority__in=TaskPriority.values()),
                name='task_priority_check'
            ),
            CheckConstraint(
                check=Q(deadline__gte=Now()),
                name='task_deadline_check'
            )
        ]
