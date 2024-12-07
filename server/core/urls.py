from django.urls import path, include

from constants import Endpoints
from core.views import ListCreateUserProjectView, ListTasksForProjectView, RetrieveUpdateDestroyTaskView
from core.views.project_views import RetrieveUpdateDestroyProjectView

urlpatterns = [
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
