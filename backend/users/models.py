from sqlite3 import Date
from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext as _

from .managers import CustomUserManager

class CustomUser(AbstractUser):
    role = models.IntegerField(default=1)
    ssn = models.CharField(max_length=200, default='00000000')
    contactNumber = models.CharField(max_length=15,default='000000000')
    birthDate = models.DateField(default=Date.today)

    objects = CustomUserManager()

    def __str__(self):
        return '{"name": "' + self.username+ '", "role": '  + str(self.role) +',"id": ' + str(self.id)+'}'

