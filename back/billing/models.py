from django.conf import settings
from django.db.models import (
    SET_NULL,
    BigIntegerField,
    BooleanField,
    CharField,
    ForeignKey,
    Index,
    IntegerField,
    Model,
    TextField,
)


class Plan(Model):
    class Meta:
        ordering = ["product_id"]

    product_id = IntegerField(null=False, verbose_name="Product id")
    product_name = CharField(max_length=255, verbose_name="Product name")
    variant_id = IntegerField(null=False, unique=True, verbose_name="Variant id")
    category = CharField(max_length=30, verbose_name="Category")
    name = CharField(max_length=255, null=False, verbose_name="Name")
    description = TextField(verbose_name="Variant description")
    price = CharField(max_length=30, null=False, verbose_name="Price")
    is_usage_based = BooleanField(default=False, verbose_name="Is usage based")
    interval = CharField(max_length=10, verbose_name="Interval")
    interval_count = IntegerField(verbose_name="Interval count")
    trial_interval = CharField(max_length=10, null=True, verbose_name="Trial interval")
    trial_interval_count = IntegerField(null=True, verbose_name="Trial interval count")
    sort = IntegerField(verbose_name="Sort")

    def __str__(self) -> str:
        return f"{self.product_name} - {self.name} (#{self.variant_id})"


class Order(Model):
    class Meta:
        ordering = ["-lemonsqueezy_id"]
        indexes = [
            Index(fields=["user"]),
            Index(fields=["plan"]),
            Index(fields=["lemonsqueezy_id"]),
        ]

    user = ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        on_delete=SET_NULL,
        related_name="orders",
    )
    plan = ForeignKey(Plan, null=True, on_delete=SET_NULL)
    lemonsqueezy_id = CharField(
        max_length=255, null=False, unique=True, verbose_name="Lemon Squeezy Id"
    )
    order_id = IntegerField(null=False, verbose_name="Order Id")
    order_number = IntegerField(null=False, verbose_name="Order Number")
    name = CharField(max_length=255, null=False, verbose_name="Name")
    email = CharField(max_length=255, null=False, verbose_name="Email")
    status = CharField(max_length=50, null=False, verbose_name="Status")
    status_formatted = CharField(
        max_length=100, null=False, verbose_name="Status Formatted"
    )
    refunded = BooleanField(default=False, verbose_name="Refunded")
    refunded_at = CharField(max_length=100, verbose_name="Refunded At")
    price = CharField(max_length=30, blank=True, null=False, verbose_name="Price")
    receipt = CharField(max_length=500, null=True)
    order_item_id = BigIntegerField(null=True, verbose_name="Order Item Id")

    def __str__(self) -> str:
        return f"{self.user}: {self.name}, {self.email} #({self.lemonsqueezy_id})"
