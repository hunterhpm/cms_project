from django_restful_admin import admin
from .models import ContactUsQuery
from cms.models import Page, PageType, GlobalPagePermission, StaticPlaceholder
from djangocms_blog.models import BlogCategory, Post
from djangocms_blog.cms_appconfig import BlogConfig
from djangocms_file.models import Folder, File
from djangocms_picture.models import Picture
from djangocms_snippet.models import Snippet
from djangocms_icon.models import Icon
from djangocms_link.models import Link
from djangocms_style.models import Style
from djangocms_video.models import VideoPlayer, VideoSource, VideoTrack
from djangocms_text_ckeditor.models import Text
from taggit.models import Tag
from django.contrib.sites.models import Site
from djangocms_bootstrap4.contrib.bootstrap4_alerts.models import Bootstrap4Alerts
from djangocms_bootstrap4.contrib.bootstrap4_badge.models import Bootstrap4Badge
from djangocms_bootstrap4.contrib.bootstrap4_card.models import Bootstrap4Card, Bootstrap4CardInner
from djangocms_bootstrap4.contrib.bootstrap4_carousel.models import Bootstrap4Carousel, Bootstrap4CarouselSlide
from djangocms_bootstrap4.contrib.bootstrap4_collapse.models import Bootstrap4Collapse, Bootstrap4CollapseContainer, Bootstrap4CollapseTrigger
from djangocms_bootstrap4.contrib.bootstrap4_content.models import Bootstrap4Code, Bootstrap4Figure, Bootstrap4Blockquote
from djangocms_bootstrap4.contrib.bootstrap4_grid.models import Bootstrap4GridContainer, Bootstrap4GridRow, Bootstrap4GridColumn
from djangocms_bootstrap4.contrib.bootstrap4_jumbotron.models import Bootstrap4Jumbotron
from djangocms_bootstrap4.contrib.bootstrap4_link.models import Bootstrap4Link
from djangocms_bootstrap4.contrib.bootstrap4_listgroup.models import Bootstrap4ListGroup, Bootstrap4ListGroupItem
from djangocms_bootstrap4.contrib.bootstrap4_media.models import Bootstrap4Media, Bootstrap4MediaBody
from djangocms_bootstrap4.contrib.bootstrap4_picture.models import Bootstrap4Picture
from djangocms_bootstrap4.contrib.bootstrap4_tabs.models import Bootstrap4Tab, Bootstrap4TabItem
from djangocms_bootstrap4.contrib.bootstrap4_utilities.models import Bootstrap4Spacing

admin.site.register(ContactUsQuery)

# CMS models
admin.site.register(Page)
admin.site.register(PageType)
admin.site.register(GlobalPagePermission)
admin.site.register(StaticPlaceholder)
admin.site.register(BlogCategory)
admin.site.register(Post)
admin.site.register(BlogConfig)
admin.site.register(Folder)
admin.site.register(Picture)
admin.site.register(Snippet)
admin.site.register(Tag)
admin.site.register(Site)
admin.site.register(Bootstrap4Alerts)
admin.site.register(Bootstrap4Badge)
admin.site.register(Bootstrap4Card)
admin.site.register(Bootstrap4CardInner)
admin.site.register(Bootstrap4Carousel)
admin.site.register(Bootstrap4CarouselSlide)
admin.site.register(Bootstrap4Collapse)
admin.site.register(Bootstrap4CollapseContainer)
admin.site.register(Bootstrap4CollapseTrigger)
admin.site.register(Bootstrap4Blockquote)
admin.site.register(Bootstrap4Code)
admin.site.register(Bootstrap4Figure)
admin.site.register(Bootstrap4GridContainer)
admin.site.register(Bootstrap4GridRow)
admin.site.register(Bootstrap4GridColumn)
admin.site.register(Bootstrap4Jumbotron)
admin.site.register(Bootstrap4Link)
admin.site.register(Bootstrap4ListGroup)
admin.site.register(Bootstrap4ListGroupItem)
admin.site.register(Bootstrap4Media)
admin.site.register(Bootstrap4MediaBody)
admin.site.register(Bootstrap4Picture)
admin.site.register(Bootstrap4Tab)
admin.site.register(Bootstrap4TabItem)
admin.site.register(Bootstrap4Spacing)
admin.site.register(File)
admin.site.register(Icon)
admin.site.register(Link)
admin.site.register(Style)
admin.site.register(VideoPlayer)
admin.site.register(VideoSource)
admin.site.register(VideoTrack)
admin.site.register(Text)
