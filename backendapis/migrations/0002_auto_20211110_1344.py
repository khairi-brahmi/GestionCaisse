# Generated by Django 2.2.24 on 2021-11-10 13:44

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('backendapis', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='date_added',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]