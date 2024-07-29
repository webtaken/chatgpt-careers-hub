from commons.models import TimeStampedModel
from django.contrib.auth.models import AbstractUser
from django.db.models import EmailField


class User(AbstractUser):
    pass


class Subscription(TimeStampedModel):
    email = EmailField(verbose_name="Subscription Email")

    def __str__(self) -> str:
        return self.email
