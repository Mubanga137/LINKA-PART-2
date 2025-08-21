"use client"

import { useState, useEffect } from 'react'
import { useThemeCustomization } from '@/contexts/theme-customization-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { 
  GripVertical, 
  Layout, 
  Eye, 
  EyeOff, 
  ChevronDown, 
  ChevronUp,
  RotateCcw,
  Save,
  Move3D
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Simulated drag and drop functionality
interface DragState {
  isDragging: boolean
  draggedIndex: number | null
  dragOverIndex: number | null
}

export function LayoutCustomizer() {
  const { 
    dashboardSections, 
    updateSectionOrder, 
    toggleSection, 
    expandSection,
    saveSettings 
  } = useThemeCustomization()

  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedIndex: null,
    dragOverIndex: null
  })
  
  const [previewMode, setPreviewMode] = useState(false)
  const [localSections, setLocalSections] = useState(dashboardSections)

  useEffect(() => {
    setLocalSections(dashboardSections)
  }, [dashboardSections])

  const handleDragStart = (index: number, e: React.DragEvent) => {
    setDragState({
      isDragging: true,
      draggedIndex: index,
      dragOverIndex: null
    })
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (index: number, e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragState(prev => ({
      ...prev,
      dragOverIndex: index
    }))
  }

  const handleDragEnd = () => {
    setDragState({
      isDragging: false,
      draggedIndex: null,
      dragOverIndex: null
    })
  }

  const handleDrop = (dropIndex: number, e: React.DragEvent) => {
    e.preventDefault()
    
    if (dragState.draggedIndex === null) return

    const newSections = [...localSections]
    const draggedSection = newSections[dragState.draggedIndex]
    
    // Remove dragged item
    newSections.splice(dragState.draggedIndex, 1)
    
    // Insert at new position
    const insertIndex = dragState.draggedIndex < dropIndex ? dropIndex - 1 : dropIndex
    newSections.splice(insertIndex, 0, draggedSection)
    
    // Update order property
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      order: index
    }))
    
    setLocalSections(updatedSections)
    handleDragEnd()
  }

  const handleToggleSection = (sectionId: string) => {
    const newSections = localSections.map(section =>
      section.id === sectionId 
        ? { ...section, enabled: !section.enabled }
        : section
    )
    setLocalSections(newSections)
  }

  const handleExpandSection = (sectionId: string, expanded: boolean) => {
    const newSections = localSections.map(section =>
      section.id === sectionId 
        ? { ...section, expanded }
        : section
    )
    setLocalSections(newSections)
  }

  const resetLayout = () => {
    setLocalSections(dashboardSections)
  }

  const applyChanges = () => {
    updateSectionOrder(localSections)
    saveSettings()
  }

  const getSectionIcon = (componentName: string) => {
    switch (componentName) {
      case 'EnhancedCustomerWelcome': return '👋'
      case 'RecentOrdersViewed': return '📦'
      case 'RecommendedServices': return '⭐'
      case 'EnhancedCategoryGrid': return '🏷️'
      case 'TrendingProducts': return '🔥'
      case 'CTAParallaxBanner': return '🚀'
      default: return '📋'
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Layout className="h-5 w-5 text-white" />
          </div>
          Dashboard Layout Customizer
        </CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={previewMode}
              onCheckedChange={setPreviewMode}
            />
            <span className="text-sm text-gray-600">Preview Mode</span>
          </div>
          <Badge variant="outline" className="text-xs">
            Drag & Drop to Reorder
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Section List */}
        <div className="space-y-3">
          {localSections
            .sort((a, b) => a.order - b.order)
            .map((section, index) => (
              <div
                key={section.id}
                draggable={!previewMode}
                onDragStart={(e) => handleDragStart(index, e)}
                onDragOver={(e) => handleDragOver(index, e)}
                onDragEnd={handleDragEnd}
                onDrop={(e) => handleDrop(index, e)}
                className={cn(
                  "group relative p-4 border-2 border-dashed border-gray-200 rounded-lg transition-all duration-300",
                  "hover:border-purple-300 hover:bg-purple-50/50",
                  dragState.isDragging && dragState.draggedIndex === index && "opacity-50 scale-95",
                  dragState.dragOverIndex === index && "border-purple-500 bg-purple-100/50",
                  !section.enabled && "opacity-60 bg-gray-50",
                  previewMode && section.enabled && "border-green-300 bg-green-50/30",
                  !previewMode && "cursor-move"
                )}
              >
                <div className="flex items-center gap-4">
                  {/* Drag Handle */}
                  {!previewMode && (
                    <div className="flex-shrink-0 text-gray-400 group-hover:text-purple-500 transition-colors">
                      <GripVertical className="h-5 w-5" />
                    </div>
                  )}

                  {/* Section Info */}
                  <div className="flex-1 flex items-center gap-3">
                    <div className="text-2xl">{getSectionIcon(section.component)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">{section.name}</h3>
                        <Badge 
                          variant={section.enabled ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {section.enabled ? 'Enabled' : 'Disabled'}
                        </Badge>
                        {previewMode && section.enabled && (
                          <Badge className="bg-green-500 text-white text-xs">
                            <Eye className="h-3 w-3 mr-1" />
                            Visible
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Order: {section.order + 1} • Component: {section.component}
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-2">
                    {/* Expand/Collapse */}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleExpandSection(section.id, !section.expanded)}
                      className="h-8 w-8 p-0"
                    >
                      {section.expanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>

                    {/* Toggle Visibility */}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleToggleSection(section.id)}
                      className="h-8 w-8 p-0"
                    >
                      {section.enabled ? (
                        <Eye className="h-4 w-4 text-green-600" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Expanded Content Preview */}
                {section.expanded && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="font-medium text-gray-700">Status:</span>
                        <div className={`mt-1 ${section.enabled ? 'text-green-600' : 'text-red-600'}`}>
                          {section.enabled ? '✓ Active' : '✗ Hidden'}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Position:</span>
                        <div className="mt-1 text-gray-600">#{section.order + 1}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Type:</span>
                        <div className="mt-1 text-gray-600">Widget</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Size:</span>
                        <div className="mt-1 text-gray-600">Full Width</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Drag Indicator */}
                {dragState.isDragging && dragState.dragOverIndex === index && (
                  <div className="absolute inset-0 bg-purple-500/20 border-2 border-purple-500 rounded-lg flex items-center justify-center">
                    <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Drop Here
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-6 border-t">
          <Button 
            onClick={applyChanges}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Apply Layout
          </Button>
          
          <Button 
            onClick={resetLayout}
            variant="outline"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Default
          </Button>

          <div className="ml-auto flex items-center gap-2 text-sm text-gray-600">
            <Move3D className="h-4 w-4" />
            <span>{localSections.filter(s => s.enabled).length} of {localSections.length} sections enabled</span>
          </div>
        </div>

        {/* Help Text */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h4 className="font-medium text-blue-900 mb-2">How to customize your layout:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Drag & Drop:</strong> Reorder sections by dragging them up or down</li>
            <li>• <strong>Toggle Visibility:</strong> Use the eye icon to show/hide sections</li>
            <li>• <strong>Expand/Collapse:</strong> Click the chevron to see more details</li>
            <li>• <strong>Preview Mode:</strong> Enable to see how your layout will look</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
