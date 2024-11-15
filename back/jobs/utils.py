from django.utils import timezone

from jobs.models import Job


def get_current_week_jobs():
    today = timezone.now()
    # Returns jobs from the same week number
    return Job.objects.filter(
        updated_at__year=today.year, updated_at__week=today.isocalendar()[1]
    )
