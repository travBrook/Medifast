# Generated by Django 2.1.1 on 2018-10-05 22:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_account_country_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='country_code',
            field=models.CharField(default='+1', max_length=5),
        ),
    ]
