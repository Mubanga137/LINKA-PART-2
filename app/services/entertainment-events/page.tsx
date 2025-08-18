"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef } from "react"
import { 
  Gamepad2, 
  Film, 
  Music, 
  Calendar, 
  Crown,
  Search,
  TrendingUp,
  Star,
  Play,
  Users,
  Zap,
  Heart,
  Share2,
  Plus,
  ArrowRight,
  Sparkles,
  Award,
  Trophy,
  Download,
  Headphones,
  ChevronRight
} from "lucide-react"

// Import our hub components
import { GamingHub } from "@/components/entertainment-hub/gaming-hub"
import { MoviesHub } from "@/components/entertainment-hub/movies-hub"
import { MusicHub } from "@/components/entertainment-hub/music-hub"
import { EventsHub } from "@/components/entertainment-hub/events-hub"
import { SubscriptionsHub } from "@/components/entertainment-hub/subscriptions-hub"

const entertainmentCategories = [
  {
    id: "overview",
    name: "Overview",
    icon: Sparkles,
    gradient: "from-purple-500 to-pink-500",
    description: "Discover all entertainment categories"
  },
  {
    id: "gaming",
    name: "Gaming",
    icon: Gamepad2,
    gradient: "from-pink-500 to-blue-500",
    description: "Tournaments, games, and esports"
  },
  {
    id: "movies",
    name: "Movies",
    icon: Film,
    gradient: "from-purple-500 to-violet-500",
    description: "Streaming, local films, and cinema"
  },
  {
    id: "music",
    name: "Music",
    icon: Music,
    gradient: "from-teal-500 to-yellow-500",
    description: "Artists, playlists, and radio"
  },
  {
    id: "events",
    name: "Events",
    icon: Calendar,
    gradient: "from-red-500 to-orange-500",
    description: "Live shows, concerts, and bookings"
  },
  {
    id: "subscriptions",
    name: "Premium",
    icon: Crown,
    gradient: "from-emerald-500 to-green-500",
    description: "Subscriptions and exclusive offers"
  }
]

const featuredContent = [
  {
    id: 1,
    title: "FIFA 24 Championship",
    type: "Gaming Tournament",
    category: "gaming",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop",
    description: "Join Zambia's biggest FIFA tournament with ZMW 50,000 prize pool",
    stats: { participants: "2.5K", prize: "ZMW 50K", status: "Live" },
    isLive: true,
    gradient: "from-pink-500 to-blue-500"
  },
  {
    id: 2,
    title: "The Copper Chronicles",
    type: "Local Film Premiere",
    category: "movies",
    image: "https://images.unsplash.com/photo-1489599510067-e6327c8e4b9b?w=600&h=400&fit=crop",
    description: "Award-winning Zambian drama exploring our mining heritage",
    stats: { rating: "4.8", views: "25K", price: "ZMW 15" },
    isLive: false,
    gradient: "from-purple-500 to-violet-500"
  },
  {
    id: 3,
    title: "Zambian Music Festival 2024",
    type: "Live Concert",
    category: "events",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    description: "Three days of the best Zambian music with top artists",
    stats: { artists: "50+", tickets: "15K", date: "Mar 15" },
    isLive: false,
    gradient: "from-red-500 to-orange-500"
  }
]

const trendingNow = [
  { name: "FIFA Tournaments", growth: "+45%", icon: Trophy, color: "text-pink-500" },
  { name: "Local Films", growth: "+38%", icon: Film, color: "text-purple-500" },
  { name: "Music Streaming", growth: "+52%", icon: Music, color: "text-teal-500" },
  { name: "Live Events", growth: "+28%", icon: Calendar, color: "text-red-500" }
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

export default function EntertainmentHub() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Auto-rotate featured content
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredContent.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const currentFeatured = featuredContent[currentSlide]

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <Header />
      
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${currentFeatured.gradient} opacity-10 transition-all duration-1000`} />
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>

      <main className="relative z-10 pt-8">
        {/* Hero Section */}
        <motion.section 
          className="py-20 relative"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div className="text-center mb-16" variants={cardVariants}>
              {/* Premium Hub Badge */}
              <motion.div 
                className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm px-8 py-4 text-white border border-white/20 mb-8"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)" }}
              >
                <Sparkles className="mr-3 h-6 w-6 text-purple-400 animate-pulse" />
                <span className="text-lg font-medium">🎮 Premium Entertainment Hub</span>
                <Badge className="ml-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1">
                  NEW
                </Badge>
              </motion.div>

              <motion.h1 
                className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
                variants={cardVariants}
              >
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Your
                </span>
                <br />
                <span className={`bg-gradient-to-r ${currentFeatured.gradient} bg-clip-text text-transparent transition-all duration-1000`}>
                  Entertainment
                </span>
                <br />
                <span className="text-white">Universe</span>
              </motion.h1>

              <motion.p 
                className="text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-12"
                variants={cardVariants}
              >
                Stream, game, discover, and experience the ultimate entertainment destination.
                From gaming tournaments to live concerts – all in one premium hub.
              </motion.p>

              {/* Enhanced Search Bar */}
              <motion.div className="max-w-2xl mx-auto mb-12" variants={cardVariants}>
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 h-6 w-6" />
                  <Input
                    type="text"
                    placeholder="Search games, movies, music, events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-16 pr-32 py-6 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40 rounded-2xl"
                  />
                  <Button
                    size="lg"
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r ${currentFeatured.gradient} hover:opacity-90 rounded-xl px-8 transition-all duration-300`}
                  >
                    Search
                  </Button>
                </div>
              </motion.div>

              {/* Trending Indicators */}
              <motion.div 
                className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
                variants={containerVariants}
              >
                {trendingNow.map((trend, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20 hover:border-white/40 transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <trend.icon className={`h-5 w-5 ${trend.color}`} />
                      <span className="text-white font-medium">{trend.name}</span>
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                        {trend.growth}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Navigation Tabs */}
        <motion.section 
          className="py-8 sticky top-0 z-40 bg-slate-950/80 backdrop-blur-lg border-b border-white/10"
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6 lg:w-fit lg:grid-cols-6 mx-auto bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-2">
                {entertainmentCategories.map((category) => (
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
            </Tabs>
          </div>
        </motion.section>

        {/* Tab Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-16 py-16">
            {/* Featured Content Carousel */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold text-white mb-4">Featured Right Now</h2>
                <p className="text-white/80 text-xl">The hottest content across all entertainment categories</p>
              </motion.div>

              <Card className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-0 items-center min-h-[500px]">
                    {/* Content Image */}
                    <div className="relative group overflow-hidden">
                      <motion.img
                        src={currentFeatured.image}
                        alt={currentFeatured.title}
                        className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* Live Badge */}
                      {currentFeatured.isLive && (
                        <motion.div 
                          className="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                          LIVE NOW
                        </motion.div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-6 right-6">
                        <Badge className={`bg-gradient-to-r ${currentFeatured.gradient} text-white px-4 py-2`}>
                          {currentFeatured.type}
                        </Badge>
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute bottom-6 left-6 right-6 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full w-12 h-12 bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
                        >
                          <Heart className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full w-12 h-12 bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
                        >
                          <Share2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-12">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <h3 className="text-4xl font-bold text-white mb-4 leading-tight">
                          {currentFeatured.title}
                        </h3>

                        <p className="text-lg text-white/80 mb-8 leading-relaxed">
                          {currentFeatured.description}
                        </p>

                        <div className="grid grid-cols-3 gap-4 mb-8">
                          {Object.entries(currentFeatured.stats).map(([key, value], index) => (
                            <div key={key} className="text-center">
                              <div className="text-2xl font-bold text-white">{value}</div>
                              <div className="text-white/60 text-sm capitalize">{key}</div>
                            </div>
                          ))}
                        </div>

                        <div className="flex space-x-4">
                          <Button
                            size="lg"
                            className={`bg-gradient-to-r ${currentFeatured.gradient} hover:opacity-90 text-white px-8 py-4 shadow-lg hover:shadow-xl transition-all`}
                            onClick={() => setActiveTab(currentFeatured.category)}
                          >
                            <Play className="mr-2 h-5 w-5 fill-current" />
                            {currentFeatured.isLive ? "Watch Live" : "Explore Now"}
                          </Button>

                          <Button
                            size="lg"
                            variant="outline"
                            className="border-white/30 text-white hover:bg-white/10 bg-transparent px-8 py-4"
                          >
                            <Plus className="mr-2 h-5 w-5" />
                            Add to List
                          </Button>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Carousel Indicators */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                    {featuredContent.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-300 rounded-full ${
                          index === currentSlide 
                            ? `w-12 h-3 bg-gradient-to-r ${currentFeatured.gradient}` 
                            : "w-3 h-3 bg-white/30 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Category Grid */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-4xl font-bold text-white mb-4">Entertainment Categories</h2>
                <p className="text-white/80 text-xl">Dive deep into your favorite entertainment experiences</p>
              </motion.div>

              <motion.div 
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {entertainmentCategories.slice(1).map((category, index) => (
                  <motion.div
                    key={category.id}
                    variants={cardVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(category.id)}
                    className="cursor-pointer"
                  >
                    <Card className={`bg-gradient-to-br ${category.gradient}/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-2xl`}>
                      <CardContent className="p-8 text-center">
                        <div className={`w-16 h-16 bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                          <category.icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                        <p className="text-white/70 text-sm leading-relaxed">{category.description}</p>
                        <div className="mt-4">
                          <ArrowRight className="h-5 w-5 text-white/60 mx-auto" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* Quick Stats */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8">
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { label: "Active Creators", value: "5,200+", icon: Users, color: "from-purple-400 to-pink-400" },
                  { label: "Entertainment Hours", value: "125K+", icon: Play, color: "from-blue-400 to-cyan-400" },
                  { label: "Live Events", value: "350+", icon: Calendar, color: "from-green-400 to-emerald-400" },
                  { label: "Community Members", value: "45K+", icon: Heart, color: "from-orange-400 to-red-400" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Card className="bg-white/5 backdrop-blur-sm border border-white/20 text-center hover:bg-white/10 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                          <stat.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                        <div className="text-white/70 text-sm">{stat.label}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </section>
          </TabsContent>

          {/* Individual Hub Components */}
          <TabsContent value="gaming">
            <GamingHub />
          </TabsContent>

          <TabsContent value="movies">
            <MoviesHub />
          </TabsContent>

          <TabsContent value="music">
            <MusicHub />
          </TabsContent>

          <TabsContent value="events">
            <EventsHub />
          </TabsContent>

          <TabsContent value="subscriptions">
            <SubscriptionsHub />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
