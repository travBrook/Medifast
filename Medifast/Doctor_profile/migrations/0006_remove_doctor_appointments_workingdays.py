# Generated by Django 2.1.1 on 2018-10-20 21:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Doctor_profile', '0005_doctor_appointments_time'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='doctor_appointments',
            name='workingdays',
        ),
    ]