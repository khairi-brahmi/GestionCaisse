from django.shortcuts import render
from .models import *
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from .filters import *

class DiscountOfferViewSet(viewsets.ModelViewSet):
    queryset  = DiscountOffer.objects.all()
    serializer_class = DiscountOfferSerializer
    filterset_class=DiscountOfferFilter

class DiscountPercentageViewSet(viewsets.ModelViewSet):
    queryset =DiscountPercentage.objects.all()
    serializer_class = DiscountPercentageSerializer
    filterset_class=DiscountPercentageFilter

class OrderProductViewSet(viewsets.ModelViewSet):
    queryset =OrderProduct.objects.all()
    serializer_class = OrderProductSerializer
    filterset_class =OrderProductFilter
    #permission_classes = [IsAuthenticated] => pour permettre d’attribuer des permissions seulement à l'utilisateur connecté 
    #commenté pour le moment juste pour accéler et faciliter la manipulation des apis 

class OrderViewSet(viewsets.ModelViewSet):
    queryset =Order.objects.all()
    serializer_class = OrderSerializer
    #permission_classes = [IsAuthenticated]

class ProductDetailViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer  
    filterset_class =ProductFilter 

class CategoryDetailViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer 