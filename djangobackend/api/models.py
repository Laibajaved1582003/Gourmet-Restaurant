from decimal import Decimal
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, email, name, tc, password=None, password2=None):
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            tc=tc
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, tc, password=None, password2=None):
        user = self.create_user(
            email,
            password=password,
            name=name,
            tc=tc
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class CustomerModel(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        verbose_name= "Email",
        max_length= 255,
        unique=True
    )
    name = models.CharField(max_length=255)
    tc = models.BooleanField()
    is_active=models.BooleanField(default=True)
    is_admin=models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'tc']

    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, app_label):
        return True
    
    @property   #It turns a method into a read-only attribute.
    def is_staff(self):
        return self.is_admin



class MenuItems(models.Model):
    title = models.CharField(max_length=200, default='N/A')
    price = models.DecimalField(
        max_digits=4,
        decimal_places=2,
        default= Decimal('0.00'))
    desc = models.TextField(default='N/A')
    category = models.CharField(max_length=100, default='N/A')
    image = models.ImageField(blank=True, default='N/A')
    image_url = models.URLField(blank=True, null=True, default='N/A')


class OrdersList(models.Model):
    ORDER_STATUS_CHOICES = [
    ('delivered', 'Delivered'),
    ('cancelled', 'Cancelled'),
    ('in_process', 'In Process'),
]
    user = models.ForeignKey(
        CustomerModel,
        on_delete=models.CASCADE,
        related_name='orders'
    )
    OrderedAt = models.DateTimeField(auto_now_add=True)
    TotalItems = models.IntegerField(default=0)
    TotalAmount = models.DecimalField(max_digits=8, decimal_places=2)
    Order = models.JSONField()
    OrderStatus = models.CharField(
        max_length=20,
        choices=ORDER_STATUS_CHOICES,
        default='in_process')
    
    def __str__(self):
        return f"Order #{self.id} - {self.OrderStatus.capitalize()}"





# Table Booking 
# Order History Model Order id, date, time, total items, total amount, status (delivered , cancelled, in process)

# from rest_framework.authtoken.models import Token
# from django.contrib.auth.models import AbstractUser
# from django.dispatch import receiver
# from django.db.models.signals import post_save
# from django.conf import settings

# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def create_auth_token(sender, instance = None, created=False, **kwargs):
#     if created:
#         Token.objects.create(user=instance)






