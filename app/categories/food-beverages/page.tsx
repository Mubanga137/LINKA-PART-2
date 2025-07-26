"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChefHat,
  Coffee,
  Wine,
  Apple,
  Fish,
  Beef,
  Star,
  MapPin,
  ShoppingCart,
  Heart,
  Clock,
  Thermometer,
  Award,
  Leaf,
  Truck,
} from "lucide-react"

const foodCategories = [
  { name: "Local Dishes", icon: ChefHat, count: 89, color: "orange" },
  { name: "Beverages", icon: Coffee, count: 156, color: "blue" },
  { name: "Traditional Drinks", icon: Wine, count: 67, color: "purple" },
  { name: "Fresh Produce", icon: Apple, count: 234, color: "green" },
  { name: "Meat & Fish", icon: Fish, count: 123, color: "red" },
  { name: "Snacks & Treats", icon: Beef, count: 178, color: "amber" },
]

const products = [
  {
    id: 1,
    name: "Traditional Nshima Mix",
    vendor: "Maize Masters",
    location: "Lusaka",
    price: 45,
    originalPrice: 55,
    rating: 4.9,
    reviews: 234,
    image: "/placeholder.svg?height=300&width=300",
    category: "Local Dishes",
    preparation: "Ready in 20min",
    serves: "4-6 people",
    badge: "Traditional",
    temperature: "Ambient",
    features: ["100% Maize", "No Additives", "Family Recipe"],
  },
  {
    id: 2,
    name: "Fresh Kapenta (Dried Fish)",
    vendor: "Lake Fishing Co-op",
    location: "Mansa",
    price: 85,
    rating: 4.8,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    category: "Meat & Fish",
    preparation: "Ready to cook",
    serves: "3-4 people",
    badge: "Lake Fresh",
    temperature: "Dry",
    features: ["Sun Dried", "Lake Caught", "High Protein"],
  },
  {
    id: 3,
    name: "Maheu (Traditional Drink)",
    vendor: "Heritage Beverages",
    location: "Ndola",
    price: 25,
    originalPrice: 30,
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    category: "Beverages",
    preparation: "Ready to drink",
    serves: "1 person",
    badge: "Refreshing",
    temperature: "Chilled",
    features: ["Traditional Recipe", "Natural Ingredients", "Probiotic"],
  },
  {
    id: 4,
    name: "Zambian Coffee Beans",
    vendor: "Highland Coffee Estates",
    location: "Kasama",
    price: 120,
    rating: 4.9,
    reviews: 167,
    image: "/placeholder.svg?height=300&width=300",
    category: "Beverages",
    preparation: "Grind & brew",
    serves: "20 cups",
    badge: "Premium",
    temperature: "Dry",
    features: ["Single Origin", "Arabica Beans", "Fair Trade"],
  },
  {
    id: 5,
    name: "Ifisashi Spice Mix",
    vendor: "Spice Route Zambia",
    location: "Kitwe",
    price: 35,
    rating: 4.6,
    reviews: 78,
    image: "/placeholder.svg?height=300&width=300",
    category: "Local Dishes",
    preparation: "Add to cooking",
    serves: "10 meals",
    badge: "Authentic",
    temperature: "Dry",
    features: ["Traditional Blend", "Ground Fresh", "No Preservatives"],
  },
  {
    id: 6,
    name: "Honey Wine (Traditional)",
    vendor: "Bee Valley Wines",
    location: "Mongu",
    price: 180,
    originalPrice: 220,
    rating: 4.5,
    reviews: 45,
    image: "/placeholder.svg?height=300&width=300",
    category: "Traditional Drinks",
    preparation: "Serve chilled",
    serves: "4-6 glasses",
    badge: "Artisanal",
    temperature: "Cool",
    features: ["Pure Honey", "Traditional Method", "Natural Fermentation"],
  },
]

const recipes = [
  {
    name: "Perfect Nshima",
    duration: "30 min",
    difficulty: "Easy",
    image: "/placeholder.svg?height=200&width=300",
    ingredients: ["Nshima Mix", "Water", "Salt"],
  },
  {
    name: "Kapenta Stew",
    duration: "45 min", 
    difficulty: "Medium",
    image: "/placeholder.svg?height=200&width=300",
    ingredients: ["Kapenta", "Onions", "Tomatoes", "Spices"],
  },
  {
    name: "Ifisashi",
    duration: "40 min",
    difficulty: "Medium", 
    image: "/placeholder.svg?height=200&width=300",
    ingredients: ["Groundnuts", "Vegetables", "Spice Mix"],
  },
]

export default function FoodBeveragesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("products")
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => 
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-red-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 backdrop-blur-sm px-6 py-3 text-orange-700 border border-orange-200/50 mb-8">
                <ChefHat className="mr-2 h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium">Taste of Zambia</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Authentic Zambian
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Food & Beverages
                </span>
              </h1>

              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                Discover the rich flavors of Zambia. From traditional dishes to modern favorites, 
                locally sourced ingredients to artisanal beverages.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-8 py-4 text-lg shadow-xl"
                >
                  <ChefHat className="mr-3 h-5 w-5" />
                  Explore Food
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-200 text-slate-700 hover:bg-white px-8 py-4 text-lg"
                >
                  <Coffee className="mr-3 h-5 w-5" />
                  Browse Beverages
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Tabs */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-12">
                <TabsTrigger value="products" className="flex items-center">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Products
                </TabsTrigger>
                <TabsTrigger value="recipes" className="flex items-center">
                  <ChefHat className="h-4 w-4 mr-2" />
                  Recipes
                </TabsTrigger>
                <TabsTrigger value="categories" className="flex items-center">
                  <Apple className="h-4 w-4 mr-2" />
                  Categories
                </TabsTrigger>
              </TabsList>

              <TabsContent value="products">
                {/* Categories Filter */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                  <Button
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    onClick={() => setSelectedCategory("all")}
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs">All</span>
                  </Button>
                  {foodCategories.map((category, index) => (
                    <Button
                      key={index}
                      variant={selectedCategory === category.name.toLowerCase() ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.name.toLowerCase())}
                      className="h-auto p-4 flex flex-col items-center space-y-2"
                    >
                      <div className={`w-8 h-8 bg-gradient-to-br from-${category.color}-500 to-${category.color}-600 rounded-lg flex items-center justify-center`}>
                        <category.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-xs text-center">{category.name}</span>
                    </Button>
                  ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="group bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                    >
                      <CardContent className="p-0">
                        {/* Product Image */}
                        <div className="relative overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          
                          {/* Badge */}
                          <Badge className={`absolute top-4 left-4 ${
                            product.badge === "Traditional" ? "bg-green-500 text-white" :
                            product.badge === "Lake Fresh" ? "bg-blue-500 text-white" :
                            product.badge === "Refreshing" ? "bg-cyan-500 text-white" :
                            product.badge === "Premium" ? "bg-purple-500 text-white" :
                            product.badge === "Authentic" ? "bg-red-500 text-white" :
                            "bg-amber-500 text-white"
                          }`}>
                            {product.badge}
                          </Badge>

                          {/* Temperature Indicator */}
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                            <div className="flex items-center space-x-1">
                              <Thermometer className="h-3 w-3 text-blue-500" />
                              <span className="text-xs font-medium text-slate-700">
                                {product.temperature}
                              </span>
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="w-10 h-10 rounded-full p-0 bg-white/90 backdrop-blur-sm"
                              onClick={() => toggleFavorite(product.id)}
                            >
                              <Heart className={`h-4 w-4 ${
                                favorites.includes(product.id) ? 'text-red-500 fill-current' : 'text-slate-600'
                              }`} />
                            </Button>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-6">
                          <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2">
                            {product.name}
                          </h3>
                          
                          <div className="flex items-center space-x-2 text-sm text-slate-600 mb-3">
                            <MapPin className="h-3 w-3" />
                            <span>{product.vendor}</span>
                            <span>•</span>
                            <span>{product.location}</span>
                          </div>

                          <div className="flex items-center space-x-2 mb-4">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating) 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-slate-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-slate-600">
                              {product.rating} ({product.reviews} reviews)
                            </span>
                          </div>

                          {/* Product Details */}
                          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div>
                              <div className="flex items-center space-x-1 text-slate-600">
                                <Clock className="h-3 w-3" />
                                <span>{product.preparation}</span>
                              </div>
                            </div>
                            <div className="text-slate-600">
                              Serves: {product.serves}
                            </div>
                          </div>

                          {/* Features */}
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-1">
                              {product.features.slice(0, 2).map((feature, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="bg-orange-100 text-orange-700 text-xs"
                                >
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Price and Actions */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-slate-900">
                                ZMW {product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-slate-500 line-through">
                                  ZMW {product.originalPrice}
                                </span>
                              )}
                            </div>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white"
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recipes">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {recipes.map((recipe, index) => (
                    <Card key={index} className="bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-0">
                        <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover" />
                        <div className="p-6">
                          <h3 className="font-bold text-slate-900 mb-2">{recipe.name}</h3>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-1 text-sm text-slate-600">
                              <Clock className="h-4 w-4" />
                              <span>{recipe.duration}</span>
                            </div>
                            <Badge variant="secondary" className={`${
                              recipe.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                              recipe.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" :
                              "bg-red-100 text-red-700"
                            }`}>
                              {recipe.difficulty}
                            </Badge>
                          </div>
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-slate-700 mb-2">Ingredients:</h4>
                            <div className="space-y-1">
                              {recipe.ingredients.map((ingredient, i) => (
                                <div key={i} className="text-sm text-slate-600">• {ingredient}</div>
                              ))}
                            </div>
                          </div>
                          <Button className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white">
                            View Recipe
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="categories">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {foodCategories.map((category, index) => (
                    <Card key={index} className="bg-white/90 backdrop-blur-sm border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-8 text-center">
                        <div className={`w-16 h-16 bg-gradient-to-br from-${category.color}-500 to-${category.color}-600 rounded-3xl flex items-center justify-center mx-auto mb-6`}>
                          <category.icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">{category.name}</h3>
                        <Badge variant="secondary" className={`bg-${category.color}-100 text-${category.color}-700 mb-6`}>
                          {category.count} products
                        </Badge>
                        <Button 
                          className="w-full"
                          onClick={() => {
                            setSelectedCategory(category.name.toLowerCase())
                            setActiveTab("products")
                          }}
                        >
                          Browse {category.name}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-orange-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white/90 backdrop-blur-sm border-white/30 text-center">
                <CardContent className="p-8">
                  <Truck className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Fresh Delivery</h3>
                  <p className="text-slate-600">Same-day delivery for perishable items across major cities</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-sm border-white/30 text-center">
                <CardContent className="p-8">
                  <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Local Sourced</h3>
                  <p className="text-slate-600">Supporting Zambian farmers and food producers</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-sm border-white/30 text-center">
                <CardContent className="p-8">
                  <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Quality Assured</h3>
                  <p className="text-slate-600">Every product meets our high standards for freshness and quality</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
