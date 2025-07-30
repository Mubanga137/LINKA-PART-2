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
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  inStock: boolean;
  stockQuantity?: number;
  rating?: number;
  reviewCount?: number;
  tags: string[];
  vendor: {
    id: string;
    name: string;
    logo?: string;
  };
  specifications?: Record<string, string>;
  variants?: ProductVariant[];
  featured?: boolean;
  discountPercentage?: number;
  fastDelivery?: boolean;
  freeShipping?: boolean;
  hotDeal?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  attributes: Record<string, string>; // e.g., { color: 'red', size: 'M' }
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  variantId?: string;
  variant?: ProductVariant;
  quantity: number;
  addedAt: Date;
  userId?: string;
}

export interface MarketplaceFilters {
  category?: string;
  subcategory?: string;
  location?: string;
  priceRange?: [number, number];
  rating?: number;
  verified?: boolean;
  inStock?: boolean;
  freeShipping?: boolean;
  fastDelivery?: boolean;
  featured?: boolean;
  tags?: string[];
  vendorId?: string;
  sortBy?: 'relevance' | 'price_low' | 'price_high' | 'rating' | 'name' | 'newest' | 'discount';
  searchQuery?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  subcategories?: Subcategory[];
  productCount?: number;
  featured?: boolean;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount?: number;
}

export interface SearchSuggestion {
  id: string;
  text: string;
  type: 'product' | 'category' | 'vendor' | 'tag';
  count?: number;
}
