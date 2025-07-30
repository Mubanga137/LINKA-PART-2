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
import { ShoppingCart as ShoppingCartComponent } from "@/components/marketplace/ShoppingCart";
import { Wishlist } from "@/components/marketplace/Wishlist";
import { ProductDetailModal } from "@/components/marketplace/ProductDetailModal";
import { CategoryNavigation, HorizontalCategoryNav } from "@/components/marketplace/CategoryNavigation";
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
    images: ["https://cdn.builder.io/api/v1/image/assets%2F64659d81f7594bc7853ad37ab97b2333%2Fa9c377c2cdc54e7092356c307bf7eb05?format=webp&width=800"],
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
    images: ["https://cdn.builder.io/api/v1/image/assets%2F64659d81f7594bc7853ad37ab97b2333%2Fa35923a331f74e45a3fb698b57b311bf?format=webp&width=800"],
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
    images: ["https://cdn.builder.io/api/v1/image/assets%2F64659d81f7594bc7853ad37ab97b2333%2F446d5cc72e28434a84adb3fc2ae1765d?format=webp&width=800"],
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
    images: ["https://cdn.builder.io/api/v1/image/assets%2F64659d81f7594bc7853ad37ab97b2333%2F781161047542425d834cd9572f5323bb?format=webp&width=800"],
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
    images: ["https://cdn.builder.io/api/v1/image/assets%2F64659d81f7594bc7853ad37ab97b2333%2F158ea7b2f727420280af035a86e56edc?format=webp&width=800"],
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
    images: ["https://cdn.builder.io/api/v1/image/assets%2F64659d81f7594bc7853ad37ab97b2333%2Fa9c377c2cdc54e7092356c307bf7eb05?format=webp&width=800"],
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
    images: ["https://cdn.builder.io/api/v1/image/assets%2F64659d81f7594bc7853ad37ab97b2333%2Fa35923a331f74e45a3fb698b57b311bf?format=webp&width=800"],
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
    images: ["https://cdn.builder.io/api/v1/image/assets%2F64659d81f7594bc7853ad37ab97b2333%2F446d5cc72e28434a84adb3fc2ae1765d?format=webp&width=800"],
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
    images: ["https://cdn.builder.io/o/assets%2F64659d81f7594bc7853ad37ab97b2333%2Fac44f54a90274f918483238500b918f2?alt=media&token=6fe6b301-97d3-456e-b6af-75582a63a90e&apiKey=64659d81f7594bc7853ad37ab97b2333"],
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
    images: ["https://cdn.builder.io/o/assets%2F64659d81f7594bc7853ad37ab97b2333%2Fe1e698232a5c474ca0c61b0398cdb4db?alt=media&token=46db7b55-ffad-47e2-81ce-5b98880f3a5c&apiKey=64659d81f7594bc7853ad37ab97b2333"],
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
    images: ["https://cdn.builder.io/o/assets%2F64659d81f7594bc7853ad37ab97b2333%2Fc90c2e13d82845a881ac1db6b21fc32b?alt=media&token=2c2b6fb0-d81b-4e34-84a7-5422ebfa3ebf&apiKey=64659d81f7594bc7853ad37ab97b2333"],
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
    images: ["https://cdn.builder.io/o/assets%2F64659d81f7594bc7853ad37ab97b2333%2F0e98262ccb33432eb0b8a8878b35edd2?alt=media&token=034bc932-45c5-4558-aece-427b3a175aa6&apiKey=64659d81f7594bc7853ad37ab97b2333"],
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
    images: ["https://cdn.builder.io/o/assets%2F64659d81f7594bc7853ad37ab97b2333%2F4eb62a99a3074e92868ffb78277850ac?alt=media&token=4c3488ff-545f-4bd3-bed1-3039c4b54871&apiKey=64659d81f7594bc7853ad37ab97b2333"],
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
    images: ["https://cdn.builder.io/o/assets%2F64659d81f7594bc7853ad37ab97b2333%2F89953559294543fdaee0ab2a147e4b1e?alt=media&token=09bd9151-4bff-484d-b4c4-3abf61826e7e&apiKey=64659d81f7594bc7853ad37ab97b2333"],
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
    images: ["https://cdn.builder.io/o/assets%2F64659d81f7594bc7853ad37ab97b2333%2F049c0033df1c48acb369ffae87d15775?alt=media&token=1bc58182-9c29-43e8-be7a-38e46ea751e4&apiKey=64659d81f7594bc7853ad37ab97b2333"],
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
    images: ["https://cdn.builder.io/o/assets%2F64659d81f7594bc7853ad37ab97b2333%2Fb784002cbc844076b0d47df8625f4847?alt=media&token=3c0d8f1c-6c84-4bfc-ac82-d54775039dfa&apiKey=64659d81f7594bc7853ad37ab97b2333"],
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
    images: ["https://cdn.builder.io/o/assets%2F64659d81f7594bc7853ad37ab97b2333%2Fe4e2aad98ecf40fca81d09b2b9cc93fe?alt=media&token=65b86073-86b2-4ee9-8c4f-37006894478e&apiKey=64659d81f7594bc7853ad37ab97b2333"],
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
    images: ["https://cdn.builder.io/o/assets%2F64659d81f7594bc7853ad37ab97b2333%2Fb172e19abe1c40e585b941cf297b4fde?alt=media&token=e68e3074-d6f1-4229-890e-3ffd0c582ad7&apiKey=64659d81f7594bc7853ad37ab97b2333"],
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
    images: ["https://cdn.builder.io/o/assets%2F64659d81f7594bc7853ad37ab97b2333%2F05ee6542728f4760935c8cd0a4fb431c?alt=media&token=37af48c2-fc5d-4d51-8919-14a3100d0268&apiKey=64659d81f7594bc7853ad37ab97b2333"],
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
    images: ["https://cdn.builder.io/o/assets%2F64659d81f7594bc7853ad37ab97b2333%2F55886598611245e8b46eb5f66c6ba09f?alt=media&token=dbd4bc40-71ed-4287-b2ad-c00434140e53&apiKey=64659d81f7594bc7853ad37ab97b2333"],
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
    images: ["https://cdn.builder.io/o/assets%2F64659d81f7594bc7853ad37ab97b2333%2Fc8697749d1ff404493568a1d916a0c83?alt=media&token=fd6aecf7-7b7a-471c-be47-9fc55e7975ac&apiKey=64659d81f7594bc7853ad37ab97b2333"],
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
    images: ["https://cdn.builder.io/o/assets%2F64659d81f7594bc7853ad37ab97b2333%2F61a3c162d2b04eac8628af7322e53d96?alt=media&token=03ced4dc-3199-4870-a75c-4c5d02250393&apiKey=64659d81f7594bc7853ad37ab97b2333"],
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
      
      <main className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Hero Section */}
        <section className="text-center space-y-8 mb-16">
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

          {/* Cart and Wishlist indicators */}
          <div className="flex justify-center gap-4">
            <ShoppingCartComponent>
              <Button variant="outline" className="px-6 py-3 text-sm">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Cart ({getCartItemCount()})
              </Button>
            </ShoppingCartComponent>

            <Wishlist products={mockProducts}>
              <Button variant="outline" className="px-6 py-3 text-sm">
                <Heart className="mr-2 h-4 w-4" />
                Wishlist ({favorites.length})
              </Button>
            </Wishlist>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="space-y-6 mb-8">
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
              <div
                key={product.id}
                className={`group bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-blue-200 ${
                  viewMode === 'list' ? 'flex' : 'flex flex-col'
                }`}
              >
                {/* Product Image */}
                <div className={`relative ${
                  viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'
                } overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100`}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Top Badges Row */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                    <div className="flex flex-col gap-1.5">
                      {product.freeShipping && (
                        <div className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                          <Truck className="h-3 w-3" />
                          Free Shipping
                        </div>
                      )}
                      {product.featured && (
                        <div className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                          <Zap className="h-3 w-3" />
                          Top Rated
                        </div>
                      )}
                      {product.discountPercentage && (
                        <div className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
                          -{product.discountPercentage}%
                        </div>
                      )}
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-8 h-8 p-0 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-600 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart
                        className={`h-4 w-4 transition-colors ${
                          isFavorite(product.id) ? 'fill-red-500 text-red-500' : 'hover:text-red-400'
                        }`}
                      />
                    </Button>
                  </div>
                </div>

                {/* Product Content */}
                <div className={`p-4 flex-1 flex flex-col ${viewMode === 'list' ? 'justify-between' : ''}`}>
                  {/* Vendor Info Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {product.vendor.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-900">{product.vendor.name}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="h-3 w-3" />
                          <span>Lusaka</span>
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-700">{product.rating?.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Product Name */}
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-snug">
                    {product.name}
                  </h3>

                  {/* Price Section */}
                  <div className="mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        K{product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          K{product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {product.originalPrice && (
                      <p className="text-xs text-green-600 font-medium mt-0.5">
                        You save K{(product.originalPrice - product.price).toFixed(2)}
                      </p>
                    )}
                  </div>

                  {/* Product Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto space-y-2">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>

                    <ProductDetailModal product={product}>
                      <Button
                        variant="outline"
                        className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 py-2.5 rounded-lg transition-all duration-200"
                      >
                        <Package className="h-4 w-4 mr-2" />
                        View Products
                      </Button>
                    </ProductDetailModal>
                  </div>
                </div>
              </div>
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
