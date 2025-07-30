"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingBag, 
  Star,
  Users,
  ShoppingCart,
  Store,
  MapPin,
  Shield,
  Heart,
  Share2
} from "lucide-react";
import type { Vendor } from "@/lib/types";
import { VendorCard } from "@/components/marketplace/VendorCard";
import { MarketingView } from "@/components/marketing/MarketingView";

// Simple test vendor data
const testVendor: Vendor = {
  id: "test-vendor",
  name: "Test Artisan Shop",
  tagline: "Quality handmade products from local artisans",
  rating: 4.8,
  reviewCount: 127,
  productImageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
  vendorImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  pricePreview: "From ZMW 95",
  href: "/vendors/test-vendor",
  categories: ["Home & Garden", "Handmade", "Decor"],
  location: "Lusaka",
  isVerified: true,
  isFeatured: true,
  deliveryTime: "2-3 days",
  discount: "15% OFF"
};

export default function TestMarketplacePage() {
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState(new Set<string>());

  const handleAddToCart = (vendor: Vendor) => {
    setCartCount(prev => prev + 1);
    console.log("Added to cart:", vendor.name);
  };

  const handleToggleFavorite = (vendorId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(vendorId)) {
        newFavorites.delete(vendorId);
      } else {
        newFavorites.add(vendorId);
      }
      return newFavorites;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <main className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-green-100 px-6 py-3 text-sm border border-blue-200">
              <ShoppingBag className="mr-2 h-4 w-4 text-blue-600" />
              <span className="text-blue-800 font-medium">🛍️ Marketplace Test Page</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
              Test Marketplace
              <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Components
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Testing the new marketplace UI components with enhanced styling and functionality.
            </p>
          </div>

          {/* Cart Counter */}
          {cartCount > 0 && (
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full border border-green-200">
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span className="font-medium">{cartCount} items in cart</span>
            </div>
          )}
        </section>

        {/* Marketing Component Test */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Marketing Component</h2>
          <MarketingView data={{ revenue: { growth: 0.182 } }} />
        </section>

        {/* Vendor Card Test */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Vendor Card Component</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl">
            <VendorCard
              vendor={testVendor}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={favorites.has(testVendor.id)}
            />
            
            {/* Additional test cards with variations */}
            <VendorCard
              vendor={{
                ...testVendor,
                id: "test-vendor-2",
                name: "Fresh Produce Co.",
                tagline: "Farm-fresh organic vegetables",
                rating: 4.9,
                reviewCount: 203,
                productImageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop",
                pricePreview: "From ZMW 25",
                categories: ["Grocery", "Organic", "Fresh"],
                location: "Ndola",
                isFeatured: false,
                discount: undefined
              }}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={favorites.has("test-vendor-2")}
            />

            <VendorCard
              vendor={{
                ...testVendor,
                id: "test-vendor-3",
                name: "Tech Solutions",
                tagline: "Modern electronics and gadgets",
                rating: 4.6,
                reviewCount: 89,
                productImageUrl: "https://images.unsplash.com/photo-1593062096033-9a26b2aa28ba?q=80&w=800&auto=format&fit=crop",
                pricePreview: "From ZMW 120",
                categories: ["Electronics", "Tech"],
                location: "Kitwe",
                isVerified: false,
                isFeatured: false,
                discount: undefined
              }}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={favorites.has("test-vendor-3")}
            />
          </div>
        </section>

        {/* Component Features Test */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">UI Components Test</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Buttons Test */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">Button Styles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  Primary Button
                </Button>
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                  Secondary Button
                </Button>
                <Button variant="outline" className="w-full">
                  Outline Button
                </Button>
              </CardContent>
            </Card>

            {/* Badges Test */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">Badge Variants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    <Star className="h-3 w-3 mr-1" />
                    4.8 Rating
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                    <MapPin className="h-3 w-3 mr-1" />
                    Lusaka
                  </Badge>
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                    15% OFF
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">Stats Display</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">127</div>
                  <div className="text-sm text-slate-600">Total Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">4.8★</div>
                  <div className="text-sm text-slate-600">Average Rating</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Interactive Elements Test */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Interactive Features</h2>
          
          <Card className="p-6">
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700"
                  onClick={() => handleToggleFavorite("demo")}
                >
                  <Heart className={`h-4 w-4 ${favorites.has("demo") ? "fill-red-500 text-red-500" : ""}`} />
                  Favorite
                </Button>
                
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2"
                  onClick={() => navigator.share?.({ title: "Test Share" })}
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2"
                >
                  <Store className="h-4 w-4" />
                  Visit Store
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
