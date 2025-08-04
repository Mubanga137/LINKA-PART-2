"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  Store,
  CheckCircle,
  Award,
  MapPin,
  Users,
  Package,
  TrendingUp,
  Clock,
  MessageCircle,
  ExternalLink,
  Shield,
  Verified,
  Crown,
  Medal,
  ThumbsUp,
  Eye,
  ChevronRight,
  Filter,
  Grid3X3,
  List,
  Phone,
  Mail,
  Globe,
  Heart,
  Search,
  Calendar,
  Truck,
  Zap,
  Gift
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Vendor {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  totalProducts: number;
  totalSales: number;
  joinedDate: string;
  location: string;
  verified: boolean;
  badge: "Top Seller" | "Rising Star" | "Artisan" | "Premium" | "Choice Award" | "New Vendor";
  badgeColor: string;
  categories: string[];
  responseTime: string;
  shippingTime: string;
  returnPolicy: string;
  achievements: string[];
  specialties: string[];
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  stats: {
    satisfaction: number;
    onTimeDelivery: number;
    qualityRating: number;
  };
  featuredProducts: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
  }>;
  isNew?: boolean;
  isTrending?: boolean;
  hasDiscount?: boolean;
  isOnline?: boolean;
  lastActive: string;
}

const vendors: Vendor[] = [
  {
    id: "v1",
    name: "Electronics Hub Zambia",
    description: "Premier destination for cutting-edge electronics, gaming gear, and tech accessories. Trusted by thousands of customers across Zambia with fast delivery and excellent support.",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    rating: 4.8,
    reviewCount: 2847,
    totalProducts: 156,
    totalSales: 8934,
    joinedDate: "2019-03-15",
    location: "Lusaka, Zambia",
    verified: true,
    badge: "Top Seller",
    badgeColor: "from-yellow-400 to-orange-400",
    categories: ["Electronics", "Gaming", "Accessories"],
    responseTime: "< 2 hours",
    shippingTime: "1-2 days",
    returnPolicy: "30-day returns",
    achievements: ["10K+ Sales", "99% Satisfaction", "Fast Shipping Champion"],
    specialties: ["Gaming Equipment", "Smartphones", "Audio Devices"],
    contact: {
      phone: "+260 97 123 4567",
      email: "contact@electronicshubtm.com",
      website: "electronicshubtm.com"
    },
    stats: {
      satisfaction: 98,
      onTimeDelivery: 99,
      qualityRating: 97
    },
    featuredProducts: [
      {
        id: "p1",
        name: "Gaming Headset Pro",
        image: "https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=400&q=80",
        price: 89.99,
        rating: 4.7
      },
      {
        id: "p2",
        name: "Smartphone 128GB",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
        price: 399.99,
        rating: 4.8
      }
    ],
    isTrending: true,
    isOnline: true,
    lastActive: "2 minutes ago"
  },
  {
    id: "v2",
    name: "Zambian Heritage Fashion",
    description: "Celebrating Zambian culture through traditional and contemporary fashion. Handcrafted with love and authenticity by skilled local artisans.",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=800&q=80",
    rating: 4.9,
    reviewCount: 1563,
    totalProducts: 89,
    totalSales: 4567,
    joinedDate: "2020-07-22",
    location: "Kitwe, Zambia",
    verified: true,
    badge: "Choice Award",
    badgeColor: "from-purple-400 to-pink-400",
    categories: ["Fashion", "Traditional", "Accessories"],
    responseTime: "< 4 hours",
    shippingTime: "2-3 days",
    returnPolicy: "14-day returns",
    achievements: ["Cultural Ambassador", "Artisan Excellence", "Customer Favorite"],
    specialties: ["Chitenge Fashion", "Traditional Wear", "Custom Tailoring"],
    contact: {
      phone: "+260 96 987 6543",
      email: "info@zamheritage.com"
    },
    stats: {
      satisfaction: 99,
      onTimeDelivery: 96,
      qualityRating: 98
    },
    featuredProducts: [
      {
        id: "p3",
        name: "Traditional Chitenge Dress",
        image: "https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=400&q=80",
        price: 65.99,
        rating: 4.9
      },
      {
        id: "p4",
        name: "Custom Tailored Suit",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
        price: 189.99,
        rating: 4.8
      }
    ],
    hasDiscount: true,
    isOnline: true,
    lastActive: "5 minutes ago"
  },
  {
    id: "v3",
    name: "Craft Collective Zambia",
    description: "Supporting local artisans and traditional craftspeople. Every purchase supports Zambian communities and preserves cultural heritage.",
    logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    rating: 4.7,
    reviewCount: 892,
    totalProducts: 73,
    totalSales: 2341,
    joinedDate: "2021-01-10",
    location: "Livingstone, Zambia",
    verified: true,
    badge: "Artisan",
    badgeColor: "from-green-400 to-teal-400",
    categories: ["Crafts", "Art", "Home Decor"],
    responseTime: "< 6 hours",
    shippingTime: "3-5 days",
    returnPolicy: "7-day returns",
    achievements: ["Artisan Verified", "Community Impact", "Eco-Friendly"],
    specialties: ["Handwoven Baskets", "Wood Carvings", "Traditional Art"],
    contact: {
      phone: "+260 95 456 7890",
      email: "hello@craftcollective.zm"
    },
    stats: {
      satisfaction: 96,
      onTimeDelivery: 94,
      qualityRating: 99
    },
    featuredProducts: [
      {
        id: "p5",
        name: "Handwoven Basket Set",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
        price: 45.99,
        rating: 4.8
      },
      {
        id: "p6",
        name: "Traditional Wood Carving",
        image: "https://images.unsplash.com/photo-1580669337089-59ade28c4115?w=400&q=80",
        price: 78.99,
        rating: 4.9
      }
    ],
    isNew: true,
    isOnline: false,
    lastActive: "1 hour ago"
  },
  {
    id: "v4",
    name: "FreshMarket Zambia",
    description: "Farm-fresh produce and organic foods delivered to your doorstep. Supporting local farmers and promoting healthy living.",
    logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    rating: 4.6,
    reviewCount: 1247,
    totalProducts: 234,
    totalSales: 6789,
    joinedDate: "2020-11-05",
    location: "Ndola, Zambia",
    verified: true,
    badge: "Rising Star",
    badgeColor: "from-blue-400 to-indigo-400",
    categories: ["Food", "Organic", "Beverages"],
    responseTime: "< 3 hours",
    shippingTime: "Same day",
    returnPolicy: "24-hour guarantee",
    achievements: ["Farm Fresh", "Same Day Delivery", "Organic Certified"],
    specialties: ["Organic Produce", "Local Fruits", "Fresh Vegetables"],
    contact: {
      phone: "+260 97 345 6789",
      email: "orders@freshmarket.zm",
      website: "freshmarket.zm"
    },
    stats: {
      satisfaction: 95,
      onTimeDelivery: 98,
      qualityRating: 96
    },
    featuredProducts: [
      {
        id: "p7",
        name: "Organic Vegetable Box",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80",
        price: 24.99,
        rating: 4.6
      },
      {
        id: "p8",
        name: "Premium Coffee Beans",
        image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80",
        price: 18.99,
        rating: 4.7
      }
    ],
    isTrending: true,
    isOnline: true,
    lastActive: "Just now"
  },
  {
    id: "v5",
    name: "Tech Innovation Hub",
    description: "Latest technology solutions and innovations for modern life. From smart home devices to cutting-edge gadgets.",
    logo: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    rating: 4.5,
    reviewCount: 567,
    totalProducts: 98,
    totalSales: 3456,
    joinedDate: "2022-05-12",
    location: "Kabwe, Zambia",
    verified: true,
    badge: "Premium",
    badgeColor: "from-indigo-400 to-purple-400",
    categories: ["Technology", "Smart Home", "Innovation"],
    responseTime: "< 4 hours",
    shippingTime: "2-4 days",
    returnPolicy: "30-day returns",
    achievements: ["Innovation Award", "Tech Excellence", "Customer Choice"],
    specialties: ["Smart Devices", "IoT Solutions", "Tech Consulting"],
    contact: {
      phone: "+260 96 234 5678",
      email: "info@techinnovation.zm",
      website: "techinnovation.zm"
    },
    stats: {
      satisfaction: 94,
      onTimeDelivery: 97,
      qualityRating: 95
    },
    featuredProducts: [
      {
        id: "p9",
        name: "Smart Home System",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80",
        price: 299.99,
        rating: 4.5
      },
      {
        id: "p10",
        name: "Wireless Charging Pad",
        image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=400&q=80",
        price: 45.99,
        rating: 4.6
      }
    ],
    isNew: true,
    isOnline: true,
    lastActive: "15 minutes ago"
  },
  {
    id: "v6",
    name: "Beauty & Wellness ZM",
    description: "Natural beauty and wellness products sourced from local ingredients. Promoting healthy beauty from within.",
    logo: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800&q=80",
    rating: 4.7,
    reviewCount: 789,
    totalProducts: 67,
    totalSales: 2890,
    joinedDate: "2021-08-18",
    location: "Solwezi, Zambia",
    verified: true,
    badge: "New Vendor",
    badgeColor: "from-pink-400 to-rose-400",
    categories: ["Beauty", "Wellness", "Natural"],
    responseTime: "< 8 hours",
    shippingTime: "3-5 days",
    returnPolicy: "14-day returns",
    achievements: ["Natural Certified", "Wellness Expert", "Community Favorite"],
    specialties: ["Natural Skincare", "Herbal Products", "Wellness Coaching"],
    contact: {
      phone: "+260 95 678 9012",
      email: "contact@beautywellness.zm"
    },
    stats: {
      satisfaction: 97,
      onTimeDelivery: 95,
      qualityRating: 98
    },
    featuredProducts: [
      {
        id: "p11",
        name: "Natural Skincare Set",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80",
        price: 67.99,
        rating: 4.7
      },
      {
        id: "p12",
        name: "Herbal Wellness Kit",
        image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&q=80",
        price: 89.99,
        rating: 4.8
      }
    ],
    hasDiscount: true,
    isOnline: false,
    lastActive: "2 hours ago"
  }
];

const badgeIcons = {
  "Top Seller": Crown,
  "Rising Star": TrendingUp,
  "Artisan": Award,
  "Premium": Medal,
  "Choice Award": Star,
  "New Vendor": Zap
};

export default function BrowseVendorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'rating' | 'sales' | 'newest' | 'reviews'>('rating');
  const [filterBy, setFilterBy] = useState<'all' | 'verified' | 'online' | 'trending'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get unique categories
  const categories = [...new Set(vendors.flatMap(vendor => vendor.categories))];

  // Filter and sort vendors
  const filteredVendors = vendors
    .filter(vendor => {
      const searchMatch = !searchQuery || 
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const categoryMatch = !selectedCategory || vendor.categories.includes(selectedCategory);
      
      const filterMatch = 
        filterBy === 'all' ||
        (filterBy === 'verified' && vendor.verified) ||
        (filterBy === 'online' && vendor.isOnline) ||
        (filterBy === 'trending' && vendor.isTrending);

      return searchMatch && categoryMatch && filterMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'sales':
          return b.totalSales - a.totalSales;
        case 'newest':
          return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        default:
          return b.rating - a.rating;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-green-600/10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                  className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-xl"
                >
                  <Store className="text-white text-2xl" />
                </motion.div>
                <div>
                  <h1 className="text-5xl md:text-7xl font-bold text-gray-900 flex items-center gap-3">
                    Browse Vendors
                    <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-lg px-4 py-2">
                      <Shield className="h-4 w-4 mr-1" />
                      VERIFIED
                    </Badge>
                  </h1>
                  <p className="text-xl text-gray-600 mt-4">
                    Discover trusted sellers and quality products from verified vendors
                  </p>
                </div>
              </div>

              {/* Vendor Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { label: "Total Vendors", value: vendors.length.toString(), icon: Store },
                  { label: "Online Now", value: vendors.filter(v => v.isOnline).length.toString(), icon: Zap },
                  { label: "Avg Rating", value: (vendors.reduce((sum, v) => sum + v.rating, 0) / vendors.length).toFixed(1), icon: Star },
                  { label: "Categories", value: categories.length.toString(), icon: Package }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl border shadow-lg p-6">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search vendors by name, category, or specialty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 text-lg border border-gray-200 rounded-xl focus:border-emerald-400 focus:ring-0 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                {/* Category and Status Filters */}
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter Vendors
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      { value: 'all', label: 'All Vendors', count: vendors.length },
                      { value: 'verified', label: 'Verified Only', count: vendors.filter(v => v.verified).length },
                      { value: 'online', label: 'Online Now', count: vendors.filter(v => v.isOnline).length },
                      { value: 'trending', label: 'Trending', count: vendors.filter(v => v.isTrending).length }
                    ].map((filter) => (
                      <Button
                        key={filter.value}
                        variant={filterBy === filter.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterBy(filter.value as any)}
                        className={`transition-all duration-200 ${
                          filterBy === filter.value 
                            ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white' 
                            : ''
                        }`}
                      >
                        {filter.label} ({filter.count})
                      </Button>
                    ))}
                  </div>

                  {/* Category Filter */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Categories:</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={selectedCategory === null ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(null)}
                        className="text-xs"
                      >
                        All Categories
                      </Button>
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className="text-xs"
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sort and View Options */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="text-sm border rounded-lg px-3 py-1 bg-white"
                    >
                      <option value="rating">Highest Rated</option>
                      <option value="sales">Most Sales</option>
                      <option value="reviews">Most Reviews</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>

                  <div className="flex gap-1 border rounded-lg overflow-hidden">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-none"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vendors Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Verified Vendors ({filteredVendors.length})
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}
            >
              {filteredVendors.map((vendor, index) => {
                const BadgeIcon = badgeIcons[vendor.badge];
                
                return (
                  <motion.div
                    key={vendor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                      {/* Cover Image */}
                      <div className="relative h-32 bg-gradient-to-r from-emerald-100 to-green-100 overflow-hidden">
                        <Image
                          src={vendor.coverImage}
                          alt={`${vendor.name} cover`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Status Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1">
                          {vendor.isNew && (
                            <Badge className="bg-blue-500 text-white text-xs px-2 py-1">
                              <Zap className="h-2.5 w-2.5 mr-1" />
                              New
                            </Badge>
                          )}
                          {vendor.isTrending && (
                            <Badge className="bg-orange-500 text-white text-xs px-2 py-1">
                              <TrendingUp className="h-2.5 w-2.5 mr-1" />
                              Trending
                            </Badge>
                          )}
                          {vendor.hasDiscount && (
                            <Badge className="bg-red-500 text-white text-xs px-2 py-1 animate-pulse">
                              Sale Active
                            </Badge>
                          )}
                        </div>

                        {/* Online Status */}
                        <div className="absolute top-3 right-3">
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            vendor.isOnline 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${
                              vendor.isOnline ? 'bg-green-500' : 'bg-gray-400'
                            }`} />
                            {vendor.isOnline ? 'Online' : 'Offline'}
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        {/* Vendor Header */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="relative">
                            <Image
                              src={vendor.logo}
                              alt={vendor.name}
                              width={60}
                              height={60}
                              className="rounded-full object-cover border-4 border-white shadow-lg"
                            />
                            {vendor.verified && (
                              <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1">
                                <CheckCircle className="h-4 w-4 text-white" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-bold text-gray-900 text-lg truncate">
                                {vendor.name}
                              </h3>
                              <Badge className={`bg-gradient-to-r ${vendor.badgeColor} text-white text-xs px-2 py-1`}>
                                <BadgeIcon className="h-3 w-3 mr-1" />
                                {vendor.badge}
                              </Badge>
                            </div>
                            
                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                              {vendor.description}
                            </p>

                            {/* Location and Last Active */}
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{vendor.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>Active {vendor.lastActive}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Rating and Stats */}
                        <div className="flex items-center gap-4 text-sm mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-semibold">{vendor.rating}</span>
                            <span className="text-gray-500">({vendor.reviewCount} reviews)</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Package className="h-4 w-4" />
                            <span>{vendor.totalProducts} products</span>
                          </div>
                        </div>

                        {/* Specialties */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {vendor.specialties.slice(0, 3).map((specialty) => (
                              <Badge key={specialty} variant="outline" className="text-xs border-emerald-200 text-emerald-700">
                                {specialty}
                              </Badge>
                            ))}
                            {vendor.specialties.length > 3 && (
                              <Badge variant="outline" className="text-xs border-gray-200 text-gray-500">
                                +{vendor.specialties.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="bg-emerald-50 rounded-lg p-3 mb-4">
                          <div className="grid grid-cols-3 gap-3 text-center">
                            <div>
                              <div className="text-lg font-bold text-emerald-600">{vendor.stats.satisfaction}%</div>
                              <div className="text-xs text-gray-600">Satisfaction</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-emerald-600">{vendor.stats.onTimeDelivery}%</div>
                              <div className="text-xs text-gray-600">On Time</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-emerald-600">{vendor.stats.qualityRating}%</div>
                              <div className="text-xs text-gray-600">Quality</div>
                            </div>
                          </div>
                        </div>

                        {/* Featured Products Preview */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Featured Products</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {vendor.featuredProducts.map((product) => (
                              <div key={product.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  width={40}
                                  height={40}
                                  className="rounded object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-gray-900 truncate">{product.name}</p>
                                  <div className="flex items-center gap-1 text-xs">
                                    <span className="font-semibold text-emerald-600">K{product.price}</span>
                                    <Star className="h-2.5 w-2.5 text-yellow-400 fill-current" />
                                    <span className="text-gray-500">{product.rating}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Contact and Service Info */}
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>Responds {vendor.responseTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Truck className="h-3 w-3" />
                            <span>Ships in {vendor.shippingTime}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
                            asChild
                          >
                            <Link href={`/vendors/${vendor.id}`}>
                              <Store className="h-4 w-4 mr-2" />
                              Visit Store
                            </Link>
                          </Button>
                          
                          <Button
                            variant="outline"
                            className="border-emerald-300 hover:border-emerald-500 hover:text-emerald-600"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            variant="outline"
                            className="border-emerald-300 hover:border-emerald-500 hover:text-emerald-600"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Achievements */}
                        <div className="mt-3 text-center">
                          <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                            <Award className="h-3 w-3 text-emerald-500" />
                            <span>{vendor.achievements.slice(0, 2).join(" • ")}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>

            {filteredVendors.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Store className="h-8 w-8 text-emerald-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No vendors found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filters to find more vendors
                </p>
              </div>
            )}

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center mt-12"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white px-8 py-4 rounded-xl font-semibold"
                  asChild
                >
                  <Link href="/vendors">
                    View All Vendors
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
