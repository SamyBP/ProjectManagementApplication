from django.urls import path, include

from constants import Endpoints
from core.routes.project_routes import project_handler, project_detail_handler
from core.routes.task_routes import task_handler, task_detail_handler
from core.routes.user_routes import register_user, get_user_details, get_tasks_for_logged_user, get_statistics_for_user

urlpatterns = [
    path('users/', include([
        path('me', get_user_details),
        path('register', register_user),
        path('tasks', get_tasks_for_logged_user),
        path('stats', get_statistics_for_user)
    ])),

    path('projects/', include([
        path('', project_handler, name=Endpoints.PROJECT_BASE.value),

        path('<int:project_id>/', include([
            path('', project_detail_handler, name=Endpoints.PROJECT_ID.value),

            path('tasks/', include([
                path('', task_handler, name=Endpoints.TASK_BASE.value),

                path('<int:task_id>/', task_detail_handler, name=Endpoints.TASK_ID.value)
            ]))
        ]))
    ]))
]
