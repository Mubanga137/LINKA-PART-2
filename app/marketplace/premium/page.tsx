"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  ShoppingCart,
  Heart,
  Crown,
  Award,
  Diamond,
  Shield,
  Truck,
  RefreshCw,
  Gift,
  Eye,
  Share2,
  ExternalLink,
  Grid3X3,
  List,
  CheckCircle,
  Verified,
  Sparkles,
  Medal
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PremiumProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  vendor: {
    id: string;
    name: string;
    logo: string;
    verified: boolean;
    premiumSeller: boolean;
  };
  rating: number;
  reviewCount: number;
  premiumFeatures: string[];
  luxuryRating: number;
  handcrafted?: boolean;
  limitedEdition?: boolean;
  exclusiveDesign?: boolean;
  premiumMaterials?: string[];
  certifications?: string[];
  warranty: string;
  views: number;
  soldCount: number;
  tags: string[];
}

const premiumProducts: PremiumProduct[] = [
  {
    id: "p1",
    name: "Handcrafted Malachite Jewelry Collection",
    description: "Exquisite handcrafted jewelry featuring authentic Zambian malachite stones, showcasing the rich green beauty of Zambia's national gemstone",
    price: 299.99,
    originalPrice: 449.99,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80"
    ],
    category: "Jewelry & Accessories",
    vendor: {
      id: "v1",
      name: "Zambian Gemstone Artisans",
      logo: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&q=80",
      verified: true,
      premiumSeller: true
    },
    rating: 4.9,
    reviewCount: 156,
    premiumFeatures: ["Authentic Malachite", "Handcrafted Design", "Limited Edition", "Certificate of Authenticity"],
    luxuryRating: 5,
    handcrafted: true,
    limitedEdition: true,
    exclusiveDesign: true,
    premiumMaterials: ["Zambian Malachite", "Sterling Silver", "18k Gold Plating"],
    certifications: ["Authentic Gemstone Certificate", "Artisan Crafted"],
    warranty: "Lifetime Craftsmanship Guarantee",
    views: 4230,
    soldCount: 67,
    tags: ["luxury", "handmade", "malachite", "jewelry"]
  },
  {
    id: "p2",
    name: "Royal Chitenge Ceremonial Attire",
    description: "Luxurious ceremonial chitenge outfit worn by Zambian royalty, featuring intricate traditional patterns and premium silk materials",
    price: 459.99,
    originalPrice: 699.99,
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=800&q=80",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80"
    ],
    category: "Traditional Fashion",
    vendor: {
      id: "v2",
      name: "Royal Heritage Fashion House",
      logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&q=80",
      verified: true,
      premiumSeller: true
    },
    rating: 5.0,
    reviewCount: 89,
    premiumFeatures: ["Royal Design", "Premium Silk", "Custom Tailoring", "Historical Significance"],
    luxuryRating: 5,
    handcrafted: true,
    exclusiveDesign: true,
    premiumMaterials: ["Pure Silk", "Gold Thread", "Traditional Dyes"],
    certifications: ["Cultural Heritage Approved", "Royal Design Certified"],
    warranty: "6 Month Premium Guarantee",
    views: 6780,
    soldCount: 23,
    tags: ["royal", "traditional", "silk", "ceremonial"]
  },
  {
    id: "p3",
    name: "Artisan Wood Sculpture Collection",
    description: "Masterfully carved wooden sculptures representing Zambian wildlife, created by master craftsmen using sustainable hardwoods",
    price: 189.99,
    originalPrice: 289.99,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
      "https://images.unsplash.com/photo-1580669337089-59ade28c4115?w=800&q=80"
    ],
    category: "Art & Crafts",
    vendor: {
      id: "v3",
      name: "Master Craftsmen Collective",
      logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&q=80",
      verified: true,
      premiumSeller: true
    },
    rating: 4.8,
    reviewCount: 234,
    premiumFeatures: ["Master Crafted", "Sustainable Wood", "Wildlife Theme", "Unique Design"],
    luxuryRating: 4,
    handcrafted: true,
    exclusiveDesign: true,
    premiumMaterials: ["Mahogany Wood", "Teak", "Natural Oils"],
    certifications: ["Sustainable Sourcing", "Master Artisan Certified"],
    warranty: "12 Month Craftsmanship Warranty",
    views: 3450,
    soldCount: 156,
    tags: ["art", "wood", "sculpture", "wildlife"]
  },
  {
    id: "p4",
    name: "Premium Copper Wire Baskets",
    description: "Elegant copper wire baskets handwoven by skilled artisans, combining traditional techniques with modern luxury appeal",
    price: 134.99,
    originalPrice: 199.99,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"
    ],
    category: "Home & Decor",
    vendor: {
      id: "v4",
      name: "Luxury Home Crafters",
      logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&q=80",
      verified: true,
      premiumSeller: true
    },
    rating: 4.7,
    reviewCount: 178,
    premiumFeatures: ["Pure Copper", "Handwoven Design", "Luxury Finish", "Functional Art"],
    luxuryRating: 4,
    handcrafted: true,
    premiumMaterials: ["Pure Copper Wire", "Protective Coating"],
    certifications: ["Artisan Quality", "Pure Copper Verified"],
    warranty: "24 Month Quality Guarantee",
    views: 2890,
    soldCount: 89,
    tags: ["copper", "baskets", "luxury", "home"]
  },
  {
    id: "p5",
    name: "Premium Zambian Coffee Luxury Set",
    description: "Exclusive collection of single-origin Zambian coffee beans with premium brewing accessories and gold-plated serving set",
    price: 89.99,
    originalPrice: 149.99,
    images: [
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80"
    ],
    category: "Gourmet Food",
    vendor: {
      id: "v5",
      name: "Zambian Premium Coffee Co.",
      logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&q=80",
      verified: true,
      premiumSeller: true
    },
    rating: 4.9,
    reviewCount: 267,
    premiumFeatures: ["Single Origin", "Premium Roast", "Luxury Packaging", "Brewing Accessories"],
    luxuryRating: 4,
    limitedEdition: true,
    premiumMaterials: ["Premium Coffee Beans", "Gold-Plated Accessories"],
    certifications: ["Organic Certified", "Fair Trade", "Premium Grade"],
    warranty: "Satisfaction Guarantee",
    views: 5670,
    soldCount: 234,
    tags: ["coffee", "gourmet", "luxury", "organic"]
  },
  {
    id: "p6",
    name: "Executive Leather Briefcase",
    description: "Handcrafted executive briefcase made from premium Zambian leather with gold hardware and silk-lined interior",
    price: 349.99,
    originalPrice: 499.99,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    category: "Business Accessories",
    vendor: {
      id: "v6",
      name: "Executive Leather Works",
      logo: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&q=80",
      verified: true,
      premiumSeller: true
    },
    rating: 4.8,
    reviewCount: 145,
    premiumFeatures: ["Premium Leather", "Gold Hardware", "Silk Lining", "Executive Design"],
    luxuryRating: 5,
    handcrafted: true,
    exclusiveDesign: true,
    premiumMaterials: ["Premium Leather", "Gold Hardware", "Silk Lining"],
    certifications: ["Leather Quality Certified", "Handcraft Verified"],
    warranty: "5 Year Premium Warranty",
    views: 3780,
    soldCount: 78,
    tags: ["leather", "briefcase", "executive", "business"]
  }
];

export default function PremiumItemsPage() {
  const [sortBy, setSortBy] = useState<'luxury' | 'price' | 'rating' | 'newest'>('luxury');
  const [filterBy, setFilterBy] = useState<'all' | 'handcrafted' | 'limited' | 'exclusive'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort products
  const filteredProducts = premiumProducts
    .filter(product => {
      switch (filterBy) {
        case 'handcrafted':
          return product.handcrafted;
        case 'limited':
          return product.limitedEdition;
        case 'exclusive':
          return product.exclusiveDesign;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'luxury':
          return b.luxuryRating - a.luxuryRating;
        case 'price':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.views - a.views;
        default:
          return b.luxuryRating - a.luxuryRating;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/90 via-yellow-50/60 to-amber-50/80 relative overflow-hidden">
      {/* Refined golden background effects */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/15 via-yellow-100/10 to-amber-300/20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-yellow-200/8 to-amber-100/15 pointer-events-none"></div>

      {/* Subtle floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-24 left-20 w-1.5 h-1.5 bg-amber-300/40 rounded-full animate-pulse"></div>
        <div className="absolute top-48 right-28 w-1 h-1 bg-yellow-300/50 rounded-full animate-bounce"></div>
        <div className="absolute bottom-48 right-1/5 w-1.5 h-1.5 bg-yellow-400/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-36 left-1/4 w-0.5 h-0.5 bg-amber-300/40 rounded-full animate-bounce"></div>
      </div>

      <Header />

      <main className="relative z-10 space-y-0">
        {/* Hero Section */}
        <section className="relative pt-16 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/8 via-yellow-300/12 to-amber-500/8"></div>

          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-20">
            <div className="text-center space-y-16">
              {/* Header Content */}
              <div className="space-y-8">
                <div className="flex items-center justify-center gap-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-full flex items-center justify-center shadow-xl border-3 border-white/50">
                    <Crown className="text-white text-3xl drop-shadow-lg" />
                  </div>
                  <div className="text-left">
                    <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-amber-800 via-yellow-700 to-amber-900 bg-clip-text text-transparent leading-tight">
                      <span className="text-amber-600">✨</span> Premium
                      <div className="mt-2">
                        <Badge className="bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-600 text-white text-xl px-6 py-3 shadow-xl border border-white/20 rounded-2xl">
                          <Diamond className="h-5 w-5 mr-2" />
                          LUXURY
                        </Badge>
                      </div>
                    </h1>
                  </div>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                  <p className="text-2xl lg:text-3xl text-amber-900/85 font-semibold tracking-wide leading-relaxed">
                    Curated luxury items from Zambia's finest artisans
                  </p>
                  <p className="text-lg lg:text-xl text-amber-800/75 font-medium tracking-wide">
                    Experience unparalleled craftsmanship and exclusive designs
                  </p>
                </div>
              </div>

              {/* Premium Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
                {[
                  { icon: Shield, label: "Quality Guaranteed", desc: "Premium materials only" },
                  { icon: Award, label: "Master Crafted", desc: "By skilled artisans" },
                  { icon: Verified, label: "Authenticity", desc: "Certified genuine" },
                  { icon: Gift, label: "Luxury Packaging", desc: "Gift-ready presentation" }
                ].map((feature, index) => (
                  <div
                    key={feature.label}
                    className="group bg-white/95 backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-lg border border-amber-100/80 hover:border-amber-200 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-md group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-7 w-7 text-white drop-shadow-sm" />
                    </div>
                    <h3 className="font-bold text-amber-900 mb-3 text-lg text-center">{feature.label}</h3>
                    <p className="text-amber-800/75 text-sm leading-relaxed text-center">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="bg-white/98 backdrop-blur-xl rounded-3xl border border-amber-100/60 shadow-lg p-8 lg:p-10">
              <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 xl:gap-12">
                {/* Premium Filters */}
                <div className="flex-1 w-full">
                  <h3 className="text-xl font-bold text-amber-900 mb-6 flex items-center gap-3">
                    <Diamond className="h-5 w-5 text-amber-600" />
                    Premium Categories
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:flex xl:flex-wrap gap-3">
                    {[
                      { value: 'all', label: 'All Premium', icon: Crown },
                      { value: 'handcrafted', label: 'Handcrafted', icon: Award },
                      { value: 'limited', label: 'Limited Edition', icon: Medal },
                      { value: 'exclusive', label: 'Exclusive Design', icon: Sparkles }
                    ].map((filter) => (
                      <Button
                        key={filter.value}
                        variant={filterBy === filter.value ? "default" : "outline"}
                        size="lg"
                        onClick={() => setFilterBy(filter.value as any)}
                        className={`transition-all duration-300 font-semibold px-5 py-3 rounded-xl border-2 ${
                          filterBy === filter.value
                            ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white shadow-lg border-transparent hover:from-amber-600 hover:via-yellow-600 hover:to-amber-700'
                            : 'border-amber-200 text-amber-800 bg-white hover:border-amber-300 hover:bg-amber-50 hover:text-amber-900'
                        }`}
                      >
                        <filter.icon className="h-4 w-4 mr-2" />
                        {filter.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Sort and View Options */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full xl:w-auto">
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold text-amber-900 whitespace-nowrap">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="text-base border-2 border-amber-200 rounded-xl px-4 py-2.5 bg-white text-amber-900 font-medium focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200 min-w-[160px]"
                    >
                      <option value="luxury">Luxury Rating</option>
                      <option value="price">Highest Price</option>
                      <option value="rating">Best Rated</option>
                      <option value="newest">Most Popular</option>
                    </select>
                  </div>

                  <div className="flex border-2 border-amber-200 rounded-xl overflow-hidden bg-white">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="lg"
                      onClick={() => setViewMode('grid')}
                      className={`rounded-none px-5 py-2.5 border-none ${
                        viewMode === 'grid'
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-sm'
                          : 'text-amber-700 hover:bg-amber-50'
                      }`}
                    >
                      <Grid3X3 className="h-5 w-5" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="lg"
                      onClick={() => setViewMode('list')}
                      className={`rounded-none px-5 py-2.5 border-none ${
                        viewMode === 'list'
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-sm'
                          : 'text-amber-700 hover:bg-amber-50'
                      }`}
                    >
                      <List className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Products Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-800 via-yellow-700 to-amber-900 bg-clip-text text-transparent mb-2">
                  Premium Collection
                </h2>
                <p className="text-amber-700/70 text-lg">
                  {filteredProducts.length} exclusive {filteredProducts.length === 1 ? 'item' : 'items'} available
                </p>
              </div>
            </div>

            <div className={`gap-8 ${
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
                : 'flex flex-col space-y-6'
            }`}>
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group hover:-translate-y-1 transition-all duration-300"
                >
                  <Card className={`overflow-hidden border border-amber-100/80 shadow-lg hover:shadow-xl transition-all duration-300 bg-white backdrop-blur-sm hover:border-amber-200 ${
                    viewMode === 'list' ? 'flex flex-row' : ''
                  }`}>
                    {/* Premium Badges */}
                    <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
                      <Badge className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white px-2.5 py-1 shadow-md border border-white/20 text-xs">
                        <Crown className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                      {product.handcrafted && (
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-0.5 text-xs shadow-md border border-white/20">
                          <Award className="h-2.5 w-2.5 mr-1" />
                          Handcrafted
                        </Badge>
                      )}
                      {product.limitedEdition && (
                        <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-2 py-0.5 text-xs shadow-md border border-white/20">
                          <Medal className="h-2.5 w-2.5 mr-1" />
                          Limited
                        </Badge>
                      )}
                      {product.exclusiveDesign && (
                        <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2 py-0.5 text-xs shadow-md border border-white/20">
                          <Sparkles className="h-2.5 w-2.5 mr-1" />
                          Exclusive
                        </Badge>
                      )}
                    </div>

                    {/* Luxury Rating */}
                    <div className="absolute top-3 right-3 z-20">
                      <div className="bg-white/95 backdrop-blur-md rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-lg border border-amber-100/50">
                        <Diamond className="h-3.5 w-3.5 text-amber-600" />
                        <span className="text-xs font-bold text-amber-900">{product.luxuryRating}/5</span>
                      </div>
                    </div>

                    {/* Product Image */}
                    <div className={`relative bg-gradient-to-br from-amber-50 to-yellow-50 overflow-hidden ${
                      viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-[4/3]'
                    }`}>
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Premium Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 bg-white/90 backdrop-blur-sm border-0 hover:bg-white"
                            >
                              <Heart className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 bg-white/90 backdrop-blur-sm border-0 hover:bg-white"
                            >
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <CardContent className={`${viewMode === 'list' ? 'flex-1 p-6' : 'p-5'}`}>
                      {/* Vendor Info */}
                      <div className="flex items-center gap-2.5 mb-4">
                        <Image
                          src={product.vendor.logo}
                          alt={product.vendor.name}
                          width={20}
                          height={20}
                          className="rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-amber-900">{product.vendor.name}</span>
                        {product.vendor.premiumSeller && (
                          <Badge className="bg-amber-50 text-amber-700 text-xs px-2 py-0.5 border border-amber-200">
                            <Crown className="h-2 w-2 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="mb-4">
                        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 leading-tight group-hover:text-amber-800 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Premium Features */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {product.premiumFeatures.slice(0, 3).map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs border-amber-200 text-amber-700">
                              {feature}
                            </Badge>
                          ))}
                          {product.premiumFeatures.length > 3 && (
                            <Badge variant="outline" className="text-xs border-gray-200 text-gray-500">
                              +{product.premiumFeatures.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-amber-600">
                          K{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <>
                            <span className="text-lg text-gray-400 line-through">
                              K{product.originalPrice.toFixed(2)}
                            </span>
                            <Badge className="bg-green-100 text-green-700">
                              Save K{(product.originalPrice - product.price).toFixed(2)}
                            </Badge>
                          </>
                        )}
                      </div>

                      {/* Rating and Stats */}
                      <div className="flex items-center justify-between text-sm text-amber-800 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{product.rating}</span>
                          <span>({product.reviewCount})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{product.views.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Premium Guarantees */}
                      <div className="bg-amber-50 rounded-lg p-3 mb-4">
                        <div className="flex items-center gap-4 text-xs text-amber-700">
                          <div className="flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            <span>{product.warranty}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Truck className="h-3 w-3" />
                            <span>Premium Delivery</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <RefreshCw className="h-3 w-3" />
                            <span>Easy Returns</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-semibold py-3">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          className="px-4 py-3 border-amber-300 hover:border-amber-500 hover:text-amber-600"
                          asChild
                        >
                          <Link href={`/products/${product.id}`}>
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>

                      {/* Certifications */}
                      {product.certifications && product.certifications.length > 0 && (
                        <div className="mt-3 text-center">
                          <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span>{product.certifications.join(" • ")}</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-8 w-8 text-amber-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No premium items found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters to see more luxury products
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
