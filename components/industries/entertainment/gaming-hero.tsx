"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Gamepad2,
  Trophy,
  Play,
  Users,
  Calendar,
  Zap,
  Star,
  Search,
  TrendingUp,
  Crown,
  Target,
  MonitorSpeaker,
  Headphones,
  Smartphone
} from "lucide-react"

const featuredTournaments = [
  {
    id: 1,
    title: "FIFA 24 Championship",
    game: "FIFA 24",
    prize: "ZMW 5,000",
    participants: "128/128",
    status: "Live",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&crop=center"
  },
  {
    id: 2,
    title: "Valorant Qualifier",
    game: "Valorant",
    prize: "ZMW 8,000",
    participants: "16/32",
    status: "Open",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&crop=center"
  },
  {
    id: 3,
    title: "Mobile Legends Cup",
    game: "Mobile Legends",
    prize: "ZMW 3,000",
    participants: "64/100",
    status: "Soon",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop&crop=center"
  }
]

export function GamingHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [typedText, setTypedText] = useState("")
  const fullText = "Level Up Your Gaming Experience"

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredTournaments.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    let index = 0
    const typeTimer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(typeTimer)
      }
    }, 100)
    return () => clearInterval(typeTimer)
  }, [])

  const currentTournament = featuredTournaments[currentSlide]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Floating Gaming Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400 rounded-full animate-pulse opacity-40"></div>
          <div className="absolute bottom-32 left-20 w-8 h-8 bg-green-400 rounded-full animate-float opacity-50"></div>
          <div className="absolute bottom-20 right-10 w-3 h-3 bg-orange-400 rounded-full animate-bounce-slow opacity-70"></div>
          
          {/* Gaming Icons */}
          <div className="absolute top-1/4 left-1/4 text-white/20 animate-float">
            <Gamepad2 className="h-12 w-12" />
          </div>
          <div className="absolute top-1/3 right-1/3 text-white/20 animate-bounce-slow">
            <Trophy className="h-8 w-8" />
          </div>
          <div className="absolute bottom-1/3 left-1/3 text-white/20 animate-pulse">
            <MonitorSpeaker className="h-10 w-10" />
          </div>
          <div className="absolute top-2/3 right-1/4 text-white/20 animate-float">
            <Crown className="h-9 w-9" />
          </div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
        {/* Header Badge */}
        <div className="mb-8">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm px-6 py-3 text-white border border-white/20 mb-6 animate-glow">
            <Zap className="mr-2 h-5 w-5 text-yellow-400 animate-pulse" />
            <span className="text-sm font-medium">🎮 Zambia's Premier Gaming Platform</span>
          </div>

          {/* Main Title with Typing Effect */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              {typedText}
            </span>
            <span className="animate-pulse">|</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
            Join the most competitive gaming tournaments in Zambia. Compete, stream, and win big prizes while 
            connecting with fellow gamers across the country.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search tournaments, games, or players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40 rounded-2xl"
            />
            <Button
              size="lg"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Featured Tournament Carousel */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Trophy className="mr-3 h-6 w-6 text-yellow-400" />
                Featured Tournament
              </h2>
              <div className="flex space-x-2">
                {featuredTournaments.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide ? "bg-yellow-400 w-8" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative group">
                <img
                  src={currentTournament.image}
                  alt={currentTournament.title}
                  className="w-full h-64 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Tournament Status Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className={`font-bold text-xs px-3 py-1 ${
                    currentTournament.status === "Live" 
                      ? "bg-red-500 text-white animate-pulse-glow"
                      : currentTournament.status === "Open"
                      ? "bg-green-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}>
                    {currentTournament.status === "Live" && "🔴 "}
                    {currentTournament.status}
                  </Badge>
                </div>

                {/* Prize Pool Badge */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold">
                  <Trophy className="h-4 w-4 mr-1 inline text-yellow-400" />
                  {currentTournament.prize}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="lg"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    {currentTournament.status === "Live" ? "Watch Live" : "View Details"}
                  </Button>
                </div>
              </div>

              <div className="text-left">
                <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-4 py-2 text-sm text-white border border-white/20 mb-4">
                  <Gamepad2 className="mr-2 h-4 w-4" />
                  {currentTournament.game}
                </div>

                <h3 className="text-3xl font-bold text-white mb-4">{currentTournament.title}</h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-sm text-white/80">Players</div>
                    <div className="text-lg font-bold text-white">{currentTournament.participants}</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <Trophy className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                    <div className="text-sm text-white/80">Prize Pool</div>
                    <div className="text-lg font-bold text-white">{currentTournament.prize}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Button
                    size="lg"
                    className={`px-8 ${
                      currentTournament.status === "Live"
                        ? "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    } text-white`}
                  >
                    {currentTournament.status === "Live" ? (
                      <>
                        <Play className="mr-2 h-5 w-5" />
                        Watch Live
                      </>
                    ) : (
                      <>
                        <Trophy className="mr-2 h-5 w-5" />
                        Register Now
                      </>
                    )}
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent px-8"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white p-6 rounded-2xl flex-col h-auto"
          >
            <Trophy className="h-8 w-8 mb-2" />
            <span className="text-sm font-medium">Join Tournament</span>
          </Button>
          
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-6 rounded-2xl flex-col h-auto"
          >
            <Play className="h-8 w-8 mb-2" />
            <span className="text-sm font-medium">Watch Streams</span>
          </Button>
          
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white p-6 rounded-2xl flex-col h-auto"
          >
            <Users className="h-8 w-8 mb-2" />
            <span className="text-sm font-medium">Find Team</span>
          </Button>
          
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white p-6 rounded-2xl flex-col h-auto"
          >
            <Calendar className="h-8 w-8 mb-2" />
            <span className="text-sm font-medium">View Events</span>
          </Button>
        </div>

        {/* Gaming Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { label: "Active Players", value: "2,500+", icon: Users, color: "from-blue-500 to-cyan-500" },
            { label: "Tournaments", value: "50+", icon: Trophy, color: "from-yellow-500 to-orange-500" },
            { label: "Prize Money", value: "ZMW 125K", icon: Crown, color: "from-green-500 to-emerald-500" },
            { label: "Gaming Hours", value: "50K+", icon: MonitorSpeaker, color: "from-purple-500 to-pink-500" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center group hover:bg-white/20 transition-all gaming-card"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
