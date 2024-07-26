from rest_framework.serializers import ModelSerializer

from jobs.models import Category, Job, Location, Tag


class JobSerializer(ModelSerializer):
    class Meta:
        model = Job
        fields = "__all__"


class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"


class LocationSerializer(ModelSerializer):
    class Meta:
        model = Location
        fields = "__all__"


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
