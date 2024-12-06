from django.urls import path, include

from constants import Endpoints
from core.views import ListCreateUserProjectView
from core.views.project_views import RetrieveUpdateDestroyProjectView

urlpatterns = [
    path('projects/', include([
        path('', ListCreateUserProjectView.as_view(), name=Endpoints.PROJECT_BASE.value),
        path('<int:pk>/', RetrieveUpdateDestroyProjectView.as_view(), name=Endpoints.PROJECT_ID.value)
    ]))
]