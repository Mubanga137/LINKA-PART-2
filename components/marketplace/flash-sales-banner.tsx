"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Flame,
  Clock,
  ArrowRight,
  Zap,
  ShoppingCart,
  Star,
  Eye,
  Users,
  Timer,
  ChevronLeft,
  ChevronRight,
  Gift,
  Sparkles,
  TrendingUp
} from "lucide-react"

interface FlashSaleItem {
  id: string
  name: string
  image: string
  originalPrice: number
  salePrice: number
  discountPercent: number
  soldCount: number
  totalStock: number
  rating: number
  reviewCount: number
  timeLeft: number // in seconds
  category: string
  isLimitedTime: boolean
}

const FLASH_SALE_ITEMS: FlashSaleItem[] = [
  {
    id: "1",
    name: "Traditional Maasai Beaded Necklace",
    image: "/placeholder.svg",
    originalPrice: 2500,
    salePrice: 1250,
    discountPercent: 50,
    soldCount: 89,
    totalStock: 120,
    rating: 4.8,
    reviewCount: 156,
    timeLeft: 7200, // 2 hours
    category: "Jewelry",
    isLimitedTime: true
  },
  {
    id: "2", 
    name: "Ankara Print Women's Dress",
    image: "/placeholder.svg",
    originalPrice: 3200,
    salePrice: 1920,
    discountPercent: 40,
    soldCount: 142,
    totalStock: 200,
    rating: 4.9,
    reviewCount: 203,
    timeLeft: 5400, // 1.5 hours
    category: "Fashion",
    isLimitedTime: true
  },
  {
    id: "3",
    name: "Handwoven Kiondo Basket",
    image: "/placeholder.svg", 
    originalPrice: 1800,
    salePrice: 990,
    discountPercent: 45,
    soldCount: 67,
    totalStock: 100,
    rating: 4.7,
    reviewCount: 89,
    timeLeft: 9000, // 2.5 hours
    category: "Crafts",
    isLimitedTime: true
  },
  {
    id: "4",
    name: "Organic Kenyan Coffee Beans 1kg",
    image: "/placeholder.svg",
    originalPrice: 1200,
    salePrice: 840,
    discountPercent: 30,
    soldCount: 234,
    totalStock: 300,
    rating: 4.9,
    reviewCount: 334,
    timeLeft: 3600, // 1 hour
    category: "Food",
    isLimitedTime: true
  },
  {
    id: "5",
    name: "Wood Carved African Mask",
    image: "/placeholder.svg",
    originalPrice: 4500,
    salePrice: 2700,
    discountPercent: 40,
    soldCount: 23,
    totalStock: 50,
    rating: 4.6,
    reviewCount: 45,
    timeLeft: 10800, // 3 hours
    category: "Art",
    isLimitedTime: true
  }
]

function CountdownTimer({ timeLeft }: { timeLeft: number }) {
  const [time, setTime] = useState(timeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => prev > 0 ? prev - 1 : 0)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = time % 60

  const isUrgent = time < 3600 // Less than 1 hour

  return (
    <div className={`flex items-center gap-1 ${isUrgent ? 'text-red-600' : 'text-orange-600'}`}>
      <Timer className={`h-3 w-3 ${isUrgent ? 'animate-pulse' : ''}`} />
      <div className="flex items-center gap-1 font-mono text-sm font-semibold">
        <span className={`px-1.5 py-0.5 rounded ${isUrgent ? 'bg-red-100' : 'bg-orange-100'}`}>
          {hours.toString().padStart(2, '0')}
        </span>
        <span>:</span>
        <span className={`px-1.5 py-0.5 rounded ${isUrgent ? 'bg-red-100' : 'bg-orange-100'}`}>
          {minutes.toString().padStart(2, '0')}
        </span>
        <span>:</span>
        <span className={`px-1.5 py-0.5 rounded ${isUrgent ? 'bg-red-100' : 'bg-orange-100'}`}>
          {seconds.toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}

function FlashSaleCard({ item }: { item: FlashSaleItem }) {
  const soldPercentage = (item.soldCount / item.totalStock) * 100
  const isAlmostSoldOut = soldPercentage > 80
  const formatPrice = (price: number) => `K${price.toLocaleString()}`

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden min-w-[280px] md:min-w-[320px]"
    >
      <div className="relative">
        {/* Product Image */}
        <Link href={`/products/${item.id}`}>
          <div className="aspect-square bg-gray-50 cursor-pointer overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* Discount Badge */}
        <div className="absolute top-2 left-2">
          <Badge className="bg-red-500 text-white font-bold px-2 py-1 animate-pulse">
            <Flame className="h-3 w-3 mr-1" />
            -{item.discountPercent}%
          </Badge>
        </div>

        {/* Category Badge */}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="text-xs">
            {item.category}
          </Badge>
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white p-2 rounded-full">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Product Title */}
        <Link href={`/products/${item.id}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-orange-600 transition-colors cursor-pointer">
            {item.name}
          </h3>
        </Link>

        {/* Price Section */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-red-600">
            {formatPrice(item.salePrice)}
          </span>
          <span className="text-sm text-gray-400 line-through">
            {formatPrice(item.originalPrice)}
          </span>
          <span className="text-sm text-green-600 font-semibold">
            Save K{(item.originalPrice - item.salePrice).toLocaleString()}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{item.rating}</span>
            <span className="text-sm text-gray-500">({item.reviewCount})</span>
          </div>
        </div>

        {/* Stock Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              <Users className="h-3 w-3 inline mr-1" />
              {item.soldCount} sold
            </span>
            <span className={`font-medium ${isAlmostSoldOut ? 'text-red-600' : 'text-gray-600'}`}>
              {item.totalStock - item.soldCount} left
            </span>
          </div>
          <div className="relative">
            <Progress 
              value={soldPercentage} 
              className={`h-2 ${isAlmostSoldOut ? 'bg-red-100' : 'bg-gray-100'}`}
            />
            <div className={`absolute inset-0 rounded-full ${
              isAlmostSoldOut ? 'bg-gradient-to-r from-red-400 to-red-600' : 'bg-gradient-to-r from-orange-400 to-orange-600'
            } transition-all duration-300`} 
            style={{ width: `${soldPercentage}%` }} />
          </div>
          {isAlmostSoldOut && (
            <motion.p 
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-xs text-red-600 font-medium"
            >
              🔥 Almost sold out!
            </motion.p>
          )}
        </div>

        {/* Countdown Timer */}
        <div className="bg-orange-50 rounded-lg p-2">
          <CountdownTimer timeLeft={item.timeLeft} />
        </div>

        {/* Action Button */}
        <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Buy Now
        </Button>
      </div>
    </motion.div>
  )
}

export function FlashSalesBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-scroll functionality
  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % Math.max(1, FLASH_SALE_ITEMS.length - 2))
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [isHovered])

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % Math.max(1, FLASH_SALE_ITEMS.length - 2))
  }

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + Math.max(1, FLASH_SALE_ITEMS.length - 2)) % Math.max(1, FLASH_SALE_ITEMS.length - 2))
  }

  return (
    <div className="bg-gradient-to-br from-red-500 via-red-600 to-orange-600 rounded-2xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
            >
              <Flame className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                Flash Sale
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Zap className="h-6 w-6 text-yellow-300" />
                </motion.div>
              </h2>
              <p className="text-white/90 text-sm">Limited time offers • Don't miss out!</p>
            </div>
          </div>
          
          <Link href="/marketplace?tags=flash-sale">
            <Button variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Next Flash Sale Timer */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Next flash sale starts in:</span>
            </div>
            <div className="flex items-center gap-1 text-white font-mono text-sm">
              <span className="bg-white/20 px-2 py-1 rounded">12</span>
              <span>:</span>
              <span className="bg-white/20 px-2 py-1 rounded">34</span>
              <span>:</span>
              <span className="bg-white/20 px-2 py-1 rounded">56</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Carousel */}
      <div 
        className="relative px-6 pb-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex gap-4 overflow-x-auto scrollbar-hide md:overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex gap-4 min-w-full md:min-w-0"
            >
              {FLASH_SALE_ITEMS.slice(currentIndex, currentIndex + 3).map((item) => (
                <div key={item.id} className="flex-shrink-0">
                  <FlashSaleCard item={item} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows - Desktop */}
        <div className="hidden md:flex">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 text-white hover:bg-white/30 rounded-full p-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 text-white hover:bg-white/30 rounded-full p-2"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: Math.max(1, FLASH_SALE_ITEMS.length - 2) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Scroll Hint */}
      <div className="md:hidden px-6 pb-4">
        <div className="flex items-center justify-center gap-2 text-white/70 text-xs">
          <span>Swipe to see more deals</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>

      {/* Bottom CTA Strip */}
      <div className="bg-black/20 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white text-sm">
            <Gift className="h-4 w-4" />
            <span>Free shipping on flash sale items</span>
          </div>
          <div className="flex items-center gap-2 text-white text-sm">
            <TrendingUp className="h-4 w-4" />
            <span>+{Math.floor(Math.random() * 1000) + 500} sold today</span>
          </div>
        </div>
      </div>
    </div>
  )
}
