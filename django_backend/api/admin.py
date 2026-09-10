from django.contrib import admin
from .models import Product, Service, Booking, Order, YouTubeVideo, ContactMessage, SiteSEOConfig

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'sku', 'price', 'category', 'in_stock', 'stock_count', 'rating')
    list_filter = ('category', 'in_stock', 'featured')
    search_fields = ('title', 'sku', 'description')

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'price', 'duration_minutes', 'popular')
    list_filter = ('category', 'popular')
    search_fields = ('title', 'short_desc')

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('booking_code', 'client_name', 'service_title', 'date', 'time_slot', 'status', 'total_price')
    list_filter = ('status', 'date')
    search_fields = ('booking_code', 'client_name', 'client_email')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'customer_name', 'total_amount', 'status', 'tracking_number', 'created_at')
    list_filter = ('status',)
    search_fields = ('order_number', 'customer_name', 'customer_email', 'tracking_number')

@admin.register(YouTubeVideo)
class YouTubeVideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'youtube_id', 'category', 'views', 'created_at')
    search_fields = ('title', 'youtube_id', 'description')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')

@admin.register(SiteSEOConfig)
class SiteSEOConfigAdmin(admin.ModelAdmin):
    list_display = ('site_title', 'canonical_url', 'updated_at')
