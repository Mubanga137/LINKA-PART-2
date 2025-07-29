"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
  MapPin
} from "lucide-react"
import { MarketplaceMainHeader } from "@/components/marketplace/marketplace-main-header"
import { Footer } from "@/components/footer"
import { useCart } from "@/contexts/cart-context"
import { Product } from "@/contexts/cart-context"

// Mock wishlist data - in real app this would come from API/context
const MOCK_WISHLIST_ITEMS: (Product & { 
  addedDate: string, 
  priceAlert?: boolean,
  inStock: boolean,
  priceChange?: { type: 'increase' | 'decrease', percentage: number }
})[] = [
  {
    id: "1",
    name: "Traditional Maasai Beaded Necklace - Handcrafted African Jewelry",
    price: 1250,
    originalPrice: 2500,
    image: "/placeholder.svg",
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
    priceChange: { type: 'decrease', percentage: 15 }
  },
  {
    id: "2",
    name: "Ankara Print Women's Dress - Modern African Fashion",
    price: 1920,
    originalPrice: 3200,
    image: "/placeholder.svg",
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
    inStock: true
  },
  {
    id: "3",
    name: "Handwoven Kiondo Basket - Traditional Storage",
    price: 990,
    originalPrice: 1800,
    image: "/placeholder.svg",
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
    priceChange: { type: 'increase', percentage: 5 }
  },
  {
    id: "4",
    name: "Organic Kenyan Coffee Beans 1kg - Premium Single Origin",
    price: 840,
    originalPrice: 1200,
    image: "/placeholder.svg",
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
    inStock: true
  },
  {
    id: "5",
    name: "Wood Carved African Mask - Authentic Art Piece",
    price: 2700,
    originalPrice: 4500,
    image: "/placeholder.svg",
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
    inStock: true
  }
]

type SortOption = 'date-added' | 'price-low' | 'price-high' | 'name' | 'rating'
type ViewMode = 'grid' | 'list'

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(MOCK_WISHLIST_ITEMS)
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = useState<SortOption>('date-added')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [showPriceAlerts, setShowPriceAlerts] = useState(false)
  const { addToCart } = useCart()

  const formatPrice = (price: number) => `K${price.toLocaleString()}`
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleRemoveItem = (itemId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId))
    setSelectedItems(prev => {
      const newSet = new Set(prev)
      newSet.delete(itemId)
      return newSet
    })
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

  const handleSelectAll = () => {
    if (selectedItems.size === wishlistItems.length) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(wishlistItems.map(item => item.id)))
    }
  }

  const handleAddSelectedToCart = () => {
    const itemsToAdd = wishlistItems.filter(item => 
      selectedItems.has(item.id) && item.inStock
    )
    itemsToAdd.forEach(item => addToCart(item))
    setSelectedItems(new Set())
  }

  const handleRemoveSelected = () => {
    setWishlistItems(prev => prev.filter(item => !selectedItems.has(item.id)))
    setSelectedItems(new Set())
  }

  const sortedItems = [...wishlistItems].sort((a, b) => {
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

  const inStockCount = wishlistItems.filter(item => item.inStock).length
  const selectedInStockCount = wishlistItems.filter(item => 
    selectedItems.has(item.id) && item.inStock
  ).length

  return (
    <div className="min-h-screen bg-gray-50">
      <MarketplaceMainHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg"
            >
              <Heart className="h-6 w-6 text-white fill-current" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-600">
                {wishlistItems.length} items • {inStockCount} in stock
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {formatPrice(totalValue)}
                </div>
                <div className="text-sm text-gray-600">Total Value</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatPrice(totalSavings)}
                </div>
                <div className="text-sm text-gray-600">Total Savings</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {inStockCount}
                </div>
                <div className="text-sm text-gray-600">Available</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {wishlistItems.filter(item => item.priceAlert).length}
                </div>
                <div className="text-sm text-gray-600">Price Alerts</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {wishlistItems.length === 0 ? (
          // Empty State
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start adding items you love to your wishlist and keep track of your favorites.
            </p>
            <Link href="/marketplace">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg border p-4 mb-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAll}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedItems.size === wishlistItems.length}
                      onChange={() => {}}
                      className="rounded"
                    />
                    Select All ({wishlistItems.length})
                  </Button>
                  
                  {selectedItems.size > 0 && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {selectedItems.size} selected
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddSelectedToCart}
                        disabled={selectedInStockCount === 0}
                        className="flex items-center gap-1"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart ({selectedInStockCount})
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRemoveSelected}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="border border-gray-200 rounded-md px-3 py-1.5 text-sm"
                  >
                    <option value="date-added">Recently Added</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name A-Z</option>
                    <option value="rating">Highest Rated</option>
                  </select>

                  {/* View Mode */}
                  <div className="flex bg-gray-100 rounded-lg overflow-hidden">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-none px-3"
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
              </div>
            </motion.div>

            {/* Price Alerts */}
            {wishlistItems.some(item => item.priceChange) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Price Changes Detected</h3>
                    <p className="text-blue-700 text-sm mb-3">
                      Some items in your wishlist have had price changes. Review them below!
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {wishlistItems
                        .filter(item => item.priceChange)
                        .map(item => (
                          <Badge 
                            key={item.id}
                            className={`${
                              item.priceChange?.type === 'decrease' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {item.priceChange?.type === 'decrease' ? (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            )}
                            {item.name.slice(0, 20)}... {item.priceChange?.percentage}%
                          </Badge>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Items Grid/List */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              <AnimatePresence>
                {sortedItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className={`${viewMode === 'list' ? 'max-w-none' : ''}`}
                  >
                    <Card className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${
                      !item.inStock ? 'opacity-75' : ''
                    } ${
                      selectedItems.has(item.id) ? 'ring-2 ring-orange-500' : ''
                    }`}>
                      <div className="relative">
                        {/* Selection Checkbox */}
                        <div className="absolute top-2 left-2 z-10">
                          <input
                            type="checkbox"
                            checked={selectedItems.has(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                            className="w-5 h-5 rounded border-2 border-white shadow-lg"
                          />
                        </div>

                        {/* Product Image */}
                        <Link href={`/products/${item.id}`}>
                          <div className={`${viewMode === 'list' ? 'aspect-square md:aspect-video' : 'aspect-square'} bg-gray-50 cursor-pointer overflow-hidden`}>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </Link>

                        {/* Badges */}
                        <div className="absolute top-2 right-2 flex flex-col gap-1">
                          {!item.inStock && (
                            <Badge className="bg-red-500 text-white">
                              Out of Stock
                            </Badge>
                          )}
                          {item.priceChange && (
                            <Badge className={`${
                              item.priceChange.type === 'decrease' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-red-500 text-white'
                            }`}>
                              {item.priceChange.type === 'decrease' ? (
                                <TrendingDown className="h-3 w-3 mr-1" />
                              ) : (
                                <TrendingUp className="h-3 w-3 mr-1" />
                              )}
                              {item.priceChange.percentage}%
                            </Badge>
                          )}
                          {item.originalPrice && item.originalPrice > item.price && (
                            <Badge className="bg-orange-500 text-white">
                              -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                            </Badge>
                          )}
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-white/80 hover:bg-white rounded-full"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>

                      <CardContent className="p-4">
                        {/* Product Info */}
                        <div className="space-y-3">
                          {/* Title */}
                          <Link href={`/products/${item.id}`}>
                            <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-orange-600 transition-colors cursor-pointer">
                              {item.name}
                            </h3>
                          </Link>

                          {/* Price */}
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-orange-600">
                              {formatPrice(item.price)}
                            </span>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <span className="text-sm text-gray-400 line-through">
                                {formatPrice(item.originalPrice)}
                              </span>
                            )}
                          </div>

                          {/* Rating & Seller */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{item.rating}</span>
                              <span className="text-sm text-gray-500">({item.reviewCount})</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <MapPin className="h-3 w-3" />
                              <span className="truncate">{item.retailerLocation}</span>
                            </div>
                          </div>

                          {/* Shipping Info */}
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1 text-green-600">
                              <Truck className="h-3 w-3" />
                              <span>
                                {item.shippingInfo.freeShipping ? 'Free shipping' : `K${item.shippingInfo.shippingCost} shipping`}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500">
                              <Clock className="h-3 w-3" />
                              <span>Added {formatDate(item.addedDate)}</span>
                            </div>
                          </div>

                          <Separator />

                          {/* Actions */}
                          <div className="flex gap-2">
                            <Button
                              onClick={() => addToCart(item)}
                              disabled={!item.inStock}
                              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white disabled:bg-gray-300"
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </Button>
                            <Button variant="outline" size="sm" className="px-3">
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="px-3">
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

            {/* Bottom CTA */}
            {inStockCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-center text-white"
              >
                <Gift className="h-12 w-12 mx-auto mb-4 text-orange-200" />
                <h2 className="text-2xl font-bold mb-2">Ready to Make a Purchase?</h2>
                <p className="text-orange-100 mb-6">
                  You have {inStockCount} items available in your wishlist worth {formatPrice(totalValue)}
                </p>
                <Button
                  onClick={() => {
                    wishlistItems.filter(item => item.inStock).forEach(item => addToCart(item))
                  }}
                  variant="secondary"
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-gray-100"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add All Available to Cart
                </Button>
              </motion.div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
