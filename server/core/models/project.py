from django.db import models
from django.contrib.auth.models import User


class Project(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owned_projects")
    contributors = models.ManyToManyField(User, related_name="contributed_projects", blank=True)
    name = models.TextField(unique=True, help_text='Required')
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
