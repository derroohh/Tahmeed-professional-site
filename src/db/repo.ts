// src/db/repo.ts
import { db } from './index.ts';
import { products, services, videos, bookings, orders, seoSettings } from './schema.ts';
import { eq, desc } from 'drizzle-orm';
import { INITIAL_PRODUCTS, INITIAL_SERVICES, INITIAL_VIDEOS, INITIAL_SEO } from '../data/initialData.ts';
import { Product, Service, YouTubeVideoItem, SeoConfig } from '../types.ts';

export async function getProducts() {
  try {
    const rows = await db.select().from(products).orderBy(desc(products.createdAt));
    if (rows.length === 0) {
      for (const p of INITIAL_PRODUCTS) {
        await db.insert(products).values({
          id: p.id,
          sku: p.sku,
          title: p.title,
          description: p.description,
          price: String(p.price),
          category: p.category,
          image: p.image,
          featured: p.featured ?? false,
          stockCount: p.stockCount ?? 50,
          rating: String(p.rating ?? 5.0),
          reviewCount: p.reviewCount ?? 0,
          badge: p.badge || null,
        }).onConflictDoNothing();
      }
      return await db.select().from(products).orderBy(desc(products.createdAt));
    }
    return rows;
  } catch (err) {
    console.error('getProducts failed:', err);
    throw new Error('Could not fetch products', { cause: err });
  }
}

export async function insertProduct(data: any) {
  try {
    const id = data.id || `prod-${Date.now()}`;
    const result = await db.insert(products).values({
      id,
      sku: data.sku || `THM-${Math.floor(1000 + Math.random() * 9000)}`,
      title: data.title,
      description: data.description || '',
      price: String(data.price),
      category: data.category || 'apparel',
      image: data.image || '',
      featured: Boolean(data.featured),
      stockCount: Number(data.stockCount) || 50,
      rating: String(data.rating || 5.0),
      reviewCount: Number(data.reviewCount) || 1,
      badge: data.badge || null,
    }).returning();
    return result[0];
  } catch (err) {
    console.error('insertProduct failed:', err);
    throw new Error('Could not create product', { cause: err });
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    const updateData: any = { updatedAt: new Date() };
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.price !== undefined) updateData.price = String(data.price);
    if (data.category !== undefined) updateData.category = data.category;
    if (data.image !== undefined) updateData.image = data.image;
    if (data.featured !== undefined) updateData.featured = Boolean(data.featured);
    if (data.stockCount !== undefined) updateData.stockCount = Number(data.stockCount);
    if (data.badge !== undefined) updateData.badge = data.badge;

    const result = await db.update(products).set(updateData).where(eq(products.id, id)).returning();
    return result[0];
  } catch (err) {
    console.error('updateProduct failed:', err);
    throw new Error('Could not update product', { cause: err });
  }
}

export async function deleteProduct(id: string) {
  try {
    await db.delete(products).where(eq(products.id, id));
    return { success: true, id };
  } catch (err) {
    console.error('deleteProduct failed:', err);
    throw new Error('Could not delete product', { cause: err });
  }
}

export async function getServices() {
  try {
    const rows = await db.select().from(services);
    if (rows.length === 0) {
      for (const s of INITIAL_SERVICES) {
        await db.insert(services).values({
          id: s.id,
          title: s.title,
          shortDesc: s.shortDesc,
          fullDesc: s.fullDesc,
          price: String(s.price),
          durationMinutes: s.durationMinutes ?? 60,
          category: s.category,
          availableDays: s.availableDays,
          popular: s.popular ?? false,
        }).onConflictDoNothing();
      }
      return await db.select().from(services);
    }
    return rows;
  } catch (err) {
    console.error('getServices failed:', err);
    throw new Error('Could not fetch services', { cause: err });
  }
}

export async function insertService(data: any) {
  try {
    const id = data.id || `srv-${Date.now()}`;
    const result = await db.insert(services).values({
      id,
      title: data.title,
      shortDesc: data.shortDesc || '',
      fullDesc: data.fullDesc || '',
      price: String(data.price),
      durationMinutes: Number(data.durationMinutes) || 60,
      category: data.category || 'live',
      availableDays: data.availableDays || ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
      popular: Boolean(data.popular),
    }).returning();
    return result[0];
  } catch (err) {
    console.error('insertService failed:', err);
    throw new Error('Could not create service', { cause: err });
  }
}

export async function updateService(id: string, data: any) {
  try {
    const updateData: any = { updatedAt: new Date() };
    if (data.title !== undefined) updateData.title = data.title;
    if (data.shortDesc !== undefined) updateData.shortDesc = data.shortDesc;
    if (data.fullDesc !== undefined) updateData.fullDesc = data.fullDesc;
    if (data.price !== undefined) updateData.price = String(data.price);
    if (data.category !== undefined) updateData.category = data.category;
    if (data.durationMinutes !== undefined) updateData.durationMinutes = Number(data.durationMinutes);
    if (data.availableDays !== undefined) updateData.availableDays = data.availableDays;
    if (data.popular !== undefined) updateData.popular = Boolean(data.popular);

    const result = await db.update(services).set(updateData).where(eq(services.id, id)).returning();
    return result[0];
  } catch (err) {
    console.error('updateService failed:', err);
    throw new Error('Could not update service', { cause: err });
  }
}

export async function deleteService(id: string) {
  try {
    await db.delete(services).where(eq(services.id, id));
    return { success: true, id };
  } catch (err) {
    console.error('deleteService failed:', err);
    throw new Error('Could not delete service', { cause: err });
  }
}

export async function getVideos() {
  try {
    const rows = await db.select().from(videos).orderBy(desc(videos.createdAt));
    if (rows.length === 0) {
      for (const v of INITIAL_VIDEOS) {
        await db.insert(videos).values({
          id: v.id,
          youtubeId: v.youtubeId || null,
          videoUrl: v.videoUrl || null,
          title: v.title,
          description: v.description,
          category: v.category,
          views: v.views,
          publishedDate: v.publishedDate,
          duration: v.duration,
        }).onConflictDoNothing();
      }
      return await db.select().from(videos).orderBy(desc(videos.createdAt));
    }
    return rows;
  } catch (err) {
    console.error('getVideos failed:', err);
    throw new Error('Could not fetch videos', { cause: err });
  }
}

export async function insertVideo(data: any) {
  try {
    const id = data.id || `vid-${Date.now()}`;
    const result = await db.insert(videos).values({
      id,
      youtubeId: data.youtubeId || null,
      videoUrl: data.videoUrl || null,
      title: data.title,
      description: data.description || '',
      category: data.category || 'Music Video',
      views: data.views || '1.2K',
      publishedDate: data.publishedDate || 'Just now',
      duration: data.duration || '3:45',
    }).returning();
    return result[0];
  } catch (err) {
    console.error('insertVideo failed:', err);
    throw new Error('Could not create video', { cause: err });
  }
}

export async function deleteVideo(id: string) {
  try {
    await db.delete(videos).where(eq(videos.id, id));
    return { success: true, id };
  } catch (err) {
    console.error('deleteVideo failed:', err);
    throw new Error('Could not delete video', { cause: err });
  }
}

export async function getBookings() {
  try {
    return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
  } catch (err) {
    console.error('getBookings failed:', err);
    throw new Error('Could not fetch bookings', { cause: err });
  }
}

export async function insertBooking(data: any) {
  try {
    const id = data.id || `BKG-${Math.floor(10000 + Math.random() * 90000)}`;
    const result = await db.insert(bookings).values({
      id,
      serviceId: data.serviceId,
      serviceTitle: data.serviceTitle,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone || '',
      date: data.date,
      timeSlot: data.timeSlot,
      notes: data.notes || '',
      status: data.status || 'confirmed',
      totalPrice: String(data.totalPrice),
      userId: data.userId || null,
    }).returning();
    return result[0];
  } catch (err) {
    console.error('insertBooking failed:', err);
    throw new Error('Could not create booking', { cause: err });
  }
}

export async function updateBooking(id: string, data: any) {
  try {
    const result = await db.update(bookings).set(data).where(eq(bookings.id, id)).returning();
    return result[0];
  } catch (err) {
    console.error('updateBooking failed:', err);
    throw new Error('Could not update booking', { cause: err });
  }
}

export async function getOrders() {
  try {
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  } catch (err) {
    console.error('getOrders failed:', err);
    throw new Error('Could not fetch orders', { cause: err });
  }
}

export async function insertOrder(data: any) {
  try {
    const id = data.id || `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingNumber = data.trackingNumber || `THM-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    const result = await db.insert(orders).values({
      id,
      items: data.items,
      totalAmount: String(data.totalAmount),
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      shippingAddress: data.shippingAddress,
      paymentMethod: data.paymentMethod || 'card',
      status: data.status || 'processing',
      trackingNumber,
      userId: data.userId || null,
    }).returning();
    return result[0];
  } catch (err) {
    console.error('insertOrder failed:', err);
    throw new Error('Could not create order', { cause: err });
  }
}

export async function updateOrder(id: string, data: any) {
  try {
    const result = await db.update(orders).set(data).where(eq(orders.id, id)).returning();
    return result[0];
  } catch (err) {
    console.error('updateOrder failed:', err);
    throw new Error('Could not update order', { cause: err });
  }
}

export async function getSeoSettings() {
  try {
    const rows = await db.select().from(seoSettings).where(eq(seoSettings.id, 'default'));
    if (rows.length === 0) {
      await db.insert(seoSettings).values({
        id: 'default',
        siteTitle: INITIAL_SEO.siteTitle,
        siteDescription: INITIAL_SEO.siteDescription,
        keywords: INITIAL_SEO.keywords,
        ogImage: INITIAL_SEO.ogImage,
        canonicalUrl: INITIAL_SEO.canonicalUrl,
        author: INITIAL_SEO.author,
      }).onConflictDoNothing();
      return INITIAL_SEO;
    }
    return rows[0];
  } catch (err) {
    console.error('getSeoSettings failed:', err);
    return INITIAL_SEO;
  }
}

export async function updateSeoSettings(data: any) {
  try {
    const result = await db.insert(seoSettings).values({
      id: 'default',
      siteTitle: data.siteTitle || INITIAL_SEO.siteTitle,
      siteDescription: data.siteDescription || INITIAL_SEO.siteDescription,
      keywords: data.keywords || INITIAL_SEO.keywords,
      ogImage: data.ogImage || INITIAL_SEO.ogImage,
      canonicalUrl: data.canonicalUrl || INITIAL_SEO.canonicalUrl,
      author: data.author || INITIAL_SEO.author,
      updatedAt: new Date(),
    }).onConflictDoUpdate({
      target: seoSettings.id,
      set: {
        siteTitle: data.siteTitle,
        siteDescription: data.siteDescription,
        keywords: data.keywords,
        ogImage: data.ogImage,
        canonicalUrl: data.canonicalUrl,
        author: data.author,
        updatedAt: new Date(),
      },
    }).returning();
    return result[0];
  } catch (err) {
    console.error('updateSeoSettings failed:', err);
    throw new Error('Could not update SEO settings', { cause: err });
  }
}
