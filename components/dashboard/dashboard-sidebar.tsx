"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  TrendingUp,
  Bell,
  HelpCircle,
  LogOut,
  Home,
  Star,
  MessageSquare
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface DashboardSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  userRole: string
}

const sidebarItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: BarChart3,
    badge: null
  },
  {
    id: 'products',
    label: 'Products',
    icon: Package,
    badge: null
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: ShoppingCart,
    badge: '3'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: TrendingUp,
    badge: null
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: Users,
    badge: null
  }
]

const bottomItems = [
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    badge: '2'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    badge: null
  },
  {
    id: 'help',
    label: 'Help & Support',
    icon: HelpCircle,
    badge: null
  }
]

export function DashboardSidebar({ activeTab, onTabChange, userRole }: DashboardSidebarProps) {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white/90 backdrop-blur-xl border-r border-slate-200/50 shadow-lg lg:block hidden">
      <div className="flex flex-col h-full">
        {/* Logo/Brand */}
        <div className="p-6">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900">Linka</span>
              <div className="text-xs text-slate-600">Retailer Dashboard</div>
            </div>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="px-6 pb-4">
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-emerald-900">This Month</span>
              <Star className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-emerald-700">ZMW 28,540</div>
            <div className="text-xs text-emerald-600">+18.3% from last month</div>
          </div>
        </div>

        <Separator className="mx-6" />

        {/* Main Navigation */}
        <nav className="flex-1 px-4 py-4">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start h-11 ${
                  activeTab === item.id 
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                onClick={() => onTabChange(item.id)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge 
                    variant={activeTab === item.id ? "default" : "secondary"} 
                    className="text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </nav>

        <Separator className="mx-6" />

        {/* Bottom Navigation */}
        <div className="px-4 py-4">
          <div className="space-y-1">
            {bottomItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start h-11 ${
                  activeTab === item.id 
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                onClick={() => onTabChange(item.id)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge variant="destructive" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        <Separator className="mx-6" />

        {/* Footer Actions */}
        <div className="p-4 space-y-2">
          <Link href="/">
            <Button variant="outline" className="w-full justify-start h-11">
              <Home className="h-5 w-5 mr-3" />
              Back to Store
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start h-11 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
        </div>

        {/* Help Widget */}
        <div className="p-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <MessageSquare className="h-4 w-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-900">Need Help?</span>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Get support from our team or browse our help center.
            </p>
            <Button size="sm" variant="outline" className="w-full text-xs">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
