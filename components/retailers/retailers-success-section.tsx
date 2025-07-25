import { Star, TrendingUp, Users, Award } from "lucide-react"

const successStories = [
  {
    name: "Mwamba Chanda",
    business: "Traditional Crafts Co.",
    location: "Lusaka Central",
    image: "/placeholder.svg?height=300&width=300",
    rating: 5,
    beforeSales: "ZMW 2,000/month",
    afterSales: "ZMW 8,000/month",
    growth: "300%",
    testimonial:
      "Linka transformed my small craft business. I now reach customers across Lusaka and beyond. My monthly sales have quadrupled!",
    joinedDate: "January 2023",
  },
  {
    name: "Grace Mulenga",
    business: "Chitenge Fashion House",
    location: "Chilenje",
    image: "/placeholder.svg?height=300&width=300",
    rating: 5,
    beforeSales: "ZMW 3,500/month",
    afterSales: "ZMW 15,000/month",
    growth: "328%",
    testimonial:
      "The platform is incredibly user-friendly. Managing inventory and tracking orders is so simple. My customers love the fast delivery!",
    joinedDate: "March 2023",
  },
  {
    name: "Joseph Banda",
    business: "Copper Art Gallery",
    location: "Woodlands",
    image: "/placeholder.svg?height=300&width=300",
    rating: 5,
    beforeSales: "ZMW 1,800/month",
    afterSales: "ZMW 7,200/month",
    growth: "300%",
    testimonial:
      "Customer support is excellent and the payment system is reliable. I get paid instantly after each sale through mobile money.",
    joinedDate: "June 2023",
  },
]

export function RetailersSuccessSection() {
  return (
    <section className="py-32 relative bg-gradient-to-br from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Real Zambian entrepreneurs sharing their journey to success with Linka
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {successStories.map((story, index) => (
            <div key={index} className="group relative" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-slate-900/5 border border-white/20 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2">
                {/* Profile Image */}
                <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden shadow-lg mb-6">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Rating */}
                <div className="flex justify-center items-center mb-4">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Growth Metrics */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 mb-6 border border-emerald-200/50">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-1">{story.growth}</div>
                    <div className="text-sm text-emerald-700 font-medium">Sales Growth</div>
                    <div className="text-xs text-slate-600 mt-2">
                      {story.beforeSales} → {story.afterSales}
                    </div>
                  </div>
                </div>

                {/* Testimonial */}
                <p className="text-slate-700 mb-6 leading-relaxed italic text-center">"{story.testimonial}"</p>

                {/* Author Info */}
                <div className="text-center border-t border-slate-200 pt-6">
                  <div className="font-bold text-slate-900">{story.name}</div>
                  <div className="text-emerald-600 font-medium">{story.business}</div>
                  <div className="text-slate-500 text-sm">{story.location}</div>
                  <div className="text-xs text-slate-400 mt-2">Joined {story.joinedDate}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Success Metrics */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Retailer Success Metrics</h3>
            <p className="text-slate-400">Average results across all our retail partners</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                value: "300%",
                label: "Average Sales Growth",
                color: "from-emerald-400 to-green-500",
              },
              { icon: Users, value: "5x", label: "Customer Reach Increase", color: "from-blue-400 to-indigo-500" },
              { icon: Award, value: "24h", label: "Average Setup Time", color: "from-orange-400 to-red-500" },
              { icon: Star, value: "4.9/5", label: "Retailer Satisfaction", color: "from-yellow-400 to-amber-500" },
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center shadow-lg mb-4 mx-auto`}
                >
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2">{metric.value}</div>
                <div className="text-slate-400 text-sm">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
