from rest_framework import serializers


class ProjectNameAlreadyExistsException(serializers.ValidationError):

    def __init__(self, user, name):
        message = f"User: {user} already has a project with name: {name}"
        super().__init__({'description': message})


class BaseHttpException(Exception):
    def __init__(self, status_code: int, details: str):
        self.status_code = status_code
        self.details = details
