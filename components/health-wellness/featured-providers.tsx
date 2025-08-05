"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Star,
  MapPin,
  Calendar,
  Phone,
  MessageCircle,
  Award,
  Shield,
  Clock,
  Heart,
  Users,
  Stethoscope,
  Brain,
  Home,
  Video,
  CheckCircle,
  Store
} from "lucide-react"

interface FeaturedProvider {
  id: string
  name: string
  title: string
  specialty: string
  avatar: string
  coverImage: string
  rating: number
  reviews: number
  experience: number
  location: string
  distance: number
  pricing: {
    consultation: number
    homeVisit: number
    telemedicine: number
  }
  availability: {
    today: boolean
    tomorrow: boolean
    thisWeek: boolean
  }
  languages: string[]
  achievements: string[]
  bio: string
  verified: boolean
  topRated: boolean
  acceptsInsurance: boolean
  services: string[]
  responseTime: string
}

const featuredProviders: FeaturedProvider[] = [
  {
    id: "dr-mwanza",
    name: "Dr. John Mwanza",
    title: "General Practitioner",
    specialty: "Family Medicine & Emergency Care",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
    rating: 4.9,
    reviews: 234,
    experience: 12,
    location: "Lusaka Central",
    distance: 2.3,
    pricing: {
      consultation: 150,
      homeVisit: 250,
      telemedicine: 100
    },
    availability: {
      today: true,
      tomorrow: true,
      thisWeek: true
    },
    languages: ["English", "Bemba", "Nyanja"],
    achievements: ["Top Rated Doctor", "Medical Excellence Award", "Patient Choice Award"],
    bio: "Dr. Mwanza is a highly experienced general practitioner with over 12 years of medical practice. He specializes in family medicine, emergency care, and preventive health.",
    verified: true,
    topRated: true,
    acceptsInsurance: true,
    services: ["General Consultation", "Health Checkups", "Emergency Care", "Vaccinations"],
    responseTime: "< 30 min"
  },
  {
    id: "dr-banda",
    name: "Dr. Sarah Banda",
    title: "Clinical Psychologist",
    specialty: "Mental Health & Therapy",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=200&fit=crop",
    rating: 4.8,
    reviews: 156,
    experience: 8,
    location: "Lusaka East",
    distance: 4.1,
    pricing: {
      consultation: 200,
      homeVisit: 300,
      telemedicine: 150
    },
    availability: {
      today: false,
      tomorrow: true,
      thisWeek: true
    },
    languages: ["English", "Bemba"],
    achievements: ["Psychology Excellence Award", "Patient Care Recognition"],
    bio: "Dr. Banda is a dedicated clinical psychologist specializing in anxiety, depression, and family therapy. She provides compassionate care with evidence-based treatments.",
    verified: true,
    topRated: true,
    acceptsInsurance: false,
    services: ["Individual Therapy", "Family Counseling", "Group Sessions", "Crisis Intervention"],
    responseTime: "< 1 hour"
  },
  {
    id: "pt-tembo",
    name: "Moses Tembo",
    title: "Licensed Physiotherapist",
    specialty: "Sports & Rehabilitation Therapy",
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop",
    rating: 4.7,
    reviews: 89,
    experience: 6,
    location: "Lusaka South",
    distance: 6.8,
    pricing: {
      consultation: 120,
      homeVisit: 200,
      telemedicine: 80
    },
    availability: {
      today: true,
      tomorrow: true,
      thisWeek: true
    },
    languages: ["English", "Nyanja", "Tonga"],
    achievements: ["Sports Therapy Certification", "Rehabilitation Specialist"],
    bio: "Moses is a skilled physiotherapist with expertise in sports injuries, post-surgery rehabilitation, and chronic pain management. He offers both clinic and home-based treatments.",
    verified: true,
    topRated: false,
    acceptsInsurance: true,
    services: ["Sports Injury Treatment", "Post-Surgery Rehab", "Pain Management", "Mobility Training"],
    responseTime: "< 45 min"
  },
  {
    id: "nurse-phiri",
    name: "Grace Phiri",
    title: "Registered Nurse",
    specialty: "Home Care & Elderly Support",
    avatar: "https://images.unsplash.com/photo-1594824475467-e1ec8b9e39ad?w=150&h=150&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop",
    rating: 4.9,
    reviews: 178,
    experience: 10,
    location: "Lusaka West",
    distance: 5.2,
    pricing: {
      consultation: 80,
      homeVisit: 120,
      telemedicine: 60
    },
    availability: {
      today: true,
      tomorrow: true,
      thisWeek: true
    },
    languages: ["English", "Bemba", "Nyanja"],
    achievements: ["Excellence in Nursing Care", "Community Health Champion"],
    bio: "Grace is a compassionate registered nurse with extensive experience in home care, elderly support, and chronic disease management. She provides personalized care plans.",
    verified: true,
    topRated: true,
    acceptsInsurance: true,
    services: ["Home Nursing", "Medication Management", "Wound Care", "Health Monitoring"],
    responseTime: "< 20 min"
  }
]

export function FeaturedProviders() {
  const [selectedProvider, setSelectedProvider] = useState<FeaturedProvider | null>(null)

  const getSpecialtyIcon = (specialty: string) => {
    if (specialty.includes('Mental Health')) return Brain
    if (specialty.includes('Family Medicine')) return Stethoscope
    if (specialty.includes('Home Care')) return Home
    return Heart
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50/50 to-green-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Featured Healthcare Providers
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Meet our top-rated healthcare professionals. All providers are verified, highly experienced, 
            and committed to delivering exceptional care to our community.
          </p>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProviders.map((provider, index) => {
            const SpecialtyIcon = getSpecialtyIcon(provider.specialty)
            
            return (
              <Card
                key={provider.id}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:scale-105 bg-white/90 backdrop-blur-sm border-white/20 overflow-hidden cursor-pointer"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => setSelectedProvider(provider)}
              >
                <CardContent className="p-0">
                  {/* Cover Image */}
                  <div className="relative h-24 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${provider.coverImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 right-3 flex flex-col space-y-1">
                      {provider.verified && (
                        <Badge className="bg-green-600 text-white text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      {provider.topRated && (
                        <Badge className="bg-yellow-500 text-white text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          Top Rated
                        </Badge>
                      )}
                    </div>

                    {/* Response Time */}
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-white/90 text-slate-700 text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {provider.responseTime}
                      </Badge>
                    </div>
                  </div>

                  {/* Provider Info */}
                  <div className="p-4 relative">
                    {/* Avatar overlapping cover */}
                    <div className="absolute -top-6 left-4">
                      <Avatar className="w-12 h-12 border-3 border-white shadow-lg">
                        <AvatarImage src={provider.avatar} alt={provider.name} />
                        <AvatarFallback>{provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="mt-8">
                      {/* Name & Title */}
                      <div className="mb-3">
                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                          {provider.name}
                        </h3>
                        <p className="text-sm text-slate-600 font-medium">{provider.title}</p>
                        <p className="text-xs text-slate-500">{provider.specialty}</p>
                      </div>

                      {/* Rating & Experience */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm font-bold text-slate-900">{provider.rating}</span>
                          <span className="ml-1 text-sm text-slate-500">({provider.reviews})</span>
                        </div>
                        <div className="text-sm text-slate-600">
                          {provider.experience} years exp.
                        </div>
                      </div>

                      {/* Location & Distance */}
                      <div className="flex items-center text-sm text-slate-500 mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{provider.location}</span>
                        <span className="mx-2">•</span>
                        <span>{provider.distance}km away</span>
                      </div>

                      {/* Services Icons */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex space-x-2">
                          {provider.services.includes("General Consultation") && (
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                              <Stethoscope className="h-3 w-3 text-blue-600" />
                            </div>
                          )}
                          {provider.pricing.homeVisit > 0 && (
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                              <Home className="h-3 w-3 text-green-600" />
                            </div>
                          )}
                          {provider.pricing.telemedicine > 0 && (
                            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                              <Video className="h-3 w-3 text-purple-600" />
                            </div>
                          )}
                        </div>
                        <div className="text-sm font-bold text-slate-900">
                          From ZMW {Math.min(provider.pricing.consultation, provider.pricing.telemedicine)}
                        </div>
                      </div>

                      {/* Availability */}
                      <div className="flex items-center space-x-2 mb-4">
                        {provider.availability.today && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Today
                          </Badge>
                        )}
                        {provider.availability.tomorrow && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs">
                            Tomorrow
                          </Badge>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <Button 
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
                        >
                          <Calendar className="h-3 w-3 mr-1" />
                          Book
                        </Button>
                        <Button variant="outline" size="sm" className="px-3">
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="px-3">
                          <MessageCircle className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Users className="mr-2 h-4 w-4" />
            View All Healthcare Providers
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Why Choose Our Providers?</h3>
            <p className="text-slate-600">Quality healthcare you can trust</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "100% Verified",
                description: "All providers are licensed and background-checked",
                color: "text-green-500"
              },
              {
                icon: Star,
                title: "Top Rated",
                description: "Only the highest-rated professionals in our network",
                color: "text-yellow-500"
              },
              {
                icon: Clock,
                title: "Fast Response",
                description: "Average response time under 30 minutes",
                color: "text-blue-500"
              },
              {
                icon: Heart,
                title: "Quality Care",
                description: "Committed to exceptional patient outcomes",
                color: "text-red-500"
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 ${feature.color} bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
