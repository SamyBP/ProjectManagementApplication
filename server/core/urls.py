from django.urls import path, include
from core.views import ListCreateUserProjectView


urlpatterns = [
    path('projects/', include([
        path('', ListCreateUserProjectView.as_view(), name="Create or list projects for user")
    ]))
]