/**
 * Entertainment Category Image Mapping System
 * Ensures accurate visual representation for each entertainment category
 */

export interface EntertainmentImageConfig {
  category: string
  subcategory?: string
  images: {
    primary: string[]
    fallback: string[]
  }
  validation: {
    keywords: string[]
    excludeKeywords: string[]
  }
}

export const ENTERTAINMENT_IMAGE_MAPPING: Record<string, EntertainmentImageConfig> = {
  // DJ & Music Production
  'dj': {
    category: 'dj',
    images: {
      primary: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1574263867128-b7d5c6f62ad1?w=400&h=300&fit=crop&crop=center'
      ],
      fallback: [
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center'
      ]
    },
    validation: {
      keywords: ['dj', 'turntable', 'mixer', 'club', 'music', 'beats', 'electronic'],
      excludeKeywords: ['yoga', 'meditation', 'wellness', 'spa', 'nature', 'landscape']
    }
  },

  // Music Albums & Audio
  'music': {
    category: 'music',
    images: {
      primary: [
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop&crop=center'
      ],
      fallback: [
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center'
      ]
    },
    validation: {
      keywords: ['music', 'studio', 'recording', 'microphone', 'guitar', 'piano', 'band'],
      excludeKeywords: ['yoga', 'meditation', 'wellness', 'spa', 'fitness', 'health']
    }
  },

  // Live Performances & Bands
  'live_band': {
    category: 'live_band',
    images: {
      primary: [
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1574263867128-b7d5c6f62ad1?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop&crop=center'
      ],
      fallback: [
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop&crop=center'
      ]
    },
    validation: {
      keywords: ['concert', 'stage', 'performance', 'band', 'live', 'microphone', 'audience'],
      excludeKeywords: ['yoga', 'meditation', 'wellness', 'spa', 'fitness', 'health']
    }
  },

  // Comedy & Stand-up
  'comedy': {
    category: 'comedy',
    images: {
      primary: [
        'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center'
      ],
      fallback: [
        'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&h=300&fit=crop&crop=center'
      ]
    },
    validation: {
      keywords: ['comedy', 'microphone', 'stage', 'performance', 'entertainment', 'audience'],
      excludeKeywords: ['yoga', 'meditation', 'wellness', 'spa', 'fitness', 'health']
    }
  },

  // Traditional Dance & Cultural
  'dance': {
    category: 'dance',
    images: {
      primary: [
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1546535094-34b9fc1f4b37?w=400&h=300&fit=crop&crop=center'
      ],
      fallback: [
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&crop=center'
      ]
    },
    validation: {
      keywords: ['dance', 'traditional', 'cultural', 'performance', 'costume', 'movement'],
      excludeKeywords: ['yoga', 'meditation', 'wellness', 'spa', 'fitness', 'health']
    }
  },

  // Gaming & Esports
  'gaming': {
    category: 'gaming',
    images: {
      primary: [
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1574263867128-b7d5c6f62ad1?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop&crop=center'
      ],
      fallback: [
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&crop=center'
      ]
    },
    validation: {
      keywords: ['gaming', 'esports', 'computer', 'tournament', 'controller', 'screen', 'competition'],
      excludeKeywords: ['yoga', 'meditation', 'wellness', 'spa', 'fitness', 'health']
    }
  },

  // Film & Video Production
  'film': {
    category: 'film',
    images: {
      primary: [
        'https://images.unsplash.com/photo-1489599510067-e6327c8e4b9b?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1574263867128-b7d5c6f62ad1?w=400&h=300&fit=crop&crop=center'
      ],
      fallback: [
        'https://images.unsplash.com/photo-1489599510067-e6327c8e4b9b?w=400&h=300&fit=crop&crop=center'
      ]
    },
    validation: {
      keywords: ['film', 'cinema', 'camera', 'production', 'movie', 'video', 'director'],
      excludeKeywords: ['yoga', 'meditation', 'wellness', 'spa', 'fitness', 'health']
    }
  },

  // Religious & Gospel
  'gospel': {
    category: 'gospel',
    images: {
      primary: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center'
      ],
      fallback: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center'
      ]
    },
    validation: {
      keywords: ['gospel', 'worship', 'church', 'praise', 'spiritual', 'microphone', 'choir'],
      excludeKeywords: ['yoga', 'meditation', 'wellness', 'spa', 'fitness', 'health']
    }
  },

  // Event MC & Hosting
  'mc_hosting': {
    category: 'mc_hosting',
    images: {
      primary: [
        'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center'
      ],
      fallback: [
        'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&h=300&fit=crop&crop=center'
      ]
    },
    validation: {
      keywords: ['mc', 'host', 'event', 'microphone', 'stage', 'presentation', 'audience'],
      excludeKeywords: ['yoga', 'meditation', 'wellness', 'spa', 'fitness', 'health']
    }
  }
}

/**
 * Get validated image for entertainment category
 */
export function getEntertainmentImage(
  category: string,
  type: string = 'primary',
  index: number = 0
): string {
  const config = ENTERTAINMENT_IMAGE_MAPPING[category.toLowerCase()]
  
  if (!config) {
    // Return default entertainment image if category not found
    return 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center'
  }

  const imageArray = type === 'primary' ? config.images.primary : config.images.fallback
  const imageIndex = Math.min(index, imageArray.length - 1)
  
  return imageArray[imageIndex]
}

/**
 * Validate if an image URL is appropriate for the given category
 */
export function validateEntertainmentImage(category: string, imageUrl: string): boolean {
  const config = ENTERTAINMENT_IMAGE_MAPPING[category.toLowerCase()]
  
  if (!config) return false

  // Check if image is in approved list
  const allImages = [...config.images.primary, ...config.images.fallback]
  if (allImages.includes(imageUrl)) return true

  // Additional validation could be added here (image analysis, keyword checking, etc.)
  return false
}

// Cache for category images to prevent re-computation
const categoryImageCache = new Map<string, string>()

/**
 * Get category-specific image based on entertainment type
 */
export function getCategoryImage(entertainmentType: string): string {
  // Check cache first
  const cacheKey = entertainmentType.toLowerCase()
  if (categoryImageCache.has(cacheKey)) {
    return categoryImageCache.get(cacheKey)!
  }

  const typeMapping: Record<string, string> = {
    'dj': 'dj',
    'music': 'music',
    'music album': 'music',
    'live band': 'live_band',
    'vocalist': 'live_band',
    'comedy': 'comedy',
    'stand-up': 'comedy',
    'dance': 'dance',
    'traditional dance': 'dance',
    'gaming': 'gaming',
    'esports': 'gaming',
    'gaming event': 'gaming',
    'film': 'film',
    'short film': 'film',
    'video production': 'film',
    'gospel': 'gospel',
    'religious': 'gospel',
    'worship': 'gospel',
    'mc': 'mc_hosting',
    'host': 'mc_hosting',
    'event mc': 'mc_hosting',
    'emcee': 'mc_hosting'
  }

  const category = typeMapping[cacheKey] || 'music'
  const imageUrl = getEntertainmentImage(category)

  // Cache the result
  categoryImageCache.set(cacheKey, imageUrl)

  return imageUrl
}
