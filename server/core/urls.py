from django.urls import path, include
from rest_framework.routers import DefaultRouter

from constants import Endpoints
from core.routes.task_routes import BaseTaskController, DetailedTaskController
from core.routes.project_routes import BaseProjectController, DetailedProjectController, ProjectContributorController
from core.routes.user_routes import UserController

user_router = DefaultRouter()
user_router.register(r'', UserController, basename='')

urlpatterns = [


    path('users/', include(user_router.urls)),

    path('projects/', include([
        path('', BaseProjectController.as_view(), name=Endpoints.PROJECT_BASE.value),

        path('<int:project_id>/', include([
            path('', DetailedProjectController.as_view(), name=Endpoints.PROJECT_ID.value),

            path('contributors', ProjectContributorController.as_view(), name='Add contributors'),
            
            path('tasks/', include([
                path('', BaseTaskController.as_view(), name=Endpoints.TASK_BASE.value),

                path('<int:task_id>/', DetailedTaskController.as_view(), name=Endpoints.TASK_ID.value)
            ]))
        ]))
    ]))
]
