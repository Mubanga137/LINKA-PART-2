"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

// Custom hook for page transitions
export function usePageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const router = useRouter()

  const navigateWithTransition = useCallback((href: string) => {
    setIsTransitioning(true)
    
    // Add transition classes to body
    document.body.classList.add('page-transitioning')
    
    setTimeout(() => {
      router.push(href)
      setIsTransitioning(false)
      document.body.classList.remove('page-transitioning')
    }, 300)
  }, [router])

  return { isTransitioning, navigateWithTransition }
}

// Hook for cart shake animation
export function useCartAnimation() {
  const [isShaking, setIsShaking] = useState(false)
  const cartRef = useRef<HTMLButtonElement>(null)

  const triggerShake = useCallback(() => {
    setIsShaking(true)
    
    if (cartRef.current) {
      cartRef.current.classList.add('animate-shake')
      
      setTimeout(() => {
        setIsShaking(false)
        cartRef.current?.classList.remove('animate-shake')
      }, 600)
    }
  }, [])

  return { isShaking, triggerShake, cartRef }
}

// Hook for wishlist pulse animation
export function useWishlistAnimation() {
  const [isPulsing, setIsPulsing] = useState(false)
  const wishlistRef = useRef<HTMLButtonElement>(null)

  const triggerPulse = useCallback(() => {
    setIsPulsing(true)
    
    if (wishlistRef.current) {
      wishlistRef.current.classList.add('animate-pulse-heart')
      
      setTimeout(() => {
        setIsPulsing(false)
        wishlistRef.current?.classList.remove('animate-pulse-heart')
      }, 800)
    }
  }, [])

  return { isPulsing, triggerPulse, wishlistRef }
}

// Hook for scroll-based animations
export function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getParallaxStyle = (speed: number = 0.5) => ({
    transform: `translateY(${scrollY * speed}px)`
  })

  return { scrollY, elementRef, getParallaxStyle }
}

// Hook for notification animations
export function useNotificationAnimation() {
  const [notifications, setNotifications] = useState<Array<{
    id: string
    message: string
    type: 'success' | 'error' | 'info'
    timestamp: number
  }>>([])

  const addNotification = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9)
    const notification = { id, message, type, timestamp: Date.now() }
    
    setNotifications(prev => [...prev, notification])
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 5000)
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  return { notifications, addNotification, removeNotification }
}

// Hook for background animation toggle
export function useBackgroundAnimations() {
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [particlesEnabled, setParticlesEnabled] = useState(false)

  useEffect(() => {
    // Load preferences from localStorage
    const stored = localStorage.getItem('background-animations')
    if (stored) {
      const prefs = JSON.parse(stored)
      setAnimationsEnabled(prefs.animations ?? true)
      setParticlesEnabled(prefs.particles ?? false)
    }
  }, [])

  const toggleAnimations = useCallback(() => {
    setAnimationsEnabled(prev => {
      const newValue = !prev
      localStorage.setItem('background-animations', JSON.stringify({
        animations: newValue,
        particles: particlesEnabled
      }))
      return newValue
    })
  }, [particlesEnabled])

  const toggleParticles = useCallback(() => {
    setParticlesEnabled(prev => {
      const newValue = !prev
      localStorage.setItem('background-animations', JSON.stringify({
        animations: animationsEnabled,
        particles: newValue
      }))
      return newValue
    })
  }, [animationsEnabled])

  return {
    animationsEnabled,
    particlesEnabled,
    toggleAnimations,
    toggleParticles
  }
}
