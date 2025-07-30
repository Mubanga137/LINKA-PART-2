// lib/types.ts
export interface DashboardData {
  revenue: {
    growth: number;
  };
  campaigns?: {
    active: number;
    pending: number;
  };
  conversions?: {
    rate: number;
  };
}

export interface Vendor {
  id: string;
  name: string;
  tagline?: string;
  rating?: number; // 0-5
  reviewCount?: number;
  productImageUrl: string;
  vendorImageUrl?: string;
  pricePreview?: string; // e.g., "From $29.99"
  href: string; // storefront URL
  categories?: string[];
  location?: string;
  isVerified?: boolean;
  isFeatured?: boolean;
  discount?: string;
  deliveryTime?: string;
  products?: Product[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
  rating?: number;
}

export interface CartItem {
  vendorId: string;
  vendor: Vendor;
  quantity: number;
  addedAt: Date;
}

export interface MarketplaceFilters {
  category?: string;
  location?: string;
  priceRange?: [number, number];
  rating?: number;
  verified?: boolean;
  sortBy?: 'rating' | 'price' | 'name' | 'newest';
}
