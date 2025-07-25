"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Store,
  TrendingUp,
  Users,
  Zap,
  Star,
  CheckCircle,
  DollarSign,
  Globe,
  Smartphone,
  BarChart3,
  Shield,
  Clock,
  CreditCard,
} from "lucide-react"

const liveStats = [
  { label: "Active Retailers", value: "1,247", change: "+12 today", icon: Store },
  { label: "Monthly Orders", value: "45,892", change: "+18% this month", icon: TrendingUp },
  { label: "Total Revenue", value: "ZMW 2.8M", change: "Last 30 days", icon: DollarSign },
  { label: "Customer Reach", value: "150K+", change: "Nationwide", icon: Globe },
]

const quickFeatures = [
  { icon: CheckCircle, text: "Free to join" },
  { icon: Clock, text: "24hr approval" },
  { icon: CreditCard, text: "Instant payments" },
  { icon: Shield, text: "Secure platform" },
]

export function ForRetailersHero() {
  const [currentStat, setCurrentStat] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % liveStats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-sm px-6 py-3 text-emerald-700 border border-emerald-200/50 mb-8">
              <Star className="mr-2 h-5 w-5 text-emerald-600 animate-pulse" />
              <span className="text-sm font-medium">🎯 Zambia's #1 E-commerce Platform for Retailers</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Transform Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Business
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                into a Success
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Join 1,200+ successful Zambian retailers on Linka and reach customers nationwide. 
              Get instant payments, powerful analytics, and dedicated support to grow your business exponentially.
            </p>

            {/* Quick Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {quickFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                    <feature.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-slate-700 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 text-lg shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5 hover:scale-105"
              >
                <Store className="mr-3 h-5 w-5" />
                Start Selling Now - It's Free!
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300 px-8 py-4 text-lg bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                See Success Stories
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </div>

            {/* Live Stats Ticker */}
            <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center">
                      <liveStats[currentStat].icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">{liveStats[currentStat].value}</div>
                      <div className="text-sm text-slate-600">{liveStats[currentStat].label}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="bg-green-100 text-green-700 font-bold">
                      {liveStats[currentStat].change}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Interactive Dashboard Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-green-400/10 rounded-3xl blur-3xl"></div>
            <Card className="relative bg-white/90 backdrop-blur-sm border-white/30 shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Retailer Dashboard Preview</h3>
                  <p className="text-slate-600">Real-time insights at your fingertips</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    {
                      label: "Today's Sales",
                      value: "ZMW 2,450",
                      change: "+15%",
                      icon: BarChart3,
                      gradient: "from-emerald-500 to-green-600",
                    },
                    {
                      label: "Orders",
                      value: "28",
                      change: "+8",
                      icon: TrendingUp,
                      gradient: "from-blue-500 to-indigo-600",
                    },
                    {
                      label: "Customers",
                      value: "156",
                      change: "New: 12",
                      icon: Users,
                      gradient: "from-purple-500 to-pink-600",
                    },
                    {
                      label: "Products",
                      value: "45",
                      change: "Active",
                      icon: Smartphone,
                      gradient: "from-orange-500 to-red-600",
                    },
                  ].map((stat, index) => (
                    <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className={`w-8 h-8 bg-gradient-to-br ${stat.gradient} rounded-lg flex items-center justify-center mb-3`}>
                        <stat.icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-lg font-bold text-slate-900">{stat.value}</div>
                      <div className="text-xs text-slate-600">{stat.label}</div>
                      <div className="text-xs text-green-600 font-medium">{stat.change}</div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/60 backdrop-blur-sm border-white/30 hover:bg-white/80"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Get Your Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}