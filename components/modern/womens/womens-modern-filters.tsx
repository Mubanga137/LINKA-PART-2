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
  styles: string[];
  brands: string[];
  sizes: string[];
  colors: string[];
  priceRange: number[];
  ratings: number;
  features: string[];
}

const filterOptions = {
  categories: [
    { name: "Dresses", count: 89 },
    { name: "Blouses", count: 67 },
    { name: "Suits", count: 34 },
    { name: "Skirts", count: 45 },
    { name: "Pants", count: 78 },
    { name: "Tops", count: 123 },
    { name: "Jumpsuits", count: 28 },
    { name: "Evening Wear", count: 56 },
    { name: "Activewear", count: 43 },
    { name: "Outerwear", count: 39 }
  ],
  styles: [
    { name: "Elegant", count: 145 },
    { name: "Casual", count: 189 },
    { name: "Professional", count: 98 },
    { name: "Glamorous", count: 67 },
    { name: "Sporty", count: 54 },
    { name: "Contemporary", count: 112 },
    { name: "Bohemian", count: 43 }
  ],
  brands: [
    { name: "Zambian Elegance", count: 34 },
    { name: "Urban Lady ZM", count: 28 },
    { name: "Boss Lady Zambia", count: 19 },
    { name: "Glamour Zambia", count: 23 },
    { name: "Active Zambia", count: 31 },
    { name: "Chic Zambia", count: 27 }
  ],
  sizes: [
    { name: "XS", count: 45 },
    { name: "S", count: 123 },
    { name: "M", count: 189 },
    { name: "L", count: 167 },
    { name: "XL", count: 98 },
    { name: "XXL", count: 34 },
    { name: "Plus Size", count: 56 }
  ],
  colors: [
    { name: "Black", count: 167, color: "#000000" },
    { name: "White", count: 134, color: "#FFFFFF" },
    { name: "Navy", count: 89, color: "#000080" },
    { name: "Pink", count: 78, color: "#FF69B4" },
    { name: "Red", count: 65, color: "#FF0000" },
    { name: "Purple", count: 54, color: "#800080" },
    { name: "Green", count: 43, color: "#008000" },
    { name: "Blue", count: 67, color: "#0066CC" }
  ],
  features: [
    { name: "Wrinkle Resistant", count: 89 },
    { name: "Machine Washable", count: 234 },
    { name: "Stretch Fabric", count: 123 },
    { name: "Breathable", count: 78 },
    { name: "Professional Cut", count: 56 },
    { name: "Designer Quality", count: 45 },
    { name: "Eco-Friendly", count: 32 },
    { name: "Plus Size Available", count: 67 }
  ]
};

export default function WomensModernFilters() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    styles: [],
    brands: [],
    sizes: [],
    colors: [],
    priceRange: [0, 1000],
    ratings: 0,
    features: []
  });

  const [isExpanded, setIsExpanded] = useState({
    categories: true,
    styles: true,
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
      styles: [],
      brands: [],
      sizes: [],
      colors: [],
      priceRange: [0, 1000],
      ratings: 0,
      features: []
    });
  };

  const getActiveFiltersCount = () => {
    return filters.categories.length + 
           filters.styles.length + 
           filters.brands.length + 
           filters.sizes.length + 
           filters.colors.length + 
           filters.features.length + 
           (filters.ratings > 0 ? 1 : 0) +
           (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? 1 : 0);
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
                <Badge className="bg-pink-600">
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
                max={1000}
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

          {/* Categories */}
          <FilterSection
            title="Categories"
            items={filterOptions.categories}
            filterKey="categories"
            icon={ShoppingBag}
          />

          <Separator />

          {/* Styles */}
          <FilterSection
            title="Styles"
            items={filterOptions.styles}
            filterKey="styles"
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
      <Button className="w-full bg-pink-600 hover:bg-pink-700">
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
            Verified Vendors
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
