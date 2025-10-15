from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Subscriber

User = get_user_model()


@receiver(post_save, sender=User)
def create_subscriber_on_user_creation(sender, instance, created, **kwargs):
    """
    Create a Subscriber automatically when a new User is created.
    """
    if created:
        Subscriber.objects.get_or_create(
            email=instance.email or instance.username, defaults={"is_active": True}
        )
