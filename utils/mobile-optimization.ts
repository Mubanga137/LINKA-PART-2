"use client";

// Device capability detection
export interface DeviceCapabilities {
  isLowEnd: boolean;
  supportsAdvancedAnimations: boolean;
  supportsHaptics: boolean;
  memoryLimit: number;
  connectionType: string;
  reduceMotion: boolean;
  supportsTouchGestures: boolean;
}

export function detectDeviceCapabilities(): DeviceCapabilities {
  if (typeof window === 'undefined') {
    return {
      isLowEnd: false,
      supportsAdvancedAnimations: true,
      supportsHaptics: false,
      memoryLimit: 4,
      connectionType: 'unknown',
      reduceMotion: false,
      supportsTouchGestures: false
    };
  }

  // Check for low-end device indicators
  const isLowEnd = checkIsLowEndDevice();
  
  // Check motion preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check device memory (if available)
  const deviceMemory = (navigator as any).deviceMemory || 4;
  
  // Check connection type
  const connection = (navigator as any).connection;
  const connectionType = connection?.effectiveType || 'unknown';
  
  // Check for haptic support
  const supportsHaptics = 'vibrate' in navigator;
  
  // Check for touch support
  const supportsTouchGestures = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Determine animation support based on device capabilities
  const supportsAdvancedAnimations = !isLowEnd && !prefersReducedMotion && deviceMemory >= 2;

  return {
    isLowEnd,
    supportsAdvancedAnimations,
    supportsHaptics,
    memoryLimit: deviceMemory,
    connectionType,
    reduceMotion: prefersReducedMotion,
    supportsTouchGestures
  };
}

function checkIsLowEndDevice(): boolean {
  // Check various indicators of low-end devices
  const userAgent = navigator.userAgent.toLowerCase();
  
  // Check for low-end Android devices
  if (userAgent.includes('android')) {
    // Very basic heuristic based on user agent
    const versionMatch = userAgent.match(/android\s([0-9\.]*)/);
    if (versionMatch) {
      const version = parseFloat(versionMatch[1]);
      if (version < 7) return true; // Older Android versions likely low-end
    }
  }
  
  // Check hardware concurrency (CPU cores)
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
    return true;
  }
  
  // Check device memory
  const deviceMemory = (navigator as any).deviceMemory;
  if (deviceMemory && deviceMemory <= 1) {
    return true;
  }
  
  // Check connection speed
  const connection = (navigator as any).connection;
  if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
    return true;
  }
  
  return false;
}

// Performance optimization settings based on device
export function getOptimizedSettings(capabilities: DeviceCapabilities) {
  return {
    // Animation settings
    enableParticleEffects: capabilities.supportsAdvancedAnimations && !capabilities.isLowEnd,
    enableComplexTransitions: capabilities.supportsAdvancedAnimations,
    animationDuration: capabilities.isLowEnd ? 0.2 : 0.4,
    staggerDelay: capabilities.isLowEnd ? 0.02 : 0.05,
    
    // Image settings
    imageQuality: capabilities.isLowEnd ? 70 : 85,
    lazyLoadThreshold: capabilities.isLowEnd ? '50px' : '100px',
    preloadCount: capabilities.isLowEnd ? 2 : 4,
    
    // Gesture settings
    enableHapticFeedback: capabilities.supportsHaptics && !capabilities.reduceMotion,
    gestureThreshold: capabilities.supportsTouchGestures ? 50 : 100,
    longPressDelay: capabilities.isLowEnd ? 600 : 500,
    
    // Layout settings
    gridItemsPerRow: {
      mobile: capabilities.isLowEnd ? 2 : 2,
      tablet: capabilities.isLowEnd ? 2 : 3,
      desktop: capabilities.isLowEnd ? 3 : 4
    }
  };
}

// Memory management utilities
export class MemoryManager {
  private static instance: MemoryManager;
  private imageCache = new Map<string, HTMLImageElement>();
  private maxCacheSize: number;
  
  private constructor() {
    const capabilities = detectDeviceCapabilities();
    this.maxCacheSize = capabilities.isLowEnd ? 10 : 25;
  }
  
  static getInstance(): MemoryManager {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
    }
    return MemoryManager.instance;
  }
  
  preloadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      if (this.imageCache.has(src)) {
        resolve(this.imageCache.get(src)!);
        return;
      }
      
      const img = new Image();
      img.onload = () => {
        this.addToCache(src, img);
        resolve(img);
      };
      img.onerror = reject;
      img.src = src;
    });
  }
  
  private addToCache(src: string, img: HTMLImageElement) {
    if (this.imageCache.size >= this.maxCacheSize) {
      const firstKey = this.imageCache.keys().next().value;
      this.imageCache.delete(firstKey);
    }
    this.imageCache.set(src, img);
  }
  
  clearCache() {
    this.imageCache.clear();
  }
  
  getCacheSize() {
    return this.imageCache.size;
  }
}

// Performance monitoring
export class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = 0;
  private fps = 60;
  private isMonitoring = false;
  
  startMonitoring(onUpdate?: (fps: number) => void) {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    const monitor = (timestamp: number) => {
      if (this.lastTime) {
        this.frameCount++;
        const delta = timestamp - this.lastTime;
        
        if (delta >= 1000) {
          this.fps = Math.round((this.frameCount * 1000) / delta);
          this.frameCount = 0;
          this.lastTime = timestamp;
          onUpdate?.(this.fps);
        }
      } else {
        this.lastTime = timestamp;
      }
      
      if (this.isMonitoring) {
        requestAnimationFrame(monitor);
      }
    };
    
    requestAnimationFrame(monitor);
  }
  
  stopMonitoring() {
    this.isMonitoring = false;
  }
  
  getFPS() {
    return this.fps;
  }
  
  isPerformancePoor() {
    return this.fps < 30;
  }
}

// Optimized animation variants for different device capabilities
export function getAnimationVariants(capabilities: DeviceCapabilities) {
  const duration = capabilities.isLowEnd ? 0.2 : 0.4;
  const easing = capabilities.isLowEnd ? "easeOut" : "easeInOut";
  
  return {
    cardEntry: {
      hidden: { 
        opacity: 0, 
        y: capabilities.isLowEnd ? 10 : 20,
        scale: capabilities.isLowEnd ? 1 : 0.95
      },
      visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: { duration, ease: easing }
      }
    },
    cardHover: capabilities.supportsAdvancedAnimations ? {
      scale: 1.02,
      y: -4,
      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
      transition: { duration: 0.2 }
    } : {},
    buttonPress: {
      scale: capabilities.isLowEnd ? 0.98 : 0.95,
      transition: { duration: 0.1 }
    },
    modalEntry: {
      hidden: { 
        opacity: 0, 
        scale: capabilities.isLowEnd ? 1 : 0.9,
        y: capabilities.isLowEnd ? 10 : 0
      },
      visible: { 
        opacity: 1, 
        scale: 1,
        y: 0,
        transition: { duration, ease: easing }
      }
    }
  };
}

// Touch gesture optimization
export function getOptimizedGestureConfig(capabilities: DeviceCapabilities) {
  return {
    swipeThreshold: capabilities.isLowEnd ? 60 : 50,
    longPressDelay: capabilities.isLowEnd ? 600 : 500,
    tapTimeout: capabilities.isLowEnd ? 250 : 200,
    velocityThreshold: capabilities.isLowEnd ? 0.2 : 0.3,
    enableHaptics: capabilities.supportsHaptics && !capabilities.reduceMotion,
    enableParticles: capabilities.supportsAdvancedAnimations && !capabilities.isLowEnd
  };
}

// Accessibility helpers
export function getAccessibilityConfig(capabilities: DeviceCapabilities) {
  return {
    focusRingVisible: true,
    announceChanges: true,
    keyboardNavigable: true,
    screenReaderOptimized: true,
    reduceMotion: capabilities.reduceMotion,
    highContrast: window.matchMedia('(prefers-contrast: high)').matches,
    largeFonts: window.matchMedia('(prefers-font-size: large)').matches
  };
}
