# Generated by Django 5.0.6 on 2024-06-28 01:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.CharField(max_length=200, verbose_name='Location')),
                ('location_type', models.CharField(choices=[('region', 'Region'), ('country', 'Country'), ('city', 'City')], max_length=20, verbose_name='Location Type')),
                ('rank', models.PositiveSmallIntegerField(default=0)),
            ],
            options={
                'db_table': 'locations',
                'indexes': [models.Index(fields=['location'], name='location_idx')],
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=150, verbose_name='Tag')),
            ],
            options={
                'db_table': 'tags',
                'indexes': [models.Index(fields=['text'], name='text_idx')],
            },
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('company_name', models.CharField(max_length=150, verbose_name='Company Name')),
                ('title', models.CharField(max_length=150, verbose_name='Title')),
                ('description', models.TextField(verbose_name='Description')),
                ('remote', models.BooleanField(default=False)),
                ('apply_url', models.URLField(blank=True, null=True, verbose_name='Apply URL')),
                ('apply_by_email', models.BooleanField(default=False)),
                ('apply_email', models.EmailField(blank=True, max_length=254, null=True, verbose_name='Apply E-mail')),
                ('company_email', models.EmailField(max_length=254, verbose_name='Company Email (For Invoice)')),
                ('pin_on_top', models.BooleanField(default=False, verbose_name='Pin on top (30 days)')),
                ('verified', models.BooleanField(default=False, verbose_name='Verified')),
                ('tags', models.ManyToManyField(to='jobs.tag')),
            ],
            options={
                'db_table': 'jobs',
            },
        ),
    ]
