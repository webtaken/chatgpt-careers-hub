# from commons.models import TimeStampedModel
# from django.conf import settings
# from django.db.models import (
#     SET_NULL,
#     BigIntegerField,
#     BooleanField,
#     CharField,
#     ForeignKey,
#     Index,
#     IntegerField,
#     JSONField,
#     Model,
#     TextField,
# )


# class Product(Model):
#     class Meta:
#         ordering = ["product_id"]

#     product_id = IntegerField(null=False, verbose_name="Product id")
#     product_name = CharField(max_length=255, verbose_name="Product name")
#     product_description = CharField(
#         max_length=500, null=True, verbose_name="Product description"
#     )
#     variant_id = IntegerField(null=False, unique=True, verbose_name="Variant id")
#     name = CharField(max_length=255, null=False, verbose_name="Name")
#     description = TextField(verbose_name="Variant description")
#     price = CharField(max_length=30, null=False, verbose_name="Price")
#     is_usage_based = BooleanField(default=False, verbose_name="Is usage based")
#     interval = CharField(max_length=10, verbose_name="Interval")
#     interval_count = IntegerField(verbose_name="Interval count")
#     trial_interval = CharField(max_length=10, null=True, verbose_name="Trial interval")
#     trial_interval_count = IntegerField(null=True, verbose_name="Trial interval count")
#     sort = IntegerField(verbose_name="Sort")

#     def __str__(self) -> str:
#         return f"{self.product_name} - {self.name} (#{self.variant_id})"


# class ProductPaddle(TimeStampedModel):
#     class Meta:
#         ordering = ["product_id"]

#     product_id = CharField(null=False, max_length=100, verbose_name="Product id")
#     product_name = CharField(max_length=255, verbose_name="Product name")
#     product_description = TextField(verbose_name="Product description")

#     price_id = CharField(max_length=100, null=False, verbose_name="Price id")
#     price_name = CharField(max_length=500, null=False, verbose_name="Price name")
#     price_description = TextField(verbose_name="Price description")
#     billing_cycle = JSONField(null=True, verbose_name="Billing Cycle")
#     trial_period = JSONField(null=True, verbose_name="Trial period")
#     tax_mode = CharField(max_length=50, verbose_name="Tax mode")
#     unit_price = JSONField(null=True, verbose_name="Price unit price")
#     unit_price_overrides = JSONField(
#         null=True, verbose_name="Price unit price overrides"
#     )

#     def __str__(self) -> str:
#         return f"{self.product_name} (#{self.product_id})"


# class Order(Model):
#     class Meta:
#         ordering = ["-lemonsqueezy_id"]
#         indexes = [
#             Index(fields=["user"]),
#             Index(fields=["one_time_payment_product"]),
#             Index(fields=["lemonsqueezy_id"]),
#         ]

#     user = ForeignKey(
#         settings.AUTH_USER_MODEL,
#         null=True,
#         on_delete=SET_NULL,
#         related_name="orders",
#     )
#     one_time_payment_product = ForeignKey(Product, null=True, on_delete=SET_NULL)
#     lemonsqueezy_id = CharField(
#         max_length=255, null=False, unique=True, verbose_name="Lemon Squeezy Id"
#     )
#     order_id = IntegerField(null=False, verbose_name="Order Id")
#     order_number = IntegerField(null=False, verbose_name="Order Number")
#     name = CharField(max_length=255, null=False, verbose_name="Name")
#     email = CharField(max_length=255, null=False, verbose_name="Email")
#     status = CharField(max_length=50, null=False, verbose_name="Status")
#     status_formatted = CharField(
#         max_length=100, null=False, verbose_name="Status Formatted"
#     )
#     refunded = BooleanField(default=False, verbose_name="Refunded")
#     refunded_at = CharField(max_length=100, verbose_name="Refunded At")
#     price = CharField(max_length=30, blank=True, null=False, verbose_name="Price")
#     receipt = CharField(max_length=500, null=True)
#     order_item_id = BigIntegerField(null=True, verbose_name="Order Item Id")

#     def __str__(self) -> str:
#         return f"{self.user}: {self.name}, {self.email} #({self.lemonsqueezy_id})"
