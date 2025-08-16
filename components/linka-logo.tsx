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
        {/* Chain link icon - clean SVG design */}
        <svg
          width={size === 'sm' ? '32' : size === 'md' ? '40' : '48'}
          height={size === 'sm' ? '32' : size === 'md' ? '40' : '48'}
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-110"
        >
          {/* Blue Link */}
          <g transform="rotate(-45 100 100)">
            <rect
              x="50"
              y="85"
              width="100"
              height="30"
              rx="15"
              ry="15"
              fill="none"
              stroke="#1976d2"
              strokeWidth="12"
            />
          </g>

          {/* Orange Link */}
          <g transform="rotate(45 100 100)">
            <rect
              x="50"
              y="85"
              width="100"
              height="30"
              rx="15"
              ry="15"
              fill="none"
              stroke="#f57c00"
              strokeWidth="12"
            />
          </g>
        </svg>
        
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
