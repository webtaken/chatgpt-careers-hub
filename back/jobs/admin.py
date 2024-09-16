from django.contrib import admin
from django.forms import ModelForm

from .models import Category, Job, Location, Tag


class JobAdminForm(ModelForm):
    class Meta:
        model = Job
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["tags"].required = False
        self.fields["location"].required = False


class JobAdmin(admin.ModelAdmin):
    form = JobAdminForm
    list_display = [
        "title",
        "company_name",
        "get_tags",
        "get_locations",
        "get_categories",
        "remote",
        "verified",
        "visible",
    ]
    list_filter = ["remote", "verified", "visible", "tags", "location", "category"]
    search_fields = [
        "title",
        "company_name",
        "tags__text",
        "location__location",
        "category__text",
    ]
    list_per_page = 50
    list_max_show_all = 200

    def get_tags(self, obj):
        return ", ".join([tag.text for tag in obj.tags.all()])

    get_tags.short_description = "Tags"

    def get_locations(self, obj):
        return ", ".join([location.location for location in obj.location.all()])

    get_locations.short_description = "Locations"

    def get_categories(self, obj):
        return ", ".join([category.text for category in obj.category.all()])

    get_categories.short_description = "Categories"


class CategoryAdmin(admin.ModelAdmin):
    list_display = ("text", "slug")


admin.site.register(Job, JobAdmin)
admin.site.register(Tag)
admin.site.register(Location)
admin.site.register(Category, CategoryAdmin)
