"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HealthWellnessHero } from "@/components/health-wellness/health-wellness-hero"
import { ServiceCategories } from "@/components/health-wellness/service-categories"
import { AmbulanceQuickBook } from "@/components/health-wellness/ambulance-quick-book"
import { FeaturedProviders } from "@/components/health-wellness/featured-providers"
import { HealthTips } from "@/components/health-wellness/health-tips"
import { EmergencyBanner } from "@/components/health-wellness/emergency-banner"
import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export default function HealthWellnessPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Redirect non-customers or unauthenticated users
    if (!user) {
      router.push('/login?redirect=/services/health-wellness')
      return
    }
    
    if (user.role !== 'customer') {
      router.push('/')
      return
    }

    setIsLoading(false)
  }, [user, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Health & Wellness Services...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'customer') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50">
      <Header />
      
      {/* Emergency Banner - Always visible */}
      <EmergencyBanner />
      
      <main className="relative">
        {/* Hero Section */}
        <HealthWellnessHero />

        {/* Quick Ambulance Access */}
        <section className="py-8 relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Alert className="bg-red-50 border-red-200 mb-8">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Emergency Services Available 24/7</strong> - For immediate medical assistance, use our ambulance booking system or call emergency services.
              </AlertDescription>
            </Alert>
            <AmbulanceQuickBook />
          </div>
        </section>

        {/* Service Categories */}
        <ServiceCategories />

        {/* Featured Healthcare Providers */}
        <FeaturedProviders />

        {/* Health Tips & Articles */}
        <HealthTips />
      </main>

      <Footer />
    </div>
  )
}
