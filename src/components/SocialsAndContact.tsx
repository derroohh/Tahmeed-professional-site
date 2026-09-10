import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp,
  ExternalLink,
  ShieldCheck, 
  Globe, 
  Share2, 
  Copy, 
  Check,
  Music,
  Disc,
  Headphones
} from 'lucide-react';
import { ContactSubmission } from '../types';

interface SocialsAndContactProps {
  onSubmitContact: (data: Omit<ContactSubmission, 'id' | 'createdAt'>) => Promise<boolean>;
}

export const SocialsAndContact: React.FC<SocialsAndContactProps> = ({
  onSubmitContact,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [inquiryType, setInquiryType] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [lastSubmissionRef, setLastSubmissionRef] = useState<string>('');
  const [sentDetails, setSentDetails] = useState<{ name: string; email: string; subject: string; message: string } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const socialLinks = [
    {
      name: 'Spotify',
      handle: 'Tahmeed',
      url: 'https://open.spotify.com/artist/tahmeed',
      desc: 'Official Discography, Top Tracks & Monthly Listeners',
      color: 'hover:border-emerald-400 hover:text-emerald-600',
      badge: 'Verified Artist',
    },
    {
      name: 'Apple Music',
      handle: 'Tahmeed',
      url: 'https://music.apple.com/artist/tahmeed',
      desc: 'Stream Albums, Singles & Spatial Audio Releases',
      color: 'hover:border-rose-400 hover:text-rose-600',
      badge: 'Spatial Audio',
    },
    {
      name: 'YouTube',
      handle: '@tahmeed',
      url: 'https://youtube.com/@tahmeed',
      desc: 'Official Music Videos, Live Concerts & Visualizers',
      color: 'hover:border-red-400 hover:text-red-600',
      badge: 'Verified Channel',
    },
    {
      name: 'Instagram',
      handle: '@tahmeed.official',
      url: 'https://instagram.com/tahmeed',
      desc: 'Tour Photography, Backstage & Studio Visuals',
      color: 'hover:border-pink-400 hover:text-pink-600',
      badge: 'Official',
    },
    {
      name: 'X (Twitter)',
      handle: '@tahmeed',
      url: 'https://twitter.com/tahmeed',
      desc: 'Tour Dates, Merch Drops & Live Announcements',
      color: 'hover:border-stone-400 hover:text-stone-950',
      badge: 'Active Daily',
    },
    {
      name: 'VIP Concierge / WhatsApp',
      handle: '+1 (800) 824-6333',
      url: 'https://wa.me/18008246333',
      desc: 'VIP Ticket Inquiries & Tour Merch Customer Care',
      color: 'hover:border-emerald-400 hover:text-emerald-700',
      badge: 'Instant Response',
    },
  ];

  const faqs = [
    {
      q: 'What is tahmeed.com?',
      a: 'Tahmeed.com is the official artist portal and flagship merchandise store for Tahmeed. Fans can order exclusive tour apparel, limited vinyl records, and archival prints, book live appearances, and stream verified music releases.',
    },
    {
      q: 'Are all merchandise items official and authentic?',
      a: 'Yes, 100%. Every hoodie, t-shirt, vinyl record, and art print sold on tahmeed.com is manufactured under official artist supervision with authentic label pressings and custom certificates of authenticity.',
    },
    {
      q: 'How does merchandise ordering and shipping work?',
      a: 'Orders are dispatched within 24 hours from our direct fulfillment centers. We provide international express tracked delivery (e.g. THM-US-XXXXX). We support all major credit cards, Google Pay, and Apple Pay.',
    },
    {
      q: 'How do live performance and studio bookings operate?',
      a: 'Promoters and collaborators can select a booking package (festival headline set, private VIP acoustic performance, or studio collaboration session), choose an available date, and submit requirements directly to Tahmeed\'s management.',
    },
    {
      q: 'How is tahmeed.com optimized to show up on Google search?',
      a: 'Tahmeed.com is built with verified Google SEO best practices: Schema.org structured data (MusicGroup, Person, Store, Product, VideoObject), fast mobile loading, canonical indexing, and official knowledge graph verification.',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    const fullSubject = `[${inquiryType.toUpperCase()}] ${subject || 'Artist Portal Inquiry'}`;
    const generatedRef = `MSG-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      const ok = await onSubmitContact({
        name,
        email,
        subject: fullSubject,
        message,
      });
      if (ok) {
        setSubmittedSuccess(true);
        setLastSubmissionRef(generatedRef);
        setSentDetails({
          name,
          email,
          subject: fullSubject,
          message,
        });
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('management@tahmeed.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple-Style Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200/80 mb-3 shadow-2xs">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Artist Management & Booking Bureau</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1d1d1f] tracking-tight">
            Official Channels & Bureau.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed font-normal">
            Connect directly with Tahmeed's management team for festival bookings, tour dates, press relations, order support, and brand partnerships.
          </p>
        </div>

        {/* Verified Social Platforms (Apple Clean Light Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-6 rounded-3xl bg-[#fbfbfd] border border-stone-200/80 transition-all duration-200 hover:shadow-lg flex flex-col justify-between group ${item.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-base text-stone-900 group-hover:text-stone-950 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-[10px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs font-mono text-stone-500 mb-2">{item.handle}</p>
                <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-600 group-hover:text-stone-900">
                <span>View Channel</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>

        {/* Contact Form & Office Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Executive Contact Bureau Card (Apple Light Executive Card) */}
          <div className="lg:col-span-5 bg-[#f5f5f7] text-stone-900 rounded-3xl p-7 sm:p-9 flex flex-col justify-between border border-stone-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full mb-5">
                <Globe className="w-3.5 h-3.5 text-emerald-700" />
                <span>OFFICIAL ARTIST BUREAU</span>
              </div>

              <h3 className="text-2xl font-extrabold text-stone-900 mb-2 tracking-tight">
                Tahmeed Management
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Official representation for live festival booking agents, concert promoters, media press inquiries, and tour merchandise support.
              </p>

              <div className="mt-8 space-y-4 text-xs">
                <div className="flex items-start gap-3 p-3 bg-white rounded-2xl border border-stone-200/80">
                  <Mail className="w-4 h-4 text-stone-600 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-stone-900 block">Management Email</span>
                    <a href="mailto:management@tahmeed.com" className="text-stone-600 hover:text-stone-900 font-mono text-xs">
                      management@tahmeed.com
                    </a>
                    <span className="text-stone-400 block text-[10px] mt-0.5">Booking responses within 12 hours</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="text-stone-400 hover:text-stone-800 p-1.5 rounded-lg hover:bg-stone-100 transition"
                    title="Copy email"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-2xl border border-stone-200/80">
                  <Phone className="w-4 h-4 text-stone-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-stone-900 block">Agency Hotline</span>
                    <span className="text-stone-600 font-mono">+1 (800) 824-6333 (USA / Global)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-2xl border border-stone-200/80">
                  <MapPin className="w-4 h-4 text-stone-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-stone-900 block">Registered Domain Authority</span>
                    <span className="text-stone-600 font-mono">https://tahmeed.com</span>
                    <span className="text-stone-400 block text-[10px] mt-0.5">Official Verified Artist Flagship</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Verified Representation
              </span>
              <span>Available Mon - Fri</span>
            </div>
          </div>

          {/* Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#fbfbfd] rounded-3xl p-7 sm:p-9 border border-stone-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                Send a Priority Inquiry
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Fill out the inquiry form below. Your message will be routed directly to Tahmeed's management team.
              </p>
            </div>

            {submittedSuccess && sentDetails ? (
              <div className="bg-emerald-50/90 border border-emerald-200 rounded-3xl p-7 sm:p-8 text-center my-2 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="text-xl font-bold text-stone-900">
                  Email Dispatched to Management
                </h4>
                <p className="text-xs text-stone-600 mt-1.5 max-w-md mx-auto">
                  Your inquiry has been recorded and transmitted to <strong>Tahmeed's artist management bureau</strong>. A confirmation has been routed to your address.
                </p>

                {/* Structured Dispatch Summary */}
                <div className="mt-5 p-4 bg-white/95 rounded-2xl border border-emerald-200/80 text-left text-xs space-y-2 font-mono max-w-md mx-auto">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Tracking Reference:</span>
                    <span className="font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded text-[11px]">{lastSubmissionRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Destination:</span>
                    <span className="text-stone-900 font-semibold">management@tahmeed.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Sender:</span>
                    <span className="text-stone-800 truncate max-w-[200px]">{sentDetails.name} ({sentDetails.email})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Subject:</span>
                    <span className="text-stone-800 truncate max-w-[200px]">{sentDetails.subject}</span>
                  </div>
                  <div className="flex justify-between border-t border-emerald-100 pt-2 text-[11px]">
                    <span className="text-stone-500">Dispatch Status:</span>
                    <span className="text-emerald-700 font-bold uppercase">Delivered to Queue</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  {/* Direct mailto link so user can also have an email sent in their local email client */}
                  <a
                    href={`mailto:management@tahmeed.com?subject=${encodeURIComponent(sentDetails.subject)}&body=${encodeURIComponent(`Hi Tahmeed Management,\n\nRef: ${lastSubmissionRef}\nFrom: ${sentDetails.name} <${sentDetails.email}>\n\n${sentDetails.message}\n\n--\nSent via tahmeed.com official portal`)}`}
                    className="inline-flex items-center gap-1.5 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold px-4 py-2.5 rounded-full border border-stone-300 transition shadow-2xs"
                  >
                    <Mail className="w-3.5 h-3.5 text-stone-600" />
                    <span>Open in Email App (Client Copy)</span>
                  </a>

                  <button
                    onClick={() => setSubmittedSuccess(false)}
                    className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-black text-white text-xs font-semibold px-5 py-2.5 rounded-full transition shadow-xs"
                  >
                    <span>Send Another Email</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full text-xs bg-white border border-stone-300 rounded-xl px-3.5 py-3 text-stone-900 focus:outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-200 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@organization.com"
                      className="w-full text-xs bg-white border border-stone-300 rounded-xl px-3.5 py-3 text-stone-900 focus:outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-200 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full text-xs bg-white border border-stone-300 rounded-xl px-3.5 py-3 text-stone-900 focus:outline-none focus:border-stone-900 transition"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="booking">Festival & Concert Booking</option>
                      <option value="merch">Merchandise Order Support</option>
                      <option value="press">Press, Media & Interviews</option>
                      <option value="collaboration">Studio Feature & Songwriting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Brief topic..."
                      className="w-full text-xs bg-white border border-stone-300 rounded-xl px-3.5 py-3 text-stone-900 focus:outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-200 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details regarding your booking request, order question, or project..."
                    className="w-full text-xs bg-white border border-stone-300 rounded-xl px-3.5 py-3 text-stone-900 focus:outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-200 transition resize-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-stone-900 hover:bg-black text-white text-xs font-semibold px-7 py-3.5 rounded-full shadow-xs transition active:scale-98 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Dispatching Message...' : 'Submit Inquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Structured FAQ Section (Google Rich Snippets SEO) */}
        <div className="max-w-4xl mx-auto pt-8 border-t border-stone-200">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              Frequently Answered Questions
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Verified answers regarding official merchandise, live bookings, and release updates.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="bg-[#fbfbfd] rounded-2xl border border-stone-200/80 overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between text-xs sm:text-sm font-bold text-stone-900 hover:bg-stone-50 transition"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-stone-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
