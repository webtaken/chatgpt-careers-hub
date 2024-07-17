from django.contrib import admin
from django.forms import ModelForm

from .models import Job, Location, Tag


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
    list_display = ("title", "company_name", "verified")


admin.site.register(Job, JobAdmin)
admin.site.register(Tag)
admin.site.register(Location)
