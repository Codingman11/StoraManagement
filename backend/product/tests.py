from django.test import TestCase
from .models import Product
# Create your tests here.

class ProductTestCase(TestCase):
    def setUp(self):
        Product.objects.create(name="P1", SKU="SKU", ISBN = "ISBN", available_units = 10, minimum_units = 6, manufacturer = "M1", sell_price = 200, cost_price = 100, tax_percentage = 1)

    def test_product_has_properties_as_provided(self):
        p1 = Product.objects.get(name="P1")
        self.assertEqual(p1.SKU, 'SKU')
        self.assertEqual(p1.available_units, 10)
        self.assertEqual(p1.minimum_units, 6)
        self.assertEqual(p1.sell_price, 200)
        self.assertEqual(p1.cost_price, 100)
        self.assertEqual(p1.tax_percentage, 1)
