from .views import UserRegisterView, UserLoginView, UserLogoutView, BookmarkView
from django.urls import path

urlpatterns = [
    path('user/register/', UserRegisterView.as_view(), name="register"),
    path('user/login/', UserLoginView.as_view(), name="login"),
    path('user/logout/', UserLogoutView.as_view(), name="logout"),
    path('bookmark/', BookmarkView.as_view(), name='bookmark')
]