from rest_framework import permissions

ADMIN_EMAIL = 'derrickngure39@gmail.com'

class IsAdminUserOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow admin user (specifically derrickngure39@gmail.com)
    to create, update, or delete site content (products, videos, seo).
    Read permissions are allowed to any request.
    """
    def has_permission(self, request, view):
        # Read permissions are allowed to any request (GET, HEAD or OPTIONS)
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write/Update permissions: Check authenticated user email
        if request.user and request.user.is_authenticated:
            user_email = (request.user.email or '').strip().lower()
            return user_email == ADMIN_EMAIL.lower()

        # Check API token header or query email fallback
        auth_header_email = request.headers.get('X-Admin-Email', '').strip().lower()
        return auth_header_email == ADMIN_EMAIL.lower()
