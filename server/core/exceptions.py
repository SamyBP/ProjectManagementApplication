from rest_framework import serializers


class ProjectNameAlreadyExistsException(serializers.ValidationError):

    def __init__(self, user, name):
        message = f"User: {user} already has a project with name: {name}"
        super().__init__({'description': message})


class InvalidPayloadException(Exception):
    pass
