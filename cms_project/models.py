from django.db import models
from cms.models import CMSPlugin


class HeaderPluginModel(CMSPlugin):
    heading = models.CharField(max_length=20, default='True')

    def __str__(self):
        return self.heading


class ContactUsQuery(models.Model):
    f_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    message = models.CharField(max_length=500)

    def __str__(self):
        return "Query by " + " " + self.f_name
