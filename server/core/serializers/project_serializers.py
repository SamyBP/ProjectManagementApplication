from core.exceptions import ProjectNameAlreadyExistsException
from core.models import Project
from core.serializers.utils import BaseModelSerializer


class ProjectDetailsSerializer(BaseModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class CreateProjectSerializer(BaseModelSerializer):
    class Meta:
        model = Project
        fields = ['name', 'description']

    def validate(self, attrs):
        """Check user doesn't have a project with the same name"""

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
