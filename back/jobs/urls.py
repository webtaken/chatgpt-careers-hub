from django.urls import path
from rest_framework import routers

from .apis.views import (
    CategoryViewSet,
    JobListViewSet,
    JobViewSet,
    LocationListViewSet,
    LocationViewSet,
    TagListViewSet,
    TagViewSet,
)

router = routers.SimpleRouter()

router.register(r"jobs", JobViewSet, basename="jobs")
router.register(r"tags", TagViewSet, basename="tags")
router.register(r"locations", LocationViewSet, basename="locations")
router.register(r"categories", CategoryViewSet, basename="categories")

urlpatterns = [
    path("jobs-list/", JobListViewSet.as_view(), name="jobs-list"),
    path("tags-list/", TagListViewSet.as_view(), name="tags-list"),
    path("locations-list/", LocationListViewSet.as_view(), name="locations-list"),
] + router.urls
