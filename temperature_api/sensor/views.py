from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle
from rest_framework import status
import random
from datetime import datetime, timezone
from .serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView



class TempThrottle(UserRateThrottle):
    scope = 'temperature'
    rate = '100/second'



class TemperatureView(APIView):
    # permission_classes = [IsAuthenticated]
    throttle_classes = [TempThrottle]

    def get(self, request):
        temperature = round(random.uniform(15, 45), 2)
        return Response({
            "temperature": temperature,
            "unit": "celsius",
            "timestamp": datetime.now(timezone.utc).isoformat()
        })
    



class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registration successful."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]  
    
    def get(self, request):
        if request.user.is_authenticated:
            serializer = UserProfileSerializer(request.user)
            return Response(serializer.data)
        else:
            return Response({"error": "User not authenticated"}, status=401)
        