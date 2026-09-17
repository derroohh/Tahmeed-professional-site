// src/db/schema.ts
import { integer, numeric, pgTable, serial, text, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core';

// Users table authenticated via Firebase Auth
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  photoUrl: text('photo_url'),
  role: text('role').default('fan'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Products table for Tahmeed's official store
export const products = pgTable('products', {
  id: text('id').primaryKey(),
  sku: text('sku').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  category: text('category').notNull(),
  image: text('image').notNull(),
  featured: boolean('featured').default(false),
  stockCount: integer('stock_count').default(50),
  rating: numeric('rating', { precision: 3, scale: 1 }).default('5.0'),
  reviewCount: integer('review_count').default(0),
  badge: text('badge'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Services / Artist Bookings table
export const services = pgTable('services', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  shortDesc: text('short_desc').notNull(),
  fullDesc: text('full_desc').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  durationMinutes: integer('duration_minutes').default(60),
  category: text('category').notNull(),
  availableDays: jsonb('available_days').notNull(),
  popular: boolean('popular').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Broadcast Videos table
export const videos = pgTable('videos', {
  id: text('id').primaryKey(),
  youtubeId: text('youtube_id'),
  videoUrl: text('video_url'),
  title: text('title').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  views: text('views').notNull(),
  publishedDate: text('published_date').notNull(),
  duration: text('duration').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Client & Event Bookings table
export const bookings = pgTable('bookings', {
  id: text('id').primaryKey(),
  serviceId: text('service_id').notNull(),
  serviceTitle: text('service_title').notNull(),
  clientName: text('client_name').notNull(),
  clientEmail: text('client_email').notNull(),
  clientPhone: text('client_phone').notNull(),
  date: text('date').notNull(),
  timeSlot: text('time_slot').notNull(),
  notes: text('notes'),
  status: text('status').default('confirmed'),
  totalPrice: numeric('total_price', { precision: 10, scale: 2 }).notNull(),
  userId: text('user_id'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Customer Orders table
export const orders = pgTable('orders', {
  id: text('id').primaryKey(),
  items: jsonb('items').notNull(),
  totalAmount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  shippingAddress: jsonb('shipping_address').notNull(),
  paymentMethod: text('payment_method').notNull(),
  status: text('status').default('processing'),
  trackingNumber: text('tracking_number').notNull(),
  userId: text('user_id'),
  createdAt: timestamp('created_at').defaultNow(),
});

// SEO & Site Meta configuration table
export const seoSettings = pgTable('seo_settings', {
  id: text('id').primaryKey(),
  siteTitle: text('site_title').notNull(),
  siteDescription: text('site_description').notNull(),
  keywords: text('keywords').notNull(),
  ogImage: text('og_image').notNull(),
  canonicalUrl: text('canonical_url').notNull(),
  author: text('author').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
