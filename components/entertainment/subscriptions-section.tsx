"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { 
  Crown, 
  Check, 
  Star, 
  Zap, 
  Gift, 
  TrendingUp,
  Users,
  Shield,
  Headphones,
  Download,
  Gamepad2,
  Film,
  Music,
  Calendar,
  Award,
  Sparkles
} from "lucide-react"

interface SubscriptionsSectionProps {
  standalone?: boolean
}

const subscriptionTiers = [
  {
    id: "basic",
    name: "Basic",
    price: { monthly: 25, yearly: 250 },
    description: "Essential entertainment access",
    features: [
      "Access to local content",
      "Standard quality streaming",
      "Mobile gaming access",
      "Basic event notifications",
      "Community forums access"
    ],
    limitations: [
      "Ads included",
      "Limited downloads",
      "No priority support"
    ],
    color: "from-gray-500 to-slate-600",
    borderColor: "border-gray-500/30",
    textColor: "text-gray-400",
    popular: false
  },
  {
    id: "premium",
    name: "Premium",
    price: { monthly: 75, yearly: 750 },
    description: "Enhanced entertainment experience",
    features: [
      "All Basic features",
      "HD streaming quality",
      "Ad-free experience",
      "Unlimited downloads",
      "Premium gaming tournaments",
      "Early event access",
      "Priority customer support",
      "Exclusive content access"
    ],
    limitations: [],
    color: "from-purple-500 to-pink-500",
    borderColor: "border-purple-500/50",
    textColor: "text-purple-400",
    popular: true
  },
  {
    id: "vip",
    name: "VIP Elite",
    price: { monthly: 150, yearly: 1500 },
    description: "Ultimate entertainment package",
    features: [
      "All Premium features",
      "4K Ultra HD streaming",
      "VIP event seating",
      "Personal content curator",
      "Exclusive artist meetups",
      "Custom playlist creation",
      "Beta feature access",
      "Dedicated account manager",
      "Free merchandise",
      "Annual concert passes"
    ],
    limitations: [],
    color: "from-yellow-500 to-orange-500",
    borderColor: "border-yellow-500/50",
    textColor: "text-yellow-400",
    popular: false
  }
]

const bundleOffers = [
  {
    id: 1,
    name: "Entertainment Bundle",
    description: "Gaming + Movies + Music",
    originalPrice: 120,
    bundlePrice: 89,
    savings: 31,
    duration: "per month",
    services: ["Gaming Premium", "Movie Streaming", "Music Premium"],
    image: "https://images.unsplash.com/photo-1551739440-5dd934d3a94a?w=300&h=200&fit=crop",
    icon: Sparkles,
    popular: true
  },
  {
    id: 2,
    name: "Creator Package",
    description: "Tools for content creators",
    originalPrice: 200,
    bundlePrice: 149,
    savings: 51,
    duration: "per month",
    services: ["Studio Access", "Distribution Tools", "Analytics Pro"],
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
    icon: Award,
    popular: false
  },
  {
    id: 3,
    name: "Family Plan",
    description: "Entertainment for the whole family",
    originalPrice: 180,
    bundlePrice: 129,
    savings: 51,
    duration: "per month",
    services: ["6 User Accounts", "Parental Controls", "Family Events"],
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop",
    icon: Users,
    popular: false
  }
]

const exclusiveOffers = [
  {
    id: 1,
    title: "Student Discount",
    description: "50% off Premium for students",
    discount: "50% OFF",
    validUntil: "2024-12-31",
    code: "STUDENT50",
    icon: Award,
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 2,
    title: "New User Offer",
    description: "First 3 months free with Premium",
    discount: "3 MONTHS FREE",
    validUntil: "2024-06-30",
    code: "WELCOME3",
    icon: Gift,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "Loyalty Rewards",
    description: "Existing users get exclusive perks",
    discount: "EXCLUSIVE PERKS",
    validUntil: "2024-12-31",
    code: "LOYAL2024",
    icon: Crown,
    color: "from-purple-500 to-pink-500"
  }
]

const rewardsProgram = {
  currentPoints: 2450,
  nextReward: 3000,
  level: "Gold",
  rewards: [
    { points: 500, reward: "Free Movie Rental", available: true },
    { points: 1000, reward: "Concert Ticket Discount", available: true },
    { points: 1500, reward: "Exclusive Merchandise", available: true },
    { points: 3000, reward: "VIP Event Access", available: false },
    { points: 5000, reward: "Meet & Greet Pass", available: false }
  ]
}

export function SubscriptionsSection({ standalone = false }: SubscriptionsSectionProps) {
  const [isYearly, setIsYearly] = useState(false)
  const [selectedTier, setSelectedTier] = useState("premium")

  const getPrice = (tier: typeof subscriptionTiers[0]) => {
    const price = isYearly ? tier.price.yearly : tier.price.monthly
    return isYearly ? Math.round(price / 12) : price
  }

  const getSavings = (tier: typeof subscriptionTiers[0]) => {
    if (!isYearly) return 0
    return tier.price.monthly * 12 - tier.price.yearly
  }

  return (
    <section 
      id="subscriptions-section" 
      className={`relative py-24 ${standalone ? 'min-h-screen pt-32' : ''}`}
    >
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/5 via-green-500/5 to-emerald-500/5" />
        
        {/* Premium Sparkles */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              <Sparkles 
                className="text-emerald-400/20" 
                style={{ fontSize: `${0.5 + Math.random() * 1}rem` }}
              />
            </div>
          ))}
        </div>

        {/* Crown Effects */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-sm px-6 py-3 text-white border border-white/20 mb-6">
            <Crown className="mr-2 h-5 w-5 text-emerald-400 animate-pulse" />
            <span className="text-sm font-medium">💎 Premium Subscriptions</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">
              Unlock
            </span>
            <span className="text-white block md:inline md:ml-4">Premium</span>
          </h2>

          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan to elevate your entertainment experience
          </p>
        </div>

        {/* Subscription Plans */}
        <div className="mb-16">
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-2 flex items-center space-x-4">
              <span className={`px-4 py-2 text-sm font-medium transition-colors ${!isYearly ? 'text-white' : 'text-white/60'}`}>
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-emerald-500"
              />
              <span className={`px-4 py-2 text-sm font-medium transition-colors ${isYearly ? 'text-white' : 'text-white/60'}`}>
                Yearly
              </span>
              {isYearly && (
                <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                  Save up to 17%
                </Badge>
              )}
            </div>
          </div>

          {/* Subscription Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionTiers.map((tier) => {
              const isSelected = selectedTier === tier.id
              const price = getPrice(tier)
              const savings = getSavings(tier)
              
              return (
                <Card
                  key={tier.id}
                  className={`relative cursor-pointer transition-all duration-300 hover:-translate-y-2 ${
                    tier.popular
                      ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50 shadow-2xl shadow-purple-500/20 scale-105"
                      : `bg-white/5 backdrop-blur-sm ${tier.borderColor} hover:border-opacity-50`
                  } ${isSelected ? 'ring-2 ring-emerald-500 ring-opacity-50' : ''}`}
                  onClick={() => setSelectedTier(tier.id)}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 text-sm font-bold">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        MOST POPULAR
                      </Badge>
                    </div>
                  )}

                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                      <p className="text-white/70 mb-4">{tier.description}</p>
                      
                      <div className="mb-4">
                        <div className="flex items-baseline justify-center">
                          <span className="text-4xl font-bold text-white">ZMW {price}</span>
                          <span className="text-white/60 ml-2">/{isYearly ? 'month' : 'month'}</span>
                        </div>
                        {isYearly && savings > 0 && (
                          <div className="text-emerald-400 text-sm font-semibold mt-1">
                            Save ZMW {savings} per year
                          </div>
                        )}
                        {isYearly && (
                          <div className="text-white/60 text-xs mt-1">
                            Billed annually at ZMW {tier.price.yearly}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      {tier.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <Check className={`h-4 w-4 mr-3 ${tier.textColor}`} />
                          <span className="text-white/80 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className={`w-full ${
                        tier.popular
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                          : tier.id === "vip"
                            ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90"
                            : "bg-gradient-to-r from-emerald-500 to-green-500 hover:opacity-90"
                      } transition-all hover:scale-105`}
                      size="lg"
                    >
                      {tier.id === "basic" ? "Start Free Trial" : "Upgrade Now"}
                    </Button>

                    {tier.popular && (
                      <div className="text-center mt-4">
                        <div className="text-xs text-white/60">
                          ⚡ Most chosen by our users
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Bundle Offers */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Bundle & Save</h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              Combine services and save more with our exclusive bundle packages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bundleOffers.map((bundle) => (
              <Card
                key={bundle.id}
                className={`group cursor-pointer bg-white/5 backdrop-blur-sm border border-white/20 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden ${
                  bundle.popular ? 'ring-2 ring-emerald-500/30' : ''
                }`}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={bundle.image}
                      alt={bundle.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    
                    {bundle.popular && (
                      <div className="absolute top-2 left-2 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        POPULAR
                      </div>
                    )}

                    <div className="absolute bottom-2 right-2 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Save ZMW {bundle.savings}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <bundle.icon className="h-6 w-6 text-emerald-400 mr-3" />
                      <h4 className="text-xl font-bold text-white">{bundle.name}</h4>
                    </div>
                    
                    <p className="text-white/70 mb-4">{bundle.description}</p>

                    <div className="space-y-2 mb-4">
                      {bundle.services.map((service, index) => (
                        <div key={index} className="flex items-center text-sm text-white/80">
                          <Check className="h-3 w-3 mr-2 text-emerald-400" />
                          {service}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-white">
                          ZMW {bundle.bundlePrice}
                        </div>
                        <div className="text-sm text-white/60">
                          <span className="line-through">ZMW {bundle.originalPrice}</span> {bundle.duration}
                        </div>
                      </div>
                      <div className="text-emerald-400 font-bold text-lg">
                        -{Math.round((bundle.savings / bundle.originalPrice) * 100)}%
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:opacity-90"
                      size="sm"
                    >
                      <Gift className="mr-2 h-4 w-4" />
                      Get Bundle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Exclusive Offers */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Exclusive Offers</h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              Limited-time deals and special discounts just for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {exclusiveOffers.map((offer) => (
              <Card
                key={offer.id}
                className={`group cursor-pointer bg-gradient-to-br ${offer.color}/10 backdrop-blur-sm border border-white/20 hover:border-opacity-50 transition-all duration-300 hover:-translate-y-2`}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${offer.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <offer.icon className="h-8 w-8 text-white" />
                  </div>

                  <h4 className="text-xl font-bold text-white mb-2">{offer.title}</h4>
                  <p className="text-white/70 mb-4">{offer.description}</p>

                  <div className={`text-2xl font-bold bg-gradient-to-r ${offer.color} bg-clip-text text-transparent mb-2`}>
                    {offer.discount}
                  </div>

                  <div className="text-white/60 text-sm mb-4">
                    Valid until {new Date(offer.validUntil).toLocaleDateString()}
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-4">
                    <div className="text-xs text-white/60 mb-1">Promo Code:</div>
                    <div className="font-mono font-bold text-white tracking-wider">{offer.code}</div>
                  </div>

                  <Button
                    className={`w-full bg-gradient-to-r ${offer.color} hover:opacity-90`}
                    size="sm"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Claim Offer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Rewards Program */}
        <div className="mb-16">
          <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-500/30">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
                  <Crown className="h-8 w-8 text-yellow-400 mr-3" />
                  Loyalty Rewards Program
                </h3>
                <p className="text-white/80 max-w-2xl mx-auto">
                  Earn points with every purchase and unlock exclusive rewards
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-yellow-400">{rewardsProgram.currentPoints.toLocaleString()} Points</div>
                      <div className="text-white/70">Current Level: {rewardsProgram.level}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white/70">Next Reward:</div>
                      <div className="font-semibold text-white">{rewardsProgram.nextReward - rewardsProgram.currentPoints} points to go</div>
                    </div>
                  </div>

                  <div className="w-full bg-white/20 rounded-full h-3 mb-6">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${(rewardsProgram.currentPoints / rewardsProgram.nextReward) * 100}%` }}
                    />
                  </div>

                  <div className="text-center">
                    <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View Full Program
                    </Button>
                  </div>
                </div>

                {/* Available Rewards */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-4">Available Rewards</h4>
                  <div className="space-y-3">
                    {rewardsProgram.rewards.slice(0, 3).map((reward, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          reward.available 
                            ? 'bg-green-500/20 border border-green-500/30' 
                            : 'bg-white/5 border border-white/20'
                        }`}
                      >
                        <div>
                          <div className={`font-semibold ${reward.available ? 'text-green-400' : 'text-white/60'}`}>
                            {reward.reward}
                          </div>
                          <div className="text-sm text-white/70">
                            {reward.points.toLocaleString()} points
                          </div>
                        </div>
                        <Button
                          size="sm"
                          disabled={!reward.available}
                          className={
                            reward.available 
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "bg-white/10 text-white/40 cursor-not-allowed"
                          }
                        >
                          {reward.available ? 'Claim' : 'Locked'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Comparison */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Why Choose Premium?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: "Ad-Free", description: "Uninterrupted experience" },
              { icon: Download, title: "Offline Access", description: "Download & watch anywhere" },
              { icon: Headphones, title: "Premium Support", description: "24/7 priority assistance" },
              { icon: Sparkles, title: "Exclusive Content", description: "VIP access to special events" }
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
