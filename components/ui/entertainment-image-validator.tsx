"use client"

import { useEffect, useCallback, useMemo } from 'react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle } from "lucide-react"
import { useEntertainmentImages } from "@/hooks/use-entertainment-images"

interface EntertainmentImageValidatorProps {
  items: Array<{ category: string; imageUrl: string; title: string }>
  showValidation?: boolean
}

export function EntertainmentImageValidator({
  items,
  showValidation = process.env.NODE_ENV === 'development'
}: EntertainmentImageValidatorProps) {
  const { validateImage, validationErrors, hasErrors, clearErrors } = useEntertainmentImages()

  // Memoize items to prevent unnecessary re-validation
  const memoizedItems = useMemo(() => items, [JSON.stringify(items)])

  const validateAllImages = useCallback(() => {
    clearErrors()

    // Validate all images
    memoizedItems.forEach(item => {
      validateImage(item.category, item.imageUrl)
    })
  }, [memoizedItems, validateImage, clearErrors])

  useEffect(() => {
    validateAllImages()
  }, [validateAllImages])

  if (!showValidation || !hasErrors) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Alert className="bg-green-50 border-green-200 text-green-800 shadow-lg">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            All entertainment images validated ✓
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 max-w-md z-50">
      <Alert className="bg-red-50 border-red-200 text-red-800 shadow-lg">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <div className="font-semibold mb-2">Image Validation Errors:</div>
          <ul className="text-sm space-y-1">
            {validationErrors.slice(0, 3).map((error, index) => (
              <li key={index} className="text-red-600">• {error}</li>
            ))}
            {validationErrors.length > 3 && (
              <li className="text-red-500 font-medium">
                ... and {validationErrors.length - 3} more errors
              </li>
            )}
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  )
}

/**
 * Enhanced Image component with category validation
 */
interface ValidatedEntertainmentImageProps {
  category: string
  alt: string
  className?: string
  width?: number
  height?: number
  fallbackCategory?: string
}

export function ValidatedEntertainmentImage({
  category,
  alt,
  className = "",
  width = 400,
  height = 300,
  fallbackCategory = "music"
}: ValidatedEntertainmentImageProps) {
  const { getValidatedImage } = useEntertainmentImages()

  const responsiveImageUrl = useMemo(() => {
    const imageUrl = getValidatedImage(category, fallbackCategory)
    return imageUrl.replace(
      /w=\d+&h=\d+/,
      `w=${width}&h=${height}`
    )
  }, [category, fallbackCategory, width, height, getValidatedImage])

  return (
    <img
      src={responsiveImageUrl}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        // Fallback to default entertainment image
        const target = e.target as HTMLImageElement
        target.src = getValidatedImage(fallbackCategory)
      }}
    />
  )
}
