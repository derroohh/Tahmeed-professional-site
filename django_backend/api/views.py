from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product, Service, Booking, Order, YouTubeVideo, ContactMessage, SiteSEOConfig
from .serializers import (
    ProductSerializer, ServiceSerializer, BookingSerializer, 
    OrderSerializer, YouTubeVideoSerializer, ContactMessageSerializer, SiteSEOConfigSerializer
)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all().order_by('-created_at')
    serializer_class = BookingSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer

class YouTubeVideoViewSet(viewsets.ModelViewSet):
    queryset = YouTubeVideo.objects.all().order_by('-created_at')
    serializer_class = YouTubeVideoSerializer

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer

@api_view(['GET', 'PUT'])
def seo_config_view(request):
    config, created = SiteSEOConfig.objects.get_or_create(id=1)
    if request.method == 'GET':
        serializer = SiteSEOConfigSerializer(config)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = SiteSEOConfigSerializer(config, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
