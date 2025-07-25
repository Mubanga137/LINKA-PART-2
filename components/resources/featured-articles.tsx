import { Clock, User, ArrowRight } from "lucide-react"

const articles = [
  {
    title: "How to Set Up Your First Linka Store",
    excerpt: "A complete step-by-step guide to getting your business online and making your first sale on Linka.",
    author: "Linka Team",
    readTime: "5 min read",
    category: "Getting Started",
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
  },
  {
    title: "Marketing Your Products to Zambian Customers",
    excerpt: "Learn effective strategies to reach and engage with local customers in Lusaka and across Zambia.",
    author: "Grace Mulenga",
    readTime: "8 min read",
    category: "Marketing",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Understanding Mobile Money Payments",
    excerpt: "Everything you need to know about accepting MTN Mobile Money and Airtel Money payments.",
    author: "Joseph Banda",
    readTime: "6 min read",
    category: "Payments",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Seasonal Selling Tips for Zambian Retailers",
    excerpt: "Maximize your sales during peak seasons and holidays with these proven strategies.",
    author: "Mary Phiri",
    readTime: "7 min read",
    category: "Business Growth",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function FeaturedArticles() {
  return (
    <section className="py-32 relative bg-gradient-to-br from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Featured{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Articles</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our most popular and helpful resources for Zambian retailers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className={`group cursor-pointer ${article.featured ? "lg:col-span-2" : ""}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl shadow-slate-900/5 border border-white/20 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-2">
                <div className={`grid ${article.featured ? "lg:grid-cols-2" : "grid-cols-1"} gap-0`}>
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <div
                      className={`${article.featured ? "aspect-[4/3]" : "aspect-[3/2]"} bg-gradient-to-br from-slate-200 to-slate-300 relative`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                          {article.category}
                        </span>
                      </div>
                      {article.featured && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-8 ${article.featured ? "lg:p-12" : ""}`}>
                    <h3
                      className={`font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors ${
                        article.featured ? "text-2xl lg:text-3xl" : "text-xl"
                      }`}
                    >
                      {article.title}
                    </h3>
                    <p className={`text-slate-600 mb-6 leading-relaxed ${article.featured ? "text-lg" : ""}`}>
                      {article.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {article.author}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {article.readTime}
                        </div>
                      </div>
                      <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
