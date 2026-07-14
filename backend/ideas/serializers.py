# Django database object → JSON data → React can understand

from rest_framework import serializers
from .models import Analysis, ProductIdea

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

class AnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Analysis
        fields = [
            "id",
            "response",
            "created_at",
        ]