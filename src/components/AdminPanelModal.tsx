import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Package, 
  Calendar, 
  Video, 
  Search, 
  Globe, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  CheckCircle2, 
  ExternalLink,
  Code,
  Terminal,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { Product, Service, Booking, Order, YouTubeVideoItem, SeoConfig } from '../types';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (product: Partial<Product>) => Promise<void>;
  onDeleteProduct: (id: string) => Promise<void>;
  services: Service[];
  onAddService: (service: Partial<Service>) => Promise<void>;
  onDeleteService: (id: string) => Promise<void>;
  bookings: Booking[];
  onUpdateBookingStatus: (id: string, status: Booking['status']) => Promise<void>;
  orders: Order[];
  onUpdateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
  videos: YouTubeVideoItem[];
  onAddVideo: (video: Partial<YouTubeVideoItem>) => Promise<void>;
  onDeleteVideo: (id: string) => Promise<void>;
  seoConfig: SeoConfig;
  onUpdateSeo: (config: Partial<SeoConfig>) => Promise<void>;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onDeleteProduct,
  services,
  onAddService,
  onDeleteService,
  bookings,
  onUpdateBookingStatus,
  orders,
  onUpdateOrderStatus,
  videos,
  onAddVideo,
  onDeleteVideo,
  seoConfig,
  onUpdateSeo,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'services' | 'bookings_orders' | 'videos' | 'seo' | 'django'>('products');

  // New Product Form State
  const [newProdTitle, setNewProdTitle] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'apparel' | 'vinyl' | 'art' | 'accessories'>('apparel');
  const [newProdImage, setNewProdImage] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdStock, setNewProdStock] = useState('25');

  // New Video Form State
  const [newVideoId, setNewVideoId] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoCategory, setNewVideoCategory] = useState('Music Video');
  const [newVideoDesc, setNewVideoDesc] = useState('');

  // SEO Form State
  const [seoTitle, setSeoTitle] = useState(seoConfig.siteTitle);
  const [seoDesc, setSeoDesc] = useState(seoConfig.siteDescription);
  const [seoKeywords, setSeoKeywords] = useState(seoConfig.keywords);
  const [seoSaved, setSeoSaved] = useState(false);

  if (!isOpen) return null;

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdTitle || !newProdPrice) return;

    await onAddProduct({
      title: newProdTitle,
      price: parseFloat(newProdPrice) || 99,
      category: newProdCategory,
      image: newProdImage || 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80',
      description: newProdDesc || 'Official curated asset from tahmeed.com.',
      stockCount: parseInt(newProdStock, 10) || 20,
      inStock: true,
      sku: `THM-${Math.floor(1000 + Math.random() * 9000)}`,
      rating: 5.0,
      reviewCount: 1,
    });

    setNewProdTitle('');
    setNewProdPrice('');
    setNewProdImage('');
    setNewProdDesc('');
  };

  const handleCreateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideoId || !newVideoTitle) return;

    await onAddVideo({
      youtubeId: newVideoId,
      title: newVideoTitle,
      category: newVideoCategory,
      description: newVideoDesc || 'Official Tahmeed media broadcast.',
      duration: '12:00',
    });

    setNewVideoId('');
    setNewVideoTitle('');
    setNewVideoDesc('');
  };

  const handleSaveSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdateSeo({
      siteTitle: seoTitle,
      siteDescription: seoDesc,
      keywords: seoKeywords,
    });
    setSeoSaved(true);
    setTimeout(() => setSeoSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center">
              <Settings className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                Tahmeed.com CMS & Management Studio
              </h3>
              <p className="text-xs text-stone-500">
                Update store products, manage bookings, configure SEO, and review Django backend deployment.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-800 text-lg p-2"
            aria-label="Close CMS Studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 overflow-x-auto my-4 text-xs font-semibold gap-1">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-2 px-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'products'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Store Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings_orders')}
            className={`py-2 px-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'bookings_orders'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Bookings & Orders ({bookings.length + orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`py-2 px-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'videos'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>YouTube Videos ({videos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`py-2 px-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'seo'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>SEO & Google Ranking</span>
          </button>

          <button
            onClick={() => setActiveTab('django')}
            className={`py-2 px-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'django'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-purple-600" />
            <span>Django Deployment Hub</span>
          </button>
        </div>

        {/* Tab 1: Products */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Add New Product Form */}
            <form onSubmit={handleCreateProduct} className="bg-stone-50 p-4 rounded-xl border border-stone-200">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-1">
                <Plus className="w-3.5 h-3.5 text-emerald-600" />
                <span>Add New Store Product to Homepage</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={newProdTitle}
                    onChange={(e) => setNewProdTitle(e.target.value)}
                    placeholder="e.g. World Tour Heavyweight Hoodie"
                    className="w-full text-xs bg-white border border-stone-300 rounded-lg p-2 text-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Price ($USD) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    placeholder="85.00"
                    className="w-full text-xs bg-white border border-stone-300 rounded-lg p-2 text-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full text-xs bg-white border border-stone-300 rounded-lg p-2 text-stone-900 focus:outline-none"
                  >
                    <option value="apparel">Tour Apparel & Streetwear</option>
                    <option value="vinyl">Vinyl Records & Music</option>
                    <option value="art">Art Prints & Books</option>
                    <option value="accessories">Accessories & Headwear</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Initial Stock Count</label>
                  <input
                    type="number"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                    className="w-full text-xs bg-white border border-stone-300 rounded-lg p-2 text-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={newProdImage}
                    onChange={(e) => setNewProdImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full text-xs bg-white border border-stone-300 rounded-lg p-2 text-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-[11px] font-medium text-stone-600 mb-1">Description</label>
                <input
                  type="text"
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="Key specifications and value proposition..."
                  className="w-full text-xs bg-white border border-stone-300 rounded-lg p-2 text-stone-900 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="mt-3 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs px-4 py-2 rounded-lg transition"
              >
                Publish Product to Store
              </button>
            </form>

            {/* Existing Products List */}
            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                Active Storefront Inventory ({products.length})
              </h4>
              <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl max-h-64 overflow-y-auto">
                {products.map((p) => (
                  <div key={p.id} className="p-3 flex items-center justify-between text-xs hover:bg-stone-50">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.title} className="w-10 h-10 object-cover rounded bg-stone-100" />
                      <div>
                        <span className="font-bold text-stone-900 block">{p.title}</span>
                        <span className="text-stone-500 font-mono text-[11px]">
                          SKU: {p.sku} • Category: {p.category} • Stock: {p.stockCount}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-stone-900">${p.price.toFixed(2)}</span>
                      <button
                        onClick={() => onDeleteProduct(p.id)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                        title="Remove product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Bookings & Orders */}
        {activeTab === 'bookings_orders' && (
          <div className="space-y-6">
            {/* Service Bookings */}
            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                Incoming Service Bookings ({bookings.length})
              </h4>
              <div className="border border-stone-200 rounded-xl divide-y divide-stone-100 max-h-60 overflow-y-auto">
                {bookings.length === 0 ? (
                  <p className="p-4 text-xs text-stone-400 text-center">No bookings received yet.</p>
                ) : (
                  bookings.map((b) => (
                    <div key={b.id} className="p-3.5 flex items-center justify-between text-xs hover:bg-stone-50">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-stone-900">{b.id}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                            b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {b.status}
                          </span>
                        </div>
                        <p className="font-semibold text-stone-800 mt-0.5">{b.serviceTitle}</p>
                        <p className="text-stone-500 text-[11px]">
                          Client: <strong>{b.clientName}</strong> ({b.clientEmail}) • {b.date} ({b.timeSlot})
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {b.status === 'pending' && (
                          <button
                            onClick={() => onUpdateBookingStatus(b.id, 'confirmed')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-medium px-2.5 py-1 rounded"
                          >
                            Confirm Booking
                          </button>
                        )}
                        {b.status === 'confirmed' && (
                          <button
                            onClick={() => onUpdateBookingStatus(b.id, 'completed')}
                            className="bg-stone-800 hover:bg-stone-900 text-white text-[11px] font-medium px-2.5 py-1 rounded"
                          >
                            Mark Completed
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Storefront Orders */}
            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                Storefront Purchases & Fulfillment ({orders.length})
              </h4>
              <div className="border border-stone-200 rounded-xl divide-y divide-stone-100 max-h-60 overflow-y-auto">
                {orders.length === 0 ? (
                  <p className="p-4 text-xs text-stone-400 text-center">No storefront orders yet.</p>
                ) : (
                  orders.map((o) => (
                    <div key={o.id} className="p-3.5 flex items-center justify-between text-xs hover:bg-stone-50">
                      <div>
                        <div className="flex items-center gap-2 font-mono">
                          <span className="font-bold text-stone-900">{o.id}</span>
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                            {o.trackingNumber}
                          </span>
                          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-stone-200 text-stone-800">
                            {o.status}
                          </span>
                        </div>
                        <p className="text-stone-700 text-[11px] mt-0.5">
                          Buyer: {o.customerName} ({o.customerEmail}) • Total: <strong>${o.totalAmount.toFixed(2)}</strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {o.status === 'processing' && (
                          <button
                            onClick={() => onUpdateOrderStatus(o.id, 'shipped')}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-medium px-2.5 py-1 rounded"
                          >
                            Mark as Shipped
                          </button>
                        )}
                        {o.status === 'shipped' && (
                          <button
                            onClick={() => onUpdateOrderStatus(o.id, 'delivered')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-medium px-2.5 py-1 rounded"
                          >
                            Mark Delivered
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: YouTube Videos */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            <form onSubmit={handleCreateVideo} className="bg-stone-50 p-4 rounded-xl border border-stone-200">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-1">
                <Plus className="w-3.5 h-3.5 text-rose-600" />
                <span>Embed New YouTube Video</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">
                    YouTube Video ID * (e.g. dQw4w9WgXcQ)
                  </label>
                  <input
                    type="text"
                    required
                    value={newVideoId}
                    onChange={(e) => setNewVideoId(e.target.value)}
                    placeholder="dQw4w9WgXcQ"
                    className="w-full text-xs bg-white border border-stone-300 rounded-lg p-2 text-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Category</label>
                  <input
                    type="text"
                    value={newVideoCategory}
                    onChange={(e) => setNewVideoCategory(e.target.value)}
                    placeholder="Keynotes / Tutorials"
                    className="w-full text-xs bg-white border border-stone-300 rounded-lg p-2 text-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-[11px] font-medium text-stone-600 mb-1">Video Title *</label>
                <input
                  type="text"
                  required
                  value={newVideoTitle}
                  onChange={(e) => setNewVideoTitle(e.target.value)}
                  placeholder="Official Walkthrough: Tahmeed Systems"
                  className="w-full text-xs bg-white border border-stone-300 rounded-lg p-2 text-stone-900 focus:outline-none"
                />
              </div>

              <div className="mt-3">
                <label className="block text-[11px] font-medium text-stone-600 mb-1">Description</label>
                <input
                  type="text"
                  value={newVideoDesc}
                  onChange={(e) => setNewVideoDesc(e.target.value)}
                  placeholder="Summary of video topics..."
                  className="w-full text-xs bg-white border border-stone-300 rounded-lg p-2 text-stone-900 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="mt-3 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs px-4 py-2 rounded-lg transition"
              >
                Add Video to Media Hub
              </button>
            </form>

            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                Active Embedded Videos ({videos.length})
              </h4>
              <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl max-h-60 overflow-y-auto">
                {videos.map((v) => (
                  <div key={v.id} className="p-3 flex items-center justify-between text-xs hover:bg-stone-50">
                    <div>
                      <span className="font-bold text-stone-900 block">{v.title}</span>
                      <span className="text-stone-500 font-mono text-[11px]">
                        ID: {v.youtubeId} • Category: {v.category}
                      </span>
                    </div>
                    <button
                      onClick={() => onDeleteVideo(v.id)}
                      className="text-stone-400 hover:text-rose-600 p-1"
                      title="Remove video"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: SEO & Google Ranking */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            {/* Google Search SERP Preview */}
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
              <span className="text-[10px] uppercase font-mono font-bold text-stone-500 block mb-2">
                Google Search Result (SERP) Live Simulator
              </span>
              <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs max-w-xl">
                <div className="flex items-center gap-1.5 text-xs text-stone-600 mb-0.5 font-sans">
                  <div className="w-4 h-4 rounded-full bg-stone-800 text-white text-[9px] flex items-center justify-center font-bold">
                    T
                  </div>
                  <span className="text-stone-800 font-medium">Tahmeed</span>
                  <span className="text-stone-400">https://tahmeed.com</span>
                </div>
                <h4 className="text-base text-blue-800 hover:underline font-medium cursor-pointer font-sans">
                  {seoTitle}
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-amber-600 my-0.5">
                  <span>Rating: 4.9 ★★★★★</span>
                  <span className="text-stone-400">• $189.00 - In Stock</span>
                </div>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed font-sans">
                  {seoDesc}
                </p>
              </div>
            </div>

            {/* SEO Editor Form */}
            <form onSubmit={handleSaveSeo} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Primary Site Title (Google &lt;title&gt;)
                </label>
                <input
                  type="text"
                  required
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Meta Description (Google Snippet)
                </label>
                <textarea
                  rows={3}
                  required
                  value={seoDesc}
                  onChange={(e) => setSeoDesc(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Keywords & Search Targets
                </label>
                <input
                  type="text"
                  value={seoKeywords}
                  onChange={(e) => setSeoKeywords(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Schema.org JSON-LD & Dynamic XML Sitemap (/sitemap.xml) Active</span>
                </div>

                <button
                  type="submit"
                  className="bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{seoSaved ? 'Updated SEO Tags!' : 'Save SEO Meta'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 5: Django Deployment Hub */}
        {activeTab === 'django' && (
          <div className="space-y-4 text-xs text-stone-700">
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
              <h4 className="font-bold text-purple-900 text-sm flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>Django Backend Framework Packaged & Ready</span>
              </h4>
              <p className="mt-1 text-purple-800 text-xs leading-relaxed">
                As requested, a complete Python/Django architecture was built inside <strong>/django_backend/</strong> matching all REST endpoints (products, services, bookings, orders, videos, contacts, and SEO).
              </p>
            </div>

            <div className="border border-stone-200 rounded-xl p-4 space-y-3 font-mono text-[11px] bg-stone-900 text-stone-100">
              <p className="text-emerald-400 font-bold"># Quick 4-Step Django Launch:</p>
              <p>1. npm run build  <span className="text-stone-500"># Compiles React into /dist</span></p>
              <p>2. cd django_backend</p>
              <p>3. pip install -r requirements.txt</p>
              <p>4. python manage.py migrate && python manage.py runserver</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <span className="font-bold text-stone-900 block mb-1">Django Models Created:</span>
                <ul className="list-disc list-inside space-y-0.5 text-stone-600">
                  <li>Product (SKU, title, price, stock)</li>
                  <li>Service (pricing, duration, availability)</li>
                  <li>Booking (code, client, timeslot, status)</li>
                  <li>Order (tracking number, items, address)</li>
                  <li>YouTubeVideo & ContactMessage</li>
                </ul>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <span className="font-bold text-stone-900 block mb-1">Django REST Endpoints:</span>
                <ul className="list-disc list-inside space-y-0.5 text-stone-600 font-mono text-[11px]">
                  <li>/api/products/</li>
                  <li>/api/services/</li>
                  <li>/api/bookings/</li>
                  <li>/api/orders/</li>
                  <li>/api/videos/</li>
                  <li>/admin/ (Django Back-Office)</li>
                </ul>
              </div>
            </div>

            <p className="text-stone-500 text-[11px]">
              Full instructions are detailed in <strong className="font-mono text-stone-800">/django_backend/README_DJANGO.md</strong>.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
