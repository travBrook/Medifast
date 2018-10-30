# Generated by Django 2.1.1 on 2018-10-29 22:33

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('docusername', models.CharField(max_length=100, null=True)),
                ('patientusername', models.CharField(max_length=100, null=True)),
                ('bdate', models.DateField(null=True)),
                ('btime', django.contrib.postgres.fields.ArrayField(base_field=models.TimeField(), null=True, size=None)),
            ],
        ),
        migrations.CreateModel(
            name='Doctor_appointments',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100, null=True)),
                ('workingdays', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100), null=True, size=None)),
                ('time', django.contrib.postgres.fields.ArrayField(base_field=models.TimeField(), null=True, size=None)),
            ],
        ),
        migrations.CreateModel(
            name='Doctor_profile',
            fields=[
                ('username', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=254, null=True)),
                ('First_name', models.CharField(max_length=100, null=True)),
                ('Last_Name', models.CharField(max_length=100, null=True)),
                ('gender', models.CharField(max_length=10, null=True)),
                ('DOB', models.DateField(null=True)),
                ('specialization', models.CharField(max_length=100, null=True)),
                ('Hospital', models.CharField(max_length=100, null=True)),
                ('rating', models.IntegerField(null=True)),
                ('hourly_charge', models.IntegerField(null=True)),
                ('location', models.CharField(max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Doctor_reviews',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100, null=True)),
                ('reviews', models.CharField(max_length=1000, null=True)),
            ],
        ),
    ]
