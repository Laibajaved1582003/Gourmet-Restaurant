from django.urls import path, include
from api.views import MenuItemsList, CategoryList, UserRegistrationView, UserLoginView, UserChangePassword, UserProfileView, OrderListView, UserPasswordResetEmailView, UserPasswordResetView, MenuItemSearch
# from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.authtoken import views
from api.auth import CustomAuthToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

# from .views import signup_view, EmailTokenObtainPairView


urlpatterns = [
    # path('signup/', signup_view , name='signup'),
    # path('customer/', CustomerList.as_view()),
    
    path('items/', MenuItemsList.as_view()),  # GET all menu items
    path('items/filter/', CategoryList.as_view()),  # GET menu items by category ?category=mains
    # path('items/search/', MenuItemSearch.as_view()),
    path('register/',UserRegistrationView.as_view(), name="register"),
    path('login/', UserLoginView.as_view(), name="login"),
    path('changePassword/', UserChangePassword.as_view(), name="changePassword"),
    path('profile/', UserProfileView.as_view(), name="profile"),
    path('add-order/', OrderListView.as_view(), name="addOrder"),
    
    
    
    
    # path('send-reset-password-email/', UserPasswordResetEmailView.as_view(), name="UserPasswordResetEmailView"),
    # path('reset-password/<uid>/<token>', UserPasswordResetView.as_view(), name="UserPasswordResetView"),    
    # path('gettoken/', TokenObtainPairView.as_view(), name="Get_Token"),
    # path('refreshtoken/', TokenRefreshView.as_view(), name="Refresh_Token"),
    # path('verifytoken/', TokenVerifyView.as_view(), name="Verify_Token")    
    # path('signup/',Signup)
    # path('me/', views.MeView.as_view(), name='me'),
    # path('token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('auth/', include('rest_framework.urls', namespace = 'rest_framework' )),
    # path('gettoken/', CustomAuthToken.as_view()),    
    # path('customer-data/<int:pk>/', views.CustomerData),
    # path('customer-data/', views.AllCustomerData),
]



