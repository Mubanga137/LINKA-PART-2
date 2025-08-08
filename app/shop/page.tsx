"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SideNavigation } from "@/components/ui/side-navigation";
import { MinimalHeader } from "@/components/ui/minimal-header";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  SlidersHorizontal,
  ArrowUpDown,
  Smartphone,
  Shirt,
  Home,
  Headphones,
  Dumbbell,
  Book,
  Gem,
  UtensilsCrossed,
  Palette,
  ChevronDown,
  MapPin,
  Verified
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  vendor: {
    name: string;
    verified: boolean;
    location: string;
  };
  rating: number;
  reviewCount: number;
  soldCount: number;
  category: string;
  tags: string[];
  inStock: boolean;
  featured?: boolean;
  freeShipping?: boolean;
}

const categories = [
  { id: "electronics", name: "Electronics", icon: Smartphone, color: "from-blue-500 to-indigo-600", count: 1248 },
  { id: "fashion", name: "Fashion", icon: Shirt, color: "from-pink-500 to-rose-600", count: 892 },
  { id: "home", name: "Home & Garden", icon: Home, color: "from-green-500 to-emerald-600", count: 567 },
  { id: "audio", name: "Audio & Music", icon: Headphones, color: "from-purple-500 to-violet-600", count: 334 },
  { id: "sports", name: "Sports & Fitness", icon: Dumbbell, color: "from-orange-500 to-amber-600", count: 423 },
  { id: "books", name: "Books & Media", icon: Book, color: "from-teal-500 to-cyan-600", count: 198 },
  { id: "jewelry", name: "Jewelry", icon: Gem, color: "from-yellow-500 to-orange-600", count: 156 },
  { id: "food", name: "Food & Beverages", icon: UtensilsCrossed, color: "from-red-500 to-pink-600", count: 445 },
  { id: "crafts", name: "Traditional Crafts", icon: Palette, color: "from-indigo-500 to-purple-600", count: 267 }
];

const products: Product[] = [
  {
    id: "p1",
    name: "Premium Bluetooth Speaker",
    description: "High-quality wireless speaker with deep bass and crystal clear sound",
    price: 79.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
    vendor: { name: "Audio Excellence", verified: true, location: "Lusaka, Zambia" },
    rating: 4.8,
    reviewCount: 145,
    soldCount: 89,
    category: "Electronics",
    tags: ["bluetooth", "speaker", "wireless"],
    inStock: true,
    featured: true,
    freeShipping: true
  },
  {
    id: "p2",
    name: "Traditional Chitenge Fabric",
    description: "Authentic Zambian chitenge fabric with beautiful traditional patterns",
    price: 25.99,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80",
    vendor: { name: "Heritage Textiles", verified: true, location: "Ndola, Zambia" },
    rating: 4.9,
    reviewCount: 203,
    soldCount: 156,
    category: "Fashion",
    tags: ["chitenge", "traditional", "fabric"],
    inStock: true,
    freeShipping: false
  },
  {
    id: "p3",
    name: "Smart Fitness Tracker",
    description: "Advanced fitness tracker with heart rate monitoring and GPS",
    price: 159.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600&q=80",
    vendor: { name: "TechGear Plus", verified: true, location: "Kitwe, Zambia" },
    rating: 4.6,
    reviewCount: 189,
    soldCount: 98,
    category: "Electronics",
    tags: ["fitness", "smartwatch", "health"],
    inStock: true,
    featured: true,
    freeShipping: true
  },
  {
    id: "p4",
    name: "Handcrafted Wooden Bowl Set",
    description: "Beautiful set of wooden bowls handcrafted by local artisans",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
    vendor: { name: "Craft Collective ZM", verified: true, location: "Livingstone, Zambia" },
    rating: 4.7,
    reviewCount: 67,
    soldCount: 34,
    category: "Home & Garden",
    tags: ["handmade", "wooden", "kitchen"],
    inStock: true,
    freeShipping: false
  },
  {
    id: "p5",
    name: "Premium Coffee Beans",
    description: "Freshly roasted Zambian coffee beans with rich, bold flavor",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80",
    vendor: { name: "Zambian Coffee Co.", verified: true, location: "Lusaka, Zambia" },
    rating: 4.9,
    reviewCount: 298,
    soldCount: 445,
    category: "Food & Beverages",
    tags: ["coffee", "organic", "zambian"],
    inStock: true,
    featured: true,
    freeShipping: true
  },
  {
    id: "p6",
    name: "Wireless Gaming Mouse",
    description: "High-precision gaming mouse with RGB lighting and programmable buttons",
    price: 39.99,
    originalPrice: 69.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
    vendor: { name: "Gaming World ZM", verified: true, location: "Lusaka, Zambia" },
    rating: 4.5,
    reviewCount: 123,
    soldCount: 78,
    category: "Electronics",
    tags: ["gaming", "mouse", "rgb"],
    inStock: true,
    freeShipping: false
  }
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.soldCount - a.soldCount;
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Side Navigation */}
      <SideNavigation variant="marketplace" />
      
      {/* Main Content Area */}
      <div className="md:ml-[72px] transition-all duration-300">
        <MinimalHeader variant="marketplace" showSearch={false} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Shop All Products</h1>
            <p className="text-lg text-slate-600">
              Discover amazing products from verified local vendors across Zambia
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search products, brands, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg rounded-xl border-2 border-slate-200 focus:border-blue-400"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>

              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-slate-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              <div className="flex border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none border-0"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none border-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <div className="ml-auto text-sm text-slate-600">
                {sortedProducts.length} products found
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Categories */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Categories</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        !selectedCategory ? 'bg-blue-100 text-blue-700' : 'hover:bg-slate-100'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                          selectedCategory === category.name ? 'bg-blue-100 text-blue-700' : 'hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <category.icon className="h-4 w-4" />
                          <span className="text-sm">{category.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {category.count}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
              }`}>
                {sortedProducts.map((product) => (
                  <Card key={product.id} className={`group overflow-hidden hover:shadow-lg transition-all duration-300 ${
                    viewMode === 'list' ? 'flex flex-row' : ''
                  }`}>
                    <div className={`relative ${
                      viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'
                    }`}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.featured && (
                          <Badge className="bg-yellow-500 text-white">Featured</Badge>
                        )}
                        {product.freeShipping && (
                          <Badge className="bg-green-500 text-white">Free Shipping</Badge>
                        )}
                        {product.originalPrice && (
                          <Badge className="bg-red-500 text-white">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </Badge>
                        )}
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur p-2">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      {/* Vendor */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-slate-600">{product.vendor.name}</span>
                        {product.vendor.verified && (
                          <Verified className="h-3 w-3 text-blue-500" />
                        )}
                        <div className="flex items-center gap-1 ml-auto">
                          <MapPin className="h-3 w-3 text-slate-400" />
                          <span className="text-xs text-slate-400">{product.vendor.location}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl font-bold text-slate-900">
                          K{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-slate-400 line-through">
                            K{product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Rating & Stats */}
                      <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{product.rating}</span>
                          <span>({product.reviewCount})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{product.soldCount} sold</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Link href={`/products/${product.id}`}>
                          <Button variant="outline" size="sm" className="px-3">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              {sortedProducts.length > 0 && (
                <div className="text-center mt-12">
                  <Button size="lg" variant="outline">
                    Load More Products
                  </Button>
                </div>
              )}

              {/* Empty State */}
              {sortedProducts.length === 0 && (
                <div className="text-center py-12">
                  <Search className="h-16 w-16 mx-auto mb-4 text-slate-400" />
                  <h3 className="text-xl font-semibold text-slate-600 mb-2">
                    No products found
                  </h3>
                  <p className="text-slate-500">
                    Try adjusting your search or filters to find what you're looking for
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
