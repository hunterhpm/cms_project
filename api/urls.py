from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views
from rest_framework.routers import DefaultRouter
from django_restful_admin import admin as api_admin

# app_name = 'api'

router = DefaultRouter()
# router.register(r'user_role_temp', views.UserRoleViewSets, basename='user_role')

# user_detail = views.UserLoginView.as_view({
# 	'get': 'retrieve',
# 	'put': 'update',
# 	'patch': 'partial_update',
# 	'delete': 'destroy'
# })

urlpatterns = [
                  # path('register/', views.registration, name='register'),
                  path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
                  path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
                  # # path('role/', views.UserRoleView.as_view(), name='user_role'),
                  # path('login/', views.UserLoginView.as_view(), name='login'),
                  path('users/<pk>/', views.UserLoginView.as_view(), name='me'),
                  # path('user-list/', views.UsersListView.as_view(), name='user-list'),
                  # path('user-data/<int:id>', views.UserDetailView.as_view(), name='user-data'),
                  # path('contact-query-detail/<int:id>', views.ContactUsQueryDetailView.as_view(), name='contact-query-detail'),

                  path('', api_admin.site.urls),  # NOQA
              ] + router.urls
