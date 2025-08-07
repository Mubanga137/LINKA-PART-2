"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DeclutteredProductGrid } from "@/components/marketplace/DeclutteredProductGrid";
import { ResponsiveProductGrid } from "@/components/marketplace/ResponsiveProductGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Sparkles, 
  Smartphone, 
  Eye, 
  Grid3X3,
  ArrowRight,
  Check,
  X,
  Zap,
  ShoppingCart,
  Store,
  Users,
  TrendingUp,
  Layers,
  MousePointer,
  Touch
} from "lucide-react";
import { getAllProducts } from "@/services/product-service";
import type { Product } from "@/lib/types";
import Link from "next/link";

export default function DeclutteredDemoPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'decluttered' | 'original'>('decluttered');
  const [showComparison, setShowComparison] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const allProducts = await getAllProducts();
      setProducts(allProducts.slice(0, 8)); // Show 8 products for demo
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
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

  const improvements = [
    {
      icon: X,
      title: "Removed Redundant Buttons",
      description: "Eliminated 'View Details' button since entire card is clickable",
      type: "removed"
    },
    {
      icon: MousePointer,
      title: "Entire Card Clickable",
      description: "Click anywhere on the card to view product details",
      type: "improved"
    },
    {
      icon: Layers,
      title: "Streamlined Actions",
      description: "Only essential buttons: Buy Now + Visit Store (when relevant)",
      type: "improved"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Optimized spacing and button sizes for mobile devices",
      type: "improved"
    },
    {
      icon: Grid3X3,
      title: "8pt Grid System",
      description: "Consistent spacing using professional design standards",
      type: "improved"
    },
    {
      icon: Zap,
      title: "Better Performance",
      description: "Cleaner DOM structure with fewer elements to render",
      type: "improved"
    }
  ];

  const comparisonFeatures = [
    {
      feature: "View Details Button",
      original: "✓ Present",
      decluttered: "✗ Removed",
      improvement: "Entire card is clickable instead"
    },
    {
      feature: "Button Count",
      original: "3 buttons",
      decluttered: "1-2 buttons",
      improvement: "Simplified to essential actions only"
    },
    {
      feature: "Mobile Tap Targets",
      original: "Small buttons",
      decluttered: "44px+ targets",
      improvement: "Better accessibility compliance"
    },
    {
      feature: "Grid Spacing",
      original: "Inconsistent",
      decluttered: "8pt system",
      improvement: "Professional design standards"
    },
    {
      feature: "Card Padding",
      original: "Fixed padding",
      decluttered: "Responsive",
      improvement: "Adapts to screen size"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 mb-4">
              <Layers className="h-4 w-4 mr-2" />
              Decluttered Design
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Cleaner Product Cards
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Experience streamlined product cards with removed redundancy, 
              better mobile optimization, and cleaner visual hierarchy.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <Button
                variant={viewMode === 'decluttered' ? 'default' : 'outline'}
                onClick={() => setViewMode('decluttered')}
                className="flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Decluttered Cards
              </Button>
              
              <Button
                variant={viewMode === 'original' ? 'default' : 'outline'}
                onClick={() => setViewMode('original')}
                className="flex items-center gap-2"
              >
                <Grid3X3 className="h-4 w-4" />
                Original Cards
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowComparison(!showComparison)}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                {showComparison ? 'Hide' : 'Show'} Comparison
              </Button>
            </div>
          </motion.div>

          {/* Improvements Overview */}
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-12"
            >
              <Card className="border-2 border-green-200 bg-green-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <Check className="h-5 w-5" />
                    Key Improvements Made
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {improvements.map((improvement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-white rounded-xl border"
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          improvement.type === 'removed' ? 'bg-red-100' : 'bg-green-100'
                        }`}>
                          <improvement.icon className={`h-4 w-4 ${
                            improvement.type === 'removed' ? 'text-red-600' : 'text-green-600'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {improvement.title}
                          </h4>
                          <p className="text-sm text-gray-600">{improvement.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Comparison Table */}
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Before vs After Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Feature</th>
                          <th className="text-center py-3 px-4 font-semibold">Original Cards</th>
                          <th className="text-center py-3 px-4 font-semibold">Decluttered Cards</th>
                          <th className="text-left py-3 px-4 font-semibold">Improvement</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonFeatures.map((row, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">{row.feature}</td>
                            <td className="py-3 px-4 text-center text-gray-600">{row.original}</td>
                            <td className="py-3 px-4 text-center text-green-600 font-medium">{row.decluttered}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{row.improvement}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Demo Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {viewMode === 'decluttered' ? 'Decluttered Product Cards' : 'Original Product Cards'}
            </h2>
            <p className="text-gray-600">
              {viewMode === 'decluttered' 
                ? 'Streamlined design with cleaner layout and better mobile experience'
                : 'Previous design with all original buttons and spacing'
              }
            </p>
          </motion.div>

          {/* Product Grid Demo */}
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-12"
          >
            {viewMode === 'decluttered' ? (
              <DeclutteredProductGrid
                products={products}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
                favorites={favorites}
              />
            ) : (
              <ResponsiveProductGrid
                products={products}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
                onViewProduct={handleViewProduct}
                favorites={favorites}
                searchable={false}
                filterable={false}
              />
            )}
          </motion.div>

          {/* Mobile Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <Card className="border-2 border-blue-200 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Touch className="h-5 w-5" />
                  Mobile Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Improved Touch Targets</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Minimum 44px touch targets for accessibility
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Entire card area is clickable
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Optimized button spacing for thumbs
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Responsive Design</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        8pt grid system for consistent spacing
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Mobile-first responsive breakpoints
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Adaptive text and icon sizes
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Experience the Difference
              </h2>
              <p className="text-xl mb-8 opacity-90">
                See how decluttered design improves user experience across the marketplace.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100 font-semibold"
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
                  <Link href="/interactive-demo">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Interactive Demo
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
