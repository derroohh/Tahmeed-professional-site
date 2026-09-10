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
  Sparkles
} from 'lucide-react';
import { Product } from '../types';

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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Merch' },
    { id: 'apparel', label: 'Tour Apparel & Streetwear' },
    { id: 'vinyl', label: 'Vinyl Records & Music' },
    { id: 'art', label: 'Art Prints & Books' },
    { id: 'accessories', label: 'Accessories & Headwear' },
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
        
        {/* Apple-Style Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-600 bg-white px-3 py-1 rounded-full border border-stone-200/90 shadow-2xs mb-3">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Official Artist Merch & Limited Drops</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1d1d1f] tracking-tight">
              Tour Merch & Drops.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl font-normal">
              Exclusive tour apparel, heavyweight vinyl pressings, and archival art collections. Order directly with worldwide tracking and official certificate of authenticity.
            </p>
          </div>

          {/* Sort Controller */}
          <div className="flex items-center gap-2 self-start md:self-auto text-xs text-stone-600">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
            <span className="font-semibold uppercase tracking-wider text-[11px]">Sort By:</span>
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

        {/* Category Pills (Apple-style Segmented Control) */}
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
            <p className="text-xs text-stone-500 mt-1">Try clearing your search query or selecting "All Products".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isAdded = addedAnimationId === product.id;

              return (
                <article
                  key={product.id}
                  className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-stone-300 transition-all duration-300 flex flex-col group"
                >
                  {/* Image Container with Soft Light Apple Backdrop */}
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
                        <span className="uppercase tracking-wider font-semibold text-stone-600">{product.category}</span>
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
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-2xl font-black text-stone-900 tracking-tight">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-stone-400 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="text-[11px] font-semibold text-emerald-700 ml-auto bg-emerald-50 px-2 py-0.5 rounded-full">
                          Complimentary Delivery
                        </span>
                      </div>

                      {/* Dispatch Notice */}
                      <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mb-3.5">
                        <Truck className="w-3.5 h-3.5 text-stone-400" />
                        <span>Dispatched from Tahmeed warehouse</span>
                      </div>

                      {/* Action Buttons: Add to Bag & Buy Now (Apple Pills) */}
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
                          className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-full text-xs font-semibold bg-stone-900 hover:bg-black text-white shadow-xs transition active:scale-98"
                        >
                          Buy Now
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

      {/* Product Detail Modal (Apple Style Pure Light Modal) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-stone-950/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200 my-8">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 p-2 rounded-full hover:bg-stone-100"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {/* Product Visual */}
              <div className="rounded-2xl overflow-hidden bg-[#f5f5f7] aspect-square flex items-center justify-center">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-stone-500 uppercase tracking-wider">
                    SKU: {selectedProduct.sku}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1">
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
                      ${selectedProduct.price.toFixed(2)}
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className="text-sm text-stone-400 line-through">
                        ${selectedProduct.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  <div className="mt-4 p-3.5 bg-[#f5f5f7] rounded-xl text-xs text-stone-700 space-y-2 border border-stone-200/80">
                    <div className="flex items-center gap-2">
                      <Truck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Direct fulfillment from <strong>tahmeed.com</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-blue-600" />
                      <span>Authenticity guaranteed & 30-day returns</span>
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
