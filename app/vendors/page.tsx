"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  Store,
  MapPin,
  Package,
  Users,
  ExternalLink,
  CheckCircle,
  Truck,
  Clock,
  Shield,
  Heart,
  Eye,
  MessageCircle,
  Award,
  Verified,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronRight,
  Sparkles,
  TrendingUp
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Enhanced vendor data with comprehensive information
const allVendors = [
  {
    id: "v1",
    name: "Electronics Hub Zambia",
    slug: "electronics-hub-zambia",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    rating: 4.8,
    reviewCount: 1240,
    verified: true,
    location: "Lusaka, Zambia",
    category: "Electronics",
    description: "Leading provider of quality electronics and tech gadgets in Zambia",
    specialties: ["Smartphones", "Laptops", "Gaming", "Audio"],
    products: 89,
    followers: 2340,
    joinedDate: "2019-03-15",
    responseTime: "Within 2 hours",
    shipping: ["Free Shipping", "Same Day Delivery"],
    badges: ["Top Seller", "Fast Response", "Premium Vendor"],
    featuredProducts: [
      "iPhone 15 Pro",
      "MacBook Air M2",
      "PlayStation 5"
    ],
    isOnline: true,
    lastSeen: "2 minutes ago",
    totalSales: 15600,
    satisfactionRate: 98
  },
  {
    id: "v2",
    name: "Zambian Heritage Fashion",
    slug: "zambian-heritage-fashion",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    rating: 4.9,
    reviewCount: 987,
    verified: true,
    location: "Ndola, Zambia",
    category: "Fashion",
    description: "Authentic Zambian traditional and contemporary fashion designs",
    specialties: ["Traditional Wear", "Modern Fashion", "Custom Design", "Accessories"],
    products: 156,
    followers: 1890,
    joinedDate: "2020-01-20",
    responseTime: "Within 1 hour",
    shipping: ["Free Shipping", "International Delivery"],
    badges: ["Choice Award", "Cultural Ambassador", "Designer"],
    featuredProducts: [
      "Chitenge Dresses",
      "Modern Ankara Styles",
      "Traditional Headwraps"
    ],
    isOnline: true,
    lastSeen: "5 minutes ago",
    totalSales: 8900,
    satisfactionRate: 99
  },
  {
    id: "v3",
    name: "Craft Collective ZM",
    slug: "craft-collective-zm",
    logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
    rating: 4.7,
    reviewCount: 654,
    verified: true,
    location: "Livingstone, Zambia",
    category: "Traditional Crafts",
    description: "Handcrafted traditional Zambian art and cultural artifacts",
    specialties: ["Wood Carving", "Pottery", "Jewelry", "Home Decor"],
    products: 73,
    followers: 1245,
    joinedDate: "2018-11-10",
    responseTime: "Within 4 hours",
    shipping: ["Careful Packaging", "Art Insurance"],
    badges: ["Artisan Verified", "Cultural Heritage", "Handmade"],
    featuredProducts: [
      "Makishi Masks",
      "Wooden Sculptures",
      "Traditional Baskets"
    ],
    isOnline: false,
    lastSeen: "1 hour ago",
    totalSales: 3400,
    satisfactionRate: 96
  },
  {
    id: "v4",
    name: "Lusaka Fresh Market",
    slug: "lusaka-fresh-market",
    logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=800&q=80",
    rating: 4.6,
    reviewCount: 2100,
    verified: true,
    location: "Lusaka, Zambia",
    category: "Food & Beverages",
    description: "Fresh produce and local Zambian food products delivered daily",
    specialties: ["Fresh Produce", "Local Delicacies", "Organic Foods", "Spices"],
    products: 245,
    followers: 3200,
    joinedDate: "2019-06-08",
    responseTime: "Within 30 minutes",
    shipping: ["Same Day Delivery", "Fresh Guarantee"],
    badges: ["Fresh Guaranteed", "Local Favorite", "Daily Fresh"],
    featuredProducts: [
      "Organic Vegetables",
      "Nshima Meal",
      "Local Fruits"
    ],
    isOnline: true,
    lastSeen: "Just now",
    totalSales: 22800,
    satisfactionRate: 94
  },
  {
    id: "v5",
    name: "Copper Belt Tools",
    slug: "copper-belt-tools",
    logo: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&q=80",
    rating: 4.5,
    reviewCount: 445,
    verified: true,
    location: "Kitwe, Zambia",
    category: "Tools & Hardware",
    description: "Professional tools and hardware for construction and mining",
    specialties: ["Power Tools", "Mining Equipment", "Construction", "Safety Gear"],
    products: 189,
    followers: 890,
    joinedDate: "2020-08-15",
    responseTime: "Within 3 hours",
    shipping: ["Bulk Orders", "Industrial Delivery"],
    badges: ["Industrial Supplier", "Professional Grade", "Bulk Specialist"],
    featuredProducts: [
      "Power Drills",
      "Safety Equipment",
      "Mining Tools"
    ],
    isOnline: false,
    lastSeen: "30 minutes ago",
    totalSales: 12300,
    satisfactionRate: 92
  },
  {
    id: "v6",
    name: "Zambezi Beauty House",
    slug: "zambezi-beauty-house",
    logo: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
    rating: 4.8,
    reviewCount: 1567,
    verified: true,
    location: "Lusaka, Zambia",
    category: "Health & Beauty",
    description: "Premium beauty products and skincare for African skin tones",
    specialties: ["Skincare", "Makeup", "Hair Care", "Natural Products"],
    products: 134,
    followers: 4500,
    joinedDate: "2019-09-22",
    responseTime: "Within 1 hour",
    shipping: ["Beauty Consultation", "Sample Packs"],
    badges: ["Beauty Expert", "Skin Specialist", "Natural Care"],
    featuredProducts: [
      "Shea Butter Products",
      "African Black Soap",
      "Hair Care Sets"
    ],
    isOnline: true,
    lastSeen: "3 minutes ago",
    totalSales: 18700,
    satisfactionRate: 97
  },
  {
    id: "v7",
    name: "Sports Zone Zambia",
    slug: "sports-zone-zambia",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
    rating: 4.4,
    reviewCount: 778,
    verified: true,
    location: "Ndola, Zambia",
    category: "Sports & Outdoors",
    description: "Complete sports equipment and outdoor gear for active lifestyles",
    specialties: ["Football Gear", "Running", "Fitness", "Outdoor Equipment"],
    products: 167,
    followers: 1650,
    joinedDate: "2020-02-14",
    responseTime: "Within 2 hours",
    shipping: ["Sports Gear", "Team Orders"],
    badges: ["Sports Official", "Team Supplier", "Fitness Expert"],
    featuredProducts: [
      "Football Boots",
      "Running Shoes",
      "Fitness Equipment"
    ],
    isOnline: true,
    lastSeen: "15 minutes ago",
    totalSales: 9800,
    satisfactionRate: 91
  },
  {
    id: "v8",
    name: "Book Corner Zambia",
    slug: "book-corner-zambia",
    logo: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    rating: 4.7,
    reviewCount: 523,
    verified: true,
    location: "Lusaka, Zambia",
    category: "Books & Media",
    description: "Educational books, literature, and digital media for all ages",
    specialties: ["Academic Books", "Literature", "Digital Media", "Children's Books"],
    products: 456,
    followers: 2100,
    joinedDate: "2018-05-30",
    responseTime: "Within 4 hours",
    shipping: ["Book Protection", "Educational Discounts"],
    badges: ["Educational Partner", "Literature Hub", "Academic Supplier"],
    featuredProducts: [
      "University Textbooks",
      "Zambian Literature",
      "Children's Stories"
    ],
    isOnline: false,
    lastSeen: "2 hours ago",
    totalSales: 7600,
    satisfactionRate: 95
  }
];

const categories = [
  "All Categories",
  "Electronics",
  "Fashion", 
  "Traditional Crafts",
  "Food & Beverages",
  "Tools & Hardware",
  "Health & Beauty",
  "Sports & Outdoors",
  "Books & Media"
];

const locations = [
  "All Locations",
  "Lusaka",
  "Ndola", 
  "Kitwe",
  "Livingstone",
  "Kabwe",
  "Chingola",
  "Mufulira"
];

const sortOptions = [
  { value: "rating", label: "Highest Rated" },
  { value: "reviews", label: "Most Reviews" },
  { value: "newest", label: "Newest First" },
  { value: "products", label: "Most Products" },
  { value: "sales", label: "Best Selling" },
  { value: "name", label: "A-Z" }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

const sparkleVariants = {
  initial: { scale: 0, rotate: 0 },
  animate: { 
    scale: [0, 1, 0], 
    rotate: [0, 180, 360],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop" as const
    }
  }
};

// Hero Section Component
function VendorsHeroSection() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50 py-16 md:py-24"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            variants={sparkleVariants}
            initial="initial"
            animate="animate"
            style={{ 
              animationDelay: `${i * 0.4}s`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
            className="absolute w-4 h-4 text-emerald-400 opacity-60"
          >
            <Sparkles className="w-full h-full" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div variants={itemVariants} className="space-y-8">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-100 to-green-100 px-6 py-3 text-sm border border-emerald-200/50"
            >
              <Store className="mr-2 h-5 w-5 text-emerald-600" />
              <span className="text-emerald-800 font-semibold">Discover Verified Vendors</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="text-slate-900">Explore All</span>
              <span className="block bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                Trusted Vendors
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Connect with verified sellers across Zambia. From electronics to traditional crafts, 
              find quality products from trusted local businesses.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <span>All Vendors Verified</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full">
              <Shield className="h-4 w-4 text-emerald-600" />
              <span>Secure Transactions</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full">
              <Truck className="h-4 w-4 text-emerald-600" />
              <span>Fast Delivery</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Vendor Card Component
function VendorCard({ vendor, index }: { vendor: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group"
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white rounded-2xl">
        {/* Cover Image */}
        <div className="relative h-32 overflow-hidden">
          <Image
            src={vendor.coverImage}
            alt={`${vendor.name} cover`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Online Status */}
          <div className="absolute top-3 right-3">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              vendor.isOnline 
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                : 'bg-gray-100 text-gray-600 border border-gray-200'
            }`}>
              <div className={`w-2 h-2 rounded-full ${vendor.isOnline ? 'bg-emerald-500' : 'bg-gray-400'}`} />
              {vendor.isOnline ? 'Online' : 'Offline'}
            </div>
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          {/* Vendor Header */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <Image
                src={vendor.logo}
                alt={vendor.name}
                width={60}
                height={60}
                className="rounded-2xl object-cover border-2 border-white shadow-md"
              />
              {vendor.verified && (
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-900 truncate">{vendor.name}</h3>
                {vendor.verified && (
                  <Verified className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                )}
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium">{vendor.rating}</span>
                <span>({vendor.reviewCount.toLocaleString()})</span>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin className="h-3 w-3" />
                <span>{vendor.location}</span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity p-2"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {vendor.description}
          </p>

          {/* Categories/Specialties */}
          <div className="flex flex-wrap gap-1">
            {vendor.specialties.slice(0, 3).map((specialty: string) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
            {vendor.specialties.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{vendor.specialties.length - 3}
              </Badge>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-100">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{vendor.products}</div>
              <div className="text-xs text-gray-500">Products</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{vendor.followers}</div>
              <div className="text-xs text-gray-500">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{vendor.satisfactionRate}%</div>
              <div className="text-xs text-gray-500">Satisfaction</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white"
              asChild
            >
              <Link href={`/vendor/${vendor.slug}`}>
                <Store className="h-4 w-4 mr-2" />
                Visit Store
              </Link>
            </Button>
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {/* Response Time */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Responds {vendor.responseTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Package className="h-3 w-3" />
              <span>{vendor.shipping[0]}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Main Page Component
function VendorsPageContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  
  const itemsPerPage = 12;

  // Filter and sort vendors
  const filteredVendors = useMemo(() => {
    let filtered = allVendors.filter(vendor => {
      const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           vendor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           vendor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === "All Categories" || vendor.category === selectedCategory;
      const matchesLocation = selectedLocation === "All Locations" || vendor.location.includes(selectedLocation);
      
      return matchesSearch && matchesCategory && matchesLocation;
    });

    // Sort vendors
    switch (sortBy) {
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "reviews":
        return filtered.sort((a, b) => b.reviewCount - a.reviewCount);
      case "newest":
        return filtered.sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime());
      case "products":
        return filtered.sort((a, b) => b.products - a.products);
      case "sales":
        return filtered.sort((a, b) => b.totalSales - a.totalSales);
      case "name":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [searchQuery, selectedCategory, selectedLocation, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
  const paginatedVendors = filteredVendors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <Header />
      
      <main>
        <VendorsHeroSection />

        {/* Search and Filters Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="py-8 bg-white border-b border-gray-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search vendors by name, category, or products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base rounded-xl border-gray-200 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="h-12 px-6 lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Filters Row */}
            <motion.div 
              className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: showFilters ? 1 : 1, 
                height: showFilters ? 'auto' : 'auto' 
              }}
            >
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  onClick={() => setViewMode("grid")}
                  className="flex-1"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  onClick={() => setViewMode("list")}
                  className="flex-1"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Results Summary */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="py-6 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredVendors.length} Vendor{filteredVendors.length !== 1 ? 's' : ''} Found
                </h2>
                {searchQuery && (
                  <Badge variant="outline" className="text-emerald-600">
                    "{searchQuery}"
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Page {currentPage} of {totalPages}</span>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  <span>All verified sellers</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Vendors Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="py-12 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredVendors.length > 0 ? (
              <>
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className={`grid gap-6 ${
                    viewMode === "grid" 
                      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                      : "grid-cols-1 max-w-4xl mx-auto"
                  }`}
                >
                  {paginatedVendors.map((vendor, index) => (
                    <VendorCard key={vendor.id} vendor={vendor} index={index} />
                  ))}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-center mt-12"
                  >
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      
                      {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        const pageNum = i + 1;
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            onClick={() => setCurrentPage(pageNum)}
                            className="w-10"
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                      
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              /* No Results */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <Store className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No vendors found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or filters to find more vendors.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Categories");
                    setSelectedLocation("All Locations");
                  }}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16 bg-gradient-to-r from-emerald-600 to-green-700"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Want to Become a Vendor?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Join our marketplace and reach thousands of customers across Zambia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-emerald-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold"
                asChild
              >
                <Link href="/signup?role=retailer">
                  Start Selling Today
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold"
                asChild
              >
                <Link href="/for-retailers">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </motion.div>
  );
}

export default function VendorsPage() {
  return <VendorsPageContent />;
}
