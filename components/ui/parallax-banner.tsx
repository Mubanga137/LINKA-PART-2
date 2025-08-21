"use client"

import { useScrollAnimation } from '@/hooks/use-animations'
import { ReactNode, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Star } from 'lucide-react'

interface ParallaxBannerProps {
  children?: ReactNode
  className?: string
  backgroundImage?: string
  height?: 'sm' | 'md' | 'lg' | 'xl'
  overlay?: boolean
  speed?: number
}

export function ParallaxBanner({
  children,
  className,
  backgroundImage,
  height = 'md',
  overlay = true,
  speed = 0.5
}: ParallaxBannerProps) {
  const { scrollY, getParallaxStyle } = useScrollAnimation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const getHeightClass = () => {
    switch (height) {
      case 'sm': return 'h-64'
      case 'lg': return 'h-96'
      case 'xl': return 'h-[500px]'
      default: return 'h-80'
    }
  }

  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl",
      getHeightClass(),
      className
    )}>
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 w-full h-[120%] bg-cover bg-center transition-transform duration-75 ease-out"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          ...getParallaxStyle(speed)
        }}
      >
        {!backgroundImage && (
          <div className="w-full h-full bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 gradient-shift" />
        )}
      </div>

      {/* Animated Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40" />
      )}

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float"
          style={{ ...getParallaxStyle(-0.3) }}
        />
        <div 
          className="absolute top-32 left-10 w-16 h-16 bg-yellow-400/20 rounded-full blur-lg"
          style={{ ...getParallaxStyle(-0.2) }}
        />
        <div 
          className="absolute bottom-20 right-1/4 w-24 h-24 bg-pink-400/15 rounded-full blur-xl"
          style={{ ...getParallaxStyle(-0.4) }}
        />
      </div>

      {/* Parallax Content */}
      <div 
        className={cn(
          "relative z-10 h-full flex items-center justify-center transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
        style={{ ...getParallaxStyle(-0.1) }}
      >
        {children}
      </div>
    </div>
  )
}

// CTA Banner with parallax
interface CTAParallaxBannerProps {
  title: string
  description: string
  primaryAction?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function CTAParallaxBanner({
  title,
  description,
  primaryAction,
  secondaryAction,
  className
}: CTAParallaxBannerProps) {
  return (
    <ParallaxBanner 
      className={className}
      height="lg"
      speed={0.3}
    >
      <div className="text-center text-white max-w-4xl mx-auto px-6 space-y-6">
        {/* Floating Stars */}
        <div className="absolute inset-0 pointer-events-none">
          <Star className="absolute top-1/4 left-1/4 h-4 w-4 text-yellow-400 animate-pulse" />
          <Sparkles className="absolute top-1/3 right-1/3 h-5 w-5 text-blue-300 animate-spin-slow" />
          <Star className="absolute bottom-1/3 left-1/2 h-3 w-3 text-pink-400 animate-bounce" />
        </div>

        <div className="relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          {primaryAction && (
            <Button 
              onClick={primaryAction.onClick}
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              {primaryAction.label}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
          
          {secondaryAction && (
            <Button 
              onClick={secondaryAction.onClick}
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </ParallaxBanner>
  )
}

// Hero Banner with advanced parallax
interface HeroParallaxBannerProps {
  title: string
  subtitle?: string
  description: string
  backgroundImage?: string
  actions?: Array<{
    label: string
    onClick: () => void
    variant?: 'default' | 'outline' | 'ghost'
  }>
  className?: string
}

export function HeroParallaxBanner({
  title,
  subtitle,
  description,
  backgroundImage,
  actions = [],
  className
}: HeroParallaxBannerProps) {
  const { scrollY } = useScrollAnimation()

  return (
    <ParallaxBanner 
      className={className}
      height="xl"
      backgroundImage={backgroundImage}
      speed={0.6}
    >
      <div className="text-center text-white max-w-5xl mx-auto px-6 space-y-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${30 + (i * 10)}%`,
                animationDelay: `${i * 0.5}s`,
                transform: `translateY(${scrollY * 0.1 * (i + 1)}px)`
              }}
            />
          ))}
        </div>

        <div className="relative space-y-6">
          {subtitle && (
            <div className="inline-block">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
                {subtitle}
              </span>
            </div>
          )}

          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            {title}
          </h1>
          
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {actions.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            {actions.map((action, index) => (
              <Button
                key={index}
                onClick={action.onClick}
                size="lg"
                variant={action.variant || 'default'}
                className={cn(
                  "font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105",
                  action.variant === 'outline' 
                    ? "border-white/30 text-white hover:bg-white/10 bg-transparent" 
                    : "bg-white text-purple-600 hover:bg-gray-50 hover:shadow-xl"
                )}
              >
                {action.label}
                {index === 0 && <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
            ))}
          </div>
        )}
      </div>
    </ParallaxBanner>
  )
}
