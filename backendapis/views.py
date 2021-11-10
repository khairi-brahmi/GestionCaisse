from django.shortcuts import render
from .models import *
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import *
from django.http import Http404
# Create your views here.

class LatestProduct(APIView):
    def get(self, request, format=None):
        products = Product.objects.all()[0:4]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class DiscountOfferViewSet(viewsets.ModelViewSet):
    queryset  = DiscountOffer.objects.all()
    serializer_class = DiscountOfferSerializer

class DiscountPercentageViewSet(viewsets.ModelViewSet):
    queryset =DiscountPercentage.objects.all()
    serializer_class = DiscountPercentageSerializer

class ProductDetailViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer   

class CategoryDetailViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer 