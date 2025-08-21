"use client"

import { useState } from 'react'
import { useThemeCustomization, presetThemes, ThemePalette } from '@/contexts/theme-customization-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Palette, 
  Check, 
  Eye, 
  RefreshCw, 
  Sparkles,
  Paintbrush2,
  Download,
  Upload
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ColorPickerProps {
  label: string
  color: string
  onChange: (color: string) => void
}

function ColorPicker({ label, color, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex items-center gap-3">
        <div 
          className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer relative overflow-hidden group"
          style={{ backgroundColor: color }}
        >
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
        </div>
        <Input
          value={color}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="flex-1 font-mono text-sm"
        />
      </div>
    </div>
  )
}

function ThemePreview({ theme }: { theme: ThemePalette }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white">
      {/* Header */}
      <div 
        className="h-16 flex items-center px-4 text-white"
        style={{ 
          background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})` 
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20" />
          <div className="space-y-1">
            <div className="h-2 w-16 bg-white/60 rounded" />
            <div className="h-1.5 w-12 bg-white/40 rounded" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3" style={{ backgroundColor: theme.colors.background }}>
        {/* Card */}
        <div 
          className="p-3 rounded-lg border"
          style={{ 
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border 
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <div 
              className="h-2 w-20 rounded"
              style={{ backgroundColor: theme.colors.text }}
            />
            <div 
              className="w-6 h-6 rounded"
              style={{ backgroundColor: theme.colors.accent }}
            />
          </div>
          <div 
            className="h-1.5 w-full rounded mb-1"
            style={{ backgroundColor: theme.colors.textSecondary }}
          />
          <div 
            className="h-1.5 w-3/4 rounded"
            style={{ backgroundColor: theme.colors.textSecondary }}
          />
        </div>

        {/* Button */}
        <div 
          className="h-8 w-24 rounded flex items-center justify-center"
          style={{ backgroundColor: theme.colors.primary }}
        >
          <div className="h-1.5 w-12 bg-white rounded" />
        </div>
      </div>
    </div>
  )
}

export function ThemeSelector() {
  const { 
    currentTheme, 
    setTheme, 
    createCustomTheme, 
    isCustomTheme,
    saveSettings
  } = useThemeCustomization()
  
  const [customColors, setCustomColors] = useState(currentTheme.colors)
  const [activeTab, setActiveTab] = useState('presets')

  const handlePresetSelect = (theme: ThemePalette) => {
    setTheme(theme)
    saveSettings()
  }

  const handleCustomColorChange = (key: keyof typeof customColors, value: string) => {
    setCustomColors(prev => ({ ...prev, [key]: value }))
  }

  const applyCustomTheme = () => {
    createCustomTheme(customColors)
    saveSettings()
  }

  const resetCustomTheme = () => {
    setCustomColors(currentTheme.colors)
  }

  const exportTheme = () => {
    const themeData = JSON.stringify(currentTheme, null, 2)
    const blob = new Blob([themeData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${currentTheme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <Palette className="h-5 w-5 text-white" />
          </div>
          Theme Customization
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="presets" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Preset Themes
            </TabsTrigger>
            <TabsTrigger value="custom" className="flex items-center gap-2">
              <Paintbrush2 className="h-4 w-4" />
              Custom Theme
            </TabsTrigger>
          </TabsList>

          <TabsContent value="presets" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {presetThemes.map((theme) => (
                <Card 
                  key={theme.id}
                  className={cn(
                    "cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden",
                    currentTheme.id === theme.id && !isCustomTheme && "ring-2 ring-purple-500 shadow-lg"
                  )}
                  onClick={() => handlePresetSelect(theme)}
                >
                  <div className={`h-2 bg-gradient-to-r ${theme.gradient}`} />
                  
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-sm">{theme.name}</h3>
                        <p className="text-xs text-gray-600 mt-1">{theme.description}</p>
                      </div>
                      {currentTheme.id === theme.id && !isCustomTheme && (
                        <Badge className="bg-green-500 text-white">
                          <Check className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </div>

                    {/* Color Palette Preview */}
                    <div className="flex gap-1 mb-3">
                      {Object.values(theme.colors).slice(0, 6).map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-gray-200"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>

                    <div className="space-y-2">
                      <ThemePreview theme={theme} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Color Customization */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Paintbrush2 className="h-5 w-5" />
                  Color Customization
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ColorPicker
                    label="Primary Color"
                    color={customColors.primary}
                    onChange={(color) => handleCustomColorChange('primary', color)}
                  />
                  <ColorPicker
                    label="Secondary Color"
                    color={customColors.secondary}
                    onChange={(color) => handleCustomColorChange('secondary', color)}
                  />
                  <ColorPicker
                    label="Accent Color"
                    color={customColors.accent}
                    onChange={(color) => handleCustomColorChange('accent', color)}
                  />
                  <ColorPicker
                    label="Background"
                    color={customColors.background}
                    onChange={(color) => handleCustomColorChange('background', color)}
                  />
                  <ColorPicker
                    label="Surface"
                    color={customColors.surface}
                    onChange={(color) => handleCustomColorChange('surface', color)}
                  />
                  <ColorPicker
                    label="Text Color"
                    color={customColors.text}
                    onChange={(color) => handleCustomColorChange('text', color)}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={applyCustomTheme}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Apply Theme
                  </Button>
                  <Button 
                    onClick={resetCustomTheme}
                    variant="outline"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Live Preview */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Live Preview
                </h3>
                
                <div className="sticky top-4">
                  <ThemePreview 
                    theme={{
                      ...currentTheme,
                      colors: customColors
                    }} 
                  />
                  
                  {isCustomTheme && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700">
                        <Check className="h-4 w-4" />
                        <span className="text-sm font-medium">Custom theme is active</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Theme Actions */}
        <div className="border-t pt-6 flex flex-wrap gap-3">
          <Button 
            onClick={exportTheme}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Theme
          </Button>
          
          <Button 
            variant="outline"
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Import Theme
          </Button>
          
          <div className="ml-auto">
            <Badge variant="outline" className="text-xs">
              Current: {currentTheme.name}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
