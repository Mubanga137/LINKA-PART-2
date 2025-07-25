import { Headphones, BookOpen, Users, Video, MessageCircle, Award } from "lucide-react"

const supportFeatures = [
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description: "Get help anytime with our dedicated Zambian support team",
    features: ["Phone support", "Live chat", "Email assistance", "WhatsApp support"],
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: BookOpen,
    title: "Learning Resources",
    description: "Comprehensive guides and tutorials to help you succeed",
    features: ["Setup guides", "Best practices", "Marketing tips", "Video tutorials"],
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Users,
    title: "Retailer Community",
    description: "Connect with other successful retailers and share experiences",
    features: ["Monthly meetups", "Online forums", "Success stories", "Networking events"],
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Video,
    title: "Training Programs",
    description: "Free training sessions to maximize your success on the platform",
    features: ["Weekly webinars", "One-on-one coaching", "Group workshops", "Certification programs"],
    color: "from-orange-500 to-red-600",
  },
  {
    icon: MessageCircle,
    title: "Account Management",
    description: "Dedicated account managers for high-volume retailers",
    features: ["Personal account manager", "Priority support", "Custom solutions", "Performance reviews"],
    color: "from-teal-500 to-cyan-600",
  },
  {
    icon: Award,
    title: "Success Programs",
    description: "Special programs and incentives for top-performing retailers",
    features: ["Retailer of the month", "Performance bonuses", "Featured listings", "Marketing support"],
    color: "from-amber-500 to-yellow-600",
  },
]

export function RetailersSupportSection() {
  return (
    <section className="py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              We're Here to Help
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From onboarding to scaling, we provide comprehensive support to ensure your success on Linka
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {supportFeatures.map((feature, index) => (
            <div key={index} className="group relative" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-slate-900/5 border border-white/20 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg mb-6`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{feature.description}</p>

                <ul className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-slate-700 text-sm">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full mr-3 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Support Stats */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Support That Works</h3>
            <p className="text-slate-400">Our commitment to retailer success, measured</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "<2min", label: "Average Response Time", icon: MessageCircle },
              { value: "98%", label: "Issue Resolution Rate", icon: Award },
              { value: "24/7", label: "Support Availability", icon: Headphones },
              { value: "4.9/5", label: "Support Satisfaction", icon: Users },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg mb-4 mx-auto">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
