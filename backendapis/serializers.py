from rest_framework import serializers
from .models import *

class DiscountOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscountOffer
        fields = (
           "id", "availability", "product", "purchased_products","offred_products",
        )
class DiscountPercentageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscountPercentage
        fields = (
             "id", "availability", "product","reduction_percentage",
        )
class ProductSerializer(serializers.ModelSerializer):
    discount_offer =DiscountOfferSerializer(many=True,read_only=True)
    discount_percentage =DiscountPercentageSerializer(many=True,read_only=True)
    class Meta:
        model = Product
        fields = (
            "id", "name", "category","description", "price","date_added", "get_prod_image","discount_offer","discount_percentage",
        )

class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True,read_only=True)
    class Meta:
        model = Category
        fields = (
            "id", "name", "products",
        )