from django_restful_admin import admin
from .models import Role
from django.contrib.auth.models import User, Group, Permission
from django.contrib.auth.models import User, Group, Permission
# Register your models here.

# Auth models
# admin.site.register(Group)
# admin.site.register(User)
admin.site.register(Permission)

