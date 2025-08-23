"use client"

import React, { useState, useEffect } from "react"
import "@/styles/loyalty-animations.css"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
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
  Gem,
  Heart,
  Bell,
  Settings,
  RotateCcw,
  Send,
  ArrowUp,
  Rocket,
  Lightning,
  PartyPopper,
  Medal,
  Gamepad2,
  Timer,
  Gauge,
  Wallet,
  ArrowRight,
  Filter,
  Search,
  ChevronDown,
  Eye,
  Download,
  Upload,
  MapPin,
  Home
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { AuthRedirectWrapper } from "@/components/auth-redirect-wrapper"
import { MobilePullRefresh } from "@/components/loyalty/mobile-pull-refresh"
import { StickyPointsTracker } from "@/components/loyalty/sticky-points-tracker"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Enhanced mock data with more comprehensive features
const LOYALTY_DATA = {
  currentPoints: 2450,
  pointsToNextReward: 550,
  currentTier: "Gold",
  nextTier: "Platinum",
  pointsToNextTier: 1500,
  streak: 5,
  totalEarned: 12850,
  totalRedeemed: 10400,
  weeklyProgress: 75,
  monthlyTarget: 5000,
  referralCount: 3,
  reviewCount: 8,
  purchaseCount: 23
}

const TIERS = [
  { 
    name: "Bronze", 
    minPoints: 0, 
    color: "from-orange-400 to-orange-600", 
    icon: Shield, 
    benefits: ["Basic rewards", "Standard shipping", "5% bonus points"], 
    multiplier: 1.0 
  },
  { 
    name: "Silver", 
    minPoints: 1000, 
    color: "from-gray-400 to-gray-600", 
    icon: Star, 
    benefits: ["10% bonus points", "Priority support", "Free shipping over K100"], 
    multiplier: 1.1 
  },
  { 
    name: "Gold", 
    minPoints: 2000, 
    color: "from-yellow-400 to-yellow-600", 
    icon: Crown, 
    benefits: ["15% bonus points", "Free shipping", "Early access", "Birthday rewards"], 
    multiplier: 1.15 
  },
  { 
    name: "Platinum", 
    minPoints: 5000, 
    color: "from-blue-400 to-blue-600", 
    icon: Diamond, 
    benefits: ["20% bonus points", "Premium support", "Exclusive deals", "Personal shopper", "VIP events"], 
    multiplier: 1.2 
  }
]

const REWARDS = [
  {
    id: "1",
    title: "K50 Shopping Voucher",
    description: "Valid on orders over K200. Perfect for your next big purchase!",
    points: 500,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80",
    category: "Discounts",
    expiry: "30 days",
    available: true,
    popular: true,
    rarity: "common"
  },
  {
    id: "2",
    title: "Free Express Shipping",
    description: "Lightning fast delivery on any order, anywhere in Zambia",
    points: 200,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80",
    category: "Freebies",
    expiry: "60 days",
    available: true,
    popular: false,
    rarity: "common"
  },
  {
    id: "3",
    title: "Premium Marketplace Access",
    description: "Unlock exclusive premium products and early access sales",
    points: 1000,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80",
    category: "Premium Perks",
    expiry: "90 days",
    available: true,
    popular: true,
    rarity: "rare"
  },
  {
    id: "4",
    title: "Local Coffee Voucher",
    description: "Free coffee at 50+ partner cafés across Lusaka and Kitwe",
    points: 300,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80",
    category: "Partner Deals",
    expiry: "14 days",
    available: true,
    popular: false,
    rarity: "common"
  }
]

const EARNING_METHODS = [
  {
    id: "1",
    title: "Make Purchases",
    description: "Earn 1 point for every K1 spent",
    icon: ShoppingBag,
    points: "+1 per K1",
    progress: 75,
    maxProgress: 100,
    color: "from-orange-500 to-orange-600",
    action: "Shop Now",
    link: "/marketplace"
  },
  {
    id: "2",
    title: "Refer Friends",
    description: "Get 200 points for each successful referral",
    icon: Users,
    points: "+200 each",
    progress: 3,
    maxProgress: 5,
    color: "from-blue-500 to-blue-600",
    action: "Invite Friends",
    link: "/profile"
  },
  {
    id: "3",
    title: "Write Reviews",
    description: "50 points for each helpful product review",
    icon: MessageCircle,
    points: "+50 each",
    progress: 8,
    maxProgress: 10,
    color: "from-emerald-500 to-emerald-600",
    action: "Write Review",
    link: "/orders"
  },
  {
    id: "4",
    title: "Daily Check-in",
    description: "Bonus points for logging in daily",
    icon: Calendar,
    points: "+10 daily",
    progress: 5,
    maxProgress: 7,
    color: "from-purple-500 to-purple-600",
    action: "Check In",
    link: "#"
  }
]

const CHALLENGES = [
  {
    id: "1",
    title: "Weekend Warrior",
    description: "Make 3 purchases this weekend",
    reward: 300,
    progress: 1,
    target: 3,
    timeLeft: "2 days",
    difficulty: "Easy",
    type: "weekly"
  },
  {
    id: "2", 
    title: "Review Master",
    description: "Write 5 product reviews",
    reward: 250,
    progress: 3,
    target: 5,
    timeLeft: "5 days",
    difficulty: "Medium",
    type: "weekly"
  },
  {
    id: "3",
    title: "Social Butterfly",
    description: "Refer 2 new friends this month",
    reward: 500,
    progress: 1,
    target: 2,
    timeLeft: "12 days",
    difficulty: "Hard",
    type: "monthly"
  }
]

const RECENT_ACTIVITY = [
  { id: "1", action: "Purchased Traditional Wear", points: 150, date: "2 hours ago", type: "earned", icon: ShoppingBag },
  { id: "2", action: "Daily Check-in Bonus", points: 10, date: "This morning", type: "earned", icon: Calendar },
  { id: "3", action: "Redeemed Free Shipping", points: -200, date: "Yesterday", type: "redeemed", icon: Gift },
  { id: "4", action: "Friend Referral Bonus", points: 200, date: "2 days ago", type: "earned", icon: Users },
  { id: "5", action: "Product Review Bonus", points: 50, date: "3 days ago", type: "earned", icon: MessageCircle },
  { id: "6", action: "Streak Milestone Bonus", points: 100, date: "1 week ago", type: "earned", icon: Flame }
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
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

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

  const filteredRewards = REWARDS.filter(reward => {
    const matchesCategory = selectedRewardCategory === "All" || reward.category === selectedRewardCategory
    const matchesSearch = reward.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reward.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const categories = ["All", ...Array.from(new Set(REWARDS.map(r => r.category)))]

  return (
    <MobilePullRefresh onRefresh={handlePullRefresh}>
      <StickyPointsTracker
        currentPoints={LOYALTY_DATA.currentPoints}
        currentTier={LOYALTY_DATA.currentTier}
        pointsToNextReward={LOYALTY_DATA.pointsToNextReward}
        isVisible={showStickyTracker}
      />
      
      <div className="min-h-screen relative overflow-hidden">
        {/* Premium Background with Orange/Blue Teal Theme */}
        <div className="fixed inset-0 z-0">
          {/* Dynamic Gradient Base */}
          <motion.div
            animate={{
              background: [
                "linear-gradient(135deg, #ff6b35 0%, #14b8a6 50%, #3b82f6 100%)",
                "linear-gradient(135deg, #ff8c42 0%, #0d9488 50%, #2563eb 100%)",
                "linear-gradient(135deg, #ff7849 0%, #0f766e 50%, #1d4ed8 100%)",
                "linear-gradient(135deg, #ff6b35 0%, #14b8a6 50%, #3b82f6 100%)"
              ]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          />
          
          {/* Premium Overlay Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-300/20 via-transparent to-teal-500/20" />
          <div className="absolute inset-0 bg-gradient-to-tl from-blue-400/10 via-transparent to-orange-400/10" />
          
          {/* Floating Animated Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 rounded-full ${
                  i % 3 === 0 ? 'bg-orange-400/30' : 
                  i % 3 === 1 ? 'bg-teal-400/30' : 'bg-blue-400/30'
                }`}
                animate={{
                  x: [0, Math.random() * 300 - 150],
                  y: [0, Math.random() * -400 - 200],
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: Math.random() * 15 + 10,
                  repeat: Infinity,
                  delay: Math.random() * 8,
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
              x: [0, 400, 0],
              y: [0, -300, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-10 w-60 h-60 bg-orange-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -350, 0],
              y: [0, 200, 0]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
            className="absolute bottom-10 right-10 w-48 h-48 bg-teal-400/25 rounded-full blur-2xl"
          />
        </div>

        {/* Confetti Effect */}
        <AnimatePresence>
          {showConfetti && (
            <div className="fixed inset-0 z-50 pointer-events-none">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-3 h-3 rounded-full ${
                    i % 3 === 0 ? 'bg-orange-400' : 
                    i % 3 === 1 ? 'bg-teal-400' : 'bg-blue-400'
                  }`}
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
                    duration: 4,
                    ease: "easeOut",
                    delay: Math.random() * 1.5
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
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between text-sm text-white/80 mb-6"
            >
              <div className="flex items-center">
                <Link href="/customer-dashboard" className="hover:text-orange-300 transition-colors flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-orange-300 font-semibold">Rewards Hub</span>
              </div>
              
              {/* Simple Notification Bell */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 relative"
                >
                  <Bell className="h-5 w-5" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                </Button>
              </div>
            </motion.div>

            {/* Hero Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 6, repeat: Infinity }}
                className="w-40 h-40 mx-auto mb-6 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-full shadow-2xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-300/40 to-transparent rounded-full animate-ping" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Coins className="h-20 w-20 text-white" />
                  </motion.div>
                </div>
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Crown className="h-6 w-6 text-white" />
                </motion.div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold text-white mb-4"
              >
                Hi {user?.name?.split(' ')[0]}, welcome to your{" "}
                <span className="bg-gradient-to-r from-orange-300 to-teal-300 bg-clip-text text-transparent">
                  Rewards Hub
                </span>{" "}
                🎉
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl text-white/90 mb-4"
              >
                You have{" "}
                <span className="font-bold text-orange-300 text-3xl">
                  {LOYALTY_DATA.currentPoints.toLocaleString()}
                </span>{" "}
                Points
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-teal-200 mb-8"
              >
                Just {LOYALTY_DATA.pointsToNextReward} more to your next reward
              </motion.p>

              {/* Enhanced Progress Ring */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="relative w-56 h-56 mx-auto mb-8"
              >
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-white/20"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#progressGradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: rewardProgress / 100 }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    style={{
                      strokeDasharray: "283",
                      strokeDashoffset: `${283 - (283 * rewardProgress) / 100}`
                    }}
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fb923c" />
                      <stop offset="50%" stopColor="#14b8a6" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div 
                      className="text-4xl font-bold text-white mb-1"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {Math.round(rewardProgress)}%
                    </motion.div>
                    <div className="text-sm text-white/80">to next reward</div>
                  </div>
                </div>
              </motion.div>

              {/* Premium CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold px-10 py-6 text-xl relative overflow-hidden group shadow-2xl"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <Gift className="h-7 w-7 mr-3" />
                  Redeem Rewards
                  <Sparkles className="h-6 w-6 ml-3 group-hover:animate-spin" />
                </Button>
                
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-teal-400 to-blue-600 hover:from-teal-500 hover:to-blue-700 text-white font-bold px-10 py-6 text-xl shadow-2xl"
                  onClick={() => router.push('/marketplace')}
                >
                  <Zap className="h-7 w-7 mr-3" />
                  Earn More Points
                  <ArrowRight className="h-6 w-6 ml-3" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Main Dashboard Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-12"
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-md border-0">
                  <TabsTrigger value="overview" className="text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    <Gauge className="h-4 w-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="rewards" className="text-white data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                    <Gift className="h-4 w-4 mr-2" />
                    Rewards
                  </TabsTrigger>
                  <TabsTrigger value="earn" className="text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                    <Rocket className="h-4 w-4 mr-2" />
                    Earn
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="text-white data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                    <Clock className="h-4 w-4 mr-2" />
                    Activity
                  </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="mt-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Dashboard Cards */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Points Balance & Tier Status Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Points Balance Card */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.0 }}
                          whileHover={{ y: -5, scale: 1.02 }}
                        >
                          <Card className="bg-gradient-to-br from-orange-500/90 to-orange-600/90 backdrop-blur-md border-0 shadow-2xl text-white overflow-hidden">
                            <CardContent className="p-6 relative">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute top-4 right-4 w-16 h-16 border-2 border-dashed border-white/20 rounded-full"
                              />
                              <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                                  <Wallet className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-white/90">Total Points</h3>
                                  <motion.p 
                                    className="text-3xl font-bold"
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                  >
                                    {LOYALTY_DATA.currentPoints.toLocaleString()}
                                  </motion.p>
                                </div>
                              </div>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-white/80">This month earned</span>
                                  <span className="font-semibold">+{(LOYALTY_DATA.totalEarned * 0.2).toFixed(0)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/80">Total lifetime</span>
                                  <span className="font-semibold">{LOYALTY_DATA.totalEarned.toLocaleString()}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>

                        {/* Tier Status Card */}
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.1 }}
                          whileHover={{ y: -5, scale: 1.02 }}
                        >
                          <Card className="bg-gradient-to-br from-teal-500/90 to-teal-600/90 backdrop-blur-md border-0 shadow-2xl text-white overflow-hidden">
                            <CardContent className="p-6 relative">
                              <motion.div
                                animate={{ 
                                  scale: [1, 1.1, 1],
                                  rotate: [0, 180, 360]
                                }}
                                transition={{ duration: 10, repeat: Infinity }}
                                className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                              >
                                {React.createElement(TIERS[currentTierIndex].icon, { 
                                  className: "h-6 w-6 text-white" 
                                })}
                              </motion.div>
                              <div className="mb-4">
                                <h3 className="text-lg font-semibold text-white/90">Current Tier</h3>
                                <p className="text-3xl font-bold">{LOYALTY_DATA.currentTier}</p>
                              </div>
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-white/80">Progress to {TIERS[nextTierIndex].name}</span>
                                    <span className="font-semibold">{Math.round(tierProgress)}%</span>
                                  </div>
                                  <div className="w-full bg-white/20 rounded-full h-2">
                                    <motion.div
                                      className="bg-white rounded-full h-2"
                                      initial={{ width: "0%" }}
                                      animate={{ width: `${tierProgress}%` }}
                                      transition={{ duration: 2, ease: "easeOut" }}
                                    />
                                  </div>
                                </div>
                                <div className="text-sm text-white/80">
                                  {LOYALTY_DATA.pointsToNextTier} points to upgrade
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </div>

                      {/* Weekly Challenges Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        whileHover={{ y: -5 }}
                      >
                        <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-gray-900">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <Target className="h-6 w-6 text-white" />
                              </div>
                              Weekly Challenges
                              <Badge className="bg-purple-100 text-purple-800 ml-auto">
                                {CHALLENGES.filter(c => c.type === 'weekly').length} Active
                              </Badge>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {CHALLENGES.filter(c => c.type === 'weekly').map((challenge, index) => (
                                <motion.div
                                  key={challenge.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 1.3 + index * 0.1 }}
                                  className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200"
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <div>
                                      <h4 className="font-semibold text-gray-900">{challenge.title}</h4>
                                      <p className="text-sm text-gray-600">{challenge.description}</p>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-lg font-bold text-purple-600">+{challenge.reward}</div>
                                      <div className="text-xs text-gray-500">{challenge.timeLeft} left</div>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span>Progress</span>
                                      <span className="font-semibold">{challenge.progress}/{challenge.target}</span>
                                    </div>
                                    <div className="w-full bg-purple-200 rounded-full h-2">
                                      <motion.div
                                        className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-full h-2"
                                        initial={{ width: "0%" }}
                                        animate={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                      />
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>

                    {/* Sidebar - Gamification Widgets */}
                    <div className="space-y-6">
                      {/* Daily Spin Wheel */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.4 }}
                        whileHover={{ y: -5 }}
                      >
                        <Card className="bg-gradient-to-br from-yellow-400 to-yellow-500 border-0 shadow-2xl text-white">
                          <CardContent className="p-6 text-center">
                            <h3 className="font-bold text-white mb-4 flex items-center justify-center gap-2">
                              <Gamepad2 className="h-6 w-6" />
                              Lucky Spin
                            </h3>
                            
                            <motion.div
                              animate={{ 
                                rotate: spinWheel ? 1440 : 0,
                                scale: spinWheel ? [1, 1.2, 1] : 1
                              }}
                              transition={{ duration: 3, ease: "easeOut" }}
                              className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 relative"
                            >
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              >
                                <Sparkles className="h-14 w-14 text-white" />
                              </motion.div>
                              <div className="absolute inset-0 border-4 border-dashed border-white/40 rounded-full animate-pulse" />
                            </motion.div>
                            
                            <Button
                              onClick={handleSpinWheel}
                              disabled={dailySpinUsed || spinWheel}
                              className="w-full bg-white/20 text-white hover:bg-white/30 border border-white/30 font-bold"
                            >
                              {dailySpinUsed ? "Come back tomorrow!" : spinWheel ? "Spinning..." : "Spin for Bonus!"}
                            </Button>
                            {!dailySpinUsed && (
                              <p className="text-xs text-white/80 mt-2">Win up to 100 points!</p>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>

                      {/* Streak Tracker */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.5 }}
                        whileHover={{ y: -5 }}
                      >
                        <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl">
                          <CardContent className="p-6 text-center">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                              <Flame className="h-6 w-6 text-orange-500" />
                              Login Streak
                            </h3>
                            
                            <div className="flex justify-center gap-1 mb-4">
                              {[...Array(7)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 1.6 + i * 0.1 }}
                                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    i < LOYALTY_DATA.streak 
                                      ? "bg-gradient-to-br from-orange-400 to-orange-600 text-white" 
                                      : "bg-gray-200 text-gray-400"
                                  }`}
                                >
                                  {i < LOYALTY_DATA.streak ? (
                                    <Flame className="h-4 w-4" />
                                  ) : (
                                    <Circle className="h-4 w-4" />
                                  )}
                                </motion.div>
                              ))}
                            </div>
                            
                            <motion.p 
                              className="text-2xl font-bold text-orange-600 mb-2"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {LOYALTY_DATA.streak} Days
                            </motion.p>
                            <Badge className="bg-orange-100 text-orange-800 mb-3">
                              +{LOYALTY_DATA.streak * 10} bonus earned
                            </Badge>
                            <p className="text-xs text-gray-600">
                              Keep logging in daily to maintain your streak!
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>

                      {/* Achievement Milestone */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.6 }}
                        whileHover={{ y: -5 }}
                      >
                        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 shadow-2xl text-white overflow-hidden">
                          <CardContent className="p-6 text-center relative">
                            <motion.div
                              animate={{ 
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ duration: 4, repeat: Infinity }}
                              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                            >
                              <Trophy className="h-10 w-10 text-white" />
                            </motion.div>
                            
                            <h3 className="font-bold mb-2">🎊 New Achievement!</h3>
                            <p className="text-sm mb-4 text-white/90">
                              Gold Tier Unlocked! You've earned exclusive benefits.
                            </p>
                            
                            <Button 
                              size="sm" 
                              className="bg-white/20 text-white hover:bg-white/30 border border-white/30"
                            >
                              View Benefits
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>
                  </div>
                </TabsContent>

                {/* Rewards Marketplace Tab */}
                <TabsContent value="rewards" className="mt-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {/* Search and Filters */}
                    <div className="flex flex-col lg:flex-row gap-4 mb-8">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="Search rewards..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-white/90 backdrop-blur-md border-0 shadow-lg"
                        />
                      </div>
                      
                      <div className="flex gap-2 overflow-x-auto">
                        {categories.map((category) => (
                          <Button
                            key={category}
                            size="sm"
                            variant={selectedRewardCategory === category ? "default" : "outline"}
                            onClick={() => setSelectedRewardCategory(category)}
                            className={`whitespace-nowrap ${
                              selectedRewardCategory === category
                                ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white"
                                : "border-white/30 text-white hover:bg-white/10 bg-white/5 backdrop-blur-md"
                            }`}
                          >
                            {category}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Rewards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredRewards.map((reward, index) => (
                        <motion.div
                          key={reward.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
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
                              <div className="absolute top-3 left-3">
                                <Badge className={`${
                                  reward.category === "Discounts" ? "bg-red-500" :
                                  reward.category === "Freebies" ? "bg-green-500" :
                                  reward.category === "Premium Perks" ? "bg-purple-500" :
                                  "bg-blue-500"
                                } text-white`}>
                                  {reward.category}
                                </Badge>
                              </div>
                              <div className="absolute top-3 right-3">
                                {reward.popular && (
                                  <Badge className="bg-orange-500 text-white">
                                    🔥 Popular
                                  </Badge>
                                )}
                              </div>
                              <div className="absolute bottom-3 left-3">
                                <Badge className={`${
                                  reward.rarity === "common" ? "bg-gray-500" :
                                  reward.rarity === "rare" ? "bg-blue-500" :
                                  "bg-purple-500"
                                } text-white text-xs`}>
                                  {reward.rarity}
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
                              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {reward.description}
                              </p>

                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                  <Coins className="h-5 w-5 text-orange-600" />
                                  <span className="font-bold text-xl text-orange-600">
                                    {reward.points.toLocaleString()}
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                  <Timer className="h-3 w-3" />
                                  {reward.expiry}
                                </div>
                              </div>

                              <Button
                                onClick={() => handleRedeemReward(reward)}
                                disabled={!reward.available || LOYALTY_DATA.currentPoints < reward.points}
                                className={`w-full font-bold relative overflow-hidden group/btn ${
                                  LOYALTY_DATA.currentPoints >= reward.points && reward.available
                                    ? "bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                              >
                                {LOYALTY_DATA.currentPoints >= reward.points && reward.available ? (
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover/btn:opacity-100"
                                    animate={{ x: ['-100%', '100%'] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                  />
                                ) : null}
                                {!reward.available ? (
                                  <>
                                    <Circle className="h-4 w-4 mr-2" />
                                    Out of Stock
                                  </>
                                ) : LOYALTY_DATA.currentPoints >= reward.points ? (
                                  <>
                                    <Gift className="h-4 w-4 mr-2" />
                                    Redeem Now
                                  </>
                                ) : (
                                  <>
                                    <Circle className="h-4 w-4 mr-2" />
                                    Need {(reward.points - LOYALTY_DATA.currentPoints).toLocaleString()} more
                                  </>
                                )}
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </TabsContent>

                {/* Earn More Points Tab */}
                <TabsContent value="earn" className="mt-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-8"
                  >
                    {/* Earning Methods Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {EARNING_METHODS.map((method, index) => (
                        <motion.div
                          key={method.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
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
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <motion.div
                                    className={`bg-gradient-to-r ${method.color} rounded-full h-2`}
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${(method.progress / method.maxProgress) * 100}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                  />
                                </div>
                              </div>

                              <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white mb-4">
                                {method.points}
                              </Badge>

                              <Button
                                size="sm"
                                className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white"
                                onClick={() => router.push(method.link)}
                              >
                                {method.action}
                                <ArrowRight className="h-4 w-4 ml-2" />
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    {/* Monthly Challenges */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                    >
                      <Card className="bg-gradient-to-br from-purple-600 to-purple-700 border-0 shadow-2xl text-white">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3 text-white">
                            <Medal className="h-8 w-8" />
                            Monthly Mega Challenges
                            <Badge className="bg-white/20 text-white ml-auto">
                              High Rewards
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {CHALLENGES.filter(c => c.type === 'monthly').map((challenge, index) => (
                              <motion.div
                                key={challenge.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.1 + index * 0.1 }}
                                className="p-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20"
                              >
                                <div className="text-center mb-3">
                                  <h4 className="font-bold text-white mb-1">{challenge.title}</h4>
                                  <p className="text-sm text-white/80">{challenge.description}</p>
                                </div>
                                <div className="text-center mb-3">
                                  <div className="text-2xl font-bold text-yellow-300">+{challenge.reward}</div>
                                  <div className="text-xs text-white/70">{challenge.timeLeft} remaining</div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Progress</span>
                                    <span className="font-semibold">{challenge.progress}/{challenge.target}</span>
                                  </div>
                                  <div className="w-full bg-white/20 rounded-full h-2">
                                    <motion.div
                                      className="bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full h-2"
                                      initial={{ width: "0%" }}
                                      animate={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                                      transition={{ duration: 1.5, ease: "easeOut" }}
                                    />
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                </TabsContent>

                {/* Activity Tab */}
                <TabsContent value="activity" className="mt-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                  >
                    {/* Recent Activity Feed */}
                    <Card className="bg-white/95 backdrop-blur-md border-0 shadow-xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <Clock className="h-6 w-6 text-blue-600" />
                          Recent Activity
                          <Badge className="bg-blue-100 text-blue-800 ml-auto">
                            Last 7 days
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          {RECENT_ACTIVITY.map((activity, index) => (
                            <motion.div
                              key={activity.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + index * 0.1 }}
                              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                            >
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                activity.type === "earned" 
                                  ? "bg-gradient-to-br from-green-400 to-green-600 text-white" 
                                  : "bg-gradient-to-br from-orange-400 to-orange-600 text-white"
                              }`}>
                                <activity.icon className="h-6 w-6" />
                              </div>
                              
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{activity.action}</p>
                                <p className="text-sm text-gray-500">{activity.date}</p>
                              </div>
                              
                              <div className={`font-bold text-lg ${
                                activity.type === "earned" ? "text-green-600" : "text-orange-600"
                              }`}>
                                {activity.type === "earned" ? "+" : ""}{activity.points} pts
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Statistics & Insights */}
                    <div className="space-y-6">
                      {/* Points Statistics */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <Card className="bg-gradient-to-br from-teal-500 to-teal-600 border-0 shadow-xl text-white">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-white">
                              <TrendingUp className="h-6 w-6" />
                              Points Overview
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-white/80">Total Earned</span>
                                <span className="text-2xl font-bold">{LOYALTY_DATA.totalEarned.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-white/80">Total Redeemed</span>
                                <span className="text-2xl font-bold">{LOYALTY_DATA.totalRedeemed.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-white/80">Current Balance</span>
                                <span className="text-2xl font-bold">{LOYALTY_DATA.currentPoints.toLocaleString()}</span>
                              </div>
                              <div className="pt-2 border-t border-white/20">
                                <div className="flex justify-between items-center">
                                  <span className="text-white/80">Savings Rate</span>
                                  <span className="text-lg font-semibold">
                                    {Math.round((LOYALTY_DATA.currentPoints / LOYALTY_DATA.totalEarned) * 100)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>

                      {/* Tier Benefits */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.0 }}
                      >
                        <Card className="bg-white/95 backdrop-blur-md border-0 shadow-xl">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                              <Crown className="h-6 w-6 text-yellow-600" />
                              {LOYALTY_DATA.currentTier} Tier Benefits
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {TIERS[currentTierIndex].benefits.map((benefit, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 1.1 + index * 0.1 }}
                                  className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-yellow-50 to-yellow-100"
                                >
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                  <span className="text-gray-700">{benefit}</span>
                                </motion.div>
                              ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <p className="text-sm text-gray-600 mb-2">
                                Points multiplier: <span className="font-bold text-yellow-600">{TIERS[currentTierIndex].multiplier}x</span>
                              </p>
                              <Button
                                size="sm"
                                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white"
                              >
                                Upgrade to {TIERS[nextTierIndex]?.name || 'Max Tier'}
                                <ArrowUp className="h-4 w-4 ml-2" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Bottom CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0 }}
              className="text-center"
            >
              <Card className="bg-gradient-to-br from-orange-500 via-teal-600 to-blue-600 border-0 shadow-2xl text-white overflow-hidden relative">
                <CardContent className="p-12 relative z-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute top-6 right-6 w-20 h-20 border-2 border-dashed border-white/30 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-6 left-6 w-16 h-16 border-2 border-dotted border-white/20 rounded-full"
                  />
                  
                  <motion.h2
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-5xl font-bold mb-4"
                  >
                    Your Next Adventure Awaits!
                  </motion.h2>
                  <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                    Join thousands of satisfied customers earning rewards with every purchase. 
                    Discover amazing local products, unlock exclusive perks, and climb the tier ladder!
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Button
                      size="lg"
                      className="bg-white text-orange-600 hover:bg-gray-100 text-xl px-10 py-6 font-bold shadow-xl"
                      onClick={() => router.push('/marketplace')}
                    >
                      <ShoppingBag className="h-7 w-7 mr-3" />
                      Start Shopping & Earning
                      <Sparkles className="h-6 w-6 ml-3" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white/50 text-white hover:bg-white/10 text-xl px-10 py-6 font-bold backdrop-blur-md"
                      onClick={() => router.push('/profile')}
                    >
                      <Users className="h-7 w-7 mr-3" />
                      Invite Friends
                      <Share2 className="h-6 w-6 ml-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </main>

          <Footer />
        </div>
      </div>
    </MobilePullRefresh>
  )
}

export default function LoyaltyPointsPage() {
  return (
    <AuthRedirectWrapper requiredRole="customer">
      <LoyaltyPointsContent />
    </AuthRedirectWrapper>
  )
}
