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
            viewBox="0 0 80 80"
            className="transition-transform duration-300 group-hover:scale-110"
          >
            {/* Blue chain link - bottom layer, angled bottom-left to top-right */}
            <g transform="rotate(45 40 40)">
              <rect
                x="10"
                y="30"
                width="60"
                height="20"
                rx="10"
                ry="10"
                fill="#2563eb"
              />
              <rect
                x="25"
                y="35"
                width="30"
                height="10"
                rx="5"
                ry="5"
                fill="white"
              />
            </g>

            {/* Orange chain link - top layer, angled top-left to bottom-right */}
            <g transform="rotate(-45 40 40)">
              <rect
                x="10"
                y="30"
                width="60"
                height="20"
                rx="10"
                ry="10"
                fill="#ff5722"
              />
              <rect
                x="25"
                y="35"
                width="30"
                height="10"
                rx="5"
                ry="5"
                fill="white"
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
