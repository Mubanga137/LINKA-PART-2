"use client"

import { useEffect, useState } from 'react'
import { useBackgroundAnimations } from '@/hooks/use-animations'
import { Settings, Sparkles, Waves, CircleDot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'

// Floating Particles Component
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{
    id: number
    left: number
    delay: number
    duration: number
  }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 6 + Math.random() * 8
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="floating-particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
    </div>
  )
}

// Floating Waves Component
function FloatingWaves() {
  return (
    <div className="floating-waves">
      <div className="wave" />
      <div className="wave" />
    </div>
  )
}

// Floating Icons Component
function FloatingIcons() {
  const icons = ['✨', '🌟', '💫', '⭐', '🔥', '💎', '🎯', '🚀']
  const [floatingIcons, setFloatingIcons] = useState<Array<{
    id: number
    icon: string
    left: number
    delay: number
    duration: number
  }>>([])

  useEffect(() => {
    const newIcons = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      icon: icons[Math.floor(Math.random() * icons.length)],
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 8 + Math.random() * 6
    }))
    setFloatingIcons(newIcons)
  }, [])

  return (
    <div className="floating-icons">
      {floatingIcons.map((item) => (
        <div
          key={item.id}
          className="floating-icon"
          style={{
            left: `${item.left}%`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  )
}

// Animation Settings Toggle Component
function AnimationSettings() {
  const {
    animationsEnabled,
    particlesEnabled,
    toggleAnimations,
    toggleParticles
  } = useBackgroundAnimations()
  
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <Card className="mb-4 w-80 bg-white/90 backdrop-blur-sm border-white/50 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-semibold text-slate-800">Animation Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CircleDot className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-slate-700">Background Animations</span>
                </div>
                <Switch
                  checked={animationsEnabled}
                  onCheckedChange={toggleAnimations}
                  className="data-[state=checked]:bg-purple-600"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Waves className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-slate-700">Floating Elements</span>
                </div>
                <Switch
                  checked={particlesEnabled}
                  onCheckedChange={toggleParticles}
                  disabled={!animationsEnabled}
                  className="data-[state=checked]:bg-blue-600"
                />
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                Disable animations to improve performance on slower devices
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
      >
        <Settings className="h-6 w-6 text-white group-hover:rotate-90 transition-transform duration-300" />
      </Button>
      
      {animationsEnabled && (
        <Badge className="absolute -top-2 -left-2 bg-green-500 text-white text-xs px-2 py-1 animate-pulse">
          ON
        </Badge>
      )}
    </div>
  )
}

// Main Background Animations Component
export function BackgroundAnimations() {
  const { animationsEnabled, particlesEnabled } = useBackgroundAnimations()

  if (!animationsEnabled) return null

  return (
    <>
      {particlesEnabled && (
        <>
          <FloatingParticles />
          <FloatingWaves />
          <FloatingIcons />
        </>
      )}
      <AnimationSettings />
    </>
  )
}
