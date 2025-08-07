"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Sparkles,
  Brain,
  Target,
  TrendingUp,
  Clock,
  RefreshCw,
  Filter,
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  X,
  ChevronRight,
  User,
  Users,
  MapPin,
  Truck,
  Shield,
  Award,
  Zap,
  Store
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RecommendedProduct {
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
  fastDelivery: boolean;
  freeShipping: boolean;
  inStock: boolean;
  recommendationReason: string;
  matchScore: number;
  viewedAt?: string;
  similarUsers?: number;
  location: string;
  tags: string[];
}

interface UserProfile {
  categories: string[];
  priceRange: [number, number];
  location: string;
  previousPurchases: string[];
  wishlist: string[];
  recentViews: string[];
}

const mockUserProfile: UserProfile = {
  categories: ["Electronics", "Gaming", "Fashion"],
  priceRange: [20, 200],
  location: "Lusaka",
  previousPurchases: ["gaming-headset", "smartphone", "chitenge-dress"],
  wishlist: ["laptop", "smartwatch", "traditional-crafts"],
  recentViews: ["wireless-mouse", "gaming-chair", "coffee-beans"]
};

const recommendedProducts: RecommendedProduct[] = [
  {
    id: "r1",
    name: "Wireless Gaming Mouse Pro",
    description: "High-precision wireless gaming mouse with RGB lighting and programmable buttons",
    price: 45.99,
    originalPrice: 69.99,
    images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80"],
    category: "Gaming",
    vendor: {
      id: "v1",
      name: "Gaming World ZM",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&q=80",
      verified: true
    },
    rating: 4.7,
    reviewCount: 342,
    discountPercentage: 34,
    fastDelivery: true,
    freeShipping: true,
    inStock: true,
    recommendationReason: "Based on your gaming setup purchases",
    matchScore: 95,
    viewedAt: "2 days ago",
    similarUsers: 847,
    location: "Lusaka",
    tags: ["gaming", "wireless", "rgb"]
  },
  {
    id: "r2",
    name: "Smart Fitness Band",
    description: "Advanced fitness tracker with heart rate monitoring and sleep tracking",
    price: 89.99,
    originalPrice: 129.99,
    images: ["https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80"],
    category: "Electronics",
    vendor: {
      id: "v2",
      name: "FitTech Zambia",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&q=80",
      verified: true
    },
    rating: 4.6,
    reviewCount: 189,
    discountPercentage: 31,
    fastDelivery: true,
    freeShipping: true,
    inStock: true,
    recommendationReason: "Popular in your area",
    matchScore: 88,
    similarUsers: 523,
    location: "Lusaka",
    tags: ["fitness", "health", "smart"]
  },
  {
    id: "r3",
    name: "Traditional Mukenge Fabric",
    description: "Authentic traditional fabric perfect for special occasions and ceremonies",
    price: 34.99,
    images: ["https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=800&q=80"],
    category: "Fashion",
    vendor: {
      id: "v3",
      name: "Heritage Fashion ZM",
      logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&q=80",
      verified: true
    },
    rating: 4.9,
    reviewCount: 267,
    fastDelivery: false,
    freeShipping: true,
    inStock: true,
    recommendationReason: "Because you liked traditional fashion",
    matchScore: 92,
    similarUsers: 234,
    location: "Kitwe",
    tags: ["traditional", "authentic", "ceremony"]
  },
  {
    id: "r4",
    name: "Premium Coffee Grinder",
    description: "Electric burr coffee grinder for the perfect cup every time",
    price: 124.99,
    originalPrice: 179.99,
    images: ["https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=800&q=80"],
    category: "Kitchen",
    vendor: {
      id: "v4",
      name: "Kitchen Pro ZM",
      logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&q=80",
      verified: true
    },
    rating: 4.8,
    reviewCount: 156,
    discountPercentage: 31,
    fastDelivery: true,
    freeShipping: false,
    inStock: true,
    recommendationReason: "Pairs well with your coffee purchases",
    matchScore: 87,
    viewedAt: "1 week ago",
    similarUsers: 312,
    location: "Ndola",
    tags: ["coffee", "kitchen", "premium"]
  },
  {
    id: "r5",
    name: "Wireless Bluetooth Earbuds",
    description: "True wireless earbuds with noise cancellation and premium sound quality",
    price: 67.99,
    originalPrice: 99.99,
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80"],
    category: "Electronics",
    vendor: {
      id: "v5",
      name: "Audio Pro ZM",
      logo: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&q=80",
      verified: true
    },
    rating: 4.5,
    reviewCount: 428,
    discountPercentage: 32,
    fastDelivery: true,
    freeShipping: true,
    inStock: true,
    recommendationReason: "Trending with similar customers",
    matchScore: 84,
    similarUsers: 645,
    location: "Lusaka",
    tags: ["wireless", "audio", "premium"]
  },
  {
    id: "r6",
    name: "Handmade Wooden Sculpture",
    description: "Beautiful handcrafted wooden sculpture representing Zambian wildlife",
    price: 78.99,
    images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"],
    category: "Art & Crafts",
    vendor: {
      id: "v6",
      name: "Artisan Collective ZM",
      logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&q=80",
      verified: true
    },
    rating: 4.9,
    reviewCount: 89,
    fastDelivery: false,
    freeShipping: true,
    inStock: true,
    recommendationReason: "Supports local artisans you care about",
    matchScore: 90,
    similarUsers: 167,
    location: "Livingstone",
    tags: ["handmade", "art", "wildlife"]
  }
];

const recommendationReasons = [
  { icon: Eye, label: "Based on items you viewed", color: "text-blue-500" },
  { icon: ShoppingCart, label: "Because you bought similar items", color: "text-green-500" },
  { icon: Heart, label: "From your wishlist category", color: "text-red-500" },
  { icon: MapPin, label: "Popular in your area", color: "text-purple-500" },
  { icon: Users, label: "Customers like you also bought", color: "text-orange-500" },
  { icon: TrendingUp, label: "Trending in your interests", color: "text-pink-500" }
];

interface RecommendedSectionProps {
  onAddToCart?: (product: RecommendedProduct) => void;
  onToggleWishlist?: (productId: string) => void;
  wishlistedItems?: Set<string>;
}

export function RecommendedSection({ onAddToCart, onToggleWishlist, wishlistedItems = new Set() }: RecommendedSectionProps) {
  const [displayedProducts, setDisplayedProducts] = useState(recommendedProducts.slice(0, 4));
  const [showAllReasons, setShowAllReasons] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<Set<string>>(new Set());
  const [refreshing, setRefreshing] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  // Filter products by category if selected
  const filteredProducts = filterCategory
    ? recommendedProducts.filter(p => p.category === filterCategory)
    : displayedProducts;

  const handleRefreshRecommendations = async () => {
    setRefreshing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Shuffle and get new recommendations
    const shuffled = [...recommendedProducts].sort(() => 0.5 - Math.random());
    setDisplayedProducts(shuffled.slice(0, 4));
    setRefreshing(false);
  };

  const handleProductFeedback = (productId: string, isPositive: boolean) => {
    setFeedbackGiven(prev => new Set([...prev, productId]));
    // In real app, this would send feedback to recommendation engine
    console.log(`Feedback for ${productId}: ${isPositive ? 'positive' : 'negative'}`);
  };

  const handleAddToCart = (product: RecommendedProduct) => {
    onAddToCart?.(product);
  };

  const handleToggleWishlist = (productId: string) => {
    onToggleWishlist?.(productId);
  };

  const categories = [...new Set(recommendedProducts.map(p => p.category))];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="py-16 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <Brain className="text-white text-xl" />
            </motion.div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-2">
                Recommended for You
                <Badge className="bg-purple-500 text-white">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Powered
                </Badge>
              </h2>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Personalized picks based on your interests, location, and shopping history
          </p>
        </motion.div>

        {/* Personalization Insights */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl border shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Your Preferences</h3>
                <p className="text-sm text-gray-600">Based on your activity</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAllReasons(!showAllReasons)}
                className="text-purple-600 border-purple-200 hover:bg-purple-50"
              >
                <Filter className="h-4 w-4 mr-1" />
                {showAllReasons ? 'Hide' : 'Show'} Details
              </Button>
              
              <motion.div
                animate={{ rotate: refreshing ? 360 : 0 }}
                transition={{ duration: 1, repeat: refreshing ? Infinity : 0, ease: "linear" }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefreshRecommendations}
                  disabled={refreshing}
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  {refreshing ? 'Refreshing...' : 'Refresh'}
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              variant={filterCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory(null)}
              className="transition-all duration-200"
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={filterCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterCategory(category)}
                className="transition-all duration-200"
              >
                {category}
              </Button>
            ))}
          </div>

          <AnimatePresence>
            {showAllReasons && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-100 pt-4"
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendationReasons.map((reason, index) => (
                    <motion.div
                      key={reason.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <reason.icon className={`h-5 w-5 ${reason.color}`} />
                      <span className="text-sm text-gray-700">{reason.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr"
        >
          <AnimatePresence mode="wait">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }
                  }
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Match Score Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-purple-500 text-white px-2 py-1 text-xs">
                        <Target className="h-3 w-3 mr-1" />
                        {product.matchScore}% match
                      </Badge>
                    </div>

                    {/* Discount Badge */}
                    {product.discountPercentage && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-green-500 text-white px-2 py-1 text-xs">
                          -{product.discountPercentage}%
                        </Badge>
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleWishlist(product.id)}
                      className={`absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 rounded-full ${
                        wishlistedItems.has(product.id)
                          ? 'bg-red-100 text-red-600'
                          : 'bg-white/90 text-gray-600 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${wishlistedItems.has(product.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>

                  {/* Product Content */}
                  <CardContent className="p-4">
                    {/* Vendor Info */}
                    <div className="flex items-center gap-2 mb-2">
                      <Image
                        src={product.vendor.logo}
                        alt={product.vendor.name}
                        width={20}
                        height={20}
                        className="rounded-full object-cover"
                      />
                      <span className="text-xs text-gray-600 truncate">{product.vendor.name}</span>
                      {product.vendor.verified && (
                        <Shield className="h-3 w-3 text-blue-500" />
                      )}
                    </div>

                    {/* Product Name */}
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Recommendation Reason */}
                    <div className="bg-purple-50 rounded-lg p-2 mb-3">
                      <p className="text-xs text-purple-700 font-medium flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        {product.recommendationReason}
                      </p>
                      {product.viewedAt && (
                        <p className="text-xs text-gray-500 mt-1">
                          <Clock className="h-3 w-3 inline mr-1" />
                          Viewed {product.viewedAt}
                        </p>
                      )}
                      {product.similarUsers && (
                        <p className="text-xs text-gray-500 mt-1">
                          <Users className="h-3 w-3 inline mr-1" />
                          {product.similarUsers} similar customers
                        </p>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-purple-600">
                        K{product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          K{product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3 text-sm">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-600">{product.rating}</span>
                      <span className="text-gray-500">({product.reviewCount})</span>
                    </div>

                    {/* Delivery Info */}
                    <div className="flex items-center gap-3 mb-4 text-xs text-gray-600">
                      {product.fastDelivery && (
                        <div className="flex items-center gap-1">
                          <Truck className="h-3 w-3 text-green-500" />
                          <span>Fast delivery</span>
                        </div>
                      )}
                      {product.freeShipping && (
                        <div className="flex items-center gap-1">
                          <Zap className="h-3 w-3 text-blue-500" />
                          <span>Free shipping</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-2.5 shadow-md"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400 font-semibold py-2.5 shadow-sm"
                        asChild
                      >
                        <Link href={`/vendors/${product.vendor.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/--+/g, '-').replace(/^-|-$/g, '')}`}>
                          <Store className="h-4 w-4 mr-2" />
                          Visit Store
                        </Link>
                      </Button>

                      {/* Feedback Buttons */}
                      {!feedbackGiven.has(product.id) && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Is this helpful?</span>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleProductFeedback(product.id, true)}
                              className="w-8 h-8 p-0 hover:bg-green-50 hover:text-green-600"
                            >
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleProductFeedback(product.id, false)}
                              className="w-8 h-8 p-0 hover:bg-red-50 hover:text-red-600"
                            >
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {feedbackGiven.has(product.id) && (
                        <div className="text-center">
                          <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                            Thanks for your feedback!
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
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
              className="border-2 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white px-8 py-4 rounded-xl font-semibold"
              asChild
            >
              <Link href="/recommended">
                View All Recommendations
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
