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
  SortAsc,
  MessageCircle,
  ShoppingBag,
  MapPin,
  Phone,
  Mail,
  UserPlus,
  Mic,
  Volume2,
  ChevronRight,
  LogOut
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
  stockLevel?: number;
  trending?: boolean;
  flashSale?: boolean;
  saleEndTime?: Date;
}

const premiumProducts: PremiumProduct[] = [
  {
    id: "p1",
    name: "Royal Malachite Crown Collection",
    description: "Exquisite handcrafted crown featuring authentic Zambian malachite stones, showcasing the rich heritage of Zambian royalty",
    price: 2999.99,
    originalPrice: 4499.99,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80"
    ],
    category: "Royal Jewelry",
    vendor: {
      id: "v1",
      name: "Royal Zambian Artisans",
      logo: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&q=80",
      verified: true,
      premiumSeller: true
    },
    rating: 5.0,
    reviewCount: 89,
    premiumFeatures: ["Authentic Malachite", "Royal Heritage", "Limited Edition", "Certificate of Authenticity"],
    luxuryRating: 5,
    handcrafted: true,
    limitedEdition: true,
    exclusiveDesign: true,
    premiumMaterials: ["Zambian Malachite", "24k Gold", "Sterling Silver"],
    certifications: ["Royal Heritage Certificate", "Artisan Crafted"],
    warranty: "Lifetime Royal Guarantee",
    views: 8450,
    soldCount: 12,
    tags: ["luxury", "royal", "malachite", "crown"],
    stockLevel: 3,
    trending: true,
    flashSale: true,
    saleEndTime: new Date(Date.now() + 24 * 60 * 60 * 1000)
  },
  {
    id: "p2",
    name: "Imperial Chitenge Ceremonial Robes",
    description: "Magnificent ceremonial robes worn by Zambian royalty, featuring intricate gold threading and premium silk materials",
    price: 1899.99,
    originalPrice: 2799.99,
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=800&q=80",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80"
    ],
    category: "Royal Fashion",
    vendor: {
      id: "v2",
      name: "Imperial Fashion House",
      logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&q=80",
      verified: true,
      premiumSeller: true
    },
    rating: 4.9,
    reviewCount: 156,
    premiumFeatures: ["Imperial Design", "Premium Silk", "Gold Threading", "Royal Certification"],
    luxuryRating: 5,
    handcrafted: true,
    exclusiveDesign: true,
    premiumMaterials: ["Pure Silk", "24k Gold Thread", "Traditional Dyes"],
    certifications: ["Royal Fashion Approved", "Imperial Design Certified"],
    warranty: "12 Month Imperial Guarantee",
    views: 12340,
    soldCount: 34,
    tags: ["imperial", "ceremonial", "silk", "royal"],
    stockLevel: 8,
    trending: true
  },
  {
    id: "p3",
    name: "Sovereign Wood Sculpture Collection",
    description: "Masterfully carved royal sculptures representing Zambian wildlife and heritage, created by master craftsmen using rare hardwoods",
    price: 799.99,
    originalPrice: 1199.99,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
      "https://images.unsplash.com/photo-1580669337089-59ade28c4115?w=800&q=80"
    ],
    category: "Royal Art",
    vendor: {
      id: "v3",
      name: "Sovereign Craftsmen Guild",
      logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&q=80",
      verified: true,
      premiumSeller: true
    },
    rating: 4.8,
    reviewCount: 234,
    premiumFeatures: ["Master Crafted", "Rare Wood", "Royal Theme", "Unique Design"],
    luxuryRating: 4,
    handcrafted: true,
    exclusiveDesign: true,
    premiumMaterials: ["Rare Mahogany", "Royal Teak", "Natural Oils"],
    certifications: ["Master Artisan Certified", "Royal Guild Approved"],
    warranty: "24 Month Craftsmanship Warranty",
    views: 6780,
    soldCount: 67,
    tags: ["art", "wood", "sculpture", "royal"],
    stockLevel: 15
  }
];

export default function LinkaRoyalePage() {
  const [sortBy, setSortBy] = useState<'luxury' | 'price' | 'rating' | 'newest'>('luxury');
  const [filterBy, setFilterBy] = useState<'all' | 'handcrafted' | 'limited' | 'exclusive'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [voiceSearch, setVoiceSearch] = useState(false);

  // Luxury loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
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

  // Royal Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800 flex items-center justify-center relative overflow-hidden">
        {/* Royal Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-amber-500/5 to-yellow-600/10"></div>
        
        {/* Floating Royal Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        <div className="text-center space-y-8 z-10">
          <div className="relative">
            <div className="w-40 h-40 border-4 border-yellow-400/30 rounded-full animate-spin border-t-yellow-400 shadow-2xl"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Crown className="h-16 w-16 text-yellow-400 animate-pulse drop-shadow-lg" />
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-yellow-400 font-serif tracking-wide">
              Linka Royale
            </h1>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-yellow-200 via-amber-100 to-yellow-200 bg-clip-text text-transparent">
              ✨ Preparing Your Royal Experience
            </h2>
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-gradient relative overflow-hidden texture-luxury">
      {/* Professional Luxury Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-tr from-royal-gold/8 via-luxury-gold/4 to-champagne-gold/6 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-royal-gold/3 to-luxury-gold/5 pointer-events-none"></div>

      {/* Sophisticated Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-royal-gold/40 rounded-full animate-royal-float shadow-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${8 + Math.random() * 12}s`
            }}
          />
        ))}
      </div>

      {/* Luxury Light Rays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-royal-gold/5 via-luxury-gold/3 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-radial from-champagne-gold/4 via-royal-gold/2 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Professional Luxury Sidebar Navigation */}
      <div className={`fixed top-0 left-0 h-full w-80 nav-luxury transform transition-all duration-700 z-50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-8 space-y-8">
          {/* Luxury Brand Logo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gold-luxury-gradient rounded-2xl flex items-center justify-center shadow-2xl border border-royal-gold/30 relative">
                <Crown className="h-9 w-9 text-midnight-blue drop-shadow-lg" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold text-midnight-blue font-royal tracking-wide text-luxury-title">Linka</h1>
                <p className="text-xl font-semibold text-luxury-gold font-royal italic tracking-wide">Royale</p>
                <div className="w-12 h-0.5 bg-gradient-to-r from-royal-gold to-luxury-gold mt-1 rounded-full"></div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="hover:bg-royal-gold/10 rounded-xl p-2 transition-all duration-300"
            >
              <X className="h-6 w-6 text-charcoal-luxury" />
            </Button>
          </div>

          {/* Luxury Concierge Access */}
          <div className="luxury-card rounded-3xl p-6 border border-royal-gold/20">
            <div className="text-center mb-4">
              <h3 className="text-luxury-caption text-charcoal-luxury mb-2">Personal Assistant</h3>
              <p className="text-sm text-luxury-body text-charcoal-luxury/70">Available 24/7 for your luxury experience</p>
            </div>
            <Button
              onClick={() => setConciergeOpen(true)}
              className="w-full btn-luxury py-4 rounded-xl shadow-xl text-lg font-semibold transition-all duration-400"
            >
              <MessageCircle className="h-5 w-5 mr-3" />
              <Crown className="h-4 w-4 mr-2 animate-royal-pulse" />
              Royal Concierge
            </Button>
          </div>

          {/* Luxury Navigation Menu */}
          <nav className="space-y-2">
            {[
              { icon: Home, label: 'Home', href: '/', isActive: true },
              { icon: Flame, label: 'Hot Deals', href: '/hot-deals', isActive: false },
              { icon: ShoppingBag, label: 'About', href: '/about', isActive: false },
              { icon: UserPlus, label: 'For Retailers', href: '/for-retailers', isActive: false },
              { icon: Mail, label: 'Contact', href: '/contact', isActive: false },
              { icon: Sparkles, label: 'Services', href: '/services', isActive: false },
              { icon: Heart, label: 'Wishlist', href: '/wishlist', isActive: false },
              { icon: Settings, label: 'Settings', href: '/settings', isActive: false },
              { icon: User, label: 'Profile', href: '/profile', isActive: false }
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`royal-nav-item flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-400 group ${
                  item.isActive
                    ? 'bg-gradient-to-r from-royal-gold/15 via-luxury-gold/10 to-royal-gold/15 shadow-lg border border-royal-gold/25'
                    : 'hover:bg-gradient-to-r hover:from-royal-gold/8 hover:to-luxury-gold/8 hover:shadow-md'
                }`}
              >
                <div className={`p-2 rounded-xl transition-all duration-300 ${
                  item.isActive
                    ? 'bg-royal-gold/20 text-luxury-gold'
                    : 'text-charcoal-luxury group-hover:bg-royal-gold/10 group-hover:text-luxury-gold'
                }`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <span className={`font-semibold text-lg text-luxury-body transition-colors duration-300 ${
                  item.isActive
                    ? 'text-midnight-blue'
                    : 'text-charcoal-luxury group-hover:text-midnight-blue'
                }`}>
                  {item.label}
                </span>
                <ChevronRight className={`h-4 w-4 ml-auto transition-all duration-300 ${
                  item.isActive
                    ? 'text-luxury-gold opacity-100'
                    : 'text-charcoal-luxury/50 opacity-0 group-hover:opacity-100 group-hover:text-luxury-gold'
                }`} />
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="pt-6 border-t border-yellow-400/20">
            <Button
              variant="outline"
              className="w-full border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Royal Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Professional Luxury Header */}
      <div className="relative z-20 glass-luxury-dark border-b border-royal-gold/15 shadow-2xl">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-8">
          <div className="flex items-center justify-between">
            {/* Menu Button & Welcome */}
            <div className="flex items-center gap-8">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setSidebarOpen(true)}
                className="glass-luxury border-royal-gold/20 text-royal-gold hover:bg-royal-gold/10 hover:border-royal-gold/40 rounded-2xl shadow-lg transition-all duration-400 p-3"
              >
                <Menu className="h-6 w-6" />
              </Button>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-pearl-white font-royal tracking-wide text-luxury-title">
                  Welcome to <span className="text-royal-gold">Linka Royale</span>
                </h1>
                <p className="text-xl text-platinum/90 font-luxury">Experience Luxury Beyond Compare</p>
                <div className="w-24 h-0.5 bg-gradient-to-r from-royal-gold to-luxury-gold rounded-full"></div>
              </div>
            </div>

            {/* Luxury Search Bar */}
            <div className="flex-1 max-w-3xl mx-12">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-royal-gold" />
                </div>
                <input
                  type="text"
                  placeholder="Search exclusive luxury collections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-20 py-5 glass-luxury border border-royal-gold/20 rounded-2xl text-midnight-blue placeholder-charcoal-luxury/60 focus:border-royal-gold/40 focus:ring-2 focus:ring-royal-gold/20 shadow-xl font-medium text-lg text-luxury-body transition-all duration-400"
                />
                <Button
                  onClick={() => setVoiceSearch(!voiceSearch)}
                  className={`absolute inset-y-0 right-2 my-2 px-4 rounded-xl transition-all duration-400 ${
                    voiceSearch
                      ? 'bg-burgundy-luxury hover:bg-burgundy-luxury/80 text-white shadow-lg'
                      : 'btn-luxury shadow-lg hover:scale-105'
                  }`}
                >
                  {voiceSearch ? <Volume2 className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            {/* Luxury Action Icons */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="lg"
                className="glass-luxury border-royal-gold/25 text-royal-gold hover:bg-royal-gold/15 hover:border-royal-gold/40 rounded-2xl w-16 h-16 shadow-xl relative transition-all duration-400 hover:scale-105"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-burgundy-luxury to-red-600 text-white text-xs rounded-full w-7 h-7 flex items-center justify-center font-bold shadow-lg border border-white/20">3</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="glass-luxury border-royal-gold/25 text-royal-gold hover:bg-royal-gold/15 hover:border-royal-gold/40 rounded-2xl w-16 h-16 shadow-xl relative transition-all duration-400 hover:scale-105"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-luxury to-green-600 text-white text-xs rounded-full w-7 h-7 flex items-center justify-center font-bold shadow-lg border border-white/20 animate-pulse">7</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="glass-luxury border-royal-gold/25 text-royal-gold hover:bg-royal-gold/15 hover:border-royal-gold/40 rounded-2xl w-16 h-16 shadow-xl transition-all duration-400 hover:scale-105"
              >
                <User className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-white/98 via-amber-50/95 to-white/98 backdrop-blur-xl border-t-2 border-yellow-400/20 shadow-2xl z-40 md:hidden">
        <div className="flex items-center justify-around py-4">
          {[
            { icon: Home, label: 'Home', href: '/' },
            { icon: Search, label: 'Search', href: '/search' },
            { icon: Heart, label: 'Wishlist', href: '/wishlist' },
            { icon: ShoppingCart, label: 'Cart', href: '/cart' },
            { icon: User, label: 'Profile', href: '/profile' }
          ].map((item) => (
            <Link key={item.label} href={item.href} className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-yellow-50 transition-all duration-300">
              <item.icon className="h-6 w-6 text-blue-800" />
              <span className="text-xs text-blue-800 font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 space-y-0 pb-20 md:pb-0">
        {/* 3D Hero Carousel */}
        <HeroCarousel3D />

        {/* Recommended Products Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/30 via-amber-50/20 to-yellow-50/30"></div>
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 font-serif mb-4">
                👑 Royal Recommendations
              </h2>
              <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
                Curated exclusively for your royal taste and discerning preferences
              </p>
            </div>

            <div className={`gap-8 ${
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'flex flex-col space-y-8'
            }`}>
              {filteredProducts.map((product, index) => (
                <Enhanced3DProductCard
                  key={product.id}
                  product={product}
                  variant={index === 0 ? 'featured' : 'standard'}
                  className={viewMode === 'list' ? 'w-full' : ''}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Hot Deals Section */}
        <HotDealsSection />

        {/* Premium Services Section */}
        <PremiumServicesSection />

        {/* Premium Brands Carousel */}
        <PremiumBrandsCarousel />

        {/* Shop by Category Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-blue-50/30"></div>
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 font-serif mb-4">
                🏛️ Royal Categories
              </h2>
              <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
                Explore our curated collections of premium products and services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: 'Royal Jewelry', icon: Crown, count: 156, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80', href: '/categories/jewelry' },
                { name: 'Imperial Fashion', icon: Sparkles, count: 89, image: 'https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=400&q=80', href: '/categories/fashion' },
                { name: 'Sovereign Art', icon: Award, count: 234, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80', href: '/categories/art' },
                { name: 'Luxury Services', icon: Diamond, count: 67, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80', href: '/services' }
              ].map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
                        <category.icon className="h-6 w-6 text-blue-900" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold font-serif">{category.name}</h3>
                        <p className="text-blue-200">{category.count} items</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-yellow-400 font-semibold">Explore Collection</span>
                      <ChevronRight className="h-4 w-4 text-yellow-400" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Concierge Chatbot */}
      {conciergeOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-96 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-yellow-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-900 font-serif">Royal Concierge</h3>
                  <p className="text-sm text-blue-600">Your Personal Shopping Assistant</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setConciergeOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 p-6 bg-yellow-50/30">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-yellow-200">
                <p className="text-blue-900">
                  👑 Good day! I'm your Royal Concierge. How may I assist you with your luxury shopping experience today?
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-yellow-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask your Royal Concierge..."
                  className="flex-1 px-4 py-2 border border-yellow-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                />
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-4 py-2 rounded-lg">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Concierge Button */}
      <Button
        onClick={() => setConciergeOpen(true)}
        className="fixed bottom-24 right-6 z-50 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-blue-900 rounded-full w-16 h-16 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 md:bottom-6"
      >
        <MessageCircle className="h-7 w-7" />
        <Crown className="h-4 w-4 absolute -top-1 -right-1 text-blue-900 animate-pulse" />
      </Button>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-24 left-6 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full w-14 h-14 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 md:bottom-6"
        >
          <Crown className="h-6 w-6" />
        </Button>
      )}

      <Footer />
    </div>
  );
}
