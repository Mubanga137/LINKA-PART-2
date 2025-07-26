"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Heart, ShoppingCart, Eye, TrendingUp, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"

interface Product {
  id: string
  name: string
  vendor: string
  location: string
  distance: number
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  category: string
  badge: string
  badgeType: 'trending' | 'new' | 'bestseller' | 'local-favorite' | 'flash-sale'
  imageUrl: string
  colors: string[]
  isLiked: boolean
  viewCount: number
  lastViewed?: Date
}

const generateDynamicProducts = (userLocation: string = "Lusaka", userRole: string = "customer"): Product[] => {
  const categories = ['electronics', 'fashion', 'food', 'crafts', 'jewelry', 'home-decor', 'agriculture']
  const vendors = [
    'Local Artisans Hub', 'Zambia Craft Co.', 'Lusaka Electronics', 'Fashion Forward ZM',
    'Farm Fresh Lusaka', 'Heritage Crafts', 'Urban Style Store', 'Green Valley Farm',
    'Tech Solutions ZM', 'Copper Rose Jewelry', 'Home Comfort Store', 'Cultural Treasures'
  ]
  
  const productNames = [
    'Premium Coffee Beans', 'Handwoven Basket', 'Smartphone Accessories', 'Traditional Jewelry',
    'Organic Vegetables', 'Leather Handbag', 'Solar Power Bank', 'Wooden Sculptures',
    'Fashion Sneakers', 'Honey & Bee Products', 'Copper Art Piece', 'Laptop Stand'
  ]

  const dynamicImages = [
    'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop&crop=center'
  ]

  return Array.from({ length: 12 }, (_, i) => ({
    id: `product-${i + 1}`,
    name: productNames[i % productNames.length],
    vendor: vendors[i % vendors.length],
    location: i < 6 ? userLocation : ['Ndola', 'Kitwe', 'Livingstone', 'Chipata'][i % 4],
    distance: i < 6 ? Math.random() * 5 + 1 : Math.random() * 50 + 10,
    price: Math.floor(Math.random() * 500 + 50),
    originalPrice: Math.random() > 0.6 ? Math.floor(Math.random() * 200 + 100) : undefined,
    rating: 4.2 + Math.random() * 0.8,
    reviews: Math.floor(Math.random() * 300 + 10),
    category: categories[i % categories.length],
    badge: ['🔥 Trending', '✨ New Arrival', '👑 Best Seller', '❤️ Local Favorite', '⚡ Flash Sale'][i % 5],
    badgeType: ['trending', 'new', 'bestseller', 'local-favorite', 'flash-sale'][i % 5] as any,
    imageUrl: dynamicImages[i % dynamicImages.length],
    colors: ['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'],
    isLiked: Math.random() > 0.7,
    viewCount: Math.floor(Math.random() * 1000 + 50),
    lastViewed: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : undefined
  }))
}

const getBadgeStyles = (type: string) => {
  const styles = {
    trending: 'bg-gradient-to-r from-orange-500 to-red-500 animate-pulse',
    new: 'bg-gradient-to-r from-green-500 to-emerald-500 animate-bounce',
    bestseller: 'bg-gradient-to-r from-purple-500 to-indigo-500 animate-pulse',
    'local-favorite': 'bg-gradient-to-r from-pink-500 to-rose-500',
    'flash-sale': 'bg-gradient-to-r from-red-600 to-orange-600 animate-pulse'
  }
  return styles[type as keyof typeof styles] || 'bg-gray-500'
}

interface PersonalizedProductCarouselProps {
  title?: string
  subtitle?: string
  category?: string
  maxItems?: number
}

export function PersonalizedProductCarousel({ 
  title = "Personalized for You",
  subtitle = "Curated based on your location and preferences",
  category,
  maxItems = 8
}: PersonalizedProductCarouselProps) {
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadPersonalizedProducts = async () => {
      setIsLoading(true)
      // Simulate API call with personalization
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const userLocation = user?.location || "Lusaka"
      const userRole = user?.role || "customer"
      
      let dynamicProducts = generateDynamicProducts(userLocation, userRole)
      
      if (category) {
        dynamicProducts = dynamicProducts.filter(p => p.category === category)
      }
      
      // Sort by relevance (distance, trending, user behavior)
      dynamicProducts.sort((a, b) => {
        if (a.lastViewed && b.lastViewed) {
          return b.lastViewed.getTime() - a.lastViewed.getTime()
        }
        if (a.distance !== b.distance) {
          return a.distance - b.distance
        }
        return b.viewCount - a.viewCount
      })
      
      setProducts(dynamicProducts.slice(0, maxItems))
      setIsLoading(false)
    }

    loadPersonalizedProducts()
  }, [user, category, maxItems])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    
    const container = scrollContainerRef.current
    const cardWidth = 320
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    })
  }

  const handleProductClick = (productId: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId 
        ? { ...p, viewCount: p.viewCount + 1, lastViewed: new Date() }
        : p
    ))
  }

  const toggleLike = (productId: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, isLiked: !p.isLiked } : p
    ))
  }

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg animate-pulse mb-4"></div>
            <div className="h-4 bg-slate-200 rounded animate-pulse max-w-md mx-auto"></div>
          </div>
          <div className="flex space-x-6 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="min-w-80 bg-white rounded-xl shadow-lg animate-pulse">
                <div className="h-64 bg-slate-200 rounded-t-xl"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-6 bg-slate-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50"></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              {subtitle}
              {user?.location && (
                <span className="inline-flex items-center ml-2 text-indigo-600 font-medium">
                  <MapPin className="h-4 w-4 mr-1" />
                  Near {user.location}
                </span>
              )}
            </p>
          </div>
          
          {/* Navigation Controls */}
          <div className="hidden md:flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => scroll('left')}
              className="rounded-full p-3 hover:bg-slate-100 transition-all duration-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => scroll('right')}
              className="rounded-full p-3 hover:bg-slate-100 transition-all duration-200"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Product Carousel */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {products.map((product, index) => (
              <Card
                key={product.id}
                className="min-w-80 group hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2 hover:scale-105 bg-white/90 backdrop-blur-sm border-white/20 overflow-hidden cursor-pointer"
                style={{ 
                  scrollSnapAlign: 'start',
                  animationDelay: `${index * 100}ms` 
                }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => handleProductClick(product.id)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    {/* Dynamic Product Image */}
                    <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      
                      {/* Interactive Elements */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="rounded-full p-2 bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm hover:scale-110 transition-all duration-200"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleLike(product.id)
                          }}
                        >
                          <Heart className={`h-4 w-4 ${product.isLiked ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
                        </Button>
                      </div>

                      {/* Dynamic Badge */}
                      <Badge className={`absolute top-4 left-4 text-white font-bold px-3 py-1.5 ${getBadgeStyles(product.badgeType)} shadow-lg group-hover:scale-110 transition-all duration-300`}>
                        {product.badge}
                      </Badge>

                      {/* Quick Actions */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
                        <div className="flex space-x-3">
                          <Button
                            size="sm"
                            className="bg-white/95 text-slate-900 hover:bg-white shadow-lg backdrop-blur-sm hover:scale-110 transition-all duration-200"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Quick View
                          </Button>
                        </div>
                      </div>

                      {/* Recently Viewed Indicator */}
                      {product.lastViewed && (
                        <div className="absolute bottom-4 left-4 bg-blue-600/90 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Recently viewed
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Rating and Location */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1.5 text-sm font-bold text-slate-900">{product.rating.toFixed(1)}</span>
                        <span className="ml-1 text-sm text-slate-500">({product.reviews})</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-500">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        {product.distance < 10 ? `${product.distance.toFixed(1)}km` : product.location}
                      </div>
                    </div>

                    {/* Product Information */}
                    <h3 className="font-bold text-slate-900 mb-2 text-lg group-hover:text-indigo-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 font-medium">
                      {product.vendor}
                    </p>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                          ZMW {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-slate-500 line-through">
                            ZMW {product.originalPrice}
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all hover:scale-110"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>

                    {/* Social Proof */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-200">
                      <div className="flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {product.viewCount} views
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        Popular nearby
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Floating View All Button */}
          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="lg"
              className="bg-white/80 backdrop-blur-sm border-2 border-slate-200 hover:bg-white hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View All Products
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
