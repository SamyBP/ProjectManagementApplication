import re
from rest_framework import serializers


def snake_to_camel(snake_repr: str) -> str:
    tokens = snake_repr.split('_')
    return tokens[0] + ''.join(x.title() for x in tokens[1:])


def camel_to_snake(camel_repr: str) -> str:
    snake_case_key = re.sub(r'(?<!^)(?=[A-Z])', '_', camel_repr).lower()
    return snake_case_key


class BaseModelSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        return {snake_to_camel(key): value for key, value in data.items()}

    def to_internal_value(self, data):
        formated_data = {camel_to_snake(key): value for key, value in data.items()}
        return super().to_internal_value(formated_data)
