from django.urls import path
from rest_framework_simplejwt import views

urlpatterns = [
    path('token', views.TokenObtainPairView.as_view(), name="Obtain access and refresh token"),
    path('token/refresh', views.TokenRefreshView.as_view(), name="Refresh access token"),
    path('token/verify', views.TokenVerifyView.as_view(), name="Verify access token")
]