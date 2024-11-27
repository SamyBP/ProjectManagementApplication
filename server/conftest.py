from dataclasses import dataclass

import pytest
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIClient


@dataclass
class ObtainTokenRequest:
    username: str
    password: str


@dataclass
class TokenResponse:
    refresh: str
    access: str


@pytest.fixture
def api_client() -> APIClient:
    return APIClient()


@pytest.fixture
def user() -> User:
    """The user used for testing"""

    data = {
        "username": "test",
        "email": "test@email.com",
        "first_name": "John",
        "last_name": "Doe",
        "password": "test"
    }
    return User.objects.create_user(**data)


@pytest.fixture
def token_request(user) -> ObtainTokenRequest:
    """Returns a ObtainTokenReqeust object used to create a token for the test user"""

    data = {"username": user.username, "password": "test"}
    return ObtainTokenRequest(**data)


@pytest.fixture
def token(token_request: ObtainTokenRequest, api_client: APIClient) -> TokenResponse:
    """Returns a TokenResponse object containing an access and refresh token for the test user"""

    url = reverse("Obtain access and refresh token")
    response = api_client.post(url, data=token_request.__dict__)
    return TokenResponse(refresh=response.data['refresh'], access=response.data['access'])


@pytest.fixture
def auth_client(api_client: APIClient, token: TokenResponse) -> APIClient:
    """Returns an APIClient with the Authorization header setup"""

    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {token.access}")
    return api_client
