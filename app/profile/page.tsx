"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useAuth } from '@/contexts/auth-context'
import { AuthRedirectWrapper } from '@/components/auth-redirect-wrapper'
import { ThemeSelector } from '@/components/ui/theme-selector'
import { LayoutCustomizer } from '@/components/ui/layout-customizer'
import { LifestyleProfileManager } from '@/components/ui/lifestyle-profile-manager'
import { GamifiedLoyalty } from '@/components/ui/gamified-loyalty'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  User, 
  Settings, 
  Palette, 
  Layout, 
  Heart, 
  Trophy,
  Edit3,
  Mail,
  MapPin,
  Calendar,
  Save,
  Bell,
  Shield,
  Download
} from 'lucide-react'

function ProfileContent() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-white/30">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
                      {getInitials(user?.name || 'User')}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="sm" 
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white text-purple-600 hover:bg-gray-50"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{user?.name || 'Customer'}</h1>
                      <div className="space-y-1 text-white/80">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{user?.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{user?.location || 'Lusaka, Zambia'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Member since {new Date(user?.joinedAt || Date.now()).getFullYear()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Badge className="bg-yellow-500 text-white px-3 py-1">
                        <Trophy className="h-4 w-4 mr-1" />
                        Gold Member
                      </Badge>
                      <Button className="bg-white/20 hover:bg-white/30 border border-white/30">
                        <Save className="h-4 w-4 mr-2" />
                        Save Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <nav className="space-y-2">
                  {[
                    { id: 'overview', label: 'Overview', icon: User },
                    { id: 'customization', label: 'Theme & Layout', icon: Palette },
                    { id: 'lifestyle', label: 'Interests & Lifestyle', icon: Heart },
                    { id: 'loyalty', label: 'Loyalty & Rewards', icon: Trophy },
                    { id: 'settings', label: 'Settings', icon: Settings },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeTab === item.id
                          ? 'bg-purple-100 text-purple-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="space-y-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <User className="h-5 w-5" />
                        Account Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">24</div>
                          <div className="text-sm text-gray-600">Total Orders</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">2,450</div>
                          <div className="text-sm text-gray-600">Loyalty Points</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">12</div>
                          <div className="text-sm text-gray-600">Wishlist Items</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'customization' && (
                <div className="space-y-6">
                  <ThemeSelector />
                  <LayoutCustomizer />
                </div>
              )}

              {activeTab === 'lifestyle' && (
                <LifestyleProfileManager />
              )}

              {activeTab === 'loyalty' && (
                <GamifiedLoyalty />
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Settings className="h-5 w-5" />
                        Account Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Bell className="h-5 w-5 text-gray-500" />
                            <div>
                              <div className="font-medium">Email Notifications</div>
                              <div className="text-sm text-gray-600">Receive updates about orders and promotions</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Configure</Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Shield className="h-5 w-5 text-gray-500" />
                            <div>
                              <div className="font-medium">Privacy Settings</div>
                              <div className="text-sm text-gray-600">Manage your data and privacy preferences</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Manage</Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Download className="h-5 w-5 text-gray-500" />
                            <div>
                              <div className="font-medium">Export Data</div>
                              <div className="text-sm text-gray-600">Download your account data and history</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Export</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function ProfilePage() {
  return (
    <AuthRedirectWrapper requiredRole="customer">
      <ProfileContent />
    </AuthRedirectWrapper>
  )
}
