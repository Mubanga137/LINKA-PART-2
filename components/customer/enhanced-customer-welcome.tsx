"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { 
  MapPin, 
  Star, 
  Gift, 
  Zap,
  ShoppingBag,
  Heart,
  Clock,
  TrendingUp,
  Crown,
  Sparkles,
  Package,
  Target
} from "lucide-react"
import { User } from "@/contexts/auth-context"

interface EnhancedCustomerWelcomeProps {
  user: User
}

export function EnhancedCustomerWelcome({ user }: EnhancedCustomerWelcomeProps) {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [loyaltyProgress, setLoyaltyProgress] = useState(0)
  const [currentPoints, setCurrentPoints] = useState(0)
  
  useEffect(() => {
    setIsVisible(true)
    // Animate loyalty progress
    const timer = setTimeout(() => {
      setLoyaltyProgress(82) // 82% to next reward
      setCurrentPoints(2450)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  const getTimeGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="relative">
      {/* Main Welcome Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-32 left-10 w-16 h-16 bg-yellow-400/20 rounded-full blur-lg animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-1/4 w-24 h-24 bg-pink-400/15 rounded-full blur-xl animate-bounce-slow"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-8 lg:space-y-0">
              {/* User Info with Animation */}
              <div className="flex items-center space-x-6">
                <div className="relative group">
                  <Avatar className="h-20 w-20 border-4 border-white/30 transition-all duration-300 group-hover:scale-110 group-hover:border-yellow-400/50">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-xl font-bold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                    <Crown className="h-4 w-4 text-white" />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-bold">
                      {getTimeGreeting()}, {user.name.split(' ')[0]}!
                    </h1>
                    <Sparkles className="h-6 w-6 text-yellow-400 animate-spin-slow" />
                  </div>
                  <div className="flex items-center space-x-6 text-white/80">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{user.location || 'Lusaka, Zambia'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      <span className="text-sm">Premium Member since {new Date(user.joinedAt).getFullYear()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => window.location.href = '/marketplace'}
                  className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 font-semibold px-8 py-4 border border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                  size="lg"
                >
                  <ShoppingBag className="h-5 w-5 mr-3 group-hover:animate-bounce" />
                  Start Shopping
                  <Sparkles className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>

                <Button
                  onClick={() => window.location.href = '/orders'}
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20 px-8 py-4 transition-all duration-300 hover:scale-105"
                  size="lg"
                >
                  <Package className="h-5 w-5 mr-3" />
                  Track Orders
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Loyalty Points */}
          <Card
            className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer group overflow-hidden"
            onClick={() => window.location.href = '/profile'}
          >
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-slate-900 mb-1 transition-all duration-300 group-hover:scale-110">
                      {currentPoints.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-600">Loyalty Points</div>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                    <Gift className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Progress to next reward</span>
                    <span>{loyaltyProgress}%</span>
                  </div>
                  <Progress value={loyaltyProgress} className="h-2" />
                </div>
                
                <Badge className="mt-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white group-hover:animate-pulse">
                  550 points to next reward
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Active Orders */}
          <Card
            className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer group overflow-hidden"
            onClick={() => window.location.href = '/orders'}
          >
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-slate-900 mb-1 transition-all duration-300 group-hover:scale-110">3</div>
                    <div className="text-sm text-slate-600">Active Orders</div>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-slate-600">2 arriving today</span>
                </div>
                
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white group-hover:animate-pulse">
                  Track packages
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Saved Items */}
          <Card
            className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer group overflow-hidden"
            onClick={() => window.location.href = '/wishlist'}
          >
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-400/20 to-red-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-slate-900 mb-1 transition-all duration-300 group-hover:scale-110">24</div>
                    <div className="text-sm text-slate-600">Wishlist Items</div>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-pink-500 to-red-600 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-slate-600">5 items on sale</span>
                </div>
                
                <Badge className="bg-gradient-to-r from-pink-500 to-red-600 text-white group-hover:animate-pulse">
                  View wishlist
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Activity Score */}
          <Card
            className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer group overflow-hidden"
            onClick={() => window.location.href = '/profile'}
          >
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-teal-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-slate-900 mb-1 transition-all duration-300 group-hover:scale-110">98</div>
                    <div className="text-sm text-slate-600">Activity Score</div>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-slate-600">Active today</span>
                </div>
                
                <Badge className="bg-gradient-to-r from-green-500 to-teal-600 text-white group-hover:animate-pulse">
                  <Zap className="h-3 w-3 mr-1" />
                  Very Active
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
