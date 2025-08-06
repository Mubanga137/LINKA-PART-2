"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Clock,
  Eye,
  Search,
  Filter,
  Calendar,
  Star,
  Heart,
  ShoppingCart,
  Trash2,
  RefreshCw,
  Grid3X3,
  List,
  ArrowRight,
  Package,
  Percent,
  Store,
  MapPin,
  ChevronDown,
  BarChart3,
  TrendingUp,
  History as HistoryIcon,
  Bookmark,
  ExternalLink,
  Plus,
  X
} from "lucide-react";

export default function BrowsingHistory() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Mock data for browsing history
  const [historyItems, setHistoryItems] = useState([
    {
      id: "hist-1",
      type: "product",
      name: "Handcrafted Copper Jewelry Set",
      vendor: "Copper Craft Artisans",
      price: "K 275.99",
      originalPrice: "K 320.00",
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2F12e840cc58ab4f23b45914a038f372d6?format=webp&width=800",
      category: "Jewelry & Accessories",
      viewedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      rating: 4.9,
      reviews: 156,
      inStock: true,
      discount: 14,
      isWishlisted: false,
      viewCount: 1
    },
    {
      id: "hist-2", 
      type: "product",
      name: "Traditional Chitenge Fabric Collection",
      vendor: "Banda Fashion House",
      price: "K 189.99",
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2Fa2f294111b514f3eb8bbc4805acb9326?format=webp&width=800",
      category: "Fashion & Textiles",
      viewedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      rating: 4.7,
      reviews: 89,
      inStock: true,
      discount: 0,
      isWishlisted: true,
      viewCount: 3
    },
    {
      id: "hist-3",
      type: "service",
      name: "Professional Photography Package",
      vendor: "Studio Vision Pro",
      price: "K 450.00",
      originalPrice: "K 600.00",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=400&fit=crop&q=80",
      category: "Entertainment",
      viewedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      rating: 4.9,
      reviews: 234,
      available: true,
      discount: 25,
      isWishlisted: false,
      viewCount: 2
    },
    {
      id: "hist-4",
      type: "product", 
      name: "Premium Zambian Honey Collection",
      vendor: "Pure Nature Foods",
      price: "K 159.99",
      image: "https://cdn.builder.io/api/v1/image/assets%2Fc72968545b7946109e3f1b305aec7cf3%2Fb92a8e5b385c400ba9c8823b431aca28?format=webp&width=800",
      category: "Food & Beverages",
      viewedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      rating: 4.8,
      reviews: 127,
      inStock: true,
      discount: 0,
      isWishlisted: true,
      viewCount: 1
    },
    {
      id: "hist-5",
      type: "product",
      name: "Smart Home Security System",
      vendor: "TechSmart Solutions",
      price: "K 899.99",
      originalPrice: "K 1200.00",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop&q=80",
      category: "Electronics",
      viewedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      rating: 4.6,
      reviews: 98,
      inStock: false,
      discount: 25,
      isWishlisted: false,
      viewCount: 4
    },
    {
      id: "hist-6",
      type: "service",
      name: "Home Cleaning Premium Package",
      vendor: "CleanPro Services", 
      price: "K 125.00",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=400&fit=crop&q=80",
      category: "Home Services",
      viewedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      rating: 4.4,
      reviews: 67,
      available: true,
      discount: 0,
      isWishlisted: false,
      viewCount: 1
    }
  ]);

  const categories = ["all", "Fashion & Textiles", "Jewelry & Accessories", "Food & Beverages", "Electronics", "Entertainment", "Home Services"];
  const timeFilters = ["all", "today", "week", "month", "older"];

  // Filter and sort history items
  const filteredItems = historyItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    
    let matchesTime = true;
    const now = new Date();
    const itemDate = item.viewedAt;
    
    if (timeFilter === "today") {
      matchesTime = itemDate.toDateString() === now.toDateString();
    } else if (timeFilter === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      matchesTime = itemDate >= weekAgo;
    } else if (timeFilter === "month") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      matchesTime = itemDate >= monthAgo;
    } else if (timeFilter === "older") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      matchesTime = itemDate < monthAgo;
    }
    
    return matchesSearch && matchesCategory && matchesTime;
  }).sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return b.viewedAt.getTime() - a.viewedAt.getTime();
      case "oldest":
        return a.viewedAt.getTime() - b.viewedAt.getTime();
      case "price-high":
        return parseFloat(b.price.replace("K ", "")) - parseFloat(a.price.replace("K ", ""));
      case "price-low":
        return parseFloat(a.price.replace("K ", "")) - parseFloat(b.price.replace("K ", ""));
      case "rating":
        return b.rating - a.rating;
      case "views":
        return b.viewCount - a.viewCount;
      default:
        return 0;
    }
  });

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return "1 day ago";
    } else {
      return `${Math.floor(diffInHours / 24)} days ago`;
    }
  };

  const toggleWishlist = (itemId: string) => {
    setHistoryItems(items => 
      items.map(item => 
        item.id === itemId 
          ? { ...item, isWishlisted: !item.isWishlisted }
          : item
      )
    );
  };

  const removeFromHistory = (itemId: string) => {
    setHistoryItems(items => items.filter(item => item.id !== itemId));
  };

  const clearHistory = () => {
    setHistoryItems([]);
    setSelectedItems([]);
  };

  const toggleSelectItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const removeSelectedItems = () => {
    setHistoryItems(items => items.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              x: [0, 120, 0],
              y: [0, -60, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-300/20 to-purple-300/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 70, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-300/25 to-blue-300/25 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
              <HistoryIcon className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Your Browsing{" "}
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                History
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Continue where you left off and revisit items you've viewed
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <Card className="bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{historyItems.length}</div>
                <div className="text-sm text-gray-600">Items Viewed</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {historyItems.filter(item => item.isWishlisted).length}
                </div>
                <div className="text-sm text-gray-600">Wishlisted</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round(historyItems.reduce((sum, item) => sum + item.viewCount, 0) / historyItems.length) || 0}
                </div>
                <div className="text-sm text-gray-600">Avg Views</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 bg-white/50 backdrop-blur-sm border-y border-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search your history..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/80 backdrop-blur-sm border border-gray-200"
                />
              </div>

              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-40 bg-white/80 backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="older">Older</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48 bg-white/80 backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-white/80 backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="views">Most Viewed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {selectedItems.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={removeSelectedItems}
                  className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove ({selectedItems.length})
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={clearHistory}
                className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* History Items */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className={viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
              }
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className={viewMode === "grid" ? "" : ""}
                >
                  {viewMode === "grid" ? (
                    // Grid View
                    <Card className="bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                      <div className="relative">
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Overlay Controls */}
                        <div className="absolute top-2 left-2 right-2 flex justify-between">
                          <button
                            onClick={() => toggleSelectItem(item.id)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                              selectedItems.includes(item.id)
                                ? "bg-pink-500 border-pink-500"
                                : "bg-white/80 border-gray-300 hover:border-pink-500"
                            }`}
                          >
                            {selectedItems.includes(item.id) && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 bg-white rounded-full"
                              />
                            )}
                          </button>

                          <div className="flex gap-2">
                            {item.discount > 0 && (
                              <Badge className="bg-red-500 text-white">
                                -{item.discount}%
                              </Badge>
                            )}
                            <Badge className="bg-blue-100 text-blue-700 text-xs">
                              <Eye className="h-3 w-3 mr-1" />
                              {item.viewCount}
                            </Badge>
                          </div>
                        </div>

                        <div className="absolute bottom-2 right-2 flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleWishlist(item.id)}
                            className="w-8 h-8 p-0 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white"
                          >
                            <Heart className={`h-4 w-4 ${item.isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                          </Button>
                          <Button
                            size="sm" 
                            variant="ghost"
                            onClick={() => removeFromHistory(item.id)}
                            className="w-8 h-8 p-0 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs font-medium">{item.rating}</span>
                            <span className="text-xs text-gray-500">({item.reviews})</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {item.type}
                          </Badge>
                        </div>

                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.vendor}</p>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">{item.price}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                            )}
                          </div>
                          <Badge variant={
                            item.type === "product" 
                              ? (item.inStock ? "default" : "secondary")
                              : (item.available ? "default" : "secondary")
                          } className="text-xs">
                            {item.type === "product" 
                              ? (item.inStock ? "In Stock" : "Out of Stock")
                              : (item.available ? "Available" : "Unavailable")
                            }
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTimeAgo(item.viewedAt)}
                          </div>
                          <span>{item.category}</span>
                        </div>

                        <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {item.type === "product" ? "Add to Cart" : "Book Now"}
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    // List View
                    <Card className="bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => toggleSelectItem(item.id)}
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                              selectedItems.includes(item.id)
                                ? "bg-pink-500 border-pink-500"
                                : "bg-white border-gray-300 hover:border-pink-500"
                            }`}
                          >
                            {selectedItems.includes(item.id) && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 bg-white rounded-full"
                              />
                            )}
                          </button>

                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
                                <p className="text-sm text-gray-600">{item.vendor}</p>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                                {item.discount > 0 && (
                                  <Badge className="bg-red-500 text-white text-xs">
                                    -{item.discount}%
                                  </Badge>
                                )}
                                <Badge className="bg-blue-100 text-blue-700 text-xs">
                                  <Eye className="h-3 w-3 mr-1" />
                                  {item.viewCount}
                                </Badge>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 mb-2">
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium">{item.rating}</span>
                                <span className="text-xs text-gray-500">({item.reviews})</span>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {item.type}
                              </Badge>
                              <span className="text-xs text-gray-500">{item.category}</span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-900">{item.price}</span>
                                {item.originalPrice && (
                                  <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                                )}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock className="h-3 w-3" />
                                {formatTimeAgo(item.viewedAt)}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleWishlist(item.id)}
                              className="w-8 h-8 p-0"
                            >
                              <Heart className={`h-4 w-4 ${item.isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost" 
                              onClick={() => removeFromHistory(item.id)}
                              className="w-8 h-8 p-0 text-red-600"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            <Button size="sm" className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              {item.type === "product" ? "Add" : "Book"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <HistoryIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No history found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {searchTerm || timeFilter !== "all" || categoryFilter !== "all"
                  ? "Try adjusting your search or filters to find items"
                  : "Start browsing products and services to build your history"
                }
              </p>
              <Link href="/marketplace">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
                  <Store className="h-4 w-4 mr-2" />
                  Browse Marketplace
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
