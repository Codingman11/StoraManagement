import uuid
from statistics import mode
from tabnanny import verbose
from django.db import models
# Create your models here.
from django.forms import FloatField
from .managers import generateCodeNumber12, generateCodeNumber13



# Create your models here.  
class Product(models.Model):

    uuid = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    name = models.CharField(max_length=200)
    SKU = models.CharField(max_length=12, unique=True)
    UPC = models.CharField(max_length=12, unique=True, default= generateCodeNumber12, blank = True)
    EAN = models.CharField(max_length=13, unique=True, default= generateCodeNumber13, blank=True)
    MPN = models.CharField(max_length=12, unique=True, default=generateCodeNumber12, blank=True)
    ISBN = models.CharField(max_length=18, blank=True)
    available_units = models.IntegerField(default=0)
    minimum_units = models.IntegerField(default=1)
    manufacturer = models.CharField(max_length=100, blank = True)
    brand = models.CharField(max_length=200, blank = True)
    cost_price = models.FloatField(default=0.0)
    sell_price = models.FloatField(default=0.0)
    tax_percentage = models.FloatField(default=0.0)
    dimensions = models.CharField(max_length=30, blank = True)
    image = models.ImageField(upload_to='images/', blank = True)
    weight = models.FloatField(default=0) 


    class Meta:
        ordering = ['SKU']

    def __str__(self):
        return self.name + '_' + str(self.cost_price) + '_' + str(self.sell_price) + '_' + str(self.tax_percentage)