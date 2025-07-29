"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Gamepad2,
  Trophy,
  Users,
  MonitorSpeaker,
  Headphones,
  Smartphone,
  Crown,
  Award,
  Coins,
  Timer,
  Zap,
  Target,
  Star,
  Play,
  Calendar,
  MessageCircle,
  Settings,
  TrendingUp,
  Globe,
  Wifi,
  Shield
} from "lucide-react"

const gamingPlatforms = [
  {
    id: 1,
    name: "PC Gaming",
    icon: MonitorSpeaker,
    description: "High-end PC gaming tournaments with professional setups",
    tournaments: 15,
    players: 450,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    name: "Console Gaming",
    icon: Gamepad2,
    description: "PlayStation and Xbox tournaments for console enthusiasts",
    tournaments: 12,
    players: 380,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    name: "Mobile Gaming",
    icon: Smartphone,
    description: "Mobile-first gaming for accessibility across Zambia",
    tournaments: 8,
    players: 720,
    color: "from-green-500 to-emerald-500"
  }
]

const gamingServices = [
  {
    id: 1,
    title: "Tournament Hosting",
    description: "Full-service tournament organization and management",
    icon: Trophy,
    features: ["Event Planning", "Prize Distribution", "Live Streaming", "Registration Management"],
    price: "From ZMW 500",
    rating: 4.9,
    color: "from-yellow-400 to-orange-500"
  },
  {
    id: 2,
    title: "Gaming Coaching",
    description: "Personal coaching from professional gamers",
    icon: Target,
    features: ["1-on-1 Sessions", "Strategy Development", "Skill Analysis", "Performance Tracking"],
    price: "From ZMW 50/hour",
    rating: 4.8,
    color: "from-blue-400 to-purple-500"
  },
  {
    id: 3,
    title: "Team Formation",
    description: "Connect with players to form competitive teams",
    icon: Users,
    features: ["Player Matching", "Team Management", "Practice Scheduling", "Communication Tools"],
    price: "Free",
    rating: 4.7,
    color: "from-green-400 to-teal-500"
  },
  {
    id: 4,
    title: "Live Streaming",
    description: "Professional streaming setup and production",
    icon: MonitorSpeaker,
    features: ["Multi-Platform Streaming", "Professional Overlay", "Chat Moderation", "Analytics"],
    price: "From ZMW 200/event",
    rating: 4.9,
    color: "from-red-400 to-pink-500"
  }
]

const upcomingEvents = [
  {
    id: 1,
    title: "Zambia Gaming Week",
    date: "Jan 15-20, 2025",
    type: "Festival",
    status: "Coming Soon",
    description: "A week-long celebration of gaming culture in Zambia"
  },
  {
    id: 2,
    title: "Mobile Legends Tournament",
    date: "Dec 28, 2024",
    type: "Tournament",
    status: "Registration Open",
    description: "National championship for Mobile Legends enthusiasts"
  },
  {
    id: 3,
    title: "Retro Gaming Night",
    date: "Dec 31, 2024",
    type: "Community Event",
    status: "Free Entry",
    description: "Nostalgic gaming session with classic arcade games"
  }
]

export function GamingFeatures() {
  const [activeTab, setActiveTab] = useState("platforms")
  const [animatedStats, setAnimatedStats] = useState({
    totalPlayers: 0,
    onlineTournaments: 0,
    prizesPaid: 0,
    gamingHours: 0
  })

  useEffect(() => {
    const targets = {
      totalPlayers: 2500,
      onlineTournaments: 150,
      prizesPaid: 125000,
      gamingHours: 50000
    }

    Object.keys(targets).forEach((key) => {
      const target = targets[key as keyof typeof targets]
      let current = 0
      const increment = target / 60
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }))
      }, 25)
    })
  }, [])

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Advanced Stats Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Gaming Excellence
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Comprehensive gaming services and features designed for the Zambian gaming community
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 group">
              <Users className="h-8 w-8 text-blue-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{animatedStats.totalPlayers.toLocaleString()}+</div>
              <div className="text-sm text-slate-600">Total Players</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 group">
              <Trophy className="h-8 w-8 text-purple-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{animatedStats.onlineTournaments}+</div>
              <div className="text-sm text-slate-600">Tournaments Hosted</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 group">
              <Coins className="h-8 w-8 text-green-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-slate-800 mb-1">ZMW {animatedStats.prizesPaid.toLocaleString()}</div>
              <div className="text-sm text-slate-600">Prizes Distributed</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 group">
              <Timer className="h-8 w-8 text-orange-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{animatedStats.gamingHours.toLocaleString()}+</div>
              <div className="text-sm text-slate-600">Gaming Hours</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-slate-200">
            <div className="flex space-x-2">
              {[
                { id: "platforms", label: "Gaming Platforms", icon: Gamepad2 },
                { id: "services", label: "Gaming Services", icon: Settings },
                { id: "events", label: "Upcoming Events", icon: Calendar }
              ].map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                    activeTab === tab.id 
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Gaming Platforms */}
        {activeTab === "platforms" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {gamingPlatforms.map((platform) => (
              <Card key={platform.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border-slate-200 overflow-hidden">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${platform.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300`}>
                    <platform.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{platform.name}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{platform.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-lg font-bold text-slate-900">{platform.tournaments}</div>
                      <div className="text-xs text-slate-600">Active Tournaments</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-lg font-bold text-slate-900">{platform.players}</div>
                      <div className="text-xs text-slate-600">Registered Players</div>
                    </div>
                  </div>
                  
                  <Button className={`w-full bg-gradient-to-r ${platform.color} text-white hover:opacity-90 transition-all`}>
                    <Play className="h-4 w-4 mr-2" />
                    Join Platform
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Gaming Services */}
        {activeTab === "services" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {gamingServices.map((service) => (
              <Card key={service.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border-slate-200 overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
                      <service.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium text-slate-600">{service.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-slate-900 mb-3">Features Included:</h4>
                    <div className="space-y-2">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-slate-900">{service.price}</div>
                    <Button className={`bg-gradient-to-r ${service.color} text-white hover:opacity-90 transition-all`}>
                      Get Started
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Upcoming Events */}
        {activeTab === "events" && (
          <div className="space-y-6 mb-16">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="group hover:shadow-xl transition-all duration-300 bg-white border-slate-200">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-xl font-bold text-slate-900">{event.title}</h3>
                        <Badge className={`${
                          event.status === "Coming Soon" ? "bg-blue-100 text-blue-700" :
                          event.status === "Registration Open" ? "bg-green-100 text-green-700" :
                          "bg-purple-100 text-purple-700"
                        }`}>
                          {event.status}
                        </Badge>
                      </div>
                      <p className="text-slate-600 mb-2">{event.description}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {event.date}
                        </div>
                        <div className="flex items-center">
                          <Badge variant="secondary" className="text-xs">{event.type}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {event.status === "Registration Open" ? "Register" : "Notify Me"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Gaming Community CTA */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-6 py-3 text-sm border border-white/20 mb-6">
              <Crown className="mr-2 h-4 w-4" />
              Premium Gaming Experience
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Level Up?</h3>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Join Zambia's most active gaming community. Connect, compete, and conquer with players from across the country.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 font-bold px-8 py-4 rounded-2xl shadow-lg">
                <Users className="mr-2 h-5 w-5" />
                Join Community
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent font-bold px-8 py-4 rounded-2xl">
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
