"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Shield, 
  Truck, 
  Clock, 
  Users, 
  Package, 
  Search, 
  Filter, 
  ChevronRight,
  ExternalLink,
  Verified,
  Award,
  Calendar,
  Eye,
  ThumbsUp,
  Share2,
  TrendingUp,
  Store,
  Mail,
  Globe,
  ArrowLeft
} from "lucide-react"
import type { Product, Vendor } from "@/lib/types"
import { getVendorBySlug, getProductsByVendorId, getVendorStats } from "@/services/vendor-service"

interface VendorStorefrontProps {
  params: {
    storeId: string
  }
}

// Mock vendor data - in real app this would come from API/database
const getVendorData = (storeId: string): Vendor | null => {
  const vendors: Record<string, Vendor> = {
    "electronics-hub-zambia": {
      id: "vendor-1",
      name: "Electronics Hub Zambia",
      tagline: "Your one-stop shop for quality electronics and gadgets",
      rating: 4.8,
      reviewCount: 1247,
      productImageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80",
      vendorImageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&q=80",
      pricePreview: "From K299",
      href: "/vendors/electronics-hub-zambia",
      categories: ["Electronics", "Smartphones", "Laptops", "Gaming"],
      location: "Lusaka, Zambia",
      isVerified: true,
      isFeatured: true,
      discount: "Up to 30% off",
      deliveryTime: "Same-day delivery available"
    },
    "zambian-fashion-house": {
      id: "vendor-2", 
      name: "Zambian Fashion House",
      tagline: "Authentic African fashion meets modern style",
      rating: 4.9,
      reviewCount: 987,
      productImageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
      vendorImageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80",
      pricePreview: "From K150",
      href: "/vendors/zambian-fashion-house",
      categories: ["Fashion", "Traditional Wear", "Modern Clothing", "Accessories"],
      location: "Ndola, Zambia",
      isVerified: true,
      isFeatured: true,
      discount: "15% off first order",
      deliveryTime: "2-3 days nationwide"
    },
    "craft-collective-zm": {
      id: "vendor-3",
      name: "Craft Collective ZM",
      tagline: "Handmade treasures from local artisans",
      rating: 4.7,
      reviewCount: 654,
      productImageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80",
      vendorImageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200&q=80",
      pricePreview: "From K75",
      href: "/vendors/craft-collective-zm",
      categories: ["Crafts", "Art", "Home Decor", "Gifts"],
      location: "Kitwe, Zambia",
      isVerified: true,
      isFeatured: false,
      discount: "20% off handmade items",
      deliveryTime: "3-5 days"
    }
  }
  
  return vendors[storeId] || null
}

// Mock products for the vendor
const getVendorProducts = (vendorId: string): Product[] => {
  const allProducts: Product[] = [
    {
      id: "prod-1",
      name: "iPhone 15 Pro Max",
      description: "Latest Apple iPhone with advanced camera system and A17 Pro chip",
      price: 8999,
      originalPrice: 9999,
      images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80"],
      category: "Electronics",
      inStock: true,
      stockQuantity: 15,
      rating: 4.9,
      reviewCount: 234,
      tags: ["smartphone", "apple", "featured"],
      vendor: { id: "vendor-1", name: "Electronics Hub Zambia" },
      discountPercentage: 10,
      fastDelivery: true,
      freeShipping: true,
      featured: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "prod-2", 
      name: "MacBook Air M3",
      description: "Powerful laptop with M3 chip, perfect for professionals and students",
      price: 12499,
      originalPrice: 13999,
      images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80"],
      category: "Electronics",
      inStock: true,
      stockQuantity: 8,
      rating: 4.8,
      reviewCount: 156,
      tags: ["laptop", "apple", "professional"],
      vendor: { id: "vendor-1", name: "Electronics Hub Zambia" },
      discountPercentage: 11,
      fastDelivery: true,
      freeShipping: true,
      featured: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "prod-3",
      name: "Traditional Chitenge Dress",
      description: "Beautiful handmade dress featuring authentic Zambian chitenge fabric",
      price: 450,
      originalPrice: 550,
      images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80"],
      category: "Fashion",
      inStock: true,
      stockQuantity: 25,
      rating: 4.9,
      reviewCount: 89,
      tags: ["traditional", "chitenge", "dress", "featured"],
      vendor: { id: "vendor-2", name: "Zambian Fashion House" },
      discountPercentage: 18,
      fastDelivery: false,
      freeShipping: true,
      featured: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "prod-4",
      name: "Handwoven Basket Set",
      description: "Set of 3 beautiful handwoven baskets made by local artisans",
      price: 180,
      originalPrice: 220,
      images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80"],
      category: "Crafts",
      inStock: true,
      stockQuantity: 12,
      rating: 4.6,
      reviewCount: 45,
      tags: ["handmade", "baskets", "home-decor"],
      vendor: { id: "vendor-3", name: "Craft Collective ZM" },
      discountPercentage: 18,
      fastDelivery: false,
      freeShipping: false,
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
  
  return allProducts.filter(product => product.vendor.id === vendorId)
}

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

export default function VendorStorefront({ params }: VendorStorefrontProps) {
  const [vendor, setVendor] = useState<Vendor | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(true)
  
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    // Simulate API call
    const fetchVendorData = async () => {
      setLoading(true)
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const vendorData = getVendorData(params.storeId)
      setVendor(vendorData)
      
      if (vendorData) {
        const vendorProducts = getVendorProducts(vendorData.id)
        setProducts(vendorProducts)
        setFilteredProducts(vendorProducts)
      }
      
      setLoading(false)
    }
    
    fetchVendorData()
  }, [params.storeId])

  useEffect(() => {
    let filtered = products

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    setFilteredProducts(filtered)
  }, [products, searchQuery, selectedCategory])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Header />
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Loading skeleton */}
            <div className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-3xl mb-8"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 bg-gray-200 rounded-2xl"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Header />
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-20"
            >
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Store className="h-12 w-12 text-gray-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Store Not Found</h1>
              <p className="text-gray-600 mb-8">The store you're looking for doesn't exist or has been removed.</p>
              <Button asChild>
                <Link href="/marketplace">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Marketplace
                </Link>
              </Button>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      
      <main className="py-8">
        {/* Vendor Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="py-8"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Back Navigation */}
            <motion.div variants={itemVariants} className="mb-6">
              <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-900">
                <Link href="/marketplace">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Marketplace
                </Link>
              </Button>
            </motion.div>

            {/* Vendor Banner */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-white via-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 mb-8 border border-white/50 shadow-xl backdrop-blur-sm relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-emerald-500/5"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                  {/* Vendor Logo */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative w-32 h-32 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white to-gray-100"
                  >
                    <Image
                      src={vendor.vendorImageUrl || vendor.productImageUrl}
                      alt={vendor.name}
                      fill
                      className="object-cover"
                    />
                    {vendor.isVerified && (
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <Verified className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </motion.div>

                  {/* Vendor Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {vendor.name}
                      </h1>
                      {vendor.isVerified && (
                        <Badge className="bg-blue-600 text-white px-3 py-1 rounded-xl">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      {vendor.isFeatured && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-xl">
                          <Award className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-xl text-gray-600 mb-6">{vendor.tagline}</p>
                    
                    {/* Stats Row */}
                    <div className="flex flex-wrap items-center gap-6 mb-6">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="font-bold text-gray-900">{vendor.rating}</span>
                        <span className="text-gray-600">({vendor.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-5 w-5" />
                        <span>{vendor.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Package className="h-5 w-5" />
                        <span>{products.length} products</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-5 w-5" />
                        <span>{vendor.deliveryTime}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          onClick={() => setIsFollowing(!isFollowing)}
                          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                            isFollowing 
                              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          <Heart className={`h-4 w-4 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
                          {isFollowing ? 'Following' : 'Follow Store'}
                        </Button>
                      </motion.div>
                      
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" className="px-6 py-3 rounded-xl font-semibold border-2">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contact Vendor
                        </Button>
                      </motion.div>
                      
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" className="px-6 py-3 rounded-xl font-semibold border-2">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share Store
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Store Content */}
        <motion.section
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="py-8"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Search and Filter Bar */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search products in this store..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-3 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  
                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-xl capitalize ${
                          selectedCategory === category
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:text-blue-600'
                        }`}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Products Grid */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Products ({filteredProducts.length})
                </h2>
                <div className="text-gray-600">
                  Showing {filteredProducts.length} of {products.length} products
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.03, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      className="group"
                    >
                      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl h-full">
                        <CardContent className="p-0 h-full flex flex-col">
                          {/* Product Image */}
                          <div className="relative aspect-square overflow-hidden">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            
                            {/* Badges */}
                            <div className="absolute top-3 left-3 flex flex-col gap-2">
                              {product.discountPercentage && (
                                <Badge className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs">
                                  -{product.discountPercentage}%
                                </Badge>
                              )}
                              {product.featured && (
                                <Badge className="bg-blue-500 text-white px-2 py-1 rounded-lg text-xs">
                                  Featured
                                </Badge>
                              )}
                              {product.freeShipping && (
                                <Badge className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs">
                                  <Truck className="h-3 w-3 mr-1" />
                                  Free Ship
                                </Badge>
                              )}
                            </div>

                            {/* Favorite Button */}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute top-3 right-3 w-10 h-10 p-0 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                            </Button>
                          </div>

                          {/* Product Info */}
                          <div className="p-4 flex-1 flex flex-col">
                            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {product.name}
                            </h3>
                            
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {product.description}
                            </p>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-semibold text-gray-700">
                                  {product.rating}
                                </span>
                              </div>
                              <span className="text-sm text-gray-500">
                                ({product.reviewCount} reviews)
                              </span>
                            </div>

                            {/* Price */}
                            <div className="mb-4">
                              <div className="flex items-baseline gap-2">
                                <span className="text-lg font-bold text-gray-900">
                                  K{product.price.toFixed(2)}
                                </span>
                                {product.originalPrice && (
                                  <span className="text-sm text-gray-400 line-through">
                                    K{product.originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>
                              {product.originalPrice && (
                                <p className="text-sm text-green-600 font-medium">
                                  Save K{(product.originalPrice - product.price).toFixed(2)}
                                </p>
                              )}
                            </div>

                            {/* Stock Status */}
                            <div className="mb-4">
                              <div className={`flex items-center gap-1 text-xs ${
                                product.inStock ? 'text-green-600' : 'text-red-600'
                              }`}>
                                <Package className="h-3 w-3" />
                                <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                                {product.inStock && product.stockQuantity && product.stockQuantity <= 10 && (
                                  <span className="text-orange-600 ml-1">
                                    ({product.stockQuantity} left)
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-auto space-y-2">
                              <Button
                                disabled={!product.inStock}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition-all"
                              >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Buy Now
                              </Button>
                              
                              <Button
                                variant="outline"
                                className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 py-2.5 rounded-xl transition-all"
                                asChild
                              >
                                <Link href={`/products/${product.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}
