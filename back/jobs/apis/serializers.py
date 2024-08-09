from rest_framework.serializers import (
    CharField,
    IntegerField,
    ListField,
    ModelSerializer,
    Serializer,
)

from jobs.models import Category, Job, Location, Tag


class JobSerializer(ModelSerializer):
    class Meta:
        model = Job
        fields = "__all__"


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
