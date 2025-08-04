"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
  Eye
} from "lucide-react";
import { MarketplaceProvider, useCart, useFavorites } from "@/contexts/marketplace-context";
import { ProductDetailModal } from "@/components/marketplace/ProductDetailModal";
import { CategoryNavigation, HorizontalCategoryNav } from "@/components/marketplace/CategoryNavigation";
import { OptimizedProductCard } from "@/components/marketplace/OptimizedProductCard";
import type { Product, MarketplaceFilters, Category } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

// Enhanced mock data with better structure
const mockCategories: Category[] = [
  { id: "1", name: "Electronics", slug: "electronics", icon: "📱", productCount: 9 },
  { id: "2", name: "Fashion", slug: "fashion", icon: "👕", productCount: 6 },
  { id: "3", name: "Home & Garden", slug: "home-garden", icon: "🏠", productCount: 7 },
  { id: "4", name: "Health & Beauty", slug: "health-beauty", icon: "💄", productCount: 3 },
  { id: "5", name: "Sports & Outdoors", slug: "sports", icon: "⚽", productCount: 4 },
  { id: "6", name: "Books & Media", slug: "books", icon: "📚", productCount: 3 },
  { id: "7", name: "Jewelry & Accessories", slug: "jewelry", icon: "💎", productCount: 1 }
];

const mockProducts: Product[] = [
  // Electronics Category
  {
    id: "1",
    name: "4K Smart TV 55-inch",
    description: "Ultra HD Smart TV with built-in streaming apps and crystal clear display",
    price: 599.99,
    originalPrice: 749.99,
    images: ["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80"],
    category: "Electronics",
    inStock: true,
    stockQuantity: 15,
    rating: 4.7,
    reviewCount: 234,
    tags: ["tv", "smart", "4k", "entertainment"],
    vendor: { id: "v1", name: "Electronics Hub Zambia", logo: "" },
    featured: true,
    discountPercentage: 20,
    fastDelivery: true,
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    name: "Wireless Gaming Controller",
    description: "Professional wireless controller with precision controls for gaming",
    price: 79.99,
    images: ["https://images.unsplash.com/photo-1592840062661-afe1e104c5a4?w=800&q=80"],
    category: "Electronics",
    inStock: true,
    stockQuantity: 67,
    rating: 4.5,
    reviewCount: 189,
    tags: ["gaming", "wireless", "controller", "electronics"],
    vendor: { id: "v1", name: "Electronics Hub Zambia", logo: "" },
    fastDelivery: true,
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    name: "Bluetooth Speaker System",
    description: "High-quality portable Bluetooth speaker with rich bass and crystal clear sound",
    price: 149.99,
    originalPrice: 199.99,
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80"],
    category: "Electronics",
    inStock: true,
    stockQuantity: 34,
    rating: 4.6,
    reviewCount: 145,
    tags: ["bluetooth", "speaker", "audio", "portable"],
    vendor: { id: "v2", name: "Audio Pro Zambia", logo: "" },
    discountPercentage: 25,
    fastDelivery: true,
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "4",
    name: "Smartphone 128GB",
    description: "Latest smartphone with advanced camera system and long-lasting battery",
    price: 399.99,
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80"],
    category: "Electronics",
    inStock: true,
    stockQuantity: 28,
    rating: 4.8,
    reviewCount: 312,
    tags: ["smartphone", "mobile", "camera", "technology"],
    vendor: { id: "v3", name: "Mobile Tech Zambia", logo: "" },
    featured: true,
    fastDelivery: true,
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "5",
    name: "Traditional Chitenge Dress",
    description: "Beautiful handmade chitenge dress showcasing Zambian traditional patterns",
    price: 45.99,
    images: ["https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=800&q=80"],
    category: "Fashion",
    inStock: true,
    stockQuantity: 23,
    rating: 4.9,
    reviewCount: 87,
    tags: ["traditional", "chitenge", "dress", "zambian"],
    vendor: { id: "v5", name: "Zambian Heritage Fashion", logo: "" },
    featured: true,
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "6",
    name: "Handwoven Basket Set",
    description: "Beautiful set of traditional Zambian handwoven baskets for storage and decoration",
    price: 65.99,
    images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"],
    category: "Home & Garden",
    inStock: true,
    stockQuantity: 19,
    rating: 4.8,
    reviewCount: 73,
    tags: ["baskets", "handwoven", "traditional", "storage"],
    vendor: { id: "v9", name: "Zambian Craft Collective", logo: "" },
    featured: true,
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Add more hot deal products
  {
    id: "30",
    name: "Gaming Headset Pro",
    description: "Professional gaming headset with 7.1 surround sound and noise cancellation",
    price: 79.99,
    originalPrice: 149.99,
    images: ["https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=800&q=80"],
    category: "Electronics",
    inStock: true,
    stockQuantity: 25,
    rating: 4.8,
    reviewCount: 189,
    tags: ["gaming", "headset", "audio", "pro"],
    vendor: { id: "v27", name: "Gaming World Zambia", logo: "" },
    discountPercentage: 47,
    featured: true,
    fastDelivery: true,
    freeShipping: true,
    hotDeal: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "31",
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracker with heart rate monitoring and GPS",
    price: 159.99,
    originalPrice: 299.99,
    images: ["https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&q=80"],
    category: "Electronics",
    inStock: true,
    stockQuantity: 15,
    rating: 4.7,
    reviewCount: 245,
    tags: ["smartwatch", "fitness", "tracker", "health"],
    vendor: { id: "v28", name: "Wearable Tech Zambia", logo: "" },
    discountPercentage: 47,
    featured: true,
    fastDelivery: true,
    freeShipping: true,
    hotDeal: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

const heroVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.8,
      type: "spring",
      stiffness: 100,
      damping: 15
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

function MarketplaceContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<MarketplaceFilters>({
    sortBy: 'relevance'
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [animateSearch, setAnimateSearch] = useState(false);

  // Handle URL parameters for filters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const hotDealParam = urlParams.get('filter');
    if (hotDealParam === 'hotDeal') {
      setFilters(prev => ({ ...prev, hotDeal: true }));
    }
  }, []);

  // Animate search when user starts typing
  useEffect(() => {
    if (searchQuery) {
      setAnimateSearch(true);
      const timer = setTimeout(() => setAnimateSearch(false), 300);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);
  
  const { cart, addToCart, getCartItemCount } = useCart();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // Filter and sort products with enhanced logic
  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }

    // Apply price range filter
    if (filters.priceRange) {
      result = result.filter(product => 
        product.price >= filters.priceRange![0] && 
        product.price <= filters.priceRange![1]
      );
    }

    // Apply rating filter
    if (filters.rating) {
      result = result.filter(product => (product.rating || 0) >= filters.rating!);
    }

    // Apply in stock filter
    if (filters.inStock) {
      result = result.filter(product => product.inStock);
    }

    // Apply feature filters
    if (filters.freeShipping) {
      result = result.filter(product => product.freeShipping);
    }

    if (filters.fastDelivery) {
      result = result.filter(product => product.fastDelivery);
    }

    if (filters.featured) {
      result = result.filter(product => product.featured);
    }

    if ((filters as any).hotDeal) {
      result = result.filter(product => (product as any).hotDeal);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price_low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'discount':
        result.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
        break;
      default:
        // relevance - featured items first, then by rating
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.rating || 0) - (a.rating || 0);
        });
    }

    return result;
  }, [searchQuery, filters]);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  const hotDealsProducts = mockProducts.filter(product => (product as any).hotDeal);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50"
    >
      <Header />
      
      <main className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Enhanced Hero Section with Animations */}
        <motion.section
          variants={heroVariants}
          initial="initial"
          animate="animate"
          className="text-center space-y-4 sm:space-y-6 mb-6 sm:mb-8 relative overflow-hidden"
        >
          {/* Floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              variants={sparkleVariants}
              initial="initial"
              animate="animate"
              className="absolute top-10 right-10 w-4 h-4 text-yellow-400"
            >
              <Sparkles className="w-full h-full" />
            </motion.div>
            <motion.div
              variants={sparkleVariants}
              initial="initial"
              animate="animate"
              style={{ animationDelay: "0.5s" }}
              className="absolute top-32 left-10 w-6 h-6 text-purple-400"
            >
              <Sparkles className="w-full h-full" />
            </motion.div>
            <motion.div
              variants={sparkleVariants}
              initial="initial"
              animate="animate"
              style={{ animationDelay: "1s" }}
              className="absolute bottom-20 right-1/4 w-5 h-5 text-pink-400"
            >
              <Sparkles className="w-full h-full" />
            </motion.div>
          </div>

          <div className="space-y-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-50 to-green-50 px-4 py-2 text-sm border border-blue-200/50"
            >
              <ShoppingBag className="mr-2 h-4 w-4 text-blue-600" />
              <span className="text-blue-800 font-medium">Zambia's Premier E-commerce Platform</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight"
            >
              Shop Local,
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="block bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent"
              >
                Support Zambian Businesses
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
              Discover amazing products from verified local vendors. From handmade crafts to modern electronics,
              find everything you need while supporting the Zambian economy.
            </motion.p>
          </div>
        </motion.section>

        {/* Enhanced Search and Filters */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-4 mb-6"
        >
          {/* Animated Search Bar */}
          <motion.div variants={itemVariants} className="relative w-full">
            <div className="relative">
              <motion.div
                animate={{ scale: animateSearch ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
              >
                <Search className="text-gray-400 h-5 w-5" />
              </motion.div>
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-base rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-0 bg-white transition-all duration-200 tap-target"
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Animated Quick Filters */}
          <motion.div variants={itemVariants} className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide justify-center mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={filters.featured ? "default" : "outline"}
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, featured: !prev.featured }))}
                className="whitespace-nowrap flex-shrink-0 px-4 py-2 text-sm tap-target-sm transition-all duration-200"
              >
                ⭐ Featured
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={(filters as any).hotDeal ? "default" : "outline"}
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, hotDeal: !(prev as any).hotDeal }))}
                className="whitespace-nowrap flex-shrink-0 px-4 py-2 text-sm tap-target-sm bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 text-red-700 hover:from-red-100 hover:to-orange-100 transition-all duration-200"
              >
                🔥 Hot Deals
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={filters.freeShipping ? "default" : "outline"}
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, freeShipping: !prev.freeShipping }))}
                className="whitespace-nowrap flex-shrink-0 px-4 py-2 text-sm tap-target-sm transition-all duration-200"
              >
                🚚 Free Ship
              </Button>
            </motion.div>
          </motion.div>

          {/* Animated Category Navigation */}
          <motion.div variants={itemVariants}>
            <HorizontalCategoryNav
              categories={mockCategories}
              selectedCategory={filters.category}
              onCategorySelect={(categoryId) => {
                const category = mockCategories.find(c => c.id === categoryId);
                setFilters(prev => ({
                  ...prev,
                  category: category?.name
                }));
              }}
              className="justify-center"
            />
          </motion.div>

          {/* Enhanced Filter and Sort Controls */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="sm">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </motion.div>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                    <h3 className="text-lg font-semibold">Filters</h3>
                    
                    {/* Price Range */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Price Range</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={filters.priceRange?.[0] || ''}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            priceRange: [Number(e.target.value), prev.priceRange?.[1] || 1000]
                          }))}
                        />
                        <Input
                          type="number"
                          placeholder="Max"
                          value={filters.priceRange?.[1] || ''}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            priceRange: [prev.priceRange?.[0] || 0, Number(e.target.value)]
                          }))}
                        />
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Features</label>
                      {[
                        { key: 'inStock', label: 'In Stock Only' },
                        { key: 'freeShipping', label: 'Free Shipping' },
                        { key: 'fastDelivery', label: 'Fast Delivery' },
                        { key: 'featured', label: 'Featured Products' }
                      ].map(({ key, label }) => (
                        <motion.div
                          key={key}
                          whileHover={{ x: 5 }}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={key}
                            checked={filters[key as keyof MarketplaceFilters] as boolean}
                            onChange={(e) => setFilters(prev => ({
                              ...prev,
                              [key]: e.target.checked
                            }))}
                            className="rounded border-gray-300"
                          />
                          <label htmlFor={key} className="text-sm">{label}</label>
                        </motion.div>
                      ))}
                    </div>

                    {/* Clear Filters */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFilters({ sortBy: 'relevance' })}
                        className="w-full"
                      >
                        Clear All Filters
                      </Button>
                    </motion.div>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <motion.select
                  whileHover={{ scale: 1.02 }}
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    sortBy: e.target.value as MarketplaceFilters['sortBy'] 
                  }))}
                  className="text-sm border rounded-lg px-3 py-1 bg-white transition-all duration-200"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="discount">Best Deals</option>
                </motion.select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">View:</span>
              <div className="flex border rounded-lg overflow-hidden">
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                </motion.div>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Animated Results Count */}
          <motion.div variants={itemVariants} className="text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-600"
            >
              Showing {filteredProducts.length} of {mockProducts.length} products
              {searchQuery && <span> for "{searchQuery}"</span>}
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Enhanced Hot Deals Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-3">
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
                className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white text-2xl">🔥</span>
              </motion.div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Hot Deals</h2>
                <p className="text-sm text-gray-600">Limited time offers - Up to 50% off!</p>
              </div>
            </div>
            <motion.div
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-right"
            >
              <div className="text-sm text-red-600 font-semibold">⏰ Limited Time</div>
              <div className="text-xs text-gray-500">Ends soon!</div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-2 gap-4 sm:gap-4 md:gap-4 lg:gap-4 md:grid-cols-4 lg:grid-cols-4"
          >
            {hotDealsProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <OptimizedProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={isFavorite(product.id)}
                  priority={index < 2}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Enhanced Products Grid */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-6 sm:space-y-8"
        >
          {viewMode === 'grid' ? (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-2 gap-4 sm:gap-4 md:gap-4 lg:gap-4 md:grid-cols-3 lg:grid-cols-4"
            >
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    layout
                    whileHover={{ 
                      scale: 1.03,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <OptimizedProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={isFavorite(product.id)}
                      priority={index < 4}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-4 sm:space-y-6"
            >
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    layout
                    whileHover={{ scale: 1.01 }}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-blue-200 flex flex-col sm:flex-row"
                  >
                    <div className="aspect-square sm:w-48 sm:flex-shrink-0 overflow-hidden bg-gray-100">
                      <Image
                        src={product.images[0]}
                        alt={`${product.name} - ${product.description}`}
                        width={300}
                        height={300}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                        loading={index < 2 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    </div>
                    <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-clamp-lg font-bold text-gray-900 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-clamp-base text-gray-600 mb-3 sm:mb-4">
                          {product.description}
                        </p>
                        <div className="flex items-baseline gap-2 mb-3 sm:mb-4">
                          <span className="text-2xl font-bold text-gray-900">
                            K{product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              K{product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 sm:gap-3">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.inStock}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 sm:px-6 rounded-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50 tap-target focus-visible-enhanced flex-1"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            variant="outline"
                            className="border-gray-300 text-gray-600 hover:bg-gray-50 py-2.5 px-4 sm:px-6 rounded-lg transition-all duration-200 tap-target focus-visible-enhanced flex-1"
                            asChild
                          >
                            <Link href={`/products/${product.id}`}>
                              View Details
                            </Link>
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Enhanced No Results */}
          <AnimatePresence>
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Search className="h-8 w-8 text-gray-400" />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={() => {
                    setSearchQuery("");
                    setFilters({ sortBy: 'relevance' });
                  }}>
                    Clear All Filters
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Enhanced Featured Categories */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 space-y-4"
        >
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Shop by Category
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600"
            >
              Explore our wide range of product categories
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
          >
            {mockCategories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredCategory(category.id)}
                onHoverEnd={() => setHoveredCategory(null)}
              >
                <Card
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
                  onClick={() => setFilters(prev => ({ ...prev, category: category.name }))}
                >
                  <CardContent className="p-6 text-center relative">
                    <motion.div
                      animate={{ 
                        scale: hoveredCategory === category.id ? 1.2 : 1,
                        rotate: hoveredCategory === category.id ? 10 : 0
                      }}
                      transition={{ duration: 0.2 }}
                      className="text-3xl mb-3"
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">{category.productCount} items</p>
                    
                    {/* Hover effect background */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: hoveredCategory === category.id ? 0.1 : 0,
                        scale: hoveredCategory === category.id ? 1 : 0.8
                      }}
                      className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Enhanced CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white relative overflow-hidden rounded-2xl p-6 sm:p-8 text-center"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ 
                x: [0, 100, 0],
                y: [0, -50, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
            />
            <motion.div
              animate={{ 
                x: [0, -100, 0],
                y: [0, 50, 0],
                rotate: [360, 180, 0]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full blur-xl"
            />
          </div>

          <div className="relative z-10 space-y-4 sm:space-y-6">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold"
            >
              Join Our Marketplace
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl opacity-90 max-w-2xl mx-auto"
            >
              Start selling your products to thousands of customers across Zambia. 
              Join our growing community of successful entrepreneurs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link href="/become-retailer">Become a Seller</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold px-8 py-4 rounded-xl"
                  asChild
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
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
