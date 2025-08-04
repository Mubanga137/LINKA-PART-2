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
  Truck,
  MapPin,
  Clock,
  Package,
  Shield,
  Zap,
  Gift,
  Filter,
  Grid3X3,
  List,
  Share2,
  ExternalLink,
  CheckCircle,
  Calendar,
  Eye,
  Users,
  Award,
  TrendingUp
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FreeShippingProduct {
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
    location: string;
  };
  rating: number;
  reviewCount: number;
  shippingInfo: {
    freeShipping: true;
    estimatedDays: number;
    sameDay?: boolean;
    expressFree?: boolean;
    nationwide?: boolean;
  };
  location: string;
  distance: number; // km from user
  views: number;
  soldCount: number;
  tags: string[];
  inStock: boolean;
  stockQuantity: number;
  fastDelivery?: boolean;
  ecoFriendly?: boolean;
  bulkDiscount?: boolean;
}

const freeShippingProducts: FreeShippingProduct[] = [
  {
    id: "fs1",
    name: "Wireless Gaming Headset Pro",
    description: "Professional wireless gaming headset with 7.1 surround sound and RGB lighting",
    price: 89.99,
    originalPrice: 129.99,
    images: [
      "https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80"
    ],
    category: "Gaming",
    vendor: {
      id: "v1",
      name: "Gaming World ZM",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&q=80",
      verified: true,
      location: "Lusaka"
    },
    rating: 4.8,
    reviewCount: 1247,
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 1,
      sameDay: true,
      expressFree: true,
      nationwide: true
    },
    location: "Lusaka",
    distance: 5.2,
    views: 15420,
    soldCount: 342,
    tags: ["gaming", "wireless", "premium"],
    inStock: true,
    stockQuantity: 23,
    fastDelivery: true
  },
  {
    id: "fs2",
    name: "Traditional Chitenge Dress Collection",
    description: "Beautiful handmade chitenge dresses showcasing authentic Zambian patterns and craftsmanship",
    price: 65.99,
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=800&q=80",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80"
    ],
    category: "Fashion",
    vendor: {
      id: "v2",
      name: "Heritage Fashion ZM",
      logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&q=80",
      verified: true,
      location: "Kitwe"
    },
    rating: 4.9,
    reviewCount: 634,
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 2,
      nationwide: true
    },
    location: "Kitwe",
    distance: 320,
    views: 8920,
    soldCount: 189,
    tags: ["traditional", "chitenge", "handmade"],
    inStock: true,
    stockQuantity: 12,
    ecoFriendly: true
  },
  {
    id: "fs3",
    name: "Premium Coffee Bean Collection",
    description: "Single-origin Zambian coffee beans, expertly roasted for the perfect cup every time",
    price: 24.99,
    originalPrice: 34.99,
    images: [
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80"
    ],
    category: "Food & Beverages",
    vendor: {
      id: "v3",
      name: "Zambian Coffee Co.",
      logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&q=80",
      verified: true,
      location: "Solwezi"
    },
    rating: 4.6,
    reviewCount: 423,
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 3,
      nationwide: true
    },
    location: "Solwezi",
    distance: 450,
    views: 6750,
    soldCount: 145,
    tags: ["coffee", "organic", "local"],
    inStock: true,
    stockQuantity: 67,
    ecoFriendly: true,
    bulkDiscount: true
  },
  {
    id: "fs4",
    name: "Handwoven Basket Set",
    description: "Set of 3 traditional handwoven baskets perfect for storage and home decoration",
    price: 45.99,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
    ],
    category: "Home & Garden",
    vendor: {
      id: "v4",
      name: "Craft Collective ZM",
      logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&q=80",
      verified: true,
      location: "Livingstone"
    },
    rating: 4.8,
    reviewCount: 298,
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 2,
      nationwide: true
    },
    location: "Livingstone",
    distance: 470,
    views: 5640,
    soldCount: 87,
    tags: ["handmade", "baskets", "traditional"],
    inStock: true,
    stockQuantity: 34,
    ecoFriendly: true
  },
  {
    id: "fs5",
    name: "Smart Fitness Tracker",
    description: "Advanced fitness tracker with heart rate monitoring, GPS tracking, and 7-day battery life",
    price: 159.99,
    originalPrice: 219.99,
    images: [
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80"
    ],
    category: "Electronics",
    vendor: {
      id: "v5",
      name: "FitTech Zambia",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&q=80",
      verified: true,
      location: "Ndola"
    },
    rating: 4.7,
    reviewCount: 892,
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 1,
      sameDay: true,
      expressFree: true,
      nationwide: true
    },
    location: "Ndola",
    distance: 280,
    views: 12380,
    soldCount: 256,
    tags: ["fitness", "smart", "health"],
    inStock: true,
    stockQuantity: 45,
    fastDelivery: true
  },
  {
    id: "fs6",
    name: "Copper Jewelry Collection",
    description: "Handcrafted copper jewelry featuring traditional Zambian designs with modern elegance",
    price: 78.99,
    originalPrice: 119.99,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80"
    ],
    category: "Jewelry",
    vendor: {
      id: "v6",
      name: "Copper Craft Masters",
      logo: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&q=80",
      verified: true,
      location: "Kabwe"
    },
    rating: 4.9,
    reviewCount: 156,
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 2,
      nationwide: true
    },
    location: "Kabwe",
    distance: 140,
    views: 4230,
    soldCount: 67,
    tags: ["jewelry", "copper", "handmade"],
    inStock: true,
    stockQuantity: 18,
    ecoFriendly: true
  }
];

export default function FreeShippingPage() {
  const [sortBy, setSortBy] = useState<'distance' | 'price' | 'rating' | 'delivery'>('distance');
  const [filterBy, setFilterBy] = useState<'all' | 'same-day' | 'express' | 'eco-friendly'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort products
  const filteredProducts = freeShippingProducts
    .filter(product => {
      switch (filterBy) {
        case 'same-day':
          return product.shippingInfo.sameDay;
        case 'express':
          return product.shippingInfo.expressFree;
        case 'eco-friendly':
          return product.ecoFriendly;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'delivery':
          return a.shippingInfo.estimatedDays - b.shippingInfo.estimatedDays;
        default:
          return a.distance - b.distance;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header />
      
      <main>
        {/* Free Shipping Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div
                  animate={{ 
                    x: [0, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                  className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-xl"
                >
                  <Truck className="text-white text-2xl" />
                </motion.div>
                <div>
                  <h1 className="text-5xl md:text-7xl font-bold text-gray-900 flex items-center gap-3">
                    🚚 Free Shipping
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-lg px-4 py-2">
                      <Gift className="h-4 w-4 mr-1" />
                      0 COST
                    </Badge>
                  </h1>
                  <p className="text-xl text-gray-600 mt-4">
                    Fast, reliable delivery at no extra cost to you
                  </p>
                </div>
              </div>

              {/* Delivery Benefits */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {[
                  { icon: Truck, label: "Free Nationwide", desc: "All over Zambia", color: "from-green-500 to-emerald-500" },
                  { icon: Zap, label: "Same Day", desc: "Major cities", color: "from-blue-500 to-cyan-500" },
                  { icon: Shield, label: "Secure Delivery", desc: "Safe & tracked", color: "from-purple-500 to-violet-500" },
                  { icon: Package, label: "Care Packaging", desc: "Protected items", color: "from-orange-500 to-amber-500" }
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-green-100"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{benefit.label}</h3>
                    <p className="text-sm text-gray-600">{benefit.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Delivery Coverage Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 bg-white rounded-2xl p-6 shadow-lg border max-w-4xl mx-auto"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-center gap-2">
                  <MapPin className="h-5 w-5 text-green-500" />
                  Free Delivery Coverage
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {[
                    { city: "Lusaka", delivery: "Same Day", icon: Zap },
                    { city: "Kitwe", delivery: "1-2 Days", icon: Truck },
                    { city: "Ndola", delivery: "1-2 Days", icon: Truck },
                    { city: "Livingstone", delivery: "2-3 Days", icon: Calendar },
                    { city: "Solwezi", delivery: "2-3 Days", icon: Calendar },
                    { city: "Kabwe", delivery: "1-2 Days", icon: Truck },
                    { city: "Chingola", delivery: "2-3 Days", icon: Calendar },
                    { city: "Nationwide", delivery: "3-5 Days", icon: MapPin }
                  ].map((location) => (
                    <div key={location.city} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                      <location.icon className="h-4 w-4 text-green-600" />
                      <div>
                        <div className="font-medium text-gray-900">{location.city}</div>
                        <div className="text-gray-600 text-xs">{location.delivery}</div>
                      </div>
                    </div>
                  ))}
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
                {/* Delivery Filters */}
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Delivery Options
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'all', label: 'All Free Shipping', icon: Truck, count: freeShippingProducts.length },
                      { value: 'same-day', label: 'Same Day', icon: Zap, count: freeShippingProducts.filter(p => p.shippingInfo.sameDay).length },
                      { value: 'express', label: 'Express Free', icon: Package, count: freeShippingProducts.filter(p => p.shippingInfo.expressFree).length },
                      { value: 'eco-friendly', label: 'Eco Delivery', icon: Shield, count: freeShippingProducts.filter(p => p.ecoFriendly).length }
                    ].map((filter) => (
                      <Button
                        key={filter.value}
                        variant={filterBy === filter.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterBy(filter.value as any)}
                        className={`transition-all duration-200 ${
                          filterBy === filter.value 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                            : ''
                        }`}
                      >
                        <filter.icon className="h-3 w-3 mr-1" />
                        {filter.label} ({filter.count})
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
                      <option value="distance">Nearest First</option>
                      <option value="delivery">Fastest Delivery</option>
                      <option value="price">Lowest Price</option>
                      <option value="rating">Highest Rated</option>
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

        {/* Free Shipping Products Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Free Shipping Products ({filteredProducts.length})
              </h2>
              <div className="text-sm text-gray-600">
                Save on delivery costs • Fast & reliable service
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
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
                    {/* Free Shipping Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 font-semibold">
                        <Truck className="h-3 w-3 mr-1" />
                        FREE SHIPPING
                      </Badge>
                    </div>

                    {/* Additional Badges */}
                    <div className="absolute top-4 right-4 z-20 flex flex-col gap-1">
                      {product.shippingInfo.sameDay && (
                        <Badge className="bg-blue-500 text-white text-xs px-2 py-1">
                          <Zap className="h-2.5 w-2.5 mr-1" />
                          Same Day
                        </Badge>
                      )}
                      {product.ecoFriendly && (
                        <Badge className="bg-green-600 text-white text-xs px-2 py-1">
                          🌱 Eco
                        </Badge>
                      )}
                      {product.bulkDiscount && (
                        <Badge className="bg-purple-500 text-white text-xs px-2 py-1">
                          Bulk Save
                        </Badge>
                      )}
                    </div>

                    {/* Product Image */}
                    <div className={`relative ${viewMode === 'grid' ? 'aspect-square' : 'aspect-[4/3]'} bg-gray-100 overflow-hidden`}>
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
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

                    <CardContent className="p-4">
                      {/* Vendor and Location */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Image
                            src={product.vendor.logo}
                            alt={product.vendor.name}
                            width={20}
                            height={20}
                            className="rounded-full object-cover"
                          />
                          <span className="text-sm font-medium text-gray-700 truncate">{product.vendor.name}</span>
                          {product.vendor.verified && (
                            <CheckCircle className="h-3 w-3 text-blue-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="h-3 w-3" />
                          <span>{product.distance}km away</span>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="mb-3">
                        <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-green-600 transition-colors">
                          {product.name}
                        </h3>
                        {viewMode === 'list' && (
                          <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                            {product.description}
                          </p>
                        )}
                      </div>

                      {/* Delivery Info */}
                      <div className="bg-green-50 rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">
                              {product.shippingInfo.sameDay ? 'Same Day Delivery' : 
                               `${product.shippingInfo.estimatedDays} day${product.shippingInfo.estimatedDays > 1 ? 's' : ''} delivery`}
                            </span>
                          </div>
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            FREE
                          </Badge>
                        </div>
                        {product.shippingInfo.nationwide && (
                          <p className="text-xs text-green-600 mt-1">
                            <CheckCircle className="h-3 w-3 inline mr-1" />
                            Nationwide coverage available
                          </p>
                        )}
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl font-bold text-green-600">
                          K{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <>
                            <span className="text-sm text-gray-400 line-through">
                              K{product.originalPrice.toFixed(2)}
                            </span>
                            <Badge className="bg-red-100 text-red-700 text-xs">
                              Save K{(product.originalPrice - product.price).toFixed(2)}
                            </Badge>
                          </>
                        )}
                      </div>

                      {/* Rating and Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{product.rating}</span>
                          <span>({product.reviewCount})</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{product.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{product.soldCount} sold</span>
                          </div>
                        </div>
                      </div>

                      {/* Stock Info */}
                      {product.stockQuantity <= 20 && (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 mb-3">
                          <p className="text-xs text-orange-700 font-medium">
                            ⚡ Only {product.stockQuantity} left in stock!
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                        <Button
                          variant="outline"
                          className="px-3 border-green-300 hover:border-green-500 hover:text-green-600"
                          asChild
                        >
                          <Link href={`/products/${product.id}`}>
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>

                      {/* Delivery Promise */}
                      <div className="mt-3 text-center">
                        <p className="text-xs text-gray-500">
                          <Shield className="h-3 w-3 inline mr-1" />
                          Free delivery promise • Secure packaging • Tracking included
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No free shipping products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters to see more products with free delivery
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
