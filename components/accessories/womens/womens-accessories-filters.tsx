"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Filter, X, Star, ShoppingBag, Award } from "lucide-react";

interface FilterState {
  categories: string[];
  materials: string[];
  brands: string[];
  colors: string[];
  priceRange: number[];
  ratings: number;
  features: string[];
}

const filterOptions = {
  categories: [
    { name: "Jewelry", count: 89 },
    { name: "Bags", count: 67 },
    { name: "Head Accessories", count: 45 },
    { name: "Scarves", count: 34 },
    { name: "Belts", count: 28 },
    { name: "Watches", count: 23 },
    { name: "Hair Accessories", count: 56 },
    { name: "Sunglasses", count: 41 }
  ],
  materials: [
    { name: "Copper", count: 45 },
    { name: "Leather", count: 67 },
    { name: "Silk", count: 34 },
    { name: "Cotton", count: 56 },
    { name: "Metal", count: 23 },
    { name: "Beads", count: 78 },
    { name: "Fabric", count: 89 },
    { name: "Plastic", count: 12 }
  ],
  brands: [
    { name: "Zambian Heritage", count: 34 },
    { name: "Urban Zambia", count: 28 },
    { name: "African Elegance", count: 23 },
    { name: "Copper Craft", count: 19 },
    { name: "Traditional Textiles", count: 31 },
    { name: "Modern Accessories", count: 27 }
  ],
  colors: [
    { name: "Copper", count: 45, color: "#B87333" },
    { name: "Black", count: 89, color: "#000000" },
    { name: "Brown", count: 67, color: "#8B4513" },
    { name: "Gold", count: 34, color: "#FFD700" },
    { name: "Silver", count: 23, color: "#C0C0C0" },
    { name: "Multi-Color", count: 78, color: "#FF6B6B" },
    { name: "White", count: 56, color: "#FFFFFF" },
    { name: "Blue", count: 41, color: "#4169E1" }
  ],
  features: [
    { name: "Handcrafted", count: 156 },
    { name: "Local Materials", count: 89 },
    { name: "Gift Box Included", count: 67 },
    { name: "Adjustable", count: 78 },
    { name: "Water Resistant", count: 34 },
    { name: "Traditional Design", count: 123 },
    { name: "Modern Style", count: 98 },
    { name: "Premium Quality", count: 45 }
  ]
};

export default function WomensAccessoriesFilters() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    materials: [],
    brands: [],
    colors: [],
    priceRange: [0, 500],
    ratings: 0,
    features: []
  });

  const [isExpanded, setIsExpanded] = useState({
    categories: true,
    materials: true,
    brands: false,
    colors: false,
    features: false
  });

  const handleFilterChange = (filterType: keyof FilterState, value: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: checked
        ? [...(prev[filterType] as string[]), value]
        : (prev[filterType] as string[]).filter(item => item !== value)
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      materials: [],
      brands: [],
      colors: [],
      priceRange: [0, 500],
      ratings: 0,
      features: []
    });
  };

  const getActiveFiltersCount = () => {
    return filters.categories.length + 
           filters.materials.length + 
           filters.brands.length + 
           filters.colors.length + 
           filters.features.length + 
           (filters.ratings > 0 ? 1 : 0) +
           (filters.priceRange[0] > 0 || filters.priceRange[1] < 500 ? 1 : 0);
  };

  const FilterSection = ({ title, items, filterKey, icon: Icon }: any) => (
    <div className="space-y-3">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(prev => ({ ...prev, [filterKey]: !prev[filterKey] }))}
      >
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-gray-600" />
          <h4 className="font-medium text-gray-900">{title}</h4>
        </div>
        <motion.div
          animate={{ rotate: isExpanded[filterKey] ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <X className="h-4 w-4 text-gray-400" />
        </motion.div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isExpanded[filterKey] ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {items.map((item: any) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`${filterKey}-${item.name}`}
                  checked={filters[filterKey as keyof FilterState].includes(item.name)}
                  onCheckedChange={(checked) =>
                    handleFilterChange(filterKey as keyof FilterState, item.name, checked as boolean)
                  }
                />
                <label
                  htmlFor={`${filterKey}-${item.name}`}
                  className="text-sm text-gray-700 cursor-pointer flex items-center gap-2"
                >
                  {item.color && (
                    <div
                      className="w-3 h-3 rounded-full border border-gray-300"
                      style={{ backgroundColor: item.color }}
                    />
                  )}
                  {item.name}
                </label>
              </div>
              <Badge variant="secondary" className="text-xs">
                {item.count}
              </Badge>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
              {getActiveFiltersCount() > 0 && (
                <Badge className="bg-violet-600">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </CardTitle>
            {getActiveFiltersCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-red-600 hover:text-red-700"
              >
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Price Range (ZMW)</h4>
            <div className="px-2">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                max={500}
                min={0}
                step={25}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>ZMW {filters.priceRange[0]}</span>
                <span>ZMW {filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Rating Filter */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Minimum Rating</h4>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={filters.ratings === rating}
                    onCheckedChange={(checked) =>
                      setFilters(prev => ({ ...prev, ratings: checked ? rating : 0 }))
                    }
                  />
                  <label htmlFor={`rating-${rating}`} className="flex items-center gap-1 cursor-pointer">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600">& up</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <FilterSection
            title="Categories"
            items={filterOptions.categories}
            filterKey="categories"
            icon={ShoppingBag}
          />

          <Separator />

          <FilterSection
            title="Materials"
            items={filterOptions.materials}
            filterKey="materials"
            icon={Award}
          />

          <Separator />

          <FilterSection
            title="Brands"
            items={filterOptions.brands}
            filterKey="brands"
            icon={Award}
          />

          <Separator />

          <FilterSection
            title="Colors"
            items={filterOptions.colors}
            filterKey="colors"
            icon={Filter}
          />

          <Separator />

          <FilterSection
            title="Features"
            items={filterOptions.features}
            filterKey="features"
            icon={Award}
          />
        </CardContent>
      </Card>

      {/* Apply Filters Button */}
      <Button className="w-full bg-violet-600 hover:bg-violet-700">
        <Filter className="h-4 w-4 mr-2" />
        Apply Filters ({getActiveFiltersCount()})
      </Button>
    </div>
  );
}
