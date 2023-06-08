from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken, TokenError


class UserLogoutSerializer(serializers.Serializer):
    """
    User logout serializer
    """

    refresh = serializers.CharField()

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs
    
    def save(self):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail('bad_token')
