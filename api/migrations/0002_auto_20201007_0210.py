# Generated by Django 3.0 on 2020-10-06 20:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='role',
            name='role',
            field=models.CharField(blank=True, choices=[('Admin', 'Admin'), ('User', 'User')], max_length=10),
        ),
    ]
