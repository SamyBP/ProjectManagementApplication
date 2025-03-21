# Generated by Django 5.1.3 on 2024-12-08 17:11

import core.models.task
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0003_task_created_at_task_deadline_task_task_status_check_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="task",
            name="status",
            field=models.CharField(
                choices=core.models.task.TaskStatus.choices, default="ASSIGNED"
            ),
        ),
        migrations.AlterField(
            model_name="task",
            name="title",
            field=models.TextField(unique=True),
        ),
    ]
