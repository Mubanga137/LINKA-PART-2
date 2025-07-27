import { useEffect, useState, useCallback, useMemo } from 'react'
import { validateEntertainmentImage, getCategoryImage } from '@/lib/entertainment-image-mapping'

/**
 * Custom hook for managing and validating entertainment images
 */
export function useEntertainmentImages() {
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  /**
   * Validate an image URL for a specific entertainment category
   */
  const validateImage = useCallback((category: string, imageUrl: string): boolean => {
    const isValid = validateEntertainmentImage(category, imageUrl)

    if (!isValid) {
      const errorMessage = `Invalid image for ${category}: ${imageUrl}`
      setValidationErrors(prev => {
        // Only add if not already present to prevent duplicates
        if (prev.includes(errorMessage)) return prev
        return [...prev, errorMessage]
      })
    }

    return isValid
  }, [])

  /**
   * Get a validated image for entertainment category
   */
  const getValidatedImage = useCallback((category: string, fallbackCategory?: string): string => {
    try {
      return getCategoryImage(category)
    } catch (error) {
      console.warn(`Failed to get image for category: ${category}`, error)
      return fallbackCategory ? getCategoryImage(fallbackCategory) : getCategoryImage('music')
    }
  }, [])

  /**
   * Clear validation errors
   */
  const clearErrors = useCallback(() => {
    setValidationErrors([])
  }, [])

  const hasErrors = useMemo(() => validationErrors.length > 0, [validationErrors])

  return {
    validateImage,
    getValidatedImage,
    validationErrors,
    clearErrors,
    hasErrors
  }
}

/**
 * Hook for responsive entertainment images
 */
export function useResponsiveEntertainmentImage(
  category: string, 
  breakpoints: { mobile: string, tablet: string, desktop: string } = {
    mobile: 'w=300&h=200',
    tablet: 'w=400&h=300', 
    desktop: 'w=600&h=400'
  }
) {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  // Memoize the getValidatedImage call to prevent unnecessary re-computation
  const baseImageUrl = useMemo(() => {
    try {
      return getCategoryImage(category)
    } catch (error) {
      console.warn(`Failed to get image for category: ${category}`, error)
      return getCategoryImage('music')
    }
  }, [category])

  useEffect(() => {
    const checkBreakpoint = () => {
      if (window.innerWidth < 768) {
        setCurrentBreakpoint('mobile')
      } else if (window.innerWidth < 1024) {
        setCurrentBreakpoint('tablet')
      } else {
        setCurrentBreakpoint('desktop')
      }
    }

    checkBreakpoint()
    window.addEventListener('resize', checkBreakpoint)
    return () => window.removeEventListener('resize', checkBreakpoint)
  }, [])

  const responsiveImageUrl = useMemo(() => {
    return baseImageUrl.replace(
      /w=\d+&h=\d+/,
      breakpoints[currentBreakpoint]
    )
  }, [baseImageUrl, breakpoints, currentBreakpoint])

  return {
    imageUrl: responsiveImageUrl,
    breakpoint: currentBreakpoint
  }
}
