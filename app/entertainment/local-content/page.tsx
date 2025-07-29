"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Play, 
  Search, 
  Star, 
  Heart, 
  Share2,
  Eye,
  Download,
  Music,
  Video,
  Mic,
  Users,
  Clock,
  Calendar,
  MapPin,
  Award,
  TrendingUp
} from "lucide-react"

const localContent = [
  {
    id: 1,
    title: "Zambian Beats: Best of 2024",
    creator: "Various Zambian Artists",
    type: "Music Album",
    category: "Music",
    price: 25,
    currency: "ZMW",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center",
    rating: 4.9,
    reviews: 342,
    duration: "2h 15m",
    releaseDate: "2024-01-15",
    description: "A compilation of the hottest Zambian music featuring top artists from across the country",
    artists: ["Chef 187", "Yo Maps", "Slapdee", "Macky 2"],
    genre: "Afrobeat",
    language: "English/Bemba",
    isNew: true,
    isTrending: true,
    views: "45.2K",
    likes: "3.8K",
    region: "Lusaka"
  },
  {
    id: 2,
    title: "The Copper Chronicles",
    creator: "Lusaka Film Studios",
    type: "Short Film Series",
    category: "Film",
    price: 35,
    currency: "ZMW",
    image: "https://images.unsplash.com/photo-1489599510067-e6327c8e4b9b?w=400&h=300&fit=crop&crop=center",
    rating: 4.7,
    reviews: 189,
    duration: "6 episodes, 45m each",
    releaseDate: "2024-02-20",
    description: "A gripping drama series about life in Zambia's copper mining communities",
    artists: ["Local Theater Group"],
    genre: "Drama",
    language: "English/Bemba/Nyanja",
    isNew: false,
    isTrending: true,
    views: "28.7K",
    likes: "2.1K",
    region: "Copperbelt"
  },
  {
    id: 3,
    title: "Lusaka Comedy Night: Live Sessions",
    creator: "Zambian Comedy Club",
    type: "Comedy Special",
    category: "Comedy",
    price: 15,
    currency: "ZMW",
    image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&h=300&fit=crop&crop=center",
    rating: 4.8,
    reviews: 267,
    duration: "1h 30m",
    releaseDate: "2024-01-10",
    description: "Hilarious stand-up comedy featuring Zambia's funniest comedians",
    artists: ["Bob Nkosha", "Kandeke", "Uncle Rasco"],
    genre: "Stand-up Comedy",
    language: "English/Bemba",
    isNew: false,
    isTrending: false,
    views: "19.3K",
    likes: "1.9K",
    region: "Lusaka"
  },
  {
    id: 4,
    title: "Traditional Dance Heritage",
    creator: "Cultural Heritage Foundation",
    type: "Cultural Documentary",
    category: "Documentary",
    price: 20,
    currency: "ZMW",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&crop=center",
    rating: 4.9,
    reviews: 156,
    duration: "45m",
    releaseDate: "2024-03-01",
    description: "Learn authentic Zambian traditional dances from master performers",
    artists: ["Traditional Dance Groups"],
    genre: "Educational/Cultural",
    language: "English/Local Languages",
    isNew: true,
    isTrending: false,
    views: "12.8K",
    likes: "1.2K",
    region: "Various Provinces"
  },
  {
    id: 5,
    title: "Zamrock Revival Sessions",
    creator: "WITCH Tribute Band",
    type: "Live Concert",
    category: "Music",
    price: 30,
    currency: "ZMW",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop&crop=center",
    rating: 4.6,
    reviews: 98,
    duration: "1h 45m",
    releaseDate: "2024-02-14",
    description: "Celebrating the golden era of Zambian rock music with live performances",
    artists: ["Various Zamrock Artists"],
    genre: "Zamrock/Psychedelic Rock",
    language: "English",
    isNew: false,
    isTrending: true,
    views: "22.1K",
    likes: "2.8K",
    region: "Lusaka"
  },
  {
    id: 6,
    title: "Bemba Stories: Oral Traditions",
    creator: "Storytellers of Zambia",
    type: "Audio Stories",
    category: "Podcast",
    price: 10,
    currency: "ZMW",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center",
    rating: 4.5,
    reviews: 234,
    duration: "8 episodes, 30m each",
    releaseDate: "2024-01-05",
    description: "Traditional Bemba stories and folklore passed down through generations",
    artists: ["Elder Storytellers"],
    genre: "Cultural/Educational",
    language: "Bemba/English",
    isNew: false,
    isTrending: false,
    views: "15.6K",
    likes: "1.5K",
    region: "Northern Province"
  }
]

const categories = ["All", "Music", "Film", "Comedy", "Documentary", "Podcast"]
const regions = ["All Regions", "Lusaka", "Copperbelt", "Northern Province", "Southern Province", "Eastern Province", "Western Province", "Central Province", "Luapula", "North-Western", "Muchinga"]
const languages = ["All Languages", "English", "Bemba", "Nyanja", "Tonga", "Lozi"]

export default function LocalContentPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedRegion, setSelectedRegion] = useState("All Regions")
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages")
  const [sortBy, setSortBy] = useState("trending")
  const [likedItems, setLikedItems] = useState<number[]>([])

  const filteredContent = localContent
    .filter(content => {
      const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           content.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           content.artists.some(artist => artist.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = selectedCategory === "All" || content.category === selectedCategory
      const matchesRegion = selectedRegion === "All Regions" || content.region.includes(selectedRegion)
      const matchesLanguage = selectedLanguage === "All Languages" || content.language.includes(selectedLanguage)
      
      return matchesSearch && matchesCategory && matchesRegion && matchesLanguage
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "popular":
          return parseInt(b.views.replace(/[^\d]/g, '')) - parseInt(a.views.replace(/[^\d]/g, ''))
        default:
          return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0)
      }
    })

  const toggleLike = (contentId: number) => {
    setLikedItems(prev => 
      prev.includes(contentId) 
        ? prev.filter(id => id !== contentId)
        : [...prev, contentId]
    )
  }

  const handlePurchase = (content: typeof localContent[0]) => {
    console.log("Purchasing:", content.title)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=600&fit=crop&crop=center"
            alt="Zambian Local Content"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 to-red-900/80"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-6 py-3 text-sm border border-white/20 mb-6">
            <Award className="mr-2 h-4 w-4" />
            Proudly Zambian Content
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Local</span> Stories
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Stream authentic Zambian entertainment. From music to films, comedy to documentaries - support local creators.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">150+</div>
              <div className="text-sm opacity-90">Local Artists</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm opacity-90">Content Pieces</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">10</div>
              <div className="text-sm opacity-90">Provinces</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">7</div>
              <div className="text-sm opacity-90">Languages</div>
            </div>
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
                placeholder="Search for artists, titles, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 bg-gray-50 border-gray-200 focus:bg-white focus:border-orange-300"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Region Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {languages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="trending">Trending</option>
                  <option value="newest">Newest</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{filteredContent.length} content items found</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-1 text-orange-600" />
                  100% Zambian Content
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-green-600" />
                  Supporting Local Artists
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredContent.map((content) => (
              <Card
                key={content.id}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-white/20 overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Content Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={content.image}
                      alt={content.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {content.isNew && (
                        <Badge className="bg-green-500 text-white font-bold text-xs">
                          NEW
                        </Badge>
                      )}
                      {content.isTrending && (
                        <Badge className="bg-red-500 text-white font-bold text-xs animate-pulse">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          TRENDING
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-8 h-8 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                        onClick={() => toggleLike(content.id)}
                      >
                        <Heart className={`h-4 w-4 ${likedItems.includes(content.id) ? "fill-red-500 text-red-500" : ""}`} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-8 h-8 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Category Icon */}
                    <div className="absolute bottom-4 left-4">
                      <div className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center">
                        {content.category === "Music" && <Music className="h-4 w-4 text-gray-700" />}
                        {content.category === "Film" && <Video className="h-4 w-4 text-gray-700" />}
                        {content.category === "Comedy" && <Mic className="h-4 w-4 text-gray-700" />}
                        {content.category === "Documentary" && <Eye className="h-4 w-4 text-gray-700" />}
                        {content.category === "Podcast" && <Mic className="h-4 w-4 text-gray-700" />}
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
                      {content.duration}
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {content.category}
                      </Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-bold text-gray-900">{content.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">({content.reviews})</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {content.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-2">{content.creator}</p>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{content.description}</p>

                    {/* Artists */}
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-1">Artists:</div>
                      <div className="flex flex-wrap gap-1">
                        {content.artists.slice(0, 2).map((artist, index) => (
                          <span key={index} className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full">
                            {artist}
                          </span>
                        ))}
                        {content.artists.length > 2 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            +{content.artists.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                      <div>
                        <span className="text-gray-500">Genre:</span>
                        <div className="font-medium text-gray-900">{content.genre}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Language:</span>
                        <div className="font-medium text-gray-900">{content.language}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Region:</span>
                        <div className="font-medium text-gray-900">{content.region}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Released:</span>
                        <div className="font-medium text-gray-900">
                          {new Date(content.releaseDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {content.views}
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {content.likes}
                        </div>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">
                          {content.currency} {content.price}
                        </span>
                      </div>
                      <Button
                        onClick={() => handlePurchase(content)}
                        className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Watch
                      </Button>
                    </div>

                    {/* Payment Options */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Support Local Artists:</span>
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

      {/* Support Local Artists Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Support Zambian Creativity</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Every purchase directly supports local artists, filmmakers, and content creators across Zambia
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <Award className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">100% Local</h3>
              <p className="opacity-90">All content is created by Zambian artists and creators</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <Users className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Direct Support</h3>
              <p className="opacity-90">Your purchase goes directly to the artists and creators</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <MapPin className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Cultural Preservation</h3>
              <p className="opacity-90">Help preserve and promote Zambian culture and traditions</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
