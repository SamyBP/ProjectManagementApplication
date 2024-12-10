from django.db import models
from django.contrib.auth.models import User


class Project(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.TextField(unique=True, help_text='Required')
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
