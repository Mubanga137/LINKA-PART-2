"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, CreditCard, Truck, Shield, Users, TrendingUp, ArrowRight, CheckCircle } from "lucide-react"

const partners = [
  {
    id: 1,
    name: "Bank of Zambia",
    type: "Financial Partner",
    description: "Official banking partner providing secure payment processing and financial services",
    logo: "/placeholder.svg?height=80&width=120&text=BOZ",
    benefits: ["Secure Payments", "Currency Exchange", "Financial Compliance"],
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100",
    icon: CreditCard,
  },
  {
    id: 2,
    name: "Zambia Development Agency",
    type: "Government Partner",
    description: "Supporting local business growth and export development initiatives",
    logo: "/placeholder.svg?height=80&width=120&text=ZDA",
    benefits: ["Business Support", "Export Assistance", "Regulatory Guidance"],
    gradient: "from-green-500 to-green-600",
    bgGradient: "from-green-50 to-green-100",
    icon: Building2,
  },
  {
    id: 3,
    name: "DHL Zambia",
    type: "Logistics Partner",
    description: "Reliable nationwide and international shipping solutions for all retailers",
    logo: "/placeholder.svg?height=80&width=120&text=DHL",
    benefits: ["Fast Delivery", "International Shipping", "Package Tracking"],
    gradient: "from-yellow-500 to-orange-500",
    bgGradient: "from-yellow-50 to-orange-50",
    icon: Truck,
  },
  {
    id: 4,
    name: "ZABS (Zambia Bureau of Standards)",
    type: "Quality Partner",
    description: "Ensuring product quality and safety standards across all categories",
    logo: "/placeholder.svg?height=80&width=120&text=ZABS",
    benefits: ["Quality Assurance", "Product Certification", "Safety Standards"],
    gradient: "from-purple-500 to-purple-600",
    bgGradient: "from-purple-50 to-purple-100",
    icon: Shield,
  },
  {
    id: 5,
    name: "MTN Zambia",
    type: "Technology Partner",
    description: "Mobile money integration and digital payment solutions",
    logo: "/placeholder.svg?height=80&width=120&text=MTN",
    benefits: ["Mobile Money", "Digital Payments", "Network Coverage"],
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
    icon: CreditCard,
  },
  {
    id: 6,
    name: "ZNCC (Zambia National Commercial Bank)",
    type: "Banking Partner",
    description: "Comprehensive banking services for retailers and customers",
    logo: "/placeholder.svg?height=80&width=120&text=ZNCC",
    benefits: ["Business Banking", "Merchant Services", "Credit Facilities"],
    gradient: "from-teal-500 to-cyan-500",
    bgGradient: "from-teal-50 to-cyan-50",
    icon: Building2,
  },
]

const achievements = [
  {
    number: "300+",
    label: "Active Retailers",
    icon: Users,
    color: "text-blue-600",
  },
  {
    number: "ZMW 2.1M",
    label: "Monthly GMV",
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    number: "15,000+",
    label: "Products Listed",
    icon: CheckCircle,
    color: "text-purple-600",
  },
  {
    number: "98%",
    label: "Customer Satisfaction",
    icon: Shield,
    color: "text-orange-600",
  },
]

export function IndustryPartners() {
  return (
    <section className="py-32 bg-gradient-to-br from-slate-50 to-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Trusted </span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Partners</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Working with leading Zambian institutions to provide the best e-commerce experience
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {partners.map((partner, index) => (
            <Card
              key={partner.id}
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 bg-white/80 backdrop-blur-sm border-white/20 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                {/* Header */}
                <div className={`p-6 bg-gradient-to-br ${partner.bgGradient} relative overflow-hidden`}>
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-2 right-2 w-6 h-6 bg-white/30 rounded-full animate-float"></div>
                    <div className="absolute bottom-2 left-2 w-3 h-3 bg-white/20 rounded-full animate-bounce-slow"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${partner.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                      >
                        <partner.icon className="h-6 w-6 text-white group-hover:animate-bounce" />
                      </div>
                      <img
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name}
                        className="h-8 opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {partner.name}
                    </h3>

                    <Badge className="bg-white/50 text-slate-700 hover:scale-105 transition-transform">
                      {partner.type}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-slate-600 mb-6 leading-relaxed group-hover:text-slate-800 transition-colors">
                    {partner.description}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-slate-900">Key Benefits:</h4>
                    {partner.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 group-hover:animate-pulse" />
                        {benefit}
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${partner.gradient} transition-all duration-1000 ease-out group-hover:w-full w-0`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full animate-float"></div>
            <div
              className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full animate-float"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 left-1/4 w-8 h-8 bg-white rounded-full animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Platform Achievements</h3>
              <p className="text-xl opacity-90">Powered by strong partnerships and community trust</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center group" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="flex items-center justify-center mb-4">
                    <achievement.icon className="h-8 w-8 mr-2 group-hover:animate-bounce" />
                  </div>
                  <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">
                    {achievement.number}
                  </div>
                  <div className="text-lg opacity-90">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partnership CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Interested in Partnership?</h3>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Join our growing network of partners and help shape the future of e-commerce in Zambia
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg group"
          >
            <Users className="mr-2 h-5 w-5 group-hover:animate-bounce" />
            Become a Partner
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
