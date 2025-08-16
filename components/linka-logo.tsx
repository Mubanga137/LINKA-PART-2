"use client"

import { memo } from "react"
import Link from "next/link"

interface LinkaLogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const LinkaLogo = memo(function LinkaLogo({ 
  size = 'md', 
  className = '' 
}: LinkaLogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  }
  
  return (
    <Link href="/" className={`flex items-center group ${className}`}>
      <div className="flex items-center gap-3">
        {/* Chain link icon - CSS-based design */}
        <div
          className="relative transition-transform duration-300 group-hover:scale-110"
          style={{
            width: size === 'sm' ? '32px' : size === 'md' ? '40px' : '48px',
            height: size === 'sm' ? '32px' : size === 'md' ? '40px' : '48px'
          }}
        >
          {/* Blue chain link - bottom layer */}
          <div
            className="absolute"
            style={{
              width: size === 'sm' ? '24px' : size === 'md' ? '30px' : '36px',
              height: size === 'sm' ? '12px' : size === 'md' ? '15px' : '18px',
              borderRadius: size === 'sm' ? '6px' : size === 'md' ? '7.5px' : '9px',
              border: `${size === 'sm' ? '3px' : size === 'md' ? '4px' : '5px'} solid #1976d2`,
              boxSizing: 'border-box',
              transform: 'rotate(-45deg)',
              top: size === 'sm' ? '16px' : size === 'md' ? '20px' : '24px',
              left: size === 'sm' ? '2px' : size === 'md' ? '2.5px' : '3px',
              zIndex: 1
            }}
          />

          {/* Orange chain link - top layer */}
          <div
            className="absolute"
            style={{
              width: size === 'sm' ? '24px' : size === 'md' ? '30px' : '36px',
              height: size === 'sm' ? '12px' : size === 'md' ? '15px' : '18px',
              borderRadius: size === 'sm' ? '6px' : size === 'md' ? '7.5px' : '9px',
              border: `${size === 'sm' ? '3px' : size === 'md' ? '4px' : '5px'} solid #ff6600`,
              boxSizing: 'border-box',
              transform: 'rotate(45deg)',
              top: size === 'sm' ? '4px' : size === 'md' ? '5px' : '6px',
              left: size === 'sm' ? '8px' : size === 'md' ? '10px' : '12px',
              zIndex: 2
            }}
          />
        </div>
        
        {/* Linka text */}
        <span 
          className={`font-bold ${sizeClasses[size]} transition-all duration-300 group-hover:scale-105`}
          style={{
            background: 'linear-gradient(135deg, #ff6600 0%, #0099cc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 4px rgba(0, 153, 204, 0.2))'
          }}
        >
          Linka
        </span>
      </div>
    </Link>
  )
})
