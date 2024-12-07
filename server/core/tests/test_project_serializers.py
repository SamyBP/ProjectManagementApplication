from unittest.mock import Mock

import pytest

from core.exceptions import ProjectNameAlreadyExistsException
from core.serializers import CreateProjectSerializer
from .conftest import CreateProjectRequest


def mock_request_context(element) -> dict:
    request = Mock()
    request.user = element
    return {"request": request}


@pytest.mark.django_db
def test_whenCreateProjectSerializerValidate_nameAlreadyTaken_raisesProjectNameAlreadyExistsException(user, project):
    body = CreateProjectRequest(name="test-project", description="Some description")
    serializer = CreateProjectSerializer(context=mock_request_context(user))

    with pytest.raises(ProjectNameAlreadyExistsException) as exception:
        serializer.validate(body.__dict__)

    assert f"User: {user.username} already has a project with name: test-project" in str(exception.value)


@pytest.mark.django_db
def test_whenCreateProjectSerializerCreate_returnsCreatedProject(user):
    body = CreateProjectRequest(name="NewTestProject", description="TestProjectDescription")
    serializer = CreateProjectSerializer(context=mock_request_context(user))

    validated_data = serializer.validate(body.__dict__)
    created_project = serializer.create(validated_data)

    assert created_project.name == f"{user.username}/NewTestProject"
    assert created_project.description == "TestProjectDescription"
