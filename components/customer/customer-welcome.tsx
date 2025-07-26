"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  MapPin, 
  Star, 
  Gift, 
  Zap,
  ShoppingBag,
  Heart,
  Clock
} from "lucide-react"
import { User } from "@/contexts/auth-context"

interface CustomerWelcomeProps {
  user: User
}

export function CustomerWelcome({ user }: CustomerWelcomeProps) {
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
    <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-6 md:space-y-0">
          {/* User Info */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-4 border-white/20">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-white/20 text-white text-lg font-bold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {getTimeGreeting()}, {user.name.split(' ')[0]}!
              </h1>
              <div className="flex items-center space-x-4 text-emerald-100">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{user.location || 'Lusaka, Zambia'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm">Customer since {new Date(user.joinedAt).getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats & Actions */}
          <div className="flex items-center space-x-6">
            {/* Quick Stats */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-emerald-100">Orders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">8</div>
                <div className="text-xs text-emerald-100">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24</div>
                <div className="text-xs text-emerald-100">Saved</div>
              </div>
            </div>

            {/* CTA Button */}
            <Button 
              className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-6 py-3"
              size="lg"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Start Shopping
            </Button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          {/* Loyalty Points */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">2,450</div>
                  <div className="text-sm text-emerald-100">Loyalty Points</div>
                </div>
                <Gift className="h-8 w-8 text-emerald-200" />
              </div>
              <div className="mt-2">
                <Badge className="bg-emerald-500 text-white">
                  550 points to next reward
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Active Orders */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">3</div>
                  <div className="text-sm text-emerald-100">Active Orders</div>
                </div>
                <ShoppingBag className="h-8 w-8 text-emerald-200" />
              </div>
              <div className="mt-2">
                <Badge className="bg-blue-500 text-white">
                  2 arriving today
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Saved Items */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">24</div>
                  <div className="text-sm text-emerald-100">Saved Items</div>
                </div>
                <Heart className="h-8 w-8 text-emerald-200" />
              </div>
              <div className="mt-2">
                <Badge className="bg-purple-500 text-white">
                  5 on sale now
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">Today</div>
                  <div className="text-sm text-emerald-100">Last Activity</div>
                </div>
                <Clock className="h-8 w-8 text-emerald-200" />
              </div>
              <div className="mt-2">
                <Badge className="bg-orange-500 text-white">
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
