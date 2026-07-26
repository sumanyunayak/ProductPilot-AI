# GET → fetch all saved ideas
# POST → save a new idea

from os import error

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ProductIdea,Analysis
from .serializers import ProductIdeaSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status
from services.ai_service import analyze_product_idea
from services.prompts import build_product_analysis_prompt
from rest_framework import generics
from django.contrib.auth.models import User

from .serializers import RegisterSerializer

@api_view(['GET', 'POST'])
def product_idea_list(request):
    
    if request.method == 'GET':
        ideas = ProductIdea.objects.all().order_by('-created_at')
        serializer = ProductIdeaSerializer(ideas, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ProductIdeaSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)

@api_view(["GET", "PUT", "DELETE"])
def product_idea_detail(request, pk):
    idea = get_object_or_404(ProductIdea, pk=pk)

    if request.method == "GET":
        serializer = ProductIdeaSerializer(idea)
        return Response(serializer.data)
    
    if request.method == "PUT":
        serializer = ProductIdeaSerializer(
            idea,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    if request.method == "DELETE":
        idea.delete()
        return Response(status=204)
    
@api_view(["POST"])
def analyze_idea(request, pk):
    try:
        idea = ProductIdea.objects.get(pk=pk)
    except ProductIdea.DoesNotExist:
        return Response(
            {"error": "Idea not found."},
            status=status.HTTP_404_NOT_FOUND,
        )

    prompt = build_product_analysis_prompt(idea)

    try:
        ai_response = analyze_product_idea(prompt)

        Analysis.objects.create(
            product_idea=idea,
            response=ai_response,
        )

        return Response({
            "analysis": ai_response
    })

    except Exception as error:
        return Response(
            {
            "error": str(error)
            },
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
    )

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer