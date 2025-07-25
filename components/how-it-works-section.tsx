import { Package, Truck, Users } from "lucide-react"

const steps = [
  {
    icon: Package,
    title: "Local Products",
    description: "Discover unique items from businesses in your community",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick local delivery from nearby retailers",
    gradient: "from-orange-500 to-pink-600",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Support local businesses and strengthen your community",
    gradient: "from-green-500 to-emerald-600",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-br from-orange-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-8">
                <div
                  className={`mx-auto w-24 h-24 bg-gradient-to-br ${step.gradient} rounded-3xl flex items-center justify-center shadow-xl shadow-slate-900/10 group-hover:shadow-2xl group-hover:shadow-slate-900/20 transition-all duration-500 group-hover:-translate-y-2`}
                >
                  <step.icon className="h-12 w-12 text-white" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-slate-300 to-transparent"></div>
                )}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
              <p className="text-slate-600 text-lg leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">How </span>
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Linka</span>
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"> Works</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Shopping locally has never been easier. Follow these simple steps to discover and support businesses in your
            community.
          </p>
        </div>
      </div>
    </section>
  )
}
