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
import { User } from "lucide-react"

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
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-18 md:h-20 items-center justify-between">
          {/* Logo - Left side */}
          <Link href="/" className="flex items-center group">
            <div className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 px-4 py-2 rounded-full shadow-md hover:shadow-lg group-hover:scale-105">
              <span className="text-white font-semibold text-base flex items-center gap-1">
                <span className="text-lg">🔗</span>
                Linka
              </span>
            </div>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/marketplace"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              About
            </Link>
            <Link
              href="/for-retailers"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              For Retailers
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/industries"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Industries
            </Link>
          </nav>

          {/* Right side - Login and Sell on Linka button */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className="flex items-center text-gray-600 hover:text-gray-900">
              <User className="h-4 w-4 mr-1" />
              <span className="font-medium">Login</span>
            </Link>

            <Link href="/signup?role=retailer">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium transition-colors">
                Sell on Linka
              </Button>
            </Link>

            {/* Mobile Navigation */}
            <MobileNavigation />
          </div>
        </div>
      </div>


      </header>

      {/* Mobile Cart & Wishlist Floating Action Buttons */}
      <MobileCartWishlistFAB />
    </>
  )
}
