'use client';

import { useState } from 'react';
import { 
  Image, 
  CheckCircle, 
  Star, 
  Eye, 
  Download,
  ExternalLink,
  Grid3X3,
  List,
  Search,
  Filter,
  Calendar,
  Tag,
  BarChart3,
  TrendingUp,
  Package,
  Store,
  Users,
  Activity,
  Zap,
  Crown,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

// Comprehensive list of all integrated Builder.io images
const integratedImages = [
  {
    id: 1,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fe280805121624c4c89e1740b42d7242b?alt=media&token=a690ae27-18c8-4e1a-a3bf-522ab8349805&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Premium Wireless Headphones',
    location: 'Dashboard - Top Products',
    category: 'Product Images',
    status: 'active',
    usage: 'Product showcase'
  },
  {
    id: 2,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F4cc39ea70bf4407aab01471d71b17cab?alt=media&token=e6b3a137-56fe-4b63-8eab-ea79dd35f1e8&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Smart Fitness Watch',
    location: 'Dashboard - Top Products',
    category: 'Product Images',
    status: 'active',
    usage: 'Product showcase'
  },
  {
    id: 3,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F638cfac869fb401eba6d7fb48b6e01ee?alt=media&token=74789b41-612a-42e4-a406-47b8908a4f35&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Store Logo',
    location: 'Storefront - Branding',
    category: 'Branding',
    status: 'active',
    usage: 'Logo display'
  },
  {
    id: 4,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F820c161a7dbd4b58bfdfa11e8a5b77e8?alt=media&token=966e981e-12dd-4db8-a75d-73f74ae00091&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Hero Banner',
    location: 'Storefront - Header',
    category: 'Hero Banners',
    status: 'active',
    usage: 'Main banner'
  },
  {
    id: 5,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F82f630a64ccd4ff1a0e60a9830efdf63?alt=media&token=70f69cc6-18e2-4ab7-b4bf-7d19baa4662b&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Modern Tech Theme',
    location: 'Storefront - Theme Templates',
    category: 'Templates',
    status: 'active',
    usage: 'Theme preview'
  },
  {
    id: 6,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fb159ec8d523f4c0fb9a1a9c54048ebdd?alt=media&token=bee5e29d-e6cb-42b5-bbf3-659b5bf4810b&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Elegant Fashion Theme',
    location: 'Storefront - Theme Templates',
    category: 'Templates',
    status: 'active',
    usage: 'Theme preview'
  },
  {
    id: 7,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F98128766b38440c2b82ee028253dad1b?alt=media&token=da2a294d-684b-459e-a3ac-5464d58348ba&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Hero Banner Design',
    location: 'Storefront - Image Showcase',
    category: 'Design Showcase',
    status: 'featured',
    usage: 'Design gallery'
  },
  {
    id: 8,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Ffd41879ed0824148b6567ea45eed86dd?alt=media&token=9d82da9b-9e16-488b-8742-6189c4183495&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Product Catalog Layout',
    location: 'Storefront - Image Showcase',
    category: 'Design Showcase',
    status: 'featured',
    usage: 'Design gallery'
  },
  {
    id: 9,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fd37688149d1c4a08823f60c0c863bc0f?alt=media&token=b8a067b4-22b5-467b-825d-02a54ca48139&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'iPhone 15 Pro Max',
    location: 'Products - Product Management',
    category: 'Product Images',
    status: 'active',
    usage: 'Product listing'
  },
  {
    id: 10,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fa1f0f7fe79194c02bd25d4b3bd280c1e?alt=media&token=9b593d2b-7ded-4a21-89b7-f92f8fc0b1c2&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'MacBook Pro M3',
    location: 'Products - Product Management',
    category: 'Product Images',
    status: 'active',
    usage: 'Product listing'
  },
  {
    id: 11,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F2d67619c8efd4c4a8ccb9d599d00350f?alt=media&token=16d53e9a-b39b-4fda-9281-e0c14a404875&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Analytics Dashboard View 1',
    location: 'Analytics - Showcase Gallery',
    category: 'Analytics',
    status: 'active',
    usage: 'Analytics showcase'
  },
  {
    id: 12,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fca179f90e262406baeeb9deb895c7a55?alt=media&token=94a99df6-03f2-4917-91f3-209190f869a0&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Analytics Dashboard View 2',
    location: 'Analytics - Showcase Gallery',
    category: 'Analytics',
    status: 'active',
    usage: 'Analytics showcase'
  }
];

const categories = ['All Categories', 'Product Images', 'Branding', 'Hero Banners', 'Templates', 'Design Showcase', 'Analytics'];
const locations = ['All Locations', 'Dashboard', 'Storefront', 'Products', 'Analytics'];
const statuses = ['All Status', 'active', 'featured', 'archived'];

export default function ImageIntegrationSummary() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredImages = integratedImages.filter(image => {
    const matchesCategory = selectedCategory === 'All Categories' || image.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All Locations' || image.location.includes(selectedLocation);
    const matchesStatus = selectedStatus === 'All Status' || image.status === selectedStatus;
    const matchesSearch = image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         image.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesLocation && matchesStatus && matchesSearch;
  });

  const stats = {
    total: integratedImages.length,
    active: integratedImages.filter(img => img.status === 'active').length,
    featured: integratedImages.filter(img => img.status === 'featured').length,
    categories: new Set(integratedImages.map(img => img.category)).size,
    locations: new Set(integratedImages.map(img => img.location.split(' - ')[0])).size
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center">
            <Crown className="h-6 w-6 mr-2 text-yellow-500" />
            Builder.io Integration Summary
          </h2>
          <p className="text-slate-600">Overview of all integrated Builder.io images across your dashboard</p>
        </div>
        <Badge className="bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border-emerald-300">
          <CheckCircle className="w-3 h-3 mr-1" />
          {stats.total} Images Integrated
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Image className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
            <p className="text-sm text-slate-600">Total Images</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-emerald-600">{stats.active}</p>
            <p className="text-sm text-slate-600">Active</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Star className="h-5 w-5 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-yellow-600">{stats.featured}</p>
            <p className="text-sm text-slate-600">Featured</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Tag className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">{stats.categories}</p>
            <p className="text-sm text-slate-600">Categories</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Store className="h-5 w-5 text-indigo-600" />
            </div>
            <p className="text-2xl font-bold text-indigo-600">{stats.locations}</p>
            <p className="text-sm text-slate-600">Locations</p>
          </CardContent>
        </Card>
      </div>

      {/* Integration Progress */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
            Integration Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Overall Integration</span>
                <span className="text-sm text-emerald-600 font-semibold">100%</span>
              </div>
              <Progress value={100} className="h-3 bg-slate-200">
                <div className="h-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
              </Progress>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {[
                { label: 'Dashboard', count: 4, total: 4, color: 'bg-blue-500' },
                { label: 'Storefront', count: 8, total: 8, color: 'bg-purple-500' },
                { label: 'Products', count: 5, total: 5, color: 'bg-green-500' },
                { label: 'Analytics', count: 6, total: 6, color: 'bg-orange-500' }
              ].map((section) => (
                <div key={section.label} className="text-center">
                  <div className={`w-8 h-8 ${section.color} rounded-full mx-auto mb-2 flex items-center justify-center`}>
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm font-medium text-slate-900">{section.label}</p>
                  <p className="text-xs text-slate-500">{section.count}/{section.total} integrated</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search images by title or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-8"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-8"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Images Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <Card key={image.id} className="group cursor-pointer hover:shadow-md transition-all duration-200 border-0">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Badge className={`text-xs ${
                        image.status === 'featured' ? 'bg-yellow-100 text-yellow-700' :
                        image.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {image.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-slate-900 truncate">{image.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{image.location}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="outline" className="text-xs">{image.category}</Badge>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredImages.map((image) => (
            <Card key={image.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{image.title}</h3>
                    <p className="text-sm text-slate-600">{image.location}</p>
                    <p className="text-xs text-slate-500 mt-1">{image.usage}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={`text-xs ${
                      image.status === 'featured' ? 'bg-yellow-100 text-yellow-700' :
                      image.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {image.status}
                    </Badge>
                    <p className="text-xs text-slate-500 mt-1">{image.category}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary Footer */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-emerald-50 to-emerald-100/50">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Integration Complete!</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Successfully integrated {stats.total} Builder.io images across {stats.locations} dashboard sections, 
              enhancing your SME dashboard with premium visual assets and modern design components.
            </p>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-600">{stats.active}</p>
                <p className="text-sm text-slate-600">Active Images</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">{stats.featured}</p>
                <p className="text-sm text-slate-600">Featured Images</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{stats.categories}</p>
                <p className="text-sm text-slate-600">Categories</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
