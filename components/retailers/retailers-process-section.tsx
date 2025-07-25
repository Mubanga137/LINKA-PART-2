import { Button } from "@/components/ui/button"
import { ArrowRight, UserPlus, Upload, Settings, Rocket } from "lucide-react"

const processSteps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your retailer account and submit required documents",
    details: [
      "Fill out the registration form",
      "Upload business documents",
      "Verify your identity",
      "Set up payment method",
    ],
    timeframe: "5 minutes",
  },
  {
    step: "02",
    icon: Settings,
    title: "Account Review",
    description: "Our team reviews your application and verifies documents",
    details: ["Document verification", "Business validation", "Background checks", "Account approval"],
    timeframe: "24-48 hours",
  },
  {
    step: "03",
    icon: Upload,
    title: "Add Products",
    description: "Upload your products with photos, descriptions, and pricing",
    details: [
      "Product photography tips",
      "Write compelling descriptions",
      "Set competitive pricing",
      "Organize into categories",
    ],
    timeframe: "30 minutes",
  },
  {
    step: "04",
    icon: Rocket,
    title: "Start Selling",
    description: "Your store goes live and you can start receiving orders",
    details: [
      "Store goes live instantly",
      "Receive order notifications",
      "Process and fulfill orders",
      "Get paid automatically",
    ],
    timeframe: "Immediate",
  },
]

export function RetailersProcessSection() {
  return (
    <section className="py-32 relative bg-gradient-to-br from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              How to Get Started
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Follow these simple steps to join Linka and start growing your business online
          </p>
        </div>

        <div className="relative">
          {/* Process Flow Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-200 via-blue-200 via-orange-200 to-green-200 transform -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-slate-900/5 border border-white/20 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2">
                  {/* Step Number */}
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-emerald-600 mb-2">{step.step}</div>
                    <div className="text-sm text-slate-500 bg-slate-100 rounded-full px-3 py-1 inline-block">
                      {step.timeframe}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">{step.description}</p>
                  </div>

                  {/* Step Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-slate-700 text-sm">
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full mr-3 flex-shrink-0"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow (hidden on last item) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border border-slate-200">
                      <ArrowRight className="h-4 w-4 text-emerald-600" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl p-8 border border-emerald-200/50 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Start Your Journey?</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Join hundreds of successful Zambian retailers who are growing their businesses with Linka. The process is
              simple, fast, and completely free to get started.
            </p>
            <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
              Start Your Application
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
