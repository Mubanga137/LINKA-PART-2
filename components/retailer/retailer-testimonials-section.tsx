import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Mwamba Chanda",
    business: "Traditional Crafts Co.",
    location: "Lusaka Central",
    rating: 5,
    text: "Linka transformed my small craft business. I now reach customers across Lusaka and my sales have tripled in just 6 months!",
    revenue: "300% increase in sales",
  },
  {
    name: "Grace Mulenga",
    business: "Chitenge Fashion House",
    location: "Chilenje",
    rating: 5,
    text: "The platform is so easy to use. I can manage my inventory, track orders, and get paid instantly. Best decision for my business!",
    revenue: "ZMW 15,000 monthly",
  },
  {
    name: "Joseph Banda",
    business: "Copper Art Gallery",
    location: "Woodlands",
    rating: 5,
    text: "Customer support is excellent and the delivery network is reliable. My customers are always happy with their orders.",
    revenue: "200+ happy customers",
  },
]

export function RetailerTestimonialsSection() {
  return (
    <section className="py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-green-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-br from-orange-400/10 to-amber-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Success </span>
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Stories
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Hear from successful Zambian retailers who are growing their businesses with Linka
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group relative" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-slate-900/5 border border-white/20 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2">
                {/* Quote Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg mb-6">
                  <Quote className="h-6 w-6 text-white" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-slate-700 mb-6 leading-relaxed font-bold">"{testimonial.text}"</p>

                {/* Revenue Highlight */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 mb-6 border border-emerald-200/50">
                  <div className="text-emerald-700 font-bold text-lg">{testimonial.revenue}</div>
                </div>

                {/* Author Info */}
                <div className="border-t border-slate-200 pt-6">
                  <div className="font-bold text-slate-900">{testimonial.name}</div>
                  <div className="text-emerald-600 font-medium">{testimonial.business}</div>
                  <div className="text-slate-500 text-sm">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
