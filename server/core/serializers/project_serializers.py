from rest_framework import serializers

from core.exceptions import InvalidRequestBodyException, ProjectNameAlreadyExistsException
from core.models import Project


class ProjectDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class CreateProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['name', 'description']

    def validate(self, attrs):
        """Check user doesn't have a project with the same name"""

        if len(attrs['name']) == 0 or len(attrs['description']) == 0:
            raise InvalidRequestBodyException("Values should not be empty in the response body")

        if attrs['name'].isspace() or attrs['description'].isspace():
            raise InvalidRequestBodyException("Values should not be all whitespace")

        user = self.context['request'].user
        formatted_name = f"{user.username}/{attrs['name']}"

        if Project.objects.filter(name=formatted_name).exists():
            raise ProjectNameAlreadyExistsException(user=user.username, name=attrs['name'])

        attrs['name'] = formatted_name
        return attrs

    def create(self, validated_data):
        """Create a new project with the authenticated user as owner"""

        user = self.context['request'].user
        validated_data['owner'] = user
        return Project.objects.create(**validated_data)
