from django.urls import path
from rest_framework_simplejwt import views
from constants import Endpoints

urlpatterns = [
    path('token', views.TokenObtainPairView.as_view(), name=Endpoints.TOKEN.value),
    path('token/refresh', views.TokenRefreshView.as_view(), name=Endpoints.TOKEN_REFRESH.value),
    path('token/verify', views.TokenVerifyView.as_view(), name=Endpoints.TOKEN_VERIFY.value)
]