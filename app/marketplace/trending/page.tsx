"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  ShoppingCart,
  Heart,
  TrendingUp,
  Eye,
  Users,
  Clock,
  Filter,
  Grid3X3,
  List,
  Share2,
  ExternalLink,
  Flame,
  Zap,
  Award,
  Target,
  Activity,
  BarChart3,
  LineChart,
  RefreshCw,
  ThumbsUp,
  MessageCircle,
  ShoppingBag,
  Timer,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TrendingProduct {
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
  };
  rating: number;
  reviewCount: number;
  trendingScore: number;
  views24h: number;
  sales24h: number;
  searchVolume: number;
  socialMentions: number;
  trendDirection: "up" | "down" | "stable";
  trendPercentage: number;
  timeframe: "1h" | "6h" | "24h" | "7d";
  tags: string[];
  inStock: boolean;
  stockQuantity: number;
  addedToCartToday: number;
  wishlistAdds: number;
  shareCount: number;
  isViral?: boolean;
  isBreakout?: boolean;
  isRising?: boolean;
}

const trendingProducts: TrendingProduct[] = [
  {
    id: "trend1",
    name: "Viral Gaming Setup Bundle",
    description: "Complete gaming setup that's taking social media by storm - RGB keyboard, mouse, and headset combo",
    price: 199.99,
    originalPrice: 299.99,
    images: [
      "https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=800&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"
    ],
    category: "Gaming",
    vendor: {
      id: "v1",
      name: "Gaming World ZM",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&q=80",
      verified: true
    },
    rating: 4.8,
    reviewCount: 1247,
    trendingScore: 98,
    views24h: 15420,
    sales24h: 342,
    searchVolume: 8934,
    socialMentions: 456,
    trendDirection: "up",
    trendPercentage: 156,
    timeframe: "24h",
    tags: ["viral", "gaming", "bundle"],
    inStock: true,
    stockQuantity: 23,
    addedToCartToday: 89,
    wishlistAdds: 234,
    shareCount: 156,
    isViral: true
  },
  {
    id: "trend2",
    name: "Trending Chitenge Fashion Set",
    description: "The chitenge pattern everyone's talking about - modern twist on traditional Zambian fashion",
    price: 75.99,
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=800&q=80",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80"
    ],
    category: "Fashion",
    vendor: {
      id: "v2",
      name: "Heritage Fashion ZM",
      logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&q=80",
      verified: true
    },
    rating: 4.9,
    reviewCount: 634,
    trendingScore: 95,
    views24h: 8920,
    sales24h: 189,
    searchVolume: 5670,
    socialMentions: 289,
    trendDirection: "up",
    trendPercentage: 89,
    timeframe: "6h",
    tags: ["trending", "traditional", "fashion"],
    inStock: true,
    stockQuantity: 12,
    addedToCartToday: 67,
    wishlistAdds: 145,
    shareCount: 98,
    isBreakout: true
  },
  {
    id: "trend3",
    name: "Breakout Coffee Subscription",
    description: "Zambian coffee subscription box that's rapidly gaining popularity among coffee enthusiasts",
    price: 34.99,
    images: [
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80"
    ],
    category: "Food & Beverages",
    vendor: {
      id: "v3",
      name: "Zambian Coffee Co.",
      logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&q=80",
      verified: true
    },
    rating: 4.6,
    reviewCount: 423,
    trendingScore: 92,
    views24h: 6750,
    sales24h: 145,
    searchVolume: 3420,
    socialMentions: 167,
    trendDirection: "up",
    trendPercentage: 234,
    timeframe: "7d",
    tags: ["breakout", "coffee", "subscription"],
    inStock: true,
    stockQuantity: 67,
    addedToCartToday: 45,
    wishlistAdds: 89,
    shareCount: 67,
    isBreakout: true
  },
  {
    id: "trend4",
    name: "Rising Star Skincare Kit",
    description: "Natural skincare routine using Zambian botanicals - gaining momentum in beauty circles",
    price: 89.99,
    originalPrice: 129.99,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800&q=80"
    ],
    category: "Beauty",
    vendor: {
      id: "v4",
      name: "Natural Beauty ZM",
      logo: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&q=80",
      verified: true
    },
    rating: 4.7,
    reviewCount: 289,
    trendingScore: 88,
    views24h: 5640,
    sales24h: 98,
    searchVolume: 2890,
    socialMentions: 123,
    trendDirection: "up",
    trendPercentage: 67,
    timeframe: "24h",
    tags: ["rising", "skincare", "natural"],
    inStock: true,
    stockQuantity: 34,
    addedToCartToday: 23,
    wishlistAdds: 56,
    shareCount: 34,
    isRising: true
  },
  {
    id: "trend5",
    name: "Steady Seller Craft Tools",
    description: "Traditional woodworking tools maintaining consistent popularity among artisans",
    price: 156.99,
    images: [
      "https://images.unsplash.com/photo-1580669337089-59ade28c4115?w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"
    ],
    category: "Tools",
    vendor: {
      id: "v5",
      name: "Master Craftsmen ZM",
      logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&q=80",
      verified: true
    },
    rating: 4.8,
    reviewCount: 234,
    trendingScore: 75,
    views24h: 3450,
    sales24h: 45,
    searchVolume: 1890,
    socialMentions: 67,
    trendDirection: "stable",
    trendPercentage: 0,
    timeframe: "7d",
    tags: ["steady", "tools", "craft"],
    inStock: true,
    stockQuantity: 18,
    addedToCartToday: 12,
    wishlistAdds: 28,
    shareCount: 15
  },
  {
    id: "trend6",
    name: "Declining Tech Gadget",
    description: "Previous trending item now seeing reduced interest as newer alternatives emerge",
    price: 67.99,
    originalPrice: 99.99,
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80",
      "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&q=80"
    ],
    category: "Electronics",
    vendor: {
      id: "v6",
      name: "Tech Innovators ZM",
      logo: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=100&q=80",
      verified: true
    },
    rating: 4.3,
    reviewCount: 156,
    trendingScore: 45,
    views24h: 2340,
    sales24h: 23,
    searchVolume: 890,
    socialMentions: 34,
    trendDirection: "down",
    trendPercentage: -45,
    timeframe: "24h",
    tags: ["declining", "tech", "gadget"],
    inStock: true,
    stockQuantity: 89,
    addedToCartToday: 8,
    wishlistAdds: 12,
    shareCount: 6
  }
];

export default function TrendingPage() {
  const [timeFrame, setTimeFrame] = useState<'1h' | '6h' | '24h' | '7d'>('24h');
  const [trendFilter, setTrendFilter] = useState<'all' | 'viral' | 'breakout' | 'rising'>('all');
  const [sortBy, setSortBy] = useState<'trending-score' | 'views' | 'sales' | 'mentions'>('trending-score');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // In a real app, this would fetch new data
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Filter and sort products
  const filteredProducts = trendingProducts
    .filter(product => {
      const trendMatch = trendFilter === 'all' || 
        (trendFilter === 'viral' && product.isViral) ||
        (trendFilter === 'breakout' && product.isBreakout) ||
        (trendFilter === 'rising' && product.isRising);
      return trendMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'trending-score':
          return b.trendingScore - a.trendingScore;
        case 'views':
          return b.views24h - a.views24h;
        case 'sales':
          return b.sales24h - a.sales24h;
        case 'mentions':
          return b.socialMentions - a.socialMentions;
        default:
          return b.trendingScore - a.trendingScore;
      }
    });

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up': return ArrowUp;
      case 'down': return ArrowDown;
      default: return Minus;
    }
  };

  const getTrendColor = (direction: string) => {
    switch (direction) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-slate-600/10"></div>
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
                    rotate: [0, 360]
                  }}
                  transition={{
                    scale: { duration: 2, repeat: Infinity },
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" }
                  }}
                  className="w-16 h-16 bg-gradient-to-r from-gray-700 to-slate-600 rounded-full flex items-center justify-center shadow-xl"
                >
                  <TrendingUp className="text-white text-2xl" />
                </motion.div>
                <div>
                  <h1 className="text-5xl md:text-7xl font-bold text-gray-900 flex items-center gap-3">
                    Trending Now
                    <Badge className="bg-gradient-to-r from-gray-700 to-slate-600 text-white text-lg px-4 py-2 animate-pulse">
                      <Activity className="h-4 w-4 mr-1" />
                      LIVE
                    </Badge>
                  </h1>
                  <p className="text-xl text-gray-600 mt-4">
                    Real-time trending products based on customer activity
                  </p>
                </div>
              </div>

              {/* Live Stats Dashboard */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {[
                  { 
                    label: "Total Views", 
                    value: trendingProducts.reduce((sum, p) => sum + p.views24h, 0).toLocaleString(), 
                    icon: Eye, 
                    color: "from-blue-500 to-blue-600",
                    change: "+23%"
                  },
                  { 
                    label: "Social Buzz", 
                    value: trendingProducts.reduce((sum, p) => sum + p.socialMentions, 0).toLocaleString(), 
                    icon: MessageCircle, 
                    color: "from-purple-500 to-purple-600",
                    change: "+45%"
                  },
                  { 
                    label: "Cart Adds", 
                    value: trendingProducts.reduce((sum, p) => sum + p.addedToCartToday, 0).toLocaleString(), 
                    icon: ShoppingCart, 
                    color: "from-green-500 to-green-600",
                    change: "+67%"
                  },
                  { 
                    label: "Trending Items", 
                    value: trendingProducts.filter(p => p.trendingScore > 80).length.toString(), 
                    icon: TrendingUp, 
                    color: "from-orange-500 to-orange-600",
                    change: "+12%"
                  }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                      <span>{stat.label}</span>
                      <span className="text-green-500 font-medium">{stat.change}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Live Update Indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 bg-white rounded-2xl p-4 shadow-lg border max-w-md mx-auto"
              >
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-2 bg-green-500 rounded-full"
                  />
                  <span className="text-sm">Last updated: {lastUpdate.toLocaleTimeString()}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLastUpdate(new Date())}
                    className="p-1"
                  >
                    <RefreshCw className="h-3 w-3" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl border shadow-lg p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                {/* Trend Filters */}
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Trending Categories
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      { value: 'all', label: 'All Trending', icon: BarChart3, count: trendingProducts.length },
                      { value: 'viral', label: 'Viral', icon: Flame, count: trendingProducts.filter(p => p.isViral).length },
                      { value: 'breakout', label: 'Breakout', icon: Zap, count: trendingProducts.filter(p => p.isBreakout).length },
                      { value: 'rising', label: 'Rising', icon: TrendingUp, count: trendingProducts.filter(p => p.isRising).length }
                    ].map((filter) => (
                      <Button
                        key={filter.value}
                        variant={trendFilter === filter.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTrendFilter(filter.value as any)}
                        className={`transition-all duration-200 ${
                          trendFilter === filter.value ? 'bg-gradient-to-r from-gray-700 to-slate-600 text-white' : ''
                        }`}
                      >
                        <filter.icon className="h-3 w-3 mr-1" />
                        {filter.label} ({filter.count})
                      </Button>
                    ))}
                  </div>

                  {/* Time Frame Filter */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Time Frame:</h4>
                    <div className="flex gap-2">
                      {[
                        { value: '1h', label: '1 Hour' },
                        { value: '6h', label: '6 Hours' },
                        { value: '24h', label: '24 Hours' },
                        { value: '7d', label: '7 Days' }
                      ].map((time) => (
                        <Button
                          key={time.value}
                          variant={timeFrame === time.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTimeFrame(time.value as any)}
                          className="text-xs"
                        >
                          {time.label}
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
                      <option value="trending-score">Trending Score</option>
                      <option value="views">Most Viewed</option>
                      <option value="sales">Most Sales</option>
                      <option value="mentions">Social Buzz</option>
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

        {/* Trending Products Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Trending Products ({filteredProducts.length})
              </h2>
              <div className="text-sm text-gray-600">
                Real-time data • Updates every 30 seconds
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}
            >
              {filteredProducts.map((product, index) => {
                const TrendIcon = getTrendIcon(product.trendDirection);
                const trendColor = getTrendColor(product.trendDirection);
                
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
                      {/* Trending Badges */}
                      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1">
                        <Badge className="bg-gradient-to-r from-gray-700 to-slate-600 text-white px-3 py-1">
                          <BarChart3 className="h-3 w-3 mr-1" />
                          #{product.trendingScore}
                        </Badge>
                        {product.isViral && (
                          <Badge className="bg-red-500 text-white px-2 py-1 text-xs animate-pulse">
                            <Flame className="h-2.5 w-2.5 mr-1" />
                            Viral
                          </Badge>
                        )}
                        {product.isBreakout && (
                          <Badge className="bg-yellow-500 text-white px-2 py-1 text-xs">
                            <Zap className="h-2.5 w-2.5 mr-1" />
                            Breakout
                          </Badge>
                        )}
                        {product.isRising && (
                          <Badge className="bg-green-500 text-white px-2 py-1 text-xs">
                            <TrendingUp className="h-2.5 w-2.5 mr-1" />
                            Rising
                          </Badge>
                        )}
                      </div>

                      {/* Trend Indicator */}
                      <div className="absolute top-4 right-4 z-20">
                        <div className={`bg-white rounded-full p-2 shadow-lg ${trendColor}`}>
                          <TrendIcon className="h-4 w-4" />
                          <span className="text-xs font-bold">
                            {product.trendPercentage > 0 ? '+' : ''}{product.trendPercentage}%
                          </span>
                        </div>
                      </div>

                      {/* Product Image */}
                      <div className={`relative ${viewMode === 'grid' ? 'aspect-square' : 'aspect-[4/3]'} bg-gray-100 overflow-hidden`}>
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Quick Actions */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300">
                          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 bg-white/90 backdrop-blur-sm border-0 hover:bg-white"
                              >
                                <Heart className="h-4 w-4 mr-1" />
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 bg-white/90 backdrop-blur-sm border-0 hover:bg-white"
                              >
                                <Share2 className="h-4 w-4 mr-1" />
                                Share
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        {/* Vendor Info */}
                        <div className="flex items-center gap-2 mb-3">
                          <Image
                            src={product.vendor.logo}
                            alt={product.vendor.name}
                            width={20}
                            height={20}
                            className="rounded-full object-cover"
                          />
                          <span className="text-sm font-medium text-gray-700 truncate">{product.vendor.name}</span>
                          {product.vendor.verified && (
                            <Award className="h-3 w-3 text-blue-500" />
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="mb-4">
                          <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>
                          {viewMode === 'list' && (
                            <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                              {product.description}
                            </p>
                          )}
                        </div>

                        {/* Trending Stats */}
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3 text-blue-500" />
                              <span>{product.views24h.toLocaleString()} views</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ShoppingBag className="h-3 w-3 text-green-500" />
                              <span>{product.sales24h} sales</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3 text-purple-500" />
                              <span>{product.socialMentions} mentions</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="h-3 w-3 text-orange-500" />
                              <span>{product.searchVolume} searches</span>
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl font-bold text-gray-900">
                            K{product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              K{product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Rating and Engagement */}
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{product.rating}</span>
                            <span>({product.reviewCount})</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs">
                            <div className="flex items-center gap-1">
                              <ShoppingCart className="h-3 w-3" />
                              <span>{product.addedToCartToday}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              <span>{product.wishlistAdds}</span>
                            </div>
                          </div>
                        </div>

                        {/* Stock Alert */}
                        {product.stockQuantity <= 25 && (
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 mb-3">
                            <p className="text-xs text-orange-700 font-medium flex items-center gap-1">
                              <Timer className="h-3 w-3" />
                              Only {product.stockQuantity} left - Trending fast!
                            </p>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 bg-gradient-to-r from-gray-700 to-slate-600 hover:from-gray-800 hover:to-slate-700 text-white font-semibold"
                            disabled={!product.inStock}
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </Button>
                          <Button
                            variant="outline"
                            className="px-3 border-gray-300 hover:border-gray-500 hover:text-gray-700"
                            asChild
                          >
                            <Link href={`/products/${product.id}`}>
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>

                        {/* Real-time Activity */}
                        <div className="mt-3 text-center">
                          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="w-1.5 h-1.5 bg-green-500 rounded-full"
                            />
                            <span>{Math.floor(Math.random() * 20) + 5} people viewing right now</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No trending items found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters to see more trending products
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
