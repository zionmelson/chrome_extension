from .views import RecommendationView
from django.urls import path

urlpatterns = [
    path('recommendation/', RecommendationView.as_view(), name="recommendation")
]