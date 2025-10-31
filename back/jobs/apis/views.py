from commons.pagination import StandardResultsSetPagination
from commons.permissions import CustomJobAuthenticationPermission
from django.db import transaction
from django.db.models import Count
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import OpenApiExample, extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.generics import ListAPIView
from rest_framework.mixins import ListModelMixin
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from jobs.models import Category, Job, Location, Tag
from jobs.utils import get_current_week_jobs

from .filters import JobFilter, LocationFilter, TagFilter
from .serializers import (
    CategorySerializer,
    CreateMultipleLocationsSerializer,
    CreateMultipleTagsSerializer,
    JobListSerializer,
    JobRetrieveSerializer,
    JobSerializer,
    LocationIDSerializer,
    LocationSerializer,
    TagIDSerializer,
    TagSerializer,
    TagWithFrequencySerializer,
)


class JobListViewSet(ListAPIView):
    queryset = Job.objects.filter(visible=True).order_by("-verified", "-updated_at")
    serializer_class = JobListSerializer
    filter_backends = [
        DjangoFilterBackend,
    ]
    filterset_class = JobFilter
    pagination_class = StandardResultsSetPagination


class JobViewSet(ModelViewSet):
    queryset = Job.objects.filter(visible=True).order_by("-verified", "-updated_at")
    serializer_class = JobSerializer

    permission_classes = [CustomJobAuthenticationPermission]

    def get_queryset(self):
        return self.request.user.jobs.all().order_by("-updated_at")

    def get_serializer_class(self):
        match self.action:
            case "list":
                return JobListSerializer
            case "retrieve":
                return JobRetrieveSerializer
            case "retrieve_by_slug":
                return JobRetrieveSerializer
            case _:
                return JobSerializer

    @action(
        detail=False,
        methods=["get"],
        url_path="by-slug/(?P<slug>[-\w]+)",
        url_name="retrieve_by_slug",
        permission_classes=[AllowAny],
    )
    def retrieve_by_slug(self, request, slug=None):
        job = get_object_or_404(Job, slug=slug)
        serializer = self.get_serializer(job)
        return Response(serializer.data)


class TagListViewSet(ListModelMixin, GenericViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    filter_backends = [
        DjangoFilterBackend,
    ]
    filterset_class = TagFilter
    pagination_class = StandardResultsSetPagination

    @extend_schema(
        parameters=None,
        request={
            "application/json": {
                "type": "object",
                "properties": {
                    "ids": {
                        "type": "array",
                        "items": {"type": "integer"},
                        "description": "List of tag IDs to retrieve",
                    },
                },
                "required": ["ids"],
            }
        },
        responses={200: TagSerializer(many=True)},
        description="Retrieve multiple tags by their IDs",
        examples=[
            OpenApiExample(
                "Example request",
                value={"ids": [1, 2, 3]},
                request_only=True,
            ),
        ],
    )
    @action(detail=False, methods=["post"], url_path="bulk-retrieve")
    def bulk_retrieve(self, request):
        tag_ids = request.data.get("ids", [])

        if not isinstance(tag_ids, list):
            return Response(
                {"error": "The 'ids' field must be a list of integers."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            tag_ids = [int(id) for id in tag_ids]
        except ValueError:
            return Response(
                {"error": "All IDs must be integers."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        tags = Tag.objects.filter(id__in=tag_ids)
        serializer = self.get_serializer(tags, many=True)
        return Response(serializer.data)

    @extend_schema(
        parameters=None,
        responses={200: TagWithFrequencySerializer(many=True)},
        description="Retrieve the top tags of all the jobs of the week",
    )
    @action(detail=False, methods=["get"], url_path="top-tags")
    def top_tags(self, request):
        weekly_jobs = get_current_week_jobs()
        weekly_jobs_ids = weekly_jobs.values_list("id", flat=True)
        top_tags = (
            Tag.objects.filter(job__in=weekly_jobs_ids)
            .annotate(frequency=Count("job"))  # Count how many jobs use each tag
            .order_by("-frequency")  # Sort by frequency in descending order
            .distinct()[:20]  # Limit to top 20 tags
        )
        serializer = TagWithFrequencySerializer(top_tags, many=True)
        return Response(serializer.data)


class TagViewSet(ModelViewSet, ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    @extend_schema(
        request=CreateMultipleTagsSerializer,
        responses={201: TagIDSerializer(many=True)},
        description="Create multiple tags if they don't exist, or retrieve their IDs if they do.",
        examples=[
            OpenApiExample(
                "Example request",
                value={"tags": ["tag1", "tag2", "tag3"]},
                request_only=True,
            ),
        ],
    )
    @action(detail=False, methods=["post"], url_name="create_tags")
    def create_tags(self, request):
        serializer = CreateMultipleTagsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        tags = serializer.validated_data["tags"]

        with transaction.atomic():
            tag_ids = []
            for tag_text in tags:
                tag, _ = Tag.objects.get_or_create(text=tag_text)
                tag_ids.append(tag.id)

        response_serializer = TagIDSerializer(
            data=[{"id": id} for id in tag_ids], many=True
        )
        response_serializer.is_valid()

        return Response(response_serializer.data, status=status.HTTP_201_CREATED)


class LocationListViewSet(ListModelMixin, GenericViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    filter_backends = [
        DjangoFilterBackend,
    ]
    filterset_class = LocationFilter
    pagination_class = StandardResultsSetPagination

    @extend_schema(
        parameters=None,
        request={
            "application/json": {
                "type": "object",
                "properties": {
                    "ids": {
                        "type": "array",
                        "items": {"type": "integer"},
                        "description": "List of tag IDs to retrieve",
                    },
                },
                "required": ["ids"],
            }
        },
        responses={200: LocationSerializer(many=True)},
        description="Retrieve multiple tags by their IDs",
        examples=[
            OpenApiExample(
                "Example request",
                value={"ids": [1, 2, 3]},
                request_only=True,
            ),
        ],
    )
    @action(detail=False, methods=["post"], url_path="bulk-retrieve")
    def bulk_retrieve(self, request):
        tag_ids = request.data.get("ids", [])

        if not isinstance(tag_ids, list):
            return Response(
                {"error": "The 'ids' field must be a list of integers."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            tag_ids = [int(id) for id in tag_ids]
        except ValueError:
            return Response(
                {"error": "All IDs must be integers."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        tags = Location.objects.filter(id__in=tag_ids)
        serializer = self.get_serializer(tags, many=True)
        return Response(serializer.data)


class LocationViewSet(ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

    @extend_schema(
        request=CreateMultipleLocationsSerializer,
        responses={201: LocationIDSerializer(many=True)},
        description="Create multiple locations if they don't exist, or retrieve their IDs if they do.",
        examples=[
            OpenApiExample(
                "Example request",
                value={
                    "locations": [
                        {"location": "Asia", "location_type": "region"},
                        {"location": "United States", "location_type": "country"},
                        {"location": "New York", "location_type": "city"},
                    ]
                },
                request_only=True,
            ),
        ],
    )
    @action(detail=False, methods=["post"], url_name="create_locations")
    def create_locations(self, request):
        serializer = CreateMultipleLocationsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        locations = serializer.validated_data["locations"]

        with transaction.atomic():
            location_ids = []
            for location_item in locations:
                location, _ = Location.objects.get_or_create(
                    location=location_item["location"],
                    defaults={
                        "location": location_item["location"],
                        "location_type": location_item["location_type"],
                    },
                )
                location_ids.append(location.id)
        response_serializer = TagIDSerializer(
            data=[{"id": id} for id in location_ids], many=True
        )
        response_serializer.is_valid()

        return Response(response_serializer.data, status=status.HTTP_201_CREATED)


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
