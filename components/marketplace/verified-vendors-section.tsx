"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  Store,
  CheckCircle,
  Award,
  MapPin,
  Users,
  Package,
  TrendingUp,
  Clock,
  MessageCircle,
  ExternalLink,
  Shield,
  Verified,
  Crown,
  Medal,
  ThumbsUp,
  Eye,
  ChevronRight,
  Filter,
  Heart,
  Phone,
  Mail,
  Globe,
  Calendar,
  Truck,
  Zap
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Vendor {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  totalProducts: number;
  totalSales: number;
  joinedDate: string;
  location: string;
  verified: boolean;
  badge: "Top Seller" | "Rising Star" | "Artisan" | "Premium" | "Choice Award";
  badgeColor: string;
  categories: string[];
  responseTime: string;
  shippingTime: string;
  returnPolicy: string;
  achievements: string[];
  specialties: string[];
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  stats: {
    satisfaction: number;
    onTimeDelivery: number;
    qualityRating: number;
  };
  featuredProducts: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
  }>;
  isNew?: boolean;
  isTrending?: boolean;
  hasDiscount?: boolean;
}

const verifiedVendors: Vendor[] = [
  {
    id: "v1",
    name: "Electronics Hub Zambia",
    description: "Premier destination for cutting-edge electronics, gaming gear, and tech accessories. Trusted by thousands of customers across Zambia.",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    rating: 4.8,
    reviewCount: 2847,
    totalProducts: 156,
    totalSales: 8934,
    joinedDate: "2019-03-15",
    location: "Lusaka, Zambia",
    verified: true,
    badge: "Top Seller",
    badgeColor: "from-yellow-400 to-orange-400",
    categories: ["Electronics", "Gaming", "Accessories"],
    responseTime: "< 2 hours",
    shippingTime: "1-2 days",
    returnPolicy: "30-day returns",
    achievements: ["10K+ Sales", "99% Satisfaction", "Fast Shipping Champion"],
    specialties: ["Gaming Equipment", "Smartphones", "Audio Devices"],
    contact: {
      phone: "+260 97 123 4567",
      email: "contact@electronicshubtm.com",
      website: "electronicshubtm.com"
    },
    stats: {
      satisfaction: 98,
      onTimeDelivery: 99,
      qualityRating: 97
    },
    featuredProducts: [
      {
        id: "p1",
        name: "Gaming Headset Pro",
        image: "https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=400&q=80",
        price: 89.99,
        rating: 4.7
      },
      {
        id: "p2",
        name: "Smartphone 128GB",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
        price: 399.99,
        rating: 4.8
      }
    ],
    isTrending: true
  },
  {
    id: "v2",
    name: "Zambian Heritage Fashion",
    description: "Celebrating Zambian culture through traditional and contemporary fashion. Handcrafted with love and authenticity.",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=800&q=80",
    rating: 4.9,
    reviewCount: 1563,
    totalProducts: 89,
    totalSales: 4567,
    joinedDate: "2020-07-22",
    location: "Kitwe, Zambia",
    verified: true,
    badge: "Choice Award",
    badgeColor: "from-purple-400 to-pink-400",
    categories: ["Fashion", "Traditional", "Accessories"],
    responseTime: "< 4 hours",
    shippingTime: "2-3 days",
    returnPolicy: "14-day returns",
    achievements: ["Cultural Ambassador", "Artisan Excellence", "Customer Favorite"],
    specialties: ["Chitenge Fashion", "Traditional Wear", "Custom Tailoring"],
    contact: {
      phone: "+260 96 987 6543",
      email: "info@zamheritage.com"
    },
    stats: {
      satisfaction: 99,
      onTimeDelivery: 96,
      qualityRating: 98
    },
    featuredProducts: [
      {
        id: "p3",
        name: "Traditional Chitenge Dress",
        image: "https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=400&q=80",
        price: 65.99,
        rating: 4.9
      },
      {
        id: "p4",
        name: "Custom Tailored Suit",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
        price: 189.99,
        rating: 4.8
      }
    ],
    hasDiscount: true
  },
  {
    id: "v3",
    name: "Craft Collective Zambia",
    description: "Supporting local artisans and traditional craftspeople. Every purchase supports Zambian communities and preserves cultural heritage.",
    logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    rating: 4.7,
    reviewCount: 892,
    totalProducts: 73,
    totalSales: 2341,
    joinedDate: "2021-01-10",
    location: "Livingstone, Zambia",
    verified: true,
    badge: "Artisan",
    badgeColor: "from-green-400 to-teal-400",
    categories: ["Crafts", "Art", "Home Decor"],
    responseTime: "< 6 hours",
    shippingTime: "3-5 days",
    returnPolicy: "7-day returns",
    achievements: ["Artisan Verified", "Community Impact", "Eco-Friendly"],
    specialties: ["Handwoven Baskets", "Wood Carvings", "Traditional Art"],
    contact: {
      phone: "+260 95 456 7890",
      email: "hello@craftcollective.zm"
    },
    stats: {
      satisfaction: 96,
      onTimeDelivery: 94,
      qualityRating: 99
    },
    featuredProducts: [
      {
        id: "p5",
        name: "Handwoven Basket Set",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
        price: 45.99,
        rating: 4.8
      },
      {
        id: "p6",
        name: "Traditional Wood Carving",
        image: "https://images.unsplash.com/photo-1580669337089-59ade28c4115?w=400&q=80",
        price: 78.99,
        rating: 4.9
      }
    ],
    isNew: true
  },
  {
    id: "v4",
    name: "FreshMarket Zambia",
    description: "Farm-fresh produce and organic foods delivered to your doorstep. Supporting local farmers and promoting healthy living.",
    logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    rating: 4.6,
    reviewCount: 1247,
    totalProducts: 234,
    totalSales: 6789,
    joinedDate: "2020-11-05",
    location: "Ndola, Zambia",
    verified: true,
    badge: "Rising Star",
    badgeColor: "from-blue-400 to-indigo-400",
    categories: ["Food", "Organic", "Beverages"],
    responseTime: "< 3 hours",
    shippingTime: "Same day",
    returnPolicy: "24-hour guarantee",
    achievements: ["Farm Fresh", "Same Day Delivery", "Organic Certified"],
    specialties: ["Organic Produce", "Local Fruits", "Fresh Vegetables"],
    contact: {
      phone: "+260 97 345 6789",
      email: "orders@freshmarket.zm",
      website: "freshmarket.zm"
    },
    stats: {
      satisfaction: 95,
      onTimeDelivery: 98,
      qualityRating: 96
    },
    featuredProducts: [
      {
        id: "p7",
        name: "Organic Vegetable Box",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80",
        price: 24.99,
        rating: 4.6
      },
      {
        id: "p8",
        name: "Premium Coffee Beans",
        image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80",
        price: 18.99,
        rating: 4.7
      }
    ],
    isTrending: true
  }
];

const badgeIcons = {
  "Top Seller": Crown,
  "Rising Star": TrendingUp,
  "Artisan": Award,
  "Premium": Medal,
  "Choice Award": Star
};

interface VerifiedVendorsSectionProps {
  onFollowVendor?: (vendorId: string) => void;
  followedVendors?: Set<string>;
}

export function VerifiedVendorsSection({ onFollowVendor, followedVendors = new Set() }: VerifiedVendorsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'rating' | 'sales' | 'newest'>('rating');

  // Get unique categories
  const categories = [...new Set(verifiedVendors.flatMap(vendor => vendor.categories))];

  // Filter and sort vendors
  const filteredVendors = verifiedVendors
    .filter(vendor => selectedCategory ? vendor.categories.includes(selectedCategory) : true)
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'sales':
          return b.totalSales - a.totalSales;
        case 'newest':
          return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
        default:
          return 0;
      }
    });

  const handleFollowVendor = (vendorId: string) => {
    onFollowVendor?.(vendorId);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <Shield className="text-white text-xl" />
            </motion.div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-2">
                Verified Vendors
                <Badge className="bg-blue-500 text-white">
                  <Verified className="h-3 w-3 mr-1" />
                  Trusted
                </Badge>
              </h2>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Shop with confidence from our network of verified, high-rated sellers
          </p>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl border shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Category Filters */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter by Category
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className="transition-all duration-200"
                >
                  All Vendors
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="transition-all duration-200"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Sort by</h3>
              <div className="flex gap-2">
                {[
                  { value: 'rating', label: 'Highest Rated' },
                  { value: 'sales', label: 'Most Sales' },
                  { value: 'newest', label: 'Newest' }
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant={sortBy === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy(option.value as any)}
                    className="transition-all duration-200"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Vendors Grid */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {filteredVendors.map((vendor, index) => {
            const BadgeIcon = badgeIcons[vendor.badge];
            
            return (
              <motion.div
                key={vendor.id}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }
                  }
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* Cover Image */}
                  <div className="relative h-32 bg-gradient-to-r from-blue-100 to-indigo-100 overflow-hidden">
                    <Image
                      src={vendor.coverImage}
                      alt={`${vendor.name} cover`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Status Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {vendor.isNew && (
                        <Badge className="bg-green-500 text-white text-xs px-2 py-1">
                          <Zap className="h-2.5 w-2.5 mr-1" />
                          New
                        </Badge>
                      )}
                      {vendor.isTrending && (
                        <Badge className="bg-orange-500 text-white text-xs px-2 py-1">
                          <TrendingUp className="h-2.5 w-2.5 mr-1" />
                          Trending
                        </Badge>
                      )}
                      {vendor.hasDiscount && (
                        <Badge className="bg-red-500 text-white text-xs px-2 py-1 animate-pulse">
                          Sale Active
                        </Badge>
                      )}
                    </div>

                    {/* Follow Button */}
                    <div className="absolute top-3 right-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFollowVendor(vendor.id)}
                        className={`transition-all duration-200 ${
                          followedVendors.has(vendor.id)
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white/90 backdrop-blur-sm hover:bg-blue-50'
                        }`}
                      >
                        <Heart className={`h-3 w-3 mr-1 ${followedVendors.has(vendor.id) ? 'fill-current' : ''}`} />
                        {followedVendors.has(vendor.id) ? 'Following' : 'Follow'}
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Vendor Info */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <Image
                          src={vendor.logo}
                          alt={vendor.name}
                          width={60}
                          height={60}
                          className="rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        {vendor.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-gray-900 text-lg truncate">
                            {vendor.name}
                          </h3>
                          <Badge className={`bg-gradient-to-r ${vendor.badgeColor} text-white text-xs px-2 py-1`}>
                            <BadgeIcon className="h-3 w-3 mr-1" />
                            {vendor.badge}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {vendor.description}
                        </p>

                        {/* Rating and Stats */}
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-semibold">{vendor.rating}</span>
                            <span className="text-gray-500">({vendor.reviewCount} reviews)</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Package className="h-4 w-4" />
                            <span>{vendor.totalProducts} products</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Location and Specialties */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{vendor.location}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {vendor.specialties.slice(0, 3).map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div>
                          <div className="text-lg font-bold text-gray-900">{vendor.stats.satisfaction}%</div>
                          <div className="text-xs text-gray-600">Satisfaction</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-900">{vendor.stats.onTimeDelivery}%</div>
                          <div className="text-xs text-gray-600">On Time</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-900">{vendor.stats.qualityRating}%</div>
                          <div className="text-xs text-gray-600">Quality</div>
                        </div>
                      </div>
                    </div>

                    {/* Featured Products */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Featured Products</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {vendor.featuredProducts.map((product) => (
                          <div key={product.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={40}
                              height={40}
                              className="rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-900 truncate">{product.name}</p>
                              <div className="flex items-center gap-1 text-xs">
                                <span className="font-semibold text-blue-600">K{product.price}</span>
                                <Star className="h-2.5 w-2.5 text-yellow-400 fill-current" />
                                <span className="text-gray-500">{product.rating}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Service Info */}
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Responds {vendor.responseTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Truck className="h-3 w-3" />
                        <span>Ships in {vendor.shippingTime}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                      >
                        <Button
                          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
                          asChild
                        >
                          <Link href={`/vendors/${vendor.id}`}>
                            <Store className="h-4 w-4 mr-2" />
                            Visit Store
                          </Link>
                        </Button>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="outline"
                          className="border-gray-300 hover:border-blue-500 hover:text-blue-500"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-xl font-semibold"
              asChild
            >
              <Link href="/vendors">
                Browse All Verified Vendors
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
