from rest_framework import serializers
from core.models import Task
from core.serializers.user_serializers import UserSerializer


class TaskDetailSerializer(serializers.ModelSerializer):
    assignee = UserSerializer()

    class Meta:
        model = Task
        fields = '__all__'
