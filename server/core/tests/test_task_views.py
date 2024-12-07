import datetime

import pytest
from django.urls import reverse

from constants import Endpoints
from core.models import Task, TaskPriority


@pytest.mark.django_db
def test_whenGETTasksUnderAProject_responseIsPaginated(auth_client, user, project):
    tasks = [Task(
        title=f"{i}",
        description=f"{i}",
        project=project,
        assignee=user,
        deadline=datetime.datetime.now() + datetime.timedelta(days=1),
        priority=TaskPriority.HIGH.value
    ) for i in range(10)]

    Task.objects.bulk_create(tasks)

    url = reverse(Endpoints.TASK_BASE, kwargs={'project_id': project.id})
    response = auth_client.get(url)

    assert response.status_code == 200

