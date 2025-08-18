"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Gamepad2, 
  Trophy, 
  Zap, 
  Users, 
  Play, 
  Star, 
  Crown, 
  Target,
  Clock,
  Award,
  TrendingUp,
  Heart,
  Share2,
  Download
} from "lucide-react"

interface GamingSectionProps {
  standalone?: boolean
}

const gamingCategories = [
  {
    id: "trending",
    name: "Trending Games",
    icon: TrendingUp,
    gradient: "from-pink-500 to-blue-500"
  },
  {
    id: "tournaments",
    name: "Tournaments",
    icon: Trophy,
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    id: "free",
    name: "Free to Play",
    icon: Zap,
    gradient: "from-green-500 to-teal-500"
  },
  {
    id: "premium",
    name: "Premium",
    icon: Crown,
    gradient: "from-purple-500 to-pink-500"
  }
]

const trendingGames = [
  {
    id: 1,
    title: "FIFA 24 Championship",
    type: "Sports",
    players: "2,543",
    rating: 4.9,
    prize: "ZMW 50,000",
    entry: "ZMW 25",
    status: "Live",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    description: "The ultimate FIFA tournament with the biggest prize pool in Zambia",
    duration: "3 days",
    isLive: true
  },
  {
    id: 2,
    title: "Call of Duty Mobile",
    type: "Action",
    players: "1,832",
    rating: 4.8,
    prize: "ZMW 25,000",
    entry: "ZMW 15",
    status: "Starting Soon",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
    description: "Fast-paced mobile gaming tournament for COD enthusiasts",
    duration: "2 days",
    isLive: false
  },
  {
    id: 3,
    title: "Free Fire Battle",
    type: "Battle Royale",
    players: "3,201",
    rating: 4.7,
    prize: "ZMW 35,000",
    entry: "ZMW 20",
    status: "Registration Open",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop",
    description: "Join the most popular battle royale tournament in the region",
    duration: "5 days",
    isLive: false
  },
  {
    id: 4,
    title: "Mobile Legends",
    type: "MOBA",
    players: "1,456",
    rating: 4.9,
    prize: "ZMW 30,000",
    entry: "ZMW 18",
    status: "Quarter Finals",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
    description: "Strategic team-based gameplay with international standards",
    duration: "4 days",
    isLive: true
  }
]

const tournaments = [
  {
    id: 1,
    name: "Zambia Gaming League",
    game: "FIFA 24",
    prize: "ZMW 100,000",
    participants: "256",
    startDate: "2024-02-15",
    status: "Live",
    bracket: "Quarter Finals",
    sponsors: ["MTN", "Airtel", "Zamtel"]
  },
  {
    id: 2,
    name: "Mobile Esports Cup",
    game: "Free Fire",
    prize: "ZMW 75,000",
    participants: "128",
    startDate: "2024-02-20",
    status: "Registration",
    bracket: "Group Stage",
    sponsors: ["Shoprite", "Pick n Pay"]
  }
]

const freeGames = [
  {
    id: 1,
    title: "Ludo Champion",
    type: "Board Game",
    players: "5,420",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
    downloads: "25K+"
  },
  {
    id: 2,
    title: "Chess Master",
    type: "Strategy",
    players: "3,210",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1528819622765-d6bcf132ac11?w=400&h=300&fit=crop",
    downloads: "18K+"
  }
]

export function GamingSection({ standalone = false }: GamingSectionProps) {
  const [activeTab, setActiveTab] = useState("trending")
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [likedGames, setLikedGames] = useState<number[]>([])

  const toggleLike = (id: number) => {
    setLikedGames(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <section 
      id="gaming-section" 
      className={`relative py-24 ${standalone ? 'min-h-screen pt-32' : ''}`}
    >
      {/* Neon Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500/5 via-blue-500/5 to-purple-500/5" />
        
        {/* Animated Neon Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent animate-pulse" />
        <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-pulse" style={{ animationDelay: "2s" }} />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-pink-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-3 text-white border border-white/20 mb-6">
            <Gamepad2 className="mr-2 h-5 w-5 text-pink-400 animate-pulse" />
            <span className="text-sm font-medium">🎮 Gaming & Esports Hub</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Level Up
            </span>
            <span className="text-white block md:inline md:ml-4">Your Game</span>
          </h2>

          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Join tournaments, compete with the best, and win amazing prizes in Zambia's premier gaming platform
          </p>
        </div>

        {/* Gaming Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4 mx-auto mb-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-2">
            {gamingCategories.map((category) => (
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

          {/* Trending Games */}
          <TabsContent value="trending" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingGames.map((game) => (
                <Card
                  key={game.id}
                  className="group cursor-pointer bg-white/5 backdrop-blur-sm border border-white/20 hover:border-pink-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/20 overflow-hidden"
                  onMouseEnter={() => setHoveredCard(game.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* Live Badge */}
                      {game.isLive && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center animate-pulse">
                          <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-ping"></div>
                          LIVE
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleLike(game.id)}
                          className={`rounded-full w-8 h-8 ${
                            likedGames.includes(game.id)
                              ? "bg-red-500/20 text-red-400"
                              : "bg-black/50 text-white hover:bg-black/70"
                          }`}
                        >
                          <Heart className={`h-3 w-3 ${likedGames.includes(game.id) ? "fill-current" : ""}`} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="rounded-full w-8 h-8 bg-black/50 text-white hover:bg-black/70"
                        >
                          <Share2 className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-pink-500 to-blue-500 hover:opacity-90 text-white shadow-lg"
                        >
                          <Play className="mr-1 h-4 w-4 fill-current" />
                          Join
                        </Button>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-white mb-1 group-hover:text-pink-400 transition-colors">
                            {game.title}
                          </h3>
                          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                            {game.type}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-pink-400">{game.entry}</div>
                          <div className="text-xs text-white/60">Entry Fee</div>
                        </div>
                      </div>

                      <p className="text-sm text-white/70 mb-4 line-clamp-2">
                        {game.description}
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-white/70">
                            <Users className="h-3 w-3 mr-1" />
                            {game.players}
                          </div>
                          <div className="flex items-center text-white/70">
                            <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
                            {game.rating}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-green-400">
                            <Trophy className="h-3 w-3 mr-1" />
                            {game.prize}
                          </div>
                          <div className="flex items-center text-white/70">
                            <Clock className="h-3 w-3 mr-1" />
                            {game.duration}
                          </div>
                        </div>
                      </div>

                      <Button
                        className="w-full mt-4 bg-gradient-to-r from-pink-500 to-blue-500 hover:opacity-90 transition-all group-hover:scale-105"
                        size="sm"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        {game.isLive ? "Join Live" : "Register Now"}
                      </Button>

                      {/* Glow Effect */}
                      <div 
                        className={`absolute inset-0 bg-gradient-to-r from-pink-500/20 to-blue-500/20 opacity-0 transition-opacity duration-500 pointer-events-none ${
                          hoveredCard === game.id ? "opacity-100" : ""
                        }`} 
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tournaments */}
          <TabsContent value="tournaments" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {tournaments.map((tournament) => (
                <Card
                  key={tournament.id}
                  className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{tournament.name}</h3>
                        <p className="text-yellow-400 font-semibold">{tournament.game}</p>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`${
                          tournament.status === "Live" 
                            ? "bg-red-500/20 text-red-400 border-red-500/30 animate-pulse" 
                            : "bg-green-500/20 text-green-400 border-green-500/30"
                        }`}
                      >
                        {tournament.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-400">{tournament.prize}</div>
                        <div className="text-sm text-white/70">Prize Pool</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-400">{tournament.participants}</div>
                        <div className="text-sm text-white/70">Players</div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-white/70">Current Stage:</span>
                        <span className="text-white font-semibold">{tournament.bracket}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Start Date:</span>
                        <span className="text-white font-semibold">{tournament.startDate}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="text-sm text-white/70 mb-2">Sponsors:</div>
                      <div className="flex space-x-2">
                        {tournament.sponsors.map((sponsor, index) => (
                          <Badge key={index} variant="outline" className="border-white/30 text-white/80">
                            {sponsor}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90"
                      >
                        <Trophy className="mr-2 h-4 w-4" />
                        {tournament.status === "Live" ? "Watch Live" : "Register"}
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        <Target className="mr-2 h-4 w-4" />
                        Bracket
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Free Games */}
          <TabsContent value="free" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {freeGames.map((game) => (
                <Card
                  key={game.id}
                  className="group cursor-pointer bg-white/5 backdrop-blur-sm border border-white/20 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        FREE
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-white mb-2">{game.title}</h3>
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs mb-3">
                        {game.type}
                      </Badge>

                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="flex items-center text-white/70">
                          <Users className="h-3 w-3 mr-1" />
                          {game.players}
                        </div>
                        <div className="flex items-center text-white/70">
                          <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
                          {game.rating}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="flex items-center text-green-400">
                          <Download className="h-3 w-3 mr-1" />
                          {game.downloads}
                        </div>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90"
                        size="sm"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Play Free
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Premium Games */}
          <TabsContent value="premium" className="space-y-8">
            <div className="text-center py-16">
              <Crown className="h-16 w-16 text-purple-400 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">Premium Gaming Experience</h3>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Unlock exclusive tournaments, premium features, and VIP support
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 px-8"
              >
                <Crown className="mr-2 h-5 w-5" />
                Upgrade to Premium
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
