from django.urls import path
from rest_framework import routers

from .apis.views import SubscriptionViewSet, TallyWebhook

router = routers.SimpleRouter()

router.register(r"subscriptions", SubscriptionViewSet, basename="subscriptions")

urlpatterns = router.urls + [
    path("users/webhook", TallyWebhook.as_view(), name="tally_webhook")
]
