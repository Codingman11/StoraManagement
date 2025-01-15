from django.db import models
from django.utils import timezone
from product.models import Product
from users.models import CustomUser
# Create your models here.

class Sale(models.Model):
    NumberOfProducts = models.IntegerField(default=0)
    Date = models.DateTimeField(default=timezone.now)
    TotalIncome= models.FloatField(default=0.0)
    IncomeWithoutTaxes=models.FloatField(default=0.0)
    Taxes=models.FloatField(default=0.0)
    product = models.ForeignKey(Product, on_delete = models.CASCADE, related_name='productsold')
    user = models.ForeignKey(CustomUser, on_delete = models.CASCADE, related_name='usersale')

    def __str__(self):
        return ' Number of products: ' + str(self.NumberOfProducts) + '. Total Income: '+ str(self.TotalIncome)+ '. ProductID: '+ str(self.product.id)