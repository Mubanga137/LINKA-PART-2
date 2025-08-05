"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, 
  MapPin, 
  Clock, 
  Shield, 
  Truck, 
  Heart, 
  ShoppingCart, 
  Search, 
  Filter,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink,
  Verified,
  Package,
  Users,
  Calendar,
  TrendingUp,
  Award
} from "lucide-react";
import type { Product, Vendor } from "@/lib/types";
import { OptimizedProductCard } from "@/components/marketplace/OptimizedProductCard";
import { VendorService, type VendorDetails } from "@/services/vendor-service";

interface VendorStorefrontPageProps {
  params: {
    storeId: string;
  };
}

// Mock vendor data - replace with actual API call
const generateVendorData = (storeId: string): Vendor & {
  fullDescription: string;
  businessType: string;
  joinDate: string;
  responseTime: string;
  successRate: number;
  totalSales: number;
  contactInfo: {
    phone?: string;
    email?: string;
    website?: string;
  };
  policies: {
    returns: string;
    shipping: string;
    warranty: string;
  };
  businessHours: {
    weekdays: string;
    weekends: string;
  };
} | null => {
  const vendors = [
    {
      id: "lusaka-crafts-co",
      name: "Lusaka Crafts & Co.",
      tagline: "Traditional Zambian crafts and modern designs for your home",
      fullDescription: "We are a family-owned business specializing in authentic Zambian crafts, traditional artwork, and modern home decor pieces. Our artisans use locally sourced materials and time-honored techniques passed down through generations.",
      businessType: "Traditional Crafts & Home Decor",
      rating: 4.8,
      reviewCount: 127,
      productImageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=400&fit=crop",
      vendorImageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b830?w=150&h=150&fit=crop&crop=face",
      pricePreview: "From K50",
      href: `/vendors/lusaka-crafts-co`,
      categories: ["Traditional Crafts", "Home Decor", "Art"],
      location: "Lusaka, Zambia",
      isVerified: true,
      isFeatured: true,
      deliveryTime: "2-3 days",
      joinDate: "March 2022",
      responseTime: "< 1 hour",
      successRate: 98.5,
      totalSales: 1247,
      contactInfo: {
        phone: "+260 97 123 4567",
        email: "hello@lusakacrafts.zm",
        website: "www.lusakacrafts.zm"
      },
      policies: {
        returns: "30-day return policy for unused items",
        shipping: "Free shipping on orders over K200",
        warranty: "6-month quality guarantee on all crafts"
      },
      businessHours: {
        weekdays: "8:00 AM - 6:00 PM",
        weekends: "9:00 AM - 4:00 PM"
      }
    },
    {
      id: "fresh-valley-farm",
      name: "Fresh Valley Farm",
      tagline: "Organic produce directly from our family farm to your table",
      fullDescription: "Fresh Valley Farm has been serving the Lusaka community with premium organic produce for over 15 years. We practice sustainable farming methods and guarantee the freshest fruits and vegetables.",
      businessType: "Organic Farm & Produce",
      rating: 4.6,
      reviewCount: 89,
      productImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      vendorImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      pricePreview: "From K15",
      href: `/vendors/fresh-valley-farm`,
      categories: ["Fresh Produce", "Organic", "Vegetables", "Fruits"],
      location: "Lusaka, Zambia",
      isVerified: true,
      isFeatured: false,
      deliveryTime: "Same day",
      joinDate: "January 2021",
      responseTime: "< 2 hours",
      successRate: 97.2,
      totalSales: 892,
      contactInfo: {
        phone: "+260 97 234 5678",
        email: "orders@freshvalley.zm"
      },
      policies: {
        returns: "Fresh produce exchanges within 24 hours",
        shipping: "Same-day delivery available",
        warranty: "Freshness guaranteed"
      },
      businessHours: {
        weekdays: "6:00 AM - 7:00 PM",
        weekends: "6:00 AM - 5:00 PM"
      }
    },
    {
      id: "zambian-fashion-house",
      name: "Zambian Fashion House",
      tagline: "Contemporary African fashion with traditional elements",
      fullDescription: "Zambian Fashion House creates stunning contemporary African fashion pieces that celebrate our rich cultural heritage while embracing modern trends. Each piece is carefully crafted by skilled local designers.",
      businessType: "Fashion & Textiles",
      rating: 4.9,
      reviewCount: 203,
      productImageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop",
      vendorImageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      pricePreview: "From K120",
      href: `/vendors/zambian-fashion-house`,
      categories: ["Fashion", "Textiles", "Chitenge", "Custom Tailoring"],
      location: "Lusaka, Zambia",
      isVerified: true,
      isFeatured: true,
      discount: "20% OFF",
      deliveryTime: "3-5 days",
      joinDate: "August 2020",
      responseTime: "< 30 mins",
      successRate: 99.1,
      totalSales: 1567,
      contactInfo: {
        phone: "+260 97 345 6789",
        email: "info@zambianfashion.zm",
        website: "www.zambianfashionhouse.zm"
      },
      policies: {
        returns: "14-day return policy with tags attached",
        shipping: "Free alterations for online orders",
        warranty: "Quality guarantee on all garments"
      },
      businessHours: {
        weekdays: "9:00 AM - 7:00 PM",
        weekends: "10:00 AM - 5:00 PM"
      }
    }
  ];

  return vendors.find(v => v.id === storeId) || null;
};

// Mock products data for vendor
const generateVendorProducts = (vendorId: string): Product[] => {
  const baseProducts = [
    {
      name: "Handwoven Basket Set",
      description: "Beautiful traditional baskets perfect for storage and decoration",
      price: 85.00,
      originalPrice: 100.00,
      images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop"],
      category: "Traditional Crafts",
      tags: ["handmade", "traditional", "storage"]
    },
    {
      name: "Wooden Sculpture Collection",
      description: "Authentic Zambian wooden sculptures carved by local artisans",
      price: 150.00,
      images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop"],
      category: "Art",
      tags: ["wooden", "sculpture", "art", "handmade"]
    },
    {
      name: "Organic Vegetable Box",
      description: "Fresh seasonal vegetables harvested daily from our farm",
      price: 45.00,
      images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop"],
      category: "Fresh Produce",
      tags: ["organic", "fresh", "vegetables", "healthy"]
    },
    {
      name: "Chitenge Dress",
      description: "Elegant traditional Chitenge dress with modern styling",
      price: 180.00,
      originalPrice: 220.00,
      images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop"],
      category: "Fashion",
      tags: ["chitenge", "dress", "traditional", "fashion"]
    }
  ];

  return baseProducts.map((product, index) => ({
    id: `${vendorId}-product-${index + 1}`,
    ...product,
    inStock: true,
    stockQuantity: Math.floor(Math.random() * 20) + 5,
    rating: 4.0 + Math.random() * 1.0,
    reviewCount: Math.floor(Math.random() * 50) + 10,
    vendor: {
      id: vendorId,
      name: generateVendorData(vendorId)?.name || "Unknown Vendor"
    },
    featured: index < 2,
    discountPercentage: product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : undefined,
    freeShipping: Math.random() > 0.5,
    createdAt: new Date(),
    updatedAt: new Date()
  }));
};

export default function VendorStorefrontPage({ params }: VendorStorefrontPageProps) {
  const [vendor, setVendor] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFollowing, setIsFollowing] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadVendorData = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const vendorData = generateVendorData(params.storeId);
      if (!vendorData) {
        notFound();
      }
      
      setVendor(vendorData);
      setProducts(generateVendorProducts(params.storeId));
      setLoading(false);
    };

    loadVendorData();
  }, [params.storeId]);

  const handleAddToCart = (product: Product) => {
    console.log("Adding to cart:", product);
    // Implement cart logic
  };

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="animate-pulse space-y-8 pt-8">
          <div className="h-64 bg-slate-200 rounded-lg mx-4"></div>
          <div className="mx-4 space-y-4">
            <div className="h-8 bg-slate-200 rounded w-1/3"></div>
            <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-96 bg-slate-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!vendor) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Vendor Banner */}
      <div className="relative h-80 overflow-hidden">
        <Image
          src={vendor.productImageUrl}
          alt={`${vendor.name} cover`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>
        
        {/* Vendor Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto flex items-end gap-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={vendor.vendorImageUrl} alt={vendor.name} />
              <AvatarFallback className="text-2xl">{vendor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">{vendor.name}</h1>
                {vendor.isVerified && (
                  <Badge className="bg-blue-600 text-white flex items-center gap-1">
                    <Verified className="h-4 w-4" />
                    Verified
                  </Badge>
                )}
                {vendor.isFeatured && (
                  <Badge className="bg-yellow-600 text-white flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    Featured
                  </Badge>
                )}
              </div>
              
              <p className="text-xl mb-3 opacity-90">{vendor.tagline}</p>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-semibold">{vendor.rating}</span>
                  <span className="opacity-75">({vendor.reviewCount} reviews)</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{vendor.location}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Response: {vendor.responseTime}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>{vendor.successRate}% success rate</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={() => setIsFollowing(!isFollowing)}
                variant={isFollowing ? "default" : "secondary"}
                className={isFollowing ? "bg-red-600 hover:bg-red-700" : "bg-white text-black hover:bg-gray-100"}
              >
                <Heart className={`h-4 w-4 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
              
              <Button className="bg-blue-600 hover:bg-blue-700">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Vendor
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Store Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Business Type</p>
                    <p className="font-medium">{vendor.businessType}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Member Since</p>
                    <p className="font-medium flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {vendor.joinDate}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Sales</p>
                    <p className="font-medium flex items-center gap-1">
                      <Package className="h-4 w-4" />
                      {vendor.totalSales.toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Delivery Time</p>
                    <p className="font-medium flex items-center gap-1">
                      <Truck className="h-4 w-4" />
                      {vendor.deliveryTime}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
                
                <div className="space-y-3">
                  {vendor.contactInfo.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{vendor.contactInfo.phone}</span>
                    </div>
                  )}
                  
                  {vendor.contactInfo.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{vendor.contactInfo.email}</span>
                    </div>
                  )}
                  
                  {vendor.contactInfo.website && (
                    <div className="flex items-center gap-3">
                      <ExternalLink className="h-4 w-4 text-gray-500" />
                      <a href={`https://${vendor.contactInfo.website}`} target="_blank" rel="noopener noreferrer" 
                         className="text-sm text-blue-600 hover:underline">
                        {vendor.contactInfo.website}
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Business Hours</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Weekdays</span>
                    <span className="text-sm font-medium">{vendor.businessHours.weekdays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Weekends</span>
                    <span className="text-sm font-medium">{vendor.businessHours.weekends}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="products" className="mt-6">
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <OptimizedProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={favorites.has(product.id)}
                      priority={index < 3}
                    />
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No products found matching your criteria.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl mb-4">About {vendor.name}</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">{vendor.fullDescription}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Categories</h4>
                        <div className="flex flex-wrap gap-2">
                          {vendor.categories.map((category: string) => (
                            <Badge key={category} variant="secondary">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3">Store Policies</h4>
                        <div className="space-y-2 text-sm">
                          <p><strong>Returns:</strong> {vendor.policies.returns}</p>
                          <p><strong>Shipping:</strong> {vendor.policies.shipping}</p>
                          <p><strong>Warranty:</strong> {vendor.policies.warranty}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold text-xl">Customer Reviews</h3>
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="text-lg font-semibold">{vendor.rating}</span>
                        <span className="text-gray-600">({vendor.reviewCount} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="text-center py-12 text-gray-600">
                      <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Reviews and ratings will be displayed here.</p>
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
