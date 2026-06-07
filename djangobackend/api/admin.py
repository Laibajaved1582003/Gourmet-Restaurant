from django.contrib import admin
from .models import MenuItems
from api.models import CustomerModel, OrdersList
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class UserModelAdmin(BaseUserAdmin):
    list_display = ["id","email", "name", "tc", "is_admin"]
    list_filter = ["is_admin"]
    fieldsets = [
        ("User Credentials", {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["name"]}),
        ("Permissions", {"fields": ["is_admin"]}),
    ]
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "name", "tc", "password1", "password2"],
            },
        ),
    ]
    search_fields = ["email"]
    ordering = ["email", "tc"]
    filter_horizontal = []


# Now register the new UserAdmin...
admin.site.register(CustomerModel, UserModelAdmin)

admin.site.register(OrdersList)
class OrderListAdmin(admin.ModelAdmin):
    list_display = ['id', 'OrderedAt', 'TotalItems', 'TotalAmount', 'Order', 'OrderStatus']

@admin.register(MenuItems)
class MenuItemsAdmin(admin.ModelAdmin):
    list_display = ['id','title','price','desc', 'category' ,'image','image_url']



# Register your models here.
# @admin.register(Customer)
# class CustomerAdmin(admin.ModelAdmin):
#     list_display = ['id', 'username', 'email']
