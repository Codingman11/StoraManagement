# Generated by Django 4.0.4 on 2022-06-21 05:53

from django.db import migrations, models
import product.managers
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('name', models.CharField(max_length=200)),
                ('SKU', models.CharField(max_length=12, unique=True)),
                ('UPC', models.CharField(blank=True, default=product.managers.generateCodeNumber12, max_length=12, unique=True)),
                ('EAN', models.CharField(blank=True, default=product.managers.generateCodeNumber13, max_length=13, unique=True)),
                ('MPN', models.CharField(blank=True, default=product.managers.generateCodeNumber12, max_length=12, unique=True)),
                ('ISBN', models.CharField(blank=True, max_length=18)),
                ('available_units', models.IntegerField(default=0)),
                ('minimum_units', models.IntegerField(default=1)),
                ('manufacturer', models.CharField(blank=True, max_length=100)),
                ('brand', models.CharField(blank=True, max_length=200)),
                ('cost_price', models.FloatField(default=0.0)),
                ('sell_price', models.FloatField(default=0.0)),
                ('tax_percentage', models.FloatField(default=0.0)),
                ('dimensions', models.CharField(blank=True, max_length=30)),
                ('image', models.ImageField(blank=True, upload_to='images/')),
                ('weight', models.FloatField(default=0)),
            ],
            options={
                'ordering': ['SKU'],
            },
        ),
    ]
