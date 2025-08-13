/**
 * Linka Logo Testing & Debugging Utilities
 * For development and quality assurance
 */

// Breakpoint definitions for testing
export const BREAKPOINTS = {
  'ultra-small': { min: 0, max: 360 },
  'mobile': { min: 361, max: 767 },
  'tablet': { min: 768, max: 1023 },
  'desktop': { min: 1024, max: 1919 },
  'large': { min: 1920, max: 3839 },
  '4k': { min: 3840, max: Infinity }
} as const;

// Size constraint testing
export const SIZE_CONSTRAINTS = {
  mobile: {
    maxWidth: '20vw',
    minWidth: '60px',
    expected: { min: 60, max: 153 } // at 767px width
  },
  desktop: {
    maxWidth: '25%',
    minWidth: '120px', 
    expected: { min: 120, max: 200 } // capped at 200px
  },
  sidebar: {
    maxWidth: '100%',
    minWidth: '60px',
    maxHeight: '80px'
  },
  footer: {
    maxWidth: '150px',
    minWidth: '80px'
  }
} as const;

// Brand color verification
export const BRAND_COLORS = {
  primary: '#0073e6',
  accent: '#FF6B00',
  primaryAlpha: '#0073e625',
  accentAlpha: '#FF6B0025'
} as const;

/**
 * Test logo dimensions at current viewport
 */
export function testLogoDimensions(logoElement: HTMLElement): {
  width: number;
  height: number;
  aspectRatio: number;
  withinConstraints: boolean;
  breakpoint: string;
} {
  const rect = logoElement.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  
  // Determine current breakpoint
  const breakpoint = Object.entries(BREAKPOINTS).find(([_, range]) => 
    viewportWidth >= range.min && viewportWidth <= range.max
  )?.[0] || 'unknown';

  // Calculate expected constraints
  let maxWidth = 0;
  let minWidth = 0;

  if (viewportWidth < 768) {
    maxWidth = viewportWidth * 0.2; // 20vw
    minWidth = 60;
  } else {
    maxWidth = Math.min(viewportWidth * 0.25, 200); // 25% capped at 200px
    minWidth = 120;
  }

  const withinConstraints = rect.width >= minWidth && rect.width <= maxWidth;
  const aspectRatio = rect.width / rect.height;

  return {
    width: rect.width,
    height: rect.height,
    aspectRatio,
    withinConstraints,
    breakpoint
  };
}

/**
 * Verify logo placement and alignment
 */
export function testLogoPlacement(logoElement: HTMLElement): {
  position: { x: number; y: number };
  alignment: string;
  hasOverflow: boolean;
  gridAligned: boolean;
} {
  const rect = logoElement.getBoundingClientRect();
  const parent = logoElement.parentElement?.getBoundingClientRect();
  
  if (!parent) {
    return {
      position: { x: rect.x, y: rect.y },
      alignment: 'unknown',
      hasOverflow: false,
      gridAligned: false
    };
  }

  // Check for overflow
  const hasOverflow = rect.right > parent.right || 
                     rect.bottom > parent.bottom ||
                     rect.left < parent.left ||
                     rect.top < parent.top;

  // Check grid alignment (1.5rem = 24px)
  const gridSize = 24;
  const gridAligned = Math.abs(rect.left - parent.left) % gridSize < 2 ||
                     Math.abs(rect.right - parent.right) % gridSize < 2;

  // Determine alignment
  const centerX = parent.left + parent.width / 2;
  const centerY = parent.top + parent.height / 2;
  
  let alignment = '';
  if (rect.left < centerX - 10) alignment += 'left';
  else if (rect.right > centerX + 10) alignment += 'right';
  else alignment += 'center-x';
  
  alignment += '-';
  
  if (rect.top < centerY - 10) alignment += 'top';
  else if (rect.bottom > centerY + 10) alignment += 'bottom';
  else alignment += 'center-y';

  return {
    position: { x: rect.x, y: rect.y },
    alignment,
    hasOverflow,
    gridAligned
  };
}

/**
 * Test animation performance
 */
export function testAnimationPerformance(logoElement: HTMLElement): Promise<{
  fps: number;
  frameTime: number;
  performant: boolean;
}> {
  return new Promise((resolve) => {
    let frameCount = 0;
    let startTime = performance.now();
    const duration = 1000; // Test for 1 second

    function frame() {
      frameCount++;
      const elapsed = performance.now() - startTime;
      
      if (elapsed >= duration) {
        const fps = (frameCount / elapsed) * 1000;
        const frameTime = elapsed / frameCount;
        const performant = fps >= 55; // 55+ FPS considered performant
        
        resolve({ fps, frameTime, performant });
      } else {
        requestAnimationFrame(frame);
      }
    }

    // Trigger hover animation
    logoElement.dispatchEvent(new MouseEvent('mouseenter'));
    requestAnimationFrame(frame);
  });
}

/**
 * Verify brand color compliance
 */
export function testBrandColors(logoElement: HTMLElement): {
  hasCorrectColors: boolean;
  detectedColors: string[];
  compliance: number; // 0-100%
} {
  const computedStyle = getComputedStyle(logoElement);
  const detectedColors: string[] = [];
  
  // Check CSS custom properties
  const primaryColor = computedStyle.getPropertyValue('--linka-primary').trim();
  const accentColor = computedStyle.getPropertyValue('--linka-accent').trim();
  
  if (primaryColor) detectedColors.push(primaryColor);
  if (accentColor) detectedColors.push(accentColor);
  
  // Check for correct brand colors
  const hasCorrectPrimary = primaryColor === BRAND_COLORS.primary;
  const hasCorrectAccent = accentColor === BRAND_COLORS.accent;
  
  const compliance = (hasCorrectPrimary && hasCorrectAccent) ? 100 : 
                    (hasCorrectPrimary || hasCorrectAccent) ? 50 : 0;

  return {
    hasCorrectColors: hasCorrectPrimary && hasCorrectAccent,
    detectedColors,
    compliance
  };
}

/**
 * Run comprehensive logo test suite
 */
export async function runLogoTestSuite(logoElement: HTMLElement): Promise<{
  dimensions: ReturnType<typeof testLogoDimensions>;
  placement: ReturnType<typeof testLogoPlacement>;
  animation: Awaited<ReturnType<typeof testAnimationPerformance>>;
  brandColors: ReturnType<typeof testBrandColors>;
  overallScore: number;
}> {
  const dimensions = testLogoDimensions(logoElement);
  const placement = testLogoPlacement(logoElement);
  const animation = await testAnimationPerformance(logoElement);
  const brandColors = testBrandColors(logoElement);
  
  // Calculate overall score (0-100)
  let score = 0;
  score += dimensions.withinConstraints ? 25 : 0;
  score += placement.hasOverflow ? 0 : 25;
  score += animation.performant ? 25 : 0;
  score += brandColors.compliance * 0.25;
  
  return {
    dimensions,
    placement,
    animation,
    brandColors,
    overallScore: score
  };
}

/**
 * Debug mode toggle for visual testing
 */
export function toggleDebugMode(enable: boolean = true): void {
  const body = document.body;
  
  if (enable) {
    body.classList.add('linka-debug');
    console.log('🔍 Linka Logo Debug Mode: ENABLED');
    console.log('Logo containers will show visual boundaries and size labels');
  } else {
    body.classList.remove('linka-debug');
    console.log('🔍 Linka Logo Debug Mode: DISABLED');
  }
}

/**
 * Generate test report for QA
 */
export function generateQAReport(): string {
  const logos = document.querySelectorAll('.linka-logo-container');
  const viewport = { width: window.innerWidth, height: window.innerHeight };
  const breakpoint = Object.entries(BREAKPOINTS).find(([_, range]) => 
    viewport.width >= range.min && viewport.width <= range.max
  )?.[0] || 'unknown';

  let report = `# Linka Logo QA Report\n\n`;
  report += `**Viewport**: ${viewport.width}x${viewport.height} (${breakpoint})\n`;
  report += `**Test Date**: ${new Date().toISOString()}\n`;
  report += `**Logos Found**: ${logos.length}\n\n`;

  logos.forEach((logo, index) => {
    const element = logo as HTMLElement;
    const dimensions = testLogoDimensions(element);
    const placement = testLogoPlacement(element);
    const brandColors = testBrandColors(element);

    report += `## Logo ${index + 1}\n`;
    report += `- **Size**: ${dimensions.width.toFixed(1)}x${dimensions.height.toFixed(1)}px\n`;
    report += `- **Aspect Ratio**: ${dimensions.aspectRatio.toFixed(2)}\n`;
    report += `- **Within Constraints**: ${dimensions.withinConstraints ? '✅' : '❌'}\n`;
    report += `- **Has Overflow**: ${placement.hasOverflow ? '❌' : '✅'}\n`;
    report += `- **Grid Aligned**: ${placement.gridAligned ? '✅' : '❌'}\n`;
    report += `- **Brand Colors**: ${brandColors.compliance}% compliant\n\n`;
  });

  return report;
}
