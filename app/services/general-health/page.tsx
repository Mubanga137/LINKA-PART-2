"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { BookingCalendar } from "@/components/health-wellness/booking-calendar"
import { ProviderChat } from "@/components/health-wellness/provider-chat"
import { 
  Stethoscope, 
  Brain,
  Home,
  TestTube,
  MapPin, 
  Star, 
  Clock, 
  Calendar, 
  MessageCircle,
  Phone,
  Users,
  Award,
  Shield,
  Search,
  Filter
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface HealthProvider {
  id: string
  name: string
  speciality: string
  avatar: string
  rating: number
  reviews: number
  price: number
  location: string
  distance: number
  type: 'general-practitioner' | 'mental-health' | 'home-care' | 'diagnostic-lab'
  services: string[]
  availability: string[]
  verified: boolean
  homeService: boolean
  telemedicine: boolean
  languages: string[]
}

const healthProviders: HealthProvider[] = [
  {
    id: "doctor-1",
    name: "Dr. Sarah Mwanza",
    speciality: "General Practitioner",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    reviews: 156,
    price: 150,
    location: "Lusaka Central",
    distance: 1.8,
    type: "general-practitioner",
    services: ["General Consultation", "Health Checkups", "Vaccinations", "Chronic Disease Management"],
    availability: ["Today", "Tomorrow", "This Week"],
    verified: true,
    homeService: true,
    telemedicine: true,
    languages: ["English", "Bemba", "Nyanja"]
  },
  {
    id: "psychologist-1",
    name: "Dr. James Banda",
    speciality: "Clinical Psychologist",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    reviews: 89,
    price: 200,
    location: "Lusaka East",
    distance: 3.2,
    type: "mental-health",
    services: ["Individual Therapy", "Couples Counseling", "Anxiety Treatment", "Depression Support"],
    availability: ["Tomorrow", "This Week"],
    verified: true,
    homeService: false,
    telemedicine: true,
    languages: ["English", "Bemba"]
  },
  {
    id: "nurse-1",
    name: "Grace Tembo",
    speciality: "Registered Nurse - Home Care",
    avatar: "https://images.unsplash.com/photo-1594824475467-e1ec8b9e39ad?w=150&h=150&fit=crop&crop=face",
    rating: 4.7,
    reviews: 234,
    price: 100,
    location: "Lusaka South",
    distance: 4.5,
    type: "home-care",
    services: ["Home Nursing", "Wound Care", "Medication Management", "Elderly Care"],
    availability: ["Today", "Tomorrow", "This Week"],
    verified: true,
    homeService: true,
    telemedicine: false,
    languages: ["English", "Bemba", "Nyanja", "Tonga"]
  },
  {
    id: "lab-1",
    name: "MedLab Diagnostics",
    speciality: "Diagnostic Laboratory",
    avatar: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=150&h=150&fit=crop&crop=center",
    rating: 4.6,
    reviews: 167,
    price: 80,
    location: "Lusaka West",
    distance: 2.9,
    type: "diagnostic-lab",
    services: ["Blood Tests", "Urine Analysis", "X-Rays", "ECG", "Home Sample Collection"],
    availability: ["Today", "Tomorrow", "This Week"],
    verified: true,
    homeService: true,
    telemedicine: false,
    languages: ["English"]
  }
]

const serviceCategories = [
  { id: "all", label: "All Services", icon: Stethoscope },
  { id: "general-practitioner", label: "General Doctors", icon: Stethoscope },
  { id: "mental-health", label: "Mental Health", icon: Brain },
  { id: "home-care", label: "Home Care", icon: Home },
  { id: "diagnostic-lab", label: "Diagnostic Labs", icon: TestTube }
]

export default function GeneralHealthPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [selectedProvider, setSelectedProvider] = useState<HealthProvider | null>(null)
  const [showBooking, setShowBooking] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/services/general-health')
      return
    }
    
    if (user.role !== 'customer') {
      router.push('/')
      return
    }
  }, [user, router])

  const filteredProviders = healthProviders.filter(provider => {
    const matchesCategory = selectedCategory === "all" || provider.type === selectedCategory
    const matchesSearch = searchQuery === "" || 
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.speciality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  const handleBooking = (provider: HealthProvider) => {
    setSelectedProvider(provider)
    setShowBooking(true)
  }

  const handleChat = (provider: HealthProvider) => {
    setSelectedProvider(provider)
    setShowChat(true)
  }

  if (!user || user.role !== 'customer') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50">
      <Header />
      
      <main className="py-8">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Stethoscope className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  General Health Services
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Connect with qualified healthcare professionals for consultations, diagnostics, and comprehensive care
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="Search doctors, services, or specialties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-3 text-lg border-slate-200 focus:border-blue-500 rounded-xl"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {serviceCategories.map((category) => {
                const Icon = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                        : 'bg-white/80 backdrop-blur-sm hover:bg-white border-blue-200'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {category.label}
                  </Button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Providers Grid */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.map((provider, index) => (
                <Card 
                  key={provider.id} 
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-white/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    {/* Provider Header */}
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={provider.avatar} alt={provider.name} />
                        <AvatarFallback>{provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-slate-900">{provider.name}</h3>
                          {provider.verified && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              <Award className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 font-medium">{provider.speciality}</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm font-bold">{provider.rating}</span>
                          <span className="ml-1 text-sm text-slate-500">({provider.reviews})</span>
                        </div>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="mb-4">
                      <p className="text-xs text-slate-500 mb-2 font-medium">Services:</p>
                      <div className="flex flex-wrap gap-1">
                        {provider.services.slice(0, 3).map((service, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                        {provider.services.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{provider.services.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Location & Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-slate-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{provider.location} • {provider.distance}km</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-slate-900">ZMW {provider.price}</div>
                        <div className="text-xs text-slate-500">consultation</div>
                      </div>
                    </div>

                    {/* Service Features */}
                    <div className="flex items-center gap-4 mb-4 text-xs">
                      {provider.homeService && (
                        <div className="flex items-center text-green-600">
                          <Home className="h-3 w-3 mr-1" />
                          Home Visit
                        </div>
                      )}
                      {provider.telemedicine && (
                        <div className="flex items-center text-blue-600">
                          <Phone className="h-3 w-3 mr-1" />
                          Telemedicine
                        </div>
                      )}
                      <div className="flex items-center text-purple-600">
                        <Clock className="h-3 w-3 mr-1" />
                        Available Today
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="mb-4">
                      <p className="text-xs text-slate-500 mb-1">Languages:</p>
                      <div className="flex flex-wrap gap-1">
                        {provider.languages.map((lang, idx) => (
                          <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleBooking(provider)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Now
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleChat(provider)}
                        className="border-blue-200 text-blue-600 hover:bg-blue-50"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
                      <Button variant="outline" size="sm" className="border-green-200 text-green-600 hover:bg-green-50">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Health Information */}
        <section className="py-16 bg-gradient-to-r from-blue-100 to-green-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Health Matters</h2>
              <p className="text-slate-600">Important health information and resources</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Regular Checkups",
                  description: "Schedule annual health screenings to prevent diseases",
                  icon: Stethoscope,
                  color: "text-blue-600"
                },
                {
                  title: "Mental Wellness",
                  description: "Take care of your mental health with professional support",
                  icon: Brain,
                  color: "text-purple-600"
                },
                {
                  title: "Emergency Preparedness",
                  description: "Know what to do in medical emergencies",
                  icon: Shield,
                  color: "text-red-600"
                }
              ].map((info, index) => {
                const Icon = info.icon
                return (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <Icon className={`h-12 w-12 ${info.color} mx-auto mb-4`} />
                      <h3 className="font-bold text-slate-900 mb-2">{info.title}</h3>
                      <p className="text-slate-600 text-sm mb-4">{info.description}</p>
                      <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Booking Modal */}
      {showBooking && selectedProvider && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="mb-4">
              <Button 
                variant="outline" 
                onClick={() => setShowBooking(false)}
                className="bg-white/90 backdrop-blur-sm"
              >
                ← Back to Health Services
              </Button>
            </div>
            <BookingCalendar 
              provider={selectedProvider}
              serviceType="healthcare"
              onBookingComplete={() => {
                setShowBooking(false)
                alert('Appointment booked successfully!')
              }}
            />
          </div>
        </div>
      )}

      {/* Chat Modal */}
      <ProviderChat 
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        selectedProviderId={selectedProvider?.id}
        providerType="healthcare"
      />
    </div>
  )
}
