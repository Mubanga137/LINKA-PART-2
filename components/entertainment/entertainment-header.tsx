"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Gamepad2, 
  Film, 
  Music, 
  Calendar, 
  Crown, 
  Search, 
  Menu, 
  X,
  Home,
  TrendingUp,
  Zap
} from "lucide-react"

interface EntertainmentHeaderProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const navigationItems = [
  { id: "all", label: "All", icon: Home, color: "from-white to-gray-200" },
  { id: "gaming", label: "Gaming", icon: Gamepad2, color: "from-pink-400 to-blue-400" },
  { id: "movies", label: "Movies", icon: Film, color: "from-purple-400 to-violet-400" },
  { id: "music", label: "Music", icon: Music, color: "from-teal-400 to-yellow-400" },
  { id: "events", label: "Events", icon: Calendar, color: "from-red-400 to-orange-400" },
  { id: "subscriptions", label: "Premium", icon: Crown, color: "from-emerald-400 to-green-400" },
]

export function EntertainmentHeader({ activeSection, setActiveSection }: EntertainmentHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Main Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-slate-950/95 backdrop-blur-lg shadow-2xl border-b border-white/10" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Entertainment Hub
                </h1>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse" />
                    Live
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </Badge>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  onClick={() => setActiveSection(item.id)}
                  className={`group relative overflow-hidden transition-all duration-300 ${
                    activeSection === item.id
                      ? `bg-gradient-to-r ${item.color} text-slate-900 shadow-lg hover:shadow-xl`
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <item.icon className={`mr-2 h-4 w-4 ${
                    activeSection === item.id ? "text-slate-900" : "text-white/80"
                  } group-hover:scale-110 transition-transform`} />
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  )}
                </Button>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search entertainment..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40"
                />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white hover:bg-white/10"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-20 left-0 right-0 bg-slate-950/95 backdrop-blur-lg border-b border-white/10 p-6">
            {/* Mobile Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search entertainment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40"
              />
            </div>

            {/* Mobile Navigation */}
            <nav className="grid grid-cols-2 gap-3">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  onClick={() => {
                    setActiveSection(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`group relative overflow-hidden transition-all duration-300 h-16 ${
                    activeSection === item.id
                      ? `bg-gradient-to-r ${item.color} text-slate-900 shadow-lg`
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <item.icon className={`h-5 w-5 ${
                      activeSection === item.id ? "text-slate-900" : "text-white/80"
                    } group-hover:scale-110 transition-transform`} />
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                  {activeSection === item.id && (
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  )}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Bottom Navigation - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-slate-950/95 backdrop-blur-lg border-t border-white/10">
        <div className="grid grid-cols-6 gap-0">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => setActiveSection(item.id)}
              className={`h-16 rounded-none flex flex-col items-center space-y-1 transition-all duration-300 ${
                activeSection === item.id
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className={`h-4 w-4 ${
                activeSection === item.id ? "scale-110" : ""
              } transition-transform`} />
              <span className="text-xs">{item.label}</span>
              {activeSection === item.id && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-b-full" />
              )}
            </Button>
          ))}
        </div>
      </div>
    </>
  )
}
