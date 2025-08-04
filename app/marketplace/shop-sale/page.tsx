"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
  Percent,
  Tag,
  TrendingDown,
  Filter,
  Grid3X3,
  List,
  Share2,
  ExternalLink,
  Timer,
  Clock,
  Zap,
  Award,
  Eye,
  Users,
  ShoppingBag,
  Gift,
  Calendar,
  ArrowUpDown
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SaleProduct {
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
  savings: number;
  saleType: "clearance" | "seasonal" | "bulk" | "weekend" | "mega";
  saleEndDate?: Date;
  views: number;
  soldCount: number;
  tags: string[];
  department: string;
  inStock: boolean;
  stockQuantity: number;
}

const saleProducts: SaleProduct[] = [
  {
    id: "sale1",
    name: "Gaming Laptop Pro 15\"",
    description: "High-performance gaming laptop with RTX graphics and 16GB RAM for ultimate gaming experience",
    price: 899.99,
    originalPrice: 1499.99,
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80"
    ],
    category: "Electronics",
    vendor: {
      id: "v1",
      name: "Tech Pro Zambia",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&q=80",
      verified: true
    },
    rating: 4.7,
    reviewCount: 324,
    discountPercentage: 40,
    savings: 600.00,
    saleType: "clearance",
    saleEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    views: 8420,
    soldCount: 89,
    tags: ["gaming", "laptop", "clearance"],
    department: "Electronics",
    inStock: true,
    stockQuantity: 12
  },
  {
    id: "sale2",
    name: "Traditional Chitenge Bundle",
    description: "Premium chitenge fabric bundle - 5 beautiful patterns perfect for traditional wear and home decor",
    price: 45.99,
    originalPrice: 89.99,
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=800&q=80",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80"
    ],
    category: "Fashion",
    vendor: {
      id: "v2",
      name: "Heritage Textiles ZM",
      logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&q=80",
      verified: true
    },
    rating: 4.9,
    reviewCount: 187,
    discountPercentage: 49,
    savings: 44.00,
    saleType: "seasonal",
    views: 3240,
    soldCount: 156,
    tags: ["traditional", "fabric", "bundle"],
    department: "Fashion & Textiles",
    inStock: true,
    stockQuantity: 67
  },
  {
    id: "sale3",
    name: "Premium Coffee Machine Set",
    description: "Professional espresso machine with grinder and premium accessories for cafe-quality coffee at home",
    price: 299.99,
    originalPrice: 549.99,
    images: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80",
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80"
    ],
    category: "Kitchen",
    vendor: {
      id: "v3",
      name: "Kitchen Masters ZM",
      logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&q=80",
      verified: true
    },
    rating: 4.6,
    reviewCount: 98,
    discountPercentage: 45,
    savings: 250.00,
    saleType: "weekend",
    saleEndDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    views: 2890,
    soldCount: 43,
    tags: ["kitchen", "coffee", "appliance"],
    department: "Home & Kitchen",
    inStock: true,
    stockQuantity: 18
  },
  {
    id: "sale4",
    name: "Handcrafted Jewelry Collection",
    description: "Elegant handcrafted jewelry set featuring traditional Zambian designs with modern appeal",
    price: 89.99,
    originalPrice: 179.99,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80"
    ],
    category: "Jewelry",
    vendor: {
      id: "v4",
      name: "Artisan Jewelers ZM",
      logo: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&q=80",
      verified: true
    },
    rating: 4.8,
    reviewCount: 234,
    discountPercentage: 50,
    savings: 90.00,
    saleType: "mega",
    views: 5670,
    soldCount: 127,
    tags: ["jewelry", "handcrafted", "traditional"],
    department: "Jewelry & Accessories",
    inStock: true,
    stockQuantity: 34
  },
  {
    id: "sale5",
    name: "Smart Home Security System",
    description: "Complete wireless security system with cameras, sensors, and mobile app control",
    price: 199.99,
    originalPrice: 399.99,
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80",
      "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&q=80"
    ],
    category: "Security",
    vendor: {
      id: "v5",
      name: "Smart Security ZM",
      logo: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=100&q=80",
      verified: true
    },
    rating: 4.5,
    reviewCount: 156,
    discountPercentage: 50,
    savings: 200.00,
    saleType: "bulk",
    views: 4320,
    soldCount: 78,
    tags: ["security", "smart", "wireless"],
    department: "Home & Security",
    inStock: true,
    stockQuantity: 23
  },
  {
    id: "sale6",
    name: "Organic Skincare Bundle",
    description: "Complete organic skincare routine with natural Zambian ingredients and essential oils",
    price: 67.99,
    originalPrice: 129.99,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800&q=80"
    ],
    category: "Beauty",
    vendor: {
      id: "v6",
      name: "Natural Beauty ZM",
      logo: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&q=80",
      verified: true
    },
    rating: 4.7,
    reviewCount: 289,
    discountPercentage: 48,
    savings: 62.00,
    saleType: "seasonal",
    views: 3450,
    soldCount: 201,
    tags: ["beauty", "organic", "skincare"],
    department: "Health & Beauty",
    inStock: true,
    stockQuantity: 45
  }
];

const saleTypeConfig = {
  clearance: { color: "from-red-600 to-red-700", label: "Clearance Sale", icon: TrendingDown },
  seasonal: { color: "from-orange-500 to-red-500", label: "Seasonal Sale", icon: Calendar },
  bulk: { color: "from-purple-500 to-pink-500", label: "Bulk Discount", icon: ShoppingBag },
  weekend: { color: "from-blue-500 to-indigo-500", label: "Weekend Deal", icon: Gift },
  mega: { color: "from-green-500 to-emerald-500", label: "Mega Sale", icon: Zap }
};

const departments = [...new Set(saleProducts.map(p => p.department))];

export default function ShopSalePage() {
  const [sortBy, setSortBy] = useState<'savings' | 'discount' | 'price' | 'rating'>('savings');
  const [filterBy, setFilterBy] = useState<'all' | 'clearance' | 'seasonal' | 'weekend' | 'mega'>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort products
  const filteredProducts = saleProducts
    .filter(product => {
      const saleTypeMatch = filterBy === 'all' || product.saleType === filterBy;
      const departmentMatch = departmentFilter === 'all' || product.department === departmentFilter;
      return saleTypeMatch && departmentMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'savings':
          return b.savings - a.savings;
        case 'discount':
          return b.discountPercentage - a.discountPercentage;
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return b.savings - a.savings;
      }
    });

  const totalSavings = filteredProducts.reduce((sum, product) => sum + product.savings, 0);
  const avgDiscount = filteredProducts.reduce((sum, product) => sum + product.discountPercentage, 0) / filteredProducts.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 15, -15, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                  className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl"
                >
                  <Tag className="text-white text-2xl" />
                </motion.div>
                <div>
                  <h1 className="text-5xl md:text-7xl font-bold text-gray-900 flex items-center gap-3">
                    Shop the Sale
                    <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-lg px-4 py-2 animate-pulse">
                      <Percent className="h-4 w-4 mr-1" />
                      UP TO 50% OFF
                    </Badge>
                  </h1>
                  <p className="text-xl text-gray-600 mt-4">
                    Massive savings across all departments - Limited time offers!
                  </p>
                </div>
              </div>

              {/* Sale Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { label: "Total Savings", value: `K${totalSavings.toFixed(2)}`, icon: TrendingDown, color: "from-red-500 to-orange-500" },
                  { label: "Avg Discount", value: `${avgDiscount.toFixed(0)}%`, icon: Percent, color: "from-orange-500 to-yellow-500" },
                  { label: "Sale Items", value: saleProducts.length.toString(), icon: Tag, color: "from-pink-500 to-red-500" },
                  { label: "Departments", value: departments.length.toString(), icon: Grid3X3, color: "from-purple-500 to-pink-500" }
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
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Sale Countdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 bg-white rounded-2xl p-6 shadow-lg border max-w-2xl mx-auto"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-center gap-2">
                  <Timer className="h-5 w-5 text-red-500" />
                  Sale Event Ends Soon!
                </h3>
                <div className="flex items-center justify-center gap-4 text-center">
                  <div className="bg-red-100 rounded-lg p-3">
                    <div className="text-2xl font-bold text-red-600">02</div>
                    <div className="text-xs text-gray-600">Days</div>
                  </div>
                  <div className="text-red-500 text-2xl">:</div>
                  <div className="bg-red-100 rounded-lg p-3">
                    <div className="text-2xl font-bold text-red-600">14</div>
                    <div className="text-xs text-gray-600">Hours</div>
                  </div>
                  <div className="text-red-500 text-2xl">:</div>
                  <div className="bg-red-100 rounded-lg p-3">
                    <div className="text-2xl font-bold text-red-600">27</div>
                    <div className="text-xs text-gray-600">Minutes</div>
                  </div>
                </div>
              </motion.div>
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
                    <Filter className="h-4 w-4" />
                    Sale Types
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Button
                      variant={filterBy === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterBy("all")}
                      className="transition-all duration-200"
                    >
                      All Sales ({saleProducts.length})
                    </Button>
                    {Object.entries(saleTypeConfig).map(([type, config]) => {
                      const count = saleProducts.filter(p => p.saleType === type).length;
                      return (
                        <Button
                          key={type}
                          variant={filterBy === type ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilterBy(type as any)}
                          className={`transition-all duration-200 ${
                            filterBy === type ? `bg-gradient-to-r ${config.color} text-white` : ''
                          }`}
                        >
                          <config.icon className="h-3 w-3 mr-1" />
                          {config.label} ({count})
                        </Button>
                      );
                    })}
                  </div>

                  {/* Department Filter */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Filter by Department:</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={departmentFilter === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDepartmentFilter("all")}
                        className="text-xs"
                      >
                        All Departments
                      </Button>
                      {departments.map((dept) => (
                        <Button
                          key={dept}
                          variant={departmentFilter === dept ? "default" : "outline"}
                          size="sm"
                          onClick={() => setDepartmentFilter(dept)}
                          className="text-xs"
                        >
                          {dept}
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
                      <option value="savings">Biggest Savings</option>
                      <option value="discount">Highest Discount %</option>
                      <option value="price">Lowest Price</option>
                      <option value="rating">Best Rated</option>
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

        {/* Sale Products Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Sale Products ({filteredProducts.length})
              </h2>
              <div className="text-sm text-gray-600">
                Total potential savings: K{totalSavings.toFixed(2)}
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
                const config = saleTypeConfig[product.saleType];
                
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
                      {/* Sale Badge */}
                      <div className="absolute top-4 left-4 z-20">
                        <Badge className={`bg-gradient-to-r ${config.color} text-white px-3 py-1 font-semibold`}>
                          <config.icon className="h-3 w-3 mr-1" />
                          {config.label}
                        </Badge>
                      </div>

                      {/* Discount Badge */}
                      <div className="absolute top-4 right-4 z-20">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="bg-red-500 text-white rounded-full w-16 h-16 flex flex-col items-center justify-center font-bold text-xs shadow-lg"
                        >
                          <span className="text-lg">{product.discountPercentage}%</span>
                          <span className="text-[8px]">OFF</span>
                        </motion.div>
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
                          <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                            {product.name}
                          </h3>
                          {viewMode === 'list' && (
                            <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                              {product.description}
                            </p>
                          )}
                          <Badge variant="outline" className="text-xs border-red-200 text-red-700">
                            {product.department}
                          </Badge>
                        </div>

                        {/* Savings Highlight */}
                        <div className="bg-red-50 rounded-lg p-3 mb-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-lg font-bold text-red-600">
                                Save K{product.savings.toFixed(2)}
                              </div>
                              <div className="text-xs text-red-500">
                                {product.discountPercentage}% discount applied
                              </div>
                            </div>
                            <TrendingDown className="h-8 w-8 text-red-500" />
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl font-bold text-red-600">
                            K{product.price.toFixed(2)}
                          </span>
                          <span className="text-lg text-gray-400 line-through">
                            K{product.originalPrice.toFixed(2)}
                          </span>
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

                        {/* Stock Progress */}
                        {product.stockQuantity <= 50 && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-gray-600">⚡ Limited Stock</span>
                              <span className="font-medium text-gray-900">
                                {product.stockQuantity} left
                              </span>
                            </div>
                            <Progress 
                              value={100 - (product.stockQuantity / 100) * 100} 
                              className="h-2"
                            />
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold"
                            disabled={!product.inStock}
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            {product.inStock ? 'Buy Now' : 'Out of Stock'}
                          </Button>
                          <Button
                            variant="outline"
                            className="px-3 border-red-300 hover:border-red-500 hover:text-red-600"
                            asChild
                          >
                            <Link href={`/products/${product.id}`}>
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>

                        {/* Sale End Date */}
                        {product.saleEndDate && (
                          <div className="mt-3 text-center">
                            <Badge className="bg-orange-100 text-orange-700 text-xs px-3 py-1">
                              <Clock className="h-3 w-3 mr-1" />
                              Sale ends {product.saleEndDate.toLocaleDateString()}
                            </Badge>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Tag className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No sale items found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters to see more sale products
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
