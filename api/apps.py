from django.apps import AppConfig


class RolesConfig(AppConfig):
    name = 'api'

    def ready(self):
        import api.signals
