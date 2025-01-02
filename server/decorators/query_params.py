from functools import wraps


def query_params(*expected_params):
    """
    A decorator to detect and inject into the decorated method the query params with which a request is made
    The first argument of the decorated function must be a Request object

    Params:
        expected_params: a variadic list of names, each element must be an expected query parameter and have the same
                        name as the corresponding argument from the decorated function
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            query_args = {param: args[1].query_params.get(param) for param in expected_params}
            return func(*args, **query_args, **kwargs)

        return wrapper

    return decorator
