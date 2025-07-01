from django.urls import path
from .views import TemperatureView
from .views import *



urlpatterns = [
    path('temperature/', TemperatureView.as_view(), name = 'temperature-api'),
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/', UserProfileView.as_view(), name='user-profile'),
]