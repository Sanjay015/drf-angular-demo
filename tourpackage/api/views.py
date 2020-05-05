from rest_framework.generics import CreateAPIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import BaseFilterBackend

from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope

from api.models import Package, PackagePermission
from api.serializers import PackageSerializer


class PackageCreateView(CreateAPIView):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer


class PackagePagination(PageNumberPagination):
    page_size = 10


class CanWritePackageFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        queryset = self.check_permission(request, queryset, view)
        filters = {}
        tour_length = request.query_params.get('tourLength', None)
        if tour_length:
            filters['tour_length'] = tour_length
        return queryset.filter(**filters).order_by('id')

    def check_permission(self, request, queryset, view):
        if request.user is None:
            return queryset.none()
        if request.user.username == 'admin':
            return queryset
        package_ids = queryset.values_list('id', flat=True)
        own_package_ids = PackagePermission.objects.filter(
            is_owner=True, package__in=package_ids, user=request.user,
        ).values_list('package__id', flat=True)
        return queryset.filter(id__in=own_package_ids)


class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
    pagination_class = PackagePagination
    filter_backends = (CanWritePackageFilterBackend,)
    permission_classes = [TokenHasScope, TokenHasReadWriteScope]
    required_scopes = ['packages']
