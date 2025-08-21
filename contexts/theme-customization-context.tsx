"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Theme palette definitions
export interface ThemePalette {
  id: string
  name: string
  description: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
    border: string
  }
  gradient: string
  preview: string
}

export const presetThemes: ThemePalette[] = [
  {
    id: 'blue-teal',
    name: 'Ocean Breeze',
    description: 'Cool blues and teals for a refreshing experience',
    colors: {
      primary: '#0ea5e9',
      secondary: '#0891b2',
      accent: '#06b6d4',
      background: '#f0f9ff',
      surface: '#ffffff',
      text: '#0f172a',
      textSecondary: '#64748b',
      border: '#e2e8f0'
    },
    gradient: 'from-blue-500 to-teal-500',
    preview: 'bg-gradient-to-r from-blue-500 to-teal-500'
  },
  {
    id: 'pink-purple',
    name: 'Sunset Glow',
    description: 'Warm pinks and purples for a vibrant feel',
    colors: {
      primary: '#ec4899',
      secondary: '#a855f7',
      accent: '#f97316',
      background: '#fef7ff',
      surface: '#ffffff',
      text: '#0f172a',
      textSecondary: '#64748b',
      border: '#e2e8f0'
    },
    gradient: 'from-pink-500 to-purple-600',
    preview: 'bg-gradient-to-r from-pink-500 to-purple-600'
  },
  {
    id: 'gold-black',
    name: 'Luxury Elite',
    description: 'Elegant gold and black for premium experience',
    colors: {
      primary: '#eab308',
      secondary: '#1f2937',
      accent: '#f59e0b',
      background: '#fffbeb',
      surface: '#ffffff',
      text: '#111827',
      textSecondary: '#6b7280',
      border: '#d1d5db'
    },
    gradient: 'from-yellow-500 to-gray-900',
    preview: 'bg-gradient-to-r from-yellow-500 to-gray-900'
  },
  {
    id: 'green-lime',
    name: 'Forest Fresh',
    description: 'Natural greens and lime for eco-friendly vibes',
    colors: {
      primary: '#22c55e',
      secondary: '#84cc16',
      accent: '#65a30d',
      background: '#f0fdf4',
      surface: '#ffffff',
      text: '#0f172a',
      textSecondary: '#64748b',
      border: '#e2e8f0'
    },
    gradient: 'from-green-500 to-lime-500',
    preview: 'bg-gradient-to-r from-green-500 to-lime-500'
  },
  {
    id: 'red-orange',
    name: 'Fire Burst',
    description: 'Energetic reds and oranges for bold personalities',
    colors: {
      primary: '#ef4444',
      secondary: '#f97316',
      accent: '#dc2626',
      background: '#fef2f2',
      surface: '#ffffff',
      text: '#0f172a',
      textSecondary: '#64748b',
      border: '#e2e8f0'
    },
    gradient: 'from-red-500 to-orange-500',
    preview: 'bg-gradient-to-r from-red-500 to-orange-500'
  },
  {
    id: 'indigo-cyan',
    name: 'Digital Wave',
    description: 'Modern indigo and cyan for tech enthusiasts',
    colors: {
      primary: '#6366f1',
      secondary: '#06b6d4',
      accent: '#8b5cf6',
      background: '#f8fafc',
      surface: '#ffffff',
      text: '#0f172a',
      textSecondary: '#64748b',
      border: '#e2e8f0'
    },
    gradient: 'from-indigo-500 to-cyan-500',
    preview: 'bg-gradient-to-r from-indigo-500 to-cyan-500'
  }
]

// Dashboard layout options
export interface DashboardSection {
  id: string
  name: string
  component: string
  enabled: boolean
  order: number
  expanded: boolean
}

export interface LifestyleProfile {
  interests: string[]
  favoriteCategories: string[]
  shoppingStyle: 'casual' | 'frequent' | 'premium' | 'bargain-hunter'
  preferredBrands: string[]
  loyaltyTier: 'bronze' | 'silver' | 'gold' | 'platinum'
}

interface ThemeCustomizationContextType {
  // Theme management
  currentTheme: ThemePalette
  customTheme: ThemePalette | null
  setTheme: (theme: ThemePalette) => void
  createCustomTheme: (colors: ThemePalette['colors']) => void
  isCustomTheme: boolean
  
  // Layout management
  dashboardSections: DashboardSection[]
  updateSectionOrder: (sections: DashboardSection[]) => void
  toggleSection: (sectionId: string) => void
  expandSection: (sectionId: string, expanded: boolean) => void
  
  // Lifestyle profile
  lifestyleProfile: LifestyleProfile
  updateLifestyleProfile: (profile: Partial<LifestyleProfile>) => void
  
  // Settings
  saveSettings: () => void
  loadSettings: () => void
  resetToDefaults: () => void
}

const ThemeCustomizationContext = createContext<ThemeCustomizationContextType | undefined>(undefined)

const defaultSections: DashboardSection[] = [
  { id: 'welcome', name: 'Welcome Section', component: 'EnhancedCustomerWelcome', enabled: true, order: 0, expanded: true },
  { id: 'recent-orders', name: 'Recent Orders', component: 'RecentOrdersViewed', enabled: true, order: 1, expanded: true },
  { id: 'recommended', name: 'Recommended for You', component: 'RecommendedServices', enabled: true, order: 2, expanded: true },
  { id: 'categories', name: 'Shop by Category', component: 'EnhancedCategoryGrid', enabled: true, order: 3, expanded: true },
  { id: 'trending', name: 'Trending Now', component: 'TrendingProducts', enabled: true, order: 4, expanded: true },
  { id: 'cta', name: 'Call to Action', component: 'CTAParallaxBanner', enabled: true, order: 5, expanded: true }
]

const defaultLifestyleProfile: LifestyleProfile = {
  interests: [],
  favoriteCategories: [],
  shoppingStyle: 'casual',
  preferredBrands: [],
  loyaltyTier: 'bronze'
}

interface ThemeCustomizationProviderProps {
  children: ReactNode
}

export function ThemeCustomizationProvider({ children }: ThemeCustomizationProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemePalette>(presetThemes[0])
  const [customTheme, setCustomTheme] = useState<ThemePalette | null>(null)
  const [dashboardSections, setDashboardSections] = useState<DashboardSection[]>(defaultSections)
  const [lifestyleProfile, setLifestyleProfile] = useState<LifestyleProfile>(defaultLifestyleProfile)

  // Load settings from localStorage on mount
  useEffect(() => {
    loadSettings()
  }, [])

  // Apply theme to CSS variables
  useEffect(() => {
    applyThemeToCSS(currentTheme)
  }, [currentTheme])

  const applyThemeToCSS = (theme: ThemePalette) => {
    const root = document.documentElement
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value)
    })
    root.style.setProperty('--theme-gradient', theme.gradient)
  }

  const setTheme = (theme: ThemePalette) => {
    setCurrentTheme(theme)
    if (theme.id === 'custom') {
      setCustomTheme(theme)
    }
  }

  const createCustomTheme = (colors: ThemePalette['colors']) => {
    const custom: ThemePalette = {
      id: 'custom',
      name: 'Custom Theme',
      description: 'Your personalized color scheme',
      colors,
      gradient: 'from-blue-500 to-purple-600',
      preview: 'bg-gradient-to-r from-blue-500 to-purple-600'
    }
    setCustomTheme(custom)
    setCurrentTheme(custom)
  }

  const updateSectionOrder = (sections: DashboardSection[]) => {
    setDashboardSections(sections)
  }

  const toggleSection = (sectionId: string) => {
    setDashboardSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, enabled: !section.enabled }
          : section
      )
    )
  }

  const expandSection = (sectionId: string, expanded: boolean) => {
    setDashboardSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, expanded }
          : section
      )
    )
  }

  const updateLifestyleProfile = (profile: Partial<LifestyleProfile>) => {
    setLifestyleProfile(prev => ({ ...prev, ...profile }))
  }

  const saveSettings = () => {
    const settings = {
      currentTheme: currentTheme.id,
      customTheme,
      dashboardSections,
      lifestyleProfile
    }
    localStorage.setItem('dashboard-customization', JSON.stringify(settings))
  }

  const loadSettings = () => {
    try {
      const saved = localStorage.getItem('dashboard-customization')
      if (saved) {
        const settings = JSON.parse(saved)
        
        // Load theme
        if (settings.currentTheme === 'custom' && settings.customTheme) {
          setCustomTheme(settings.customTheme)
          setCurrentTheme(settings.customTheme)
        } else {
          const theme = presetThemes.find(t => t.id === settings.currentTheme)
          if (theme) setCurrentTheme(theme)
        }
        
        // Load sections
        if (settings.dashboardSections) {
          setDashboardSections(settings.dashboardSections)
        }
        
        // Load lifestyle profile
        if (settings.lifestyleProfile) {
          setLifestyleProfile({ ...defaultLifestyleProfile, ...settings.lifestyleProfile })
        }
      }
    } catch (error) {
      console.warn('Failed to load dashboard settings:', error)
    }
  }

  const resetToDefaults = () => {
    setCurrentTheme(presetThemes[0])
    setCustomTheme(null)
    setDashboardSections(defaultSections)
    setLifestyleProfile(defaultLifestyleProfile)
    localStorage.removeItem('dashboard-customization')
  }

  const value: ThemeCustomizationContextType = {
    currentTheme,
    customTheme,
    setTheme,
    createCustomTheme,
    isCustomTheme: currentTheme.id === 'custom',
    dashboardSections,
    updateSectionOrder,
    toggleSection,
    expandSection,
    lifestyleProfile,
    updateLifestyleProfile,
    saveSettings,
    loadSettings,
    resetToDefaults
  }

  return (
    <ThemeCustomizationContext.Provider value={value}>
      {children}
    </ThemeCustomizationContext.Provider>
  )
}

export function useThemeCustomization() {
  const context = useContext(ThemeCustomizationContext)
  if (context === undefined) {
    throw new Error('useThemeCustomization must be used within a ThemeCustomizationProvider')
  }
  return context
}
