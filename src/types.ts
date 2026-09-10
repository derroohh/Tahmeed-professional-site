export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'apparel' | 'vinyl' | 'art' | 'accessories';
  rating: number;
  reviewCount: number;
  image: string;
  inStock: boolean;
  stockCount: number;
  featured?: boolean;
  badge?: string;
  sku: string;
}

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: 'performance' | 'vip' | 'studio' | 'creative';
  price: number;
  durationMinutes: number;
  image: string;
  availableDays: string[];
  popular?: boolean;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalPrice: number;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: {
    productId: string;
    productTitle: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: 'card' | 'google_pay' | 'cash_on_delivery';
  status: 'processing' | 'shipped' | 'delivered';
  trackingNumber: string;
  createdAt: string;
}

export interface YouTubeVideoItem {
  id: string;
  youtubeId?: string;
  videoUrl?: string;
  title: string;
  description: string;
  category: string;
  views: string;
  publishedDate: string;
  duration: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  provider: 'email' | 'google';
}

export interface SeoConfig {
  siteTitle: string;
  siteDescription: string;
  keywords: string;
  canonicalUrl: string;
  author: string;
  ogImage: string;
}
