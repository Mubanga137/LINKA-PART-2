"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Video, Gamepad2, Mic, Radio, Camera, Tv, Users, TrendingUp, Star, Play, Download } from "lucide-react"

const categories = [
  {
    id: "streaming",
    name: "Streaming Slots",
    icon: Tv,
    description: "Netflix, Spotify, YouTube Premium access",
    color: "from-red-500 to-pink-600",
    bgColor: "from-red-50 to-pink-50",
    items: [
      { name: "Netflix Premium", price: "ZMW 45/month", users: "1.2K", rating: 4.9, discount: "20% OFF" },
      { name: "Spotify Premium", price: "ZMW 25/month", users: "2.8K", rating: 4.8, discount: null },
      { name: "YouTube Premium", price: "ZMW 30/month", users: "950", rating: 4.7, discount: "NEW" },
      { name: "Showmax", price: "ZMW 35/month", users: "680", rating: 4.6, discount: null },
    ],
  },
  {
    id: "local-content",
    name: "Local Content",
    icon: Video,
    description: "Zambian films, music, and shows",
    color: "from-green-500 to-emerald-600",
    bgColor: "from-green-50 to-emerald-50",
    items: [
      { name: "Zambian Short Films", price: "ZMW 5-15", users: "3.4K", rating: 4.8, discount: "TRENDING" },
      { name: "Local Music Albums", price: "ZMW 10-25", users: "5.2K", rating: 4.9, discount: null },
      { name: "Comedy Shows", price: "ZMW 8-20", users: "2.1K", rating: 4.7, discount: null },
      { name: "Gospel Content", price: "ZMW 5-12", users: "1.8K", rating: 4.9, discount: "POPULAR" },
    ],
  },
  {
    id: "talent-booking",
    name: "Book Talent",
    icon: Mic,
    description: "DJs, dancers, performers for events",
    color: "from-purple-500 to-indigo-600",
    bgColor: "from-purple-50 to-indigo-50",
    items: [
      { name: "DJ Services", price: "ZMW 200-800/event", users: "450", rating: 4.8, discount: "VERIFIED" },
      { name: "Live Bands", price: "ZMW 500-2000/event", users: "120", rating: 4.9, discount: null },
      { name: "Dancers", price: "ZMW 150-600/event", users: "280", rating: 4.7, discount: null },
      { name: "Emcees", price: "ZMW 300-1200/event", users: "95", rating: 4.8, discount: "TOP RATED" },
    ],
  },
  {
    id: "gaming",
    name: "Gaming & Esports",
    icon: Gamepad2,
    description: "Tournaments, game credits, streaming",
    color: "from-orange-500 to-red-600",
    bgColor: "from-orange-50 to-red-50",
    items: [
      { name: "FIFA Tournaments", price: "ZMW 10-50 entry", users: "1.8K", rating: 4.8, discount: "LIVE" },
      { name: "Game Credits", price: "ZMW 20-200", users: "3.2K", rating: 4.7, discount: null },
      { name: "Gaming Coaching", price: "ZMW 50-150/hour", users: "340", rating: 4.9, discount: null },
      { name: "Esports Streaming", price: "Free-ZMW 15", users: "2.5K", rating: 4.6, discount: "HOT" },
    ],
  },
  {
    id: "media-services",
    name: "Media Services",
    icon: Camera,
    description: "Production, editing, voiceover work",
    color: "from-blue-500 to-cyan-600",
    bgColor: "from-blue-50 to-cyan-50",
    items: [
      { name: "Music Video Production", price: "ZMW 800-5000", users: "180", rating: 4.9, discount: "PRO" },
      { name: "Voiceover Services", price: "ZMW 100-500", users: "420", rating: 4.8, discount: null },
      { name: "Audio Editing", price: "ZMW 50-300", users: "650", rating: 4.7, discount: null },
      { name: "Jingle Creation", price: "ZMW 200-800", users: "95", rating: 4.8, discount: "CUSTOM" },
    ],
  },
  {
    id: "podcasts",
    name: "Podcasts & Radio",
    icon: Radio,
    description: "Local podcasts and radio shows",
    color: "from-teal-500 to-green-600",
    bgColor: "from-teal-50 to-green-50",
    items: [
      { name: "Talk Shows", price: "Free-ZMW 10", users: "1.5K", rating: 4.6, discount: null },
      { name: "Educational Podcasts", price: "ZMW 5-20", users: "890", rating: 4.8, discount: "LEARN" },
      { name: "News & Current Affairs", price: "Free-ZMW 8", users: "2.2K", rating: 4.7, discount: null },
      { name: "Music Radio Shows", price: "Free-ZMW 12", users: "1.8K", rating: 4.9, discount: "LIVE" },
    ],
  },
]

export function EntertainmentCategories() {
  const [activeCategory, setActiveCategory] = useState("streaming")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const currentCategory = categories.find((cat) => cat.id === activeCategory)

  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Entertainment
            </span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}
              Categories
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover, stream, and book the best entertainment content and services in Zambia
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="lg"
              className={`group transition-all duration-300 ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg hover:shadow-xl`
                  : "hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              <category.icon
                className={`mr-2 h-5 w-5 ${
                  activeCategory === category.id ? "text-white" : "text-slate-600"
                } group-hover:scale-110 transition-transform`}
              />
              {category.name}
            </Button>
          ))}
        </div>

        {/* Active Category Content */}
        {currentCategory && (
          <div className="space-y-8">
            {/* Category Header */}
            <div className="relative rounded-3xl p-8 border border-slate-200/50 overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={
                    currentCategory.id === "streaming"
                      ? "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=300&fit=crop&crop=center"
                      : currentCategory.id === "local-content"
                      ? "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=300&fit=crop&crop=center"
                      : currentCategory.id === "talent-booking"
                      ? "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=300&fit=crop&crop=center"
                      : currentCategory.id === "gaming"
                      ? "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=300&fit=crop&crop=center"
                      : currentCategory.id === "media-services"
                      ? "https://images.unsplash.com/photo-1489599510067-e6327c8e4b9b?w=800&h=300&fit=crop&crop=center"
                      : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=300&fit=crop&crop=center"
                  }
                  alt={currentCategory.name}
                  className="w-full h-full object-cover opacity-20"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${currentCategory.bgColor} opacity-90`}></div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${currentCategory.color} rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <currentCategory.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{currentCategory.name}</h3>
                    <p className="text-slate-600">{currentCategory.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">{currentCategory.items.length}</div>
                  <div className="text-sm text-slate-500">Available Options</div>
                </div>
              </div>
            </div>

            {/* Category Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentCategory.items.map((item, index) => (
                <Card
                  key={index}
                  className="group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl bg-white/80 backdrop-blur-sm border-white/20 overflow-hidden"
                  onMouseEnter={() => setHoveredItem(`${currentCategory.id}-${index}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                          {item.name}
                        </h4>
                        <div className="text-lg font-bold text-purple-600 mb-2">{item.price}</div>
                      </div>
                      {item.discount && (
                        <Badge
                          variant="secondary"
                          className={`${
                            item.discount === "LIVE"
                              ? "bg-red-100 text-red-700 animate-pulse"
                              : item.discount === "NEW"
                                ? "bg-green-100 text-green-700"
                                : item.discount === "HOT"
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-purple-100 text-purple-700"
                          } text-xs font-bold`}
                        >
                          {item.discount}
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-slate-600">
                          <Users className="h-4 w-4 mr-1" />
                          {item.users} users
                        </div>
                        <div className="flex items-center text-slate-600">
                          <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                          {item.rating}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        className={`w-full bg-gradient-to-r ${currentCategory.color} hover:shadow-lg transition-all group-hover:scale-105`}
                        size="sm"
                      >
                        {currentCategory.id === "talent-booking" ? (
                          <>
                            <Users className="mr-2 h-4 w-4" />
                            Book Now
                          </>
                        ) : currentCategory.id === "streaming" ? (
                          <>
                            <Download className="mr-2 h-4 w-4" />
                            Get Access
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            View Details
                          </>
                        )}
                      </Button>

                      <Button variant="outline" size="sm" className="w-full hover:bg-slate-50 bg-transparent">
                        Preview
                      </Button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${currentCategory.color} transition-all duration-1000 ease-out ${
                          hoveredItem === `${currentCategory.id}-${index}` ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-8 py-4 border border-purple-200/50 shadow-lg backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span className="text-purple-700 font-medium">Trending:</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span className="bg-white/50 px-3 py-1 rounded-full">Local Music +45%</span>
              <span className="bg-white/50 px-3 py-1 rounded-full">Gaming +38%</span>
              <span className="bg-white/50 px-3 py-1 rounded-full">DJ Bookings +52%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
