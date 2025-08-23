"use client"

import { useState } from "react"
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion"
import { ShoppingCart, Trash2, Share2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileSwipeActionsProps {
  children: React.ReactNode
  onAddToCart: () => void
  onRemove: () => void
  onShare: () => void
  onView: () => void
  disabled?: boolean
}

export function MobileSwipeActions({ 
  children, 
  onAddToCart, 
  onRemove, 
  onShare, 
  onView, 
  disabled = false 
}: MobileSwipeActionsProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const x = useMotionValue(0)
  const opacity = useTransform(x, [-100, 0], [1, 0])
  const scale = useTransform(x, [-100, 0], [1, 0.8])

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = -50
    
    if (info.offset.x < threshold) {
      setIsRevealed(true)
      x.set(-80)
    } else {
      setIsRevealed(false)
      x.set(0)
    }
  }

  const handleActionClick = (action: () => void) => {
    action()
    setIsRevealed(false)
    x.set(0)
  }

  return (
    <div className="relative overflow-hidden bg-transparent md:hidden">
      {/* Action Buttons (Hidden Behind) */}
      <motion.div 
        className="absolute right-0 top-0 bottom-0 flex items-center gap-2 px-4 bg-gradient-to-l from-red-500 via-blue-500 to-green-500"
        style={{ opacity, scale }}
      >
        <Button
          size="sm"
          variant="ghost"
          onClick={() => handleActionClick(onAddToCart)}
          disabled={disabled}
          className="text-white hover:bg-white/20 p-2"
        >
          <ShoppingCart className="h-5 w-5" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => handleActionClick(onShare)}
          className="text-white hover:bg-white/20 p-2"
        >
          <Share2 className="h-5 w-5" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => handleActionClick(onView)}
          className="text-white hover:bg-white/20 p-2"
        >
          <Eye className="h-5 w-5" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => handleActionClick(onRemove)}
          className="text-white hover:bg-white/20 p-2"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </motion.div>

      {/* Main Content (Swipeable) */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -100, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className="relative z-10 bg-white"
      >
        {children}
      </motion.div>

      {/* Swipe Hint */}
      {!isRevealed && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <motion.div
            animate={{ x: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400 text-xs"
          >
            ← Swipe for actions
          </motion.div>
        </div>
      )}
    </div>
  )
}
