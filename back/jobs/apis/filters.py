from django_filters import CharFilter, FilterSet

from jobs.models import Job, Location, Tag


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


class TagFilter(FilterSet):
    text = CharFilter(lookup_expr="icontains")

    class Meta:
        model = Tag
        fields = [
            "text",
        ]


class LocationFilter(FilterSet):
    location = CharFilter(lookup_expr="icontains")

    class Meta:
        model = Location
        fields = [
            "location",
        ]
