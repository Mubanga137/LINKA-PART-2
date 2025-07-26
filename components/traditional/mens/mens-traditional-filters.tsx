"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Filter, X, MapPin, Palette, Crown } from "lucide-react"
import { TraditionalFilter } from "../../../app/categories/fashion-textiles/traditional/mens/page"

interface MensTraditionalFiltersProps {
  filters: TraditionalFilter
  onFiltersChange: (filters: TraditionalFilter) => void
}

export function MensTraditionalFilters({ filters, onFiltersChange }: MensTraditionalFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 500])

  const categories = [
    { id: "ceremonial", name: "Ceremonial Wear", count: 25 },
    { id: "formal", name: "Formal Traditional", count: 18 },
    { id: "casual", name: "Casual Traditional", count: 42 }
  ]

  const regions = [
    { id: "northern", name: "Northern Province", count: 15 },
    { id: "western", name: "Western Province", count: 12 },
    { id: "southern", name: "Southern Province", count: 18 },
    { id: "northwestern", name: "Northwestern Province", count: 8 },
    { id: "national", name: "Pan-Zambian", count: 32 }
  ]

  const patterns = [
    { id: "bemba", name: "Bemba Traditional", count: 12 },
    { id: "lozi", name: "Lozi Royal", count: 8 },
    { id: "tonga", name: "Tonga Traditional", count: 15 },
    { id: "kaonde", name: "Kaonde Traditional", count: 6 },
    { id: "modern-ankara", name: "Modern Ankara", count: 28 },
    { id: "contemporary", name: "Contemporary", count: 16 }
  ]

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      onFiltersChange({ ...filters, category: categoryId })
    } else {
      onFiltersChange({ ...filters, category: undefined })
    }
  }

  const handleRegionChange = (regionId: string) => {
    onFiltersChange({ ...filters, region: regionId })
  }

  const handlePatternChange = (patternId: string) => {
    onFiltersChange({ ...filters, pattern: patternId })
  }

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values)
    onFiltersChange({
      ...filters,
      priceRange: { min: values[0], max: values[1] }
    })
  }

  const clearFilters = () => {
    setPriceRange([0, 500])
    onFiltersChange({})
  }

  const hasActiveFilters = Object.keys(filters).some(key => 
    filters[key as keyof TraditionalFilter] !== undefined
  )

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </CardTitle>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <Crown className="h-4 w-4 mr-2" />
            Category
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={category.id}
                    checked={filters.category === category.id}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category.id, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={category.id} 
                    className="text-sm cursor-pointer"
                  >
                    {category.name}
                  </Label>
                </div>
                <Badge variant="outline" className="text-xs">
                  {category.count}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cultural Regions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            Cultural Region
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Select 
            value={filters.region || ""} 
            onValueChange={handleRegionChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.id} value={region.id}>
                  {region.name} ({region.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Traditional Patterns */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <Palette className="h-4 w-4 mr-2" />
            Pattern Style
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Select 
            value={filters.pattern || ""} 
            onValueChange={handlePatternChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select pattern" />
            </SelectTrigger>
            <SelectContent>
              {patterns.map((pattern) => (
                <SelectItem key={pattern.id} value={pattern.id}>
                  {pattern.name} ({pattern.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Price Range (ZMW)</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              max={500}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>ZMW {priceRange[0]}</span>
              <span>ZMW {priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Size Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Size</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Select 
            value={filters.size || ""} 
            onValueChange={(size) => onFiltersChange({ ...filters, size })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="S">Small (S)</SelectItem>
              <SelectItem value="M">Medium (M)</SelectItem>
              <SelectItem value="L">Large (L)</SelectItem>
              <SelectItem value="XL">Extra Large (XL)</SelectItem>
              <SelectItem value="XXL">2XL</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Cultural Information */}
      <Card className="bg-orange-50 border-orange-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-orange-900 mb-2">Cultural Heritage</h3>
          <p className="text-sm text-orange-800 leading-relaxed">
            Each piece in our traditional collection represents authentic Zambian cultural heritage, 
            crafted by local artisans who understand the deep significance of these designs.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
