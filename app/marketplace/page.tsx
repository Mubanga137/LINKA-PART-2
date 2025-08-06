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
  Flower2
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

  // Professional service categories with real platform data
  const serviceCategories = [
    {
      id: 1,
      name: "Financial Services",
      icon: DollarSign,
      count: "95+ providers",
      description: "Banking, loans, insurance & investments",
      href: "/financial-services",
      gradient: "from-emerald-400 via-emerald-500 to-green-600",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=400&fit=crop&q=80",
      trending: true,
      verified: true,
      deals: "15% off",
      popularServices: ["Mobile Money", "Loans", "Insurance", "Investment"]
    },
    {
      id: 2,
      name: "Health & Wellness",
      icon: Heart,
      count: "120+ providers",
      description: "Medical care, fitness & wellness programs",
      href: "/services/health-wellness",
      gradient: "from-pink-400 via-rose-500 to-red-600",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=400&fit=crop&q=80",
      trending: true,
      verified: true,
      deals: "Free consultation",
      popularServices: ["Telemedicine", "Fitness", "Nutrition", "Mental Health"]
    },
    {
      id: 3,
      name: "Food & Delivery",
      icon: Utensils,
      count: "200+ restaurants",
      description: "Food delivery, catering & dining",
      href: "/services/food-delivery",
      gradient: "from-orange-400 via-orange-500 to-red-600",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=400&fit=crop&q=80",
      trending: true,
      verified: true,
      deals: "Free delivery",
      popularServices: ["Restaurant Delivery", "Catering", "Groceries", "Fast Food"]
    },
    {
      id: 4,
      name: "Transportation",
      icon: Car,
      count: "150+ drivers",
      description: "Ride sharing, delivery & logistics",
      href: "/services/transportation",
      gradient: "from-blue-400 via-blue-500 to-indigo-600",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&h=400&fit=crop&q=80",
      trending: false,
      verified: true,
      deals: "50% off first ride",
      popularServices: ["Ride Share", "Delivery", "Taxi", "Logistics"]
    },
    {
      id: 5,
      name: "Fashion & Tailoring",
      icon: Scissors,
      count: "80+ tailors",
      description: "Custom clothing, alterations & fashion",
      href: "/services/fashion-tailoring",
      gradient: "from-purple-400 via-purple-500 to-indigo-600",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop&q=80",
      trending: false,
      verified: true,
      deals: "Custom design 30% off",
      popularServices: ["Custom Tailoring", "Alterations", "Fashion Design", "Traditional Wear"]
    },
    {
      id: 6,
      name: "Home Services",
      icon: Wrench,
      count: "90+ professionals",
      description: "Cleaning, repairs & maintenance",
      href: "/services/home-services",
      gradient: "from-teal-400 via-teal-500 to-green-600",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=400&fit=crop&q=80",
      trending: false,
      verified: true,
      deals: "Same day service",
      popularServices: ["House Cleaning", "Plumbing", "Electrical", "Painting"]
    },
    {
      id: 7,
      name: "Education & Training",
      icon: GraduationCap,
      count: "60+ instructors",
      description: "Online courses, tutoring & skills",
      href: "/services/education",
      gradient: "from-indigo-400 via-blue-500 to-purple-600",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=400&fit=crop&q=80",
      trending: true,
      verified: true,
      deals: "Free trial lesson",
      popularServices: ["Online Courses", "Tutoring", "Skills Training", "Certification"]
    },
    {
      id: 8,
      name: "Entertainment",
      icon: Music,
      count: "45+ artists",
      description: "Events, music & entertainment services",
      href: "/services/entertainment",
      gradient: "from-pink-400 via-red-500 to-orange-600",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500&h=400&fit=crop&q=80",
      trending: false,
      verified: true,
      deals: "Book 2 get 1 free",
      popularServices: ["Event Planning", "Live Music", "DJ Services", "Photography"]
    }
  ];

  // Enhanced flash deals with more realistic data
  const flashDeals = [
    {
      id: 1,
      name: "Professional Photography Package",
      originalPrice: 500,
      salePrice: 199,
      discount: 60,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=400&fit=crop&q=80",
      vendor: "Studio Vision Pro",
      vendorVerified: true,
      rating: 4.9,
      reviews: 156,
      timeLeft: { hours: 12, minutes: 34, seconds: 56 },
      soldCount: 23,
      totalStock: 50,
      category: "Photography",
      features: ["Event Coverage", "Portrait Session", "Photo Editing", "Digital Gallery"],
      fastDelivery: true,
      sponsored: false
    },
    {
      id: 2,
      name: "Premium Zambian Honey Bundle",
      originalPrice: 180,
      salePrice: 89,
      discount: 51,
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2Fb92a8e5b385c400ba9c8823b431aca28?format=webp&width=500",
      vendor: "Phiri Organic Foods",
      vendorVerified: true,
      rating: 4.8,
      reviews: 89,
      timeLeft: { hours: 8, minutes: 15, seconds: 42 },
      soldCount: 45,
      totalStock: 100,
      category: "Food & Beverages",
      features: ["100% Pure", "Locally Sourced", "Health Benefits", "Premium Quality"],
      fastDelivery: true,
      sponsored: true
    },
    {
      id: 3,
      name: "Traditional Chitenge Collection",
      originalPrice: 320,
      salePrice: 159,
      discount: 50,
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2Fa2f294111b514f3eb8bbc4805acb9326?format=webp&width=500",
      vendor: "Banda Fashion House",
      vendorVerified: true,
      rating: 4.7,
      reviews: 234,
      timeLeft: { hours: 6, minutes: 45, seconds: 18 },
      soldCount: 12,
      totalStock: 30,
      category: "Fashion",
      features: ["Authentic Design", "Premium Fabric", "Various Patterns", "Custom Fitting"],
      fastDelivery: false,
      sponsored: false
    },
    {
      id: 4,
      name: "Home Cleaning Service Package",
      originalPrice: 200,
      salePrice: 99,
      discount: 50,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop&q=80",
      vendor: "CleanPro Services",
      vendorVerified: true,
      rating: 4.6,
      reviews: 127,
      timeLeft: { hours: 4, minutes: 22, seconds: 33 },
      soldCount: 67,
      totalStock: 100,
      category: "Home Services",
      features: ["Deep Cleaning", "Eco-Friendly", "Insured Team", "Same Day Service"],
      fastDelivery: true,
      sponsored: false
    }
  ];

  // Featured vendors with enhanced data
  const featuredVendors = [
    {
      id: 1,
      name: "Copper Craft Artisans",
      logo: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F12e840cc58ab4f23b45914a038f372d6?format=webp&width=300",
      cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=200&fit=crop&q=80",
      rating: 4.9,
      reviews: 1250,
      products: 45,
      category: "Jewelry & Crafts",
      verified: true,
      premium: true,
      location: "Lusaka, Zambia",
      established: "2018",
      responseTime: "< 2 hours",
      href: "/vendors/1",
      specialOffers: ["Free shipping over K200", "Custom designs available"],
      topProducts: [
        { name: "Copper Bracelet", price: 145, image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F12e840cc58ab4f23b45914a038f372d6?format=webp&width=200" },
        { name: "Traditional Necklace", price: 89, image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F12e840cc58ab4f23b45914a038f372d6?format=webp&width=200" }
      ]
    },
    {
      id: 2,
      name: "African Art Gallery",
      logo: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F193aadcc44264a96895e35bdd60c3a0b?format=webp&width=300",
      cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=200&fit=crop&q=80",
      rating: 4.8,
      reviews: 890,
      products: 128,
      category: "Art & Culture",
      verified: true,
      premium: false,
      location: "Ndola, Zambia",
      established: "2015",
      responseTime: "< 4 hours",
      href: "/vendors/2",
      specialOffers: ["Art consultation included", "Bulk order discounts"],
      topProducts: [
        { name: "Wooden Sculpture", price: 567, image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F193aadcc44264a96895e35bdd60c3a0b?format=webp&width=200" },
        { name: "Canvas Painting", price: 234, image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F193aadcc44264a96895e35bdd60c3a0b?format=webp&width=200" }
      ]
    },
    {
      id: 3,
      name: "BuildPro Equipment",
      logo: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2Fe028a2a0e1ba45cc987d661ce8dd8b71?format=webp&width=300",
      cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=200&fit=crop&q=80",
      rating: 4.7,
      reviews: 456,
      products: 89,
      category: "Tools & Hardware",
      verified: true,
      premium: true,
      location: "Kitwe, Zambia",
      established: "2020",
      responseTime: "< 1 hour",
      href: "/vendors/3",
      specialOffers: ["Professional grade tools", "1-year warranty included"],
      topProducts: [
        { name: "Professional Drill Set", price: 289, image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2Fe028a2a0e1ba45cc987d661ce8dd8b71?format=webp&width=200" },
        { name: "Power Tool Kit", price: 456, image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2Fe028a2a0e1ba45cc987d661ce8dd8b71?format=webp&width=200" }
      ]
    },
    {
      id: 4,
      name: "Mwanza Traditional Crafts",
      logo: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F4000a4aa85ff48ffa6796cab08da052e?format=webp&width=300",
      cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=200&fit=crop&q=80",
      rating: 4.6,
      reviews: 234,
      products: 67,
      category: "Traditional Crafts",
      verified: false,
      premium: false,
      location: "Livingstone, Zambia",
      established: "2019",
      responseTime: "< 6 hours",
      href: "/vendors/4",
      specialOffers: ["Handmade authenticity", "Cultural significance"],
      topProducts: [
        { name: "Traditional Basket", price: 125, image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F4000a4aa85ff48ffa6796cab08da052e?format=webp&width=200" },
        { name: "Woven Mat", price: 78, image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F4000a4aa85ff48ffa6796cab08da052e?format=webp&width=200" }
      ]
    }
  ];

  // AI-powered recommendations with enhanced logic
  const recommendedProducts = [
    {
      id: 1,
      name: "Handwoven Copper Bracelet Set",
      price: 145,
      originalPrice: 180,
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F12e840cc58ab4f23b45914a038f372d6?format=webp&width=400",
      vendor: "Copper Craft Artisans",
      vendorVerified: true,
      rating: 4.9,
      reviews: 156,
      aiReason: "Based on your jewelry preferences",
      aiConfidence: 95,
      inStock: true,
      stockCount: 12,
      fastDelivery: true,
      freeShipping: true,
      category: "Jewelry",
      features: ["Handmade", "Authentic Copper", "Adjustable Size", "Gift Wrapped"],
      similarViewed: 234,
      recentlyBought: 45
    },
    {
      id: 2,
      name: "Professional Tool Kit Premium",
      price: 289,
      originalPrice: 350,
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2Fe028a2a0e1ba45cc987d661ce8dd8b71?format=webp&width=400",
      vendor: "BuildPro Equipment",
      vendorVerified: true,
      rating: 4.8,
      reviews: 98,
      aiReason: "Similar to recently viewed items",
      aiConfidence: 87,
      inStock: true,
      stockCount: 8,
      fastDelivery: false,
      freeShipping: false,
      category: "Tools",
      features: ["Professional Grade", "1-Year Warranty", "Complete Set", "Storage Case"],
      similarViewed: 145,
      recentlyBought: 23
    },
    {
      id: 3,
      name: "Artisan Wooden Sculpture Collection",
      price: 567,
      originalPrice: 650,
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F193aadcc44264a96895e35bdd60c3a0b?format=webp&width=400",
      vendor: "African Art Gallery",
      vendorVerified: true,
      rating: 4.9,
      reviews: 234,
      aiReason: "Trending in your area",
      aiConfidence: 78,
      inStock: true,
      stockCount: 3,
      fastDelivery: true,
      freeShipping: true,
      category: "Art",
      features: ["Hand Carved", "Premium Wood", "Cultural Significance", "Certificate of Authenticity"],
      similarViewed: 567,
      recentlyBought: 12
    },
    {
      id: 4,
      name: "Traditional Basket Weaving Set",
      price: 125,
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F4000a4aa85ff48ffa6796cab08da052e?format=webp&width=400",
      vendor: "Mwanza Traditional Crafts",
      vendorVerified: false,
      rating: 4.6,
      reviews: 67,
      aiReason: "Perfect for your home style",
      aiConfidence: 65,
      inStock: false,
      stockCount: 0,
      fastDelivery: false,
      freeShipping: false,
      category: "Crafts",
      features: ["Traditional Design", "Natural Materials", "Eco-Friendly", "Multiple Sizes"],
      similarViewed: 89,
      recentlyBought: 5
    }
  ];

  // Trending products
  const trendingProducts = [
    {
      id: 1,
      name: "Smart Home Security Package",
      price: 799,
      originalPrice: 999,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80",
      vendor: "TechSecure Zambia",
      rating: 4.7,
      reviews: 345,
      trending: { rank: 1, change: "+25%" },
      category: "Technology"
    },
    {
      id: 2,
      name: "Organic Vegetable Box Subscription",
      price: 89,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop&q=80",
      vendor: "FreshFarm Zambia",
      rating: 4.8,
      reviews: 178,
      trending: { rank: 2, change: "+18%" },
      category: "Food"
    },
    {
      id: 3,
      name: "Fitness Training Program",
      price: 199,
      originalPrice: 299,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&q=80",
      vendor: "FitLife Coaching",
      rating: 4.9,
      reviews: 267,
      trending: { rank: 3, change: "+35%" },
      category: "Health"
    }
  ];

  const handleAddToCart = (productId: string, quantity: number = 1) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + quantity
    }));
    // Integrate with actual cart context
    // addToCart(product, quantity);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ShimmerCard = () => (
    <div className="animate-pulse">
      <div className="bg-gray-200 h-48 rounded-t-xl"></div>
      <div className="p-4 space-y-3">
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
              radial-gradient(circle at ${bgPosition.x}% ${bgPosition.y}%, rgba(219, 39, 119, 0.08) 0%, transparent 50%),
              radial-gradient(circle at ${100 - bgPosition.x}% ${100 - bgPosition.y}%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
              linear-gradient(135deg, 
                rgba(236, 72, 153, 0.04) 0%, 
                rgba(147, 51, 234, 0.04) 25%, 
                rgba(59, 130, 246, 0.04) 50%, 
                rgba(16, 185, 129, 0.04) 75%, 
                rgba(236, 72, 153, 0.04) 100%
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
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
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

                {/* Quick Stats */}
                {!sidebarCollapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 mx-3"
                  >
                    <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3 text-sm">Your Activity</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cart Total</span>
                          <span className="font-semibold text-gray-900">K{totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Saved Items</span>
                          <span className="font-semibold text-gray-900">{favorites.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Orders</span>
                          <span className="font-semibold text-gray-900">3 Active</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
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

                {/* Search Filters */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500">
                            <option>All Categories</option>
                            <option>Services</option>
                            <option>Products</option>
                            <option>Fashion</option>
                            <option>Food</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500">
                            <option>Any Price</option>
                            <option>Under K100</option>
                            <option>K100 - K500</option>
                            <option>K500+</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500">
                            <option>All Locations</option>
                            <option>Lusaka</option>
                            <option>Ndola</option>
                            <option>Kitwe</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500">
                            <option>Any Rating</option>
                            <option>4+ Stars</option>
                            <option>3+ Stars</option>
                            <option>2+ Stars</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
          {/* Hero Banner */}
          <section className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <motion.h1
                  className="text-4xl md:text-6xl font-bold mb-6"
                  animate={{
                    textShadow: ["0 0 20px rgba(255,255,255,0.5)", "0 0 40px rgba(255,255,255,0.3)", "0 0 20px rgba(255,255,255,0.5)"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Zambia's Premier Marketplace
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
                >
                  Discover amazing products and professional services from verified local vendors across Zambia
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold shadow-lg text-lg">
                      <Store className="h-5 w-5 mr-2" />
                      Shop Now
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-xl font-semibold text-lg">
                      <Briefcase className="h-5 w-5 mr-2" />
                      Browse Services
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
            {/* Service Categories Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Shop by Category</h2>
                  <p className="text-gray-600">Explore our comprehensive range of services and products</p>
                </div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link href="/services">
                    <Button variant="outline" className="group border-gray-300 hover:border-pink-400 hover:text-pink-600">
                      View All Categories
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
                    whileHover={{ scale: 1.03, y: -8 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Link href={category.href}>
                      <Card className="h-full bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden">
                        <CardContent className="p-0">
                          <div className="relative h-48 overflow-hidden">
                            <motion.img
                              src={category.image}
                              alt={category.name}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.4 }}
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-70 group-hover:opacity-60 transition-opacity duration-300`} />
                            
                            {/* Category Icon */}
                            <div className="absolute top-4 left-4">
                              <motion.div
                                whileHover={{ rotate: 15, scale: 1.1 }}
                                className="w-12 h-12 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg"
                              >
                                <category.icon className="h-6 w-6 text-gray-700" />
                              </motion.div>
                            </div>

                            {/* Badges */}
                            <div className="absolute top-4 right-4 flex flex-col gap-2">
                              {category.trending && (
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
                              )}
                              {category.verified && (
                                <Badge className="bg-green-500/90 text-white">
                                  <Shield className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>

                            {/* Deal Badge */}
                            {category.deals && (
                              <div className="absolute bottom-4 left-4">
                                <Badge className="bg-orange-500 text-white animate-pulse">
                                  <Gift className="h-3 w-3 mr-1" />
                                  {category.deals}
                                </Badge>
                              </div>
                            )}
                          </div>

                          <div className="p-6">
                            <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                              {category.name}
                            </h3>
                            <p className="text-gray-600 mb-3 text-sm leading-relaxed">{category.description}</p>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-500">{category.count}</p>
                              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
                            </div>
                            
                            {/* Popular Services */}
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <p className="text-xs text-gray-500 mb-2">Popular:</p>
                              <div className="flex flex-wrap gap-1">
                                {category.popularServices.slice(0, 2).map((service, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                    {service}
                                  </span>
                                ))}
                                {category.popularServices.length > 2 && (
                                  <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full">
                                    +{category.popularServices.length - 2} more
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Flash Deals Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    <Flame className="h-8 w-8 text-red-500 animate-pulse" />
                    Flash Deals
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Badge className="bg-red-100 text-red-700">
                        <Timer className="h-3 w-3 mr-1" />
                        Limited Time
                      </Badge>
                    </motion.div>
                  </h2>
                  <p className="text-gray-600">Incredible deals that won't last long - grab them now!</p>
                </div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link href="/hot-deals">
                    <Button variant="outline" className="group border-red-300 hover:border-red-500 text-red-600 hover:text-red-700">
                      View All Deals
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {flashDeals.map((deal, index) => (
                  <motion.div
                    key={deal.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 1.6 + index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                      <CardContent className="p-0">
                        <div className="relative h-48 overflow-hidden">
                          <img src={deal.image} alt={deal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          
                          {/* Deal Badge */}
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-red-500 text-white animate-pulse font-bold">
                              -{deal.discount}% OFF
                            </Badge>
                          </div>

                          {/* Sponsored Badge */}
                          {deal.sponsored && (
                            <div className="absolute top-3 right-3">
                              <Badge className="bg-yellow-500 text-white text-xs">
                                <Crown className="h-3 w-3 mr-1" />
                                Sponsored
                              </Badge>
                            </div>
                          )}

                          {/* Favorite Button */}
                          <div className="absolute bottom-3 right-3">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => toggleFavorite(deal.id.toString())}
                              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                            >
                              <Heart className={`h-5 w-5 ${favorites.includes(deal.id.toString()) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                            </motion.button>
                          </div>

                          {/* Delivery Badge */}
                          {deal.fastDelivery && (
                            <div className="absolute bottom-3 left-3">
                              <Badge className="bg-blue-500/90 text-white text-xs">
                                <Truck className="h-3 w-3 mr-1" />
                                Fast Delivery
                              </Badge>
                            </div>
                          )}
                        </div>

                        <div className="p-4">
                          {/* Vendor Info */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{deal.rating}</span>
                              <span className="text-xs text-gray-500">({deal.reviews})</span>
                            </div>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-600 truncate">{deal.vendor}</span>
                            {deal.vendorVerified && (
                              <ShieldCheck className="h-4 w-4 text-green-500" />
                            )}
                          </div>

                          {/* Product Name */}
                          <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-pink-600 transition-colors">
                            {deal.name}
                          </h3>

                          {/* Price */}
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl font-bold text-gray-900">K{deal.salePrice}</span>
                            <span className="text-lg text-gray-500 line-through">K{deal.originalPrice}</span>
                          </div>

                          {/* Features */}
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-1">
                              {deal.features.slice(0, 2).map((feature, idx) => (
                                <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                  {feature}
                                </span>
                              ))}
                              {deal.features.length > 2 && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                  +{deal.features.length - 2} more
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Countdown Timer */}
                          <div className="bg-red-50 rounded-lg p-3 mb-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-red-600 font-medium">Time Left:</span>
                              <div className="flex items-center gap-1 text-red-700 font-bold">
                                <Timer className="h-4 w-4" />
                                {deal.timeLeft.hours}h {deal.timeLeft.minutes}m {deal.timeLeft.seconds}s
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs text-gray-600 mb-1">
                                <span>{deal.soldCount} sold</span>
                                <span>{deal.totalStock} total</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <motion.div 
                                  className="bg-red-500 h-2 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(deal.soldCount / deal.totalStock) * 100}%` }}
                                  transition={{ duration: 1, delay: 1.8 + index * 0.1 }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                              <Button 
                                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
                                onClick={() => handleAddToCart(deal.id.toString())}
                              >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Add to Cart
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

            {/* Featured Vendors Section */}
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
                    <Badge className="bg-yellow-100 text-yellow-700">
                      <Award className="h-3 w-3 mr-1" />
                      Top Rated
                    </Badge>
                  </h2>
                  <p className="text-gray-600">Discover premium sellers and service providers with excellent ratings</p>
                </div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link href="/vendors">
                    <Button variant="outline" className="group border-yellow-300 hover:border-yellow-500 text-yellow-600 hover:text-yellow-700">
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
                    whileHover={{ scale: 1.03, y: -8 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Link href={vendor.href}>
                      <Card className="h-full bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden">
                        <CardContent className="p-0">
                          {/* Vendor Cover */}
                          <div className="relative h-24 overflow-hidden">
                            <img src={vendor.cover} alt={`${vendor.name} cover`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            
                            {/* Premium Badge */}
                            {vendor.premium && (
                              <div className="absolute top-2 right-2">
                                <Badge className="bg-yellow-500 text-white">
                                  <Crown className="h-3 w-3 mr-1" />
                                  Premium
                                </Badge>
                              </div>
                            )}
                          </div>

                          <div className="p-4 -mt-8 relative z-10">
                            {/* Vendor Logo */}
                            <div className="relative mb-4">
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="w-16 h-16 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg bg-white"
                              >
                                <img src={vendor.logo} alt={vendor.name} className="w-full h-full object-cover" />
                              </motion.div>
                              {vendor.verified && (
                                <div className="absolute -bottom-1 -right-1">
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 2.4 + index * 0.1, type: "spring" }}
                                  >
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                                      <Shield className="h-3 w-3 text-white" />
                                    </div>
                                  </motion.div>
                                </div>
                              )}
                            </div>

                            {/* Vendor Info */}
                            <div className="text-center mb-4">
                              <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-yellow-600 transition-colors">
                                {vendor.name}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2">{vendor.category}</p>
                              <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                                <MapPin className="h-3 w-3" />
                                <span>{vendor.location}</span>
                                <span>•</span>
                                <span>Since {vendor.established}</span>
                              </div>
                            </div>

                            {/* Vendor Stats */}
                            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                              <div>
                                <div className="flex items-center justify-center gap-1">
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                  <span className="text-sm font-bold text-gray-900">{vendor.rating}</span>
                                </div>
                                <span className="text-xs text-gray-500">Rating</span>
                              </div>
                              <div>
                                <div className="text-sm font-bold text-gray-900">{vendor.reviews}</div>
                                <span className="text-xs text-gray-500">Reviews</span>
                              </div>
                              <div>
                                <div className="text-sm font-bold text-gray-900">{vendor.products}</div>
                                <span className="text-xs text-gray-500">Products</span>
                              </div>
                            </div>

                            {/* Special Offers */}
                            <div className="mb-4">
                              <div className="flex flex-wrap gap-1 justify-center">
                                {vendor.specialOffers.slice(0, 1).map((offer, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full text-center">
                                    {offer}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Response Time */}
                            <div className="text-center mb-4">
                              <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                                <Clock className="h-3 w-3" />
                                <span>Responds {vendor.responseTime}</span>
                              </div>
                            </div>

                            {/* Visit Store Button */}
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                                <Store className="h-4 w-4 mr-2" />
                                Visit Store
                              </Button>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Trending Products */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    <TrendingUp className="h-8 w-8 text-green-500" />
                    Trending Now
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Badge className="bg-green-100 text-green-700">
                        <Zap className="h-3 w-3 mr-1" />
                        Hot
                      </Badge>
                    </motion.div>
                  </h2>
                  <p className="text-gray-600">Most popular products and services right now</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 2.8 + index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                      <CardContent className="p-0">
                        <div className="relative h-48 overflow-hidden">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          
                          {/* Trending Rank */}
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-green-500 text-white font-bold">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              #{product.trending.rank}
                            </Badge>
                          </div>

                          {/* Trending Change */}
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-blue-100 text-blue-700 text-xs">
                              {product.trending.change}
                            </Badge>
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{product.rating}</span>
                              <span className="text-xs text-gray-500">({product.reviews})</span>
                            </div>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-600 truncate">{product.vendor}</span>
                          </div>

                          <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                            {product.name}
                          </h3>

                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl font-bold text-gray-900">K{product.price}</span>
                            {product.originalPrice && (
                              <span className="text-lg text-gray-500 line-through">K{product.originalPrice}</span>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                              <Button 
                                className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
                                onClick={() => handleAddToCart(product.id.toString())}
                              >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Add to Cart
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

            {/* AI-Powered Recommendations */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 0.6 }}
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
                  <p className="text-gray-600">Personalized recommendations based on your browsing history and preferences</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 3.4 + index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <Card className="h-full bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                      <CardContent className="p-0">
                        <div className="relative h-48 overflow-hidden">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          
                          {/* AI Badge */}
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-purple-500/90 text-white text-xs">
                              <Sparkles className="h-3 w-3 mr-1" />
                              AI Pick
                            </Badge>
                          </div>

                          {/* Confidence Score */}
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-blue-100 text-blue-700 text-xs">
                              {product.aiConfidence}% match
                            </Badge>
                          </div>

                          {/* Favorite Button */}
                          <div className="absolute bottom-3 right-3">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => toggleFavorite(product.id.toString())}
                              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                            >
                              <Heart className={`h-5 w-5 ${favorites.includes(product.id.toString()) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                            </motion.button>
                          </div>

                          {/* Stock & Delivery Badges */}
                          <div className="absolute bottom-3 left-3 flex flex-col gap-1">
                            {product.inStock ? (
                              <Badge className="bg-green-500/90 text-white text-xs">
                                {product.stockCount} left
                              </Badge>
                            ) : (
                              <Badge className="bg-red-500/90 text-white text-xs">Out of Stock</Badge>
                            )}
                            {product.fastDelivery && (
                              <Badge className="bg-blue-500/90 text-white text-xs">
                                <Truck className="h-3 w-3 mr-1" />
                                Fast
                              </Badge>
                            )}
                            {product.freeShipping && (
                              <Badge className="bg-green-500/90 text-white text-xs">
                                Free Ship
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
                            {product.vendorVerified && (
                              <ShieldCheck className="h-4 w-4 text-green-500" />
                            )}
                          </div>

                          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 truncate">{product.vendor}</p>

                          {/* AI Reason */}
                          <div className="bg-purple-50 rounded-lg p-2 mb-3">
                            <p className="text-xs text-purple-700 flex items-center gap-1">
                              <Target className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{product.aiReason}</span>
                            </p>
                          </div>

                          {/* Features */}
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-1">
                              {product.features.slice(0, 2).map((feature, idx) => (
                                <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                  {feature}
                                </span>
                              ))}
                              {product.features.length > 2 && (
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                                  +{product.features.length - 2}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Price */}
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-xl font-bold text-gray-900">K{product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">K{product.originalPrice}</span>
                            )}
                          </div>

                          {/* Social Proof */}
                          <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              <span>{product.similarViewed} viewed</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ShoppingCart className="h-3 w-3" />
                              <span>{product.recentlyBought} bought</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                              <Button 
                                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                                disabled={!product.inStock}
                                onClick={() => handleAddToCart(product.id.toString())}
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
