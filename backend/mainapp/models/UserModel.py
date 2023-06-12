from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager
from rest_framework_simplejwt.tokens import RefreshToken

from .BaseModel import BaseModel
from .AgeRangeModel import AgeRangeModel
from .UserTypeModel import UserTypeModel


class MyUserManager(BaseUserManager):
   def create_user(self, email, password=None):
       if not email:
           raise ValueError('Email must be provided')
 
       user = self.model(email=self.normalize_email(email))
       user.set_password(password)
       user.save(using=self._db)
       return user


class UserModel(AbstractBaseUser, BaseModel):
    """
    This table stores user information.

    name: name of user
    email: email address of user
    password: encoded password for user
    phonenumber: phone number of user
    ageRangeId: id of user's age range.
    companyName: name of college or company that user joined
    employId: student id or employ id of user
    linkedin: linkedin account of user
    github: github account of user: only for student
    leetcode: Leetcode account of user: only for student
    headshot: file path user headshot image
    userTypeId: type id of user: shows this user is student or recruiter 
    resume: file path of resume: only for student
    """
    
    username = None
    name = models.CharField(max_length=50, null=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=500, null=True)
    phonenumber = models.CharField(max_length=50, null=True)
    ageRangeId = models.ForeignKey(AgeRangeModel, on_delete=models.CASCADE, to_field="id", null=True)
    companyName = models.CharField(max_length=100, null=True)
    employId = models.CharField(max_length=100, null=True)
    linkedin = models.CharField(max_length=200, null=True)
    github = models.CharField(max_length=200, null=True)
    leetcode = models.CharField(max_length=200, null=True)
    headshot = models.CharField(max_length=300, null=True)
    userTypeId = models.ForeignKey(UserTypeModel, on_delete=models.CASCADE, to_field="id", null=True)
    resume = models.CharField(max_length=300, null=True)

    USERNAME_FIELD = 'email'

    objects = MyUserManager()

    def __str__(self):
        return self.email
    
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }
