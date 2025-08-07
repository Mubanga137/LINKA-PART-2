"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveProductCard } from "./InteractiveProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  ChevronUp,
  ArrowUpDown,
  X,
  SlidersHorizontal
} from "lucide-react";
import type { Product } from "@/lib/types";

interface ResponsiveProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  onViewProduct?: (productId: string) => void;
  favorites: Set<string>;
  isLoading?: boolean;
  searchable?: boolean;
  filterable?: boolean;
  className?: string;
}

type ViewMode = 'grid' | 'list';
type SortOption = 'relevance' | 'price-low' | 'price-high' | 'rating' | 'newest';

const sortOptions = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' }
];

export function ResponsiveProductGrid({
  products,
  onAddToCart,
  onToggleFavorite,
  onViewProduct,
  favorites,
  isLoading = false,
  searchable = true,
  filterable = true,
  className = ""
}: ResponsiveProductGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const gridRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Responsive grid configuration following 8pt grid system
  const getGridClasses = () => {
    if (viewMode === 'list') {
      return "grid grid-cols-1 gap-4";
    }
    
    // 8pt grid system: base unit = 8px
    // Mobile: 2 columns, 16px gaps (2 * 8pt)
    // Tablet: 3 columns, 24px gaps (3 * 8pt)  
    // Desktop: 4 columns, 32px gaps (4 * 8pt)
    // Large: 5 columns, 32px gaps
    return `
      grid gap-4 
      grid-cols-2 
      sm:grid-cols-2 sm:gap-6
      md:grid-cols-3 md:gap-6 
      lg:grid-cols-4 lg:gap-8
      xl:grid-cols-5 xl:gap-8
      2xl:grid-cols-6 2xl:gap-8
    `;
  };

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.vendor.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(product.category);
    
    return matchesSearch && matchesPrice && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'newest':
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      default:
        return 0; // relevance
    }
  });

  // Get unique categories for filter
  const categories = Array.from(new Set(products.map(p => p.category)));

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === '/') {
      e.preventDefault();
      searchInputRef.current?.focus();
    } else if (e.key === 'Escape') {
      setShowFilters(false);
      setSearchQuery("");
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Auto-focus search on mobile when filters open
  useEffect(() => {
    if (showFilters && searchInputRef.current) {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        searchInputRef.current.focus();
      }
    }
  }, [showFilters]);

  // Loading skeleton
  const renderSkeleton = () => (
    <div className={getGridClasses()}>
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="bg-gray-200 rounded-2xl overflow-hidden"
          animate={{
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1
          }}
        >
          <div className="aspect-square bg-gray-300" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-300 rounded" />
            <div className="h-3 bg-gray-300 rounded w-2/3" />
            <div className="h-6 bg-gray-300 rounded w-1/3" />
          </div>
        </motion.div>
      ))}
    </div>
  );

  // Grid animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Header with Search and Controls */}
      {(searchable || filterable) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6 space-y-4"
        >
          {/* Search and Filter Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            {searchable && (
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products, vendors, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  aria-label="Search products"
                />
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </motion.button>
                )}
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Filter Button */}
              {filterable && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`h-12 px-4 rounded-xl ${
                    showFilters ? 'bg-blue-50 border-blue-300 text-blue-600' : ''
                  }`}
                  aria-label="Toggle filters"
                  aria-expanded={showFilters}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Filters</span>
                </Button>
              )}

              {/* View Mode Toggle */}
              <div className="hidden md:flex items-center border border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                  aria-label="Grid view"
                  aria-pressed={viewMode === 'grid'}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-colors ${
                    viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                  aria-label="List view"
                  aria-pressed={viewMode === 'list'}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="h-12 px-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white text-sm"
                aria-label="Sort products"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t pt-4 space-y-4"
              >
                {/* Categories */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategories(prev => 
                            prev.includes(category)
                              ? prev.filter(c => c !== category)
                              : [...prev, category]
                          );
                        }}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          selectedCategories.includes(category)
                            ? 'bg-blue-100 text-blue-700 border border-blue-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        aria-pressed={selectedCategories.includes(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Price Range: K{priceRange[0]} - K{priceRange[1]}
                  </h4>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="flex-1"
                      aria-label="Minimum price"
                    />
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="flex-1"
                      aria-label="Maximum price"
                    />
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 1000]);
                    setSearchQuery("");
                  }}
                  className="text-sm"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Results Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between text-sm text-gray-600 px-1"
      >
        <span>
          {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''} found
          {searchQuery && ` for "${searchQuery}"`}
        </span>
        
        {sortedProducts.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              gridRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-blue-600 hover:text-blue-700"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-4 w-4 mr-1" />
            Back to top
          </Button>
        )}
      </motion.div>

      {/* Product Grid */}
      <div ref={gridRef} className="min-h-[400px]">
        {isLoading ? (
          renderSkeleton()
        ) : sortedProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 px-4"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategories([]);
                setPriceRange([0, 1000]);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Clear all filters
            </Button>
          </motion.div>
        ) : (
          <motion.div
            className={getGridClasses()}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="popLayout">
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  layout
                  className="h-fit"
                >
                  <InteractiveProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                    onToggleFavorite={onToggleFavorite}
                    onViewProduct={onViewProduct}
                    isFavorite={favorites.has(product.id)}
                    index={index}
                    priority={index < 6}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Accessibility Info */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {sortedProducts.length} products displayed. 
        Use Tab to navigate between products, 
        press Enter to expand details, 
        or press / to search.
      </div>
    </div>
  );
}
