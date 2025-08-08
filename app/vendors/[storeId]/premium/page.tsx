"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Crown,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  MessageCircle,
  Heart,
  Share2,
  Verified,
  Award,
  Shield,
  Truck,
  Clock,
  Users,
  TrendingUp,
  Eye,
  ShoppingCart,
  Filter,
  Grid3X3,
  List,
  Search,
  ExternalLink,
  ChevronRight,
  Store,
  Calendar,
  Package,
  Diamond,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PremiumVendor {
  id: string;
  name: string;
  description: string;
  bio: string;
  logo: string;
  bannerImage: string;
  verified: boolean;
  premiumSeller: boolean;
  rating: number;
  reviewCount: number;
  totalProducts: number;
  totalServices: number;
  joinedDate: string;
  location: string;
  phone: string;
  email: string;
  website?: string;
  specialties: string[];
  certifications: string[];
  responseTime: string;
  fulfillmentTime: string;
  followers: number;
  totalSales: number;
  badges: string[];
}

interface VendorProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  type: 'product' | 'service';
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
  bestseller: boolean;
}

const mockVendor: PremiumVendor = {
  id: "royal-artisans-001",
  name: "Royal Zambian Artisans",
  description: "Master craftsmen specializing in authentic Zambian art and luxury handcrafted items",
  bio: "Established in 1985, Royal Zambian Artisans has been the premier destination for authentic Zambian craftsmanship. Our master artisans combine traditional techniques passed down through generations with contemporary design sensibilities to create truly unique pieces. Every item is handcrafted with meticulous attention to detail, using only the finest materials sourced locally from trusted suppliers across Zambia.",
  logo: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&q=80",
  bannerImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80",
  verified: true,
  premiumSeller: true,
  rating: 4.9,
  reviewCount: 1247,
  totalProducts: 156,
  totalServices: 12,
  joinedDate: "2018-03-15",
  location: "Lusaka, Zambia",
  phone: "+260 97 123 4567",
  email: "contact@royalzambianartisans.zm",
  website: "https://royalzambianartisans.zm",
  specialties: ["Handcrafted Jewelry", "Wood Sculptures", "Traditional Art", "Luxury Accessories"],
  certifications: ["Master Artisan Certified", "Fair Trade Verified", "Export Quality Assured"],
  responseTime: "Within 2 hours",
  fulfillmentTime: "3-5 business days",
  followers: 3420,
  totalSales: 8960,
  badges: ["Top Seller", "Premium Quality", "Fast Shipping", "Excellent Service"]
};

const mockProducts: VendorProduct[] = [
  {
    id: "p001",
    name: "Royal Malachite Crown Collection",
    price: 2999.99,
    originalPrice: 4499.99,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
    category: "Royal Jewelry",
    type: "product",
    rating: 5.0,
    reviews: 89,
    inStock: true,
    featured: true,
    bestseller: true
  },
  {
    id: "p002",
    name: "Imperial Chitenge Design Service",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=400&q=80",
    category: "Design Services",
    type: "service",
    rating: 4.8,
    reviews: 156,
    inStock: true,
    featured: true,
    bestseller: false
  },
  {
    id: "p003",
    name: "Sovereign Wood Sculpture",
    price: 799.99,
    originalPrice: 1199.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
    category: "Art & Collectibles",
    type: "product",
    rating: 4.7,
    reviews: 234,
    inStock: true,
    featured: false,
    bestseller: true
  }
];

export default function PremiumVendorStorefront({ params }: { params: { storeId: string } }) {
  const [activeTab, setActiveTab] = useState("products");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterBy, setFilterBy] = useState<'all' | 'products' | 'services' | 'featured'>('all');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode detection
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const filteredProducts = mockProducts.filter(product => {
    switch (filterBy) {
      case 'products':
        return product.type === 'product';
      case 'services':
        return product.type === 'service';
      case 'featured':
        return product.featured;
      default:
        return true;
    }
  });

  return (
    <div className={`min-h-screen ${
      isDarkMode ? 'premium-bg-dark' : 'premium-bg-light'
    }`}>
      {/* Premium Banner */}
      <div className="relative h-80 overflow-hidden">
        <Image
          src={mockVendor.bannerImage}
          alt={`${mockVendor.name} banner`}
          fill
          className="object-cover"
        />
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-t from-slate-900/80 via-slate-800/40 to-transparent' 
            : 'bg-gradient-to-t from-slate-900/60 via-slate-600/30 to-transparent'
        }`}></div>
        
        {/* Floating Premium Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full animate-premium-float ${
                isDarkMode ? 'bg-yellow-400/30' : 'bg-blue-400/30'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 6}s`
              }}
            />
          ))}
        </div>

        {/* Vendor Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end gap-6">
              {/* Vendor Logo */}
              <div className="relative">
                <div className={`w-32 h-32 rounded-full border-4 overflow-hidden ${
                  isDarkMode ? 'border-yellow-400/50' : 'border-blue-400/50'
                } shadow-2xl`}>
                  <Image
                    src={mockVendor.logo}
                    alt={mockVendor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {mockVendor.premiumSeller && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-bold shadow-lg">
                      <Crown className="h-4 w-4 mr-1" />
                      Premium
                    </Badge>
                  </div>
                )}
              </div>

              {/* Vendor Details */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white logo-3d-premium font-serif">
                    {mockVendor.name}
                  </h1>
                  {mockVendor.verified && (
                    <Verified className="h-8 w-8 text-blue-400" />
                  )}
                </div>
                <p className="text-lg text-slate-200 mb-4 max-w-2xl">
                  {mockVendor.description}
                </p>
                <div className="flex items-center gap-6 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">{mockVendor.rating}</span>
                    <span>({mockVendor.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{mockVendor.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{mockVendor.followers.toLocaleString()} followers</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setIsFollowing(!isFollowing)}
                  variant={isFollowing ? "outline" : "default"}
                  className={`btn-premium ${
                    isFollowing 
                      ? 'bg-transparent border-white text-white hover:bg-white/10' 
                      : ''
                  }`}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <Card className="premium-card">
              <CardContent className="p-6">
                <h3 className={`font-bold text-lg mb-4 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Store Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-yellow-400' : 'text-blue-600'
                    }`}>
                      {mockVendor.totalProducts}
                    </div>
                    <div className="text-sm text-slate-500">Products</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-yellow-400' : 'text-blue-600'
                    }`}>
                      {mockVendor.totalServices}
                    </div>
                    <div className="text-sm text-slate-500">Services</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                    }`}>
                      {(mockVendor.totalSales / 1000).toFixed(1)}K
                    </div>
                    <div className="text-sm text-slate-500">Sales</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                    }`}>
                      {mockVendor.rating}
                    </div>
                    <div className="text-sm text-slate-500">Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="premium-card">
              <CardContent className="p-6">
                <h3 className={`font-bold text-lg mb-4 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <span className="text-sm">{mockVendor.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <span className="text-sm">{mockVendor.email}</span>
                  </div>
                  {mockVendor.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-slate-500" />
                      <a 
                        href={mockVendor.website} 
                        className={`text-sm hover:underline ${
                          isDarkMode ? 'text-yellow-400' : 'text-blue-600'
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-slate-500" />
                    <span className="text-sm">Response: {mockVendor.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="h-4 w-4 text-slate-500" />
                    <span className="text-sm">Shipping: {mockVendor.fulfillmentTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card className="premium-card">
              <CardContent className="p-6">
                <h3 className={`font-bold text-lg mb-4 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Specialties
                </h3>
                <div className="flex flex-wrap gap-2">
                  {mockVendor.specialties.map((specialty) => (
                    <Badge 
                      key={specialty} 
                      variant="outline"
                      className={`${
                        isDarkMode 
                          ? 'border-yellow-400/30 text-yellow-400 bg-yellow-400/5' 
                          : 'border-blue-400/30 text-blue-600 bg-blue-400/5'
                      }`}
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="premium-card">
              <CardContent className="p-6">
                <h3 className={`font-bold text-lg mb-4 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Certifications
                </h3>
                <div className="space-y-2">
                  {mockVendor.certifications.map((cert) => (
                    <div key={cert} className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className={`grid w-full grid-cols-4 ${
                isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
              }`}>
                <TabsTrigger value="products">Products & Services</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="policies">Policies</TabsTrigger>
              </TabsList>

              <TabsContent value="products" className="space-y-6">
                {/* Filters and View Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span className="text-sm font-medium">Filter:</span>
                    </div>
                    <div className="flex gap-2">
                      {[
                        { key: 'all', label: 'All' },
                        { key: 'featured', label: 'Featured', icon: Crown },
                        { key: 'products', label: 'Products' },
                        { key: 'services', label: 'Services' }
                      ].map((filter) => (
                        <Button
                          key={filter.key}
                          variant={filterBy === filter.key ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilterBy(filter.key as any)}
                          className={`text-xs ${
                            filterBy === filter.key 
                              ? 'btn-premium' 
                              : isDarkMode 
                                ? 'bg-slate-800/50 text-slate-300 border-slate-600' 
                                : 'bg-white/50 text-slate-700 border-slate-300'
                          }`}
                        >
                          {filter.icon && <filter.icon className="h-3 w-3 mr-1" />}
                          {filter.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
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
                  </div>
                </div>

                {/* Products Grid */}
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {filteredProducts.map((product, index) => (
                    <Card key={product.id} className="premium-card group overflow-hidden">
                      <div className={`relative overflow-hidden ${
                        viewMode === 'list' ? 'aspect-[16/9] md:aspect-[4/3]' : 'aspect-[4/3]'
                      }`}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Product Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.featured && (
                            <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 shadow-lg">
                              <Crown className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                          {product.bestseller && (
                            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Bestseller
                            </Badge>
                          )}
                        </div>

                        <div className="absolute top-3 right-3">
                          <Badge variant="outline" className={`text-xs ${
                            isDarkMode ? 'bg-slate-800/80 border-slate-600' : 'bg-white/80 border-slate-300'
                          }`}>
                            {product.type === 'service' ? 'Service' : 'Product'}
                          </Badge>
                        </div>

                        {/* Quick Actions */}
                        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 bg-white/90 backdrop-blur-xl border-0 hover:bg-white text-slate-900 text-xs"
                            >
                              <Heart className="h-3 w-3 mr-1" />
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 bg-white/90 backdrop-blur-xl border-0 hover:bg-white text-slate-900 text-xs"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <div className="mb-3">
                          <h3 className={`font-bold text-lg line-clamp-2 leading-tight mb-2 ${
                            isDarkMode ? 'text-white' : 'text-slate-900'
                          }`}>
                            {product.name}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <span className={`text-xl font-bold ${
                            isDarkMode ? 'text-yellow-400' : 'text-blue-600'
                          }`}>
                            K{product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-slate-400 line-through">
                              K{product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-sm mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="font-medium">{product.rating}</span>
                            <span className="text-slate-500">({product.reviews})</span>
                          </div>
                          <span className={`text-xs ${
                            product.inStock ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            className="btn-premium flex-1 text-sm"
                            disabled={!product.inStock}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {product.type === 'service' ? 'Book Now' : 'Add to Cart'}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className={`px-3 border-2 ${
                              isDarkMode 
                                ? 'border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10' 
                                : 'border-blue-400/30 text-blue-600 hover:bg-blue-400/10'
                            }`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="about" className="space-y-6">
                <Card className="premium-card">
                  <CardContent className="p-6">
                    <h3 className={`font-bold text-2xl mb-4 ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      About {mockVendor.name}
                    </h3>
                    <p className={`text-lg leading-relaxed mb-6 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {mockVendor.bio}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className={`font-semibold text-lg mb-3 ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          Store Badges
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {mockVendor.badges.map((badge) => (
                            <Badge 
                              key={badge} 
                              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                            >
                              <Award className="h-3 w-3 mr-1" />
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className={`font-semibold text-lg mb-3 ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          Member Since
                        </h4>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-slate-500" />
                          <span>{new Date(mockVendor.joinedDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card className="premium-card">
                  <CardContent className="p-6">
                    <h3 className={`font-bold text-2xl mb-6 ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      Customer Reviews
                    </h3>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div className="text-center">
                        <div className={`text-4xl font-bold ${
                          isDarkMode ? 'text-yellow-400' : 'text-blue-600'
                        }`}>
                          {mockVendor.rating}
                        </div>
                        <div className="flex items-center justify-center gap-1 my-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${
                                i < Math.floor(mockVendor.rating) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-slate-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <div className="text-sm text-slate-500">
                          Based on {mockVendor.reviewCount} reviews
                        </div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((stars) => {
                            const percentage = stars === 5 ? 78 : stars === 4 ? 15 : stars === 3 ? 5 : stars === 2 ? 1 : 1;
                            return (
                              <div key={stars} className="flex items-center gap-3">
                                <span className="text-sm w-8">{stars}★</span>
                                <div className="flex-1 bg-slate-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      isDarkMode ? 'bg-yellow-400' : 'bg-blue-500'
                                    }`}
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-slate-500 w-10">{percentage}%</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-slate-500">
                        Customer reviews help others learn about products and services.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="policies" className="space-y-6">
                <Card className="premium-card">
                  <CardContent className="p-6">
                    <h3 className={`font-bold text-2xl mb-6 ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      Store Policies
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className={`font-semibold text-lg mb-3 ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          Shipping & Delivery
                        </h4>
                        <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          We offer secure shipping within Zambia and internationally. Standard delivery takes 3-5 business days, 
                          while premium express delivery is available for urgent orders.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className={`font-semibold text-lg mb-3 ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          Returns & Exchanges
                        </h4>
                        <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          We accept returns within 14 days of delivery for unused items in original packaging. 
                          Custom or personalized items may not be eligible for return.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className={`font-semibold text-lg mb-3 ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          Quality Guarantee
                        </h4>
                        <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          All our products come with a quality guarantee. If you're not satisfied with your purchase, 
                          please contact us within 7 days for a resolution.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
