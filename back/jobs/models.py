from commons.models import TimeStampedModel
from django.db.models import (
    CASCADE,
    BooleanField,
    CharField,
    EmailField,
    ForeignKey,
    Index,
    ManyToManyField,
    Model,
    PositiveSmallIntegerField,
    SlugField,
    TextField,
    URLField,
)
from django.template.defaultfilters import slugify
from users.models import User


class Location(Model):
    class Meta:
        db_table = "locations"
        indexes = [
            Index(fields=["location"], name="location_idx"),
        ]

    LOCATION_TYPE_CHOICES = [
        ("remote", "Remote"),
        ("region", "Region"),
        ("country", "Country"),
        ("city", "City"),
    ]
    location = CharField(max_length=200, unique=True, verbose_name="Location")
    location_type = CharField(
        max_length=20, choices=LOCATION_TYPE_CHOICES, verbose_name="Location Type"
    )
    # rank from 0 to 100
    rank = PositiveSmallIntegerField(default=0, null=True, blank=True)

    def __str__(self) -> str:
        return self.location


class Category(Model):
    class Meta:
        db_table = "categories"

    text = CharField(max_length=150, unique=True, verbose_name="Category")
    slug = SlugField(null=True, blank=True, unique=True, db_index=True)

    def __str__(self):
        return self.text

    def save(self, *args, **kwargs):
        if not self.slug or self.slug == "":
            self.slug = slugify(f"{self.text}")
        return super().save(*args, **kwargs)


class Tag(Model):
    class Meta:
        db_table = "tags"
        indexes = [
            Index(fields=["text"], name="text_tag_idx"),
        ]

    text = CharField(max_length=150, unique=True, verbose_name="Tag")

    def __str__(self):
        return self.text


class Job(TimeStampedModel):
    class Meta:
        db_table = "jobs"

    user = ForeignKey(User, related_name="jobs", on_delete=CASCADE, null=True)
    company_name = CharField(max_length=150, verbose_name="Company Name")
    title = CharField(max_length=150, verbose_name="Title", db_index=True)
    slug = SlugField(null=True, blank=True, unique=True, max_length=255, db_index=True)
    description = TextField(verbose_name="Description")
    tags = ManyToManyField(Tag)
    location = ManyToManyField(Location)
    category = ManyToManyField(Category)
    remote = BooleanField(default=False)
    apply_url = URLField(
        null=True, max_length=2048, blank=True, verbose_name="Apply URL"
    )
    apply_by_email = BooleanField(default=False)
    apply_email = EmailField(null=True, blank=True, verbose_name="Apply E-mail")
    company_email = EmailField(verbose_name="Company Email (For Invoice)")
    pin_on_top = BooleanField(default=False, verbose_name="Pin on top (30 days)")
    verified = BooleanField(default=False, verbose_name="Verified")
    visible = BooleanField(default=True, verbose_name="Visible")

    def __str__(self):
        return f"{self.title}"
