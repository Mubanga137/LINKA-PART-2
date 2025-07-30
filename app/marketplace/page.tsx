"use client";

import { useState, useEffect, useMemo } from "react";
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
  Package
} from "lucide-react";
import { MarketplaceProvider, useCart, useFavorites } from "@/contexts/marketplace-context";
import { ProductDetailModal } from "@/components/marketplace/ProductDetailModal";
import { CategoryNavigation, HorizontalCategoryNav } from "@/components/marketplace/CategoryNavigation";
import { OptimizedProductCard } from "@/components/marketplace/OptimizedProductCard";
import type { Product, MarketplaceFilters, Category } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

// Mock data for demonstration
const mockCategories: Category[] = [
  { id: "1", name: "Electronics", slug: "electronics", icon: "📱", productCount: 18 },
  { id: "2", name: "Fashion", slug: "fashion", icon: "👕", productCount: 12 },
  { id: "3", name: "Home & Garden", slug: "home-garden", icon: "🏠", productCount: 15 },
  { id: "4", name: "Health & Beauty", slug: "health-beauty", icon: "💄", productCount: 8 },
  { id: "5", name: "Sports & Outdoors", slug: "sports", icon: "⚽", productCount: 6 },
  { id: "6", name: "Books & Media", slug: "books", icon: "📚", productCount: 4 }
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
    name: "Laptop Computer 15-inch",
    description: "Powerful laptop perfect for work, study, and entertainment",
    price: 799.99,
    originalPrice: 999.99,
    images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80"],
    category: "Electronics",
    inStock: true,
    stockQuantity: 12,
    rating: 4.7,
    reviewCount: 98,
    tags: ["laptop", "computer", "work", "study"],
    vendor: { id: "v4", name: "Computer World Zambia", logo: "" },
    discountPercentage: 20,
    fastDelivery: true,
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "6",
    name: "Wireless Earbuds Pro",
    description: "Premium wireless earbuds with active noise cancellation",
    price: 179.99,
    images: ["https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&q=80"],
    category: "Electronics",
    inStock: true,
    stockQuantity: 56,
    rating: 4.4,
    reviewCount: 167,
    tags: ["earbuds", "wireless", "audio", "noise-cancelling"],
    vendor: { id: "v2", name: "Audio Pro Zambia", logo: "" },
    fastDelivery: true,
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Fashion Category
  {
    id: "7",
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
    id: "8",
    name: "Men's Business Suit",
    description: "Professional tailored business suit perfect for office and formal events",
    price: 189.99,
    originalPrice: 249.99,
    images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80"],
    category: "Fashion",
    inStock: true,
    stockQuantity: 18,
    rating: 4.6,
    reviewCount: 124,
    tags: ["suit", "business", "formal", "mens"],
    vendor: { id: "v6", name: "Elegant Tailors Lusaka", logo: "" },
    discountPercentage: 24,
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "9",
    name: "Women's Casual Blouse",
    description: "Comfortable and stylish blouse perfect for everyday wear",
    price: 29.99,
    images: ["https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80"],
    category: "Fashion",
    inStock: true,
    stockQuantity: 45,
    rating: 4.3,
    reviewCount: 89,
    tags: ["blouse", "casual", "womens", "comfortable"],
    vendor: { id: "v7", name: "Fashion Forward Zambia", logo: "" },
    fastDelivery: true,
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "10",
    name: "Leather Shoes - Oxford Style",
    description: "Genuine leather Oxford shoes handcrafted by local artisans",
    price: 89.99,
    images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80"],
    category: "Fashion",
    inStock: true,
    stockQuantity: 34,
    rating: 4.7,
    reviewCount: 156,
    tags: ["shoes", "leather", "oxford", "formal"],
    vendor: { id: "v8", name: "Lusaka Leather Works", logo: "" },
    featured: true,
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Home & Garden Category
  {
    id: "11",
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
  {
    id: "12",
    name: "Ceramic Dinnerware Set",
    description: "Elegant ceramic dinnerware set perfect for family dining and entertaining",
    price: 79.99,
    originalPrice: 99.99,
    images: ["https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80"],
    category: "Home & Garden",
    inStock: true,
    stockQuantity: 27,
    rating: 4.5,
    reviewCount: 112,
    tags: ["dinnerware", "ceramic", "tableware", "kitchen"],
    vendor: { id: "v10", name: "Home Essentials Zambia", logo: "" },
    discountPercentage: 20,
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "13",
    name: "Garden Tool Set",
    description: "Complete gardening tool set for maintaining your home garden",
    price: 49.99,
    images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80"],
    category: "Home & Garden",
    inStock: true,
    stockQuantity: 41,
    rating: 4.4,
    reviewCount: 95,
    tags: ["garden", "tools", "gardening", "outdoor"],
    vendor: { id: "v11", name: "Green Thumb Zambia", logo: "" },
    fastDelivery: true,
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "14",
    name: "Decorative Wall Art",
    description: "Local artist-created wall art featuring Zambian landscapes and culture",
    price: 125.99,
    images: ["https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80"],
    category: "Home & Garden",
    inStock: true,
    stockQuantity: 8,
    rating: 4.9,
    reviewCount: 45,
    tags: ["art", "wall", "decoration", "zambian"],
    vendor: { id: "v12", name: "Zambian Artists Gallery", logo: "" },
    featured: true,
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Health & Beauty Category
  {
    id: "15",
    name: "Natural Soap Collection",
    description: "Handmade natural soaps with indigenous ingredients and essential oils",
    price: 24.99,
    images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80"],
    category: "Health & Beauty",
    inStock: true,
    stockQuantity: 67,
    rating: 4.6,
    reviewCount: 134,
    tags: ["soap", "natural", "handmade", "skincare"],
    vendor: { id: "v13", name: "Natural Beauty Zambia", logo: "" },
    fastDelivery: true,
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "16",
    name: "Herbal Tea Blend",
    description: "Traditional Zambian herbal tea blend for wellness and relaxation",
    price: 18.99,
    images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
    category: "Health & Beauty",
    inStock: true,
    stockQuantity: 89,
    rating: 4.7,
    reviewCount: 76,
    tags: ["tea", "herbal", "wellness", "traditional"],
    vendor: { id: "v14", name: "Wellness Herbs Zambia", logo: "" },
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "17",
    name: "Organic Face Cream",
    description: "Premium organic face cream with natural moisturizing properties",
    price: 39.99,
    originalPrice: 49.99,
    images: ["https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80"],
    category: "Health & Beauty",
    inStock: true,
    stockQuantity: 45,
    rating: 4.8,
    reviewCount: 98,
    tags: ["skincare", "organic", "moisturizer", "beauty"],
    vendor: { id: "v13", name: "Natural Beauty Zambia", logo: "" },
    discountPercentage: 20,
    featured: true,
    fastDelivery: true,
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Sports & Outdoors Category
  {
    id: "18",
    name: "Hiking Backpack 40L",
    description: "Durable hiking backpack perfect for outdoor adventures and camping",
    price: 89.99,
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"],
    category: "Sports & Outdoors",
    inStock: true,
    stockQuantity: 23,
    rating: 4.5,
    reviewCount: 67,
    tags: ["backpack", "hiking", "outdoor", "camping"],
    vendor: { id: "v15", name: "Adventure Gear Zambia", logo: "" },
    fastDelivery: true,
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "19",
    name: "Football Jersey - Zambia National Team",
    description: "Official replica jersey of the Zambia national football team",
    price: 35.99,
    images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80"],
    category: "Sports & Outdoors",
    inStock: true,
    stockQuantity: 78,
    rating: 4.7,
    reviewCount: 189,
    tags: ["football", "jersey", "zambia", "sports"],
    vendor: { id: "v16", name: "Sports Fan Zone", logo: "" },
    featured: true,
    fastDelivery: true,
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "20",
    name: "Fitness Equipment Set",
    description: "Complete home fitness equipment set for strength training and cardio",
    price: 159.99,
    originalPrice: 199.99,
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"],
    category: "Sports & Outdoors",
    inStock: true,
    stockQuantity: 15,
    rating: 4.6,
    reviewCount: 93,
    tags: ["fitness", "equipment", "home", "exercise"],
    vendor: { id: "v17", name: "Fit Life Zambia", logo: "" },
    discountPercentage: 20,
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Books & Media Category
  {
    id: "21",
    name: "Zambian Literature Collection",
    description: "Comprehensive collection of contemporary Zambian literature and poetry",
    price: 45.99,
    images: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80"],
    category: "Books & Media",
    inStock: true,
    stockQuantity: 34,
    rating: 4.9,
    reviewCount: 67,
    tags: ["books", "literature", "zambian", "poetry"],
    vendor: { id: "v18", name: "Zambian Writers Hub", logo: "" },
    featured: true,
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "22",
    name: "Educational Children's Books",
    description: "Set of educational children's books featuring African stories and culture",
    price: 29.99,
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"],
    category: "Books & Media",
    inStock: true,
    stockQuantity: 56,
    rating: 4.8,
    reviewCount: 124,
    tags: ["children", "education", "books", "african"],
    vendor: { id: "v19", name: "Little Readers Zambia", logo: "" },
    fastDelivery: true,
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

function MarketplaceContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<MarketplaceFilters>({
    sortBy: 'relevance'
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const { cart, addToCart, getCartItemCount } = useCart();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // Filter and sort products
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <main className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Enhanced Hero Section */}
        <section className="text-center space-y-4 sm:space-y-6 lg:space-y-8 mb-8 sm:mb-12 lg:mb-16">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-50 to-green-50 px-6 py-3 text-sm border border-blue-200/50 shadow-sm backdrop-blur-sm animate-fade-in">
              <ShoppingBag className="mr-2 h-4 w-4 text-blue-600" />
              <span className="text-blue-800 font-medium">🛍️ Zambia's Premier E-commerce Platform</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight animate-slide-up">
              Shop Local,
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent animate-gradient">
                Support Zambian Businesses
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed animate-fade-in-delay">
              Discover amazing products from verified local vendors. From handmade crafts to modern electronics,
              find everything you need while supporting the Zambian economy.
            </p>
          </div>


        </section>

        {/* Search and Filters */}
        <section className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
          {/* Enhanced Search Bar */}
          <div className="relative max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
              <Input
                type="text"
                placeholder="Search products, brands, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:ring-0 bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl focus:shadow-xl"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>

          {/* Category Navigation */}
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

          {/* Filter and Sort Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
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
                        <div key={key} className="flex items-center space-x-2">
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
                        </div>
                      ))}
                    </div>

                    {/* Clear Filters */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFilters({ sortBy: 'relevance' })}
                      className="w-full"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    sortBy: e.target.value as MarketplaceFilters['sortBy'] 
                  }))}
                  className="text-sm border rounded-lg px-3 py-1 bg-white"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="discount">Best Deals</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">View:</span>
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {mockProducts.length} products
              {searchQuery && <span> for "{searchQuery}"</span>}
            </p>
          </div>
        </section>

        {/* Optimized Products Grid */}
        <section className="space-y-6 sm:space-y-8">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product, index) => (
                <OptimizedProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={isFavorite(product.id)}
                  priority={index < 4} // LCP optimization for first 4 products
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-blue-200 flex flex-col sm:flex-row"
                >
                  <div className="aspect-square sm:w-48 sm:flex-shrink-0 overflow-hidden bg-gray-100">
                    <Image
                      src={product.images[0]}
                      alt={`${product.name} - ${product.description}`}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
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
                      <Button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 sm:px-6 rounded-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50 tap-target focus-visible-enhanced flex-1"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        className="border-gray-300 text-gray-600 hover:bg-gray-50 py-2.5 px-4 sm:px-6 rounded-lg transition-all duration-200 tap-target focus-visible-enhanced flex-1"
                        asChild
                      >
                        <Link href={`/products/${product.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search terms
              </p>
              <Button onClick={() => {
                setSearchQuery("");
                setFilters({ sortBy: 'relevance' });
              }}>
                Clear All Filters
              </Button>
            </div>
          )}
        </section>

        {/* Featured Categories */}
        <section className="mt-8 sm:mt-12 lg:mt-16 space-y-6 sm:space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600">Explore our wide range of product categories</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {mockCategories.map((category) => (
              <Card
                key={category.id}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => setFilters(prev => ({ ...prev, category: category.name }))}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.productCount} items</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-8 sm:mt-12 lg:mt-16 bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 space-y-4 sm:space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Join Our Marketplace
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Start selling your products to thousands of customers across Zambia. 
              Join our growing community of successful entrepreneurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl"
                asChild
              >
                <Link href="/become-retailer">Become a Seller</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold px-8 py-4 rounded-xl"
                asChild
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <MarketplaceProvider>
      <MarketplaceContent />
    </MarketplaceProvider>
  );
}
