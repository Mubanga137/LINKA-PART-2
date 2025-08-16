"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Ticket, 
  Star, 
  Heart, 
  Share2,
  Music,
  Mic,
  PartyPopper,
  Crown,
  TrendingUp,
  Eye,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

interface EventsSectionProps {
  standalone?: boolean
}

const eventCategories = [
  {
    id: "upcoming",
    name: "Upcoming",
    icon: Calendar,
    gradient: "from-red-500 to-orange-500"
  },
  {
    id: "live",
    name: "Live Now",
    icon: TrendingUp,
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: "concerts",
    name: "Concerts",
    icon: Music,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: "comedy",
    name: "Comedy",
    icon: PartyPopper,
    gradient: "from-yellow-500 to-orange-500"
  }
]

const upcomingEvents = [
  {
    id: 1,
    title: "Zambian Music Festival 2024",
    type: "Music Festival",
    date: "2024-03-15",
    time: "18:00",
    venue: "Heroes Stadium",
    location: "Lusaka",
    price: "ZMW 150 - ZMW 500",
    capacity: 10000,
    attending: 3250,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    description: "The biggest music festival in Zambia featuring Chef 187, Yo Maps, Slapdee, and international artists",
    artists: ["Chef 187", "Yo Maps", "Slapdee", "Macky 2", "Jemax"],
    isPopular: true,
    ticketsLeft: 2750,
    category: "concerts"
  },
  {
    id: 2,
    title: "Comedy Gold Night",
    type: "Comedy Show",
    date: "2024-02-28",
    time: "20:00",
    venue: "Mulungushi Conference Centre",
    location: "Lusaka",
    price: "ZMW 50 - ZMW 150",
    capacity: 1500,
    attending: 1200,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop",
    description: "An evening of laughter with Zambia's funniest comedians",
    artists: ["Bob Nkosha", "Uncle Rasco", "Kandeke", "Fresh Bwoy"],
    isPopular: false,
    ticketsLeft: 300,
    category: "comedy"
  },
  {
    id: 3,
    title: "Copperbelt Music Concert",
    type: "Regional Concert",
    date: "2024-03-08",
    time: "19:00",
    venue: "Kitwe Showgrounds",
    location: "Kitwe",
    price: "ZMW 100 - ZMW 300",
    capacity: 5000,
    attending: 2100,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&h=400&fit=crop",
    description: "Celebrating the musical talent from the Copperbelt region",
    artists: ["Local Copperbelt Artists", "Special Guests"],
    isPopular: true,
    ticketsLeft: 2900,
    category: "concerts"
  },
  {
    id: 4,
    title: "Youth Talent Showcase",
    type: "Talent Show",
    date: "2024-02-25",
    time: "16:00",
    venue: "Levy Mwanawasa Stadium",
    location: "Ndola",
    price: "ZMW 30 - ZMW 100",
    capacity: 3000,
    attending: 1800,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    description: "Young talents from across Zambia showcase their skills",
    artists: ["Emerging Artists", "Youth Performers"],
    isPopular: false,
    ticketsLeft: 1200,
    category: "upcoming"
  }
]

const liveEvents = [
  {
    id: 1,
    title: "Friday Night Jazz",
    venue: "InterContinental Hotel",
    viewers: "2.3K",
    startTime: "21:00",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
    isLive: true
  },
  {
    id: 2,
    title: "Afrobeats Session",
    venue: "Arcades Shopping Mall",
    viewers: "1.8K",
    startTime: "19:30",
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=200&fit=crop",
    isLive: true
  }
]

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

export function EventsSection({ standalone = false }: EventsSectionProps) {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [likedEvents, setLikedEvents] = useState<number[]>([])
  const [attendingEvents, setAttendingEvents] = useState<number[]>([])

  const toggleLike = (id: number) => {
    setLikedEvents(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const toggleAttending = (id: number) => {
    setAttendingEvents(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const hasEventOnDate = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return upcomingEvents.some(event => event.date === dateStr)
  }

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return upcomingEvents.filter(event => event.date === dateStr)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <section 
      id="events-section" 
      className={`relative py-24 ${standalone ? 'min-h-screen pt-32' : ''}`}
    >
      {/* Festival Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/5 via-orange-500/5 to-red-500/5" />
        
        {/* Confetti Effect */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rotate-45 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'][Math.floor(Math.random() * 6)],
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Light Beams */}
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-yellow-400/20 to-transparent transform rotate-12" />
        <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-red-400/20 to-transparent transform -rotate-12" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm px-6 py-3 text-white border border-white/20 mb-6">
            <Calendar className="mr-2 h-5 w-5 text-red-400 animate-pulse" />
            <span className="text-sm font-medium">🎤 Events & Live Shows</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Live the
            </span>
            <span className="text-white block md:inline md:ml-4">Moment</span>
          </h2>

          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Book tickets, join live events, and experience unforgettable entertainment
          </p>
        </div>

        {/* Events Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4 mx-auto mb-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-2">
            {eventCategories.map((category) => (
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

          {/* Upcoming Events */}
          <TabsContent value="upcoming" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calendar */}
              <div className="lg:col-span-1">
                <Card className="bg-white/5 backdrop-blur-sm border border-white/20 sticky top-24">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">
                        {months[currentMonth]} {currentYear}
                      </h3>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            if (currentMonth === 0) {
                              setCurrentMonth(11)
                              setCurrentYear(currentYear - 1)
                            } else {
                              setCurrentMonth(currentMonth - 1)
                            }
                          }}
                          className="text-white hover:bg-white/10"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            if (currentMonth === 11) {
                              setCurrentMonth(0)
                              setCurrentYear(currentYear + 1)
                            } else {
                              setCurrentMonth(currentMonth + 1)
                            }
                          }}
                          className="text-white hover:bg-white/10"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                        <div key={day} className="text-center text-sm text-white/60 py-2 font-semibold">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {/* Empty cells for days before month starts */}
                      {[...Array(getFirstDayOfMonth(currentMonth, currentYear))].map((_, index) => (
                        <div key={index} className="h-10" />
                      ))}
                      
                      {/* Days of the month */}
                      {[...Array(getDaysInMonth(currentMonth, currentYear))].map((_, index) => {
                        const day = index + 1
                        const hasEvent = hasEventOnDate(day)
                        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                        const isSelected = selectedDate === dateStr
                        
                        return (
                          <button
                            key={day}
                            onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                            className={`h-10 rounded-lg text-sm font-medium transition-all ${
                              hasEvent
                                ? isSelected
                                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                                  : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {day}
                            {hasEvent && (
                              <div className="w-1 h-1 bg-red-400 rounded-full mx-auto mt-1" />
                            )}
                          </button>
                        )
                      })}
                    </div>

                    {/* Selected Date Events */}
                    {selectedDate && (
                      <div className="mt-6 pt-6 border-t border-white/20">
                        <h4 className="text-sm font-semibold text-white mb-3">
                          {formatDate(selectedDate)}
                        </h4>
                        <div className="space-y-2">
                          {getEventsForDate(new Date(selectedDate).getDate()).map(event => (
                            <div key={event.id} className="text-sm">
                              <div className="text-white font-medium">{event.title}</div>
                              <div className="text-white/70">{event.time} • {event.venue}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Events List */}
              <div className="lg:col-span-2 space-y-6">
                {upcomingEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="group cursor-pointer bg-white/5 backdrop-blur-sm border border-white/20 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="md:flex">
                        <div className="md:w-1/3 relative">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-48 md:h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          
                          {/* Popular Badge */}
                          {event.isPopular && (
                            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                              <Crown className="h-3 w-3 mr-1" />
                              POPULAR
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleLike(event.id)}
                              className={`rounded-full w-8 h-8 ${
                                likedEvents.includes(event.id)
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-black/50 text-white hover:bg-black/70"
                              }`}
                            >
                              <Heart className={`h-3 w-3 ${likedEvents.includes(event.id) ? "fill-current" : ""}`} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="rounded-full w-8 h-8 bg-black/50 text-white hover:bg-black/70"
                            >
                              <Share2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="md:w-2/3 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                                {event.title}
                              </h3>
                              <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
                                {event.type}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center text-yellow-400 mb-1">
                                <Star className="h-4 w-4 mr-1 fill-current" />
                                {event.rating}
                              </div>
                              <div className="text-sm text-white/70">
                                {event.attending.toLocaleString()} attending
                              </div>
                            </div>
                          </div>

                          <p className="text-white/80 mb-4 leading-relaxed">
                            {event.description}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center text-white/70">
                              <Calendar className="h-4 w-4 mr-2 text-red-400" />
                              <div>
                                <div className="font-semibold text-white">{formatDate(event.date)}</div>
                                <div className="text-sm">{event.time}</div>
                              </div>
                            </div>
                            <div className="flex items-center text-white/70">
                              <MapPin className="h-4 w-4 mr-2 text-orange-400" />
                              <div>
                                <div className="font-semibold text-white">{event.venue}</div>
                                <div className="text-sm">{event.location}</div>
                              </div>
                            </div>
                            <div className="flex items-center text-white/70">
                              <Ticket className="h-4 w-4 mr-2 text-yellow-400" />
                              <div>
                                <div className="font-semibold text-white">{event.price}</div>
                                <div className="text-sm">{event.ticketsLeft} left</div>
                              </div>
                            </div>
                          </div>

                          {/* Artists */}
                          <div className="mb-4">
                            <div className="text-sm text-white/70 mb-2">Featured Artists:</div>
                            <div className="flex flex-wrap gap-1">
                              {event.artists.map((artist, index) => (
                                <Badge key={index} variant="outline" className="border-white/30 text-white/80 text-xs">
                                  {artist}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex space-x-3">
                            <Button
                              className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90"
                              onClick={() => toggleAttending(event.id)}
                            >
                              <Ticket className="mr-2 h-4 w-4" />
                              {attendingEvents.includes(event.id) ? "Cancel Booking" : "Book Tickets"}
                            </Button>
                            <Button
                              variant="outline"
                              className="border-white/30 text-white hover:bg-white/10"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Live Events */}
          <TabsContent value="live" className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">Happening Right Now</h3>
              <p className="text-white/80 max-w-2xl mx-auto">
                Join thousands of viewers watching live entertainment from across Zambia
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {liveEvents.map((event) => (
                <Card
                  key={event.id}
                  className="group cursor-pointer bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/30 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2"
                >
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center animate-pulse">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-ping"></div>
                        LIVE
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                        <Users className="h-3 w-3 mr-1 inline" />
                        {event.viewers}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                    <div className="flex items-center text-green-400 mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.venue}
                    </div>
                    <div className="flex items-center text-white/70 mb-4">
                      <Clock className="h-4 w-4 mr-2" />
                      Started at {event.startTime}
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Watch Live
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Concerts */}
          <TabsContent value="concerts" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.filter(event => event.category === "concerts").map((event) => (
                <Card
                  key={event.id}
                  className="group cursor-pointer bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-bold text-white mb-2">{event.title}</h3>
                        <div className="flex items-center text-white/80 text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(event.date)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                          {event.type}
                        </Badge>
                        <div className="text-purple-400 font-semibold">{event.price.split(' - ')[0]}</div>
                      </div>
                      
                      <div className="space-y-2 mb-4 text-sm">
                        <div className="flex items-center text-white/70">
                          <MapPin className="h-3 w-3 mr-2" />
                          {event.venue}, {event.location}
                        </div>
                        <div className="flex items-center text-white/70">
                          <Users className="h-3 w-3 mr-2" />
                          {event.attending.toLocaleString()} attending
                        </div>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                        size="sm"
                      >
                        <Ticket className="mr-2 h-4 w-4" />
                        Get Tickets
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Comedy */}
          <TabsContent value="comedy" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.filter(event => event.category === "comedy").map((event) => (
                <Card
                  key={event.id}
                  className="group cursor-pointer bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2"
                >
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-24 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                        <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs mb-3">
                          {event.type}
                        </Badge>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-white/70">
                            <Calendar className="h-3 w-3 mr-2" />
                            {formatDate(event.date)} • {event.time}
                          </div>
                          <div className="flex items-center text-white/70">
                            <MapPin className="h-3 w-3 mr-2" />
                            {event.venue}
                          </div>
                          <div className="flex items-center text-yellow-400">
                            <Ticket className="h-3 w-3 mr-2" />
                            {event.price}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-white/80 text-sm mb-4">{event.description}</p>
                      <Button
                        className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90"
                        size="sm"
                      >
                        <PartyPopper className="mr-2 h-4 w-4" />
                        Book Comedy Show
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
