"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ResponsiveProductGrid } from "@/components/marketplace/ResponsiveProductGrid"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ShoppingBag, 
  Store, 
  TrendingUp, 
  ArrowRight,
  Star,
  Users,
  Package
} from "lucide-react"
import { getAllVendors, getProductsByVendorId } from "@/services/vendor-service"
import type { Product, Vendor } from "@/lib/types"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

export default function ProductShowcasePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Get all vendors
        const allVendors = await getAllVendors()
        setVendors(allVendors)

        // Get featured products from different vendors
        const productPromises = allVendors.slice(0, 6).map(vendor => 
          getProductsByVendorId(vendor.id)
        )
        
        const vendorProducts = await Promise.all(productPromises)
        
        // Get one featured product from each vendor
        const featured = vendorProducts
          .map(products => products.find(p => p.featured) || products[0])
          .filter(Boolean)
        
        setFeaturedProducts(featured)
      } catch (error) {
        console.error('Error fetching showcase data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleAddToCart = (product: Product) => {
    console.log('Adding to cart:', product.name)
    // In a real app, this would integrate with cart context
  }

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Header />
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-32 bg-gray-200 rounded-3xl mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-96 bg-gray-200 rounded-2xl"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      
      <main className="py-8">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="py-16"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-2xl mb-8">
                <ShoppingBag className="h-12 w-12 text-white" />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Product Showcase
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                Discover amazing products from verified vendors across Zambia. Each product card includes a "Visit Store" button that takes you to the actual vendor storefront with their full product catalog.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="bg-blue-100 text-blue-800 px-4 py-2 rounded-xl">
                  <Store className="h-4 w-4 mr-2" />
                  {vendors.length} Active Stores
                </Badge>
                <Badge className="bg-green-100 text-green-800 px-4 py-2 rounded-xl">
                  <Package className="h-4 w-4 mr-2" />
                  {featuredProducts.length} Featured Products
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 px-4 py-2 rounded-xl">
                  <Star className="h-4 w-4 mr-2" />
                  All Verified Vendors
                </Badge>
              </div>
            </motion.div>

            {/* Quick Instructions */}
            <motion.div variants={itemVariants} className="mb-16">
              <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 border border-blue-200/50">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  How to Test the "Visit Store" Feature
                </h2>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Find a Product</h3>
                    <p className="text-gray-600 text-sm">Browse the product cards below and find one you're interested in</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Click "Visit Store"</h3>
                    <p className="text-gray-600 text-sm">Click the "Visit Store" button to go to the vendor's full storefront</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Explore the Store</h3>
                    <p className="text-gray-600 text-sm">Browse all products, filter by category, and see vendor details</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Products Grid */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="py-8"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                Featured Products with Working Store Links
              </h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto">
                Each product below has a functional "Visit Store" button that takes you to a real vendor storefront page with full functionality.
              </p>
            </motion.div>

            <ResponsiveProductGrid
              products={featuredProducts}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              onViewProduct={(productId) => {
                const product = featuredProducts.find(p => p.id === productId);
                if (product) {
                  // Navigate to product details
                  window.location.href = `/products/${productId}`;
                }
              }}
              favorites={favorites}
              searchable={true}
              filterable={true}
              className="mb-12"
            />

            {/* Vendor Highlights */}
            <motion.div variants={itemVariants} className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Available Vendor Stores
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {vendors.slice(0, 8).map((vendor) => (
                  <motion.div
                    key={vendor.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-xl p-4 shadow-lg border hover:shadow-xl transition-all"
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Store className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">
                        {vendor.name}
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">{vendor.location}</p>
                      <div className="flex items-center justify-center gap-1 text-xs">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span>{vendor.rating}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
                <h3 className="text-3xl font-bold mb-4">
                  Explore All Vendors
                </h3>
                <p className="text-xl mb-8 opacity-90">
                  Visit our vendors page to see all available stores and their complete product catalogs
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold"
                    asChild
                  >
                    <Link href="/vendors">
                      <Store className="h-5 w-5 mr-2" />
                      Browse All Vendors
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                  
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold"
                    asChild
                  >
                    <Link href="/marketplace">
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      Go to Marketplace
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}
