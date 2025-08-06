"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/auth-context";
import { useCart, useFavorites } from "@/contexts/marketplace-context";
import { InteractiveButton } from "@/components/interactive-button";
import { useToast, useCartToast, useWishlistToast } from "@/components/toast-notification";
// import { EnhancedProductGrid } from "@/components/enhanced-product-grid";
// import { Compact3DCard } from "@/components/compact-3d-card";
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
  ChevronRightIcon,
  FilterX,
  SortAsc,
  SortDesc,
  TrendingDown,
  Users,
  ShoppingBag,
  Megaphone,
  Lightning,
  Gauge,
  BarChart3,
  Activity,
  Siren
} from "lucide-react";

export default function MarketplacePage() {
  const { user } = useAuth();
  const { addToCart, cart, getCartItemCount, getCartTotal } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const cartToast = useCartToast();
  const wishlistToast = useWishlistToast();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [cartItems, setCartItems] = useState<{[key: string]: number}>({});
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [activeFilters, setActiveFilters] = useState({
    priceRange: [0, 1000],
    location: "all",
    vendor: "all",
    deliverySpeed: "all",
    rating: 0
  });
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Animated background position
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });

  // Countdown timer state for flash deals
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    const animateBg = () => {
      setBgPosition(prev => ({
        x: (prev.x + 0.2) % 100,
        y: (prev.y + 0.15) % 100
      }));
    };

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    window.addEventListener('scroll', handleScroll);
    const bgInterval = setInterval(animateBg, 150);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(bgInterval);
      clearInterval(timer);
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
      badge: getCartItemCount() || null,
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

  // Comprehensive product and service listings with AI-powered recommendations
  const allProducts = [
    // Recommended Products (AI-powered)
    {
      id: "rec-1",
      type: "product",
      name: "Premium Handcrafted Copper Jewelry Set",
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
      tags: ["Handmade", "Recommended", "Popular"],
      features: ["Authentic Copper", "Adjustable Size", "Gift Wrapped", "Certificate"],
      description: "AI-recommended based on your style preferences. Beautiful handcrafted copper jewelry made by local artisans.",
      location: "Lusaka, Zambia",
      isRecommended: true,
      recommendationScore: 95,
      viewCount: 245,
      lastViewed: "2 hours ago"
    },
    {
      id: "rec-2",
      type: "service",
      name: "Personal Fitness Training Sessions",
      category: "health",
      price: 89,
      originalPrice: 120,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop&q=80",
      vendor: "FitLife Coaching Pro",
      vendorId: "vendor-2",
      vendorVerified: true,
      rating: 4.8,
      reviews: 89,
      available: true,
      bookingCount: 25,
      fastBooking: true,
      tags: ["Recommended", "Health", "Popular"],
      features: ["Certified Trainer", "Custom Plans", "Progress Tracking", "Flexible Schedule"],
      description: "Recommended for your fitness goals. Professional personal training with certified coaches.",
      location: "Ndola, Zambia",
      isRecommended: true,
      recommendationScore: 92,
      viewCount: 189,
      lastViewed: "5 hours ago"
    },
    {
      id: "rec-3",
      type: "product",
      name: "Organic Zambian Honey Collection",
      category: "food",
      price: 159,
      originalPrice: 200,
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2Fb92a8e5b385c400ba9c8823b431aca28?format=webp&width=500",
      vendor: "Pure Nature Foods",
      vendorId: "vendor-3",
      vendorVerified: true,
      rating: 4.7,
      reviews: 234,
      inStock: true,
      stockCount: 8,
      fastDelivery: false,
      freeShipping: true,
      tags: ["Recommended", "Organic", "Local"],
      features: ["100% Pure", "Locally Sourced", "Health Benefits", "Premium Quality"],
      description: "Perfect for your healthy lifestyle. Pure, organic honey from local beekeepers.",
      location: "Kitwe, Zambia",
      isRecommended: true,
      recommendationScore: 88,
      viewCount: 167,
      lastViewed: "1 day ago"
    },
    // Hot Deals
    {
      id: "hot-1",
      type: "product",
      name: "Traditional Chitenge Fabric Bundle",
      category: "fashion",
      price: 89,
      originalPrice: 150,
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2Fa2f294111b514f3eb8bbc4805acb9326?format=webp&width=500",
      vendor: "Banda Fashion House",
      vendorId: "vendor-4",
      vendorVerified: true,
      rating: 4.8,
      reviews: 98,
      inStock: true,
      stockCount: 15,
      fastDelivery: true,
      freeShipping: false,
      tags: ["Hot Deal", "Limited Stock", "Cultural"],
      features: ["Traditional Design", "Premium Fabric", "Various Patterns", "Fast Delivery"],
      description: "Limited time offer! Traditional Chitenge fabric collections at amazing prices.",
      location: "Lusaka, Zambia",
      isHotDeal: true,
      dealEndsIn: "2 hours",
      discount: 41,
      originalStock: 50,
      soldCount: 35
    },
    {
      id: "hot-2",
      type: "service",
      name: "Professional Photography Package",
      category: "entertainment",
      price: 199,
      originalPrice: 350,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=400&fit=crop&q=80",
      vendor: "Studio Vision Pro",
      vendorId: "vendor-5",
      vendorVerified: true,
      rating: 4.9,
      reviews: 156,
      available: true,
      bookingCount: 23,
      fastBooking: true,
      tags: ["Hot Deal", "Professional", "Same Day"],
      features: ["Event Coverage", "Portrait Session", "Photo Editing", "Digital Gallery"],
      description: "Today only! Professional photography services at unbeatable prices.",
      location: "Lusaka, Zambia",
      isHotDeal: true,
      dealEndsIn: "6 hours",
      discount: 43,
      originalBookings: 100,
      bookedToday: 23
    },
    // Trending Products
    {
      id: "trend-1",
      type: "product",
      name: "Smart Home Security System",
      category: "tools",
      price: 289,
      originalPrice: 350,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop&q=80",
      vendor: "TechSmart Solutions",
      vendorId: "vendor-6",
      vendorVerified: true,
      rating: 4.8,
      reviews: 245,
      inStock: true,
      stockCount: 12,
      fastDelivery: true,
      freeShipping: true,
      tags: ["Trending", "Tech", "Popular"],
      features: ["24/7 Monitoring", "Mobile App", "Installation Included", "1-Year Warranty"],
      description: "Trending security solution for modern homes.",
      location: "Lusaka, Zambia",
      isTrending: true,
      trendingRank: 1,
      weeklyGrowth: 156,
      popularityScore: 94
    },
    {
      id: "trend-2",
      type: "service",
      name: "Digital Marketing Consultation",
      category: "education",
      price: 150,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=400&fit=crop&q=80",
      vendor: "Growth Marketing Hub",
      vendorId: "vendor-7",
      vendorVerified: true,
      rating: 4.7,
      reviews: 89,
      available: true,
      bookingCount: 34,
      fastBooking: false,
      tags: ["Trending", "Business", "Expert"],
      features: ["Strategy Planning", "Analytics Review", "Growth Hacking", "ROI Optimization"],
      description: "Trending business service for digital growth.",
      location: "Ndola, Zambia",
      isTrending: true,
      trendingRank: 2,
      weeklyGrowth: 134,
      popularityScore: 89
    },
    // Flash Deals
    {
      id: "flash-1",
      type: "product",
      name: "Artisan Wooden Sculpture",
      category: "art",
      price: 99,
      originalPrice: 250,
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F193aadcc44264a96895e35bdd60c3a0b?format=webp&width=500",
      vendor: "African Art Gallery",
      vendorId: "vendor-8",
      vendorVerified: true,
      rating: 4.9,
      reviews: 234,
      inStock: true,
      stockCount: 3,
      fastDelivery: true,
      freeShipping: true,
      tags: ["Flash Deal", "Handmade", "Limited"],
      features: ["Hand Carved", "Premium Wood", "Cultural Significance", "Certificate"],
      description: "Flash sale! Unique wooden sculptures at incredible prices.",
      location: "Livingstone, Zambia",
      isFlashDeal: true,
      flashEndsIn: "4 hours 23 minutes",
      discount: 60,
      urgencyLevel: "high"
    },
    {
      id: "flash-2",
      type: "service",
      name: "Home Cleaning Premium Package",
      category: "home",
      price: 75,
      originalPrice: 150,
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=400&fit=crop&q=80",
      vendor: "CleanPro Services",
      vendorId: "vendor-9",
      vendorVerified: true,
      rating: 4.6,
      reviews: 127,
      available: true,
      bookingCount: 67,
      fastBooking: true,
      tags: ["Flash Deal", "Same Day", "Eco-Friendly"],
      features: ["Deep Cleaning", "Eco-Friendly", "Insured Team", "Same Day Service"],
      description: "Flash offer! Professional home cleaning at half price.",
      location: "Kitwe, Zambia",
      isFlashDeal: true,
      flashEndsIn: "2 hours 15 minutes",
      discount: 50,
      urgencyLevel: "medium"
    }
  ];

  // Recently viewed items (simulated)
  const recentlyViewed = [
    {
      id: "recent-1",
      name: "Professional Tool Kit",
      vendor: "BuildPro Equipment",
      price: 280,
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2Fe028a2a0e1ba45cc987d661ce8dd8b71?format=webp&width=500",
      viewedAt: "2 hours ago"
    },
    {
      id: "recent-2",
      name: "Handwoven Basket Set",
      vendor: "Mwanza Traditional Crafts",
      price: 125,
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F4000a4aa85ff48ffa6796cab08da052e?format=webp&width=500",
      viewedAt: "1 day ago"
    },
    {
      id: "recent-3",
      name: "Financial Consultation",
      vendor: "FinanceFirst Advisors",
      price: 150,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=400&fit=crop&q=80",
      viewedAt: "2 days ago"
    }
  ];

  // Service categories for bottom section
  const serviceCategories = [
    {
      id: "fashion",
      name: "Fashion & Textiles",
      icon: Scissors,
      description: "Custom clothing, traditional wear, modern fashion",
      itemCount: 250,
      color: "from-pink-500 to-purple-600",
      href: "/categories/fashion-textiles"
    },
    {
      id: "food",
      name: "Food & Beverages",
      icon: Utensils,
      description: "Local delicacies, organic products, catering",
      itemCount: 180,
      color: "from-orange-500 to-red-600",
      href: "/categories/food-beverages"
    },
    {
      id: "financial",
      name: "Financial Services",
      icon: DollarSign,
      description: "Banking, loans, investments, insurance",
      itemCount: 95,
      color: "from-green-500 to-emerald-600",
      href: "/financial-services"
    },
    {
      id: "health",
      name: "Health & Wellness",
      icon: Heart,
      description: "Medical services, fitness, wellness programs",
      itemCount: 120,
      color: "from-red-500 to-pink-600",
      href: "/services/health-wellness"
    },
    {
      id: "home",
      name: "Home Services",
      icon: Home,
      description: "Cleaning, maintenance, repairs, improvement",
      itemCount: 85,
      color: "from-blue-500 to-indigo-600",
      href: "/services/home-services"
    },
    {
      id: "entertainment",
      name: "Entertainment",
      icon: Music,
      description: "Events, photography, music, content creation",
      itemCount: 65,
      color: "from-purple-500 to-pink-600",
      href: "/entertainment"
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
    
    // Apply additional filters
    filtered = filtered.filter(item => {
      const priceInRange = item.price >= activeFilters.priceRange[0] && item.price <= activeFilters.priceRange[1];
      const locationMatch = activeFilters.location === "all" || item.location.toLowerCase().includes(activeFilters.location);
      const ratingMatch = item.rating >= activeFilters.rating;
      
      return priceInRange && locationMatch && ratingMatch;
    });
    
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
        filtered.sort((a, b) => (b.tags.includes("New") ? 1 : 0) - (a.tags.includes("New") ? 1 : 0));
        break;
      case "recommended":
        filtered.sort((a, b) => (b.recommendationScore || 0) - (a.recommendationScore || 0));
        break;
      default:
        filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, sortBy, activeFilters]);

  const handleAddToCart = (productId: string, quantity: number = 1) => {
    try {
      const product = allProducts.find(p => p.id === productId);
      if (!product) {
        console.warn('Product not found:', productId);
        return;
      }

      setCartItems(prev => ({
        ...prev,
        [productId]: (prev[productId] || 0) + quantity
      }));

      // Convert the product to the format expected by marketplace context
      const marketplaceProduct = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        images: [product.image], // Convert single image to array
        category: product.category,
        inStock: product.inStock || product.available || true,
        rating: product.rating,
        reviewCount: product.reviews,
        tags: product.tags,
        vendor: {
          id: product.vendorId,
          name: product.vendor
        },
        features: product.features,
        variants: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      addToCart(marketplaceProduct, quantity);
      cartToast.addToCart(product.name);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleToggleFavorite = (productId: string) => {
    try {
      const product = allProducts.find(p => p.id === productId);
      if (!product) {
        console.warn('Product not found:', productId);
        return;
      }

      const isCurrentlyFavorited = favorites.includes(productId);
      toggleFavorite(productId);

      if (isCurrentlyFavorited) {
        wishlistToast.removeFromWishlist(product.name);
      } else {
        wishlistToast.addToWishlist(product.name);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.03, 
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Enhanced Gradient Background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at ${bgPosition.x}% ${bgPosition.y}%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
              radial-gradient(circle at ${100 - bgPosition.x}% ${100 - bgPosition.y}%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
              linear-gradient(135deg, 
                rgba(59, 130, 246, 0.05) 0%, 
                rgba(147, 51, 234, 0.05) 25%, 
                rgba(236, 72, 153, 0.05) 50%, 
                rgba(16, 185, 129, 0.05) 75%, 
                rgba(59, 130, 246, 0.05) 100%
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
              className={`fixed left-0 top-0 h-full bg-white/95 backdrop-blur-xl border-r border-gray-200 shadow-2xl z-50 ${
                sidebarCollapsed ? 'w-16' : 'w-72'
              } transition-all duration-300`}
            >
              {/* Sidebar Header */}
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                  {!sidebarCollapsed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
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
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg hover:shadow-xl' 
                              : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700'
                          } ${sidebarCollapsed ? 'px-2' : ''}`}
                          onClick={() => {
                            if (window.innerWidth < 1024) {
                              setSidebarOpen(false);
                            }
                          }}
                        >
                          <div className="relative flex-shrink-0">
                            <item.icon className={`h-5 w-5 transition-colors ${
                              item.active ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'
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
                                item.active ? 'text-white' : 'text-gray-900 group-hover:text-blue-900'
                              }`}>
                                {item.label}
                              </p>
                              <p className={`text-xs transition-colors truncate ${
                                item.active ? 'text-white/80' : 'text-gray-500 group-hover:text-blue-600'
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
            whileHover={{ scale: 1.03, transition: { duration: 0.2, ease: "easeOut" } }}
            whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
          >
            <Button
              onClick={() => setSidebarOpen(true)}
              className="bg-white/90 backdrop-blur-xl shadow-lg border border-gray-200 hover:bg-gray-50"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        {/* Enhanced Header with Smart Search */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Smart Search with Autocomplete */}
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
                    className="pl-16 pr-32 bg-white border-gray-300 focus:border-blue-400 focus:ring-blue-400 transition-colors shadow-sm rounded-xl h-12 text-base"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)}>
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <motion.div
                      whileHover={{ scale: 1.03, transition: { duration: 0.2, ease: "easeOut" } }}
                      whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                    >
                      <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 px-6">
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

                <motion.div whileHover={{ scale: 1.03, transition: { duration: 0.2, ease: "easeOut" } }} whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}>
                  <Button variant="outline" size="sm" className="relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03, transition: { duration: 0.2, ease: "easeOut" } }} whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}>
                  <Link href="/cart">
                    <Button variant="outline" size="sm" className="relative">
                      <ShoppingCart className="h-4 w-4" />
                      {getCartItemCount() > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                          {getCartItemCount()}
                        </span>
                      )}
                    </Button>
                  </Link>
                </motion.div>

                {user && (
                  <motion.div whileHover={{ scale: 1.03, transition: { duration: 0.2, ease: "easeOut" } }}>
                    <Avatar className="h-10 w-10 border-2 border-blue-200 cursor-pointer">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-semibold">
                        {user.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm relative z-20"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="recommended">Recommended</option>
                      <option value="popular">Most Popular</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Newest First</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <select
                      value={activeFilters.location}
                      onChange={(e) => setActiveFilters(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Locations</option>
                      <option value="lusaka">Lusaka</option>
                      <option value="ndola">Ndola</option>
                      <option value="kitwe">Kitwe</option>
                      <option value="livingstone">Livingstone</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Min Rating</label>
                    <select
                      value={activeFilters.rating}
                      onChange={(e) => setActiveFilters(prev => ({ ...prev, rating: Number(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={0}>Any Rating</option>
                      <option value={4}>4+ Stars</option>
                      <option value={4.5}>4.5+ Stars</option>
                      <option value={4.8}>4.8+ Stars</option>
                    </select>
                  </div>
                  
                  <div className="flex items-end">
                    <Button
                      onClick={() => {
                        setActiveFilters({ priceRange: [0, 1000], location: "all", vendor: "all", deliverySpeed: "all", rating: 0 });
                        setSelectedCategory("all");
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      <FilterX className="h-4 w-4 mr-2" />
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
            
            {/* 1. RECOMMENDED FOR YOU SECTION (TOP PRIORITY) */}
            <motion.section
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="relative"
            >
              <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                      <Target className="h-8 w-8 text-white" />
                    </div>
                    Recommended for You
                    <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI-Powered
                    </Badge>
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Personalized picks based on your preferences and browsing history
                  </p>
                </div>
                <Button variant="outline" className="group">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProducts.filter(item => item.isRecommended).map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="text-gray-600">{product.vendor}</p>
                    <p className="text-xl font-bold">K{product.price}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* 2. HOT DEALS SECTION */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="relative"
            >
              <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl animate-pulse">
                      <Flame className="h-7 w-7 text-white" />
                    </div>
                    Hot Deals
                    <Badge className="bg-red-100 text-red-700 animate-bounce">
                      <Timer className="h-3 w-3 mr-1" />
                      Limited Time
                    </Badge>
                  </h2>
                  <p className="text-gray-600">Exclusive offers with massive savings</p>
                </div>
                
                {/* Countdown Timer */}
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-xl">
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <Clock className="h-4 w-4" />
                      {String(timeLeft.hours).padStart(2, '0')}:
                      {String(timeLeft.minutes).padStart(2, '0')}:
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                  </div>
                  <Link href="/hot-deals">
                    <Button variant="outline" className="group border-red-300 hover:border-red-500 text-red-600">
                      View All Deals
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <div className="overflow-x-auto">
                <div className="flex gap-6 pb-4" style={{ width: "max-content" }}>
                  {allProducts.filter(item => item.isHotDeal).map((deal, index) => (
                    <motion.div
                      key={deal.id}
                      variants={itemVariants}
                      className="w-96 flex-shrink-0 group relative"
                    >
                      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border-2 border-red-200 overflow-hidden h-full relative">
                        {/* Glowing border animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                        
                        <div className="relative">
                          {/* Image with deal overlay */}
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={deal.image}
                              alt={deal.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            
                            {/* Deal percentage badge */}
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-lg px-3 py-1 animate-pulse">
                                -{deal.discount}% OFF
                              </Badge>
                            </div>

                            {/* Stock progress */}
                            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                              <div className="flex justify-between text-xs text-gray-600 mb-1">
                                <span>Stock</span>
                                <span>{deal.soldCount}/{deal.originalStock} sold</span>
                              </div>
                              <Progress 
                                value={(deal.soldCount / deal.originalStock) * 100} 
                                className="h-2"
                              />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium">{deal.rating}</span>
                              </div>
                              <Badge className="bg-orange-100 text-orange-700">
                                <Siren className="h-3 w-3 mr-1" />
                                Ends in {deal.dealEndsIn}
                              </Badge>
                            </div>

                            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{deal.name}</h3>
                            <p className="text-sm text-gray-600 mb-3">{deal.vendor}</p>

                            <div className="flex items-center gap-2 mb-4">
                              <span className="text-2xl font-bold text-red-600">K{deal.price}</span>
                              <span className="text-lg text-gray-500 line-through">K{deal.originalPrice}</span>
                            </div>

                            <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white">
                              <Lightning className="h-4 w-4 mr-2" />
                              {deal.type === "product" ? "Grab Deal" : "Book Now"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* 3. TRENDING PRODUCTS & SERVICES */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="relative"
            >
              <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                      <TrendingUp className="h-7 w-7 text-white" />
                    </div>
                    Trending Now
                    <Badge className="bg-green-100 text-green-700">
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Hot Picks
                    </Badge>
                  </h2>
                  <p className="text-gray-600">Fast-moving items that everyone's buying</p>
                </div>
                <Button variant="outline" className="group border-green-300 hover:border-green-500 text-green-600">
                  View Trending
                  <TrendingUp className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {allProducts.filter(item => item.isTrending).map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    initial="rest"
                    whileHover="hover"
                    className="group"
                  >
                    <motion.div
                      variants={cardHoverVariants}
                      className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
                    >
                      <div className="flex">
                        <div className="relative w-32 h-32 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs">
                              #{item.trendingRank}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex-1 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{item.name}</h3>
                            <div className="flex items-center gap-1 text-green-600">
                              <TrendingUp className="h-4 w-4" />
                              <span className="text-sm font-medium">+{item.weeklyGrowth}%</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">{item.vendor}</p>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm">{item.rating}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              <Activity className="h-3 w-3 mr-1" />
                              {item.popularityScore}% popularity
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-gray-900">K{item.price}</span>
                            <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                              {item.type === "product" ? "Add to Cart" : "Book Now"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 4. FLASH DEALS */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="relative"
            >
              <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                      <Lightning className="h-7 w-7 text-white animate-pulse" />
                    </div>
                    Flash Deals
                    <Badge className="bg-purple-100 text-purple-700 animate-bounce">
                      <Zap className="h-3 w-3 mr-1" />
                      Limited Stock
                    </Badge>
                  </h2>
                  <p className="text-gray-600">Grab these deals before they're gone!</p>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {allProducts.filter(item => item.isFlashDeal).map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="group relative"
                  >
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-purple-200 overflow-hidden relative">
                      {/* Animated border glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl animate-pulse" />
                      
                      <div className="relative">
                        <div className="flex">
                          <div className="relative w-40 h-40 flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
                            <div className="absolute bottom-2 left-2">
                              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                -{item.discount}% OFF
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex-1 p-6">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-bold text-xl text-gray-900 line-clamp-1">{item.name}</h3>
                              <Badge className={`${
                                item.urgencyLevel === 'high' ? 'bg-red-100 text-red-700' : 
                                item.urgencyLevel === 'medium' ? 'bg-orange-100 text-orange-700' : 
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                <Clock className="h-3 w-3 mr-1" />
                                {item.flashEndsIn}
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-3">{item.vendor}</p>
                            
                            <div className="flex items-center gap-2 mb-4">
                              <span className="text-2xl font-bold text-purple-600">K{item.price}</span>
                              <span className="text-lg text-gray-500 line-through">K{item.originalPrice}</span>
                            </div>
                            
                            <div className="flex items-center gap-1 mb-4">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{item.rating}</span>
                              <span className="text-xs text-gray-500">({item.reviews} reviews)</span>
                            </div>
                            
                            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                              <Lightning className="h-4 w-4 mr-2" />
                              Grab Flash Deal
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Recently Viewed Section */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="relative"
            >
              <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    Recently Viewed
                  </h2>
                  <p className="text-gray-600">Continue where you left off</p>
                </div>
              </motion.div>

              <div className="overflow-x-auto">
                <div className="flex gap-4 pb-4" style={{ width: "max-content" }}>
                  {recentlyViewed.map((item, index) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      className="w-64 flex-shrink-0 bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-300"
                    >
                      <div className="h-32 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.vendor}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-900">K{item.price}</span>
                          <span className="text-xs text-gray-500">{item.viewedAt}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* 5. SHOP BY CATEGORY (BOTTOM SECTION) */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="relative"
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Explore our wide range of services and products organized by category
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {serviceCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    variants={itemVariants}
                    initial="rest"
                    whileHover="hover"
                    className="group"
                  >
                    <Link href={category.href}>
                      <motion.div
                        variants={cardHoverVariants}
                        className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 overflow-hidden h-full cursor-pointer"
                      >
                        <div className="p-8 text-center">
                          <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                            <category.icon className="h-8 w-8 text-white" />
                          </div>
                          
                          <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                            {category.name}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {category.description}
                          </p>
                          
                          <div className="flex items-center justify-center gap-2 text-blue-600 group-hover:text-blue-700 transition-colors">
                            <span className="font-medium">{category.itemCount} items</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>

          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-lg z-40">
        <div className="flex items-center justify-around py-2">
          {[
            { icon: Home, label: "Home", href: "/customer-dashboard" },
            { icon: Store, label: "Shop", href: "/marketplace", active: true },
            { icon: Heart, label: "Wishlist", href: "/wishlist", badge: favorites.length },
            { icon: ShoppingCart, label: "Cart", href: "/cart", badge: getCartItemCount() },
            { icon: User, label: "Account", href: "/profile" }
          ].map((item) => (
            <Link key={item.label} href={item.href}>
              <motion.div
                whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                  item.active ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <div className="relative">
                  <item.icon className="h-6 w-6" />
                  {item.badge && item.badge > 0 && (
                    <div className="absolute -top-2 -right-2 min-w-[20px] h-5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center px-1">
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
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }}
              exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }}
              whileHover={{ scale: 1.06, transition: { duration: 0.2, ease: "easeOut" } }}
              whileTap={{ scale: 0.94, transition: { duration: 0.1 } }}
            >
              <Button
                onClick={scrollToTop}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg hover:shadow-xl"
              >
                <ArrowUp className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Help Chat */}
        <motion.div
          whileHover={{ scale: 1.06, transition: { duration: 0.2, ease: "easeOut" } }}
          whileTap={{ scale: 0.94, transition: { duration: 0.1 } }}
        >
          <Button className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg hover:shadow-xl">
            <MessageCircle className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
