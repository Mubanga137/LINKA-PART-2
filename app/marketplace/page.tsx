"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { useFavorites } from "@/contexts/marketplace-context";
import { 
  Search,
  Filter,
  Home,
  Store,
  Briefcase,
  Package,
  Heart,
  ShoppingCart,
  HelpCircle,
  User,
  Menu,
  X,
  Star,
  Clock,
  TrendingUp,
  Flame,
  Zap,
  Crown,
  Award,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  ArrowUp,
  MapPin,
  Shield,
  Timer,
  Percent,
  Gift,
  Sparkles,
  Eye,
  Plus,
  MessageCircle,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Globe,
  Truck,
  CreditCard,
  RefreshCw,
  Layers,
  Target,
  Bookmark,
  Share2,
  ExternalLink,
  PlayCircle,
  Download,
  Upload,
  Settings,
  Bell,
  Mic,
  Camera,
  Video
} from "lucide-react";

export default function MarketplacePage() {
  const { user } = useAuth();
  const { addToCart, totalItems } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Animated background position
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    const animateBg = () => {
      setBgPosition(prev => ({
        x: (prev.x + 0.5) % 100,
        y: (prev.y + 0.3) % 100
      }));
    };

    window.addEventListener('scroll', handleScroll);
    const bgInterval = setInterval(animateBg, 50);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(bgInterval);
    };
  }, []);

  // Navigation items for sidebar
  const navigationItems = [
    { icon: Home, label: "Home", href: "/customer-dashboard", badge: null },
    { icon: Store, label: "Shop", href: "/marketplace", badge: null, active: true },
    { icon: Briefcase, label: "Services", href: "/services", badge: "New" },
    { icon: Package, label: "Orders", href: "/orders", badge: "3" },
    { icon: Heart, label: "Wishlist", href: "/wishlist", badge: favorites.length },
    { icon: ShoppingCart, label: "Cart", href: "/cart", badge: totalItems },
    { icon: HelpCircle, label: "Help", href: "/help", badge: null },
    { icon: User, label: "Profile", href: "/profile", badge: null }
  ];

  // Service categories with real data
  const serviceCategories = [
    {
      id: 1,
      name: "Financial Services",
      icon: CreditCard,
      count: "95+ providers",
      description: "Banking, loans, insurance & more",
      href: "/financial-services",
      gradient: "from-emerald-400 via-emerald-500 to-green-600",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
      trending: true,
      verified: true
    },
    {
      id: 2,
      name: "Health & Wellness",
      icon: Heart,
      count: "120+ providers",
      description: "Medical care, fitness & wellness",
      href: "/services/health-wellness",
      gradient: "from-pink-400 via-rose-500 to-red-600",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      trending: true,
      verified: true
    },
    {
      id: 3,
      name: "Courier & Delivery",
      icon: Truck,
      count: "85+ drivers",
      description: "Fast delivery & logistics",
      href: "/services/courier-delivery",
      gradient: "from-blue-400 via-blue-500 to-indigo-600",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop",
      trending: false,
      verified: true
    },
    {
      id: 4,
      name: "Home Services",
      icon: Home,
      count: "60+ professionals",
      description: "Cleaning, repairs & maintenance",
      href: "/services/home-services",
      gradient: "from-purple-400 via-purple-500 to-indigo-600",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
      trending: false,
      verified: true
    }
  ];

  // Flash deals with countdown
  const flashDeals = [
    {
      id: 1,
      name: "Professional Photography Session",
      originalPrice: 450,
      salePrice: 199,
      discount: 56,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
      vendor: "Studio Vision Pro",
      rating: 4.9,
      timeLeft: { hours: 12, minutes: 34, seconds: 56 },
      soldCount: 23,
      totalStock: 50
    },
    {
      id: 2,
      name: "Premium Zambian Honey Bundle",
      originalPrice: 180,
      salePrice: 89,
      discount: 51,
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2Fb92a8e5b385c400ba9c8823b431aca28?format=webp&width=800",
      vendor: "Phiri Organic Foods",
      rating: 4.8,
      timeLeft: { hours: 8, minutes: 15, seconds: 42 },
      soldCount: 45,
      totalStock: 100
    },
    {
      id: 3,
      name: "Traditional Chitenge Collection",
      originalPrice: 320,
      salePrice: 159,
      discount: 50,
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2Fa2f294111b514f3eb8bbc4805acb9326?format=webp&width=800",
      vendor: "Banda Fashion House",
      rating: 4.7,
      timeLeft: { hours: 6, minutes: 45, seconds: 18 },
      soldCount: 12,
      totalStock: 30
    }
  ];

  // Featured vendors
  const featuredVendors = [
    {
      id: 1,
      name: "Copper Craft Artisans",
      logo: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F12e840cc58ab4f23b45914a038f372d6?format=webp&width=800",
      rating: 4.9,
      products: 45,
      category: "Jewelry & Crafts",
      verified: true,
      href: "/vendors/1"
    },
    {
      id: 2,
      name: "African Art Gallery",
      logo: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F193aadcc44264a96895e35bdd60c3a0b?format=webp&width=800",
      rating: 4.8,
      products: 128,
      category: "Art & Culture",
      verified: true,
      href: "/vendors/2"
    },
    {
      id: 3,
      name: "BuildPro Equipment",
      logo: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2Fe028a2a0e1ba45cc987d661ce8dd8b71?format=webp&width=800",
      rating: 4.7,
      products: 89,
      category: "Tools & Hardware",
      verified: true,
      href: "/vendors/3"
    },
    {
      id: 4,
      name: "Mwanza Traditional Crafts",
      logo: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F4000a4aa85ff48ffa6796cab08da052e?format=webp&width=800",
      rating: 4.6,
      products: 67,
      category: "Traditional Crafts",
      verified: false,
      href: "/vendors/4"
    }
  ];

  // Recommended products (AI-powered placeholder)
  const recommendedProducts = [
    {
      id: 1,
      name: "Handwoven Copper Bracelet Set",
      price: 145,
      originalPrice: 180,
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F12e840cc58ab4f23b45914a038f372d6?format=webp&width=800",
      vendor: "Copper Craft Artisans",
      rating: 4.9,
      reviews: 156,
      aiReason: "Based on your jewelry preferences",
      inStock: true,
      fastDelivery: true
    },
    {
      id: 2,
      name: "Professional Tool Kit",
      price: 289,
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2Fe028a2a0e1ba45cc987d661ce8dd8b71?format=webp&width=800",
      vendor: "BuildPro Equipment",
      rating: 4.8,
      reviews: 98,
      aiReason: "Similar to recently viewed items",
      inStock: true,
      fastDelivery: false
    },
    {
      id: 3,
      name: "Artisan Wooden Sculpture",
      price: 567,
      originalPrice: 650,
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F193aadcc44264a96895e35bdd60c3a0b?format=webp&width=800",
      vendor: "African Art Gallery",
      rating: 4.9,
      reviews: 234,
      aiReason: "Trending in your area",
      inStock: true,
      fastDelivery: true
    },
    {
      id: 4,
      name: "Traditional Basket Collection",
      price: 125,
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F4000a4aa85ff48ffa6796cab08da052e?format=webp&width=800",
      vendor: "Mwanza Traditional Crafts",
      rating: 4.6,
      reviews: 67,
      aiReason: "Perfect for your home style",
      inStock: false,
      fastDelivery: false
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Pinkish-Blue Gradient Background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at ${bgPosition.x}% ${bgPosition.y}%, rgba(219, 39, 119, 0.15) 0%, transparent 50%),
              radial-gradient(circle at ${100 - bgPosition.x}% ${100 - bgPosition.y}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
              linear-gradient(135deg, 
                rgba(236, 72, 153, 0.08) 0%, 
                rgba(147, 51, 234, 0.08) 25%, 
                rgba(59, 130, 246, 0.08) 50%, 
                rgba(16, 185, 129, 0.08) 75%, 
                rgba(236, 72, 153, 0.08) 100%
              )
            `,
            backgroundSize: '200% 200%'
          }}
        />
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 opacity-50"
          style={{
            background: 'linear-gradient(45deg, rgba(219, 39, 119, 0.05), rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))',
            backgroundSize: '400% 400%'
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() > 0.5 ? 20 : -20, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {(sidebarOpen || !sidebarCollapsed) && (
          <>
            {/* Mobile Overlay */}
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              />
            )}

            {/* Sidebar */}
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed left-0 top-0 h-full bg-white/95 backdrop-blur-xl border-r border-pink-200/50 shadow-2xl z-50 ${
                sidebarCollapsed ? 'w-20' : 'w-80'
              } transition-all duration-300`}
            >
              {/* Sidebar Header */}
              <div className="p-6 border-b border-pink-100">
                <div className="flex items-center justify-between">
                  {!sidebarCollapsed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <Store className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="font-bold text-gray-900">Marketplace</h2>
                        <p className="text-sm text-gray-600">Shop & Services</p>
                      </div>
                    </motion.div>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link href={item.href}>
                        <Button
                          variant={item.active ? "default" : "ghost"}
                          className={`w-full justify-start gap-3 h-auto py-3 px-3 text-left group transition-all duration-300 ${
                            item.active 
                              ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-lg' 
                              : 'hover:bg-gradient-to-r hover:from-pink-50 hover:to-blue-50'
                          } ${sidebarCollapsed ? 'px-2' : ''}`}
                          onClick={() => {
                            if (window.innerWidth < 1024) {
                              setSidebarOpen(false);
                            }
                          }}
                        >
                          <div className="relative">
                            <item.icon className={`h-5 w-5 transition-colors ${
                              item.active ? 'text-white' : 'text-gray-600 group-hover:text-pink-600'
                            }`} />
                            {item.badge && (
                              <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-white">{item.badge}</span>
                              </div>
                            )}
                          </div>
                          
                          {!sidebarCollapsed && (
                            <div className="flex-1 min-w-0">
                              <p className={`font-medium transition-colors ${
                                item.active ? 'text-white' : 'text-gray-900 group-hover:text-pink-900'
                              }`}>
                                {item.label}
                              </p>
                            </div>
                          )}
                          
                          {!sidebarCollapsed && (
                            <ChevronRight className={`h-4 w-4 transition-all ${
                              item.active ? 'text-white' : 'text-gray-400 group-hover:text-pink-500 group-hover:translate-x-1'
                            }`} />
                          )}
                        </Button>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`relative z-20 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-80'}`}>
        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed top-4 left-4 z-30">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => setSidebarOpen(true)}
              className="bg-white/90 backdrop-blur-xl shadow-lg border border-pink-200/50 hover:bg-white"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-pink-200/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search products, services, vendors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-12 bg-white/90 backdrop-blur-sm border-pink-200 focus:border-pink-400 transition-colors shadow-sm rounded-xl h-12"
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <Button size="sm" className="bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:from-pink-600 hover:to-blue-600">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* User Actions */}
              <div className="flex items-center gap-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" className="border-pink-200 hover:border-pink-400">
                    <Bell className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Notifications</span>
                  </Button>
                </motion.div>

                {user && (
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Avatar className="h-10 w-10 border-2 border-pink-200">
                      <AvatarFallback className="bg-gradient-to-br from-pink-500 to-blue-500 text-white">
                        {user.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-12"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              animate={{
                background: [
                  "linear-gradient(45deg, #ec4899, #3b82f6, #8b5cf6)",
                  "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)",
                  "linear-gradient(45deg, #8b5cf6, #ec4899, #3b82f6)",
                  "linear-gradient(45deg, #ec4899, #3b82f6, #8b5cf6)"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundSize: "300% 300%"
              }}
            >
              Discover Amazing Products & Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Shop from local vendors, book professional services, and discover unique items crafted by talented artisans across Zambia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg">
                  <Store className="h-5 w-5 mr-2" />
                  Explore Products
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-pink-200 hover:border-pink-400 px-8 py-3 rounded-xl font-semibold">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Browse Services
                </Button>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* Service Categories */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Professional Services</h2>
                <p className="text-gray-600">Discover services from verified professionals</p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link href="/services">
                  <Button variant="outline" className="group border-pink-200 hover:border-pink-400">
                    View All Services
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href={category.href}>
                    <Card className="h-full bg-white/90 backdrop-blur-xl border border-pink-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative h-48 overflow-hidden">
                          <motion.img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.4 }}
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60`} />
                          
                          <div className="absolute top-4 left-4">
                            <motion.div
                              whileHover={{ rotate: 15, scale: 1.1 }}
                              className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg"
                            >
                              <category.icon className="h-6 w-6 text-gray-700" />
                            </motion.div>
                          </div>

                          {category.trending && (
                            <div className="absolute top-4 right-4">
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.2 + index * 0.1, type: "spring" }}
                              >
                                <Badge className="bg-red-500 text-white">
                                  <Flame className="h-3 w-3 mr-1" />
                                  Trending
                                </Badge>
                              </motion.div>
                            </div>
                          )}

                          {category.verified && (
                            <div className="absolute bottom-4 right-4">
                              <Badge className="bg-green-500/90 text-white">
                                <Shield className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            </div>
                          )}
                        </div>

                        <div className="p-6">
                          <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-gray-600 mb-3">{category.description}</p>
                          <p className="text-sm text-gray-500">{category.count}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Flash Deals */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <Flame className="h-8 w-8 text-red-500" />
                  Flash Deals
                </h2>
                <p className="text-gray-600">Limited time offers - grab them before they're gone!</p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link href="/hot-deals">
                  <Button variant="outline" className="group border-red-200 hover:border-red-400 text-red-600 hover:text-red-700">
                    View All Deals
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flashDeals.map((deal, index) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 1.6 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="bg-white/90 backdrop-blur-xl border border-red-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative h-48 overflow-hidden">
                        <img src={deal.image} alt={deal.name} className="w-full h-full object-cover" />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-red-500 text-white animate-pulse">
                            -{deal.discount}% OFF
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleFavorite(deal.id.toString())}
                            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer"
                          >
                            <Heart className={`h-5 w-5 ${favorites.includes(deal.id.toString()) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                          </motion.div>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{deal.rating}</span>
                          </div>
                          <span className="text-gray-400">���</span>
                          <span className="text-sm text-gray-600">{deal.vendor}</span>
                        </div>

                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{deal.name}</h3>

                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-2xl font-bold text-gray-900">K{deal.salePrice}</span>
                          <span className="text-lg text-gray-500 line-through">K{deal.originalPrice}</span>
                        </div>

                        {/* Countdown Timer */}
                        <div className="bg-red-50 rounded-lg p-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-red-600 font-medium">Time Left:</span>
                            <div className="flex items-center gap-1 text-red-700 font-bold">
                              <Timer className="h-4 w-4" />
                              {deal.timeLeft.hours}h {deal.timeLeft.minutes}m {deal.timeLeft.seconds}s
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>{deal.soldCount} sold</span>
                              <span>{deal.totalStock} total</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-red-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(deal.soldCount / deal.totalStock) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Featured Vendors */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <Crown className="h-8 w-8 text-yellow-500" />
                  Featured Vendors
                </h2>
                <p className="text-gray-600">Top-rated sellers and service providers</p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link href="/vendors">
                  <Button variant="outline" className="group border-yellow-200 hover:border-yellow-400 text-yellow-600 hover:text-yellow-700">
                    View All Vendors
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredVendors.map((vendor, index) => (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 2.2 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href={vendor.href}>
                    <Card className="h-full bg-white/90 backdrop-blur-xl border border-yellow-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden">
                      <CardContent className="p-6 text-center">
                        <div className="relative mb-4">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-yellow-200 shadow-lg"
                          >
                            <img src={vendor.logo} alt={vendor.name} className="w-full h-full object-cover" />
                          </motion.div>
                          {vendor.verified && (
                            <div className="absolute -top-1 -right-1">
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 2.4 + index * 0.1, type: "spring" }}
                              >
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                  <Shield className="h-3 w-3 text-white" />
                                </div>
                              </motion.div>
                            </div>
                          )}
                        </div>

                        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                          {vendor.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">{vendor.category}</p>

                        <div className="flex items-center justify-center gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{vendor.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Package className="h-4 w-4 text-gray-400" />
                            <span>{vendor.products} products</span>
                          </div>
                        </div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button variant="outline" className="w-full border-yellow-200 hover:border-yellow-400 group-hover:bg-yellow-50">
                            <Store className="h-4 w-4 mr-2" />
                            Visit Store
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Recommended for You (AI-Powered) */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <Target className="h-8 w-8 text-purple-500" />
                  Recommended for You
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Badge className="bg-purple-100 text-purple-700">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI-Powered
                    </Badge>
                  </motion.div>
                </h2>
                <p className="text-gray-600">Personalized picks based on your preferences and browsing history</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 2.8 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="h-full bg-white/90 backdrop-blur-xl border border-purple-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                    <CardContent className="p-0">
                      <div className="relative h-48 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        
                        {/* AI Reason Badge */}
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-purple-500/90 text-white text-xs">
                            <Sparkles className="h-3 w-3 mr-1" />
                            AI Pick
                          </Badge>
                        </div>

                        {/* Favorite Button */}
                        <div className="absolute top-4 right-4">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleFavorite(product.id.toString())}
                            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer"
                          >
                            <Heart className={`h-5 w-5 ${favorites.includes(product.id.toString()) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                          </motion.div>
                        </div>

                        {/* Stock & Delivery Badges */}
                        <div className="absolute bottom-4 left-4 flex gap-2">
                          {product.inStock ? (
                            <Badge className="bg-green-500/90 text-white text-xs">In Stock</Badge>
                          ) : (
                            <Badge className="bg-red-500/90 text-white text-xs">Out of Stock</Badge>
                          )}
                          {product.fastDelivery && (
                            <Badge className="bg-blue-500/90 text-white text-xs">
                              <Truck className="h-3 w-3 mr-1" />
                              Fast Delivery
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{product.rating}</span>
                            <span className="text-xs text-gray-500">({product.reviews})</span>
                          </div>
                        </div>

                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">{product.vendor}</p>

                        {/* AI Reason */}
                        <div className="bg-purple-50 rounded-lg p-2 mb-3">
                          <p className="text-xs text-purple-700 flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            {product.aiReason}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-xl font-bold text-gray-900">K{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">K{product.originalPrice}</span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                            <Button 
                              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                              disabled={!product.inStock}
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button variant="outline" size="sm" className="px-3">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-pink-200/50 shadow-lg z-40">
        <div className="flex items-center justify-around py-2">
          {[
            { icon: Home, label: "Home", href: "/customer-dashboard" },
            { icon: Store, label: "Shop", href: "/marketplace", active: true },
            { icon: Briefcase, label: "Services", href: "/services" },
            { icon: ShoppingCart, label: "Cart", href: "/cart", badge: totalItems },
            { icon: User, label: "Profile", href: "/profile" }
          ].map((item) => (
            <Link key={item.label} href={item.href}>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                  item.active ? 'text-pink-600' : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                <div className="relative">
                  <item.icon className="h-6 w-6" />
                  {item.badge && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{item.badge}</span>
                    </div>
                  )}
                </div>
                <span className="text-xs mt-1">{item.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-20 right-4 lg:bottom-6 space-y-3 z-30">
        {/* Back to Top */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                onClick={scrollToTop}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-lg hover:shadow-xl"
              >
                <ArrowUp className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Help Chat */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg hover:shadow-xl">
            <MessageCircle className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
