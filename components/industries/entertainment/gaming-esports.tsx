"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Gamepad2,
  Search, 
  Trophy,
  Play,
  Eye,
  Heart,
  Share2,
  TrendingUp,
  Users,
  Clock,
  Calendar,
  MapPin,
  Star,
  Filter,
  SortAsc,
  Target,
  Zap,
  MonitorSpeaker,
  Headphones,
  Smartphone,
  Crown,
  Award,
  Coins,
  Timer,
  ChevronRight,
  ChevronLeft
} from "lucide-react"

const gamingEvents = [
  {
    id: 1,
    title: "FIFA 24 Championship Zambia",
    organizer: "Zambia Gaming League",
    type: "Tournament",
    game: "FIFA 24",
    category: "Sports",
    price: 50,
    prizePool: 5000,
    currency: "ZMW",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&crop=center",
    rating: 4.8,
    participants: 128,
    maxParticipants: 128,
    startDate: "2024-12-25",
    endDate: "2024-12-27",
    registrationDeadline: "2024-12-20",
    description: "The biggest FIFA tournament in Zambia with professional players competing for the championship title",
    requirements: ["PlayStation 5 or Xbox Series X", "FIFA 24 Latest Version", "Stable Internet Connection"],
    format: "Single Elimination",
    duration: "3 days",
    isLive: false,
    isPopular: true,
    venue: "Lusaka Gaming Arena",
    streamingPlatform: "Twitch",
    viewerCount: "2.5K",
    status: "Open Registration",
    tags: ["Professional", "High Stakes", "Multiple Rounds"],
    difficulty: "Expert",
    ageRestriction: "16+"
  },
  {
    id: 2,
    title: "Tekken 8 Zambia Open",
    organizer: "Fighting Game Community ZM",
    type: "Tournament",
    game: "Tekken 8",
    category: "Fighting",
    price: 30,
    prizePool: 3000,
    currency: "ZMW",
    image: "https://images.unsplash.com/photo-1574263867128-b7d5c6f62ad1?w=400&h=300&fit=crop&crop=center",
    rating: 4.7,
    participants: 64,
    maxParticipants: 64,
    startDate: "2024-12-22",
    endDate: "2024-12-22",
    registrationDeadline: "2024-12-18",
    description: "Ultimate fighting game tournament featuring Zambia's best Tekken players",
    requirements: ["PlayStation 5", "Tekken 8", "Fighting Stick (Optional)"],
    format: "Double Elimination",
    duration: "1 day",
    isLive: true,
    isPopular: false,
    venue: "Ndola Esports Center",
    streamingPlatform: "YouTube Gaming",
    viewerCount: "1.8K",
    status: "Live Now",
    tags: ["Fighting", "Competitive", "Skilled"],
    difficulty: "Advanced",
    ageRestriction: "13+"
  },
  {
    id: 3,
    title: "Call of Duty Mobile Championship",
    organizer: "Mobile Gaming Zambia",
    type: "Tournament",
    game: "Call of Duty Mobile",
    category: "Mobile Gaming",
    price: 20,
    prizePool: 2500,
    currency: "ZMW",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop&crop=center",
    rating: 4.6,
    participants: 45,
    maxParticipants: 100,
    startDate: "2024-12-30",
    endDate: "2024-12-31",
    registrationDeadline: "2024-12-25",
    description: "Mobile gaming championship accessible to players across Zambia",
    requirements: ["Android/iOS Device", "Call of Duty Mobile", "Stable Mobile Internet"],
    format: "Battle Royale & Multiplayer",
    duration: "2 days",
    isLive: false,
    isPopular: true,
    venue: "Online",
    streamingPlatform: "Facebook Gaming",
    viewerCount: "3.2K",
    status: "Registration Open",
    tags: ["Mobile", "Accessible", "Multi-Format"],
    difficulty: "Intermediate",
    ageRestriction: "16+"
  },
  {
    id: 4,
    title: "Valorant Champions Qualifier",
    organizer: "Esports Zambia",
    type: "Qualifier",
    game: "Valorant",
    category: "FPS",
    price: 40,
    prizePool: 8000,
    currency: "ZMW",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&crop=center",
    rating: 4.9,
    participants: 16,
    maxParticipants: 32,
    startDate: "2025-01-10",
    endDate: "2025-01-12",
    registrationDeadline: "2025-01-05",
    description: "Qualify for the international Valorant championship series",
    requirements: ["PC", "Valorant", "Team of 5 Players"],
    format: "Team Based",
    duration: "3 days",
    isLive: false,
    isPopular: true,
    venue: "Lusaka Gaming Center",
    streamingPlatform: "Twitch",
    viewerCount: "5.1K",
    status: "Registration Open",
    tags: ["Team", "Qualifier", "International"],
    difficulty: "Expert",
    ageRestriction: "16+"
  }
]

const categories = ["All", "Sports", "Fighting", "Mobile Gaming", "FPS", "Battle Royale"]
const types = ["All Types", "Tournament", "League", "Exhibition", "Qualifier", "Training"]
const difficulties = ["All Levels", "Beginner", "Intermediate", "Advanced", "Expert"]

export function GamingEsports() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels")
  const [sortBy, setSortBy] = useState("popular")
  const [likedEvents, setLikedEvents] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  // Animated counters
  const [counters, setCounters] = useState({
    activeTournaments: 0,
    registeredPlayers: 0,
    monthlyPrizes: 0,
    liveStreams: 0
  })

  useEffect(() => {
    const targets = {
      activeTournaments: 50,
      registeredPlayers: 1500,
      monthlyPrizes: 50000,
      liveStreams: 24
    }

    Object.keys(targets).forEach((key) => {
      const target = targets[key as keyof typeof targets]
      let current = 0
      const increment = target / 50
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }))
      }, 30)
    })
  }, [])

  const filteredEvents = gamingEvents
    .filter(event => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
      const matchesType = selectedType === "All Types" || event.type === selectedType
      const matchesDifficulty = selectedDifficulty === "All Levels" || event.difficulty === selectedDifficulty
      
      return matchesSearch && matchesCategory && matchesType && matchesDifficulty
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        case "prize-high":
          return b.prizePool - a.prizePool
        case "price-low":
          return a.price - b.price
        case "participants":
          return b.participants - a.participants
        default:
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || b.rating - a.rating
      }
    })

  const toggleLike = (eventId: number) => {
    setLikedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live Now":
        return "bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/50"
      case "Registration Open":
        return "bg-green-500 text-white shadow-lg shadow-green-500/50"
      case "Almost Full":
        return "bg-yellow-500 text-white shadow-lg shadow-yellow-500/50"
      case "Open Registration":
        return "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700 border-green-200"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "Advanced":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "Expert":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 -z-10">
            {/* Animated background elements */}
            <div className="absolute top-10 left-10 w-4 h-4 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
            <div className="absolute top-20 right-20 w-6 h-6 bg-purple-400 rounded-full animate-pulse opacity-40"></div>
            <div className="absolute bottom-32 left-20 w-8 h-8 bg-green-400 rounded-full animate-float opacity-50"></div>
            <div className="absolute bottom-20 right-10 w-3 h-3 bg-orange-400 rounded-full animate-bounce opacity-70"></div>
          </div>

          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 text-sm border border-blue-200 mb-6">
            <Gamepad2 className="mr-2 h-4 w-4 text-blue-600" />
            <span className="text-blue-800 font-medium">🎮 Gaming & Esports Hub</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Gaming Tournaments
            </span>
            <br />
            <span className="text-slate-800">& Esports Events</span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Join competitive tournaments, watch live streams, and connect with Zambia's gaming community. 
            Level up your skills and compete for amazing prizes!
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 group">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{counters.activeTournaments}+</div>
              <div className="text-sm text-slate-600">Active Tournaments</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 group">
              <Users className="h-8 w-8 text-purple-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{counters.registeredPlayers.toLocaleString()}+</div>
              <div className="text-sm text-slate-600">Registered Players</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 group">
              <Coins className="h-8 w-8 text-green-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-slate-800 mb-1">ZMW {counters.monthlyPrizes.toLocaleString()}</div>
              <div className="text-sm text-slate-600">Monthly Prizes</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100 hover:shadow-xl transition-all duration-300 group">
              <MonitorSpeaker className="h-8 w-8 text-red-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{counters.liveStreams}/7</div>
              <div className="text-sm text-slate-600">Live Streaming</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 mb-12">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search tournaments, games, or organizers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-400 rounded-2xl"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between mb-6">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              {showFilters ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>

            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">{filteredEvents.length} events found</span>
              <div className="flex border border-slate-200 rounded-lg">
                <Button
                  size="sm"
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  Grid
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === "list" ? "default" : "ghost"}
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  List
                </Button>
              </div>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-slate-50 rounded-2xl">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="date">Upcoming Date</option>
                  <option value="prize-high">Highest Prize Pool</option>
                  <option value="price-low">Lowest Entry Fee</option>
                  <option value="participants">Most Participants</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Events Grid */}
        <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-8`}>
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/95 backdrop-blur-sm border-slate-200 overflow-hidden ${viewMode === "list" ? "md:flex" : ""}`}
            >
              <CardContent className="p-0">
                {/* Event Image */}
                <div className={`relative overflow-hidden ${viewMode === "list" ? "md:w-80 md:flex-shrink-0" : "h-48"}`}>
                  <img
                    src={event.image}
                    alt={event.title}
                    className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${viewMode === "list" ? "h-full md:h-64" : "h-full"}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getStatusColor(event.status)} font-bold text-xs px-3 py-1`}>
                      {event.status}
                    </Badge>
                  </div>

                  {/* Live/Popular Badges */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {event.isLive && (
                      <Badge className="bg-red-500 text-white font-bold text-xs animate-pulse px-3 py-1 shadow-lg">
                        🔴 LIVE
                      </Badge>
                    )}
                    {event.isPopular && (
                      <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold text-xs px-3 py-1 shadow-lg">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        HOT
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-9 h-9 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white hover:scale-110 transition-all"
                      onClick={() => toggleLike(event.id)}
                    >
                      <Heart className={`h-4 w-4 ${likedEvents.includes(event.id) ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-9 h-9 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white hover:scale-110 transition-all"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Viewer Count */}
                  <div className="absolute bottom-4 left-4 flex items-center bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                    <Eye className="h-3 w-3 mr-1" />
                    {event.viewerCount} watching
                  </div>
                </div>

                {/* Event Details */}
                <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {event.category}
                      </Badge>
                      <Badge className={`text-xs border ${getDifficultyColor(event.difficulty)}`}>
                        {event.difficulty}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      {event.participants}/{event.maxParticipants} players
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-4 mb-3 text-sm text-slate-600">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      {event.rating}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {event.duration}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {event.venue}
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{event.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {event.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Prize Pool and Entry Fee */}
                  <div className="flex items-center justify-between mb-6 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Prize Pool</div>
                      <div className="text-lg font-bold text-green-600">
                        {event.currency} {event.prizePool.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500 font-medium">Entry Fee</div>
                      <div className="text-lg font-bold text-slate-900">
                        {event.currency} {event.price}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {event.isLive ? (
                      <Button className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg">
                        <Play className="h-4 w-4 mr-2" />
                        Watch Live
                      </Button>
                    ) : (
                      <Button
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
                        disabled={event.participants >= event.maxParticipants}
                      >
                        <Trophy className="h-4 w-4 mr-2" />
                        {event.participants >= event.maxParticipants ? "Tournament Full" : "Register Now"}
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="px-4 hover:bg-slate-50">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Features */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Join Zambia's Gaming Revolution</h3>
              <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                Connect with fellow gamers, improve your skills, and compete for amazing prizes in our growing esports community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                  <Trophy className="h-10 w-10" />
                </div>
                <h4 className="text-xl font-bold mb-3">Competitive Tournaments</h4>
                <p className="opacity-90 leading-relaxed">Join organized tournaments with real prize pools, professional streaming, and recognition in the gaming community</p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                  <Users className="h-10 w-10" />
                </div>
                <h4 className="text-xl font-bold mb-3">Gaming Community</h4>
                <p className="opacity-90 leading-relaxed">Connect with other gamers, form teams, share strategies, and practice together for upcoming tournaments</p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                  <MonitorSpeaker className="h-10 w-10" />
                </div>
                <h4 className="text-xl font-bold mb-3">Live Streaming</h4>
                <p className="opacity-90 leading-relaxed">Watch live tournaments, learn from top players, and stream your own gameplay to build your gaming brand</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 font-bold px-8 py-4 rounded-2xl shadow-lg">
                <Crown className="mr-2 h-5 w-5" />
                Join Gaming Community
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
