"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, PanInfo, useMotionValue, useTransform, AnimatePresence } from "framer-motion"
import { RefreshCw, Coins, Sparkles, Star, Gift, Zap, Trophy } from "lucide-react"

interface EnhancedMobilePullRefreshProps {
  children: React.ReactNode
  onRefresh: () => Promise<void>
  threshold?: number
  enableHaptic?: boolean
}

export function EnhancedMobilePullRefresh({ 
  children, 
  onRefresh, 
  threshold = 120,
  enableHaptic = true
}: EnhancedMobilePullRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showCoinRain, setShowCoinRain] = useState(false)
  const [refreshStage, setRefreshStage] = useState<'pull' | 'release' | 'refreshing' | 'complete'>('pull')
  const containerRef = useRef<HTMLDivElement>(null)
  const y = useMotionValue(0)
  const opacity = useTransform(y, [0, threshold], [0, 1])
  const scale = useTransform(y, [0, threshold], [0.5, 1.2])
  const rotate = useTransform(y, [0, threshold], [0, 720])

  const triggerHaptic = useCallback(() => {
    if (enableHaptic && 'vibrate' in navigator) {
      navigator.vibrate(50)
    }
  }, [enableHaptic])

  const handleDrag = (event: any, info: PanInfo) => {
    const currentY = info.offset.y
    
    if (currentY > threshold * 0.7 && refreshStage === 'pull') {
      setRefreshStage('release')
      triggerHaptic()
    } else if (currentY <= threshold * 0.7 && refreshStage === 'release') {
      setRefreshStage('pull')
    }
  }

  const handleDragEnd = async (event: any, info: PanInfo) => {
    if (info.offset.y > threshold && !isRefreshing) {
      setIsRefreshing(true)
      setRefreshStage('refreshing')
      setShowCoinRain(true)
      triggerHaptic()
      
      try {
        await onRefresh()
        setRefreshStage('complete')
        await new Promise(resolve => setTimeout(resolve, 1000))
      } finally {
        setTimeout(() => {
          setIsRefreshing(false)
          setShowCoinRain(false)
          setRefreshStage('pull')
          y.set(0)
        }, 1500)
      }
    } else {
      setRefreshStage('pull')
      y.set(0)
    }
  }

  const getRefreshMessage = () => {
    switch (refreshStage) {
      case 'pull': return 'Pull down to refresh'
      case 'release': return 'Release to refresh'
      case 'refreshing': return 'Refreshing your rewards...'
      case 'complete': return 'Rewards updated!'
      default: return 'Pull to refresh'
    }
  }

  const getRefreshIcon = () => {
    switch (refreshStage) {
      case 'pull': return RefreshCw
      case 'release': return Zap
      case 'refreshing': return RefreshCw
      case 'complete': return Trophy
      default: return RefreshCw
    }
  }

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Enhanced Coin Rain Animation */}
      <AnimatePresence>
        {showCoinRain && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            {[...Array(30)].map((_, i) => {
              const icons = [Coins, Star, Gift, Sparkles]
              const IconComponent = icons[i % icons.length]
              const colors = ['text-yellow-500', 'text-orange-500', 'text-blue-500', 'text-green-500']
              
              return (
                <motion.div
                  key={i}
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: -50,
                    rotate: 0,
                    scale: 0,
                    opacity: 1
                  }}
                  animate={{
                    y: window.innerHeight + 50,
                    rotate: Math.random() * 1440,
                    scale: [0, 1.5, 0],
                    opacity: [1, 1, 0]
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0
                  }}
                  transition={{
                    duration: 3,
                    delay: Math.random() * 1,
                    ease: "easeOut"
                  }}
                  className="absolute"
                >
                  <IconComponent className={`h-8 w-8 ${colors[i % colors.length]}`} />
                </motion.div>
              )
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Enhanced Pull to Refresh Header */}
      <motion.div
        style={{ opacity }}
        className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-orange-500 via-teal-600 to-transparent p-6 text-center text-white"
      >
        <motion.div
          style={{ scale }}
          className="flex flex-col items-center justify-center gap-3"
        >
          <motion.div
            style={{ rotate }}
            className={`w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center ${
              refreshStage === 'refreshing' ? 'animate-pulse' : ''
            }`}
          >
            {React.createElement(getRefreshIcon(), { 
              className: `h-8 w-8 ${isRefreshing ? 'animate-spin' : ''}` 
            })}
          </motion.div>
          
          <div className="space-y-1">
            <motion.span 
              className="font-bold text-lg"
              animate={{ 
                color: refreshStage === 'release' ? '#fbbf24' : '#ffffff'
              }}
            >
              {getRefreshMessage()}
            </motion.span>
            
            {refreshStage === 'refreshing' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2"
              >
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Draggable Content with Enhanced Gestures */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.4, bottom: 0 }}
        dragMomentum={false}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={{ y }}
        className="min-h-screen"
        whileDrag={{ scale: 0.98 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
