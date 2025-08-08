"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  ShoppingCart, 
  User, 
  ChevronDown, 
  LogOut, 
  Settings, 
  Package, 
  Heart,
  Menu, 
  X, 
  ChevronRight,
  Search,
  Bell,
  Home,
  Star
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/marketplace-context"

export function CustomerHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { getCartItemCount } = useCart()
  const totalItems = getCartItemCount()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  if (!user) {
    return null
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90 border-b border-white/20 shadow-lg">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/customer-dashboard" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-white/30">
                  <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg animate-pulse"></div>
                </div>
                <div className="absolute inset-0 bg-white/20 rounded-xl blur-xl group-hover:bg-white/30 transition-all duration-300"></div>
              </div>
              <span className="text-xl font-bold text-white">
                My Linka
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/customer-dashboard"
                className="text-white/80 hover:text-white font-medium transition-all duration-300 relative group py-2 px-3 rounded-lg hover:bg-white/10"
              >
                <Home className="h-4 w-4 mr-2 inline" />
                Dashboard
                <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-yellow-400 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>

              <Link
                href="/marketplace"
                className="text-white/80 hover:text-white font-medium transition-all duration-300 relative group py-2 px-3 rounded-lg hover:bg-white/10"
              >
                <Search className="h-4 w-4 mr-2 inline" />
                Shop
                <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-yellow-400 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>

              <Link
                href="/orders"
                className="text-white/80 hover:text-white font-medium transition-all duration-300 relative group py-2 px-3 rounded-lg hover:bg-white/10"
              >
                <Package className="h-4 w-4 mr-2 inline" />
                My Orders
                <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-yellow-400 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>

              <Link
                href="/wishlist"
                className="text-white/80 hover:text-white font-medium transition-all duration-300 relative group py-2 px-3 rounded-lg hover:bg-white/10"
              >
                <Heart className="h-4 w-4 mr-2 inline" />
                Wishlist
                <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-yellow-400 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex text-white/80 hover:text-white hover:bg-white/10 relative group"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
              </Button>

              {/* Cart */}
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white hover:bg-white/10 relative group"
                >
                  <ShoppingCart className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Cart</span>
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-yellow-500 text-black text-xs font-bold animate-bounce">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white/80 hover:text-white hover:bg-white/10 p-2"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex text-white/80 hover:text-white hover:bg-white/10 gap-2"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-xs font-bold">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline">{user.name.split(' ')[0]}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-sm border-white/20">
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/orders')}>
                    <Package className="mr-2 h-4 w-4" />
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/wishlist')}>
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
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
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-0 left-1/4 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse-slow"></div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={closeMobileMenu}
          />
          
          {/* Mobile Menu Panel */}
          <div className="fixed top-0 right-0 z-50 h-full w-80 max-w-sm bg-gradient-to-br from-indigo-600 to-purple-700 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/20">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-white">{user.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-white/80">Premium Member</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white p-2"
                  onClick={closeMobileMenu}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-6">
                <div className="space-y-2 px-6">
                  <Link
                    href="/customer-dashboard"
                    className="flex items-center gap-3 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg px-3 transition-all duration-300"
                    onClick={closeMobileMenu}
                  >
                    <Home className="h-5 w-5" />
                    <span className="font-medium">Dashboard</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Link>

                  <Link
                    href="/marketplace"
                    className="flex items-center gap-3 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg px-3 transition-all duration-300"
                    onClick={closeMobileMenu}
                  >
                    <Search className="h-5 w-5" />
                    <span className="font-medium">Shop</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Link>

                  <Link
                    href="/orders"
                    className="flex items-center gap-3 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg px-3 transition-all duration-300"
                    onClick={closeMobileMenu}
                  >
                    <Package className="h-5 w-5" />
                    <span className="font-medium">My Orders</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Link>

                  <Link
                    href="/wishlist"
                    className="flex items-center gap-3 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg px-3 transition-all duration-300"
                    onClick={closeMobileMenu}
                  >
                    <Heart className="h-5 w-5" />
                    <span className="font-medium">Wishlist</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Link>

                  <Link
                    href="/profile"
                    className="flex items-center gap-3 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg px-3 transition-all duration-300"
                    onClick={closeMobileMenu}
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">My Profile</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Link>

                  <Link
                    href="/settings"
                    className="flex items-center gap-3 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg px-3 transition-all duration-300"
                    onClick={closeMobileMenu}
                  >
                    <Settings className="h-5 w-5" />
                    <span className="font-medium">Settings</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Link>
                </div>
              </nav>

              {/* Mobile Menu Footer */}
              <div className="border-t border-white/20 p-6">
                <Button
                  onClick={() => {
                    handleLogout()
                    closeMobileMenu()
                  }}
                  variant="outline"
                  className="w-full justify-center bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>

            {/* Mobile Menu Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 right-0 w-40 h-40 bg-gradient-to-br from-pink-400/10 to-purple-500/10 rounded-full blur-2xl animate-float"></div>
              <div className="absolute bottom-1/3 left-0 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full blur-2xl animate-pulse-slow"></div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
