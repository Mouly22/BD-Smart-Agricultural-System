# Generated by Django 4.2.5 on 2023-11-30 19:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pending_businessmen_payment', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='react',
            name='location',
            field=models.CharField(default='some_default_value', max_length=255),
        ),
    ]
