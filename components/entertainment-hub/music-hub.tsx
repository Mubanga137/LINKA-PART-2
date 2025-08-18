"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { motion, useInView } from "framer-motion"
import { 
  Music, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Heart, 
  Share2, 
  Download,
  Mic,
  Radio,
  ListMusic,
  Users,
  Star,
  TrendingUp,
  Headphones,
  Plus,
  Shuffle,
  Repeat
} from "lucide-react"

const musicCategories = [
  {
    id: "trending",
    name: "Trending",
    icon: TrendingUp,
    gradient: "from-teal-500 to-yellow-500"
  },
  {
    id: "local",
    name: "Local Artists",
    icon: Mic,
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: "playlists",
    name: "Playlists",
    icon: ListMusic,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: "radio",
    name: "Radio",
    icon: Radio,
    gradient: "from-orange-500 to-red-500"
  }
]

const trendingMusic = [
  {
    id: 1,
    title: "Blessings",
    artist: "Chef 187 ft. Yo Maps",
    album: "Bon Appetit",
    duration: "3:45",
    genre: "Afrobeats",
    year: 2024,
    plays: "125K",
    rating: 4.9,
    price: "ZMW 5",
    isLocal: true,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    waveform: [20, 40, 60, 80, 90, 70, 50, 30, 60, 80, 95, 70, 40, 20, 50, 70, 90, 60, 30, 10],
    category: "local"
  },
  {
    id: 2,
    title: "Ngongole",
    artist: "Slapdee",
    album: "Mother Tongue",
    duration: "4:12",
    genre: "Hip Hop",
    year: 2024,
    plays: "98K",
    rating: 4.8,
    price: "ZMW 5",
    isLocal: true,
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
    waveform: [30, 50, 70, 90, 85, 60, 40, 20, 70, 90, 80, 50, 30, 40, 60, 80, 95, 70, 40, 20],
    category: "local"
  },
  {
    id: 3,
    title: "Tomorrow",
    artist: "Macky 2",
    album: "Legendary",
    duration: "3:28",
    genre: "Dancehall",
    year: 2024,
    plays: "87K",
    rating: 4.7,
    price: "ZMW 4",
    isLocal: true,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
    waveform: [40, 60, 80, 70, 50, 30, 60, 90, 95, 80, 60, 40, 20, 50, 70, 90, 80, 60, 30, 10],
    category: "local"
  },
  {
    id: 4,
    title: "Banga",
    artist: "Jemax ft. Chef 187",
    album: "Hustle University",
    duration: "3:56",
    genre: "Afro Pop",
    year: 2024,
    plays: "112K",
    rating: 4.9,
    price: "ZMW 5",
    isLocal: true,
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
    waveform: [25, 45, 65, 85, 95, 75, 55, 35, 65, 85, 90, 70, 45, 25, 55, 75, 95, 75, 45, 15],
    category: "local"
  },
  {
    id: 5,
    title: "International Hit",
    artist: "Global Artist",
    album: "Worldwide",
    duration: "3:32",
    genre: "Pop",
    year: 2024,
    plays: "1.2M",
    rating: 4.6,
    price: "ZMW 8",
    isLocal: false,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    waveform: [35, 55, 75, 95, 80, 65, 45, 25, 75, 95, 85, 55, 35, 45, 65, 85, 90, 65, 35, 15],
    category: "trending"
  }
]

const playlists = [
  {
    id: 1,
    name: "Zambian Hits 2024",
    description: "The hottest tracks from local artists",
    tracks: 45,
    duration: "3h 12m",
    plays: "25K",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    curator: "Music Zambia",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 2,
    name: "Afrobeats Vibes",
    description: "Feel-good African rhythms",
    tracks: 32,
    duration: "2h 45m",
    plays: "18K",
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
    curator: "Beat Master",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 3,
    name: "Gospel Inspiration",
    description: "Uplifting spiritual music",
    tracks: 28,
    duration: "2h 15m",
    plays: "22K",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    curator: "Faith Sounds",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 4,
    name: "Hip Hop Nation",
    description: "Best of Zambian rap and hip hop",
    tracks: 38,
    duration: "2h 55m",
    plays: "31K",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
    curator: "Rap Central",
    color: "from-blue-500 to-cyan-500"
  }
]

const radioStations = [
  {
    id: 1,
    name: "Radio Phoenix",
    frequency: "89.5 FM",
    genre: "Contemporary",
    listeners: "5.2K",
    currentShow: "Morning Vibes",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=150&h=150&fit=crop",
    isLive: true,
    host: "DJ Sarah"
  },
  {
    id: 2,
    name: "QFM",
    frequency: "94.1 FM",
    genre: "Urban",
    listeners: "3.8K",
    currentShow: "Urban Beats",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop",
    isLive: true,
    host: "MC Fire"
  },
  {
    id: 3,
    name: "Classic FM",
    frequency: "106.5 FM",
    genre: "Classic Hits",
    listeners: "4.1K",
    currentShow: "Golden Oldies",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop",
    isLive: true,
    host: "DJ Mike"
  }
]

const topArtists = [
  {
    id: 1,
    name: "Chef 187",
    genre: "Hip Hop",
    followers: "125K",
    monthlyListeners: "45K",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    verified: true,
    topSong: "Blessings"
  },
  {
    id: 2,
    name: "Yo Maps",
    genre: "Afrobeats",
    followers: "98K",
    monthlyListeners: "38K",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    verified: true,
    topSong: "Aweah"
  },
  {
    id: 3,
    name: "Slapdee",
    genre: "Rap",
    followers: "156K",
    monthlyListeners: "52K",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    verified: true,
    topSong: "Ngongole"
  }
]

export function MusicHub() {
  const [activeTab, setActiveTab] = useState("trending")
  const [currentTrack, setCurrentTrack] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([75])
  const [progress, setProgress] = useState([0])
  const [likedTracks, setLikedTracks] = useState<number[]>([])
  const [playlistTracks, setPlaylistTracks] = useState<number[]>([])
  const [isShuffled, setIsShuffled] = useState(false)
  const [isRepeating, setIsRepeating] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const togglePlay = (trackId?: number) => {
    if (trackId && currentTrack !== trackId) {
      setCurrentTrack(trackId)
      setIsPlaying(true)
      setProgress([0])
    } else {
      setIsPlaying(!isPlaying)
    }
  }

  const toggleLike = (id: number) => {
    setLikedTracks(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const addToPlaylist = (id: number) => {
    setPlaylistTracks(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  // Simulate progress for demo
  useEffect(() => {
    if (isPlaying && currentTrack) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev[0] + 0.5
          return newProgress >= 100 ? [0] : [newProgress]
        })
      }, 500)
      return () => clearInterval(interval)
    }
  }, [isPlaying, currentTrack])

  const getCurrentTrackData = () => {
    return trendingMusic.find(track => track.id === currentTrack)
  }

  const getMusicForCategory = () => {
    switch (activeTab) {
      case "local":
        return trendingMusic.filter(track => track.isLocal)
      case "playlists":
        return playlists
      case "radio":
        return radioStations
      default:
        return trendingMusic
    }
  }

  return (
    <div className="py-16 space-y-16">
      {/* Musical Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-500/5 via-yellow-500/5 to-teal-500/5" />
        
        {/* Waveform Background */}
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-10">
          <div className="flex items-end h-full space-x-1">
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-gradient-to-t from-teal-400 to-yellow-400 rounded-t"
                style={{
                  height: `${Math.random() * 100}%`,
                  width: '1%'
                }}
                animate={{
                  height: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.05
                }}
              />
            ))}
          </div>
        </div>

        {/* Music Notes */}
        <div className="absolute inset-0">
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
                opacity: [0.1, 0.4, 0.1]
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            >
              <Music className="h-4 w-4 text-teal-400/20" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Music Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-teal-500/20 to-yellow-500/20 backdrop-blur-sm px-6 py-3 text-white border border-white/20 mb-6">
            <Music className="mr-2 h-5 w-5 text-teal-400 animate-pulse" />
            <span className="text-sm font-medium">🎵 Music & Audio</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-teal-400 via-yellow-400 to-teal-400 bg-clip-text text-transparent">
              Feel the
            </span>
            <span className="text-white block md:inline md:ml-4">Rhythm</span>
          </h2>

          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Discover, stream, and share the best of Zambian music and beyond
          </p>
        </motion.div>

        {/* Music Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            { label: "Songs Available", value: "15,000+", icon: Music, color: "from-teal-400 to-yellow-400" },
            { label: "Local Artists", value: "350+", icon: Mic, color: "from-green-400 to-emerald-400" },
            { label: "Playlists", value: "1,200+", icon: ListMusic, color: "from-purple-400 to-pink-400" },
            { label: "Active Listeners", value: "22K+", icon: Headphones, color: "from-orange-400 to-red-400" },
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

      {/* Floating Music Player */}
      {currentTrack && (
        <motion.div 
          className="fixed bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:w-96 z-50"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-slate-900/95 backdrop-blur-lg border border-teal-500/30 shadow-2xl overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4 mb-4">
                <motion.img
                  src={getCurrentTrackData()?.image}
                  alt={getCurrentTrackData()?.title}
                  className="w-12 h-12 rounded-lg object-cover"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white truncate">{getCurrentTrackData()?.title}</h4>
                  <p className="text-sm text-white/70 truncate">{getCurrentTrackData()?.artist}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-white hover:bg-white/10"
                    onClick={() => toggleLike(currentTrack)}
                  >
                    <Heart className={`h-4 w-4 ${likedTracks.includes(currentTrack) ? "fill-current text-red-400" : ""}`} />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-white hover:bg-white/10"
                  onClick={() => setIsShuffled(!isShuffled)}
                >
                  <Shuffle className={`h-4 w-4 ${isShuffled ? "text-teal-400" : ""}`} />
                </Button>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => togglePlay()}
                    className="bg-gradient-to-r from-teal-500 to-yellow-500 hover:opacity-90 rounded-full w-10 h-10"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-white hover:bg-white/10"
                  onClick={() => setIsRepeating(!isRepeating)}
                >
                  <Repeat className={`h-4 w-4 ${isRepeating ? "text-teal-400" : ""}`} />
                </Button>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-3">
                <Slider
                  value={progress}
                  onValueChange={setProgress}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-white/60 mt-1">
                  <span>{Math.floor(progress[0] * 0.04)}:{Math.floor((progress[0] * 0.04) * 60) % 60 < 10 ? '0' : ''}{Math.floor((progress[0] * 0.04) * 60) % 60}</span>
                  <span>{getCurrentTrackData()?.duration}</span>
                </div>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-2 mb-3">
                <Volume2 className="h-4 w-4 text-white/70" />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>

              {/* Waveform Visualization */}
              <div className="flex items-end space-x-1 h-8">
                {getCurrentTrackData()?.waveform.map((height, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-t from-teal-400 to-yellow-400 rounded-t transition-all duration-200"
                    style={{
                      height: `${height}%`,
                      width: '4%',
                      opacity: index <= (progress[0] / 5) ? 1 : 0.3
                    }}
                    animate={isPlaying ? {
                      height: [`${height}%`, `${Math.max(height - 20, 10)}%`, `${height}%`]
                    } : {}}
                    transition={{
                      duration: 0.5,
                      repeat: isPlaying ? Infinity : 0,
                      delay: index * 0.1
                    }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Music Categories */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4 mx-auto mb-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-2">
            {musicCategories.map((category) => (
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

          {/* Trending Music */}
          <TabsContent value="trending" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingMusic.map((track) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="group cursor-pointer bg-white/5 backdrop-blur-sm border border-white/20 hover:border-teal-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/20 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={track.image}
                          alt={track.title}
                          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                          whileHover={{ scale: 1.1 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        
                        {/* Local Badge */}
                        {track.isLocal && (
                          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            ZAMBIAN
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleLike(track.id)}
                            className={`rounded-full w-8 h-8 ${
                              likedTracks.includes(track.id)
                                ? "bg-red-500/20 text-red-400"
                                : "bg-black/50 text-white hover:bg-black/70"
                            }`}
                          >
                            <Heart className={`h-3 w-3 ${likedTracks.includes(track.id) ? "fill-current" : ""}`} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => addToPlaylist(track.id)}
                            className={`rounded-full w-8 h-8 ${
                              playlistTracks.includes(track.id)
                                ? "bg-teal-500/20 text-teal-400"
                                : "bg-black/50 text-white hover:bg-black/70"
                            }`}
                          >
                            <Plus className={`h-3 w-3 ${playlistTracks.includes(track.id) ? "rotate-45" : ""} transition-transform`} />
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
                              onClick={() => togglePlay(track.id)}
                              className="bg-gradient-to-r from-teal-500 to-yellow-500 hover:opacity-90 text-white shadow-lg rounded-full w-16 h-16"
                            >
                              {currentTrack === track.id && isPlaying ? 
                                <Pause className="h-8 w-8" /> : 
                                <Play className="h-8 w-8 fill-current" />
                              }
                            </Button>
                          </motion.div>
                        </div>

                        {/* Track Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="font-bold text-white mb-1 leading-tight">
                            {track.title}
                          </h3>
                          <p className="text-sm text-white/80 mb-2">{track.artist}</p>
                          <div className="flex items-center justify-between text-xs">
                            <Badge variant="secondary" className="bg-teal-500/20 text-teal-400 border-teal-500/30">
                              {track.genre}
                            </Badge>
                            <span className="text-white/70">{track.duration}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-white/70">
                            <Headphones className="h-3 w-3 mr-1" />
                            {track.plays} plays
                          </div>
                          <div className="flex items-center text-white/70">
                            <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
                            {track.rating}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-teal-400 font-semibold">{track.price}</span>
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-white/70 hover:text-white hover:bg-white/10 p-1"
                            >
                              <Share2 className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-white/70 hover:text-white hover:bg-white/10 p-1"
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <Button
                          className="w-full bg-gradient-to-r from-teal-500 to-yellow-500 hover:opacity-90 transition-all group-hover:scale-105"
                          size="sm"
                          onClick={() => togglePlay(track.id)}
                        >
                          {currentTrack === track.id && isPlaying ? (
                            <>
                              <Pause className="mr-2 h-4 w-4" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Play Now
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Local Artists Tab */}
          <TabsContent value="local" className="space-y-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-3xl font-bold text-white mb-4">Zambian Music Scene</h3>
                <p className="text-white/80 max-w-2xl mx-auto">
                  Supporting and celebrating the incredible talent from the heart of Africa
                </p>
              </motion.div>
            </div>

            {/* Top Artists */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {topArtists.map((artist) => (
                <motion.div
                  key={artist.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="group cursor-pointer bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/30 hover:border-green-500/50 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="relative mb-4">
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className="w-20 h-20 rounded-full object-cover mx-auto group-hover:scale-105 transition-transform"
                        />
                        {artist.verified && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="font-bold text-white mb-1">{artist.name}</h3>
                      <p className="text-green-400 text-sm mb-4">{artist.genre}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-white">{artist.followers}</div>
                          <div className="text-white/60">Followers</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-white">{artist.monthlyListeners}</div>
                          <div className="text-white/60">Monthly</div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-white/60 mb-4">
                        Top Song: <span className="text-green-400">{artist.topSong}</span>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90"
                        size="sm"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Play Top Songs
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Local Music Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingMusic.filter(track => track.isLocal).map((track) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="group cursor-pointer bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/30 hover:border-green-500/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={track.image}
                          alt={track.title}
                          className="w-16 h-16 object-cover rounded-lg group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-white mb-1">{track.title}</h3>
                          <p className="text-green-400 font-semibold">{track.artist}</p>
                          <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                            {track.genre} • {track.year}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="flex items-center text-green-400">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          {track.rating}
                        </div>
                        <div className="flex items-center text-white/70">
                          <Headphones className="h-3 w-3 mr-1" />
                          {track.plays}
                        </div>
                        <div className="text-white font-semibold">{track.price}</div>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90"
                        size="sm"
                        onClick={() => togglePlay(track.id)}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Play Track
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Playlists Tab */}
          <TabsContent value="playlists" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {playlists.map((playlist) => (
                <motion.div
                  key={playlist.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className={`group cursor-pointer bg-gradient-to-br ${playlist.color}/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 overflow-hidden`}>
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={playlist.image}
                          alt={playlist.name}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className={`absolute bottom-2 right-2 bg-gradient-to-r ${playlist.color} text-white px-2 py-1 rounded-full text-xs font-bold`}>
                          {playlist.tracks} tracks
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-bold text-white mb-2">{playlist.name}</h3>
                        <p className="text-sm text-white/70 mb-4">{playlist.description}</p>

                        <div className="space-y-2 mb-4 text-sm">
                          <div className="flex items-center justify-between text-white/70">
                            <span>Duration:</span>
                            <span>{playlist.duration}</span>
                          </div>
                          <div className="flex items-center justify-between text-white/70">
                            <span>Plays:</span>
                            <span>{playlist.plays}</span>
                          </div>
                          <div className="flex items-center justify-between text-white/70">
                            <span>Curator:</span>
                            <span>{playlist.curator}</span>
                          </div>
                        </div>

                        <Button
                          className={`w-full bg-gradient-to-r ${playlist.color} hover:opacity-90`}
                          size="sm"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Play Playlist
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Radio Stations Tab */}
          <TabsContent value="radio" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {radioStations.map((station) => (
                <motion.div
                  key={station.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="group cursor-pointer bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm border border-orange-500/30 hover:border-orange-500/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="relative mb-4">
                        <img
                          src={station.image}
                          alt={station.name}
                          className="w-full h-24 object-cover rounded-lg group-hover:scale-105 transition-transform"
                        />
                        {station.isLive && (
                          <motion.div 
                            className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse"></div>
                            LIVE
                          </motion.div>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-white mb-1">{station.name}</h3>
                      <p className="text-orange-400 font-semibold mb-2">{station.frequency}</p>
                      <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs mb-3">
                        {station.genre}
                      </Badge>

                      <div className="space-y-2 mb-4 text-sm">
                        <div className="text-white/70">
                          <span className="font-semibold">Now Playing:</span> {station.currentShow}
                        </div>
                        <div className="text-white/70">
                          <span className="font-semibold">Host:</span> {station.host}
                        </div>
                        <div className="flex items-center text-white/70">
                          <Users className="h-3 w-3 mr-1" />
                          {station.listeners} listeners
                        </div>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90"
                        size="sm"
                      >
                        <Radio className="mr-2 h-4 w-4" />
                        Listen Live
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
