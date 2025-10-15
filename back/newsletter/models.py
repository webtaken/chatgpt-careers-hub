from commons.models import TimeStampedModel
from django.db import models
from django.template.defaultfilters import slugify


class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.email


class Post(TimeStampedModel):
    class Meta:
        db_table = "newsletter_posts"
        ordering = ["-created_at"]

    POST_TYPE_CHOICES = [
        ("news", "News"),
        ("training", "Training"),
        ("promo", "Promo"),
        ("other", "Other"),
    ]

    type = models.CharField(
        max_length=20,
        choices=POST_TYPE_CHOICES,
        verbose_name="Post Type",
        db_index=True,
    )
    title = models.CharField(max_length=200, verbose_name="Title")
    slug = models.SlugField(
        max_length=255,
        unique=True,
        blank=True,
        null=True,
        db_index=True,
        verbose_name="Slug",
    )
    body = models.TextField(verbose_name="Body (Text Format)")
    body_md = models.TextField(verbose_name="Body (Markdown Format)")
    external_url = models.URLField(
        max_length=2048, null=True, blank=True, verbose_name="External URL"
    )
    image_url = models.URLField(
        max_length=2048, null=True, blank=True, verbose_name="Image URL"
    )
    is_published = models.BooleanField(default=False, verbose_name="Published")
    published_at = models.DateTimeField(
        null=True, blank=True, verbose_name="Published At"
    )

    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug or self.slug == "":
            base_slug = slugify(f"{self.title}")
            self.slug = base_slug

            # Ensure slug uniqueness
            counter = 1
            while Post.objects.filter(slug=self.slug).exclude(pk=self.pk).exists():
                self.slug = f"{base_slug}-{counter}"
                counter += 1
        super().save(*args, **kwargs)
