from rest_framework.permissions import IsAuthenticated


class CustomJobAuthenticationPermission(IsAuthenticated):
    def has_permission(self, request, view):
        if view.action == "retrieve_by_slug":
            return True
        return super().has_permission(request, view)
