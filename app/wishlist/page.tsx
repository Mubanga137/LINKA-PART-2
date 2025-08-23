"use client"

import { useState, useEffect } from "react"
import "@/styles/wishlist-animations.css"
import Link from "next/link"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Trash2, 
  Share2, 
  Eye,
  ShoppingBag,
  Filter,
  SortAsc,
  Grid3X3,
  List,
  Plus,
  TrendingDown,
  TrendingUp,
  Clock,
  AlertCircle,
  Gift,
  Zap,
  Package,
  Truck,
  MapPin,
  Search,
  Send,
  Users,
  Crown,
  Sparkles,
  Mail,
  Copy,
  ExternalLink,
  ArrowRight,
  RefreshCw,
  Target,
  Calendar
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/contexts/marketplace-context"
import { Product } from "@/lib/types"

// Enhanced mock wishlist data with lifestyle features
const MOCK_WISHLIST_ITEMS: (Product & { 
  addedDate: string, 
  priceAlert?: boolean,
  inStock: boolean,
  priceChange?: { type: 'increase' | 'decrease', percentage: number },
  collection?: string,
  giftable?: boolean,
  trending?: boolean,
  personalNote?: string
})[] = [
  {
    id: "1",
    name: "Traditional Maasai Beaded Necklace - Handcrafted African Jewelry",
    price: 1250,
    originalPrice: 2500,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
    category: "jewelry-accessories",
    rating: 4.8,
    reviewCount: 156,
    retailerName: "AfriCrafts Kenya",
    retailerLocation: "Nairobi, Kenya",
    shippingInfo: {
      freeShipping: true,
      shippingCost: 0,
      estimatedDays: 2
    },
    tags: ["handmade", "traditional"],
    addedDate: "2024-01-15",
    priceAlert: true,
    inStock: true,
    priceChange: { type: 'decrease', percentage: 15 },
    collection: "Fashion & Style",
    giftable: true,
    trending: true,
    personalNote: "Perfect for special occasions ✨"
  },
  {
    id: "2",
    name: "Ankara Print Women's Dress - Modern African Fashion",
    price: 1920,
    originalPrice: 3200,
    image: "https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=400&q=80",
    category: "fashion-textiles",
    rating: 4.9,
    reviewCount: 203,
    retailerName: "Afro Fashion House",
    retailerLocation: "Lagos, Nigeria",
    shippingInfo: {
      freeShipping: false,
      shippingCost: 300,
      estimatedDays: 5
    },
    tags: ["trending", "fashion"],
    addedDate: "2024-01-10",
    inStock: true,
    collection: "Fashion & Style",
    giftable: true,
    personalNote: "Love the vibrant colors! 🌈"
  },
  {
    id: "3",
    name: "Handwoven Kiondo Basket - Traditional Storage",
    price: 990,
    originalPrice: 1800,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
    category: "traditional-crafts",
    rating: 4.7,
    reviewCount: 89,
    retailerName: "Kenyan Crafts Co.",
    retailerLocation: "Mombasa, Kenya",
    shippingInfo: {
      freeShipping: true,
      shippingCost: 0,
      estimatedDays: 3
    },
    tags: ["handmade", "eco-friendly"],
    addedDate: "2024-01-08",
    inStock: false,
    priceChange: { type: 'increase', percentage: 5 },
    collection: "Home & Decor",
    giftable: true
  },
  {
    id: "4",
    name: "Organic Kenyan Coffee Beans 1kg - Premium Single Origin",
    price: 840,
    originalPrice: 1200,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80",
    category: "food-beverages",
    rating: 4.9,
    reviewCount: 334,
    retailerName: "Highland Coffee Co.",
    retailerLocation: "Eldoret, Kenya",
    shippingInfo: {
      freeShipping: true,
      shippingCost: 0,
      estimatedDays: 1
    },
    tags: ["organic", "premium"],
    addedDate: "2024-01-05",
    priceAlert: true,
    inStock: true,
    collection: "Lifestyle",
    personalNote: "Morning motivation ☕"
  },
  {
    id: "5",
    name: "Wood Carved African Mask - Authentic Art Piece",
    price: 2700,
    originalPrice: 4500,
    image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=400&q=80",
    category: "art-culture",
    rating: 4.6,
    reviewCount: 45,
    retailerName: "African Art Gallery",
    retailerLocation: "Cape Town, South Africa",
    shippingInfo: {
      freeShipping: false,
      shippingCost: 500,
      estimatedDays: 7
    },
    tags: ["handmade", "art"],
    addedDate: "2024-01-03",
    inStock: true,
    collection: "Art & Culture",
    giftable: true
  },
  {
    id: "6",
    name: "Smart Fitness Tracker - Health Monitoring",
    price: 1599,
    originalPrice: 2399,
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&q=80",
    category: "electronics",
    rating: 4.5,
    reviewCount: 287,
    retailerName: "TechHub Africa",
    retailerLocation: "Nairobi, Kenya",
    shippingInfo: {
      freeShipping: true,
      shippingCost: 0,
      estimatedDays: 2
    },
    tags: ["tech", "health"],
    addedDate: "2024-01-01",
    inStock: true,
    collection: "Tech & Gadgets",
    trending: true,
    personalNote: "New year, new me! 💪"
  }
]

const COLLECTIONS = ["All Items", "Fashion & Style", "Home & Decor", "Tech & Gadgets", "Art & Culture", "Lifestyle"]

type SortOption = 'date-added' | 'price-low' | 'price-high' | 'name' | 'rating'
type ViewMode = 'grid' | 'list'

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(MOCK_WISHLIST_ITEMS)
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = useState<SortOption>('date-added')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [selectedCollection, setSelectedCollection] = useState("All Items")
  const [searchQuery, setSearchQuery] = useState("")
  const [showShareModal, setShowShareModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { addToCart } = useCart()

  // Animation values
  const y = useMotionValue(0)
  const opacity = useTransform(y, [0, 100], [1, 0.8])

  const formatPrice = (price: number) => `K${price.toLocaleString()}`
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleRemoveItem = async (itemId: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    setWishlistItems(prev => prev.filter(item => item.id !== itemId))
    setSelectedItems(prev => {
      const newSet = new Set(prev)
      newSet.delete(itemId)
      return newSet
    })
    setIsLoading(false)
  }

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const handleAddToCart = async (item: any) => {
    // Animate item flying to cart
    const itemElement = document.querySelector(`[data-item-id="${item.id}"]`)
    if (itemElement) {
      itemElement.classList.add('animate-bounce')
      setTimeout(() => {
        itemElement.classList.remove('animate-bounce')
      }, 600)
    }
    
    addToCart(item)
    
    // Show success notification
    console.log(`Added ${item.name} to cart!`)
  }

  const handleMoveAllToCart = async () => {
    setIsLoading(true)
    const availableItems = wishlistItems.filter(item => item.inStock)
    
    for (const item of availableItems) {
      await new Promise(resolve => setTimeout(resolve, 100))
      addToCart(item)
    }
    
    setIsLoading(false)
  }

  const handleShareWishlist = () => {
    setShowShareModal(true)
  }

  const copyWishlistLink = () => {
    navigator.clipboard.writeText(window.location.href)
    console.log("Wishlist link copied!")
  }

  // Filter and sort items
  const filteredItems = wishlistItems.filter(item => {
    const matchesCollection = selectedCollection === "All Items" || item.collection === selectedCollection
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.retailerName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCollection && matchesSearch
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'date-added':
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0)
  const totalSavings = wishlistItems.reduce((sum, item) => {
    return sum + (item.originalPrice ? item.originalPrice - item.price : 0)
  }, 0)
  const onSaleItems = wishlistItems.filter(item => item.originalPrice && item.originalPrice > item.price)
  const inStockCount = wishlistItems.filter(item => item.inStock).length
  const recentlyAdded = wishlistItems.filter(item => {
    const daysDiff = (Date.now() - new Date(item.addedDate).getTime()) / (1000 * 60 * 60 * 24)
    return daysDiff <= 7
  })

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Pinkish Blue Gradient Background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          animate={{
            background: [
              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        {/* Glowing Orbs */}
        <motion.div
          animate={{
            x: [0, 200, 0],
            y: [0, -150, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-32 h-32 bg-pink-300/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -180, 0],
            y: [0, 120, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-blue-300/30 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />

        {/* Sticky Header */}
        <motion.div
          className="sticky top-0 z-20 backdrop-blur-md bg-white/80 border-b border-white/20"
          style={{ y, opacity }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              {/* Title Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <Heart className="h-6 w-6 text-white fill-current" />
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                    My Wishlist 
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ❤️
                    </motion.span>
                  </h1>
                  <p className="text-gray-600">
                    {wishlistItems.length} dreams waiting to come true
                  </p>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center gap-3"
              >
                <Button
                  onClick={handleMoveAllToCart}
                  disabled={inStockCount === 0 || isLoading}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-300/20 opacity-0 group-hover:opacity-100"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Move All to Cart
                  {isLoading && <RefreshCw className="h-4 w-4 ml-2 animate-spin" />}
                </Button>
                
                <Button
                  onClick={handleShareWishlist}
                  variant="outline"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Wishlist
                </Button>
                
                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white/80 backdrop-blur-sm"
                  >
                    <option value="date-added">Recently Added</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name A-Z</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  
                  <div className="flex bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-200">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-none px-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-none px-3"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {wishlistItems.length === 0 ? (
            // Empty State
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{ float: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-32 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
              >
                <Heart className="h-16 w-16 text-white" />
              </motion.div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Your wishlist is waiting for magic ✨
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                Start adding items you love and create your personal collection of dreams.
              </p>
              <Link href="/marketplace">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-lg px-8 py-3">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Start Your Journey
                </Button>
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Wishlist Summary Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/90 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-xl border border-white/20"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      {wishlistItems.length}
                    </div>
                    <div className="text-sm text-gray-600">Total Items</div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-green-600">
                      {onSaleItems.length}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                      <TrendingDown className="h-4 w-4 text-red-500" />
                      On Sale
                    </div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-orange-600">
                      {formatPrice(totalValue)}
                    </div>
                    <div className="text-sm text-gray-600">Total Value</div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-blue-600">
                      {formatPrice(totalSavings)}
                    </div>
                    <div className="text-sm text-gray-600">You Saved</div>
                  </motion.div>
                </div>

                {/* Loyalty Reward Hint */}
                {onSaleItems.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-200 rounded-xl p-4 text-center"
                  >
                    <div className="flex items-center justify-center gap-2 text-yellow-800">
                      <Gift className="h-5 w-5" />
                      <span className="font-semibold">
                        Buy wishlist items today to earn 500 bonus points! 🎁
                      </span>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* On Sale Carousel */}
              {onSaleItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center"
                      >
                        <TrendingDown className="h-4 w-4 text-white" />
                      </motion.div>
                      Flash Sale Items
                    </h2>
                    <Badge className="bg-red-500 text-white animate-pulse">
                      {onSaleItems.length} items on sale
                    </Badge>
                  </div>
                  
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {onSaleItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex-none w-80"
                      >
                        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border border-white/20">
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-red-500 text-white animate-pulse">
                                SALE 🔥
                              </Badge>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                              <div className="p-4 text-white">
                                <Button
                                  onClick={() => handleAddToCart(item)}
                                  className="w-full bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
                                >
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xl font-bold text-red-600">
                                {formatPrice(item.price)}
                              </span>
                              {item.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                  {formatPrice(item.originalPrice)}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span>{item.rating}</span>
                              </div>
                              <span>{Math.round(((item.originalPrice! - item.price) / item.originalPrice!) * 100)}% OFF</span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Search and Filters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-lg border border-white/20"
              >
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search your wishlist..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/60 backdrop-blur-sm border-gray-200"
                    />
                  </div>

                  {/* Collections Filter */}
                  <div className="flex gap-2 overflow-x-auto">
                    {COLLECTIONS.map((collection) => (
                      <Button
                        key={collection}
                        variant={selectedCollection === collection ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCollection(collection)}
                        className={`whitespace-nowrap ${
                          selectedCollection === collection
                            ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                            : "bg-white/60 backdrop-blur-sm border-gray-200"
                        }`}
                      >
                        {collection}
                      </Button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Recently Added Section */}
              {recentlyAdded.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="h-6 w-6 text-blue-500" />
                    Recently Added
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentlyAdded.slice(0, 3).map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="group"
                      >
                        <Card className="overflow-hidden h-full bg-white/80 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300">
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-blue-500 text-white">
                                New!
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                              {item.name}
                            </h3>
                            <div className="text-sm text-gray-600 mb-2">
                              Added {formatDate(item.addedDate)}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-purple-600">
                                {formatPrice(item.price)}
                              </span>
                              <Button
                                size="sm"
                                onClick={() => handleAddToCart(item)}
                                disabled={!item.inStock}
                                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                              >
                                <ShoppingCart className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Main Items Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    All Items ({filteredItems.length})
                  </h2>
                  {selectedItems.size > 0 && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {selectedItems.size} selected
                      </Badge>
                      <Button size="sm" variant="outline">
                        Bulk Actions
                      </Button>
                    </div>
                  )}
                </div>

                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}>
                  <AnimatePresence mode="popLayout">
                    {sortedItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="group"
                        data-item-id={item.id}
                      >
                        <Card className="overflow-hidden h-full bg-white/90 backdrop-blur-md border border-white/30 hover:shadow-2xl transition-all duration-500 hover:border-pink-300/50 relative">
                          {/* 3D Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                          
                          <div className="relative">
                            {/* Selection Checkbox */}
                            <div className="absolute top-3 left-3 z-10">
                              <motion.input
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                type="checkbox"
                                checked={selectedItems.has(item.id)}
                                onChange={() => handleSelectItem(item.id)}
                                className="w-5 h-5 rounded border-2 border-white shadow-lg accent-pink-500"
                              />
                            </div>

                            {/* Product Image with Parallax */}
                            <Link href={`/products/${item.id}`}>
                              <div className="aspect-square bg-gray-50 cursor-pointer overflow-hidden relative">
                                <motion.img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ duration: 0.3 }}
                                />
                                
                                {/* Overlay with Personal Note */}
                                {item.personalNote && (
                                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="text-white text-center p-4">
                                      <p className="text-sm italic">"{item.personalNote}"</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </Link>

                            {/* Floating Badges */}
                            <div className="absolute top-3 right-3 flex flex-col gap-1">
                              {!item.inStock && (
                                <Badge className="bg-red-500 text-white animate-pulse">
                                  Out of Stock
                                </Badge>
                              )}
                              {item.trending && (
                                <motion.div
                                  animate={{ rotate: [0, 10, -10, 0] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <Badge className="bg-yellow-500 text-white">
                                    🔥 Trending
                                  </Badge>
                                </motion.div>
                              )}
                              {item.giftable && (
                                <Badge className="bg-green-500 text-white">
                                  🎁 Gift Ready
                                </Badge>
                              )}
                              {item.originalPrice && item.originalPrice > item.price && (
                                <Badge className="bg-red-500 text-white animate-bounce">
                                  -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                                </Badge>
                              )}
                            </div>

                            {/* Floating Action Buttons */}
                            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                              <div className="flex flex-col gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleRemoveItem(item.id)}
                                  className="w-10 h-10 bg-red-500/90 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="w-10 h-10 bg-blue-500/90 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm"
                                >
                                  <Share2 className="h-4 w-4" />
                                </motion.button>
                              </div>
                            </div>
                          </div>

                          <CardContent className="p-4 relative">
                            {/* Product Info */}
                            <div className="space-y-3">
                              {/* Title */}
                              <Link href={`/products/${item.id}`}>
                                <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-purple-600 transition-colors cursor-pointer group-hover:text-purple-600">
                                  {item.name}
                                </h3>
                              </Link>

                              {/* Collection Badge */}
                              {item.collection && (
                                <Badge variant="outline" className="text-xs">
                                  {item.collection}
                                </Badge>
                              )}

                              {/* Price with Animation */}
                              <motion.div 
                                className="flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                              >
                                <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                  {formatPrice(item.price)}
                                </span>
                                {item.originalPrice && item.originalPrice > item.price && (
                                  <span className="text-sm text-gray-400 line-through">
                                    {formatPrice(item.originalPrice)}
                                  </span>
                                )}
                              </motion.div>

                              {/* Rating & Details */}
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="font-medium">{item.rating}</span>
                                  <span className="text-gray-500">({item.reviewCount})</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-500">
                                  <MapPin className="h-3 w-3" />
                                  <span className="truncate">{item.retailerLocation}</span>
                                </div>
                              </div>

                              {/* Added Date */}
                              <div className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Added {formatDate(item.addedDate)}
                              </div>

                              {/* Action Buttons */}
                              <div className="flex gap-2 pt-2">
                                <motion.div
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="flex-1"
                                >
                                  <Button
                                    onClick={() => handleAddToCart(item)}
                                    disabled={!item.inStock}
                                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white disabled:from-gray-300 disabled:to-gray-400 transition-all duration-300 relative overflow-hidden group/btn"
                                  >
                                    <motion.div
                                      className="absolute inset-0 bg-white/20 transform -skew-x-12 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-shimmer"
                                      initial={{ x: '-100%' }}
                                      whileHover={{ x: '100%' }}
                                      transition={{ duration: 0.6 }}
                                    />
                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                                  </Button>
                                </motion.div>
                                
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="px-3 bg-white/60 backdrop-blur-sm border-gray-200 hover:bg-white/80"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Smart Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-12 bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Because it's in your wishlist...
                  </h2>
                  <p className="text-gray-600">
                    We found these items that complement your style perfectly
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      name: "Matching Earrings Set",
                      price: 890,
                      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&q=80",
                      reason: "Pairs with your necklace"
                    },
                    {
                      name: "Designer Handbag",
                      price: 2400,
                      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80",
                      reason: "Complements your dress"
                    },
                    {
                      name: "Artisan Coffee Mug",
                      price: 350,
                      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=300&q=80",
                      reason: "Perfect for your coffee"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="group cursor-pointer"
                    >
                      <Card className="overflow-hidden bg-white/60 backdrop-blur-sm border border-white/30 hover:shadow-lg transition-all duration-300">
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-4 text-center">
                          <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                          <p className="text-sm text-purple-600 mb-2">{item.reason}</p>
                          <div className="font-bold text-lg text-gray-900 mb-3">
                            {formatPrice(item.price)}
                          </div>
                          <Button
                            size="sm"
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                          >
                            <Heart className="h-4 w-4 mr-2" />
                            Add to Wishlist
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="mt-12 relative overflow-hidden rounded-3xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600" />
                <div className="relative p-12 text-center text-white">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 mx-auto mb-6 relative"
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-full"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="h-10 w-10 text-white" />
                    </div>
                  </motion.div>
                  
                  <h2 className="text-4xl font-bold mb-4">
                    Turn Dreams into Reality
                  </h2>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    You have {inStockCount} items ready to ship, worth {formatPrice(totalValue)}. 
                    Make your dreams come true today!
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={handleMoveAllToCart}
                      size="lg"
                      className="bg-white text-purple-600 hover:bg-gray-100 text-xl px-8 py-4"
                    >
                      <ShoppingCart className="h-6 w-6 mr-3" />
                      Shop Everything Now
                    </Button>
                    <Button
                      onClick={handleShareWishlist}
                      variant="outline"
                      size="lg"
                      className="border-white/30 text-white hover:bg-white/10 text-xl px-8 py-4"
                    >
                      <Share2 className="h-6 w-6 mr-3" />
                      Share My Style
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </main>

        {/* Share Modal */}
        <AnimatePresence>
          {showShareModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowShareModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Share2 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Share Your Wishlist</h3>
                  <p className="text-gray-600">Let others see your amazing taste!</p>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={copyWishlistLink}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      WhatsApp
                    </Button>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  onClick={() => setShowShareModal(false)}
                  className="w-full mt-4"
                >
                  Close
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </div>
  )
}
