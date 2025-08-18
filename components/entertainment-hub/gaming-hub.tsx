"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, useInView } from "framer-motion"
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
  Download,
  ChevronRight,
  Sword,
  Shield
} from "lucide-react"

const gamingCategories = [
  {
    id: "trending",
    name: "Trending",
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
    name: "Free Games",
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
    type: "Sports Tournament",
    players: "2,543",
    rating: 4.9,
    prize: "ZMW 50,000",
    entry: "ZMW 25",
    status: "Live",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    description: "The ultimate FIFA tournament with the biggest prize pool in Zambia",
    duration: "3 days",
    isLive: true,
    category: "tournament"
  },
  {
    id: 2,
    title: "Call of Duty Mobile Championship",
    type: "FPS Tournament",
    players: "1,832",
    rating: 4.8,
    prize: "ZMW 25,000",
    entry: "ZMW 15",
    status: "Starting Soon",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
    description: "Fast-paced mobile gaming tournament for COD enthusiasts",
    duration: "2 days",
    isLive: false,
    category: "tournament"
  },
  {
    id: 3,
    title: "Free Fire Battle Royale",
    type: "Battle Royale",
    players: "3,201",
    rating: 4.7,
    prize: "ZMW 35,000",
    entry: "ZMW 20",
    status: "Registration Open",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop",
    description: "Join the most popular battle royale tournament in the region",
    duration: "5 days",
    isLive: false,
    category: "tournament"
  },
  {
    id: 4,
    title: "Mobile Legends Pro League",
    type: "MOBA",
    players: "1,456",
    rating: 4.9,
    prize: "ZMW 30,000",
    entry: "ZMW 18",
    status: "Quarter Finals",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
    description: "Strategic team-based gameplay with international standards",
    duration: "4 days",
    isLive: true,
    category: "tournament"
  },
  {
    id: 5,
    title: "Ludo Championship",
    type: "Board Game",
    players: "5,420",
    rating: 4.6,
    prize: "Free",
    entry: "Free",
    status: "Always Open",
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
    description: "Traditional Ludo with modern competitive twists",
    duration: "Ongoing",
    isLive: false,
    category: "free"
  },
  {
    id: 6,
    title: "Chess Master Tournament",
    type: "Strategy",
    players: "3,210",
    rating: 4.8,
    prize: "Free",
    entry: "Free",
    status: "Daily Matches",
    image: "https://images.unsplash.com/photo-1528819622765-d6bcf132ac11?w=400&h=300&fit=crop",
    description: "Test your strategic mind against the best chess players",
    duration: "Daily",
    isLive: false,
    category: "free"
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
    sponsors: ["MTN", "Airtel", "Zamtel"],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop"
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
    sponsors: ["Shoprite", "Pick n Pay"],
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=200&fit=crop"
  },
  {
    id: 3,
    name: "Strategy Masters",
    game: "Chess & Ludo",
    prize: "ZMW 15,000",
    participants: "500",
    startDate: "2024-02-25",
    status: "Open",
    bracket: "Swiss System",
    sponsors: ["Local Sponsors"],
    image: "https://images.unsplash.com/photo-1528819622765-d6bcf132ac11?w=300&h=200&fit=crop"
  }
]

const leaderboard = [
  { rank: 1, player: "GamerKing_ZM", score: 12450, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
  { rank: 2, player: "ZambiaWarrior", score: 11890, avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c5b3?w=40&h=40&fit=crop&crop=face" },
  { rank: 3, player: "CopperChampion", score: 11340, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
  { rank: 4, player: "LusakaLegend", score: 10850, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face" },
  { rank: 5, player: "KitweKing", score: 10200, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" }
]

export function GamingHub() {
  const [activeTab, setActiveTab] = useState("trending")
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [likedGames, setLikedGames] = useState<number[]>([])
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const toggleLike = (id: number) => {
    setLikedGames(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const getGamesForCategory = () => {
    switch (activeTab) {
      case "tournaments":
        return trendingGames.filter(game => game.category === "tournament")
      case "free":
        return trendingGames.filter(game => game.category === "free")
      case "premium":
        return trendingGames.slice(0, 2) // Mock premium games
      default:
        return trendingGames
    }
  }

  return (
    <div className="py-16 space-y-16">
      {/* Gaming Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Neon Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500/5 via-blue-500/5 to-purple-500/5" />
          
          {/* Animated Neon Lines */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent animate-pulse" />
          <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-pulse" style={{ animationDelay: "2s" }} />
          
          {/* Floating Gaming Particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360, 0],
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            >
              <Gamepad2 className="h-4 w-4 text-pink-400/20" />
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mb-16"
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
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
        </motion.div>

        {/* Gaming Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            { label: "Active Gamers", value: "15,200+", icon: Users, color: "from-pink-400 to-blue-400" },
            { label: "Tournaments", value: "250+", icon: Trophy, color: "from-yellow-400 to-orange-400" },
            { label: "Prize Pool", value: "ZMW 500K+", icon: Award, color: "from-green-400 to-emerald-400" },
            { label: "Games Available", value: "150+", icon: Gamepad2, color: "from-purple-400 to-violet-400" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Gaming Categories */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
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

          {/* Games Grid */}
          <TabsContent value={activeTab} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getGamesForCategory().map((game) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onMouseEnter={() => setHoveredCard(game.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative"
                >
                  <Card className="group cursor-pointer bg-white/5 backdrop-blur-sm border border-white/20 hover:border-pink-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={game.image}
                          alt={game.title}
                          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                          whileHover={{ scale: 1.1 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        
                        {/* Live Badge */}
                        {game.isLive && (
                          <motion.div 
                            className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-ping"></div>
                            LIVE
                          </motion.div>
                        )}

                        {/* Category Badge */}
                        <div className="absolute top-3 right-3">
                          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                            {game.type}
                          </Badge>
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-12 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button
                              size="lg"
                              className="bg-gradient-to-r from-pink-500 to-blue-500 hover:opacity-90 text-white shadow-lg rounded-full w-16 h-16"
                            >
                              <Play className="h-8 w-8 fill-current" />
                            </Button>
                          </motion.div>
                        </div>

                        {/* Game Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="font-bold text-white mb-1 leading-tight">
                            {game.title}
                          </h3>
                          <div className="flex items-center justify-between text-xs text-white/80">
                            <span>{game.duration}</span>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
                              {game.rating}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <p className="text-sm text-white/70 line-clamp-2">
                          {game.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center text-white/70">
                            <Users className="h-3 w-3 mr-1" />
                            {game.players}
                          </div>
                          <div className="flex items-center text-green-400">
                            <Trophy className="h-3 w-3 mr-1" />
                            {game.prize}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button
                            className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:opacity-90 transition-all group-hover:scale-105"
                            size="sm"
                          >
                            <Play className="mr-2 h-4 w-4" />
                            {game.isLive ? "Join Live" : "Join Tournament"}
                          </Button>
                          
                          {game.entry !== "Free" && (
                            <div className="text-center text-white/60 text-xs">
                              Entry Fee: {game.entry}
                            </div>
                          )}
                        </div>

                        {/* Glow Effect */}
                        <div 
                          className={`absolute inset-0 bg-gradient-to-r from-pink-500/20 to-blue-500/20 opacity-0 transition-opacity duration-500 pointer-events-none ${
                            hoveredCard === game.id ? "opacity-100" : ""
                          }`} 
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Tournament Spotlight */}
      {activeTab === "tournaments" && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold text-white mb-4">Major Tournaments</h3>
            <p className="text-white/80 text-xl">Join the biggest competitions in Zambian esports</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tournaments.map((tournament, index) => (
              <motion.div
                key={tournament.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-32">
                      <img
                        src={tournament.image}
                        alt={tournament.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <Badge 
                        className={`absolute top-3 right-3 ${
                          tournament.status === "Live" 
                            ? "bg-red-500 animate-pulse" 
                            : "bg-green-500"
                        } text-white`}
                      >
                        {tournament.status}
                      </Badge>
                    </div>
                    
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-white mb-2">{tournament.name}</h4>
                      <p className="text-yellow-400 font-semibold mb-4">{tournament.game}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-400">{tournament.prize}</div>
                          <div className="text-sm text-white/70">Prize Pool</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-400">{tournament.participants}</div>
                          <div className="text-sm text-white/70">Players</div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/70">Stage:</span>
                          <span className="text-white font-semibold">{tournament.bracket}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Start:</span>
                          <span className="text-white font-semibold">{tournament.startDate}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm text-white/70 mb-2">Sponsors:</div>
                        <div className="flex flex-wrap gap-1">
                          {tournament.sponsors.map((sponsor, idx) => (
                            <Badge key={idx} variant="outline" className="border-white/30 text-white/80 text-xs">
                              {sponsor}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90"
                          size="sm"
                        >
                          <Trophy className="mr-2 h-4 w-4" />
                          {tournament.status === "Live" ? "Watch Live" : "Register"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/30 text-white hover:bg-white/10"
                        >
                          <Target className="mr-2 h-4 w-4" />
                          Bracket
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Leaderboard */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Players */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                <Trophy className="mr-3 h-6 w-6 text-yellow-400" />
                Top Players
              </h3>
              <Card className="bg-white/5 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {leaderboard.map((player, index) => (
                      <motion.div
                        key={player.rank}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            player.rank === 1 ? "bg-yellow-500 text-black" :
                            player.rank === 2 ? "bg-gray-400 text-black" :
                            player.rank === 3 ? "bg-orange-500 text-black" :
                            "bg-white/20 text-white"
                          }`}>
                            {player.rank}
                          </div>
                          <img
                            src={player.avatar}
                            alt={player.player}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-semibold text-white">{player.player}</div>
                            <div className="text-sm text-white/60">Rank #{player.rank}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-white">{player.score.toLocaleString()}</div>
                          <div className="text-sm text-white/60">points</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold text-white mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <Card className="bg-gradient-to-r from-pink-500/20 to-blue-500/20 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <Sword className="h-12 w-12 text-pink-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="font-bold text-white mb-2">Join Battle</h4>
                    <p className="text-white/70 text-sm mb-4">Start competing now</p>
                    <Button size="sm" className="bg-gradient-to-r from-pink-500 to-blue-500 w-full">
                      Quick Match
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-500/20 to-teal-500/20 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <Shield className="h-12 w-12 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="font-bold text-white mb-2">Free Games</h4>
                    <p className="text-white/70 text-sm mb-4">Play without entry fees</p>
                    <Button size="sm" className="bg-gradient-to-r from-green-500 to-teal-500 w-full">
                      Play Free
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-500/20 to-violet-500/20 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <Crown className="h-12 w-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="font-bold text-white mb-2">Go Premium</h4>
                    <p className="text-white/70 text-sm mb-4">Unlock exclusive features</p>
                    <Button size="sm" className="bg-gradient-to-r from-purple-500 to-violet-500 w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
