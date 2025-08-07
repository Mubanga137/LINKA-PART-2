"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Star, 
  MapPin, 
  Package, 
  Users, 
  Verified, 
  Award, 
  Heart,
  ExternalLink,
  Store,
  TrendingUp,
  Filter,
  ArrowRight
} from "lucide-react"
import type { Vendor } from "@/lib/types"
import { getAllVendors, searchVendors, generateStoreSlug } from "@/services/vendor-service"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true)
      try {
        const allVendors = await getAllVendors()
        setVendors(allVendors)
        setFilteredVendors(allVendors)
      } catch (error) {
        console.error('Error fetching vendors:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVendors()
  }, [])

  useEffect(() => {
    const filterVendors = async () => {
      if (searchQuery.trim()) {
        const searchResults = await searchVendors(searchQuery)
        setFilteredVendors(searchResults)
      } else {
        let filtered = vendors

        if (selectedCategory !== "all") {
          filtered = filtered.filter(vendor =>
            vendor.categories?.some(cat => 
              cat.toLowerCase() === selectedCategory.toLowerCase()
            )
          )
        }

        setFilteredVendors(filtered)
      }
    }

    filterVendors()
  }, [vendors, searchQuery, selectedCategory])

  const categories = ["all", ...Array.from(new Set(
    vendors.flatMap(vendor => vendor.categories || [])
  ))]

  const toggleFavorite = (vendorId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(vendorId)) {
        newFavorites.delete(vendorId)
      } else {
        newFavorites.add(vendorId)
      }
      return newFavorites
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Header />
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-32 bg-gray-200 rounded-3xl mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 bg-gray-200 rounded-2xl"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      
      <main className="py-8">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="py-16"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Trusted Vendors
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover amazing stores from verified vendors across Zambia. Shop with confidence from our curated collection of trusted sellers.
              </p>
            </motion.div>

            {/* Search and Filter */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search vendors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-3 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {categories.slice(0, 6).map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-xl capitalize ${
                          selectedCategory === category
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:text-blue-600'
                        }`}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{vendors.length}</div>
                  <div className="text-gray-600">Active Vendors</div>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {vendors.filter(v => v.isVerified).length}
                  </div>
                  <div className="text-gray-600">Verified Stores</div>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {categories.length - 1}
                  </div>
                  <div className="text-gray-600">Categories</div>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                  <div className="text-3xl font-bold text-orange-600 mb-2">4.7</div>
                  <div className="text-gray-600">Avg Rating</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Vendors Grid */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="py-8"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {searchQuery ? `Search Results (${filteredVendors.length})` : 'All Vendors'}
              </h2>
              <p className="text-gray-600">
                {searchQuery 
                  ? `Found ${filteredVendors.length} vendors matching "${searchQuery}"`
                  : `Showing ${filteredVendors.length} verified vendors`
                }
              </p>
            </motion.div>

            {filteredVendors.length === 0 ? (
              <div className="text-center py-16">
                <Store className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No vendors found</h3>
                <p className="text-gray-600">Try adjusting your search criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVendors.map((vendor, index) => (
                  <motion.div
                    key={vendor.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="group"
                  >
                    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl h-full">
                      <CardContent className="p-0 h-full flex flex-col">
                        {/* Vendor Header Image */}
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={vendor.productImageUrl}
                            alt={vendor.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          
                          {/* Badges */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {vendor.isVerified && (
                              <Badge className="bg-blue-600 text-white px-3 py-1 rounded-xl">
                                <Verified className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            {vendor.isFeatured && (
                              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-xl">
                                <Award className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>

                          {/* Favorite Button */}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleFavorite(vendor.id)}
                            className="absolute top-4 right-4 w-10 h-10 p-0 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Heart className={`h-4 w-4 ${
                              favorites.has(vendor.id) 
                                ? 'fill-red-500 text-red-500' 
                                : 'text-gray-600 hover:text-red-500'
                            }`} />
                          </Button>
                        </div>

                        {/* Vendor Info */}
                        <div className="p-6 flex-1 flex flex-col">
                          {/* Vendor Avatar and Name */}
                          <div className="flex items-center gap-4 mb-4">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                              <Image
                                src={vendor.vendorImageUrl || vendor.productImageUrl}
                                alt={vendor.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-gray-900 mb-1">
                                {vendor.name}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {vendor.tagline}
                              </p>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-semibold text-gray-700">
                                {vendor.rating}
                              </span>
                              <span className="text-sm text-gray-500">
                                ({vendor.reviewCount})
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span>{vendor.location}</span>
                            </div>
                          </div>

                          {/* Categories */}
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-1">
                              {vendor.categories?.slice(0, 3).map((category) => (
                                <Badge key={category} variant="secondary" className="text-xs">
                                  {category}
                                </Badge>
                              ))}
                              {vendor.categories && vendor.categories.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{vendor.categories.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Discount & Delivery Info */}
                          <div className="mb-6 space-y-2">
                            {vendor.discount && (
                              <div className="text-sm text-green-600 font-medium">
                                🎉 {vendor.discount}
                              </div>
                            )}
                            <div className="text-sm text-gray-600">
                              📦 {vendor.deliveryTime}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="mt-auto space-y-2">
                            <Button
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all"
                              asChild
                            >
                              <Link href={`/vendors/${generateStoreSlug(vendor.name)}`}>
                                <Store className="h-4 w-4 mr-2" />
                                Visit Store
                              </Link>
                            </Button>
                            
                            <Button
                              variant="outline"
                              className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 py-3 rounded-xl transition-all"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="py-16"
        >
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Want to Become a Vendor?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join our marketplace and reach thousands of customers across Zambia
              </p>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl">
                <TrendingUp className="h-5 w-5 mr-2" />
                Start Selling Today
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}
