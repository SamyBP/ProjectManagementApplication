from rest_framework import serializers
from core.models import Task
from core.serializers.user_serializers import UserSerializer
from core.serializers.utils import BaseModelSerializer


class TaskDetailSerializer(BaseModelSerializer):
    assignee = UserSerializer()

    class Meta:
        model = Task
        fields = '__all__'


class TaskCreationSerializer(BaseModelSerializer):
    class Meta:
        model = Task
        fields = [field.name for field in Task._meta.get_fields() if field.name not in ('project', 'id')]


class TaskUpdateSerializer(BaseModelSerializer):
    class Meta:
        model = Task
        fields = ['assignee', 'status']


class TaskStatisticsSerializer(serializers.Serializer):
    low = serializers.IntegerField()
    medium = serializers.IntegerField()
    high = serializers.IntegerField()
