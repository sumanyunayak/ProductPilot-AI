from django.urls import path
from .views import product_idea_list, product_idea_detail
from . import views


urlpatterns = [
    path('ideas/', product_idea_list, name='product_idea_list'),
    path('ideas/<int:pk>/', product_idea_detail, name='product_idea_detail'),
    path("ideas/<int:pk>/analyze/",views.analyze_idea,name="analyze-idea"),
]