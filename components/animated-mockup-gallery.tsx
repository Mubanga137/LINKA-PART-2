"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Maximize2, Heart, Share2 } from "lucide-react"
import Image from "next/image"

interface MockupItem {
  id: number
  title: string
  category: string
  image: string
  description: string
  gradient: string
  hoverGradient: string
}

const mockups: MockupItem[] = [
  {
    id: 1,
    title: "Mobile Shopping Experience",
    category: "Mobile App",
    image: "/placeholder.svg?height=400&width=300&text=Mobile+App",
    description: "Seamless mobile shopping with intuitive navigation",
    gradient: "from-blue-500 to-indigo-600",
    hoverGradient: "from-blue-400 to-indigo-500",
  },
  {
    id: 2,
    title: "Retailer Dashboard",
    category: "Web Platform",
    image: "/placeholder.svg?height=300&width=400&text=Dashboard",
    description: "Comprehensive analytics and inventory management",
    gradient: "from-emerald-500 to-green-600",
    hoverGradient: "from-emerald-400 to-green-500",
  },
  {
    id: 3,
    title: "Product Discovery",
    category: "User Interface",
    image: "/placeholder.svg?height=350&width=350&text=Product+Grid",
    description: "AI-powered product recommendations",
    gradient: "from-purple-500 to-pink-600",
    hoverGradient: "from-purple-400 to-pink-500",
  },
  {
    id: 4,
    title: "Checkout Flow",
    category: "Payment System",
    image: "/placeholder.svg?height=320&width=380&text=Checkout",
    description: "Secure and fast payment processing",
    gradient: "from-orange-500 to-red-600",
    hoverGradient: "from-orange-400 to-red-500",
  },
]

export function AnimatedMockupGallery() {
  const [activeItem, setActiveItem] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockups.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setIsPlaying(true)
  }

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Interactive{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
              Mockups
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Experience our platform through interactive previews and real-time demonstrations
          </p>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <Button
              onClick={handlePlayPause}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-100 hover:scale-105 transition-all bg-transparent"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Main Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Featured Mockup */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-2xl shadow-slate-900/10 overflow-hidden hover:shadow-3xl transition-all duration-500 interactive-card">
              <CardContent className="p-0">
                <div className="relative">
                  {/* Main Image */}
                  <div
                    className={`aspect-[4/3] bg-gradient-to-br ${mockups[currentIndex].gradient} p-8 relative overflow-hidden`}
                  >
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 left-4 w-16 h-16 bg-white/30 rounded-full animate-float"></div>
                      <div className="absolute top-1/2 right-8 w-8 h-8 bg-white/20 rounded-full animate-bounce-slow"></div>
                      <div className="absolute bottom-8 left-1/3 w-12 h-12 bg-white/25 rounded-full animate-pulse-slow"></div>
                    </div>

                    {/* Mockup Image */}
                    <div className="relative z-10 h-full flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl hover:scale-105 transition-transform duration-500 hover:rotate-1">
                        <Image
                          src={mockups[currentIndex].image || "/placeholder.svg"}
                          alt={mockups[currentIndex].title}
                          width={400}
                          height={300}
                          className="rounded-lg"
                        />
                      </div>
                    </div>

                    {/* Floating Action Buttons */}
                    <div className="absolute top-6 right-6 flex space-x-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        className="bg-white/90 text-slate-900 hover:bg-white shadow-lg hover:scale-110 transition-all"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-white/90 text-slate-900 hover:bg-white shadow-lg hover:scale-110 transition-all"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-white/90 text-slate-900 hover:bg-white shadow-lg hover:scale-110 transition-all"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Info Panel */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${mockups[currentIndex].gradient}`}
                      >
                        {mockups[currentIndex].category}
                      </span>
                      <div className="flex space-x-1">
                        {mockups.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentIndex ? "bg-blue-500 w-6" : "bg-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 hover:text-blue-600 transition-colors">
                      {mockups[currentIndex].title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{mockups[currentIndex].description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Thumbnail Grid */}
          <div className="space-y-4">
            {mockups.map((mockup, index) => (
              <Card
                key={mockup.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  index === currentIndex
                    ? "ring-2 ring-blue-500 shadow-lg bg-white"
                    : "bg-white/60 backdrop-blur-sm hover:bg-white/80"
                }`}
                onClick={() => setCurrentIndex(index)}
                onMouseEnter={() => setActiveItem(mockup.id)}
                onMouseLeave={() => setActiveItem(null)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    {/* Mini Preview */}
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${mockup.gradient} rounded-lg flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="w-8 h-8 bg-white/80 rounded-md animate-pulse"></div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h4
                        className={`font-bold text-sm transition-colors ${
                          index === currentIndex ? "text-blue-600" : "text-slate-900"
                        }`}
                      >
                        {mockup.title}
                      </h4>
                      <p className="text-xs text-slate-500">{mockup.category}</p>
                    </div>

                    {/* Active Indicator */}
                    {index === currentIndex && <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>}
                  </div>

                  {/* Progress Bar */}
                  {index === currentIndex && isPlaying && (
                    <div className="mt-3 w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 animate-shimmer"></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Interactive Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Real-time Updates",
              description: "See changes instantly as you interact",
              icon: "⚡",
              gradient: "from-yellow-400 to-orange-500",
            },
            {
              title: "Smooth Animations",
              description: "Fluid transitions and micro-interactions",
              icon: "🎨",
              gradient: "from-pink-400 to-purple-500",
            },
            {
              title: "Interactive Elements",
              description: "Click, hover, and explore every detail",
              icon: "🎯",
              gradient: "from-green-400 to-blue-500",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                >
                  <span className="text-2xl group-hover:animate-bounce">{feature.icon}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
