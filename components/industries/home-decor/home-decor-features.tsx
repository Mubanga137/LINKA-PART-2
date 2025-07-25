"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Truck, Award, Users, Clock, Star, CheckCircle, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Fast Installation",
    description: "Quick and professional installation services across Lusaka and major cities",
    stats: "24-48 hours",
    gradient: "from-yellow-500 to-orange-500",
    bgGradient: "from-yellow-50 to-orange-50",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Free delivery for orders above ZMW 500 within Lusaka metropolitan area",
    stats: "ZMW 500+",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "All products come with warranty and quality assurance from trusted suppliers",
    stats: "2-5 years",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
  },
  {
    icon: Users,
    title: "Expert Consultation",
    description: "Free consultation with interior design experts and home improvement specialists",
    stats: "Free",
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50",
  },
]

export function HomeDecorFeatures() {
  return (
    <section className="py-32 bg-gradient-to-br from-slate-50 to-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Why Choose{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Linka Home
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Experience the best in home and decor services with our commitment to quality, speed, and customer
            satisfaction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-white/80 backdrop-blur-sm border-white/20 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className={`p-6 bg-gradient-to-br ${feature.bgGradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-2 right-2 w-6 h-6 bg-white/30 rounded-full animate-float"></div>
                    <div className="absolute bottom-2 left-2 w-3 h-3 bg-white/20 rounded-full animate-bounce-slow"></div>
                  </div>

                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                    >
                      <feature.icon className="h-8 w-8 text-white group-hover:animate-bounce" />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>

                    <Badge className="bg-white/50 text-slate-700 hover:scale-105 transition-transform">
                      {feature.stats}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors">
                    {feature.description}
                  </p>

                  <div className="mt-4 w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${feature.gradient} transition-all duration-1000 ease-out group-hover:w-full w-0`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="flex items-center justify-center mb-4">
              <div className="text-4xl font-bold text-blue-600 group-hover:scale-110 transition-transform">950+</div>
              <TrendingUp className="ml-2 h-6 w-6 text-green-500 group-hover:animate-bounce" />
            </div>
            <div className="text-slate-600">Products Available</div>
          </div>

          <div className="text-center group">
            <div className="flex items-center justify-center mb-4">
              <div className="text-4xl font-bold text-purple-600 group-hover:scale-110 transition-transform">98%</div>
              <Star className="ml-2 h-6 w-6 text-yellow-500 fill-current group-hover:animate-spin" />
            </div>
            <div className="text-slate-600">Customer Satisfaction</div>
          </div>

          <div className="text-center group">
            <div className="flex items-center justify-center mb-4">
              <div className="text-4xl font-bold text-green-600 group-hover:scale-110 transition-transform">24h</div>
              <Clock className="ml-2 h-6 w-6 text-blue-500 group-hover:animate-pulse" />
            </div>
            <div className="text-slate-600">Average Delivery</div>
          </div>

          <div className="text-center group">
            <div className="flex items-center justify-center mb-4">
              <div className="text-4xl font-bold text-orange-600 group-hover:scale-110 transition-transform">34</div>
              <CheckCircle className="ml-2 h-6 w-6 text-green-500 group-hover:animate-bounce" />
            </div>
            <div className="text-slate-600">Verified Retailers</div>
          </div>
        </div>
      </div>
    </section>
  )
}
