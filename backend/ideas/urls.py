from django.urls import path
from .views import product_idea_list, product_idea_detail,RegisterView
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('ideas/', product_idea_list, name='product_idea_list'),
    path('ideas/<int:pk>/', product_idea_detail, name='product_idea_detail'),
    path("ideas/<int:pk>/analyze/",views.analyze_idea,name="analyze-idea"),
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/login/", TokenObtainPairView.as_view(),name="token_obtain_pair",),
    path("auth/refresh/",TokenRefreshView.as_view(),name="token_refresh",),
]