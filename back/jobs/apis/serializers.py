from rest_framework.serializers import ModelSerializer

from jobs.models import Job, Location, Tag


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
