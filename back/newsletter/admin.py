from django.contrib import admin

from .models import Post, Subscriber


@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "is_active", "created_at")
    list_filter = ("is_active",)
    search_fields = ("email",)
    ordering = ("-created_at",)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "type",
        "external_url",
        "is_published",
        "created_at",
        "published_at",
    )
    list_filter = ("type", "is_published", "created_at")
    search_fields = ("title", "body", "body_md", "external_url")
    ordering = ("-created_at",)
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at")
