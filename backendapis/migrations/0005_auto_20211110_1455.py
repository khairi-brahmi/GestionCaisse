# Generated by Django 2.2.24 on 2021-11-10 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backendapis', '0004_auto_20211110_1454'),
    ]

    operations = [
        migrations.AlterField(
            model_name='discountoffer',
            name='offred_products',
            field=models.IntegerField(blank=True, default=1, null=True),
        ),
        migrations.AlterField(
            model_name='discountoffer',
            name='purchased_products',
            field=models.IntegerField(blank=True, default=2, null=True),
        ),
    ]
