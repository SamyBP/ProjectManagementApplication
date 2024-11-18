import pytest
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APIClient


@pytest.fixture
def api_client() -> APIClient:
    return APIClient()


@pytest.fixture
def user_info() -> dict:
    user_info = {
        "username": 'test',
        "password": 'testPassword123'
    }
    User.objects.create_user(**user_info)
    return user_info


@pytest.mark.django_db
def test_whenObtainTokenPairValidCredentials_returnsAccessRefreshAndOk(api_client: APIClient, user_info: dict):
    url = reverse("Obtain access and refresh token")
    response = api_client.post(url, data=user_info)

    assert response.status_code == 200
    assert "access" in response.data
    assert "refresh" in response.data


@pytest.mark.django_db
def test_whenObtainTokenPairWrongCredentials_returnsUnauthorized(api_client: APIClient):
    url = reverse("Obtain access and refresh token")
    response = api_client.post(url, data={"username": "wrong", "password": "wrong"})

    assert response.status_code == 401
    assert "detail" in response.data


@pytest.mark.django_db
def test_whenObtainTokenPairInvalidBodyStructure_returnsBadRequest(api_client: APIClient):
    url = reverse("Obtain access and refresh token")
    no_body_response = api_client.post(url, data={})
    unexpected_body_response = api_client.post(url, data={"wrong": "will result in 400"})

    assert no_body_response.status_code == 400
    assert unexpected_body_response.status_code == 400
