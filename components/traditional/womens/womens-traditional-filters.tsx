"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Filter, X, Star, MapPin, Award, Crown } from "lucide-react";

interface FilterState {
  regions: string[];
  occasions: string[];
  categories: string[];
  sizes: string[];
  priceRange: number[];
  ratings: number;
  features: string[];
}

const filterOptions = {
  regions: [
    { name: "Western Province", count: 45 },
    { name: "Northern Province", count: 38 },
    { name: "Southern Province", count: 52 },
    { name: "Eastern Province", count: 34 },
    { name: "Central Province", count: 41 },
    { name: "Copperbelt", count: 29 },
    { name: "Luapula Province", count: 23 },
    { name: "North-Western", count: 18 }
  ],
  occasions: [
    { name: "Wedding", count: 67 },
    { name: "Ceremony", count: 89 },
    { name: "Cultural Festival", count: 56 },
    { name: "Traditional Dance", count: 34 },
    { name: "Royal Events", count: 23 },
    { name: "Daily Wear", count: 78 },
    { name: "Special Occasions", count: 45 }
  ],
  categories: [
    { name: "Traditional Dresses", count: 89 },
    { name: "Wedding Attire", count: 45 },
    { name: "Ceremonial Wear", count: 67 },
    { name: "Royal Attire", count: 23 },
    { name: "Dance Costumes", count: 34 },
    { name: "Traditional Wraps", count: 78 },
    { name: "Cultural Outfits", count: 56 }
  ],
  sizes: [
    { name: "XS", count: 23 },
    { name: "S", count: 67 },
    { name: "M", count: 89 },
    { name: "L", count: 78 },
    { name: "XL", count: 56 },
    { name: "XXL", count: 34 },
    { name: "One Size", count: 45 }
  ],
  features: [
    { name: "Handmade", count: 156 },
    { name: "Cultural Patterns", count: 134 },
    { name: "Premium Quality", count: 89 },
    { name: "Authentic Design", count: 167 },
    { name: "Traditional Fabric", count: 123 },
    { name: "Heritage Crafted", count: 78 },
    { name: "Ceremonial Grade", count: 45 }
  ]
};

export default function WomensTraditionalFilters() {
  const [filters, setFilters] = useState<FilterState>({
    regions: [],
    occasions: [],
    categories: [],
    sizes: [],
    priceRange: [0, 800],
    ratings: 0,
    features: []
  });

  const [isExpanded, setIsExpanded] = useState({
    regions: true,
    occasions: true,
    categories: false,
    sizes: false,
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
      regions: [],
      occasions: [],
      categories: [],
      sizes: [],
      priceRange: [0, 800],
      ratings: 0,
      features: []
    });
  };

  const getActiveFiltersCount = () => {
    return filters.regions.length + 
           filters.occasions.length + 
           filters.categories.length + 
           filters.sizes.length + 
           filters.features.length + 
           (filters.ratings > 0 ? 1 : 0) +
           (filters.priceRange[0] > 0 || filters.priceRange[1] < 800 ? 1 : 0);
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
                  className="text-sm text-gray-700 cursor-pointer"
                >
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
                <Badge className="bg-rose-600">
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
                max={800}
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

          {/* Regions */}
          <FilterSection
            title="Cultural Regions"
            items={filterOptions.regions}
            filterKey="regions"
            icon={MapPin}
          />

          <Separator />

          {/* Occasions */}
          <FilterSection
            title="Occasions"
            items={filterOptions.occasions}
            filterKey="occasions"
            icon={Crown}
          />

          <Separator />

          {/* Categories */}
          <FilterSection
            title="Categories"
            items={filterOptions.categories}
            filterKey="categories"
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
      <Button className="w-full bg-rose-600 hover:bg-rose-700">
        <Filter className="h-4 w-4 mr-2" />
        Apply Filters ({getActiveFiltersCount()})
      </Button>

      {/* Cultural Heritage Note */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardContent className="p-4">
          <h4 className="font-medium text-orange-900 mb-2">Cultural Heritage</h4>
          <p className="text-sm text-orange-700">
            Each piece represents authentic Zambian cultural traditions, 
            crafted by skilled artisans preserving our heritage.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
