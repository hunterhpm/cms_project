from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Role


@receiver(post_save, sender=User)
def create_role(sender, instance, created, **kwargs):
	if created:
		Role.objects.create(user=instance, )
