import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  User, 
  Calendar, 
  Video, 
  Mail, 
  Settings, 
  CheckCircle2, 
  Menu, 
  X,
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { CartItem, UserAccount } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  user: UserAccount | null;
  onOpenAuth: () => void;
  onOpenAdmin: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  user,
  onOpenAuth,
  onOpenAdmin,
  onSearch,
  searchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-stone-200/80 transition-colors">
      {/* Apple-style Micro Announcement Ribbon */}
      <div className="bg-[#f5f5f7] text-stone-600 text-[11px] sm:text-xs py-1.5 px-4 text-center border-b border-stone-200/70 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Google Verified Hub
        </span>
        <span className="text-stone-300">•</span>
        <span className="text-stone-800 font-medium">Official <strong>tahmeed.com</strong> Portal</span>
        <span className="hidden md:inline text-stone-300">•</span>
        <span className="hidden md:inline text-stone-500">Official Tour Merch, Vinyl Records & Live Performance Bookings</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Monogram & Logo (Apple / Rockstar Minimalism) */}
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              className="flex items-center gap-2.5 group"
              aria-label="Tahmeed.com Home"
            >
              <div className="w-9 h-9 rounded-xl bg-stone-900 text-white font-bold flex items-center justify-center text-base tracking-wider shadow-sm group-hover:bg-black transition-colors font-mono">
                T
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-stone-900 flex items-center gap-1 font-mono">
                  TAHMEED<span className="text-emerald-600 font-sans">.COM</span>
                </span>
                <span className="text-[9px] sm:text-[10px] text-stone-400 font-medium -mt-1 tracking-widest uppercase font-sans">
                  Official Artist Flagship & Merch
                </span>
              </div>
            </a>
          </div>

          {/* Apple-Style Refined Search Input */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search merch, vinyl, bookings, visuals..."
                className="w-full bg-[#f5f5f7] hover:bg-stone-100 focus:bg-white text-stone-900 placeholder-stone-400 text-xs sm:text-sm rounded-full pl-9 pr-14 py-2 border border-stone-200/80 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200 transition"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-3" />
              {searchQuery ? (
                <button 
                  onClick={() => onSearch('')} 
                  className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-800 font-medium"
                >
                  Clear
                </button>
              ) : (
                <span className="absolute right-3 top-2 text-[10px] text-stone-400 font-mono bg-stone-200/60 px-1.5 py-0.5 rounded">
                  ⌘K
                </span>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-stone-600">
            <a href="#store" className="hover:text-stone-950 transition-colors">Merch Store</a>
            <a href="#bookings" className="hover:text-stone-950 transition-colors flex items-center gap-1">
              <span>Live Bookings</span>
            </a>
            <a href="#videos" className="hover:text-stone-950 transition-colors flex items-center gap-1">
              <span>Visuals & Media</span>
            </a>
            <a href="#contact" className="hover:text-stone-950 transition-colors flex items-center gap-1">
              <span>Contact & Management</span>
            </a>
          </nav>

          {/* Actions: Admin CMS, Auth & Cart */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Admin CMS Button */}
            <button
              onClick={onOpenAdmin}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 px-3 py-1.5 rounded-full border border-stone-200/90 transition font-medium"
              title="Manage site content, inventory & SEO"
            >
              <Settings className="w-3.5 h-3.5 text-stone-500" />
              <span>Studio CMS</span>
            </button>

            {/* User Account / Sign In */}
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-stone-700 hover:text-stone-950 px-2.5 py-1.5 rounded-full hover:bg-stone-100 transition font-medium"
            >
              <div className="w-6 h-6 rounded-full bg-stone-200 text-stone-800 flex items-center justify-center text-xs font-bold font-mono">
                {user ? user.name.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5 text-stone-600" />}
              </div>
              <span className="hidden sm:inline">
                {user ? user.name.split(' ')[0] : 'Sign In'}
              </span>
            </button>

            {/* Shopping Bag Button (Apple Style) */}
            <button
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-1.5 bg-stone-900 hover:bg-black text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-full shadow-xs hover:shadow-sm transition active:scale-98"
              aria-label={`Cart with ${totalCartCount} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-semibold">Bag</span>
              {totalCartCount > 0 && (
                <span className="bg-white text-stone-900 text-xs font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center font-mono">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-stone-700 hover:text-stone-950 p-2 rounded-lg hover:bg-stone-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3 pt-1">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search merch, vinyl, bookings..."
              className="w-full bg-[#f5f5f7] text-stone-900 placeholder-stone-400 text-xs rounded-full pl-9 pr-4 py-2 border border-stone-200/80 focus:outline-none focus:border-stone-400"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <a
            href="#store"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-sm font-medium text-stone-800 hover:text-emerald-700 py-2 border-b border-stone-100"
          >
            <span>Official Artist Merch</span>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </a>
          <a
            href="#bookings"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-sm font-medium text-stone-800 hover:text-emerald-700 py-2 border-b border-stone-100"
          >
            <span>Live & Studio Bookings</span>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </a>
          <a
            href="#videos"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-sm font-medium text-stone-800 hover:text-emerald-700 py-2 border-b border-stone-100"
          >
            <span>Music Videos & Visuals</span>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-sm font-medium text-stone-800 hover:text-emerald-700 py-2 border-b border-stone-100"
          >
            <span>Socials & Artist Management</span>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </a>
          <div className="pt-2 flex items-center justify-between gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
              className="flex-1 inline-flex items-center justify-center gap-2 text-xs bg-stone-100 text-stone-800 px-3 py-2.5 rounded-full font-medium"
            >
              <Settings className="w-3.5 h-3.5 text-stone-600" /> Studio CMS
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
              className="flex-1 inline-flex items-center justify-center gap-2 text-xs bg-stone-900 text-white px-3 py-2.5 rounded-full font-medium"
            >
              <User className="w-3.5 h-3.5 text-stone-300" /> {user ? user.name : 'Sign In'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
