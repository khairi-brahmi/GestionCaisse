from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import *
router = DefaultRouter()
router.register('products',ProductDetailViewSet, basename='product')
router.register('discountoffer',DiscountOfferViewSet, basename='discountoffer')
router.register('discountpercentage',DiscountPercentageViewSet, basename='discountpercentage')
router.register('categories', CategoryDetailViewSet, basename='category')
router.register('order_products',OrderProductViewSet, basename='order_products')
router.register('orders',OrderViewSet, basename='orders')

urlpatterns = [
    path('latest-products/', views.LatestProduct.as_view(), name='lastest'),
    path('/', include(router.urls)),
    
]