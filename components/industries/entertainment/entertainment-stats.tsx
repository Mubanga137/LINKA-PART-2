"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  Users,
  Play,
  Music,
  Video,
  Gamepad2,
  Mic,
  Star,
  Award,
  Clock,
  Eye,
  Heart,
  Download,
} from "lucide-react"

const stats = [
  {
    id: 1,
    title: "Total Content Views",
    value: "12.5M",
    change: "+23%",
    changeType: "increase",
    icon: Eye,
    description: "Monthly content consumption",
    color: "from-blue-500 to-cyan-600",
    bgColor: "from-blue-50 to-cyan-50",
  },
  {
    id: 2,
    title: "Active Creators",
    value: "2,847",
    change: "+18%",
    changeType: "increase",
    icon: Users,
    description: "Verified content creators",
    color: "from-purple-500 to-pink-600",
    bgColor: "from-purple-50 to-pink-50",
  },
  {
    id: 3,
    title: "Live Streams",
    value: "156",
    change: "+45%",
    changeType: "increase",
    icon: Play,
    description: "Currently broadcasting",
    color: "from-red-500 to-orange-600",
    bgColor: "from-red-50 to-orange-50",
  },
  {
    id: 4,
    title: "Content Hours",
    value: "89.2K",
    change: "+31%",
    changeType: "increase",
    icon: Clock,
    description: "Total entertainment hours",
    color: "from-green-500 to-emerald-600",
    bgColor: "from-green-50 to-emerald-50",
  },
]

const categoryStats = [
  {
    category: "Music",
    icon: Music,
    content: "15.2K",
    creators: "1,234",
    views: "4.8M",
    growth: "+28%",
    color: "from-purple-500 to-pink-600",
  },
  {
    category: "Gaming",
    icon: Gamepad2,
    content: "8.9K",
    creators: "567",
    views: "3.2M",
    growth: "+42%",
    color: "from-orange-500 to-red-600",
  },
  {
    category: "Comedy",
    icon: Users,
    content: "6.7K",
    creators: "423",
    views: "2.1M",
    growth: "+35%",
    color: "from-yellow-500 to-orange-600",
  },
  {
    category: "Live Shows",
    icon: Mic,
    content: "3.4K",
    creators: "289",
    views: "1.8M",
    growth: "+52%",
    color: "from-teal-500 to-cyan-600",
  },
  {
    category: "Films",
    icon: Video,
    content: "2.1K",
    creators: "156",
    views: "1.2M",
    growth: "+19%",
    color: "from-indigo-500 to-purple-600",
  },
]

const achievements = [
  {
    title: "Most Watched Content",
    description: "Zambian Beats Compilation 2024",
    value: "2.3M views",
    icon: Eye,
  },
  {
    title: "Top Earning Creator",
    description: "DJ Electro Zambia",
    value: "ZMW 22K/month",
    icon: Award,
  },
  {
    title: "Longest Live Stream",
    description: "24-Hour Gaming Marathon",
    value: "24 hours",
    icon: Clock,
  },
  {
    title: "Most Liked Content",
    description: "Traditional Wedding Dance",
    value: "45.2K likes",
    icon: Heart,
  },
]

export function EntertainmentStats() {
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    // Animate numbers on component mount
    const timer = setTimeout(() => {
      const newValues: { [key: string]: number } = {}
      stats.forEach((stat) => {
        const numericValue = Number.parseFloat(stat.value.replace(/[^\d.]/g, ""))
        newValues[stat.id] = numericValue
      })
      setAnimatedValues(newValues)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Platform</span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}
              Statistics
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Real-time insights into Zambia's growing entertainment ecosystem
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={stat.id}
              className="group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl bg-white/80 backdrop-blur-sm border-white/20 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-4 mb-4`}>
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.description}</div>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors">
                    {stat.title}
                  </h3>
                  <div
                    className={`flex items-center text-sm font-bold ${
                      stat.changeType === "increase" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {stat.change}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${75 + index * 5}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Category Breakdown */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Content by Category
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categoryStats.map((category, index) => (
              <Card
                key={index}
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl bg-white/90 backdrop-blur-sm border-white/30 overflow-hidden"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <category.icon className="h-8 w-8 text-white" />
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {category.category}
                  </h4>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Content:</span>
                      <span className="font-bold text-slate-900">{category.content}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Creators:</span>
                      <span className="font-bold text-slate-900">{category.creators}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Views:</span>
                      <span className="font-bold text-slate-900">{category.views}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-center text-green-600 font-bold text-sm">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {category.growth}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Platform Achievements
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200/50 overflow-hidden"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <achievement.icon className="h-6 w-6 text-white" />
                  </div>

                  <h4 className="font-bold text-slate-900 mb-2">{achievement.title}</h4>
                  <p className="text-sm text-slate-600 mb-3">{achievement.description}</p>
                  <div className="text-lg font-bold text-orange-600">{achievement.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-purple-900 to-pink-900 text-white border-none overflow-hidden">
            <CardContent className="p-12 relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full animate-float"></div>
                <div className="absolute top-8 right-8 w-4 h-4 bg-white rounded-full animate-bounce-slow"></div>
                <div className="absolute bottom-8 left-8 w-6 h-6 bg-white rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-white rounded-full animate-bounce"></div>
              </div>

              <div className="relative z-10">
                <h3 className="text-4xl font-bold mb-6">Join the Entertainment Revolution</h3>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Be part of Zambia's fastest-growing entertainment platform. Whether you're a creator or a fan, there's
                  a place for you in our community.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-purple-900 hover:bg-white/90 px-8">
                    <Star className="mr-2 h-5 w-5" />
                    Start Creating
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-8 bg-transparent"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download App
                  </Button>
                </div>

                <div className="mt-8 flex items-center justify-center space-x-8 text-white/80">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    <span>50K+ Users</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    <span>4.8 Rating</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    <span>Award Winning</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
