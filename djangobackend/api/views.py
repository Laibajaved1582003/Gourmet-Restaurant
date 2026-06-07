from decimal import Decimal
from django.utils import timezone
from datetime import timedelta
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import MenuItems, CustomerModel, OrdersList
from .serializers import MenuSerializer, RegistrationView, LoginSerializer, UserChangePassSerializer, UserProfileSerializer, OrderListSerializer, UserPasswordResetEmailSerializer, UserPasswordResetSerializer
from rest_framework.generics import ListAPIView
from django.contrib.auth import authenticate
from api.renderer import UserRenderer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.filters import SearchFilter
from .MyPaginations import MyCursorPagination


#Generate Token Manually
def get_token_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token)
    }


class UserRegistrationView(APIView):
    # throttle_classes = [ScopedRateThrottle] #--Scoped Rate Throttle
    # throttle_scope = ['viewstu']
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = RegistrationView(data = request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token=get_token_for_user(user)

            return Response({'token':token , 'message': 'Registration Successful'}, status=201)
        return Response(serializer.errors, status=400)


class UserLoginView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = LoginSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            
            user = authenticate(email = email , password = password)
            token= get_token_for_user(user)
            print(user.name)
            
            if user is not None:
                return Response({
                    'token':token,
                    'name': user.name,
                    'email':user.email,
                    'message': 'Login Successful'}, status=status.HTTP_200_OK)
            else:
                return Response({'errors':{ 'non_field_errors': ['email or password is not Valid']}}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(APIView):
    permission_classes=[IsAuthenticated]
    renderer_classes = [UserRenderer]
    def get(self, request, format=None):
        serializer =  UserProfileSerializer(request.user)
        print(serializer.data)
        return Response(serializer.data, status=201)



class UserChangePassword(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        serializer = UserChangePassSerializer(data = request.data, context = {'user': request.user })
        if serializer.is_valid(raise_exception=True):
            return Response({'message': 'Password Changed'}, status=201)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserPasswordResetView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, uid, token, format=None):
        serializer = UserPasswordResetSerializer(data = request.data , context = {'uid': uid, 'token': token})
        if serializer.is_valid(raise_exception=True):
            return Response({'message': 'Password Reset Successfully'}, status=201)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class OrderListView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = OrderListSerializer( data = data)
        try:
            total_amount = Decimal(data.get('TotalAmount', '0').strip() or '0')
        except:
            return Response({"error": "Invalid total amount"}, status=400)

        recentOrder = OrdersList.objects.filter(
            user = request.user,
            TotalAmount = total_amount,
            OrderedAt__gte= timezone.now() - timedelta(seconds=90)
        ).exists()
        if recentOrder:
            return Response({'message': 'Order Already Placed'}, status=status.HTTP_400_BAD_REQUEST)
        
        if serializer.is_valid() and not recentOrder:
            order = serializer.save(user = request.user)
            print(order)
            return Response({'message': 'Order Added to the DataBase', 'order': serializer.data}, status=201)
        else:
           return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        order = OrdersList.objects.filter(user = request.user)
        serializer = OrderListSerializer(order, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK )


class UserPasswordResetEmailView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request):
        serializer = UserPasswordResetEmailSerializer(data = request.data)
        if serializer.is_valid():
            return Response({'message': 'Password Reset Link sent, Please Check your Email'}, status=201)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class MenuItemsList(ListAPIView):
    # throttle_classes = [AnonRateThrottle, UserRateThrottle]  #----Throttling 
    # authentication_classes = [SessionAuthentication]
    # permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = MenuItems.objects.all()
    serializer_class = MenuSerializer
    # pagination_class = MyCursorPagination


class CategoryList(ListAPIView):  # -- ListAPIView A specialized subclass of GenericAPIView used only for read-only operations (GET) to return a list of objects. Comes with built-in functionality like pagination, filtering, and ordering.
    queryset = MenuItems.objects.all()
    serializer_class = MenuSerializer  #--- Concise Version by using Default Django filter Backend
    filterset_fields = ['category']


    # def get_queryset(self):   #-- By overriding get_queryset() function
        
        # queryset = MenuItems.objects.all()
        # category = self.request.query_params.get('category')  #Filtering  , can also be done using .filter()
        # if category:
        #     queryset = queryset.filter(category__iexact=category)
        # return queryset


class MenuItemSearch(ListAPIView):
    queryset = MenuItems.objects.all()
    serializer_class = MenuSerializer
    filter_backends = [SearchFilter]
    search_fields = ['^title']  # -- Order Filtering Works the same way






























# class CustomerList(ListAPIView):
#     queryset = Customer.objects.all()
#     serializer_class = CustomerSerializer
    # authentication_classes = [SessionAuthentication]
    # permission_classes = [IsAuthenticated]


# def Signup(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             serializer = CustomerSerializer(data = data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return JsonResponse({'message': 'User created'}, status=201)
#         except Exception as e:
#              return JsonResponse({'error': str(e)}, status=500)
    


# from .serializers import UserSignupSerializer
# from rest_framework.response import Response
# from rest_framework import status
# from django.contrib.auth import login
# from .serializers import UserSignupSerializer
# from rest_framework.permissions import AllowAny

# from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator

# # in views.py
# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from django.contrib.auth import authenticate
# from rest_framework import serializers

# class EmailTokenObtainSerializer(TokenObtainPairSerializer):
#     username_field = 'email'

#     def validate(self, attrs):
#         email = attrs.get("email")
#         password = attrs.get("password")

#         if email and password:
#             user = authenticate(request=self.context.get('request'), email=email, password=password)

#             if not user:
#                 raise serializers.ValidationError("Invalid email or password")
#         else:
#             raise serializers.ValidationError("Must include 'email' and 'password'")

#         data = super().validate(attrs)
#         return data

# class EmailTokenObtainPairView(TokenObtainPairView):
#     serializer_class = EmailTokenObtainSerializer


# @csrf_exempt
# def signup_view(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             serializer = UserSignupSerializer(data=data)
#             if serializer.is_valid():
#                 user = serializer.save()
#                 login(request, user)
#                 return JsonResponse({'message': 'User created and logged in'}, status=201)
#             return JsonResponse(serializer.errors, status=400)
#         except Exception as e:
#             return JsonResponse({'error': str(e)}, status=500)
#     return JsonResponse({'error': 'Only POST allowed'}, status=405)

# class MeView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user = request.user
#         return Response({
#             'id': user.id,
#             'name': user.username,
#             'email': user.email
#         })




# def CustomerData(request, pk):
#     cus = Customer.objects.get(id=pk)   #model object
#     serialized = CustomerSerializer(cus)  #python native datatype
#     #jsonData = JSONRenderer().render(serialized.data) #JSON data

#     #return HttpResponse(jsonData, content_type ='application/json')
#     return JsonResponse(serialized.data, safe=True)   #another method -- instead of writing two seperate lines

# def AllCustomerData(request):
#     cus = Customer.objects.all()   #model object
#     serialized = CustomerSerializer(cus, many=True)  #python native datatype
#     jsonData = JSONRenderer().render(serialized.data) #JSON data

#     return HttpResponse(jsonData, content_type ='application/json')


#Manual
# def MenuItemData(request):
#     menue = MenuItems.objects.all()
#     serialized = MenuSerializer(menue, many=True)
#     jsonData = JSONRenderer().render(serialized.data)

#     return HttpResponse(jsonData, content_type='application/json' )


