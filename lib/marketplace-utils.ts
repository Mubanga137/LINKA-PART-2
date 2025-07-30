// lib/marketplace-utils.ts
import type { Vendor, MarketplaceFilters } from "./types";

export const formatPrice = (price: string | number): string => {
  if (typeof price === 'number') {
    return `ZMW ${price.toFixed(2)}`;
  }
  return price;
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const getVendorBadgeVariant = (vendor: Vendor): string => {
  if (vendor.isFeatured) return 'featured';
  if (vendor.isVerified) return 'verified';
  return 'default';
};

export const filterVendors = (
  vendors: Vendor[], 
  filters: MarketplaceFilters, 
  searchQuery: string = ''
): Vendor[] => {
  return vendors.filter(vendor => {
    // Search filter
    const matchesSearch = !searchQuery || 
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.categories?.some(cat => 
        cat.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // Category filter
    const matchesCategory = !filters.category || 
      vendor.categories?.includes(filters.category);

    // Location filter
    const matchesLocation = !filters.location || 
      vendor.location === filters.location;

    // Rating filter
    const matchesRating = !filters.rating || 
      (vendor.rating && vendor.rating >= filters.rating);

    // Verified filter
    const matchesVerified = filters.verified === undefined || 
      vendor.isVerified === filters.verified;

    return matchesSearch && matchesCategory && matchesLocation && 
           matchesRating && matchesVerified;
  });
};

export const sortVendors = (
  vendors: Vendor[], 
  sortBy: MarketplaceFilters['sortBy'] = 'rating'
): Vendor[] => {
  const sorted = [...vendors];
  
  return sorted.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'newest':
        // Assuming ID correlates with creation time
        return b.id.localeCompare(a.id);
      case 'price':
        // Extract numeric price for comparison
        const aPrice = parseFloat(a.pricePreview?.replace(/[^0-9.]/g, '') || '0');
        const bPrice = parseFloat(b.pricePreview?.replace(/[^0-9.]/g, '') || '0');
        return aPrice - bPrice;
      default:
        return 0;
    }
  });
};

export const getUniqueCategories = (vendors: Vendor[]): string[] => {
  const categorySet = new Set<string>();
  vendors.forEach(vendor => {
    vendor.categories?.forEach(cat => categorySet.add(cat));
  });
  return Array.from(categorySet).sort();
};

export const getUniqueLocations = (vendors: Vendor[]): string[] => {
  const locationSet = new Set<string>();
  vendors.forEach(vendor => {
    if (vendor.location) locationSet.add(vendor.location);
  });
  return Array.from(locationSet).sort();
};

export const calculateMarketplaceStats = (vendors: Vendor[]) => {
  const totalVendors = vendors.length;
  const verifiedVendors = vendors.filter(v => v.isVerified).length;
  const featuredVendors = vendors.filter(v => v.isFeatured).length;
  const totalReviews = vendors.reduce((sum, vendor) => sum + (vendor.reviewCount || 0), 0);
  const averageRating = vendors.reduce((sum, vendor) => sum + (vendor.rating || 0), 0) / totalVendors;

  return {
    totalVendors,
    verifiedVendors,
    featuredVendors,
    totalReviews,
    averageRating: averageRating || 0,
    verificationRate: (verifiedVendors / totalVendors) * 100
  };
};

export const generateVendorSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const isVendorFavorite = (vendorId: string, favorites: string[]): boolean => {
  return favorites.includes(vendorId);
};

export const toggleVendorFavorite = (vendorId: string, favorites: string[]): string[] => {
  if (favorites.includes(vendorId)) {
    return favorites.filter(id => id !== vendorId);
  }
  return [...favorites, vendorId];
};

// Local storage utilities for marketplace
export const STORAGE_KEYS = {
  FAVORITES: 'marketplace_favorites',
  RECENT_SEARCHES: 'marketplace_recent_searches',
  CART: 'marketplace_cart',
  FILTERS: 'marketplace_filters'
} as const;

export const saveToLocalStorage = (key: string, data: any): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }
};

export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window !== 'undefined') {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn('Failed to load from localStorage:', error);
      return defaultValue;
    }
  }
  return defaultValue;
};

export const removeFromLocalStorage = (key: string): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  }
};

// Analytics utilities
export const trackVendorView = (vendor: Vendor): void => {
  // Track vendor page views for analytics
  console.log('Vendor viewed:', vendor.name);
  // Here you would integrate with your analytics service
};

export const trackAddToCart = (vendor: Vendor): void => {
  // Track add to cart events
  console.log('Added to cart:', vendor.name);
  // Here you would integrate with your analytics service
};

export const trackSearch = (query: string, resultsCount: number): void => {
  // Track search queries
  console.log('Search performed:', { query, resultsCount });
  // Here you would integrate with your analytics service
};

// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  // Zambian phone number validation
  const phoneRegex = /^(\+260|0)?[9|7][0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};
