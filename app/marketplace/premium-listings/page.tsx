"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="min-h-screen bg-white lg:flex">
      {/* Side Navigation */}
      <div className="lg:w-64 lg:flex-shrink-0">
        <SideNavigation variant="premium" />
      </div>

      {/* Main Content Area */}
      <div className="lg:flex-1 lg:pl-0 lg:min-w-0">
        <MinimalHeader variant="premium" showSearch={true} />

        {/* Premium Page Header */}
        <div className={`border-b ${
          isDarkMode
            ? 'border-yellow-400/20 bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-slate-900/95'
            : 'border-blue-400/20 bg-gradient-to-r from-white/95 via-blue-50/80 to-white/95'
        } shadow-sm`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Premium Header Title */}
            <div className="py-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-yellow-400/20 to-amber-500/20 border border-yellow-400/30'
                    : 'bg-gradient-to-br from-blue-400/20 to-blue-600/20 border border-blue-400/30'
                }`}>
                  <Crown className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Premium Listings
                  </h1>
                  <p className="text-sm text-slate-600">
                    Curated Excellence • {filteredListings.length} Items
                  </p>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="border-t border-slate-200 py-6 space-y-6">
              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search premium products and services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Filter Pills & Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-medium text-slate-700">Filter:</span>
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
                        className={`${
                          filterBy === filter.key
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {filter.icon && <filter.icon className="h-3 w-3 mr-2" />}
                        {filter.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-slate-700">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="featured">Featured First</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price">Price High-Low</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>

                  <div className="flex border border-slate-300 rounded-lg overflow-hidden">
                    <Button
                      variant={viewMode === 'grid' ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={`rounded-none border-0 ${
                        viewMode === 'grid'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-600 hover:bg-slate-50'
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
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-600 hover:bg-slate-50'
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
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          {/* Royal Recommendations */}
          {royalRecommendations.length > 0 && (
            <section className="space-y-8">
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-full px-6 py-3 mb-6">
                  <Crown className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm font-semibold text-yellow-800 uppercase tracking-wider">Royal Collection</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Royal Recommendations
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-6">
                  Handpicked selections of the finest premium products and services, curated for discerning customers
                </p>
                <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Diamond className="h-4 w-4 text-blue-500" />
                    <span>Authenticated</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-blue-500" />
                    <span>Verified Quality</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span>Premium Guarantee</span>
                  </div>
                </div>
              </div>

              <div className={`grid gap-6 ${
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
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-3 bg-red-50 border border-red-200 rounded-full px-6 py-3 mb-6">
                  <Flame className="h-5 w-5 text-red-600" />
                  <span className="text-sm font-semibold text-red-800 uppercase tracking-wider">Flash Deals</span>
                  <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                    <Clock className="h-3 w-3 mr-1" />
                    Limited Time
                  </Badge>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Trending Premium Deals
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-4">
                  Exclusive limited-time offers on premium products and luxury services
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-red-600 font-medium">⚡ Flash Sale Active</span>
                  <span className="text-sm text-slate-500">•</span>
                  <span className="text-sm text-slate-500">Up to 50% Off</span>
                </div>
              </div>

              <div className={`grid gap-6 ${
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
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-full px-6 py-3 mb-6">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-800 uppercase tracking-wider">Premium Collection</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Luxury Categories
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                  Discover our extensive collection of premium products and luxury services across multiple categories
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  {[
                    { icon: Gem, label: "Jewelry", count: "12" },
                    { icon: Sparkles, label: "Fashion", count: "8" },
                    { icon: Home, label: "Services", count: "15" },
                    { icon: Crown, label: "Art", count: "6" }
                  ].map((cat, index) => (
                    <div key={index} className="p-4 rounded-lg border bg-white border-slate-200">
                      <cat.icon className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                      <div className="text-sm font-medium text-slate-900">{cat.label}</div>
                      <div className="text-xs text-slate-500">{cat.count} items</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1 max-w-4xl mx-auto'
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
              <Crown className="h-16 w-16 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-semibold mb-2 text-slate-600">
                No premium listings found
              </h3>
              <p className="text-slate-500">
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
      transition={{ delay: animationDelay / 1000, duration: 0.4 }}
      className={`group h-full ${
        viewMode === 'list' ? 'flex flex-row max-w-4xl mx-auto' : ''
      }`}
    >
      <Card
        className={`overflow-hidden h-full flex flex-col bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-200 rounded-lg ${
          viewMode === 'list' ? 'flex-row' : ''
        } ${
          listing.royal ? 'ring-1 ring-yellow-200' : ''
        }`}
      >
      {/* Image Section */}
      <div className={`relative overflow-hidden rounded-t-lg ${
        viewMode === 'list' ? 'w-72 flex-shrink-0' : 'aspect-[4/3]'
      } bg-slate-100`}>
        <Image
          src={listing.images[currentImageIndex]}
          alt={`${listing.name} - Premium ${listing.type}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes={viewMode === 'list' ? '288px' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'}
          loading="lazy"
          quality={85}
        />

        {/* Premium Badge */}
        <div className="absolute top-2 left-2">
          <Badge className={`text-xs font-medium px-2 py-1 ${
            listing.royal
              ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
              : 'bg-blue-100 text-blue-800 border border-blue-200'
          }`}>
            <Crown className="h-3 w-3 mr-1" />
            Premium
          </Badge>
        </div>

        {/* Rating Badge */}
        {listing.rating >= 4.5 && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-green-100 text-green-800 border border-green-200 text-xs font-medium px-2 py-1">
              <Star className="h-3 w-3 mr-1 fill-current" />
              {listing.rating}
            </Badge>
          </div>
        )}

        {/* Status Badges */}
        <div className="absolute bottom-2 left-2 flex gap-1">
          {listing.trending && (
            <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs px-2 py-1">
              Trending
            </Badge>
          )}
          {listing.flashSale && (
            <Badge className="bg-red-100 text-red-800 border border-red-200 text-xs px-2 py-1">
              Sale
            </Badge>
          )}
          {listing.limitedEdition && (
            <Badge className="bg-purple-100 text-purple-800 border border-purple-200 text-xs px-2 py-1">
              Limited
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <div className="absolute bottom-2 right-2">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            className="bg-white/90 border-slate-200 hover:bg-white text-slate-600 p-1.5"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`h-3 w-3 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Card Content */}
      <CardContent className="p-4 flex-1 flex flex-col space-y-3">
        {/* Vendor Info */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Image
              src={listing.vendor.logo}
              alt={listing.vendor.name}
              width={20}
              height={20}
              className="rounded-full ring-1 ring-slate-200"
            />
            {listing.vendor.premiumSeller && (
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-yellow-400 rounded-full flex items-center justify-center">
                <Crown className="h-1 w-1 text-slate-900" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium text-slate-700 truncate">
                {listing.vendor.name}
              </span>
              {listing.vendor.verified && (
                <Verified className="h-3 w-3 text-blue-500 flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-2.5 w-2.5 text-slate-400 flex-shrink-0" />
              <span className="text-xs text-slate-500 truncate">{listing.vendor.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs font-medium text-slate-600">{listing.vendor.rating}</span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="font-semibold text-base leading-tight line-clamp-2 text-slate-900">
            {listing.name}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {listing.description}
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1">
          {listing.premiumFeatures.slice(0, 2).map((feature) => (
            <Badge
              key={feature}
              variant="outline"
              className="text-xs border-blue-200 text-blue-700 bg-blue-50 px-2 py-1"
            >
              {feature}
            </Badge>
          ))}
          {listing.premiumFeatures.length > 2 && (
            <Badge variant="outline" className="text-xs border-slate-200 text-slate-600 bg-slate-50 px-2 py-1">
              +{listing.premiumFeatures.length - 2}
            </Badge>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-slate-900">
              K{listing.price.toFixed(2)}
            </span>
            {listing.originalPrice && (
              <span className="text-sm text-slate-400 line-through">
                K{listing.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {listing.originalPrice && (
            <Badge className="bg-green-100 text-green-800 border-0 text-xs font-medium px-2 py-1">
              -{discountPercentage}% OFF
            </Badge>
          )}
        </div>

        {/* Rating & Stats */}
        <div className="flex items-center justify-between text-sm text-slate-600">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="font-medium">{listing.rating}</span>
            <span className="text-slate-400">({listing.reviewCount})</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>{listing.views.toLocaleString()} views</span>
            <span>{listing.soldCount} sold</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t border-slate-100">
          <Button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3"
            aria-label={`${listing.type === 'service' ? 'Book' : 'Add to cart'} ${listing.name}`}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {listing.type === 'service' ? 'Book Now' : 'Add to Cart'}
          </Button>
          {listing.vendor?.id ? (
            <Button
              variant="outline"
              className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-medium py-2 px-3"
              asChild
            >
              <Link href={`/vendors/${listing.vendor.id}`} aria-label={`Visit ${listing.vendor.name} store`}>
                <ExternalLink className="h-4 w-4 mr-1" />
                Visit Store
              </Link>
            </Button>
          ) : (
            <Button
              variant="outline"
              disabled
              className="flex-1 border-slate-200 text-slate-400 cursor-not-allowed text-sm font-medium py-2 px-3"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Store Unavailable
            </Button>
          )}
        </div>

        {/* Trust Signals */}
        {listing.certifications && listing.certifications.length > 0 && (
          <div className="flex items-center justify-center gap-1 text-xs text-slate-500">
            <Shield className="h-3 w-3 text-green-600" />
            <span>{listing.certifications[0]}</span>
          </div>
        )}
      </CardContent>
      </Card>
    </motion.div>
  );
}
