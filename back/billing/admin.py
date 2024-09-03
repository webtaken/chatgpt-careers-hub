from django.contrib import admin

from .models import Order, Plan

admin.site.register(Plan)
admin.site.register(Order)
