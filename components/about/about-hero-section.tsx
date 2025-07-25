import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Users, Globe, Zap } from "lucide-react"

export function AboutHeroSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-white/60 backdrop-blur-sm px-6 py-3 text-sm text-slate-700 shadow-lg shadow-slate-900/5 border border-white/20 mb-8">
            <Heart className="mr-2 h-4 w-4 text-red-500" />
            Proudly Zambian • Connecting Communities Since 2020
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">About</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Linka</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-4xl mx-auto">
            We're building Zambia's most trusted marketplace, connecting local businesses with customers across the
            country while celebrating our rich culture and entrepreneurial spirit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 text-lg shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5"
            >
              <Users className="mr-3 h-5 w-5" />
              Join Our Mission
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300 px-8 py-4 text-lg bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              Our Story
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: "50K+", label: "Active Users" },
              { icon: Globe, value: "150+", label: "Partner Retailers" },
              { icon: Zap, value: "10K+", label: "Daily Transactions" },
              { icon: Heart, value: "99%", label: "Customer Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg mb-4 mx-auto">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
