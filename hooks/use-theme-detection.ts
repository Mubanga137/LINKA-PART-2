/**
 * Theme Detection Hook for Linka Logo System
 * Provides intelligent background theme detection and adaptation
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export type ThemeMode = 'light' | 'dark' | 'custom';
export type ContrastLevel = 'low' | 'medium' | 'high';

interface ThemeAnalysis {
  mode: ThemeMode;
  dominantColor: string | null;
  contrastLevel: ContrastLevel;
  backgroundColors: string[];
  needsOutline: boolean;
  accessibility: {
    contrastRatio: number;
    wcagCompliant: boolean;
    highContrastMode: boolean;
  };
}

interface UseThemeDetectionOptions {
  forceTheme?: 'light' | 'dark' | 'auto';
  watchParents?: boolean;
  debounceMs?: number;
  enableMutationObserver?: boolean;
}

/**
 * Hook for detecting and analyzing background themes
 */
export function useThemeDetection(
  elementRef: React.RefObject<HTMLElement>,
  options: UseThemeDetectionOptions = {}
): ThemeAnalysis {
  const {
    forceTheme = 'auto',
    watchParents = true,
    debounceMs = 100,
    enableMutationObserver = true
  } = options;

  const [themeAnalysis, setThemeAnalysis] = useState<ThemeAnalysis>({
    mode: 'light',
    dominantColor: null,
    contrastLevel: 'medium',
    backgroundColors: [],
    needsOutline: false,
    accessibility: {
      contrastRatio: 4.5,
      wcagCompliant: true,
      highContrastMode: false
    }
  });

  const analysisTimeoutRef = useRef<NodeJS.Timeout>();
  const mutationObserverRef = useRef<MutationObserver>();

  /**
   * Analyze background colors and determine theme
   */
  const analyzeTheme = useCallback(() => {
    if (!elementRef.current) return;

    // Clear any pending analysis
    if (analysisTimeoutRef.current) {
      clearTimeout(analysisTimeoutRef.current);
    }

    analysisTimeoutRef.current = setTimeout(() => {
      const element = elementRef.current;
      if (!element) return;

      // Forced theme override
      if (forceTheme !== 'auto') {
        setThemeAnalysis(prev => ({
          ...prev,
          mode: forceTheme as ThemeMode,
          accessibility: {
            ...prev.accessibility,
            wcagCompliant: true
          }
        }));
        return;
      }

      // Collect background information
      const backgroundAnalysis = collectBackgroundInfo(element, watchParents);
      
      // Analyze colors and determine theme
      const themeMode = determineThemeMode(backgroundAnalysis.colors);
      const dominantColor = extractDominantColor(backgroundAnalysis.colors);
      const contrastLevel = calculateContrastLevel(backgroundAnalysis.colors);
      
      // Calculate accessibility metrics
      const accessibility = calculateAccessibility(backgroundAnalysis.colors, themeMode);
      
      // Determine if outline is needed for contrast
      const needsOutline = accessibility.contrastRatio < 3.0;

      setThemeAnalysis({
        mode: themeMode,
        dominantColor,
        contrastLevel,
        backgroundColors: backgroundAnalysis.colors,
        needsOutline,
        accessibility
      });
    }, debounceMs);
  }, [elementRef, forceTheme, watchParents, debounceMs]);

  /**
   * Set up theme detection and observers
   */
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Initial analysis
    analyzeTheme();

    // System theme preference listener
    const mediaQueryDark = window.matchMedia('(prefers-color-scheme: dark)');
    const mediaQueryContrast = window.matchMedia('(prefers-contrast: high)');
    
    const handleSystemThemeChange = () => {
      analyzeTheme();
    };

    mediaQueryDark.addEventListener('change', handleSystemThemeChange);
    mediaQueryContrast.addEventListener('change', handleSystemThemeChange);

    // Mutation observer for theme changes
    if (enableMutationObserver) {
      mutationObserverRef.current = new MutationObserver((mutations) => {
        const shouldReanalyze = mutations.some(mutation => {
          if (mutation.type === 'attributes') {
            const attributeName = mutation.attributeName;
            return attributeName === 'class' || 
                   attributeName === 'style' || 
                   attributeName === 'data-theme' ||
                   attributeName?.startsWith('data-');
          }
          return false;
        });

        if (shouldReanalyze) {
          analyzeTheme();
        }
      });

      // Observe element and optionally its parents
      mutationObserverRef.current.observe(element, {
        attributes: true,
        attributeFilter: ['class', 'style', 'data-theme'],
        subtree: false
      });

      if (watchParents) {
        let parent = element.parentElement;
        let depth = 0;
        while (parent && depth < 5) {
          mutationObserverRef.current.observe(parent, {
            attributes: true,
            attributeFilter: ['class', 'style', 'data-theme'],
            subtree: false
          });
          parent = parent.parentElement;
          depth++;
        }
      }
    }

    // Resize listener for responsive theme changes
    const handleResize = () => {
      analyzeTheme();
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (analysisTimeoutRef.current) {
        clearTimeout(analysisTimeoutRef.current);
      }
      
      if (mutationObserverRef.current) {
        mutationObserverRef.current.disconnect();
      }

      mediaQueryDark.removeEventListener('change', handleSystemThemeChange);
      mediaQueryContrast.removeEventListener('change', handleSystemThemeChange);
      window.removeEventListener('resize', handleResize);
    };
  }, [analyzeTheme, enableMutationObserver, watchParents]);

  return themeAnalysis;
}

/**
 * Collect background color information from element hierarchy
 */
function collectBackgroundInfo(element: HTMLElement, watchParents: boolean) {
  const colors: string[] = [];
  const gradients: string[] = [];
  let currentElement: Element | null = element;
  let depth = 0;
  const maxDepth = watchParents ? 8 : 1;

  while (currentElement && depth < maxDepth) {
    const computedStyle = getComputedStyle(currentElement);
    
    // Check for explicit theme data attribute
    const explicitTheme = currentElement.getAttribute('data-theme');
    if (explicitTheme) {
      return { colors: [explicitTheme], gradients: [], explicitTheme };
    }

    // Collect background colors
    const bgColor = computedStyle.backgroundColor;
    if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
      colors.push(bgColor);
    }

    // Collect background images (gradients)
    const bgImage = computedStyle.backgroundImage;
    if (bgImage && bgImage !== 'none' && bgImage.includes('gradient')) {
      gradients.push(bgImage);
    }

    currentElement = currentElement.parentElement;
    depth++;
  }

  return { colors: [...colors, ...gradients], gradients, explicitTheme: null };
}

/**
 * Determine theme mode from background colors
 */
function determineThemeMode(colors: string[]): ThemeMode {
  if (colors.length === 0) {
    // Fallback to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  const brightnesses = colors.map(getColorBrightness).filter(b => b !== -1);
  
  if (brightnesses.length === 0) {
    return 'light'; // Default fallback
  }

  const avgBrightness = brightnesses.reduce((sum, b) => sum + b, 0) / brightnesses.length;
  
  if (avgBrightness < 0.25) return 'dark';
  if (avgBrightness > 0.75) return 'light';
  return 'custom';
}

/**
 * Calculate color brightness (0-1 scale)
 */
function getColorBrightness(color: string): number {
  // Handle rgba/rgb colors
  const rgbaMatch = color.match(/rgba?\(([^)]+)\)/);
  if (rgbaMatch) {
    const values = rgbaMatch[1].split(',').map(v => parseFloat(v.trim()));
    if (values.length >= 3) {
      const [r, g, b] = values;
      return (r * 0.299 + g * 0.587 + b * 0.114) / 255;
    }
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

  // Handle named colors
  const namedColors: Record<string, number> = {
    'white': 1,
    'black': 0,
    'gray': 0.5,
    'grey': 0.5,
    'red': 0.3,
    'blue': 0.3,
    'green': 0.5,
    'yellow': 0.9
  };

  for (const [name, brightness] of Object.entries(namedColors)) {
    if (color.toLowerCase().includes(name)) {
      return brightness;
    }
  }

  return -1; // Unknown color
}

/**
 * Extract dominant color from color array
 */
function extractDominantColor(colors: string[]): string | null {
  // Find the most saturated non-neutral color
  const colorRegex = /(#[0-9a-f]{6}|rgba?\([^)]+\))/i;
  
  for (const color of colors) {
    const match = color.match(colorRegex);
    if (match) {
      const colorValue = match[0];
      // Skip very light or very dark colors
      const brightness = getColorBrightness(colorValue);
      if (brightness > 0.2 && brightness < 0.8) {
        return colorValue;
      }
    }
  }

  return null;
}

/**
 * Calculate contrast level
 */
function calculateContrastLevel(colors: string[]): ContrastLevel {
  const brightnesses = colors.map(getColorBrightness).filter(b => b !== -1);
  
  if (brightnesses.length < 2) return 'medium';
  
  const range = Math.max(...brightnesses) - Math.min(...brightnesses);
  
  if (range < 0.3) return 'low';
  if (range > 0.7) return 'high';
  return 'medium';
}

/**
 * Calculate accessibility metrics
 */
function calculateAccessibility(colors: string[], themeMode: ThemeMode) {
  const isHighContrastMode = window.matchMedia('(prefers-contrast: high)').matches;
  
  // Simplified WCAG contrast calculation
  let contrastRatio = 4.5; // Default assumption
  
  if (themeMode === 'dark') {
    contrastRatio = 7.0; // Higher contrast for dark themes
  } else if (themeMode === 'light') {
    contrastRatio = 4.5; // Standard contrast for light themes
  } else {
    contrastRatio = 3.5; // Lower for custom themes, but should be improved
  }

  return {
    contrastRatio,
    wcagCompliant: contrastRatio >= (isHighContrastMode ? 7.0 : 4.5),
    highContrastMode: isHighContrastMode
  };
}

/**
 * Hook for getting theme-aware styles
 */
export function useThemeStyles(themeAnalysis: ThemeAnalysis) {
  return {
    primary: themeAnalysis.mode === 'dark' ? '#FF6B00' : '#0073e6',
    accent: themeAnalysis.mode === 'dark' ? '#0073e6' : '#FF6B00',
    glass: themeAnalysis.mode === 'dark' 
      ? 'rgba(255, 107, 0, 0.15)' 
      : 'rgba(0, 115, 230, 0.10)',
    outline: themeAnalysis.needsOutline 
      ? (themeAnalysis.mode === 'dark' 
          ? '0 0 0 1px rgba(255,255,255,0.3)' 
          : '0 0 0 1px rgba(0,0,0,0.2)'
        )
      : 'none',
    shadow: themeAnalysis.mode === 'dark'
      ? '0 4px 12px rgba(255, 107, 0, 0.3)'
      : '0 2px 8px rgba(0, 115, 230, 0.2)',
    filter: themeAnalysis.mode === 'dark'
      ? 'brightness(1.1) contrast(1.05)'
      : 'brightness(1.0) contrast(1.0)'
  };
}
