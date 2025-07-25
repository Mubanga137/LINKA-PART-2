"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Mwanza",
    role: "Homeowner",
    location: "Kabulonga, Lusaka",
    rating: 5,
    comment:
      "Linka transformed our living room completely! The furniture quality is excellent and the delivery was so fast. Paid with mobile money - so convenient!",
    service: "Interior Design",
    amount: "ZMW 8,500",
    image: "/placeholder.svg?height=80&width=80&text=SM",
  },
  {
    id: 2,
    name: "James Banda",
    role: "Business Owner",
    location: "CBD, Lusaka",
    rating: 5,
    comment:
      "Renovated our office space through Linka. Professional service, quality materials, and completed on time. Highly recommend for commercial projects.",
    service: "Office Renovation",
    amount: "ZMW 15,000",
    image: "/placeholder.svg?height=80&width=80&text=JB",
  },
  {
    id: 3,
    name: "Grace Phiri",
    role: "Interior Designer",
    location: "Woodlands, Lusaka",
    rating: 5,
    comment:
      "As a designer, I appreciate Linka's quality standards. Their smart home solutions are cutting-edge and installation team is very professional.",
    service: "Smart Home Setup",
    amount: "ZMW 12,000",
    image: "/placeholder.svg?height=80&width=80&text=GP",
  },
]

export function HomeDecorTestimonials() {
  return (
    <section className="py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
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
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Real stories from satisfied customers across Zambia who transformed their spaces with Linka
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-500 hover:-translate-y-2 hover:scale-105"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="h-8 w-8 text-yellow-300 opacity-60" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-300 fill-current" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-lg leading-relaxed mb-6 opacity-90">"{testimonial.comment}"</p>

                {/* Service & Amount */}
                <div className="flex items-center justify-between mb-6">
                  <Badge className="bg-white/20 text-white border-white/30">{testimonial.service}</Badge>
                  <span className="font-bold text-yellow-300">{testimonial.amount}</span>
                </div>

                {/* Customer Info */}
                <div className="flex items-center">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-white/30"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm opacity-70">{testimonial.role}</p>
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
            <Star className="mr-3 h-6 w-6 group-hover:animate-spin" />
            <span className="text-lg font-medium">Join 500+ satisfied customers</span>
          </div>
        </div>
      </div>
    </section>
  )
}
