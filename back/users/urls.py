from rest_framework import routers

from .apis.views import SubscriptionViewSet

router = routers.SimpleRouter()

router.register(r"subscriptions", SubscriptionViewSet, basename="subscriptions")

urlpatterns = router.urls
