from rest_framework import routers

from .apis.views import JobViewSet, LocationViewSet, TagViewSet

router = routers.SimpleRouter()

router.register(r"jobs", JobViewSet, basename="jobs")
router.register(r"tags", TagViewSet, basename="tags")
router.register(r"locations", LocationViewSet, basename="locations")

urlpatterns = router.urls
