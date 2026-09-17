import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Tag,
  Truck,
  Smartphone
} from 'lucide-react';
import { CartItem } from '../types';
import { KES_PER_USD } from '../utils/currency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: (discountAmount: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscountRate, setAppliedDiscountRate] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * appliedDiscountRate;
  const shippingFee = subtotal >= 100 || subtotal === 0 ? 0 : 15;
  const estimatedTax = (subtotal - discountAmount) * 0.08;
  const total = Math.max(0, subtotal - discountAmount + shippingFee + estimatedTax);
  const totalKES = Math.round(total * KES_PER_USD);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();

    if (code === 'NAIROBI254' || code === 'TAHMEED10') {
      setAppliedDiscountRate(0.1);
      setPromoSuccess('10% Kenyan Fan discount applied successfully!');
      setPromoError('');
    } else if (code === 'SOLFEST20' || code === 'VIP20') {
      setAppliedDiscountRate(0.2);
      setPromoSuccess('20% VIP Festival passholder discount applied!');
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try NAIROBI254 or TAHMEED10');
      setPromoSuccess('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-stone-950/40 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-[#fbfbfd]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-800" />
              <h3 className="font-extrabold text-base text-stone-900 tracking-tight">
                Review Your Merch Bag ({cart.reduce((acc, i) => acc + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-200/80 text-stone-500 hover:text-stone-900 transition"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="bg-[#f5f5f7] px-6 py-3 border-b border-stone-200/80 text-xs">
            {subtotal >= 100 ? (
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <Truck className="w-4 h-4" />
                <span>You unlocked Complimentary Doorstep Delivery across Kenya!</span>
              </div>
            ) : (
              <div>
                <span className="text-stone-600">
                  Add <strong>KSh {Math.round((100 - subtotal) * KES_PER_USD).toLocaleString()}</strong> (${(100 - subtotal).toFixed(2)}) more for Free Delivery
                </span>
                <div className="w-full bg-stone-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / 100) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-stone-100">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-stone-500">
                <ShoppingBag className="w-12 h-12 mx-auto text-stone-300 mb-3" />
                <p className="font-semibold text-stone-800">Your bag is empty</p>
                <p className="text-xs text-stone-500 mt-1">Explore 254 drops in the storefront and add items to your bag.</p>
                <button
                  onClick={onClose}
                  className="mt-6 bg-stone-900 text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-black transition shadow-xs"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div key={product.id} className="py-4 flex gap-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded-xl bg-[#f5f5f7] border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-stone-900 line-clamp-2">
                          {product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-stone-400 hover:text-rose-600 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono">
                        SKU: {product.sku}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-200 rounded-full bg-stone-50">
                        <button
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="p-1.5 hover:bg-stone-200/80 rounded-l-full text-stone-600 transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-stone-800">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="p-1.5 hover:bg-stone-200/80 rounded-r-full text-stone-600 transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-extrabold text-stone-900 block">
                          KSh {Math.round(product.price * quantity * KES_PER_USD).toLocaleString()}
                        </span>
                        <span className="text-[10px] text-stone-400 font-medium">
                          (${(product.price * quantity).toFixed(2)})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-[#fbfbfd] border-t border-stone-200">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="mb-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Coupon (try NAIROBI254)"
                      className="w-full text-xs uppercase bg-white border border-stone-300 rounded-full pl-8 pr-3 py-2 text-stone-900 focus:outline-none focus:border-stone-900"
                    />
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="bg-stone-900 hover:bg-black text-white text-xs font-semibold px-4 py-2 rounded-full transition shadow-2xs"
                  >
                    Apply
                  </button>
                </div>
                {promoSuccess && <p className="text-[11px] text-emerald-600 mt-1.5 font-medium">{promoSuccess}</p>}
                {promoError && <p className="text-[11px] text-rose-600 mt-1.5">{promoError}</p>}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">
                    KSh {Math.round(subtotal * KES_PER_USD).toLocaleString()} (${subtotal.toFixed(2)})
                  </span>
                </div>

                {appliedDiscountRate > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({(appliedDiscountRate * 100).toFixed(0)}%)</span>
                    <span>-KSh {Math.round(discountAmount * KES_PER_USD).toLocaleString()} (-${discountAmount.toFixed(2)})</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping (Fargo Courier Kenya)</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700">Complimentary</strong> : `KSh ${(shippingFee * KES_PER_USD).toLocaleString()} ($${shippingFee.toFixed(2)})`}</span>
                </div>

                <div className="flex justify-between items-baseline text-base font-extrabold text-stone-900 pt-2.5 border-t border-stone-200">
                  <span>Total Due</span>
                  <div className="text-right">
                    <span className="text-lg font-black text-emerald-700 block">
                      KSh {totalKES.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-stone-400 font-normal">
                      (${total.toFixed(2)} USD)
                    </span>
                  </div>
                </div>
              </div>

              {/* Proceed to checkout button */}
              <button
                onClick={() => onProceedToCheckout(discountAmount)}
                className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm py-3.5 rounded-full shadow-xs transition flex items-center justify-center gap-2 active:scale-98"
              >
                <Smartphone className="w-4 h-4" />
                <span>Checkout (M-Pesa / Card)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-3 text-center text-[10px] text-stone-500 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Encrypted 256-bit checkout • Official Tahmeed Guarantee</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
