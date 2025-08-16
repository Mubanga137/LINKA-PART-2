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
        {/* Chain link icon - properly interlocked like real chain */}
        <div className="relative">
          <svg
            width={size === 'sm' ? '32' : size === 'md' ? '40' : '48'}
            height={size === 'sm' ? '32' : size === 'md' ? '40' : '48'}
            viewBox="0 0 100 100"
            className="transition-transform duration-300 group-hover:scale-110"
          >
            <defs>
              <mask id="orangeLinkMask">
                <rect width="100" height="100" fill="white"/>
                {/* Cut out hole where blue link passes through */}
                <ellipse cx="50" cy="50" rx="12" ry="8" fill="black" transform="rotate(30 50 50)"/>
              </mask>
            </defs>

            {/* Blue chain link - goes through the orange link (behind/through) */}
            <g transform="rotate(30 50 50)">
              <path
                d="M25 40
                   C15 40, 10 45, 10 55
                   C10 65, 15 70, 25 70
                   L75 70
                   C85 70, 90 65, 90 55
                   C90 45, 85 40, 75 40
                   Z

                   M38 50
                   L62 50
                   C67 50, 67 55, 62 60
                   L38 60
                   C33 60, 33 55, 38 50
                   Z"
                fill="#1976d2"
              />
            </g>

            {/* Orange chain link - on top, with hole cut out for blue link */}
            <g transform="rotate(-30 50 50)" mask="url(#orangeLinkMask)">
              <path
                d="M25 40
                   C15 40, 10 45, 10 55
                   C10 65, 15 70, 25 70
                   L75 70
                   C85 70, 90 65, 90 55
                   C90 45, 85 40, 75 40
                   Z

                   M38 50
                   L62 50
                   C67 50, 67 55, 62 60
                   L38 60
                   C33 60, 33 55, 38 50
                   Z"
                fill="#ff6b35"
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
