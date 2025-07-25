import { Lightbulb, Target, Rocket, Heart } from "lucide-react"

export function AboutStorySection() {
  return (
    <section className="py-32 relative bg-gradient-to-br from-white to-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Our Story
              </span>
            </h2>

            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Linka was born from a simple observation: Zambia is full of talented entrepreneurs and skilled artisans,
                but many struggled to reach customers beyond their immediate communities. Traditional markets were
                limited by geography, and online selling seemed too complex or expensive.
              </p>

              <p>
                In 2020, our founders—a group of young Zambian tech enthusiasts and business graduates—decided to change
                this. We started Linka with a mission to democratize e-commerce in Zambia, making it accessible to
                everyone from the copper artisan in Kitwe to the chitenge designer in Lusaka.
              </p>

              <p>
                Today, Linka has grown into Zambia's leading marketplace, but our core values remain unchanged:
                <strong className="text-emerald-600"> community first, innovation always, and success for all</strong>.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Lightbulb,
                  title: "Innovation",
                  description: "Leveraging technology to solve local challenges",
                },
                {
                  icon: Target,
                  title: "Purpose",
                  description: "Empowering Zambian entrepreneurs to thrive",
                },
                {
                  icon: Rocket,
                  title: "Growth",
                  description: "Scaling impact across communities",
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg mb-4 mx-auto">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image Placeholder */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-emerald-100 to-green-100 p-8 shadow-2xl shadow-slate-900/10 border border-white/20">
              <div className="w-full h-full bg-gradient-to-br from-emerald-200 to-green-200 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg mb-6 mx-auto">
                    <Heart className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Made in Zambia</h3>
                  <p className="text-slate-600">Built by Zambians, for Zambians</p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl shadow-xl opacity-80"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl shadow-xl opacity-80"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
