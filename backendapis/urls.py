from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from django.conf.urls.static import static
from django.conf import settings
from .views import *

router = DefaultRouter()
router.register('products',ProductDetailViewSet, basename='product')
router.register('discountoffer',DiscountOfferViewSet, basename='discountoffer')
router.register('discountpercentage',DiscountPercentageViewSet, basename='discountpercentage')
router.register('categories', CategoryDetailViewSet, basename='category')
router.register('order_products',OrderProductViewSet, basename='order_products')
router.register('orders',OrderViewSet, basename='orders')

urlpatterns = [
    path('/', include(router.urls)),
    
] 
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)