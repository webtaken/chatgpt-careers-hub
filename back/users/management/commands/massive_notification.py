import logging

from commons.utils import get_html_string, send_email
from django.core.management.base import BaseCommand

from users.models import Subscription

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Send a massive email to newsletter subscribers."

    def add_arguments(self, parser):
        parser.add_argument("email_path", type=str, help="Path to the email file")
        parser.add_argument("subject", type=str, help="Subject of the email")

    def handle(self, *args, **options):
        email_path = options["email_path"]
        subject = options["subject"]
        subs = Subscription.objects.all()
        print(
            f"Sending massive notification to a total of {subs.count()} subscribers..."
        )
        for sub in subs:
            if sub.email:
                response = send_email(
                    get_html_string(email_path, {}), subject, [{"email": sub.email}]
                )
                print(f"Email send to {sub.email} with response {response}")
