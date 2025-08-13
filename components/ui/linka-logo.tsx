'use client';

import { useState, useEffect } from 'react';

interface LinkaLogoProps {
  size?: 'mobile' | 'desktop' | 'header' | 'footer' | 'sidebar';
  variant?: 'default' | 'sidebar' | 'header' | 'loading';
  animated?: boolean;
  className?: string;
}

// Strict size constraints based on requirements
const sizeConstraints = {
  mobile: {
    maxWidth: '20vw',
    minWidth: '60px',
    height: 'auto',
    aspectRatio: '1'
  },
  desktop: {
    maxWidth: '25%', // 25% of header width
    minWidth: '120px',
    height: 'auto',
    aspectRatio: '1'
  },
  header: {
    maxWidth: 'min(25%, 200px)',
    minWidth: '120px',
    height: 'auto',
    aspectRatio: '1'
  },
  sidebar: {
    maxWidth: '100%',
    minWidth: '60px',
    maxHeight: '80px',
    aspectRatio: '1'
  },
  footer: {
    maxWidth: '150px',
    minWidth: '80px',
    height: 'auto',
    aspectRatio: '1'
  }
};

export default function LinkaLogo({ 
  size = 'desktop', 
  variant = 'default', 
  animated = true,
  className = '' 
}: LinkaLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use mobile size constraints on mobile devices
  const effectiveSize = isMobile && size === 'desktop' ? 'mobile' : size;
  const constraints = sizeConstraints[effectiveSize];
  
  // Official brand colors - exact HEX only
  const brandColors = {
    primary: '#0073e6',
    accent: '#FF6B00'
  };

  const logoUrl = "https://cdn.builder.io/api/v1/image/assets%2F64659d81f7594bc7853ad37ab97b2333%2Fec5b7aa408204c46a290a3d64bcb02ca?format=webp&width=800";

  return (
    <div 
      className={`
        linka-logo-container relative inline-flex items-center justify-center
        select-none overflow-hidden cursor-pointer
        ${className}
      `}
      style={{
        maxWidth: constraints.maxWidth,
        minWidth: constraints.minWidth,
        height: constraints.height,
        maxHeight: constraints.maxHeight || 'none',
        aspectRatio: constraints.aspectRatio,
        padding: '1.5rem' // Grid alignment padding
      }}
      onMouseEnter={() => animated && setIsHovered(true)}
      onMouseLeave={() => animated && setIsHovered(false)}
    >
      {/* Main Logo Container - Boundary Discipline */}
      <div 
        className={`
          relative w-full h-full flex items-center justify-center
          overflow-hidden rounded-xl
          ${variant === 'sidebar' ? 'bg-white/5' : ''}
          ${animated ? 'transition-all duration-500 ease-out' : ''}
          ${isHovered && animated ? 'scale-105' : ''}
        `}
        style={{
          aspectRatio: '1',
          maxWidth: '100%',
          maxHeight: '100%'
        }}
      >
        {/* Glassmorphism Effect - Desktop Only */}
        {!isMobile && variant !== 'loading' && (
          <div 
            className={`
              absolute inset-0 rounded-xl pointer-events-none
              ${animated ? 'transition-opacity duration-700' : ''}
              ${isHovered ? 'opacity-100' : 'opacity-75'}
            `}
            style={{
              background: `linear-gradient(135deg, ${brandColors.primary}15 0%, transparent 50%, ${brandColors.accent}15 100%)`,
              backdropFilter: 'blur(3px)',
              border: `1px solid ${brandColors.primary}20`
            }}
          />
        )}

        {/* Main Logo Image - Proportional Scaling */}
        <img 
          src={logoUrl}
          alt="Linka - Zambian E-Commerce Platform"
          className={`
            relative z-10 w-full h-full
            ${animated ? 'transition-all duration-500' : ''}
            ${isHovered && animated ? 'brightness-110' : ''}
          `}
          style={{
            objectFit: 'contain',
            objectPosition: 'center',
            maxWidth: '100%',
            maxHeight: '100%',
            aspectRatio: 'auto',
            filter: `drop-shadow(0 2px 8px ${brandColors.primary}40)`,
            background: 'transparent'
          }}
        />

        {/* Hover Animation - Orange to Blue Gradient Pulse */}
        {animated && isHovered && (
          <div 
            className="absolute inset-0 rounded-xl pointer-events-none animate-gradient-pulse"
            style={{
              background: `linear-gradient(45deg, ${brandColors.accent}30, ${brandColors.primary}30)`,
              animation: 'gradientPulse 0.5s ease-out'
            }}
          />
        )}

        {/* Loading Animation Overlay */}
        {variant === 'loading' && (
          <div 
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: `conic-gradient(from 0deg, transparent, ${brandColors.primary}50, transparent)`,
              animation: 'spin 2s linear infinite'
            }}
          />
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradientPulse {
          0% { 
            opacity: 0;
            transform: scale(1);
            background: linear-gradient(45deg, ${brandColors.accent}00, ${brandColors.primary}00);
          }
          50% { 
            opacity: 0.3;
            transform: scale(1.02);
            background: linear-gradient(45deg, ${brandColors.accent}40, ${brandColors.primary}20);
          }
          100% { 
            opacity: 0;
            transform: scale(1);
            background: linear-gradient(45deg, ${brandColors.primary}00, ${brandColors.accent}00);
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-gradient-pulse {
          animation: gradientPulse 0.5s ease-out;
        }

        /* Responsive Breakpoints - 360px to 4K */
        @media (max-width: 360px) {
          .linka-logo-container {
            min-width: 50px !important;
            max-width: 18vw !important;
          }
        }

        @media (min-width: 3840px) {
          .linka-logo-container {
            max-width: 300px !important;
          }
        }

        /* Boundary enforcement */
        .linka-logo-container * {
          box-sizing: border-box;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

// Loading Spinner Variant
export function LinkaLogoSpinner({ size = 'desktop' }: { size?: LinkaLogoProps['size'] }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <LinkaLogo 
        size={size} 
        variant="loading" 
        animated={true}
        className="animate-pulse"
      />
      <div className="text-sm text-slate-600 font-medium animate-pulse">
        Loading...
      </div>
    </div>
  );
}

// Favicon/Small Icon Variant  
export function LinkaIcon({ className = '' }: { className?: string }) {
  return (
    <LinkaLogo 
      size="mobile" 
      variant="default" 
      animated={false}
      className={className}
    />
  );
}
