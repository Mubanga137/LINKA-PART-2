"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { LinkIcon, ShoppingCart, User, ChevronDown, LogOut, Settings, Package, BarChart3, Menu, X, ChevronRight, Briefcase } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const router = useRouter()
  const pathname = usePathname()

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
      default:
        return '/profile'
    }
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/50 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <LinkIcon className="h-9 w-9 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
                <div className="absolute inset-0 bg-indigo-600/20 rounded-full blur-xl group-hover:bg-indigo-700/30 transition-all"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Linka
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/about"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative group py-2"
            >
              About
              <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
            <Link
              href="/for-retailers"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative group py-2"
            >
              For Retailers
              <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
            <Link
              href="/contact"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative group py-2"
            >
              Contact
              <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
            <Link
              href="/industries"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative group py-2"
            >
              Services
              <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            {/* Shopping Cart - Only show on shopping pages */}
            {isShoppingPage && (
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 relative"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                  {totalItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center rounded-full">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 p-2"
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
                    ) : user.role === 'admin' ? (
                      <>
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Panel
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

            {/* CTA Button */}
            {user?.role === 'retailer' ? (
              <Link href="/retailer-dashboard">
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all">
                  My Dashboard
                </Button>
              </Link>
            ) : (
              <Link href={user ? "/become-retailer" : "/signup?role=retailer"}>
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all">
                  Sell on Linka
                </Button>
              </Link>
            )}
          </div>
        </div>
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
          <div className="fixed top-0 right-0 z-50 h-full w-80 max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <div className="flex items-center space-x-3">
                  <LinkIcon className="h-8 w-8 text-indigo-600" />
                  <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Linka
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-600 hover:text-slate-900 p-2"
                  onClick={closeMobileMenu}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-6">
                <div className="space-y-1 px-6">
                  {/* Navigation Items */}
                  <Link
                    href="/about"
                    className="flex items-center justify-between py-3 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg px-3 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <span className="font-medium">About</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/for-retailers"
                    className="flex items-center justify-between py-3 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg px-3 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <span className="font-medium">For Retailers</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/contact"
                    className="flex items-center justify-between py-3 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg px-3 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <span className="font-medium">Contact</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/industries"
                    className="flex items-center justify-between py-3 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg px-3 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <span className="font-medium">Services</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>

                  {/* Quick Access Section - Only show on shopping pages */}
                  {isShoppingPage && (
                    <div className="border-t border-slate-200 pt-4 mt-4">
                      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider px-3 mb-3">
                        Quick Access
                      </h3>

                      <Link
                        href="/marketplace?category=services"
                        className="flex items-center justify-between py-3 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg px-3 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        <span className="flex items-center">
                          <Briefcase className="h-5 w-5 mr-3" />
                          <span className="font-medium">Browse Services</span>
                        </span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>

                      <Link
                        href="/cart"
                        className="flex items-center justify-between py-3 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg px-3 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        <span className="flex items-center">
                          <ShoppingCart className="h-5 w-5 mr-3" />
                          <span className="font-medium">Shopping Cart</span>
                        </span>
                        <div className="flex items-center space-x-2">
                          {totalItems > 0 && (
                            <Badge className="bg-orange-500 text-white text-xs px-2 py-0.5">
                              {totalItems}
                            </Badge>
                          )}
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </nav>

              {/* Mobile Menu Footer */}
              <div className="border-t border-slate-200 p-6 space-y-4">
                {/* User Authentication for Mobile */}
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Link
                        href={getUserDashboardLink()}
                        className="flex items-center space-x-3 py-2 text-slate-700 hover:text-indigo-600 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        {user.role === 'retailer' ? (
                          <BarChart3 className="h-4 w-4" />
                        ) : user.role === 'admin' ? (
                          <Settings className="h-4 w-4" />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                        <span>
                          {user.role === 'retailer' ? 'Dashboard' : user.role === 'admin' ? 'Admin Panel' : 'Profile'}
                        </span>
                      </Link>

                      {user.role === 'customer' && (
                        <Link
                          href="/orders"
                          className="flex items-center space-x-3 py-2 text-slate-700 hover:text-indigo-600 transition-colors"
                          onClick={closeMobileMenu}
                        >
                          <Package className="h-4 w-4" />
                          <span>My Orders</span>
                        </Link>
                      )}

                      <Link
                        href="/settings"
                        className="flex items-center space-x-3 py-2 text-slate-700 hover:text-indigo-600 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>

                      <button
                        onClick={() => {
                          handleLogout()
                          closeMobileMenu()
                        }}
                        className="flex items-center space-x-3 py-2 text-red-600 hover:text-red-700 transition-colors w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link href="/login" onClick={closeMobileMenu}>
                      <Button
                        variant="outline"
                        className="w-full justify-center"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={closeMobileMenu}>
                      <Button className="w-full justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}

                {/* CTA Button for Mobile */}
                <div className="pt-3 border-t border-slate-200">
                  {user?.role === 'retailer' ? (
                    <Link href="/retailer-dashboard" onClick={closeMobileMenu}>
                      <Button className="w-full justify-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                        My Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <Link href={user ? "/become-retailer" : "/signup?role=retailer"} onClick={closeMobileMenu}>
                      <Button className="w-full justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                        Sell on Linka
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
