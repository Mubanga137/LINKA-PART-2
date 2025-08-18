"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Film, 
  Play, 
  Star, 
  Clock, 
  Users, 
  Heart, 
  Share2, 
  Plus, 
  Download,
  Tv,
  Bookmark,
  Eye,
  Calendar,
  Award
} from "lucide-react"

interface MoviesSectionProps {
  standalone?: boolean
}

const movieCategories = [
  {
    id: "trending",
    name: "Trending",
    icon: Film,
    gradient: "from-purple-500 to-violet-500"
  },
  {
    id: "local",
    name: "Local Films",
    icon: Award,
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: "streaming",
    name: "Streaming",
    icon: Tv,
    gradient: "from-red-500 to-pink-500"
  },
  {
    id: "watchlist",
    name: "My Watchlist",
    icon: Bookmark,
    gradient: "from-orange-500 to-yellow-500"
  }
]

const trendingMovies = [
  {
    id: 1,
    title: "The Copper Chronicles",
    type: "Drama",
    year: 2024,
    duration: "2h 15m",
    rating: 4.8,
    views: "25.3K",
    price: "ZMW 15",
    isLocal: true,
    image: "https://images.unsplash.com/photo-1489599510067-e6327c8e4b9b?w=400&h=600&fit=crop",
    description: "An epic tale of Zambia's mining heritage and the families who built our nation",
    director: "James Mwanza",
    cast: ["Sarah Tembo", "Michael Banda", "Grace Phiri"],
    awards: ["Best Drama 2024", "People's Choice"],
    trailer: true
  },
  {
    id: 2,
    title: "Lusaka Nights",
    type: "Romance",
    year: 2024,
    duration: "1h 45m",
    rating: 4.6,
    views: "18.7K",
    price: "ZMW 12",
    isLocal: true,
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    description: "A modern love story set against the vibrant backdrop of Zambia's capital",
    director: "Angela Mulenga",
    cast: ["David Chulu", "Mary Zulu", "Peter Mwale"],
    awards: ["Best Cinematography"],
    trailer: true
  },
  {
    id: 3,
    title: "The Heist",
    type: "Thriller",
    year: 2024,
    duration: "1h 58m",
    rating: 4.9,
    views: "32.1K",
    price: "ZMW 18",
    isLocal: false,
    image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop",
    description: "International thriller featuring Zambian locations and cast members",
    director: "Robert Smith",
    cast: ["John Doe", "Jane Smith", "Chris Mbewe"],
    awards: ["International Film Festival Winner"],
    trailer: true
  },
  {
    id: 4,
    title: "Comedy Gold",
    type: "Comedy",
    year: 2024,
    duration: "1h 30m",
    rating: 4.7,
    views: "28.9K",
    price: "ZMW 10",
    isLocal: true,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=600&fit=crop",
    description: "The funniest Zambian comedy featuring top local comedians",
    director: "Bob Nkosha",
    cast: ["Uncle Rasco", "Kandeke", "Fresh Bwoy"],
    awards: ["Best Comedy 2024"],
    trailer: true
  }
]

const streamingServices = [
  {
    id: 1,
    name: "Netflix Premium",
    price: "ZMW 45/month",
    content: "Movies, Series, Documentaries",
    users: "2.1K",
    image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&h=200&fit=crop",
    features: ["4K Ultra HD", "Multiple Screens", "Download"],
    trial: "7 days free"
  },
  {
    id: 2,
    name: "Showmax",
    price: "ZMW 35/month",
    content: "Local & International Content",
    users: "1.8K",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop",
    features: ["African Content", "Live Sports", "Kids Section"],
    trial: "14 days free"
  },
  {
    id: 3,
    name: "YouTube Premium",
    price: "ZMW 30/month",
    content: "Ad-free YouTube + Music",
    users: "3.2K",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=300&h=200&fit=crop",
    features: ["Ad-free", "Background Play", "YouTube Music"],
    trial: "1 month free"
  }
]

const watchlist = [
  {
    id: 1,
    title: "Copper Dreams",
    type: "Documentary",
    addedDate: "2024-01-15",
    progress: 65,
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Village Tales",
    type: "Drama Series",
    addedDate: "2024-01-20",
    progress: 0,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop"
  }
]

export function MoviesSection({ standalone = false }: MoviesSectionProps) {
  const [activeTab, setActiveTab] = useState("trending")
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [watchlistItems, setWatchlistItems] = useState<number[]>([1, 2])
  const [likedMovies, setLikedMovies] = useState<number[]>([])

  const toggleWatchlist = (id: number) => {
    setWatchlistItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const toggleLike = (id: number) => {
    setLikedMovies(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <section 
      id="movies-section" 
      className={`relative py-24 ${standalone ? 'min-h-screen pt-32' : ''}`}
    >
      {/* Cinematic Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/10 via-violet-900/10 to-purple-900/10" />
        
        {/* Spotlight Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        
        {/* Curtain Effect */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-purple-900/20 to-transparent" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-purple-900/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/20 to-violet-500/20 backdrop-blur-sm px-6 py-3 text-white border border-white/20 mb-6">
            <Film className="mr-2 h-5 w-5 text-purple-400 animate-pulse" />
            <span className="text-sm font-medium">🎬 Movies & Streaming</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Cinematic
            </span>
            <span className="text-white block md:inline md:ml-4">Experience</span>
          </h2>

          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Discover the best of Zambian cinema and stream your favorite content
          </p>
        </div>

        {/* Movies Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4 mx-auto mb-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-2">
            {movieCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className={`flex items-center space-x-2 rounded-xl transition-all duration-300 ${
                  activeTab === category.id
                    ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <category.icon className="h-4 w-4" />
                <span className="hidden lg:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Trending Movies */}
          <TabsContent value="trending" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingMovies.map((movie) => (
                <Card
                  key={movie.id}
                  className="group cursor-pointer bg-white/5 backdrop-blur-sm border border-white/20 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden"
                  onMouseEnter={() => setHoveredCard(movie.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden aspect-[2/3]">
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                      
                      {/* Local Film Badge */}
                      {movie.isLocal && (
                        <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          ZAMBIAN
                        </div>
                      )}

                      {/* Rating Badge */}
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center">
                        <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
                        {movie.rating}
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute bottom-20 left-3 right-3 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleLike(movie.id)}
                          className={`rounded-full w-10 h-10 ${
                            likedMovies.includes(movie.id)
                              ? "bg-red-500/20 text-red-400"
                              : "bg-black/50 text-white hover:bg-black/70"
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${likedMovies.includes(movie.id) ? "fill-current" : ""}`} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleWatchlist(movie.id)}
                          className={`rounded-full w-10 h-10 ${
                            watchlistItems.includes(movie.id)
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-black/50 text-white hover:bg-black/70"
                          }`}
                        >
                          <Plus className={`h-4 w-4 ${watchlistItems.includes(movie.id) ? "rotate-45" : ""} transition-transform`} />
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
                          className="bg-gradient-to-r from-purple-500 to-violet-500 hover:opacity-90 text-white shadow-lg transform scale-110 hover:scale-125 transition-transform rounded-full w-16 h-16"
                        >
                          <Play className="h-8 w-8 fill-current" />
                        </Button>
                      </div>

                      {/* Movie Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-bold text-white mb-2 text-lg leading-tight">
                          {movie.title}
                        </h3>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                            {movie.type}
                          </Badge>
                          <span className="text-white/80 text-sm">{movie.year}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-white/70">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {movie.duration}
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {movie.views}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <p className="text-sm text-white/70 line-clamp-2">
                        {movie.description}
                      </p>

                      <div className="text-xs text-white/60">
                        <div className="mb-1">
                          <span className="font-semibold">Director:</span> {movie.director}
                        </div>
                        <div className="mb-2">
                          <span className="font-semibold">Cast:</span> {movie.cast.join(", ")}
                        </div>
                        {movie.awards.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {movie.awards.map((award, index) => (
                              <Badge key={index} variant="outline" className="border-yellow-500/30 text-yellow-400 text-xs">
                                <Award className="h-2 w-2 mr-1" />
                                {award}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          className="flex-1 bg-gradient-to-r from-purple-500 to-violet-500 hover:opacity-90 text-sm"
                          size="sm"
                        >
                          <Play className="mr-2 h-3 w-3" />
                          Watch - {movie.price}
                        </Button>
                        {movie.trailer && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-white/30 text-white hover:bg-white/10 text-sm"
                          >
                            <Film className="mr-1 h-3 w-3" />
                            Trailer
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Local Films */}
          <TabsContent value="local" className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">Celebrating Zambian Cinema</h3>
              <p className="text-white/80 max-w-2xl mx-auto">
                Discover award-winning films that tell our stories and celebrate our culture
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingMovies.filter(movie => movie.isLocal).map((movie) => (
                <Card
                  key={movie.id}
                  className="group cursor-pointer bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/30 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="w-20 h-28 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-white mb-2">{movie.title}</h3>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs mb-2">
                          {movie.type} • {movie.year}
                        </Badge>
                        <p className="text-sm text-white/70 mb-3 line-clamp-2">
                          {movie.description}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-green-400">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            {movie.rating}
                          </div>
                          <div className="text-white font-semibold">{movie.price}</div>
                        </div>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90"
                      size="sm"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Watch Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Streaming Services */}
          <TabsContent value="streaming" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {streamingServices.map((service) => (
                <Card
                  key={service.id}
                  className="group cursor-pointer bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-sm border border-red-500/30 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2"
                >
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {service.trial}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                    <p className="text-red-400 font-semibold mb-2">{service.price}</p>
                    <p className="text-sm text-white/70 mb-4">{service.content}</p>

                    <div className="space-y-2 mb-4">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-white/80">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-white/70 mb-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {service.users} subscribers
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90"
                      size="sm"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Get Access
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Watchlist */}
          <TabsContent value="watchlist" className="space-y-8">
            {watchlist.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {watchlist.map((item) => (
                  <Card
                    key={item.id}
                    className="group cursor-pointer bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-sm border border-orange-500/30 hover:border-orange-500/50 transition-all duration-300"
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                          <h3 className="font-bold text-white mb-2">{item.title}</h3>
                          <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs mb-2">
                            {item.type}
                          </Badge>
                          {item.progress > 0 && (
                            <div className="w-full bg-white/20 rounded-full h-1 mb-2">
                              <div 
                                className="bg-orange-400 h-1 rounded-full" 
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                          )}
                          <div className="text-xs text-white/70">
                            Added {item.addedDate}
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <Button
                          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:opacity-90"
                          size="sm"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          {item.progress > 0 ? `Continue (${item.progress}%)` : "Start Watching"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Bookmark className="h-16 w-16 text-orange-400 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4">Your Watchlist is Empty</h3>
                <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                  Start adding movies and shows to keep track of what you want to watch
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:opacity-90 px-8"
                  onClick={() => setActiveTab("trending")}
                >
                  <Film className="mr-2 h-5 w-5" />
                  Browse Movies
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
