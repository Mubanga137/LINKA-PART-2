import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  UserPlus,
  FileText,
  CheckCircle,
  Rocket,
  Clock,
  Star,
  ArrowRight,
  Smartphone,
  CreditCard,
  Store,
} from "lucide-react"

const onboardingSteps = [
  {
    step: 1,
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your account with basic business information",
    duration: "2 minutes",
    requirements: ["Business name", "Contact details", "Category selection"],
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    icon: FileText,
    title: "Business Verification",
    description: "Upload business documents for quick verification",
    duration: "5 minutes",
    requirements: ["Business license", "Tax certificate", "ID document"],
    gradient: "from-purple-500 to-pink-600",
  },
  {
    step: 3,
    icon: Store,
    title: "Setup Store",
    description: "Add your products and customize your store",
    duration: "15 minutes",
    requirements: ["Product photos", "Descriptions", "Pricing"],
    gradient: "from-emerald-500 to-green-600",
  },
  {
    step: 4,
    icon: Rocket,
    title: "Go Live",
    description: "Start selling to customers across Zambia",
    duration: "Instant",
    requirements: ["Review settings", "Payment setup", "Launch store"],
    gradient: "from-orange-500 to-red-600",
  },
]

const supportFeatures = [
  {
    icon: Smartphone,
    title: "Mobile Setup",
    description: "Complete entire onboarding process on your phone",
  },
  {
    icon: CreditCard,
    title: "Payment Integration",
    description: "Instant setup with mobile money and bank accounts",
  },
  {
    icon: Star,
    title: "Personal Onboarding",
    description: "Dedicated support specialist for guidance",
  },
]

export function RetailerOnboarding() {
  return (
    <section className="py-24 bg-gradient-to-br from-white via-blue-50 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm px-6 py-3 text-blue-700 border border-blue-200/50 mb-6">
            <Rocket className="mr-2 h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium">Getting Started</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              From Signup to
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              First Sale in 15 Minutes
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our streamlined onboarding process gets you selling quickly. 
            No complex setup - just simple steps to success.
          </p>
        </div>

        {/* Onboarding Steps */}
        <div className="relative mb-20">
          {/* Progress Line */}
          <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 via-emerald-200 to-orange-200 rounded-full hidden lg:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {onboardingSteps.map((step, index) => (
              <Card
                key={index}
                className="relative bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
              >
                <CardContent className="p-8 text-center">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <step.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">{step.description}</p>
                  
                  {/* Duration */}
                  <div className="flex items-center justify-center mb-6">
                    <Clock className="h-4 w-4 text-slate-500 mr-2" />
                    <span className="text-sm text-slate-500 font-medium">{step.duration}</span>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-2">
                    {step.requirements.map((requirement, reqIndex) => (
                      <div key={reqIndex} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-slate-600">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Support Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {supportFeatures.map((feature, index) => (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white overflow-hidden">
          <CardContent className="p-12 text-center relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Rocket className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-6">Ready to Get Started?</h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of successful Zambian retailers. Setup is free, fast, and our team is here to help every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
                >
                  <UserPlus className="mr-3 h-5 w-5" />
                  Start Free Setup Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg bg-white/5 backdrop-blur-sm"
                >
                  Schedule Demo Call
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center space-x-8 text-blue-100">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>24hr approval</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Instant support</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
