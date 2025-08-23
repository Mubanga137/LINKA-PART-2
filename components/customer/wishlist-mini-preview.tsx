"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  TrendingDown,
  ArrowRight,
  Sparkles,
  Gift,
  Eye
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface WishlistItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  retailerName: string
  onSale?: boolean
  trending?: boolean
}

// Mock wishlist data - in real app this would come from context/API
const MOCK_WISHLIST_ITEMS: WishlistItem[] = [
  {
    id: "1",
    name: "Traditional Maasai Necklace",
    price: 1250,
    originalPrice: 2500,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&q=80",
    rating: 4.8,
    reviewCount: 156,
    retailerName: "AfriCrafts Kenya",
    onSale: true
  },
  {
    id: "2",
    name: "Ankara Print Dress",
    price: 1920,
    originalPrice: 3200,
    image: "https://images.unsplash.com/photo-1594736797933-d0300ad942ed?w=200&q=80",
    rating: 4.9,
    reviewCount: 203,
    retailerName: "Afro Fashion House",
    onSale: true,
    trending: true
  },
  {
    id: "3",
    name: "Handwoven Kiondo Basket",
    price: 990,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&q=80",
    rating: 4.7,
    reviewCount: 89,
    retailerName: "Kenyan Crafts Co."
  },
  {
    id: "4",
    name: "Organic Coffee Beans 1kg",
    price: 840,
    originalPrice: 1200,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200&q=80",
    rating: 4.9,
    reviewCount: 334,
    retailerName: "Highland Coffee Co.",
    onSale: true
  }
]

export function WishlistMiniPreview() {
  const router = useRouter()
  const [displayItems, setDisplayItems] = useState<WishlistItem[]>([])
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    // Show first 3 items
    setDisplayItems(MOCK_WISHLIST_ITEMS.slice(0, 3))
    setIsVisible(true)
  }, [])

  const totalItems = MOCK_WISHLIST_ITEMS.length
  const onSaleCount = MOCK_WISHLIST_ITEMS.filter(item => item.onSale).length
  const totalValue = MOCK_WISHLIST_ITEMS.reduce((sum, item) => sum + item.price, 0)

  const formatPrice = (price: number) => `K${price.toLocaleString()}`

  const handleViewAll = () => {
    router.push('/wishlist')
  }

  const handleQuickAdd = (item: WishlistItem, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Add to cart logic here
    console.log('Adding to cart:', item.name)
  }

  if (totalItems === 0) {
    return (
      <Card className="relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 opacity-50"></div>
        <CardContent className="relative p-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-4"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Start Your Wishlist</h3>
              <p className="text-sm text-gray-600 mb-4">Save items you love for later</p>
              <Button
                onClick={() => router.push('/marketplace')}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Explore Products
              </Button>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-500">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 via-purple-100/20 to-blue-200/20 group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              x: [0, 10, 0],
              y: [0, -5, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 right-4 w-8 h-8 bg-pink-300/30 rounded-full blur-sm"
          ></motion.div>
          <motion.div
            animate={{ 
              x: [0, -8, 0],
              y: [0, 8, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-6 left-6 w-6 h-6 bg-purple-300/30 rounded-full blur-sm"
          ></motion.div>
        </div>

        <CardHeader className="relative pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Heart className="h-5 w-5 text-white fill-current" />
              </motion.div>
              <div>
                <CardTitle className="text-lg font-bold text-gray-900">
                  Wishlist & Saved Items
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{totalItems} items</span>
                  {onSaleCount > 0 && (
                    <Badge className="bg-red-100 text-red-700 text-xs">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      {onSaleCount} on sale
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleViewAll}
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 group/btn"
            >
              <span className="mr-1">View All</span>
              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-purple-600">
                {formatPrice(totalValue)}
              </div>
              <div className="text-xs text-gray-600">Total Value</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-pink-600">
                {onSaleCount}
              </div>
              <div className="text-xs text-gray-600">On Sale</div>
            </div>
          </div>

          {/* Featured Items */}
          <div className="space-y-3">
            <AnimatePresence>
              {displayItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="group/item"
                >
                  <Link href={`/products/${item.id}`}>
                    <div className="flex items-center gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-lg hover:bg-white/90 transition-all duration-300 hover:shadow-md cursor-pointer">
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-lg">
                          <AvatarImage src={item.image} alt={item.name} />
                          <AvatarFallback className="bg-gradient-to-br from-pink-300 to-purple-400 text-white">
                            {item.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {item.onSale && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <TrendingDown className="h-2 w-2 text-white" />
                          </div>
                        )}
                        {item.trending && (
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center"
                          >
                            <Sparkles className="h-2 w-2 text-white" />
                          </motion.div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate group-hover/item:text-purple-600 transition-colors">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-purple-600">
                            {formatPrice(item.price)}
                          </span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-xs text-gray-400 line-through">
                              {formatPrice(item.originalPrice)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span>{item.rating}</span>
                          <span>({item.reviewCount})</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => handleQuickAdd(item, e)}
                          className="h-8 w-8 p-0 text-purple-600 hover:bg-purple-100"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-gray-600 hover:bg-gray-100"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* View All CTA */}
          {totalItems > 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center pt-2"
            >
              <Button
                onClick={handleViewAll}
                variant="outline"
                className="w-full bg-white/60 backdrop-blur-sm border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 group/cta"
              >
                <span>View All {totalItems} Items</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover/cta:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          )}

          {/* Loyalty Hint */}
          {onSaleCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-sm">
                <Gift className="h-4 w-4 text-yellow-600" />
                <span className="text-yellow-800 font-medium">
                  Buy sale items today to earn bonus points! 🎁
                </span>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
