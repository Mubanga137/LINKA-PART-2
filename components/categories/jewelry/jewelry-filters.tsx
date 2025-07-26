"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  Filter,
  X,
  Star,
  MapPin,
  Diamond,
  Gem,
  Crown,
  Heart,
} from "lucide-react"

const filterCategories = [
  {
    title: "Jewelry Type",
    options: [
      { name: "Necklaces", count: 124, icon: Diamond },
      { name: "Earrings", count: 89, icon: Gem },
      { name: "Bracelets", count: 67, icon: Heart },
      { name: "Rings", count: 45, icon: Crown },
      { name: "Anklets", count: 23, icon: Diamond },
      { name: "Hair Accessories", count: 34, icon: Gem },
    ],
  },
  {
    title: "Materials",
    options: [
      { name: "Copper Wire", count: 78 },
      { name: "Beads", count: 145 },
      { name: "Traditional Stones", count: 56 },
      { name: "Silver", count: 34 },
      { name: "Brass", count: 23 },
      { name: "Natural Fibers", count: 67 },
    ],
  },
  {
    title: "Style",
    options: [
      { name: "Traditional", count: 156 },
      { name: "Contemporary", count: 98 },
      { name: "Tribal", count: 67 },
      { name: "Modern", count: 87 },
      { name: "Vintage", count: 45 },
      { name: "Bohemian", count: 34 },
    ],
  },
  {
    title: "Occasions",
    options: [
      { name: "Wedding", count: 89 },
      { name: "Traditional Ceremonies", count: 67 },
      { name: "Casual Wear", count: 134 },
      { name: "Party & Events", count: 78 },
      { name: "Cultural Festivals", count: 45 },
      { name: "Gift Giving", count: 123 },
    ],
  },
]

const locations = [
  { name: "Lusaka", count: 145 },
  { name: "Ndola", count: 89 },
  { name: "Kitwe", count: 67 },
  { name: "Livingstone", count: 56 },
  { name: "Kabwe", count: 34 },
  { name: "Chingola", count: 23 },
]

export function JewelryFilters() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)

  const handleFilterChange = (category: string, option: string) => {
    setSelectedFilters(prev => {
      const current = prev[category] || []
      const updated = current.includes(option)
        ? current.filter(item => item !== option)
        : [...current, option]
      
      return { ...prev, [category]: updated }
    })
  }

  const getSelectedCount = () => {
    return Object.values(selectedFilters).flat().length + 
           (selectedRating ? 1 : 0) + 
           (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0)
  }

  const clearAllFilters = () => {
    setSelectedFilters({})
    setPriceRange([0, 1000])
    setSelectedRating(null)
  }

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <Card className="bg-white/90 backdrop-blur-sm border-white/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-amber-600" />
              <h2 className="text-xl font-bold text-slate-900">Filters</h2>
              {getSelectedCount() > 0 && (
                <Badge className="bg-amber-500 text-white">
                  {getSelectedCount()}
                </Badge>
              )}
            </div>
            {getSelectedCount() > 0 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={clearAllFilters}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          {/* Active Filters */}
          {getSelectedCount() > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(selectedFilters).map(([category, options]) =>
                options.map(option => (
                  <Badge
                    key={`${category}-${option}`}
                    variant="secondary"
                    className="bg-amber-100 text-amber-700 cursor-pointer hover:bg-amber-200"
                    onClick={() => handleFilterChange(category, option)}
                  >
                    {option}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card className="bg-white/90 backdrop-blur-sm border-white/30">
        <CardContent className="p-6">
          <h3 className="font-bold text-slate-900 mb-4">Price Range (ZMW)</h3>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={1000}
              step={10}
              className="mb-4"
            />
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>ZMW {priceRange[0]}</span>
              <span>ZMW {priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card className="bg-white/90 backdrop-blur-sm border-white/30">
        <CardContent className="p-6">
          <h3 className="font-bold text-slate-900 mb-4">Customer Rating</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => (
              <div
                key={rating}
                className="flex items-center space-x-2 cursor-pointer hover:bg-slate-50 p-2 rounded-lg"
                onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
              >
                <Checkbox checked={selectedRating === rating} />
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < rating ? 'text-yellow-400 fill-current' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600">& Up</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Filters */}
      {filterCategories.map((category, index) => (
        <Card key={index} className="bg-white/90 backdrop-blur-sm border-white/30">
          <CardContent className="p-6">
            <h3 className="font-bold text-slate-900 mb-4">{category.title}</h3>
            <div className="space-y-2">
              {category.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-2 rounded-lg"
                  onClick={() => handleFilterChange(category.title, option.name)}
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={selectedFilters[category.title]?.includes(option.name) || false}
                    />
                    {option.icon && <option.icon className="h-4 w-4 text-amber-600" />}
                    <span className="text-slate-700">{option.name}</span>
                  </div>
                  <span className="text-sm text-slate-500">({option.count})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Location Filter */}
      <Card className="bg-white/90 backdrop-blur-sm border-white/30">
        <CardContent className="p-6">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-amber-600" />
            Location
          </h3>
          <div className="space-y-2">
            {locations.map((location, index) => (
              <div
                key={index}
                className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-2 rounded-lg"
                onClick={() => handleFilterChange("Location", location.name)}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={selectedFilters["Location"]?.includes(location.name) || false}
                  />
                  <span className="text-slate-700">{location.name}</span>
                </div>
                <span className="text-sm text-slate-500">({location.count})</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Apply Filters Button */}
      <Button
        size="lg"
        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-xl"
      >
        Apply Filters ({getSelectedCount()})
      </Button>
    </div>
  )
}
