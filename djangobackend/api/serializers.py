from xml.dom import ValidationErr
from rest_framework import serializers
from utils import Util
from .models import MenuItems, CustomerModel, OrdersList
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.db import models

class RegistrationView(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, style={'input_type': 'password'}
    )
    password2 = serializers.CharField(
        style={'input_type': 'password'},  write_only=True)
    
    class Meta:
        model = CustomerModel
        fields = ['email', 'name', 'tc', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):    #Object Level Validation
        password = data.get('password')
        password2 = data.get('password2')
        if password != password2:
            raise serializers.ValidationError('Password and Confirm Password Do not Match')
        return data

    def create(self, validate_data):
        return CustomerModel.objects.create_user(**validate_data)

        
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerModel
        fields = ['id', 'name', 'email']


class UserChangePassSerializer(serializers.Serializer):
    password = serializers.CharField(
        write_only=True, style={'input_type': 'password'}
    )
    password2 = serializers.CharField(
        write_only=True, style={'input_type': 'password'}
    )

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        if password != password2:
            raise serializers.ValidationError('Password and Confirm Password Do not Match')
        user.set_password(password)
        user.save()

        return attrs


class UserPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    class Meta:
        fields = ['email']

    def validate(self, attrs):
        email = attrs.get('email')
        if CustomerModel.objects.filter(email = email).exists():
            user = CustomerModel.objects.get(email = email)
            # uid = urlsafe_base64_encode(force_bytes(user.id))
            # print('Encoded ID', uid)
            # token = PasswordResetTokenGenerator().make_token(user)
            # print(token)
            # link = 'http://127.0.0.1:8000/api/user/reset' + uid + '/' +token
            # #Send Email
            # body = 'Click on the Following Link to Reset Password' + link
            # data = {
            #     'subject': 'Reset Password',
            #     'body': body,
            #     'to_email': user.email
            # }
            # Util.send_email(data) 
            # print(link)
            return attrs
        else:
            raise ValidationErr('You are not a registered User')



class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(
        write_only=True, style={'input_type': 'password'}
    )
    password2 = serializers.CharField(
        write_only=True, style={'input_type': 'password'}
    )
    class Meta:
        model = CustomerModel
        fields = ['password', 'password2']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            password2 = attrs.get('password2')
            uid = self.context.get('uid')
            token = self.context.get('token')
            if password != password2:
                raise serializers.ValidationError('Password and Confirm Password Do not Match')
            id = smart_str(urlsafe_base64_decode(uid))
            user = CustomerModel.objects.get(id = id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise ValidationErr('Token is Not Valid Or Expired')
            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user, token)
            raise ValidationErr('Token is Not Valid Or Expired')



class OrderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdersList
        fields = '__all__'
        read_only_fields = ['id', 'OrderedAt']
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'TotalAmount', 'OrderedAt'],
                name='unique_user_order'
            )
        ]


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItems
        fields = [ 'id','title','price','desc', 'category' ,'image','image_url']



#Serializer Relations -- StringRelatedField, PrimaryKeyRelatedField, HyperlinkedRelatedField, SlugRelatedField, HyperlinkedRelatedField(view_name="song-detail")
#Nested Serializer


# class CustomerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Customer
#         fields = ['id', 'username', 'email', 'password']
#         extra_kwargs = {
#             'password': {'write_only': True}
#         }

#         def create(self, validated_data):
#         # Hash password automatically when creating user
#             validated_data['password'] = make_password(validated_data['password'])
#             return super().create(validated_data)
        
#         def update(self, instance, validated_data):
#         # Hash password if it's being updated
#             if 'password' in validated_data:
#                 validated_data['password'] = make_password(validated_data['password'])
#             return super().update(instance, validated_data)
        
#         for user in Customer.objects.all():
#             if not user.password.startswith('pbkdf2_sha256$'):
#                 user.password = make_password(user.password)
#                 user.save()



# class UserSignupSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)

#     class Meta:
#         model = Customer
#         fields = ['id', 'username', 'email', 'password']
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         validated_data['password'] = make_password(validated_data['password'])
#         return Customer.objects.create(**validated_data)