import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle, 
  Truck, 
  MapPin, 
  User, 
  Mail,
  Copy,
  Check
} from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  discountAmount: number;
  onPlaceOrder: (orderPayload: any) => Promise<Order | null>;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  discountAmount,
  onPlaceOrder,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('United States');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'google_pay' | 'cash_on_delivery'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [copiedTracking, setCopiedTracking] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = (subtotal - discountAmount) * 0.08;
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping + tax);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !street || !city) return;

    setIsSubmitting(true);
    try {
      const orderPayload = {
        items: cart.map(i => ({
          productId: i.product.id,
          productTitle: i.product.title,
          price: i.product.price,
          quantity: i.quantity,
          image: i.product.image,
        })),
        totalAmount: grandTotal,
        customerName,
        customerEmail,
        shippingAddress: {
          street,
          city,
          state,
          postalCode,
          country,
        },
        paymentMethod,
      };

      const result = await onPlaceOrder(orderPayload);
      if (result) {
        setConfirmedOrder(result);
        onClearCart();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyTracking = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 text-lg p-2"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmedOrder ? (
          <form onSubmit={handleSubmitOrder}>
            <div className="border-b border-stone-100 pb-4 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-semibold uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>Tahmeed.com Verified Checkout</span>
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mt-1">
                Complete Your Order
              </h3>
              <p className="text-xs text-stone-500">
                Total: <strong>${grandTotal.toFixed(2)}</strong> for {cart.reduce((s, i) => s + i.quantity, 0)} items
              </p>
            </div>

            <div className="space-y-6">
              {/* Customer Contact */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-3 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-stone-500" />
                  <span>1. Contact Information</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Johnathan Smith"
                      className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-3 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-500" />
                  <span>2. Shipping Address</span>
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Street Address *</label>
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="123 Market Street, Suite 400"
                      className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-stone-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">City *</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="New York"
                        className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">State / Province</label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="NY"
                        className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Postal Code *</label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="10001"
                        className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-stone-900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-3 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-stone-500" />
                  <span>3. Payment Gateway</span>
                </h4>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-3 text-xs rounded-lg border text-center font-medium transition ${
                      paymentMethod === 'card'
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    Credit / Debit Card
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('google_pay')}
                    className={`py-2 px-3 text-xs rounded-lg border text-center font-medium transition ${
                      paymentMethod === 'google_pay'
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    Google Pay
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash_on_delivery')}
                    className={`py-2 px-3 text-xs rounded-lg border text-center font-medium transition ${
                      paymentMethod === 'cash_on_delivery'
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    Invoice / COD
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                    <div>
                      <label className="block text-[11px] font-medium text-stone-600 mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="•••• •••• •••• 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full text-xs bg-white border border-stone-300 rounded-lg p-2 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-stone-600 mb-1">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          placeholder="12/28"
                          value={cardExp}
                          onChange={(e) => setCardExp(e.target.value)}
                          className="w-full text-xs bg-white border border-stone-300 rounded-lg p-2 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-stone-600 mb-1">CVC / CVV</label>
                        <input
                          type="text"
                          placeholder="892"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full text-xs bg-white border border-stone-300 rounded-lg p-2 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Action */}
            <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between">
              <div className="text-xs text-stone-600">
                <span>Final Billed Amount:</span>
                <span className="block text-xl font-black text-stone-900">${grandTotal.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition disabled:opacity-50"
              >
                {isSubmitting ? 'Processing Payment...' : 'Pay & Place Order Now'}
              </button>
            </div>
          </form>
        ) : (
          /* Order Confirmed Receipt */
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-stone-900">
              Order Confirmed & Placed!
            </h3>
            <p className="text-xs text-stone-600 mt-2 max-w-sm mx-auto">
              Your order has been recorded in the <strong>tahmeed.com</strong> official artist fulfillment system.
            </p>

            {/* Tracking Card */}
            <div className="my-6 p-4 bg-stone-50 rounded-xl border border-stone-200 text-left text-xs space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-stone-500 font-medium">Order Number:</span>
                <span className="font-mono font-bold text-stone-900">{confirmedOrder.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500 font-medium">Tracking Number:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {confirmedOrder.trackingNumber}
                  </span>
                  <button
                    onClick={() => handleCopyTracking(confirmedOrder.trackingNumber)}
                    className="text-stone-400 hover:text-stone-700 p-1"
                    title="Copy tracking number"
                  >
                    {copiedTracking ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-medium">Recipient:</span>
                <span className="text-stone-800">{confirmedOrder.customerName} ({confirmedOrder.customerEmail})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-medium">Delivery Destination:</span>
                <span className="text-stone-800">{confirmedOrder.shippingAddress.street}, {confirmedOrder.shippingAddress.city}</span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-2 font-bold">
                <span className="text-stone-700">Total Billed:</span>
                <span className="text-stone-900">${confirmedOrder.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-stone-500 mb-6">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Courier dispatched within 24 hours. Tracking updates will be sent via email.</span>
            </div>

            <button
              onClick={onClose}
              className="bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs px-8 py-2.5 rounded-lg transition"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
