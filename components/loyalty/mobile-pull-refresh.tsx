"use client"

import { useState, useRef, useEffect } from "react"
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion"
import { RefreshCw, Coins, Sparkles } from "lucide-react"

interface MobilePullRefreshProps {
  children: React.ReactNode
  onRefresh: () => Promise<void>
  threshold?: number
}

export function MobilePullRefresh({ 
  children, 
  onRefresh, 
  threshold = 100 
}: MobilePullRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showCoinRain, setShowCoinRain] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const y = useMotionValue(0)
  const opacity = useTransform(y, [0, threshold], [0, 1])
  const scale = useTransform(y, [0, threshold], [0.8, 1])
  const rotate = useTransform(y, [0, threshold], [0, 360])

  const handleDragEnd = async (event: any, info: PanInfo) => {
    if (info.offset.y > threshold && !isRefreshing) {
      setIsRefreshing(true)
      setShowCoinRain(true)
      
      try {
        await onRefresh()
      } finally {
        setTimeout(() => {
          setIsRefreshing(false)
          setShowCoinRain(false)
          y.set(0)
        }, 2000)
      }
    } else {
      y.set(0)
    }
  }

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Coin Rain Animation */}
      {showCoinRain && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: -20,
                rotate: 0,
                scale: 0
              }}
              animate={{
                y: window.innerHeight + 20,
                rotate: 720,
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 0.5,
                ease: "easeOut"
              }}
              className="absolute"
            >
              <Coins className="h-6 w-6 text-yellow-500" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Pull to Refresh Header */}
      <motion.div
        style={{ opacity }}
        className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-purple-600 to-transparent p-4 text-center text-white"
      >
        <motion.div
          style={{ scale, rotate }}
          className="flex items-center justify-center gap-2"
        >
          <RefreshCw className={`h-6 w-6 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="font-medium">
            {isRefreshing ? 'Refreshing...' : 'Pull to refresh'}
          </span>
          <Sparkles className="h-5 w-5" />
        </motion.div>
      </motion.div>

      {/* Draggable Content */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.3, bottom: 0 }}
        onDragEnd={handleDragEnd}
        style={{ y }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </div>
  )
}
