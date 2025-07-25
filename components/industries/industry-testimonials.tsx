"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, TrendingUp } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Chanda Mwanza",
    business: "Mwanza Traditional Crafts",
    industry: "Traditional Crafts",
    location: "Chilenje Market, Lusaka",
    rating: 5,
    comment:
      "Linka helped us reach customers across Zambia. Our monthly sales increased by 300% since joining the platform. The mobile money integration is perfect for our customers.",
    revenue: "ZMW 45,000/month",
    growth: "+300%",
    image: "/placeholder.svg?height=80&width=80&text=CM",
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 to-red-50",
  },
  {
    id: 2,
    name: "Grace Banda",
    business: "Banda Fashion House",
    industry: "Fashion & Textiles",
    location: "Woodlands, Lusaka",
    rating: 5,
    comment:
      "The platform's design tools helped showcase our chitenge designs beautifully. We now serve customers from Ndola to Livingstone. Customer support in Bemba is excellent!",
    revenue: "ZMW 78,000/month",
    growth: "+250%",
    image: "/placeholder.svg?height=80&width=80&text=GB",
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50",
  },
  {
    id: 3,
    name: "Joseph Phiri",
    business: "Phiri Organic Foods",
    industry: "Food & Beverages",
    location: "Kabulonga, Lusaka",
    rating: 5,
    comment:
      "Linka's cold chain logistics helped us expand our honey and spice business nationwide. The quality assurance program builds trust with customers.",
    revenue: "ZMW 62,000/month",
    growth: "+180%",
    image: "/placeholder.svg?height=80&width=80&text=JP",
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50",
  },
  {
    id: 4,
    name: "Mary Tembo",
    business: "Tembo Home Decor",
    industry: "Home & Decor",
    location: "Roma, Lusaka",
    rating: 5,
    comment:
      "The virtual showroom feature transformed our furniture business. Customers can visualize pieces in their homes before buying. Sales doubled in 6 months!",
    revenue: "ZMW 34,000/month",
    growth: "+200%",
    image: "/placeholder.svg?height=80&width=80&text=MT",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
  },
  {
    id: 5,
    name: "David Mulenga",
    business: "Copper Craft Jewelry",
    industry: "Jewelry & Accessories",
    location: "CBD, Lusaka",
    rating: 5,
    comment:
      "Linka's authentication system helps customers trust our copper jewelry quality. International shipping opened up diaspora markets. Revenue tripled!",
    revenue: "ZMW 29,000/month",
    growth: "+320%",
    image: "/placeholder.svg?height=80&width=80&text=DM",
    gradient: "from-amber-500 to-yellow-600",
    bgGradient: "from-amber-50 to-yellow-50",
  },
  {
    id: 6,
    name: "Sarah Zulu",
    business: "Zulu Agricultural Supplies",
    industry: "Agriculture & Natural",
    location: "Olympia, Lusaka",
    rating: 5,
    comment:
      "The seasonal demand forecasting helps us stock the right seeds and supplies. Farmer education content increased customer loyalty significantly.",
    revenue: "ZMW 41,000/month",
    growth: "+150%",
    image: "/placeholder.svg?height=80&width=80&text=SZ",
    gradient: "from-lime-500 to-green-600",
    bgGradient: "from-lime-50 to-green-50",
  },
]

export function IndustryTestimonials() {
  return (
    <section className="py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-float"></div>
        <div
          className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/4 right-1/4 w-20 h-20 bg-white rounded-full animate-float"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Success Stories from{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Zambian Entrepreneurs
            </span>
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Real businesses, real growth. See how Linka transformed these Zambian enterprises across different
            industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-500 hover:-translate-y-4 hover:scale-105 group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="h-8 w-8 text-yellow-300 opacity-60 group-hover:animate-pulse" />
                </div>

                {/* Industry Badge */}
                <div className="mb-4">
                  <Badge className={`bg-gradient-to-r ${testimonial.gradient} text-white border-0`}>
                    {testimonial.industry}
                  </Badge>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-300 fill-current group-hover:animate-spin"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-lg leading-relaxed mb-6 opacity-90 group-hover:opacity-100 transition-opacity">
                  "{testimonial.comment}"
                </p>

                {/* Revenue & Growth */}
                <div className="flex items-center justify-between mb-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div>
                    <div className="text-sm opacity-70">Monthly Revenue</div>
                    <div className="font-bold text-yellow-300">{testimonial.revenue}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-70">Growth</div>
                    <div className="font-bold text-green-300 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {testimonial.growth}
                    </div>
                  </div>
                </div>

                {/* Business Owner Info */}
                <div className="flex items-center">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full mr-4 border-2 border-white/30 group-hover:scale-110 transition-transform"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-sm opacity-80">{testimonial.business}</p>
                    <p className="text-xs opacity-60">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-8 py-4 text-white border border-white/30 shadow-lg hover:bg-white/30 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <Star className="mr-3 h-6 w-6 group-hover:animate-bounce" />
            <span className="text-lg font-medium">Join 300+ successful retailers across all industries</span>
          </div>
        </div>
      </div>
    </section>
  )
}
