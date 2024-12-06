from django.contrib import admin

from core.models import Project, Task


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'owner', 'created_at')
    list_filter = ('id', 'owner', 'created_at')
    ordering = ['-created_at']


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'assignee', 'project', 'title', 'description', 'status', 'priority', 'deadline')
    list_filter = ('priority', 'status', 'deadline')
    ordering = ['-created_at', '-deadline']
