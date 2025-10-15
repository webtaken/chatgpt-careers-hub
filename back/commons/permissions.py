from rest_framework.permissions import IsAuthenticated


class CustomJobAuthenticationPermission(IsAuthenticated):
    def has_permission(self, request, view):
        if view.action == "retrieve_by_slug":
            return True
        return super().has_permission(request, view)


class NewsletterPostPermission(IsAuthenticated):
    """
    Custom permission for newsletter posts.
    - READ operations (list, retrieve): No permission required (AllowAny)
    - WRITE operations (create, update, delete): Authentication required
    """

    def has_permission(self, request, view):
        # Allow read operations without any permission
        if view.action in ["list", "retrieve"]:
            return True

        # Require authentication for write operations
        if view.action in ["create", "update", "partial_update", "destroy"]:
            return super().has_permission(request, view)

        return True

    def has_object_permission(self, request, view, obj):
        # For read operations, always allow (no permission required)
        if view.action in ["retrieve"]:
            return True

        # For write operations, require authentication
        if view.action in ["update", "partial_update", "destroy"]:
            return request.user.is_authenticated

        return True
