from rest_framework.viewsets import ModelViewSet

from jobs.models import Category, Job, Location, Tag

from .serializers import (
    CategorySerializer,
    JobSerializer,
    LocationSerializer,
    TagSerializer,
)


class JobViewSet(ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer


class TagViewSet(ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class LocationViewSet(ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
