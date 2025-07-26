"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookingCalendar } from "@/components/health-wellness/booking-calendar"
import { ProviderChat } from "@/components/health-wellness/provider-chat"
import { 
  Dumbbell, 
  Heart, 
  MapPin, 
  Star, 
  Clock, 
  Calendar, 
  MessageCircle,
  Phone,
  Home,
  Users,
  Award,
  Play,
  Target,
  Activity
} from "lucide-react"


interface FitnessProvider {
  id: string
  name: string
  speciality: string
  avatar: string
  rating: number
  reviews: number
  price: number
  location: string
  distance: number
  type: 'personal-trainer' | 'yoga-instructor' | 'fitness-class' | 'gym'
  services: string[]
  availability: string[]
  verified: boolean
  homeService: boolean
}

const fitnessProviders: FitnessProvider[] = [
  {
    id: "trainer-1",
    name: "Moses Kunda",
    speciality: "Personal Fitness Trainer",
    avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    reviews: 134,
    price: 120,
    location: "Lusaka Central",
    distance: 2.1,
    type: "personal-trainer",
    services: ["Weight Training", "Cardio", "Strength Building", "Nutrition Coaching"],
    availability: ["Today", "Tomorrow", "This Week"],
    verified: true,
    homeService: true
  },
  {
    id: "yoga-1",
    name: "Grace Mwanza",
    speciality: "Certified Yoga Instructor",
    avatar: "https://images.unsplash.com/photo-1594824475467-e1ec8b9e39ad?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    reviews: 89,
    price: 80,
    location: "Lusaka East",
    distance: 3.4,
    type: "yoga-instructor",
    services: ["Hatha Yoga", "Vinyasa Flow", "Meditation", "Flexibility Training"],
    availability: ["Today", "Tomorrow"],
    verified: true,
    homeService: true
  },
  {
    id: "gym-1",
    name: "Fit Zone Gym",
    speciality: "Modern Fitness Center",
    avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=center",
    rating: 4.6,
    reviews: 267,
    price: 150,
    location: "Lusaka South",
    distance: 5.2,
    type: "gym",
    services: ["Group Classes", "Equipment Access", "Swimming Pool", "Sauna"],
    availability: ["Today", "Tomorrow", "This Week"],
    verified: true,
    homeService: false
  },
  {
    id: "class-1",
    name: "Sarah Tembo",
    speciality: "Aerobics & Dance Fitness",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 4.7,
    reviews: 156,
    price: 60,
    location: "Lusaka West",
    distance: 4.1,
    type: "fitness-class",
    services: ["Aerobics", "Zumba", "Dance Fitness", "Group Workouts"],
    availability: ["Tomorrow", "This Week"],
    verified: true,
    homeService: false
  }
]

export default function FitnessYogaPage() {
  const router = useRouter()
  const [selectedProvider, setSelectedProvider] = useState<FitnessProvider | null>(null)
  const [showBooking, setShowBooking] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredProviders = selectedCategory === "all" 
    ? fitnessProviders 
    : fitnessProviders.filter(p => p.type === selectedCategory)

  const handleBooking = (provider: FitnessProvider) => {
    setSelectedProvider(provider)
    setShowBooking(true)
  }

  const handleChat = (provider: FitnessProvider) => {
    setSelectedProvider(provider)
    setShowChat(true)
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      <Header />
      
      <main className="py-8">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-green-500/10"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Dumbbell className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                  Fitness & Yoga
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Transform your health with professional fitness trainers, yoga instructors, and wellness experts in Zambia
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {[
                { id: "all", label: "All Services", icon: Activity },
                { id: "personal-trainer", label: "Personal Trainers", icon: Dumbbell },
                { id: "yoga-instructor", label: "Yoga Instructors", icon: Heart },
                { id: "fitness-class", label: "Fitness Classes", icon: Users },
                { id: "gym", label: "Gyms & Centers", icon: Target }
              ].map((category) => {
                const Icon = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-orange-600 to-green-600 text-white shadow-lg'
                        : 'bg-white/80 backdrop-blur-sm hover:bg-white border-orange-200'
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
                        <div className="text-xs text-slate-500">per session</div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex items-center gap-4 mb-4 text-xs">
                      {provider.homeService && (
                        <div className="flex items-center text-green-600">
                          <Home className="h-3 w-3 mr-1" />
                          Home Service
                        </div>
                      )}
                      <div className="flex items-center text-blue-600">
                        <Clock className="h-3 w-3 mr-1" />
                        Available Today
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleBooking(provider)}
                        className="flex-1 bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Session
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleChat(provider)}
                        className="border-orange-200 text-orange-600 hover:bg-orange-50"
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

        {/* Fitness Tips */}
        <section className="py-16 bg-gradient-to-r from-orange-100 to-green-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Fitness Tips & Workouts</h2>
              <p className="text-slate-600">Free workout guides and fitness tips from our experts</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "5-Minute Morning Routine",
                  description: "Start your day with this energizing workout",
                  duration: "5 min",
                  level: "Beginner"
                },
                {
                  title: "Home Yoga Flow",
                  description: "Relaxing yoga sequence for stress relief",
                  duration: "20 min", 
                  level: "All Levels"
                },
                {
                  title: "Strength Training Basics",
                  description: "Build muscle with bodyweight exercises",
                  duration: "15 min",
                  level: "Intermediate"
                }
              ].map((tip, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-orange-100 text-orange-700">{tip.level}</Badge>
                      <div className="flex items-center text-sm text-slate-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {tip.duration}
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{tip.title}</h3>
                    <p className="text-slate-600 text-sm mb-4">{tip.description}</p>
                    <Button variant="outline" size="sm" className="w-full border-orange-200 text-orange-600 hover:bg-orange-50">
                      <Play className="h-4 w-4 mr-2" />
                      Start Workout
                    </Button>
                  </CardContent>
                </Card>
              ))}
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
                ← Back to Fitness Services
              </Button>
            </div>
            <BookingCalendar 
              provider={selectedProvider}
              onBookingComplete={() => {
                setShowBooking(false)
                alert('Session booked successfully!')
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
      />
    </div>
  )
}
