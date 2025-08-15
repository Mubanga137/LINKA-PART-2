"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MobileNavigation } from "@/components/mobile-navigation"
import { User } from "lucide-react"

export function Header() {

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-18 md:h-20 items-center justify-between">
          {/* Logo - Left side */}
          <Link href="/" className="flex items-center group">
            <div className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 px-4 py-2 rounded-full shadow-md hover:shadow-lg group-hover:scale-105">
              <span className="text-white font-bold text-base flex items-center gap-2">
                <span className="text-lg">🔗</span>
                <span className="bg-gradient-to-r from-orange-400 to-teal-500 bg-clip-text text-transparent font-bold">
                  Linka
                </span>
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
    </>
  )
}
