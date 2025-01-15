from django.db import models
from django.utils import timezone
from product.models import Product
from users.models import CustomUser
# Create your models here.

class Order(models.Model):
    NumberOfProducts = models.IntegerField(default=0)
    Date = models.DateTimeField(default=timezone.now)
    TotalExpense= models.FloatField(default=0.0)
    ExpenseWithoutTaxes=models.FloatField(default=0.0)
    Taxes=models.FloatField(default=0.0)
    product = models.ForeignKey(Product, on_delete = models.CASCADE, related_name='productordered')
    user = models.ForeignKey(CustomUser, on_delete = models.CASCADE, related_name='userorder')

    def __str__(self):
        return 'Date: '+ str(self.Date)+' Total Expense: '+ str(self.TotalExpense) + '. ProductID: ' + str(self.product.id)


