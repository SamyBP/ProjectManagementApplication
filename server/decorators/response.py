from functools import wraps

from rest_framework.response import Response

from core.exceptions import BaseHttpException


def response(serializer_class=None, status_code: int = 200):
    """
    A decorator to return a serialized response of the data returned by the decorated method,
    The first argument of the decorated method must be a Request object

    Params:
        serializer_class: The serializer used to serialize the data, if not provided than it is expected
                        that the handler method does not return a response body
        status_code: The http status code of the response
    Returns:
        Response: A rest_framework.response.Response containing the serialized data or a detailed
                error message if a BaseHttpException was raised during the execution of the decorated method
    """
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
