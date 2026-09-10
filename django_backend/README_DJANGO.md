# Tahmeed.com — Django Deployment Architecture Guide

This directory contains the production-ready **Django Backend Framework** for **tahmeed.com**.
It matches the Express API contract 1:1, allowing you to deploy the full application with Python/Django or run the React frontend backed by Django REST Framework.

---

## 1. Architecture Overview

- **Frontend**: React 19 + Tailwind CSS + Vite (Single Page Application, SEO JSON-LD enabled)
- **Backend**: Django 4.2+ & Django REST Framework
- **Static Asset Serving**: Whitenoise handles compiled static assets from `dist/`
- **Database**: SQLite for development, PostgreSQL-ready for production (Heroku, AWS RDS, Cloud SQL, Render)
- **Endpoints Provided**:
  - `/api/products/` — Storefront inventory management
  - `/api/services/` — Bookable professional services
  - `/api/bookings/` — Service orders & client appointments
  - `/api/orders/` — Amazon-style storefront e-commerce orders
  - `/api/videos/` — Embedded YouTube media collection
  - `/api/contacts/` — Direct inquiry messages
  - `/api/seo/` — Dynamic SEO meta configuration
  - `/admin/` — Full Django Admin back-office interface
  - `/robots.txt` & `/sitemap.xml` — Google index crawler directives

---

## 2. Quick Local Start with Django

### Step 1: Build the React Frontend
In the root directory of the project:
```bash
npm run build
```
This generates the optimized production build in `/dist`.

### Step 2: Set Up Python Environment
```bash
cd django_backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Step 3: Run Database Migrations
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### Step 4: Run the Django Server
```bash
python manage.py runserver 0.0.0.0:8000
```
Open `http://127.0.0.1:8000` to view the full website served directly by Django.

---

## 3. Production Deployment (Cloud Run / Render / Heroku / VPS)

1. **Environment Variables**:
   - `DJANGO_SECRET_KEY`: Set to a strong random key.
   - `DJANGO_DEBUG`: `False`
   - `DATABASE_URL`: `postgres://user:password@host:5432/tahmeed`

2. **Collect Static Files**:
   ```bash
   python manage.py collectstatic --noinput
   ```

3. **Start with Gunicorn**:
   ```bash
   gunicorn tahmeed_backend.wsgi:application --bind 0.0.0.0:8000 --workers 3
   ```
