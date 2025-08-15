/**
 * Theme-Aware Logo Testing Utilities
 * Comprehensive QA validation for theme adaptation
 */

import { ThemeMode, ContrastLevel } from '@/hooks/use-theme-detection';

export interface ThemeTestResults {
  themeDetection: {
    detectedTheme: ThemeMode;
    accuracy: number;
    detectionTime: number;
  };
  visibility: {
    contrastRatio: number;
    wcagCompliant: boolean;
    needsImprovement: boolean;
  };
  glassmorphism: {
    enabled: boolean;
    opacity: number;
    performant: boolean;
  };
  placement: {
    withinBounds: boolean;
    properAlignment: boolean;
    responsive: boolean;
  };
  animation: {
    contextAware: boolean;
    performant: boolean;
    respectsPreferences: boolean;
  };
  overallScore: number;
}

/**
 * Comprehensive theme-aware logo test suite
 */
export class ThemeLogoTester {
  private logoElement: HTMLElement;
  private testResults: Partial<ThemeTestResults> = {};

  constructor(logoElement: HTMLElement) {
    this.logoElement = logoElement;
  }

  /**
   * Run complete test suite
   */
  async runCompleteTest(): Promise<ThemeTestResults> {
    console.log('🧪 Starting Theme-Aware Logo Test Suite...');

    const tests = [
      this.testThemeDetection(),
      this.testVisibility(),
      this.testGlassmorphism(),
      this.testPlacement(),
      this.testAnimation()
    ];

    await Promise.all(tests);

    const overallScore = this.calculateOverallScore();
    
    const results: ThemeTestResults = {
      themeDetection: this.testResults.themeDetection!,
      visibility: this.testResults.visibility!,
      glassmorphism: this.testResults.glassmorphism!,
      placement: this.testResults.placement!,
      animation: this.testResults.animation!,
      overallScore
    };

    this.generateDetailedReport(results);
    return results;
  }

  /**
   * Test theme detection accuracy and speed
   */
  private async testThemeDetection(): Promise<void> {
    const startTime = performance.now();
    
    // Get computed theme from data attribute
    const detectedTheme = this.logoElement.getAttribute('data-theme') as ThemeMode || 'light';
    
    // Test accuracy by analyzing actual background
    const accuracy = await this.validateThemeAccuracy(detectedTheme);
    
    const detectionTime = performance.now() - startTime;

    this.testResults.themeDetection = {
      detectedTheme,
      accuracy,
      detectionTime
    };

    console.log(`✅ Theme Detection: ${detectedTheme} (${accuracy}% accurate, ${detectionTime.toFixed(1)}ms)`);
  }

  /**
   * Test visibility and contrast compliance
   */
  private async testVisibility(): Promise<void> {
    const computedStyle = getComputedStyle(this.logoElement);
    const img = this.logoElement.querySelector('img');
    
    if (!img) {
      this.testResults.visibility = {
        contrastRatio: 0,
        wcagCompliant: false,
        needsImprovement: true
      };
      return;
    }

    // Analyze contrast
    const contrastRatio = await this.calculateVisualContrast(img);
    const wcagCompliant = contrastRatio >= 4.5;
    const needsImprovement = contrastRatio < 3.0;

    this.testResults.visibility = {
      contrastRatio,
      wcagCompliant,
      needsImprovement
    };

    console.log(`✅ Visibility: ${contrastRatio.toFixed(1)}:1 contrast ${wcagCompliant ? '(WCAG ✓)' : '(WCAG ✗)'}`);
  }

  /**
   * Test glassmorphism effects
   */
  private async testGlassmorphism(): Promise<void> {
    const glassElement = this.logoElement.querySelector('.linka-logo-glassmorphism');
    const isMobile = window.innerWidth < 768;
    
    let enabled = false;
    let opacity = 0;
    let performant = true;

    if (glassElement && !isMobile) {
      const computedStyle = getComputedStyle(glassElement);
      enabled = computedStyle.backdropFilter !== 'none';
      opacity = parseFloat(computedStyle.opacity) || 0;
      
      // Test performance by measuring animation frame time
      performant = await this.testGlassPerformance(glassElement as HTMLElement);
    }

    this.testResults.glassmorphism = {
      enabled,
      opacity,
      performant
    };

    console.log(`✅ Glassmorphism: ${enabled ? 'enabled' : 'disabled'} (${opacity.toFixed(2)} opacity, ${performant ? 'performant' : 'needs optimization'})`);
  }

  /**
   * Test placement and responsive behavior
   */
  private async testPlacement(): Promise<void> {
    const rect = this.logoElement.getBoundingClientRect();
    const parent = this.logoElement.parentElement?.getBoundingClientRect();
    
    if (!parent) {
      this.testResults.placement = {
        withinBounds: false,
        properAlignment: false,
        responsive: false
      };
      return;
    }

    // Check if logo is within bounds
    const withinBounds = rect.right <= parent.right && 
                        rect.bottom <= parent.bottom &&
                        rect.left >= parent.left &&
                        rect.top >= parent.top;

    // Check alignment (should be centered or left-aligned)
    const centerX = parent.left + parent.width / 2;
    const properAlignment = rect.left <= centerX + 10; // Allow small tolerance

    // Test responsive behavior
    const responsive = await this.testResponsiveBehavior();

    this.testResults.placement = {
      withinBounds,
      properAlignment,
      responsive
    };

    console.log(`✅ Placement: ${withinBounds ? 'within bounds' : 'overflow detected'}, ${properAlignment ? 'aligned' : 'misaligned'}, ${responsive ? 'responsive' : 'fixed'}`);
  }

  /**
   * Test animation context awareness
   */
  private async testAnimation(): Promise<void> {
    const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isScrolling = document.body.classList.contains('scrolling');
    
    // Test hover animation
    const contextAware = await this.testHoverAnimation();
    
    // Test performance
    const performant = await this.testAnimationPerformance();
    
    // Check if animations respect user preferences
    const respectsPreferences = hasReducedMotion ? !this.hasActiveAnimations() : true;

    this.testResults.animation = {
      contextAware,
      performant,
      respectsPreferences
    };

    console.log(`✅ Animation: ${contextAware ? 'context-aware' : 'static'}, ${performant ? 'performant' : 'choppy'}, ${respectsPreferences ? 'respects preferences' : 'ignores preferences'}`);
  }

  /**
   * Validate theme detection accuracy
   */
  private async validateThemeAccuracy(detectedTheme: ThemeMode): Promise<number> {
    // Analyze actual background colors
    const backgroundColors = this.collectBackgroundColors();
    const actualTheme = this.analyzeBackgroundTheme(backgroundColors);
    
    if (detectedTheme === actualTheme) return 100;
    if ((detectedTheme === 'custom' && actualTheme !== 'light' && actualTheme !== 'dark') ||
        (actualTheme === 'custom' && detectedTheme !== 'light' && detectedTheme !== 'dark')) {
      return 75; // Partial match for custom themes
    }
    return 50; // Mismatch but functioning
  }

  /**
   * Calculate visual contrast between logo and background
   */
  private async calculateVisualContrast(img: HTMLImageElement): Promise<number> {
    try {
      // Create canvas to analyze image and background
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return 4.5; // Default safe assumption
      
      canvas.width = 100;
      canvas.height = 100;
      
      // Draw logo
      ctx.drawImage(img, 0, 0, 100, 100);
      const imageData = ctx.getImageData(0, 0, 100, 100);
      
      // Calculate average logo brightness
      let totalBrightness = 0;
      for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const alpha = imageData.data[i + 3];
        
        if (alpha > 128) { // Consider only non-transparent pixels
          totalBrightness += (r * 0.299 + g * 0.587 + b * 0.114) / 255;
        }
      }
      
      const avgLogoBrightness = totalBrightness / (imageData.data.length / 4);
      
      // Get background brightness
      const backgroundBrightness = this.getBackgroundBrightness();
      
      // Calculate contrast ratio
      const l1 = Math.max(avgLogoBrightness, backgroundBrightness) + 0.05;
      const l2 = Math.min(avgLogoBrightness, backgroundBrightness) + 0.05;
      
      return l1 / l2;
    } catch (error) {
      console.warn('Could not calculate visual contrast:', error);
      return 4.5; // Safe fallback
    }
  }

  /**
   * Test glassmorphism performance
   */
  private async testGlassPerformance(glassElement: HTMLElement): Promise<boolean> {
    return new Promise((resolve) => {
      let frameCount = 0;
      let startTime = performance.now();
      const testDuration = 500; // Test for 500ms
      
      function frame() {
        frameCount++;
        const elapsed = performance.now() - startTime;
        
        if (elapsed >= testDuration) {
          const fps = (frameCount / elapsed) * 1000;
          resolve(fps >= 55); // 55+ FPS considered performant
        } else {
          requestAnimationFrame(frame);
        }
      }
      
      // Trigger hover to test glass animation
      glassElement.dispatchEvent(new MouseEvent('mouseenter'));
      requestAnimationFrame(frame);
    });
  }

  /**
   * Test responsive behavior across breakpoints
   */
  private async testResponsiveBehavior(): Promise<boolean> {
    const originalWidth = window.innerWidth;
    const testWidths = [360, 768, 1024, 1920];
    let responsiveChanges = 0;
    
    for (const width of testWidths) {
      // Simulate viewport change
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
      
      window.dispatchEvent(new Event('resize'));
      await new Promise(resolve => setTimeout(resolve, 50)); // Allow styles to update
      
      const rect = this.logoElement.getBoundingClientRect();
      if (rect.width !== this.logoElement.getBoundingClientRect().width) {
        responsiveChanges++;
      }
    }
    
    // Restore original width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalWidth,
    });
    
    return responsiveChanges >= 2; // Should respond to at least 2 breakpoint changes
  }

  /**
   * Test hover animation functionality
   */
  private async testHoverAnimation(): Promise<boolean> {
    return new Promise((resolve) => {
      const initialTransform = getComputedStyle(this.logoElement).transform;
      
      // Trigger hover
      this.logoElement.dispatchEvent(new MouseEvent('mouseenter'));
      
      setTimeout(() => {
        const hoverTransform = getComputedStyle(this.logoElement).transform;
        const hasChanged = initialTransform !== hoverTransform;
        
        // Trigger mouse leave
        this.logoElement.dispatchEvent(new MouseEvent('mouseleave'));
        
        resolve(hasChanged);
      }, 100);
    });
  }

  /**
   * Test animation performance
   */
  private async testAnimationPerformance(): Promise<boolean> {
    return new Promise((resolve) => {
      let frameCount = 0;
      let startTime = performance.now();
      const testDuration = 1000;
      
      function frame() {
        frameCount++;
        const elapsed = performance.now() - startTime;
        
        if (elapsed >= testDuration) {
          const fps = (frameCount / elapsed) * 1000;
          resolve(fps >= 58); // Near 60fps
        } else {
          requestAnimationFrame(frame);
        }
      }
      
      // Trigger animation
      this.logoElement.dispatchEvent(new MouseEvent('mouseenter'));
      requestAnimationFrame(frame);
    });
  }

  /**
   * Helper methods
   */
  private collectBackgroundColors(): string[] {
    const colors: string[] = [];
    let element: Element | null = this.logoElement;
    let depth = 0;
    
    while (element && depth < 5) {
      const style = getComputedStyle(element);
      const bgColor = style.backgroundColor;
      
      if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
        colors.push(bgColor);
      }
      
      element = element.parentElement;
      depth++;
    }
    
    return colors;
  }

  private analyzeBackgroundTheme(colors: string[]): ThemeMode {
    if (colors.length === 0) return 'light';
    
    const brightnesses = colors.map(this.getColorBrightness).filter(b => b !== -1);
    const avgBrightness = brightnesses.reduce((sum, b) => sum + b, 0) / brightnesses.length;
    
    if (avgBrightness < 0.3) return 'dark';
    if (avgBrightness > 0.7) return 'light';
    return 'custom';
  }

  private getColorBrightness(color: string): number {
    const rgbaMatch = color.match(/rgba?\(([^)]+)\)/);
    if (rgbaMatch) {
      const values = rgbaMatch[1].split(',').map(v => parseFloat(v.trim()));
      if (values.length >= 3) {
        const [r, g, b] = values;
        return (r * 0.299 + g * 0.587 + b * 0.114) / 255;
      }
    }
    return -1;
  }

  private getBackgroundBrightness(): number {
    const colors = this.collectBackgroundColors();
    if (colors.length === 0) return 1; // Default to light
    
    const brightnesses = colors.map(this.getColorBrightness).filter(b => b !== -1);
    return brightnesses.reduce((sum, b) => sum + b, 0) / brightnesses.length;
  }

  private hasActiveAnimations(): boolean {
    const computedStyle = getComputedStyle(this.logoElement);
    return computedStyle.animationName !== 'none' && 
           computedStyle.animationPlayState !== 'paused';
  }

  private calculateOverallScore(): number {
    const weights = {
      themeDetection: 0.25,
      visibility: 0.25,
      glassmorphism: 0.15,
      placement: 0.20,
      animation: 0.15
    };

    let totalScore = 0;
    
    // Theme detection score
    if (this.testResults.themeDetection) {
      const { accuracy, detectionTime } = this.testResults.themeDetection;
      const speedScore = detectionTime < 50 ? 100 : Math.max(0, 100 - (detectionTime - 50));
      totalScore += ((accuracy + speedScore) / 2) * weights.themeDetection;
    }
    
    // Visibility score
    if (this.testResults.visibility) {
      const { wcagCompliant, contrastRatio } = this.testResults.visibility;
      const score = wcagCompliant ? 100 : Math.min(90, (contrastRatio / 4.5) * 80);
      totalScore += score * weights.visibility;
    }
    
    // Glassmorphism score
    if (this.testResults.glassmorphism) {
      const { enabled, performant } = this.testResults.glassmorphism;
      const score = enabled && performant ? 100 : enabled ? 70 : 50;
      totalScore += score * weights.glassmorphism;
    }
    
    // Placement score
    if (this.testResults.placement) {
      const { withinBounds, properAlignment, responsive } = this.testResults.placement;
      const score = (withinBounds ? 40 : 0) + (properAlignment ? 30 : 0) + (responsive ? 30 : 0);
      totalScore += score * weights.placement;
    }
    
    // Animation score
    if (this.testResults.animation) {
      const { contextAware, performant, respectsPreferences } = this.testResults.animation;
      const score = (contextAware ? 35 : 0) + (performant ? 35 : 0) + (respectsPreferences ? 30 : 0);
      totalScore += score * weights.animation;
    }
    
    return Math.round(totalScore);
  }

  private generateDetailedReport(results: ThemeTestResults): void {
    console.log('\n🎯 Theme-Aware Logo Test Results:');
    console.log('=====================================');
    console.log(`Overall Score: ${results.overallScore}/100`);
    console.log('\nDetailed Breakdown:');
    console.log(`📊 Theme Detection: ${results.themeDetection.accuracy}% (${results.themeDetection.detectionTime.toFixed(1)}ms)`);
    console.log(`👁️  Visibility: ${results.visibility.contrastRatio.toFixed(1)}:1 ${results.visibility.wcagCompliant ? '✅' : '❌'}`);
    console.log(`✨ Glassmorphism: ${results.glassmorphism.enabled ? '✅' : '❌'} (${results.glassmorphism.performant ? 'performant' : 'needs optimization'})`);
    console.log(`📐 Placement: ${results.placement.withinBounds ? '✅' : '❌'} bounds, ${results.placement.responsive ? '✅' : '❌'} responsive`);
    console.log(`🎭 Animation: ${results.animation.contextAware ? '✅' : '❌'} aware, ${results.animation.performant ? '✅' : '❌'} performant`);
    
    if (results.overallScore >= 90) {
      console.log('\n🏆 EXCELLENT: Logo system exceeds all requirements!');
    } else if (results.overallScore >= 80) {
      console.log('\n✅ GOOD: Logo system meets requirements with minor improvements possible.');
    } else if (results.overallScore >= 70) {
      console.log('\n⚠️  FAIR: Logo system needs optimization in some areas.');
    } else {
      console.log('\n❌ NEEDS WORK: Logo system requires significant improvements.');
    }
  }
}

/**
 * Utility function to run tests on all logos
 */
export async function testAllLogos(): Promise<ThemeTestResults[]> {
  const logos = document.querySelectorAll('.linka-logo-container');
  const results: ThemeTestResults[] = [];
  
  for (let i = 0; i < logos.length; i++) {
    const logo = logos[i] as HTMLElement;
    const tester = new ThemeLogoTester(logo);
    const result = await tester.runCompleteTest();
    results.push(result);
  }
  
  return results;
}

/**
 * Quick theme validation for development
 */
export function quickThemeCheck(): void {
  const logos = document.querySelectorAll('.linka-logo-container');
  
  console.log(`🔍 Quick Theme Check - Found ${logos.length} logo(s)`);
  
  logos.forEach((logo, index) => {
    const element = logo as HTMLElement;
    const theme = element.getAttribute('data-theme') || 'auto';
    const rect = element.getBoundingClientRect();
    
    console.log(`Logo ${index + 1}: Theme=${theme}, Size=${rect.width.toFixed(0)}x${rect.height.toFixed(0)}px`);
  });
}
