# Generated by Django 3.1.3 on 2020-11-23 09:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('animales', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='animales',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
