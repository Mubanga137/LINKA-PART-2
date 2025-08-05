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

// Data will be fetched using VendorService

export default function VendorStorefrontPage({ params }: VendorStorefrontPageProps) {
  const [vendor, setVendor] = useState<VendorDetails | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFollowing, setIsFollowing] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadVendorData = async () => {
      setLoading(true);

      try {
        // Fetch vendor data
        const vendorData = await VendorService.getVendorById(params.storeId);
        if (!vendorData) {
          notFound();
        }

        // Fetch vendor products
        const vendorProducts = await VendorService.getVendorProducts(params.storeId);

        setVendor(vendorData);
        setProducts(vendorProducts);
      } catch (error) {
        console.error("Error loading vendor data:", error);
        notFound();
      } finally {
        setLoading(false);
      }
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
