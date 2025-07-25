"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { ChevronDown, ChevronUp, Star, MapPin } from "lucide-react"

const categories = [
  { name: "Traditional Crafts", count: 156, color: "text-orange-600" },
  { name: "Local Food & Spices", count: 234, color: "text-green-600" },
  { name: "Chitenge & Fabrics", count: 89, color: "text-purple-600" },
  { name: "Handmade Jewelry", count: 67, color: "text-pink-600" },
  { name: "Wood Carvings", count: 45, color: "text-amber-600" },
  { name: "Copper Crafts", count: 78, color: "text-orange-700" },
  { name: "Baskets & Pottery", count: 123, color: "text-emerald-600" },
  { name: "Traditional Instruments", count: 34, color: "text-indigo-600" },
]

const locations = [
  { name: "Lusaka Central", count: 456 },
  { name: "Chilenje", count: 234 },
  { name: "Kabulonga", count: 189 },
  { name: "Woodlands", count: 167 },
  { name: "Roma", count: 145 },
  { name: "Avondale", count: 123 },
]

const vendors = [
  { name: "Mwamba Crafts", rating: 4.9, products: 45 },
  { name: "Lusaka Traditional Arts", rating: 4.8, products: 67 },
  { name: "Zambian Heritage Store", rating: 4.7, products: 89 },
  { name: "Copper Rose Crafts", rating: 4.9, products: 34 },
  { name: "Chitenge Palace", rating: 4.6, products: 78 },
]

export function ShopFilters() {
  const [expandedSections, setExpandedSections] = useState<string[]>(["categories", "price", "location"])
  const [priceRange, setPriceRange] = useState([0, 1000])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const FilterSection = ({ title, children, id }: { title: string; children: React.ReactNode; id: string }) => {
    const isExpanded = expandedSections.includes(id)

    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-slate-900/5 border border-white/20 mb-6">
        <button onClick={() => toggleSection(id)} className="flex items-center justify-between w-full text-left mb-4">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-slate-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-500" />
          )}
        </button>
        {isExpanded && <div>{children}</div>}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quick Filters */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200/50">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Filters</h3>
        <div className="flex flex-wrap gap-2">
          {["On Sale", "Free Delivery", "New Arrivals", "Top Rated", "Local Favorite"].map((filter) => (
            <Button
              key={filter}
              variant="outline"
              size="sm"
              className="bg-white/80 border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300"
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <FilterSection title="Categories" id="categories">
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.name} className="flex items-center justify-between group">
              <div className="flex items-center space-x-3">
                <Checkbox id={category.name} />
                <label
                  htmlFor={category.name}
                  className={`font-medium cursor-pointer group-hover:${category.color} transition-colors`}
                >
                  {category.name}
                </label>
              </div>
              <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{category.count}</span>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range (ZMW)" id="price">
        <div className="space-y-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={1000} step={10} className="w-full" />
          <div className="flex items-center justify-between text-sm">
            <span className="bg-slate-100 px-3 py-1 rounded-lg font-medium">ZMW {priceRange[0]}</span>
            <span className="text-slate-500">to</span>
            <span className="bg-slate-100 px-3 py-1 rounded-lg font-medium">ZMW {priceRange[1]}</span>
          </div>
        </div>
      </FilterSection>

      {/* Location */}
      <FilterSection title="Delivery Location" id="location">
        <div className="space-y-3">
          {locations.map((location) => (
            <div key={location.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Checkbox id={location.name} />
                <label htmlFor={location.name} className="font-medium cursor-pointer flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-emerald-500" />
                  {location.name}
                </label>
              </div>
              <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{location.count}</span>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Top Vendors */}
      <FilterSection title="Featured Vendors" id="vendors">
        <div className="space-y-3">
          {vendors.map((vendor) => (
            <div
              key={vendor.name}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <div>
                <div className="font-medium text-slate-900">{vendor.name}</div>
                <div className="flex items-center text-sm text-slate-600">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                  {vendor.rating} • {vendor.products} products
                </div>
              </div>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Clear Filters */}
      <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-100 bg-transparent">
        Clear All Filters
      </Button>
    </div>
  )
}
