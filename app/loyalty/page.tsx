"use client"

import React, { useState, useEffect, useCallback } from "react"
import "@/styles/loyalty-animations.css"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
  Home,
  Palette,
  Layout,
  Layers,
  BarChart3,
  TrendingDown,
  Plus,
  Minus,
  RotateCw,
  Volume2,
  VolumeX,
  Lock,
  Unlock
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NotificationsSystem, generateSampleNotifications, type Notification as LoyaltyNotification } from "@/components/loyalty/notifications-system"
import { GiftTransferPoints } from "@/components/loyalty/gift-transfer-points"
import { ThemeCustomization } from "@/components/loyalty/theme-customization"
import { DragDropLayout } from "@/components/loyalty/drag-drop-layout"
import { EnhancedMobilePullRefresh } from "@/components/loyalty/enhanced-mobile-pull-refresh"
import { useAuth } from "@/contexts/auth-context"
import { AuthRedirectWrapper } from "@/components/auth-redirect-wrapper"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

// Enhanced loyalty data with gamification elements
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
  purchaseCount: 23,
  level: 15,
  xp: 2450,
  xpToNextLevel: 550
}

const TIERS = [
  { 
    name: "Bronze", 
    minPoints: 0, 
    color: "from-orange-400 to-orange-600", 
    metallic: "from-orange-300 via-orange-400 to-orange-600",
    icon: Shield, 
    benefits: ["Basic rewards", "Standard shipping", "5% bonus points"], 
    multiplier: 1.0,
    badge: "🥉"
  },
  { 
    name: "Silver", 
    minPoints: 1000, 
    color: "from-gray-400 to-gray-600", 
    metallic: "from-gray-300 via-gray-400 to-gray-600",
    icon: Star, 
    benefits: ["10% bonus points", "Priority support", "Free shipping over K100"], 
    multiplier: 1.1,
    badge: "🥈"
  },
  { 
    name: "Gold", 
    minPoints: 2000, 
    color: "from-yellow-400 to-yellow-600", 
    metallic: "from-yellow-300 via-yellow-400 to-yellow-600",
    icon: Crown, 
    benefits: ["15% bonus points", "Free shipping", "Early access", "Birthday rewards"], 
    multiplier: 1.15,
    badge: "🥇"
  },
  { 
    name: "Platinum", 
    minPoints: 5000, 
    color: "from-blue-400 to-blue-600", 
    metallic: "from-blue-300 via-blue-400 to-blue-600",
    icon: Diamond, 
    benefits: ["20% bonus points", "Premium support", "Exclusive deals", "Personal shopper", "VIP events"], 
    multiplier: 1.2,
    badge: "💎"
  }
]

const REWARDS = [
  {
    id: "1",
    title: "K50 Premium Voucher",
    description: "Exclusive discount valid on all premium items over K200",
    points: 500,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80",
    category: "Discounts",
    expiry: "30 days",
    available: true,
    popular: true,
    rarity: "common",
    exclusive: false,
    limited: false,
    special: false
  },
  {
    id: "2",
    title: "Express Lightning Delivery",
    description: "Ultra-fast same-day delivery on any order, anywhere in Lusaka",
    points: 200,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80",
    category: "Free Products",
    expiry: "60 days",
    available: true,
    popular: false,
    rarity: "common",
    exclusive: false,
    limited: false,
    special: true
  },
  {
    id: "3",
    title: "VIP Marketplace Access",
    description: "Unlock exclusive VIP section with luxury brands and early access sales",
    points: 1000,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80",
    category: "Premium Perks",
    expiry: "90 days",
    available: true,
    popular: true,
    rarity: "rare",
    exclusive: true,
    limited: false,
    special: false
  },
  {
    id: "4",
    title: "Partner Café Gold Pass",
    description: "Free premium coffee and pastries at 50+ partner locations",
    points: 300,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80",
    category: "Partner Deals",
    expiry: "14 days",
    available: true,
    popular: false,
    rarity: "common",
    exclusive: false,
    limited: true,
    special: false
  },
  {
    id: "5",
    title: "Luxury Concierge Service",
    description: "Personal shopping assistant and premium customer support",
    points: 800,
    image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&q=80",
    category: "Premium Perks",
    expiry: "90 days",
    available: true,
    popular: false,
    rarity: "rare",
    exclusive: true,
    limited: false,
    special: true
  },
  {
    id: "6",
    title: "Diamond Weekend Pass",
    description: "25% off everything during weekend flash sales + exclusive access",
    points: 1500,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
    category: "Discounts",
    expiry: "30 days",
    available: false,
    popular: true,
    rarity: "legendary",
    exclusive: true,
    limited: true,
    special: true
  }
]

const EARNING_METHODS = [
  {
    id: "1",
    title: "Shop & Earn",
    description: "Earn 1 point for every K1 spent + tier bonuses",
    icon: ShoppingBag,
    points: "+1 per K1",
    progress: 75,
    maxProgress: 100,
    color: "from-orange-500 to-orange-600",
    action: "Start Shopping",
    link: "/marketplace",
    multiplier: 1.15
  },
  {
    id: "2",
    title: "Refer Friends",
    description: "Get 200 points for each successful referral + bonuses",
    icon: Users,
    points: "+200 each",
    progress: 3,
    maxProgress: 5,
    color: "from-blue-500 to-blue-600",
    action: "Invite Now",
    link: "/profile",
    multiplier: 1.0
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
    action: "Review Products",
    link: "/orders",
    multiplier: 1.0
  },
  {
    id: "4",
    title: "Daily Check-in",
    description: "Bonus points for logging in daily + streak multipliers",
    icon: Calendar,
    points: "+10 daily",
    progress: 5,
    maxProgress: 7,
    color: "from-purple-500 to-purple-600",
    action: "Check In",
    link: "#",
    multiplier: 1.5
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
    type: "weekly",
    icon: ShoppingBag,
    completed: false
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
    type: "weekly",
    icon: MessageCircle,
    completed: false
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
    type: "monthly",
    icon: Users,
    completed: false
  },
  {
    id: "4",
    title: "Streak Legend",
    description: "Maintain 7-day login streak",
    reward: 150,
    progress: 5,
    target: 7,
    timeLeft: "2 days",
    difficulty: "Easy",
    type: "daily",
    icon: Flame,
    completed: false
  }
]

const ACHIEVEMENTS = [
  {
    id: "1",
    title: "First Purchase",
    description: "Made your first purchase",
    icon: ShoppingBag,
    unlocked: true,
    rarity: "common",
    points: 50
  },
  {
    id: "2",
    title: "Loyal Customer",
    description: "Reached Gold tier status",
    icon: Crown,
    unlocked: true,
    rarity: "rare",
    points: 200
  },
  {
    id: "3",
    title: "Review Expert",
    description: "Written 10+ product reviews",
    icon: MessageCircle,
    unlocked: false,
    rarity: "epic",
    points: 300
  },
  {
    id: "4",
    title: "Referral King",
    description: "Referred 5+ friends successfully",
    icon: Users,
    unlocked: false,
    rarity: "legendary",
    points: 500
  }
]

const RECENT_ACTIVITY = [
  { id: "1", action: "Purchased Traditional Crafts", points: 150, date: "2 hours ago", type: "earned", icon: ShoppingBag },
  { id: "2", action: "Daily Check-in Bonus", points: 15, date: "This morning", type: "earned", icon: Calendar },
  { id: "3", action: "Redeemed Express Delivery", points: -200, date: "Yesterday", type: "redeemed", icon: Gift },
  { id: "4", action: "Friend Referral Bonus", points: 200, date: "2 days ago", type: "earned", icon: Users },
  { id: "5", action: "Product Review Bonus", points: 50, date: "3 days ago", type: "earned", icon: MessageCircle },
  { id: "6", action: "Streak Milestone Bonus", points: 100, date: "1 week ago", type: "earned", icon: Flame }
]

const LEADERBOARD = [
  { id: "1", name: "Sarah M.", points: 12450, position: 1, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80" },
  { id: "2", name: "David K.", points: 9850, position: 2, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
  { id: "3", name: "Grace P.", points: 8200, position: 3, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" },
  { id: "4", name: "John S.", points: 7650, position: 4, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" },
  { id: "5", name: "You", points: LOYALTY_DATA.currentPoints, position: 5, avatar: "", isCurrentUser: true }
]

const SPIN_WHEEL_REWARDS = [
  { id: 1, label: "10 Points", value: 10, color: "bg-orange-400", probability: 30 },
  { id: 2, label: "25 Points", value: 25, color: "bg-blue-400", probability: 25 },
  { id: 3, label: "50 Points", value: 50, color: "bg-emerald-400", probability: 20 },
  { id: 4, label: "100 Points", value: 100, color: "bg-purple-400", probability: 15 },
  { id: 5, label: "Free Delivery", value: "delivery", color: "bg-yellow-400", probability: 8 },
  { id: 6, label: "Bonus Spin", value: "spin", color: "bg-pink-400", probability: 2 }
]

function LoyaltyPointsContent() {
  const { user } = useAuth()
  const router = useRouter()
  
  // State management
  const [selectedRewardCategory, setSelectedRewardCategory] = useState("All")
  const [showConfetti, setShowConfetti] = useState(false)
  const [spinWheel, setSpinWheel] = useState(false)
  const [dailySpinUsed, setDailySpinUsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("dashboard")
  const [wishlist, setWishlist] = useState<string[]>([])
  const [showWishlistOnly, setShowWishlistOnly] = useState(false)
  const [typeFilter, setTypeFilter] = useState<'all'|'earned'|'redeemed'>('all')
  const [historySearch, setHistorySearch] = useState("")
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [theme, setTheme] = useState("default")
  const [currentPoints, setCurrentPoints] = useState(LOYALTY_DATA.currentPoints)
  const [notifications, setNotifications] = useState([
    { id: 1, message: "You earned 150 points from your purchase!", new: true },
    { id: 2, message: "New challenge available: Weekend Warrior", new: true },
    { id: 3, message: "Your Gold tier benefits are now active!", new: false }
  ])

  const [themeModalOpen, setThemeModalOpen] = useState(false)
  const [layoutModalOpen, setLayoutModalOpen] = useState(false)
  const [giftModalOpen, setGiftModalOpen] = useState(false)
  const [themeConfig, setThemeConfig] = useState<any>(null)
  const [layoutConfig, setLayoutConfig] = useState<any[]>([])
  const [notifList, setNotifList] = useState<LoyaltyNotification[]>(generateSampleNotifications())

  const [friends] = useState([
    { id: 'f1', name: 'Sarah M.', email: 'sarah@example.com', tier: 'Gold', lastActive: '2h ago', canReceivePoints: true, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80' },
    { id: 'f2', name: 'David K.', email: 'david@example.com', tier: 'Silver', lastActive: '1d ago', canReceivePoints: true, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
    { id: 'f3', name: 'Grace P.', email: 'grace@example.com', tier: 'Bronze', lastActive: 'Just now', canReceivePoints: false, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' }
  ])
  const [transferHistory, setTransferHistory] = useState<any[]>([])

  useEffect(() => {
    const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('loyaltyTheme') : null
    if (savedTheme) setThemeConfig(JSON.parse(savedTheme))
    const savedLayout = typeof window !== 'undefined' ? localStorage.getItem('loyaltyDashboardLayout') : null
    if (savedLayout) setLayoutConfig(JSON.parse(savedLayout))
  }, [])

  const handleRefresh = async () => {
    await new Promise(r => setTimeout(r, 800))
    setCurrentPoints(p => p + 10)
    setNotifList(prev => [
      {
        id: `${Date.now()}`,
        type: 'points',
        title: 'Daily Refresh Bonus',
        message: 'You earned a refresh bonus!',
        points: 10,
        timestamp: new Date(),
        read: false,
        priority: 'high'
      },
      ...prev
    ])
  }

  const handleNotificationRead = (id: string) => {
    setNotifList(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }
  const handleNotificationDismiss = (id: string) => {
    setNotifList(prev => prev.filter(n => n.id !== id))
  }
  const handleNotificationAction = (n: LoyaltyNotification) => {
    if (n.actionUrl) router.push(n.actionUrl)
  }

  const handleTransfer = async (recipientId: string, amount: number, message: string) => {
    if (currentPoints < amount) return false
    setCurrentPoints(p => p - amount)
    setTransferHistory(prev => [{ id: `${Date.now()}`, recipient: friends.find(f => f.id === recipientId), amount, message, date: new Date(), status: 'completed' }, ...prev])
    setNotifList(prev => [
      {
        id: `${Date.now()}-gift`,
        type: 'reward',
        title: 'Gift Sent',
        message: `You gifted ${amount} points to a friend`,
        timestamp: new Date(),
        read: false,
        priority: 'medium'
      },
      ...prev
    ])
    triggerConfetti()
    return true
  }

  const currentTierIndex = TIERS.findIndex(tier => tier.name === LOYALTY_DATA.currentTier)
  const nextTierIndex = currentTierIndex + 1 < TIERS.length ? currentTierIndex + 1 : currentTierIndex
  const tierProgress = ((LOYALTY_DATA.currentPoints - TIERS[currentTierIndex].minPoints) / 
                       (TIERS[nextTierIndex].minPoints - TIERS[currentTierIndex].minPoints)) * 100

  const rewardProgress = ((LOYALTY_DATA.currentPoints) / (LOYALTY_DATA.currentPoints + LOYALTY_DATA.pointsToNextReward)) * 100

  // Animation helpers
  const triggerConfetti = useCallback(() => {
    if (animationsEnabled) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }, [animationsEnabled])

  const playSound = useCallback((type: string) => {
    if (soundEnabled) {
      // Sound effect placeholder - would implement actual sound in production
      console.log(`Playing ${type} sound`)
    }
  }, [soundEnabled])

  // Spin wheel handler
  const handleSpinWheel = () => {
    if (dailySpinUsed) return

    setSpinWheel(true)
    playSound('spin')
    
    setTimeout(() => {
      const randomReward = SPIN_WHEEL_REWARDS[Math.floor(Math.random() * SPIN_WHEEL_REWARDS.length)]
      setSpinWheel(false)
      setDailySpinUsed(true)
      
      if (typeof randomReward.value === 'number') {
        setCurrentPoints(prev => prev + randomReward.value)
      }
      
      triggerConfetti()
      playSound('win')
    }, 3000)
  }

  // Reward redemption handler
  const handleRedeemReward = (reward: any) => {
    if (currentPoints >= reward.points) {
      setCurrentPoints(prev => prev - reward.points)
      triggerConfetti()
      playSound('redeem')
      console.log(`Redeemed: ${reward.title}`)
    }
  }

  // Filter rewards
  const filteredRewards = REWARDS.filter(reward => {
    const matchesCategory = selectedRewardCategory === "All" || reward.category === selectedRewardCategory
    const matchesSearch = reward.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reward.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesWishlist = showWishlistOnly ? wishlist.includes(reward.id) : true
    return matchesCategory && matchesSearch && matchesWishlist
  })

  const categories = ["All", ...Array.from(new Set(REWARDS.map(r => r.category)))]

  const closeRewards = REWARDS.filter(r => r.available && r.points > currentPoints && (r.points - currentPoints) <= 300)
    .sort((a,b) => (a.points - currentPoints) - (b.points - currentPoints))
    .slice(0,3)

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const allTransactions = React.useMemo(() => {
    return RECENT_ACTIVITY.map(a => ({
      id: a.id,
      date: a.date,
      action: a.action,
      type: a.type,
      points: a.points
    }))
  }, [])

  const filteredTransactions = allTransactions.filter(t => {
    const byType = typeFilter === 'all' || t.type === typeFilter
    const bySearch = historySearch === '' || t.action.toLowerCase().includes(historySearch.toLowerCase())
    return byType && bySearch
  })

  const historyCsv = React.useMemo(() => {
    const header = 'Date,Action,Type,Points\n'
    const rows = filteredTransactions.map(t => `${t.date},${t.action},${t.type},${t.points}`).join('\n')
    return header + rows
  }, [filteredTransactions])

  const downloadCsv = () => {
    const blob = new Blob([historyCsv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'loyalty-history.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Premium Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Main Dynamic Gradient */}
        <motion.div
          animate={{
            background: [
              "linear-gradient(135deg, #ff6b35 0%, #14b8a6 30%, #3b82f6 70%, #8b5cf6 100%)",
              "linear-gradient(135deg, #ff8c42 0%, #0d9488 30%, #2563eb 70%, #7c3aed 100%)",
              "linear-gradient(135deg, #ff7849 0%, #0f766e 30%, #1d4ed8 70%, #6d28d9 100%)",
              "linear-gradient(135deg, #ff6b35 0%, #14b8a6 30%, #3b82f6 70%, #8b5cf6 100%)"
            ]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
        
        {/* Metallic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/10 via-transparent to-yellow-500/5" />
        <div className="absolute inset-0 bg-gradient-to-tl from-orange-400/15 via-transparent to-teal-400/15" />
        
        {/* Floating Particles Animation */}
        {animationsEnabled && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-3 h-3 rounded-full ${
                  i % 4 === 0 ? 'bg-yellow-400/40' : 
                  i % 4 === 1 ? 'bg-orange-400/40' : 
                  i % 4 === 2 ? 'bg-teal-400/40' : 'bg-blue-400/40'
                }`}
                animate={{
                  x: [0, Math.random() * 400 - 200],
                  y: [0, Math.random() * -600 - 200],
                  scale: [0, 1.5, 0],
                  opacity: [0, 0.8, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: Math.random() * 20 + 15,
                  repeat: Infinity,
                  delay: Math.random() * 10,
                  ease: "easeOut"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>
        )}

        {/* Premium Glowing Orbs */}
        <motion.div
          animate={{
            x: [0, 500, 0],
            y: [0, -400, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-yellow-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -400, 0],
            y: [0, 300, 0]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut", delay: 7 }}
          className="absolute bottom-10 right-10 w-60 h-60 bg-gradient-to-br from-teal-400/25 to-blue-400/25 rounded-full blur-2xl"
        />
      </div>

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-4 h-4 ${
                  i % 4 === 0 ? 'bg-yellow-400' : 
                  i % 4 === 1 ? 'bg-orange-400' : 
                  i % 4 === 2 ? 'bg-teal-400' : 'bg-blue-400'
                } ${i % 2 === 0 ? 'rounded-full' : 'rounded-sm rotate-45'}`}
                initial={{
                  x: "50%",
                  y: "50%",
                  scale: 0,
                  rotate: 0
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: [0, 1.5, 0],
                  rotate: Math.random() * 720
                }}
                transition={{
                  duration: 4,
                  ease: "easeOut",
                  delay: Math.random() * 2
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

        <EnhancedMobilePullRefresh onRefresh={handleRefresh}>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Breadcrumb & Settings */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between text-sm text-white/80 mb-8"
          >
            <div className="flex items-center">
              <Link href="/customer-dashboard" className="hover:text-orange-300 transition-colors flex items-center gap-1">
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-orange-300 font-semibold">Rewards Hub</span>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <NotificationsSystem
                notifications={notifList}
                onNotificationRead={handleNotificationRead}
                onNotificationDismiss={handleNotificationDismiss}
                onNotificationAction={handleNotificationAction}
                maxVisible={6}
              />

              {/* Settings Toggles */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-lg p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAnimationsEnabled(!animationsEnabled)}
                  className={`text-white hover:bg-white/10 ${animationsEnabled ? 'bg-white/20' : ''}`}
                >
                  {animationsEnabled ? <Sparkles className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`text-white hover:bg-white/10 ${soundEnabled ? 'bg-white/20' : ''}`}
                >
                  {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setThemeModalOpen(true)}
                  className="text-white hover:bg-white/10"
                >
                  <Palette className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLayoutModalOpen(true)}
                  className="text-white hover:bg-white/10"
                >
                  <Layout className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setGiftModalOpen(true)}
                  className="text-white hover:bg-white/10"
                >
                  <Gift className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Hero Dashboard Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-12"
          >
            <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* User Welcome Section */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative"
                      >
                        <Avatar className="w-20 h-20 border-4 border-gradient-to-br from-orange-400 to-teal-600">
                          <AvatarImage src={user?.avatar} alt={user?.name} />
                          <AvatarFallback className="bg-gradient-to-br from-orange-400 to-teal-600 text-white text-2xl font-bold">
                            {user?.name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        {/* Tier Badge */}
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg"
                        >
                          <span className="text-lg">{TIERS[currentTierIndex].badge}</span>
                        </motion.div>
                      </motion.div>
                      
                      <div>
                        <motion.h1
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-3xl font-bold text-gray-900 mb-2"
                        >
                          Welcome back, {user?.name?.split(' ')[0]}! ✨
                        </motion.h1>
                        <p className="text-gray-600 text-lg">Your Rewards Await</p>
                        
                        {/* Tier Status */}
                        <div className="flex items-center gap-3 mt-3">
                          <Badge className={`bg-gradient-to-r ${TIERS[currentTierIndex].metallic} text-white font-bold px-3 py-1`}>
                            <Crown className="h-4 w-4 mr-1" />
                            {LOYALTY_DATA.currentTier} Tier
                          </Badge>
                          <span className="text-sm text-gray-500">
                            Level {LOYALTY_DATA.level}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tier Progress Ladder */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tier Progression</h3>
                      <div className="flex items-center justify-between">
                        {TIERS.map((tier, index) => (
                          <div key={tier.name} className="flex flex-col items-center relative">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className={`w-12 h-12 rounded-full border-4 flex items-center justify-center ${
                                index <= currentTierIndex
                                  ? `bg-gradient-to-br ${tier.metallic} border-white shadow-lg`
                                  : 'bg-gray-200 border-gray-300'
                              }`}
                            >
                              <tier.icon className={`h-6 w-6 ${
                                index <= currentTierIndex ? 'text-white' : 'text-gray-400'
                              }`} />
                            </motion.div>
                            <span className={`text-xs font-medium mt-2 ${
                              index <= currentTierIndex ? 'text-gray-900' : 'text-gray-400'
                            }`}>
                              {tier.name}
                            </span>
                            
                            {/* Connection Line */}
                            {index < TIERS.length - 1 && (
                              <div className={`absolute top-6 left-12 w-16 h-1 ${
                                index < currentTierIndex ? 'bg-gradient-to-r from-orange-400 to-teal-600' : 'bg-gray-300'
                              }`} />
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {/* Progress to Next Tier */}
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress to {TIERS[nextTierIndex].name}</span>
                          <span className="font-semibold text-gray-900">{Math.round(tierProgress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-orange-400 to-teal-600 rounded-full h-2"
                            initial={{ width: "0%" }}
                            animate={{ width: `${tierProgress}%` }}
                            transition={{ duration: 2, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3D Points Counter */}
                  <div className="flex flex-col items-center justify-center">
                    <motion.div
                      animate={{ 
                        rotateY: [0, 360],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity }
                      }}
                      className="relative w-48 h-48 mb-4"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* 3D Coin/Gem Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 rounded-full shadow-2xl" />
                      <div className="absolute inset-2 bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-500 rounded-full" />
                      <div className="absolute inset-4 bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-400 rounded-full" />
                      
                      {/* Points Display */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.div
                          key={currentPoints}
                          initial={{ scale: 1.2, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-3xl font-bold text-white mb-1"
                        >
                          {currentPoints.toLocaleString()}
                        </motion.div>
                        <span className="text-sm text-yellow-100">Points</span>
                      </div>

                      {/* Floating Icons */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                          className="absolute w-6 h-6 text-yellow-200"
                          style={{
                            top: `${20 + i * 12}%`,
                            left: `${85 + Math.sin(i) * 10}%`
                          }}
                        >
                          <Sparkles className="w-full h-full" />
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* XP Progress */}
                    <div className="w-full max-w-xs">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">XP to Next Level</span>
                        <span className="font-semibold">{LOYALTY_DATA.xpToNextLevel} XP</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-full h-2"
                          initial={{ width: "0%" }}
                          animate={{ width: `${(LOYALTY_DATA.xp / (LOYALTY_DATA.xp + LOYALTY_DATA.xpToNextLevel)) * 100}%` }}
                          transition={{ duration: 2, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Dashboard Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6 bg-white/10 backdrop-blur-md border-0 h-14">
                <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white font-medium">
                  <Gauge className="h-5 w-5 mr-2" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="rewards" className="text-white data-[state=active]:bg-teal-500 data-[state=active]:text-white font-medium">
                  <Gift className="h-5 w-5 mr-2" />
                  Rewards
                </TabsTrigger>
                <TabsTrigger value="earn" className="text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium">
                  <Rocket className="h-5 w-5 mr-2" />
                  Earn
                </TabsTrigger>
                <TabsTrigger value="achievements" className="text-white data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium">
                  <Trophy className="h-5 w-5 mr-2" />
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="leaderboard" className="text-white data-[state=active]:bg-pink-500 data-[state=active]:text-white font-medium">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Leaderboard
                </TabsTrigger>
                <TabsTrigger value="history" className="text-white data-[state=active]:bg-amber-500 data-[state=active]:text-white font-medium">
                  <Clock className="h-5 w-5 mr-2" />
                  History
                </TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Left Column - Main Widgets */}
                  <div className="lg:col-span-3 space-y-6">
                    {/* Stats Cards Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Points Balance Meter */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                      >
                        <Card className="bg-gradient-to-br from-orange-500/90 to-orange-600/90 backdrop-blur-md border-0 shadow-2xl text-white overflow-hidden">
                          <CardContent className="p-6 relative">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                              className="absolute top-4 right-4 w-12 h-12 border-2 border-dashed border-white/30 rounded-full"
                            />
                            <div className="flex items-center gap-3 mb-4">
                              <Wallet className="h-8 w-8 text-white" />
                              <div>
                                <h3 className="text-lg font-semibold">Points Balance</h3>
                                <motion.p 
                                  className="text-2xl font-bold"
                                  key={currentPoints}
                                  initial={{ scale: 1.1 }}
                                  animate={{ scale: 1 }}
                                >
                                  {currentPoints.toLocaleString()}
                                </motion.p>
                              </div>
                            </div>
                            
                            {/* Circular Progress */}
                            <div className="relative w-16 h-16 mx-auto">
                              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" fill="none" className="text-white/20" />
                                <motion.circle
                                  cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" fill="none"
                                  strokeLinecap="round" className="text-white"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: rewardProgress / 100 }}
                                  transition={{ duration: 2, ease: "easeOut" }}
                                  style={{ strokeDasharray: "283", strokeDashoffset: `${283 - (283 * rewardProgress) / 100}` }}
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-bold">{Math.round(rewardProgress)}%</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>

                      {/* Weekly Progress */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                      >
                        <Card className="bg-gradient-to-br from-teal-500/90 to-teal-600/90 backdrop-blur-md border-0 shadow-2xl text-white">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <Calendar className="h-8 w-8 text-white" />
                              <div>
                                <h3 className="text-lg font-semibold">Weekly Progress</h3>
                                <p className="text-2xl font-bold">{LOYALTY_DATA.weeklyProgress}%</p>
                              </div>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <motion.div
                                className="bg-white rounded-full h-2"
                                initial={{ width: "0%" }}
                                animate={{ width: `${LOYALTY_DATA.weeklyProgress}%` }}
                                transition={{ duration: 2, ease: "easeOut" }}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>

                      {/* Streak Counter */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                      >
                        <Card className="bg-gradient-to-br from-purple-500/90 to-purple-600/90 backdrop-blur-md border-0 shadow-2xl text-white">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <Flame className="h-8 w-8 text-white" />
                              <div>
                                <h3 className="text-lg font-semibold">Login Streak</h3>
                                <p className="text-2xl font-bold">{LOYALTY_DATA.streak} Days</p>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              {[...Array(7)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-4 h-4 rounded-full ${
                                    i < LOYALTY_DATA.streak ? 'bg-white' : 'bg-white/30'
                                  }`}
                                />
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>

                    {/* Challenges Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                    >
                      <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3 text-gray-900">
                            <Target className="h-6 w-6 text-orange-500" />
                            Active Challenges
                            <Badge className="bg-orange-100 text-orange-800 ml-auto">
                              {CHALLENGES.filter(c => !c.completed).length} Active
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {CHALLENGES.filter(c => !c.completed).map((challenge, index) => (
                              <motion.div
                                key={challenge.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.2 + index * 0.1 }}
                                className="p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 hover:shadow-lg transition-shadow"
                              >
                                <div className="flex items-start gap-3 mb-3">
                                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                                    challenge.difficulty === 'Easy' ? 'from-green-400 to-green-600' :
                                    challenge.difficulty === 'Medium' ? 'from-yellow-400 to-yellow-600' :
                                    'from-red-400 to-red-600'
                                  } flex items-center justify-center`}>
                                    <challenge.icon className="h-5 w-5 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900">{challenge.title}</h4>
                                    <p className="text-sm text-gray-600">{challenge.description}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                      <Badge className={`text-xs ${
                                        challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                        challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                      }`}>
                                        {challenge.difficulty}
                                      </Badge>
                                      <span className="text-xs text-gray-500">{challenge.timeLeft} left</span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-lg font-bold text-orange-600">+{challenge.reward}</div>
                                    <div className="text-xs text-gray-500">points</div>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Progress</span>
                                    <span className="font-semibold">{challenge.progress}/{challenge.target}</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <motion.div
                                      className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-full h-2"
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

                    {/* Personalized Recommendations */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3 text-gray-900">
                            <Sparkles className="h-6 w-6 text-teal-500" />
                            Recommendations
                            <Badge className="bg-teal-100 text-teal-800 ml-auto">{closeRewards.length} Near</Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {closeRewards.length === 0 ? (
                            <p className="text-sm text-gray-600">You're all set! Browse rewards you can already redeem.</p>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {closeRewards.map(r => (
                                <div key={r.id} className="p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-gray-900 line-clamp-1">{r.title}</h4>
                                    <Badge className="bg-orange-100 text-orange-800 text-xs">{r.points - currentPoints} pts away</Badge>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <motion.div
                                      className="bg-gradient-to-r from-orange-400 to-teal-600 rounded-full h-2"
                                      initial={{ width: 0 }}
                                      animate={{ width: `${(currentPoints / r.points) * 100}%` }}
                                      transition={{ duration: 1.2 }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Recent Activity */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 }}
                    >
                      <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3 text-gray-900">
                            <Clock className="h-6 w-6 text-blue-500" />
                            Recent Activity
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {RECENT_ACTIVITY.slice(0, 5).map((activity, index) => (
                              <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.4 + index * 0.1 }}
                                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  activity.type === "earned" 
                                    ? "bg-gradient-to-br from-green-400 to-green-600" 
                                    : "bg-gradient-to-br from-orange-400 to-orange-600"
                                }`}>
                                  <activity.icon className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900">{activity.action}</p>
                                  <p className="text-sm text-gray-500">{activity.date}</p>
                                </div>
                                <div className={`font-bold text-lg ${
                                  activity.type === "earned" ? "text-green-600" : "text-orange-600"
                                }`}>
                                  {activity.type === "earned" ? "+" : ""}{activity.points}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Right Sidebar - Gamification */}
                  <div className="space-y-6">
                    {/* Daily Spin Wheel */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="bg-gradient-to-br from-yellow-400 to-yellow-500 border-0 shadow-2xl text-white">
                        <CardContent className="p-6 text-center">
                          <h3 className="font-bold text-white mb-4 flex items-center justify-center gap-2">
                            <Gamepad2 className="h-6 w-6" />
                            Daily Spin
                          </h3>
                          
                          <motion.div
                            animate={{ 
                              rotate: spinWheel ? 1800 : 0,
                              scale: spinWheel ? [1, 1.2, 1] : 1
                            }}
                            transition={{ duration: 3, ease: "easeOut" }}
                            className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 relative overflow-hidden"
                          >
                            {/* Spin Wheel Segments */}
                            {SPIN_WHEEL_REWARDS.map((reward, index) => (
                              <div
                                key={reward.id}
                                className={`absolute w-full h-full ${reward.color} opacity-70`}
                                style={{
                                  transform: `rotate(${index * (360 / SPIN_WHEEL_REWARDS.length)}deg)`,
                                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((360 / SPIN_WHEEL_REWARDS.length) * Math.PI / 180)}% ${50 - 50 * Math.sin((360 / SPIN_WHEEL_REWARDS.length) * Math.PI / 180)}%)`
                                }}
                              />
                            ))}
                            
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              className="relative z-10"
                            >
                              <Sparkles className="h-16 w-16 text-white" />
                            </motion.div>
                          </motion.div>
                          
                          <Button
                            onClick={handleSpinWheel}
                            disabled={dailySpinUsed || spinWheel}
                            className="w-full bg-white/20 text-white hover:bg-white/30 border border-white/30 font-bold disabled:opacity-50"
                          >
                            {dailySpinUsed ? "Tomorrow!" : spinWheel ? "Spinning..." : "Spin!"}
                          </Button>
                          {!dailySpinUsed && (
                            <p className="text-xs text-white/80 mt-2">Free daily spin!</p>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.6 }}
                    >
                      <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl">
                        <CardHeader>
                          <CardTitle className="text-gray-900">Quick Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Earned</span>
                            <span className="font-bold text-green-600">{LOYALTY_DATA.totalEarned.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Redeemed</span>
                            <span className="font-bold text-orange-600">{LOYALTY_DATA.totalRedeemed.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Referrals</span>
                            <span className="font-bold text-blue-600">{LOYALTY_DATA.referralCount}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Reviews</span>
                            <span className="font-bold text-purple-600">{LOYALTY_DATA.reviewCount}</span>
                          </div>
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
                        className="pl-10 bg-white/90 backdrop-blur-md border-0 shadow-lg h-12"
                      />
                    </div>
                    
                    <div className="flex gap-2 overflow-x-auto">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          size="sm"
                          variant={selectedRewardCategory === category ? "default" : "outline"}
                          onClick={() => setSelectedRewardCategory(category)}
                          className={`whitespace-nowrap h-12 px-6 ${
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
                        whileHover={{ y: -10, scale: 1.03 }}
                        className="group"
                      >
                        <Card className="overflow-hidden bg-white/95 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-full relative">
                          {/* 3D Floating Effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-teal-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            animate={{ 
                              boxShadow: [
                                "0 0 0 0px rgba(255, 107, 53, 0)",
                                "0 0 0 4px rgba(255, 107, 53, 0.1)",
                                "0 0 0 0px rgba(255, 107, 53, 0)"
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          
                          <div className="relative">
                            <img
                              src={reward.image}
                              alt={reward.title}
                              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            
                            {/* Labels */}
                            <div className="absolute top-3 left-3 flex flex-col gap-1">
                              <Badge className={`${
                                reward.category === "Discounts" ? "bg-red-500" :
                                reward.category === "Free Products" ? "bg-green-500" :
                                reward.category === "Premium Perks" ? "bg-purple-500" :
                                "bg-blue-500"
                              } text-white`}>
                                {reward.category}
                              </Badge>
                              
                              {reward.exclusive && (
                                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white animate-pulse">
                                  ✨ Exclusive
                                </Badge>
                              )}
                              {reward.limited && (
                                <Badge className="bg-gradient-to-r from-red-400 to-red-600 text-white">
                                  🔥 Limited
                                </Badge>
                              )}
                              {reward.special && (
                                <Badge className="bg-gradient-to-r from-purple-400 to-purple-600 text-white">
                                  ⭐ Special
                                </Badge>
                              )}
                            </div>
                            
                            <div className="absolute top-3 right-3">
                              {reward.popular && (
                                <Badge className="bg-orange-500 text-white animate-bounce">
                                  🔥 Popular
                                </Badge>
                              )}
                            </div>
                            
                            <div className="absolute bottom-3 left-3">
                              <Badge className={`${
                                reward.rarity === "common" ? "bg-gray-500" :
                                reward.rarity === "rare" ? "bg-blue-500" :
                                reward.rarity === "epic" ? "bg-purple-500" :
                                "bg-gradient-to-r from-yellow-400 to-yellow-600"
                              } text-white text-xs`}>
                                {reward.rarity}
                              </Badge>
                            </div>
                            
                            {!reward.available && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <Badge className="bg-gray-500 text-white">Sold Out</Badge>
                              </div>
                            )}
                          </div>

                          <CardContent className="p-6">
                            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-lg">
                              {reward.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {reward.description}
                            </p>

                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                >
                                  <Coins className="h-6 w-6 text-orange-600" />
                                </motion.div>
                                <span className="font-bold text-2xl text-orange-600">
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
                              disabled={!reward.available || currentPoints < reward.points}
                              className={`w-full font-bold relative overflow-hidden group/btn h-12 ${
                                currentPoints >= reward.points && reward.available
                                  ? "bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white"
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              {currentPoints >= reward.points && reward.available ? (
                                <>
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover/btn:opacity-100"
                                    animate={{ x: ['-100%', '100%'] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                  />
                                  <Gift className="h-5 w-5 mr-2" />
                                  Redeem Now
                                  <Sparkles className="h-4 w-4 ml-2" />
                                </>
                              ) : !reward.available ? (
                                <>
                                  <Lock className="h-5 w-5 mr-2" />
                                  Sold Out
                                </>
                              ) : (
                                <>
                                  <Circle className="h-5 w-5 mr-2" />
                                  Need {(reward.points - currentPoints).toLocaleString()} more
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
                              {method.points} {method.multiplier > 1 && `(${method.multiplier}x)`}
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
                </motion.div>
              </TabsContent>

              {/* Achievements Tab */}
              <TabsContent value="achievements" className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {ACHIEVEMENTS.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="group"
                      >
                        <Card className={`border-0 shadow-xl transition-all duration-300 h-full ${
                          achievement.unlocked 
                            ? "bg-gradient-to-br from-yellow-100 to-yellow-200" 
                            : "bg-white/95 backdrop-blur-md"
                        }`}>
                          <CardContent className="p-6 text-center">
                            <motion.div
                              animate={achievement.unlocked ? { 
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                              } : {}}
                              transition={{ duration: 3, repeat: Infinity }}
                              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                                achievement.unlocked
                                  ? `bg-gradient-to-br ${
                                      achievement.rarity === "common" ? "from-gray-400 to-gray-600" :
                                      achievement.rarity === "rare" ? "from-blue-400 to-blue-600" :
                                      achievement.rarity === "epic" ? "from-purple-400 to-purple-600" :
                                      "from-yellow-400 to-yellow-600"
                                    } shadow-lg`
                                  : "bg-gray-200"
                              }`}
                            >
                              <achievement.icon className={`h-8 w-8 ${
                                achievement.unlocked ? "text-white" : "text-gray-400"
                              }`} />
                            </motion.div>

                            <h3 className={`font-bold mb-2 ${
                              achievement.unlocked ? "text-gray-900" : "text-gray-500"
                            }`}>
                              {achievement.title}
                            </h3>
                            <p className={`text-sm mb-4 ${
                              achievement.unlocked ? "text-gray-600" : "text-gray-400"
                            }`}>
                              {achievement.description}
                            </p>

                            <Badge className={`${
                              achievement.rarity === "common" ? "bg-gray-500" :
                              achievement.rarity === "rare" ? "bg-blue-500" :
                              achievement.rarity === "epic" ? "bg-purple-500" :
                              "bg-gradient-to-r from-yellow-400 to-yellow-600"
                            } text-white mb-3`}>
                              {achievement.rarity}
                            </Badge>

                            <div className={`text-lg font-bold ${
                              achievement.unlocked ? "text-green-600" : "text-gray-400"
                            }`}>
                              {achievement.unlocked ? "+" : ""}{achievement.points} pts
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              {/* Leaderboard Tab */}
              <TabsContent value="leaderboard" className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-gray-900">
                        <BarChart3 className="h-6 w-6 text-purple-500" />
                        Monthly Leaderboard
                        <Badge className="bg-purple-100 text-purple-800 ml-auto">
                          Top Shoppers
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {LEADERBOARD.map((user, index) => (
                          <motion.div
                            key={user.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                              user.isCurrentUser 
                                ? "bg-gradient-to-r from-orange-100 to-teal-100 border-2 border-orange-300" 
                                : "hover:bg-gray-50"
                            }`}
                          >
                            {/* Position */}
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                              user.position === 1 ? "bg-gradient-to-br from-yellow-400 to-yellow-600" :
                              user.position === 2 ? "bg-gradient-to-br from-gray-400 to-gray-600" :
                              user.position === 3 ? "bg-gradient-to-br from-orange-400 to-orange-600" :
                              "bg-gradient-to-br from-purple-400 to-purple-600"
                            }`}>
                              {user.position === 1 ? "🥇" : 
                               user.position === 2 ? "🥈" : 
                               user.position === 3 ? "🥉" : user.position}
                            </div>

                            {/* Avatar */}
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback className="bg-gradient-to-br from-teal-400 to-blue-600 text-white">
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>

                            {/* User Info */}
                            <div className="flex-1">
                              <h4 className={`font-semibold ${
                                user.isCurrentUser ? "text-orange-800" : "text-gray-900"
                              }`}>
                                {user.name} {user.isCurrentUser && "(You)"}
                              </h4>
                              <p className="text-sm text-gray-500">
                                Rank #{user.position}
                              </p>
                            </div>

                            {/* Points */}
                            <div className="text-right">
                              <div className={`text-2xl font-bold ${
                                user.isCurrentUser ? "text-orange-600" : "text-gray-900"
                              }`}>
                                {user.points.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-500">points</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
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
                  Level Up Your Rewards Journey!
                </motion.h2>
                <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                  Join the ultimate rewards ecosystem where every purchase, review, and referral 
                  brings you closer to exclusive perks and amazing experiences!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-orange-600 hover:bg-gray-100 text-xl px-10 py-6 font-bold shadow-xl"
                    onClick={() => router.push('/marketplace')}
                  >
                    <ShoppingBag className="h-7 w-7 mr-3" />
                    Start Earning Points
                    <Sparkles className="h-6 w-6 ml-3" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/50 text-white hover:bg-white/10 text-xl px-10 py-6 font-bold backdrop-blur-md"
                    onClick={() => router.push('/profile')}
                  >
                    <Users className="h-7 w-7 mr-3" />
                    Invite & Earn
                    <Share2 className="h-6 w-6 ml-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
        </EnhancedMobilePullRefresh>

        {/* Modals */}
        <ThemeCustomization
          isOpen={themeModalOpen}
          onClose={() => setThemeModalOpen(false)}
          onThemeChange={setThemeConfig}
          currentTheme={themeConfig}
        />
        <DragDropLayout
          isOpen={layoutModalOpen}
          onClose={() => setLayoutModalOpen(false)}
          onLayoutChange={setLayoutConfig}
          currentLayout={layoutConfig as any}
        />
        <GiftTransferPoints
          isOpen={giftModalOpen}
          onClose={() => setGiftModalOpen(false)}
          currentPoints={currentPoints}
          friends={friends as any}
          transferHistory={transferHistory as any}
          onTransfer={handleTransfer}
          onAddFriend={() => {}}
        />

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
