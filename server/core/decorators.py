from functools import wraps


def query_params(*expected_params):
    def decorator(func):
        @wraps(func)
        def wrapper(request, *args, **kwargs):
            query_args = {param: request.GET.get(param) for param in expected_params}
            return func(request, *args, **query_args, **kwargs)

        return wrapper

    return decorator
