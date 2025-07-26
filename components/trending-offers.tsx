"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Flame, Zap, TrendingUp, Users, ShoppingCart, Heart, Timer, Lightning, Star, MapPin, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"

interface TrendingOffer {
  id: string
  title: string
  description: string
  vendor: string
  location: string
  distance: number
  imageUrl: string
  originalPrice: number
  discountedPrice: number
  discountPercentage: number
  category: string
  stockLeft: number
  totalStock: number
  timeLeft: number // in minutes
  views: number
  saves: number
  offerType: 'flash-sale' | 'daily-deal' | 'weekend-special' | 'clearance' | 'new-arrival'
  isLimited: boolean
  isHot: boolean
  gradient: string
  rating: number
  reviews: number
  isLiked: boolean
}

interface TrendingOffersProps {
  title?: string
  subtitle?: string
  maxOffers?: number
  layout?: 'grid' | 'carousel' | 'featured'
  showTimer?: boolean
}

const generateTrendingOffers = (userLocation: string = "Lusaka"): TrendingOffer[] => {
  const offers = [
    {
      title: "Premium Coffee Beans - Limited Edition",
      description: "Aromatic single-origin coffee beans from Zambian highlands",
      vendor: "Kasama Coffee Roasters",
      imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop",
      category: "Food & Beverages",
      offerType: "flash-sale" as const,
      gradient: "from-amber-500 to-orange-600",
      isLimited: true,
      isHot: true
    },
    {
      title: "Handwoven Chitenge Fabric Set",
      description: "Beautiful traditional Zambian fabric perfect for any occasion",
      vendor: "Cultural Threads",
      imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
      category: "Fashion & Textiles",
      offerType: "weekend-special" as const,
      gradient: "from-purple-500 to-pink-600",
      isLimited: false,
      isHot: true
    },
    {
      title: "Solar Power Bank & Accessories",
      description: "Eco-friendly charging solution with multiple device compatibility",
      vendor: "Tech Solutions ZM",
      imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      category: "Electronics",
      offerType: "daily-deal" as const,
      gradient: "from-blue-500 to-indigo-600",
      isLimited: true,
      isHot: false
    },
    {
      title: "Organic Honey & Bee Products Bundle",
      description: "Pure honey with natural skincare products from local beekeepers",
      vendor: "Bee Happy Farm",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      category: "Food & Health",
      offerType: "new-arrival" as const,
      gradient: "from-yellow-500 to-orange-600",
      isLimited: false,
      isHot: true
    },
    {
      title: "Copper Art Collection",
      description: "Exquisite handcrafted copper art pieces and decorative items",
      vendor: "Copper Craft Masters",
      imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=300&fit=crop",
      category: "Art & Crafts",
      offerType: "clearance" as const,
      gradient: "from-orange-500 to-red-600",
      isLimited: true,
      isHot: false
    },
    {
      title: "Traditional Wooden Furniture Set",
      description: "Handcrafted dining set made from sustainable local wood",
      vendor: "Heritage Woodworks",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      category: "Furniture",
      offerType: "weekend-special" as const,
      gradient: "from-green-500 to-teal-600",
      isLimited: false,
      isHot: true
    }
  ]

  return offers.map((offer, index) => ({
    id: `offer-${index + 1}`,
    ...offer,
    location: index < 3 ? userLocation : ['Ndola', 'Kitwe', 'Livingstone'][index % 3],
    distance: index < 3 ? Math.random() * 5 + 1 : Math.random() * 50 + 10,
    originalPrice: Math.floor(Math.random() * 500 + 100),
    discountedPrice: Math.floor(Math.random() * 200 + 50),
    discountPercentage: Math.floor(Math.random() * 50 + 20),
    stockLeft: Math.floor(Math.random() * 20 + 5),
    totalStock: Math.floor(Math.random() * 50 + 30),
    timeLeft: Math.floor(Math.random() * 1440 + 60), // 1-24 hours
    views: Math.floor(Math.random() * 1000 + 100),
    saves: Math.floor(Math.random() * 200 + 20),
    rating: 4.2 + Math.random() * 0.8,
    reviews: Math.floor(Math.random() * 100 + 20),
    isLiked: Math.random() > 0.7
  }))
}

const formatTimeLeft = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours < 24) return `${hours}h ${mins}m`
  const days = Math.floor(hours / 24)
  const remainingHours = hours % 24
  return `${days}d ${remainingHours}h`
}

const getOfferTypeConfig = (type: string) => {
  const configs = {
    'flash-sale': { icon: Lightning, color: 'text-red-500', bg: 'bg-red-500', label: '⚡ Flash Sale' },
    'daily-deal': { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500', label: '🎯 Daily Deal' },
    'weekend-special': { icon: Star, color: 'text-purple-500', bg: 'bg-purple-500', label: '✨ Weekend Special' },
    'clearance': { icon: Zap, color: 'text-orange-500', bg: 'bg-orange-500', label: '🔥 Clearance' },
    'new-arrival': { icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500', label: '🆕 New Arrival' }
  }
  return configs[type as keyof typeof configs] || configs['daily-deal']
}

export function TrendingOffers({
  title = "🔥 Trending Offers",
  subtitle = "Limited-time deals from local vendors you don't want to miss",
  maxOffers = 6,
  layout = 'grid',
  showTimer = true
}: TrendingOffersProps) {
  const { user } = useAuth()
  const [offers, setOffers] = useState<TrendingOffer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(Date.now())

  useEffect(() => {
    const loadOffers = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const userLocation = user?.location || "Lusaka"
      let offerData = generateTrendingOffers(userLocation)
      
      // Sort by hotness, discount percentage, and proximity
      offerData.sort((a, b) => {
        if (a.isHot !== b.isHot) return a.isHot ? -1 : 1
        if (Math.abs(a.discountPercentage - b.discountPercentage) > 10) {
          return b.discountPercentage - a.discountPercentage
        }
        return a.distance - b.distance
      })
      
      setOffers(offerData.slice(0, maxOffers))
      setIsLoading(false)
    }

    loadOffers()
  }, [user, maxOffers])

  // Update timer every minute
  useEffect(() => {
    if (!showTimer) return
    
    const timer = setInterval(() => {
      setCurrentTime(Date.now())
      setOffers(prev => prev.map(offer => ({
        ...offer,
        timeLeft: Math.max(0, offer.timeLeft - 1)
      })))
    }, 60000)

    return () => clearInterval(timer)
  }, [showTimer])

  const toggleLike = (offerId: string) => {
    setOffers(prev => prev.map(offer => 
      offer.id === offerId 
        ? { ...offer, isLiked: !offer.isLiked, saves: offer.saves + (offer.isLiked ? -1 : 1) }
        : offer
    ))
  }

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gradient-to-r from-orange-200 to-red-300 rounded-lg animate-pulse mb-4 max-w-md mx-auto"></div>
            <div className="h-4 bg-slate-200 rounded animate-pulse max-w-lg mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg animate-pulse overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-orange-200 to-red-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-6 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-2 bg-slate-200 rounded"></div>
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
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-red-50/30 to-pink-50/50"></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
              {title}
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {subtitle}
            {user?.location && (
              <span className="block mt-2 text-orange-600 font-medium">
                <MapPin className="inline h-4 w-4 mr-1" />
                Hot deals near {user.location}
              </span>
            )}
          </p>
        </div>

        {/* Offers Grid */}
        <div className={`grid gap-6 ${
          layout === 'featured' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : layout === 'carousel'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {offers.map((offer, index) => {
            const offerConfig = getOfferTypeConfig(offer.offerType)
            const stockPercentage = (offer.stockLeft / offer.totalStock) * 100
            const urgencyLevel = offer.timeLeft < 120 ? 'critical' : offer.timeLeft < 480 ? 'medium' : 'low'
            
            return (
              <Card
                key={offer.id}
                className="group hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:-translate-y-3 hover:scale-105 bg-white/95 backdrop-blur-sm border-white/20 overflow-hidden cursor-pointer relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  {/* Trending Badge */}
                  {offer.isHot && (
                    <div className="absolute top-2 left-2 z-20">
                      <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold animate-pulse shadow-lg">
                        <Flame className="h-3 w-3 mr-1 animate-bounce" />
                        HOT
                      </Badge>
                    </div>
                  )}

                  {/* Timer Badge */}
                  {showTimer && (
                    <div className={`absolute top-2 right-2 z-20 ${
                      urgencyLevel === 'critical' ? 'animate-pulse' : ''
                    }`}>
                      <Badge className={`${
                        urgencyLevel === 'critical' 
                          ? 'bg-red-600 animate-pulse' 
                          : urgencyLevel === 'medium'
                          ? 'bg-orange-600'
                          : 'bg-slate-600'
                      } text-white font-bold shadow-lg`}>
                        <Timer className="h-3 w-3 mr-1" />
                        {formatTimeLeft(offer.timeLeft)}
                      </Badge>
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={offer.imageUrl}
                      alt={offer.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${offer.gradient} opacity-20 group-hover:opacity-40 transition-all duration-500`}></div>
                    
                    {/* Discount Overlay */}
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {offer.discountPercentage}% OFF
                      </div>
                      <div className="text-xs text-slate-600">Save ZMW {offer.originalPrice - offer.discountedPrice}</div>
                    </div>

                    {/* Like Button */}
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute bottom-4 right-4 rounded-full p-2 bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleLike(offer.id)
                      }}
                    >
                      <Heart className={`h-4 w-4 ${offer.isLiked ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
                    </Button>
                  </div>

                  {/* Offer Details */}
                  <div className="p-6">
                    {/* Offer Type & Rating */}
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={`${offerConfig.bg} text-white font-bold`}>
                        {offerConfig.label}
                      </Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-bold text-slate-900">{offer.rating.toFixed(1)}</span>
                        <span className="ml-1 text-sm text-slate-500">({offer.reviews})</span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-orange-600 transition-colors duration-300 line-clamp-1">
                      {offer.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {offer.description}
                    </p>

                    {/* Vendor & Location */}
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <span className="text-slate-700 font-medium">{offer.vendor}</span>
                      <div className="flex items-center text-slate-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        {offer.distance < 10 ? `${offer.distance.toFixed(1)}km` : offer.location}
                      </div>
                    </div>

                    {/* Stock Progress */}
                    {offer.isLimited && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-slate-600">Stock remaining</span>
                          <span className={`font-bold ${
                            stockPercentage < 20 ? 'text-red-600' : 
                            stockPercentage < 50 ? 'text-orange-600' : 'text-green-600'
                          }`}>
                            {offer.stockLeft} left
                          </span>
                        </div>
                        <Progress 
                          value={stockPercentage} 
                          className={`h-2 ${
                            stockPercentage < 20 ? '[&>div]:bg-red-500' : 
                            stockPercentage < 50 ? '[&>div]:bg-orange-500' : '[&>div]:bg-green-500'
                          }`}
                        />
                      </div>
                    )}

                    {/* Pricing */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-slate-900 group-hover:text-green-600 transition-colors">
                          ZMW {offer.discountedPrice}
                        </span>
                        <span className="text-lg text-slate-500 line-through">
                          ZMW {offer.originalPrice}
                        </span>
                      </div>
                    </div>

                    {/* Social Proof */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {offer.views} people viewed
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {offer.saves} saves
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 group-hover:animate-bounce">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Grab This Deal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="bg-white/80 backdrop-blur-sm border-2 border-orange-200 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Flame className="mr-2 h-4 w-4" />
            View All Hot Deals
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
