import pytest
from django.urls import reverse
from rest_framework.test import APIClient

from constants import Endpoints
from .conftest import CreateProjectRequest
from ..models import Project


def test_whenCreateProject_noToken_returnsUnauthorized(api_client: APIClient):
    body = CreateProjectRequest(name="test", description="test")
    url = reverse(Endpoints.PROJECT_BASE)

    response = api_client.post(url, data=body.__dict__)

    assert response.status_code == 401


@pytest.mark.django_db
def test_whenCreateProject_bodyWithBlankValues_returnsBadRequest(auth_client):
    body = CreateProjectRequest(name="", description="")
    url = reverse(Endpoints.PROJECT_BASE)

    response = auth_client.post(url, data=body.__dict__)

    assert response.status_code == 400


@pytest.mark.django_db
def test_whenCreateProject_wrongBodyFormat_returnsBadRequest(auth_client):
    body = {"unexpected": "value"}
    url = reverse(Endpoints.PROJECT_BASE)

    response = auth_client.post(url, data=body)

    assert response.status_code == 400


@pytest.mark.django_db
def test_whenCreateProject_projectNameAlreadyExists_returnsBadRequest(auth_client, project):
    body = CreateProjectRequest(name="test-project", description="description")
    url = reverse(Endpoints.PROJECT_BASE)

    response = auth_client.post(url, data=body.__dict__)

    assert response.status_code == 400


@pytest.mark.django_db
def test_whenCreateProject_validData_returnsCreated(auth_client, user):
    body = CreateProjectRequest(name="NewTestProject", description="This is valid, returns 200")
    url = reverse(Endpoints.PROJECT_BASE)

    response = auth_client.post(url, data=body.__dict__)

    assert response.status_code == 201
    assert response.data['name'] == f"{user.username}/NewTestProject"
    assert response.data['description'] == "This is valid, returns 200"


@pytest.mark.django_db
def test_whenGetProjects_noToken_returnsUnauthorized(api_client):
    url = reverse(Endpoints.PROJECT_BASE)

    response = api_client.get(url)

    assert response.status_code == 401


@pytest.mark.django_db
def test_whenGetProjects_returnsOKResponseIsPaginated(auth_client, user):
    projects = [Project(owner=user, name=f'{user.username}/{i}', description=str(i)) for i in range(10)]
    Project.objects.bulk_create(projects)
    url = reverse(Endpoints.PROJECT_BASE)

    response = auth_client.get(url)

    assert response.status_code == 200
    assert "count" in response.data
    assert response.data['count'] == 10
    assert len(response.data['results']) == 5

