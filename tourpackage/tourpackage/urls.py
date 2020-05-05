"""tourpackage URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static, serve
from django.contrib import admin
from django.urls import path, re_path, include

from rest_framework.routers import DefaultRouter

import api.views

router = DefaultRouter()
router.register(r'packages', api.views.PackageViewSet)

urlpatterns = [
    # re_path(r'^api/v1/packages/', api.views.PackageCreateView.as_view()),
    re_path(r'^api/v1/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('oauth/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    re_path(r'^(?P<path>.*)$', serve, { 'document_root': settings.FRONTEND_ROOT}),
]
