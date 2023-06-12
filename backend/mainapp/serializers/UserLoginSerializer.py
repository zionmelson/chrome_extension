
from rest_framework import serializers
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed

from ..models import UserModel


class UserLoginSerializer(serializers.ModelSerializer):
    """
    User login serializer
    """

    password = serializers.CharField(max_length=500, min_length=6, write_only=True)
    email = serializers.EmailField()
    tokens = serializers.SerializerMethodField()

    def get_tokens(self, obj):
        user = UserModel.objects.get(email=obj['email'])
        return {
            'refresh': user.tokens()['refresh'],
            'access': user.tokens()['access']
        }

    class Meta:
        model = UserModel
        fields = '__all__'
    
    def validate(self, attrs):
        email = attrs.get('email','')
        password = attrs.get('password','')
        user = auth.authenticate(username=email,password=password)

        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin')

        return {
            'email': user.email,
            'tokens': user.tokens
        }