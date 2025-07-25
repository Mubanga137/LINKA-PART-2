import { Calendar, Rocket, Users, Award, Globe, Zap } from "lucide-react"

const timelineEvents = [
  {
    year: "2020",
    title: "The Beginning",
    description: "Linka was founded by a team of young Zambian entrepreneurs with a vision to democratize e-commerce",
    icon: Rocket,
    color: "from-emerald-500 to-green-600",
  },
  {
    year: "2021",
    title: "First 100 Retailers",
    description: "Reached our first milestone of 100 partner retailers across Lusaka and Copperbelt",
    icon: Users,
    color: "from-blue-500 to-indigo-600",
  },
  {
    year: "2022",
    title: "Mobile App Launch",
    description: "Launched our mobile app, making shopping even more accessible to Zambian customers",
    icon: Zap,
    color: "from-orange-500 to-red-600",
  },
  {
    year: "2023",
    title: "National Expansion",
    description: "Expanded operations to all 10 provinces, connecting rural and urban markets",
    icon: Globe,
    color: "from-purple-500 to-pink-600",
  },
  {
    year: "2024",
    title: "Industry Recognition",
    description: "Won 'Best E-commerce Platform' at the Zambia Digital Awards",
    icon: Award,
    color: "from-teal-500 to-cyan-600",
  },
]

export function AboutTimelineSection() {
  return (
    <section className="py-32 relative bg-gradient-to-br from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Our Journey
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From a small startup to Zambia's leading marketplace—here are the key milestones in our story
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-200 via-blue-200 via-orange-200 via-purple-200 to-teal-200 rounded-full"></div>

          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-slate-900/5 border border-white/20 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2">
                    <div className="flex items-center mb-4">
                      <Calendar className="h-5 w-5 text-slate-500 mr-2" />
                      <span className="text-lg font-bold text-slate-900">{event.year}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{event.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{event.description}</p>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${event.color} rounded-2xl flex items-center justify-center shadow-xl border-4 border-white`}
                  >
                    <event.icon className="h-8 w-8 text-white" />
                  </div>
                </div>

                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
