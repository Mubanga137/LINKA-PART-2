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
import { LinkIcon, ShoppingCart, User, ChevronDown, LogOut, Settings, Package, BarChart3, Menu, X, Search, Sparkles } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"

export function MarketplaceMainHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
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

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-blue-600/95 via-blue-700/95 to-purple-700/95 border-b border-white/20 shadow-lg shadow-blue-900/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-orange-500/30">
                  <LinkIcon className="h-6 w-6 text-white" />
                  <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300 animate-pulse" />
                </div>
                <div className="absolute inset-0 bg-orange-500/30 rounded-xl blur-xl group-hover:bg-orange-500/50 transition-all duration-300"></div>
              </div>
              <span className="text-2xl font-bold text-white">
                Linka
                <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent ml-1">
                  Marketplace
                </span>
              </span>
            </Link>
          </div>

          {/* Simplified Navigation - Shopping Focused */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/marketplace"
              className="text-white hover:text-orange-300 font-semibold transition-all duration-300 relative group py-2 px-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:scale-105"
            >
              <Search className="h-4 w-4 mr-2 inline" />
              Browse Products
              <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-orange-400 to-yellow-400 scale-x-100 group-hover:scale-x-110 transition-transform duration-300"></span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Shopping Cart */}
            {user && (
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-orange-300 hover:bg-white/10 relative group transition-all duration-300 hover:scale-105"
                >
                  <ShoppingCart className="h-5 w-5 md:mr-2" />
                  <span className="hidden md:inline">Cart</span>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce shadow-lg">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:text-orange-300 hover:bg-white/10 p-2 transition-all duration-300"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {/* User Authentication */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex text-white hover:text-orange-300 hover:bg-white/10 gap-2 transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="hidden lg:inline">{user.name.split(' ')[0]}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-sm border-white/20 shadow-xl">
                  <DropdownMenuItem onClick={() => router.push(getUserDashboardLink())}>
                    {user.role === 'retailer' ? (
                      <>
                        <BarChart3 className="mr-2 h-4 w-4 text-blue-600" />
                        Dashboard
                      </>
                    ) : user.role === 'admin' ? (
                      <>
                        <Settings className="mr-2 h-4 w-4 text-blue-600" />
                        Admin Panel
                      </>
                    ) : (
                      <>
                        <User className="mr-2 h-4 w-4 text-blue-600" />
                        My Dashboard
                      </>
                    )}
                  </DropdownMenuItem>
                  {user.role === 'customer' && (
                    <>
                      <DropdownMenuItem onClick={() => router.push('/shop')}>
                        <ShoppingCart className="mr-2 h-4 w-4 text-orange-600" />
                        Shop Products
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/orders')}>
                        <Package className="mr-2 h-4 w-4 text-blue-600" />
                        My Orders
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/wishlist')}>
                        <User className="mr-2 h-4 w-4 text-orange-600" />
                        Wishlist
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem onClick={() => router.push('/settings')}>
                    <Settings className="mr-2 h-4 w-4 text-gray-600" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4 text-red-600" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex text-white hover:text-orange-300 hover:bg-white/10 transition-all duration-300"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105 font-semibold">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-yellow-400/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-0 left-1/4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={closeMobileMenu}
          />

          {/* Mobile Menu Panel */}
          <div className="fixed top-0 right-0 z-50 h-full w-80 max-w-sm bg-gradient-to-br from-blue-600 to-purple-700 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <LinkIcon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">
                    Linka
                    <span className="text-orange-400 ml-1">Market</span>
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-orange-300 p-2"
                  onClick={closeMobileMenu}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-6">
                <div className="space-y-2 px-6">
                  <Link
                    href="/marketplace"
                    className="flex items-center justify-between py-4 text-white bg-white/10 rounded-xl px-4 font-semibold border border-white/20 transition-all duration-300 hover:bg-white/20"
                    onClick={closeMobileMenu}
                  >
                    <span className="flex items-center">
                      <Search className="h-5 w-5 mr-3 text-orange-400" />
                      Browse Products
                    </span>
                  </Link>

                  {user && (
                    <>
                      <Link
                        href="/cart"
                        className="flex items-center justify-between py-4 text-white hover:text-orange-300 hover:bg-white/10 rounded-xl px-4 transition-all duration-300"
                        onClick={closeMobileMenu}
                      >
                        <span className="flex items-center">
                          <ShoppingCart className="h-5 w-5 mr-3" />
                          Shopping Cart
                        </span>
                        {totalItems > 0 && (
                          <span className="bg-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                            {totalItems}
                          </span>
                        )}
                      </Link>

                      {user.role === 'customer' && (
                        <>
                          <Link
                            href="/shop"
                            className="flex items-center py-4 text-white hover:text-orange-300 hover:bg-white/10 rounded-xl px-4 transition-all duration-300"
                            onClick={closeMobileMenu}
                          >
                            <ShoppingCart className="h-5 w-5 mr-3" />
                            <span>Shop Products</span>
                          </Link>
                          <Link
                            href="/orders"
                            className="flex items-center py-4 text-white hover:text-orange-300 hover:bg-white/10 rounded-xl px-4 transition-all duration-300"
                            onClick={closeMobileMenu}
                          >
                            <Package className="h-5 w-5 mr-3" />
                            <span>My Orders</span>
                          </Link>
                          <Link
                            href="/wishlist"
                            className="flex items-center py-4 text-white hover:text-orange-300 hover:bg-white/10 rounded-xl px-4 transition-all duration-300"
                            onClick={closeMobileMenu}
                          >
                            <User className="h-5 w-5 mr-3" />
                            <span>Wishlist</span>
                          </Link>
                        </>
                      )}
                    </>
                  )}
                </div>
              </nav>

              {/* Mobile Menu Footer */}
              <div className="border-t border-white/20 p-6 space-y-4">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-white/10 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-xs text-blue-200 capitalize">{user.role}</p>
                      </div>
                    </div>

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
                ) : (
                  <div className="space-y-3">
                    <Link href="/login" onClick={closeMobileMenu}>
                      <Button
                        variant="outline"
                        className="w-full justify-center bg-white/10 text-white border-white/20 hover:bg-white/20"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={closeMobileMenu}>
                      <Button className="w-full justify-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 right-0 w-40 h-40 bg-gradient-to-br from-orange-400/10 to-yellow-400/10 rounded-full blur-2xl animate-float"></div>
              <div className="absolute bottom-1/3 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-2xl animate-pulse-slow"></div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
