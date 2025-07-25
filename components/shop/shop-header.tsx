"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Grid3X3, List, MapPin, Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"

export function ShopHeader() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/90 border-b border-slate-200/50 shadow-lg">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Linka Shop
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search for local products, vendors, or categories..."
                className="pl-12 pr-4 py-3 text-lg bg-white/80 backdrop-blur-sm border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 shadow-sm"
              />
              <Button
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
              <Heart className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Wishlist</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 relative">
              <ShoppingCart className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Cart</span>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
          </div>
        </div>

        {/* Secondary Header */}
        <div className="flex items-center justify-between py-4 border-t border-slate-200/50">
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-slate-600">
              <MapPin className="h-4 w-4 mr-2 text-emerald-500" />
              <span className="font-medium">Lusaka, Zambia</span>
            </div>
            <div className="text-sm text-slate-500">
              Showing <span className="font-semibold text-slate-900">1,247</span> local products
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 lg:hidden">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-white shadow-sm" : ""}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-white shadow-sm" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
              <option>Best Rating</option>
              <option>Most Popular</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  )
}
