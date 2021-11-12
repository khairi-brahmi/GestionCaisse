from django.shortcuts import render
from .models import *
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import *
from django.http import Http404
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

class OrderViewSet(viewsets.ModelViewSet):
    queryset =Order.objects.all()
    serializer_class = OrderSerializer

class ProductDetailViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer   

class CategoryDetailViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer 