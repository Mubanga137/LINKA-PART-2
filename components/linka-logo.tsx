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
        {/* Chain link icon - exact recreation of reference image */}
        <div className="relative">
          <svg
            width={size === 'sm' ? '32' : size === 'md' ? '40' : '48'}
            height={size === 'sm' ? '32' : size === 'md' ? '40' : '48'}
            viewBox="0 0 100 100"
            className="transition-transform duration-300 group-hover:scale-110"
          >
            {/* Top orange chain link - positioned diagonally */}
            <path
              d="M20 15
                 C10 15, 5 25, 5 35
                 C5 45, 10 55, 20 55
                 L55 55
                 C65 55, 70 45, 70 35
                 C70 25, 65 15, 55 15
                 Z

                 M35 25
                 L55 25
                 C60 25, 60 35, 55 45
                 L35 45
                 C30 45, 30 35, 35 25
                 Z"
              fill="#ff6b35"
              transform="rotate(-30 37.5 35)"
            />

            {/* Bottom blue chain link - positioned diagonally from bottom-left to top-right */}
            <path
              d="M20 35
                 C10 35, 5 45, 5 55
                 C5 65, 10 75, 20 75
                 L55 75
                 C65 75, 70 65, 70 55
                 C70 45, 65 35, 55 35
                 Z

                 M35 45
                 L55 45
                 C60 45, 60 55, 55 65
                 L35 65
                 C30 65, 30 55, 35 45
                 Z"
              fill="#1976d2"
              transform="rotate(-30 37.5 55)"
            />
          </svg>
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
