from rest_framework.serializers import (
    CharField,
    IntegerField,
    ListField,
    ModelSerializer,
    Serializer,
)

from jobs.models import Category, Job, Location, Tag


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
    tags = TagSerializer(many=True)
    location = LocationSerializer(many=True)
    category = CategorySerializer(many=True)

    class Meta:
        model = Job
        fields = [
            "id",
            "title",
            "description",
            "company_name",
            "tags",
            "verified",
            "location",
            "category",
            "slug",
            "created_at",
            "updated_at",
        ]


class JobSerializer(ModelSerializer):
    class Meta:
        model = Job
        fields = "__all__"


class JobRetrieveSerializer(ModelSerializer):
    tags = TagSerializer(many=True)
    location = LocationSerializer(many=True)
    category = CategorySerializer(many=True)

    class Meta:
        model = Job
        fields = "__all__"
