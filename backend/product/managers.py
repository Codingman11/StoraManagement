from multiprocessing.managers import BaseManager
from random import randint
from django.db import models

# Create your models here.
from django.forms import FloatField

# Create your models here.



#Custom Product model for adding.
def generateCodeNumber12():
    range_start = 10**(12-1)
    range_end = (10**12)-1
    return str(randint(range_start, range_end))

def generateCodeNumber13():
    range_start = 10**(13-1)
    range_end = (10**13)-1
    return str(randint(range_start, range_end))





    