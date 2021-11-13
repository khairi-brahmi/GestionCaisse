import django_filters
from django_filters import rest_framework as filters
from rest_framework import viewsets
from rest_framework.decorators import action
from .models import *
from rest_framework.response import Response


class ProductFilter(filters.FilterSet):
    class Meta:
        model = Product
        fields = {
            'category': ['exact'],
        }
        
class OrderProductFilter(filters.FilterSet):
    class Meta:
        model = OrderProduct
        fields ="__all__"
        
class DiscountOfferFilter(filters.FilterSet):
    class Meta:
        model = DiscountOffer
        fields ="__all__"

class DiscountPercentageFilter(filters.FilterSet):
    class Meta:
        model = DiscountPercentage
        fields ="__all__"