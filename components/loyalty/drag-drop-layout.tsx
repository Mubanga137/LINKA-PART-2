"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, Reorder } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  GripVertical, 
  Eye, 
  EyeOff, 
  Save, 
  RotateCcw, 
  Settings,
  Coins,
  Crown,
  Target,
  Clock,
  Trophy,
  Flame,
  Star,
  Gift,
  Zap,
  Users,
  ShoppingBag,
  TrendingUp,
  Calendar,
  X,
  Plus,
  Grid3X3,
  Layout
} from "lucide-react"

interface DashboardModule {
  id: string
  title: string
  description: string
  component: string
  icon: any
  visible: boolean
  size: 'small' | 'medium' | 'large' | 'full'
  position: number
  customizable: boolean
  required?: boolean
}

interface DragDropLayoutProps {
  isOpen: boolean
  onClose: () => void
  onLayoutChange: (modules: DashboardModule[]) => void
  currentLayout: DashboardModule[]
}

const DEFAULT_MODULES: DashboardModule[] = [
  {
    id: 'points-balance',
    title: 'Points Balance',
    description: 'Current points and balance overview',
    component: 'PointsBalanceCard',
    icon: Coins,
    visible: true,
    size: 'medium',
    position: 0,
    customizable: true,
    required: true
  },
  {
    id: 'tier-status',
    title: 'Tier Status',
    description: 'Current tier and progress to next level',
    component: 'TierStatusCard',
    icon: Crown,
    visible: true,
    size: 'medium',
    position: 1,
    customizable: true,
    required: true
  },
  {
    id: 'weekly-challenges',
    title: 'Weekly Challenges',
    description: 'Active challenges and progress',
    component: 'WeeklyChallengesCard',
    icon: Target,
    visible: true,
    size: 'large',
    position: 2,
    customizable: true
  },
  {
    id: 'recent-activity',
    title: 'Recent Activity',
    description: 'Latest points earned and redeemed',
    component: 'RecentActivityCard',
    icon: Clock,
    visible: true,
    size: 'large',
    position: 3,
    customizable: true
  },
  {
    id: 'daily-spin',
    title: 'Daily Spin Wheel',
    description: 'Daily bonus spin for extra points',
    component: 'DailySpinCard',
    icon: Trophy,
    visible: true,
    size: 'small',
    position: 4,
    customizable: true
  },
  {
    id: 'streak-tracker',
    title: 'Login Streak',
    description: 'Daily login streak counter',
    component: 'StreakTrackerCard',
    icon: Flame,
    visible: true,
    size: 'small',
    position: 5,
    customizable: true
  },
  {
    id: 'milestone-achievement',
    title: 'Recent Achievement',
    description: 'Latest milestone or achievement unlocked',
    component: 'MilestoneCard',
    icon: Star,
    visible: true,
    size: 'small',
    position: 6,
    customizable: true
  },
  {
    id: 'quick-redeem',
    title: 'Quick Redeem',
    description: 'Fast access to popular rewards',
    component: 'QuickRedeemCard',
    icon: Gift,
    visible: false,
    size: 'medium',
    position: 7,
    customizable: true
  },
  {
    id: 'earning-methods',
    title: 'Ways to Earn',
    description: 'Different methods to earn more points',
    component: 'EarningMethodsCard',
    icon: Zap,
    visible: false,
    size: 'full',
    position: 8,
    customizable: true
  },
  {
    id: 'referral-stats',
    title: 'Referral Stats',
    description: 'Your referral progress and rewards',
    component: 'ReferralStatsCard',
    icon: Users,
    visible: false,
    size: 'medium',
    position: 9,
    customizable: true
  },
  {
    id: 'purchase-insights',
    title: 'Purchase Insights',
    description: 'Analytics on your shopping patterns',
    component: 'PurchaseInsightsCard',
    icon: ShoppingBag,
    visible: false,
    size: 'large',
    position: 10,
    customizable: true
  },
  {
    id: 'monthly-summary',
    title: 'Monthly Summary',
    description: 'Overview of monthly points and activities',
    component: 'MonthlySummaryCard',
    icon: Calendar,
    visible: false,
    size: 'full',
    position: 11,
    customizable: true
  }
]

const SIZE_CONFIGS = {
  small: { span: 'col-span-1', height: 'h-48', description: '1x1 grid' },
  medium: { span: 'col-span-1 md:col-span-2', height: 'h-48', description: '2x1 grid' },
  large: { span: 'col-span-1 md:col-span-2 lg:col-span-3', height: 'h-64', description: '3x1 grid' },
  full: { span: 'col-span-full', height: 'h-80', description: 'Full width' }
}

export function DragDropLayout({ 
  isOpen, 
  onClose, 
  onLayoutChange, 
  currentLayout 
}: DragDropLayoutProps) {
  const [modules, setModules] = useState<DashboardModule[]>(currentLayout || DEFAULT_MODULES)
  const [visibleModules, setVisibleModules] = useState<DashboardModule[]>([])
  const [hiddenModules, setHiddenModules] = useState<DashboardModule[]>([])
  const [previewMode, setPreviewMode] = useState(false)

  useEffect(() => {
    const visible = modules.filter(m => m.visible).sort((a, b) => a.position - b.position)
    const hidden = modules.filter(m => !m.visible).sort((a, b) => a.position - b.position)
    setVisibleModules(visible)
    setHiddenModules(hidden)
  }, [modules])

  const handleReorder = (newOrder: DashboardModule[]) => {
    const updatedModules = newOrder.map((module, index) => ({
      ...module,
      position: index
    }))
    
    const allModules = [
      ...updatedModules,
      ...modules.filter(m => !m.visible)
    ]
    
    setModules(allModules)
  }

  const toggleModuleVisibility = (moduleId: string) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { ...module, visible: !module.visible }
        : module
    ))
  }

  const changeModuleSize = (moduleId: string, newSize: 'small' | 'medium' | 'large' | 'full') => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { ...module, size: newSize }
        : module
    ))
  }

  const handleSaveLayout = () => {
    onLayoutChange(modules)
    localStorage.setItem('loyaltyDashboardLayout', JSON.stringify(modules))
    onClose()
  }

  const handleResetLayout = () => {
    setModules(DEFAULT_MODULES)
  }

  const addModuleToLayout = (moduleId: string) => {
    toggleModuleVisibility(moduleId)
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
          className="w-full max-w-6xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-teal-500 to-blue-600 text-white">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <Layout className="h-6 w-6" />
                </motion.div>
                <div>
                  <CardTitle className="text-2xl">Customize Dashboard Layout</CardTitle>
                  <p className="text-white/80">Drag and drop to arrange your modules</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Preview Mode</span>
                  <Switch 
                    checked={previewMode} 
                    onCheckedChange={setPreviewMode}
                    className="data-[state=checked]:bg-yellow-500"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6 flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                {/* Active Modules */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Grid3X3 className="h-5 w-5 text-teal-500" />
                      Active Dashboard Modules
                    </h3>
                    <Badge className="bg-teal-100 text-teal-800">
                      {visibleModules.length} modules
                    </Badge>
                  </div>

                  {previewMode ? (
                    // Preview Mode - Show layout as it would appear
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg min-h-96">
                      {visibleModules.map((module) => (
                        <motion.div
                          key={module.id}
                          layout
                          className={`${SIZE_CONFIGS[module.size].span} ${SIZE_CONFIGS[module.size].height} 
                            bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg p-4 border border-teal-200
                            flex flex-col items-center justify-center text-center`}
                        >
                          <module.icon className="h-8 w-8 text-teal-600 mb-2" />
                          <h4 className="font-medium text-gray-900">{module.title}</h4>
                          <p className="text-xs text-gray-600 mt-1">{SIZE_CONFIGS[module.size].description}</p>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    // Edit Mode - Draggable list
                    <Reorder.Group
                      axis="y"
                      values={visibleModules}
                      onReorder={handleReorder}
                      className="space-y-3"
                    >
                      {visibleModules.map((module) => (
                        <Reorder.Item
                          key={module.id}
                          value={module}
                          className="cursor-grab active:cursor-grabbing"
                        >
                          <motion.div
                            layout
                            whileHover={{ scale: 1.01 }}
                            whileDrag={{ scale: 1.02, rotate: 2 }}
                            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center gap-4">
                              <GripVertical className="h-5 w-5 text-gray-400" />
                              
                              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg flex items-center justify-center">
                                <module.icon className="h-5 w-5 text-white" />
                              </div>
                              
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{module.title}</h4>
                                <p className="text-sm text-gray-600">{module.description}</p>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                {/* Size Selector */}
                                <select
                                  value={module.size}
                                  onChange={(e) => changeModuleSize(module.id, e.target.value as any)}
                                  className="text-xs border border-gray-300 rounded px-2 py-1"
                                  disabled={!module.customizable}
                                >
                                  <option value="small">Small</option>
                                  <option value="medium">Medium</option>
                                  <option value="large">Large</option>
                                  <option value="full">Full</option>
                                </select>
                                
                                {/* Remove Button */}
                                {!module.required && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => toggleModuleVisibility(module.id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <EyeOff className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        </Reorder.Item>
                      ))}
                    </Reorder.Group>
                  )}
                </div>

                {/* Available Modules Sidebar */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Plus className="h-5 w-5 text-blue-500" />
                    Available Modules
                  </h3>
                  
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {hiddenModules.map((module) => (
                      <motion.div
                        key={module.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => addModuleToLayout(module.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center">
                            <module.icon className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm">{module.title}</h4>
                            <p className="text-xs text-gray-600">{module.description}</p>
                          </div>
                          <Eye className="h-4 w-4 text-gray-400" />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Layout Tips */}
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">Layout Tips</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Drag modules to reorder them</li>
                      <li>• Use small modules for quick info</li>
                      <li>• Large modules show detailed data</li>
                      <li>• Preview mode shows final layout</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>

            {/* Action Buttons */}
            <div className="flex gap-4 p-6 bg-gray-50 border-t border-gray-200">
              <Button
                onClick={handleResetLayout}
                variant="outline"
                className="flex-1"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Layout
              </Button>
              <Button
                onClick={handleSaveLayout}
                className="flex-1 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Layout
              </Button>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
