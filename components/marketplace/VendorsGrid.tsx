"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  SlidersHorizontal,
  MapPin,
  Star,
  ArrowUpDown,
  X
} from "lucide-react";
import type { Vendor, MarketplaceFilters } from "@/lib/types";
import { VendorCard } from "./VendorCard";
import styles from "@/styles/marketplace.module.scss";

interface VendorsGridProps {
  vendors: Vendor[];
  onAddToCart?: (vendor: Vendor) => void;
  showFilters?: boolean;
  title?: string;
  description?: string;
}

export function VendorsGrid({ 
  vendors, 
  onAddToCart, 
  showFilters = true,
  title = "Marketplace Vendors",
  description = "Discover local businesses and services"
}: VendorsGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<MarketplaceFilters>({
    sortBy: 'rating'
  });

  // Extract unique categories and locations
  const { categories, locations } = useMemo(() => {
    const categorySet = new Set<string>();
    const locationSet = new Set<string>();
    
    vendors.forEach(vendor => {
      vendor.categories?.forEach(cat => categorySet.add(cat));
      if (vendor.location) locationSet.add(vendor.location);
    });
    
    return {
      categories: Array.from(categorySet).sort(),
      locations: Array.from(locationSet).sort()
    };
  }, [vendors]);

  // Filter and sort vendors
  const filteredVendors = useMemo(() => {
    let filtered = vendors.filter(vendor => {
      const matchesSearch = !searchQuery || 
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.categories?.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = !filters.category || 
        vendor.categories?.includes(filters.category);

      const matchesLocation = !filters.location || 
        vendor.location === filters.location;

      const matchesRating = !filters.rating || 
        (vendor.rating && vendor.rating >= filters.rating);

      const matchesVerified = filters.verified === undefined || 
        vendor.isVerified === filters.verified;

      return matchesSearch && matchesCategory && matchesLocation && matchesRating && matchesVerified;
    });

    // Sort vendors
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          return b.id.localeCompare(a.id); // Assuming ID correlates with creation time
        case 'price':
          // Extract numeric price for comparison
          const aPrice = parseFloat(a.pricePreview?.replace(/[^0-9.]/g, '') || '0');
          const bPrice = parseFloat(b.pricePreview?.replace(/[^0-9.]/g, '') || '0');
          return aPrice - bPrice;
        default:
          return 0;
      }
    });

    return filtered;
  }, [vendors, searchQuery, filters]);

  const toggleFavorite = (vendorId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(vendorId)) {
        newFavorites.delete(vendorId);
      } else {
        newFavorites.add(vendorId);
      }
      return newFavorites;
    });
  };

  const clearFilters = () => {
    setFilters({ sortBy: 'rating' });
    setSearchQuery("");
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== undefined && value !== 'rating'
  ).length + (searchQuery ? 1 : 0);

  return (
    <section aria-labelledby="vendors-heading" className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 id="vendors-heading" className="text-3xl font-bold text-slate-900">
          {title}
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      {/* Search and Controls */}
      {showFilters && (
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search vendors, products, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-base border-2 border-slate-200 focus:border-blue-400 rounded-xl bg-white"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className={`${styles.outlineButton} ${styles.focusable}`}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>

              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-slate-600 hover:text-slate-900"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear all
                </Button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  sortBy: e.target.value as MarketplaceFilters['sortBy']
                }))}
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="rating">Best Rating</option>
                <option value="name">Name A-Z</option>
                <option value="price">Price Low-High</option>
                <option value="newest">Newest</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-slate-200 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none border-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none border-none border-l border-slate-200"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilterPanel && (
            <div className={`${styles.card} p-6 space-y-4`}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category || ''}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      category: e.target.value || undefined 
                    }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Location
                  </label>
                  <select
                    value={filters.location || ''}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      location: e.target.value || undefined 
                    }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={filters.rating || ''}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      rating: e.target.value ? parseFloat(e.target.value) : undefined 
                    }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                    <option value="3">3+ Stars</option>
                  </select>
                </div>

                {/* Verified Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Verification
                  </label>
                  <select
                    value={filters.verified === true ? 'true' : filters.verified === false ? 'false' : ''}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      verified: e.target.value === 'true' ? true : e.target.value === 'false' ? false : undefined 
                    }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">All Vendors</option>
                    <option value="true">Verified Only</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-slate-600">
          Showing <span className="font-medium text-slate-900">{filteredVendors.length}</span> of{' '}
          <span className="font-medium text-slate-900">{vendors.length}</span> vendors
        </p>
        
        {searchQuery && (
          <p className="text-sm text-slate-500">
            Results for "{searchQuery}"
          </p>
        )}
      </div>

      {/* Vendors Grid */}
      {filteredVendors.length > 0 ? (
        <div className={`${styles.vendorsGrid} ${viewMode === 'list' ? 'grid-cols-1 lg:grid-cols-2' : ''}`}>
          {filteredVendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              onAddToCart={onAddToCart}
              onToggleFavorite={toggleFavorite}
              isFavorite={favorites.has(vendor.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
            <Search className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            No vendors found
          </h3>
          <p className="text-slate-600 mb-4">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <Button
            variant="outline"
            onClick={clearFilters}
            className={styles.outlineButton}
          >
            Clear filters
          </Button>
        </div>
      )}
    </section>
  );
}
