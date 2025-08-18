"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Play, 
  Music, 
  Gamepad2, 
  Video, 
  Mic, 
  Search, 
  TrendingUp, 
  Users, 
  Star, 
  Zap,
  Heart,
  Share2,
  Plus,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

const featuredContent = [
  {
    id: 1,
    title: "FIFA 24 Championship",
    type: "Gaming",
    category: "Esports",
    duration: "Live Tournament",
    viewers: "15.2K",
    rating: 4.9,
    price: "ZMW 25 Entry",
    isLive: true,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop",
    description: "Join the biggest FIFA tournament in Zambia with ZMW 50,000 prize pool",
    gradient: "from-pink-500 to-blue-500"
  },
  {
    id: 2,
    title: "Local Music Festival",
    type: "Music",
    category: "Live Event",
    duration: "3 Days",
    viewers: "8.7K",
    rating: 4.8,
    price: "ZMW 150",
    isLive: false,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=500&fit=crop",
    description: "Experience the best of Zambian music with top artists like Chef 187, Yo Maps",
    gradient: "from-teal-500 to-yellow-500"
  },
  {
    id: 3,
    title: "The Copper Chronicles",
    type: "Movie",
    category: "Local Film",
    duration: "2h 15m",
    viewers: "12.1K",
    rating: 4.7,
    price: "ZMW 15",
    isLive: false,
    image: "https://images.unsplash.com/photo-1489599510067-e6327c8e4b9b?w=800&h=500&fit=crop",
    description: "Award-winning Zambian drama exploring our mining heritage",
    gradient: "from-purple-500 to-violet-500"
  },
  {
    id: 4,
    title: "Comedy Night Live",
    type: "Comedy",
    category: "Live Show",
    duration: "Tonight 8PM",
    viewers: "5.3K",
    rating: 4.9,
    price: "ZMW 50",
    isLive: true,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=500&fit=crop",
    description: "Laugh with Zambia's funniest comedians including Bob Nkosha and Uncle Rasco",
    gradient: "from-red-500 to-orange-500"
  }
]

const trendingSearches = [
  "FIFA 24 Tournament", 
  "Local Music", 
  "Comedy Shows", 
  "DJ Bookings", 
  "Live Events",
  "Gaming Coaching",
  "Music Videos",
  "Streaming"
]

export function EntertainmentHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
  const [likedItems, setLikedItems] = useState<number[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredContent.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const currentContent = featuredContent[currentSlide]
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredContent.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredContent.length) % featuredContent.length)
  }

  const toggleLike = (id: number) => {
    setLikedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${currentContent.gradient} opacity-20 transition-all duration-1000`}
        />
        <div className="absolute inset-0 bg-slate-950/60" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-white rounded-full opacity-30 animate-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <Music className="absolute top-1/4 left-1/4 h-8 w-8 text-white/10 animate-float" style={{ animationDelay: "1s" }} />
          <Video className="absolute top-1/3 right-1/3 h-6 w-6 text-white/10 animate-bounce" style={{ animationDelay: "2s" }} />
          <Gamepad2 className="absolute bottom-1/3 left-1/3 h-7 w-7 text-white/10 animate-pulse" style={{ animationDelay: "3s" }} />
          <Mic className="absolute bottom-1/4 right-1/4 h-5 w-5 text-white/10 animate-float" style={{ animationDelay: "4s" }} />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm px-6 py-3 text-white border border-white/20 mb-6">
            <Zap className="mr-2 h-5 w-5 text-yellow-400 animate-pulse" />
            <span className="text-sm font-medium">🔥 Your Ultimate Entertainment Destination</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-pulse">
              Entertainment
            </span>
            <br />
            <span className={`bg-gradient-to-r ${currentContent.gradient} bg-clip-text text-transparent transition-all duration-1000`}>
              Universe
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
            Stream, game, discover, and experience the vibrant world of Zambian entertainment
          </p>
        </div>

        {/* Enhanced Search Bar */}
        <div className="max-w-3xl mx-auto mb-16 relative">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 h-6 w-6" />
            <Input
              type="text"
              placeholder="Search games, movies, music, events, talent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
              className="pl-16 pr-32 py-6 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40 rounded-2xl"
            />
            <Button
              size="lg"
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r ${currentContent.gradient} hover:opacity-90 rounded-xl px-8 transition-all duration-300`}
            >
              Search
            </Button>
          </div>

          {/* Search Suggestions */}
          {showSearchSuggestions && (
            <Card className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-sm border border-white/20 z-20">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-white font-semibold mb-3 flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4 text-pink-400" />
                    Trending Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((search, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        onClick={() => setSearchQuery(search)}
                        className="text-white/80 hover:text-white hover:bg-white/10 text-sm"
                      >
                        {search}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Featured Content Carousel */}
        <div className="max-w-6xl mx-auto">
          <Card className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                {/* Carousel Controls */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                <div className="grid md:grid-cols-2 gap-0 items-center min-h-[500px]">
                  {/* Content Image */}
                  <div className="relative group overflow-hidden">
                    <img
                      src={currentContent.image}
                      alt={currentContent.title}
                      className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Live Badge */}
                    {currentContent.isLive && (
                      <div className="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></div>
                        LIVE
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="absolute top-6 right-6 flex space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleLike(currentContent.id)}
                        className={`rounded-full w-10 h-10 ${
                          likedItems.includes(currentContent.id)
                            ? "bg-red-500/20 text-red-400"
                            : "bg-black/50 text-white hover:bg-black/70"
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${likedItems.includes(currentContent.id) ? "fill-current" : ""}`} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="rounded-full w-10 h-10 bg-black/50 text-white hover:bg-black/70"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="lg"
                        className={`bg-gradient-to-r ${currentContent.gradient} hover:opacity-90 text-white shadow-2xl transform scale-110 hover:scale-125 transition-transform`}
                      >
                        <Play className="mr-2 h-6 w-6 fill-current" />
                        Play Now
                      </Button>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="p-12 text-left">
                    <div className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 text-sm text-white border border-white/20 mb-6">
                      {currentContent.type === "Music" && <Music className="mr-2 h-4 w-4" />}
                      {currentContent.type === "Movie" && <Video className="mr-2 h-4 w-4" />}
                      {currentContent.type === "Gaming" && <Gamepad2 className="mr-2 h-4 w-4" />}
                      {currentContent.type === "Comedy" && <Mic className="mr-2 h-4 w-4" />}
                      {currentContent.type} • {currentContent.category}
                    </div>

                    <h3 className="text-4xl font-bold text-white mb-4 leading-tight">
                      {currentContent.title}
                    </h3>

                    <p className="text-lg text-white/80 mb-6 leading-relaxed">
                      {currentContent.description}
                    </p>

                    <div className="flex items-center space-x-8 text-white/80 mb-8">
                      <div className="flex items-center">
                        <Users className="mr-2 h-5 w-5 text-purple-400" />
                        <span className="font-semibold">{currentContent.viewers}</span>
                        <span className="ml-1">{currentContent.isLive ? "watching" : "views"}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="mr-2 h-5 w-5 text-yellow-400 fill-current" />
                        <span className="font-semibold">{currentContent.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
                        <span className="font-semibold">{currentContent.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Button
                        size="lg"
                        className={`bg-gradient-to-r ${currentContent.gradient} hover:opacity-90 text-white px-8 py-4 shadow-lg hover:shadow-xl transition-all`}
                      >
                        <Play className="mr-2 h-5 w-5 fill-current" />
                        {currentContent.price === "Free" ? "Start Free" : `Join - ${currentContent.price}`}
                      </Button>

                      <Button
                        size="lg"
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10 bg-transparent px-8 py-4"
                      >
                        <Plus className="mr-2 h-5 w-5" />
                        Add to Watchlist
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  {featuredContent.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentSlide 
                          ? `w-12 h-3 bg-gradient-to-r ${currentContent.gradient}` 
                          : "w-3 h-3 bg-white/30 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto">
          {[
            { label: "Active Creators", value: "5,200+", icon: Mic, color: "from-purple-400 to-pink-400" },
            { label: "Hours Streamed", value: "125K+", icon: Video, color: "from-blue-400 to-cyan-400" },
            { label: "Live Events", value: "350+", icon: Play, color: "from-green-400 to-emerald-400" },
            { label: "Community", value: "45K+", icon: Users, color: "from-orange-400 to-red-400" },
          ].map((stat, index) => (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/20 text-center group hover:bg-white/10 transition-all duration-300 hover:-translate-y-2"
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
