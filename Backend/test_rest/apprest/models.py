from __future__ import unicode_literals

from django.db import models


class Autor(models.Model):
    nombre = models.TextField(max_length=100)
    apellido = models.TextField(max_length=100)


class Libro(models.Model):
    nombre = models.TextField(max_length=100)
    editorial = models.TextField(max_length=100)
    genero = models.TextField(max_length=100)
    autor = models.TextField(max_length=100)


class User(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
