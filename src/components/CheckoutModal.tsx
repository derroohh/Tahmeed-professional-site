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
  Check,
  Smartphone
} from 'lucide-react';
import { CartItem, Order } from '../types';
import { KES_PER_USD } from '../utils/currency';

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
  const [city, setCity] = useState('Nairobi');
  const [state, setState] = useState('Nairobi County');
  const [postalCode, setPostalCode] = useState('00100');
  const [country, setCountry] = useState('Kenya');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | 'google_pay' | 'cash_on_delivery'>('mpesa');
  const [mpesaPhone, setMpesaPhone] = useState('07');
  const [mpesaName, setMpesaName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [copiedTracking, setCopiedTracking] = useState(false);

  if (!isOpen) return null;

  const subtotalUSD = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingUSD = subtotalUSD > 100 ? 0 : 15;
  const taxUSD = (subtotalUSD - discountAmount) * 0.08;
  const grandTotalUSD = Math.max(0, subtotalUSD - discountAmount + shippingUSD + taxUSD);
  const grandTotalKES = Math.round(grandTotalUSD * KES_PER_USD);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !street || !city) return;

    setIsSubmitting(true);

    const orderPayload = {
      items: cart.map((i) => ({
        productId: i.product.id,
        productTitle: i.product.title,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image,
      })),
      totalAmount: grandTotalUSD,
      totalAmountKES: grandTotalKES,
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
      mpesaPhone: paymentMethod === 'mpesa' ? mpesaPhone : undefined,
    };

    const res = await onPlaceOrder(orderPayload);
    setIsSubmitting(false);

    if (res) {
      setConfirmedOrder(res);
      onClearCart();
    }
  };

  const handleCopyTracking = (tracking: string) => {
    navigator.clipboard.writeText(tracking);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-8">
        
        {/* Kenyan flag ribbon at top of modal */}
        <div className="absolute top-0 left-0 right-0 h-1.5 flex rounded-t-3xl overflow-hidden">
          <div className="flex-1 bg-stone-900"></div>
          <div className="flex-1 bg-red-600"></div>
          <div className="flex-1 bg-emerald-600"></div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition"
          aria-label="Close Checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmedOrder ? (
          <form onSubmit={handleSubmitOrder}>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>SSL Encrypted Checkout • Lipa na M-Pesa & Cards</span>
              </div>
              <h3 className="text-2xl font-bold text-stone-900">
                Official Merch Checkout
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Fast doorstep courier dispatch across Kenya (Nairobi, Mombasa, Kisumu, Eldoret) and worldwide.
              </p>
            </div>

            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-1 no-scrollbar">
              
              {/* Order Items Preview with KSh & USD */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  Order Summary ({cart.length} items)
                </h4>
                <div className="divide-y divide-stone-200/80">
                  {cart.map((item) => (
                    <div key={item.product.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.product.image} 
                          alt={item.product.title} 
                          className="w-10 h-10 object-cover rounded-lg border border-stone-200" 
                        />
                        <div>
                          <p className="font-semibold text-stone-900 line-clamp-1">{item.product.title}</p>
                          <p className="text-stone-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right font-medium text-stone-900">
                        <p className="font-bold">KSh {(Math.round(item.product.price * item.quantity * KES_PER_USD)).toLocaleString()}</p>
                        <p className="text-[10px] text-stone-400">(${(item.product.price * item.quantity).toFixed(2)})</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-stone-200 mt-2 space-y-1 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>KSh {Math.round(subtotalUSD * KES_PER_USD).toLocaleString()} (${subtotalUSD.toFixed(2)})</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Promo Discount:</span>
                      <span>-KSh {Math.round(discountAmount * KES_PER_USD).toLocaleString()} (-${discountAmount.toFixed(2)})</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Courier Delivery:</span>
                    <span>{shippingUSD === 0 ? <strong className="text-emerald-700">FREE</strong> : `KSh ${(shippingUSD * KES_PER_USD).toLocaleString()} ($${shippingUSD.toFixed(2)})`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-stone-900 pt-2 border-t border-stone-200">
                    <span>Grand Total:</span>
                    <div className="text-right">
                      <span className="text-emerald-700 text-lg">KSh {grandTotalKES.toLocaleString()}</span>
                      <span className="text-stone-400 font-normal text-xs ml-2">(${grandTotalUSD.toFixed(2)} USD)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 1. Contact Info */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-3 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-stone-500" />
                  <span>1. Contact & Customer Details</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Brian Omondi"
                      className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="brian@gmail.com"
                      className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Shipping Address */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-3 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-500" />
                  <span>2. Delivery Address (Kenya / Worldwide)</span>
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Estate / Street / House / Apt *</label>
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="e.g. Kilimani, Wood Avenue, Apex Court Apt 4B"
                      className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">City / Town *</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Nairobi"
                        className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">County / State</label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Nairobi County"
                        className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Postal Code</label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="00100"
                        className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Country</label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Kenya"
                        className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Payment Method with M-Pesa First */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-3 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-stone-500" />
                  <span>3. Payment Gateway</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
                  
                  {/* M-PESA Tab */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mpesa')}
                    className={`py-2.5 px-3 text-xs rounded-xl border font-semibold transition flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'mpesa'
                        ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
                        : 'border-emerald-200 bg-emerald-50/60 text-emerald-800 hover:bg-emerald-100/80'
                    }`}
                  >
                    <span className="font-bold flex items-center gap-1">
                      <Smartphone className="w-3.5 h-3.5" /> M-Pesa
                    </span>
                    <span className={`text-[10px] ${paymentMethod === 'mpesa' ? 'text-emerald-100' : 'text-emerald-600'}`}>
                      Lipa na M-Pesa
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2.5 px-3 text-xs rounded-xl border text-center font-medium transition flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'card'
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span>Card / Visa</span>
                    <span className="text-[10px] opacity-70">Mastercard / Amex</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('google_pay')}
                    className={`py-2.5 px-3 text-xs rounded-xl border text-center font-medium transition flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'google_pay'
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span>Google Pay</span>
                    <span className="text-[10px] opacity-70">Instant Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash_on_delivery')}
                    className={`py-2.5 px-3 text-xs rounded-xl border text-center font-medium transition flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'cash_on_delivery'
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span>Cash on Delivery</span>
                    <span className="text-[10px] opacity-70">Nairobi Only</span>
                  </button>
                </div>

                {/* M-PESA Details Box */}
                {paymentMethod === 'mpesa' && (
                  <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-emerald-700" />
                        Lipa na M-PESA Buy Goods Till
                      </span>
                      <span className="bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded text-[11px] font-mono font-bold">
                        Till: 8942201
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-emerald-950 mb-1">
                          M-Pesa Phone Number (Safaricom) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={mpesaPhone}
                          onChange={(e) => setMpesaPhone(e.target.value)}
                          placeholder="0712 345 678"
                          className="w-full text-xs bg-white border border-emerald-300 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-emerald-700 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-emerald-950 mb-1">
                          Registered M-Pesa Name (Optional)
                        </label>
                        <input
                          type="text"
                          value={mpesaName}
                          onChange={(e) => setMpesaName(e.target.value)}
                          placeholder="e.g. Derrick Ngure"
                          className="w-full text-xs bg-white border border-emerald-300 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-emerald-700"
                        />
                      </div>
                    </div>

                    <p className="text-[11px] text-emerald-800 leading-relaxed bg-white/70 p-2.5 rounded-lg border border-emerald-100">
                      📱 An instant STK push prompt for <strong>KSh {grandTotalKES.toLocaleString()}</strong> will appear on your Safaricom phone to enter your PIN. Order verification takes ~5 seconds.
                    </p>
                  </div>
                )}

                {/* Card Payment Box */}
                {paymentMethod === 'card' && (
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
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
            <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-600 text-center sm:text-left">
                <span>Total Due:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-emerald-700">
                    KSh {grandTotalKES.toLocaleString()}
                  </span>
                  <span className="text-xs text-stone-400 font-medium">(${grandTotalUSD.toFixed(2)} USD)</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : paymentMethod === 'mpesa' ? (
                  <span>Pay with M-PESA & Place Order</span>
                ) : (
                  <span>Place Order Now</span>
                )}
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
              Asante Sana! Order Confirmed
            </h3>
            <p className="text-xs text-stone-600 mt-2 max-w-sm mx-auto">
              Your official Tahmeed merchandise order has been received and verified.
            </p>

            {/* Tracking Card */}
            <div className="my-6 p-5 bg-stone-50 rounded-2xl border border-stone-200 text-left text-xs space-y-2.5">
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
                <span className="text-stone-800 font-semibold">{confirmedOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-medium">Payment Gateway:</span>
                <span className="text-emerald-800 font-bold uppercase">{confirmedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-medium">Delivery Destination:</span>
                <span className="text-stone-800">{confirmedOrder.shippingAddress.street}, {confirmedOrder.shippingAddress.city}, Kenya</span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-2.5 font-bold">
                <span className="text-stone-700">Total Billed:</span>
                <span className="text-emerald-700 text-base">
                  KSh {(Math.round(confirmedOrder.totalAmount * KES_PER_USD)).toLocaleString()} 
                  <span className="text-xs text-stone-400 font-normal ml-1.5">(${confirmedOrder.totalAmount.toFixed(2)})</span>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-stone-600 mb-6 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Dispatched via Fargo Courier / Sendy / DHL within 24h. Tracking sent via SMS & Email.</span>
            </div>

            <button
              onClick={onClose}
              className="bg-stone-900 hover:bg-black text-white font-medium text-xs px-8 py-3 rounded-full transition"
            >
              Continue Exploring Tahmeed.com
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
