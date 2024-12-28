from django.contrib.auth.models import User
from rest_framework import serializers

from core.serializers.utils import snake_to_camel, camel_to_snake, BaseModelSerializer


class UserSerializer(BaseModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']


class UserRegisterSerializer(BaseModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
