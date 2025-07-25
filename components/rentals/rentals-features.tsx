import {
  Smartphone,
  Shield,
  Headphones,
  Heart,
  Users,
  Clock,
  CheckCircle,
  Globe,
  MessageSquare,
  Award,
  Zap,
} from "lucide-react"

const features = [
  {
    icon: Smartphone,
    title: "Mobile Money Integration",
    description: "Pay instantly with MTN Mobile Money, Airtel Money, or bank transfer",
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-50 to-green-50",
    benefits: [
      "Instant payment processing",
      "No credit card required",
      "Secure mobile transactions",
      "Local payment methods",
    ],
  },
  {
    icon: Shield,
    title: "Verified Hosts & Properties",
    description: "All hosts are verified with ID and property documentation",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
    benefits: ["ID verification required", "Property documentation", "Background checks", "Insurance coverage"],
  },
  {
    icon: Headphones,
    title: "24/7 Local Support",
    description: "Get help anytime in English, Bemba, Nyanja, or Tonga",
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 to-red-50",
    benefits: ["Multi-language support", "Local customer service", "Emergency assistance", "Instant chat support"],
  },
  {
    icon: Heart,
    title: "Trust & Safety",
    description: "Comprehensive safety measures and guest protection",
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50",
    benefits: ["Guest protection program", "Secure messaging", "Review system", "Safety guidelines"],
  },
]

const platformStats = [
  { icon: Users, number: "15,000+", label: "Happy Guests", color: "text-emerald-600" },
  { icon: CheckCircle, number: "98.5%", label: "Success Rate", color: "text-blue-600" },
  { icon: Clock, number: "< 2 min", label: "Avg Response", color: "text-orange-600" },
  { icon: Award, number: "4.8/5", label: "Platform Rating", color: "text-purple-600" },
]

export function RentalsFeatures() {
  return (
    <section className="py-16 sm:py-20 lg:py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-emerald-400/10 to-green-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-orange-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Why Choose
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Linka Rentals?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Experience the best of Zambian hospitality with our trusted platform designed for local travelers
          </p>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {features.map((feature, index) => (
            <div key={index} className="group relative" style={{ animationDelay: `${index * 100}ms` }}>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/5 border border-white/20 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">{feature.description}</p>

                <ul className="space-y-3">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-slate-700 text-sm sm:text-base">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 mr-3 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Platform Stats */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-emerald-600/20 to-green-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-orange-600/20 to-pink-600/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Trusted by Thousands
                </span>
              </h3>
              <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Join the growing community of travelers who choose Linka for their Zambian adventures
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {platformStats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                    <stat.icon className={`h-8 w-8 sm:h-10 sm:w-10 ${stat.color}`} />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Additional Features */}
            <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                { icon: Globe, title: "Multi-Language", desc: "English, Bemba, Nyanja, Tonga" },
                { icon: MessageSquare, title: "Instant Chat", desc: "Real-time messaging with hosts" },
                { icon: Zap, title: "Quick Booking", desc: "Book in under 2 minutes" },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                    <item.icon className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-bold text-white mb-1 text-sm sm:text-base">{item.title}</div>
                    <div className="text-xs sm:text-sm text-slate-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
