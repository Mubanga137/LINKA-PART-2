'use client';

import { useState } from 'react';
import { 
  Image, 
  Play, 
  Download, 
  ExternalLink, 
  Grid3X3, 
  List, 
  Search,
  Filter,
  Star,
  Heart,
  Share,
  Eye,
  Calendar,
  Tag,
  Folder,
  X,
  ZoomIn,
  Copy,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Enhanced media collection with all Builder.io images
const mediaGallery = [
  {
    id: 1,
    type: 'image',
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Ff471e062ad604e9c996936feac1eb621?alt=media&token=b92aee50-5aa4-4575-a0a7-2b3788845764&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Premium Product Showcase',
    category: 'Product Photography',
    tags: ['premium', 'showcase', 'hero'],
    featured: true,
    likes: 24,
    views: 156
  },
  {
    id: 2,
    type: 'image',
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F3a68a90c29e3407f8f5961afad538017?alt=media&token=a352b86e-30a7-4151-b8ff-b38efd611689&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Modern Dashboard Interface',
    category: 'UI/UX Design',
    tags: ['dashboard', 'modern', 'interface'],
    featured: true,
    likes: 31,
    views: 203
  },
  {
    id: 3,
    type: 'image',
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F953e6e7d42204537aab0b86bdf782c19?alt=media&token=60436035-de82-4aea-8969-8bb060f648a5&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Analytics Dashboard',
    category: 'Data Visualization',
    tags: ['analytics', 'charts', 'data'],
    featured: false,
    likes: 18,
    views: 89
  },
  {
    id: 4,
    type: 'image',
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F3794d94202814377b4e0c480ba72213e?alt=media&token=5d89d827-38a3-4998-bf2e-d6b1d92f8870&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'E-commerce Platform',
    category: 'Web Design',
    tags: ['ecommerce', 'platform', 'storefront'],
    featured: true,
    likes: 42,
    views: 287
  },
  {
    id: 5,
    type: 'image',
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F721f4a2ebe1e4fbf999f24f7d16922ab?alt=media&token=1e2e6825-24f1-411b-b70f-85b7dd56db4d&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Mobile App Interface',
    category: 'Mobile Design',
    tags: ['mobile', 'app', 'responsive'],
    featured: false,
    likes: 27,
    views: 134
  },
  {
    id: 6,
    type: 'image',
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fb6fecd4911564203a2435baeba3c64e2?alt=media&token=ee5aa1bc-872d-495f-9321-26e903e18679&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Product Gallery Layout',
    category: 'Layout Design',
    tags: ['gallery', 'products', 'grid'],
    featured: false,
    likes: 15,
    views: 72
  },
  {
    id: 7,
    type: 'image',
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F0f9623428c6e4852a31f7876eb018bc0?alt=media&token=18a2d99b-324d-4c0d-a1b6-2d0f9906f94e&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Customer Experience Flow',
    category: 'UX Design',
    tags: ['customer', 'experience', 'flow'],
    featured: true,
    likes: 33,
    views: 198
  },
  {
    id: 8,
    type: 'image',
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F19392460c40948ff86945d7ed1b5942d?alt=media&token=71f43c80-a3b0-4d5f-a877-7c356569c30f&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Brand Identity System',
    category: 'Branding',
    tags: ['brand', 'identity', 'system'],
    featured: false,
    likes: 21,
    views: 115
  },
  {
    id: 9,
    type: 'image',
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fdf7de63f76b548f78c9a2f70d03c0bc3?alt=media&token=306ff93d-0f1e-4702-bf3c-3076675e8434&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Marketing Campaign Assets',
    category: 'Marketing',
    tags: ['marketing', 'campaign', 'assets'],
    featured: false,
    likes: 19,
    views: 93
  },
  {
    id: 10,
    type: 'image',
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F0862f57d336d4ea8b444091bf59f5f9c?alt=media&token=eb8dff75-d57a-4900-ade8-22e5b134176a&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Social Media Templates',
    category: 'Social Media',
    tags: ['social', 'templates', 'content'],
    featured: false,
    likes: 26,
    views: 147
  },
  {
    id: 11,
    type: 'image',
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F7da17be1bdea47e4a6badc72c0e36159?alt=media&token=f39ebc04-38d1-4013-9878-8c1c03faca86&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Icon Collection Set',
    category: 'Icons',
    tags: ['icons', 'collection', 'ui'],
    featured: false,
    likes: 14,
    views: 67
  },
  {
    id: 12,
    type: 'image',
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F6983e3dfa4fd442ebc4868d9682994c5?alt=media&token=13373b9a-ba8e-4ad6-ad27-75a0b4ec384a&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Data Visualization Charts',
    category: 'Data Visualization',
    tags: ['charts', 'data', 'visualization'],
    featured: true,
    likes: 38,
    views: 224
  }
];

const categories = [
  'All Categories',
  'Product Photography',
  'UI/UX Design',
  'Data Visualization',
  'Web Design',
  'Mobile Design',
  'Layout Design',
  'Branding',
  'Marketing',
  'Social Media',
  'Icons'
];

export default function EnhancedMediaGallery() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const filteredMedia = mediaGallery.filter(item => {
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredMedia = mediaGallery.filter(item => item.featured);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Media Gallery</h2>
          <p className="text-slate-600">Manage your store's visual assets and media content</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Media
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600">
            <Image className="h-4 w-4 mr-2" />
            Add Image
          </Button>
        </div>
      </div>

      {/* Featured Media Carousel */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            Featured Media
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredMedia.map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded-lg border border-slate-200 hover:shadow-md transition-all">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors">
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Badge className="bg-white/90 text-slate-700 border-0 text-xs">
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search media by title or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
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

      {/* Media Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredMedia.map((item) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <Card className="group cursor-pointer hover:shadow-md transition-all duration-200 border-0">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors">
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="secondary" className="h-6 w-6 p-0">
                            <ZoomIn className="h-3 w-3" />
                          </Button>
                        </div>
                        {item.featured && (
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-slate-900 truncate">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{item.category}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-3 text-xs text-slate-500">
                          <span className="flex items-center">
                            <Heart className="h-3 w-3 mr-1" />
                            {item.likes}
                          </span>
                          <span className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {item.views}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>{item.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-900 mb-2">Details</p>
                      <div className="space-y-2 text-sm text-slate-600">
                        <p><span className="font-medium">Category:</span> {item.category}</p>
                        <p><span className="font-medium">Tags:</span> {item.tags.join(', ')}</p>
                        <p><span className="font-medium">Views:</span> {item.views}</p>
                        <p><span className="font-medium">Likes:</span> {item.likes}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy URL
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMedia.map((item) => (
            <Card key={item.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.category}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {item.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right text-sm text-slate-500">
                    <p className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {item.views}
                    </p>
                    <p className="flex items-center mt-1">
                      <Heart className="h-3 w-3 mr-1" />
                      {item.likes}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Stats Summary */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{mediaGallery.length}</p>
              <p className="text-sm text-slate-600">Total Media</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">{featuredMedia.length}</p>
              <p className="text-sm text-slate-600">Featured Items</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{categories.length - 1}</p>
              <p className="text-sm text-slate-600">Categories</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {mediaGallery.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
              </p>
              <p className="text-sm text-slate-600">Total Views</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
