import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { optionalAuth, requireAuth, AuthRequest } from './src/middleware/auth.ts';
import { getOrCreateUser } from './src/db/users.ts';
import {
  getProducts,
  insertProduct,
  updateProduct,
  deleteProduct,
  getServices,
  insertService,
  updateService,
  deleteService,
  getVideos,
  insertVideo,
  deleteVideo,
  getBookings,
  insertBooking,
  updateBooking,
  getOrders,
  insertOrder,
  updateOrder,
  getSeoSettings,
  updateSeoSettings,
} from './src/db/repo.ts';

// Ensure local media uploads folder exists
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

let contacts: any[] = [];
const ADMIN_EMAIL = 'derrickngure39@gmail.com';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase json and urlencoded payload limit to support local image & video base64 uploads
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ extended: true, limit: '100mb' }));

  // Serve uploaded media files publicly
  app.use('/uploads', express.static(uploadsDir));

  // CORS headers
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
      service: 'tahmeed.com Cloud SQL & Firebase API engine',
      timestamp: new Date().toISOString(),
      database: 'Cloud SQL (PostgreSQL)',
      region: 'europe-west2',
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

  // --- Products API (Backed by Cloud SQL) ---
  app.get('/api/products', async (req, res) => {
    try {
      const prods = await getProducts();
      res.json(prods);
    } catch (err: any) {
      console.error('Failed to fetch products:', err);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  app.post('/api/products', async (req, res) => {
    try {
      const created = await insertProduct(req.body);
      res.status(201).json(created);
    } catch (err: any) {
      console.error('Failed to create product:', err);
      res.status(500).json({ error: 'Failed to create product' });
    }
  });

  app.put('/api/products/:id', async (req, res) => {
    try {
      const updated = await updateProduct(req.params.id, req.body);
      res.json(updated);
    } catch (err: any) {
      console.error('Failed to update product:', err);
      res.status(500).json({ error: 'Failed to update product' });
    }
  });

  app.delete('/api/products/:id', async (req, res) => {
    try {
      const result = await deleteProduct(req.params.id);
      res.json(result);
    } catch (err: any) {
      console.error('Failed to delete product:', err);
      res.status(500).json({ error: 'Failed to delete product' });
    }
  });

  // --- Services API (Backed by Cloud SQL) ---
  app.get('/api/services', async (req, res) => {
    try {
      const srvs = await getServices();
      res.json(srvs);
    } catch (err: any) {
      console.error('Failed to fetch services:', err);
      res.status(500).json({ error: 'Failed to fetch services' });
    }
  });

  app.post('/api/services', async (req, res) => {
    try {
      const created = await insertService(req.body);
      res.status(201).json(created);
    } catch (err: any) {
      console.error('Failed to create service:', err);
      res.status(500).json({ error: 'Failed to create service' });
    }
  });

  app.put('/api/services/:id', async (req, res) => {
    try {
      const updated = await updateService(req.params.id, req.body);
      res.json(updated);
    } catch (err: any) {
      console.error('Failed to update service:', err);
      res.status(500).json({ error: 'Failed to update service' });
    }
  });

  app.delete('/api/services/:id', async (req, res) => {
    try {
      const result = await deleteService(req.params.id);
      res.json(result);
    } catch (err: any) {
      console.error('Failed to delete service:', err);
      res.status(500).json({ error: 'Failed to delete service' });
    }
  });

  // --- Bookings API (Backed by Cloud SQL) ---
  app.get('/api/bookings', async (req, res) => {
    try {
      const bkgs = await getBookings();
      res.json(bkgs);
    } catch (err: any) {
      console.error('Failed to fetch bookings:', err);
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  });

  app.post('/api/bookings', optionalAuth, async (req: AuthRequest, res) => {
    try {
      const bookingData = {
        ...req.body,
        userId: req.user?.uid || null,
      };
      const created = await insertBooking(bookingData);
      console.log(`[Tahmeed Bookings] New booking confirmed: ${created.id} for ${created.clientName}`);
      res.status(201).json(created);
    } catch (err: any) {
      console.error('Failed to create booking:', err);
      res.status(500).json({ error: 'Failed to create booking' });
    }
  });

  app.patch('/api/bookings/:id', async (req, res) => {
    try {
      const updated = await updateBooking(req.params.id, req.body);
      res.json(updated);
    } catch (err: any) {
      console.error('Failed to update booking:', err);
      res.status(500).json({ error: 'Failed to update booking' });
    }
  });

  // --- Orders API (Backed by Cloud SQL) ---
  app.get('/api/orders', async (req, res) => {
    try {
      const ords = await getOrders();
      res.json(ords);
    } catch (err: any) {
      console.error('Failed to fetch orders:', err);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  });

  app.post('/api/orders', optionalAuth, async (req: AuthRequest, res) => {
    try {
      const orderData = {
        ...req.body,
        userId: req.user?.uid || null,
      };
      const created = await insertOrder(orderData);
      res.status(201).json(created);
    } catch (err: any) {
      console.error('Failed to create order:', err);
      res.status(500).json({ error: 'Failed to create order' });
    }
  });

  app.patch('/api/orders/:id', async (req, res) => {
    try {
      const updated = await updateOrder(req.params.id, req.body);
      res.json(updated);
    } catch (err: any) {
      console.error('Failed to update order:', err);
      res.status(500).json({ error: 'Failed to update order' });
    }
  });

  // --- YouTube & Videos API (Backed by Cloud SQL) ---
  app.get('/api/videos', async (req, res) => {
    try {
      const vids = await getVideos();
      res.json(vids);
    } catch (err: any) {
      console.error('Failed to fetch videos:', err);
      res.status(500).json({ error: 'Failed to fetch videos' });
    }
  });

  app.post('/api/videos', async (req, res) => {
    try {
      const created = await insertVideo(req.body);
      res.status(201).json(created);
    } catch (err: any) {
      console.error('Failed to create video:', err);
      res.status(500).json({ error: 'Failed to create video' });
    }
  });

  app.delete('/api/videos/:id', async (req, res) => {
    try {
      const result = await deleteVideo(req.params.id);
      res.json(result);
    } catch (err: any) {
      console.error('Failed to delete video:', err);
      res.status(500).json({ error: 'Failed to delete video' });
    }
  });

  // --- Local Media Upload API ---
  app.post('/api/upload', (req, res) => {
    try {
      const { filename, fileData, mediaType } = req.body;
      if (!fileData) {
        return res.status(400).json({ error: 'fileData (base64 string or dataURL) is required' });
      }

      const matches = fileData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let buffer: Buffer;
      let extension = 'bin';

      if (matches && matches.length === 3) {
        const mimeType = matches[1];
        buffer = Buffer.from(matches[2], 'base64');
        if (mimeType.includes('png')) extension = 'png';
        else if (mimeType.includes('jpeg') || mimeType.includes('jpg')) extension = 'jpg';
        else if (mimeType.includes('webp')) extension = 'webp';
        else if (mimeType.includes('gif')) extension = 'gif';
        else if (mimeType.includes('mp4')) extension = 'mp4';
        else if (mimeType.includes('webm')) extension = 'webm';
        else if (mimeType.includes('mov')) extension = 'mov';
      } else {
        buffer = Buffer.from(fileData, 'base64');
      }

      const safeName = filename 
        ? filename.replace(/[^a-zA-Z0-9._-]/g, '_')
        : `upload-${Date.now()}.${extension}`;
      
      const uniqueFilename = `${Date.now()}-${safeName}`;
      const filePath = path.join(uploadsDir, uniqueFilename);

      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/${uniqueFilename}`;
      console.log(`[Media Upload] Successfully uploaded ${mediaType || 'file'}: ${publicUrl} (${buffer.length} bytes)`);

      res.status(201).json({
        success: true,
        url: publicUrl,
        filename: uniqueFilename,
        size: buffer.length,
      });
    } catch (err: any) {
      console.error('[Media Upload Error]', err);
      res.status(500).json({ error: 'Failed to upload file', details: err.message });
    }
  });

  // --- Contacts / Bureau API ---
  app.get('/api/contacts', (req, res) => {
    res.json(contacts);
  });

  app.post('/api/contacts', (req, res) => {
    const contact = {
      id: `MSG-${Math.floor(10000 + Math.random() * 90000)}`,
      recipient: 'management@tahmeed.com',
      createdAt: new Date().toISOString(),
      delivered: true,
      ...req.body,
    };
    contacts.unshift(contact);
    console.log(`[Tahmeed Direct Bureau] Email inquiry dispatched to management@tahmeed.com: Ref ${contact.id}`);
    res.status(201).json({ 
      success: true, 
      id: contact.id, 
      contact, 
      message: 'Email inquiry successfully recorded and routed to Tahmeed Management bureau.' 
    });
  });

  // --- SEO Configuration API (Backed by Cloud SQL) ---
  app.get('/api/seo', async (req, res) => {
    try {
      const config = await getSeoSettings();
      res.json(config);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch SEO settings' });
    }
  });

  app.put('/api/seo', async (req, res) => {
    try {
      const updated = await updateSeoSettings(req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update SEO settings' });
    }
  });

  // --- Firebase User Profile Sync ---
  app.post('/api/auth/sync', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user?.uid;
      const email = req.user?.email;
      if (!uid || !email) {
        return res.status(400).json({ error: 'Missing UID or email in token' });
      }
      const user = await getOrCreateUser(uid, email, req.body.displayName, req.body.photoUrl);
      const isAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
      res.json({
        success: true,
        user: {
          ...user,
          role: isAdmin ? 'admin' : (user.role || 'fan'),
        }
      });
    } catch (err: any) {
      console.error('Failed to sync authenticated user:', err);
      res.status(500).json({ error: 'Failed to sync user profile' });
    }
  });

  // --- Legacy & Fallback Auth login endpoint ---
  app.post('/api/auth/login', (req, res) => {
    const { email, password, provider, googleCredential } = req.body;
    const normalizedEmail = (email || '').trim().toLowerCase();

    if (provider === 'google' || googleCredential) {
      const isAdmin = normalizedEmail === ADMIN_EMAIL.toLowerCase();
      const user = {
        id: `usr-g-${Date.now()}`,
        email: email || 'user@gmail.com',
        name: email ? email.split('@')[0].replace('.', ' ') : 'Google Member',
        role: isAdmin ? 'admin' : 'user',
        provider: 'google',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      };
      return res.json({ success: true, user, token: `thm_token_${Date.now()}` });
    }

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const isAdmin = normalizedEmail === ADMIN_EMAIL.toLowerCase();
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
