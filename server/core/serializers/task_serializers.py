from rest_framework import serializers
from core.models import Task
from core.serializers.user_serializers import UserSerializer


class TaskDetailSerializer(serializers.ModelSerializer):
    assignee = UserSerializer()

    class Meta:
        model = Task
        fields = '__all__'


class TaskCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [field.name for field in Task._meta.get_fields() if field.name not in ('project', 'id')]
