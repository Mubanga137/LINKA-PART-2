"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
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
  LinkIcon, 
  ShoppingCart, 
  User, 
  ChevronDown, 
  LogOut, 
  Settings, 
  Package, 
  BarChart3, 
  Menu, 
  X, 
  Search, 
  Sparkles, 
  Heart,
  Bell,
  Globe,
  Shield,
  Zap,
  Camera,
  Truck,
  Clock,
  Star,
  Filter,
  MapPin,
  Mic,
  ArrowLeft
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/marketplace-context"

const TRENDING_SEARCHES = [
  "African fashion", "Traditional crafts", "Local jewelry", "Organic foods", "Handmade items"
]

const CATEGORIES = [
  { id: "fashion", name: "Fashion", icon: "👗", color: "bg-pink-100 text-pink-700" },
  { id: "electronics", name: "Electronics", icon: "📱", color: "bg-blue-100 text-blue-700" },
  { id: "jewelry", name: "Jewelry", icon: "💍", color: "bg-purple-100 text-purple-700" },
  { id: "food", name: "Food", icon: "🍯", color: "bg-yellow-100 text-yellow-700" },
  { id: "crafts", name: "Crafts", icon: "🎨", color: "bg-green-100 text-green-700" },
  { id: "services", name: "Services", icon: "🛎️", color: "bg-orange-100 text-orange-700" }
]

export function MarketplaceMainHeader() {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const router = useRouter()
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const getUserDashboardLink = () => {
    if (!user) return '/'
    switch (user.role) {
      case 'retailer':
        return '/retailer-dashboard'
      case 'admin':
        return '/admin-dashboard'
      case 'customer':
        return '/customer-dashboard'
      default:
        return '/profile'
    }
  }

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/marketplace?q=${encodeURIComponent(query)}`)
      setShowSuggestions(false)
      setIsSearchFocused(false)
    }
  }

  const handleVoiceSearch = () => {
    // Placeholder for voice search functionality
    console.log("Voice search activated")
  }

  const handleCameraSearch = () => {
    // Placeholder for visual search functionality
    console.log("Camera search activated")
  }

  return (
    <>
      {/* Mobile Header */}
      <motion.header 
        className="lg:hidden sticky top-0 z-50 bg-white border-b shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Top Bar */}
        <div className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>Deliver to: Nairobi</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <Truck className="h-3 w-3" />
                <span>Free shipping</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <LinkIcon className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-gray-900">Linka</span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className={`relative bg-gray-50 rounded-full transition-all duration-200 ${
                isSearchFocused ? 'ring-2 ring-orange-500 bg-white' : ''
              }`}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  ref={searchRef}
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    setIsSearchFocused(true)
                    setShowSuggestions(true)
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setIsSearchFocused(false)
                      setShowSuggestions(false)
                    }, 200)
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                  className="pl-10 pr-20 py-2 bg-transparent border-none focus:ring-0 text-sm"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCameraSearch}
                    className="p-1 h-6 w-6 hover:bg-orange-100"
                  >
                    <Camera className="h-3 w-3 text-orange-600" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleVoiceSearch}
                    className="p-1 h-6 w-6 hover:bg-orange-100"
                  >
                    <Mic className="h-3 w-3 text-orange-600" />
                  </Button>
                </div>
              </div>

              {/* Search Suggestions */}
              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow-lg mt-1 z-50"
                  >
                    <div className="p-3">
                      <div className="text-xs text-gray-500 mb-2">Trending searches</div>
                      <div className="space-y-2">
                        {TRENDING_SEARCHES.map((search, i) => (
                          <button
                            key={i}
                            onClick={() => handleSearch(search)}
                            className="flex items-center gap-2 w-full text-left p-2 hover:bg-gray-50 rounded text-sm"
                          >
                            <Search className="h-3 w-3 text-gray-400" />
                            <span>{search}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(true)}
              className="p-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/marketplace?category=${category.id}`}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${category.color}`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </motion.header>

      {/* Desktop Header */}
      <motion.header 
        className="hidden lg:block sticky top-0 z-50 bg-white border-b shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Top Bar */}
        <div className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-white text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Deliver to: Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>English</span>
                <ChevronDown className="h-3 w-3" />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>100% Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                <span>Free shipping on orders over K500</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <LinkIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">Linka</span>
                <div className="text-xs text-gray-500">Marketplace</div>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl relative">
              <div className={`relative bg-gray-50 rounded-full transition-all duration-200 ${
                isSearchFocused ? 'ring-2 ring-orange-500 bg-white shadow-lg' : ''
              }`}>
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  ref={searchRef}
                  placeholder="Search for products, brands, and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    setIsSearchFocused(true)
                    setShowSuggestions(true)
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setIsSearchFocused(false)
                      setShowSuggestions(false)
                    }, 200)
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                  className="pl-12 pr-24 py-3 bg-transparent border-none focus:ring-0 text-base"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCameraSearch}
                    className="p-2 hover:bg-orange-100 rounded-full"
                  >
                    <Camera className="h-4 w-4 text-orange-600" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleVoiceSearch}
                    className="p-2 hover:bg-orange-100 rounded-full"
                  >
                    <Mic className="h-4 w-4 text-orange-600" />
                  </Button>
                  <Button
                    onClick={() => handleSearch(searchQuery)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full"
                  >
                    Search
                  </Button>
                </div>
              </div>

              {/* Desktop Search Suggestions */}
              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 bg-white border rounded-xl shadow-xl mt-2 z-50"
                  >
                    <div className="p-4">
                      <div className="text-sm text-gray-500 mb-3">Trending searches</div>
                      <div className="grid grid-cols-2 gap-2">
                        {TRENDING_SEARCHES.map((search, i) => (
                          <button
                            key={i}
                            onClick={() => handleSearch(search)}
                            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg text-left"
                          >
                            <Search className="h-4 w-4 text-gray-400" />
                            <span>{search}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              {user && (
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </Button>
              )}

              {/* Wishlist */}
              {user && (
                <Link href="/wishlist">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-gray-600" />
                    <span className="hidden xl:inline text-gray-700">Wishlist</span>
                  </Button>
                </Link>
              )}

              {/* Cart */}
              {user && (
                <Link href="/cart">
                  <Button variant="ghost" size="sm" className="relative flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-gray-600" />
                    <span className="hidden xl:inline text-gray-700">Cart</span>
                    {totalItems > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </Link>
              )}

              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="hidden xl:block text-left">
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.role}</div>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => router.push(getUserDashboardLink())}>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/orders')}>
                      <Package className="mr-2 h-4 w-4" />
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="px-6 py-3 bg-gray-50 border-t">
          <div className="max-w-7xl mx-auto flex items-center gap-6 overflow-x-auto">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/marketplace?category=${category.id}`}
                className="flex items-center gap-2 px-4 py-2 hover:bg-white rounded-lg transition-colors whitespace-nowrap"
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium text-gray-700">{category.name}</span>
              </Link>
            ))}
            <Link
              href="/marketplace"
              className="flex items-center gap-2 px-4 py-2 hover:bg-white rounded-lg transition-colors text-orange-600 font-medium"
            >
              <Filter className="h-4 w-4" />
              All Categories
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {user ? (
                    <>
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.role}</div>
                      </div>
                    </>
                  ) : (
                    <div className="text-lg font-semibold">Menu</div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-4 space-y-4">
                {user ? (
                  <>
                    <Link href={getUserDashboardLink()} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-gray-600" />
                      <span>Dashboard</span>
                    </Link>
                    <Link href="/orders" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                      <Package className="h-5 w-5 text-gray-600" />
                      <span>My Orders</span>
                    </Link>
                    <Link href="/wishlist" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                      <Heart className="h-5 w-5 text-gray-600" />
                      <span>Wishlist</span>
                    </Link>
                    <Link href="/cart" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                      <ShoppingCart className="h-5 w-5 text-gray-600" />
                      <span>Cart {totalItems > 0 && `(${totalItems})`}</span>
                    </Link>
                    <Link href="/settings" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                      <Settings className="h-5 w-5 text-gray-600" />
                      <span>Settings</span>
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg w-full text-left">
                      <LogOut className="h-5 w-5 text-red-600" />
                      <span className="text-red-600">Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block">
                      <Button variant="outline" className="w-full">Login</Button>
                    </Link>
                    <Link href="/signup" className="block">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
