import os
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import AllowAny
from django.conf import settings
from .models import Product, Service, Booking, Order, YouTubeVideo, ContactMessage, SiteSEOConfig
from .serializers import (
    ProductSerializer, ServiceSerializer, BookingSerializer, 
    OrderSerializer, YouTubeVideoSerializer, ContactMessageSerializer, SiteSEOConfigSerializer
)
from .permissions import IsAdminUserOrReadOnly, ADMIN_EMAIL

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUserOrReadOnly]

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAdminUserOrReadOnly]

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all().order_by('-created_at')
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]

class YouTubeVideoViewSet(viewsets.ModelViewSet):
    queryset = YouTubeVideo.objects.all().order_by('-created_at')
    serializer_class = YouTubeVideoSerializer
    permission_classes = [IsAdminUserOrReadOnly]

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]

@api_view(['GET', 'PUT'])
@permission_classes([IsAdminUserOrReadOnly])
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

@api_view(['POST'])
@permission_classes([IsAdminUserOrReadOnly])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def media_upload_view(request):
    """
    Handle local image and video file uploads to Django media storage.
    Enforces that only admin (derrickngure39@gmail.com) can upload.
    """
    uploaded_file = request.FILES.get('file')
    if not uploaded_file:
        return Response({'error': 'No file provided under "file" key.'}, status=status.HTTP_400_BAD_REQUEST)

    media_subfolder = 'uploads'
    if uploaded_file.content_type.startswith('video/'):
        media_subfolder = 'uploads/videos'
    elif uploaded_file.content_type.startswith('image/'):
        media_subfolder = 'uploads/products'

    upload_dir = os.path.join(settings.MEDIA_ROOT, media_subfolder)
    os.makedirs(upload_dir, exist_ok=True)

    safe_name = f"{int(os.times().elapsed * 1000)}-{uploaded_file.name.replace(' ', '_')}"
    file_path = os.path.join(upload_dir, safe_name)

    with open(file_path, 'wb+') as destination:
        for chunk in uploaded_file.chunks():
            destination.write(chunk)

    file_url = f"{settings.MEDIA_URL}{media_subfolder}/{safe_name}"
    return Response({
        'success': True,
        'url': file_url,
        'filename': safe_name,
        'size': uploaded_file.size,
        'contentType': uploaded_file.content_type,
    }, status=status.HTTP_201_CREATED)
