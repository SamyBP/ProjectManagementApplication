from django.urls import path, include

from constants import Endpoints
from core.views import ListCreateUserProjectView


urlpatterns = [
    path('projects/', include([
        path('', ListCreateUserProjectView.as_view(), name=Endpoints.PROJECT_BASE.value)
    ]))
]