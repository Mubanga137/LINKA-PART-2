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
        {/* Linka logo image */}
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fff70a9d1d4c94f05abf49c16f38a3166%2Fc1466dbe53ca47d2aa868423f1920755?format=webp&width=800"
          alt="Linka Logo"
          width={size === 'sm' ? '32' : size === 'md' ? '40' : '48'}
          height={size === 'sm' ? '32' : size === 'md' ? '40' : '48'}
          className="transition-transform duration-300 group-hover:scale-110"
          style={{
            objectFit: 'contain',
            background: 'transparent'
          }}
        />
        
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
