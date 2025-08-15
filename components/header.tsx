"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MobileNavigation } from "@/components/mobile-navigation"
import { MobileCartWishlistFAB } from "@/components/mobile-cart-wishlist-fab"
import { EnhancedNavigation } from "@/components/enhanced-navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { LinkIcon, ShoppingCart, User, ChevronDown, LogOut, Settings, Package, BarChart3, Heart } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/marketplace-context"

export function Header() {
  const { user, logout } = useAuth()
  const { getCartItemCount } = useCart()
  const totalItems = getCartItemCount()
  const router = useRouter()
  const pathname = usePathname()

  // For wishlist functionality - only use on shopping pages
  let favoritesCount = 0
  if (typeof window !== 'undefined') {
    try {
      // Check if we're in marketplace context
      const storedFavorites = localStorage.getItem('marketplace_favorites')
      if (storedFavorites && storedFavorites.trim() !== '') {
        const parsed = JSON.parse(storedFavorites)
        favoritesCount = Array.isArray(parsed) ? parsed.length : 0
      }
    } catch (error) {
      // Clear corrupted data and reset
      localStorage.removeItem('marketplace_favorites')
      favoritesCount = 0
    }
  }

  // Show cart only on shopping-related pages
  const isShoppingPage = pathname?.includes('/marketplace') ||
                        pathname?.includes('/shop') ||
                        pathname?.includes('/cart') ||
                        pathname?.includes('/checkout') ||
                        pathname?.includes('/products')

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const getUserDashboardLink = () => {
    if (!user) return '/'
    switch (user.role) {
      case 'retailer':
        return '/retailer-dashboard'
      default:
        return '/profile'
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-18 md:h-20 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <div className="bg-orange-500 hover:bg-orange-600 transition-colors px-3 py-1.5 rounded-full">
                <span className="text-white font-semibold text-lg">🔗 Linka</span>
              </div>
            </Link>

            {/* Enhanced Navigation */}
            <EnhancedNavigation />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {/* Default navigation matching screenshot */}
            <Link
              href="/marketplace"
              className="text-gray-600 hover:text-orange-500 font-medium transition-colors py-2"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-orange-500 font-medium transition-colors py-2"
            >
              About
            </Link>
            <Link
              href="/for-retailers"
              className="text-gray-600 hover:text-orange-500 font-medium transition-colors py-2"
            >
              For Retailers
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-orange-500 font-medium transition-colors py-2"
            >
              Contact
            </Link>
            <Link
              href="/industries"
              className="text-gray-600 hover:text-orange-500 font-medium transition-colors py-2"
            >
              Industries
            </Link>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Shopping Cart & Wishlist - Only show on shopping pages */}
            {isShoppingPage && (
              <>
                <Link href="/wishlist">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 relative text-sm px-2 lg:px-3"
                  >
                    <Heart className="h-4 w-4 mr-1 lg:mr-2" />
                    <span className="hidden lg:inline">Wishlist</span>
                    {favoritesCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center rounded-full">
                        {favoritesCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
                <Link href="/cart">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 relative text-sm px-2 lg:px-3"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1 lg:mr-2" />
                    <span className="hidden lg:inline">Cart</span>
                    {totalItems > 0 && (
                      <Badge className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center rounded-full">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Navigation */}
            <MobileNavigation />

            {/* User Authentication */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex text-slate-600 hover:text-slate-900 hover:bg-slate-100/50"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {user.name}
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => router.push(getUserDashboardLink())}>
                    {user.role === 'retailer' ? (
                      <>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Dashboard
                      </>
                    ) : (
                      <>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </>
                    )}
                  </DropdownMenuItem>
                  {user.role === 'customer' && (
                    <DropdownMenuItem onClick={() => router.push('/orders')}>
                      <Package className="mr-2 h-4 w-4" />
                      My Orders
                    </DropdownMenuItem>
                  )}
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
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex text-slate-600 hover:text-slate-900 hover:bg-slate-100/50"
                >
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}

            {/* CTA Button - Role specific */}
            {user?.role === 'retailer' ? (
              <Link href="/retailer-dashboard">
                <Button className="hidden sm:flex bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all text-sm md:text-base px-3 md:px-4 py-2">
                  <span className="hidden md:inline">My Dashboard</span>
                  <span className="md:hidden">Dashboard</span>
                </Button>
              </Link>
            ) : user?.role === 'customer' ? (
              <Link href="/customer-dashboard">
                <Button className="hidden sm:flex bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all text-sm md:text-base px-3 md:px-4 py-2">
                  <span className="hidden md:inline">My Account</span>
                  <span className="md:hidden">Account</span>
                </Button>
              </Link>
            ) : (
              <Link href="/signup?role=retailer">
                <Button className="hidden sm:flex bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 transition-all text-sm md:text-base px-3 md:px-4 py-2">
                  <span className="hidden lg:inline">Sell on Linka</span>
                  <span className="lg:hidden">Sell</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>


      </header>

      {/* Mobile Cart & Wishlist Floating Action Buttons */}
      <MobileCartWishlistFAB />
    </>
  )
}
