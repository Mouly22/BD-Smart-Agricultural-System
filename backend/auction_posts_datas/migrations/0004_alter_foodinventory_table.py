# Generated by Django 4.2.5 on 2023-11-22 11:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auction_posts_datas', '0003_alter_foodinventory_table'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='foodinventory',
            table='farmer_auction_posts_inventory_list',
        ),
    ]
