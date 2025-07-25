"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Users,
  Play,
  MessageCircle,
  Award,
  TrendingUp,
  Eye,
  Music,
  Video,
  Mic,
  Camera,
  Verified,
  Crown,
} from "lucide-react"

const featuredCreators = [
  {
    id: 1,
    name: "Chanda Mbao",
    username: "@chandambao",
    avatar: "/placeholder.svg?height=120&width=120",
    coverImage: "/placeholder.svg?height=200&width=400",
    category: "Musician",
    followers: "45.2K",
    totalViews: "2.3M",
    totalContent: 89,
    rating: 4.9,
    isVerified: true,
    isPremium: true,
    bio: "Award-winning Zambian musician blending traditional sounds with modern beats",
    specialties: ["Afrobeat", "Traditional", "Gospel"],
    recentContent: [
      { title: "Zambian Sunrise", views: "234K", type: "Music" },
      { title: "Cultural Fusion", views: "189K", type: "Music" },
      { title: "Behind the Scenes", views: "156K", type: "Video" },
    ],
    achievements: ["Best New Artist 2023", "Cultural Ambassador", "Platinum Album"],
    monthlyEarnings: "ZMW 15,000+",
    responseRate: "98%",
    joinedDate: "2022",
  },
  {
    id: 2,
    name: "Lusaka Comedy Crew",
    username: "@lusakacomedy",
    avatar: "/placeholder.svg?height=120&width=120",
    coverImage: "/placeholder.svg?height=200&width=400",
    category: "Comedy",
    followers: "38.7K",
    totalViews: "1.8M",
    totalContent: 156,
    rating: 4.8,
    isVerified: true,
    isPremium: false,
    bio: "Making Zambia laugh one joke at a time. Clean comedy for all ages",
    specialties: ["Stand-up", "Skits", "Improv"],
    recentContent: [
      { title: "Zambian Parents Be Like", views: "445K", type: "Comedy" },
      { title: "City Life vs Village Life", views: "389K", type: "Comedy" },
      { title: "Wedding Ceremonies", views: "267K", type: "Comedy" },
    ],
    achievements: ["Comedy Awards Winner", "1M+ Views", "Fan Favorite"],
    monthlyEarnings: "ZMW 8,500+",
    responseRate: "95%",
    joinedDate: "2021",
  },
  {
    id: 3,
    name: "DJ Electro Zambia",
    username: "@djelectrozm",
    avatar: "/placeholder.svg?height=120&width=120",
    coverImage: "/placeholder.svg?height=200&width=400",
    category: "DJ/Producer",
    followers: "52.1K",
    totalViews: "3.1M",
    totalContent: 234,
    rating: 4.9,
    isVerified: true,
    isPremium: true,
    bio: "Electronic music producer and DJ. Bringing the beats that move Zambia",
    specialties: ["Electronic", "House", "Afro-House"],
    recentContent: [
      { title: "Weekend Vibes Mix", views: "567K", type: "Music" },
      { title: "Club Bangers 2024", views: "423K", type: "Music" },
      { title: "Live Set - Lusaka", views: "334K", type: "Live" },
    ],
    achievements: ["Top DJ 2023", "International Bookings", "Platinum Mixes"],
    monthlyEarnings: "ZMW 22,000+",
    responseRate: "99%",
    joinedDate: "2020",
  },
]

export function CreatorSpotlight() {
  const [selectedCreator, setSelectedCreator] = useState<number | null>(null)
  const [followedCreators, setFollowedCreators] = useState<number[]>([])

  const toggleFollow = (creatorId: number) => {
    setFollowedCreators((prev) =>
      prev.includes(creatorId) ? prev.filter((id) => id !== creatorId) : [...prev, creatorId],
    )
  }

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm px-6 py-3 text-yellow-700 border border-yellow-200/50 mb-6">
            <Crown className="mr-2 h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium">⭐ Featured Creators</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Creator</span>
            <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              {" "}
              Spotlight
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Meet the talented creators who are shaping Zambian entertainment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredCreators.map((creator) => (
            <Card
              key={creator.id}
              className="group cursor-pointer transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl bg-white border-slate-200 overflow-hidden"
              onClick={() => setSelectedCreator(selectedCreator === creator.id ? null : creator.id)}
            >
              <CardContent className="p-0">
                {/* Cover Image */}
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={creator.coverImage || "/placeholder.svg"}
                    alt={`${creator.name} cover`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Premium Badge */}
                  {creator.isPremium && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                      <Crown className="mr-1 h-3 w-3" />
                      PREMIUM
                    </div>
                  )}
                </div>

                {/* Profile Section */}
                <div className="relative px-6 pb-6">
                  {/* Avatar */}
                  <div className="relative -mt-12 mb-4">
                    <img
                      src={creator.avatar || "/placeholder.svg"}
                      alt={creator.name}
                      className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover mx-auto"
                    />
                    {creator.isVerified && (
                      <div className="absolute bottom-2 right-1/2 transform translate-x-6 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Verified className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Creator Info */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-yellow-600 transition-colors">
                      {creator.name}
                    </h3>
                    <p className="text-slate-500 text-sm mb-2">{creator.username}</p>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                      {creator.category}
                    </Badge>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-slate-900">{creator.followers}</div>
                      <div className="text-xs text-slate-500">Followers</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-slate-900">{creator.totalViews}</div>
                      <div className="text-xs text-slate-500">Total Views</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-slate-900">{creator.totalContent}</div>
                      <div className="text-xs text-slate-500">Content</div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center mb-4">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-bold text-slate-900 mr-2">{creator.rating}</span>
                    <span className="text-slate-500 text-sm">({creator.responseRate} response rate)</span>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-slate-600 text-center mb-4 line-clamp-2">{creator.bio}</p>

                  {/* Specialties */}
                  <div className="flex flex-wrap justify-center gap-1 mb-4">
                    {creator.specialties.map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 mb-4">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFollow(creator.id)
                      }}
                      className={`flex-1 ${
                        followedCreators.includes(creator.id)
                          ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
                          : "bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                      }`}
                      size="sm"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      {followedCreators.includes(creator.id) ? "Following" : "Follow"}
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-yellow-50 bg-transparent">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Expanded Details */}
                  {selectedCreator === creator.id && (
                    <div className="border-t border-slate-200 pt-4 space-y-4">
                      {/* Recent Content */}
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Recent Content</h4>
                        <div className="space-y-2">
                          {creator.recentContent.map((content, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                                  {content.type === "Music" && <Music className="h-4 w-4 text-white" />}
                                  {content.type === "Video" && <Video className="h-4 w-4 text-white" />}
                                  {content.type === "Comedy" && <Users className="h-4 w-4 text-white" />}
                                  {content.type === "Live" && <Mic className="h-4 w-4 text-white" />}
                                </div>
                                <div>
                                  <div className="font-medium text-slate-900 text-sm">{content.title}</div>
                                  <div className="text-xs text-slate-500">{content.views} views</div>
                                </div>
                              </div>
                              <Button size="sm" variant="ghost" className="p-1">
                                <Play className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Achievements</h4>
                        <div className="space-y-2">
                          {creator.achievements.map((achievement, index) => (
                            <div key={index} className="flex items-center text-sm text-slate-600">
                              <Award className="h-4 w-4 mr-2 text-yellow-500" />
                              {achievement}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Earnings & Stats */}
                      <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-900">{creator.monthlyEarnings}</div>
                          <div className="text-xs text-slate-500">Monthly Earnings</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-900">Since {creator.joinedDate}</div>
                          <div className="text-xs text-slate-500">Member Since</div>
                        </div>
                      </div>

                      {/* Contact Actions */}
                      <div className="flex space-x-2">
                        <Button className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Become a Creator CTA */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200/50">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Become a Featured Creator</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Join our community of talented creators and start earning from your passion. Get verified, build your
                audience, and showcase your talent to thousands of fans.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-yellow-600 to-orange-600">
                  <Award className="mr-2 h-5 w-5" />
                  Apply to be Featured
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-yellow-50 bg-transparent">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Creator Resources
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
