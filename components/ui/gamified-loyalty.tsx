"use client"

import { useState, useEffect } from 'react'
import { useThemeCustomization } from '@/contexts/theme-customization-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Trophy, 
  Crown, 
  Star, 
  Gift, 
  Flame,
  Target,
  Award,
  Medal,
  Gem,
  Zap,
  TrendingUp,
  Calendar,
  ShoppingBag,
  Heart,
  Share2,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Loyalty tiers with benefits
const loyaltyTiers = [
  {
    id: 'bronze',
    name: 'Bronze Explorer',
    color: '#CD7F32',
    gradient: 'from-yellow-600 to-yellow-800',
    icon: Medal,
    minPoints: 0,
    maxPoints: 999,
    benefits: ['Basic customer support', '1x points on purchases', 'Standard shipping'],
    nextTier: 'Silver Adventurer'
  },
  {
    id: 'silver',
    name: 'Silver Adventurer',
    color: '#C0C0C0',
    gradient: 'from-gray-400 to-gray-600',
    icon: Award,
    minPoints: 1000,
    maxPoints: 2999,
    benefits: ['Priority support', '1.5x points on purchases', 'Free shipping on orders $50+'],
    nextTier: 'Gold Champion'
  },
  {
    id: 'gold',
    name: 'Gold Champion',
    color: '#FFD700',
    gradient: 'from-yellow-400 to-yellow-600',
    icon: Trophy,
    minPoints: 3000,
    maxPoints: 7999,
    benefits: ['Premium support', '2x points on purchases', 'Free shipping', 'Early access to sales'],
    nextTier: 'Platinum Elite'
  },
  {
    id: 'platinum',
    name: 'Platinum Elite',
    color: '#E5E4E2',
    gradient: 'from-slate-300 to-slate-500',
    icon: Crown,
    minPoints: 8000,
    maxPoints: Infinity,
    benefits: ['VIP support', '3x points on purchases', 'Free express shipping', 'Exclusive products', 'Personal shopper'],
    nextTier: null
  }
]

// Achievement badges
const achievements = [
  {
    id: 'first-purchase',
    name: 'First Steps',
    description: 'Made your first purchase',
    icon: ShoppingBag,
    color: 'green',
    points: 50,
    unlocked: true
  },
  {
    id: 'ten-orders',
    name: 'Regular Shopper',
    description: 'Completed 10 orders',
    icon: Target,
    color: 'blue',
    points: 200,
    unlocked: true
  },
  {
    id: 'wishlist-master',
    name: 'Wishlist Master',
    description: 'Added 25 items to wishlist',
    icon: Heart,
    color: 'pink',
    points: 100,
    unlocked: true
  },
  {
    id: 'social-sharer',
    name: 'Social Butterfly',
    description: 'Shared 5 products on social media',
    icon: Share2,
    color: 'purple',
    points: 75,
    unlocked: false
  },
  {
    id: 'review-writer',
    name: 'Trusted Reviewer',
    description: 'Written 10 product reviews',
    icon: Star,
    color: 'yellow',
    points: 150,
    unlocked: false
  },
  {
    id: 'streak-master',
    name: 'Streak Master',
    description: 'Shopped for 7 consecutive days',
    icon: Flame,
    color: 'orange',
    points: 300,
    unlocked: false
  },
  {
    id: 'big-spender',
    name: 'Big Spender',
    description: 'Spent over $1000 total',
    icon: Gem,
    color: 'indigo',
    points: 500,
    unlocked: true
  },
  {
    id: 'speed-shopper',
    name: 'Lightning Fast',
    description: 'Completed checkout in under 1 minute',
    icon: Zap,
    color: 'cyan',
    points: 25,
    unlocked: false
  }
]

// Rewards catalog
const rewards = [
  {
    id: 'discount-5',
    name: '5% Off Coupon',
    description: 'Get 5% off your next purchase',
    points: 250,
    category: 'discount',
    icon: '🎫',
    available: true
  },
  {
    id: 'free-shipping',
    name: 'Free Shipping',
    description: 'Free shipping on your next order',
    points: 150,
    category: 'shipping',
    icon: '📦',
    available: true
  },
  {
    id: 'discount-10',
    name: '10% Off Coupon',
    description: 'Get 10% off your next purchase',
    points: 500,
    category: 'discount',
    icon: '🎟️',
    available: true
  },
  {
    id: 'early-access',
    name: 'Early Sale Access',
    description: '24-hour early access to sales',
    points: 750,
    category: 'access',
    icon: '⭐',
    available: true
  },
  {
    id: 'gift-card-10',
    name: '$10 Gift Card',
    description: '$10 gift card for any purchase',
    points: 1000,
    category: 'gift-card',
    icon: '💳',
    available: true
  },
  {
    id: 'vip-support',
    name: 'VIP Support',
    description: 'Priority customer support for 30 days',
    points: 300,
    category: 'support',
    icon: '👑',
    available: false
  }
]

interface CircularProgressProps {
  value: number
  max: number
  size: number
  strokeWidth: number
  color: string
  children?: React.ReactNode
}

function CircularProgress({ value, max, size, strokeWidth, color, children }: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = (value / max) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  )
}

export function GamifiedLoyalty() {
  const { lifestyleProfile } = useThemeCustomization()
  const [currentPoints, setCurrentPoints] = useState(2450)
  const [animatedPoints, setAnimatedPoints] = useState(0)
  const [selectedTab, setSelectedTab] = useState('overview')

  // Get current tier
  const currentTier = loyaltyTiers.find(tier => 
    currentPoints >= tier.minPoints && currentPoints <= tier.maxPoints
  ) || loyaltyTiers[0]

  const nextTier = loyaltyTiers.find(tier => tier.id === currentTier.nextTier)
  const progressToNext = nextTier 
    ? ((currentPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100
    : 100

  // Animate points on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPoints(currentPoints)
    }, 500)
    return () => clearTimeout(timer)
  }, [currentPoints])

  const getBadgeColor = (color: string, unlocked: boolean) => {
    if (!unlocked) return 'bg-gray-100 text-gray-400 border-gray-300'
    
    const colors = {
      green: 'bg-green-100 text-green-700 border-green-300',
      blue: 'bg-blue-100 text-blue-700 border-blue-300',
      pink: 'bg-pink-100 text-pink-700 border-pink-300',
      purple: 'bg-purple-100 text-purple-700 border-purple-300',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      orange: 'bg-orange-100 text-orange-700 border-orange-300',
      indigo: 'bg-indigo-100 text-indigo-700 border-indigo-300',
      cyan: 'bg-cyan-100 text-cyan-700 border-cyan-300',
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
            <Trophy className="h-5 w-5 text-white" />
          </div>
          Loyalty & Rewards Program
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Current Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Points & Tier */}
              <Card className="relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${currentTier.gradient} opacity-10`} />
                <CardContent className="p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{currentTier.name}</h3>
                      <p className="text-sm text-gray-600">Current Tier</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                      <currentTier.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {animatedPoints.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Points</div>
                  </div>

                  {nextTier && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress to {nextTier.name}</span>
                        <span className="font-medium">{Math.round(progressToNext)}%</span>
                      </div>
                      <Progress value={progressToNext} className="h-2" />
                      <div className="text-xs text-gray-500 text-center">
                        {nextTier.minPoints - currentPoints} points to next tier
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Circular Progress */}
              <Card>
                <CardContent className="p-6 flex items-center justify-center">
                  <CircularProgress
                    value={currentPoints}
                    max={nextTier ? nextTier.minPoints : currentTier.maxPoints}
                    size={200}
                    strokeWidth={12}
                    color={currentTier.color}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {Math.round(progressToNext)}%
                      </div>
                      <div className="text-sm text-gray-600">Progress</div>
                    </div>
                  </CircularProgress>
                </CardContent>
              </Card>
            </div>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentTier.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-sm text-green-800">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Your Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon
                  return (
                    <Card 
                      key={achievement.id}
                      className={cn(
                        "transition-all duration-300",
                        achievement.unlocked 
                          ? "hover:scale-105 shadow-lg" 
                          : "opacity-60 grayscale"
                      )}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-12 h-12 rounded-lg flex items-center justify-center",
                            getBadgeColor(achievement.color, achievement.unlocked)
                          )}>
                            <Icon className="h-6 w-6" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-sm">{achievement.name}</h4>
                              {achievement.unlocked && (
                                <Badge className="bg-yellow-500 text-white text-xs">
                                  +{achievement.points}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                            
                            {achievement.unlocked ? (
                              <Badge className="bg-green-100 text-green-700 text-xs">
                                <Trophy className="h-3 w-3 mr-1" />
                                Unlocked
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs">
                                Locked
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Redeem Rewards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rewards.map((reward) => {
                  const canAfford = currentPoints >= reward.points
                  
                  return (
                    <Card 
                      key={reward.id}
                      className={cn(
                        "transition-all duration-300",
                        canAfford && reward.available 
                          ? "hover:scale-105 shadow-lg border-green-300" 
                          : "opacity-60"
                      )}
                    >
                      <CardContent className="p-4">
                        <div className="text-center space-y-3">
                          <div className="text-4xl">{reward.icon}</div>
                          
                          <div>
                            <h4 className="font-medium text-sm mb-1">{reward.name}</h4>
                            <p className="text-xs text-gray-600 mb-3">{reward.description}</p>
                            
                            <div className="flex items-center justify-center gap-2 mb-3">
                              <Gem className="h-4 w-4 text-purple-500" />
                              <span className="font-medium text-purple-600">{reward.points} points</span>
                            </div>
                            
                            <Button 
                              size="sm" 
                              className="w-full"
                              disabled={!canAfford || !reward.available}
                            >
                              {!reward.available ? 'Unavailable' : 
                               !canAfford ? 'Not Enough Points' : 'Redeem'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Points History</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      { date: '2024-01-15', action: 'Purchase Order #1234', points: '+125', type: 'earned' },
                      { date: '2024-01-14', action: 'Product Review', points: '+25', type: 'earned' },
                      { date: '2024-01-12', action: 'Redeemed 10% Off Coupon', points: '-500', type: 'redeemed' },
                      { date: '2024-01-10', action: 'Purchase Order #1233', points: '+89', type: 'earned' },
                      { date: '2024-01-08', action: 'Achievement Unlocked', points: '+200', type: 'bonus' },
                    ].map((entry, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-sm text-gray-900">{entry.action}</div>
                          <div className="text-xs text-gray-600">{entry.date}</div>
                        </div>
                        <div className={cn(
                          "font-medium text-sm",
                          entry.type === 'earned' && "text-green-600",
                          entry.type === 'redeemed' && "text-red-600",
                          entry.type === 'bonus' && "text-purple-600"
                        )}>
                          {entry.points}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
