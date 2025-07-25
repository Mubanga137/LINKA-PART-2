import { PlayCircle, Download } from "lucide-react"

const guides = [
  {
    type: "video",
    title: "Setting Up Your Linka Store",
    description: "Watch our step-by-step video guide",
    duration: "12 min",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    type: "pdf",
    title: "Zambian E-commerce Best Practices",
    description: "Comprehensive guide for local retailers",
    pages: "24 pages",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    type: "video",
    title: "Mobile Money Integration Tutorial",
    description: "Learn to accept mobile payments",
    duration: "8 min",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    type: "pdf",
    title: "Marketing Calendar for Zambian Businesses",
    description: "Plan your marketing around local events",
    pages: "16 pages",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
]

export function ResourcesGuides() {
  return (
    <section className="py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Video Guides{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              & Downloads
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            In-depth tutorials and downloadable resources to help you succeed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guides.map((guide, index) => (
            <div key={index} className="group cursor-pointer" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl shadow-slate-900/5 border border-white/20 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2">
                {/* Thumbnail */}
                <div className="relative overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                    {/* Play/Download Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {guide.type === "video" ? (
                        <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <PlayCircle className="h-8 w-8 text-blue-600" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Download className="h-8 w-8 text-blue-600" />
                        </div>
                      )}
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                          guide.type === "video"
                            ? "bg-gradient-to-r from-red-500 to-pink-500"
                            : "bg-gradient-to-r from-blue-500 to-indigo-500"
                        }`}
                      >
                        {guide.type === "video" ? "VIDEO" : "PDF"}
                      </span>
                    </div>

                    {/* Duration/Pages */}
                    <div className="absolute bottom-4 right-4">
                      <span className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
                        {guide.type === "video" ? guide.duration : guide.pages}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{guide.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
