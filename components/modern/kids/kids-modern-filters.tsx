"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Filter, X, Star, ShoppingBag, Truck, Award } from "lucide-react";

interface FilterState {
  categories: string[];
  ageGroups: string[];
  brands: string[];
  sizes: string[];
  colors: string[];
  priceRange: number[];
  ratings: number;
  features: string[];
}

const filterOptions = {
  categories: [
    { name: "T-Shirts", count: 45 },
    { name: "School Wear", count: 38 },
    { name: "Dresses", count: 32 },
    { name: "Activewear", count: 28 },
    { name: "Sleepwear", count: 25 },
    { name: "Jeans", count: 22 },
    { name: "Shorts", count: 35 },
    { name: "Outerwear", count: 18 },
    { name: "Special Occasion", count: 15 }
  ],
  ageGroups: [
    { name: "0-2 years", count: 67 },
    { name: "2-4 years", count: 89 },
    { name: "4-6 years", count: 123 },
    { name: "6-8 years", count: 134 },
    { name: "8-10 years", count: 98 },
    { name: "10-12 years", count: 76 },
    { name: "12+ years", count: 45 }
  ],
  brands: [
    { name: "Little Zambia", count: 28 },
    { name: "Smart Kids ZM", count: 23 },
    { name: "Princess Zambia", count: 19 },
    { name: "Active Kids ZM", count: 22 },
    { name: "Sleepy Time ZM", count: 18 },
    { name: "Little Denim ZM", count: 16 }
  ],
  sizes: [
    { name: "0-3M", count: 23 },
    { name: "3-6M", count: 25 },
    { name: "6-12M", count: 28 },
    { name: "12-18M", count: 32 },
    { name: "18-24M", count: 29 },
    { name: "2T", count: 34 },
    { name: "3T", count: 38 },
    { name: "4T", count: 42 },
    { name: "5", count: 45 },
    { name: "6", count: 48 },
    { name: "7", count: 52 },
    { name: "8", count: 49 },
    { name: "10", count: 43 },
    { name: "12", count: 38 }
  ],
  colors: [
    { name: "Red", count: 45, color: "#FF0000" },
    { name: "Blue", count: 52, color: "#0066CC" },
    { name: "Pink", count: 38, color: "#FF69B4" },
    { name: "Yellow", count: 34, color: "#FFD700" },
    { name: "Green", count: 29, color: "#008000" },
    { name: "Purple", count: 25, color: "#800080" },
    { name: "White", count: 67, color: "#FFFFFF" },
    { name: "Black", count: 23, color: "#000000" }
  ],
  features: [
    { name: "Machine Washable", count: 156 },
    { name: "100% Cotton", count: 98 },
    { name: "Comfortable Fit", count: 134 },
    { name: "Durable", count: 89 },
    { name: "Soft Fabric", count: 76 },
    { name: "Quick Dry", count: 45 },
    { name: "Adjustable", count: 32 },
    { name: "Safety Tested", count: 187 }
  ]
};

export default function KidsModernFilters() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    ageGroups: [],
    brands: [],
    sizes: [],
    colors: [],
    priceRange: [0, 300],
    ratings: 0,
    features: []
  });

  const [isExpanded, setIsExpanded] = useState({
    categories: true,
    ageGroups: true,
    brands: false,
    sizes: false,
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
      ageGroups: [],
      brands: [],
      sizes: [],
      colors: [],
      priceRange: [0, 300],
      ratings: 0,
      features: []
    });
  };

  const getActiveFiltersCount = () => {
    return filters.categories.length + 
           filters.ageGroups.length + 
           filters.brands.length + 
           filters.sizes.length + 
           filters.colors.length + 
           filters.features.length + 
           (filters.ratings > 0 ? 1 : 0) +
           (filters.priceRange[0] > 0 || filters.priceRange[1] < 300 ? 1 : 0);
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
                <Badge className="bg-yellow-600">
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
                max={300}
                min={0}
                step={10}
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

          {/* Categories */}
          <FilterSection
            title="Categories"
            items={filterOptions.categories}
            filterKey="categories"
            icon={ShoppingBag}
          />

          <Separator />

          {/* Age Groups */}
          <FilterSection
            title="Age Groups"
            items={filterOptions.ageGroups}
            filterKey="ageGroups"
            icon={Award}
          />

          <Separator />

          {/* Brands */}
          <FilterSection
            title="Brands"
            items={filterOptions.brands}
            filterKey="brands"
            icon={Award}
          />

          <Separator />

          {/* Sizes */}
          <FilterSection
            title="Sizes"
            items={filterOptions.sizes}
            filterKey="sizes"
            icon={Filter}
          />

          <Separator />

          {/* Colors */}
          <FilterSection
            title="Colors"
            items={filterOptions.colors}
            filterKey="colors"
            icon={Filter}
          />

          <Separator />

          {/* Features */}
          <FilterSection
            title="Features"
            items={filterOptions.features}
            filterKey="features"
            icon={Award}
          />
        </CardContent>
      </Card>

      {/* Apply Filters Button */}
      <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
        <Filter className="h-4 w-4 mr-2" />
        Apply Filters ({getActiveFiltersCount()})
      </Button>

      {/* Quick Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Quick Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Truck className="h-4 w-4 mr-2" />
            Fast Delivery
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Award className="h-4 w-4 mr-2" />
            Safety Tested
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Star className="h-4 w-4 mr-2" />
            Top Rated
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
