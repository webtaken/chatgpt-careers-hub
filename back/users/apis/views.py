from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiExample, extend_schema
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.viewsets import ViewSet

from users.models import Subscription

from .serializers import SubscribeSerializer


class SubscriptionViewSet(ViewSet):
    @extend_schema(
        request=SubscribeSerializer,
        responses={
            HTTP_200_OK: OpenApiTypes.OBJECT,
            HTTP_400_BAD_REQUEST: OpenApiTypes.OBJECT,
        },
        examples=[
            OpenApiExample(
                "Successful subscription",
                summary="Subscription successful",
                description="Example of a successful subscription response",
                value={"status": "Subscribed!"},
                response_only=True,
                status_codes=["200"],
            ),
            OpenApiExample(
                "Invalid email",
                summary="Invalid email provided",
                description="Example of an error response for invalid email",
                value={"email": ["Enter a valid email address."]},
                response_only=True,
                status_codes=["400"],
            ),
        ],
        description="Subscribe to the mailing list with an email address.",
        summary="Subscribe to mailing list",
    )
    @action(detail=False, methods=["post"])
    def subscribe(self, request: Request):
        serializer = SubscribeSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            new_subscription = Subscription(email=email)
            new_subscription.save()
            return Response({"status": "Subscribed!"}, status=HTTP_200_OK)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
