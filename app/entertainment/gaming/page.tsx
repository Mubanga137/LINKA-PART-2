"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Gamepad2,
  Search, 
  Star, 
  Users,
  Clock,
  Calendar,
  Trophy,
  Target,
  Zap,
  Play,
  Eye,
  Heart,
  Share2,
  Award,
  MapPin,
  CreditCard,
  Smartphone,
  TrendingUp,
  MonitorSpeaker,
  Headphones
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
    status: "Open Registration"
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
    status: "Live Now"
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
    status: "Registration Open"
  },
  {
    id: 4,
    title: "EA FC 24 Women's League",
    organizer: "Women in Gaming Zambia",
    type: "League",
    game: "EA FC 24",
    category: "Sports",
    price: 25,
    prizePool: 1500,
    currency: "ZMW",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&crop=center",
    rating: 4.9,
    participants: 32,
    maxParticipants: 32,
    startDate: "2024-12-28",
    endDate: "2025-01-15",
    registrationDeadline: "2024-12-23",
    description: "Empowering women in esports through competitive FIFA gaming",
    requirements: ["PlayStation or Xbox", "EA FC 24", "Female Player Only"],
    format: "Round Robin + Playoffs",
    duration: "3 weeks",
    isLive: false,
    isPopular: false,
    venue: "Various Locations",
    streamingPlatform: "Twitch",
    viewerCount: "950",
    status: "Registration Open"
  },
  {
    id: 5,
    title: "Mortal Kombat 1 Showdown",
    organizer: "Kitwe Gaming Club",
    type: "Exhibition",
    game: "Mortal Kombat 1",
    category: "Fighting",
    price: 15,
    prizePool: 800,
    currency: "ZMW",
    image: "https://images.unsplash.com/photo-1574263867128-b7d5c6f62ad1?w=400&h=300&fit=crop&crop=center",
    rating: 4.5,
    participants: 24,
    maxParticipants: 32,
    startDate: "2024-12-21",
    endDate: "2024-12-21",
    registrationDeadline: "2024-12-19",
    description: "Special exhibition matches featuring top Mortal Kombat players",
    requirements: ["Console Access", "Mortal Kombat 1", "Basic Fighting Knowledge"],
    format: "Showcase Matches",
    duration: "1 day",
    isLive: false,
    isPopular: false,
    venue: "Kitwe Mall Gaming Zone",
    streamingPlatform: "YouTube",
    viewerCount: "420",
    status: "Almost Full"
  },
  {
    id: 6,
    title: "Fortnite Zambia Battle Royale",
    organizer: "Lusaka Esports",
    type: "Tournament",
    game: "Fortnite",
    category: "Battle Royale",
    price: 35,
    prizePool: 4000,
    currency: "ZMW",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop&crop=center",
    rating: 4.7,
    participants: 89,
    maxParticipants: 100,
    startDate: "2025-01-05",
    endDate: "2025-01-06",
    registrationDeadline: "2025-01-01",
    description: "Epic Battle Royale tournament with solo and duo competitions",
    requirements: ["PC/Console/Mobile", "Fortnite", "Epic Games Account"],
    format: "Solo & Duo Matches",
    duration: "2 days",
    isLive: false,
    isPopular: true,
    venue: "Multi-Platform",
    streamingPlatform: "Twitch",
    viewerCount: "4.1K",
    status: "Registration Open"
  }
]

const categories = ["All", "Sports", "Fighting", "Mobile Gaming", "Battle Royale", "Strategy"]
const types = ["All Types", "Tournament", "League", "Exhibition", "Training"]
const venues = ["All Venues", "Online", "Lusaka Gaming Arena", "Ndola Esports Center", "Kitwe Mall Gaming Zone"]

export default function GamingEsportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedVenue, setSelectedVenue] = useState("All Venues")
  const [sortBy, setSortBy] = useState("popular")
  const [likedEvents, setLikedEvents] = useState<number[]>([])

  const filteredEvents = gamingEvents
    .filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
      const matchesType = selectedType === "All Types" || event.type === selectedType
      const matchesVenue = selectedVenue === "All Venues" || event.venue === selectedVenue
      
      return matchesSearch && matchesCategory && matchesType && matchesVenue
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        case "prize-high":
          return b.prizePool - a.prizePool
        case "prize-low":
          return a.prizePool - b.prizePool
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

  const handleRegistration = (event: typeof gamingEvents[0]) => {
    console.log("Registering for:", event.title)
  }

  const handleWatch = (event: typeof gamingEvents[0]) => {
    console.log("Watching:", event.title)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live Now":
        return "bg-red-500 text-white animate-pulse"
      case "Registration Open":
        return "bg-green-500 text-white"
      case "Almost Full":
        return "bg-yellow-500 text-white"
      case "Open Registration":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop&crop=center"
            alt="Gaming and Esports"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-6 py-3 text-sm border border-white/20 mb-6">
            <Gamepad2 className="mr-2 h-4 w-4" />
            Zambia Gaming Championships
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Level Up Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Gaming</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Join competitive tournaments, watch live streams, and connect with Zambia's gaming community. Play, compete, and win big!
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm opacity-90">Active Tournaments</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">1,500+</div>
              <div className="text-sm opacity-90">Registered Players</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">ZMW 50K</div>
              <div className="text-sm opacity-90">Monthly Prizes</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">Live</div>
              <div className="text-sm opacity-90">24/7 Streaming</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Trophy className="mr-2 h-5 w-5" />
              Join Tournament
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Eye className="mr-2 h-5 w-5" />
              Watch Live
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-white/20">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search tournaments, games, or organizers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-300"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
                <select
                  value={selectedVenue}
                  onChange={(e) => setSelectedVenue(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {venues.map((venue) => (
                    <option key={venue} value={venue}>
                      {venue}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="date">Upcoming Date</option>
                  <option value="prize-high">Highest Prize Pool</option>
                  <option value="prize-low">Lowest Prize Pool</option>
                  <option value="price-low">Lowest Entry Fee</option>
                  <option value="participants">Most Participants</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{filteredEvents.length} events found</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 mr-1 text-yellow-600" />
                  Prize Pools Available
                </div>
                <div className="flex items-center">
                  <Smartphone className="h-4 w-4 mr-1 text-green-600" />
                  Mobile Money Payments
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <Card
                key={event.id}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-white/20 overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getStatusColor(event.status)} font-bold text-xs`}>
                        {event.status}
                      </Badge>
                    </div>

                    {/* Popular/Live Badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {event.isLive && (
                        <Badge className="bg-red-500 text-white font-bold text-xs animate-pulse">
                          🔴 LIVE
                        </Badge>
                      )}
                      {event.isPopular && (
                        <Badge className="bg-orange-500 text-white font-bold text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          HOT
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-8 h-8 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                        onClick={() => toggleLike(event.id)}
                      >
                        <Heart className={`h-4 w-4 ${likedEvents.includes(event.id) ? "fill-red-500 text-red-500" : ""}`} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-8 h-8 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Viewer Count */}
                    <div className="absolute bottom-4 left-4 flex items-center bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      {event.viewerCount}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {event.category}
                      </Badge>
                      <div className="text-xs text-gray-500">
                        {event.participants}/{event.maxParticipants} players
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {event.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-2 font-medium">{event.game}</p>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                    {/* Event Info Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                      <div>
                        <span className="text-gray-500">Organizer:</span>
                        <div className="font-medium text-gray-900">{event.organizer}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Format:</span>
                        <div className="font-medium text-gray-900">{event.format}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Venue:</span>
                        <div className="font-medium text-gray-900">{event.venue}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Duration:</span>
                        <div className="font-medium text-gray-900">{event.duration}</div>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-1">Requirements:</div>
                      <div className="flex flex-wrap gap-1">
                        {event.requirements.slice(0, 2).map((req, index) => (
                          <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                            {req}
                          </span>
                        ))}
                        {event.requirements.length > 2 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            +{event.requirements.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Prize Pool and Entry Fee */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-xs text-gray-500">Prize Pool</div>
                        <div className="text-lg font-bold text-green-600">
                          {event.currency} {event.prizePool.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Entry Fee</div>
                        <div className="text-lg font-bold text-gray-900">
                          {event.currency} {event.price}
                        </div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-gray-500">Start Date:</span>
                          <div className="font-medium text-gray-900">
                            {new Date(event.startDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Registration Until:</span>
                          <div className="font-medium text-gray-900">
                            {new Date(event.registrationDeadline).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {event.isLive ? (
                        <Button
                          onClick={() => handleWatch(event)}
                          className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Watch Live
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleRegistration(event)}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          disabled={event.participants >= event.maxParticipants}
                        >
                          <Trophy className="h-4 w-4 mr-2" />
                          {event.participants >= event.maxParticipants ? "Full" : "Register"}
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-3"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Payment Methods */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Payment:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                            MTN Money
                          </span>
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                            Airtel Money
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gaming Community Features */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Join Zambia's Gaming Community</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Connect with fellow gamers, improve your skills, and compete for amazing prizes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Competitive Tournaments</h3>
              <p className="opacity-90">Participate in organized tournaments with real prize pools and professional streaming</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Features</h3>
              <p className="opacity-90">Connect with other gamers, form teams, and practice together for upcoming events</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MonitorSpeaker className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Live Streaming</h3>
              <p className="opacity-90">Watch live tournaments and matches from top Zambian gamers on multiple platforms</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
