"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Search, 
  MapPin, 
  Star, 
  Truck,
  ShoppingBag,
  Heart,
  MessageCircle,
  Wallet
} from "lucide-react"
import Link from "next/link"

const quickActions = [
  {
    id: 'search',
    label: 'Search Products',
    description: 'Find exactly what you need',
    icon: Search,
    href: '/marketplace',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'nearby',
    label: 'Find Nearby',
    description: 'Services and stores near you',
    icon: MapPin,
    href: '/marketplace?nearby=true',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50'
  },
  {
    id: 'reviews',
    label: 'Top Rated',
    description: 'Best reviewed products',
    icon: Star,
    href: '/marketplace?sort=rating',
    color: 'from-yellow-500 to-orange-600',
    bgColor: 'bg-yellow-50'
  },
  {
    id: 'delivery',
    label: 'Fast Delivery',
    description: 'Same day & next day delivery',
    icon: Truck,
    href: '/marketplace?delivery=fast',
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-50'
  },
  {
    id: 'orders',
    label: 'My Orders',
    description: 'Track your purchases',
    icon: ShoppingBag,
    href: '/customer-dashboard/orders',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50'
  },
  {
    id: 'saved',
    label: 'Saved Items',
    description: 'Your wishlist & favorites',
    icon: Heart,
    href: '/customer-dashboard/saved',
    color: 'from-red-500 to-pink-600',
    bgColor: 'bg-red-50'
  },
  {
    id: 'messages',
    label: 'Messages',
    description: 'Chat with sellers',
    icon: MessageCircle,
    href: '/customer-dashboard/messages',
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-cyan-50'
  },
  {
    id: 'wallet',
    label: 'My Wallet',
    description: 'Payments & transactions',
    icon: Wallet,
    href: '/customer-dashboard/wallet',
    color: 'from-slate-500 to-gray-600',
    bgColor: 'bg-slate-50'
  }
]

export function QuickActions() {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Quick Actions
          </h2>
          <p className="text-slate-600">
            Everything you need at your fingertips
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {quickActions.map((action) => (
            <Link key={action.id} href={action.href}>
              <Card className="group bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 ${action.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`w-8 h-8 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center`}>
                      <action.icon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-slate-900 text-sm mb-1 group-hover:text-emerald-600 transition-colors">
                    {action.label}
                  </h3>
                  
                  <p className="text-xs text-slate-500 group-hover:text-slate-600 transition-colors">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
