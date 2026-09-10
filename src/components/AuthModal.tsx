import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  CheckCircle, 
  LogOut, 
  Package, 
  Calendar, 
  Shield, 
  Sparkles 
} from 'lucide-react';
import { UserAccount, Order, Booking } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAccount | null;
  onLogin: (email: string, password?: string, provider?: 'email' | 'google') => Promise<boolean>;
  onLogout: () => void;
  orders: Order[];
  bookings: Booking[];
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogin,
  onLogout,
  orders,
  bookings,
}) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'bookings'>('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const ok = await onLogin(email, password, 'email');
      if (!ok) {
        setError('Authentication failed. Check your credentials.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);
    try {
      await onLogin('user.tahmeed@gmail.com', '', 'google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 text-lg p-2"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {user ? (
          /* User Profile & Account Management */
          <div>
            <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
              <div className="w-12 h-12 rounded-full bg-stone-900 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-stone-900">{user.name}</h3>
                  {user.role === 'admin' && (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Admin
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-500 font-mono">{user.email}</p>
              </div>

              <button
                onClick={onLogout}
                className="text-stone-400 hover:text-rose-600 p-2 text-xs flex items-center gap-1"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>

            {/* Profile Navigation Tabs */}
            <div className="flex border-b border-stone-200 my-4 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-2 px-3 border-b-2 transition ${
                  activeTab === 'profile'
                    ? 'border-stone-900 text-stone-900'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                Profile & Security
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-2 px-3 border-b-2 transition ${
                  activeTab === 'orders'
                    ? 'border-stone-900 text-stone-900'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                Store Orders ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-2 px-3 border-b-2 transition ${
                  activeTab === 'bookings'
                    ? 'border-stone-900 text-stone-900'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                Live & Studio Bookings ({bookings.length})
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'profile' && (
              <div className="space-y-3 text-xs text-stone-600">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-stone-400 font-medium">Authentication Method:</span>
                    <span className="font-semibold text-stone-800 uppercase font-mono">{user.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400 font-medium">Security Status:</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5" /> 2FA Verified
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400 font-medium">Domain Access:</span>
                    <span className="font-mono text-stone-800">tahmeed.com Official Member</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 text-[11px] leading-relaxed">
                  Your account is synced across the Artist Merch Storefront, Live Bookings, and Django API endpoints.
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {orders.length === 0 ? (
                  <p className="text-xs text-stone-500 text-center py-8">No storefront orders found for this account.</p>
                ) : (
                  orders.map((ord) => (
                    <div key={ord.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                      <div className="flex items-center justify-between font-mono mb-1">
                        <span className="font-bold text-stone-900">{ord.id}</span>
                        <span className="bg-stone-200 text-stone-800 text-[10px] px-2 py-0.5 rounded font-semibold uppercase">
                          {ord.status}
                        </span>
                      </div>
                      <p className="text-stone-600 text-[11px]">
                        Tracking: <strong className="font-mono text-emerald-700">{ord.trackingNumber}</strong>
                      </p>
                      <div className="flex justify-between items-baseline mt-2 pt-2 border-t border-stone-200">
                        <span className="text-stone-500">{ord.items.length} item(s)</span>
                        <span className="font-extrabold text-stone-900">${ord.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {bookings.length === 0 ? (
                  <p className="text-xs text-stone-500 text-center py-8">No service bookings scheduled yet.</p>
                ) : (
                  bookings.map((bkg) => (
                    <div key={bkg.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                      <div className="flex items-center justify-between font-mono mb-1">
                        <span className="font-bold text-stone-900">{bkg.id}</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded font-semibold uppercase">
                          {bkg.status}
                        </span>
                      </div>
                      <p className="font-semibold text-stone-800">{bkg.serviceTitle}</p>
                      <p className="text-stone-500 text-[11px] mt-0.5">
                        Scheduled: {bkg.date} ({bkg.timeSlot})
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}

          </div>
        ) : (
          /* Sign In / Register Form */
          <div>
            <div className="mb-6">
              <span className="text-xs font-mono uppercase text-emerald-700 font-semibold">
                Tahmeed.com Member Portal
              </span>
              <h3 className="text-2xl font-extrabold text-stone-900 mt-1">
                {isRegisterMode ? 'Create Your Account' : 'Sign in to Tahmeed.com'}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Access your orders, tracked deliveries, and service bookings.
              </p>
            </div>

            {/* Google Sign In Button */}
            <div className="mb-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl border border-stone-300 shadow-xs transition"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.02 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-white px-2 text-stone-400 font-mono">Or use email</span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                {error}
              </div>
            )}

            {/* Email Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              {isRegisterMode && (
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Your Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Connor"
                      className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg pl-8 pr-3 py-2 text-stone-900 focus:outline-none focus:border-stone-900"
                    />
                    <UserIcon className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg pl-8 pr-3 py-2 text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                  <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg pl-8 pr-3 py-2 text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                  <Lock className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm py-2.5 rounded-xl shadow-md transition disabled:opacity-50"
              >
                {isLoading
                  ? 'Verifying...'
                  : isRegisterMode
                  ? 'Register Account'
                  : 'Sign In to Account'}
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-stone-500">
              {isRegisterMode ? (
                <span>
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsRegisterMode(false)}
                    className="font-semibold text-stone-900 hover:underline"
                  >
                    Sign In
                  </button>
                </span>
              ) : (
                <span>
                  Need an account?{' '}
                  <button
                    onClick={() => setIsRegisterMode(true)}
                    className="font-semibold text-stone-900 hover:underline"
                  >
                    Register here
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
