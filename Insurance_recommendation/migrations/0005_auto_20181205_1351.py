# Generated by Django 2.1.1 on 2018-12-05 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Insurance_recommendation', '0004_insurance_recommendation_insurance_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='insurance_details',
            name='username',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='insurance_recommendation',
            name='current_plan',
            field=models.BooleanField(default=False),
        ),
    ]
