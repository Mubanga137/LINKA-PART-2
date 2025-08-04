"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Package,
  Clock,
  Star,
  RotateCcw,
  Eye,
  ShoppingCart,
  MapPin,
  TrendingUp,
  ArrowRight,
  Heart,
  CheckCircle,
  Truck,
  AlertCircle
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for recent orders
const recentOrders = [
  {
    id: "ORD-001",
    status: "Delivered",
    statusColor: "green",
    total: 245.99,
    date: "2 days ago",
    items: [
      {
        id: "1",
        name: "Traditional Chitenge Dress",
        image: "https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=300&q=80",
        quantity: 1,
        price: 89.99
      },
      {
        id: "2",
        name: "Handwoven Basket Set",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&q=80",
        quantity: 2,
        price: 78.00
      }
    ],
    vendor: "Zambian Heritage Fashion",
    trackingNumber: "ZL123456789"
  },
  {
    id: "ORD-002",
    status: "Shipped",
    statusColor: "blue",
    total: 89.99,
    date: "5 days ago",
    items: [
      {
        id: "3",
        name: "Bluetooth Speaker System",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80",
        quantity: 1,
        price: 89.99
      }
    ],
    vendor: "Audio Pro Zambia",
    trackingNumber: "ZL987654321"
  },
  {
    id: "ORD-003",
    status: "Processing",
    statusColor: "orange",
    total: 156.50,
    date: "1 week ago",
    items: [
      {
        id: "4",
        name: "Organic Face Cream",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80",
        quantity: 3,
        price: 52.17
      }
    ],
    vendor: "Natural Beauty Zambia",
    trackingNumber: "ZL456789123"
  }
]

// Mock data for recently viewed products
const recentlyViewed = [
  {
    id: "1",
    name: "Smart Fitness Watch",
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=300&q=80",
    price: 159.99,
    originalPrice: 299.99,
    rating: 4.7,
    reviewCount: 245,
    vendor: "Wearable Tech Zambia",
    discount: 47,
    viewedAt: "2 hours ago",
    inStock: true
  },
  {
    id: "2",
    name: "Gaming Headset Pro",
    image: "https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=300&q=80",
    price: 79.99,
    originalPrice: 149.99,
    rating: 4.8,
    reviewCount: 189,
    vendor: "Gaming World Zambia",
    discount: 47,
    viewedAt: "5 hours ago",
    inStock: true
  },
  {
    id: "3",
    name: "Designer Handbag Collection",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80",
    price: 89.99,
    originalPrice: 179.99,
    rating: 4.9,
    reviewCount: 87,
    vendor: "Luxury Fashion Zambia",
    discount: 50,
    viewedAt: "1 day ago",
    inStock: false
  },
  {
    id: "4",
    name: "Wireless Charging Station",
    image: "https://images.unsplash.com/photo-1601972602237-8c79241e468b?w=300&q=80",
    price: 49.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviewCount: 156,
    vendor: "Tech Accessories Zambia",
    discount: 50,
    viewedAt: "2 days ago",
    inStock: true
  }
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Delivered":
      return <CheckCircle className="h-4 w-4" />
    case "Shipped":
      return <Truck className="h-4 w-4" />
    case "Processing":
      return <AlertCircle className="h-4 w-4" />
    default:
      return <Package className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-800 border-green-200"
    case "Shipped":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Processing":
      return "bg-orange-100 text-orange-800 border-orange-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function RecentOrdersViewed() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = (productId: string) => {
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

  const handleReorder = (order: typeof recentOrders[0]) => {
    // Add reorder logic here
    console.log("Reordering:", order.id)
  }

  const handleQuickView = (product: typeof recentlyViewed[0]) => {
    // Add quick view logic here
    console.log("Quick view:", product.id)
  }

  const handleAddToCart = (product: typeof recentlyViewed[0]) => {
    // Add to cart logic here
    console.log("Adding to cart:", product.id)
  }

  return (
    <div className="space-y-8">
      {/* Recent Orders Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
                  <p className="text-sm text-gray-600">Track your recent purchases and delivery status</p>
                </div>
              </div>
              <Link href="/orders">
                <Button variant="outline" size="sm" className="group">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-sm">
                      <p className="font-semibold text-gray-900">{order.id}</p>
                      <p className="text-gray-600">{order.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-900">K{order.total.toFixed(2)}</p>
                    <Badge className={`${getStatusColor(order.status)} border`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status}</span>
                    </Badge>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="flex items-center gap-3 mb-3">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <div key={item.id} className="relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                      />
                      {item.quantity > 1 && (
                        <Badge className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                          {item.quantity}
                        </Badge>
                      )}
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">+{order.items.length - 3}</span>
                    </div>
                  )}
                </div>

                {/* Vendor Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{order.vendor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReorder(order)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Reorder
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/orders/${order.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.section>

      {/* Recently Viewed Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
                  <p className="text-sm text-gray-600">Continue shopping where you left off</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="group">
                Clear History
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentlyViewed.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-purple-300 transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Discount Badge */}
                    {product.discount && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                        {product.discount}% OFF
                      </Badge>
                    )}

                    {/* Favorite Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          favorites.has(product.id) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </Button>

                    {/* Stock Status */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive">Out of Stock</Badge>
                      </div>
                    )}

                    {/* View Time */}
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-black/50 text-white text-xs">
                        {product.viewedAt}
                      </Badge>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">
                        ({product.reviewCount})
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="font-bold text-purple-600">
                        K{product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          K{product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        onClick={() => handleQuickView(product)}
                        variant="outline"
                        className="flex-1 text-xs"
                        disabled={!product.inStock}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-xs"
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        {product.inStock ? 'Add' : 'Sold Out'}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  )
}
