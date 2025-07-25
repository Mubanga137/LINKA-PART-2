import { Button } from "@/components/ui/button"
import { ArrowRight, Store, TrendingUp, Users, Zap, Star } from "lucide-react"

export function RetailersHeroSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center rounded-full bg-white/60 backdrop-blur-sm px-6 py-3 text-sm text-slate-700 shadow-lg shadow-slate-900/5 border border-white/20 mb-8">
              <Star className="mr-2 h-4 w-4 text-yellow-500" />
              Trusted by 150+ successful Zambian retailers
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Grow Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Business
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                with Linka
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Join Zambia's leading e-commerce platform and connect with thousands of customers across the country. Zero
              setup fees, instant payments, and dedicated support to help your business thrive.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 text-lg shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5"
              >
                <Store className="mr-3 h-5 w-5" />
                Start Selling Today
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300 px-8 py-4 text-lg bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                Watch Success Stories
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">0%</div>
                <div className="text-sm text-slate-600">Setup Fees</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">24h</div>
                <div className="text-sm text-slate-600">Quick Approval</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">300%</div>
                <div className="text-sm text-slate-600">Avg. Sales Growth</div>
              </div>
            </div>
          </div>

          {/* Right Content - Success Metrics */}
          <div className="grid grid-cols-2 gap-6">
            {[
              {
                icon: TrendingUp,
                title: "Boost Sales",
                description: "Average 300% increase in revenue",
                value: "300%",
                gradient: "from-emerald-500 to-green-600",
                bgGradient: "from-emerald-50 to-green-50",
              },
              {
                icon: Users,
                title: "Reach Customers",
                description: "Access to 50K+ active shoppers",
                value: "50K+",
                gradient: "from-blue-500 to-indigo-600",
                bgGradient: "from-blue-50 to-indigo-50",
              },
              {
                icon: Zap,
                title: "Fast Payments",
                description: "Get paid within 24 hours",
                value: "24h",
                gradient: "from-orange-500 to-red-600",
                bgGradient: "from-orange-50 to-red-50",
              },
              {
                icon: Store,
                title: "Easy Setup",
                description: "Start selling in minutes",
                value: "5min",
                gradient: "from-purple-500 to-pink-600",
                bgGradient: "from-purple-50 to-pink-50",
              },
            ].map((metric, index) => (
              <div key={index} className="group relative" style={{ animationDelay: `${index * 100}ms` }}>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${metric.bgGradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-slate-900/5 border border-white/20 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${metric.gradient} rounded-xl flex items-center justify-center shadow-lg mb-4`}
                  >
                    <metric.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-2">{metric.value}</div>
                  <h3 className="font-bold text-slate-900 mb-2">{metric.title}</h3>
                  <p className="text-sm text-slate-600">{metric.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
