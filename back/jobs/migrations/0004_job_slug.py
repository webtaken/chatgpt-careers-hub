# Generated by Django 5.0.6 on 2024-07-04 15:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0003_alter_location_rank'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='slug',
            field=models.SlugField(null=True, unique=True),
        ),
    ]
