import React from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  CheckCircle, 
  ArrowUp,
  Mail,
  ShoppingBag,
  Calendar,
  Video,
  ExternalLink,
  Music,
  Disc,
  Lock
} from 'lucide-react';
import { UserAccount } from '../types';

interface FooterProps {
  onOpenAdmin: () => void;
  user?: UserAccount | null;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, user }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdmin = (user?.email || '').trim().toLowerCase() === 'derrickngure39@gmail.com';

  return (
    <footer className="bg-[#f5f5f7] text-[#6e6e73] text-xs border-t border-stone-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Footnote SEO Disclaimer (Apple style legal notice) */}
        <div className="pb-8 mb-8 border-b border-stone-200/80 text-[11px] leading-relaxed text-stone-500 space-y-2">
          <p>
            1. <strong>Tahmeed.com</strong> is the official registered web portal and merchandise storefront for artist Tahmeed. All merchandise items are official label pressings dispatched directly with end-to-end global tracking.
          </p>
          <p>
            2. Live performance and studio booking reservations are subject to management approval and date availability. Confirmation references and event schedules are provided immediately upon booking.
          </p>
          <p>
            3. Google Search Optimization features MusicGroup, Person, and Store Schema.org structured data, responsive mobile layout, and canonical sitemaps configured for high index ranking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-stone-900 text-white font-bold flex items-center justify-center font-mono text-sm shadow-2xs">
                T
              </div>
              <span className="font-extrabold text-[#1d1d1f] tracking-tight text-base font-mono">
                TAHMEED<span className="text-emerald-600">.COM</span>
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Official artist portal, exclusive tour merchandise storefront, live concert bookings, and verified music broadcasts.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-700 text-[11px] font-semibold pt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Google Search Index Verified Entity</span>
            </div>
          </div>

          {/* Quick Sections */}
          <div>
            <h4 className="text-[#1d1d1f] font-bold text-xs uppercase tracking-wider mb-3">
              Store & Appearances
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <a href="#store" className="hover:text-stone-950 transition flex items-center gap-1.5">
                  <ShoppingBag className="w-3 h-3 text-stone-500" /> Tour Merchandise
                </a>
              </li>
              <li>
                <a href="#bookings" className="hover:text-stone-950 transition flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-stone-500" /> Artist & Live Shows
                </a>
              </li>
              <li>
                <a href="#videos" className="hover:text-stone-950 transition flex items-center gap-1.5">
                  <Video className="w-3 h-3 text-stone-500" /> Music Videos & Visuals
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-stone-950 transition flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-stone-500" /> Artist Bureau & Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Technical & SEO Architecture */}
          <div>
            <h4 className="text-[#1d1d1f] font-bold text-xs uppercase tracking-wider mb-3">
              SEO & Architecture
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                <span>Schema.org MusicGroup & Store</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                <a href="/sitemap.xml" target="_blank" className="hover:text-stone-900 underline">
                  Dynamic sitemap.xml
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                <a href="/robots.txt" target="_blank" className="hover:text-stone-900 underline">
                  Googlebot robots.txt
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-purple-600" />
                <span>Django REST Deployment Ready</span>
              </li>
            </ul>
          </div>

          {/* Site Administration & CMS */}
          <div>
            <h4 className="text-[#1d1d1f] font-bold text-xs uppercase tracking-wider mb-3">
              Content & Drops
            </h4>
            {isAdmin ? (
              <>
                <p className="text-[11px] text-stone-500 mb-3 leading-relaxed">
                  Logged in as verified administrator ({user?.email}). You can manage inventory, upload media, and update site SEO.
                </p>
                <button
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium px-4 py-2 rounded-full border border-stone-800 transition shadow-2xs active:scale-98"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Launch Content Studio</span>
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Management controls restricted to authorized administrative email.
                </p>
                <div className="inline-flex items-center gap-1.5 text-[11px] text-stone-400 font-mono">
                  <Lock className="w-3 h-3 text-stone-400" />
                  <span>Restricted Access</span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <div>
            Copyright © {new Date().getFullYear()} tahmeed.com. All Rights Reserved. Official artist flagship.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="hover:text-stone-900 transition flex items-center gap-1"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
