"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Enhanced3DProductCard } from "@/components/marketplace/Enhanced3DProductCard";
import { HeroCarousel3D } from "@/components/marketplace/3DHeroCarousel";
import { PremiumServicesSection } from "@/components/marketplace/PremiumServicesSection";
import { HotDealsSection } from "@/components/marketplace/HotDealsSection";
import { PremiumBrandsCarousel } from "@/components/marketplace/PremiumBrandsCarousel";
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
  Grid3X3,
  List,
  CheckCircle,
  Verified,
  Sparkles,
  Medal,
  Menu,
  X,
  Home,
  Package,
  Settings,
  User,
  Search,
  Bell,
  TrendingUp,
  Flame,
  Zap,
  Filter,
  SortAsc
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PremiumProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  vendor: {
    id: string;
    name: string;
    logo: string;
    verified: boolean;
    premiumSeller: boolean;
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
}

const premiumProducts: PremiumProduct[] = [
  {
    id: "p1",
    name: "Handcrafted Malachite Jewelry Collection",
    description: "Exquisite handcrafted jewelry featuring authentic Zambian malachite stones, showcasing the rich green beauty of Zambia's national gemstone",
    price: 299.99,
    originalPrice: 449.99,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80"
    ],
    category: "Jewelry & Accessories",
    vendor: {
      id: "v1",
      name: "Zambian Gemstone Artisans",
      logo: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&q=80",
      verified: true,
      premiumSeller: true
    },
    rating: 4.9,
    reviewCount: 156,
    premiumFeatures: ["Authentic Malachite", "Handcrafted Design", "Limited Edition", "Certificate of Authenticity"],
    luxuryRating: 5,
    handcrafted: true,
    limitedEdition: true,
    exclusiveDesign: true,
    premiumMaterials: ["Zambian Malachite", "Sterling Silver", "18k Gold Plating"],
    certifications: ["Authentic Gemstone Certificate", "Artisan Crafted"],
    warranty: "Lifetime Craftsmanship Guarantee",
    views: 4230,
    soldCount: 67,
    tags: ["luxury", "handmade", "malachite", "jewelry"]
  },
  {
    id: "p2",
    name: "Royal Chitenge Ceremonial Attire",
    description: "Luxurious ceremonial chitenge outfit worn by Zambian royalty, featuring intricate traditional patterns and premium silk materials",
    price: 459.99,
    originalPrice: 699.99,
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=800&q=80",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80"
    ],
    category: "Traditional Fashion",
    vendor: {
      id: "v2",
      name: "Royal Heritage Fashion House",
      logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&q=80",
      verified: true,
      premiumSeller: true
    },
    rating: 5.0,
    reviewCount: 89,
    premiumFeatures: ["Royal Design", "Premium Silk", "Custom Tailoring", "Historical Significance"],
    luxuryRating: 5,
    handcrafted: true,
    exclusiveDesign: true,
    premiumMaterials: ["Pure Silk", "Gold Thread", "Traditional Dyes"],
    certifications: ["Cultural Heritage Approved", "Royal Design Certified"],
    warranty: "6 Month Premium Guarantee",
    views: 6780,
    soldCount: 23,
    tags: ["royal", "traditional", "silk", "ceremonial"]
  },
  {
    id: "p3",
    name: "Artisan Wood Sculpture Collection",
    description: "Masterfully carved wooden sculptures representing Zambian wildlife, created by master craftsmen using sustainable hardwoods",
    price: 189.99,
    originalPrice: 289.99,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
      "https://images.unsplash.com/photo-1580669337089-59ade28c4115?w=800&q=80"
    ],
    category: "Art & Crafts",
    vendor: {
      id: "v3",
      name: "Master Craftsmen Collective",
      logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&q=80",
      verified: true,
      premiumSeller: true
    },
    rating: 4.8,
    reviewCount: 234,
    premiumFeatures: ["Master Crafted", "Sustainable Wood", "Wildlife Theme", "Unique Design"],
    luxuryRating: 4,
    handcrafted: true,
    exclusiveDesign: true,
    premiumMaterials: ["Mahogany Wood", "Teak", "Natural Oils"],
    certifications: ["Sustainable Sourcing", "Master Artisan Certified"],
    warranty: "12 Month Craftsmanship Warranty",
    views: 3450,
    soldCount: 156,
    tags: ["art", "wood", "sculpture", "wildlife"]
  },
  {
    id: "p4",
    name: "Premium Copper Wire Baskets",
    description: "Elegant copper wire baskets handwoven by skilled artisans, combining traditional techniques with modern luxury appeal",
    price: 134.99,
    originalPrice: 199.99,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"
    ],
    category: "Home & Decor",
    vendor: {
      id: "v4",
      name: "Luxury Home Crafters",
      logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&q=80",
      verified: true,
      premiumSeller: true
    },
    rating: 4.7,
    reviewCount: 178,
    premiumFeatures: ["Pure Copper", "Handwoven Design", "Luxury Finish", "Functional Art"],
    luxuryRating: 4,
    handcrafted: true,
    premiumMaterials: ["Pure Copper Wire", "Protective Coating"],
    certifications: ["Artisan Quality", "Pure Copper Verified"],
    warranty: "24 Month Quality Guarantee",
    views: 2890,
    soldCount: 89,
    tags: ["copper", "baskets", "luxury", "home"]
  },
  {
    id: "p5",
    name: "Premium Zambian Coffee Luxury Set",
    description: "Exclusive collection of single-origin Zambian coffee beans with premium brewing accessories and gold-plated serving set",
    price: 89.99,
    originalPrice: 149.99,
    images: [
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80"
    ],
    category: "Gourmet Food",
    vendor: {
      id: "v5",
      name: "Zambian Premium Coffee Co.",
      logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&q=80",
      verified: true,
      premiumSeller: true
    },
    rating: 4.9,
    reviewCount: 267,
    premiumFeatures: ["Single Origin", "Premium Roast", "Luxury Packaging", "Brewing Accessories"],
    luxuryRating: 4,
    limitedEdition: true,
    premiumMaterials: ["Premium Coffee Beans", "Gold-Plated Accessories"],
    certifications: ["Organic Certified", "Fair Trade", "Premium Grade"],
    warranty: "Satisfaction Guarantee",
    views: 5670,
    soldCount: 234,
    tags: ["coffee", "gourmet", "luxury", "organic"]
  },
  {
    id: "p6",
    name: "Executive Leather Briefcase",
    description: "Handcrafted executive briefcase made from premium Zambian leather with gold hardware and silk-lined interior",
    price: 349.99,
    originalPrice: 499.99,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    category: "Business Accessories",
    vendor: {
      id: "v6",
      name: "Executive Leather Works",
      logo: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&q=80",
      verified: true,
      premiumSeller: true
    },
    rating: 4.8,
    reviewCount: 145,
    premiumFeatures: ["Premium Leather", "Gold Hardware", "Silk Lining", "Executive Design"],
    luxuryRating: 5,
    handcrafted: true,
    exclusiveDesign: true,
    premiumMaterials: ["Premium Leather", "Gold Hardware", "Silk Lining"],
    certifications: ["Leather Quality Certified", "Handcraft Verified"],
    warranty: "5 Year Premium Warranty",
    views: 3780,
    soldCount: 78,
    tags: ["leather", "briefcase", "executive", "business"]
  }
];

export default function PremiumItemsPage() {
  const [sortBy, setSortBy] = useState<'luxury' | 'price' | 'rating' | 'newest'>('luxury');
  const [filterBy, setFilterBy] = useState<'all' | 'handcrafted' | 'limited' | 'exclusive'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Luxury loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter and sort products
  const filteredProducts = premiumProducts
    .filter(product => {
      switch (filterBy) {
        case 'handcrafted':
          return product.handcrafted;
        case 'limited':
          return product.limitedEdition;
        case 'exclusive':
          return product.exclusiveDesign;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'luxury':
          return b.luxuryRating - a.luxuryRating;
        case 'price':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.views - a.views;
        default:
          return b.luxuryRating - a.luxuryRating;
      }
    });

  // Luxury Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="w-32 h-32 border-4 border-amber-200/30 rounded-full animate-spin border-t-amber-400"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Crown className="h-12 w-12 text-amber-400 animate-pulse" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
              ✨ Loading Premium Experience
            </h2>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Advanced 3D Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/10 via-purple-500/5 to-blue-500/10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-amber-300/5 to-yellow-400/10 pointer-events-none"></div>

      {/* Animated Luxury Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-300/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* 3D Navigation Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl transform transition-all duration-500 z-50 border-r border-amber-100/50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">Premium</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="space-y-2">
            {[
              { icon: Home, label: 'Home', href: '/' },
              { icon: Package, label: 'Products', href: '/categories' },
              { icon: Sparkles, label: 'Services', href: '/services' },
              { icon: TrendingUp, label: 'Trending', href: '/trending' },
              { icon: Flame, label: 'Hot Deals', href: '/hot-deals' },
              { icon: Crown, label: 'Premium', href: '/marketplace/premium' },
              { icon: User, label: 'Profile', href: '/profile' },
              { icon: Settings, label: 'Settings', href: '/settings' }
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-amber-50 transition-all duration-300 group"
              >
                <item.icon className="h-5 w-5 text-gray-600 group-hover:text-amber-600 transition-colors" />
                <span className="font-medium text-gray-700 group-hover:text-amber-700">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-amber-100/50 shadow-2xl z-40 md:hidden">
        <div className="flex items-center justify-around py-3">
          {[
            { icon: Home, label: 'Home' },
            { icon: Search, label: 'Search' },
            { icon: Heart, label: 'Wishlist' },
            { icon: ShoppingCart, label: 'Cart' },
            { icon: User, label: 'Profile' }
          ].map((item) => (
            <button key={item.label} className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-amber-50 transition-all duration-300">
              <item.icon className="h-5 w-5 text-gray-600" />
              <span className="text-xs text-gray-600">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <Header />

      <main className="relative z-10 space-y-0">
        {/* Mobile Menu Button */}
        <Button
          variant="outline"
          size="lg"
          onClick={() => setSidebarOpen(true)}
          className="fixed top-20 left-4 z-40 bg-white/90 backdrop-blur-xl border-2 border-amber-200 hover:border-amber-300 rounded-xl shadow-xl md:hidden"
        >
          <Menu className="h-5 w-5 text-amber-700" />
        </Button>

        {/* 3D Hero Carousel */}
        <HeroCarousel3D />

        {/* Hot Deals Section */}
        <HotDealsSection />

        {/* Premium Services Section */}
        <PremiumServicesSection />

        {/* Premium Brands Carousel */}
        <PremiumBrandsCarousel />

        {/* Advanced Filters and Controls */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-purple-50/20 to-pink-50/30"></div>
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl border-2 border-purple-100/60 shadow-2xl p-8 lg:p-12">
              <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 xl:gap-12">
                {/* Advanced Premium Filters */}
                <div className="flex-1 w-full">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Filter className="h-6 w-6 text-purple-600" />
                    Premium Categories
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:flex xl:flex-wrap gap-3">
                    {[
                      { value: 'all', label: 'All Premium', icon: Crown, color: 'from-purple-500 to-indigo-500' },
                      { value: 'handcrafted', label: 'Handcrafted', icon: Award, color: 'from-amber-500 to-orange-500' },
                      { value: 'limited', label: 'Limited Edition', icon: Medal, color: 'from-emerald-500 to-teal-500' },
                      { value: 'exclusive', label: 'Exclusive Design', icon: Sparkles, color: 'from-pink-500 to-rose-500' }
                    ].map((filter) => (
                      <Button
                        key={filter.value}
                        variant={filterBy === filter.value ? "default" : "outline"}
                        size="lg"
                        onClick={() => setFilterBy(filter.value as any)}
                        className={`transition-all duration-300 font-semibold px-6 py-3 rounded-xl border-2 transform hover:scale-105 hover:shadow-lg ${
                          filterBy === filter.value
                            ? `bg-gradient-to-r ${filter.color} text-white shadow-lg border-transparent hover:shadow-xl`
                            : 'border-purple-200 text-purple-800 bg-white hover:border-purple-300 hover:bg-purple-50 hover:text-purple-900'
                        }`}
                      >
                        <filter.icon className="h-4 w-4 mr-2" />
                        {filter.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Sort and View Options */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full xl:w-auto">
                  <div className="flex items-center gap-4">
                    <SortAsc className="h-5 w-5 text-purple-600" />
                    <span className="text-lg font-semibold text-gray-900 whitespace-nowrap">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="text-base border-2 border-purple-200 rounded-xl px-4 py-3 bg-white text-gray-900 font-medium focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-200 min-w-[160px] shadow-sm"
                    >
                      <option value="luxury">Luxury Rating</option>
                      <option value="price">Highest Price</option>
                      <option value="rating">Best Rated</option>
                      <option value="newest">Most Popular</option>
                    </select>
                  </div>

                  <div className="flex border-2 border-purple-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="lg"
                      onClick={() => setViewMode('grid')}
                      className={`rounded-none px-5 py-3 border-none transition-all duration-300 ${
                        viewMode === 'grid'
                          ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-sm'
                          : 'text-purple-700 hover:bg-purple-50'
                      }`}
                    >
                      <Grid3X3 className="h-5 w-5" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="lg"
                      onClick={() => setViewMode('list')}
                      className={`rounded-none px-5 py-3 border-none transition-all duration-300 ${
                        viewMode === 'list'
                          ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-sm'
                          : 'text-purple-700 hover:bg-purple-50'
                      }`}
                    >
                      <List className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Premium Products Grid */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-gray-50/30 to-slate-50/50"></div>
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-800 via-gray-700 to-slate-900 bg-clip-text text-transparent mb-3">
                  💎 Curated Collection
                </h2>
                <p className="text-xl text-gray-600">
                  {filteredProducts.length} exclusive {filteredProducts.length === 1 ? 'item' : 'items'} available
                </p>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 text-sm font-bold rounded-xl shadow-lg">
                  <Shield className="h-4 w-4 mr-2" />
                  Verified Authentic
                </Badge>
                <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 text-sm font-bold rounded-xl shadow-lg">
                  <Truck className="h-4 w-4 mr-2" />
                  Premium Shipping
                </Badge>
              </div>
            </div>

            <div className={`gap-8 ${
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'flex flex-col space-y-8'
            }`}>
              {filteredProducts.map((product, index) => {
                // Convert to Enhanced3DProductCard format
                const enhancedProduct = {
                  ...product,
                  trending: index < 2,
                  flashSale: product.originalPrice ? true : false,
                  stockLevel: 15 - (index * 2),
                  saleEndTime: product.originalPrice ? new Date(Date.now() + (24 * 60 * 60 * 1000)) : undefined
                };

                return (
                  <Enhanced3DProductCard
                    key={product.id}
                    product={enhancedProduct}
                    variant={index === 0 ? 'featured' : 'standard'}
                    className={viewMode === 'list' ? 'w-full' : ''}
                  />
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-100 via-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Crown className="h-16 w-16 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No premium items found
                </h3>
                <p className="text-gray-600 text-lg mb-8">
                  Try adjusting your filters to see more luxury products
                </p>
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-8 py-4 rounded-xl shadow-xl">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Browse All Categories
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-50 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-full w-14 h-14 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 md:bottom-6"
        >
          <Crown className="h-6 w-6" />
        </Button>
      )}

      {/* Notification Bell */}
      <Button
        variant="outline"
        className="fixed top-20 right-4 z-40 bg-white/90 backdrop-blur-xl border-2 border-amber-200 hover:border-amber-300 rounded-full w-12 h-12 shadow-xl"
      >
        <Bell className="h-5 w-5 text-amber-700" />
      </Button>

      <Footer />
    </div>
  );
}

// Add these CSS animations to globals.css
const customAnimations = `
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
  33% { transform: translateY(-20px) rotate(120deg); opacity: 1; }
  66% { transform: translateY(-10px) rotate(240deg); opacity: 0.8; }
}

.animate-float {
  animation: float linear infinite;
}

.perspective-1000 {
  perspective: 1000px;
}

.transform-gpu {
  transform: translateZ(0);
}

.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}

.backdrop-blur-3xl {
  backdrop-filter: blur(64px);
}
`;
