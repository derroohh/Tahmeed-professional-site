"""
URLs configuration for tahmeed.com Django backend.
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.http import HttpResponse

def robots_txt(request):
    lines = [
        "User-agent: *",
        "Allow: /",
        "Disallow: /admin/",
        "Disallow: /api/",
        "Sitemap: https://tahmeed.com/sitemap.xml",
        "Host: https://tahmeed.com"
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('robots.txt', robots_txt),
    # Serve React Frontend index.html for all other routes
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]
