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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <LinkIcon className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">
                Linka Marketplace
              </span>
            </Link>
          </div>

          {/* Clean Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/marketplace"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 px-3 py-2 rounded-lg bg-blue-50"
            >
              <Search className="h-4 w-4 mr-2 inline" />
              Browse Products
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Shopping Cart */}
            {user && (
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative"
                >
                  <ShoppingCart className="h-5 w-5 md:mr-2" />
                  <span className="hidden md:inline">Cart</span>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
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
              className="md:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* User Authentication */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex text-gray-600 hover:text-gray-900 hover:bg-gray-100 gap-2"
                  >
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-3 w-3 text-white" />
                    </div>
                    <span className="hidden lg:inline">{user.name.split(' ')[0]}</span>
                    <ChevronDown className="h-3 w-3" />
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
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
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
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
            onClick={closeMobileMenu}
          />

          {/* Mobile Menu Panel */}
          <div className="fixed top-0 right-0 z-50 h-full w-80 max-w-sm bg-white shadow-xl md:hidden">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <LinkIcon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    Linka
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 p-2"
                  onClick={closeMobileMenu}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-6">
                <div className="space-y-1 px-6">
                  <Link
                    href="/marketplace"
                    className="flex items-center justify-between py-3 text-blue-600 bg-blue-50 rounded-lg px-3 font-medium"
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
                        className="flex items-center justify-between py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg px-3"
                        onClick={closeMobileMenu}
                      >
                        <span className="flex items-center">
                          <ShoppingCart className="h-4 w-4 mr-3" />
                          Shopping Cart
                        </span>
                        {totalItems > 0 && (
                          <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                            {totalItems}
                          </span>
                        )}
                      </Link>

                      {user.role === 'customer' && (
                        <>
                          <Link
                            href="/shop"
                            className="flex items-center py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg px-3"
                            onClick={closeMobileMenu}
                          >
                            <ShoppingCart className="h-4 w-4 mr-3" />
                            <span>Shop Products</span>
                          </Link>
                          <Link
                            href="/orders"
                            className="flex items-center py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg px-3"
                            onClick={closeMobileMenu}
                          >
                            <Package className="h-4 w-4 mr-3" />
                            <span>My Orders</span>
                          </Link>
                          <Link
                            href="/wishlist"
                            className="flex items-center py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg px-3"
                            onClick={closeMobileMenu}
                          >
                            <User className="h-4 w-4 mr-3" />
                            <span>Wishlist</span>
                          </Link>
                        </>
                      )}
                    </>
                  )}
                </div>
              </nav>

              {/* Mobile Menu Footer */}
              <div className="border-t border-gray-200 p-6 space-y-4">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{user.role}</p>
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
                      <Button className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white">
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
