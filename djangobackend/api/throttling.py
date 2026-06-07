from rest_framework.throttling import UserRateThrottle

class LaibaRateThrottle(UserRateThrottle):
    scope = 'laiba'