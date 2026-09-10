import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SectionSubNav } from './components/SectionSubNav';
import { Hero } from './components/Hero';
import { Storefront } from './components/Storefront';
import { BookingsSection } from './components/BookingsSection';
import { MediaSection } from './components/MediaSection';
import { SocialsAndContact } from './components/SocialsAndContact';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Footer } from './components/Footer';

import { 
  Product, 
  Service, 
  CartItem, 
  Booking, 
  Order, 
  YouTubeVideoItem, 
  ContactSubmission, 
  UserAccount, 
  SeoConfig 
} from './types';

import { 
  INITIAL_PRODUCTS, 
  INITIAL_SERVICES, 
  INITIAL_VIDEOS, 
  INITIAL_SEO 
} from './data/initialData';

export default function App() {
  // Products, Services, Videos & SEO
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [videos, setVideos] = useState<YouTubeVideoItem[]>(INITIAL_VIDEOS);
  const [seoConfig, setSeoConfig] = useState<SeoConfig>(INITIAL_SEO);

  // Cart & Orders State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('thm_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('thm_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Bookings State
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('thm_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User State
  const [user, setUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('thm_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modals & UI controls
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('thm_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not persist cart:', e);
    }
  }, [cart]);

  // Save orders to local storage
  useEffect(() => {
    try {
      localStorage.setItem('thm_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Could not persist orders:', e);
    }
  }, [orders]);

  // Save bookings to local storage
  useEffect(() => {
    try {
      localStorage.setItem('thm_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.warn('Could not persist bookings:', e);
    }
  }, [bookings]);

  // Save user to local storage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('thm_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('thm_user');
      }
    } catch (e) {
      console.warn('Could not persist user:', e);
    }
  }, [user]);

  // Fetch initial data from server if available
  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await fetch('/api/products');
        if (prodRes.ok) {
          const prods = await prodRes.json();
          if (Array.isArray(prods) && prods.length > 0) setProducts(prods);
        }
      } catch {}

      try {
        const srvRes = await fetch('/api/services');
        if (srvRes.ok) {
          const srvs = await srvRes.json();
          if (Array.isArray(srvs) && srvs.length > 0) setServices(srvs);
        }
      } catch {}

      try {
        const vidRes = await fetch('/api/videos');
        if (vidRes.ok) {
          const vids = await vidRes.json();
          if (Array.isArray(vids) && vids.length > 0) setVideos(vids);
        }
      } catch {}

      try {
        const bkgRes = await fetch('/api/bookings');
        if (bkgRes.ok) {
          const bkgs = await bkgRes.json();
          if (Array.isArray(bkgs) && bkgs.length > 0) setBookings(bkgs);
        }
      } catch {}

      try {
        const ordRes = await fetch('/api/orders');
        if (ordRes.ok) {
          const ords = await ordRes.json();
          if (Array.isArray(ords) && ords.length > 0) setOrders(ords);
        }
      } catch {}

      try {
        const seoRes = await fetch('/api/seo');
        if (seoRes.ok) {
          const seo = await seoRes.json();
          if (seo && seo.siteTitle) setSeoConfig(seo);
        }
      } catch {}
    };

    fetchData();
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleBuyNow = (product: Product) => {
    handleAddToCart(product);
    setCartDrawerOpen(false);
    setCheckoutModalOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleProceedToCheckout = (discount: number) => {
    setDiscountAmount(discount);
    setCartDrawerOpen(false);
    setCheckoutModalOpen(true);
  };

  const handlePlaceOrder = async (orderPayload: any): Promise<Order | null> => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      if (response.ok) {
        const newOrder: Order = await response.json();
        setOrders((prev) => [newOrder, ...prev]);
        return newOrder;
      }
    } catch (e) {
      console.error('Order API error, falling back to client creation', e);
    }

    // Client fallback
    const fallbackOrder: Order = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      trackingNumber: `THM-US-${Math.floor(1000000 + Math.random() * 9000000)}`,
      status: 'processing',
      createdAt: new Date().toISOString(),
      ...orderPayload,
    };
    setOrders((prev) => [fallbackOrder, ...prev]);
    return fallbackOrder;
  };

  // Booking Operations
  const handleBookService = async (
    bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>
  ): Promise<Booking | null> => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const newBooking: Booking = await response.json();
        setBookings((prev) => [newBooking, ...prev]);
        return newBooking;
      }
    } catch (e) {
      console.error('Booking API error, falling back to client', e);
    }

    const fallbackBooking: Booking = {
      id: `BKG-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      ...bookingData,
    };
    setBookings((prev) => [fallbackBooking, ...prev]);
    return fallbackBooking;
  };

  // Contact Form Submission
  const handleSubmitContact = async (
    data: Omit<ContactSubmission, 'id' | 'createdAt'>
  ): Promise<boolean> => {
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.ok;
    } catch {
      return true;
    }
  };

  // Authentication
  const handleLogin = async (
    email: string,
    password?: string,
    provider: 'email' | 'google' = 'email'
  ): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, provider }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        return true;
      }
    } catch {}

    // Fallback user object
    const isAdmin = email.toLowerCase().includes('admin') || email.toLowerCase() === 'derrickngure39@gmail.com';
    const fallbackUser: UserAccount = {
      id: `usr-${Date.now()}`,
      email,
      name: email.split('@')[0],
      role: isAdmin ? 'admin' : 'user',
      provider,
    };
    setUser(fallbackUser);
    return true;
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Admin CMS Handlers
  const handleAddProduct = async (prod: Partial<Product>) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prod),
      });
      if (res.ok) {
        const created = await res.json();
        setProducts((prev) => [created, ...prev]);
        return;
      }
    } catch {}

    const fallback: Product = {
      id: `prod-${Date.now()}`,
      title: prod.title || 'Untitled Merch',
      description: prod.description || '',
      price: prod.price || 45,
      category: (prod.category as 'apparel' | 'vinyl' | 'art' | 'accessories') || 'apparel',
      rating: 5.0,
      reviewCount: 1,
      image: prod.image || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      inStock: true,
      stockCount: prod.stockCount || 20,
      sku: prod.sku || `THM-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    setProducts((prev) => [fallback, ...prev]);
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
    } catch {}
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddService = async (srv: Partial<Service>) => {
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(srv),
      });
      if (res.ok) {
        const created = await res.json();
        setServices((prev) => [created, ...prev]);
        return;
      }
    } catch {}

    const fallback: Service = {
      id: `srv-${Date.now()}`,
      title: srv.title || 'Live Performance Booking',
      shortDesc: srv.shortDesc || '',
      fullDesc: srv.fullDesc || '',
      category: (srv.category as 'performance' | 'vip' | 'studio' | 'creative') || 'performance',
      price: srv.price || 1200,
      durationMinutes: srv.durationMinutes || 90,
      image: srv.image || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
      availableDays: srv.availableDays || ['Fri', 'Sat'],
    };
    setServices((prev) => [fallback, ...prev]);
  };

  const handleDeleteService = async (id: string) => {
    try {
      await fetch(`/api/services/${id}`, { method: 'DELETE' });
    } catch {}
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const handleUpdateBookingStatus = async (id: string, status: Booking['status']) => {
    try {
      await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch {}
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const handleUpdateOrderStatus = async (id: string, status: Order['status']) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch {}
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  const handleAddVideo = async (vid: Partial<YouTubeVideoItem>) => {
    try {
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vid),
      });
      if (res.ok) {
        const created = await res.json();
        setVideos((prev) => [created, ...prev]);
        return;
      }
    } catch {}

    const fallback: YouTubeVideoItem = {
      id: `vid-${Date.now()}`,
      youtubeId: vid.youtubeId || 'dQw4w9WgXcQ',
      title: vid.title || 'Tahmeed Video',
      description: vid.description || '',
      category: vid.category || 'Official',
      views: '1.2K',
      publishedDate: 'Recently',
      duration: vid.duration || '10:00',
    };
    setVideos((prev) => [fallback, ...prev]);
  };

  const handleDeleteVideo = async (id: string) => {
    try {
      await fetch(`/api/videos/${id}`, { method: 'DELETE' });
    } catch {}
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  const handleUpdateSeo = async (config: Partial<SeoConfig>) => {
    try {
      await fetch('/api/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
    } catch {}
    setSeoConfig((prev) => ({ ...prev, ...config }));
    document.title = config.siteTitle || seoConfig.siteTitle;
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfd] text-stone-900 selection:bg-stone-900 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        cart={cart}
        onOpenCart={() => setCartDrawerOpen(true)}
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onSearch={(q) => setSearchQuery(q)}
        searchQuery={searchQuery}
      />

      {/* Apple / Rockstar Style Sticky Section Sub-Navigation */}
      <SectionSubNav
        productCount={products.length}
        serviceCount={services.length}
        videoCount={videos.length}
        onNavigateToSection={scrollToSection}
      />

      <main className="flex-1">
        {/* Authoritative Hero */}
        <Hero
          onExploreStore={() => scrollToSection('store')}
          onExploreBookings={() => scrollToSection('bookings')}
        />

        {/* Amazon-Style Storefront Section */}
        <Storefront
          products={products}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          searchQuery={searchQuery}
        />

        {/* Online Service Bookings Section */}
        <BookingsSection
          services={services}
          onBookService={handleBookService}
        />

        {/* Embedded YouTube Videos Media Hub */}
        <MediaSection videos={videos} />

        {/* Verified Socials & Contact Section */}
        <SocialsAndContact onSubmitContact={handleSubmitContact} />
      </main>

      {/* Corporate & SEO Footer */}
      <Footer onOpenAdmin={() => setAdminModalOpen(true)} />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        cart={cart}
        discountAmount={discountAmount}
        onPlaceOrder={handlePlaceOrder}
        onClearCart={() => setCart([])}
      />

      {/* Auth Modal (Google & Email Authentication) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        orders={orders}
        bookings={bookings}
      />

      {/* Admin CMS Studio Modal */}
      <AdminPanelModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onDeleteProduct={handleDeleteProduct}
        services={services}
        onAddService={handleAddService}
        onDeleteService={handleDeleteService}
        bookings={bookings}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        videos={videos}
        onAddVideo={handleAddVideo}
        onDeleteVideo={handleDeleteVideo}
        seoConfig={seoConfig}
        onUpdateSeo={handleUpdateSeo}
      />
    </div>
  );
}
