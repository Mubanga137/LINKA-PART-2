"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChevronDown, 
  ChevronRight, 
  Grid3X3,
  Package,
  Tag,
  TrendingUp,
  Clock,
  Star
} from "lucide-react";
import type { Category, Subcategory } from "@/lib/types";

interface CategoryNavigationProps {
  categories: Category[];
  selectedCategory?: string;
  selectedSubcategory?: string;
  onCategorySelect: (categoryId: string | undefined) => void;
  onSubcategorySelect: (subcategoryId: string | undefined) => void;
  className?: string;
}

export function CategoryNavigation({
  categories,
  selectedCategory,
  selectedSubcategory,
  onCategorySelect,
  onSubcategorySelect,
  className = ""
}: CategoryNavigationProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategoryExpansion = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      onCategorySelect(undefined);
      onSubcategorySelect(undefined);
    } else {
      onCategorySelect(categoryId);
      onSubcategorySelect(undefined);
      // Auto-expand if it has subcategories
      const category = categories.find(c => c.id === categoryId);
      if (category?.subcategories && category.subcategories.length > 0) {
        const newExpanded = new Set(expandedCategories);
        newExpanded.add(categoryId);
        setExpandedCategories(newExpanded);
      }
    }
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    if (selectedSubcategory === subcategoryId) {
      onSubcategorySelect(undefined);
    } else {
      onSubcategorySelect(subcategoryId);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Quick Filters */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Grid3X3 className="h-4 w-4" />
            Quick Filters
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="justify-start h-10"
              onClick={() => {
                // Handle featured products filter
                console.log("Filter by featured");
              }}
            >
              <Star className="h-4 w-4 mr-2 text-yellow-500" />
              <span className="text-left">
                <div className="text-sm font-medium">Featured</div>
                <div className="text-xs text-gray-500">Premium picks</div>
              </span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="justify-start h-10"
              onClick={() => {
                // Handle trending products filter
                console.log("Filter by trending");
              }}
            >
              <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
              <span className="text-left">
                <div className="text-sm font-medium">Trending</div>
                <div className="text-xs text-gray-500">Popular now</div>
              </span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="justify-start h-10"
              onClick={() => {
                // Handle new arrivals filter
                console.log("Filter by new arrivals");
              }}
            >
              <Clock className="h-4 w-4 mr-2 text-blue-500" />
              <span className="text-left">
                <div className="text-sm font-medium">New Arrivals</div>
                <div className="text-xs text-gray-500">Just added</div>
              </span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="justify-start h-10"
              onClick={() => {
                // Handle on sale filter
                console.log("Filter by sale");
              }}
            >
              <Tag className="h-4 w-4 mr-2 text-red-500" />
              <span className="text-left">
                <div className="text-sm font-medium">On Sale</div>
                <div className="text-xs text-gray-500">Best deals</div>
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Package className="h-4 w-4" />
            Categories
          </h3>
          
          {/* All Categories Option */}
          <Button
            variant={!selectedCategory ? "default" : "ghost"}
            className="w-full justify-start mb-2 h-10"
            onClick={() => {
              onCategorySelect(undefined);
              onSubcategorySelect(undefined);
            }}
          >
            <Grid3X3 className="h-4 w-4 mr-3" />
            <span className="flex-1 text-left">All Categories</span>
            <Badge variant="secondary" className="h-5">
              {categories.reduce((total, cat) => total + (cat.productCount || 0), 0)}
            </Badge>
          </Button>

          <div className="space-y-1">
            {categories.map((category) => (
              <div key={category.id}>
                {/* Main Category */}
                <div className="flex items-center">
                  <Button
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    className="flex-1 justify-start h-10"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    {category.icon && (
                      <span className="mr-3 text-base">{category.icon}</span>
                    )}
                    <span className="flex-1 text-left">{category.name}</span>
                    <Badge variant="secondary" className="h-5 mr-2">
                      {category.productCount || 0}
                    </Badge>
                  </Button>
                  
                  {/* Expand/Collapse for subcategories */}
                  {category.subcategories && category.subcategories.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-8 h-8 p-0 ml-1"
                      onClick={() => toggleCategoryExpansion(category.id)}
                    >
                      {expandedCategories.has(category.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>

                {/* Subcategories */}
                {category.subcategories && 
                 category.subcategories.length > 0 && 
                 expandedCategories.has(category.id) && (
                  <div className="ml-6 mt-1 space-y-1">
                    {category.subcategories.map((subcategory) => (
                      <Button
                        key={subcategory.id}
                        variant={selectedSubcategory === subcategory.id ? "default" : "ghost"}
                        size="sm"
                        className="w-full justify-start h-8"
                        onClick={() => handleSubcategoryClick(subcategory.id)}
                      >
                        <span className="flex-1 text-left text-sm">{subcategory.name}</span>
                        <Badge variant="outline" className="h-4 text-xs">
                          {subcategory.productCount || 0}
                        </Badge>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Categories */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Featured Categories</h3>
          <div className="grid grid-cols-1 gap-2">
            {categories.filter(cat => cat.featured).map((category) => (
              <Button
                key={`featured-${category.id}`}
                variant="outline"
                className="h-auto p-3 justify-start"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="flex items-center gap-3 w-full">
                  {category.image ? (
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                      <span className="text-lg">{category.icon}</span>
                    </div>
                  )}
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">{category.name}</div>
                    <div className="text-xs text-gray-500">
                      {category.productCount} products
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Horizontal category navigation for mobile/top of page
export function HorizontalCategoryNav({
  categories,
  selectedCategory,
  onCategorySelect,
  className = ""
}: Omit<CategoryNavigationProps, 'selectedSubcategory' | 'onSubcategorySelect'>) {
  return (
    <div className={`flex gap-2 overflow-x-auto pb-2 ${className}`}>
      <Button
        variant={!selectedCategory ? "default" : "outline"}
        size="sm"
        onClick={() => onCategorySelect(undefined)}
        className="whitespace-nowrap"
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => onCategorySelect(category.id)}
          className="whitespace-nowrap"
        >
          {category.icon && <span className="mr-1">{category.icon}</span>}
          {category.name}
          <Badge variant="secondary" className="ml-2 h-4 text-xs">
            {category.productCount}
          </Badge>
        </Button>
      ))}
    </div>
  );
}
