# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function, unicode_literals

from cms.sitemaps import CMSSitemap
from django.conf import settings
from django.conf.urls import include, url
from django.urls import path
from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.contrib.sitemaps.views import sitemap
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.views.static import serve
from . import views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django_restful_admin import admin as api_admin 


schema_view = get_schema_view(
   openapi.Info(
      title="Django Admin API",
      default_version='v1',
      description="This API is in development",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="creative.joomdev@gmail.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)


admin.autodiscover()

urlpatterns = [
    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    url(r'^sitemap\.xml$', sitemap,
        {'sitemaps': {'cmspages': CMSSitemap}}),
    url('adm/', include('api.urls')),
]

urlpatterns += i18n_patterns(
    url(r'^admin/', admin.site.urls),  # NOQA
    path('contact-form', views.ContactFormView),
    url(r'^taggit_autosuggest/', include('taggit_autosuggest.urls')),
    url(r'^', include('cms.urls')),
    # url(r'^new_admin', views.new_admin),
   
)
    

# This is only needed when using runserver.
if settings.DEBUG:
    urlpatterns = [
        url(r'^media/(?P<path>.*)$', serve,
            {'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),
        ] + staticfiles_urlpatterns() + urlpatterns
