"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { 
  Palette, 
  Settings, 
  Monitor, 
  Sun, 
  Moon, 
  Sparkles, 
  Eye, 
  Save, 
  RotateCcw,
  Zap,
  Crown,
  Heart,
  Star,
  Flame,
  Diamond,
  Coins,
  Gift,
  X
} from "lucide-react"

interface ThemeCustomizationProps {
  isOpen: boolean
  onClose: () => void
  onThemeChange: (theme: any) => void
  currentTheme: any
}

const PRESET_THEMES = [
  {
    id: 'default',
    name: 'Orange Teal',
    description: 'Classic orange and teal combination',
    primary: 'from-orange-500 to-orange-600',
    secondary: 'from-teal-500 to-teal-600',
    accent: 'from-blue-500 to-blue-600',
    background: 'from-orange-400 via-teal-600 to-blue-600'
  },
  {
    id: 'sunset',
    name: 'Sunset Vibes',
    description: 'Warm sunset colors',
    primary: 'from-pink-500 to-red-600',
    secondary: 'from-orange-500 to-yellow-600',
    accent: 'from-purple-500 to-pink-600',
    background: 'from-pink-500 via-orange-600 to-red-600'
  },
  {
    id: 'ocean',
    name: 'Ocean Depths',
    description: 'Cool ocean blues and greens',
    primary: 'from-blue-500 to-blue-600',
    secondary: 'from-cyan-500 to-teal-600',
    accent: 'from-emerald-500 to-green-600',
    background: 'from-blue-500 via-cyan-600 to-teal-600'
  },
  {
    id: 'forest',
    name: 'Forest Green',
    description: 'Natural greens and earth tones',
    primary: 'from-green-500 to-green-600',
    secondary: 'from-emerald-500 to-emerald-600',
    accent: 'from-lime-500 to-green-600',
    background: 'from-green-500 via-emerald-600 to-teal-600'
  },
  {
    id: 'royal',
    name: 'Royal Purple',
    description: 'Elegant purples and golds',
    primary: 'from-purple-500 to-purple-600',
    secondary: 'from-violet-500 to-purple-600',
    accent: 'from-yellow-500 to-yellow-600',
    background: 'from-purple-500 via-violet-600 to-blue-600'
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    description: 'Classic black and white',
    primary: 'from-gray-700 to-gray-800',
    secondary: 'from-gray-600 to-gray-700',
    accent: 'from-gray-500 to-gray-600',
    background: 'from-gray-800 via-gray-700 to-gray-600'
  }
]

const LAYOUT_OPTIONS = [
  { id: 'default', name: 'Default Layout', icon: Monitor },
  { id: 'compact', name: 'Compact View', icon: Zap },
  { id: 'cards', name: 'Card Focus', icon: Star },
  { id: 'minimal', name: 'Minimal', icon: Eye }
]

const ANIMATION_LEVELS = [
  { value: 0, label: 'None' },
  { value: 25, label: 'Subtle' },
  { value: 50, label: 'Moderate' },
  { value: 75, label: 'Enhanced' },
  { value: 100, label: 'Maximum' }
]

export function ThemeCustomization({ 
  isOpen, 
  onClose, 
  onThemeChange, 
  currentTheme 
}: ThemeCustomizationProps) {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme?.id || 'default')
  const [darkMode, setDarkMode] = useState(currentTheme?.darkMode || false)
  const [animationLevel, setAnimationLevel] = useState(currentTheme?.animationLevel || [75])
  const [layout, setLayout] = useState(currentTheme?.layout || 'default')
  const [particleEffects, setParticleEffects] = useState(currentTheme?.particleEffects ?? true)
  const [hapticFeedback, setHapticFeedback] = useState(currentTheme?.hapticFeedback ?? true)
  const [reducedMotion, setReducedMotion] = useState(currentTheme?.reducedMotion || false)

  const handleSaveTheme = () => {
    const theme = {
      id: selectedTheme,
      darkMode,
      animationLevel: animationLevel[0],
      layout,
      particleEffects,
      hapticFeedback,
      reducedMotion,
      ...PRESET_THEMES.find(t => t.id === selectedTheme)
    }
    
    onThemeChange(theme)
    localStorage.setItem('loyaltyTheme', JSON.stringify(theme))
    onClose()
  }

  const handleResetTheme = () => {
    setSelectedTheme('default')
    setDarkMode(false)
    setAnimationLevel([75])
    setLayout('default')
    setParticleEffects(true)
    setHapticFeedback(true)
    setReducedMotion(false)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-orange-500 to-teal-600 text-white rounded-t-lg">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <Palette className="h-6 w-6" />
                </motion.div>
                <div>
                  <CardTitle className="text-2xl">Customize Your Dashboard</CardTitle>
                  <p className="text-white/80">Personalize your rewards experience</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>

            <CardContent className="p-6">
              <Tabs defaultValue="themes" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="themes">Color Themes</TabsTrigger>
                  <TabsTrigger value="layout">Layout & Animation</TabsTrigger>
                  <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
                </TabsList>

                {/* Color Themes Tab */}
                <TabsContent value="themes" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-orange-500" />
                      Choose Your Color Palette
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {PRESET_THEMES.map((theme) => (
                        <motion.div
                          key={theme.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                            selectedTheme === theme.id
                              ? 'border-orange-500 shadow-lg'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedTheme(theme.id)}
                        >
                          <div className={`h-24 bg-gradient-to-r ${theme.background} relative`}>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className={`w-8 h-8 bg-gradient-to-r ${theme.primary} rounded-full mr-2`} />
                              <div className={`w-6 h-6 bg-gradient-to-r ${theme.secondary} rounded-full mr-2`} />
                              <div className={`w-4 h-4 bg-gradient-to-r ${theme.accent} rounded-full`} />
                            </div>
                            {selectedTheme === theme.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                              >
                                <Crown className="h-4 w-4 text-orange-500" />
                              </motion.div>
                            )}
                          </div>
                          <div className="p-3">
                            <h4 className="font-semibold text-gray-900">{theme.name}</h4>
                            <p className="text-sm text-gray-600">{theme.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Dark Mode Toggle */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {darkMode ? <Moon className="h-5 w-5 text-blue-600" /> : <Sun className="h-5 w-5 text-yellow-600" />}
                      <div>
                        <h4 className="font-medium">Dark Mode</h4>
                        <p className="text-sm text-gray-600">Switch to dark theme</p>
                      </div>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                  </div>
                </TabsContent>

                {/* Layout & Animation Tab */}
                <TabsContent value="layout" className="space-y-6">
                  {/* Layout Options */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Monitor className="h-5 w-5 text-teal-500" />
                      Dashboard Layout
                    </h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {LAYOUT_OPTIONS.map((option) => (
                        <motion.div
                          key={option.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-4 border-2 rounded-lg cursor-pointer text-center transition-all ${
                            layout === option.id
                              ? 'border-teal-500 bg-teal-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setLayout(option.id)}
                        >
                          <option.icon className={`h-8 w-8 mx-auto mb-2 ${
                            layout === option.id ? 'text-teal-600' : 'text-gray-600'
                          }`} />
                          <h4 className="font-medium text-sm">{option.name}</h4>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Animation Level */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-blue-500" />
                      Animation Level
                    </h3>
                    
                    <div className="space-y-4">
                      <Slider
                        value={animationLevel}
                        onValueChange={setAnimationLevel}
                        max={100}
                        step={25}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        {ANIMATION_LEVELS.map((level) => (
                          <span key={level.value}>{level.label}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Effect Toggles */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Star className="h-5 w-5 text-purple-600" />
                        <div>
                          <h4 className="font-medium">Particle Effects</h4>
                          <p className="text-sm text-gray-600">Floating animations and sparkles</p>
                        </div>
                      </div>
                      <Switch checked={particleEffects} onCheckedChange={setParticleEffects} />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Flame className="h-5 w-5 text-orange-600" />
                        <div>
                          <h4 className="font-medium">Haptic Feedback</h4>
                          <p className="text-sm text-gray-600">Vibration on interactions (mobile)</p>
                        </div>
                      </div>
                      <Switch checked={hapticFeedback} onCheckedChange={setHapticFeedback} />
                    </div>
                  </div>
                </TabsContent>

                {/* Accessibility Tab */}
                <TabsContent value="accessibility" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Eye className="h-5 w-5 text-green-500" />
                      Accessibility Options
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Settings className="h-5 w-5 text-gray-600" />
                          <div>
                            <h4 className="font-medium">Reduced Motion</h4>
                            <p className="text-sm text-gray-600">Minimize animations and transitions</p>
                          </div>
                        </div>
                        <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-2">Additional Accessibility Features</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• High contrast mode support</li>
                          <li>• Screen reader compatibility</li>
                          <li>• Keyboard navigation</li>
                          <li>• Color blind friendly palettes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                <Button
                  onClick={handleResetTheme}
                  variant="outline"
                  className="flex-1"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset to Default
                </Button>
                <Button
                  onClick={handleSaveTheme}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-teal-600 hover:from-orange-600 hover:to-teal-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Theme
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
