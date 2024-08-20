from typing import List

from rest_framework.serializers import (
    CharField,
    IntegerField,
    ListField,
    ModelSerializer,
    Serializer,
    SerializerMethodField,
)

from jobs.models import Category, Job, Location, Tag


class JobSerializer(ModelSerializer):
    class Meta:
        model = Job
        fields = "__all__"


class JobRetrieveSerializer(ModelSerializer):
    tags = SerializerMethodField()
    location = SerializerMethodField()

    class Meta:
        model = Job
        fields = "__all__"

    def get_tags(self, obj) -> List[str]:
        return [tag.text for tag in obj.tags.all()]

    def get_location(self, obj) -> List[str]:
        return [location.location for location in obj.location.all()]


class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"


class CreateMultipleTagsSerializer(Serializer):
    tags = ListField(child=CharField(max_length=150), allow_empty=True)


class TagIDSerializer(Serializer):
    id = IntegerField()


class LocationSerializer(ModelSerializer):
    class Meta:
        model = Location
        fields = "__all__"


class CreateLocationSerializer(ModelSerializer):
    location = CharField(max_length=200)
    location_type = CharField(max_length=200)

    class Meta:
        model = Location
        fields = ("location", "location_type")


class CreateMultipleLocationsSerializer(Serializer):
    locations = ListField(child=CreateLocationSerializer(), allow_empty=True)


class LocationIDSerializer(TagIDSerializer):
    pass


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class JobListSerializer(ModelSerializer):
    tags = SerializerMethodField()
    location = SerializerMethodField()

    class Meta:
        model = Job
        fields = [
            "id",
            "title",
            "company_name",
            "tags",
            "verified",
            "location",
            "slug",
        ]

    def get_tags(self, obj) -> List[str]:
        return [tag.text for tag in obj.tags.all()]

    def get_location(self, obj) -> List[str]:
        return [location.location for location in obj.location.all()]
