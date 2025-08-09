"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SideNavigation } from "@/components/ui/side-navigation";
import { MinimalHeader } from "@/components/ui/minimal-header";
import {
  Star,
  ShoppingCart,
  Heart,
  Crown,
  Award,
  Diamond,
  Shield,
  Truck,
  RefreshCw,
  Gift,
  Eye,
  Share2,
  ExternalLink,
  Verified,
  Sparkles,
  Medal,
  Filter,
  SortAsc,
  TrendingUp,
  Flame,
  Zap,
  Plus,
  Search,
  Grid3X3,
  List,
  User,
  Store,
  ChevronRight,
  Clock,
  MapPin,
  Package,
  Gem,
  Home
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PremiumListing {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  type: 'product' | 'service';
  vendor: {
    id: string;
    name: string;
    logo: string;
    verified: boolean;
    premiumSeller: boolean;
    rating: number;
    location: string;
  };
  rating: number;
  reviewCount: number;
  premiumFeatures: string[];
  luxuryRating: number;
  handcrafted?: boolean;
  limitedEdition?: boolean;
  exclusiveDesign?: boolean;
  premiumMaterials?: string[];
  certifications?: string[];
  warranty: string;
  views: number;
  soldCount: number;
  tags: string[];
  stockLevel?: number;
  trending?: boolean;
  flashSale?: boolean;
  saleEndTime?: Date;
  featured?: boolean;
  royal?: boolean;
}

const premiumListings: PremiumListing[] = [
  // Royal Recommendations - Jewelry & Accessories
  {
    id: "rl001",
    name: "Royal Malachite Crown Collection",
    description: "Exquisite handcrafted crown featuring authentic Zambian malachite stones with 24k gold inlay",
    price: 2999.99,
    originalPrice: 4499.99,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80"
    ],
    category: "Royal Jewelry",
    type: "product",
    vendor: {
      id: "v001",
      name: "Royal Zambian Artisans",
      logo: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&q=80",
      verified: true,
      premiumSeller: true,
      rating: 4.9,
      location: "Lusaka, Zambia"
    },
    rating: 5.0,
    reviewCount: 89,
    premiumFeatures: ["Authentic Malachite", "24k Gold Inlay", "Royal Heritage", "Certificate"],
    luxuryRating: 5,
    handcrafted: true,
    limitedEdition: true,
    exclusiveDesign: true,
    premiumMaterials: ["Zambian Malachite", "24k Gold", "Sterling Silver"],
    certifications: ["Royal Heritage Certificate", "Artisan Crafted"],
    warranty: "Lifetime Royal Guarantee",
    views: 8450,
    soldCount: 12,
    tags: ["luxury", "royal", "malachite", "crown", "premium"],
    stockLevel: 3,
    trending: true,
    featured: true,
    royal: true
  },
  {
    id: "rl001b",
    name: "Emerald Dynasty Necklace Set",
    description: "Rare Zambian emerald necklace with matching earrings, crafted by master jewelers",
    price: 5999.99,
    originalPrice: 8999.99,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80"
    ],
    category: "Royal Jewelry",
    type: "product",
    vendor: {
      id: "v001",
      name: "Royal Zambian Artisans",
      logo: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&q=80",
      verified: true,
      premiumSeller: true,
      rating: 4.9,
      location: "Lusaka, Zambia"
    },
    rating: 4.9,
    reviewCount: 156,
    premiumFeatures: ["Rare Emeralds", "Handcrafted", "Royal Collection", "Certified Authentic"],
    luxuryRating: 5,
    handcrafted: true,
    limitedEdition: true,
    exclusiveDesign: true,
    premiumMaterials: ["Zambian Emerald", "18k White Gold", "Platinum"],
    certifications: ["GIA Certified", "Royal Heritage Certificate"],
    warranty: "Lifetime Guarantee",
    views: 12340,
    soldCount: 8,
    tags: ["emerald", "royal", "necklace", "luxury", "premium"],
    stockLevel: 2,
    trending: true,
    featured: true,
    royal: true
  },
  // Premium Services
  {
    id: "rl002",
    name: "Imperial Concierge Service",
    description: "24/7 personal concierge service for luxury lifestyle management and exclusive experiences",
    price: 1999.99,
    images: [
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80"
    ],
    category: "Luxury Services",
    type: "service",
    vendor: {
      id: "v002",
      name: "Elite Lifestyle Partners",
      logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&q=80",
      verified: true,
      premiumSeller: true,
      rating: 4.8,
      location: "Lusaka, Zambia"
    },
    rating: 4.9,
    reviewCount: 156,
    premiumFeatures: ["24/7 Availability", "Personal Assistant", "VIP Access", "Luxury Bookings"],
    luxuryRating: 5,
    exclusiveDesign: true,
    certifications: ["Premium Service Certified", "Elite Partner Verified"],
    warranty: "Satisfaction Guarantee",
    views: 12340,
    soldCount: 89,
    tags: ["service", "concierge", "luxury", "vip", "premium"],
    trending: true,
    featured: true,
    royal: true
  },
  {
    id: "rl002b",
    name: "Private Jet Charter Service",
    description: "Exclusive private jet charter with luxury amenities and personalized flight experiences",
    price: 12999.99,
    images: [
      "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&q=80",
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80"
    ],
    category: "Luxury Services",
    type: "service",
    vendor: {
      id: "v002b",
      name: "Elite Aviation Zambia",
      logo: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=100&q=80",
      verified: true,
      premiumSeller: true,
      rating: 5.0,
      location: "Lusaka International Airport"
    },
    rating: 5.0,
    reviewCount: 67,
    premiumFeatures: ["Private Fleet", "Luxury Amenities", "Personal Crew", "Global Access"],
    luxuryRating: 5,
    exclusiveDesign: true,
    certifications: ["IATA Certified", "Premium Aviation License"],
    warranty: "Flight Safety Guarantee",
    views: 5670,
    soldCount: 23,
    tags: ["aviation", "private-jet", "luxury", "travel", "premium"],
    trending: true,
    featured: true,
    royal: true
  },
  // Art & Collectibles
  {
    id: "rl003",
    name: "Sovereign Wood Sculpture Collection",
    description: "Masterfully carved sculptures using rare Zambian hardwoods by master craftsmen",
    price: 799.99,
    originalPrice: 1199.99,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
      "https://images.unsplash.com/photo-1580669337089-59ade28c4115?w=600&q=80"
    ],
    category: "Art & Collectibles",
    type: "product",
    vendor: {
      id: "v003",
      name: "Sovereign Craftsmen Guild",
      logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&q=80",
      verified: true,
      premiumSeller: true,
      rating: 4.7,
      location: "Livingstone, Zambia"
    },
    rating: 4.8,
    reviewCount: 234,
    premiumFeatures: ["Master Crafted", "Rare Wood", "Unique Design", "Heritage Art"],
    luxuryRating: 4,
    handcrafted: true,
    exclusiveDesign: true,
    premiumMaterials: ["Rare Mahogany", "Royal Teak", "Natural Oils"],
    certifications: ["Master Artisan Certified", "Heritage Guild Approved"],
    warranty: "24 Month Craftsmanship Warranty",
    views: 6780,
    soldCount: 67,
    tags: ["art", "wood", "sculpture", "handcrafted", "premium"],
    stockLevel: 15,
    trending: true,
    flashSale: true
  },
  {
    id: "rl003b",
    name: "Contemporary African Art Collection",
    description: "Limited edition paintings by renowned Zambian contemporary artists",
    price: 2499.99,
    originalPrice: 3499.99,
    images: [
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80"
    ],
    category: "Art & Collectibles",
    type: "product",
    vendor: {
      id: "v003b",
      name: "Lusaka Contemporary Gallery",
      logo: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=100&q=80",
      verified: true,
      premiumSeller: true,
      rating: 4.9,
      location: "Lusaka, Zambia"
    },
    rating: 4.8,
    reviewCount: 127,
    premiumFeatures: ["Limited Edition", "Artist Signed", "Certificate of Authenticity", "Gallery Curated"],
    luxuryRating: 4,
    handcrafted: true,
    limitedEdition: true,
    exclusiveDesign: true,
    premiumMaterials: ["Canvas", "Oil Paint", "Gold Leaf"],
    certifications: ["Gallery Authentication", "Artist Certificate"],
    warranty: "Lifetime Authenticity Guarantee",
    views: 4320,
    soldCount: 18,
    tags: ["art", "painting", "contemporary", "african", "premium"],
    stockLevel: 5,
    trending: true,
    flashSale: true
  },
  {
    id: "rl004",
    name: "Premium Interior Design Consultation",
    description: "Luxury home and office design consultation with 3D visualization and premium material selection",
    price: 1299.99,
    originalPrice: 1899.99,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
    ],
    category: "Design Services",
    type: "service",
    vendor: {
      id: "v004",
      name: "Luxury Design Studio",
      logo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&q=80",
      verified: true,
      premiumSeller: true,
      rating: 4.9,
      location: "Lusaka, Zambia"
    },
    rating: 4.7,
    reviewCount: 178,
    premiumFeatures: ["3D Visualization", "Premium Materials", "Expert Design", "Project Management"],
    luxuryRating: 4,
    certifications: ["Certified Interior Designer", "Premium Service Provider"],
    warranty: "Design Satisfaction Guarantee",
    views: 2890,
    soldCount: 45,
    tags: ["design", "interior", "luxury", "consultation", "premium"],
    trending: true,
    flashSale: true
  },

  // Luxury Electronics
  {
    id: "rl005",
    name: "Diamond-Encrusted Smart Watch",
    description: "Limited edition smartwatch with genuine diamonds and 24k gold casing",
    price: 15999.99,
    originalPrice: 22999.99,
    images: [
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"
    ],
    category: "Luxury Electronics",
    type: "product",
    vendor: {
      id: "v005",
      name: "Prestige Tech Zambia",
      logo: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=100&q=80",
      verified: true,
      premiumSeller: true,
      rating: 4.8,
      location: "Lusaka, Zambia"
    },
    rating: 4.9,
    reviewCount: 89,
    premiumFeatures: ["Diamond Encrusted", "24k Gold", "Swiss Movement", "Smart Features"],
    luxuryRating: 5,
    handcrafted: true,
    limitedEdition: true,
    exclusiveDesign: true,
    premiumMaterials: ["Genuine Diamonds", "24k Gold", "Sapphire Crystal"],
    certifications: ["Swiss Made", "Diamond Certification"],
    warranty: "5 Year Premium Warranty",
    views: 9876,
    soldCount: 12,
    tags: ["smartwatch", "luxury", "diamonds", "gold", "premium"],
    stockLevel: 3,
    trending: true,
    flashSale: true
  },

  // Luxury Fashion
  {
    id: "rl006",
    name: "Bespoke Luxury Suit Collection",
    description: "Hand-tailored suits using premium Italian fabrics with personalized fitting",
    price: 3999.99,
    originalPrice: 5499.99,
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80"
    ],
    category: "Luxury Fashion",
    type: "product",
    vendor: {
      id: "v006",
      name: "Savile Row Zambia",
      logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      verified: true,
      premiumSeller: true,
      rating: 4.9,
      location: "Lusaka, Zambia"
    },
    rating: 4.8,
    reviewCount: 156,
    premiumFeatures: ["Bespoke Tailoring", "Italian Fabrics", "Personal Fitting", "Custom Design"],
    luxuryRating: 5,
    handcrafted: true,
    exclusiveDesign: true,
    premiumMaterials: ["Italian Wool", "Silk Lining", "Mother of Pearl Buttons"],
    certifications: ["Master Tailor Certified", "Italian Fabric Authentic"],
    warranty: "Lifetime Fit Guarantee",
    views: 7654,
    soldCount: 34,
    tags: ["suits", "bespoke", "luxury", "fashion", "premium"],
    stockLevel: 10,
    trending: true,
    flashSale: true
  },

  // Premium Real Estate Services
  {
    id: "rl007",
    name: "Luxury Property Investment Consultation",
    description: "Expert consultation for high-end real estate investments and portfolio management",
    price: 2999.99,
    images: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80"
    ],
    category: "Real Estate Services",
    type: "service",
    vendor: {
      id: "v007",
      name: "Elite Property Advisors",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&q=80",
      verified: true,
      premiumSeller: true,
      rating: 4.9,
      location: "Lusaka, Zambia"
    },
    rating: 4.8,
    reviewCount: 203,
    premiumFeatures: ["Expert Analysis", "Market Insights", "Investment Strategy", "Portfolio Management"],
    luxuryRating: 4,
    certifications: ["Real Estate License", "Investment Advisor Certified"],
    warranty: "Results Guarantee",
    views: 4567,
    soldCount: 78,
    tags: ["real-estate", "investment", "luxury", "consultation", "premium"],
    trending: true
  },

  // Luxury Automotive
  {
    id: "rl008",
    name: "Custom Luxury Vehicle Detailing",
    description: "Premium automotive detailing service for luxury and exotic vehicles",
    price: 899.99,
    originalPrice: 1299.99,
    images: [
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80"
    ],
    category: "Automotive Services",
    type: "service",
    vendor: {
      id: "v008",
      name: "Premium Auto Care",
      logo: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=100&q=80",
      verified: true,
      premiumSeller: true,
      rating: 4.7,
      location: "Lusaka, Zambia"
    },
    rating: 4.8,
    reviewCount: 267,
    premiumFeatures: ["Paint Protection", "Interior Detailing", "Ceramic Coating", "Mobile Service"],
    luxuryRating: 4,
    certifications: ["Professional Detailer Certified", "Premium Service Provider"],
    warranty: "6 Month Protection Guarantee",
    views: 5432,
    soldCount: 123,
    tags: ["automotive", "detailing", "luxury", "service", "premium"],
    trending: true,
    flashSale: true
  },

  // Fine Dining & Culinary
  {
    id: "rl009",
    name: "Private Chef Fine Dining Experience",
    description: "Michelin-trained chef creates bespoke dining experiences in your home",
    price: 1599.99,
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&q=80"
    ],
    category: "Culinary Services",
    type: "service",
    vendor: {
      id: "v009",
      name: "Elite Culinary Experiences",
      logo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=100&q=80",
      verified: true,
      premiumSeller: true,
      rating: 5.0,
      location: "Lusaka, Zambia"
    },
    rating: 4.9,
    reviewCount: 98,
    premiumFeatures: ["Michelin Training", "Bespoke Menu", "Premium Ingredients", "Table Service"],
    luxuryRating: 5,
    exclusiveDesign: true,
    certifications: ["Michelin Trained", "Culinary Arts Certified"],
    warranty: "Satisfaction Guarantee",
    views: 3210,
    soldCount: 56,
    tags: ["dining", "chef", "luxury", "culinary", "premium"],
    trending: true
  },

  // Wellness & Spa
  {
    id: "rl010",
    name: "Luxury Spa Retreat Package",
    description: "Exclusive wellness retreat with premium treatments and personalized therapy",
    price: 2499.99,
    originalPrice: 3499.99,
    images: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80"
    ],
    category: "Wellness Services",
    type: "service",
    vendor: {
      id: "v010",
      name: "Serenity Luxury Spa",
      logo: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=100&q=80",
      verified: true,
      premiumSeller: true,
      rating: 4.8,
      location: "Livingstone, Zambia"
    },
    rating: 4.9,
    reviewCount: 189,
    premiumFeatures: ["Luxury Treatments", "Personal Therapist", "Organic Products", "Wellness Program"],
    luxuryRating: 5,
    certifications: ["International Spa Association", "Wellness Certified"],
    warranty: "Relaxation Guarantee",
    views: 6789,
    soldCount: 67,
    tags: ["spa", "wellness", "luxury", "retreat", "premium"],
    trending: true,
    flashSale: true
  }
];

export default function PremiumListingsPage() {
  const [sortBy, setSortBy] = useState<'featured' | 'price' | 'rating' | 'newest'>('featured');
  const [filterBy, setFilterBy] = useState<'all' | 'products' | 'services' | 'royal' | 'trending'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Premium loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Dark mode detection
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Enhanced filter and sort listings
  const filteredListings = premiumListings
    .filter(listing => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = listing.name.toLowerCase().includes(query);
        const matchesDescription = listing.description.toLowerCase().includes(query);
        const matchesCategory = listing.category.toLowerCase().includes(query);
        const matchesVendor = listing.vendor.name.toLowerCase().includes(query);
        const matchesTags = listing.tags.some(tag => tag.toLowerCase().includes(query));
        const matchesFeatures = listing.premiumFeatures.some(feature => feature.toLowerCase().includes(query));

        if (!(matchesName || matchesDescription || matchesCategory || matchesVendor || matchesTags || matchesFeatures)) {
          return false;
        }
      }

      // Category filter
      switch (filterBy) {
        case 'products':
          return listing.type === 'product';
        case 'services':
          return listing.type === 'service';
        case 'royal':
          return listing.royal;
        case 'trending':
          return listing.trending;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          // Prioritize royal > featured > trending
          const aScore = (a.royal ? 3 : 0) + (a.featured ? 2 : 0) + (a.trending ? 1 : 0);
          const bScore = (b.royal ? 3 : 0) + (b.featured ? 2 : 0) + (b.trending ? 1 : 0);
          return bScore - aScore;
        case 'price':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating || b.reviewCount - a.reviewCount;
        case 'newest':
          return b.views - a.views;
        default:
          return 0;
      }
    });

  // Organize content sections
  const royalRecommendations = filteredListings.filter(item => item.royal && item.featured);
  const trendingDeals = filteredListings.filter(item => item.trending && item.flashSale);
  const remainingListings = filteredListings.filter(item => 
    !royalRecommendations.includes(item) && !trendingDeals.includes(item)
  );

  // Premium Loading Screen
  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
        isDarkMode ? 'premium-bg-dark' : 'premium-bg-light'
      }`}>
        <div className={`absolute inset-0 ${
          isDarkMode ? 'premium-overlay-dark' : 'premium-overlay-light'
        }`}></div>
        
        {/* Loading Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full animate-premium-float ${
                isDarkMode ? 'bg-yellow-400/40' : 'bg-blue-400/40'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        
        <div className="text-center space-y-8 z-10">
          <div className="relative">
            <div className={`w-32 h-32 border-3 rounded-full animate-spin shadow-2xl ${
              isDarkMode 
                ? 'border-yellow-400/20 border-t-yellow-400 bg-gradient-to-br from-yellow-400/5 to-amber-500/5' 
                : 'border-blue-400/20 border-t-blue-500 bg-gradient-to-br from-blue-400/5 to-sapphire-500/5'
            }`}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Crown className={`h-12 w-12 crown-glow animate-pulse drop-shadow-lg`} />
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold logo-3d-premium font-serif">Premium Listings</h1>
            <p className={`text-xl font-medium ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>Curated Excellence Loading...</p>
            <div className="flex items-center justify-center gap-2">
              <Diamond className={`h-4 w-4 animate-pulse ${isDarkMode ? 'text-yellow-400/60' : 'text-blue-400/60'}`} />
              <Sparkles className={`h-4 w-4 animate-pulse ${isDarkMode ? 'text-emerald-400/60' : 'text-gold-400/60'}`} style={{animationDelay: '0.5s'}} />
              <Crown className={`h-4 w-4 animate-pulse ${isDarkMode ? 'text-yellow-400/60' : 'text-blue-400/60'}`} style={{animationDelay: '1s'}} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative overflow-hidden lg:flex ${
      isDarkMode ? 'premium-bg-dark' : 'premium-bg-light'
    }`}>
      {/* Royal Side Navigation */}
      <div className="lg:w-64 lg:flex-shrink-0">
        <SideNavigation variant="premium" />
      </div>

      {/* Main Content Area */}
      <div className="lg:flex-1 lg:pl-0 lg:min-w-0">
        <MinimalHeader variant="premium" showSearch={true} />
        
        {/* Premium Background Effects */}
        <div className={`absolute inset-0 ${
          isDarkMode ? 'premium-overlay-dark' : 'premium-overlay-light'
        } pointer-events-none`}></div>
        
        {/* Floating Premium Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className={`absolute w-1 h-1 rounded-full animate-premium-float ${
                isDarkMode ? 'bg-yellow-400/30' : 'bg-blue-400/30'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 8}s`
              }}
            />
          ))}
        </div>

        {/* Modern Premium Header */}
        <div className={`relative z-10 backdrop-blur-xl border-b ${
          isDarkMode
            ? 'border-yellow-400/20 bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-slate-900/95'
            : 'border-blue-400/20 bg-gradient-to-r from-white/95 via-blue-50/80 to-white/95'
        } shadow-xl`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 xl:px-8">
            {/* Premium Header Title */}
            <div className="py-6 text-center border-b border-current/10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-yellow-400/20 to-amber-500/20 border border-yellow-400/30'
                    : 'bg-gradient-to-br from-blue-400/20 to-blue-600/20 border border-blue-400/30'
                }`}>
                  <Crown className="h-6 w-6 crown-glow" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold logo-3d-premium font-serif">
                    Premium Listings
                  </h1>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    Curated Excellence • {filteredListings.length} Items
                  </p>
                </div>
              </div>
            </div>

            {/* Advanced Filters & Search */}
            <div className="py-4 space-y-4">
              {/* Search Bar */}
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`} />
                  <input
                    type="text"
                    placeholder="Search premium products and services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                      isDarkMode
                        ? 'bg-slate-800/50 border-yellow-400/20 text-white placeholder-slate-400 focus:border-yellow-400/40 focus:bg-slate-800/70'
                        : 'bg-white/70 border-blue-400/20 text-slate-900 placeholder-slate-500 focus:border-blue-400/40 focus:bg-white/90'
                    } focus:ring-4 focus:ring-current/10`}
                  />
                </div>
              </div>

              {/* Filter Pills & Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="text-sm font-medium">Categories:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: 'all', label: 'All Categories', icon: null },
                      { key: 'royal', label: 'Royal Collection', icon: Crown },
                      { key: 'trending', label: 'Trending Now', icon: TrendingUp },
                      { key: 'products', label: 'Products', icon: Package },
                      { key: 'services', label: 'Services', icon: User }
                    ].map((filter) => (
                      <Button
                        key={filter.key}
                        variant={filterBy === filter.key ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterBy(filter.key as any)}
                        className={`transition-all duration-300 hover:scale-105 ${
                          filterBy === filter.key
                            ? `btn-premium shadow-lg`
                            : isDarkMode
                              ? 'bg-slate-800/30 text-slate-300 border-slate-600/50 hover:bg-slate-700/50'
                              : 'bg-white/50 text-slate-700 border-slate-300/50 hover:bg-white/80'
                        }`}
                      >
                        {filter.icon && <filter.icon className="h-3 w-3 mr-2" />}
                        {filter.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <SortAsc className="h-4 w-4" />
                    <span className="text-sm font-medium">Sort:</span>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-current/10 ${
                      isDarkMode
                        ? 'bg-slate-800/50 border-yellow-400/20 text-white focus:border-yellow-400/40'
                        : 'bg-white/70 border-blue-400/20 text-slate-900 focus:border-blue-400/40'
                    }`}
                  >
                    <option value="featured">✨ Featured First</option>
                    <option value="rating">⭐ Highest Rated</option>
                    <option value="price">💎 Price High-Low</option>
                    <option value="newest">🆕 Newest Arrivals</option>
                  </select>

                  <div className={`flex border-2 rounded-xl overflow-hidden ${
                    isDarkMode ? 'border-yellow-400/20' : 'border-blue-400/20'
                  }`}>
                    <Button
                      variant={viewMode === 'grid' ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={`rounded-none border-0 ${
                        viewMode === 'grid'
                          ? 'btn-premium'
                          : isDarkMode
                            ? 'text-slate-300 hover:bg-slate-700/50'
                            : 'text-slate-600 hover:bg-blue-50'
                      }`}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={`rounded-none border-0 ${
                        viewMode === 'list'
                          ? 'btn-premium'
                          : isDarkMode
                            ? 'text-slate-300 hover:bg-slate-700/50'
                            : 'text-slate-600 hover:bg-blue-50'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 xl:px-8 py-8 lg:py-12 space-y-12 lg:space-y-16">
          {/* Royal Recommendations */}
          {royalRecommendations.length > 0 && (
            <section className="space-y-8">
              <div className="relative">
                {/* Background decoration */}
                <div className={`absolute inset-0 rounded-3xl ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-yellow-400/5 via-transparent to-amber-500/5'
                    : 'bg-gradient-to-br from-blue-400/5 via-transparent to-blue-600/5'
                } blur-3xl`}></div>

                <div className="relative text-center py-8">
                  <div className={`inline-flex items-center gap-3 rounded-full px-8 py-4 mb-6 border-2 backdrop-blur-sm ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-slate-800/60 to-slate-700/40 border-yellow-400/30 shadow-xl shadow-yellow-400/10'
                      : 'bg-gradient-to-r from-white/80 to-blue-50/60 border-blue-400/30 shadow-xl shadow-blue-400/10'
                  }`}>
                    <Crown className="h-6 w-6 crown-glow" />
                    <span className="text-sm font-semibold uppercase tracking-wider">Royal Collection</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold logo-3d-premium font-serif mb-6">
                    Royal Recommendations
                  </h2>
                  <div className={`w-24 h-1 mx-auto mb-6 rounded-full ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-500'
                      : 'bg-gradient-to-r from-blue-400 to-blue-600'
                  }`}></div>
                  <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    Handpicked selections of the finest premium products and services, curated for discerning customers
                  </p>
                  <div className="flex items-center justify-center gap-6 mt-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Diamond className={`h-4 w-4 ${isDarkMode ? 'text-yellow-400' : 'text-blue-500'}`} />
                      <span>Authenticated</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className={`h-4 w-4 ${isDarkMode ? 'text-yellow-400' : 'text-blue-500'}`} />
                      <span>Verified Quality</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className={`h-4 w-4 ${isDarkMode ? 'text-yellow-400' : 'text-blue-500'}`} />
                      <span>Premium Guarantee</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`premium-grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1 max-w-4xl mx-auto'
              }`}>
                {royalRecommendations.map((listing, index) => (
                  <PremiumListingCard 
                    key={listing.id} 
                    listing={listing} 
                    viewMode={viewMode}
                    isDarkMode={isDarkMode}
                    animationDelay={index * 100}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Trending Premium Deals */}
          {trendingDeals.length > 0 && (
            <section className="space-y-8">
              <div className="relative">
                {/* Animated background */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-400/5 via-transparent to-teal-500/5 blur-3xl"></div>

                <div className="relative text-center py-8">
                  <div className={`inline-flex items-center gap-3 rounded-full px-8 py-4 mb-6 border-2 backdrop-blur-sm animate-pulse ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-slate-800/60 to-emerald-900/40 border-emerald-400/40 shadow-xl shadow-emerald-400/20'
                      : 'bg-gradient-to-r from-white/80 to-emerald-50/60 border-emerald-400/40 shadow-xl shadow-emerald-400/20'
                  }`}>
                    <Flame className="h-6 w-6 text-emerald-500 animate-bounce" />
                    <span className="text-sm font-semibold uppercase tracking-wider text-emerald-500">Flash Deals</span>
                    <Badge className="bg-red-500 text-white text-xs px-2 py-1 animate-pulse">
                      <Clock className="h-3 w-3 mr-1" />
                      Limited Time
                    </Badge>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold logo-3d-premium font-serif mb-6">
                    Trending Premium Deals
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto mb-6 rounded-full"></div>
                  <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    Exclusive limited-time offers on premium products and luxury services
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <span className="text-sm text-emerald-600 font-medium">⚡ Flash Sale Active</span>
                    <span className="text-sm text-slate-500">•</span>
                    <span className="text-sm text-slate-500">Up to 50% Off</span>
                  </div>
                </div>
              </div>

              <div className={`premium-grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1 max-w-4xl mx-auto'
              }`}>
                {trendingDeals.map((listing, index) => (
                  <PremiumListingCard 
                    key={listing.id} 
                    listing={listing} 
                    viewMode={viewMode}
                    isDarkMode={isDarkMode}
                    animationDelay={index * 100}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Luxury Categories */}
          {remainingListings.length > 0 && (
            <section className="space-y-8">
              <div className="relative">
                <div className={`absolute inset-0 rounded-3xl ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-blue-400/5 via-transparent to-indigo-500/5'
                    : 'bg-gradient-to-br from-blue-400/5 via-transparent to-blue-600/5'
                } blur-3xl`}></div>

                <div className="relative text-center py-8">
                  <div className={`inline-flex items-center gap-3 rounded-full px-8 py-4 mb-6 border-2 backdrop-blur-sm ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-slate-800/60 to-blue-900/40 border-blue-400/30 shadow-xl shadow-blue-400/10'
                      : 'bg-gradient-to-r from-white/80 to-blue-50/60 border-blue-400/30 shadow-xl shadow-blue-400/10'
                  }`}>
                    <Sparkles className="h-6 w-6 text-blue-500 animate-pulse" />
                    <span className="text-sm font-semibold uppercase tracking-wider text-blue-500">Premium Collection</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold logo-3d-premium font-serif mb-6">
                    Luxury Categories
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-6 rounded-full"></div>
                  <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    Discover our extensive collection of premium products and luxury services across multiple categories
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto">
                    {[
                      { icon: Gem, label: "Jewelry", count: "12" },
                      { icon: Sparkles, label: "Fashion", count: "8" },
                      { icon: Home, label: "Services", count: "15" },
                      { icon: Crown, label: "Art", count: "6" }
                    ].map((cat, index) => (
                      <div key={index} className={`p-4 rounded-xl border ${
                        isDarkMode
                          ? 'bg-slate-800/30 border-slate-700/50'
                          : 'bg-white/50 border-slate-200/50'
                      }`}>
                        <cat.icon className={`h-6 w-6 mx-auto mb-2 ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-500'
                        }`} />
                        <div className="text-sm font-medium">{cat.label}</div>
                        <div className="text-xs text-slate-500">{cat.count} items</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`grid gap-4 lg:gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              }`}>
                {remainingListings.map((listing, index) => (
                  <PremiumListingCard 
                    key={listing.id} 
                    listing={listing} 
                    viewMode={viewMode}
                    isDarkMode={isDarkMode}
                    animationDelay={index * 100}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {filteredListings.length === 0 && (
            <div className="text-center py-12">
              <Crown className={`h-16 w-16 mx-auto mb-4 ${
                isDarkMode ? 'text-slate-600' : 'text-slate-400'
              }`} />
              <h3 className={`text-xl font-semibold mb-2 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                No premium listings found
              </h3>
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Try adjusting your search or filters to find what you're looking for
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Redesigned Premium Listing Card Component with Uniform Layout
function PremiumListingCard({
  listing,
  viewMode,
  isDarkMode,
  animationDelay
}: {
  listing: PremiumListing;
  viewMode: 'grid' | 'list';
  isDarkMode: boolean;
  animationDelay: number;
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const discountPercentage = listing.originalPrice
    ? Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay / 1000, duration: 0.6, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group h-full ${
        viewMode === 'list' ? 'flex flex-row max-w-4xl mx-auto' : ''
      }`}
    >
      <Card
        className={`premium-card-redesigned overflow-hidden relative h-full flex flex-col transition-all duration-500 rounded-2xl ${
          viewMode === 'list' ? 'flex-row' : ''
        } ${
          listing.royal
            ? isDarkMode
              ? 'bg-gradient-to-br from-slate-800/95 to-slate-900/95 border-2 border-yellow-400/30 shadow-2xl shadow-yellow-400/10'
              : 'bg-gradient-to-br from-white to-blue-50/50 border-2 border-yellow-400/20 shadow-2xl shadow-yellow-400/5'
            : isDarkMode
              ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/50 shadow-xl'
              : 'bg-gradient-to-br from-white to-slate-50/30 border border-slate-200/50 shadow-xl'
        }`}
        style={{
          transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
          boxShadow: isHovered
            ? listing.royal
              ? '0 20px 40px rgba(212, 175, 55, 0.15), 0 8px 20px rgba(212, 175, 55, 0.1)'
              : '0 20px 40px rgba(59, 130, 246, 0.15), 0 8px 20px rgba(59, 130, 246, 0.1)'
            : undefined
        }}
      >
      {/* Premium Image Section with Fixed Proportions */}
      <div className={`relative overflow-hidden rounded-t-2xl ${
        viewMode === 'list' ? 'w-72 flex-shrink-0' : 'aspect-[4/3]'
      } ${isDarkMode ? 'bg-slate-800/30' : 'bg-slate-100/30'}`}>
        <Image
          src={listing.images[currentImageIndex]}
          alt={`${listing.name} - Premium ${listing.type}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes={viewMode === 'list' ? '288px' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'}
          loading="lazy"
          quality={85}
        />

        {/* Premium Gold Shimmer Border on Hover */}
        <div className={`absolute inset-0 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 ${
          listing.royal
            ? 'border-2 border-yellow-400/60 shadow-lg shadow-yellow-400/20'
            : 'border-2 border-blue-400/60 shadow-lg shadow-blue-400/20'
        }`}></div>

        {/* Enhanced Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out rounded-t-2xl"></div>

        {/* Premium Overlay */}
        <div className={`absolute inset-0 rounded-t-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
          listing.royal
            ? 'bg-gradient-to-br from-yellow-400/30 to-amber-500/30'
            : 'bg-gradient-to-br from-blue-400/30 to-blue-600/30'
        }`}></div>
        
        {/* Premium Badge with Gold Gradient */}
        <div className="absolute top-4 left-4 z-20">
          <Badge className={`backdrop-blur-md shadow-2xl font-bold px-4 py-2 text-sm rounded-xl ${
            listing.royal
              ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 border-2 border-emerald-300/50 shadow-yellow-400/30'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-2 border-emerald-300/30 shadow-blue-400/30'
          }`}>
            <Crown className="h-4 w-4 mr-2" />
            PREMIUM
          </Badge>
        </div>

        {/* Rating Badge - Top Right */}
        {listing.rating >= 4.5 && (
          <div className="absolute top-4 right-4 z-20">
            <Badge className="backdrop-blur-md bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1.5 text-xs font-semibold shadow-xl rounded-xl">
              <Star className="h-3 w-3 mr-1 fill-current" />
              {listing.rating}
            </Badge>
          </div>
        )}

        {/* Status Badges */}
        <div className="absolute bottom-4 left-4 flex gap-2 z-20">
          {listing.trending && (
            <Badge className="backdrop-blur-md bg-gradient-to-r from-emerald-500/95 to-teal-600/95 text-white px-2 py-1 text-xs animate-pulse shadow-lg rounded-lg">
              <TrendingUp className="h-2.5 w-2.5 mr-1" />
              Trending
            </Badge>
          )}
          {listing.flashSale && (
            <Badge className="backdrop-blur-md bg-gradient-to-r from-red-500/95 to-orange-600/95 text-white px-2 py-1 text-xs animate-pulse shadow-lg rounded-lg">
              <Zap className="h-2.5 w-2.5 mr-1" />
              Sale
            </Badge>
          )}
          {listing.limitedEdition && (
            <Badge className="backdrop-blur-md bg-gradient-to-r from-purple-500/95 to-violet-600/95 text-white px-2 py-1 text-xs shadow-lg rounded-lg">
              <Sparkles className="h-2.5 w-2.5 mr-1" />
              Limited
            </Badge>
          )}
        </div>

        {/* Quick Action Buttons - On Hover */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                setIsWishlisted(!isWishlisted);
              }}
              className="bg-white/95 backdrop-blur-xl border-0 hover:bg-white shadow-xl hover:shadow-2xl text-slate-900 px-3 py-2 rounded-xl transition-all duration-300"
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white/95 backdrop-blur-xl border-0 hover:bg-white shadow-xl hover:shadow-2xl text-slate-900 px-3 py-2 rounded-xl transition-all duration-300"
              aria-label="Share this item"
            >
              <Share2 className="h-4 w-4 text-slate-600" />
            </Button>
          </div>
        </div>

        {/* Image Indicators */}
        {listing.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {listing.images.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? listing.royal
                      ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50'
                      : 'bg-blue-400 shadow-lg shadow-blue-400/50'
                    : 'bg-white/60 hover:bg-white/90'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Premium Content Section with Perfect Spacing */}
      <CardContent className={`p-6 flex-1 flex flex-col justify-between space-y-4 ${viewMode === 'list' ? '' : ''}`}>
        {/* Premium Vendor Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <Image
              src={listing.vendor.logo}
              alt={listing.vendor.name}
              width={24}
              height={24}
              className={`rounded-full ring-2 ${
                listing.vendor.premiumSeller
                  ? 'ring-yellow-400/50'
                  : 'ring-slate-300/50'
              }`}
            />
            {listing.vendor.premiumSeller && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center">
                <Crown className="h-1.5 w-1.5 text-slate-900" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                {listing.vendor.name}
              </span>
              {listing.vendor.verified && (
                <Verified className="h-3.5 w-3.5 text-blue-500" />
              )}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-slate-400" />
              <span className="text-xs text-slate-500">{listing.vendor.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs font-medium">{listing.vendor.rating}</span>
          </div>
        </div>

        {/* Premium Title & Description with Perfect Alignment */}
        <div className="space-y-3">
          <h3 className={`font-bold text-xl leading-tight line-clamp-2 transition-all duration-300 ${
            viewMode === 'list' ? 'text-left' : 'text-left md:text-center lg:text-left'
          } ${
            isDarkMode
              ? 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-amber-300'
              : 'text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-500'
          }`}>
            {listing.name.toUpperCase()}
          </h3>
          <p className={`text-sm line-clamp-2 leading-relaxed font-medium ${
            viewMode === 'list' ? 'text-left' : 'text-left md:text-center lg:text-left'
          } ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {listing.description}
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-3">
          {listing.premiumFeatures.slice(0, 3).map((feature) => (
            <Badge 
              key={feature} 
              variant="outline" 
              className={`text-xs border-current/30 bg-current/5 ${
                isDarkMode ? 'text-yellow-400' : 'text-blue-600'
              }`}
            >
              {feature}
            </Badge>
          ))}
          {listing.premiumFeatures.length > 3 && (
            <Badge variant="outline" className="text-xs border-slate-300 text-slate-500 bg-slate-50">
              +{listing.premiumFeatures.length - 3} more
            </Badge>
          )}
        </div>

        {/* Premium Price Display with Luxury Colors */}
        <div className={`flex items-center gap-3 ${
          viewMode === 'list' ? 'justify-start' : 'justify-center md:justify-start'
        }`}>
          <span className={`text-3xl font-bold font-serif transition-all duration-300 ${
            isDarkMode
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 drop-shadow-lg'
              : 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600 drop-shadow-lg'
          }`}>
            K{listing.price.toFixed(2)}
          </span>
          {listing.originalPrice && (
            <div className="flex flex-col">
              <span className="text-sm text-slate-400 line-through font-medium">
                K{listing.originalPrice.toFixed(2)}
              </span>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 text-xs font-bold px-2 py-1 shadow-lg rounded-full">
                -{discountPercentage}% OFF
              </Badge>
            </div>
          )}
        </div>

        {/* Rating & Stats */}
        <div className={`flex items-center justify-between text-sm mb-4 ${
          isDarkMode ? 'text-slate-400' : 'text-slate-600'
        }`}>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-3 w-3 ${
                    i < Math.floor(listing.rating) 
                      ? 'text-yellow-500 fill-current' 
                      : 'text-slate-300'
                  }`} 
                />
              ))}
            </div>
            <span className="font-medium">{listing.rating}</span>
            <span>({listing.reviewCount})</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{listing.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <ShoppingCart className="h-3 w-3" />
              <span>{listing.soldCount} sold</span>
            </div>
          </div>
        </div>

        {/* Premium Action Buttons with Equal Width */}
        <div className={`flex gap-3 mt-auto ${
          viewMode === 'list' ? 'flex-row' : 'flex-col sm:flex-row'
        }`}>
          <Button
            className={`btn-premium flex-1 text-sm font-bold py-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] rounded-xl ${
              listing.royal
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
            }`}
            aria-label={`${listing.type === 'service' ? 'Book' : 'Add to cart'} ${listing.name}`}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {listing.type === 'service' ? 'BOOK NOW' : 'ADD TO CART'}
          </Button>
          <Button
            variant="outline"
            className={`flex-1 py-4 border-2 rounded-xl transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm font-bold text-sm ${
              isDarkMode
                ? 'border-yellow-400/40 text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400/60 shadow-lg shadow-yellow-400/20'
                : 'border-blue-400/40 text-blue-600 hover:bg-blue-400/10 hover:border-blue-400/60 shadow-lg shadow-blue-400/20'
            }`}
            asChild
          >
            <Link href={`/vendors/${listing.vendor.id}`} aria-label={`Visit ${listing.vendor.name} store`}>
              <ExternalLink className="h-4 w-4 mr-2" />
              VISIT STORE
            </Link>
          </Button>
        </div>

        {/* Trust Signals */}
        {listing.certifications && listing.certifications.length > 0 && (
          <div className="pt-3 mt-3 border-t border-current/10">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <Shield className="h-3 w-3 text-green-600" />
              <span className="font-medium">{listing.certifications[0]}</span>
            </div>
          </div>
        )}
      </CardContent>
      </Card>
    </motion.div>
  );
}
