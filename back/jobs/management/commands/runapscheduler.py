import logging

from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.cron import CronTrigger
from commons.utils import get_html_string, send_email
from django.conf import settings
from django.core.management.base import BaseCommand
from django.utils import timezone
from django_apscheduler import util
from django_apscheduler.jobstores import DjangoJobStore
from django_apscheduler.models import DjangoJobExecution
from users.models import Subscription

from jobs.models import Job

logger = logging.getLogger(__name__)


def send_weekly_email():
    def get_current_week_jobs():
        today = timezone.now()
        # Returns jobs from the same week number
        return Job.objects.filter(
            updated_at__year=today.year, updated_at__week=today.isocalendar()[1]
        )

    week_jobs = get_current_week_jobs()
    page = 1
    size = 100
    while True:
        subscriptions = Subscription.objects.all().order_by("updated_at")[
            (page - 1) * size : page * size
        ]

        if not subscriptions:
            break

        emails = [subscription.email for subscription in subscriptions]
        send_email(
            get_html_string(
                "jobs/emails/weekly_jobs_email.html",
                {"jobs_list": week_jobs},
            ),
            "Weekly jobs alert",
            [{"email": email} for email in emails],
        )
        page += 1


# The `close_old_connections` decorator ensures that database connections, that have become
# unusable or are obsolete, are closed before and after your job has run. You should use it
# to wrap any jobs that you schedule that access the Django database in any way.
@util.close_old_connections
def delete_old_job_executions(max_age=604_800):
    """
    This job deletes APScheduler job execution entries older than `max_age` from the database.
    It helps to prevent the database from filling up with old historical records that are no
    longer useful.

    :param max_age: The maximum length of time to retain historical job execution records.
                    Defaults to 7 days.
    """
    DjangoJobExecution.objects.delete_old_job_executions(max_age)


class Command(BaseCommand):
    help = "Runs APScheduler."

    def handle(self, *args, **options):
        scheduler = BlockingScheduler(timezone=settings.TIME_ZONE)
        scheduler.add_jobstore(DjangoJobStore(), "default")

        scheduler.add_job(
            send_weekly_email,
            trigger=CronTrigger(minute="00", hour="12", day_of_week="fri"),
            id="send_weekly_email",
            max_instances=1,
            replace_existing=True,
        )
        logger.info("Added job 'send_weekly_email'.")

        scheduler.add_job(
            delete_old_job_executions,
            trigger=CronTrigger(
                day_of_week="mon", hour="00", minute="00"
            ),  # Midnight on Monday, before start of the next work week.
            id="delete_old_job_executions",
            max_instances=1,
            replace_existing=True,
        )
        logger.info("Added weekly job: 'delete_old_job_executions'.")

        try:
            logger.info("Starting scheduler...")
            scheduler.start()
        except KeyboardInterrupt:
            logger.info("Stopping scheduler...")
            scheduler.shutdown()
            logger.info("Scheduler shut down successfully!")
