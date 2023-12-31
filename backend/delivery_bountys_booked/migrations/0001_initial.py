# Generated by Django 4.2.5 on 2023-11-30 13:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='React',
            fields=[
                ('pending_delivery_id', models.AutoField(primary_key=True, serialize=False)),
                ('deliveryman_userid', models.CharField(max_length=255)),
                ('delivery_state', models.CharField(max_length=255)),
                ('transaction_id', models.CharField(max_length=255)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('product_id', models.IntegerField()),
                ('name', models.CharField(max_length=255)),
                ('location', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'delivery_bounties_booked',
            },
        ),
    ]
