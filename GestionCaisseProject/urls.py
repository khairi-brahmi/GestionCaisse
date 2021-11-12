
from django.contrib import admin
from django.urls import path, include
from rest_framework.schemas import get_schema_view
from django.views.generic import TemplateView
urlpatterns = [
    path('apis', include('backendapis.urls')),
    path('auth/', include('auth.urls')),
    path('admin/', admin.site.urls),
    path('openapi/', get_schema_view(
        title="Challenge DataGenius",
        description="API for a supermarket checkout management solution."
    ), name='openapi-schema'),
    path('docs/', TemplateView.as_view(
        template_name='doc.html',
        extra_context={'schema_url':'openapi-schema'}
    ), name='swagger-ui'),
]