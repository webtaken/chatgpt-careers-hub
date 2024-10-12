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
router.register(r"tags-list", TagListViewSet, basename="tags-list")
router.register(r"locations-list", LocationListViewSet, basename="locations-list")
router.register(r"locations", LocationViewSet, basename="locations")
router.register(r"categories", CategoryViewSet, basename="categories")

urlpatterns = [
    path("jobs-list/", JobListViewSet.as_view(), name="jobs-list"),
] + router.urls
