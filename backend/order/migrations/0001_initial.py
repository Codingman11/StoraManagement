# Generated by Django 4.0.4 on 2022-06-21 05:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('product', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('NumberOfProducts', models.IntegerField(default=0)),
                ('Date', models.DateTimeField(default=django.utils.timezone.now)),
                ('TotalExpense', models.FloatField(default=0.0)),
                ('ExpenseWithoutTaxes', models.FloatField(default=0.0)),
                ('Taxes', models.FloatField(default=0.0)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='productordered', to='product.product')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='userorder', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
