# from cms.plugin_base import CMSPluginBase
# from cms.plugin_pool import plugin_pool
# from cms.models.pluginmodel import CMSPlugin
# from django.utils.translation import ugettext_lazy as _

# @plugin_pool.register_plugin
# class MyPlugin(CMSPluginBase):
#     model = CMSPlugin
#     render_template = "cms_project/templates/header_plugin.html"
#     cache = False
from cms.plugin_base import CMSPluginBase
from cms.plugin_pool import plugin_pool
from cms.models.pluginmodel import CMSPlugin
from django.utils.translation import ugettext as _
from .models import HeaderPluginModel


class HeaderPlugin(CMSPluginBase):
    model = HeaderPluginModel  # model where plugin data are saved
    name = _("Header Plugin")  # name of the plugin in the interface
    render_template = "header_plugin.html"

    def render(self, context, instance, placeholder):
        context.update({'instance': instance})
        return context


plugin_pool.register_plugin(HeaderPlugin)  # register the plugin
