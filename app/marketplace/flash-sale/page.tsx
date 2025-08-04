"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Clock,
  Flame,
  Zap,
  Timer,
  TrendingUp,
  AlertTriangle,
  Share2,
  ExternalLink,
  Bell,
  Tag,
  Percent,
  Gift,
  Calendar
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FlashSaleProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
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
  discountPercentage: number;
  saleEndTime: Date;
  stockQuantity: number;
  soldCount: number;
  maxStock: number;
  views: number;
  isLimitedStock: boolean;
  flashSaleType: "lightning" | "daily" | "weekend" | "mega";
  priority: number;
}

const flashSaleProducts: FlashSaleProduct[] = [
  {
    id: "fs1",
    name: "Premium Gaming Headset Pro Max",
    description: "Professional wireless gaming headset with 7.1 surround sound and RGB lighting",
    price: 79.99,
    originalPrice: 149.99,
    images: [
      "https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80"
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
    discountPercentage: 47,
    saleEndTime: new Date(Date.now() + 2 * 60 * 60 * 1000 + 34 * 60 * 1000), // 2h 34m from now
    stockQuantity: 23,
    soldCount: 177,
    maxStock: 200,
    views: 15420,
    isLimitedStock: true,
    flashSaleType: "lightning",
    priority: 1
  },
  {
    id: "fs2",
    name: "Smart Fitness Tracker Pro",
    description: "Advanced fitness tracker with heart rate monitoring and GPS tracking",
    price: 159.99,
    originalPrice: 299.99,
    images: [
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80"
    ],
    category: "Electronics",
    vendor: {
      id: "v2",
      name: "FitTech Zambia",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&q=80",
      verified: true
    },
    rating: 4.7,
    reviewCount: 892,
    discountPercentage: 47,
    saleEndTime: new Date(Date.now() + 5 * 60 * 60 * 1000 + 15 * 60 * 1000), // 5h 15m from now
    stockQuantity: 15,
    soldCount: 85,
    maxStock: 100,
    views: 12380,
    isLimitedStock: true,
    flashSaleType: "daily",
    priority: 2
  },
  {
    id: "fs3",
    name: "Traditional Chitenge Fashion Set",
    description: "Beautiful handmade chitenge outfit perfect for special occasions",
    price: 65.99,
    originalPrice: 119.99,
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=800&q=80",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80"
    ],
    category: "Fashion",
    vendor: {
      id: "v3",
      name: "Heritage Fashion ZM",
      logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&q=80",
      verified: true
    },
    rating: 4.9,
    reviewCount: 634,
    discountPercentage: 45,
    saleEndTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000), // 1d 8h from now
    stockQuantity: 12,
    soldCount: 38,
    maxStock: 50,
    views: 8920,
    isLimitedStock: true,
    flashSaleType: "weekend",
    priority: 3
  },
  {
    id: "fs4",
    name: "Premium Coffee Bean Collection",
    description: "Single-origin Zambian coffee beans, expertly roasted for perfect flavor",
    price: 24.99,
    originalPrice: 44.99,
    images: [
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80"
    ],
    category: "Food & Beverages",
    vendor: {
      id: "v4",
      name: "Zambian Coffee Co.",
      logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&q=80",
      verified: true
    },
    rating: 4.6,
    reviewCount: 423,
    discountPercentage: 44,
    saleEndTime: new Date(Date.now() + 6 * 60 * 60 * 1000 + 30 * 60 * 1000), // 6h 30m from now
    stockQuantity: 67,
    soldCount: 133,
    maxStock: 200,
    views: 6750,
    isLimitedStock: false,
    flashSaleType: "daily",
    priority: 4
  },
  {
    id: "fs5",
    name: "Handwoven Basket Collection",
    description: "Set of 3 traditional handwoven baskets for storage and decoration",
    price: 45.99,
    originalPrice: 79.99,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
    ],
    category: "Home & Garden",
    vendor: {
      id: "v5",
      name: "Craft Collective ZM",
      logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&q=80",
      verified: true
    },
    rating: 4.8,
    reviewCount: 298,
    discountPercentage: 43,
    saleEndTime: new Date(Date.now() + 3 * 60 * 60 * 1000 + 45 * 60 * 1000), // 3h 45m from now
    stockQuantity: 34,
    soldCount: 66,
    maxStock: 100,
    views: 5640,
    isLimitedStock: false,
    flashSaleType: "mega",
    priority: 5
  }
];

const saleTypeConfig = {
  lightning: { color: "from-red-500 to-orange-500", icon: Zap, label: "Lightning Deal" },
  daily: { color: "from-blue-500 to-purple-500", icon: Calendar, label: "Daily Deal" },
  weekend: { color: "from-green-500 to-teal-500", icon: Gift, label: "Weekend Special" },
  mega: { color: "from-purple-500 to-pink-500", icon: Flame, label: "Mega Sale" }
};

function useCountdown(endTime: Date) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          hours: Math.floor(distance / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return timeLeft;
}

export default function FlashSalePage() {
  const [filterType, setFilterType] = useState<"all" | "lightning" | "daily" | "weekend" | "mega">("all");
  const [sortBy, setSortBy] = useState<"priority" | "discount" | "time" | "popularity">("priority");

  // Filter and sort products
  const filteredProducts = flashSaleProducts
    .filter(product => filterType === "all" || product.flashSaleType === filterType)
    .sort((a, b) => {
      switch (sortBy) {
        case "discount":
          return b.discountPercentage - a.discountPercentage;
        case "time":
          return a.saleEndTime.getTime() - b.saleEndTime.getTime();
        case "popularity":
          return b.views - a.views;
        default:
          return a.priority - b.priority;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                  className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Flame className="text-white text-2xl" />
                </motion.div>
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 flex items-center gap-3">
                    🔥 Flash Sale
                    <Badge className="bg-red-500 text-white text-lg px-4 py-2 animate-pulse">
                      LIVE
                    </Badge>
                  </h1>
                  <p className="text-xl text-gray-600 mt-2">
                    Limited time offers with massive savings!
                  </p>
                </div>
              </div>

              {/* Sale Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { label: "Active Deals", value: flashSaleProducts.length, icon: Tag },
                  { label: "Max Savings", value: "47%", icon: Percent },
                  { label: "Happy Customers", value: "2.5K+", icon: Star },
                  { label: "Limited Stock", value: "85%", icon: AlertTriangle }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-4 shadow-lg border"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="h-8 w-8 text-red-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl border shadow-lg p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                {/* Sale Type Filters */}
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Flame className="h-4 w-4" />
                    Sale Types
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={filterType === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterType("all")}
                      className="transition-all duration-200"
                    >
                      All Deals ({flashSaleProducts.length})
                    </Button>
                    {Object.entries(saleTypeConfig).map(([type, config]) => {
                      const count = flashSaleProducts.filter(p => p.flashSaleType === type).length;
                      return (
                        <Button
                          key={type}
                          variant={filterType === type ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilterType(type as any)}
                          className={`transition-all duration-200 ${
                            filterType === type ? `bg-gradient-to-r ${config.color} text-white` : ''
                          }`}
                        >
                          <config.icon className="h-3 w-3 mr-1" />
                          {config.label} ({count})
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Sort Options */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="text-sm border rounded-lg px-3 py-1 bg-white"
                    >
                      <option value="priority">Featured First</option>
                      <option value="discount">Biggest Discount</option>
                      <option value="time">Ending Soon</option>
                      <option value="popularity">Most Popular</option>
                    </select>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Bell className="h-4 w-4 mr-1" />
                    Set Alerts
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Flash Sale Products */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product, index) => (
                <FlashSaleCard key={product.id} product={product} index={index} />
              ))}
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Flame className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No flash sales found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters or check back later for new deals
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

function FlashSaleCard({ product, index }: { product: FlashSaleProduct; index: number }) {
  const timeLeft = useCountdown(product.saleEndTime);
  const config = saleTypeConfig[product.flashSaleType];
  const stockProgress = ((product.maxStock - product.stockQuantity) / product.maxStock) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white">
        {/* Sale Type Badge */}
        <div className="absolute top-4 left-4 z-20">
          <Badge className={`bg-gradient-to-r ${config.color} text-white px-3 py-1 text-xs font-semibold`}>
            <config.icon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
        </div>

        {/* Discount Badge */}
        <div className="absolute top-4 right-4 z-20">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-sm shadow-lg"
          >
            -{product.discountPercentage}%
          </motion.div>
        </div>

        {/* Product Image */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Overlay with quick actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
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
          {/* Countdown Timer */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-3 mb-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Timer className="h-4 w-4" />
              <span className="text-sm font-medium">Sale ends in:</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-lg font-bold">
              <div className="bg-white/20 rounded px-2 py-1 min-w-[3rem]">
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
              <span>:</span>
              <div className="bg-white/20 rounded px-2 py-1 min-w-[3rem]">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
              <span>:</span>
              <div className="bg-white/20 rounded px-2 py-1 min-w-[3rem]">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="mb-4">
            <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-red-600">
              K{product.price.toFixed(2)}
            </span>
            <span className="text-lg text-gray-400 line-through">
              K{product.originalPrice.toFixed(2)}
            </span>
            <Badge className="bg-green-100 text-green-700 ml-auto">
              Save K{(product.originalPrice - product.price).toFixed(2)}
            </Badge>
          </div>

          {/* Rating and Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-medium">{product.rating}</span>
              <span>({product.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{product.views.toLocaleString()} views</span>
            </div>
          </div>

          {/* Stock Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">
                {product.isLimitedStock ? "⚡ Limited Stock" : "Available Stock"}
              </span>
              <span className="font-medium text-gray-900">
                {product.stockQuantity} left
              </span>
            </div>
            <Progress 
              value={stockProgress} 
              className="h-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              {product.soldCount} sold • {product.maxStock - product.soldCount} remaining
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button 
              className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-3"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy Now
            </Button>
            <Button
              variant="outline"
              className="px-4 py-3 border-gray-300 hover:border-red-500 hover:text-red-500"
              asChild
            >
              <Link href={`/products/${product.id}`}>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Urgency Indicator */}
          {product.isLimitedStock && (
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-3 text-center"
            >
              <Badge className="bg-red-100 text-red-700 text-xs px-3 py-1">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Limited Stock - Act Fast!
              </Badge>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
