"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { 
  Bell, 
  Search, 
  Plus, 
  ChevronDown,
  CheckCircle,
  Clock,
  XCircle,
  Settings,
  User,
  HelpCircle
} from "lucide-react"
import { Input } from "@/components/ui/input"

interface DashboardHeaderProps {
  userName: string
  businessName?: string
  verificationStatus?: 'pending' | 'verified' | 'rejected'
}

export function DashboardHeader({ 
  userName, 
  businessName, 
  verificationStatus = 'verified' 
}: DashboardHeaderProps) {
  const getVerificationBadge = () => {
    switch (verificationStatus) {
      case 'verified':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        )
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl shadow-sm mb-6">
      <div className="flex items-center justify-between p-6">
        {/* Left side - Welcome & Business Info */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg?height=48&width=48" />
            <AvatarFallback className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              {userName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome back, {userName.split(' ')[0]}!
            </h1>
            {businessName && (
              <div className="flex items-center space-x-2 mt-1">
                <p className="text-slate-600">{businessName}</p>
                {getVerificationBadge()}
              </div>
            )}
            <p className="text-sm text-slate-500 mt-1">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search products, orders..."
              className="pl-10 w-64 bg-white/50 border-slate-200/50"
            />
          </div>

          {/* Quick Add Product */}
          <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>

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
                <h3 className="font-semibold text-slate-900">Notifications</h3>
                <p className="text-sm text-slate-600">You have 3 unread notifications</p>
              </div>
              
              <div className="max-h-64 overflow-y-auto">
                <DropdownMenuItem className="p-4 flex-col items-start">
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-medium text-sm">New Order #ORD-001</span>
                    <span className="text-xs text-slate-500">2 min ago</span>
                  </div>
                  <p className="text-sm text-slate-600">John Mwanza placed an order for ZMW 450</p>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="p-4 flex-col items-start">
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-medium text-sm">Low Stock Alert</span>
                    <span className="text-xs text-slate-500">1 hour ago</span>
                  </div>
                  <p className="text-sm text-slate-600">Copper Bracelet is running low (3 left)</p>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="p-4 flex-col items-start">
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-medium text-sm">Payment Received</span>
                    <span className="text-xs text-slate-500">3 hours ago</span>
                  </div>
                  <p className="text-sm text-slate-600">Payment of ZMW 280 received via MTN Money</p>
                </DropdownMenuItem>
              </div>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-4 text-center text-indigo-600 hover:text-indigo-700">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm">
                    {userName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-slate-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-3 border-b">
                <p className="font-medium text-slate-900">{userName}</p>
                <p className="text-sm text-slate-600">{businessName}</p>
              </div>
              
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                Profile Settings
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Account Settings
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <HelpCircle className="h-4 w-4 mr-2" />
                Help & Support
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="text-red-600 hover:text-red-700 hover:bg-red-50">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="border-t border-slate-200/50 px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">12</div>
            <div className="text-sm text-slate-600">Pending Orders</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">ZMW 28.5K</div>
            <div className="text-sm text-slate-600">This Month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">48</div>
            <div className="text-sm text-slate-600">Active Products</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">4.8</div>
            <div className="text-sm text-slate-600">Avg Rating</div>
          </div>
        </div>
      </div>
    </div>
  )
}
