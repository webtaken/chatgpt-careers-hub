import logging
from datetime import timedelta

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
from jobs.services.tag_normalization import normalize_all_tags
from jobs.utils import get_current_week_jobs

logger = logging.getLogger(__name__)


def send_weekly_email():
    week_jobs = get_current_week_jobs()
    page = 1
    size = 100
    while True:
        subscriptions = Subscription.objects.all().order_by("updated_at")[
            (page - 1) * size : page * size
        ]

        if not subscriptions:
            break

        for sub in subscriptions:
            if sub.email:
                response = send_email(
                    get_html_string(
                        "jobs/emails/weekly_jobs_email.html",
                        {"jobs_list": week_jobs},
                    ),
                    "Weekly jobs alert",
                    [{"email": sub.email}],
                )
                print(str(response))
        page += 1


def remove_old_jobs():
    today = timezone.now()
    Job.objects.filter(created_at__lt=today - timedelta(weeks=8)).delete()
    print("Removed old jobs.")


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


def normalize_job_tags():
    threshold = getattr(settings, "TAG_NORMALIZATION_THRESHOLD", 85)
    dry_run = getattr(settings, "TAG_NORMALIZATION_DRY_RUN", True)
    logger.info(
        "Running tag normalization with threshold=%s dry_run=%s", threshold, dry_run
    )
    reports = normalize_all_tags(threshold=threshold, dry_run=dry_run)
    logger.info("Completed tag normalization. Clusters affected: %s", len(reports))


class Command(BaseCommand):
    help = "Runs APScheduler."

    def handle(self, *args, **options):
        scheduler = BlockingScheduler(timezone=settings.TIME_ZONE)
        scheduler.add_jobstore(DjangoJobStore(), "default")

        scheduler.add_job(
            remove_old_jobs,
            trigger=CronTrigger(minute="00", hour="00", day_of_week="sun"),
            id="remove_old_jobs",
            max_instances=1,
            replace_existing=True,
        )
        print("Added job 'remove_old_jobs'.")

        scheduler.add_job(
            normalize_job_tags,
            trigger=CronTrigger(minute="30", hour="01", day_of_week="sun"),
            id="normalize_job_tags",
            max_instances=1,
            replace_existing=True,
        )
        print("Added job 'normalize_job_tags'.")

        scheduler.add_job(
            send_weekly_email,
            trigger=CronTrigger(minute="00", hour="16", day_of_week="fri"),
            id="send_weekly_email",
            max_instances=1,
            replace_existing=True,
        )
        print("Added job 'send_weekly_email'.")

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
