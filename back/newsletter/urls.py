from django.urls import path
from rest_framework import routers

from .apis.views import PostViewSet, SubscriberViewSet

router = routers.SimpleRouter()

router.register(
    r"newsletter/subscribers", SubscriberViewSet, basename="newsletter-subscribers"
)
router.register(r"newsletter/posts", PostViewSet, basename="newsletter-posts")

urlpatterns = (
    [
        # reserved for extra endpoints if needed
    ]
    + router.urls
)
