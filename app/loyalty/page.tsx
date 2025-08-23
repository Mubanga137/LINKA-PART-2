"use client"

import { useState, useEffect } from "react"
import "@/styles/loyalty-animations.css"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Crown, 
  Gift, 
  Zap, 
  Star, 
  Trophy, 
  Sparkles, 
  Coins, 
  Target, 
  Users, 
  ShoppingBag, 
  MessageCircle, 
  Calendar, 
  TrendingUp, 
  Award, 
  Repeat, 
  RefreshCw, 
  Share2, 
  Clock, 
  ChevronRight, 
  Play, 
  CheckCircle, 
  Circle,
  Flame,
  Diamond,
  Shield,
  Gem
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { AuthRedirectWrapper } from "@/components/auth-redirect-wrapper"
import { MobilePullRefresh } from "@/components/loyalty/mobile-pull-refresh"
import { StickyPointsTracker } from "@/components/loyalty/sticky-points-tracker"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data - in real app this would come from API
const LOYALTY_DATA = {
  currentPoints: 2450,
  pointsToNextReward: 550,
  currentTier: "Gold",
  nextTier: "Platinum",
  pointsToNextTier: 1500,
  streak: 5,
  totalEarned: 12850,
  totalRedeemed: 10400
}

const TIERS = [
  { name: "Bronze", minPoints: 0, color: "from-orange-600 to-orange-800", icon: Shield, benefits: ["Basic rewards", "Standard shipping"] },
  { name: "Silver", minPoints: 1000, color: "from-gray-400 to-gray-600", icon: Star, benefits: ["5% bonus points", "Priority support"] },
  { name: "Gold", minPoints: 2000, color: "from-yellow-400 to-yellow-600", icon: Crown, benefits: ["10% bonus points", "Free shipping", "Early access"] },
  { name: "Platinum", minPoints: 5000, color: "from-purple-400 to-purple-600", icon: Diamond, benefits: ["15% bonus points", "Premium support", "Exclusive deals", "Personal shopper"] }
]

const REWARDS = [
  {
    id: "1",
    title: "K50 Off Your Next Purchase",
    description: "Valid on orders over K200",
    points: 500,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&q=80",
    category: "Discount",
    expiry: "30 days",
    available: true
  },
  {
    id: "2",
    title: "Free Shipping Voucher",
    description: "Free shipping on any order",
    points: 200,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&q=80",
    category: "Freebies",
    expiry: "60 days",
    available: true
  },
  {
    id: "3",
    title: "Premium Listing Access",
    description: "Access to premium products for 1 month",
    points: 1000,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&q=80",
    category: "Premium",
    expiry: "90 days",
    available: true
  },
  {
    id: "4",
    title: "Coffee Shop Voucher",
    description: "Free coffee at partner cafés",
    points: 300,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&q=80",
    category: "Partner Deals",
    expiry: "14 days",
    available: false
  }
]

const EARNING_METHODS = [
  {
    id: "1",
    title: "Make Purchases",
    description: "Earn 1 point for every K1 spent",
    icon: ShoppingBag,
    points: "+1 per K1",
    progress: 0,
    maxProgress: 100,
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "2",
    title: "Refer Friends",
    description: "Get 200 points for each successful referral",
    icon: Users,
    points: "+200 each",
    progress: 2,
    maxProgress: 5,
    color: "from-green-500 to-green-600"
  },
  {
    id: "3",
    title: "Write Reviews",
    description: "50 points for each product review",
    icon: MessageCircle,
    points: "+50 each",
    progress: 8,
    maxProgress: 10,
    color: "from-purple-500 to-purple-600"
  },
  {
    id: "4",
    title: "Daily Login",
    description: "Bonus points for logging in daily",
    icon: Calendar,
    points: "+10 daily",
    progress: 5,
    maxProgress: 7,
    color: "from-orange-500 to-orange-600"
  }
]

const RECENT_ACTIVITY = [
  { id: "1", action: "Purchased Heritage Crafts", points: 50, date: "2 days ago", type: "earned" },
  { id: "2", action: "Redeemed Free Shipping", points: -200, date: "1 week ago", type: "redeemed" },
  { id: "3", action: "Friend Referral Bonus", points: 200, date: "1 week ago", type: "earned" },
  { id: "4", action: "Product Review Bonus", points: 50, date: "2 weeks ago", type: "earned" },
  { id: "5", action: "Daily Login Streak", points: 70, date: "2 weeks ago", type: "earned" }
]

function LoyaltyPointsContent() {
  const { user } = useAuth()
  const router = useRouter()
  const [selectedRewardCategory, setSelectedRewardCategory] = useState("All")
  const [showConfetti, setShowConfetti] = useState(false)
  const [spinWheel, setSpinWheel] = useState(false)
  const [dailySpinUsed, setDailySpinUsed] = useState(false)
  const [showStickyTracker, setShowStickyTracker] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const currentTierIndex = TIERS.findIndex(tier => tier.name === LOYALTY_DATA.currentTier)
  const nextTierIndex = currentTierIndex + 1 < TIERS.length ? currentTierIndex + 1 : currentTierIndex
  const tierProgress = ((LOYALTY_DATA.currentPoints - TIERS[currentTierIndex].minPoints) / 
                       (TIERS[nextTierIndex].minPoints - TIERS[currentTierIndex].minPoints)) * 100

  const rewardProgress = ((LOYALTY_DATA.currentPoints) / (LOYALTY_DATA.currentPoints + LOYALTY_DATA.pointsToNextReward)) * 100

  // Scroll detection for sticky tracker
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        setShowStickyTracker(window.scrollY > 200)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handlePullRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call to refresh loyalty data
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRefreshing(false)
    console.log("Loyalty data refreshed!")
  }

  const handleSpinWheel = () => {
    if (dailySpinUsed) return

    setSpinWheel(true)
    setTimeout(() => {
      setSpinWheel(false)
      setDailySpinUsed(true)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }, 3000)
  }

  const handleRedeemReward = (reward: any) => {
    if (LOYALTY_DATA.currentPoints >= reward.points) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
      console.log(`Redeemed: ${reward.title}`)
    }
  }

  const filteredRewards = selectedRewardCategory === "All" 
    ? REWARDS 
    : REWARDS.filter(reward => reward.category === selectedRewardCategory)

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Unique Loyalty Background */}
      <div className="fixed inset-0 z-0">
        {/* Main Gradient */}
        <motion.div
          animate={{
            background: [
              "linear-gradient(135deg, #4c1d95 0%, #be185d 50%, #3b82f6 100%)",
              "linear-gradient(135deg, #581c87 0%, #c2185b 50%, #1e40af 100%)",
              "linear-gradient(135deg, #6b21a8 0%, #be185d 50%, #2563eb 100%)",
              "linear-gradient(135deg, #4c1d95 0%, #be185d 50%, #3b82f6 100%)"
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
        
        {/* Golden Shimmer Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/10 via-transparent to-yellow-500/5" />
        
        {/* Floating Gold Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400/60 rounded-full"
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * -200 - 100],
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 8 + 8,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        {/* Premium Glowing Orbs */}
        <motion.div
          animate={{
            x: [0, 300, 0],
            y: [0, -200, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -250, 0],
            y: [0, 150, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/30 rounded-full blur-2xl"
        />
      </div>

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                initial={{
                  x: "50%",
                  y: "50%",
                  scale: 0,
                  rotate: 0
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: [0, 1, 0],
                  rotate: 360
                }}
                transition={{
                  duration: 3,
                  ease: "easeOut",
                  delay: Math.random() * 1
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-32 h-32 mx-auto mb-6 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full shadow-2xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/50 to-transparent rounded-full animate-ping" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Coins className="h-16 w-16 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <Crown className="h-4 w-4 text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Hi {user?.name?.split(' ')[0]}, You've Earned{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                {LOYALTY_DATA.currentPoints.toLocaleString()}
              </span>{" "}
              Points! 🎉
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-purple-100 mb-8"
            >
              Just {LOYALTY_DATA.pointsToNextReward} more points to your next reward
            </motion.p>

            {/* Animated Progress Ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative w-48 h-48 mx-auto mb-8"
            >
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  className="text-white/20"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="url(#gradient)"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: rewardProgress / 100 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  style={{
                    strokeDasharray: "283",
                    strokeDashoffset: `${283 - (283 * rewardProgress) / 100}`
                  }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{Math.round(rewardProgress)}%</div>
                  <div className="text-sm text-purple-200">to next reward</div>
                </div>
              </div>
            </motion.div>

            {/* Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-purple-900 font-bold px-8 py-4 text-lg relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <Gift className="h-6 w-6 mr-3" />
                Redeem Now
                <Sparkles className="h-5 w-5 ml-2 group-hover:animate-spin" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-yellow-400/50 text-white hover:bg-yellow-400/10 px-8 py-4 text-lg backdrop-blur-sm"
                onClick={() => router.push('/marketplace')}
              >
                <Zap className="h-6 w-6 mr-3" />
                Earn More Points
              </Button>
            </motion.div>
          </motion.div>

          {/* Tier Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <Card className="bg-white/90 backdrop-blur-md border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  {/* Current Tier Badge */}
                  <div className="flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-32 h-32 rounded-full bg-gradient-to-br ${TIERS[currentTierIndex].color} shadow-2xl flex items-center justify-center relative`}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-4 border-dashed border-white/30"
                      />
                      {React.createElement(TIERS[currentTierIndex].icon, { 
                        className: "h-16 w-16 text-white" 
                      })}
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                    </motion.div>
                  </div>

                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {LOYALTY_DATA.currentTier} Tier Member 🌟
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Next tier: <span className="font-semibold text-purple-600">{TIERS[nextTierIndex].name}</span> in{" "}
                      <span className="font-bold text-yellow-600">{LOYALTY_DATA.pointsToNextTier.toLocaleString()}</span> points
                    </p>

                    {/* Tier Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>{TIERS[currentTierIndex].name} ({TIERS[currentTierIndex].minPoints}+ points)</span>
                        <span>{TIERS[nextTierIndex].name} ({TIERS[nextTierIndex].minPoints}+ points)</span>
                      </div>
                      <div className="relative">
                        <Progress 
                          value={tierProgress} 
                          className="h-3 bg-gray-200"
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: `${tierProgress}%` }}
                          transition={{ duration: 2, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* Current Tier Benefits */}
                    <div className="flex flex-wrap gap-2">
                      {TIERS[currentTierIndex].benefits.map((benefit, index) => (
                        <Badge key={index} className="bg-purple-100 text-purple-800">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Rewards Marketplace */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center"
                >
                  <Gift className="h-6 w-6 text-white" />
                </motion.div>
                Rewards Marketplace
              </h2>

              {/* Category Filters */}
              <div className="flex gap-2 overflow-x-auto">
                {["All", "Discount", "Freebies", "Premium", "Partner Deals"].map((category) => (
                  <Button
                    key={category}
                    size="sm"
                    variant={selectedRewardCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedRewardCategory(category)}
                    className={`whitespace-nowrap ${
                      selectedRewardCategory === category
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-purple-900"
                        : "border-white/30 text-white hover:bg-white/10"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredRewards.map((reward, index) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <Card className="overflow-hidden bg-white/95 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                    <div className="relative">
                      <img
                        src={reward.image}
                        alt={reward.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className={`${
                          reward.category === "Discount" ? "bg-red-500" :
                          reward.category === "Freebies" ? "bg-green-500" :
                          reward.category === "Premium" ? "bg-purple-500" :
                          "bg-blue-500"
                        } text-white`}>
                          {reward.category}
                        </Badge>
                      </div>
                      {!reward.available && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge className="bg-gray-500 text-white">Out of Stock</Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                        {reward.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {reward.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Coins className="h-5 w-5 text-yellow-600" />
                          <span className="font-bold text-xl text-yellow-600">
                            {reward.points.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Expires in {reward.expiry}
                        </div>
                      </div>

                      <Button
                        onClick={() => handleRedeemReward(reward)}
                        disabled={!reward.available || LOYALTY_DATA.currentPoints < reward.points}
                        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-purple-900 font-bold relative overflow-hidden group/btn"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover/btn:opacity-100"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                        {LOYALTY_DATA.currentPoints >= reward.points ? (
                          <>
                            <Gift className="h-4 w-4 mr-2" />
                            Redeem Now
                          </>
                        ) : (
                          <>
                            <Circle className="h-4 w-4 mr-2" />
                            Need {reward.points - LOYALTY_DATA.currentPoints} more
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* How to Earn More Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              How to Earn More Points
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {EARNING_METHODS.map((method, index) => (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <Card className="bg-white/95 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${method.color} shadow-lg flex items-center justify-center mx-auto mb-4`}
                      >
                        <method.icon className="h-8 w-8 text-white" />
                      </motion.div>

                      <h3 className="font-bold text-gray-900 mb-2">
                        {method.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {method.description}
                      </p>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Progress</span>
                          <span>{method.progress}/{method.maxProgress}</span>
                        </div>
                        <Progress 
                          value={(method.progress / method.maxProgress) * 100} 
                          className="h-2"
                        />
                      </div>

                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                        {method.points}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity & Gamification Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Recent Activity Feed */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6 }}
            >
              <Card className="bg-white/95 backdrop-blur-md border-0 shadow-xl h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-purple-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {RECENT_ACTIVITY.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.7 + index * 0.1 }}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === "earned" 
                            ? "bg-green-100 text-green-600" 
                            : "bg-red-100 text-red-600"
                        }`}>
                          {activity.type === "earned" ? (
                            <TrendingUp className="h-5 w-5" />
                          ) : (
                            <Gift className="h-5 w-5" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-500">{activity.date}</p>
                        </div>
                        
                        <div className={`font-bold ${
                          activity.type === "earned" ? "text-green-600" : "text-red-600"
                        }`}>
                          {activity.type === "earned" ? "+" : ""}{activity.points} pts
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Gamification Widgets */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8 }}
              className="space-y-6"
            >
              {/* Daily Spin Wheel */}
              <Card className="bg-white/95 backdrop-blur-md border-0 shadow-xl">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                    <Target className="h-6 w-6 text-purple-600" />
                    Daily Bonus Spin
                  </h3>
                  
                  <motion.div
                    animate={{ 
                      rotate: spinWheel ? 1440 : 0,
                      scale: spinWheel ? [1, 1.1, 1] : 1
                    }}
                    transition={{ duration: 3, ease: "easeOut" }}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4"
                  >
                    <Sparkles className="h-12 w-12 text-white" />
                  </motion.div>
                  
                  <Button
                    onClick={handleSpinWheel}
                    disabled={dailySpinUsed || spinWheel}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                  >
                    {dailySpinUsed ? "Come back tomorrow!" : spinWheel ? "Spinning..." : "Spin for Bonus!"}
                  </Button>
                </CardContent>
              </Card>

              {/* Streak Tracker */}
              <Card className="bg-white/95 backdrop-blur-md border-0 shadow-xl">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                    <Flame className="h-6 w-6 text-orange-500" />
                    Login Streak
                  </h3>
                  
                  <div className="flex justify-center gap-2 mb-4">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          i < LOYALTY_DATA.streak 
                            ? "bg-orange-500 text-white" 
                            : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        {i < LOYALTY_DATA.streak ? (
                          <Flame className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {LOYALTY_DATA.streak} day streak!
                  </p>
                  <Badge className="bg-orange-100 text-orange-800">
                    +{LOYALTY_DATA.streak * 10} bonus points earned
                  </Badge>
                </CardContent>
              </Card>

              {/* Milestone Achievement */}
              <Card className="bg-gradient-to-br from-yellow-400 to-yellow-600 border-0 shadow-xl text-purple-900">
                <CardContent className="p-6 text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Trophy className="h-10 w-10 text-white" />
                  </motion.div>
                  
                  <h3 className="font-bold mb-2">🎊 Milestone Unlocked!</h3>
                  <p className="text-sm mb-4">
                    You reached 2,000 points! Here's a 10% off voucher.
                  </p>
                  
                  <Button 
                    size="sm" 
                    className="bg-white/20 text-white hover:bg-white/30 border border-white/30"
                  >
                    Claim Reward
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 border-0 shadow-2xl text-white overflow-hidden">
              <CardContent className="p-12 relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute top-6 right-6 w-20 h-20 border-2 border-dashed border-white/30 rounded-full"
                />
                
                <h2 className="text-4xl font-bold mb-4">
                  Start Your Next Adventure!
                </h2>
                <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                  Discover amazing products, earn points with every purchase, and unlock exclusive rewards. 
                  Your journey to the next tier starts now!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-gray-100 text-xl px-8 py-4"
                    onClick={() => router.push('/marketplace')}
                  >
                    <ShoppingBag className="h-6 w-6 mr-3" />
                    Shop & Earn Points
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/30 text-white hover:bg-white/10 text-xl px-8 py-4"
                    onClick={() => router.push('/profile')}
                  >
                    <Share2 className="h-6 w-6 mr-3" />
                    Invite Friends
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default function LoyaltyPointsPage() {
  return (
    <AuthRedirectWrapper requiredRole="customer">
      <LoyaltyPointsContent />
    </AuthRedirectWrapper>
  )
}
