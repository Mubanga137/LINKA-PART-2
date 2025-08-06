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
import { Separator } from "@/components/ui/separator";
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
  Video,
  Grid3X3,
  List,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  DollarSign,
  ShieldCheck,
  ThumbsUp,
  MessageSquare,
  Share,
  MoreHorizontal,
  Scissors,
  Music,
  PlusCircle,
  MinusCircle,
  Check,
  AlertCircle,
  Info,
  StarHalf,
  Calendar,
  MapPinIcon,
  Globe,
  Headphones,
  Coffee,
  Utensils,
  Car,
  Gamepad2,
  Palette,
  Wrench,
  BookOpen,
  GraduationCap,
  Baby,
  PawPrint,
  Flower2,
  Loader,
  ChevronRightIcon
} from "lucide-react";

export default function MarketplacePage() {
  const { user } = useAuth();
  const { addToCart, totalItems, totalPrice } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [cartItems, setCartItems] = useState<{[key: string]: number}>({});
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
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
        x: (prev.x + 0.3) % 100,
        y: (prev.y + 0.2) % 100
      }));
    };

    window.addEventListener('scroll', handleScroll);
    const bgInterval = setInterval(animateBg, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(bgInterval);
    };
  }, []);

  // Professional navigation items
  const navigationItems = [
    { 
      icon: Home, 
      label: "Dashboard", 
      href: "/customer-dashboard", 
      badge: null,
      description: "Your personal dashboard"
    },
    { 
      icon: Store, 
      label: "Shop", 
      href: "/marketplace", 
      badge: null, 
      active: true,
      description: "Browse all products"
    },
    { 
      icon: Briefcase, 
      label: "Services", 
      href: "/services", 
      badge: "New",
      description: "Professional services"
    },
    { 
      icon: Flame, 
      label: "Flash Deals", 
      href: "/hot-deals", 
      badge: "70%",
      description: "Limited time offers"
    },
    { 
      icon: Package, 
      label: "Orders", 
      href: "/orders", 
      badge: "3",
      description: "Track your orders"
    },
    { 
      icon: Heart, 
      label: "Wishlist", 
      href: "/wishlist", 
      badge: favorites.length || null,
      description: "Saved items"
    },
    { 
      icon: ShoppingCart, 
      label: "Cart", 
      href: "/cart", 
      badge: totalItems || null,
      description: "Shopping cart"
    },
    { 
      icon: HelpCircle, 
      label: "Support", 
      href: "/help", 
      badge: null,
      description: "Get help & support"
    },
    { 
      icon: User, 
      label: "Account", 
      href: "/profile", 
      badge: null,
      description: "Manage your account"
    }
  ];

  // Categories for filtering
  const categories = [
    { id: "all", name: "All Items", icon: Store },
    { id: "fashion", name: "Fashion", icon: Scissors },
    { id: "food", name: "Food & Beverages", icon: Utensils },
    { id: "tools", name: "Tools & Hardware", icon: Wrench },
    { id: "art", name: "Art & Crafts", icon: Palette },
    { id: "health", name: "Health & Wellness", icon: Heart },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "entertainment", name: "Entertainment", icon: Music },
    { id: "home", name: "Home Services", icon: Home },
    { id: "financial", name: "Financial Services", icon: DollarSign }
  ];

  // Comprehensive product and service listings (PRIMARY CONTENT)
  const allProducts = [
    // Products
    {
      id: "prod-1",
      type: "product",
      name: "Handcrafted Copper Jewelry Set",
      category: "fashion",
      price: 145,
      originalPrice: 180,
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F12e840cc58ab4f23b45914a038f372d6?format=webp&width=500",
      vendor: "Copper Craft Artisans",
      vendorId: "vendor-1",
      vendorVerified: true,
      rating: 4.9,
      reviews: 156,
      inStock: true,
      stockCount: 12,
      fastDelivery: true,
      freeShipping: true,
      tags: ["Handmade", "New", "Popular"],
      features: ["Authentic Copper", "Adjustable Size", "Gift Wrapped", "Certificate"],
      description: "Beautiful handcrafted copper jewelry made by local artisans.",
      location: "Lusaka, Zambia"
    },
    {
      id: "prod-2",
      type: "product",
      name: "Premium Zambian Honey Bundle",
      category: "food",
      price: 89,
      originalPrice: 120,
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2Fb92a8e5b385c400ba9c8823b431aca28?format=webp&width=500",
      vendor: "Phiri Organic Foods",
      vendorId: "vendor-2",
      vendorVerified: true,
      rating: 4.8,
      reviews: 89,
      inStock: true,
      stockCount: 25,
      fastDelivery: true,
      freeShipping: false,
      tags: ["Organic", "Popular", "Local"],
      features: ["100% Pure", "Locally Sourced", "Health Benefits", "Premium Quality"],
      description: "Pure, organic honey from local beekeepers in Zambia.",
      location: "Ndola, Zambia"
    },
    {
      id: "prod-3",
      type: "product",
      name: "Traditional Chitenge Collection",
      category: "fashion",
      price: 159,
      originalPrice: 200,
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2Fa2f294111b514f3eb8bbc4805acb9326?format=webp&width=500",
      vendor: "Banda Fashion House",
      vendorId: "vendor-3",
      vendorVerified: true,
      rating: 4.7,
      reviews: 234,
      inStock: true,
      stockCount: 8,
      fastDelivery: false,
      freeShipping: true,
      tags: ["Traditional", "Cultural", "Popular"],
      features: ["Authentic Design", "Premium Fabric", "Various Patterns", "Custom Fitting"],
      description: "Beautiful traditional Chitenge fabric collections.",
      location: "Kitwe, Zambia"
    },
    {
      id: "prod-4",
      type: "product",
      name: "Professional Tool Kit Premium",
      category: "tools",
      price: 289,
      originalPrice: 350,
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2Fe028a2a0e1ba45cc987d661ce8dd8b71?format=webp&width=500",
      vendor: "BuildPro Equipment",
      vendorId: "vendor-4",
      vendorVerified: true,
      rating: 4.8,
      reviews: 98,
      inStock: true,
      stockCount: 15,
      fastDelivery: true,
      freeShipping: false,
      tags: ["Professional", "Quality", "New"],
      features: ["Professional Grade", "1-Year Warranty", "Complete Set", "Storage Case"],
      description: "Complete professional tool kit for contractors and DIY enthusiasts.",
      location: "Lusaka, Zambia"
    },
    {
      id: "prod-5",
      type: "product",
      name: "Artisan Wooden Sculpture",
      category: "art",
      price: 567,
      originalPrice: 650,
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F193aadcc44264a96895e35bdd60c3a0b?format=webp&width=500",
      vendor: "African Art Gallery",
      vendorId: "vendor-5",
      vendorVerified: true,
      rating: 4.9,
      reviews: 234,
      inStock: true,
      stockCount: 3,
      fastDelivery: true,
      freeShipping: true,
      tags: ["Handmade", "Cultural", "Unique"],
      features: ["Hand Carved", "Premium Wood", "Cultural Significance", "Certificate"],
      description: "Unique wooden sculptures carved by master craftsmen.",
      location: "Livingstone, Zambia"
    },
    {
      id: "prod-6",
      type: "product",
      name: "Traditional Basket Set",
      category: "art",
      price: 125,
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F4000a4aa85ff48ffa6796cab08da052e?format=webp&width=500",
      vendor: "Mwanza Traditional Crafts",
      vendorId: "vendor-6",
      vendorVerified: false,
      rating: 4.6,
      reviews: 67,
      inStock: false,
      stockCount: 0,
      fastDelivery: false,
      freeShipping: false,
      tags: ["Traditional", "Eco-Friendly"],
      features: ["Natural Materials", "Traditional Design", "Multiple Sizes", "Sustainable"],
      description: "Handwoven traditional baskets using local materials.",
      location: "Chipata, Zambia"
    },
    // Services
    {
      id: "serv-1",
      type: "service",
      name: "Professional Photography Session",
      category: "entertainment",
      price: 199,
      originalPrice: 300,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=400&fit=crop&q=80",
      vendor: "Studio Vision Pro",
      vendorId: "vendor-7",
      vendorVerified: true,
      rating: 4.9,
      reviews: 156,
      available: true,
      bookingCount: 23,
      fastBooking: true,
      tags: ["Professional", "Popular", "Same Day"],
      features: ["Event Coverage", "Portrait Session", "Photo Editing", "Digital Gallery"],
      description: "Professional photography services for events and portraits.",
      location: "Lusaka, Zambia"
    },
    {
      id: "serv-2",
      type: "service",
      name: "Home Cleaning Service",
      category: "home",
      price: 99,
      originalPrice: 150,
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=400&fit=crop&q=80",
      vendor: "CleanPro Services",
      vendorId: "vendor-8",
      vendorVerified: true,
      rating: 4.6,
      reviews: 127,
      available: true,
      bookingCount: 67,
      fastBooking: true,
      tags: ["Trusted", "Same Day", "Eco-Friendly"],
      features: ["Deep Cleaning", "Eco-Friendly", "Insured Team", "Same Day Service"],
      description: "Professional home cleaning services with eco-friendly products.",
      location: "Ndola, Zambia"
    },
    {
      id: "serv-3",
      type: "service",
      name: "Financial Consultation",
      category: "financial",
      price: 150,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=400&fit=crop&q=80",
      vendor: "FinanceFirst Advisors",
      vendorId: "vendor-9",
      vendorVerified: true,
      rating: 4.8,
      reviews: 89,
      available: true,
      bookingCount: 34,
      fastBooking: false,
      tags: ["Expert", "Licensed", "Trusted"],
      features: ["Investment Planning", "Insurance Advice", "Loan Consultation", "Retirement Planning"],
      description: "Expert financial consultation and planning services.",
      location: "Lusaka, Zambia"
    },
    {
      id: "serv-4",
      type: "service",
      name: "Fitness Personal Training",
      category: "health",
      price: 75,
      originalPrice: 100,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop&q=80",
      vendor: "FitLife Coaching",
      vendorId: "vendor-10",
      vendorVerified: true,
      rating: 4.9,
      reviews: 267,
      available: true,
      bookingCount: 145,
      fastBooking: true,
      tags: ["Certified", "Popular", "Results Guaranteed"],
      features: ["Personal Training", "Nutrition Guidance", "Progress Tracking", "Flexible Schedule"],
      description: "Certified personal training and fitness coaching services.",
      location: "Kitwe, Zambia"
    }
  ];

  // Filter products based on category and search
  useEffect(() => {
    let filtered = allProducts;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.vendor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort by selected criteria
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // For demo purposes, assume items with "New" tag are newest
        filtered.sort((a, b) => (b.tags.includes("New") ? 1 : 0) - (a.tags.includes("New") ? 1 : 0));
        break;
      default: // popular
        filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, sortBy]);

  const handleAddToCart = (productId: string, quantity: number = 1) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + quantity
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-4">
      <div className="bg-gray-200 h-48 rounded-xl"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-8 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Professional Gradient Background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at ${bgPosition.x}% ${bgPosition.y}%, rgba(219, 39, 119, 0.06) 0%, transparent 50%),
              radial-gradient(circle at ${100 - bgPosition.x}% ${100 - bgPosition.y}%, rgba(59, 130, 246, 0.06) 0%, transparent 50%),
              linear-gradient(135deg, 
                rgba(236, 72, 153, 0.03) 0%, 
                rgba(147, 51, 234, 0.03) 25%, 
                rgba(59, 130, 246, 0.03) 50%, 
                rgba(16, 185, 129, 0.03) 75%, 
                rgba(236, 72, 153, 0.03) 100%
              )
            `,
            backgroundSize: '200% 200%'
          }}
        />
      </div>

      {/* Professional Sidebar Navigation */}
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

            {/* Enhanced Sidebar */}
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.8 }}
              className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-xl z-50 ${
                sidebarCollapsed ? 'w-16' : 'w-72'
              } transition-all duration-300`}
            >
              {/* Sidebar Header */}
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-blue-50">
                <div className="flex items-center justify-between">
                  {!sidebarCollapsed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Store className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="font-bold text-gray-900 text-lg">Linka</h2>
                        <p className="text-sm text-gray-600">Marketplace</p>
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
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                    )}
                    
                    {sidebarCollapsed && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSidebarCollapsed(false)}
                        className="w-full"
                      >
                        <ChevronRight className="h-4 w-4" />
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

              {/* Enhanced Navigation */}
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-1 px-3">
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
                              ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-lg hover:shadow-xl' 
                              : 'hover:bg-gradient-to-r hover:from-pink-50 hover:to-blue-50 hover:text-pink-700'
                          } ${sidebarCollapsed ? 'px-2' : ''}`}
                          onClick={() => {
                            if (window.innerWidth < 1024) {
                              setSidebarOpen(false);
                            }
                          }}
                        >
                          <div className="relative flex-shrink-0">
                            <item.icon className={`h-5 w-5 transition-colors ${
                              item.active ? 'text-white' : 'text-gray-600 group-hover:text-pink-600'
                            }`} />
                            {item.badge && (
                              <div className="absolute -top-2 -right-2 min-w-[20px] h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center px-1">
                                <span className="text-xs font-bold text-white leading-none">{item.badge}</span>
                              </div>
                            )}
                          </div>
                          
                          {!sidebarCollapsed && (
                            <div className="flex-1 min-w-0">
                              <p className={`font-medium transition-colors truncate ${
                                item.active ? 'text-white' : 'text-gray-900 group-hover:text-pink-900'
                              }`}>
                                {item.label}
                              </p>
                              <p className={`text-xs transition-colors truncate ${
                                item.active ? 'text-white/80' : 'text-gray-500 group-hover:text-pink-600'
                              }`}>
                                {item.description}
                              </p>
                            </div>
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
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'}`}>
        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed top-4 left-4 z-30">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => setSidebarOpen(true)}
              className="bg-white shadow-lg border border-gray-200 hover:bg-gray-50"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        {/* Professional Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Advanced Search Bar */}
              <div className="flex-1 max-w-3xl">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <Search className="h-5 w-5 text-gray-400" />
                    <Separator orientation="vertical" className="h-5" />
                  </div>
                  <Input
                    placeholder="Search for products, services, vendors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-16 pr-32 bg-white border-gray-300 focus:border-pink-400 focus:ring-pink-400 transition-colors shadow-sm rounded-lg h-12 text-base"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)}>
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:from-pink-600 hover:to-blue-600 px-6">
                        Search
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" className="relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/cart">
                    <Button variant="outline" size="sm" className="relative">
                      <ShoppingCart className="h-4 w-4" />
                      {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                          {totalItems}
                        </span>
                      )}
                    </Button>
                  </Link>
                </motion.div>

                {user && (
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Avatar className="h-10 w-10 border-2 border-pink-200 cursor-pointer">
                      <AvatarFallback className="bg-gradient-to-br from-pink-500 to-blue-500 text-white font-semibold">
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
        <main className="relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* PRIMARY SECTION: Product & Service Listings */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              {/* Section Header */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    Products & Services
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Discover {filteredProducts.length} amazing products and services from local vendors
                  </p>
                </div>

                {/* Sort and View Controls */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Newest First</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Category Filters */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-lg'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-pink-300 hover:text-pink-600'
                      }`}
                    >
                      <category.icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{category.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Products/Services Grid */}
              {loading ? (
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
                  {[...Array(8)].map((_, index) => (
                    <LoadingSkeleton key={index} />
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
                  {filteredProducts.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.92, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
                      whileHover={{ scale: 1.02, y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                      whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                      className="group"
                    >
                      <Card className="h-full bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                        <CardContent className="p-0">
                          {/* Image Section */}
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover transition-transform duration-400 ease-out group-hover:scale-105"
                            />
                            
                            {/* Badges */}
                            <div className="absolute top-3 left-3 flex flex-col gap-1">
                              {item.tags.includes("New") && (
                                <Badge className="bg-blue-500 text-white text-xs">New</Badge>
                              )}
                              {item.tags.includes("Popular") && (
                                <Badge className="bg-orange-500 text-white text-xs">Popular</Badge>
                              )}
                              {item.originalPrice && (
                                <Badge className="bg-red-500 text-white text-xs">
                                  -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                                </Badge>
                              )}
                            </div>

                            {/* Favorite Button */}
                            <div className="absolute top-3 right-3">
                              <motion.button
                                whileHover={{ scale: 1.08, transition: { duration: 0.2, ease: "easeOut" } }}
                                whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                                onClick={() => toggleFavorite(item.id)}
                                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                              >
                                <Heart className={`h-5 w-5 ${favorites.includes(item.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                              </motion.button>
                            </div>

                            {/* Status Badges */}
                            <div className="absolute bottom-3 left-3 flex gap-1">
                              {item.type === "product" ? (
                                <>
                                  {item.inStock ? (
                                    <Badge className="bg-green-500/90 text-white text-xs">
                                      {item.stockCount} left
                                    </Badge>
                                  ) : (
                                    <Badge className="bg-red-500/90 text-white text-xs">Out of Stock</Badge>
                                  )}
                                  {item.fastDelivery && (
                                    <Badge className="bg-blue-500/90 text-white text-xs">
                                      <Truck className="h-3 w-3 mr-1" />
                                      Fast
                                    </Badge>
                                  )}
                                </>
                              ) : (
                                <>
                                  {item.available ? (
                                    <Badge className="bg-green-500/90 text-white text-xs">Available</Badge>
                                  ) : (
                                    <Badge className="bg-red-500/90 text-white text-xs">Booked</Badge>
                                  )}
                                  {item.fastBooking && (
                                    <Badge className="bg-blue-500/90 text-white text-xs">
                                      <Clock className="h-3 w-3 mr-1" />
                                      Quick Book
                                    </Badge>
                                  )}
                                </>
                              )}
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className="p-4">
                            {/* Vendor & Rating */}
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="text-sm font-medium">{item.rating}</span>
                                  <span className="text-xs text-gray-500">({item.reviews})</span>
                                </div>
                                {item.vendorVerified && (
                                  <ShieldCheck className="h-4 w-4 text-green-500" />
                                )}
                              </div>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                {item.type === "product" ? "Product" : "Service"}
                              </span>
                            </div>

                            {/* Product/Service Name */}
                            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                              {item.name}
                            </h3>

                            {/* Vendor */}
                            <p className="text-sm text-gray-600 mb-3 truncate">{item.vendor}</p>

                            {/* Location */}
                            <div className="flex items-center gap-1 mb-3">
                              <MapPin className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{item.location}</span>
                            </div>

                            {/* Features */}
                            <div className="mb-4">
                              <div className="flex flex-wrap gap-1">
                                {item.features.slice(0, 2).map((feature, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                    {feature}
                                  </span>
                                ))}
                                {item.features.length > 2 && (
                                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                    +{item.features.length - 2}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-2 mb-4">
                              <span className="text-xl font-bold text-gray-900">K{item.price}</span>
                              {item.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">K{item.originalPrice}</span>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                              <motion.div whileHover={{ scale: 1.015, transition: { duration: 0.2, ease: "easeOut" } }} whileTap={{ scale: 0.985, transition: { duration: 0.1 } }} className="flex-1">
                                <Button 
                                  className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white"
                                  disabled={item.type === "product" ? !item.inStock : !item.available}
                                  onClick={() => handleAddToCart(item.id)}
                                >
                                  {item.type === "product" ? (
                                    <>
                                      <ShoppingCart className="h-4 w-4 mr-2" />
                                      {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                                    </>
                                  ) : (
                                    <>
                                      <Calendar className="h-4 w-4 mr-2" />
                                      {item.available ? 'Book Now' : 'Unavailable'}
                                    </>
                                  )}
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Link href={`/vendors/${item.vendorId}`}>
                                  <Button variant="outline" size="sm" className="px-3">
                                    <Store className="h-4 w-4" />
                                  </Button>
                                </Link>
                              </motion.div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                    className="bg-gradient-to-r from-pink-500 to-blue-500 text-white"
                  >
                    Clear Filters
                  </Button>
                </motion.div>
              )}
            </motion.section>

            {/* Explore All Categories CTA */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center py-12 mb-16"
            >
              <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore Our Service Categories</h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Discover professional services from verified providers across various categories
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/services">
                    <Button className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg">
                      <Briefcase className="h-5 w-5 mr-2" />
                      Explore All Services
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.section>

            {/* SECONDARY SECTIONS - Supporting Content */}
            
            {/* Flash Deals Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-16"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    <Flame className="h-7 w-7 text-red-500 animate-pulse" />
                    Flash Deals
                  </h2>
                  <p className="text-gray-600">Limited time offers you can't miss</p>
                </div>
                <Link href="/hot-deals">
                  <Button variant="outline" className="group border-red-300 hover:border-red-500 text-red-600">
                    View All Deals
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              <div className="overflow-x-auto">
                <div className="flex gap-6 pb-4" style={{ width: "max-content" }}>
                  {filteredProducts.slice(0, 6).filter(item => item.originalPrice).map((deal, index) => (
                    <motion.div
                      key={deal.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="w-80 flex-shrink-0"
                    >
                      <Card className="h-full bg-white border border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                              <img src={deal.image} alt={deal.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">{deal.name}</h3>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg font-bold text-red-600">K{deal.price}</span>
                                <span className="text-sm text-gray-500 line-through">K{deal.originalPrice}</span>
                              </div>
                              <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                                {deal.type === "product" ? "Add to Cart" : "Book Now"}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Featured Vendors */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mb-16"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    <Crown className="h-7 w-7 text-yellow-500" />
                    Featured Vendors
                  </h2>
                  <p className="text-gray-600">Top-rated sellers and service providers</p>
                </div>
                <Link href="/vendors">
                  <Button variant="outline" className="group border-yellow-300 hover:border-yellow-500 text-yellow-600">
                    View All Vendors
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...new Set(filteredProducts.map(p => p.vendor))].slice(0, 4).map((vendorName, index) => {
                  const vendor = filteredProducts.find(p => p.vendor === vendorName);
                  return (
                    <motion.div
                      key={vendorName}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <Card className="h-full bg-white border border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                        <CardContent className="p-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
                            {vendorName.charAt(0)}
                          </div>
                          <h3 className="font-bold text-lg text-gray-900 mb-2">{vendorName}</h3>
                          <div className="flex items-center justify-center gap-1 mb-4">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{vendor?.rating}</span>
                          </div>
                          <Link href={`/vendors/${vendor?.vendorId}`}>
                            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                              <Store className="h-4 w-4 mr-2" />
                              Visit Store
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* Recommended for You */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mb-16"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    <Target className="h-7 w-7 text-purple-500" />
                    Recommended for You
                    <Badge className="bg-purple-100 text-purple-700">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI-Powered
                    </Badge>
                  </h2>
                  <p className="text-gray-600">Personalized picks based on your preferences</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.slice(0, 4).map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <Card className="h-full bg-white border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative h-32 overflow-hidden">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-purple-500 text-white text-xs">
                              <Sparkles className="h-3 w-3 mr-1" />
                              AI Pick
                            </Badge>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-sm text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-gray-900">K{product.price}</span>
                            <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
                              {product.type === "product" ? "Add" : "Book"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="flex items-center justify-around py-2">
          {[
            { icon: Home, label: "Home", href: "/customer-dashboard" },
            { icon: Store, label: "Shop", href: "/marketplace", active: true },
            { icon: Briefcase, label: "Services", href: "/services" },
            { icon: ShoppingCart, label: "Cart", href: "/cart", badge: totalItems },
            { icon: User, label: "Account", href: "/profile" }
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
                  {item.badge && item.badge > 0 && (
                    <div className="absolute -top-2 -right-2 min-w-[20px] h-5 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center px-1">
                      <span className="text-xs font-bold text-white leading-none">{item.badge}</span>
                    </div>
                  )}
                </div>
                <span className="text-xs mt-1 font-medium">{item.label}</span>
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
