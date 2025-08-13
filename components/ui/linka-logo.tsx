'use client';

import { useState } from 'react';

interface LinkaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'sidebar' | 'header' | 'loading';
  animated?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-10 h-10', // Minimum 40px height for mobile
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
};

export default function LinkaLogo({ 
  size = 'md', 
  variant = 'default', 
  animated = true,
  className = '' 
}: LinkaLogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = `
    relative inline-block select-none
    ${sizeClasses[size]}
    ${className}
  `;

  const logoUrl = "https://cdn.builder.io/api/v1/image/assets%2F64659d81f7594bc7853ad37ab97b2333%2Fec5b7aa408204c46a290a3d64bcb02ca?format=webp&width=800";

  return (
    <div 
      className={baseClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Logo Container with Glassmorphism */}
      <div className={`
        relative w-full h-full rounded-xl overflow-hidden
        ${variant === 'sidebar' ? 'bg-white/10 backdrop-blur-md border border-white/20' : ''}
        ${variant === 'header' ? 'bg-slate-900/5 backdrop-blur-sm' : ''}
        ${animated ? 'transition-all duration-500 ease-out' : ''}
        ${isHovered && animated ? 'scale-110 rotate-2' : ''}
      `}>
        
        {/* Glassmorphism Background Overlay - Official Colors */}
        <div className={`
          absolute inset-0 rounded-xl
          ${variant === 'sidebar'
            ? 'bg-gradient-to-br from-blue-500/15 via-blue-600/8 to-orange-500/15'
            : 'bg-gradient-to-br from-blue-500/5 via-transparent to-orange-500/5'
          }
          ${animated ? 'transition-opacity duration-700' : ''}
          ${isHovered ? 'opacity-100' : 'opacity-60'}
        `} />

        {/* Main Logo Image */}
        <img 
          src={logoUrl}
          alt="Linka - Zambian E-Commerce Platform"
          className={`
            relative z-10 w-full h-full object-contain
            ${animated ? 'transition-all duration-500' : ''}
            ${isHovered && animated ? 'brightness-110 saturate-110' : ''}
          `}
          style={{
            filter: variant === 'sidebar'
              ? 'drop-shadow(0 4px 8px rgba(0, 115, 230, 0.3))'
              : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
          }}
        />

        {/* Animated Shimmer Effect */}
        {animated && (
          <div className={`
            absolute inset-0 rounded-xl
            bg-gradient-to-r from-transparent via-white/30 to-transparent
            transform -skew-x-12
            ${variant === 'loading' ? 'animate-shimmer-continuous' : ''}
            ${isHovered ? 'animate-shimmer' : 'translate-x-[-200%]'}
          `} />
        )}

        {/* Subtle Inner Glow */}
        <div className={`
          absolute inset-0 rounded-xl
          shadow-inner
          ${variant === 'sidebar'
            ? 'shadow-blue-500/20'
            : 'shadow-blue-500/10'
          }
          ${animated ? 'transition-all duration-500' : ''}
          ${isHovered ? 'shadow-lg' : ''}
        `} />

        {/* Pulsing Brand Colors Animation */}
        {animated && variant !== 'header' && (
          <div className={`
            absolute inset-0 rounded-xl pointer-events-none
            ${variant === 'loading' ? 'animate-pulse-brand' : ''}
          `}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-orange-500/20 rounded-xl animate-pulse-slow" />
          </div>
        )}

        {/* Hover Glow Effect */}
        {isHovered && animated && (
          <div className={`
            absolute -inset-1 rounded-xl
            bg-gradient-to-r from-blue-500/30 via-blue-600/30 to-orange-500/30
            blur-sm -z-10
            animate-glow-pulse
          `} />
        )}
      </div>

      {/* Remove redundant text label - logo is self-explanatory */}

      {/* Custom Animations Styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-200%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }

        @keyframes shimmer-continuous {
          0% { transform: translateX(-200%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }

        @keyframes pulse-brand {
          0%, 100% {
            background: linear-gradient(45deg, rgba(0, 115, 230, 0.1), rgba(255, 107, 0, 0.1));
            transform: scale(1);
          }
          50% {
            background: linear-gradient(45deg, rgba(0, 115, 230, 0.2), rgba(255, 107, 0, 0.15));
            transform: scale(1.02);
          }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        @keyframes glow-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        .animate-shimmer {
          animation: shimmer 0.8s ease-out;
        }

        .animate-shimmer-continuous {
          animation: shimmer-continuous 2s ease-in-out infinite;
        }

        .animate-pulse-brand {
          animation: pulse-brand 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-glow-pulse {
          animation: glow-pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Loading Spinner Variant
export function LinkaLogoSpinner({ size = 'lg' }: { size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <LinkaLogo 
        size={size} 
        variant="loading" 
        animated={true}
        className="animate-bounce"
      />
      <div className="text-sm text-slate-600 font-medium animate-pulse">
        Loading Linka...
      </div>
    </div>
  );
}

// Favicon/Small Icon Variant
export function LinkaIcon({ className = '' }: { className?: string }) {
  return (
    <LinkaLogo 
      size="sm" 
      variant="default" 
      animated={false}
      className={className}
    />
  );
}
