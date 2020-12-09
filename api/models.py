from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.


class Role(models.Model):
    ROLES = (
        ('Admin', 'Admin'),
        ('User', 'User')
    )
    role = models.CharField(max_length=10, choices=ROLES, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_role')

    def __str__(self):
        return self.user.username + "_" + self.role
