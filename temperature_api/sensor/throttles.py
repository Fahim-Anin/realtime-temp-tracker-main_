from rest_framework.throttling import AnonRateThrottle

class TempAnonThrottle(AnonRateThrottle):
    scope = 'temperature_anon'
