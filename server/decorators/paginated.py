from functools import wraps

from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

from core.exceptions import BaseHttpException


def paginated(serializer_class):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                items = func(*args, **kwargs)
                paginator = LimitOffsetPagination()
                paginated_queryset = paginator.paginate_queryset(items, args[1])
                serializer = serializer_class(paginated_queryset, many=True)
                return paginator.get_paginated_response(serializer.data)
            except BaseHttpException as e:
                return Response(e.details, status=e.status_code)

        return wrapper

    return decorator
