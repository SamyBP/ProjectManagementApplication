from functools import wraps


def query_params(*expected_params):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            query_args = {param: args[1].query_params.get(param) for param in expected_params}
            return func(*args, **query_args, **kwargs)

        return wrapper

    return decorator
