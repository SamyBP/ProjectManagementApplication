from dataclasses import dataclass

import pytest
from django.contrib.auth.models import User

from core.models import Project


@dataclass
class CreateProjectRequest:
    name: str
    description: str


@pytest.fixture
def user() -> User:
    data = {
        "username": "test",
        "email": "test@email.com",
        "first_name": "John",
        "last_name": "Doe",
        "password": "test"
    }
    return User.objects.create_user(**data)


@pytest.fixture
def project(user: User) -> Project:
    data = {
        "owner": user,
        "name": f"{user.username}/test-project",
        "description": "Test Description"
    }
    return Project.objects.create(**data)
