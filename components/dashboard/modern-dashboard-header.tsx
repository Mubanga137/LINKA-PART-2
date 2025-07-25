"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { 
  Search, 
  Bell, 
  Settings, 
  Menu,
  RefreshCw,
  Download,
  Plus
} from "lucide-react"
import { User } from "@/contexts/auth-context"

interface ModernDashboardHeaderProps {
  user: User
  currentView: string
  onViewChange: (view: string) => void
}

export function ModernDashboardHeader({ 
  user, 
  currentView, 
  onViewChange 
}: ModernDashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const getPageTitle = (view: string) => {
    switch (view) {
      case 'overview':
        return 'Dashboard Overview'
      case 'analytics':
        return 'Performance Analytics'
      case 'reports':
        return 'Reports'
      case 'insights':
        return 'Business Insights'
      case 'orders':
        return 'Orders Management'
      case 'products':
        return 'Products'
      case 'customers':
        return 'Customers'
      case 'marketing':
        return 'Marketing'
      default:
        return 'Dashboard'
    }
  }

  const getPageDescription = (view: string) => {
    switch (view) {
      case 'overview':
        return "Welcome back! Here's your business performance at a glance."
      case 'analytics':
        return "Comprehensive business metrics and trends"
      case 'reports':
        return "Detailed reports and data analysis"
      case 'insights':
        return "AI-powered insights and recommendations"
      case 'orders':
        return "Manage and track customer orders"
      case 'products':
        return "Manage your product catalog"
      case 'customers':
        return "Customer management and analytics"
      case 'marketing':
        return "Marketing campaigns and performance"
      default:
        return ""
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log('Search query:', searchQuery)
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Page Title */}
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {getPageTitle(currentView)}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {getPageDescription(currentView)}
              </p>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search orders, products, customers, reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <kbd className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">
                ⌘K
              </kbd>
            </div>
          </form>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-3">
          {/* Action Buttons based on current view */}
          {currentView === 'overview' && (
            <>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Order
              </Button>
            </>
          )}

          {currentView === 'products' && (
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          )}

          {(currentView === 'analytics' || currentView === 'reports') && (
            <>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </>
          )}

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <p className="text-sm text-gray-600">You have 3 unread notifications</p>
              </div>
              
              <div className="max-h-64 overflow-y-auto">
                <DropdownMenuItem className="p-4 flex-col items-start">
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-medium text-sm">New order received</span>
                    <span className="text-xs text-gray-500">2 min ago</span>
                  </div>
                  <p className="text-sm text-gray-600">Order #ORD-2024-001 from Alexandra Chen</p>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="p-4 flex-col items-start">
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-medium text-sm">Low stock alert</span>
                    <span className="text-xs text-gray-500">1 hour ago</span>
                  </div>
                  <p className="text-sm text-gray-600">5 products are running low on inventory</p>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="p-4 flex-col items-start">
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-medium text-sm">Payment received</span>
                    <span className="text-xs text-gray-500">3 hours ago</span>
                  </div>
                  <p className="text-sm text-gray-600">ZMW 459.99 payment confirmed</p>
                </DropdownMenuItem>
              </div>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-4 text-center text-blue-600 hover:text-blue-700">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>

          {/* Mobile menu toggle */}
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
