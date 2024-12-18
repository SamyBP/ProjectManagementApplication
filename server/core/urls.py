from django.urls import path, include

from constants import Endpoints
from core.views import ListCreateUserProjectView, ListTasksForProjectView, RetrieveUpdateDestroyTaskView
from core.views.project_views import RetrieveUpdateDestroyProjectView
from core.views.user_views import register_user, get_user_details

urlpatterns = [
    path('users/', include([
        path('me/', get_user_details),
        path('register', register_user)
    ])),

    path('projects/', include([
        path('', ListCreateUserProjectView.as_view(), name=Endpoints.PROJECT_BASE.value),

        path('<int:project_id>/', include([
            path('', RetrieveUpdateDestroyProjectView.as_view(), name=Endpoints.PROJECT_ID.value),

            path('tasks/', include([
                path('', ListTasksForProjectView.as_view(), name=Endpoints.TASK_BASE.value),

                path('<int:task_id>/', RetrieveUpdateDestroyTaskView.as_view(), name=Endpoints.TASK_ID.value)
            ]))
        ]))
    ]))
]
