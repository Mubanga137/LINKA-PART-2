"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MobileNavigation } from "@/components/mobile-navigation"
import { LinkaLogo } from "@/components/linka-logo"
import { User } from "lucide-react"

export function Header() {

  return (
    <>
      <header
        className="sticky top-0 z-50 backdrop-blur-xl border-b shadow-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)',
          borderBottomColor: 'rgba(0, 153, 204, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 153, 204, 0.08), 0 1px 0 rgba(255, 255, 255, 0.8) inset'
        }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-18 md:h-20 items-center justify-between">
          {/* Logo - Left side with increased size */}
          <LinkaLogo size="lg" />

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/about"
              className="font-medium transition-colors duration-200"
              style={{ color: '#333333' }}
            >
              About
            </Link>
            <Link
              href="/for-retailers"
              className="font-medium transition-colors duration-200"
              style={{ color: '#333333' }}
            >
              For Retailers
            </Link>
            <Link
              href="/loyalty"
              className="font-medium transition-all duration-200 flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="text-yellow-300">👑</span>
              Loyalty Rewards
            </Link>
            <Link
              href="/contact"
              className="font-medium transition-colors duration-200"
              style={{ color: '#333333' }}
            >
              Contact
            </Link>
          </nav>

          {/* Right side - Login and Sell on Linka button */}
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="flex items-center font-medium transition-colors duration-200"
              style={{ color: '#333333' }}
            >
              <User className="h-4 w-4 mr-1" />
              <span>Login</span>
            </Link>

            <Link href="/signup?role=retailer">
              <Button
                className="px-6 py-3 rounded-lg font-bold text-white border-none transition-all duration-200 hover:shadow-lg"
                style={{
                  background: 'linear-gradient(90deg, #0099cc 0%, #ff6600 100%)',
                  boxShadow: '0 4px 15px rgba(0, 153, 204, 0.3)'
                }}
              >
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
