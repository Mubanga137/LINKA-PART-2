"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
  MapPin
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
  // Royal Recommendations
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
  // Trending Premium Deals
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

  // Filter and sort listings
  const filteredListings = premiumListings
    .filter(listing => {
      if (searchQuery) {
        return listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
               listing.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      }
      
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
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case 'price':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
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
    <div className={`min-h-screen relative overflow-hidden ${
      isDarkMode ? 'premium-bg-dark' : 'premium-bg-light'
    }`}>
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

      {/* Premium Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b-2 ${
        isDarkMode 
          ? 'border-yellow-400/20 bg-slate-900/80' 
          : 'border-blue-400/20 bg-white/80'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Premium Title */}
            <div className="flex items-center gap-4">
              <Crown className="h-8 w-8 crown-glow" />
              <div>
                <h1 className="text-2xl font-bold logo-3d-premium font-serif">
                  Premium Listings
                </h1>
                <p className={`text-sm font-medium ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>Curated Excellence</p>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  isDarkMode ? 'text-yellow-400/70' : 'text-blue-400/70'
                }`} />
                <input
                  type="text"
                  placeholder="Search premium listings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-xl border-2 text-sm focus:outline-none transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-800/50 border-yellow-400/20 text-white placeholder-slate-400 focus:border-yellow-400/40' 
                      : 'bg-white/50 border-blue-400/20 text-slate-900 placeholder-slate-500 focus:border-blue-400/40'
                  }`}
                />
              </div>

              <Button variant="outline" size="sm" asChild>
                <Link href="/marketplace">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  All Vendors
                </Link>
              </Button>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-current/10">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Filter:</span>
              </div>
              <div className="flex gap-2">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'royal', label: 'Royal', icon: Crown },
                  { key: 'trending', label: 'Trending', icon: TrendingUp },
                  { key: 'products', label: 'Products' },
                  { key: 'services', label: 'Services' }
                ].map((filter) => (
                  <Button
                    key={filter.key}
                    variant={filterBy === filter.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterBy(filter.key as any)}
                    className={`btn-premium text-xs ${
                      filterBy === filter.key 
                        ? '' 
                        : isDarkMode 
                          ? 'bg-slate-800/50 text-slate-300 border-slate-600' 
                          : 'bg-white/50 text-slate-700 border-slate-300'
                    }`}
                  >
                    {filter.icon && <filter.icon className="h-3 w-3 mr-1" />}
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
                className={`px-3 py-1 rounded-lg border text-sm focus:outline-none ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-yellow-400/20 text-white' 
                    : 'bg-white/50 border-blue-400/20 text-slate-900'
                }`}
              >
                <option value="featured">Featured</option>
                <option value="rating">Highest Rated</option>
                <option value="price">Price High-Low</option>
                <option value="newest">Newest</option>
              </select>

              <div className="flex border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none border-0"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none border-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8 space-y-12">
        {/* Royal Recommendations */}
        {royalRecommendations.length > 0 && (
          <section className="space-y-6">
            <div className="text-center">
              <div className={`inline-flex items-center gap-2 rounded-full px-6 py-3 mb-4 border-2 ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-yellow-400/30' 
                  : 'bg-white/50 border-blue-400/30'
              }`}>
                <Crown className="h-5 w-5 crown-glow" />
                <span className="text-sm font-medium uppercase tracking-wide">Royal Collection</span>
              </div>
              <h2 className="text-3xl font-bold logo-3d-premium font-serif mb-4">
                Royal Recommendations
              </h2>
              <div className={`w-16 h-0.5 mx-auto mb-4 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500' 
                  : 'bg-gradient-to-r from-blue-400 to-blue-600'
              }`}></div>
              <p className={`text-lg max-w-2xl mx-auto ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Handpicked selections of the finest premium products and services
              </p>
            </div>

            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
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
          <section className="space-y-6">
            <div className="text-center">
              <div className={`inline-flex items-center gap-2 rounded-full px-6 py-3 mb-4 border-2 ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-emerald-400/30' 
                  : 'bg-white/50 border-emerald-400/30'
              }`}>
                <Flame className="h-5 w-5 text-emerald-500" />
                <span className="text-sm font-medium uppercase tracking-wide text-emerald-500">Hot Deals</span>
              </div>
              <h2 className="text-3xl font-bold logo-3d-premium font-serif mb-4">
                Trending Premium Deals
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto mb-4"></div>
              <p className={`text-lg max-w-2xl mx-auto ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Limited time offers on premium products and services
              </p>
            </div>

            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
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
          <section className="space-y-6">
            <div className="text-center">
              <div className={`inline-flex items-center gap-2 rounded-full px-6 py-3 mb-4 border-2 ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-blue-400/30' 
                  : 'bg-white/50 border-blue-400/30'
              }`}>
                <Sparkles className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium uppercase tracking-wide text-blue-500">Premium Collection</span>
              </div>
              <h2 className="text-3xl font-bold logo-3d-premium font-serif mb-4">
                Luxury Categories
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-4"></div>
              <p className={`text-lg max-w-2xl mx-auto ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Explore our curated selection of premium products and services
              </p>
            </div>

            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
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
  );
}

// Premium Listing Card Component
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

  const discountPercentage = listing.originalPrice 
    ? Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100)
    : 0;

  return (
    <Card 
      className={`premium-card group gpu-premium overflow-hidden ${
        viewMode === 'list' ? 'flex flex-row' : ''
      }`}
      style={{ 
        animationDelay: `${animationDelay}ms`,
        animationFillMode: 'forwards'
      }}
    >
      {/* Image Section */}
      <div className={`relative overflow-hidden ${
        viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-[4/3]'
      } ${isDarkMode ? 'bg-slate-800/50' : 'bg-slate-100/50'}`}>
        <Image
          src={listing.images[currentImageIndex]}
          alt={listing.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge className={`${
            listing.royal 
              ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900' 
              : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
          } px-3 py-1 shadow-lg`}>
            <Crown className="h-3 w-3 mr-1" />
            {listing.royal ? 'Royal' : 'Premium'}
          </Badge>
          
          {listing.trending && (
            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-2 py-1 text-xs animate-pulse">
              <TrendingUp className="h-2.5 w-2.5 mr-1" />
              Trending
            </Badge>
          )}
          
          {listing.flashSale && (
            <Badge className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-2 py-1 text-xs animate-pulse">
              <Zap className="h-2.5 w-2.5 mr-1" />
              Flash Sale
            </Badge>
          )}
        </div>

        {/* Type Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className={`text-xs ${
            isDarkMode ? 'bg-slate-800/80 border-slate-600' : 'bg-white/80 border-slate-300'
          }`}>
            {listing.type === 'service' ? <User className="h-2.5 w-2.5 mr-1" /> : <Store className="h-2.5 w-2.5 mr-1" />}
            {listing.type === 'service' ? 'Service' : 'Product'}
          </Badge>
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`flex-1 bg-white/90 backdrop-blur-xl border-0 hover:bg-white text-slate-900 text-xs`}
            >
              <Heart className={`h-3 w-3 mr-1 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              {isWishlisted ? 'Saved' : 'Save'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 bg-white/90 backdrop-blur-xl border-0 hover:bg-white text-slate-900 text-xs"
            >
              <Share2 className="h-3 w-3 mr-1" />
              Share
            </Button>
          </div>
        </div>

        {/* Image Indicators */}
        {listing.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {listing.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex 
                    ? 'bg-white shadow-lg' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        {/* Vendor Info */}
        <div className="flex items-center gap-2 mb-3">
          <Image
            src={listing.vendor.logo}
            alt={listing.vendor.name}
            width={20}
            height={20}
            className="rounded-full ring-2 ring-current/20"
          />
          <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            {listing.vendor.name}
          </span>
          {listing.vendor.verified && (
            <Verified className="h-3 w-3 text-blue-500" />
          )}
          <div className="flex items-center gap-1 ml-auto">
            <MapPin className="h-3 w-3 text-slate-400" />
            <span className="text-xs text-slate-400">{listing.vendor.location}</span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="mb-3">
          <h3 className={`font-bold text-lg line-clamp-2 leading-tight mb-2 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            {listing.name}
          </h3>
          <p className={`text-sm line-clamp-2 ${
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

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xl font-bold ${
            isDarkMode ? 'text-yellow-400' : 'text-blue-600'
          }`}>
            K{listing.price.toFixed(2)}
          </span>
          {listing.originalPrice && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400 line-through">
                K{listing.originalPrice.toFixed(2)}
              </span>
              <Badge className="bg-green-100 text-green-700 border border-green-200 text-xs">
                -{discountPercentage}%
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

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            className="btn-premium flex-1 text-sm font-semibold py-2 shadow-lg"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {listing.type === 'service' ? 'Book Now' : 'Add to Cart'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`px-3 border-2 rounded-lg transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10' 
                : 'border-blue-400/30 text-blue-600 hover:bg-blue-400/10'
            }`}
            asChild
          >
            <Link href={`/vendors/${listing.vendor.id}`}>
              <ExternalLink className="h-4 w-4" />
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
  );
}
