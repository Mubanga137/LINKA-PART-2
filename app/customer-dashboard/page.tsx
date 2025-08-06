"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { useFavorites } from "@/contexts/marketplace-context";
import { EnhancedCategoriesGrid } from "@/components/customer/enhanced-categories-grid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  Heart, 
  Package, 
  User, 
  Settings, 
  CreditCard,
  MapPin,
  Bell,
  TrendingUp,
  Star,
  Gift,
  Clock,
  Zap,
  Crown,
  Sparkles,
  ArrowRight,
  Target,
  ChevronRight,
  Eye,
  Plus,
  Calendar,
  DollarSign,
  Award,
  Truck,
  ShieldCheck,
  MessageCircle,
  BarChart3,
  Menu,
  X,
  Search,
  Filter,
  Home,
  Bookmark,
  Activity,
  Globe,
  Phone,
  Mail,
  Camera,
  Edit,
  LogOut,
  Percent,
  RefreshCw,
  ExternalLink,
  Store,
  Headphones,
  HelpCircle,
  FileText,
  ChevronsRight,
  ChevronsLeft,
  Briefcase
} from "lucide-react";

export default function CustomerDashboard() {
  const { user } = useAuth();
  const { totalItems, totalPrice } = useCart();
  const { favorites } = useFavorites();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [loyaltyProgress, setLoyaltyProgress] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setLoyaltyProgress(78);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Navigation items for sidebar
  const navigationItems = [
    {
      section: "Shopping",
      items: [
        { icon: Store, label: "Shop", href: "/marketplace", description: "Browse products" },
        { icon: TrendingUp, label: "Trending", href: "/marketplace?trending=true", description: "Hot items" },
        { icon: Percent, label: "Hot Deals", href: "/hot-deals", description: "Special offers" },
        { icon: Heart, label: "Wishlist", href: "/wishlist", description: "Saved items", badge: favorites.length },
        { icon: ShoppingBag, label: "Cart", href: "/cart", description: "Shopping cart", badge: totalItems }
      ]
    },
    {
      section: "Orders & Account",
      items: [
        { icon: Package, label: "My Orders", href: "/orders", description: "Order history" },
        { icon: Truck, label: "Track Orders", href: "/orders", description: "Delivery status" },
        { icon: User, label: "Profile", href: "/profile", description: "Account details" },
        { icon: Settings, label: "Settings", href: "/settings", description: "Preferences" }
      ]
    },
    {
      section: "Services",
      items: [
        { icon: Briefcase, label: "All Services", href: "/services", description: "Professional services" },
        { icon: DollarSign, label: "Financial", href: "/financial-services", description: "Banking & loans" },
        { icon: ShieldCheck, label: "Health", href: "/services/health-wellness", description: "Medical services" },
        { icon: Home, label: "Home Services", href: "/services/home-services", description: "Maintenance & repair" }
      ]
    },
    {
      section: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", href: "/help", description: "Get assistance" },
        { icon: MessageCircle, label: "Contact Us", href: "/contact", description: "Customer support" },
        { icon: FileText, label: "Resources", href: "/resources", description: "Guides & FAQs" }
      ]
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-orange-50 to-blue-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-300/30 to-cyan-300/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 120, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-300/40 to-amber-300/40 rounded-full blur-3xl"
          />
        </div>

        <Header />
        <main className="flex items-center justify-center py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="max-w-md mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg"
              >
                <User className="h-10 w-10 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Welcome to Linka</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">Please log in to access your personalized dashboard and explore our services.</p>
              <Link href="/login">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <User className="h-5 w-5 mr-2" />
                  Log In to Continue
                </Button>
              </Link>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  // Enhanced mock data with more realistic content
  const recentOrders = [
    { 
      id: "ORD-2024-001", 
      product: "Handcrafted Copper Jewelry Set", 
      vendor: "Copper Craft Artisans", 
      status: "Delivered", 
      total: "K 275.99", 
      date: "2 days ago", 
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F12e840cc58ab4f23b45914a038f372d6?format=webp&width=800",
      rating: 5,
      category: "Jewelry & Accessories"
    },
    { 
      id: "ORD-2024-002", 
      product: "Traditional Chitenge Collection", 
      vendor: "Banda Fashion House", 
      status: "Shipped", 
      total: "K 189.99", 
      date: "4 days ago", 
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2Fa2f294111b514f3eb8bbc4805acb9326?format=webp&width=800",
      rating: 4,
      category: "Fashion & Textiles"
    },
    { 
      id: "ORD-2024-003", 
      product: "Premium Zambian Honey", 
      vendor: "Phiri Organic Foods", 
      status: "Processing", 
      total: "K 95.50", 
      date: "1 week ago", 
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2Fb92a8e5b385c400ba9c8823b431aca28?format=webp&width=800",
      rating: 5,
      category: "Food & Beverages"
    }
  ];

  const recentlyViewed = [
    {
      id: "PROD-001",
      name: "Wooden Sculpture Collection",
      vendor: "African Art Gallery",
      price: "K 450.00",
      originalPrice: "K 600.00",
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F193aadcc44264a96895e35bdd60c3a0b?format=webp&width=800",
      viewedAt: "2 hours ago",
      discount: 25,
      inStock: true
    },
    {
      id: "PROD-002",
      name: "Professional Tool Set",
      vendor: "BuildPro Equipment",
      price: "K 280.00",
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2Fe028a2a0e1ba45cc987d661ce8dd8b71?format=webp&width=800",
      viewedAt: "1 day ago",
      inStock: true
    },
    {
      id: "PROD-003",
      name: "Handwoven Basket Collection",
      vendor: "Mwanza Traditional Crafts",
      price: "K 160.00",
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F4000a4aa85ff48ffa6796cab08da052e?format=webp&width=800",
      viewedAt: "2 days ago",
      inStock: false
    }
  ];

  const trendingProducts = [
    { name: "Smart Electronics", count: "125+ items", trend: "+24%", color: "from-blue-500 to-cyan-500" },
    { name: "Fashion & Beauty", count: "89+ items", trend: "+18%", color: "from-pink-500 to-rose-500" },
    { name: "Home & Garden", count: "67+ items", trend: "+15%", color: "from-green-500 to-emerald-500" },
    { name: "Health & Wellness", count: "43+ items", trend: "+31%", color: "from-purple-500 to-indigo-500" }
  ];

  const quickActions = [
    { icon: ShoppingBag, label: "Browse Marketplace", href: "/marketplace", gradient: "from-blue-500 to-cyan-500", count: "5000+ products" },
    { icon: Percent, label: "Hot Deals", href: "/hot-deals", gradient: "from-orange-500 to-red-500", count: "Up to 70% off" },
    { icon: Heart, label: "My Wishlist", href: "/wishlist", gradient: "from-pink-500 to-rose-500", count: `${favorites.length} items` },
    { icon: Package, label: "Track Orders", href: "/orders", gradient: "from-purple-500 to-indigo-500", count: "3 active" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Processing':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-orange-50 to-blue-50 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 150, 0],
            y: [0, -80, 0],
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-300/25 to-cyan-300/25 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -120, 0],
            y: [0, 100, 0],
            scale: [1, 0.7, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-300/35 to-amber-300/35 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -120, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-orange-400/20 rounded-full blur-2xl"
        />
      </div>

      {/* Collapsible Sidebar */}
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
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed left-0 top-0 h-full bg-white/95 backdrop-blur-xl border-r border-white/50 shadow-2xl z-50 ${
                sidebarCollapsed ? 'w-20' : 'w-80'
              } transition-all duration-300`}
            >
              {/* Sidebar Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  {!sidebarCollapsed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-orange-500 rounded-xl flex items-center justify-center">
                        <Home className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="font-bold text-gray-900">Dashboard</h2>
                        <p className="text-sm text-gray-600">Welcome back!</p>
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    {!sidebarCollapsed && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSidebarCollapsed(true)}
                        className="lg:flex hidden"
                      >
                        <ChevronsLeft className="h-4 w-4" />
                      </Button>
                    )}
                    
                    {sidebarCollapsed && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSidebarCollapsed(false)}
                        className="w-full"
                      >
                        <ChevronsRight className="h-4 w-4" />
                      </Button>
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
              </div>

              {/* User Profile Section */}
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 border-b border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-gradient-to-r from-blue-400 to-orange-400">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-orange-500 text-white font-bold">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                      <p className="text-sm text-gray-600 truncate">{user.email}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-6">
                  {navigationItems.map((section, sectionIndex) => (
                    <div key={section.section}>
                      {!sidebarCollapsed && (
                        <motion.h3
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: sectionIndex * 0.1 }}
                          className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2"
                        >
                          {section.section}
                        </motion.h3>
                      )}
                      
                      <div className="space-y-1">
                        {section.items.map((item, itemIndex) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: sectionIndex * 0.1 + itemIndex * 0.05 }}
                          >
                            <Link href={item.href}>
                              <Button
                                variant="ghost"
                                className={`w-full justify-start gap-3 h-auto py-3 px-3 text-left group hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 transition-all duration-300 ${
                                  sidebarCollapsed ? 'px-2' : ''
                                }`}
                                onClick={() => {
                                  if (window.innerWidth < 1024) {
                                    setSidebarOpen(false);
                                  }
                                }}
                              >
                                <div className="relative">
                                  <item.icon className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                                  {item.badge && (
                                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center">
                                      <span className="text-xs font-bold text-white">{item.badge}</span>
                                    </div>
                                  )}
                                </div>
                                
                                {!sidebarCollapsed && (
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 group-hover:text-blue-900 transition-colors">
                                      {item.label}
                                    </p>
                                    <p className="text-xs text-gray-500 group-hover:text-blue-600 transition-colors">
                                      {item.description}
                                    </p>
                                  </div>
                                )}
                                
                                {!sidebarCollapsed && (
                                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                )}
                              </Button>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Footer */}
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 border-t border-gray-100"
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-80'}`}>
        <Header />

        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed top-20 left-4 z-30">
          <Button
            onClick={() => setSidebarOpen(true)}
            className="bg-white/90 backdrop-blur-xl shadow-lg border border-white/50 hover:bg-white"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Enhanced Hero Section */}
        <section className="relative pt-8 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Welcome Header with Enhanced Design */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 mb-8"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                {/* User Info */}
                <div className="flex items-center gap-6">
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative"
                  >
                    <Avatar className="h-20 w-20 border-4 border-gradient-to-r from-blue-400 to-orange-400 shadow-xl">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-orange-500 text-white text-xl font-bold">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                    >
                      <Crown className="h-3 w-3 text-white" />
                    </motion.div>
                  </motion.div>
                  
                  <div>
                    <motion.h1
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-orange-600 bg-clip-text text-transparent mb-2"
                    >
                      {getTimeGreeting()}, {user.name.split(' ')[0]}! 
                      <motion.span
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="inline-block ml-2"
                      >
                        👋
                      </motion.span>
                    </motion.h1>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">{user.location || 'Lusaka, Zambia'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">Premium Member</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <Button 
                    onClick={() => router.push('/marketplace')}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <ShoppingBag className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                    Start Shopping
                    <Sparkles className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                  
                  <Button
                    onClick={() => router.push('/orders')}
                    variant="outline"
                    className="border-2 border-gray-200 hover:border-blue-300 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
                  >
                    <Package className="h-5 w-5 mr-2" />
                    My Orders
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              {/* Loyalty Points */}
              <motion.div whileHover={{ scale: 1.02, y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="bg-white/95 backdrop-blur-xl border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                  <CardContent className="p-6 relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1, type: "spring" }}
                            className="text-3xl font-bold text-gray-900 mb-1"
                          >
                            2,450
                          </motion.div>
                          <div className="text-sm text-gray-600 font-medium">Loyalty Points</div>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                          <Gift className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Next reward progress</span>
                          <span className="font-semibold">{loyaltyProgress}%</span>
                        </div>
                        <Progress value={loyaltyProgress} className="h-2" />
                      </div>
                      
                      <Badge className="mt-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md">
                        <Target className="h-3 w-3 mr-1" />
                        550 points to next reward
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Cart Total */}
              <motion.div whileHover={{ scale: 1.02, y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="bg-white/95 backdrop-blur-xl border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer" onClick={() => router.push('/cart')}>
                  <CardContent className="p-6 relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.1, type: "spring" }}
                            className="text-3xl font-bold text-gray-900 mb-1"
                          >
                            K{totalPrice.toFixed(2)}
                          </motion.div>
                          <div className="text-sm text-gray-600 font-medium">Cart Total</div>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                          <ShoppingBag className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Package className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">{totalItems} items ready</span>
                      </div>
                      
                      <Badge className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-md">
                        <CreditCard className="h-3 w-3 mr-1" />
                        Ready to checkout
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Wishlist */}
              <motion.div whileHover={{ scale: 1.02, y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="bg-white/95 backdrop-blur-xl border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer" onClick={() => router.push('/wishlist')}>
                  <CardContent className="p-6 relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-rose-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.2, type: "spring" }}
                            className="text-3xl font-bold text-gray-900 mb-1"
                          >
                            {favorites.length}
                          </motion.div>
                          <div className="text-sm text-gray-600 font-medium">Saved Items</div>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                          <Heart className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Percent className="h-4 w-4 text-pink-600" />
                        <span className="text-sm text-gray-600">5 items on sale</span>
                      </div>
                      
                      <Badge className="bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md">
                        <Heart className="h-3 w-3 mr-1" />
                        View wishlist
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Activity Score */}
              <motion.div whileHover={{ scale: 1.02, y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="bg-white/95 backdrop-blur-xl border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                  <CardContent className="p-6 relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-indigo-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.3, type: "spring" }}
                            className="text-3xl font-bold text-gray-900 mb-1"
                          >
                            98
                          </motion.div>
                          <div className="text-sm text-gray-600 font-medium">Activity Score</div>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                          <Zap className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Activity className="h-4 w-4 text-purple-600" />
                        <span className="text-sm text-gray-600">Very active today</span>
                      </div>
                      
                      <Badge className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md">
                        <Award className="h-3 w-3 mr-1" />
                        Top 10% user
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Main Dashboard Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-12">
          {/* Quick Actions Grid */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Quick Actions</h2>
                <p className="text-gray-600">Everything you need at your fingertips</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href={action.href}>
                    <Card className="bg-white/95 backdrop-blur-xl border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden h-full">
                      <CardContent className="p-6 text-center">
                        <div className={`w-16 h-16 bg-gradient-to-br ${action.gradient} rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                          <action.icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2 text-lg">{action.label}</h3>
                        <p className="text-sm text-gray-600 mb-3">{action.count}</p>
                        <div className="flex items-center justify-center text-blue-600 group-hover:text-blue-700 transition-colors">
                          <span className="text-sm font-medium mr-1">Explore</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Recent Orders & Recently Viewed */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="grid grid-cols-1 xl:grid-cols-2 gap-8"
          >
            {/* Recent Orders */}
            <Card className="bg-white/95 backdrop-blur-xl border-white/50 shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg">
                      <Package className="h-5 w-5 text-white" />
                    </div>
                    Recent Orders
                  </CardTitle>
                  <Link href="/orders">
                    <Button variant="outline" size="sm" className="group">
                      <Eye className="h-4 w-4 mr-2" />
                      View All
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
                <CardDescription>Track your recent purchases and deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.9 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:from-gray-100 hover:to-blue-100 transition-all duration-300 group cursor-pointer border border-gray-100"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300 border-2 border-white">
                        <img
                          src={order.image}
                          alt={order.product}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">{order.product}</h4>
                        <p className="text-sm text-gray-600 mb-2">{order.vendor}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={`text-xs border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </Badge>
                          <span className="text-xs text-gray-500">{order.date}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${i < order.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-gray-900 mb-2">{order.total}</p>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-2">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recently Viewed */}
            <Card className="bg-white/95 backdrop-blur-xl border-white/50 shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                      <Eye className="h-5 w-5 text-white" />
                    </div>
                    Recently Viewed
                  </CardTitle>
                  <Link href="/history">
                    <Button variant="outline" size="sm" className="group">
                      <Clock className="h-4 w-4 mr-2" />
                      View All
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
                <CardDescription>Continue browsing where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentlyViewed.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.9 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl hover:from-gray-100 hover:to-purple-100 transition-all duration-300 group cursor-pointer border border-gray-100"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300 border-2 border-white relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {item.discount && (
                          <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded">
                            -{item.discount}%
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.id}`}>
                          <h4 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-1 line-clamp-1">
                            {item.name}
                          </h4>
                        </Link>
                        <p className="text-sm text-gray-600 mb-2">{item.vendor}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{item.viewedAt}</span>
                          <Badge variant={item.inStock ? "default" : "secondary"} className="text-xs">
                            {item.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900">{item.price}</span>
                          {item.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">{item.originalPrice}</span>
                          )}
                        </div>
                        <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 p-2 mt-1">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Trending Now Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <TrendingUp className="h-8 w-8 text-orange-500" />
                  Trending Now
                </h2>
                <p className="text-gray-600">Popular categories and hot deals</p>
              </div>
              <Link href="/marketplace?trending=true">
                <Button variant="outline" className="group">
                  View All Trending
                  <TrendingUp className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingProducts.map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.3 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="bg-white/95 backdrop-blur-xl border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${product.color} rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                        <TrendingUp className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{product.count}</p>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <ArrowRight className="h-3 w-3 mr-1 rotate-45" />
                        {product.trend}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Enhanced Categories Section */}
          <EnhancedCategoriesGrid showSearch={false} maxCategories={8} />
        </main>

        <Footer />
      </div>
    </div>
  );
}
