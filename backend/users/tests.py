from itertools import product
from django.test import TestCase
from .models import CustomUser
# Create your tests here.

class ProductTestCase(TestCase):
    def setUp(self):
        CustomUser.objects.create(username='admin')

    def test_user_has_properties_as_provided(self):
        userObj = CustomUser.objects.get(username='admin')
        self.assertEqual(userObj.username, 'admin')
        self.assertEqual(userObj.role, 1)
