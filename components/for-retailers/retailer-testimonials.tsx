"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Quote,
  MapPin,
  TrendingUp,
  Store,
  Users,
  Heart,
} from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Mutinta Kaseba",
    business: "Kaseba Craft Corner",
    location: "Ndola",
    category: "Handmade Crafts",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    quote: "Linka helped me turn my hobby into a thriving business. I now sell my traditional crafts to customers across Zambia. The platform is so easy to use, and payments are instant!",
    results: "300% increase in sales",
    timeOnPlatform: "10 months",
    highlight: "From hobby to full-time business",
  },
  {
    id: 2,
    name: "Christopher Lungu",
    business: "Lungu Auto Parts",
    location: "Livingstone",
    category: "Automotive",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    quote: "The inventory management tools are incredible. I can track all my auto parts across multiple locations. Customer service is outstanding - they really understand local business needs.",
    results: "450% growth in 8 months",
    timeOnPlatform: "8 months",
    highlight: "Expanded to 3 locations",
  },
  {
    id: 3,
    name: "Priscilla Mbewe",
    business: "Mbewe Beauty Salon",
    location: "Kabwe",
    category: "Beauty & Cosmetics",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    quote: "I love how I can manage appointments and sell products online. My clients can book services and buy beauty products 24/7. It's like having a virtual assistant!",
    results: "200% more bookings",
    timeOnPlatform: "6 months",
    highlight: "Integrated services & products",
  },
  {
    id: 4,
    name: "David Chanda",
    business: "Chanda Fresh Foods",
    location: "Mongu",
    category: "Fresh Produce",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    quote: "Being able to sell fresh produce online was a game-changer. The cold chain logistics support and same-day delivery options help me reach urban customers from rural areas.",
    results: "500% revenue increase",
    timeOnPlatform: "1 year",
    highlight: "Rural-to-urban success story",
  },
  {
    id: 5,
    name: "Mercy Phiri",
    business: "Phiri Educational Supplies",
    location: "Kasama",
    category: "Education",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    quote: "Parents and schools across Northern Province now have access to quality educational materials. The platform's reach helped me serve communities I never thought possible.",
    results: "350% customer growth",
    timeOnPlatform: "9 months",
    highlight: "Serving entire Northern Province",
  },
  {
    id: 6,
    name: "Isaac Banda",
    business: "Banda Tech Solutions",
    location: "Solwezi",
    category: "Technology",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    quote: "The analytics dashboard gives me insights I never had before. I can see exactly what customers want and when. This data-driven approach doubled my profit margins.",
    results: "400% profit increase",
    timeOnPlatform: "7 months",
    highlight: "Data-driven growth",
  },
]

const stats = [
  { label: "Average Rating", value: "4.9/5", icon: Star },
  { label: "Success Rate", value: "94%", icon: TrendingUp },
  { label: "Happy Retailers", value: "1,200+", icon: Users },
  { label: "Provinces Covered", value: "10/10", icon: MapPin },
]

export function RetailerTestimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 bg-gradient-to-br from-white via-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm px-6 py-3 text-yellow-700 border border-yellow-200/50 mb-6">
            <Heart className="mr-2 h-5 w-5 text-yellow-600" />
            <span className="text-sm font-medium">Loved by Retailers</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Stories from
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Successful Retailers
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Hear directly from Zambian retailers who have transformed their businesses with Linka. 
            Their success stories could be yours too.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Testimonial */}
        <Card className="bg-white/90 backdrop-blur-sm border-white/30 shadow-2xl overflow-hidden mb-16">
          <CardContent className="p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Testimonial Content */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 font-bold">
                    {testimonials[currentTestimonial].category}
                  </Badge>
                  <Badge variant="outline" className="border-emerald-500 text-emerald-700">
                    {testimonials[currentTestimonial].highlight}
                  </Badge>
                </div>

                <div className="relative mb-8">
                  <Quote className="absolute -top-4 -left-4 h-12 w-12 text-yellow-500/20" />
                  <blockquote className="text-2xl text-slate-700 leading-relaxed font-bold font-medium pl-8">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="w-16 h-16 ring-4 ring-yellow-500/20">
                    <AvatarImage src={testimonials[currentTestimonial].avatar} alt={testimonials[currentTestimonial].name} />
                    <AvatarFallback className="bg-yellow-500 text-white text-xl font-bold">
                      {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{testimonials[currentTestimonial].name}</h3>
                    <p className="text-lg font-semibold text-yellow-600">{testimonials[currentTestimonial].business}</p>
                    <div className="flex items-center space-x-4 text-slate-500 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {testimonials[currentTestimonial].location}
                      </div>
                      <div className="flex items-center">
                        <Store className="h-4 w-4 mr-1" />
                        {testimonials[currentTestimonial].timeOnPlatform} on Linka
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <div className="text-sm text-slate-600">
                    {testimonials[currentTestimonial].rating}/5 stars
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8">
                <h4 className="text-2xl font-bold text-slate-900 mb-6 text-center">Business Results</h4>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-600 mb-2">
                      {testimonials[currentTestimonial].results}
                    </div>
                    <div className="text-slate-600">Since joining Linka</div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center">
                      <TrendingUp className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                      <div className="font-bold text-slate-900">Sustainable Growth</div>
                      <div className="text-sm text-slate-600">Consistent month-over-month growth</div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center">
                      <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <div className="font-bold text-slate-900">Expanded Reach</div>
                      <div className="text-sm text-slate-600">Serving customers nationwide</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.filter((_, index) => index !== currentTestimonial).slice(0, 6).map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => setCurrentTestimonial(testimonials.findIndex(t => t.id === testimonial.id))}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-yellow-500 text-white font-bold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm text-slate-600">{testimonial.business}</p>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-4 line-clamp-3">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{testimonial.location}</span>
                  <Badge variant="secondary" className="text-xs">
                    {testimonial.results.split(' ')[0]} growth
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-2 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial 
                  ? 'bg-yellow-500 w-8' 
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
