from enum import Enum


class Endpoints(str, Enum):
    TOKEN = "Obtain access and refresh token"
    TOKEN_REFRESH = "Refresh access token"
    TOKEN_VERIFY = "Verify access token"
    PROJECT_BASE = "Create or list projects for user"
    PROJECT_ID = "Retrieve, update, destroy project by id"
    TASK_BASE = "Retrieve all tasks for a specified project"
    TASK_ID = "Retrieve, update or delete a task by id OWNER"
