import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User


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
