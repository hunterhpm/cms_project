from django.contrib.auth import authenticate
from django.contrib.auth.models import User, Group
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django_restful_admin import admin as api_admin
from django_restful_admin.admin import RestFulModelAdmin
from rest_framework import filters
from rest_framework import status, generics
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from cms_project.models import ContactUsQuery
from .forms import UserForm
from .models import Role
from .serializers import RoleSerializer, LoginSerializer, UserListSerializer, UserSerializer, ContactUsQuerySerializer


@require_http_methods(["POST"])
@csrf_exempt
def registration(request):
    print('this is called ')
    form = UserForm(request.POST)
    if form.is_valid():
        user = form.save()
        user._role = request.POST['role']
        user.save()
        content = {'message': 'You Registered Successfully!'}
    else:
        content = {
            'message': 'Oops, Failed! :(',
            'errors': form.errors
        }
    return JsonResponse(content)


class UserRoleView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        role = Role.objects.get(user=user).role
        content = {'role': role}
        return Response(content)


class UserRoleViewSets(viewsets.ModelViewSet):
    model = Role
    serializer_class = RoleSerializer
    queryset = Role.objects.all()
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        user = Role.objects.get(user=self.request.user)
        return user


class UserLoginView(generics.GenericAPIView):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)

    @csrf_exempt
    def post(self, request):
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            print(username, password)
            user = authenticate(username=username, password=password)
            print(user)
            if user:
                token, _ = Token.objects.get_or_create(user=user)
                return Response({'token': token.key},
                                status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'wrong credentials'}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            return Response({'msg': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @csrf_exempt
    def get(self, request: Request, *args, **kwargs):
        if kwargs.get('pk') == 'me':
            response_data = self.get_serializer(request.user).data
            print('this resons')
            print(request)
            # response_data['permissions'] = Permission.objects.filter(id__in=request.user.user_permissions.values_list('id', flat=True)).values_list('codename', flat=True)
            # response_data['group_permissions'] = request.user.groups.first().permissions.all().values_list('codename', flat=True)
            # response_data['groups'] = request.user.groups.first().name
            # if request.user.contact.exists():
            # 	response_data['media'] = AbMedias.get_media(request.user.contact.first(), 'App\\Contact')
            # else:
            # 	response_data['media'] = None
            return Response(response_data)

        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


# @csrf_exempt
# @api_view(["POST"])
# @permission_classes((AllowAny,))
# @authentication_classes([])
# def login(request):
#     try:
#         username = request.data.get('username')
#         password = request.data.get('password')
#         print(username, password)
#         user = authenticate(username=username, password=password)
#         print(user)
#         if user:
#             token, _ = Token.objects.get_or_create(user=user)
#             return Response({'token': token.key},
#                 status=status.HTTP_200_OK)
#         else:
#             return Response({'msg': 'wrong credentials'}, status=status.HTTP_403_FORBIDDEN)
#     except Exception as e:
#         return Response({'msg': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UsersListView(APIView):
    def get(self, request):
        try:
            user_objs = User.objects.all()
            user_objs_serializer = UserListSerializer(user_objs, many=True)
            response = {}
            response['user_list'] = user_objs_serializer.data
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'msg': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserDetailView(APIView):
    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
            user_serializer = UserSerializer(user)
            response = {}
            response['user_data'] = user_serializer.data
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'msg': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        try:
            user = User.objects.get(id=id)
            user_serializer = UserSerializer(user, data=request.data, partial=True)
            if user_serializer.is_valid():
                user_serializer.save()
                response = {}
                response['msg'] = 'updated'
                response['user_data'] = user_serializer.data
                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response({'msg': str(user_serializer.errors)}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'msg': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ContactQueryListView(APIView):
    def get(self, request):
        try:
            contact_us_objs = ContactUsQuery.objects.all()
            contact_us_serializers = ContactUsQuerySerializer(contact_us_objs, many=True)
            response = {}
            response['data'] = contact_us_serializers.data
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'msg': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ContactUsQueryDetailView(APIView):
    def get(self, request, id):
        try:
            contact_us_obj = ContactUsQuery.objects.get(id=id)
            contact_us_serializers = ContactUsQuerySerializer(contact_us_obj)
            response = {}
            response['data'] = contact_us_serializers.data
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'msg': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_admin.register(User)
class UserApiAdmin(RestFulModelAdmin):
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email', 'first_name', 'last_name']
    permission_classes = []


@api_admin.register(Group)
class GroupApiAdmin(RestFulModelAdmin):
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
    permission_classes = []
