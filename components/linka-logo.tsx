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
        {/* Chain link icon with exact original design */}
        <div className="relative">
          <svg 
            width={size === 'sm' ? '24' : size === 'md' ? '32' : '40'} 
            height={size === 'sm' ? '24' : size === 'md' ? '32' : '40'} 
            viewBox="0 0 32 32" 
            className="transition-transform duration-300 group-hover:scale-110"
          >
            {/* Top chain link - solid orange */}
            <path
              d="M8 6 C4 6, 2 8, 2 12 C2 16, 4 18, 8 18 L12 18 C14 18, 15 17, 15 15 C15 13, 14 12, 12 12 L8 12 C7 12, 6 11, 6 10 C6 9, 7 8, 8 8 L12 8 C13 8, 14 9, 14 10"
              fill="none"
              stroke="#ff6600"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 6 C4 6, 2 8, 2 12 C2 16, 4 18, 8 18 L12 18 C14 18, 15 17, 15 15 C15 13, 14 12, 12 12 L8 12 C7 12, 6 11, 6 10 C6 9, 7 8, 8 8 L12 8 C13 8, 14 9, 14 10"
              fill="#ff6600"
              fillOpacity="0.15"
            />
            
            {/* Bottom chain link - solid blue */}
            <path
              d="M20 14 C24 14, 26 16, 26 20 C26 24, 24 26, 20 26 L16 26 C14 26, 13 25, 13 23 C13 21, 14 20, 16 20 L20 20 C21 20, 22 19, 22 18 C22 17, 21 16, 20 16 L16 16 C15 16, 14 17, 14 18"
              fill="none"
              stroke="#0099cc"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 14 C24 14, 26 16, 26 20 C26 24, 24 26, 20 26 L16 26 C14 26, 13 25, 13 23 C13 21, 14 20, 16 20 L20 20 C21 20, 22 19, 22 18 C22 17, 21 16, 20 16 L16 16 C15 16, 14 17, 14 18"
              fill="#0099cc"
              fillOpacity="0.15"
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
