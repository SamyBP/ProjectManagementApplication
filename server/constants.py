from enum import Enum


class Endpoints(str, Enum):
    TOKEN = "Obtain access and refresh token"
    TOKEN_REFRESH = "Refresh access token"
    TOKEN_VERIFY = "Verify access token"
    PROJECT_BASE = "Create or list projects for user"
    PROJECT_ID = "Retrieve, update, destroy project by id"
