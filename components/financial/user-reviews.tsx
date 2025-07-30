"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  MessageCircle, 
  Filter,
  TrendingUp,
  Award,
  Users,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react"

interface Review {
  id: string
  user: {
    name: string
    initials: string
    verified: boolean
    joinDate: string
  }
  product: string
  provider: string
  rating: number
  title: string
  content: string
  date: string
  likes: number
  dislikes: number
  helpful: number
  category: string
  pros: string[]
  cons: string[]
  wouldRecommend: boolean
}

const reviews: Review[] = [
  {
    id: "1",
    user: {
      name: "James Mwamba",
      initials: "JM",
      verified: true,
      joinDate: "2023"
    },
    product: "Zanaco Savings Account",
    provider: "Zanaco Bank",
    rating: 5,
    title: "Excellent banking experience with great mobile app",
    content: "I've been using Zanaco savings account for over 2 years now and I'm thoroughly impressed. The mobile banking app is user-friendly and makes transactions very convenient. Customer service is responsive and professional.",
    date: "2024-01-15",
    likes: 24,
    dislikes: 2,
    helpful: 28,
    category: "banking",
    pros: ["Easy mobile banking", "Good customer service", "Low minimum balance"],
    cons: ["Limited international services"],
    wouldRecommend: true
  },
  {
    id: "2",
    user: {
      name: "Sarah Banda",
      initials: "SB",
      verified: true,
      joinDate: "2022"
    },
    product: "MTN Mobile Money",
    provider: "MTN Zambia",
    rating: 4,
    title: "Reliable mobile money service but fees could be better",
    content: "MTN Mobile Money has been my go-to for digital payments. The network coverage is excellent and transactions are usually instant. However, the fees are quite high compared to competitors.",
    date: "2024-01-10",
    likes: 18,
    dislikes: 5,
    helpful: 22,
    category: "mobile-money",
    pros: ["Wide network coverage", "Instant transactions", "Easy to use"],
    cons: ["High transaction fees", "Network congestion sometimes"],
    wouldRecommend: true
  },
  {
    id: "3",
    user: {
      name: "Michael Chanda",
      initials: "MC",
      verified: false,
      joinDate: "2023"
    },
    product: "Madison Motor Insurance",
    provider: "Madison Insurance",
    rating: 3,
    title: "Average insurance service with slow claims",
    content: "The insurance coverage is comprehensive but the claims process is quite slow. It took over 3 weeks to get my claim approved and processed. Premium rates are competitive though.",
    date: "2024-01-08",
    likes: 12,
    dislikes: 8,
    helpful: 15,
    category: "insurance",
    pros: ["Comprehensive coverage", "Competitive rates"],
    cons: ["Slow claims processing", "Poor communication"],
    wouldRecommend: false
  },
  {
    id: "4",
    user: {
      name: "Grace Phiri",
      initials: "GP",
      verified: true,
      joinDate: "2021"
    },
    product: "Stanbic Personal Loan",
    provider: "Stanbic Bank",
    rating: 5,
    title: "Quick approval and great interest rates",
    content: "Applied for a personal loan and got approved within 48 hours. The interest rate was very competitive and the repayment terms are flexible. Highly recommend for anyone needing quick financing.",
    date: "2024-01-05",
    likes: 31,
    dislikes: 1,
    helpful: 35,
    category: "loans",
    pros: ["Quick approval", "Competitive rates", "Flexible terms"],
    cons: ["Requires good credit history"],
    wouldRecommend: true
  }
]

export function UserReviews() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedRating, setSelectedRating] = useState("all")
  const [showWriteReview, setShowWriteReview] = useState(false)

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "banking", label: "Banking" },
    { value: "mobile-money", label: "Mobile Money" },
    { value: "insurance", label: "Insurance" },
    { value: "loans", label: "Loans" },
    { value: "investments", label: "Investments" }
  ]

  const filteredReviews = reviews.filter(review => {
    const categoryMatch = selectedCategory === "all" || review.category === selectedCategory
    const ratingMatch = selectedRating === "all" || review.rating === parseInt(selectedRating)
    return categoryMatch && ratingMatch
  })

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  const totalReviews = reviews.length

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: (reviews.filter(review => review.rating === rating).length / totalReviews) * 100
  }))

  const renderStars = (rating: number, size = "sm") => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size === "sm" ? "h-4 w-4" : "h-5 w-5"} ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Customer Reviews & Ratings</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Real experiences from verified customers to help you make informed decisions
        </p>
      </div>

      {/* Overall Rating Summary */}
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Average Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">
                {averageRating.toFixed(1)}
              </div>
              {renderStars(Math.round(averageRating), "lg")}
              <p className="text-sm text-slate-600 mt-2">
                Based on {totalReviews} reviews
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm">{rating}</span>
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  </div>
                  <Progress value={percentage} className="flex-1 h-2" />
                  <span className="text-sm text-slate-600 w-8">{count}</span>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-slate-900">96% Satisfaction</p>
                  <p className="text-xs text-slate-600">Would recommend</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-slate-900">85% Verified</p>
                  <p className="text-xs text-slate-600">Verified customers</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-slate-900">4.2 Avg Rating</p>
                  <p className="text-xs text-slate-600">Last 30 days</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Write Review */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">Filter by:</span>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={() => setShowWriteReview(!showWriteReview)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Write Review
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Write Review Form */}
      {showWriteReview && (
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-700">Write Your Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Product/Service</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zanaco-savings">Zanaco Savings Account</SelectItem>
                    <SelectItem value="mtn-mobile">MTN Mobile Money</SelectItem>
                    <SelectItem value="madison-insurance">Madison Motor Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Your Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-6 w-6 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Review Title</Label>
              <Input placeholder="Summarize your experience" />
            </div>
            <div className="space-y-2">
              <Label>Your Review</Label>
              <Textarea 
                placeholder="Share your detailed experience with this financial service..."
                className="min-h-[120px]"
              />
            </div>
            <div className="flex gap-4">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                Submit Review
              </Button>
              <Button variant="outline" onClick={() => setShowWriteReview(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="bg-white border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                    {review.user.initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  {/* User Info and Rating */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">{review.user.name}</span>
                        {review.user.verified && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        <Badge variant="secondary" className="text-xs">
                          {review.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {renderStars(review.rating)}
                        <span className="text-sm text-slate-600">
                          • {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-900">{review.product}</p>
                      <p className="text-xs text-slate-600">{review.provider}</p>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">{review.title}</h3>
                    <p className="text-slate-700 leading-relaxed">{review.content}</p>
                  </div>

                  {/* Pros and Cons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-green-700 mb-2">Pros:</h4>
                      <ul className="space-y-1">
                        {review.pros.map((pro, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-green-600">
                            <CheckCircle className="h-3 w-3" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-red-700 mb-2">Cons:</h4>
                      <ul className="space-y-1">
                        {review.cons.map((con, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-red-600">
                            <AlertCircle className="h-3 w-3" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-green-600 transition-colors">
                        <ThumbsUp className="h-4 w-4" />
                        Helpful ({review.helpful})
                      </button>
                      <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        Reply
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      {review.wouldRecommend && (
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          Would Recommend
                        </Badge>
                      )}
                      <span className="text-xs text-slate-500">
                        Customer since {review.user.joinDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No reviews found</h3>
            <p className="text-slate-600">Try adjusting your filters or be the first to write a review!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
