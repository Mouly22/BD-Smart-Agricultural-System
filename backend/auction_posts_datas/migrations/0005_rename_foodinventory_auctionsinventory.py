# Generated by Django 4.2.5 on 2023-11-22 11:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auction_posts_datas', '0004_alter_foodinventory_table'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='FoodInventory',
            new_name='AuctionsInventory',
        ),
    ]
