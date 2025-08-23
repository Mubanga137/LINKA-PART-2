"use client"

import { motion } from "framer-motion"
import { Coins, Crown, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface StickyPointsTrackerProps {
  currentPoints: number
  currentTier: string
  pointsToNextReward: number
  isVisible: boolean
}

export function StickyPointsTracker({ 
  currentPoints, 
  currentTier, 
  pointsToNextReward, 
  isVisible 
}: StickyPointsTrackerProps) {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl md:hidden"
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Points Display */}
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
          >
            <Coins className="h-4 w-4 text-purple-900" />
          </motion.div>
          <div>
            <div className="font-bold text-lg">
              {currentPoints.toLocaleString()}
            </div>
            <div className="text-xs text-purple-200">
              {pointsToNextReward} to next reward
            </div>
          </div>
        </div>

        {/* Tier Badge */}
        <div className="flex items-center gap-2">
          <Badge className="bg-yellow-400 text-purple-900 font-bold">
            <Crown className="h-3 w-3 mr-1" />
            {currentTier}
          </Badge>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <TrendingUp className="h-5 w-5 text-green-300" />
          </motion.div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-purple-800">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
          initial={{ width: "0%" }}
          animate={{ width: "65%" }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )
}
