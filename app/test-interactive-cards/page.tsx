"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Monitor, Tablet } from "lucide-react";
import { InteractiveProductCard } from "@/components/marketplace/InteractiveProductCard";
import { InteractiveVendorCard } from "@/components/marketplace/InteractiveVendorCard";

// Mock data for testing
const testProducts = [
  {
    id: "test-prod-1",
    name: "Traditional Ankara Dress",
    price: 120,
    originalPrice: 160,
    images: ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop"],
    vendor: {
      id: "vendor-1",
      name: "Zambian Elegance"
    },
    rating: 4.8,
    reviewCount: 127,
    description: "Beautiful handcrafted Ankara dress made from premium cotton with authentic African patterns.",
    features: ["Handcrafted", "Premium Cotton", "Local Design"],
    inStock: true,
    stockQuantity: 5,
    freeShipping: true,
    featured: true,
    hotDeal: false,
    discountPercentage: 25
  },
  {
    id: "test-prod-2",
    name: "Men's Formal Suit",
    price: 450,
    originalPrice: undefined,
    images: ["https://images.unsplash.com/photo-1594736797933-d0b22d41044a?w=400&h=500&fit=crop"],
    vendor: {
      id: "vendor-2",
      name: "Gentleman's Corner"
    },
    rating: 4.9,
    reviewCount: 89,
    description: "Premium tailored suit perfect for formal occasions and business meetings.",
    features: ["Tailored Fit", "Premium Wool", "Italian Style"],
    inStock: true,
    stockQuantity: undefined,
    freeShipping: true,
    featured: false,
    hotDeal: true,
    discountPercentage: undefined
  },
  {
    id: "test-prod-3",
    name: "Handwoven Chitenge Fabric",
    price: 35,
    originalPrice: 45,
    images: ["https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=500&fit=crop"],
    vendor: {
      id: "vendor-3",
      name: "Heritage Textiles"
    },
    rating: 4.7,
    reviewCount: 156,
    description: "Authentic handwoven Chitenge fabric with traditional patterns, perfect for cultural attire.",
    features: ["Authentic Pattern", "Pure Cotton", "6 Yards"],
    inStock: false,
    stockQuantity: 0,
    freeShipping: false,
    featured: false,
    hotDeal: false,
    discountPercentage: 22
  }
];

const testVendors = [
  {
    id: "vendor-1",
    name: "Zambian Elegance",
    tagline: "Traditional African fashion with modern elegance",
    productImageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=400&fit=crop",
    vendorImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    href: "/vendors/zambian-elegance",
    rating: 4.8,
    reviewCount: 245,
    location: "Lusaka, Zambia",
    categories: ["Women's Fashion", "Traditional Wear", "Ankara"],
    isVerified: true,
    isFeatured: true,
    discount: "25% OFF",
    pricePreview: "From K50",
    deliveryTime: "2-3 days",
    phone: "+260123456789"
  },
  {
    id: "vendor-2", 
    name: "Tech Innovators",
    tagline: "Latest technology and electronics",
    productImageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
    vendorImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    href: "/vendors/tech-innovators",
    rating: 4.6,
    reviewCount: 178,
    location: "Ndola, Zambia",
    categories: ["Electronics", "Gadgets", "Smartphones"],
    isVerified: true,
    isFeatured: false,
    discount: undefined,
    pricePreview: "From K200",
    deliveryTime: "1-2 days",
    phone: "+260987654321"
  }
];

export default function TestInteractiveCardsPage() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const handleAddToCart = (item: any) => {
    console.log('Adding to cart:', item.name);
    // Show success message or animation
  };

  const getViewportClass = () => {
    switch (viewMode) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      case 'desktop':
      default:
        return 'max-w-7xl mx-auto';
    }
  };

  const getGridClass = () => {
    switch (viewMode) {
      case 'mobile':
        return 'grid-cols-1';
      case 'tablet':
        return 'grid-cols-2';
      case 'desktop':
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interactive Cards Demo
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Test mobile gestures, animations, and responsive design
          </p>
          
          {/* Viewport Selector */}
          <div className="flex justify-center space-x-4 mb-8">
            <Button
              variant={viewMode === 'mobile' ? 'default' : 'outline'}
              onClick={() => setViewMode('mobile')}
              className="flex items-center space-x-2"
            >
              <Smartphone className="h-4 w-4" />
              <span>Mobile</span>
            </Button>
            <Button
              variant={viewMode === 'tablet' ? 'default' : 'outline'}
              onClick={() => setViewMode('tablet')}
              className="flex items-center space-x-2"
            >
              <Tablet className="h-4 w-4" />
              <span>Tablet</span>
            </Button>
            <Button
              variant={viewMode === 'desktop' ? 'default' : 'outline'}
              onClick={() => setViewMode('desktop')}
              className="flex items-center space-x-2"
            >
              <Monitor className="h-4 w-4" />
              <span>Desktop</span>
            </Button>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
            <h3 className="text-lg font-semibold mb-4">Interactive Features:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Mobile Gestures:</h4>
                <ul className="space-y-1">
                  <li>• Swipe left to reveal quick actions</li>
                  <li>• Long press (500ms) for preview modal</li>
                  <li>• Tap to expand card with animation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Desktop Features:</h4>
                <ul className="space-y-1">
                  <li>• Hover for smooth scale animations</li>
                  <li>• Click to expand with spring physics</li>
                  <li>• Keyboard navigation support</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Test Container */}
        <motion.div
          className={getViewportClass()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Product Cards Section */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Interactive Product Cards
              </h2>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Mobile Gestures Enabled
              </Badge>
            </div>
            
            <div className={`grid ${getGridClass()} gap-6`}>
              {testProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <InteractiveProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    onToggleFavorite={toggleFavorite}
                    isFavorite={favorites.has(product.id)}
                    priority={index === 0}
                    className="h-full"
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Vendor Cards Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Interactive Vendor Cards
              </h2>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Enhanced UX
              </Badge>
            </div>
            
            <div className={`grid ${getGridClass()} gap-6`}>
              {testVendors.map((vendor, index) => (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <InteractiveVendorCard
                    vendor={vendor}
                    onAddToCart={handleAddToCart}
                    onToggleFavorite={toggleFavorite}
                    isFavorite={favorites.has(vendor.id)}
                    priority={index === 0}
                    className="h-full"
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Performance Tips */}
          <motion.div
            className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-lg font-semibold mb-4">Performance Optimizations:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Animations</h4>
                <p>GPU-accelerated transforms with will-change CSS for smooth 60fps performance</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Images</h4>
                <p>Lazy loading, responsive sizes, and skeleton placeholders for fast load times</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Accessibility</h4>
                <p>ARIA labels, keyboard navigation, and reduced motion support</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
