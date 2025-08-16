"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
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
  User,
  Users,
  Star,
  TrendingUp,
  Headphones,
  Plus
} from "lucide-react"

interface MusicSectionProps {
  standalone?: boolean
}

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
    waveform: [20, 40, 60, 80, 90, 70, 50, 30, 60, 80, 95, 70, 40, 20, 50, 70, 90, 60, 30, 10]
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
    waveform: [30, 50, 70, 90, 85, 60, 40, 20, 70, 90, 80, 50, 30, 40, 60, 80, 95, 70, 40, 20]
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
    waveform: [40, 60, 80, 70, 50, 30, 60, 90, 95, 80, 60, 40, 20, 50, 70, 90, 80, 60, 30, 10]
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
    waveform: [25, 45, 65, 85, 95, 75, 55, 35, 65, 85, 90, 70, 45, 25, 55, 75, 95, 75, 45, 15]
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
    curator: "Music Zambia"
  },
  {
    id: 2,
    name: "Afrobeats Vibes",
    description: "Feel-good African rhythms",
    tracks: 32,
    duration: "2h 45m",
    plays: "18K",
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
    curator: "Beat Master"
  },
  {
    id: 3,
    name: "Gospel Inspiration",
    description: "Uplifting spiritual music",
    tracks: 28,
    duration: "2h 15m",
    plays: "22K",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    curator: "Faith Sounds"
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
    isLive: true
  },
  {
    id: 2,
    name: "QFM",
    frequency: "94.1 FM",
    genre: "Urban",
    listeners: "3.8K",
    currentShow: "Urban Beats",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop",
    isLive: true
  }
]

export function MusicSection({ standalone = false }: MusicSectionProps) {
  const [activeTab, setActiveTab] = useState("trending")
  const [currentTrack, setCurrentTrack] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([75])
  const [progress, setProgress] = useState([0])
  const [likedTracks, setLikedTracks] = useState<number[]>([])
  const [playlistTracks, setPlaylistTracks] = useState<number[]>([])

  const togglePlay = (trackId: number) => {
    if (currentTrack === trackId) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentTrack(trackId)
      setIsPlaying(true)
      setProgress([0])
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
          const newProgress = prev[0] + 1
          return newProgress >= 100 ? [0] : [newProgress]
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, currentTrack])

  const getCurrentTrackData = () => {
    return trendingMusic.find(track => track.id === currentTrack)
  }

  return (
    <section 
      id="music-section" 
      className={`relative py-24 ${standalone ? 'min-h-screen pt-32' : ''}`}
    >
      {/* Musical Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-500/5 via-yellow-500/5 to-teal-500/5" />
        
        {/* Waveform Background */}
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-10">
          <div className="flex items-end h-full space-x-1">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-t from-teal-400 to-yellow-400 rounded-t animate-pulse"
                style={{
                  height: `${Math.random() * 100}%`,
                  width: '1%',
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Music Notes */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <Music
              key={i}
              className="absolute text-teal-400/20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${1 + Math.random()}rem`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
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
        </div>

        {/* Music Player - Floating */}
        {currentTrack && (
          <div className="fixed bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:w-96 z-50">
            <Card className="bg-slate-900/95 backdrop-blur-lg border border-teal-500/30 shadow-2xl">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={getCurrentTrackData()?.image}
                    alt={getCurrentTrackData()?.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white truncate">{getCurrentTrackData()?.title}</h4>
                    <p className="text-sm text-white/70 truncate">{getCurrentTrackData()?.artist}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => togglePlay(currentTrack)}
                      className="bg-gradient-to-r from-teal-500 to-yellow-500 hover:opacity-90"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-3">
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
                <div className="flex items-center space-x-2 mt-2">
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
                <div className="flex items-end space-x-1 mt-3 h-8">
                  {getCurrentTrackData()?.waveform.map((height, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-t from-teal-400 to-yellow-400 rounded-t transition-all duration-200 ${
                        isPlaying ? 'animate-pulse' : ''
                      }`}
                      style={{
                        height: `${height}%`,
                        width: '4%',
                        opacity: index <= (progress[0] / 5) ? 1 : 0.3
                      }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Music Tabs */}
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
                <Card
                  key={track.id}
                  className="group cursor-pointer bg-white/5 backdrop-blur-sm border border-white/20 hover:border-teal-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-500/20 overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={track.image}
                        alt={track.title}
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
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
                        <Button
                          size="lg"
                          onClick={() => togglePlay(track.id)}
                          className="bg-gradient-to-r from-teal-500 to-yellow-500 hover:opacity-90 text-white shadow-lg transform scale-110 hover:scale-125 transition-transform rounded-full w-16 h-16"
                        >
                          {currentTrack === track.id && isPlaying ? 
                            <Pause className="h-8 w-8" /> : 
                            <Play className="h-8 w-8 fill-current" />
                          }
                        </Button>
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
              ))}
            </div>
          </TabsContent>

          {/* Local Artists */}
          <TabsContent value="local" className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">Zambian Music Scene</h3>
              <p className="text-white/80 max-w-2xl mx-auto">
                Supporting and celebrating the incredible talent from the heart of Africa
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingMusic.filter(track => track.isLocal).map((track) => (
                <Card
                  key={track.id}
                  className="group cursor-pointer bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/30 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={track.image}
                        alt={track.title}
                        className="w-16 h-16 object-cover rounded-lg"
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
              ))}
            </div>
          </TabsContent>

          {/* Playlists */}
          <TabsContent value="playlists" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {playlists.map((playlist) => (
                <Card
                  key={playlist.id}
                  className="group cursor-pointer bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2"
                >
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <img
                        src={playlist.image}
                        alt={playlist.name}
                        className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                      <div className="absolute bottom-2 right-2 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {playlist.tracks} tracks
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{playlist.name}</h3>
                    <p className="text-sm text-white/70 mb-4">{playlist.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-white/70">
                        <span>Duration:</span>
                        <span>{playlist.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-white/70">
                        <span>Plays:</span>
                        <span>{playlist.plays}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-white/70">
                        <span>Curator:</span>
                        <span>{playlist.curator}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                      size="sm"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Play Playlist
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Radio Stations */}
          <TabsContent value="radio" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {radioStations.map((station) => (
                <Card
                  key={station.id}
                  className="group cursor-pointer bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm border border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2"
                >
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <img
                        src={station.image}
                        alt={station.name}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      {station.isLive && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center animate-pulse">
                          <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-ping"></div>
                          LIVE
                        </div>
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
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
