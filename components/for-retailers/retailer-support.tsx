import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Headphones,
  MessageSquare,
  BookOpen,
  Users,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  Video,
  FileText,
  GraduationCap,
  Zap,
  Star,
  Globe,
} from "lucide-react"

const supportChannels = [
  {
    icon: Phone,
    title: "24/7 Phone Support",
    description: "Direct phone line to our Zambian support team",
    availability: "24/7",
    response: "Instant",
    gradient: "from-blue-500 to-indigo-600",
    features: ["Local Zambian team", "English & local languages", "Toll-free number"],
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Support",
    description: "Get help through WhatsApp - the way Zambians communicate",
    availability: "24/7",
    response: "< 5 minutes",
    gradient: "from-green-500 to-emerald-600",
    features: ["Voice messages", "Screen sharing", "File sharing"],
  },
  {
    icon: Video,
    title: "Video Training",
    description: "One-on-one video sessions to get you started",
    availability: "Business hours",
    response: "Same day",
    gradient: "from-purple-500 to-pink-600",
    features: ["Screen sharing", "Personalized training", "Recording available"],
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Detailed support for complex technical questions",
    availability: "24/7",
    response: "< 2 hours",
    gradient: "from-orange-500 to-red-600",
    features: ["Detailed responses", "File attachments", "Priority queue"],
  },
]

const resources = [
  {
    icon: BookOpen,
    title: "Knowledge Base",
    description: "Comprehensive guides and tutorials",
    items: "200+ articles",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Step-by-step video guides",
    items: "50+ videos",
  },
  {
    icon: Users,
    title: "Community Forum",
    description: "Connect with other retailers",
    items: "1,200+ members",
  },
  {
    icon: FileText,
    title: "Best Practices",
    description: "Industry insights and tips",
    items: "Updated weekly",
  },
]

const trainingPrograms = [
  {
    title: "Onboarding Bootcamp",
    duration: "2 hours",
    type: "Live Session",
    description: "Complete setup and first sales in one session",
    included: ["Platform overview", "Product setup", "Payment configuration", "First sale walkthrough"],
  },
  {
    title: "Advanced Seller Training",
    duration: "4 hours",
    type: "Workshop",
    description: "Advanced strategies for experienced retailers",
    included: ["Analytics deep-dive", "Marketing automation", "Inventory optimization", "Growth strategies"],
  },
  {
    title: "Monthly Success Webinars",
    duration: "1 hour",
    type: "Webinar",
    description: "Latest features and success stories",
    included: ["New features", "Success stories", "Q&A session", "Industry insights"],
  },
]

const supportStats = [
  {
    icon: Star,
    label: "Support Rating",
    value: "4.9/5",
    description: "Customer satisfaction",
  },
  {
    icon: Clock,
    label: "Avg Response Time",
    value: "< 3 min",
    description: "Across all channels",
  },
  {
    icon: Users,
    label: "Success Rate",
    value: "98%",
    description: "Issues resolved",
  },
  {
    icon: Globe,
    label: "Languages Supported",
    value: "7",
    description: "Local languages",
  },
]

export function RetailerSupport() {
  return (
    <section className="py-24 bg-gradient-to-br from-white via-blue-50 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm px-6 py-3 text-blue-700 border border-blue-200/50 mb-6">
            <Headphones className="mr-2 h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium">Dedicated Support</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              We're Here to Help
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Every Step of the Way
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Get world-class support from our local Zambian team. We understand your business, 
            your market, and your language.
          </p>
        </div>

        {/* Support Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {supportStats.map((stat, index) => (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-600 mb-1">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Support Channels */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Multiple Ways to Get Help
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {supportChannels.map((channel, index) => (
              <Card
                key={index}
                className="group bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${channel.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <channel.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="mb-2">
                        {channel.availability}
                      </Badge>
                      <div className="text-sm text-slate-600">
                        Response: {channel.response}
                      </div>
                    </div>
                  </div>

                  <h4 className="text-2xl font-bold text-slate-900 mb-3">{channel.title}</h4>
                  <p className="text-slate-600 mb-6 leading-relaxed">{channel.description}</p>

                  <div className="space-y-3">
                    {channel.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Training Programs */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Free Training Programs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainingPrograms.map((program, index) => (
              <Card
                key={index}
                className="bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      {program.type}
                    </Badge>
                    <div className="flex items-center text-slate-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{program.duration}</span>
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 mb-3">{program.title}</h4>
                  <p className="text-slate-600 mb-6">{program.description}</p>

                  <div className="space-y-2 mb-6">
                    <div className="text-sm font-medium text-slate-700 mb-3">What's included:</div>
                    {program.included.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        <span className="text-slate-600 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Self-Help Resources */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Self-Help Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <resource.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{resource.title}</h4>
                  <p className="text-slate-600 text-sm mb-3">{resource.description}</p>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                    {resource.items}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white overflow-hidden">
          <CardContent className="p-12 text-center relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-6">Need Help Right Now?</h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Our support team is standing by to help you succeed. Don't let questions hold you back.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
                >
                  <MessageSquare className="mr-3 h-5 w-5" />
                  Start WhatsApp Chat
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg bg-white/5 backdrop-blur-sm"
                >
                  <Phone className="mr-3 h-5 w-5" />
                  Call Support Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
