import { useEffect, useState } from 'react'
import { validateEntertainmentImage, getCategoryImage } from '@/lib/entertainment-image-mapping'

/**
 * Custom hook for managing and validating entertainment images
 */
export function useEntertainmentImages() {
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  /**
   * Validate an image URL for a specific entertainment category
   */
  const validateImage = (category: string, imageUrl: string): boolean => {
    const isValid = validateEntertainmentImage(category, imageUrl)
    
    if (!isValid) {
      const errorMessage = `Invalid image for ${category}: ${imageUrl}`
      setValidationErrors(prev => [...prev.filter(err => err !== errorMessage), errorMessage])
    }
    
    return isValid
  }

  /**
   * Get a validated image for entertainment category
   */
  const getValidatedImage = (category: string, fallbackCategory?: string): string => {
    try {
      return getCategoryImage(category)
    } catch (error) {
      console.warn(`Failed to get image for category: ${category}`, error)
      return fallbackCategory ? getCategoryImage(fallbackCategory) : getCategoryImage('music')
    }
  }

  /**
   * Clear validation errors
   */
  const clearErrors = () => {
    setValidationErrors([])
  }

  return {
    validateImage,
    getValidatedImage,
    validationErrors,
    clearErrors,
    hasErrors: validationErrors.length > 0
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
  const { getValidatedImage } = useEntertainmentImages()

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

  const baseImageUrl = getValidatedImage(category)
  const responsiveImageUrl = baseImageUrl.replace(
    /w=\d+&h=\d+/,
    breakpoints[currentBreakpoint]
  )

  return {
    imageUrl: responsiveImageUrl,
    breakpoint: currentBreakpoint
  }
}
