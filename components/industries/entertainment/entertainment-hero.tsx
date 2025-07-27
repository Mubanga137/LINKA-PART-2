"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, Music, Gamepad2, Video, Mic, Search, TrendingUp, Users, Star, Zap } from "lucide-react"
import { getCategoryImage } from "@/lib/entertainment-image-mapping"

const featuredContent = [
  {
    id: 1,
    title: "DJ Mo - Afroset 3",
    type: "Music",
    category: "DJ",
    duration: "45 min",
    views: "12.3K",
    rating: 4.9,
    price: "Free",
    isLive: true,
  },
  {
    id: 2,
    title: "The Great Lusaka Heist",
    type: "Short Film",
    category: "Short Film",
    duration: "12 min",
    views: "8.7K",
    rating: 4.6,
    price: "ZMW 5",
    isLive: false,
  },
  {
    id: 3,
    title: "FIFA 24 Tournament",
    type: "Gaming",
    category: "Gaming",
    duration: "Live",
    views: "2.1K",
    rating: 4.8,
    price: "ZMW 10",
    isLive: true,
  },
]

export function EntertainmentHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredContent.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const currentContent = featuredContent[currentSlide]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0">
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-bounce opacity-60"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-pink-400 rounded-full animate-pulse opacity-40"></div>
          <div className="absolute bottom-32 left-20 w-8 h-8 bg-purple-400 rounded-full animate-float opacity-50"></div>
          <div className="absolute bottom-20 right-10 w-3 h-3 bg-orange-400 rounded-full animate-bounce-slow opacity-70"></div>

          {/* Music Notes Animation */}
          <div className="absolute top-1/4 left-1/4 text-white/20 animate-float">
            <Music className="h-8 w-8" />
          </div>
          <div className="absolute top-1/3 right-1/3 text-white/20 animate-bounce-slow">
            <Video className="h-6 w-6" />
          </div>
          <div className="absolute bottom-1/3 left-1/3 text-white/20 animate-pulse">
            <Gamepad2 className="h-7 w-7" />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm px-6 py-3 text-white border border-white/20 mb-6">
            <Zap className="mr-2 h-5 w-5 text-yellow-400 animate-pulse" />
            <span className="text-sm font-medium">🔥 Trending Now in Zambian Entertainment</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-yellow-200 to-pink-200 bg-clip-text text-transparent">
              Your Entertainment
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
              Universe
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
            Stream, book, and discover the best of Zambian entertainment. From local artists to global content, all in
            one place.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search music, shows, talent, gaming..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40 rounded-2xl"
            />
            <Button
              size="lg"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Featured Content Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Play className="mr-3 h-6 w-6 text-pink-400" />
                Featured Now
              </h2>
              <div className="flex space-x-2">
                {featuredContent.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide ? "bg-pink-400 w-8" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative group">
                <img
                  src={currentContent.thumbnail || "/placeholder.svg"}
                  alt={currentContent.title}
                  className="w-full h-64 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                />
                {currentContent.isLive && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                    LIVE
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="lg"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Play Now
                  </Button>
                </div>
              </div>

              <div className="text-left">
                <div className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 text-sm text-white border border-white/20 mb-4">
                  {currentContent.type === "Music" && <Music className="mr-2 h-4 w-4" />}
                  {currentContent.type === "Short Film" && <Video className="mr-2 h-4 w-4" />}
                  {currentContent.type === "Gaming" && <Gamepad2 className="mr-2 h-4 w-4" />}
                  {currentContent.type}
                </div>

                <h3 className="text-3xl font-bold text-white mb-4">{currentContent.title}</h3>

                <div className="flex items-center space-x-6 text-white/80 mb-6">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    {currentContent.views} views
                  </div>
                  <div className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-yellow-400" />
                    {currentContent.rating}
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    {currentContent.duration}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    {currentContent.price === "Free" ? "Watch Free" : `Watch - ${currentContent.price}`}
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    Add to Playlist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          {[
            { label: "Active Creators", value: "2,500+", icon: Mic },
            { label: "Content Hours", value: "50K+", icon: Video },
            { label: "Live Events", value: "150+", icon: Play },
            { label: "Happy Users", value: "25K+", icon: Users },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center group hover:bg-white/20 transition-all"
            >
              <stat.icon className="h-8 w-8 text-pink-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
