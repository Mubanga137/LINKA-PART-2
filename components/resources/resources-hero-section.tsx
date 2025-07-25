import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Video, FileText, HelpCircle } from "lucide-react"

export function ResourcesHeroSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Knowledge
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Center</span>
          </h1>

          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Everything you need to succeed on Linka. From getting started guides to advanced selling strategies, find
            answers to all your questions.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-slate-400" />
              <Input
                placeholder="Search for guides, tutorials, FAQs..."
                className="pl-14 pr-4 py-4 text-lg bg-white/80 backdrop-blur-sm border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 shadow-lg rounded-2xl"
              />
              <Button
                size="lg"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Getting Started",
                description: "New to Linka?",
                gradient: "from-emerald-500 to-green-600",
                bgGradient: "from-emerald-50 to-green-50",
              },
              {
                icon: Video,
                title: "Video Tutorials",
                description: "Watch & learn",
                gradient: "from-blue-500 to-indigo-600",
                bgGradient: "from-blue-50 to-indigo-50",
              },
              {
                icon: FileText,
                title: "Guides & Tips",
                description: "Best practices",
                gradient: "from-purple-500 to-pink-600",
                bgGradient: "from-purple-50 to-pink-50",
              },
              {
                icon: HelpCircle,
                title: "FAQ",
                description: "Quick answers",
                gradient: "from-orange-500 to-red-600",
                bgGradient: "from-orange-50 to-red-50",
              },
            ].map((item, index) => (
              <div key={index} className="group relative cursor-pointer" style={{ animationDelay: `${index * 100}ms` }}>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-slate-900/5 border border-white/20 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center shadow-lg mb-4 mx-auto`}
                  >
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-center">{item.title}</h3>
                  <p className="text-sm text-slate-600 text-center">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
