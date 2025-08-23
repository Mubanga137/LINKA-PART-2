"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Crown, 
  Gift, 
  Sparkles, 
  Coins, 
  Star, 
  ArrowRight,
  Zap,
  Trophy,
  Target,
  Flame
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock loyalty data - in real app this would come from context/API
const MOCK_LOYALTY_DATA = {
  currentPoints: 2450,
  pointsToNextReward: 550,
  currentTier: "Gold",
  nextTier: "Platinum",
  pointsToNextTier: 1500,
  streak: 5,
  recentEarnings: [
    { action: "Purchase bonus", points: 50, date: "Today" },
    { action: "Daily login", points: 10, date: "Today" },
    { action: "Review bonus", points: 50, date: "Yesterday" }
  ]
}

export function LoyaltyPointsPreview() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    setIsVisible(true)
    // Animate progress
    const timer = setTimeout(() => {
      const rewardProgress = (MOCK_LOYALTY_DATA.currentPoints / (MOCK_LOYALTY_DATA.currentPoints + MOCK_LOYALTY_DATA.pointsToNextReward)) * 100
      setProgress(rewardProgress)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  const formatPoints = (points: number) => points.toLocaleString()

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Bronze": return "from-orange-600 to-orange-800"
      case "Silver": return "from-gray-400 to-gray-600"
      case "Gold": return "from-yellow-400 to-yellow-600"
      case "Platinum": return "from-purple-400 to-purple-600"
      default: return "from-gray-400 to-gray-600"
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "Bronze": return Star
      case "Silver": return Star
      case "Gold": return Crown
      case "Platinum": return Trophy
      default: return Star
    }
  }

  const TierIcon = getTierIcon(MOCK_LOYALTY_DATA.currentTier)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white border-0">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              x: [0, 20, 0],
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 right-4 w-12 h-12 bg-yellow-300/20 rounded-full blur-xl"
          ></motion.div>
          <motion.div
            animate={{ 
              x: [0, -15, 0],
              y: [0, 15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-6 left-6 w-8 h-8 bg-purple-300/30 rounded-full blur-lg"
          ></motion.div>
        </div>

        <CardHeader className="relative pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 15 }}
                className={`w-12 h-12 bg-gradient-to-br ${getTierColor(MOCK_LOYALTY_DATA.currentTier)} rounded-xl flex items-center justify-center shadow-lg relative`}
              >
                <TierIcon className="h-6 w-6 text-white" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <Sparkles className="h-2 w-2 text-white" />
                </motion.div>
              </motion.div>
              <div>
                <CardTitle className="text-xl font-bold text-white">
                  Loyalty Points
                </CardTitle>
                <div className="flex items-center gap-2 text-purple-100">
                  <span className="text-sm">{MOCK_LOYALTY_DATA.currentTier} Tier</span>
                  <Badge className="bg-yellow-400/20 text-yellow-200 text-xs">
                    {formatPoints(MOCK_LOYALTY_DATA.currentPoints)} pts
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/loyalty')}
              className="text-white hover:text-white hover:bg-white/20 group/btn"
            >
              <span className="mr-1">View All</span>
              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-6">
          {/* Points Display & Progress */}
          <div className="space-y-4">
            {/* Current Points */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2"
              >
                <Coins className="h-8 w-8 text-yellow-300" />
                {formatPoints(MOCK_LOYALTY_DATA.currentPoints)}
              </motion.div>
              <p className="text-purple-100 text-sm">
                {MOCK_LOYALTY_DATA.pointsToNextReward} points to next reward
              </p>
            </div>

            {/* Progress to Next Reward */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-purple-200">
                <span>Next Reward Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="relative">
                <Progress 
                  value={progress} 
                  className="h-3 bg-purple-800/50"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 2, ease: "easeOut", delay: 1 }}
                />
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-2"
              >
                <Target className="h-4 w-4 text-yellow-300" />
              </motion.div>
              <div className="text-lg font-bold text-white">
                {MOCK_LOYALTY_DATA.pointsToNextTier}
              </div>
              <div className="text-xs text-purple-200">To {MOCK_LOYALTY_DATA.nextTier}</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-8 h-8 bg-orange-400/20 rounded-full flex items-center justify-center mx-auto mb-2"
              >
                <Flame className="h-4 w-4 text-orange-300" />
              </motion.div>
              <div className="text-lg font-bold text-white">
                {MOCK_LOYALTY_DATA.streak}
              </div>
              <div className="text-xs text-purple-200">Day Streak</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-2"
              >
                <Gift className="h-4 w-4 text-green-300" />
              </motion.div>
              <div className="text-lg font-bold text-white">3</div>
              <div className="text-xs text-purple-200">Rewards Ready</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-300" />
              Recent Activity
            </h4>
            <div className="space-y-2">
              {MOCK_LOYALTY_DATA.recentEarnings.slice(0, 3).map((earning, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-purple-100">{earning.action}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-green-300">+{earning.points}</span>
                    <span className="text-purple-200 text-xs">{earning.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={() => router.push('/loyalty')}
              className="flex-1 bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 group/redeem"
            >
              <Gift className="h-4 w-4 mr-2 group-hover/redeem:animate-bounce" />
              Redeem Rewards
            </Button>
            <Button
              onClick={() => router.push('/marketplace')}
              variant="outline"
              className="flex-1 border-white/30 text-white hover:bg-white/10"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Earn More
            </Button>
          </div>

          {/* Tier Progression Hint */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 }}
            className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-300/30 rounded-lg p-3 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-sm">
              <Crown className="h-4 w-4 text-yellow-300" />
              <span className="text-yellow-100 font-medium">
                {MOCK_LOYALTY_DATA.pointsToNextTier} points to {MOCK_LOYALTY_DATA.nextTier} tier! 🚀
              </span>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
