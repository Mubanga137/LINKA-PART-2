"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Menu,
  X,
  Home,
  ShoppingBag,
  Briefcase,
  User,
  Search,
  Heart,
  Settings,
  LogOut,
  Phone,
  Info,
  Store,
  ChevronRight,
  ShoppingCart,
  Bell,
  Package,
  ArrowLeft,
  Flame
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/marketplace-context"
import { useFavorites } from "@/contexts/marketplace-context"

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const { getCartItemCount } = useCart()
  const totalItems = getCartItemCount()
  const { favorites } = useFavorites()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    logout()
    router.push('/')
    setIsOpen(false)
  }

  const closeSheet = () => setIsOpen(false)

  // Show cart/wishlist on shopping-related pages
  const isShoppingPage = pathname?.includes('/marketplace') ||
                        pathname?.includes('/shop') ||
                        pathname?.includes('/cart') ||
                        pathname?.includes('/checkout') ||
                        pathname?.includes('/products') ||
                        pathname?.includes('/categories')

  const isHomePage = pathname === '/'

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
    closeSheet();
  }

  // Check if we're in marketplace context for Hot Deals visibility
  const isMarketplaceContext = pathname?.includes('/marketplace') ||
                              pathname?.includes('/hot-deals') ||
                              pathname?.includes('/products') ||
                              pathname?.includes('/categories');

  // Primary navigation items
  const primaryItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
      active: pathname === "/"
    },
    {
      name: "Marketplace",
      href: "/marketplace",
      icon: ShoppingBag,
      active: pathname?.includes("/marketplace")
    },
    // Only show Hot Deals in marketplace context
    ...(isMarketplaceContext ? [{
      name: "Hot Deals",
      href: "/hot-deals",
      icon: Flame,
      active: pathname?.includes("/hot-deals"),
      isSpecial: true
    }] : []),
    {
      name: "Services",
      href: "/industries",
      icon: Briefcase,
      active: pathname?.includes("/industries") || pathname?.includes("/services")
    }
  ]

  // Secondary navigation items (customer-focused only)
  const secondaryItems = [
    { name: "Contact", href: "/contact", icon: Phone }
  ]

  // User-specific items
  const getUserItems = () => {
    if (!user) return []
    
    const baseItems = [
      { name: "Profile", href: "/profile", icon: User },
      { name: "Orders", href: "/orders", icon: Package },
      { name: "Wishlist", href: "/wishlist", icon: Heart },
      { name: "Settings", href: "/settings", icon: Settings }
    ]

    if (user.role === 'retailer') {
      return [
        { name: "Dashboard", href: "/retailer-dashboard", icon: Settings },
        ...baseItems.slice(1) // Remove Profile, keep others
      ]
    }

    return baseItems
  }

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="relative p-2 text-current hover:bg-current/10 transition-colors"
          >
            <Menu className="h-6 w-6" />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-orange-500 hover:bg-orange-500">
                {totalItems}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        
        <SheetContent
          side="right"
          className="w-full max-w-xs sm:max-w-sm p-0 bg-gradient-to-br from-slate-50 to-white border-l border-slate-200/50"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <SheetHeader className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">L</span>
                  </div>
                  <div>
                    <SheetTitle className="text-lg font-bold text-slate-900">Linka</SheetTitle>
                    <SheetDescription className="text-sm text-slate-500">
                      Your local marketplace
                    </SheetDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeSheet}
                  className="h-8 w-8 p-0 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </SheetHeader>

            {/* User Info */}
            {user && (
              <div className="p-4 sm:p-6 pb-3 sm:pb-4">
                <div className="flex items-center space-x-3 p-3 sm:p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl sm:rounded-2xl border border-indigo-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{user.name}</p>
                    <p className="text-sm text-indigo-600 capitalize">{user.role}</p>
                  </div>
                  {user.role === 'customer' && totalItems > 0 && (
                    <Badge className="bg-orange-500 text-white">
                      {totalItems}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Cart & Wishlist Quick Access - Show on shopping pages */}
            {isShoppingPage && (
              <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/cart"
                    onClick={closeSheet}
                    className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 hover:shadow-xl tap-target-sm"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="font-semibold text-sm">Cart</span>
                    {totalItems > 0 && (
                      <Badge className="bg-white text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full ml-1">
                        {totalItems}
                      </Badge>
                    )}
                  </Link>

                  <Link
                    href="/wishlist"
                    onClick={closeSheet}
                    className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl shadow-lg shadow-pink-500/20 transition-all duration-200 hover:shadow-xl tap-target-sm"
                  >
                    <Heart className="h-5 w-5" />
                    <span className="font-semibold text-sm">Wishlist</span>
                    {favorites.length > 0 && (
                      <Badge className="bg-white text-pink-600 text-xs font-bold px-2 py-0.5 rounded-full ml-1">
                        {favorites.length}
                      </Badge>
                    )}
                  </Link>
                </div>
              </div>
            )}

            {/* Navigation Controls */}
            <div className="px-4 sm:px-6 pb-3 sm:pb-4">
              <div className={`grid gap-2 ${isMarketplaceContext ? 'grid-cols-3' : !isHomePage ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {/* Back Button */}
                {!isHomePage && (
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="flex items-center justify-center space-x-1 p-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg transition-all duration-200 tap-target-sm"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-xs font-medium">Back</span>
                  </Button>
                )}

                {/* Home Button */}
                {!isHomePage && (
                  <Button
                    onClick={() => {
                      router.push('/');
                      closeSheet();
                    }}
                    variant="outline"
                    className="flex items-center justify-center space-x-1 p-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg transition-all duration-200 tap-target-sm"
                  >
                    <Home className="h-4 w-4" />
                    <span className="text-xs font-medium">Home</span>
                  </Button>
                )}

                {/* Hot Deals Button - Only show in marketplace context */}
                {isMarketplaceContext && (
                  <Button
                    onClick={() => {
                      router.push('/hot-deals');
                      closeSheet();
                    }}
                    className="flex items-center justify-center space-x-1 p-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-lg transition-all duration-200 tap-target-sm"
                  >
                    <Flame className="h-4 w-4" />
                    <span className="text-xs font-bold">Hot Deals</span>
                  </Button>
                )}
              </div>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 px-4 sm:px-6 space-y-1 sm:space-y-2">
              {/* Primary Items */}
              <div className="space-y-1">
                {primaryItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeSheet}
                    className={`
                      flex items-center space-x-4 p-4 rounded-2xl transition-all duration-200 group
                      ${item.active
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                        : (item as any).isSpecial
                        ? 'bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 text-red-700 hover:from-red-100 hover:to-orange-100'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-indigo-600'
                      }
                    `}
                  >
                    <div className={`
                      w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200
                      ${item.active
                        ? 'bg-white/20'
                        : (item as any).isSpecial
                        ? 'bg-red-100'
                        : 'bg-slate-100 group-hover:bg-indigo-100'
                      }
                    `}>
                      <item.icon className={`h-5 w-5 ${
                        item.active
                          ? 'text-white'
                          : (item as any).isSpecial
                          ? 'text-red-600'
                          : 'text-slate-600 group-hover:text-indigo-600'
                      }`} />
                    </div>
                    <span className="font-medium">{item.name}</span>
                    <ChevronRight className={`h-4 w-4 ml-auto ${item.active ? 'text-white/70' : 'text-slate-400'}`} />
                  </Link>
                ))}
              </div>

              {/* Cart (for customers) */}
              {user?.role === 'customer' && (
                <Link
                  href="/cart"
                  onClick={closeSheet}
                  className="flex items-center space-x-4 p-4 rounded-2xl text-slate-700 hover:bg-slate-100 hover:text-indigo-600 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-slate-100 group-hover:bg-indigo-100 rounded-xl flex items-center justify-center transition-all duration-200">
                    <ShoppingCart className="h-5 w-5 text-slate-600 group-hover:text-indigo-600" />
                  </div>
                  <span className="font-medium">Cart</span>
                  {totalItems > 0 && (
                    <Badge className="bg-orange-500 text-white ml-auto">
                      {totalItems}
                    </Badge>
                  )}
                </Link>
              )}

              {/* Divider */}
              <div className="py-4">
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
              </div>

              {/* Secondary Items */}
              <div className="space-y-1">
                {secondaryItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeSheet}
                    className="flex items-center space-x-4 p-3 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200 group"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                    <ChevronRight className="h-3 w-3 ml-auto text-slate-400" />
                  </Link>
                ))}
              </div>

              {/* User-specific items */}
              {user && (
                <>
                  <div className="py-2">
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                  </div>
                  <div className="space-y-1">
                    {getUserItems().map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeSheet}
                        className="flex items-center space-x-4 p-3 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200 group"
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                        <ChevronRight className="h-3 w-3 ml-auto text-slate-400" />
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </nav>

            {/* Footer */}
            <div className="p-4 sm:p-6 pt-3 sm:pt-4 border-t border-slate-100 space-y-2 sm:space-y-3">
              {user ? (
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-red-600 hover:border-red-200 transition-all duration-200 rounded-xl h-11"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <div className="space-y-3">
                  <Link href="/login" onClick={closeSheet}>
                    <Button
                      variant="outline"
                      className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-200 transition-all duration-200 rounded-xl h-11"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={closeSheet}>
                    <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 font-semibold rounded-xl h-11">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
