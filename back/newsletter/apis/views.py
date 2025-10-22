from commons.pagination import StandardResultsSetPagination
from commons.permissions import NewsletterPostPermission
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from ..models import Post, Subscriber
from ..serializers import PostSerializer, SubscriberSerializer


class SubscriberViewSet(
    mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet
):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer


class PostViewSet(ModelViewSet):
    """
    ViewSet for managing newsletter posts with full CRUD operations.

    Provides:
    - GET /newsletter/posts/ - List all posts
    - POST /newsletter/posts/ - Create a new post
    - GET /newsletter/posts/{id}/ - Retrieve a specific post
    - PUT /newsletter/posts/{id}/ - Update a specific post (full update)
    - PATCH /newsletter/posts/{id}/ - Partially update a specific post
    - DELETE /newsletter/posts/{id}/ - Delete a specific post
    - GET /newsletter/posts/published/ - List only published posts (public)
    - GET /newsletter/posts/by-slug/{slug}/ - Retrieve post by slug (public)
    """

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [NewsletterPostPermission]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["type", "is_published", "pinned"]
    search_fields = ["title", "body"]

    def get_queryset(self):
        """
        Filter posts based on query parameters.
        - All users can see all posts (no permission restrictions for read operations)
        - Can filter by published status via query parameter
        - Can filter by post type via query parameter
        """
        queryset = Post.objects.all()

        # Filter by published status if specified
        is_published = self.request.query_params.get("published", None)
        if is_published is not None:
            if is_published.lower() == "true":
                queryset = queryset.filter(is_published=True)
            elif is_published.lower() == "false":
                queryset = queryset.filter(is_published=False)

        # Filter by post type if specified
        post_type = self.request.query_params.get("type", None)
        if post_type is not None:
            queryset = queryset.filter(type=post_type)

        return queryset.order_by("-created_at")

    @action(
        detail=False,
        methods=["get"],
        url_path="published",
        url_name="published_posts",
        permission_classes=[AllowAny],
        filter_backends=[DjangoFilterBackend, SearchFilter],
        filterset_fields=["type", "pinned"],
        search_fields=["title", "body"],
    )
    def published_posts(self, request):
        """
        Public endpoint to retrieve only published posts.
        No authentication required.
        Supports filtering by post type and pinned status via query parameters.
        """
        published_posts = Post.objects.filter(is_published=True)

        # Apply Django filters
        for backend in [DjangoFilterBackend(), SearchFilter()]:
            published_posts = backend.filter_queryset(request, published_posts, self)

        published_posts = published_posts.order_by("-created_at")
        page = self.paginate_queryset(published_posts)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(published_posts, many=True)
        return Response(serializer.data)

    @action(
        detail=False,
        methods=["get"],
        url_path="by-slug/(?P<slug>[-\w]+)",
        url_name="retrieve_by_slug",
        permission_classes=[AllowAny],
    )
    def retrieve_by_slug(self, request, slug=None):
        """
        Public endpoint to retrieve a post by its slug.
        No authentication required (READ operations don't require permission).
        """
        try:
            post = Post.objects.get(slug=slug)
            serializer = self.get_serializer(post)
            return Response(serializer.data)
        except Post.DoesNotExist:
            return Response({"detail": "Not found."}, status=404)
