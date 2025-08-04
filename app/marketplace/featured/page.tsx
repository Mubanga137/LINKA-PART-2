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
  Eye,
  Clock,
  Flame,
  Crown,
  Award,
  TrendingUp,
  Filter,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  Timer,
  Share2,
  ExternalLink
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FeaturedProduct {
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
  discountPercentage?: number;
  isTimeLimited?: boolean;
  timeLeft?: string;
  tags: string[];
  featured: boolean;
  hotTrend?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  views: number;
  soldCount: number;
}

const featuredProducts: FeaturedProduct[] = [
  {
    id: "f1",
    name: "Premium Wireless Gaming Headset",
    description: "Professional gaming headset with 7.1 surround sound, noise cancellation, and RGB lighting for the ultimate gaming experience",
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
    discountPercentage: 40,
    isTimeLimited: true,
    timeLeft: "2h 15m",
    tags: ["gaming", "wireless", "premium"],
    featured: true,
    hotTrend: true,
    views: 15420,
    soldCount: 342
  },
  {
    id: "f2",
    name: "Traditional Chitenge Evening Dress",
    description: "Elegant handcrafted chitenge evening dress perfect for special occasions, featuring authentic Zambian patterns",
    price: 125.99,
    originalPrice: 189.99,
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
    discountPercentage: 34,
    tags: ["traditional", "chitenge", "evening wear"],
    featured: true,
    bestSeller: true,
    views: 8920,
    soldCount: 189
  },
  {
    id: "f3",
    name: "Smart Fitness Tracker Pro",
    description: "Advanced fitness tracker with heart rate monitoring, GPS tracking, and 10-day battery life",
    price: 199.99,
    originalPrice: 299.99,
    images: [
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80"
    ],
    category: "Electronics",
    vendor: {
      id: "v3",
      name: "FitTech Zambia",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&q=80",
      verified: true
    },
    rating: 4.7,
    reviewCount: 892,
    discountPercentage: 33,
    isTimeLimited: true,
    timeLeft: "1d 8h",
    tags: ["fitness", "smart", "health"],
    featured: true,
    newArrival: true,
    views: 12380,
    soldCount: 256
  },
  {
    id: "f4",
    name: "Handwoven African Basket Collection",
    description: "Beautiful set of 3 traditional handwoven baskets perfect for storage and home decoration",
    price: 75.99,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
    ],
    category: "Home & Garden",
    vendor: {
      id: "v4",
      name: "Craft Collective ZM",
      logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&q=80",
      verified: true
    },
    rating: 4.8,
    reviewCount: 298,
    tags: ["handmade", "baskets", "traditional"],
    featured: true,
    views: 5640,
    soldCount: 87
  },
  {
    id: "f5",
    name: "Premium Zambian Coffee Beans",
    description: "Single-origin coffee beans from Northern Zambia, expertly roasted for the perfect cup",
    price: 34.99,
    originalPrice: 49.99,
    images: [
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80"
    ],
    category: "Food & Beverages",
    vendor: {
      id: "v5",
      name: "Zambian Coffee Co.",
      logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&q=80",
      verified: true
    },
    rating: 4.6,
    reviewCount: 423,
    discountPercentage: 30,
    tags: ["coffee", "organic", "local"],
    featured: true,
    hotTrend: true,
    views: 6750,
    soldCount: 145
  },
  {
    id: "f6",
    name: "Luxury Copper Jewelry Set",
    description: "Handcrafted copper jewelry set featuring traditional Zambian designs with modern elegance",
    price: 156.99,
    originalPrice: 229.99,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80"
    ],
    category: "Jewelry",
    vendor: {
      id: "v6",
      name: "Copper Craft Masters",
      logo: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&q=80",
      verified: true
    },
    rating: 4.9,
    reviewCount: 156,
    discountPercentage: 32,
    isTimeLimited: true,
    timeLeft: "6h 42m",
    tags: ["jewelry", "copper", "luxury"],
    featured: true,
    bestSeller: true,
    views: 4230,
    soldCount: 67
  }
];

export default function FeaturedProductsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'featured' | 'price' | 'rating' | 'newest'>('featured');
  const [filterBy, setFilterBy] = useState<'all' | 'time-limited' | 'hot-trend' | 'best-seller'>('all');

  // Auto-play hero carousel
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  // Filter and sort products
  const filteredProducts = featuredProducts
    .filter(product => {
      switch (filterBy) {
        case 'time-limited':
          return product.isTimeLimited;
        case 'hot-trend':
          return product.hotTrend;
        case 'best-seller':
          return product.bestSeller;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.views - a.views;
        default:
          return b.soldCount - a.soldCount;
      }
    });

  const heroProducts = featuredProducts.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section with Featured Carousel */}
        <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Crown className="text-white text-xl" />
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Featured Products
                </h1>
              </div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Handpicked premium items from our top-rated vendors
              </p>
            </motion.div>

            {/* Hero Carousel */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8">
              <div className="aspect-[21/9] relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-transparent"
                  >
                    <Image
                      src={heroProducts[currentSlide]?.images[0] || ""}
                      alt={heroProducts[currentSlide]?.name || ""}
                      fill
                      className="object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent">
                      <div className="h-full flex items-center px-8 md:px-16">
                        <div className="max-w-2xl text-white">
                          <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-2 mb-4"
                          >
                            {heroProducts[currentSlide]?.hotTrend && (
                              <Badge className="bg-red-500 text-white">
                                <Flame className="h-3 w-3 mr-1" />
                                Hot Trend
                              </Badge>
                            )}
                            {heroProducts[currentSlide]?.isTimeLimited && (
                              <Badge className="bg-orange-500 text-white">
                                <Timer className="h-3 w-3 mr-1" />
                                {heroProducts[currentSlide]?.timeLeft} left
                              </Badge>
                            )}
                            <Badge className="bg-yellow-500 text-white">
                              <Crown className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          </motion.div>
                          
                          <motion.h2
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl md:text-4xl font-bold mb-4"
                          >
                            {heroProducts[currentSlide]?.name}
                          </motion.h2>
                          
                          <motion.p
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg text-gray-200 mb-6"
                          >
                            {heroProducts[currentSlide]?.description}
                          </motion.p>
                          
                          <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-4 mb-6"
                          >
                            <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-bold text-yellow-400">
                                K{heroProducts[currentSlide]?.price.toFixed(2)}
                              </span>
                              {heroProducts[currentSlide]?.originalPrice && (
                                <span className="text-lg text-gray-300 line-through">
                                  K{heroProducts[currentSlide]?.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            {heroProducts[currentSlide]?.discountPercentage && (
                              <Badge className="bg-green-500 text-white text-lg px-3 py-1">
                                -{heroProducts[currentSlide]?.discountPercentage}% OFF
                              </Badge>
                            )}
                          </motion.div>
                          
                          <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex gap-4"
                          >
                            <Button
                              size="lg"
                              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3"
                            >
                              <ShoppingCart className="h-5 w-5 mr-2" />
                              Add to Cart
                            </Button>
                            <Button
                              size="lg"
                              variant="outline"
                              className="border-white text-white hover:bg-white hover:text-gray-900"
                              asChild
                            >
                              <Link href={`/products/${heroProducts[currentSlide]?.id}`}>
                                View Details
                                <ExternalLink className="h-4 w-4 ml-2" />
                              </Link>
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Carousel Controls */}
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl border shadow-sm p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                {/* Filter Options */}
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter Featured Products
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'all', label: 'All Featured', icon: Crown },
                      { value: 'time-limited', label: 'Time Limited', icon: Timer },
                      { value: 'hot-trend', label: 'Hot Trending', icon: Flame },
                      { value: 'best-seller', label: 'Best Sellers', icon: Award }
                    ].map((filter) => (
                      <Button
                        key={filter.value}
                        variant={filterBy === filter.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterBy(filter.value as any)}
                        className="transition-all duration-200"
                      >
                        <filter.icon className="h-3 w-3 mr-1" />
                        {filter.label}
                      </Button>
                    ))}
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
                      <option value="featured">Most Featured</option>
                      <option value="price">Price: Low to High</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Most Popular</option>
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

        {/* Products Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {filterBy === 'all' ? 'All Featured Products' : 
                 filterBy === 'time-limited' ? 'Time Limited Offers' :
                 filterBy === 'hot-trend' ? 'Hot Trending Items' :
                 'Best Selling Products'} ({filteredProducts.length})
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="relative">
                      <div className={`${viewMode === 'grid' ? 'aspect-square' : 'aspect-[4/3]'} bg-gray-100 overflow-hidden`}>
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1">
                          <Badge className="bg-yellow-500 text-white">
                            <Crown className="h-2.5 w-2.5 mr-1" />
                            Featured
                          </Badge>
                          {product.hotTrend && (
                            <Badge className="bg-red-500 text-white animate-pulse">
                              <Flame className="h-2.5 w-2.5 mr-1" />
                              Hot
                            </Badge>
                          )}
                          {product.newArrival && (
                            <Badge className="bg-blue-500 text-white">
                              New
                            </Badge>
                          )}
                          {product.bestSeller && (
                            <Badge className="bg-green-500 text-white">
                              <Award className="h-2.5 w-2.5 mr-1" />
                              Best Seller
                            </Badge>
                          )}
                          {product.discountPercentage && (
                            <Badge className="bg-orange-500 text-white">
                              -{product.discountPercentage}%
                            </Badge>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-8 h-8 bg-white/90 backdrop-blur-sm border-0 hover:bg-white"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-8 h-8 bg-white/90 backdrop-blur-sm border-0 hover:bg-white"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Time limited countdown */}
                        {product.isTimeLimited && (
                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center justify-center gap-1">
                              <Timer className="h-3 w-3" />
                              {product.timeLeft} remaining
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="mb-2">
                        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                        {viewMode === 'list' && (
                          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                            {product.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl font-bold text-blue-600">
                          K{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            K{product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{product.rating}</span>
                          <span>({product.reviewCount})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{product.views.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          asChild
                        >
                          <Link href={`/products/${product.id}`}>
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No featured products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters to see more products
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
