from functools import wraps

from rest_framework.response import Response

from core.exceptions import BaseHttpException


def response(serializer_class=None, status_code: int = 200):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                if not serializer_class:
                    return Response(status=status_code)

                item = func(*args, **kwargs)
                serializer = serializer_class(item, context={'request': args[1]})
                return Response(serializer.data, status=status_code)
            except BaseHttpException as e:
                return Response(e.details, status=e.status_code)

        return wrapper

    return decorator
