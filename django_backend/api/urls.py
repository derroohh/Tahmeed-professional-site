from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductViewSet, ServiceViewSet, BookingViewSet, 
    OrderViewSet, YouTubeVideoViewSet, ContactMessageViewSet, seo_config_view
)

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'videos', YouTubeVideoViewSet)
router.register(r'contacts', ContactMessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('seo/', seo_config_view, name='seo-config'),
]
