"use client"

import { useEffect, useState, useRef } from "react"

interface AnimatedCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  decimals?: number
}

export function AnimatedCounter({ 
  end, 
  duration = 2000, 
  prefix = "", 
  suffix = "", 
  className = "",
  decimals = 0 
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const countRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            animateCounter()
          }
        })
      },
      { threshold: 0.1 }
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const animateCounter = () => {
    const startTime = Date.now()
    
    const updateCount = () => {
      const currentTime = Date.now()
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Use easeOutQuart easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = easeOutQuart * end
      
      setCount(currentCount)
      
      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(end)
      }
    }
    
    requestAnimationFrame(updateCount)
  }

  const formatNumber = (num: number) => {
    if (decimals === 0) {
      return Math.floor(num).toLocaleString()
    }
    return num.toFixed(decimals)
  }

  return (
    <span ref={countRef} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  )
}
