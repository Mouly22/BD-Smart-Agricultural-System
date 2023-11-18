# Generated by Django 4.2.5 on 2023-11-18 05:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dataforfoods', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='foodinventory',
            name='items',
            field=models.ManyToManyField(related_name='food_inventory', to='dataforfoods.fooditem'),
        ),
        migrations.AlterField(
            model_name='fooditem',
            name='quality',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='fooditem',
            name='quantity',
            field=models.IntegerField(),
        ),
    ]
