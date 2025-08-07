"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { OptimizedProductCard3D } from "@/components/marketplace/OptimizedProductCard3D";
import { MarketplaceProvider, useCart, useFavorites } from "@/contexts/marketplace-context";
import type { Product } from "@/lib/types";
import { Flame, Clock, ShoppingBag } from "lucide-react";
import Link from "next/link";

// Import hot deals products (you would typically fetch these from an API)
const hotDealsProducts: Product[] = [
  {
    id: "30",
    name: "Gaming Headset Pro",
    description: "Professional gaming headset with 7.1 surround sound and noise cancellation",
    price: 79.99,
    originalPrice: 149.99,
    images: ["https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=800&q=80"],
    category: "Electronics",
    inStock: true,
    stockQuantity: 25,
    rating: 4.8,
    reviewCount: 189,
    tags: ["gaming", "headset", "audio", "pro"],
    vendor: { id: "v27", name: "Gaming World Zambia", logo: "" },
    discountPercentage: 47,
    featured: true,
    fastDelivery: true,
    freeShipping: true,
    hotDeal: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "31",
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracker with heart rate monitoring and GPS",
    price: 159.99,
    originalPrice: 299.99,
    images: ["https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&q=80"],
    category: "Electronics",
    inStock: true,
    stockQuantity: 15,
    rating: 4.7,
    reviewCount: 245,
    tags: ["smartwatch", "fitness", "tracker", "health"],
    vendor: { id: "v28", name: "Wearable Tech Zambia", logo: "" },
    discountPercentage: 47,
    featured: true,
    fastDelivery: true,
    freeShipping: true,
    hotDeal: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "32",
    name: "Designer Handbag Collection",
    description: "Luxury designer handbag made from genuine leather",
    price: 89.99,
    originalPrice: 179.99,
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"],
    category: "Fashion",
    inStock: true,
    stockQuantity: 8,
    rating: 4.9,
    reviewCount: 87,
    tags: ["handbag", "designer", "leather", "luxury"],
    vendor: { id: "v29", name: "Luxury Fashion Zambia", logo: "" },
    discountPercentage: 50,
    featured: true,
    freeShipping: true,
    hotDeal: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "33",
    name: "Wireless Charging Station",
    description: "Multi-device wireless charging station for phones, watches, and earbuds",
    price: 49.99,
    originalPrice: 99.99,
    images: ["https://images.unsplash.com/photo-1601972602237-8c79241e468b?w=800&q=80"],
    category: "Electronics",
    inStock: true,
    stockQuantity: 30,
    rating: 4.6,
    reviewCount: 156,
    tags: ["wireless", "charging", "station", "multi-device"],
    vendor: { id: "v30", name: "Tech Accessories Zambia", logo: "" },
    discountPercentage: 50,
    featured: true,
    fastDelivery: true,
    freeShipping: true,
    hotDeal: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

function HotDealsContent() {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <Header />
      
      <main className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Hot Deals Hero Section */}
        <section className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-red-100 to-orange-100 px-6 py-3 text-sm border border-red-200/50">
            <Flame className="mr-2 h-5 w-5 text-red-600" />
            <span className="text-red-800 font-medium">🔥 Exclusive Hot Deals</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            <span className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Unbeatable Deals
            </span>
            <br />
            Limited Time Only!
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Don't miss out on these incredible discounts. Up to 50% off on selected items from verified local vendors.
          </p>

          <div className="flex items-center justify-center gap-4 text-sm text-red-600">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span className="font-semibold">Hurry! Limited quantity available</span>
            </div>
          </div>
        </section>

        {/* Hot Deals Stats */}
        <section className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-red-200 text-center">
              <div className="text-2xl font-bold text-red-600">50%</div>
              <div className="text-sm text-gray-600">Max Discount</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-orange-200 text-center">
              <div className="text-2xl font-bold text-orange-600">{hotDealsProducts.length}</div>
              <div className="text-sm text-gray-600">Hot Items</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-yellow-200 text-center">
              <div className="text-2xl font-bold text-yellow-600">24h</div>
              <div className="text-sm text-gray-600">Time Left</div>
            </div>
          </div>
        </section>

        {/* Hot Deals Products Grid */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Hot Deals</h2>
            <Link href="/marketplace">
              <Button variant="outline" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Browse All Products
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-4 md:gap-4 lg:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {hotDealsProducts.map((product, index) => (
              <OptimizedProductCard3D
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite(product.id)}
                priority={index < 4}
                showVisitStore={false} // Disable Visit Store for flash sale items
                index={index}
              />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white relative overflow-hidden rounded-2xl p-6 sm:p-8 text-center">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">
              More Deals Coming Soon!
            </h2>
            <p className="text-lg opacity-90">
              Subscribe to our newsletter to get notified about upcoming hot deals and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/marketplace">
                <Button 
                  size="lg" 
                  className="bg-white text-red-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl"
                >
                  Explore Marketplace
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function HotDealsPage() {
  return (
    <MarketplaceProvider>
      <HotDealsContent />
    </MarketplaceProvider>
  );
}
