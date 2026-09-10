from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('apparel', 'Tour Apparel & Streetwear'),
        ('vinyl', 'Vinyl Records & Music'),
        ('art', 'Art Prints & Books'),
        ('accessories', 'Accessories & Headwear'),
    ]
    sku = models.CharField(max_length=64, unique=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    category = models.CharField(max_length=32, choices=CATEGORY_CHOICES, default='apparel')
    rating = models.FloatField(default=5.0)
    review_count = models.PositiveIntegerField(default=0)
    image = models.CharField(max_length=500, blank=True, default='')
    local_image = models.FileField(upload_to='uploads/products/', blank=True, null=True)
    in_stock = models.BooleanField(default=True)
    stock_count = models.PositiveIntegerField(default=10)
    featured = models.BooleanField(default=False)
    badge = models.CharField(max_length=64, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} (${self.price})"

class Service(models.Model):
    CATEGORY_CHOICES = [
        ('performance', 'Live Concert & Festival Performance'),
        ('vip', 'VIP Acoustic & Private Session'),
        ('studio', 'Studio Feature & Production'),
        ('creative', 'Creative Direction & Visual Concept'),
    ]
    title = models.CharField(max_length=255)
    short_desc = models.CharField(max_length=300)
    full_desc = models.TextField()
    category = models.CharField(max_length=32, choices=CATEGORY_CHOICES, default='performance')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration_minutes = models.PositiveIntegerField(default=60)
    image = models.URLField(max_length=500)
    available_days = models.JSONField(default=list)
    popular = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title} (${self.price})"

class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending Confirmation'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    booking_code = models.CharField(max_length=32, unique=True)
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='bookings')
    service_title = models.CharField(max_length=255)
    client_name = models.CharField(max_length=150)
    client_email = models.EmailField()
    client_phone = models.CharField(max_length=50)
    date = models.DateField()
    time_slot = models.CharField(max_length=50)
    notes = models.TextField(blank=True, null=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.booking_code} - {self.client_name} ({self.date})"

class Order(models.Model):
    STATUS_CHOICES = [
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
    ]
    order_number = models.CharField(max_length=32, unique=True)
    customer_name = models.CharField(max_length=150)
    customer_email = models.EmailField()
    shipping_address = models.JSONField()
    items = models.JSONField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50, default='card')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='processing')
    tracking_number = models.CharField(max_length=64, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.order_number} by {self.customer_name}"

class YouTubeVideo(models.Model):
    youtube_id = models.CharField(max_length=64, blank=True, default='')
    video_file = models.FileField(upload_to='uploads/videos/', blank=True, null=True)
    video_url = models.CharField(max_length=500, blank=True, default='')
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=100)
    views = models.CharField(max_length=32, default='1K')
    duration = models.CharField(max_length=20, default='10:00')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}: {self.subject}"

class SiteSEOConfig(models.Model):
    site_title = models.CharField(max_length=255, default='Tahmeed.com | Official Storefront, Service Bookings & Hub')
    site_description = models.TextField()
    keywords = models.TextField()
    canonical_url = models.URLField(default='https://tahmeed.com/')
    author = models.CharField(max_length=100, default='Tahmeed')
    og_image = models.URLField(max_length=500)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "SEO Configuration"
