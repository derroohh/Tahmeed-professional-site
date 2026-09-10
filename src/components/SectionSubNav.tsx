import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Calendar, 
  Video, 
  Mail, 
  Sparkles,
  ArrowRight,
  Compass
} from 'lucide-react';

interface SectionSubNavProps {
  productCount?: number;
  serviceCount?: number;
  videoCount?: number;
  onNavigateToSection?: (sectionId: string) => void;
}

export const SectionSubNav: React.FC<SectionSubNavProps> = ({
  productCount = 6,
  serviceCount = 4,
  videoCount = 4,
  onNavigateToSection,
}) => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  const sections = [
    { id: 'hero', label: 'Overview', icon: Compass, badge: null },
    { id: 'store', label: 'Tour Merch', icon: ShoppingBag, badge: `${productCount} Items` },
    { id: 'bookings', label: 'Live & Bookings', icon: Calendar, badge: `${serviceCount} Services` },
    { id: 'videos', label: 'Music & Videos', icon: Video, badge: `${videoCount} Videos` },
    { id: 'contact', label: 'Management & Contact', icon: Mail, badge: null },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      const sectionElements = sections.map((s) => ({
        id: s.id,
        el: document.getElementById(s.id),
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el) {
          const top = item.el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    if (onNavigateToSection) {
      onNavigateToSection(id);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      aria-label="Section sub-navigation"
      className="sticky top-16 z-30 bg-white/90 backdrop-blur-xl border-b border-stone-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-13 gap-4">
          
          {/* Section Breadcrumb / Brand Identifier (Apple Style) */}
          <div className="hidden md:flex items-center gap-2 text-xs font-medium text-stone-500 whitespace-nowrap">
            <span className="font-semibold text-stone-900 font-mono tracking-wider">TAHMEED</span>
            <span className="text-stone-300">/</span>
            <span className="text-stone-700 capitalize">
              {sections.find((s) => s.id === activeSection)?.label || 'Portal'}
            </span>
          </div>

          {/* Segmented Navigation Pills (Apple & Rockstar Style) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 w-full md:w-auto">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;

              return (
                <button
                  key={sec.id}
                  onClick={() => handleScrollTo(sec.id)}
                  className={`relative flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-stone-400'}`} />
                  <span>{sec.label}</span>
                  {sec.badge && (
                    <span 
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive 
                          ? 'bg-stone-800 text-stone-200' 
                          : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {sec.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Action Button (Apple Style Top Right Action) */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => handleScrollTo(activeSection === 'store' ? 'bookings' : 'store')}
              className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 px-3 py-1.5 rounded-full transition shadow-2xs whitespace-nowrap"
            >
              <span>{activeSection === 'store' ? 'Book Artist' : 'Shop Merch'}</span>
              <ArrowRight className="w-3 h-3 text-emerald-600" />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};
