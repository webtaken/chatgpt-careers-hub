from commons.utils import get_html_string, send_email
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiExample, extend_schema
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet

from users.models import Subscription

from .serializers import CountSubscriptionsSerializer, SubscribeSerializer
from .utils import extract_key


class SubscriptionViewSet(ViewSet):
    permission_classes = [
        AllowAny,
    ]

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
            _, created = Subscription.objects.get_or_create(email=email)
            # We send an email only in cases we create a new subscription
            if created:
                response = send_email(
                    get_html_string("jobs/emails/welcome_email.html"),
                    "Welcome to ChatGPT jobs",
                    [{"email": email}],
                )
                print(str(response))
            return Response({"status": "Subscribed!"}, status=HTTP_200_OK)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    @extend_schema(
        responses={
            HTTP_200_OK: CountSubscriptionsSerializer(),
        },
        summary="Get count of subscriptions",
    )
    @action(detail=False, methods=["get"])
    def get_count_subscriptions(self, request: Request):
        count = Subscription.objects.count()
        serializer = CountSubscriptionsSerializer(data={"count": count})
        if serializer.is_valid():
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.data, status=HTTP_200_OK)


class TallyWebhook(APIView):
    """
    Handle the webhook for tally form submission.
    """

    def post(self, request: Request, format=None):
        form_response = request.data
        name = extract_key(form_response["data"]["fields"], "question_OllvZk")
        title = extract_key(form_response["data"]["fields"], "question_dNWL9D")
        description = extract_key(form_response["data"]["fields"], "question_YR5E4z")
        categories_field = extract_key(
            form_response["data"]["fields"], "question_DK4r7X"
        )
        categories = []
        for category_id in categories_field["value"]:
            found_category = next(
                (
                    c["text"]
                    for c in categories_field["options"]
                    if c["id"] == category_id
                ),
                None,
            )
            if found_category:
                categories.append(found_category)

        skills_field = extract_key(form_response["data"]["fields"], "question_lqbo6V")
        skills = []
        for skill_id in skills_field["value"]:
            found_skill = next(
                (c["text"] for c in skills_field["options"] if c["id"] == skill_id),
                None,
            )
            if found_skill:
                skills.append(found_skill)

        company_1 = extract_key(form_response["data"]["fields"], "question_RdGXDv")
        description_company_1 = extract_key(
            form_response["data"]["fields"], "question_oDbr25"
        )
        company_2 = extract_key(form_response["data"]["fields"], "question_GKxNRQ")
        description_company_2 = extract_key(
            form_response["data"]["fields"], "question_OlDp7k"
        )
        company_3 = extract_key(form_response["data"]["fields"], "question_VjLRzN")
        description_company_3 = extract_key(
            form_response["data"]["fields"], "question_PDdMzP"
        )
        work_experience = []
        if company_1:
            work_experience.append(company_1)
        if description_company_1:
            work_experience.append(description_company_1)
        if company_2:
            work_experience.append(company_2)
        if description_company_2:
            work_experience.append(description_company_2)
        if company_3:
            work_experience.append(company_3)
        if description_company_3:
            work_experience.append(description_company_3)

        github_link = extract_key(form_response["data"]["fields"], "question_E5kjxA")
        portfolio_link = extract_key(form_response["data"]["fields"], "question_rBjNop")
        linkedin_link = extract_key(form_response["data"]["fields"], "question_4B4WKd")
        dribbble_link = extract_key(form_response["data"]["fields"], "question_jbadlY")

        projects = []
        first_project_index = 16
        for i in range(first_project_index, len(form_response["data"]["fields"])):
            project_info = form_response["data"]["fields"][i]
            if project_info:
                projects.append(project_info)

        email_field = extract_key(form_response["data"]["fields"], "question_XrxVyd")
        subscription, _ = Subscription.objects.update_or_create(
            email=email_field["value"],
            defaults={
                "name": name["value"],
                "title": title["value"],
                "description": description["value"],
                "categories": ",".join(categories),
                "skills": ",".join(skills),
                "work_experience": work_experience,
                "github_link": github_link["value"],
                "portfolio_link": portfolio_link["value"],
                "linkedin_link": linkedin_link["value"],
                "dribbble_link": dribbble_link["value"],
                "projects": projects,
            },
        )
        print(f"{subscription} updated from tally")

        return Response({}, status=HTTP_200_OK)
