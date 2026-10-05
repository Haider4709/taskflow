from django.contrib.auth.models import User
from rest_framework.test import APITestCase


class ProjectAPITest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="testpassword",
        )

        self.client.force_authenticate(
            user=self.user
        )

    def test_create_project(self):
        response = self.client.post(
            "/api/projects/",
            {
                "name": "Test Project",
                "description": "Testing",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            201,
        )

        self.assertEqual(
            response.data["name"],
            "Test Project",
        )

    def test_project_list_requires_authentication(self):
        self.client.force_authenticate(
            user=None
        )

        response = self.client.get(
            "/api/projects/"
        )

        self.assertEqual(
            response.status_code,
            401,
        )
