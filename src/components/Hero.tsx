import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Globe2, 
  Disc, 
  TrendingUp,
  Award,
  Music,
  ShoppingBag,
  Calendar,
  Video,
  ChevronRight,
  Play,
  Mic2,
  Heart
} from 'lucide-react';

interface HeroProps {
  onExploreStore: () => void;
  onExploreBookings: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreStore, onExploreBookings }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-[#fbfbfd] text-stone-900 pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-stone-200/80">
      {/* Subtle Kenyan flag tricolor accent line at the absolute top */}
      <div className="absolute top-0 left-0 right-0 h-1.5 flex z-30">
        <div className="flex-1 bg-stone-900"></div>
        <div className="flex-1 bg-red-600"></div>
        <div className="flex-1 bg-emerald-600"></div>
      </div>

      {/* Ambient subtle architectural mesh */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-60"></div>
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-amber-100/30 via-emerald-100/20 to-transparent blur-3xl pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          
          {/* Verified Official Domain & Kenya 254 Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-xs text-xs text-stone-700 mb-6 sm:mb-8">
            <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              🇰🇪 Nairobi • 254 Sound
            </span>
            <span className="text-stone-300">|</span>
            <span className="font-mono text-stone-900 font-bold">tahmeed.com</span>
            <span className="text-stone-300 hidden sm:inline">|</span>
            <span className="text-stone-600 hidden sm:flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Official Artist Portal & Verified Store
            </span>
          </div>

          {/* Primary Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#1d1d1f] leading-[1.06] mb-6">
            Nairobi to the World. <br className="hidden sm:inline" />
            <span className="text-emerald-700">Official Drops.</span>{' '}
            <span className="text-stone-400 font-light">Live Sets.</span>
          </h1>

          {/* Subheading featuring Karibu greeting */}
          <p className="text-base sm:text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto font-normal">
            <strong className="text-stone-900 font-semibold">Karibu sana.</strong> The official digital flagship of Kenyan & international recording artist <strong>Tahmeed</strong>. Explore limited 254 tour merch with M-Pesa & Card, book festival headlines, and stream official music videos.
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <button
              onClick={onExploreStore}
              className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-black text-white font-semibold px-7 py-3.5 rounded-full transition-all shadow-sm hover:shadow-md text-sm active:scale-98"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              <span>Shop Tour Merch (KSh / $)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreBookings}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-50 text-stone-900 font-medium px-6 py-3.5 rounded-full border border-stone-300 transition-all text-sm shadow-2xs active:scale-98"
            >
              <Mic2 className="w-4 h-4 text-emerald-600" />
              <span>Book Festivals & Shows</span>
            </button>

            <button
              onClick={() => scrollToSection('videos')}
              className="inline-flex items-center justify-center gap-2 text-stone-700 hover:text-stone-950 font-medium px-4 py-3.5 rounded-full transition text-sm"
            >
              <Play className="w-3.5 h-3.5 fill-stone-700 text-stone-700" />
              <span>Watch "Nairobi Nights" (4K)</span>
            </button>
          </div>

          {/* Quick Kenyan Payment & Delivery Assurance banner */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-stone-500 font-medium">
            <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50/80 px-2.5 py-1 rounded-md border border-emerald-100">
              <span className="font-bold text-emerald-600">✓</span> Lipa na M-Pesa & Card
            </span>
            <span className="flex items-center gap-1.5 text-stone-600 bg-stone-100/80 px-2.5 py-1 rounded-md">
              <span>🇰🇪</span> Doorstep Delivery across Kenya & Worldwide
            </span>
          </div>

        </div>

        {/* 4-Column Feature Showcase Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          
          {/* Card 1: Storefront */}
          <div 
            onClick={onExploreStore}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/90 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-semibold block mb-1">
                254 Tour Drops
              </span>
              <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                Artist Merch Store
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Nairobi Shujaa hoodies, Savanna Red vinyl pressings, vintage tour tees, and signed art journals with M-Pesa.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-700 group-hover:text-emerald-700">
              <span>Shop Collection (KSh)</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Bookings */}
          <div 
            onClick={onExploreBookings}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/90 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-blue-700 font-semibold block mb-1">
                East Africa & Global
              </span>
              <h3 className="text-base font-bold text-stone-900 group-hover:text-blue-700 transition-colors">
                Concert Bookings
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Blankets & Wine festival headline sets, Rift Valley sundowner VIP acoustic shows, and Gengetone studio features.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-700 group-hover:text-blue-700">
              <span>Reserve Dates</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Media Hub */}
          <div 
            onClick={() => scrollToSection('videos')}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/90 shadow-xs hover:shadow-lg hover:border-red-300 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-4 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <Video className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-rose-700 font-semibold block mb-1">
                Visuals & Sound
              </span>
              <h3 className="text-base font-bold text-stone-900 group-hover:text-rose-700 transition-colors">
                Music & Videos
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Watch the official "Nairobi Nights" video, live concert sets from Kenya, and behind-the-scenes studio sessions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-700 group-hover:text-rose-700">
              <span>Stream Visuals</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Network & Concierge */}
          <div 
            onClick={() => scrollToSection('contact')}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/90 shadow-xs hover:shadow-lg hover:border-purple-300 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Disc className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-purple-700 font-semibold block mb-1">
                Nairobi Management
              </span>
              <h3 className="text-base font-bold text-stone-900 group-hover:text-purple-700 transition-colors">
                Artist Bureau
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Direct booking agency, press & media inquiries, brand partnerships, and WhatsApp concierge for VIP fans.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-700 group-hover:text-purple-700">
              <span>Contact Bureau</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

        {/* Refined Trust & Search Optimization Metrics Bar */}
        <div className="pt-8 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-stone-600 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-stone-900">#1 Kenyan Artist Flagship</p>
              <p className="text-[11px] text-stone-500">Google Verified Entity</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
              M-P
            </div>
            <div>
              <p className="font-bold text-stone-900">M-Pesa & Card Ready</p>
              <p className="text-[11px] text-stone-500">Lipa na M-Pesa Buy Goods</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Globe2 className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-stone-900">East Africa & Global Dispatch</p>
              <p className="text-[11px] text-stone-500">Fargo Courier / DHL Express</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Music className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-stone-900">East Africa Tour & Studio</p>
              <p className="text-[11px] text-stone-500">Nairobi Booking Bureau</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
