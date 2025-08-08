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
  LogOut,
  Plus,
  ArrowUp
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
    description: "Exquisite handcrafted crown featuring authentic Zambian malachite stones",
    price: 2999.99,
    originalPrice: 4499.99,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80"
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
    premiumFeatures: ["Authentic Malachite", "Royal Heritage", "Limited Edition", "Certificate"],
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
    flashSale: true
  },
  {
    id: "p2",
    name: "Imperial Chitenge Ceremonial Robes",
    description: "Magnificent ceremonial robes with intricate gold threading and premium silk",
    price: 1899.99,
    originalPrice: 2799.99,
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=600&q=80",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&q=80"
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
    description: "Masterfully carved royal sculptures using rare Zambian hardwoods",
    price: 799.99,
    originalPrice: 1199.99,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
      "https://images.unsplash.com/photo-1580669337089-59ade28c4115?w=600&q=80"
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
  },
  {
    id: "p4",
    name: "Luxury Copper Wire Baskets",
    description: "Elegant handwoven copper baskets for sophisticated home decor",
    price: 234.99,
    originalPrice: 349.99,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80"
    ],
    category: "Home Decor",
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
    tags: ["copper", "baskets", "luxury", "home"],
    stockLevel: 12
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
  const [cartCount, setCartCount] = useState(3);
  const [notificationCount, setNotificationCount] = useState(7);

  // Luxury loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation delays for cards
  const getAnimationDelay = (index: number) => `${index * 100}ms`;

  // Cart bounce animation
  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    // Trigger bounce animation
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
      cartIcon.style.animation = 'bounce 0.6s ease-in-out';
      setTimeout(() => {
        cartIcon.style.animation = '';
      }, 600);
    }
  };

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
      <div className="min-h-screen bg-royal-particles flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-royal-overlay animate-layered-gradient"></div>

        {/* Loading Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400/40 rounded-full animate-gold-particle"
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
            <div className="w-32 h-32 border-3 border-yellow-400/20 rounded-full animate-spin border-t-yellow-400 shadow-2xl bg-gradient-to-br from-yellow-400/5 to-amber-500/5 backdrop-blur-xl"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Crown className="h-12 w-12 text-yellow-400 animate-royal-pulse drop-shadow-lg" />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/10 to-amber-500/10 animate-royal-glow"></div>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-yellow-400 font-serif animate-emerald-shimmer">Linka Royale</h1>
            <p className="text-xl text-slate-300 font-bold">Preparing your royal experience...</p>
            <div className="flex items-center justify-center gap-2 text-yellow-400/60">
              <Diamond className="h-4 w-4 animate-pulse" />
              <Sparkles className="h-4 w-4 animate-pulse" style={{animationDelay: '0.5s'}} />
              <Crown className="h-4 w-4 animate-pulse" style={{animationDelay: '1s'}} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mouse tracking for cursor glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const glowElement = document.getElementById('cursor-glow');
      if (glowElement) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        glowElement.style.setProperty('--mouse-x', `${x}%`);
        glowElement.style.setProperty('--mouse-y', `${y}%`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-royal-particles relative overflow-hidden">
      {/* Advanced Royal Background Effects */}
      <div className="absolute inset-0 bg-royal-overlay animate-layered-gradient pointer-events-none"></div>

      {/* Parallax Crown Silhouettes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 animate-parallax-drift">
          <Crown className="w-full h-full text-yellow-400/10" />
        </div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 animate-parallax-drift" style={{animationDelay: '2s', animationDuration: '15s'}}>
          <Diamond className="w-full h-full text-yellow-400/8" />
        </div>
        <div className="absolute top-1/2 left-3/4 w-20 h-20 animate-parallax-drift" style={{animationDelay: '4s', animationDuration: '12s'}}>
          <Sparkles className="w-full h-full text-yellow-400/12" />
        </div>
      </div>
      
      {/* Advanced Gold Particle System */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Gold Particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`large-${i}`}
            className="absolute w-2 h-2 bg-gradient-to-br from-yellow-400/40 to-amber-500/30 rounded-full animate-gold-particle shadow-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${12 + Math.random() * 8}s`
            }}
          />
        ))}

        {/* Medium Gold Dust */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`medium-${i}`}
            className="absolute w-1 h-1 bg-yellow-400/50 rounded-full animate-gold-dust"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 6}s`
            }}
          />
        ))}

        {/* Fine Gold Sparkles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`fine-${i}`}
            className="absolute w-0.5 h-0.5 bg-yellow-400/60 rounded-full animate-royal-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 12}s`,
              animationDuration: `${6 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Cursor-Reactive Glow Effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        id="cursor-glow"
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(212, 175, 55, 0.1), transparent 80%)'
        }}
      />

      {/* Compact Premium Header with Glassmorphism */}
      <header className="sticky top-0 z-40 glass-luxury border-b border-yellow-400/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Menu & Branding */}
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="glass-luxury border-yellow-400/20 text-yellow-400 hover:bg-yellow-400/10 rounded-xl p-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 logo-3d-metallic logo-mouse-responsive rounded-xl flex items-center justify-center animate-golden-pulse cursor-pointer transform hover:scale-110 transition-all duration-300"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
                  }}
                >
                  <Crown className="h-6 w-6 text-slate-900 drop-shadow-lg" />
                  <div className="logo-dynamic-reflection" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white font-serif animate-emerald-shimmer">
                    Welcome to <span className="text-royal-gold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Linka Royale</span>
                  </h1>
                </div>
              </div>
            </div>

            {/* Center: Compact Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-400/70" />
                <input
                  type="text"
                  placeholder="Search luxury collections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 glass-luxury border border-yellow-400/20 rounded-xl text-white placeholder-slate-400 text-sm focus:border-yellow-400/40 focus:ring-1 focus:ring-yellow-400/20"
                />
                <Button
                  size="sm"
                  onClick={() => setVoiceSearch(!voiceSearch)}
                  className={`absolute right-1 top-1/2 transform -translate-y-1/2 p-1 rounded-lg ${
                    voiceSearch ? 'bg-red-500/20 text-red-400' : 'bg-yellow-400/20 text-yellow-400'
                  }`}
                >
                  {voiceSearch ? <Volume2 className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
                </Button>
              </div>
            </div>

            {/* Right: Compact Action Icons */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                id="cart-icon"
                className="glass-luxury border-yellow-400/20 text-yellow-400 hover:bg-yellow-400/10 rounded-xl w-10 h-10 relative"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="glass-luxury border-yellow-400/20 text-yellow-400 hover:bg-yellow-400/10 rounded-xl w-10 h-10 relative"
              >
                <Bell className="h-4 w-4" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                    {notificationCount}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="glass-luxury border-yellow-400/20 text-yellow-400 hover:bg-yellow-400/10 rounded-xl w-10 h-10"
              >
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Animated Side Navigation */}
      <div className={`fixed top-0 left-0 h-full w-72 glass-luxury border-r border-yellow-400/15 transform transition-all duration-500 z-50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 space-y-6">
          {/* Compact Logo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 logo-3d-metallic logo-mouse-responsive rounded-xl flex items-center justify-center animate-golden-pulse cursor-pointer transform hover:scale-110 transition-all duration-300"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
                }}
              >
                <Crown className="h-7 w-7 text-slate-900 drop-shadow-lg" />
                <div className="logo-dynamic-reflection" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white font-serif animate-emerald-shimmer">Linka Royale</h2>
                <p className="text-sm text-yellow-400 font-bold">Luxury Marketplace</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5 text-slate-400" />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {[
              { icon: Home, label: 'Home', href: '/', isActive: true },
              { icon: Flame, label: 'Hot Deals', href: '/hot-deals' },
              { icon: Package, label: 'About', href: '/about' },
              { icon: UserPlus, label: 'For Retailers', href: '/for-retailers' },
              { icon: Mail, label: 'Contact', href: '/contact' },
              { icon: Sparkles, label: 'Services', href: '/services' },
              { icon: Heart, label: 'Wishlist', href: '/wishlist' },
              { icon: Settings, label: 'Settings', href: '/settings' },
              { icon: User, label: 'Profile', href: '/profile' }
            ].map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  item.isActive 
                    ? 'bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-400/30' 
                    : 'hover:bg-yellow-400/10 hover:border-yellow-400/20 border border-transparent'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <item.icon className={`h-4 w-4 ${
                  item.isActive ? 'text-yellow-400' : 'text-slate-400 group-hover:text-yellow-400'
                }`} />
                <span className={`font-medium ${
                  item.isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                }`}>
                  {item.label}
                </span>
                <ChevronRight className={`h-3 w-3 ml-auto transition-all duration-300 ${
                  item.isActive ? 'text-yellow-400 opacity-100' : 'text-slate-500 opacity-0 group-hover:opacity-100 group-hover:text-yellow-400'
                }`} />
              </Link>
            ))}
          </nav>

          {/* Compact Concierge */}
          <div className="border-t border-yellow-400/20 pt-6">
            <Button
              onClick={() => setConciergeOpen(true)}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 font-semibold py-3 rounded-xl shadow-lg transition-all duration-300"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              <Crown className="h-3 w-3 mr-2 animate-pulse" />
              Royal Concierge
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="relative z-10 space-y-8">
        {/* Royal Recommendations - Above the Fold */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-8">
            {/* Section Header */}
            <div className="text-center mb-12" style={{ animationDelay: '200ms' }}>
              <div className="inline-flex items-center gap-2 glass-luxury rounded-full px-6 py-3 mb-6 border border-yellow-400/20">
                <Crown className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-yellow-400 uppercase tracking-wide">Curated For You</span>
              </div>
              <h2 className="text-4xl font-bold text-white font-serif mb-4">
                Royal Recommendations
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto mb-4"></div>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto font-bold">
                Discover our handpicked selection of premium products crafted for discerning taste
              </p>
            </div>

            {/* Compact Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="opacity-0 animate-fade-in-up"
                  style={{ 
                    animationDelay: getAnimationDelay(index),
                    animationFillMode: 'forwards'
                  }}
                >
                  <Card className="group luxury-card h-full overflow-hidden border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/90">
                    {/* Compact Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        <Badge className="bg-yellow-400/90 text-slate-900 text-xs px-2 py-1">
                          <Crown className="h-2 w-2 mr-1" />
                          Premium
                        </Badge>
                        {product.trending && (
                          <Badge className="bg-green-500/90 text-white text-xs px-2 py-1 animate-pulse">
                            Trending
                          </Badge>
                        )}
                      </div>

                      {/* Luxury Rating */}
                      <div className="absolute top-3 right-3">
                        <div className="glass-luxury rounded-lg px-2 py-1 border border-yellow-400/30">
                          <div className="flex items-center gap-1">
                            <Diamond className="h-3 w-3 text-yellow-400" />
                            <span className="text-xs font-bold text-white">{product.luxuryRating}/5</span>
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions Overlay */}
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 glass-luxury border-0 text-white hover:bg-white/20 text-xs"
                          >
                            <Heart className="h-3 w-3 mr-1" />
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 glass-luxury border-0 text-white hover:bg-white/20 text-xs"
                          >
                            <Share2 className="h-3 w-3 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-4 space-y-3">
                      {/* Vendor */}
                      <div className="flex items-center gap-2">
                        <Image
                          src={product.vendor.logo}
                          alt={product.vendor.name}
                          width={16}
                          height={16}
                          className="rounded-full"
                        />
                        <span className="text-xs text-slate-400">{product.vendor.name}</span>
                        {product.vendor.verified && (
                          <Verified className="h-3 w-3 text-blue-400" />
                        )}
                      </div>

                      {/* Product Info */}
                      <div>
                        <h3 className="font-semibold text-white text-sm line-clamp-2 leading-tight mb-2">
                          {product.name}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1">
                        {product.premiumFeatures.slice(0, 2).map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs border-yellow-400/30 text-yellow-400 bg-yellow-400/5">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-yellow-400">
                          K{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-slate-500 line-through">
                            K{product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Rating */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-white font-medium">{product.rating}</span>
                          <span className="text-slate-400">({product.reviewCount})</span>
                        </div>
                        <span className="text-slate-400">{product.soldCount} sold</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm"
                          onClick={handleAddToCart}
                          className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 font-medium py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-xs"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add to Cart
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="px-3 border border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 rounded-lg text-xs"
                          asChild
                        >
                          <Link href={`/products/${product.id}`}>
                            <Eye className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>

        {/* 3D Hero Carousel */}
        <HeroCarousel3D />

        {/* Section Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>

        {/* Hot Deals Section */}
        <HotDealsSection />

        {/* Section Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>

        {/* Premium Services Section */}
        <PremiumServicesSection />

        {/* Section Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>

        {/* Premium Brands Carousel */}
        <PremiumBrandsCarousel />
      </main>

      {/* Refined Floating Concierge */}
      <Button
        onClick={() => setConciergeOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
      >
        <MessageCircle className="h-6 w-6" />
        <Crown className="h-3 w-3 absolute -top-1 -right-1 bg-yellow-400 rounded-full p-0.5 text-slate-900 animate-pulse" />
      </Button>

      {/* Scroll to Top */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 glass-luxury border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/20 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}

      {/* Enhanced Concierge Modal */}
      {conciergeOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex items-center justify-center p-6">
          <div className="luxury-card rounded-2xl shadow-2xl w-full max-w-md border border-yellow-400/20">
            <div className="flex items-center justify-between p-6 border-b border-yellow-400/20">
              <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 logo-3d-metallic logo-mouse-responsive rounded-xl flex items-center justify-center animate-golden-pulse cursor-pointer transform hover:scale-110 transition-all duration-300"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
              }}
            >
              <Crown className="h-7 w-7 text-slate-900 drop-shadow-lg" />
              <div className="logo-dynamic-reflection" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-serif animate-emerald-shimmer">Royal Concierge</h3>
              <p className="text-sm text-yellow-400 font-bold">Premium Assistant</p>
            </div>
          </div>
              <Button variant="ghost" size="sm" onClick={() => setConciergeOpen(false)}>
                <X className="h-5 w-5 text-slate-400" />
              </Button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="glass-luxury rounded-xl p-4 border border-yellow-400/20">
                <p className="text-white text-sm">
                  👑 Welcome! I'm your Royal Concierge. How may I assist you with your luxury shopping experience today?
                </p>
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask your Royal Concierge..."
                  className="flex-1 px-4 py-2 glass-luxury border border-yellow-400/20 rounded-lg text-white placeholder-slate-400 text-sm"
                />
                <Button className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 px-4 py-2 rounded-lg font-medium">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
