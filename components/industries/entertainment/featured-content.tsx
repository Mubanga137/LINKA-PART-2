"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Heart, Share2, Star, TrendingUp, Eye, Download, Bookmark } from "lucide-react"
import { getCategoryImage } from "@/lib/entertainment-image-mapping"

const featuredItems = [
  {
    id: 1,
    title: "Zambian Beats Compilation 2024",
    creator: "Various Artists",
    type: "Music Album",
    category: "Music Album",
    duration: "2h 15m",
    views: "45.2K",
    likes: "3.8K",
    rating: 4.9,
    price: "ZMW 25",
    isNew: true,
    isTrending: true,
    description: "The hottest collection of Zambian music featuring top artists from across the country.",
    tags: ["Afrobeat", "Local", "Popular"],
  },
  {
    id: 2,
    title: "The Copper Chronicles",
    creator: "Lusaka Film Studios",
    type: "Short Film Series",
    category: "Short Film",
    duration: "6 episodes",
    views: "28.7K",
    likes: "2.1K",
    rating: 4.7,
    price: "ZMW 35",
    isNew: false,
    isTrending: true,
    description: "A gripping drama series about life in Zambia's copper mining communities.",
    tags: ["Drama", "Local", "Series"],
  },
  {
    id: 3,
    title: "Comedy Night Live",
    creator: "Zambian Comedy Club",
    type: "Live Show",
    category: "Comedy",
    duration: "1h 30m",
    views: "19.3K",
    likes: "1.9K",
    rating: 4.8,
    price: "ZMW 15",
    isNew: false,
    isTrending: false,
    description: "Hilarious stand-up comedy featuring Zambia's funniest comedians.",
    tags: ["Comedy", "Live", "Entertainment"],
  },
  {
    id: 4,
    title: "Traditional Dance Masterclass",
    creator: "Cultural Heritage Foundation",
    type: "Educational",
    category: "Traditional Dance",
    duration: "45m",
    views: "12.8K",
    likes: "1.2K",
    rating: 4.9,
    price: "ZMW 20",
    isNew: true,
    isTrending: false,
    description: "Learn authentic Zambian traditional dances from master performers.",
    tags: ["Cultural", "Educational", "Traditional"],
  },
  {
    id: 5,
    title: "Esports Championship Finals",
    creator: "Zambia Gaming League",
    type: "Gaming Event",
    category: "Gaming Event",
    duration: "Live",
    views: "8.5K",
    likes: "890",
    rating: 4.6,
    price: "Free",
    isNew: false,
    isTrending: true,
    description: "Watch the best gamers compete for the national championship title.",
    tags: ["Gaming", "Live", "Competition"],
  },
  {
    id: 6,
    title: "Gospel Praise Session",
    creator: "Worship Together Zambia",
    type: "Religious",
    category: "Gospel",
    duration: "1h 45m",
    views: "22.1K",
    likes: "2.8K",
    rating: 4.9,
    price: "ZMW 10",
    isNew: false,
    isTrending: false,
    description: "Uplifting gospel music and worship sessions from local churches.",
    tags: ["Gospel", "Worship", "Spiritual"],
  },
]

export function FeaturedContent() {
  const [likedItems, setLikedItems] = useState<number[]>([])
  const [bookmarkedItems, setBookmarkedItems] = useState<number[]>([])

  const toggleLike = (id: number) => {
    setLikedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const toggleBookmark = (id: number) => {
    setBookmarkedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Featured</span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Content</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Handpicked premium content from Zambia's top creators and performers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item) => (
            <Card
              key={item.id}
              className="group cursor-pointer transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl bg-white/80 backdrop-blur-sm border-white/20 overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Thumbnail */}
                <div className="relative overflow-hidden">
                  <img
                    src={getCategoryImage(item.category)}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <Button
                        size="sm"
                        className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Play Now
                      </Button>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {item.isNew && <Badge className="bg-green-500 text-white text-xs font-bold">NEW</Badge>}
                    {item.isTrending && (
                      <Badge className="bg-red-500 text-white text-xs font-bold animate-pulse">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        TRENDING
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-8 h-8 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleLike(item.id)
                      }}
                    >
                      <Heart className={`h-4 w-4 ${likedItems.includes(item.id) ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-8 h-8 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleBookmark(item.id)
                      }}
                    >
                      <Bookmark
                        className={`h-4 w-4 ${bookmarkedItems.includes(item.id) ? "fill-yellow-500 text-yellow-500" : ""}`}
                      />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-8 h-8 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Duration/Type Badge */}
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
                    {item.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.type}
                    </Badge>
                    <div className="text-lg font-bold text-purple-600">{item.price}</div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 mb-2">{item.creator}</p>

                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{item.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {item.views}
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {item.likes}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                      {item.rating}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      size="sm"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      {item.price === "Free" ? "Watch Free" : "Purchase"}
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-slate-50 bg-transparent">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-3 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 bg-transparent"
          >
            Load More Content
            <TrendingUp className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
