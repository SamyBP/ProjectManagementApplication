import logging

import pytest

from django.urls import reverse
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from dataclasses import dataclass


@dataclass
class TokenResponse:
    refresh: str
    access: str


@dataclass
class ObtainTokenRequest:
    username: str
    password: str


@pytest.fixture
def api_client() -> APIClient:
    return APIClient()


@pytest.fixture
def token_request() -> ObtainTokenRequest:
    data = {"username": "test", "password": "testPassword123"}
    User.objects.create_user(**data)
    return ObtainTokenRequest(**data)


@pytest.fixture
def token_response(token_request: ObtainTokenRequest, api_client: APIClient) -> TokenResponse:
    url = reverse("Obtain access and refresh token")
    response = api_client.post(url, data=token_request.__dict__)
    return TokenResponse(refresh=response.data['refresh'], access=response.data['access'])
