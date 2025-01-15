from itertools import product
from django.test import TestCase
from .models import Sale
from product.models import Product
from users.models import CustomUser
# Create your tests here.

class ProductTestCase(TestCase):
    def setUp(self):
        CustomUser.objects.create(username='admin')
        Product.objects.create(name="P1", SKU="SKU", ISBN = "ISBN", available_units = 10, minimum_units = 6, manufacturer = "M1", sell_price = 200, cost_price = 100, tax_percentage = 1)
        Sale.objects.create(NumberOfProducts=1, TotalIncome=100,  Taxes = 1, product = Product.objects.get(name="P1"), user = CustomUser.objects.get(username="admin"))

    def test_sale_has_properties_as_provided(self):
        saleObj = Sale.objects.get(NumberOfProducts=1)
        self.assertEqual(saleObj.NumberOfProducts, 1)
        self.assertEqual(saleObj.TotalIncome, 100)
        self.assertEqual(saleObj.Taxes, 1)
        self.assertEqual(saleObj.product, Product.objects.get(name="P1"))
