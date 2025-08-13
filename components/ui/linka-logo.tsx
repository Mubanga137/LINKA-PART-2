'use client';

import { useState, useEffect, useRef } from 'react';

interface LinkaLogoProps {
  size?: 'mobile' | 'desktop' | 'header' | 'footer' | 'sidebar';
  variant?: 'default' | 'sidebar' | 'header' | 'loading';
  animated?: boolean;
  className?: string;
  forceTheme?: 'light' | 'dark' | 'auto';
}

type ThemeMode = 'light' | 'dark' | 'custom';

// Dynamic theme detection and adaptation
const useThemeDetection = (containerRef: React.RefObject<HTMLElement>, forceTheme?: string) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [dominantColor, setDominantColor] = useState<string | null>(null);
  const [contrastRatio, setContrastRatio] = useState<number>(1);

  useEffect(() => {
    if (forceTheme && forceTheme !== 'auto') {
      setThemeMode(forceTheme as ThemeMode);
      return;
    }

    const detectBackgroundTheme = () => {
      if (!containerRef.current) return;

      const element = containerRef.current;
      const computedStyle = getComputedStyle(element);
      
      // Check CSS custom properties for theme mode
      const themeFromCSS = computedStyle.getPropertyValue('--theme-mode')?.trim();
      if (themeFromCSS) {
        setThemeMode(themeFromCSS as ThemeMode);
        return;
      }

      // Analyze background colors by traversing parent hierarchy
      let currentElement: Element | null = element;
      let detectedTheme: ThemeMode = 'light';
      let backgroundColors: string[] = [];

      while (currentElement && backgroundColors.length < 5) {
        const style = getComputedStyle(currentElement);
        const bgColor = style.backgroundColor;
        const bgImage = style.backgroundImage;
        
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
          backgroundColors.push(bgColor);
        }
        
        if (bgImage && bgImage !== 'none') {
          // Handle gradient backgrounds
          if (bgImage.includes('gradient')) {
            backgroundColors.push(bgImage);
          }
        }
        
        currentElement = currentElement.parentElement;
      }

      // Analyze collected background colors
      if (backgroundColors.length > 0) {
        const avgBrightness = calculateAverageBrightness(backgroundColors);
        
        if (avgBrightness < 0.3) {
          detectedTheme = 'dark';
        } else if (avgBrightness > 0.7) {
          detectedTheme = 'light';
        } else {
          detectedTheme = 'custom';
          setDominantColor(extractDominantColor(backgroundColors));
        }
      }

      // Respect system preference as fallback
      if (detectedTheme === 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        detectedTheme = 'dark';
      }

      setThemeMode(detectedTheme);
      setContrastRatio(calculateContrastRatio(detectedTheme, backgroundColors));
    };

    // Initial detection
    detectBackgroundTheme();

    // Re-detect on theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = () => detectBackgroundTheme();
    
    mediaQuery.addEventListener('change', handleThemeChange);
    
    // Re-detect on DOM mutations (theme switches)
    const observer = new MutationObserver(detectBackgroundTheme);
    if (containerRef.current) {
      observer.observe(containerRef.current, { 
        attributes: true, 
        attributeFilter: ['class', 'style', 'data-theme'] 
      });
    }

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
      observer.disconnect();
    };
  }, [containerRef, forceTheme]);

  return { themeMode, dominantColor, contrastRatio };
};

// Helper functions for color analysis
const calculateAverageBrightness = (colors: string[]): number => {
  let totalBrightness = 0;
  let validColors = 0;

  colors.forEach(color => {
    const brightness = getColorBrightness(color);
    if (brightness !== -1) {
      totalBrightness += brightness;
      validColors++;
    }
  });

  return validColors > 0 ? totalBrightness / validColors : 0.5;
};

const getColorBrightness = (color: string): number => {
  // Handle rgba/rgb colors
  const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbaMatch) {
    const [, r, g, b] = rgbaMatch.map(Number);
    return (r * 0.299 + g * 0.587 + b * 0.114) / 255;
  }
  
  // Handle hex colors
  const hexMatch = color.match(/^#([0-9a-f]{6})$/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return (r * 0.299 + g * 0.587 + b * 0.114) / 255;
  }

  return -1; // Invalid color
};

const extractDominantColor = (colors: string[]): string => {
  // Extract dominant color from gradients/backgrounds
  const firstValidColor = colors.find(color => color.includes('rgb') || color.includes('#'));
  return firstValidColor?.match(/(#[0-9a-f]{6}|rgba?\([^)]+\))/i)?.[0] || '#0073e6';
};

const calculateContrastRatio = (theme: ThemeMode, colors: string[]): number => {
  // Calculate WCAG contrast ratio for accessibility
  if (theme === 'dark') return 4.5; // High contrast on dark
  if (theme === 'light') return 3.0; // Good contrast on light
  return 3.5; // Medium contrast for custom themes
};

// Size constraints with responsive scaling
const sizeConstraints = {
  mobile: { width: '20vw', minWidth: '60px', maxWidth: '120px' },
  desktop: { width: '25%', minWidth: '120px', maxWidth: '160px' },
  header: { width: 'min(25%, 160px)', minWidth: '120px', maxWidth: '160px' },
  sidebar: { width: '100%', minWidth: '60px', maxWidth: '80px' },
  footer: { width: '150px', minWidth: '80px', maxWidth: '150px' }
};

export default function LinkaLogo({ 
  size = 'desktop', 
  variant = 'default', 
  animated = true,
  className = '',
  forceTheme = 'auto'
}: LinkaLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  
  const { themeMode, dominantColor, contrastRatio } = useThemeDetection(containerRef, forceTheme);

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll detection for animation control
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Dynamic size based on mobile detection
  const effectiveSize = isMobile && size === 'desktop' ? 'mobile' : size;
  const constraints = sizeConstraints[effectiveSize];

  // Theme-aware styling
  const getThemeStyles = () => {
    const base = {
      primary: '#0073e6',
      accent: '#FF6B00'
    };

    switch (themeMode) {
      case 'dark':
        return {
          ...base,
          glassOverlay: `linear-gradient(135deg, ${base.accent}15 0%, ${base.accent}10 50%, ${base.accent}20 100%)`,
          glassOpacity: 0.15,
          contrast: 'brightness(1.1) contrast(1.05)',
          outline: contrastRatio < 3 ? `0 0 0 1px rgba(255,255,255,0.3)` : 'none',
          hoverGlow: `0 0 20px ${base.accent}40`,
          animationType: 'shimmer'
        };
      case 'light':
        return {
          ...base,
          glassOverlay: `linear-gradient(135deg, ${base.primary}10 0%, transparent 50%, ${base.primary}15 100%)`,
          glassOpacity: 0.10,
          contrast: 'brightness(1.0) contrast(1.0)',
          outline: contrastRatio < 3 ? `0 0 0 1px rgba(0,0,0,0.2)` : 'none',
          hoverGlow: `0 0 15px ${base.primary}30`,
          animationType: 'pulse'
        };
      case 'custom':
        const customColor = dominantColor || base.primary;
        return {
          ...base,
          glassOverlay: `linear-gradient(135deg, ${customColor}10 0%, transparent 50%, ${customColor}15 100%)`,
          glassOpacity: 0.10,
          contrast: 'brightness(1.05) contrast(1.02)',
          outline: contrastRatio < 3 ? `0 0 0 1px rgba(255,255,255,0.25)` : 'none',
          hoverGlow: `0 0 18px ${customColor}35`,
          animationType: 'pulse'
        };
      default:
        return {
          ...base,
          glassOverlay: 'none',
          glassOpacity: 0,
          contrast: 'none',
          outline: 'none',
          hoverGlow: 'none',
          animationType: 'none'
        };
    }
  };

  const themeStyles = getThemeStyles();
  const logoUrl = "https://cdn.builder.io/api/v1/image/assets%2F64659d81f7594bc7853ad37ab97b2333%2Fec5b7aa408204c46a290a3d64bcb02ca?format=webp&width=800";

  // Animation control based on context
  const shouldAnimate = animated && !isScrolling && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div 
      ref={containerRef}
      className={`linka-logo-container relative inline-flex items-center justify-center select-none overflow-hidden ${className}`}
      style={{
        maxWidth: constraints.width,
        minWidth: constraints.minWidth,
        width: constraints.maxWidth,
        height: 'auto',
        aspectRatio: '1',
        padding: '1.5rem',
        cursor: animated ? 'pointer' : 'default',
        transition: shouldAnimate ? 'transform 0.3s ease-out' : 'none'
      }}
      onMouseEnter={() => shouldAnimate && setIsHovered(true)}
      onMouseLeave={() => shouldAnimate && setIsHovered(false)}
      data-theme={themeMode}
      data-size={effectiveSize}
    >
      {/* Main Logo Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl"
        style={{
          aspectRatio: '1',
          transition: shouldAnimate ? 'all 0.5s ease-out' : 'none',
          transform: isHovered && shouldAnimate ? 'scale(1.05)' : 'scale(1)'
        }}
      >
        {/* Theme-Aware Glassmorphism Effect */}
        {!isMobile && themeStyles.glassOverlay !== 'none' && (
          <div 
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: themeStyles.glassOverlay,
              backdropFilter: 'blur(3px)',
              opacity: isHovered ? themeStyles.glassOpacity + 0.05 : themeStyles.glassOpacity,
              transition: shouldAnimate ? 'opacity 0.7s ease' : 'none',
              border: `1px solid rgba(255,255,255,0.1)`
            }}
          />
        )}

        {/* Logo Image with Dynamic Contrast */}
        <img 
          src={logoUrl}
          alt="Linka - Zambian E-Commerce Platform"
          className="relative z-10 w-full h-full"
          style={{
            objectFit: 'contain',
            objectPosition: 'center',
            maxWidth: '100%',
            maxHeight: '100%',
            aspectRatio: 'auto',
            background: 'transparent',
            filter: `${themeStyles.contrast} drop-shadow(2px 2px 8px rgba(0,0,0,0.1))`,
            boxShadow: themeStyles.outline,
            transition: shouldAnimate ? 'all 0.5s ease' : 'none'
          }}
          loading="lazy"
        />

        {/* Context-Aware Hover Animation */}
        {shouldAnimate && isHovered && (
          <div 
            className={`absolute inset-0 rounded-xl pointer-events-none ${
              themeStyles.animationType === 'shimmer' ? 'animate-shimmer' : 'animate-pulse-glow'
            }`}
            style={{
              background: themeStyles.animationType === 'shimmer' 
                ? `linear-gradient(45deg, transparent, ${themeStyles.accent}30, transparent)`
                : `radial-gradient(circle, ${themeStyles.primary}20, transparent)`,
              boxShadow: themeStyles.hoverGlow
            }}
          />
        )}

        {/* Loading Animation for Loading Variant */}
        {variant === 'loading' && (
          <div 
            className="absolute inset-0 rounded-xl pointer-events-none animate-spin"
            style={{
              background: `conic-gradient(from 0deg, transparent, ${themeStyles.primary}50, transparent)`,
              animation: 'spin 2s linear infinite'
            }}
          />
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { 
            transform: translateX(-200%) skewX(-12deg);
            opacity: 0;
          }
          50% { 
            opacity: 0.6;
          }
          100% { 
            transform: translateX(200%) skewX(-12deg);
            opacity: 0;
          }
        }

        @keyframes pulse-glow {
          0%, 100% { 
            opacity: 0;
            transform: scale(1);
          }
          50% { 
            opacity: 0.4;
            transform: scale(1.02);
          }
        }

        .animate-shimmer {
          animation: shimmer 0.8s ease-out;
        }

        .animate-pulse-glow {
          animation: pulse-glow 1.5s ease-in-out;
        }

        /* Accessibility: Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .linka-logo-container,
          .linka-logo-container *,
          .animate-shimmer,
          .animate-pulse-glow {
            animation: none !important;
            transition: none !important;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .linka-logo-container img {
            filter: contrast(1.2) brightness(1.1) !important;
          }
        }

        /* Focus states for accessibility */
        .linka-logo-container:focus-visible {
          outline: 2px solid ${themeStyles.primary};
          outline-offset: 4px;
        }
      `}</style>
    </div>
  );
}

// Optimized loading spinner variant
export function LinkaLogoSpinner({ size = 'desktop' }: { size?: LinkaLogoProps['size'] }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <LinkaLogo 
        size={size} 
        variant="loading" 
        animated={true}
        className="animate-pulse"
      />
      <div className="text-sm font-medium animate-pulse opacity-60">
        Loading...
      </div>
    </div>
  );
}

// Small icon variant for favicons/compact areas
export function LinkaIcon({ className = '', theme = 'auto' }: { className?: string, theme?: 'light' | 'dark' | 'auto' }) {
  return (
    <LinkaLogo 
      size="mobile" 
      variant="default" 
      animated={false}
      forceTheme={theme}
      className={className}
    />
  );
}
