# Generated by Django 2.1.1 on 2018-12-04 00:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Insurance_recommendation', '0002_auto_20181203_1505'),
    ]

    operations = [
        migrations.CreateModel(
            name='Insurance_details',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company', models.CharField(max_length=100, null=True)),
                ('plan', models.CharField(max_length=100, null=True)),
                ('coverage', models.IntegerField()),
            ],
        ),
    ]
