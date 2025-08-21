"use client"

import { ReactNode, useState, useRef, MouseEvent } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Enhanced3DCardProps {
  children: ReactNode
  className?: string
  glowColor?: 'purple' | 'blue' | 'green' | 'pink' | 'yellow' | 'red'
  intensity?: 'subtle' | 'medium' | 'strong'
  onClick?: () => void
  disabled?: boolean
}

export function Enhanced3DCard({ 
  children, 
  className, 
  glowColor = 'purple',
  intensity = 'medium',
  onClick,
  disabled = false
}: Enhanced3DCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || disabled) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * (intensity === 'subtle' ? 5 : intensity === 'medium' ? 10 : 15)
    const rotateY = ((x - centerX) / centerX) * (intensity === 'subtle' ? 5 : intensity === 'medium' ? 10 : 15)

    setMousePosition({ x: rotateY, y: -rotateX })
  }

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }

  const getGlowClasses = () => {
    const colors = {
      purple: 'shadow-purple-500/25 hover:shadow-purple-500/40',
      blue: 'shadow-blue-500/25 hover:shadow-blue-500/40',
      green: 'shadow-green-500/25 hover:shadow-green-500/40',
      pink: 'shadow-pink-500/25 hover:shadow-pink-500/40',
      yellow: 'shadow-yellow-500/25 hover:shadow-yellow-500/40',
      red: 'shadow-red-500/25 hover:shadow-red-500/40',
    }
    return colors[glowColor]
  }

  const getGlowBorder = () => {
    const colors = {
      purple: 'border-purple-400/30 hover:border-purple-400/60',
      blue: 'border-blue-400/30 hover:border-blue-400/60',
      green: 'border-green-400/30 hover:border-green-400/60',
      pink: 'border-pink-400/30 hover:border-pink-400/60',
      yellow: 'border-yellow-400/30 hover:border-yellow-400/60',
      red: 'border-red-400/30 hover:border-red-400/60',
    }
    return colors[glowColor]
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        "group perspective-1000 transition-all duration-300",
        onClick && !disabled && "cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={!disabled ? onClick : undefined}
      style={{
        transform: isHovered && !disabled
          ? `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${mousePosition.y}deg) translateZ(${intensity === 'subtle' ? '10px' : intensity === 'medium' ? '20px' : '30px'})`
          : 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)',
        transformStyle: 'preserve-3d',
        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      <Card 
        className={cn(
          "relative overflow-hidden bg-white/80 backdrop-blur-sm border-2 transition-all duration-500",
          "shadow-xl hover:shadow-2xl",
          getGlowClasses(),
          getGlowBorder(),
          isHovered && !disabled && "scale-105"
        )}
      >
        {/* Glow Effect Overlay */}
        <div 
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none",
            isHovered && !disabled && "opacity-100"
          )}
          style={{
            background: `radial-gradient(circle at ${((mousePosition.x + 15) / 30) * 100}% ${((-mousePosition.y + 15) / 30) * 100}%, 
              rgba(147, 51, 234, 0.1) 0%, 
              rgba(147, 51, 234, 0.05) 50%, 
              transparent 100%)`
          }}
        />

        {/* Shimmer Effect */}
        <div 
          className={cn(
            "absolute inset-0 -translate-x-full opacity-0 transition-all duration-1000 pointer-events-none",
            isHovered && !disabled && "translate-x-full opacity-30"
          )}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)'
          }}
        />

        {/* 3D Border Effect */}
        <div 
          className={cn(
            "absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 pointer-events-none",
            isHovered && !disabled && "opacity-100"
          )}
          style={{
            boxShadow: `
              inset 0 1px 0 rgba(255,255,255,0.6),
              inset 0 -1px 0 rgba(0,0,0,0.1),
              0 20px 40px rgba(0,0,0,0.1)
            `
          }}
        />

        <CardContent className="relative z-10">
          {children}
        </CardContent>
      </Card>
    </div>
  )
}

// Specialized card variants
export function ProductCard3D({ children, className, ...props }: Enhanced3DCardProps) {
  return (
    <Enhanced3DCard 
      {...props}
      className={cn("hover-lift", className)}
      glowColor="purple"
      intensity="medium"
    >
      {children}
    </Enhanced3DCard>
  )
}

export function StatsCard3D({ children, className, ...props }: Enhanced3DCardProps) {
  return (
    <Enhanced3DCard 
      {...props}
      className={cn("card-3d glow-accent", className)}
      glowColor="blue"
      intensity="subtle"
    >
      {children}
    </Enhanced3DCard>
  )
}

export function CategoryCard3D({ children, className, ...props }: Enhanced3DCardProps) {
  return (
    <Enhanced3DCard 
      {...props}
      className={cn("hover-lift", className)}
      glowColor="green"
      intensity="medium"
    >
      {children}
    </Enhanced3DCard>
  )
}

export function FeatureCard3D({ children, className, ...props }: Enhanced3DCardProps) {
  return (
    <Enhanced3DCard 
      {...props}
      className={cn("card-3d", className)}
      glowColor="pink"
      intensity="strong"
    >
      {children}
    </Enhanced3DCard>
  )
}
