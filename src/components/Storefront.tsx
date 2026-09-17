import React, { useState, useMemo } from 'react';
import { 
  Star, 
  ShoppingBag, 
  Check, 
  Truck, 
  Shield, 
  ArrowUpDown,
  Eye,
  Tag,
  X,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { Product } from '../types';
import { formatBothCurrencies, CurrencyMode, KES_PER_USD } from '../utils/currency';

interface StorefrontProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  searchQuery: string;
}

export const Storefront: React.FC<StorefrontProps> = ({
  products,
  onAddToCart,
  onBuyNow,
  searchQuery,
}) => {
  const [currencyMode, setCurrencyMode] = useState<CurrencyMode>('KES');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All 254 Merch' },
    { id: 'apparel', label: 'Tour Hoodies & Streetwear' },
    { id: 'vinyl', label: 'Vinyl Records & Music' },
    { id: 'art', label: 'Art Prints & Lyric Journals' },
    { id: 'accessories', label: 'Caps & Accessories' },
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    setAddedAnimationId(product.id);
    setTimeout(() => setAddedAnimationId(null), 1500);
  };

  return (
    <section id="store" className="py-16 sm:py-24 bg-[#f5f5f7] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/90 shadow-2xs mb-3">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
              <span>🇰🇪 Official Kenyan & Global Drops • Lipa na M-Pesa</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1d1d1f] tracking-tight">
              Tour Merch & Drops.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl font-normal">
              Exclusive 254 tour apparel, Savanna Red vinyl pressings, and archival studio monographs. Direct dispatch across Nairobi, Kenya & worldwide.
            </p>
          </div>

          {/* Currency Toggle & Sort Controller */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto text-xs text-stone-600">
            {/* Currency Switcher */}
            <div className="inline-flex p-0.5 rounded-full bg-white border border-stone-300 shadow-2xs">
              <button
                type="button"
                onClick={() => setCurrencyMode('KES')}
                className={`px-3 py-1 rounded-full font-bold text-xs transition ${
                  currencyMode === 'KES'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                🇰🇪 KSh (KES)
              </button>
              <button
                type="button"
                onClick={() => setCurrencyMode('USD')}
                className={`px-3 py-1 rounded-full font-bold text-xs transition ${
                  currencyMode === 'USD'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                💵 USD ($)
              </button>
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
              <span className="font-semibold uppercase tracking-wider text-[11px] hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-stone-300 text-stone-800 text-xs sm:text-sm rounded-full px-3.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-stone-300 shadow-2xs cursor-pointer"
              >
                <option value="featured">Featured & Best Selling</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-4 sm:px-5 py-2 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-stone-900 text-white shadow-xs font-semibold'
                  : 'bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900 border border-stone-200/90 shadow-2xs'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Results Summary */}
        {searchQuery && (
          <div className="mb-6 p-3.5 bg-white rounded-xl text-xs text-stone-700 border border-stone-200/80 shadow-2xs flex items-center justify-between">
            <span>
              Showing results for <strong className="text-stone-900 font-semibold">"{searchQuery}"</strong> ({filteredProducts.length} items found)
            </span>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center text-stone-500 shadow-xs">
            <Tag className="w-10 h-10 mx-auto text-stone-300 mb-3" />
            <p className="font-semibold text-stone-800 text-base">No items matched your criteria.</p>
            <p className="text-xs text-stone-500 mt-1">Try clearing your search query or selecting "All 254 Merch".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isAdded = addedAnimationId === product.id;
              const prices = formatBothCurrencies(product.price, currencyMode);

              return (
                <article
                  key={product.id}
                  className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col group"
                >
                  {/* Image Container */}
                  <div 
                    className="relative aspect-4/3 bg-[#f5f5f7] overflow-hidden cursor-pointer" 
                    onClick={() => setSelectedProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Product Badge */}
                    {product.badge && (
                      <span className="absolute top-3.5 left-3.5 bg-stone-900/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs tracking-wider uppercase">
                        {product.badge}
                      </span>
                    )}

                    {/* Stock Status Indicator */}
                    {product.stockCount <= 20 && (
                      <span className="absolute top-3.5 right-3.5 bg-amber-500/95 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
                        Only {product.stockCount} left
                      </span>
                    )}

                    {/* Quick View Button on Hover */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                      className="absolute bottom-3.5 right-3.5 bg-white/90 backdrop-blur-xs text-stone-800 p-2.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                      title="Quick Details"
                      aria-label="Quick View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Product Information */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* SKU & Category */}
                      <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1.5 font-mono">
                        <span>{product.sku}</span>
                        <span className="uppercase tracking-wider font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          {product.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 
                        onClick={() => setSelectedProduct(product)}
                        className="text-lg font-bold text-stone-900 line-clamp-1 cursor-pointer hover:text-emerald-700 transition-colors"
                      >
                        {product.title}
                      </h3>

                      {/* Rating & Reviews */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="flex items-center text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(product.rating)
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-stone-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-stone-800">{product.rating.toFixed(1)}</span>
                        <span className="text-xs text-stone-500">({product.reviewCount} reviews)</span>
                      </div>

                      {/* Description Preview */}
                      <p className="text-xs text-stone-600 mt-2.5 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Pricing and Actions */}
                    <div className="mt-5 pt-4 border-t border-stone-100">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-2xl font-black text-stone-900 tracking-tight">
                          {prices.primary}
                        </span>
                        <span className="text-xs font-medium text-stone-400">
                          {prices.secondary}
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-700 ml-auto bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Smartphone className="w-3 h-3" /> M-Pesa Ready
                        </span>
                      </div>

                      {/* Dispatch Notice */}
                      <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mb-3.5">
                        <Truck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Nairobi warehouse dispatch • Countrywide delivery</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-semibold transition-all border ${
                            isAdded
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'bg-stone-100 hover:bg-stone-200 border-stone-300/80 text-stone-800'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" /> In Bag
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => onBuyNow(product)}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-semibold bg-stone-900 hover:bg-black text-white transition-all shadow-2xs hover:shadow-xs"
                        >
                          <span>Buy Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 text-stone-600 hover:text-stone-900 p-2 rounded-full shadow-md transition"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-square bg-stone-100 relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                    {selectedProduct.sku}
                  </span>
                  <h3 className="text-xl font-extrabold text-stone-900 mt-2">
                    {selectedProduct.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(selectedProduct.rating) ? 'fill-amber-400' : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-stone-800">{selectedProduct.rating}</span>
                    <span className="text-stone-500">({selectedProduct.reviewCount} customer reviews)</span>
                  </div>

                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-stone-900">
                      {formatBothCurrencies(selectedProduct.price, currencyMode).primary}
                    </span>
                    <span className="text-sm text-stone-500">
                      {formatBothCurrencies(selectedProduct.price, currencyMode).secondary}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  <div className="mt-4 p-3.5 bg-[#f5f5f7] rounded-xl text-xs text-stone-700 space-y-2 border border-stone-200/80">
                    <div className="flex items-center gap-2">
                      <Truck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Fargo Courier & DHL dispatch from Nairobi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Lipa na M-Pesa & Visa/Mastercard support</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200 flex gap-3">
                  <button
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                    }}
                    className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold py-3 rounded-full text-xs transition border border-stone-300"
                  >
                    Add to Bag
                  </button>
                  <button
                    onClick={() => {
                      const p = selectedProduct;
                      setSelectedProduct(null);
                      onBuyNow(p);
                    }}
                    className="flex-1 bg-stone-900 hover:bg-black text-white font-semibold py-3 rounded-full text-xs transition shadow-xs"
                  >
                    Instant Checkout
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
