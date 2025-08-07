"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ResponsiveProductGrid } from "@/components/marketplace/ResponsiveProductGrid";
import { InteractiveProductCard } from "@/components/marketplace/InteractiveProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Smartphone, 
  Mouse, 
  Hand, 
  Eye, 
  Touch,
  Zap,
  Heart,
  ShoppingCart,
  Store,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  RotateCcw,
  Vibrate,
  Grid3X3,
  Star,
  Users,
  TrendingUp
} from "lucide-react";
import { getAllProducts } from "@/services/product-service";
import { detectDeviceCapabilities, getOptimizedSettings } from "@/utils/mobile-optimization";
import type { Product } from "@/lib/types";
import Link from "next/link";

export default function InteractiveDemoPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [deviceCapabilities, setDeviceCapabilities] = useState<any>(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [demoMode, setDemoMode] = useState<'grid' | 'single'>('grid');

  useEffect(() => {
    // Load products and detect device capabilities
    const loadData = async () => {
      const allProducts = await getAllProducts();
      setProducts(allProducts.slice(0, 12)); // Show 12 products for demo
      
      const capabilities = detectDeviceCapabilities();
      setDeviceCapabilities(capabilities);
    };

    loadData();
  }, []);

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
    // Show success feedback
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

  const handleViewProduct = (productId: string) => {
    console.log('View product:', productId);
  };

  const optimizedSettings = deviceCapabilities ? getOptimizedSettings(deviceCapabilities) : null;

  const gestureInstructions = [
    {
      icon: Hand,
      title: "Swipe Left",
      description: "Swipe left on any card to reveal quick action buttons",
      mobile: true,
      desktop: false
    },
    {
      icon: Touch,
      title: "Long Press",
      description: "Long press (500ms) to open a quick preview modal",
      mobile: true,
      desktop: true
    },
    {
      icon: Eye,
      title: "Tap to Expand",
      description: "Tap on mobile or click on desktop to expand card details",
      mobile: true,
      desktop: true
    },
    {
      icon: Mouse,
      title: "Hover Effects",
      description: "Hover over cards for 3D tilt and image zoom effects",
      mobile: false,
      desktop: true
    },
    {
      icon: Vibrate,
      title: "Haptic Feedback",
      description: "Feel subtle vibrations for gesture confirmations",
      mobile: true,
      desktop: false,
      conditional: "if supported"
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for devices with as little as 1GB RAM"
    },
    {
      icon: Sparkles,
      title: "Smooth Animations",
      description: "60fps animations with automatic quality adjustment"
    },
    {
      icon: Grid3X3,
      title: "8pt Grid System",
      description: "Consistent spacing using professional design standards"
    },
    {
      icon: Users,
      title: "Accessible",
      description: "Full keyboard navigation and screen reader support"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 mb-4">
              <Sparkles className="h-4 w-4 mr-2" />
              Interactive Demo
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Next-Gen Product Cards
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Experience revolutionary product cards with advanced mobile gestures, 
              3D animations, and intelligent optimizations for developing markets.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <Button
                variant={demoMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setDemoMode('grid')}
                className="flex items-center gap-2"
              >
                <Grid3X3 className="h-4 w-4" />
                Grid Demo
              </Button>
              
              <Button
                variant={demoMode === 'single' ? 'default' : 'outline'}
                onClick={() => setDemoMode('single')}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Single Card Demo
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowInstructions(!showInstructions)}
                className="flex items-center gap-2"
              >
                <Hand className="h-4 w-4" />
                {showInstructions ? 'Hide' : 'Show'} Instructions
              </Button>
            </div>
          </motion.div>

          {/* Device Capabilities Info */}
          {deviceCapabilities && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl border shadow-lg p-6 mb-8"
            >
              <h3 className="text-lg font-semibold mb-4">Your Device Capabilities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Smartphone className={`h-6 w-6 mx-auto mb-2 ${deviceCapabilities.isLowEnd ? 'text-orange-500' : 'text-green-500'}`} />
                  <p className="font-medium">{deviceCapabilities.isLowEnd ? 'Budget' : 'High-End'}</p>
                  <p className="text-gray-600">Device</p>
                </div>
                
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Zap className={`h-6 w-6 mx-auto mb-2 ${deviceCapabilities.supportsAdvancedAnimations ? 'text-green-500' : 'text-orange-500'}`} />
                  <p className="font-medium">{deviceCapabilities.supportsAdvancedAnimations ? 'Advanced' : 'Basic'}</p>
                  <p className="text-gray-600">Animations</p>
                </div>
                
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Vibrate className={`h-6 w-6 mx-auto mb-2 ${deviceCapabilities.supportsHaptics ? 'text-green-500' : 'text-gray-400'}`} />
                  <p className="font-medium">{deviceCapabilities.supportsHaptics ? 'Enabled' : 'Not Available'}</p>
                  <p className="text-gray-600">Haptics</p>
                </div>
                
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Hand className={`h-6 w-6 mx-auto mb-2 ${deviceCapabilities.supportsTouchGestures ? 'text-green-500' : 'text-gray-400'}`} />
                  <p className="font-medium">{deviceCapabilities.supportsTouchGestures ? 'Touch' : 'Mouse'}</p>
                  <p className="text-gray-600">Input</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Instructions */}
          {showInstructions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <Card className="border-2 border-blue-200 bg-blue-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Hand className="h-5 w-5" />
                    How to Interact with the Cards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gestureInstructions.map((instruction, index) => {
                      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
                      const shouldShow = (isMobile && instruction.mobile) || (!isMobile && instruction.desktop);
                      
                      if (!shouldShow) return null;
                      
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-3 bg-white rounded-xl border"
                        >
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <instruction.icon className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {instruction.title}
                              {instruction.conditional && (
                                <span className="text-xs text-gray-500 ml-1">
                                  ({instruction.conditional})
                                </span>
                              )}
                            </h4>
                            <p className="text-sm text-gray-600">{instruction.description}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Demo Content */}
          {demoMode === 'grid' ? (
            /* Grid Demo */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Interactive Product Grid
                </h2>
                <p className="text-gray-600">
                  Try searching, filtering, and interacting with the products below using gestures.
                </p>
              </div>
              
              <ResponsiveProductGrid
                products={products}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
                onViewProduct={handleViewProduct}
                favorites={favorites}
                searchable={true}
                filterable={true}
              />
            </motion.div>
          ) : (
            /* Single Card Demo */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-sm mx-auto"
            >
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Single Card Demo
                </h2>
                <p className="text-gray-600">
                  Focus on one card to try all the interactive features.
                </p>
              </div>
              
              {products.length > 0 && (
                <InteractiveProductCard
                  product={products[0]}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  onViewProduct={handleViewProduct}
                  isFavorite={favorites.has(products[0].id)}
                  priority={true}
                  index={0}
                />
              )}
              
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  onClick={() => setDemoMode('grid')}
                  className="flex items-center gap-2"
                >
                  <Grid3X3 className="h-4 w-4" />
                  See Full Grid
                </Button>
              </div>
            </motion.div>
          )}

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Built for Everyone
              </h2>
              <p className="text-xl text-gray-600">
                Optimized for all devices, from high-end flagship phones to budget smartphones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Performance Stats */}
          {optimizedSettings && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Optimized for Your Device
                </h2>
                <p className="text-gray-600">
                  Automatic performance adjustments based on your device capabilities.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {Math.round(optimizedSettings.animationDuration * 1000)}ms
                  </div>
                  <div className="text-sm text-gray-600">Animation Speed</div>
                </div>
                
                <div className="bg-white rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {optimizedSettings.imageQuality}%
                  </div>
                  <div className="text-sm text-gray-600">Image Quality</div>
                </div>
                
                <div className="bg-white rounded-xl p-4">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {optimizedSettings.preloadCount}
                  </div>
                  <div className="text-sm text-gray-600">Preload Images</div>
                </div>
                
                <div className="bg-white rounded-xl p-4">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {optimizedSettings.enableParticleEffects ? '✓' : '✗'}
                  </div>
                  <div className="text-sm text-gray-600">Particle Effects</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Experience More?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Explore the full marketplace with these enhanced product cards.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                  asChild
                >
                  <Link href="/marketplace">
                    <Store className="h-5 w-5 mr-2" />
                    Visit Marketplace
                  </Link>
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 font-semibold"
                  asChild
                >
                  <Link href="/product-showcase">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    View Product Showcase
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
