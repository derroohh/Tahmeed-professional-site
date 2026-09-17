import { Product, Service, YouTubeVideoItem, SeoConfig } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    sku: 'THM-NBO-01',
    title: 'Nairobi to the World: Shujaa Tour Heavyweight Hoodie',
    description: '500 GSM heavyweight French Terry organic cotton woven with subtle Kenyan Kikoy trim accents inside the hood. Custom puff-printed Nairobi tour dates (Alchemist, Carnivore, KICC, Blankets & Wine) and Tahmeed signature embroidery.',
    price: 95.00, // ~KSh 12,350
    originalPrice: 120.00,
    category: 'apparel',
    rating: 4.9,
    reviewCount: 618,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    stockCount: 42,
    featured: true,
    badge: 'Nairobi Tour Exclusive',
  },
  {
    id: 'prod-2',
    sku: 'THM-VNL-02',
    title: '"Sauti Ya Nyumbani" Deluxe Double Vinyl (180g Savanna Red Marble)',
    description: 'Limited edition 180-gram audiophile vinyl pressed on Savanna Red & Earth marble wax. Features live Benga-Afrobeats fusion instrumentation, Swahili poetic interludes, gatefold Maasai beadwork foil embossing, and signed liner notes.',
    price: 45.00, // ~KSh 5,850
    originalPrice: 55.00,
    category: 'vinyl',
    rating: 5.0,
    reviewCount: 412,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    stockCount: 28,
    featured: true,
    badge: 'Limited 1,000 Pressing',
  },
  {
    id: 'prod-3',
    sku: 'THM-APP-03',
    title: 'Vintage "254 Sound" Graphic Washed Tour Tee',
    description: 'Custom 260 GSM single jersey combed cotton with vintage mineral wash. Features retro Nairobi skyline graphic artwork on front and full East Africa tour itinerary print on back.',
    price: 38.00, // ~KSh 4,940
    originalPrice: 48.00,
    category: 'apparel',
    rating: 4.8,
    reviewCount: 345,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    stockCount: 75,
    featured: true,
    badge: 'Best Seller • 254 Edition',
  },
  {
    id: 'prod-4',
    sku: 'THM-ART-04',
    title: '"Rhythm of the Rift" Archival Giclée Fine Art Print',
    description: 'Museum-grade 310 GSM cotton rag paper with archival pigment inks. Hand-numbered limited run of 250 celebrating the Great Rift Valley acoustic sessions, embossed with the official Tahmeed Studio Kenya seal.',
    price: 65.00, // ~KSh 8,450
    originalPrice: 85.00,
    category: 'art',
    rating: 4.9,
    reviewCount: 198,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    stockCount: 19,
    featured: false,
    badge: "Collector's Item",
  },
  {
    id: 'prod-5',
    sku: 'THM-ACC-05',
    title: 'Tahmeed Harambee Shield Embroidered Dad Cap',
    description: 'Unstructured 6-panel low profile washed cotton cap with Kenyan flag shield micro-embroidery at the temple, tonal Tahmeed cursive script upfront, and antique brass strap buckle.',
    price: 32.00, // ~KSh 4,160
    originalPrice: 40.00,
    category: 'accessories',
    rating: 4.8,
    reviewCount: 260,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    stockCount: 50,
    featured: false,
    badge: 'Staff Pick',
  },
  {
    id: 'prod-6',
    sku: 'THM-ART-06',
    title: 'Nairobi Studio Journal & Handwritten Lyrics Book (Hardcover)',
    description: '240-page clothbound hardback capturing behind-the-scenes recording sessions across Westlands, Kilimani, and Diani Beach. Includes handwritten Swahili and English lyrics, chord progressions, and tour photographs.',
    price: 55.00, // ~KSh 7,150
    originalPrice: 70.00,
    category: 'art',
    rating: 5.0,
    reviewCount: 154,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    stockCount: 35,
    featured: false,
    badge: 'Signed 1st Edition',
  }
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'srv-1',
    title: 'Blankets & Wine / Live Festival Headline Concert',
    shortDesc: 'Mainstage festival slots, mega concert headline sets across Nairobi, Mombasa, Kampala, Dar es Salaam & world stages.',
    fullDesc: 'Direct booking reservation for live concert performances, East African music festival headline sets (e.g. Blankets & Wine, Sol Fest, Koroga Festival, Diani Beach Fest) and international tour dates. Full live band rider coordination, sound check, and visual stage specs.',
    category: 'performance',
    price: 2500.00, // ~KSh 325,000
    durationMinutes: 90,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    availableDays: ['Fri', 'Sat', 'Sun'],
    popular: true,
  },
  {
    id: 'srv-2',
    title: 'Intimate Safari & Rooftop Acoustic Session (VIP)',
    shortDesc: 'Acoustic sundowner set at private Nairobi rooftops, Rift Valley retreats, or coastal villas with meet & greet.',
    fullDesc: 'Exclusive private acoustic performance featuring stripped-back acoustic arrangements of Tahmeed hits, unreleased demos, direct 1-on-1 Q&A discussion, and personalized signed merchandise gift packs.',
    category: 'vip',
    price: 750.00, // ~KSh 97,500
    durationMinutes: 60,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    popular: true,
  },
  {
    id: 'srv-3',
    title: 'Studio Vocal Feature & Gengetone / Afrobeats Co-Write',
    shortDesc: 'Vocal feature tracking, Swahili/English lyric composition, melodic hooks, and commercial music clearance.',
    fullDesc: 'Dedicated in-studio (Nairobi / Westlands or remote worldwide) tracking session with Tahmeed. Includes vocal stems, harmony arrangements, songwriting co-credit, and master clearance release documentation.',
    category: 'studio',
    price: 950.00, // ~KSh 123,500
    durationMinutes: 120,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    availableDays: ['Tue', 'Wed', 'Thu'],
  },
  {
    id: 'srv-4',
    title: 'Creative Direction & East African Visual Sound Advisory',
    shortDesc: 'Album branding, authentic East African visual aesthetics, music video treatments, and tour styling.',
    fullDesc: 'Strategic 1-on-1 advisory dissecting artist identity, authentic contemporary Kenyan aesthetic storytelling, stage design, and international rollout strategy with Tahmeed.',
    category: 'creative',
    price: 350.00, // ~KSh 45,500
    durationMinutes: 60,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    availableDays: ['Mon', 'Tue', 'Wed'],
  }
];

export const INITIAL_VIDEOS: YouTubeVideoItem[] = [
  {
    id: 'vid-1',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'Tahmeed - "Nairobi Nights" (Official Music Video)',
    description: 'Shot in vibrant 4K across the neon lights of Nairobi CBD, Upperhill skyline, and the colorful streets of Westlands. Directed by Tahmeed with choreography celebrating contemporary urban Kenya.',
    category: 'Official Music Video',
    views: '1.8M',
    publishedDate: '2 weeks ago',
    duration: '4:18',
  },
  {
    id: 'vid-2',
    youtubeId: 'L_LUpnjgPso',
    title: 'Tahmeed Live at Blankets & Wine Nairobi (Headline Set 4K)',
    description: 'Full live concert performance recorded in front of 15,000 fans in Nairobi. Features live horns, traditional nyatiti fusion, and crowd favorites.',
    category: 'Live Concert',
    views: '940K',
    publishedDate: '1 month ago',
    duration: '48:30',
  },
  {
    id: 'vid-3',
    youtubeId: '7wtfhZwyrcc',
    title: 'Kilimani to Kilifi: The Making of the East African Album',
    description: 'An intimate studio documentary following Tahmeed across East African recording studios, blending coastal Taarab influences, Benga guitar riffs, and modern Afropop soundscapes.',
    category: 'Documentary',
    views: '510K',
    publishedDate: '2 months ago',
    duration: '22:15',
  }
];

export const INITIAL_SEO: SeoConfig = {
  siteTitle: 'Tahmeed | Official Kenyan & Global Artist Flagship, Merch & Live Bookings',
  siteDescription: 'Karibu to the official artist portal of Tahmeed. Shop authentic 254 tour merch with M-Pesa & Card, stream official music videos from Nairobi to the world, and book live shows & studio sessions.',
  keywords: 'Tahmeed, Tahmeed Kenya, Kenyan artist, 254 music, Nairobi live concerts, Blankets and Wine, M-Pesa merch, Kenyan music, East Africa tour hoodie, Afro fusion',
  canonicalUrl: 'https://tahmeed.com/',
  author: 'Tahmeed',
  ogImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&h=630&q=80',
};
