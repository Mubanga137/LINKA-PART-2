"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  Brain, 
  Apple, 
  Activity, 
  Shield, 
  Sun,
  Droplets,
  Moon,
  Clock,
  BookOpen,
  TrendingUp,
  ArrowRight
} from "lucide-react"

interface HealthTip {
  id: string
  title: string
  category: string
  excerpt: string
  content: string
  icon: any
  color: string
  readTime: string
  author: string
  publishDate: string
  tags: string[]
  trending: boolean
}

const healthTips: HealthTip[] = [
  {
    id: "tip-1",
    title: "10 Simple Ways to Boost Your Immune System",
    category: "Wellness",
    excerpt: "Discover natural methods to strengthen your body's defense mechanisms and stay healthy year-round.",
    content: `Your immune system is your body's natural defense against illness. Here are 10 evidence-based ways to boost it:

1. **Get Adequate Sleep**: Aim for 7-9 hours of quality sleep each night. During sleep, your body produces infection-fighting cells and antibodies.

2. **Eat a Balanced Diet**: Include plenty of fruits, vegetables, lean proteins, and whole grains. Foods rich in vitamin C, vitamin D, zinc, and antioxidants are particularly beneficial.

3. **Exercise Regularly**: Moderate exercise for 30 minutes most days can boost your immune system. Activities like walking, swimming, or cycling are excellent choices.

4. **Manage Stress**: Chronic stress weakens your immune system. Practice relaxation techniques like meditation, deep breathing, or yoga.

5. **Stay Hydrated**: Drink plenty of water to help your body function optimally and flush out toxins.

6. **Maintain Good Hygiene**: Wash your hands frequently, especially before eating and after being in public places.

7. **Get Vaccinated**: Stay up-to-date with recommended vaccines to protect against preventable diseases.

8. **Avoid Smoking and Limit Alcohol**: These substances can weaken your immune response and make you more susceptible to infections.

9. **Spend Time in Sunlight**: Vitamin D from sunlight exposure supports immune function. Aim for 10-15 minutes daily.

10. **Consider Probiotics**: Healthy gut bacteria support immune function. Include yogurt, kefir, or probiotic supplements in your diet.

Remember, consistency is key. Small daily habits can lead to significant improvements in your overall health and immunity.`,
    icon: Shield,
    color: "from-green-500 to-emerald-600",
    readTime: "5 min read",
    author: "Dr. Sarah Banda",
    publishDate: "2024-01-15",
    tags: ["Immunity", "Prevention", "Natural Health"],
    trending: true
  },
  {
    id: "tip-2", 
    title: "Mental Health: Managing Stress in Daily Life",
    category: "Mental Health",
    excerpt: "Learn effective strategies to cope with stress and maintain good mental health in our busy world.",
    content: "Stress is a normal part of life, but chronic stress can impact your health. Here's how to manage it...",
    icon: Brain,
    color: "from-purple-500 to-pink-600",
    readTime: "7 min read",
    author: "Dr. John Mwanza",
    publishDate: "2024-01-12",
    tags: ["Stress Management", "Mental Health", "Wellness"],
    trending: true
  },
  {
    id: "tip-3",
    title: "Nutrition Basics: Eating for Optimal Health",
    category: "Nutrition",
    excerpt: "Understand the fundamentals of good nutrition and how to make healthier food choices every day.",
    content: "Good nutrition is the foundation of good health. Learn about essential nutrients and meal planning...",
    icon: Apple,
    color: "from-red-500 to-orange-600",
    readTime: "6 min read",
    author: "Nutritionist Mary Phiri",
    publishDate: "2024-01-10",
    tags: ["Nutrition", "Diet", "Healthy Eating"],
    trending: false
  },
  {
    id: "tip-4",
    title: "Exercise at Home: No Gym Required",
    category: "Fitness",
    excerpt: "Effective workout routines you can do from the comfort of your home with minimal equipment.",
    content: "You don't need a gym membership to stay fit. Here are effective exercises you can do at home...",
    icon: Activity,
    color: "from-blue-500 to-cyan-600",
    readTime: "8 min read",
    author: "Fitness Coach James Tembo",
    publishDate: "2024-01-08",
    tags: ["Home Workout", "Fitness", "Exercise"],
    trending: false
  },
  {
    id: "tip-5",
    title: "The Importance of Quality Sleep",
    category: "Sleep Health",
    excerpt: "Why good sleep is crucial for your health and practical tips to improve your sleep quality.",
    content: "Sleep is when your body repairs and rejuvenates. Learn how to optimize your sleep for better health...",
    icon: Moon,
    color: "from-indigo-500 to-purple-600",
    readTime: "5 min read",
    author: "Sleep Specialist Dr. Grace Kunda",
    publishDate: "2024-01-05",
    tags: ["Sleep", "Recovery", "Health"],
    trending: false
  },
  {
    id: "tip-6",
    title: "Staying Hydrated: More Than Just Water",
    category: "Wellness",
    excerpt: "Understanding proper hydration and creative ways to meet your daily fluid needs.",
    content: "Proper hydration is essential for every bodily function. Here's how to stay properly hydrated...",
    icon: Droplets,
    color: "from-cyan-500 to-blue-600",
    readTime: "4 min read",
    author: "Wellness Expert Moses Banda",
    publishDate: "2024-01-03",
    tags: ["Hydration", "Health", "Wellness"],
    trending: false
  }
]

const categories = [
  { name: "All", color: "bg-slate-100 text-slate-800" },
  { name: "Wellness", color: "bg-green-100 text-green-800" },
  { name: "Mental Health", color: "bg-purple-100 text-purple-800" },
  { name: "Nutrition", color: "bg-red-100 text-red-800" },
  { name: "Fitness", color: "bg-blue-100 text-blue-800" },
  { name: "Sleep Health", color: "bg-indigo-100 text-indigo-800" }
]

export function HealthTips() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTip, setSelectedTip] = useState<HealthTip | null>(null)
  const [showFullArticle, setShowFullArticle] = useState(false)

  const filteredTips = selectedCategory === "All" 
    ? healthTips 
    : healthTips.filter(tip => tip.category === selectedCategory)

  const trendingTips = healthTips.filter(tip => tip.trending)

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Health Tips & Articles
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Stay informed with the latest health insights, tips, and expert advice to help you 
            live a healthier, happier life.
          </p>
        </div>

        {/* Trending Section */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <TrendingUp className="h-5 w-5 text-orange-500 mr-2" />
            <h3 className="text-2xl font-bold text-slate-900">Trending Now</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trendingTips.map((tip, index) => {
              const Icon = tip.icon
              return (
                <Card
                  key={tip.id}
                  className="group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-white/20 overflow-hidden"
                  onClick={() => setSelectedTip(tip)}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      {/* Gradient Background */}
                      <div className={`h-32 bg-gradient-to-br ${tip.color} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
                        
                        {/* Icon */}
                        <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <Icon className="h-6 w-6 text-white" />
                        </div>

                        {/* Trending Badge */}
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-orange-500 text-white animate-pulse">
                            🔥 Trending
                          </Badge>
                        </div>

                        {/* Pattern */}
                        <div className="absolute bottom-0 right-0 w-24 h-24 opacity-20">
                          <div className="w-full h-full bg-white rounded-full blur-xl"></div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <Badge className="bg-slate-100 text-slate-700 text-xs">
                            {tip.category}
                          </Badge>
                          <div className="flex items-center text-xs text-slate-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {tip.readTime}
                          </div>
                        </div>

                        <h4 className="font-bold text-lg text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                          {tip.title}
                        </h4>

                        <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {tip.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">
                            By {tip.author}
                          </div>
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0">
                            Read More
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="text-sm font-medium text-slate-700">Filter by category:</span>
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.name)}
              className={`transition-all duration-300 ${
                selectedCategory === category.name
                  ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm hover:bg-white border-slate-200'
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip, index) => {
            const Icon = tip.icon
            return (
              <Card
                key={tip.id}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-white/20 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedTip(tip)}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Header with gradient */}
                    <div className={`h-20 bg-gradient-to-br ${tip.color} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="absolute top-3 left-3 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      {tip.trending && (
                        <div className="absolute top-3 right-3">
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {tip.category}
                        </Badge>
                        <div className="flex items-center text-xs text-slate-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {tip.readTime}
                        </div>
                      </div>

                      <h4 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                        {tip.title}
                      </h4>

                      <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {tip.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {tip.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-slate-500">
                          {tip.author}
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0 group-hover:translate-x-1 transition-transform duration-300">
                          <BookOpen className="h-3 w-3 mr-1" />
                          Read
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-center text-white overflow-hidden relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full blur-xl"></div>
          </div>

          <div className="relative">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Stay Healthy, Stay Informed</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Subscribe to our health newsletter and get the latest tips, articles, and wellness advice 
              delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 font-semibold rounded-lg transition-all duration-300 hover:scale-105">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-blue-200 mt-3">
              No spam, just valuable health insights. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            View All Health Articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
