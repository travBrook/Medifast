# Generated by Django 2.1.1 on 2018-12-03 20:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Doctor_profile', '0002_booking'),
    ]

    operations = [
        migrations.AddField(
            model_name='doctor_profile',
            name='Address',
            field=models.CharField(default='900 E. Seventh Street', max_length=200),
        ),
        migrations.AddField(
            model_name='doctor_profile',
            name='Zip_code',
            field=models.IntegerField(default=47405),
        ),
    ]