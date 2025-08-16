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
            width={size === 'sm' ? '28' : size === 'md' ? '36' : '44'}
            height={size === 'sm' ? '28' : size === 'md' ? '36' : '44'}
            viewBox="0 0 100 100"
            className="transition-transform duration-300 group-hover:scale-110"
          >
            <defs>
              {/* Orange gradient for top link */}
              <linearGradient id="orangeLinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff7b38" />
                <stop offset="100%" stopColor="#e55a28" />
              </linearGradient>

              {/* Blue gradient for bottom link */}
              <linearGradient id="blueLinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4a8bc2" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>

            {/* Top chain link - Orange, rotated counter-clockwise */}
            <g transform="rotate(-25 50 35)">
              <path
                d="M25 25
                   C15 25, 10 30, 10 40
                   C10 50, 15 55, 25 55
                   L45 55
                   C55 55, 60 50, 60 40
                   C60 30, 55 25, 45 25
                   L35 25

                   M35 35
                   L45 35
                   C50 35, 50 40, 45 45
                   L35 45
                   C30 45, 30 40, 35 35 Z"
                fill="url(#orangeLinkGradient)"
                stroke="none"
              />
            </g>

            {/* Bottom chain link - Blue, rotated clockwise and positioned to interlock */}
            <g transform="rotate(25 50 65)">
              <path
                d="M25 55
                   C15 55, 10 60, 10 70
                   C10 80, 15 85, 25 85
                   L45 85
                   C55 85, 60 80, 60 70
                   C60 60, 55 55, 45 55
                   L35 55

                   M35 65
                   L45 65
                   C50 65, 50 70, 45 75
                   L35 75
                   C30 75, 30 70, 35 65 Z"
                fill="url(#blueLinkGradient)"
                stroke="none"
              />
            </g>

            {/* Subtle highlight effects for premium look */}
            <g transform="rotate(-25 50 35)">
              <ellipse
                cx="40"
                cy="32"
                rx="8"
                ry="3"
                fill="rgba(255, 255, 255, 0.3)"
              />
            </g>

            <g transform="rotate(25 50 65)">
              <ellipse
                cx="40"
                cy="62"
                rx="8"
                ry="3"
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
