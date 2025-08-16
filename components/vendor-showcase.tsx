"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, ShoppingBag, Users, Award, Clock, Heart, ArrowRight, Verified, TrendingUp } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"

interface Vendor {
  id: string
  name: string
  businessName: string
  description: string
  avatar: string
  coverImage: string
  rating: number
  reviews: number
  location: string
  distance: number
  category: string
  specialties: string[]
  totalProducts: number
  totalSales: number
  joinedDate: string
  isVerified: boolean
  isLocal: boolean
  hasDelivery: boolean
  responseTime: string
  featuredProducts: {
    id: string
    name: string
    image: string
    price: number
  }[]
  badges: string[]
  gradient: string
  isFollowed: boolean
}

interface VendorShowcaseProps {
  title?: string
  subtitle?: string
  maxVendors?: number
  showCategory?: string
  layout?: 'grid' | 'featured'
}

const generateVendorData = (userLocation: string = "Lusaka"): Vendor[] => {
  const vendors = [
    {
      name: "Sarah Mwanza",
      businessName: "Lusaka Crafts & Co.",
      description: "Traditional Zambian crafts and modern designs for your home",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b830?w=100&h=100&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=300&fit=crop",
      category: "Traditional Crafts",
      specialties: ["Wooden sculptures", "Handwoven baskets", "Pottery"],
      gradient: "from-amber-500 to-orange-600"
    },
    {
      name: "James Banda",
      businessName: "Fresh Valley Farm",
      description: "Organic produce directly from our family farm to your table",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop",
      category: "Fresh Produce",
      specialties: ["Organic vegetables", "Fresh fruits", "Medicinal herbs"],
      gradient: "from-green-500 to-emerald-600"
    },
    {
      name: "Grace Tembo",
      businessName: "Zambian Fashion House",
      description: "Contemporary African fashion with traditional elements",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=300&fit=crop",
      category: "Fashion & Textiles",
      specialties: ["Chitenge designs", "Modern wear", "Custom tailoring"],
      gradient: "from-purple-500 to-pink-600"
    },
    {
      name: "Peter Mulenga",
      businessName: "Tech Solutions ZM",
      description: "Latest technology and electronics with expert support",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=300&fit=crop",
      category: "Electronics",
      specialties: ["Smartphones", "Laptops", "Accessories"],
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      name: "Mary Phiri",
      businessName: "Copper Rose Jewelry",
      description: "Exquisite copper jewelry and accessories handcrafted with love",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=600&h=300&fit=crop",
      category: "Jewelry & Accessories",
      specialties: ["Copper jewelry", "Beaded accessories", "Custom designs"],
      gradient: "from-rose-500 to-red-600"
    },
    {
      name: "Joseph Musonda",
      businessName: "Heritage Home Decor",
      description: "Beautiful furniture and decor pieces inspired by Zambian culture",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=300&fit=crop",
      category: "Home & Living",
      specialties: ["Wooden furniture", "Wall art", "Decorative items"],
      gradient: "from-teal-500 to-cyan-600"
    }
  ]

  return vendors.map((vendor, index) => ({
    id: `vendor-${index + 1}`,
    ...vendor,
    rating: 4.2 + Math.random() * 0.8,
    reviews: Math.floor(Math.random() * 300 + 50),
    location: index < 3 ? userLocation : ['Ndola', 'Kitwe', 'Livingstone'][index % 3],
    distance: index < 3 ? Math.random() * 5 + 1 : Math.random() * 50 + 10,
    totalProducts: Math.floor(Math.random() * 200 + 20),
    totalSales: Math.floor(Math.random() * 1000 + 100),
    joinedDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    isVerified: Math.random() > 0.3,
    isLocal: index < 4,
    hasDelivery: Math.random() > 0.2,
    responseTime: ['< 1 hour', '< 2 hours', '< 4 hours'][Math.floor(Math.random() * 3)],
    featuredProducts: Array.from({ length: 3 }, (_, i) => ({
      id: `product-${index}-${i}`,
      name: `Product ${i + 1}`,
      image: vendor.coverImage,
      price: Math.floor(Math.random() * 200 + 50)
    })),
    badges: ['Top Seller', 'Fast Delivery', 'Local Favorite', 'New Vendor'].slice(0, Math.floor(Math.random() * 3) + 1),
    isFollowed: Math.random() > 0.7
  }))
}

export function VendorShowcase({
  title = "Featured Local Vendors",
  subtitle = "Discover amazing businesses in your community",
  maxVendors = 6,
  showCategory,
  layout = 'grid'
}: VendorShowcaseProps) {
  const { user } = useAuth()
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredVendor, setHoveredVendor] = useState<string | null>(null)

  useEffect(() => {
    const loadVendors = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const userLocation = user?.location || "Lusaka"
      let vendorData = generateVendorData(userLocation)
      
      if (showCategory) {
        vendorData = vendorData.filter(v => v.category === showCategory)
      }
      
      // Sort by proximity and rating
      vendorData.sort((a, b) => {
        if (a.isLocal !== b.isLocal) return a.isLocal ? -1 : 1
        if (Math.abs(a.distance - b.distance) < 1) return b.rating - a.rating
        return a.distance - b.distance
      })
      
      setVendors(vendorData.slice(0, maxVendors))
      setIsLoading(false)
    }

    loadVendors()
  }, [user, maxVendors, showCategory])

  const toggleFollow = (vendorId: string) => {
    setVendors(prev => prev.map(v => 
      v.id === vendorId ? { ...v, isFollowed: !v.isFollowed } : v
    ))
  }

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg animate-pulse mb-4 max-w-md mx-auto"></div>
            <div className="h-4 bg-slate-200 rounded animate-pulse max-w-lg mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg animate-pulse overflow-hidden">
                <div className="h-40 bg-slate-200"></div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-200 rounded"></div>
                      <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-200 rounded"></div>
                    <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
      {/* Animated Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 153, 204, 0.02) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 102, 0, 0.02) 100%)'
        }}
      ></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4">
            <span
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(135deg, #0099cc 0%, #ff6600 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {title}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4">
            {subtitle}
            {user?.location && (
              <span className="block mt-2 font-medium" style={{color: '#0099cc'}}>
                <MapPin className="inline h-4 w-4 mr-1" />
                Supporting local businesses in {user.location}
              </span>
            )}
          </p>
        </div>

        {/* Vendor Grid */}
        <div className={`grid gap-4 sm:gap-6 md:gap-8 ${
          layout === 'featured'
            ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {vendors.map((vendor, index) => (
            <Card
              key={vendor.id}
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 sm:hover:-translate-y-4 hover:scale-105 bg-white/95 backdrop-blur-sm border-white/30 overflow-hidden cursor-pointer mx-2 sm:mx-0"
              style={{
                boxShadow: '0 8px 32px rgba(0, 153, 204, 0.08), 0 1px 0 rgba(255, 255, 255, 0.8) inset',
                border: '1px solid rgba(0, 153, 204, 0.1)'
              }}
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredVendor(vendor.id)}
              onMouseLeave={() => setHoveredVendor(null)}
            >
              <CardContent className="p-0">
                {/* Cover Image */}
                <div className="relative h-32 sm:h-36 md:h-40 overflow-hidden">
                  <Image
                    src={vendor.coverImage}
                    alt={vendor.businessName}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${vendor.gradient} opacity-20 group-hover:opacity-40 transition-all duration-500`}></div>
                  
                  {/* Top Badges */}
                  <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 flex flex-wrap gap-1 sm:gap-2">
                    {vendor.isVerified && (
                      <Badge className="bg-blue-600/90 text-white font-bold flex items-center">
                        <Verified className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {vendor.isLocal && (
                      <Badge className="bg-green-600/90 text-white font-bold">
                        🏠 Local
                      </Badge>
                    )}
                  </div>

                  {/* Follow Button */}
                  <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Button
                      size="sm"
                      variant={vendor.isFollowed ? "default" : "secondary"}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFollow(vendor.id)
                      }}
                      className={`rounded-full p-2 shadow-lg backdrop-blur-sm transition-all duration-200 ${
                        vendor.isFollowed 
                          ? 'bg-red-500 hover:bg-red-600 text-white' 
                          : 'bg-white/90 hover:bg-white text-slate-700'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${vendor.isFollowed ? 'fill-current' : ''}`} />
                    </Button>
                  </div>

                  {/* Distance Badge */}
                  <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 bg-black/70 text-white text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-sm flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {vendor.distance < 10 ? `${vendor.distance.toFixed(1)}km` : vendor.location}
                  </div>
                </div>

                {/* Vendor Info */}
                <div className="p-4 sm:p-5 md:p-6">
                  {/* Header with Avatar */}
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <AvatarImage src={vendor.avatar} alt={vendor.name} />
                      <AvatarFallback>{vendor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-1">
                        {vendor.businessName}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-1">by {vendor.name}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-2">
                    {vendor.description}
                  </p>

                  {/* Rating and Reviews */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1.5 text-xs sm:text-sm font-bold text-slate-900">{vendor.rating.toFixed(1)}</span>
                      <span className="ml-1 text-xs sm:text-sm text-slate-500">({vendor.reviews})</span>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-slate-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {vendor.responseTime}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-3 sm:mb-4">
                    <p className="text-xs text-slate-500 mb-1 sm:mb-2 font-medium">Specializes in:</p>
                    <div className="flex flex-wrap gap-1">
                      {vendor.specialties.map((specialty, specIndex) => (
                        <span
                          key={specIndex}
                          className="text-xs bg-slate-100 text-slate-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full hover:bg-indigo-100 hover:text-indigo-700 transition-colors cursor-pointer"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-slate-200">
                    <div className="text-center">
                      <p className="text-sm sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {vendor.totalProducts}
                      </p>
                      <p className="text-xs text-slate-500">Products</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm sm:text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                        {vendor.totalSales}
                      </p>
                      <p className="text-xs text-slate-500">Sales</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <p className="text-sm sm:text-lg font-bold text-green-600">
                          {Math.round(vendor.rating * 20)}
                        </p>
                      </div>
                      <p className="text-xs text-slate-500">Score</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 mt-4 sm:mt-6">
                    <Button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 text-xs sm:text-sm px-2 sm:px-4 py-2">
                      <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Visit Store
                    </Button>
                    <Button variant="outline" size="sm" className="px-2 sm:px-3">
                      <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12 px-4">
          <Button
            size="lg"
            variant="outline"
            className="bg-white/80 backdrop-blur-sm border-2 border-slate-200 hover:bg-white hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Discover More Vendors
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
