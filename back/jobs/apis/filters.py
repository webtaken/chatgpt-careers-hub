from django_filters import CharFilter, FilterSet

from jobs.models import Job


class JobFilter(FilterSet):
    slug__text = CharFilter(lookup_expr="exact")
    category__text = CharFilter(lookup_expr="icontains")
    tags__text = CharFilter(lookup_expr="icontains")
    location__location = CharFilter(lookup_expr="icontains")

    class Meta:
        model = Job
        fields = [
            "slug",
            "category",
            "tags",
            "location",
        ]
