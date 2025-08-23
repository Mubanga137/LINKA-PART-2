"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Bell, 
  X, 
  Coins, 
  Crown, 
  Gift, 
  Star, 
  Trophy, 
  Zap, 
  Flame, 
  Users, 
  ShoppingBag,
  Target,
  Calendar,
  ChevronDown,
  Check,
  Archive,
  Settings
} from "lucide-react"

export interface Notification {
  id: string
  type: 'points' | 'tier' | 'reward' | 'achievement' | 'challenge' | 'streak' | 'referral' | 'system'
  title: string
  message: string
  points?: number
  timestamp: Date
  read: boolean
  priority: 'low' | 'medium' | 'high'
  actionUrl?: string
  actionText?: string
  icon?: any
  color?: string
  duration?: number
}

interface NotificationsSystemProps {
  notifications: Notification[]
  onNotificationRead: (id: string) => void
  onNotificationDismiss: (id: string) => void
  onNotificationAction: (notification: Notification) => void
  maxVisible?: number
}

const NOTIFICATION_ICONS = {
  points: Coins,
  tier: Crown,
  reward: Gift,
  achievement: Trophy,
  challenge: Target,
  streak: Flame,
  referral: Users,
  system: Bell
}

const NOTIFICATION_COLORS = {
  points: 'from-green-500 to-green-600',
  tier: 'from-yellow-500 to-yellow-600',
  reward: 'from-purple-500 to-purple-600',
  achievement: 'from-orange-500 to-orange-600',
  challenge: 'from-blue-500 to-blue-600',
  streak: 'from-red-500 to-red-600',
  referral: 'from-teal-500 to-teal-600',
  system: 'from-gray-500 to-gray-600'
}

const PRIORITY_STYLES = {
  low: 'border-gray-200 bg-white',
  medium: 'border-blue-200 bg-blue-50',
  high: 'border-orange-200 bg-orange-50 shadow-lg'
}

export function NotificationsSystem({
  notifications,
  onNotificationRead,
  onNotificationDismiss,
  onNotificationAction,
  maxVisible = 5
}: NotificationsSystemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [toastNotifications, setToastNotifications] = useState<Notification[]>([])
  const [bellNotifications, setBellNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // Separate notifications into toast (high priority, recent) and bell dropdown
    const now = new Date()
    const recentHighPriority = notifications.filter(n => 
      !n.read && 
      n.priority === 'high' && 
      (now.getTime() - n.timestamp.getTime()) < 10000 // 10 seconds
    )
    
    setToastNotifications(recentHighPriority.slice(0, 3))
    setBellNotifications(notifications.slice(0, maxVisible))
  }, [notifications, maxVisible])

  const unreadCount = notifications.filter(n => !n.read).length

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      onNotificationRead(notification.id)
    }
    if (notification.actionUrl) {
      onNotificationAction(notification)
    }
  }

  const dismissToastNotification = (id: string) => {
    setToastNotifications(prev => prev.filter(n => n.id !== id))
    onNotificationDismiss(id)
  }

  return (
    <>
      {/* Toast Notifications (High Priority) */}
      <div className="fixed top-4 right-4 z-[90] space-y-2 max-w-sm">
        <AnimatePresence mode="popLayout">
          {toastNotifications.map((notification) => {
            const IconComponent = NOTIFICATION_ICONS[notification.type] || Bell
            const colorClass = NOTIFICATION_COLORS[notification.type]
            
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 300, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 300, scale: 0.8 }}
                transition={{ type: "spring", duration: 0.6 }}
                layout
              >
                <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`h-1 bg-gradient-to-r ${colorClass}`} />
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className={`w-10 h-10 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center flex-shrink-0`}
                        >
                          <IconComponent className="h-5 w-5 text-white" />
                        </motion.div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-gray-900 text-sm">
                              {notification.title}
                            </h4>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => dismissToastNotification(notification.id)}
                              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          
                          {notification.points && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.4 }}
                              className="flex items-center gap-1 mt-2"
                            >
                              <Coins className="h-4 w-4 text-green-600" />
                              <span className="font-bold text-green-600">
                                +{notification.points} points
                              </span>
                            </motion.div>
                          )}
                          
                          {notification.actionText && (
                            <Button
                              size="sm"
                              onClick={() => handleNotificationClick(notification)}
                              className="mt-3 w-full bg-gradient-to-r from-orange-500 to-teal-600 hover:from-orange-600 hover:to-teal-700 text-white"
                            >
                              {notification.actionText}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Bell Icon Dropdown */}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative text-white hover:bg-white/10"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 15 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Bell className="h-5 w-5" />
          </motion.div>
          
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center"
            >
              <span className="text-xs font-bold text-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            </motion.div>
          )}
        </Button>

        {/* Notification Dropdown */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="absolute top-full right-0 mt-2 w-80 bg-white/95 backdrop-blur-md rounded-lg shadow-2xl border border-white/20 z-50"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Badge className="bg-orange-100 text-orange-800">
                      {unreadCount} new
                    </Badge>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsExpanded(false)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-80 overflow-y-auto">
                {bellNotifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p>No notifications yet</p>
                    <p className="text-sm">You'll see updates here</p>
                  </div>
                ) : (
                  <div className="space-y-1 p-2">
                    {bellNotifications.map((notification) => {
                      const IconComponent = NOTIFICATION_ICONS[notification.type] || Bell
                      const colorClass = NOTIFICATION_COLORS[notification.type]
                      
                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          whileHover={{ scale: 1.01 }}
                          className={`p-3 rounded-lg cursor-pointer transition-all ${
                            PRIORITY_STYLES[notification.priority]
                          } ${!notification.read ? 'border-l-4 border-l-orange-500' : ''}`}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center flex-shrink-0`}>
                              <IconComponent className="h-4 w-4 text-white" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className={`text-sm ${!notification.read ? 'font-semibold' : 'font-medium'} text-gray-900`}>
                                  {notification.title}
                                </h4>
                                <span className="text-xs text-gray-500 flex-shrink-0">
                                  {formatTimeAgo(notification.timestamp)}
                                </span>
                              </div>
                              
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>
                              
                              {notification.points && (
                                <div className="flex items-center gap-1 mt-2">
                                  <Coins className="h-3 w-3 text-green-600" />
                                  <span className="text-xs font-semibold text-green-600">
                                    +{notification.points}
                                  </span>
                                </div>
                              )}
                              
                              {notification.actionText && (
                                <Button
                                  size="sm"
                                  className="mt-2 h-6 px-2 text-xs bg-gradient-to-r from-orange-500 to-teal-600 hover:from-orange-600 hover:to-teal-700 text-white"
                                >
                                  {notification.actionText}
                                </Button>
                              )}
                            </div>
                            
                            {!notification.read && (
                              <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-1" />
                            )}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              {bellNotifications.length > 0 && (
                <div className="flex items-center justify-between p-3 border-t border-gray-200 bg-gray-50">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => bellNotifications.forEach(n => onNotificationRead(n.id))}
                    className="text-xs"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Mark all read
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs"
                  >
                    <Settings className="h-3 w-3 mr-1" />
                    Settings
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

// Example usage with sample notifications
export const generateSampleNotifications = (): Notification[] => [
  {
    id: '1',
    type: 'points',
    title: 'Points Earned!',
    message: 'You earned points from your recent purchase at Mwenda Crafts',
    points: 150,
    timestamp: new Date(Date.now() - 5000),
    read: false,
    priority: 'high',
    actionText: 'View Details',
    actionUrl: '/orders'
  },
  {
    id: '2',
    type: 'tier',
    title: 'Tier Upgrade Available!',
    message: 'You are just 500 points away from Platinum tier',
    timestamp: new Date(Date.now() - 60000),
    read: false,
    priority: 'medium',
    actionText: 'Earn More',
    actionUrl: '/marketplace'
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Achievement Unlocked!',
    message: 'Congratulations! You have completed your first week streak',
    points: 100,
    timestamp: new Date(Date.now() - 120000),
    read: false,
    priority: 'high',
    actionText: 'Claim Reward',
    actionUrl: '/loyalty'
  },
  {
    id: '4',
    type: 'challenge',
    title: 'Challenge Progress',
    message: 'You are 2/3 through the Weekend Warrior challenge',
    timestamp: new Date(Date.now() - 300000),
    read: true,
    priority: 'low'
  },
  {
    id: '5',
    type: 'reward',
    title: 'New Reward Available',
    message: 'K100 voucher is now available for redemption',
    timestamp: new Date(Date.now() - 600000),
    read: false,
    priority: 'medium',
    actionText: 'Redeem Now',
    actionUrl: '/loyalty?tab=rewards'
  }
]
