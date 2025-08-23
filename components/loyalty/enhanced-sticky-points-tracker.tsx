"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Coins, Crown, TrendingUp, Gift, Zap, Bell, ChevronDown, Star, Target } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface EnhancedStickyPointsTrackerProps {
  currentPoints: number
  currentTier: string
  pointsToNextReward: number
  pointsToNextTier: number
  isVisible: boolean
  recentActivity?: Array<{
    id: string
    action: string
    points: number
    type: 'earned' | 'redeemed'
  }>
  onQuickAction?: (action: string) => void
}

export function EnhancedStickyPointsTracker({ 
  currentPoints, 
  currentTier, 
  pointsToNextReward,
  pointsToNextTier,
  isVisible,
  recentActivity = [],
  onQuickAction
}: EnhancedStickyPointsTrackerProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [lastPointsUpdate, setLastPointsUpdate] = useState(currentPoints)

  useEffect(() => {
    if (currentPoints > lastPointsUpdate) {
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 3000)
    }
    setLastPointsUpdate(currentPoints)
  }, [currentPoints, lastPointsUpdate])

  if (!isVisible) return null

  const rewardProgress = ((currentPoints) / (currentPoints + pointsToNextReward)) * 100
  const tierProgress = pointsToNextTier > 0 ? ((currentPoints) / (currentPoints + pointsToNextTier)) * 100 : 100

  return (
    <>
      {/* Points Update Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ y: -100, opacity: 0, scale: 0.8 }}
            animate={{ y: 20, opacity: 1, scale: 1 }}
            exit={{ y: -100, opacity: 0, scale: 0.8 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[60] md:hidden"
          >
            <Card className="bg-gradient-to-r from-green-500 to-green-600 border-0 shadow-2xl">
              <CardContent className="p-4 text-white text-center">
                <div className="flex items-center gap-2">
                  <Coins className="h-5 w-5" />
                  <span className="font-bold">+{currentPoints - lastPointsUpdate} Points Earned!</span>
                  <Star className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Sticky Tracker */}
      <motion.div
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -120, opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 via-teal-600 to-blue-600 text-white shadow-2xl md:hidden overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              animate={{
                x: [0, Math.random() * 100],
                y: [0, Math.random() * 60],
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: Math.random() * 8 + 4,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        {/* Collapsed View */}
        <motion.div
          className="relative z-10"
          animate={{ height: isExpanded ? 'auto' : '60px' }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div 
            className="flex items-center justify-between px-4 py-3 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {/* Points Display */}
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
                className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30"
              >
                <Coins className="h-5 w-5 text-yellow-300" />
              </motion.div>
              <div>
                <motion.div 
                  className="font-bold text-lg"
                  key={currentPoints}
                  initial={{ scale: 1.2, color: '#fbbf24' }}
                  animate={{ scale: 1, color: '#ffffff' }}
                  transition={{ duration: 0.5 }}
                >
                  {currentPoints.toLocaleString()}
                </motion.div>
                <div className="text-xs text-white/80">
                  {pointsToNextReward} to next reward
                </div>
              </div>
            </div>

            {/* Tier Badge & Expand Button */}
            <div className="flex items-center gap-3">
              <Badge className="bg-yellow-400 text-gray-900 font-bold px-3 py-1">
                <Crown className="h-3 w-3 mr-1" />
                {currentTier}
              </Badge>
              
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-5 w-5 text-white/80" />
              </motion.div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-black/20 mx-4">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 to-green-400 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${rewardProgress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="px-4 pb-4 pt-3 space-y-4"
              >
                {/* Tier Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/80">Tier Progress</span>
                    <span className="font-semibold">{Math.round(tierProgress)}%</span>
                  </div>
                  <div className="h-2 bg-black/20 rounded-full">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${tierProgress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    />
                  </div>
                  <div className="text-xs text-white/70">
                    {pointsToNextTier} points to next tier
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => onQuickAction?.('redeem')}
                    className="flex-1 bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-md"
                  >
                    <Gift className="h-4 w-4 mr-1" />
                    Redeem
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onQuickAction?.('earn')}
                    className="flex-1 bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-md"
                  >
                    <Zap className="h-4 w-4 mr-1" />
                    Earn More
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onQuickAction?.('challenges')}
                    className="flex-1 bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-md"
                  >
                    <Target className="h-4 w-4 mr-1" />
                    Challenges
                  </Button>
                </div>

                {/* Recent Activity Preview */}
                {recentActivity.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                      <Bell className="h-4 w-4" />
                      Recent Activity
                    </div>
                    <div className="space-y-1 max-h-20 overflow-y-auto">
                      {recentActivity.slice(0, 2).map((activity) => (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between text-xs bg-white/10 rounded-lg p-2 backdrop-blur-sm"
                        >
                          <span className="text-white/80 truncate flex-1 mr-2">
                            {activity.action}
                          </span>
                          <span className={`font-bold ${
                            activity.type === 'earned' ? 'text-green-300' : 'text-orange-300'
                          }`}>
                            {activity.type === 'earned' ? '+' : ''}{activity.points}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                    <div className="text-lg font-bold text-white">75%</div>
                    <div className="text-xs text-white/70">This Week</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                    <div className="text-lg font-bold text-white">5</div>
                    <div className="text-xs text-white/70">Day Streak</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                    <div className="text-lg font-bold text-white">3</div>
                    <div className="text-xs text-white/70">Challenges</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </>
  )
}
