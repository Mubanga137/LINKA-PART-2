import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, Plus, MessageSquare } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/90 border-b border-slate-200/50 shadow-sm">
      <div className="flex items-center justify-between px-6 lg:px-8 py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600">Welcome back, Mwamba! Here's your business overview.</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search orders, products..."
              className="pl-10 w-64 bg-white/80 backdrop-blur-sm border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
            />
          </div>

          {/* Quick Actions */}
          <Button
            size="sm"
            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg shadow-emerald-500/25"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5 text-slate-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Messages */}
          <Button variant="ghost" size="sm" className="relative">
            <MessageSquare className="h-5 w-5 text-slate-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center">
              2
            </span>
          </Button>

          {/* Profile */}
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer">
            <span className="text-white font-bold">MC</span>
          </div>
        </div>
      </div>
    </header>
  )
}
