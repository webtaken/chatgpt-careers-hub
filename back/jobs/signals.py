from django.db.models.signals import post_save
from django.dispatch import receiver
from django.template.defaultfilters import slugify

from .models import Job


@receiver(post_save, sender=Job)
def job_post_save(sender, instance: Job, created, **kwargs):
    if created:
        # After Job was create we add its slug
        if not instance.slug or instance.slug == "":
            instance.slug = slugify(
                f"{instance.title} {instance.company_name} {instance.pk}"
            )
            instance.save()
