"use client"

import { useState } from 'react'
import { useCartAnimation, useWishlistAnimation } from '@/hooks/use-animations'
import { useNotifications } from '@/components/ui/notification-system'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Heart, Plus, Check, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InteractiveCartButtonProps {
  productName?: string
  onAddToCart?: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'ghost'
  disabled?: boolean
}

export function InteractiveCartButton({
  productName = "item",
  onAddToCart,
  className,
  size = 'md',
  variant = 'default',
  disabled = false
}: InteractiveCartButtonProps) {
  const { triggerShake, cartRef } = useCartAnimation()
  const { showSuccess } = useNotifications()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    if (disabled || isAdded) return

    triggerShake()
    setIsAdded(true)
    showSuccess(`${productName} added to cart!`)
    onAddToCart?.()

    // Reset after animation
    setTimeout(() => setIsAdded(false), 2000)
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'h-8 px-3 text-sm'
      case 'lg': return 'h-12 px-6 text-base'
      default: return 'h-10 px-4 text-sm'
    }
  }

  return (
    <Button
      ref={cartRef}
      onClick={handleAddToCart}
      disabled={disabled || isAdded}
      variant={isAdded ? 'default' : variant}
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        "hover:scale-105 hover:shadow-lg",
        getSizeClasses(),
        isAdded && "bg-green-500 hover:bg-green-600 text-white",
        className
      )}
    >
      {/* Background Animation */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 transition-opacity duration-300",
        "group-hover:opacity-20"
      )} />

      {/* Content */}
      <div className="relative flex items-center gap-2">
        {isAdded ? (
          <>
            <Check className="h-4 w-4 animate-bounce" />
            <span>Added!</span>
            <Sparkles className="h-3 w-3 animate-spin" />
          </>
        ) : (
          <>
            <ShoppingCart className={cn(
              "transition-transform duration-200",
              "group-hover:scale-110"
            )} size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
            <span>Add to Cart</span>
            <Plus className={cn(
              "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
              "group-hover:rotate-90"
            )} size={12} />
          </>
        )}
      </div>

      {/* Ripple Effect */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-active:opacity-30 transition-opacity duration-150",
        "bg-radial-gradient from-white/50 to-transparent"
      )} />
    </Button>
  )
}

interface InteractiveWishlistButtonProps {
  productName?: string
  onToggleWishlist?: (isInWishlist: boolean) => void
  initialState?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export function InteractiveWishlistButton({
  productName = "item",
  onToggleWishlist,
  initialState = false,
  className,
  size = 'md',
  showLabel = false
}: InteractiveWishlistButtonProps) {
  const { triggerPulse, wishlistRef } = useWishlistAnimation()
  const { showSuccess, showInfo } = useNotifications()
  const [isInWishlist, setIsInWishlist] = useState(initialState)

  const handleToggleWishlist = () => {
    triggerPulse()
    const newState = !isInWishlist
    setIsInWishlist(newState)
    
    if (newState) {
      showSuccess(`${productName} added to wishlist!`)
    } else {
      showInfo(`${productName} removed from wishlist`)
    }
    
    onToggleWishlist?.(newState)
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'h-8 w-8'
      case 'lg': return 'h-12 w-12'
      default: return 'h-10 w-10'
    }
  }

  const getIconSize = () => {
    switch (size) {
      case 'sm': return 14
      case 'lg': return 20
      default: return 16
    }
  }

  if (showLabel) {
    return (
      <Button
        ref={wishlistRef}
        onClick={handleToggleWishlist}
        variant={isInWishlist ? 'default' : 'outline'}
        className={cn(
          "group relative overflow-hidden transition-all duration-300",
          "hover:scale-105 hover:shadow-lg",
          isInWishlist && "bg-red-500 hover:bg-red-600 text-white border-red-500",
          className
        )}
      >
        <div className="flex items-center gap-2">
          <Heart 
            className={cn(
              "transition-all duration-300",
              isInWishlist && "fill-current text-white",
              "group-hover:scale-110"
            )} 
            size={getIconSize()} 
          />
          <span>{isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}</span>
        </div>
      </Button>
    )
  }

  return (
    <Button
      ref={wishlistRef}
      onClick={handleToggleWishlist}
      size="sm"
      variant="ghost"
      className={cn(
        "group relative overflow-hidden transition-all duration-300 rounded-full",
        "hover:scale-110 hover:shadow-lg",
        getSizeClasses(),
        isInWishlist && "bg-red-50 hover:bg-red-100",
        className
      )}
    >
      {/* Pulse Background */}
      <div className={cn(
        "absolute inset-0 rounded-full bg-red-500/20 scale-0 transition-transform duration-500",
        isInWishlist && "scale-100"
      )} />

      {/* Heart Icon */}
      <Heart 
        className={cn(
          "relative z-10 transition-all duration-300",
          isInWishlist ? "fill-red-500 text-red-500 scale-110" : "text-gray-400 hover:text-red-400",
          "group-hover:scale-125"
        )} 
        size={getIconSize()} 
      />

      {/* Sparkle Effect */}
      {isInWishlist && (
        <div className="absolute inset-0 pointer-events-none">
          <Sparkles className="absolute top-1 right-1 h-3 w-3 text-red-400 animate-ping" />
        </div>
      )}
    </Button>
  )
}

// Compound component for product cards
interface ProductActionsProps {
  productName: string
  onAddToCart?: () => void
  onToggleWishlist?: (isInWishlist: boolean) => void
  initialWishlistState?: boolean
  className?: string
  layout?: 'horizontal' | 'vertical'
}

export function ProductActions({
  productName,
  onAddToCart,
  onToggleWishlist,
  initialWishlistState = false,
  className,
  layout = 'horizontal'
}: ProductActionsProps) {
  return (
    <div className={cn(
      "flex gap-2",
      layout === 'vertical' ? "flex-col" : "flex-row items-center",
      className
    )}>
      <InteractiveCartButton
        productName={productName}
        onAddToCart={onAddToCart}
        className="flex-1"
      />
      <InteractiveWishlistButton
        productName={productName}
        onToggleWishlist={onToggleWishlist}
        initialState={initialWishlistState}
      />
    </div>
  )
}

// Shopping cart counter with animation
interface AnimatedCartCounterProps {
  count: number
  className?: string
}

export function AnimatedCartCounter({ count, className }: AnimatedCartCounterProps) {
  return (
    <div className={cn("relative", className)}>
      <ShoppingCart className="h-6 w-6" />
      {count > 0 && (
        <Badge 
          className={cn(
            "absolute -top-2 -right-2 h-5 w-5 p-0 text-xs",
            "bg-red-500 text-white animate-bounce",
            count > 9 && "w-6"
          )}
        >
          {count > 99 ? '99+' : count}
        </Badge>
      )}
    </div>
  )
}
