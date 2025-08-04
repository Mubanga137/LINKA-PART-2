"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ShoppingBag,
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  ShoppingCart,
  Store,
  Heart,
  MapPin,
  Truck,
  Shield,
  Zap,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronDown,
  Tag,
  Clock,
  X,
  Package,
  TrendingUp,
  Sparkles,
  Eye,
  Award,
  CheckCircle,
  Users,
  Timer,
  Flame,
  Phone,
  HeadphonesIcon,
  CreditCard,
  MessageCircle,
  ExternalLink,
  Verified,
  Crown,
  ChevronRight,
  ArrowRight,
  StarIcon,
  ThumbsUp,
  ShieldCheck,
  Headphones,
  RefreshCw,
  Gift,
  Percent,
  Smartphone,
  Shirt,
  Home,
  Paintbrush,
  Dumbbell,
  BookOpen,
  Gem,
  UtensilsCrossed,
  Palette
} from "lucide-react";
import { MarketplaceProvider, useCart, useFavorites } from "@/contexts/marketplace-context";
import { ProductDetailModal } from "@/components/marketplace/ProductDetailModal";
import { CategoryNavigation, HorizontalCategoryNav } from "@/components/marketplace/CategoryNavigation";
import { OptimizedProductCard } from "@/components/marketplace/OptimizedProductCard";
import { SmartSearch } from "@/components/marketplace/smart-search";
import { TrendingNowSection } from "@/components/marketplace/trending-now-section";
import { RecommendedSection } from "@/components/marketplace/recommended-section";
import { VerifiedVendorsSection } from "@/components/marketplace/verified-vendors-section";
import { MobileBottomNav } from "@/components/marketplace/mobile-bottom-nav";
import type { Product, MarketplaceFilters, Category } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

// Enhanced mock data with trending vendors and featured content
const mockCategories = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics",
    icon: Smartphone,
    productCount: 1248,
    featured: true,
    color: "from-blue-500 to-indigo-600",
    bgColor: "from-blue-50 to-indigo-50"
  },
  {
    id: "2",
    name: "Fashion",
    slug: "fashion",
    icon: Shirt,
    productCount: 892,
    featured: true,
    color: "from-pink-500 to-rose-600",
    bgColor: "from-pink-50 to-rose-50"
  },
  {
    id: "3",
    name: "Home & Garden",
    slug: "home-garden",
    icon: Home,
    productCount: 567,
    color: "from-green-500 to-emerald-600",
    bgColor: "from-green-50 to-emerald-50"
  },
  {
    id: "4",
    name: "Health & Beauty",
    slug: "health-beauty",
    icon: Sparkles,
    productCount: 334,
    color: "from-purple-500 to-violet-600",
    bgColor: "from-purple-50 to-violet-50"
  },
  {
    id: "5",
    name: "Sports & Outdoors",
    slug: "sports",
    icon: Dumbbell,
    productCount: 423,
    color: "from-orange-500 to-amber-600",
    bgColor: "from-orange-50 to-amber-50"
  },
  {
    id: "6",
    name: "Books & Media",
    slug: "books",
    icon: BookOpen,
    productCount: 198,
    color: "from-teal-500 to-cyan-600",
    bgColor: "from-teal-50 to-cyan-50"
  },
  {
    id: "7",
    name: "Jewelry & Accessories",
    slug: "jewelry",
    icon: Gem,
    productCount: 156,
    featured: true,
    color: "from-yellow-500 to-orange-600",
    bgColor: "from-yellow-50 to-orange-50"
  },
  {
    id: "8",
    name: "Food & Beverages",
    slug: "food",
    icon: UtensilsCrossed,
    productCount: 445,
    color: "from-red-500 to-pink-600",
    bgColor: "from-red-50 to-pink-50"
  },
  {
    id: "9",
    name: "Traditional Crafts",
    slug: "crafts",
    icon: Palette,
    productCount: 267,
    featured: true,
    color: "from-indigo-500 to-purple-600",
    bgColor: "from-indigo-50 to-purple-50"
  }
];

const featuredVendors = [
  {
    id: "v1",
    name: "Electronics Hub Zambia",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&q=80",
    rating: 4.8,
    reviewCount: 1240,
    verified: true,
    products: 89,
    specialties: ["Electronics", "Gaming"],
    badge: "Top Seller"
  },
  {
    id: "v2",
    name: "Zambian Heritage Fashion",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&q=80",
    rating: 4.9,
    reviewCount: 987,
    verified: true,
    products: 156,
    specialties: ["Traditional", "Fashion"],
    badge: "Choice Award"
  },
  {
    id: "v3",
    name: "Craft Collective ZM",
    logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&q=80",
    rating: 4.7,
    reviewCount: 654,
    verified: true,
    products: 73,
    specialties: ["Handmade", "Crafts"],
    badge: "Artisan Verified"
  }
];

const flashSaleProducts: Product[] = [
  {
    id: "fs1",
    name: "Gaming Headset Pro",
    description: "Professional gaming headset with 7.1 surround sound",
    price: 79.99,
    originalPrice: 149.99,
    images: ["https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=800&q=80"],
    category: "Electronics",
    inStock: true,
    stockQuantity: 25,
    rating: 4.8,
    reviewCount: 189,
    tags: ["gaming", "headset", "flash-sale"],
    vendor: { id: "v1", name: "Electronics Hub Zambia", logo: "" },
    discountPercentage: 47,
    featured: true,
    fastDelivery: true,
    freeShipping: true,
    hotDeal: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    timeLeft: "2h 34m"
  },
  {
    id: "fs2",
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracker with heart rate monitoring",
    price: 159.99,
    originalPrice: 299.99,
    images: ["https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&q=80"],
    category: "Electronics",
    inStock: true,
    stockQuantity: 15,
    rating: 4.7,
    reviewCount: 245,
    tags: ["smartwatch", "fitness", "flash-sale"],
    vendor: { id: "v1", name: "Electronics Hub Zambia", logo: "" },
    discountPercentage: 47,
    featured: true,
    fastDelivery: true,
    freeShipping: true,
    hotDeal: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    timeLeft: "2h 34m"
  }
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
  hidden: { opacity: 0, y: 30 },
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

// Enhanced Hero Section Component
function EnhancedHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [animateSearch, setAnimateSearch] = useState(false);

  const heroSlides = [
    {
      title: "Discover Amazing Products",
      subtitle: "From Local Zambian Vendors",
      description: "Support local businesses while finding exactly what you need",
      cta: "Explore Now",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      color: "from-blue-600 to-purple-600"
    },
    {
      title: "Flash Sale Alert!",
      subtitle: "Up to 50% Off Selected Items",
      description: "Limited time offers on trending products",
      cta: "Shop Sale",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800&q=80",
      color: "from-red-500 to-orange-500"
    },
    {
      title: "Verified Vendors",
      subtitle: "Quality Guaranteed",
      description: "Shop with confidence from our trusted seller network",
      cta: "Browse Vendors",
      image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80",
      color: "from-green-500 to-teal-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setAnimateSearch(true);
      const timer = setTimeout(() => setAnimateSearch(false), 300);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 md:py-20"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            variants={sparkleVariants}
            initial="initial"
            animate="animate"
            style={{ 
              animationDelay: `${i * 0.5}s`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
            className="absolute w-4 h-4 text-blue-400 opacity-60"
          >
            <Sparkles className="w-full h-full" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-green-100 px-4 py-2 text-sm border border-blue-200/50"
              >
                <ShoppingBag className="mr-2 h-4 w-4 text-blue-600" />
                <span className="text-blue-800 font-medium">Zambia's Premier E-commerce Platform</span>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    <span className="text-slate-900">{heroSlides[currentSlide].title}</span>
                    <span className={`block bg-gradient-to-r ${heroSlides[currentSlide].color} bg-clip-text text-transparent`}>
                      {heroSlides[currentSlide].subtitle}
                    </span>
                  </h1>
                  
                  <p className="text-xl text-slate-600 leading-relaxed">
                    {heroSlides[currentSlide].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Smart Search Bar */}
            <motion.div variants={itemVariants} className="relative">
              <SmartSearch
                onSearch={(query) => {
                  setSearchQuery(query);
                  // Handle search logic here
                  console.log('Search query:', query);
                }}
                placeholder="Search for products, vendors, or categories..."
              />
            </motion.div>

            {/* Quick Actions - Enhanced with Color Palettes */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {[
                {
                  icon: Star,
                  label: "Featured",
                  color: "from-yellow-400 to-orange-400",
                  hoverColor: "from-yellow-500 to-orange-500",
                  textColor: "text-yellow-700",
                  href: "/marketplace/featured"
                },
                {
                  icon: Zap,
                  label: "Flash Sale",
                  color: "from-red-400 to-pink-400",
                  hoverColor: "from-red-500 to-pink-500",
                  textColor: "text-red-700",
                  href: "/marketplace/flash-sale"
                },
                {
                  icon: Crown,
                  label: "Premium",
                  color: "from-purple-400 to-indigo-400",
                  hoverColor: "from-purple-500 to-indigo-500",
                  textColor: "text-purple-700",
                  href: "/marketplace/premium"
                },
                {
                  icon: Truck,
                  label: "Free Ship",
                  color: "from-green-400 to-emerald-400",
                  hoverColor: "from-green-500 to-emerald-500",
                  textColor: "text-green-700",
                  href: "/marketplace/free-shipping"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  whileHover={{
                    scale: 1.08,
                    y: -3,
                    rotate: [0, -1, 1, 0],
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.8 + index * 0.15,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                >
                  <Button
                    variant="outline"
                    className={`
                      bg-gradient-to-r ${item.color} bg-opacity-20
                      border-0 hover:bg-opacity-30
                      hover:shadow-xl hover:shadow-${item.color.split('-')[1]}-500/25
                      transition-all duration-500 ease-out
                      backdrop-blur-sm
                      hover:bg-gradient-to-r hover:${item.hoverColor}
                      ${item.textColor} hover:text-white
                      font-semibold px-6 py-3 rounded-xl
                      group overflow-hidden relative
                    `}
                    asChild
                  >
                    <Link href={item.href}>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))` }}
                      />
                      <motion.div
                        className="relative z-10 flex items-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.label}
                      </motion.div>
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            {/* Hero CTA */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg"
                  className={`bg-gradient-to-r ${heroSlides[currentSlide].color} text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  {heroSlides[currentSlide].cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-gray-300 hover:border-gray-400 px-8 py-4 rounded-xl font-semibold"
                >
                  Browse Categories
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Featured Vendors */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Featured Vendors</h3>
              <p className="text-gray-600">Trusted sellers with excellent ratings</p>
            </div>

            <div className="grid gap-4">
              {featuredVendors.slice(0, 3).map((vendor, index) => (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                  className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Image
                        src={vendor.logo}
                        alt={vendor.name}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                      {vendor.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{vendor.name}</h4>
                        <Badge className="bg-green-100 text-green-700 text-xs px-2 py-1">
                          {vendor.badge}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{vendor.rating}</span>
                          <span>({vendor.reviewCount})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="h-4 w-4" />
                          <span>{vendor.products} products</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-1 mt-2">
                        {vendor.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="outline" 
                className="w-full border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-600 hover:text-blue-600 py-3 rounded-xl transition-all duration-300"
                asChild
              >
                <Link href="/retailers">
                  View All Vendors
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Hero Slide Indicators */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center mt-12 gap-2"
        >
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-blue-600 w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

// Shop by Category Section
function ShopByCategorySection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="py-16 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of products from verified local vendors
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8"
        >
          {mockCategories.slice(0, 10).map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.08,
                y: -8,
                rotateY: 5,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.95 }}
              className="group cursor-pointer"
            >
              <Link href={`/categories/${category.slug}`}>
                <Card className={`
                  relative overflow-hidden text-center p-6
                  hover:shadow-2xl transition-all duration-500
                  border-0 shadow-lg rounded-2xl
                  bg-gradient-to-br ${category.bgColor}
                  hover:bg-gradient-to-br hover:${category.color.replace('500', '100').replace('600', '200')}
                  group-hover:border-white/50
                `}>
                  <CardContent className="p-0 relative z-10">
                    {/* Animated Background Glow */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
                      whileHover={{ opacity: 0.15 }}
                    />

                    {/* Icon Container */}
                    <motion.div
                      whileHover={{
                        scale: 1.2,
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.6 }
                      }}
                      className={`
                        w-16 h-16 mx-auto mb-4 rounded-2xl
                        bg-gradient-to-r ${category.color}
                        flex items-center justify-center
                        shadow-lg group-hover:shadow-xl
                        transition-all duration-300
                      `}
                    >
                      <category.icon className="h-8 w-8 text-white" />
                    </motion.div>

                    <motion.h3
                      className="font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors text-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      {category.name}
                    </motion.h3>

                    <motion.p
                      className="text-sm text-gray-600 mb-4 font-medium"
                      whileHover={{ scale: 1.02 }}
                    >
                      {category.productCount.toLocaleString()} items
                    </motion.p>

                    {category.featured && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >
                        <Badge className={`
                          bg-gradient-to-r ${category.color}
                          text-white text-xs px-3 py-1 rounded-full
                          shadow-md group-hover:shadow-lg
                          animate-pulse
                        `}>
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </motion.div>
                    )}

                    {/* Floating Particles Effect */}
                    <motion.div
                      className="absolute top-2 right-2 w-2 h-2 bg-white/40 rounded-full opacity-0 group-hover:opacity-100"
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    />
                    <motion.div
                      className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-white/30 rounded-full opacity-0 group-hover:opacity-100"
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    />
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg"
              asChild
            >
              <Link href="/categories">
                Explore All Categories
                <Grid3X3 className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Flash Sales Section
function FlashSalesSection() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 34,
    seconds: 15
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="py-16 bg-gradient-to-r from-red-50 to-orange-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
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
              className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <Flame className="text-white text-2xl" />
            </motion.div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                Flash Sales
                <Badge className="bg-red-500 text-white animate-pulse">LIVE</Badge>
              </h2>
              <p className="text-gray-600">Limited time offers - Up to 50% off!</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white rounded-xl p-4 shadow-lg border"
          >
            <div className="flex items-center gap-2 text-red-600 font-bold text-xl">
              <Timer className="h-5 w-5" />
              <span>
                {timeLeft.hours.toString().padStart(2, '0')}:
                {timeLeft.minutes.toString().padStart(2, '0')}:
                {timeLeft.seconds.toString().padStart(2, '0')}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Time remaining</p>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {flashSaleProducts.concat(flashSaleProducts).slice(0, 4).map((product, index) => (
            <motion.div
              key={`${product.id}-${index}`}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <Badge className="bg-red-500 text-white text-xs px-2 py-1 animate-pulse">
                      <Flame className="h-3 w-3 mr-1" />
                      Flash Sale
                    </Badge>
                    <Badge className="bg-red-600 text-white text-xs px-2 py-1">
                      -{product.discountPercentage}%
                    </Badge>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-white/80 hover:bg-white rounded-full"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-red-600">
                      K{product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      K{product.originalPrice?.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{product.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-red-600">
                      <Timer className="h-3 w-3" />
                      <span>{product.timeLeft}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mt-8">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white px-8 py-4 rounded-xl font-semibold"
              asChild
            >
              <Link href="/hot-deals">
                View All Flash Sales
                <Flame className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Support & Trust Section
function SupportTrustSection() {
  const trustFeatures = [
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      description: "256-bit SSL encryption for all transactions",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Same-day delivery in major cities",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer assistance",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "30-day hassle-free return policy",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="py-16 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Linka?
          </h2>
          <p className="text-xl text-gray-600">
            Your security and satisfaction are our top priorities
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg`}
              >
                <feature.icon className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Verified Vendors</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-purple-600" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-orange-600" />
                <span>Safe Payments</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Main Marketplace Content Component
function MarketplaceContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<MarketplaceFilters>({
    sortBy: 'relevance'
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white"
    >
      <Header />
      
      <main>
        <EnhancedHeroSection />
        <ShopByCategorySection />
        <FlashSalesSection />
        <TrendingNowSection
          onAddToCart={(product) => console.log('Add to cart:', product)}
          onToggleWishlist={(productId) => console.log('Toggle wishlist:', productId)}
          wishlistedItems={new Set()}
        />

        {/* Additional CTA Section for more marketplace features */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Explore More Marketplace Features
              </h2>
              <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                Discover trending products, browse verified vendors, and shop amazing sales
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Trending Now",
                  desc: "See what's hot right now",
                  href: "/marketplace/trending",
                  icon: TrendingUp,
                  color: "from-pink-500 to-red-500"
                },
                {
                  title: "Shop the Sale",
                  desc: "Massive discounts available",
                  href: "/marketplace/shop-sale",
                  icon: Tag,
                  color: "from-red-500 to-orange-500"
                },
                {
                  title: "Browse Vendors",
                  desc: "Trusted verified sellers",
                  href: "/marketplace/vendors",
                  icon: Store,
                  color: "from-green-500 to-emerald-500"
                },
                {
                  title: "All Categories",
                  desc: "Complete product catalog",
                  href: "/categories",
                  icon: Grid3X3,
                  color: "from-blue-500 to-indigo-500"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href={feature.href}>
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                          <feature.icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-indigo-100 text-sm">{feature.desc}</p>
                        <div className="mt-4">
                          <Badge className="bg-white/20 text-white border-white/30">
                            Explore Now
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        <RecommendedSection
          onAddToCart={(product) => console.log('Add to cart:', product)}
          onToggleWishlist={(productId) => console.log('Toggle wishlist:', productId)}
          wishlistedItems={new Set()}
        />
        <VerifiedVendorsSection
          onFollowVendor={(vendorId) => console.log('Follow vendor:', vendorId)}
          followedVendors={new Set()}
        />

        {/* Quick Access Grid */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-16 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Quick Access to Popular Features
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need is just one click away
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                {
                  title: "Featured",
                  href: "/marketplace/featured",
                  icon: Star,
                  color: "from-yellow-400 to-orange-400",
                  bgColor: "from-yellow-50 to-orange-50",
                  description: "Handpicked premium items"
                },
                {
                  title: "Flash Sale",
                  href: "/marketplace/flash-sale",
                  icon: Flame,
                  color: "from-red-400 to-pink-400",
                  bgColor: "from-red-50 to-pink-50",
                  description: "Limited time offers"
                },
                {
                  title: "Premium",
                  href: "/marketplace/premium",
                  icon: Crown,
                  color: "from-purple-400 to-indigo-400",
                  bgColor: "from-purple-50 to-indigo-50",
                  description: "Luxury & exclusive"
                },
                {
                  title: "Free Ship",
                  href: "/marketplace/free-shipping",
                  icon: Truck,
                  color: "from-green-400 to-emerald-400",
                  bgColor: "from-green-50 to-emerald-50",
                  description: "No delivery charges"
                },
                {
                  title: "Trending",
                  href: "/marketplace/trending",
                  icon: TrendingUp,
                  color: "from-pink-400 to-red-400",
                  bgColor: "from-pink-50 to-red-50",
                  description: "What's popular now"
                },
                {
                  title: "Vendors",
                  href: "/marketplace/vendors",
                  icon: Store,
                  color: "from-emerald-400 to-green-400",
                  bgColor: "from-emerald-50 to-green-50",
                  description: "Trusted sellers"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  whileHover={{
                    scale: 1.08,
                    y: -5,
                    rotate: [0, 2, -2, 0],
                    transition: { duration: 0.4 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href={item.href}>
                    <Card className={`
                      relative overflow-hidden text-center p-5
                      hover:shadow-2xl transition-all duration-500
                      border-0 shadow-lg rounded-2xl
                      bg-gradient-to-br ${item.bgColor}
                      group cursor-pointer
                    `}>
                      <CardContent className="p-0 relative z-10">
                        {/* Animated Background */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                          whileHover={{ opacity: 0.15 }}
                        />

                        {/* Icon with enhanced animation */}
                        <motion.div
                          whileHover={{
                            scale: 1.3,
                            rotate: 360,
                            transition: { duration: 0.8 }
                          }}
                          className={`
                            w-14 h-14 bg-gradient-to-r ${item.color}
                            rounded-2xl flex items-center justify-center
                            mx-auto mb-3 shadow-lg group-hover:shadow-xl
                            transition-all duration-300
                          `}
                        >
                          <item.icon className="h-7 w-7 text-white" />
                        </motion.div>

                        <motion.h3
                          className="font-bold text-gray-900 text-sm mb-1 group-hover:text-gray-800"
                          whileHover={{ scale: 1.05 }}
                        >
                          {item.title}
                        </motion.h3>

                        <motion.p
                          className="text-xs text-gray-600 font-medium"
                          whileHover={{ scale: 1.02 }}
                        >
                          {item.description}
                        </motion.p>

                        {/* Floating effect particles */}
                        <motion.div
                          className="absolute top-1 right-1 w-1.5 h-1.5 bg-white/40 rounded-full opacity-0 group-hover:opacity-100"
                          animate={{
                            y: [0, -8, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        <SupportTrustSection />

        {/* Newsletter Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Stay Updated with Latest Deals
              </h2>
              <p className="text-xl text-blue-100">
                Get exclusive offers, new arrivals, and flash sale alerts delivered to your inbox
              </p>
              
              <motion.div
                variants={itemVariants}
                className="max-w-md mx-auto"
              >
                <div className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:bg-white/20"
                  />
                  <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 font-semibold">
                    Subscribe
                  </Button>
                </div>
              </motion.div>
              
              <div className="flex items-center justify-center gap-4 text-blue-200 text-sm">
                <div className="flex items-center gap-1">
                  <Gift className="h-4 w-4" />
                  <span>Exclusive Offers</span>
                </div>
                <div className="flex items-center gap-1">
                  <Percent className="h-4 w-4" />
                  <span>Early Access</span>
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="h-4 w-4" />
                  <span>New Arrivals</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </motion.div>
  );
}

export default function MarketplacePage() {
  return (
    <MarketplaceProvider>
      <MarketplaceContent />
    </MarketplaceProvider>
  );
}
