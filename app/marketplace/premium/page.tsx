"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
  Users,
  Eye,
  Share2,
  ExternalLink,
  Filter,
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-100/80 to-amber-100 relative overflow-hidden">
      {/* Sophisticated golden base layers */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-300/25 via-yellow-200/20 to-amber-400/30 pointer-events-none animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-yellow-300/15 to-amber-200/25 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-amber-100/40 via-transparent to-yellow-100/40 pointer-events-none"></div>

      {/* Luxury golden wave animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/20 to-transparent transform -skew-y-12 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-yellow-300/15 to-transparent transform skew-y-6 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Enhanced floating golden particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large luxury particles */}
        <div className="absolute top-20 left-16 w-3 h-3 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full animate-bounce shadow-xl" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-40 right-32 w-2 h-2 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full animate-ping shadow-lg" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute top-80 left-1/3 w-2.5 h-2.5 bg-gradient-to-br from-amber-300 to-yellow-400 rounded-full animate-pulse shadow-xl" style={{animationDelay: '2s', animationDuration: '5s'}}></div>

        {/* Medium elegant particles */}
        <div className="absolute bottom-60 right-1/4 w-2 h-2 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full animate-bounce shadow-lg" style={{animationDelay: '3s', animationDuration: '3.5s'}}></div>
        <div className="absolute bottom-32 left-2/3 w-1.5 h-1.5 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full animate-ping shadow-md" style={{animationDelay: '1.5s', animationDuration: '4.5s'}}></div>

        {/* Small sophisticated particles */}
        <div className="absolute top-96 right-16 w-1 h-1 bg-amber-400 rounded-full animate-pulse shadow-sm" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute bottom-96 left-20 w-1 h-1 bg-yellow-500 rounded-full animate-bounce shadow-sm" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/2 right-1/2 w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping shadow-md" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Luxury shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform translate-x-full animate-pulse pointer-events-none" style={{animationDuration: '8s', animationIterationCount: 'infinite'}}></div>

      <Header />

      <main className="relative z-10">
        {/* Luxury Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-300/25 to-amber-500/20 backdrop-blur-sm"></div>

          {/* Sophisticated golden pattern overlays */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent transform rotate-12 animate-pulse" style={{animationDuration: '6s'}}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent transform -rotate-12 animate-pulse" style={{animationDelay: '3s', animationDuration: '6s'}}></div>
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-amber-300/35 to-transparent transform rotate-6 animate-pulse" style={{animationDelay: '1s', animationDuration: '8s'}}></div>
          </div>

          {/* Luxury light rays */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-400 to-transparent animate-pulse" style={{animationDuration: '4s'}}></div>
            <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-yellow-400 to-transparent animate-pulse" style={{animationDelay: '2s', animationDuration: '4s'}}></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center mb-24"
            >
              <div className="flex items-center justify-center gap-8 mb-12">
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                    boxShadow: ["0 0 20px rgba(245, 158, 11, 0.3)", "0 0 40px rgba(245, 158, 11, 0.6)", "0 0 20px rgba(245, 158, 11, 0.3)"]
                  }}
                  transition={{
                    rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="w-28 h-28 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/60 backdrop-blur-sm relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent animate-pulse"></div>
                  <Crown className="text-white text-4xl drop-shadow-2xl relative z-10" />
                </motion.div>
                <div>
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-7xl md:text-9xl font-black bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800 bg-clip-text text-transparent flex items-center gap-6 drop-shadow-lg"
                  >
                    <motion.span
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      ✨
                    </motion.span>
                    Premium
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative"
                    >
                      <Badge className="bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-600 text-white text-2xl px-8 py-4 shadow-2xl border-2 border-white/30 backdrop-blur-sm">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                          <Diamond className="h-6 w-6 mr-3" />
                        </motion.div>
                        LUXURY
                      </Badge>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse rounded-full"></div>
                    </motion.div>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-3xl text-amber-900/90 mt-8 font-semibold drop-shadow-md tracking-wide"
                  >
                    Curated luxury items from Zambia's finest artisans
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="text-xl text-amber-800/80 mt-4 tracking-wide font-medium"
                  >
                    Experience unparalleled craftsmanship and exclusive designs
                  </motion.p>
                </div>
              </div>

              {/* Premium Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
                {[
                  { icon: Shield, label: "Quality Guaranteed", desc: "Premium materials only", color: "from-amber-400 to-yellow-500" },
                  { icon: Award, label: "Master Crafted", desc: "By skilled artisans", color: "from-yellow-400 to-amber-500" },
                  { icon: Verified, label: "Authenticity", desc: "Certified genuine", color: "from-amber-500 to-yellow-600" },
                  { icon: Gift, label: "Luxury Packaging", desc: "Gift-ready presentation", color: "from-yellow-500 to-amber-600" }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      delay: index * 0.2,
                      duration: 0.8,
                      ease: "easeOut"
                    }}
                    whileHover={{
                      scale: 1.08,
                      y: -10,
                      boxShadow: "0 25px 50px rgba(245, 158, 11, 0.3)"
                    }}
                    className="group bg-gradient-to-br from-white/98 via-amber-50/60 to-yellow-50/80 backdrop-blur-md rounded-3xl p-10 shadow-2xl border-2 border-amber-200/60 hover:border-amber-300/80 transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl relative overflow-hidden`}
                      whileHover={{
                        rotate: 360,
                        scale: 1.1
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent animate-pulse"></div>
                      <feature.icon className="h-10 w-10 text-white drop-shadow-lg relative z-10" />
                    </motion.div>

                    <motion.h3
                      className="font-black text-amber-900 mb-3 text-xl tracking-wide"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.2 + 0.3 }}
                    >
                      {feature.label}
                    </motion.h3>
                    <motion.p
                      className="text-amber-800/80 text-base leading-relaxed font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.2 + 0.4 }}
                    >
                      {feature.desc}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-gradient-to-br from-white/98 via-amber-50/70 to-yellow-50/60 backdrop-blur-xl rounded-[2rem] border-2 border-amber-200/70 shadow-2xl p-10 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/30 to-transparent animate-pulse"></div>

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 relative z-10">
                {/* Premium Filters */}
                <div className="flex-1">
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-black text-amber-900 mb-6 flex items-center gap-4"
                  >
                    <motion.div
                      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                      transition={{
                        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      <Diamond className="h-6 w-6 text-amber-600" />
                    </motion.div>
                    Premium Categories
                  </motion.h3>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { value: 'all', label: 'All Premium', icon: Crown },
                      { value: 'handcrafted', label: 'Handcrafted', icon: Award },
                      { value: 'limited', label: 'Limited Edition', icon: Medal },
                      { value: 'exclusive', label: 'Exclusive Design', icon: Sparkles }
                    ].map((filter, index) => (
                      <motion.div
                        key={filter.value}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant={filterBy === filter.value ? "default" : "outline"}
                          size="lg"
                          onClick={() => setFilterBy(filter.value as any)}
                          className={`transition-all duration-500 font-bold px-8 py-4 rounded-2xl text-lg shadow-lg ${
                            filterBy === filter.value
                              ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white shadow-2xl border-0 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-700 hover:shadow-3xl'
                              : 'border-2 border-amber-300 text-amber-800 hover:border-amber-400 hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 hover:text-amber-900'
                          }`}
                        >
                          <filter.icon className="h-5 w-5 mr-3" />
                          {filter.label}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Sort and View Options */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-8"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-black text-amber-900">Sort:</span>
                    <motion.select
                      whileHover={{ scale: 1.05 }}
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="text-lg border-2 border-amber-400 rounded-2xl px-6 py-3 bg-gradient-to-r from-white/95 to-amber-50/80 backdrop-blur-md text-amber-900 font-bold focus:border-amber-600 focus:ring-4 focus:ring-amber-200/50 transition-all duration-300 shadow-lg"
                    >
                      <option value="luxury">Luxury Rating</option>
                      <option value="price">Highest Price</option>
                      <option value="rating">Best Rated</option>
                      <option value="newest">Most Popular</option>
                    </motion.select>
                  </div>

                  <div className="flex gap-1 border-2 border-amber-400 rounded-2xl overflow-hidden bg-gradient-to-r from-white/90 to-amber-50/70 backdrop-blur-md shadow-lg">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="lg"
                        onClick={() => setViewMode('grid')}
                        className={`rounded-none px-6 py-3 font-bold ${
                          viewMode === 'grid'
                            ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white shadow-lg'
                            : 'text-amber-800 hover:bg-gradient-to-r hover:from-amber-100 hover:to-yellow-100'
                        }`}
                      >
                        <Grid3X3 className="h-6 w-6" />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="lg"
                        onClick={() => setViewMode('list')}
                        className={`rounded-none px-6 py-3 font-bold ${
                          viewMode === 'list'
                            ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white shadow-lg'
                            : 'text-amber-800 hover:bg-gradient-to-r hover:from-amber-100 hover:to-yellow-100'
                        }`}
                      >
                        <List className="h-6 w-6" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Premium Products Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-amber-800 via-yellow-700 to-amber-900 bg-clip-text text-transparent drop-shadow-sm">
                Premium Collection ({filteredProducts.length})
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                  whileHover={{
                    y: -15,
                    scale: 1.03,
                    boxShadow: "0 35px 70px rgba(245, 158, 11, 0.25)"
                  }}
                  className="group"
                >
                  <Card className="overflow-hidden border-2 border-amber-200/70 shadow-2xl hover:shadow-3xl transition-all duration-700 bg-gradient-to-br from-white/98 via-amber-50/40 to-yellow-50/30 backdrop-blur-md hover:border-amber-400/90 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    {/* Premium Badges */}
                    <div className="absolute top-6 left-6 z-20 flex flex-col gap-3">
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Badge className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white px-5 py-2.5 shadow-xl border-2 border-white/40 backdrop-blur-sm font-bold text-base">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Crown className="h-5 w-5 mr-2" />
                          </motion.div>
                          Premium
                        </Badge>
                      </motion.div>
                      {product.handcrafted && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.15 + 0.4 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 text-sm shadow-xl border-2 border-white/40 backdrop-blur-sm font-semibold">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Award className="h-4 w-4 mr-2" />
                            </motion.div>
                            Handcrafted
                          </Badge>
                        </motion.div>
                      )}
                      {product.limitedEdition && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.15 + 0.5 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 text-sm shadow-xl border-2 border-white/40 backdrop-blur-sm font-semibold">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                              <Medal className="h-4 w-4 mr-2" />
                            </motion.div>
                            Limited
                          </Badge>
                        </motion.div>
                      )}
                      {product.exclusiveDesign && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.15 + 0.6 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 text-sm shadow-xl border-2 border-white/40 backdrop-blur-sm font-semibold">
                            <motion.div
                              animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Sparkles className="h-4 w-4 mr-2" />
                            </motion.div>
                            Exclusive
                          </Badge>
                        </motion.div>
                      )}
                    </div>

                    {/* Luxury Rating */}
                    <div className="absolute top-6 right-6 z-20">
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.15 + 0.2, type: "spring" }}
                        whileHover={{ scale: 1.1 }}
                        className="bg-gradient-to-br from-white/98 via-amber-50/90 to-yellow-50/80 backdrop-blur-xl rounded-2xl px-5 py-3 flex items-center gap-3 shadow-2xl border-2 border-amber-300/60"
                      >
                        <motion.div
                          animate={{
                            rotate: 360,
                            scale: [1, 1.2, 1]
                          }}
                          transition={{
                            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                          }}
                        >
                          <Diamond className="h-5 w-5 text-amber-600" />
                        </motion.div>
                        <span className="text-base font-black text-amber-900">{product.luxuryRating}/5</span>
                      </motion.div>
                    </div>

                    {/* Product Image */}
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-amber-100 to-yellow-50 overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Premium Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="flex gap-3">
                            <Button
                              size="lg"
                              variant="outline"
                              className="flex-1 bg-white/95 backdrop-blur-md border-0 hover:bg-white shadow-xl text-amber-800 hover:text-amber-900 font-semibold"
                            >
                              <Heart className="h-4 w-4 mr-2" />
                              Save
                            </Button>
                            <Button
                              size="lg"
                              variant="outline"
                              className="flex-1 bg-white/95 backdrop-blur-md border-0 hover:bg-white shadow-xl text-amber-800 hover:text-amber-900 font-semibold"
                            >
                              <Share2 className="h-4 w-4 mr-2" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-8">
                      {/* Vendor Info */}
                      <div className="flex items-center gap-3 mb-4">
                        <Image
                          src={product.vendor.logo}
                          alt={product.vendor.name}
                          width={32}
                          height={32}
                          className="rounded-full object-cover border-2 border-amber-200"
                        />
                        <span className="text-base font-semibold text-amber-900">{product.vendor.name}</span>
                        {product.vendor.premiumSeller && (
                          <Badge className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 text-sm px-3 py-1 border border-amber-200">
                            <Crown className="h-3 w-3 mr-1.5" />
                            Premium Seller
                          </Badge>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="mb-5">
                        <h3 className="font-bold text-amber-900 text-xl mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-amber-800/80 text-base line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Premium Features */}
                      <div className="mb-5">
                        <div className="flex flex-wrap gap-2">
                          {product.premiumFeatures.slice(0, 3).map((feature) => (
                            <Badge key={feature} variant="outline" className="text-sm border-amber-300 text-amber-800 bg-amber-50/50 px-3 py-1">
                              {feature}
                            </Badge>
                          ))}
                          {product.premiumFeatures.length > 3 && (
                            <Badge variant="outline" className="text-sm border-amber-200 text-amber-600 bg-amber-50/30 px-3 py-1">
                              +{product.premiumFeatures.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-4 mb-5">
                        <span className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-yellow-700 bg-clip-text text-transparent">
                          K{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <>
                            <span className="text-xl text-amber-500/60 line-through">
                              K{product.originalPrice.toFixed(2)}
                            </span>
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 shadow-lg">
                              Save K{(product.originalPrice - product.price).toFixed(2)}
                            </Badge>
                          </>
                        )}
                      </div>

                      {/* Rating and Stats */}
                      <div className="flex items-center justify-between text-base text-amber-800 mb-5">
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-500 fill-current" />
                          <span className="font-bold">{product.rating}</span>
                          <span className="text-amber-700">({product.reviewCount})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          <span className="font-medium">{product.views.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Premium Guarantees */}
                      <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 rounded-2xl p-4 mb-6 border border-amber-200/50">
                        <div className="flex items-center gap-6 text-sm text-amber-800 font-medium">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            <span>{product.warranty}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4" />
                            <span>Premium Delivery</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4" />
                            <span>Easy Returns</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-4">
                        <motion.div
                          className="flex-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            className="w-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-700 hover:via-yellow-600 hover:to-amber-700 text-white font-black py-5 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                            <motion.div
                              animate={{ rotate: [0, 5, -5, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <ShoppingCart className="h-6 w-6 mr-3 relative z-10" />
                            </motion.div>
                            <span className="relative z-10">Add to Cart</span>
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="outline"
                            className="px-8 py-5 border-3 border-amber-400 hover:border-amber-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 text-amber-800 hover:text-amber-900 rounded-2xl font-bold transition-all duration-500 shadow-lg hover:shadow-xl"
                            asChild
                          >
                            <Link href={`/products/${product.id}`}>
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                <ExternalLink className="h-6 w-6" />
                              </motion.div>
                            </Link>
                          </Button>
                        </motion.div>
                      </div>

                      {/* Certifications */}
                      {product.certifications && product.certifications.length > 0 && (
                        <div className="mt-4 text-center">
                          <div className="flex items-center justify-center gap-2 text-sm text-amber-700 font-medium">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>{product.certifications.join(" • ")}</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <Crown className="h-12 w-12 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-2xl font-bold text-amber-900 mb-3">
                  No premium items found
                </h3>
                <p className="text-amber-800/70 text-lg">
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
