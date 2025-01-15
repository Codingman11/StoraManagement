from itertools import product
from django.test import TestCase
from .models import Order
from product.models import Product
from users.models import CustomUser
# Create your tests here.

class ProductTestCase(TestCase):
    def setUp(self):
        CustomUser.objects.create(username='admin')
        Product.objects.create(name="P1", SKU="SKU", ISBN = "ISBN", available_units = 10, minimum_units = 6, manufacturer = "M1", sell_price = 200, cost_price = 100, tax_percentage = 1)
        Order.objects.create(NumberOfProducts=1, TotalExpense=100,  Taxes = 1, product = Product.objects.get(name="P1"), user = CustomUser.objects.get(username="admin"))

    def test_order_has_properties_as_provided(self):
        orderObj = Order.objects.get(NumberOfProducts=1)
        self.assertEqual(orderObj.NumberOfProducts, 1)
        self.assertEqual(orderObj.TotalExpense, 100)
        self.assertEqual(orderObj.Taxes, 1)
        self.assertEqual(orderObj.product, Product.objects.get(name="P1"))
