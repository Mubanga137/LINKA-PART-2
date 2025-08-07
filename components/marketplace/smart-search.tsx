"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Clock,
  TrendingUp,
  Star,
  Package,
  Store,
  Tag,
  MapPin,
  Filter,
  X,
  History,
  Flame,
  Zap,
  Heart,
  ArrowUpRight,
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SearchResult {
  id: string;
  type: 'product' | 'category' | 'vendor' | 'suggestion';
  title: string;
  description?: string;
  image?: string;
  price?: number;
  rating?: number;
  category?: string;
  vendor?: string;
  trending?: boolean;
  popular?: boolean;
  location?: string;
}

interface SmartSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const mockSearchData: SearchResult[] = [
  // Products
  {
    id: "p1",
    type: "product",
    title: "iPhone 15 Pro Max",
    description: "Latest smartphone with advanced camera system",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    price: 899.99,
    rating: 4.8,
    category: "Electronics",
    vendor: "Tech Hub Zambia",
    trending: true
  },
  {
    id: "p2",
    type: "product",
    title: "Gaming Headset Pro",
    description: "Professional gaming headset with 7.1 surround sound",
    image: "https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=400&q=80",
    price: 79.99,
    rating: 4.7,
    category: "Electronics",
    vendor: "Gaming World ZM",
    popular: true
  },
  {
    id: "p3",
    type: "product",
    title: "Traditional Chitenge Dress",
    description: "Beautiful handmade chitenge dress",
    image: "https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=400&q=80",
    price: 45.99,
    rating: 4.9,
    category: "Fashion",
    vendor: "Heritage Fashion ZM",
    trending: true
  },
  // Categories
  {
    id: "c1",
    type: "category",
    title: "Electronics",
    description: "Smartphones, laptops, gadgets and more",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80"
  },
  {
    id: "c2",
    type: "category",
    title: "Fashion & Textiles",
    description: "Traditional and modern clothing",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80"
  },
  // Vendors
  {
    id: "v1",
    type: "vendor",
    title: "Electronics Hub Zambia",
    description: "Verified seller • 4.8★ (1,240 reviews)",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80",
    location: "Lusaka, Zambia"
  },
  {
    id: "v2",
    type: "vendor",
    title: "Zambian Heritage Fashion",
    description: "Verified seller • 4.9★ (987 reviews)",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80",
    location: "Kitwe, Zambia"
  }
];

const trendingSearches = [
  "iPhone 15",
  "Gaming headset",
  "Chitenge fabric",
  "Traditional crafts",
  "Smart watch",
  "Wireless earbuds",
  "African fashion",
  "Electronics deals"
];

const recentSearches = [
  "gaming chair",
  "traditional dress",
  "smartphone case",
  "wireless mouse"
];

const quickFilters = [
  { icon: Fire, label: "Trending", color: "from-red-400 to-orange-400" },
  { icon: Star, label: "Top Rated", color: "from-yellow-400 to-orange-400" },
  { icon: Zap, label: "Flash Sale", color: "from-purple-400 to-pink-400" },
  { icon: Heart, label: "Wishlist", color: "from-pink-400 to-red-400" }
];

export function SmartSearch({ onSearch, placeholder = "Search products, vendors, or categories...", className = "" }: SmartSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useState<string[]>(recentSearches);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Filter search results based on query
  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];

    return mockSearchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description?.toLowerCase().includes(query.toLowerCase()) ||
      item.category?.toLowerCase().includes(query.toLowerCase()) ||
      item.vendor?.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);
  }, [query]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex(prev => 
            prev < filteredResults.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          e.preventDefault();
          if (activeIndex >= 0 && filteredResults[activeIndex]) {
            handleResultClick(filteredResults[activeIndex]);
          } else if (query.trim()) {
            handleSearch(query);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setActiveIndex(-1);
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, filteredResults, query]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);
    setIsOpen(true);
    setActiveIndex(-1);
  };

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    // Add to search history
    setSearchHistory(prev => {
      const newHistory = [searchQuery, ...prev.filter(item => item !== searchQuery)];
      return newHistory.slice(0, 10); // Keep only last 10 searches
    });

    onSearch(searchQuery);
    setIsOpen(false);
    setActiveIndex(-1);
    inputRef.current?.blur();
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'suggestion') {
      setQuery(result.title);
      handleSearch(result.title);
    } else {
      // Navigate to result page based on type
      switch (result.type) {
        case 'product':
          window.location.href = `/products/${result.id}`;
          break;
        case 'category':
          window.location.href = `/categories/${result.id}`;
          break;
        case 'vendor':
          window.location.href = `/vendors/${result.id}`;
          break;
      }
    }
  };

  const handleTrendingClick = (trending: string) => {
    setQuery(trending);
    handleSearch(trending);
  };

  const handleQuickFilterClick = (filter: string) => {
    onSearch(`filter:${filter.toLowerCase()}`);
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'product': return Package;
      case 'category': return Tag;
      case 'vendor': return Store;
      default: return Search;
    }
  };

  return (
    <div className={`relative w-full ${className}`} ref={resultsRef}>
      {/* Search Input */}
      <motion.div
        animate={{ scale: isFocused ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <div className={`relative bg-white rounded-2xl border-2 transition-all duration-300 ${
          isFocused 
            ? 'border-blue-400 shadow-lg shadow-blue-100' 
            : 'border-gray-200 shadow-sm'
        }`}>
          <motion.div
            animate={{ scale: isFocused ? 1.1 : 1, rotate: isFocused ? 360 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
          >
            <Search className="text-gray-400 h-5 w-5" />
          </motion.div>
          
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setIsOpen(true);
            }}
            onBlur={() => setIsFocused(false)}
            className="w-full pl-12 pr-12 py-4 text-lg border-0 bg-transparent focus:ring-0 placeholder:text-gray-400"
          />
          
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <X className="h-5 w-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-0 max-h-96 overflow-y-auto">
                {/* Quick Filters */}
                {!query && (
                  <div className="p-4 border-b border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Quick Filters
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {quickFilters.map((filter) => (
                        <motion.div
                          key={filter.label}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickFilterClick(filter.label)}
                            className={`bg-gradient-to-r ${filter.color} bg-opacity-10 border-0 hover:shadow-md transition-all duration-200`}
                          >
                            <filter.icon className="h-3 w-3 mr-1" />
                            {filter.label}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search Results */}
                {query && filteredResults.length > 0 && (
                  <div className="p-2">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 px-2 flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      Search Results
                    </h4>
                    {filteredResults.map((result, index) => {
                      const Icon = getResultIcon(result.type);
                      return (
                        <motion.div
                          key={result.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleResultClick(result)}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                            index === activeIndex 
                              ? 'bg-blue-50 border-l-4 border-blue-500' 
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {result.image ? (
                            <Image
                              src={result.image}
                              alt={result.title}
                              width={40}
                              height={40}
                              className="rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                              <Icon className="h-5 w-5 text-blue-600" />
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h5 className="font-medium text-gray-900 truncate">
                                {result.title}
                              </h5>
                              {result.trending && (
                                <Badge className="bg-red-100 text-red-600 text-xs px-1.5 py-0.5">
                                  <TrendingUp className="h-2.5 w-2.5 mr-1" />
                                  Trending
                                </Badge>
                              )}
                              {result.popular && (
                                <Badge className="bg-yellow-100 text-yellow-600 text-xs px-1.5 py-0.5">
                                  <Star className="h-2.5 w-2.5 mr-1" />
                                  Popular
                                </Badge>
                              )}
                            </div>
                            {result.description && (
                              <p className="text-sm text-gray-600 truncate">
                                {result.description}
                              </p>
                            )}
                            <div className="flex items-center gap-3 mt-1">
                              {result.price && (
                                <span className="text-sm font-semibold text-blue-600">
                                  K{result.price.toFixed(2)}
                                </span>
                              )}
                              {result.rating && (
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                  <span>{result.rating}</span>
                                </div>
                              )}
                              {result.category && (
                                <Badge variant="outline" className="text-xs">
                                  {result.category}
                                </Badge>
                              )}
                              {result.location && (
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <MapPin className="h-3 w-3" />
                                  <span>{result.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* No Results */}
                {query && filteredResults.length === 0 && (
                  <div className="p-8 text-center">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Search className="h-8 w-8 text-gray-400" />
                    </motion.div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      No results found
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Try searching for something else or browse our categories
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setQuery("")}
                      className="mx-auto"
                    >
                      Clear Search
                    </Button>
                  </div>
                )}

                {/* Recent Searches */}
                {!query && searchHistory.length > 0 && (
                  <div className="p-4 border-b border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <History className="h-4 w-4" />
                      Recent Searches
                    </h4>
                    <div className="space-y-1">
                      {searchHistory.slice(0, 4).map((search, index) => (
                        <motion.button
                          key={search}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleTrendingClick(search)}
                          className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{search}</span>
                          <ArrowUpRight className="h-3 w-3 text-gray-400 ml-auto" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending Searches */}
                {!query && (
                  <div className="p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Trending Searches
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.map((trending, index) => (
                        <motion.div
                          key={trending}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTrendingClick(trending)}
                            className="text-xs bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                          >
                            <TrendingUp className="h-3 w-3 mr-1 text-red-500" />
                            {trending}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
