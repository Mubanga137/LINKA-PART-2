"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  TrendingUp,
  Flame,
  Zap,
  Timer,
  Users,
  Award,
  ThumbsUp,
  Share2,
  ExternalLink,
  Play,
  Clock,
  MapPin,
  Truck,
  Shield,
  ChevronDown
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
  views: number;
  purchaseCount: number;
  trendingScore: number;
  discountPercentage?: number;
  fastDelivery: boolean;
  freeShipping: boolean;
  inStock: boolean;
  stockQuantity: number;
  tags: string[];
  lastSold: string;
  location: string;
  hasVideo?: boolean;
  isHotTrend?: boolean;
  isNewArrival?: boolean;
  isLimitedStock?: boolean;
}

const trendingProducts: TrendingProduct[] = [
  {
    id: "t1",
    name: "Wireless Gaming Headset Pro Max",
    description: "Professional gaming headset with 7.1 surround sound, noise cancellation, and RGB lighting",
    price: 89.99,
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
    views: 15420,
    purchaseCount: 342,
    trendingScore: 98,
    discountPercentage: 40,
    fastDelivery: true,
    freeShipping: true,
    inStock: true,
    stockQuantity: 23,
    tags: ["gaming", "wireless", "premium"],
    lastSold: "2 minutes ago",
    location: "Lusaka",
    hasVideo: true,
    isHotTrend: true
  },
  {
    id: "t2",
    name: "Smart Fitness Tracker Pro",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, and 10-day battery life",
    price: 199.99,
    originalPrice: 299.99,
    images: [
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80"
    ],
    category: "Fitness",
    vendor: {
      id: "v2",
      name: "FitTech Zambia",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&q=80",
      verified: true
    },
    rating: 4.7,
    reviewCount: 892,
    views: 12380,
    purchaseCount: 256,
    trendingScore: 95,
    discountPercentage: 33,
    fastDelivery: true,
    freeShipping: true,
    inStock: true,
    stockQuantity: 45,
    tags: ["fitness", "smart", "health"],
    lastSold: "5 minutes ago",
    location: "Kitwe",
    isNewArrival: true
  },
  {
    id: "t3",
    name: "Traditional Chitenge Outfit Set",
    description: "Beautiful handmade chitenge outfit with matching accessories, celebrating Zambian heritage",
    price: 65.99,
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
    views: 8920,
    purchaseCount: 189,
    trendingScore: 92,
    fastDelivery: false,
    freeShipping: true,
    inStock: true,
    stockQuantity: 12,
    tags: ["traditional", "handmade", "chitenge"],
    lastSold: "1 hour ago",
    location: "Ndola",
    isLimitedStock: true
  },
  {
    id: "t4",
    name: "Premium Coffee Beans - Zambian Grown",
    description: "Single-origin coffee beans from the hills of Northern Zambia, roasted to perfection",
    price: 24.99,
    originalPrice: 34.99,
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
    views: 6750,
    purchaseCount: 145,
    trendingScore: 89,
    discountPercentage: 29,
    fastDelivery: true,
    freeShipping: false,
    inStock: true,
    stockQuantity: 67,
    tags: ["coffee", "organic", "local"],
    lastSold: "30 minutes ago",
    location: "Solwezi",
    isHotTrend: true
  },
  {
    id: "t5",
    name: "Handwoven Basket Collection",
    description: "Set of 3 traditional handwoven baskets perfect for storage and home decoration",
    price: 45.99,
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
    views: 5640,
    purchaseCount: 87,
    trendingScore: 86,
    fastDelivery: false,
    freeShipping: true,
    inStock: true,
    stockQuantity: 34,
    tags: ["handmade", "baskets", "traditional"],
    lastSold: "3 hours ago",
    location: "Livingstone"
  }
];

interface TrendingNowSectionProps {
  onAddToCart?: (product: TrendingProduct) => void;
  onToggleWishlist?: (productId: string) => void;
  wishlistedItems?: Set<string>;
}

export function TrendingNowSection({ onAddToCart, onToggleWishlist, wishlistedItems = new Set() }: TrendingNowSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'trending' | 'hot' | 'new'>('trending');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  const x = useTransform(scrollXProgress, [0, 1], [0, -100]);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trendingProducts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  // Filter products based on view mode
  const filteredProducts = trendingProducts.filter(product => {
    switch (viewMode) {
      case 'hot':
        return product.isHotTrend;
      case 'new':
        return product.isNewArrival;
      default:
        return true;
    }
  }).sort((a, b) => b.trendingScore - a.trendingScore);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);
  };

  const handleAddToCart = (product: TrendingProduct) => {
    onAddToCart?.(product);
  };

  const handleToggleWishlist = (productId: string) => {
    onToggleWishlist?.(productId);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="py-16 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <TrendingUp className="text-white text-xl" />
            </motion.div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                Trending Now
                <Badge className="bg-orange-500 text-white animate-pulse">
                  <Flame className="h-3 w-3 mr-1" />
                  HOT
                </Badge>
              </h2>
              <p className="text-gray-600">Most popular products right now</p>
            </div>
          </div>

          {/* View Mode Toggles */}
          <div className="flex items-center gap-2">
            {[
              { key: 'trending', label: 'Trending', icon: TrendingUp },
              { key: 'hot', label: 'Hot', icon: Flame },
              { key: 'new', label: 'New', icon: Zap }
            ].map(({ key, label, icon: Icon }) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={viewMode === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode(key as any)}
                  className={`transition-all duration-300 ${
                    viewMode === key 
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg" 
                      : "hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-1" />
                  {label}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Live Stats Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl border shadow-sm p-4 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-3 h-3 bg-green-500 rounded-full"
                />
                <span className="text-sm font-medium text-gray-900">
                  {filteredProducts.reduce((sum, p) => sum + p.views, 0).toLocaleString()} views today
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-gray-600">
                  {filteredProducts.reduce((sum, p) => sum + p.purchaseCount, 0)} sold this week
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-500" />
                <span className="text-sm text-gray-600">
                  {Math.floor(Math.random() * 500) + 200} people viewing
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Updated live</span>
            </div>
          </div>
        </motion.div>

        {/* Main Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 z-10">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </motion.div>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-10">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </motion.div>
          </div>

          {/* Carousel Container */}
          <div 
            ref={containerRef}
            className="overflow-hidden rounded-2xl"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {filteredProducts.map((product, index) => (
                <div key={product.id} className="w-full flex-shrink-0">
                  <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-2xl border shadow-lg overflow-hidden">
                    {/* Product Images */}
                    <div className="relative group">
                      <div className="aspect-square bg-gray-100 overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={600}
                          height={600}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Overlay Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {product.isHotTrend && (
                            <Badge className="bg-red-500 text-white px-3 py-1 animate-pulse">
                              <Flame className="h-3 w-3 mr-1" />
                              Hot Trend
                            </Badge>
                          )}
                          {product.isNewArrival && (
                            <Badge className="bg-blue-500 text-white px-3 py-1">
                              <Zap className="h-3 w-3 mr-1" />
                              New Arrival
                            </Badge>
                          )}
                          {product.discountPercentage && (
                            <Badge className="bg-green-500 text-white px-3 py-1">
                              -{product.discountPercentage}% OFF
                            </Badge>
                          )}
                          {product.isLimitedStock && (
                            <Badge className="bg-orange-500 text-white px-3 py-1 animate-bounce">
                              <Timer className="h-3 w-3 mr-1" />
                              Limited Stock
                            </Badge>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleToggleWishlist(product.id)}
                            className={`w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border-0 shadow-lg ${
                              wishlistedItems.has(product.id) 
                                ? 'text-red-500 bg-red-50' 
                                : 'hover:text-red-500'
                            }`}
                          >
                            <Heart className={`h-5 w-5 ${wishlistedItems.has(product.id) ? 'fill-current' : ''}`} />
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:text-blue-500"
                          >
                            <Share2 className="h-5 w-5" />
                          </Button>
                          
                          {product.hasVideo && (
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:text-green-500"
                            >
                              <Play className="h-5 w-5" />
                            </Button>
                          )}
                        </div>

                        {/* Trending Score */}
                        <div className="absolute bottom-4 left-4">
                          <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                            <TrendingUp className="h-3 w-3" />
                            Trending #{product.trendingScore}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-6 lg:p-8 flex flex-col justify-between">
                      <div className="space-y-4">
                        {/* Vendor Info */}
                        <div className="flex items-center gap-3">
                          <Image
                            src={product.vendor.logo}
                            alt={product.vendor.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">{product.vendor.name}</span>
                              {product.vendor.verified && (
                                <Badge className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5">
                                  <Shield className="h-2.5 w-2.5 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MapPin className="h-3 w-3" />
                              <span>{product.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Product Title & Description */}
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                          <span className="text-3xl font-bold text-orange-600">
                            K{product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-lg text-gray-400 line-through">
                              K{product.originalPrice.toFixed(2)}
                            </span>
                          )}
                          {product.discountPercentage && (
                            <Badge className="bg-green-100 text-green-700">
                              Save {product.discountPercentage}%
                            </Badge>
                          )}
                        </div>

                        {/* Rating & Social Proof */}
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="font-medium">{product.rating}</span>
                            <span className="text-gray-500">({product.reviewCount} reviews)</span>
                          </div>
                          
                          <div className="flex items-center gap-1 text-gray-500">
                            <Eye className="h-4 w-4" />
                            <span>{product.views.toLocaleString()} views</span>
                          </div>
                        </div>

                        {/* Live Activity */}
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-green-600">
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="w-2 h-2 bg-green-500 rounded-full"
                              />
                              <span>Last sold: {product.lastSold}</span>
                            </div>
                            <div className="text-gray-500">
                              {product.stockQuantity} left in stock
                            </div>
                          </div>
                        </div>

                        {/* Delivery Info */}
                        <div className="flex items-center gap-4 text-sm">
                          {product.fastDelivery && (
                            <div className="flex items-center gap-1 text-green-600">
                              <Truck className="h-4 w-4" />
                              <span>Fast delivery</span>
                            </div>
                          )}
                          {product.freeShipping && (
                            <div className="flex items-center gap-1 text-blue-600">
                              <Shield className="h-4 w-4" />
                              <span>Free shipping</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-6">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1"
                        >
                          <Button
                            onClick={() => handleAddToCart(product)}
                            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            Add to Cart
                          </Button>
                        </motion.div>
                        
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="outline"
                            className="px-6 py-3 border-2 border-gray-300 hover:border-orange-500 hover:text-orange-500"
                            asChild
                          >
                            <Link href={`/products/${product.id}`}>
                              View Details
                              <ExternalLink className="h-4 w-4 ml-2" />
                            </Link>
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {filteredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-orange-500 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-xl font-semibold"
              asChild
            >
              <Link href="/trending">
                View All Trending Products
                <TrendingUp className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
