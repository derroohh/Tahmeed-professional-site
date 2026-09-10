import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  Tag, 
  Truck 
} from 'lucide-react';
import { CartItem } from '../types';

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
  const shippingFee = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const estimatedTax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + shippingFee + estimatedTax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (promoCode.trim().toUpperCase() === 'TAHMEED10') {
      setAppliedDiscountRate(0.10);
      setPromoSuccess('Promo code applied: 10% Off!');
    } else if (promoCode.trim().toUpperCase() === 'VIP20') {
      setAppliedDiscountRate(0.20);
      setPromoSuccess('VIP Discount applied: 20% Off!');
    } else {
      setPromoError('Invalid coupon code. Try TAHMEED10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Apple-Style Light Header */}
          <div className="p-5 sm:p-6 bg-white text-stone-900 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="text-lg font-bold tracking-tight text-[#1d1d1f]">Shopping Bag</h2>
              <span className="text-xs bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-full font-mono font-medium">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-900 p-1.5 rounded-full hover:bg-stone-100 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="bg-[#f5f5f7] px-6 py-3 border-b border-stone-200/80 text-xs">
            {subtotal >= 100 ? (
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <Truck className="w-4 h-4" />
                <span>You unlocked Complimentary Express Delivery!</span>
              </div>
            ) : (
              <div>
                <span className="text-stone-600">
                  Add <strong>${(100 - subtotal).toFixed(2)}</strong> more for Complimentary Delivery
                </span>
                <div className="w-full bg-stone-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-stone-900 h-full rounded-full transition-all duration-300"
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
                <p className="text-xs text-stone-500 mt-1">Explore items in the storefront and add them to your bag.</p>
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

                      <span className="text-sm font-extrabold text-stone-900">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
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
                      placeholder="Coupon (try TAHMEED10)"
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
                  <span className="font-semibold text-stone-900">${subtotal.toFixed(2)}</span>
                </div>

                {appliedDiscountRate > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({(appliedDiscountRate * 100).toFixed(0)}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping (Tahmeed Logistics)</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700">Complimentary</strong> : `$${shippingFee.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span>${estimatedTax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-stone-900 pt-2.5 border-t border-stone-200">
                  <span>Total Amount</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Proceed to checkout button */}
              <button
                onClick={() => onProceedToCheckout(discountAmount)}
                className="w-full mt-4 bg-stone-900 hover:bg-black text-white font-semibold text-xs sm:text-sm py-3.5 rounded-full shadow-xs transition flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-3 text-center text-[10px] text-stone-400 flex items-center justify-center gap-1">
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
