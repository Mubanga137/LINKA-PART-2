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
import { ProviderChat } from "@/components/health-wellness/provider-chat"
import { MedicalDocuments } from "@/components/health-wellness/medical-documents"
import { BookingCalendar } from "@/components/health-wellness/booking-calendar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export default function HealthWellnessPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [showDocuments, setShowDocuments] = useState(false)
  const [showBooking, setShowBooking] = useState(false)

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

        {/* Quick Access Tools */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Digital Health Tools
                </span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Access advanced digital tools to manage your health records, communicate with providers,
                and schedule appointments seamlessly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Medical Documents */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Medical Records</h3>
                <p className="text-slate-600 mb-4">Securely store and share your medical documents with healthcare providers</p>
                <Button
                  onClick={() => setShowDocuments(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Manage Documents
                </Button>
              </div>

              {/* Provider Chat */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Chat with Providers</h3>
                <p className="text-slate-600 mb-4">Get quick answers and consultations through secure messaging</p>
                <Button
                  onClick={() => setIsChatOpen(true)}
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
                >
                  Start Conversation
                </Button>
              </div>

              {/* Quick Booking */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Book Appointment</h3>
                <p className="text-slate-600 mb-4">Schedule appointments with available healthcare providers</p>
                <Button
                  onClick={() => setShowBooking(true)}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
                >
                  Schedule Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
