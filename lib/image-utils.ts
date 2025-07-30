/**
 * Image optimization utilities for the marketplace
 */

// Base64 encoded placeholder image (1x1 transparent pixel)
export const PLACEHOLDER_IMAGE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

// Base64 encoded fallback image with shopping bag icon
export const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Cpath stroke='%239CA3AF' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M8 10v6m4-6v6' transform='translate(180,180) scale(3)'/%3E%3C/svg%3E";

/**
 * Generate responsive image URLs for different screen densities
 */
export function generateImageSrcSet(baseUrl: string, sizes: number[] = [320, 640, 960, 1280]): string {
  // For now, we'll use the original URL for all sizes
  // In a real app, you'd have different sized versions
  return sizes.map(size => `${baseUrl} ${size}w`).join(", ");
}

/**
 * Generate responsive sizes attribute for different breakpoints
 */
export function generateImageSizes(
  mobileSize = "50vw",
  tabletSize = "33vw", 
  desktopSize = "25vw"
): string {
  return [
    `(max-width: 640px) ${mobileSize}`,
    `(orientation: landscape) and (max-width: 768px) 33vw`,
    `(max-width: 1024px) ${tabletSize}`,
    desktopSize
  ].join(", ");
}

/**
 * Create a blur data URL for Next.js Image placeholder
 */
export function createBlurDataURL(width: number = 400, height: number = 400): string {
  // Create a simple gray gradient blur placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * Optimize image URL with query parameters
 */
export function optimizeImageUrl(
  url: string, 
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'auto';
  } = {}
): string {
  const { width, height, quality = 80, format = 'auto' } = options;
  
  // If using Unsplash, add optimization parameters
  if (url.includes('unsplash.com')) {
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    params.set('q', quality.toString());
    if (format !== 'auto') params.set('fm', format);
    params.set('fit', 'crop');
    params.set('crop', 'faces,edges');
    
    return `${url}&${params.toString()}`;
  }
  
  return url;
}

/**
 * Check if an image URL is valid and accessible
 */
export async function validateImageUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok && response.headers.get('content-type')?.startsWith('image/');
  } catch {
    return false;
  }
}

/**
 * Preload critical images for performance
 */
export function preloadImage(src: string): void {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  }
}

/**
 * Modern image formats detection
 */
export function supportsWebP(): boolean {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

export function supportsAVIF(): boolean {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
}

/**
 * Get the best image format for the current browser
 */
export function getBestImageFormat(): 'avif' | 'webp' | 'jpeg' {
  if (supportsAVIF()) return 'avif';
  if (supportsWebP()) return 'webp';
  return 'jpeg';
}
