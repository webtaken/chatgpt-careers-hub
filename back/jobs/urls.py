from rest_framework import routers

from .apis.views import CategoryViewSet, JobViewSet, LocationViewSet, TagViewSet

router = routers.SimpleRouter()

router.register(r"jobs", JobViewSet, basename="jobs")
router.register(r"tags", TagViewSet, basename="tags")
router.register(r"locations", LocationViewSet, basename="locations")
router.register(r"categories", CategoryViewSet, basename="categories")

urlpatterns = router.urls
