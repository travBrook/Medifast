# Generated by Django 2.1.1 on 2018-10-20 21:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Doctor_profile', '0016_auto_20181020_1746'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='bTime',
        ),
    ]