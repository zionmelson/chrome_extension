# Generated by Django 4.2.1 on 2023-06-03 13:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0006_alter_usermodel_headshot_alter_usermodel_resume'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='agerangemodel',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='agerangemodel',
            name='deleted_at',
        ),
        migrations.RemoveField(
            model_name='agerangemodel',
            name='is_deleted',
        ),
        migrations.RemoveField(
            model_name='agerangemodel',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='attributesmodel',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='attributesmodel',
            name='deleted_at',
        ),
        migrations.RemoveField(
            model_name='attributesmodel',
            name='is_deleted',
        ),
        migrations.RemoveField(
            model_name='attributesmodel',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='companiesmodel',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='companiesmodel',
            name='deleted_at',
        ),
        migrations.RemoveField(
            model_name='companiesmodel',
            name='is_deleted',
        ),
        migrations.RemoveField(
            model_name='companiesmodel',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='skillsmodel',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='skillsmodel',
            name='deleted_at',
        ),
        migrations.RemoveField(
            model_name='skillsmodel',
            name='is_deleted',
        ),
        migrations.RemoveField(
            model_name='skillsmodel',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='usertypemodel',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='usertypemodel',
            name='deleted_at',
        ),
        migrations.RemoveField(
            model_name='usertypemodel',
            name='is_deleted',
        ),
        migrations.RemoveField(
            model_name='usertypemodel',
            name='updated_at',
        ),
    ]