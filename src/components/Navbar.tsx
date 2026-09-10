import React, { useState, useEffect, useRef } from 'react';
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
  ChevronDown,
  ChevronRight,
  Compass,
  ArrowUp
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
  onNavigateToSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  user,
  onOpenAuth,
  onOpenAdmin,
  onSearch,
  searchQuery,
  onNavigateToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  const lastScrollY = useRef(0);
  const touchStartY = useRef(0);
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isAdmin = (user?.email || '').trim().toLowerCase() === 'derrickngure39@gmail.com';

  const sections = [
    { id: 'hero', label: 'Overview', icon: Compass },
    { id: 'store', label: 'Tour Merch', icon: ShoppingBag },
    { id: 'bookings', label: 'Live Bookings', icon: Calendar },
    { id: 'videos', label: 'Visuals & Media', icon: Video },
    { id: 'contact', label: 'Send Emails', icon: Mail },
  ];

  // Scroll & swipe-down detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Section tracking
      const sectionElements = sections.map((s) => ({
        id: s.id,
        el: document.getElementById(s.id),
      }));

      const scrollPosition = currentScrollY + 200;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && scrollPosition >= item.el.offsetTop) {
          setActiveSection(item.id);
          break;
        }
      }

      // At very top: always visible
      if (currentScrollY <= 60) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY.current - 5) {
        // Scrolling up / swiped down: REVEAL top navigation bar
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 10 && currentScrollY > 120) {
        // Scrolling down: hide to allow full screen focus
        if (!mobileMenuOpen) {
          setIsVisible(false);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    // Touch gesture detection for mobile swipe-down
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchCurrentY = e.touches[0].clientY;
      const diff = touchCurrentY - touchStartY.current;

      // Swiping downward with finger: instantly reveal navigation bar
      if (diff > 12) {
        setIsVisible(true);
      } else if (diff < -25 && window.scrollY > 120 && !mobileMenuOpen) {
        // Swiping upward (scrolling down): tuck navbar
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [mobileMenuOpen]);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);

    if (onNavigateToSection) {
      onNavigateToSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Floating Swipe-Down Indicator (Shows when navbar is tucked and user is scrolled down) */}
      {!isVisible && isScrolled && (
        <button
          onClick={() => setIsVisible(true)}
          className="fixed top-2 left-1/2 -translate-x-1/2 z-50 bg-stone-900/90 text-white text-[11px] font-medium px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1.5 hover:bg-black transition-all duration-200 border border-stone-700/80 animate-pulse"
          aria-label="Reveal navigation bar"
        >
          <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
          <span>Swipe down to switch sections</span>
        </button>
      )}

      {/* Primary Top Navigation Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-stone-200/90 transition-transform duration-300 ease-out ${
          isVisible ? 'translate-y-0 shadow-sm' : '-translate-y-full shadow-none'
        }`}
      >
        {/* Apple-style Micro Announcement Ribbon */}
        <div className="bg-[#f5f5f7] text-stone-600 text-[11px] sm:text-xs py-1.5 px-4 text-center border-b border-stone-200/70 flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Google Verified Hub
          </span>
          <span className="text-stone-300">•</span>
          <span className="text-stone-800 font-medium">Official <strong>tahmeed.com</strong> Portal</span>
          <span className="hidden md:inline text-stone-300">•</span>
          <span className="hidden md:inline text-stone-500">Official Tour Merch, Live Bookings & Bureau Mail</span>
        </div>

        {/* Main Navbar Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-15 sm:h-16 gap-3">
            
            {/* Brand Monogram & Logo (Apple / Rockstar Minimalism) */}
            <div className="flex items-center gap-3">
              <a 
                href="#hero" 
                onClick={(e) => { e.preventDefault(); handleSectionClick('hero'); }}
                className="flex items-center gap-2.5 group"
                aria-label="Tahmeed.com Home"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-stone-900 text-white font-bold flex items-center justify-center text-sm sm:text-base tracking-wider shadow-sm group-hover:bg-black transition-colors font-mono">
                  T
                </div>
                <div className="flex flex-col">
                  <span className="text-base sm:text-xl font-extrabold tracking-tight text-stone-900 flex items-center gap-0.5 font-mono">
                    TAHMEED<span className="text-emerald-600 font-sans">.COM</span>
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-stone-400 font-medium -mt-1 tracking-widest uppercase font-sans hidden xs:inline">
                    Official Flagship
                  </span>
                </div>
              </a>
            </div>

            {/* Apple-Style Refined Search Input */}
            <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm mx-2">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  placeholder="Search merch, bookings, visuals..."
                  className="w-full bg-[#f5f5f7] hover:bg-stone-100 focus:bg-white text-stone-900 placeholder-stone-400 text-xs rounded-full pl-8 pr-12 py-1.5 border border-stone-200/80 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200 transition"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2" />
                {searchQuery ? (
                  <button 
                    onClick={() => onSearch('')} 
                    className="absolute right-3 top-1.5 text-xs text-stone-400 hover:text-stone-800 font-medium"
                  >
                    Clear
                  </button>
                ) : (
                  <span className="absolute right-2.5 top-1.5 text-[9px] text-stone-400 font-mono bg-stone-200/60 px-1.5 py-0.5 rounded">
                    ⌘K
                  </span>
                )}
              </div>
            </div>

            {/* Desktop Direct Section Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {sections.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;

                return (
                  <button
                    key={sec.id}
                    onClick={() => handleSectionClick(sec.id)}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all duration-150 font-medium ${
                      isActive
                        ? 'bg-stone-900 text-white font-semibold shadow-xs'
                        : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-stone-400'}`} />
                    <span>{sec.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Actions: Admin CMS, Auth & Cart */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              
              {/* Admin CMS Button (Strictly restricted to derrickngure39@gmail.com) */}
              {isAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-full border border-emerald-300 transition font-medium shadow-2xs"
                  title="Admin CMS (derrickngure39@gmail.com)"
                >
                  <Settings className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="hidden md:inline">Studio CMS</span>
                </button>
              )}

              {/* User Account / Sign In */}
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-stone-700 hover:text-stone-950 px-2 py-1.5 rounded-full hover:bg-stone-100 transition font-medium"
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
                className="relative inline-flex items-center gap-1.5 bg-stone-900 hover:bg-black text-white text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full shadow-xs hover:shadow-sm transition active:scale-98"
                aria-label={`Cart with ${totalCartCount} items`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline font-semibold">Bag</span>
                {totalCartCount > 0 && (
                  <span className="bg-white text-stone-900 text-[11px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center font-mono">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-stone-700 hover:text-stone-950 p-1.5 rounded-lg hover:bg-stone-100"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>
          </div>

          {/* Quick-Switch Section Strip (Visible directly below header on mobile and tablet for 1-tap switching) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 border-t border-stone-100">
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider pl-1 pr-1 hidden sm:inline">Jump to:</span>
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;

              return (
                <button
                  key={sec.id}
                  onClick={() => handleSectionClick(sec.id)}
                  className={`flex items-center gap-1 text-[11px] sm:text-xs px-2.5 py-1 rounded-full whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? 'bg-stone-900 text-white font-semibold shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900 bg-stone-100/70 hover:bg-stone-100'
                  }`}
                >
                  <Icon className={`w-3 h-3 ${isActive ? 'text-emerald-400' : 'text-stone-500'}`} />
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-stone-200 px-4 pt-3 pb-6 space-y-2 shadow-xl">
            {/* Mobile Search Input */}
            <div className="relative w-full mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search merch, bookings, visuals..."
                className="w-full bg-[#f5f5f7] text-stone-900 placeholder-stone-400 text-xs rounded-full pl-9 pr-4 py-2 border border-stone-200/80 focus:outline-none focus:border-stone-400"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
            </div>

            <div className="text-[11px] uppercase font-mono text-stone-400 font-semibold px-1 pb-1">
              Portal Sections
            </div>

            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;

              return (
                <button
                  key={sec.id}
                  onClick={() => handleSectionClick(sec.id)}
                  className={`w-full flex items-center justify-between text-left text-sm py-2.5 px-3 rounded-xl transition ${
                    isActive
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'text-stone-800 hover:bg-stone-50 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-stone-500'}`} />
                    <span>{sec.label}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-stone-300' : 'text-stone-400'}`} />
                </button>
              );
            })}

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
              {isAdmin && (
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
                  className="flex-1 inline-flex items-center justify-center gap-2 text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-2.5 rounded-full font-medium"
                >
                  <Settings className="w-3.5 h-3.5 text-emerald-700" /> Studio CMS
                </button>
              )}
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                className={`${isAdmin ? 'flex-1' : 'w-full'} inline-flex items-center justify-center gap-2 text-xs bg-stone-900 text-white px-3 py-2.5 rounded-full font-medium`}
              >
                <User className="w-3.5 h-3.5 text-stone-300" /> {user ? user.name : 'Sign In'}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to offset the fixed top navbar */}
      <div className="h-28 sm:h-26" aria-hidden="true" />
    </>
  );
};
