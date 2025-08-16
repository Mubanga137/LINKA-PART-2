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
            viewBox="0 0 120 120"
            className="transition-transform duration-300 group-hover:scale-110"
          >
            <defs>
              {/* Orange gradient for top link */}
              <linearGradient id="orangeChainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b35" />
                <stop offset="50%" stopColor="#ff5722" />
                <stop offset="100%" stopColor="#e64a19" />
              </linearGradient>

              {/* Blue gradient for bottom link */}
              <linearGradient id="blueChainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2196f3" />
                <stop offset="50%" stopColor="#1976d2" />
                <stop offset="100%" stopColor="#0d47a1" />
              </linearGradient>
            </defs>

            {/* Top chain link - Orange, positioned diagonally */}
            <g transform="rotate(-35 60 40)">
              <path
                d="M30 30
                   C20 30, 15 35, 15 45
                   C15 55, 20 60, 30 60
                   L60 60
                   C70 60, 75 55, 75 45
                   C75 35, 70 30, 60 30
                   L45 30

                   M45 40
                   L60 40
                   C65 40, 65 45, 60 50
                   L45 50
                   C40 50, 40 45, 45 40 Z"
                fill="url(#orangeChainGradient)"
                stroke="none"
              />
            </g>

            {/* Bottom chain link - Blue, positioned diagonally and interlocked */}
            <g transform="rotate(35 60 80)">
              <path
                d="M30 70
                   C20 70, 15 75, 15 85
                   C15 95, 20 100, 30 100
                   L60 100
                   C70 100, 75 95, 75 85
                   C75 75, 70 70, 60 70
                   L45 70

                   M45 80
                   L60 80
                   C65 80, 65 85, 60 90
                   L45 90
                   C40 90, 40 85, 45 80 Z"
                fill="url(#blueChainGradient)"
                stroke="none"
              />
            </g>

            {/* Highlight effects for premium look */}
            <g transform="rotate(-35 60 40)">
              <ellipse
                cx="52"
                cy="37"
                rx="12"
                ry="4"
                fill="rgba(255, 255, 255, 0.3)"
              />
            </g>

            <g transform="rotate(35 60 80)">
              <ellipse
                cx="52"
                cy="77"
                rx="12"
                ry="4"
                fill="rgba(255, 255, 255, 0.3)"
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
