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
  X
} from "lucide-react";
import { MarketplaceProvider, useCart, useFavorites } from "@/contexts/marketplace-context";
import { ShoppingCart } from "@/components/marketplace/ShoppingCart";
import { Wishlist } from "@/components/marketplace/Wishlist";
import { ProductDetailModal } from "@/components/marketplace/ProductDetailModal";
import { CategoryNavigation, HorizontalCategoryNav } from "@/components/marketplace/CategoryNavigation";
import type { Product, MarketplaceFilters, Category } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

// Mock data for demonstration
const mockCategories: Category[] = [
  { id: "1", name: "Electronics", slug: "electronics", icon: "📱", productCount: 124 },
  { id: "2", name: "Fashion", slug: "fashion", icon: "👕", productCount: 89 },
  { id: "3", name: "Home & Garden", slug: "home-garden", icon: "🏠", productCount: 156 },
  { id: "4", name: "Health & Beauty", slug: "health-beauty", icon: "💄", productCount: 78 },
  { id: "5", name: "Sports & Outdoors", slug: "sports", icon: "⚽", productCount: 95 },
  { id: "6", name: "Books & Media", slug: "books", icon: "📚", productCount: 67 }
];

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 129.99,
    originalPrice: 199.99,
    images: ["https://cdn.builder.io/o/assets%2F64659d81f7594bc7853ad37ab97b2333%2F0293e2bc38f5442f9fb9d22b6313cc75?alt=media&token=6bfbc5db-83f9-4d66-b752-2e5d6c5e566c&apiKey=64659d81f7594bc7853ad37ab97b2333"],
    category: "Electronics",
    inStock: true,
    stockQuantity: 45,
    rating: 4.5,
    reviewCount: 128,
    tags: ["wireless", "bluetooth", "headphones", "audio"],
    vendor: { id: "v1", name: "TechStore Zambia", logo: "" },
    featured: true,
    discountPercentage: 35,
    fastDelivery: true,
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    description: "Sustainable, comfortable cotton t-shirt made locally",
    price: 24.99,
    images: ["https://cdn.builder.io/o/assets%2F64659d81f7594bc7853ad37ab97b2333%2F9da134d1ff7b4622b152509a91eb6828?alt=media&token=c5acfe29-f649-4c39-8e4d-5048b7500592&apiKey=64659d81f7594bc7853ad37ab97b2333"],
    category: "Fashion",
    inStock: true,
    stockQuantity: 89,
    rating: 4.2,
    reviewCount: 76,
    tags: ["organic", "cotton", "sustainable", "apparel"],
    vendor: { id: "v2", name: "Zambian Textiles", logo: "" },
    freeShipping: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    name: "Handcrafted Wooden Bowl Set",
    description: "Beautiful set of handcrafted wooden bowls by local artisans",
    price: 89.99,
    originalPrice: 120.00,
    images: ["https://cdn.builder.io/o/assets%2F64659d81f7594bc7853ad37ab97b2333%2Ff3e433849be94dcea73b70b52bc48b6c?alt=media&token=ef1766f5-4412-4b9f-b1b2-8559fb9778aa&apiKey=64659d81f7594bc7853ad37ab97b2333"],
    category: "Home & Garden",
    inStock: true,
    stockQuantity: 12,
    rating: 4.8,
    reviewCount: 34,
    tags: ["handcrafted", "wooden", "artisan", "kitchen"],
    vendor: { id: "v3", name: "Artisan Crafts Zambia", logo: "" },
    featured: true,
    discountPercentage: 25,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "4",
    name: "Natural Shea Butter Skincare Set",
    description: "Premium skincare set made with natural Zambian shea butter",
    price: 45.99,
    images: ["https://cdn.builder.io/o/assets%2F64659d81f7594bc7853ad37ab97b2333%2F54526700f1374b9cb413282c2d312324?alt=media&token=d00b3f59-4e59-41a3-894a-13bf125ed2a6&apiKey=64659d81f7594bc7853ad37ab97b2333"],
    category: "Health & Beauty",
    inStock: true,
    stockQuantity: 67,
    rating: 4.6,
    reviewCount: 92,
    tags: ["natural", "shea butter", "skincare", "organic"],
    vendor: { id: "v4", name: "Natural Beauty Co", logo: "" },
    freeShipping: true,
    fastDelivery: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "5",
    name: "Professional Football",
    description: "High-quality leather football for professional play",
    price: 35.99,
    images: ["https://cdn.builder.io/o/assets%2F64659d81f7594bc7853ad37ab97b2333%2Fbb354ec6306c4643bf92c1fa35ed16bb?alt=media&token=acf7cf19-7f68-4aad-9eaa-27642a5fe9bc&apiKey=64659d81f7594bc7853ad37ab97b2333"],
    category: "Sports & Outdoors",
    inStock: true,
    stockQuantity: 28,
    rating: 4.4,
    reviewCount: 56,
    tags: ["football", "sports", "leather", "professional"],
    vendor: { id: "v5", name: "Sports Central", logo: "" },
    fastDelivery: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "6",
    name: "Local History Book Collection",
    description: "Comprehensive collection of Zambian history and culture books",
    price: 75.99,
    images: ["https://cdn.builder.io/o/assets%2F64659d81f7594bc7853ad37ab97b2333%2F26b41d9fdda04427b8b8a0db337acbef?alt=media&token=b4fb145b-9bff-4858-b555-1578c5be922c&apiKey=64659d81f7594bc7853ad37ab97b2333"],
    category: "Books & Media",
    inStock: true,
    stockQuantity: 15,
    rating: 4.9,
    reviewCount: 23,
    tags: ["books", "history", "culture", "education"],
    vendor: { id: "v6", name: "Knowledge Hub", logo: "" },
    featured: true,
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
      
      <main className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center space-y-6 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-green-100 px-6 py-3 text-sm border border-blue-200">
              <ShoppingBag className="mr-2 h-4 w-4 text-blue-600" />
              <span className="text-blue-800 font-medium">🛍️ Zambia's Premier E-commerce Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
              Shop Local,
              <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Support Zambian Businesses
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover amazing products from verified local vendors. From handmade crafts to modern electronics,
              find everything you need while supporting the Zambian economy.
            </p>
          </div>

          {/* Cart indicator */}
          {getCartItemCount() > 0 && (
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full border border-green-200">
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span className="font-medium">{getCartItemCount()} items in cart</span>
            </div>
          )}
        </section>

        {/* Search and Filters */}
        <section className="space-y-6 mb-8">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search products, brands, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant={!filters.category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilters(prev => ({ ...prev, category: undefined }))}
              className="rounded-full"
            >
              All Categories
            </Button>
            {mockCategories.map((category) => (
              <Button
                key={category.id}
                variant={filters.category === category.name ? "default" : "outline"}
                size="sm"
                onClick={() => setFilters(prev => ({ 
                  ...prev, 
                  category: filters.category === category.name ? undefined : category.name 
                }))}
                className="rounded-full"
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
                <Badge variant="secondary" className="ml-2 h-5 text-xs">
                  {category.productCount}
                </Badge>
              </Button>
            ))}
          </div>

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
                  <div className="space-y-6">
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

        {/* Products Grid */}
        <section className="space-y-6">
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }>
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* Product Image */}
                <div className={`relative ${
                  viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'
                } overflow-hidden rounded-t-lg bg-gradient-to-br from-gray-100 to-gray-200`}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.featured && (
                      <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                        <Zap className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    {product.discountPercentage && (
                      <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
                        -{product.discountPercentage}%
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-8 h-8 p-0 bg-white/90 hover:bg-white text-gray-700 rounded-full shadow-md"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          isFavorite(product.id) ? 'fill-red-500 text-red-500' : ''
                        }`}
                      />
                    </Button>
                  </div>

                  {/* Quick Info */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 border border-white/20 shadow-lg">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span>{product.rating?.toFixed(1)} ({product.reviewCount})</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {product.freeShipping && (
                            <div className="flex items-center text-green-600">
                              <Truck className="h-3 w-3 mr-1" />
                              <span className="text-xs">Free Ship</span>
                            </div>
                          )}
                          {product.fastDelivery && (
                            <div className="flex items-center text-blue-600">
                              <Clock className="h-3 w-3 mr-1" />
                              <span className="text-xs">Fast</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="space-y-3">
                    {/* Vendor */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center">
                        <Store className="h-3 w-3 text-blue-600" />
                      </div>
                      <span className="text-xs text-gray-600">{product.vendor.name}</span>
                    </div>

                    {/* Name and Description */}
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {product.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ZMW {product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ZMW {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        product.inStock ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <span className={`text-sm ${
                        product.inStock ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {product.inStock 
                          ? `${product.stockQuantity} in stock` 
                          : 'Out of stock'
                        }
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href={`/products/${product.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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
        <section className="mt-16 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600">Explore our wide range of product categories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
        <section className="mt-16 bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white relative overflow-hidden rounded-3xl p-8 md:p-12 text-center">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 space-y-6">
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
