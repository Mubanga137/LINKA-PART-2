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
  ShoppingCart,
  Heart,
  Brain,
  Target,
  Filter,
  RefreshCw,
  ArrowLeft,
  Sparkles,
  Clock,
  Users,
  MapPin,
  Truck,
  Shield,
  Zap,
  Store
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart, useFavorites } from "@/contexts/marketplace-context";
import type { Product } from "@/lib/types";

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

// Extended mock data with more recommendations
const allRecommendedProducts: RecommendedProduct[] = [
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
  },
  {
    id: "r7",
    name: "Organic Coffee Beans",
    description: "Premium organic coffee beans grown in Zambian highlands",
    price: 29.99,
    images: ["https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80"],
    category: "Food & Beverages",
    vendor: {
      id: "v7",
      name: "Highland Coffee ZM",
      logo: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&q=80",
      verified: true
    },
    rating: 4.8,
    reviewCount: 234,
    fastDelivery: true,
    freeShipping: true,
    inStock: true,
    recommendationReason: "Based on your beverage preferences",
    matchScore: 89,
    similarUsers: 445,
    location: "Chipata",
    tags: ["organic", "coffee", "local"]
  },
  {
    id: "r8",
    name: "Smart Phone Stand",
    description: "Adjustable phone stand perfect for video calls and content creation",
    price: 19.99,
    originalPrice: 29.99,
    images: ["https://images.unsplash.com/photo-1580894906475-403276d7ab15?w=800&q=80"],
    category: "Accessories",
    vendor: {
      id: "v8",
      name: "Tech Accessories ZM",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&q=80",
      verified: true
    },
    rating: 4.4,
    reviewCount: 156,
    discountPercentage: 33,
    fastDelivery: true,
    freeShipping: true,
    inStock: true,
    recommendationReason: "Complements your tech setup",
    matchScore: 83,
    similarUsers: 298,
    location: "Lusaka",
    tags: ["tech", "stand", "accessory"]
  }
];

export default function RecommendedPage() {
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"matchScore" | "price" | "rating">("matchScore");
  
  // Use cart and favorites context
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  // Filter and sort products
  const filteredProducts = filterCategory
    ? allRecommendedProducts.filter(p => p.category === filterCategory)
    : allRecommendedProducts;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "matchScore":
        return b.matchScore - a.matchScore;
      case "price":
        return a.price - b.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const categories = [...new Set(allRecommendedProducts.map(p => p.category))];

  const handleAddToCart = (product: RecommendedProduct) => {
    // Convert RecommendedProduct to Product format
    const cartProduct: Product = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      images: product.images,
      category: product.category,
      inStock: product.inStock,
      rating: product.rating,
      reviewCount: product.reviewCount,
      tags: product.tags,
      vendor: product.vendor,
      fastDelivery: product.fastDelivery,
      freeShipping: product.freeShipping,
      discountPercentage: product.discountPercentage,
      featured: false,
      hotDeal: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    addToCart(cartProduct, 1);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Link href="/marketplace" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Marketplace
              </Link>
              
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
                  className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Brain className="text-white text-2xl" />
                </motion.div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                All Recommendations
                <Badge className="ml-3 bg-purple-500 text-white">
                  <Sparkles className="h-4 w-4 mr-1" />
                  AI Powered
                </Badge>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover {allRecommendedProducts.length} personalized product recommendations based on your interests and shopping history
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Sort */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filterCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterCategory(null)}
                  className="transition-all duration-200"
                >
                  All Categories ({allRecommendedProducts.length})
                </Button>
                {categories.map((category) => {
                  const count = allRecommendedProducts.filter(p => p.category === category).length;
                  return (
                    <Button
                      key={category}
                      variant={filterCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterCategory(category)}
                      className="transition-all duration-200"
                    >
                      {category} ({count})
                    </Button>
                  );
                })}
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Button
                  variant={sortBy === "matchScore" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("matchScore")}
                >
                  <Target className="h-4 w-4 mr-1" />
                  Match Score
                </Button>
                <Button
                  variant={sortBy === "price" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("price")}
                >
                  Price
                </Button>
                <Button
                  variant={sortBy === "rating" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("rating")}
                >
                  <Star className="h-4 w-4 mr-1" />
                  Rating
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
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
                        onClick={() => toggleFavorite(product.id)}
                        className={`absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 rounded-full ${
                          isFavorite(product.id)
                            ? 'bg-red-100 text-red-600'
                            : 'bg-white/90 text-gray-600 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
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
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
