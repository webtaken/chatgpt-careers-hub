from commons.models import TimeStampedModel
from django.contrib.auth.models import AbstractUser
from django.db.models import CharField, EmailField, JSONField, TextField, URLField


class User(AbstractUser):
    pass


class Subscription(TimeStampedModel):
    email = EmailField(verbose_name="Subscription Email")
    name = CharField(max_length=150, verbose_name="Name", null=True, blank=True)
    title = CharField(max_length=150, verbose_name="Title", null=True, blank=True)
    description = TextField(verbose_name="Description", null=True, blank=True)

    # NOTE: The categories field will be a list of strings separated by commas,
    # containing the categories defined on the Category model
    categories = CharField(
        max_length=1000, verbose_name="Categories", null=True, blank=True
    )

    # NOTE: The skills field will be a list of strings separated by commas
    # containing the skills defined on the Tally form
    skills = CharField(max_length=3000, verbose_name="Skills", null=True, blank=True)

    # NOTE: The work experience field will be a list of dictionaries containing
    # information about the role taken in those companies
    work_experience = JSONField(verbose_name="Work Experience", null=True, blank=True)

    # Social media links
    github_link = URLField(verbose_name="Github profile", null=True, blank=True)
    portfolio_link = URLField(verbose_name="Portfolio", null=True, blank=True)
    linkedin_link = URLField(verbose_name="LinkedIn profile", null=True, blank=True)
    dribbble_link = URLField(verbose_name="Dribbble profile", null=True, blank=True)

    # NOTE: The projects field will be a list of dictionaries containing
    # information about the most important projects made by the user
    projects = JSONField(verbose_name="Projects", null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.email}"
