# Generated by Django 4.2.1 on 2023-06-02 03:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0002_usermodel_last_login_alter_usermodel_email'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usermodel',
            name='ageRangeId',
        ),
        migrations.RemoveField(
            model_name='usermodel',
            name='companyName',
        ),
        migrations.RemoveField(
            model_name='usermodel',
            name='employId',
        ),
        migrations.RemoveField(
            model_name='usermodel',
            name='github',
        ),
        migrations.RemoveField(
            model_name='usermodel',
            name='headshot',
        ),
        migrations.RemoveField(
            model_name='usermodel',
            name='leetcode',
        ),
        migrations.RemoveField(
            model_name='usermodel',
            name='linkedin',
        ),
        migrations.RemoveField(
            model_name='usermodel',
            name='name',
        ),
        migrations.RemoveField(
            model_name='usermodel',
            name='phonenumber',
        ),
        migrations.RemoveField(
            model_name='usermodel',
            name='resume',
        ),
        migrations.RemoveField(
            model_name='usermodel',
            name='userTypeId',
        ),
    ]
