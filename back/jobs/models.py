from commons.models import TimeStampedModel
from django.db.models import (
    BooleanField,
    CharField,
    EmailField,
    Index,
    ManyToManyField,
    Model,
    PositiveSmallIntegerField,
    TextField,
    URLField,
)


class Location(Model):
    class Meta:
        db_table = "locations"
        indexes = [
            Index(fields=["location"], name="location_idx"),
        ]

    LOCATION_TYPE_CHOICES = [
        ("region", "Region"),
        ("country", "Country"),
        ("city", "City"),
    ]
    location = CharField(max_length=200, verbose_name="Location")
    location_type = CharField(
        max_length=20, choices=LOCATION_TYPE_CHOICES, verbose_name="Location Type"
    )
    # rank from 0 to 100
    rank = PositiveSmallIntegerField(default=0)

    def __str__(self) -> str:
        return self.location


class Tag(Model):
    class Meta:
        db_table = "tags"
        indexes = [
            Index(fields=["text"], name="text_idx"),
        ]

    text = CharField(max_length=150, verbose_name="Tag")

    def __str__(self):
        return self.text


class Job(TimeStampedModel):
    class Meta:
        db_table = "jobs"

    company_name = CharField(max_length=150, verbose_name="Company Name")
    title = CharField(max_length=150, verbose_name="Title")
    description = TextField(verbose_name="Description")
    tags = ManyToManyField(Tag)
    remote = BooleanField(default=False)
    apply_url = URLField(null=True, blank=True, verbose_name="Apply URL")
    apply_by_email = BooleanField(default=False)
    apply_email = EmailField(null=True, blank=True, verbose_name="Apply E-mail")
    company_email = EmailField(verbose_name="Company Email (For Invoice)")
    pin_on_top = BooleanField(default=False, verbose_name="Pin on top (30 days)")
    verified = BooleanField(default=False, verbose_name="Verified")
