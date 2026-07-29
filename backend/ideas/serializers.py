# Django database object → JSON data → React can understand

from rest_framework import serializers
from .models import Analysis, ProductIdea
from django.contrib.auth.models import User
from rest_framework import serializers

class AnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Analysis
        fields = [
            "id",
            "response",
            "created_at",
        ]

class ProductIdeaSerializer(serializers.ModelSerializer):
    analyses = AnalysisSerializer(many=True, read_only=True)

    class Meta:
        model = ProductIdea
        fields = "__all__"
        read_only_fields = ["owner"]

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user