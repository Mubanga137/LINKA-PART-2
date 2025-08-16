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
        {/* Chain link icon - exactly matching reference image */}
        <div className="relative">
          <svg
            width={size === 'sm' ? '32' : size === 'md' ? '40' : '48'}
            height={size === 'sm' ? '32' : size === 'md' ? '40' : '48'}
            viewBox="0 0 100 100"
            className="transition-transform duration-300 group-hover:scale-110"
          >
            {/* Blue chain link - bottom layer, angled bottom-left to top-right */}
            <g transform="rotate(45 50 50)">
              <path
                d="M20 35
                   C12 35, 5 42, 5 50
                   C5 58, 12 65, 20 65
                   L80 65
                   C88 65, 95 58, 95 50
                   C95 42, 88 35, 80 35
                   Z
                   M35 45
                   L65 45
                   C70 45, 70 50, 65 55
                   L35 55
                   C30 55, 30 50, 35 45
                   Z"
                fill="#1976d2"
              />
            </g>

            {/* Orange chain link - top layer, angled top-left to bottom-right */}
            <g transform="rotate(-45 50 50)">
              <path
                d="M20 35
                   C12 35, 5 42, 5 50
                   C5 58, 12 65, 20 65
                   L80 65
                   C88 65, 95 58, 95 50
                   C95 42, 88 35, 80 35
                   Z
                   M35 45
                   L65 45
                   C70 45, 70 50, 65 55
                   L35 55
                   C30 55, 30 50, 35 45
                   Z"
                fill="#ff6600"
              />
            </g>
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
