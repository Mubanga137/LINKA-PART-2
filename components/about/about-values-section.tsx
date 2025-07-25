import { Shield, Users, Zap, Heart, Globe, Award } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Community First",
    description: "Every decision we make prioritizes the wellbeing and success of our Zambian community",
    gradient: "from-red-500 to-pink-600",
    bgGradient: "from-red-50 to-pink-50",
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "Building lasting relationships through honest communication and reliable service",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Continuously improving our platform with cutting-edge technology and user feedback",
    gradient: "from-yellow-500 to-orange-600",
    bgGradient: "from-yellow-50 to-orange-50",
  },
  {
    icon: Users,
    title: "Inclusivity",
    description: "Creating opportunities for all Zambians, regardless of background or business size",
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-50 to-green-50",
  },
  {
    icon: Globe,
    title: "Cultural Pride",
    description: "Celebrating and promoting Zambian culture, crafts, and entrepreneurial spirit",
    gradient: "from-purple-500 to-violet-600",
    bgGradient: "from-purple-50 to-violet-50",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Striving for the highest quality in everything we do, from products to customer service",
    gradient: "from-teal-500 to-cyan-600",
    bgGradient: "from-teal-50 to-cyan-50",
  },
]

export function AboutValuesSection() {
  return (
    <section className="py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Our Values
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            These core principles guide everything we do and shape the culture we're building at Linka
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="group relative" style={{ animationDelay: `${index * 100}ms` }}>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${value.bgGradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-slate-900/5 border border-white/20 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center shadow-lg mb-6`}
                >
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
