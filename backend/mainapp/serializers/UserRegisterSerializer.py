from rest_framework import serializers
from django.core.validators import validate_email

from ..models import UserModel


class UserRegisterSerializer(serializers.ModelSerializer):
    """
    User register serializer
    """
    
    password = serializers.CharField(max_length=500, min_length=6, write_only=True)

    class Meta:
        model = UserModel
        fields = '__all__'
    
    def validate(self, attrs):
        email = attrs.get('email', '')
        validate_email(email)   
        return attrs
    
    def create(self, validated_data):
        return UserModel.objects.create_user(**validated_data)
