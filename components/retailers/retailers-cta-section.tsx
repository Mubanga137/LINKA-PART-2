import { Button } from "@/components/ui/button"
import { ArrowRight, Store, Phone, Mail } from "lucide-react"

export function RetailersCtaSection() {
  return (
    <section className="py-32 relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-600/10 to-green-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-600/10 to-amber-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Ready to Transform
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Your Business?
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
            Join thousands of successful Zambian retailers who are growing their businesses with Linka. Start your
            journey today—it's free, fast, and designed for your success.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-12 py-6 text-xl shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5"
            >
              <Store className="mr-3 h-6 w-6" />
              Start Selling Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/30 px-12 py-6 text-xl bg-white/5 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              Schedule a Demo
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Quick Start */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 shadow-2xl shadow-slate-900/20 border border-white/10">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Quick Start Guide
            </h3>

            <div className="space-y-4 mb-8">
              {[
                "Sign up with your business details",
                "Upload required documents",
                "Add your first products",
                "Start receiving orders immediately",
              ].map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg mr-4 flex-shrink-0">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-slate-300">{step}</span>
                </div>
              ))}
            </div>

            <div className="bg-emerald-500/10 rounded-2xl p-6 border border-emerald-500/20">
              <div className="text-emerald-400 font-bold text-lg mb-2">Zero Risk, Maximum Reward</div>
              <div className="text-slate-300 text-sm">
                No setup fees, no monthly charges. You only pay a small commission when you make a sale.
              </div>
            </div>
          </div>

          {/* Right: Contact Options */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 shadow-2xl shadow-slate-900/20 border border-white/10">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Need Help Getting Started?
            </h3>

            <div className="space-y-6 mb-8">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mr-4">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">Call Us</div>
                  <div className="text-slate-400 text-sm">+260 97 123-4567</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg mr-4">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">Email Us</div>
                  <div className="text-slate-400 text-sm">retailers@linka.zm</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 rounded-2xl p-6 border border-blue-500/20">
              <div className="text-blue-400 font-bold text-lg mb-2">Free Consultation Available</div>
              <div className="text-slate-300 text-sm">
                Book a free 30-minute consultation with our retail success team to discuss your business goals.
              </div>
            </div>
          </div>
        </div>

        {/* Final Stats */}
        <div className="text-center mt-16">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { value: "150+", label: "Active Retailers" },
              { value: "ZMW 2M+", label: "Revenue Generated" },
              { value: "24h", label: "Average Approval Time" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
