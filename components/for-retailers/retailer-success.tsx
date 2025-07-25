"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  TrendingUp,
  Star,
  Quote,
  ArrowRight,
  Store,
  Users,
  DollarSign,
  Calendar,
  MapPin,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const successStories = [
  {
    id: 1,
    name: "Sarah Mwansa",
    business: "Mwansa Fashion House",
    location: "Lusaka",
    category: "Fashion & Clothing",
    avatar: "/placeholder-user.jpg",
    image: "/placeholder.svg?height=300&width=400",
    timeOnPlatform: "8 months",
    results: {
      salesIncrease: "450%",
      monthlyRevenue: "ZMW 45,000",
      customers: "2,100+",
      rating: 4.9,
    },
    quote: "Linka transformed my small tailoring business into a thriving online store. I now reach customers across Zambia and my monthly revenue has increased by over 400%. The support team is incredible!",
    highlights: ["Expanded to 5 provinces", "Hired 3 new employees", "Featured seller badge"],
  },
  {
    id: 2,
    name: "James Banda",
    business: "Banda Electronics",
    location: "Kitwe",
    category: "Electronics & Tech",
    avatar: "/placeholder-user.jpg",
    image: "/placeholder.svg?height=300&width=400",
    timeOnPlatform: "1 year",
    results: {
      salesIncrease: "320%",
      monthlyRevenue: "ZMW 78,000",
      customers: "3,500+",
      rating: 4.8,
    },
    quote: "The analytics dashboard helped me understand my customers better. I optimized my inventory based on the insights and doubled my profit margins. Linka's payment system is seamless!",
    highlights: ["Top seller in Copperbelt", "98% customer satisfaction", "Premium partner status"],
  },
  {
    id: 3,
    name: "Grace Phiri",
    business: "Phiri Agro Products",
    location: "Chipata",
    category: "Agriculture & Food",
    avatar: "/placeholder-user.jpg",
    image: "/placeholder.svg?height=300&width=400",
    timeOnPlatform: "6 months",
    results: {
      salesIncrease: "280%",
      monthlyRevenue: "ZMW 32,000",
      customers: "1,800+",
      rating: 4.9,
    },
    quote: "As a farmer, I never thought I could sell directly to customers in Lusaka. Linka made it possible. My organic products are now popular nationwide, and I get fair prices for my produce.",
    highlights: ["Organic certification badge", "Direct farm-to-table sales", "Rural success story"],
  },
]

const keyMetrics = [
  {
    icon: TrendingUp,
    label: "Average Sales Growth",
    value: "350%",
    description: "within first 6 months",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    icon: Users,
    label: "Customer Reach",
    value: "10x",
    description: "more customers reached",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: DollarSign,
    label: "Revenue Increase",
    value: "400%",
    description: "average monthly growth",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: Award,
    label: "Success Rate",
    value: "94%",
    description: "of retailers profitable",
    gradient: "from-orange-500 to-red-600",
  },
]

export function RetailerSuccess() {
  const [currentStory, setCurrentStory] = useState(0)

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length)
  }

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length)
  }

  const story = successStories[currentStory]

  return (
    <section className="py-24 bg-gradient-to-br from-white via-emerald-50 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm px-6 py-3 text-green-700 border border-green-200/50 mb-6">
            <Award className="mr-2 h-5 w-5 text-green-600" />
            <span className="text-sm font-medium">Success Stories</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Real Retailers,
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Real Results
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            See how Zambian retailers are transforming their businesses and achieving remarkable growth with Linka.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {keyMetrics.map((metric, index) => (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 bg-gradient-to-br ${metric.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{metric.value}</div>
                <div className="text-sm text-slate-600 mb-1">{metric.label}</div>
                <div className="text-xs text-slate-500">{metric.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Success Story */}
        <Card className="bg-white/90 backdrop-blur-sm border-white/30 shadow-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Story Content */}
              <div className="p-12">
                <div className="flex items-center justify-between mb-6">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 font-bold">
                    {story.category}
                  </Badge>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={prevStory}
                      className="w-10 h-10 rounded-full p-0 bg-white/80 backdrop-blur-sm"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={nextStory}
                      className="w-10 h-10 rounded-full p-0 bg-white/80 backdrop-blur-sm"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-8">
                  <Avatar className="w-16 h-16 ring-4 ring-emerald-500/20">
                    <AvatarImage src={story.avatar} alt={story.name} />
                    <AvatarFallback className="bg-emerald-500 text-white text-xl font-bold">
                      {story.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{story.name}</h3>
                    <p className="text-lg font-semibold text-emerald-600">{story.business}</p>
                    <div className="flex items-center space-x-4 text-slate-500 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {story.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {story.timeOnPlatform} on Linka
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative mb-8">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-emerald-500/30" />
                  <blockquote className="text-lg text-slate-700 leading-relaxed italic pl-6">
                    "{story.quote}"
                  </blockquote>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-emerald-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-emerald-600">{story.results.salesIncrease}</div>
                    <div className="text-sm text-slate-600">Sales Increase</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-blue-600">{story.results.monthlyRevenue}</div>
                    <div className="text-sm text-slate-600">Monthly Revenue</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-purple-600">{story.results.customers}</div>
                    <div className="text-sm text-slate-600">Customers</div>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4">
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl font-bold text-orange-600">{story.results.rating}</div>
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    </div>
                    <div className="text-sm text-slate-600">Customer Rating</div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900">Key Achievements:</h4>
                  {story.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-slate-700 font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Story Image */}
              <div className="relative bg-gradient-to-br from-emerald-100 to-green-100">
                <img
                  src={story.image}
                  alt={story.business}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <Badge className="bg-white/90 backdrop-blur-sm text-slate-700 font-bold">
                    <Store className="mr-2 h-4 w-4" />
                    Featured Success Story
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {successStories.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStory(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentStory 
                  ? 'bg-emerald-500 w-8' 
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Ready to Write Your Success Story?
          </h3>
          <p className="text-lg text-slate-600 mb-8">
            Join these successful retailers and start growing your business today.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 text-lg shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5"
          >
            <Store className="mr-3 h-5 w-5" />
            Start Your Journey Now
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
