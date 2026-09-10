import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { INITIAL_PRODUCTS, INITIAL_SERVICES, INITIAL_VIDEOS, INITIAL_SEO } from './src/data/initialData';

// In-memory data store with default values
let products = [...INITIAL_PRODUCTS];
let services = [...INITIAL_SERVICES];
let videos = [...INITIAL_VIDEOS];
let seoConfig = { ...INITIAL_SEO };

let bookings: any[] = [
  {
    id: 'BKG-84920',
    serviceId: 'srv-1',
    serviceTitle: 'Live Festival & Headline Concert Performance',
    clientName: 'Julian Rivers',
    clientEmail: 'julian@solsticefest.com',
    clientPhone: '+1 (555) 382-9910',
    date: '2026-09-18',
    timeSlot: '19:00 - 20:30 UTC',
    notes: 'Mainstage festival closing set performance arrangement.',
    status: 'confirmed',
    totalPrice: 3500,
    createdAt: new Date().toISOString(),
  }
];

let orders: any[] = [
  {
    id: 'ORD-77102',
    items: [
      {
        productId: 'prod-1',
        productTitle: 'Tahmeed World Tour 2026 Heavyweight Hoodie',
        price: 115.00,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      }
    ],
    totalAmount: 115.00,
    customerName: 'Marcus Vance',
    customerEmail: 'm.vance@musicfans.io',
    shippingAddress: {
      street: '742 Sunset Boulevard',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: '90028',
      country: 'United States'
    },
    paymentMethod: 'card',
    status: 'shipped',
    trackingNumber: 'THM-US-9938217',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

let contacts: any[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // CORS headers for local/Django dev friendliness
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'tahmeed.com API engine',
      timestamp: new Date().toISOString(),
      djangoReady: true,
    });
  });

  // SEO: Dynamic Robots.txt
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: https://tahmeed.com/sitemap.xml
Host: https://tahmeed.com
`);
  });

  // SEO: Dynamic Sitemap.xml for Google Indexing
  app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    const today = new Date().toISOString().split('T')[0];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://tahmeed.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tahmeed.com/#store</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://tahmeed.com/#bookings</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://tahmeed.com/#videos</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tahmeed.com/#contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;
    res.send(xml);
  });

  // --- Products API ---
  app.get('/api/products', (req, res) => {
    res.json(products);
  });

  app.post('/api/products', (req, res) => {
    const newProduct = {
      id: `prod-${Date.now()}`,
      sku: req.body.sku || `THM-${Math.floor(1000 + Math.random() * 9000)}`,
      rating: 5.0,
      reviewCount: 1,
      ...req.body,
    };
    products.unshift(newProduct);
    res.status(201).json(newProduct);
  });

  app.put('/api/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Product not found' });
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  });

  app.delete('/api/products/:id', (req, res) => {
    products = products.filter(p => p.id !== req.params.id);
    res.json({ success: true, id: req.params.id });
  });

  // --- Services API ---
  app.get('/api/services', (req, res) => {
    res.json(services);
  });

  app.post('/api/services', (req, res) => {
    const newService = {
      id: `srv-${Date.now()}`,
      ...req.body,
    };
    services.unshift(newService);
    res.status(201).json(newService);
  });

  app.put('/api/services/:id', (req, res) => {
    const index = services.findIndex(s => s.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Service not found' });
    services[index] = { ...services[index], ...req.body };
    res.json(services[index]);
  });

  app.delete('/api/services/:id', (req, res) => {
    services = services.filter(s => s.id !== req.params.id);
    res.json({ success: true, id: req.params.id });
  });

  // --- Bookings API ---
  app.get('/api/bookings', (req, res) => {
    res.json(bookings);
  });

  app.post('/api/bookings', (req, res) => {
    const newBooking = {
      id: `BKG-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...req.body,
    };
    bookings.unshift(newBooking);
    res.status(201).json(newBooking);
  });

  app.patch('/api/bookings/:id', (req, res) => {
    const index = bookings.findIndex(b => b.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Booking not found' });
    bookings[index] = { ...bookings[index], ...req.body };
    res.json(bookings[index]);
  });

  // --- Orders API (Storefront purchases) ---
  app.get('/api/orders', (req, res) => {
    res.json(orders);
  });

  app.post('/api/orders', (req, res) => {
    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      trackingNumber: `THM-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      status: 'processing',
      createdAt: new Date().toISOString(),
      ...req.body,
    };
    orders.unshift(newOrder);
    res.status(201).json(newOrder);
  });

  app.patch('/api/orders/:id', (req, res) => {
    const index = orders.findIndex(o => o.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Order not found' });
    orders[index] = { ...orders[index], ...req.body };
    res.json(orders[index]);
  });

  // --- YouTube Videos API ---
  app.get('/api/videos', (req, res) => {
    res.json(videos);
  });

  app.post('/api/videos', (req, res) => {
    const newVideo = {
      id: `vid-${Date.now()}`,
      views: '1.2K',
      publishedDate: 'Just now',
      ...req.body,
    };
    videos.unshift(newVideo);
    res.status(201).json(newVideo);
  });

  app.delete('/api/videos/:id', (req, res) => {
    videos = videos.filter(v => v.id !== req.params.id);
    res.json({ success: true, id: req.params.id });
  });

  // --- Contacts API ---
  app.get('/api/contacts', (req, res) => {
    res.json(contacts);
  });

  app.post('/api/contacts', (req, res) => {
    const contact = {
      id: `cnt-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...req.body,
    };
    contacts.unshift(contact);
    res.status(201).json({ success: true, contact });
  });

  // --- SEO Configuration API ---
  app.get('/api/seo', (req, res) => {
    res.json(seoConfig);
  });

  app.put('/api/seo', (req, res) => {
    seoConfig = { ...seoConfig, ...req.body };
    res.json(seoConfig);
  });

  // --- Auth Simulation / Provider endpoint ---
  app.post('/api/auth/login', (req, res) => {
    const { email, password, provider, googleCredential } = req.body;
    if (provider === 'google' || googleCredential) {
      // Decode or synthesize Google User
      const user = {
        id: `usr-g-${Date.now()}`,
        email: email || 'user@gmail.com',
        name: email ? email.split('@')[0].replace('.', ' ') : 'Google Member',
        role: email?.includes('admin') || email === 'derrickngure39@gmail.com' ? 'admin' : 'user',
        provider: 'google',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      };
      return res.json({ success: true, user, token: `thm_token_${Date.now()}` });
    }

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const isAdmin = email.toLowerCase().includes('admin') || email.toLowerCase() === 'derrickngure39@gmail.com';
    const user = {
      id: `usr-${Date.now()}`,
      email,
      name: email.split('@')[0],
      role: isAdmin ? 'admin' : 'user',
      provider: 'email',
    };
    return res.json({ success: true, user, token: `thm_token_${Date.now()}` });
  });

  // Vite integration for development vs production static serve
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Tahmeed.com Server running on port ${PORT}`);
  });
}

startServer();
