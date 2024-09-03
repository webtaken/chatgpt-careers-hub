from django.urls import path
from rest_framework.routers import DefaultRouter

from billing.apis.views import (
    LemonSqueezyWebhook,
    OrderViewSet,
    PlanListViewSet,
)

app_name = "billing"

router = DefaultRouter()
router.register(r"plans", PlanListViewSet, basename="plans")
router.register(r"order", OrderViewSet, basename="orders")

urlpatterns = router.urls + [
    path("billing/webhook", LemonSqueezyWebhook.as_view(), name="webhook")
]
