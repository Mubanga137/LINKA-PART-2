"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Store,
  Rocket,
  Star,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Zap,
  Shield,
  TrendingUp,
  Mail,
  Phone,
} from "lucide-react"

const quickStats = [
  { icon: Clock, label: "Setup Time", value: "15 min", color: "blue" },
  { icon: DollarSign, label: "Setup Cost", value: "Free", color: "emerald" },
  { icon: Users, label: "Support", value: "24/7", color: "purple" },
  { icon: TrendingUp, label: "Avg Growth", value: "300%", color: "orange" },
]

const guarantees = [
  "No setup fees or hidden costs",
  "Free forever starter plan",
  "24/7 Zambian support team",
  "Money-back guarantee",
  "Instant approval process",
  "Cancel anytime",
]

export function RetailerCTA() {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleQuickSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    // Reset form or show success message
    setEmail("")
    setPhone("")
  }

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-green-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main CTA */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-sm px-6 py-3 text-emerald-300 border border-emerald-500/30 mb-8">
            <Rocket className="mr-2 h-5 w-5 text-emerald-400 animate-pulse" />
            <span className="text-sm font-medium">🚀 Ready to Launch Your Success?</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Start Your Journey to
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Business Success
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
            Join 1,200+ successful Zambian retailers who have transformed their businesses with Linka. 
            Start free, grow fast, succeed together.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {quickStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-br from-${stat.color}-400 to-${stat.color}-500 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Signup Form Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Quick Signup Form */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Store className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Quick Start Signup</h3>
                <p className="text-slate-300">Get started in less than 2 minutes</p>
              </div>

              <form onSubmit={handleQuickSignup} className="space-y-6">
                <div>
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 h-12"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 h-12"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white h-12 text-lg font-bold shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Setting Up Your Store...
                    </>
                  ) : (
                    <>
                      <Rocket className="mr-3 h-5 w-5" />
                      Start Selling Now - Free!
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center mt-6">
                <p className="text-sm text-slate-400 mb-4">
                  By signing up, you agree to our terms and privacy policy
                </p>
                <div className="flex items-center justify-center space-x-4 text-slate-300">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    <span className="text-xs">Secure</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 mr-1" />
                    <span className="text-xs">Instant</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    <span className="text-xs">Trusted</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits & Guarantees */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-8">
              Why Thousands Choose Linka
            </h3>
            
            <div className="space-y-4 mb-12">
              {guarantees.map((guarantee, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-slate-200 font-medium">{guarantee}</span>
                </div>
              ))}
            </div>

            {/* Alternative CTAs */}
            <div className="space-y-4">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-2 border-white/30 text-white hover:bg-white/10 h-12 text-lg bg-white/5 backdrop-blur-sm"
              >
                <Phone className="mr-3 h-5 w-5" />
                Schedule a Demo Call
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                className="w-full text-slate-300 hover:text-white hover:bg-white/5 h-12"
              >
                <Mail className="mr-3 h-5 w-5" />
                Download Our Retailer Guide
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm">4.9/5 from 1,200+ retailers</p>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                  #1 in Zambia
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-20">
          <p className="text-lg text-slate-300 mb-4">
            Questions? Our Zambian team is here to help 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="ghost"
              className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
            >
              <Phone className="mr-2 h-4 w-4" />
              +260 123 456 789
            </Button>
            <Button
              variant="ghost"
              className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
            >
              <Mail className="mr-2 h-4 w-4" />
              retailers@linka.zm
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
