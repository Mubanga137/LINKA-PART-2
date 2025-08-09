"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Megaphone,
  User as UserIcon
} from "lucide-react"
import { User } from "@/contexts/auth-context"

interface ModernDashboardSidebarProps {
  activeView: string
  onViewChange: (view: string) => void
  user: User
  pendingOrders: number
  lowStock: number
}

const navigationItems = [
  {
    id: 'overview',
    label: 'Dashboard',
    icon: BarChart3,
    badge: null
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: ShoppingCart,
    badge: 'pendingOrders'
  },
  {
    id: 'products',
    label: 'Products',
    icon: Package,
    badge: 'lowStock'
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: Users,
    badge: null
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: TrendingUp,
    badge: null
  },
  {
    id: 'marketing',
    label: 'Marketing',
    icon: Megaphone,
    badge: null
  }
]

export function ModernDashboardSidebar({ 
  activeView, 
  onViewChange, 
  user, 
  pendingOrders, 
  lowStock 
}: ModernDashboardSidebarProps) {
  const getBadgeValue = (badgeType: string | null) => {
    if (!badgeType) return null
    
    switch (badgeType) {
      case 'pendingOrders':
        return pendingOrders > 0 ? pendingOrders.toString() : null
      case 'lowStock':
        return lowStock > 0 ? lowStock.toString() : null
      default:
        return null
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <div>
            <div className="font-bold text-gray-900 text-lg">LINKA</div>
            <div className="text-xs text-gray-500">Business Intelligence</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const badgeValue = getBadgeValue(item.badge)
            const isActive = activeView === item.id
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full justify-start h-12 px-4 ${
                  isActive 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => onViewChange(item.id)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span className="flex-1 text-left font-medium">{item.label}</span>
                {badgeValue && (
                  <Badge 
                    className={`text-xs ${
                      isActive 
                        ? 'bg-blue-500 text-white border-blue-400' 
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {badgeValue}
                  </Badge>
                )}
              </Button>
            )
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-gray-300 text-gray-700 text-sm font-medium">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 text-sm truncate">
              {user.name}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {user.role === 'retailer' ? 'Retailer' : 'Customer'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
