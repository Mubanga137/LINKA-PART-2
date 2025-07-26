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
import { LinkIcon, ShoppingCart, User, ChevronDown, LogOut, Settings, Package, BarChart3, Menu, X, Search } from "lucide-react"
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
                Linka Marketplace
              </span>
            </Link>
          </div>

          {/* Simplified Navigation - Shopping Focused */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/marketplace"
              className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors relative group py-2 px-4 rounded-lg bg-indigo-50 border border-indigo-200"
            >
              <Search className="h-4 w-4 mr-2 inline" />
              Browse Products
              <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-100"></span>
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            {/* Shopping Cart */}
            {user && (
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 relative"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Cart</span>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
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
                        My Dashboard
                      </>
                    )}
                  </DropdownMenuItem>
                  {user.role === 'customer' && (
                    <>
                      <DropdownMenuItem onClick={() => router.push('/shop')}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Shop Products
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/orders')}>
                        <Package className="mr-2 h-4 w-4" />
                        My Orders
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/wishlist')}>
                        <User className="mr-2 h-4 w-4" />
                        Wishlist
                      </DropdownMenuItem>
                    </>
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
              <div className="flex items-center space-x-2">
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
                <Link href="/signup">
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all">
                    Sign Up
                  </Button>
                </Link>
              </div>
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

              {/* Mobile Navigation Links - Marketplace Focused */}
              <nav className="flex-1 overflow-y-auto py-6">
                <div className="space-y-1 px-6">
                  <Link
                    href="/marketplace"
                    className="flex items-center justify-between py-3 text-indigo-700 bg-indigo-50 rounded-lg px-3 font-semibold border border-indigo-200"
                    onClick={closeMobileMenu}
                  >
                    <span className="flex items-center">
                      <Search className="h-4 w-4 mr-3" />
                      Browse Products
                    </span>
                  </Link>

                  {user && (
                    <>
                      <Link
                        href="/cart"
                        className="flex items-center justify-between py-3 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg px-3 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        <span className="flex items-center">
                          <ShoppingCart className="h-4 w-4 mr-3" />
                          Shopping Cart
                        </span>
                        {totalItems > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {totalItems}
                          </span>
                        )}
                      </Link>

                      {user.role === 'customer' && (
                        <>
                          <Link
                            href="/shop"
                            className="flex items-center py-3 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg px-3 transition-colors"
                            onClick={closeMobileMenu}
                          >
                            <ShoppingCart className="h-4 w-4 mr-3" />
                            <span>Shop Products</span>
                          </Link>
                          <Link
                            href="/orders"
                            className="flex items-center py-3 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg px-3 transition-colors"
                            onClick={closeMobileMenu}
                          >
                            <Package className="h-4 w-4 mr-3" />
                            <span>My Orders</span>
                          </Link>
                          <Link
                            href="/wishlist"
                            className="flex items-center py-3 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg px-3 transition-colors"
                            onClick={closeMobileMenu}
                          >
                            <User className="h-4 w-4 mr-3" />
                            <span>Wishlist</span>
                          </Link>
                        </>
                      )}

                      <Link
                        href={getUserDashboardLink()}
                        className="flex items-center py-3 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg px-3 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        {user.role === 'retailer' ? (
                          <BarChart3 className="h-4 w-4 mr-3" />
                        ) : user.role === 'admin' ? (
                          <Settings className="h-4 w-4 mr-3" />
                        ) : (
                          <User className="h-4 w-4 mr-3" />
                        )}
                        <span>
                          {user.role === 'retailer' ? 'Dashboard' : user.role === 'admin' ? 'Admin Panel' : 'My Dashboard'}
                        </span>
                      </Link>
                    </>
                  )}
                </div>
              </nav>

              {/* Mobile Menu Footer */}
              <div className="border-t border-slate-200 p-6 space-y-4">
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

                    <Button
                      onClick={() => {
                        handleLogout()
                        closeMobileMenu()
                      }}
                      variant="outline"
                      className="w-full justify-center"
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
                        className="w-full justify-center"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={closeMobileMenu}>
                      <Button className="w-full justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
