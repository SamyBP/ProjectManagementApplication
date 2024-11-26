from rest_framework import serializers


class InvalidRequestBodyException(serializers.ValidationError):
    pass


class ProjectNameAlreadyExistsException(serializers.ValidationError):

    def __init__(self, user, name):
        message = f"{user} already has a project with name: {name}"
        super().__init__(message)
