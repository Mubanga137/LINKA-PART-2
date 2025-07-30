"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  Star,
  MapPin,
  Shield,
  Crown,
  Truck,
  Clock
} from "lucide-react";
import type { Vendor } from "@/lib/types";
import { VendorsGrid } from "@/components/marketplace/VendorsGrid";
import { MarketingView } from "@/components/marketing/MarketingView";
import styles from "@/styles/marketplace.module.scss";

// Enhanced vendor data with realistic information
const vendors: Vendor[] = [
  {
    id: "artisan-baskets-co",
    name: "Artisan Baskets Co.",
    tagline: "Handwoven goods by local makers",
    rating: 4.8,
    reviewCount: 127,
    productImageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1600&auto=format&fit=crop",
    vendorImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    pricePreview: "From ZMW 95",
    href: "/vendors/artisan-baskets-co",
    categories: ["Home & Garden", "Handmade", "Decor", "Traditional Crafts"],
    location: "Lusaka",
    isVerified: true,
    isFeatured: true,
    deliveryTime: "2-3 days",
    discount: "15% OFF"
  },
  {
    id: "fresh-valley-organics",
    name: "Fresh Valley Organics",
    tagline: "Farm‑fresh organic produce delivered daily",
    rating: 4.9,
    reviewCount: 243,
    productImageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop",
    vendorImageUrl: "https://images.unsplash.com/photo-1574263867128-b7d5c6f62ad1?q=80&w=200&auto=format&fit=crop",
    pricePreview: "Bundles from ZMW 45",
    href: "/vendors/fresh-valley-organics",
    categories: ["Grocery", "Organic", "Fresh Produce", "Health"],
    location: "Ndola",
    isVerified: true,
    isFeatured: false,
    deliveryTime: "Same day"
  },
  {
    id: "zamtech-solutions",
    name: "ZamTech Solutions",
    tagline: "Cutting-edge technology at affordable prices",
    rating: 4.6,
    reviewCount: 89,
    productImageUrl: "https://images.unsplash.com/photo-1593062096033-9a26b2aa28ba?q=80&w=1600&auto=format&fit=crop",
    vendorImageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&auto=format&fit=crop",
    pricePreview: "From ZMW 120",
    href: "/vendors/zamtech-solutions",
    categories: ["Electronics", "Mobile", "Computers", "Accessories"],
    location: "Kitwe",
    isVerified: true,
    isFeatured: false,
    deliveryTime: "1-2 days"
  },
  {
    id: "copper-style-boutique",
    name: "Copper Style Boutique",
    tagline: "Contemporary African fashion with modern flair",
    rating: 4.7,
    reviewCount: 156,
    productImageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1600&auto=format&fit=crop",
    vendorImageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=200&auto=format&fit=crop",
    pricePreview: "From ZMW 85",
    href: "/vendors/copper-style-boutique",
    categories: ["Fashion", "Women's Clothing", "African Fashion", "Accessories"],
    location: "Lusaka",
    isVerified: true,
    isFeatured: true,
    deliveryTime: "2-4 days",
    discount: "Buy 2 Get 1"
  },
  {
    id: "mama-chamas-kitchen",
    name: "Mama Chama's Kitchen",
    tagline: "Authentic Zambian cuisine and ready meals",
    rating: 4.8,
    reviewCount: 203,
    productImageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=1600&auto=format&fit=crop",
    vendorImageUrl: "https://images.unsplash.com/photo-1595257841889-eca2678454e2?q=80&w=200&auto=format&fit=crop",
    pricePreview: "Meals from ZMW 25",
    href: "/vendors/mama-chamas-kitchen",
    categories: ["Food & Beverages", "Ready Meals", "Local Cuisine", "Catering"],
    location: "Ndola",
    isVerified: true,
    isFeatured: false,
    deliveryTime: "30-45 min"
  },
  {
    id: "wellness-garden-spa",
    name: "Wellness Garden Spa",
    tagline: "Natural beauty products and wellness services",
    rating: 4.9,
    reviewCount: 178,
    productImageUrl: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=1600&auto=format&fit=crop",
    vendorImageUrl: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=80&w=200&auto=format&fit=crop",
    pricePreview: "From ZMW 65",
    href: "/vendors/wellness-garden-spa",
    categories: ["Beauty & Wellness", "Natural Products", "Skincare", "Services"],
    location: "Livingstone",
    isVerified: true,
    isFeatured: false,
    deliveryTime: "2-3 days"
  },
  {
    id: "creative-minds-education",
    name: "Creative Minds Education",
    tagline: "Educational toys and learning materials",
    rating: 4.7,
    reviewCount: 92,
    productImageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1600&auto=format&fit=crop",
    vendorImageUrl: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=200&auto=format&fit=crop",
    pricePreview: "From ZMW 35",
    href: "/vendors/creative-minds-education",
    categories: ["Education", "Toys", "Children", "Learning"],
    location: "Lusaka",
    isVerified: true,
    isFeatured: false,
    deliveryTime: "1-3 days"
  },
  {
    id: "baobab-furniture-works",
    name: "Baobab Furniture Works",
    tagline: "Handcrafted furniture from sustainable materials",
    rating: 4.8,
    reviewCount: 67,
    productImageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1600&auto=format&fit=crop",
    vendorImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    pricePreview: "From ZMW 450",
    href: "/vendors/baobab-furniture-works",
    categories: ["Furniture", "Home & Garden", "Handmade", "Sustainable"],
    location: "Kitwe",
    isVerified: true,
    isFeatured: true,
    deliveryTime: "5-7 days"
  }
];

export default function MarketplacePage() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (vendor: Vendor) => {
    setCartCount(prev => prev + 1);
    // Here you would integrate with your cart store or API
    console.log("Added to cart:", vendor.name);
    
    // Show a temporary success message (you might want to use a toast library)
    if (typeof window !== 'undefined') {
      const notification = document.createElement('div');
      notification.textContent = `${vendor.name} added to cart!`;
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all';
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  };

  const featuredVendors = vendors.filter(v => v.isFeatured);
  const totalReviews = vendors.reduce((sum, vendor) => sum + (vendor.reviewCount || 0), 0);
  const averageRating = vendors.reduce((sum, vendor) => sum + (vendor.rating || 0), 0) / vendors.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <main className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-green-100 px-6 py-3 text-sm border border-blue-200">
              <ShoppingBag className="mr-2 h-4 w-4 text-blue-600" />
              <span className="text-blue-800 font-medium">🛍️ Zambia's Premier Marketplace</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
              Discover Local
              <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Businesses & Services
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Connect with verified local vendors, discover unique products, and support 
              Zambian businesses. From handmade crafts to fresh produce, find everything you need.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className={`${styles.card} p-6 text-center hover:shadow-lg transition-all`}>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{vendors.length}+</div>
              <div className="text-sm text-slate-600">Active Vendors</div>
            </div>
            
            <div className={`${styles.card} p-6 text-center hover:shadow-lg transition-all`}>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{averageRating.toFixed(1)}</div>
              <div className="text-sm text-slate-600">Avg Rating</div>
            </div>
            
            <div className={`${styles.card} p-6 text-center hover:shadow-lg transition-all`}>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{totalReviews}</div>
              <div className="text-sm text-slate-600">Reviews</div>
            </div>
            
            <div className={`${styles.card} p-6 text-center hover:shadow-lg transition-all`}>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Truck className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">24/7</div>
              <div className="text-sm text-slate-600">Delivery</div>
            </div>
          </div>
        </section>

        {/* Marketing Section */}
        <MarketingView data={{ revenue: { growth: 0.182 } }} />

        {/* Featured Vendors Section */}
        {featuredVendors.length > 0 && (
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 text-sm border border-orange-200">
                <Crown className="mr-2 h-4 w-4 text-orange-600" />
                <span className="text-orange-800 font-medium">Featured Partners</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900">
                Spotlight Vendors
              </h2>
              <p className="text-slate-600">
                Hand-picked businesses offering exceptional products and services
              </p>
            </div>

            <VendorsGrid
              vendors={featuredVendors}
              onAddToCart={handleAddToCart}
              showFilters={false}
              title=""
              description=""
            />
          </section>
        )}

        {/* Main Vendors Grid */}
        <VendorsGrid 
          vendors={vendors} 
          onAddToCart={handleAddToCart}
          title="All Marketplace Vendors"
          description="Browse our complete directory of verified local businesses"
        />

        {/* Call to Action Section */}
        <section className={`${styles.card} bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 p-8 md:p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Selling?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Join hundreds of successful vendors on Zambia's fastest-growing marketplace. 
              Start your online business today with zero setup fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl shadow-lg"
              >
                Become a Vendor
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold px-8 py-4 rounded-xl"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
