"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Play,
  Users,
  Eye,
  Heart,
  Share2,
  Clock,
  FlameIcon as Fire,
  Zap,
  Music,
  Gamepad2,
} from "lucide-react"
import { getCategoryImage } from "@/lib/entertainment-image-mapping"

const trendingContent = [
  {
    id: 1,
    title: "Zamrock Revival Mix",
    creator: "DJ Vintage",
    type: "Music",
    category: "DJ",
    views: "89.2K",
    likes: "12.3K",
    shares: "2.1K",
    duration: "1h 15m",
    trendingRank: 1,
    growthRate: "+245%",
    category: "Music",
    isLive: false,
    price: "ZMW 15",
  },
  {
    id: 2,
    title: "FIFA 24 Championship Live",
    creator: "Zambia Gaming League",
    type: "Gaming",
    category: "Gaming",
    views: "45.7K",
    likes: "8.9K",
    shares: "1.5K",
    duration: "Live",
    trendingRank: 2,
    growthRate: "+189%",
    category: "Gaming",
    isLive: true,
    price: "Free",
  },
  {
    id: 3,
    title: "Comedy Gold: Best of 2024",
    creator: "Lusaka Comedy Club",
    type: "Comedy",
    category: "Comedy",
    views: "67.4K",
    likes: "9.8K",
    shares: "3.2K",
    duration: "45m",
    trendingRank: 3,
    growthRate: "+156%",
    category: "Comedy",
    isLive: false,
    price: "ZMW 12",
  },
  {
    id: 4,
    title: "Traditional Wedding Dance",
    creator: "Cultural Heritage Zambia",
    type: "Cultural",
    category: "Traditional Dance",
    views: "34.1K",
    likes: "5.6K",
    shares: "890",
    duration: "28m",
    trendingRank: 4,
    growthRate: "+134%",
    category: "Cultural",
    isLive: false,
    price: "ZMW 8",
  },
  {
    id: 5,
    title: "Gospel Praise Night",
    creator: "Worship Together",
    type: "Religious",
    category: "Gospel",
    views: "52.8K",
    likes: "7.2K",
    shares: "1.8K",
    duration: "1h 30m",
    trendingRank: 5,
    growthRate: "+123%",
    category: "Gospel",
    isLive: false,
    price: "ZMW 10",
  },
]

const trendingStats = [
  { label: "Total Views Today", value: "2.3M", change: "+18%", icon: Eye },
  { label: "Active Streams", value: "156", change: "+24%", icon: Play },
  { label: "New Uploads", value: "89", change: "+12%", icon: TrendingUp },
  { label: "Trending Topics", value: "12", change: "+8%", icon: Fire },
]

export function TrendingNow() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setCurrentTime(new Date())
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const categories = ["All", "Music", "Gaming", "Comedy", "Cultural", "Gospel"]

  const filteredContent =
    selectedCategory === "All" ? trendingContent : trendingContent.filter((item) => item.category === selectedCategory)

  return (
    <section className="py-24 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm px-6 py-3 text-red-700 border border-red-200/50 mb-6">
            <Fire className="mr-2 h-5 w-5 text-red-500 animate-pulse" />
            <span className="text-sm font-medium">🔥 What's Hot Right Now</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Trending</span>
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"> Now</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            The hottest content that's taking Zambia by storm - updated in real-time
          </p>
        </div>

        {/* Real-time Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {trendingStats.map((stat, index) => (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600 mb-2">{stat.label}</div>
                <div className="flex items-center justify-center text-green-600 text-sm font-medium">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className={`transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg hover:shadow-xl"
                  : "hover:bg-red-50 hover:border-red-300 hover:text-red-700"
              }`}
            >
              {category === "All" && <Zap className="mr-2 h-4 w-4" />}
              {category === "Music" && <Music className="mr-2 h-4 w-4" />}
              {category === "Gaming" && <Gamepad2 className="mr-2 h-4 w-4" />}
              {category === "Comedy" && <Users className="mr-2 h-4 w-4" />}
              {category}
            </Button>
          ))}
        </div>

        {/* Trending Content Grid */}
        <div className="space-y-8">
          {filteredContent.map((item, index) => (
            <Card
              key={item.id}
              className="group cursor-pointer transition-all duration-500 hover:shadow-2xl bg-white/90 backdrop-blur-sm border-white/30 overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Thumbnail */}
                  <div className="relative md:w-80 h-48 md:h-auto overflow-hidden">
                    <img
                      src={getCategoryImage(item.category).replace("w=400&h=300", "w=300&h=200")}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Trending Rank Badge */}
                    <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">#{item.trendingRank}</span>
                    </div>

                    {/* Live Badge */}
                    {item.isLive && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                        LIVE
                      </div>
                    )}

                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        size="lg"
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                      >
                        <Play className="mr-2 h-6 w-6" />
                        Play Now
                      </Button>
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-sm font-medium">
                      {item.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge variant="secondary" className="bg-red-100 text-red-700 font-bold">
                            {item.type}
                          </Badge>
                          <div className="flex items-center text-green-600 font-bold text-sm">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            {item.growthRate}
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-slate-600 mb-4">by {item.creator}</p>

                        {/* Stats */}
                        <div className="flex items-center space-x-6 text-slate-500 mb-6">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            <span className="font-medium">{item.views}</span>
                          </div>
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            <span className="font-medium">{item.likes}</span>
                          </div>
                          <div className="flex items-center">
                            <Share2 className="h-4 w-4 mr-1" />
                            <span className="font-medium">{item.shares}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span className="text-sm">Updated {isClient ? Math.floor(Math.random() * 30) : 15} min ago</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-600 mb-2">{item.price}</div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="hover:bg-red-50 bg-transparent">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="hover:bg-red-50 bg-transparent">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <Button className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                        <Play className="mr-2 h-4 w-4" />
                        {item.price === "Free" ? "Watch Free" : "Purchase & Watch"}
                      </Button>
                      <Button variant="outline" className="hover:bg-red-50 hover:border-red-300 bg-transparent">
                        Add to Playlist
                      </Button>
                    </div>

                    {/* Trending Indicator */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center text-sm text-slate-500">
                        <Fire className="h-4 w-4 mr-1 text-red-500" />
                        <span>Trending in {item.category}</span>
                      </div>
                      <div className="w-32 bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${100 - (item.trendingRank - 1) * 20}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Real-time Update Indicator */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center rounded-full bg-white/80 backdrop-blur-sm px-6 py-3 text-slate-600 border border-slate-200/50 shadow-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm">Last updated: {currentTime?.toLocaleTimeString() || '--:--:--'}</span>
            <Button size="sm" variant="ghost" className="ml-4 text-red-600 hover:text-red-700 hover:bg-red-50">
              <TrendingUp className="h-4 w-4 mr-1" />
              Refresh
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
