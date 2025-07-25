"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, MapPin, Star, Users, Calendar, Play, X, Wifi, Car, Coffee, Shield, Clock, Award } from "lucide-react"
import Image from "next/image"

const locations = ["Lusaka", "Livingstone", "Ndola", "Kitwe", "Kabwe", "Chingola"]

const stats = [
  { number: 1250, label: "Properties", suffix: "+" },
  { number: 15000, label: "Happy Guests", suffix: "+" },
  { number: 12, label: "Cities", suffix: "" },
  { number: 4.8, label: "Average Rating", suffix: "/5" },
]

export function RentalsHero() {
  const [currentLocation, setCurrentLocation] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0))

  // Rotate locations every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocation((prev) => (prev + 1) % locations.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Animate stats on mount
  useEffect(() => {
    stats.forEach((stat, index) => {
      const duration = 2000
      const steps = 60
      const increment = stat.number / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= stat.number) {
          current = stat.number
          clearInterval(timer)
        }
        setAnimatedStats((prev) => {
          const newStats = [...prev]
          newStats[index] = current
          return newStats
        })
      }, duration / steps)
    })
  }, [])

  return (
    <section className="relative py-16 sm:py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center rounded-full bg-white/60 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-slate-700 shadow-lg shadow-slate-900/5 border border-white/20 mb-6 sm:mb-8">
              <Home className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-emerald-500" />
              Trusted by 15,000+ guests across Zambia
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Stay in
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent transition-all duration-500">
                {locations[currentLocation]}
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Like Home
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 mb-8 sm:mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Discover unique accommodations from verified local hosts across Zambia. Book instantly with mobile money
              and enjoy authentic Zambian hospitality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start mb-12 sm:mb-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-1 w-full sm:w-auto"
              >
                <Calendar className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                Book Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowVideo(true)}
                className="border-2 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300 px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 w-full sm:w-auto"
              >
                <Play className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1 sm:mb-2">
                    {stat.label === "Average Rating"
                      ? animatedStats[index].toFixed(1)
                      : Math.floor(animatedStats[index]).toLocaleString()}
                    {stat.suffix}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Featured Property */}
          <div className="mt-12 lg:mt-0">
            <Card className="group hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-white/20 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Featured Property"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                    {/* Property Badge */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      Featured
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                        <Shield className="h-4 w-4 text-emerald-500" />
                      </div>
                      <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                        <Award className="h-4 w-4 text-orange-500" />
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex space-x-2">
                        {[Wifi, Car, Coffee].map((Icon, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg"
                          >
                            <Icon className="h-4 w-4 text-slate-600" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1.5 text-sm font-bold text-slate-900">4.9</span>
                        <span className="ml-1 text-sm text-slate-500">(127 reviews)</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-500">
                        <MapPin className="h-3.5 w-3.5 mr-1 text-emerald-500" />
                        Kabulonga, Lusaka
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-900 mb-2 text-lg group-hover:text-emerald-600 transition-colors">
                      Modern 2BR Apartment with Pool
                    </h3>

                    <p className="text-sm text-slate-600 mb-4">Hosted by Sarah Mwanza • Superhost</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-slate-900">ZMW 450</span>
                        <span className="text-sm text-slate-500">per night</span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Book Now
                      </Button>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="flex items-center text-sm text-slate-600">
                        <Users className="h-4 w-4 mr-2 text-emerald-500" />
                        <span>Up to 4 guests • 2 bedrooms • 1 bathroom</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-white rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>
            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Demo video would play here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
