from django.db import models

from core.models import Task

class WorkLog(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    hours_worked = models.IntegerField(null=False)
    submitted_at = models.DateTimeField(auto_now_add=True)