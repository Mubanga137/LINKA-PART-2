'use client';

import { useState } from 'react';
import { 
  Image, 
  Play, 
  Star, 
  Heart, 
  Share, 
  Download,
  Eye,
  Grid3X3,
  Maximize2,
  Filter,
  Search,
  Tag,
  Calendar,
  Layers,
  Palette,
  Monitor,
  Smartphone,
  Tablet,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Extended image collection with Builder.io assets
const showcaseImages = [
  {
    id: 1,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F98128766b38440c2b82ee028253dad1b?alt=media&token=da2a294d-684b-459e-a3ac-5464d58348ba&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Hero Banner Design',
    category: 'Hero Banners',
    type: 'banner',
    featured: true,
    tags: ['hero', 'banner', 'main', 'featured'],
    likes: 45,
    views: 234
  },
  {
    id: 2,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Ffd41879ed0824148b6567ea45eed86dd?alt=media&token=9d82da9b-9e16-488b-8742-6189c4183495&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Product Catalog Layout',
    category: 'Product Layouts',
    type: 'layout',
    featured: true,
    tags: ['catalog', 'products', 'grid', 'showcase'],
    likes: 38,
    views: 189
  },
  {
    id: 3,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F97b883546dd64d3c80493e956053fbeb?alt=media&token=797ae84b-e498-4333-8138-39224736e556&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Customer Testimonials',
    category: 'Social Proof',
    type: 'testimonial',
    featured: false,
    tags: ['testimonials', 'reviews', 'social', 'trust'],
    likes: 23,
    views: 156
  },
  {
    id: 4,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F7afcb7b220b94dc4819c2adccee58c43?alt=media&token=88046ee2-61b2-49b3-86eb-bd43f25c76a8&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'About Us Section',
    category: 'Content Sections',
    type: 'content',
    featured: false,
    tags: ['about', 'story', 'company', 'mission'],
    likes: 31,
    views: 198
  },
  {
    id: 5,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F8d4a0a36018e47b480dd4eb9971a8409?alt=media&token=440fe324-ece2-4ec6-b1f2-d21f3aec231b&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Contact Form Design',
    category: 'Forms',
    type: 'form',
    featured: true,
    tags: ['contact', 'form', 'inquiry', 'support'],
    likes: 27,
    views: 143
  },
  {
    id: 6,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F87ecc034ad91401a88eeaabd461b4acf?alt=media&token=eca0dc14-d415-4138-a273-08383373cd93&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Newsletter Signup',
    category: 'Marketing',
    type: 'newsletter',
    featured: false,
    tags: ['newsletter', 'email', 'signup', 'marketing'],
    likes: 19,
    views: 87
  },
  {
    id: 7,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fa482935f31624af2ac9898704d8b7964?alt=media&token=a79a3684-ba20-4911-9f02-2c9bddc5f673&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Feature Highlights',
    category: 'Features',
    type: 'features',
    featured: true,
    tags: ['features', 'benefits', 'highlights', 'selling'],
    likes: 42,
    views: 267
  },
  {
    id: 8,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F46c43429c57643a78b67f1b9c4a55139?alt=media&token=a44e506b-20f9-49c6-8244-d9ccc56f577a&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Pricing Tables',
    category: 'Pricing',
    type: 'pricing',
    featured: false,
    tags: ['pricing', 'plans', 'subscription', 'comparison'],
    likes: 35,
    views: 178
  },
  {
    id: 9,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Ff66f7c691eab40e8b2cbabbb8bdccfea?alt=media&token=8958a50e-7d33-4d24-98e5-d2484a5584e8&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Blog Post Layout',
    category: 'Blog',
    type: 'blog',
    featured: false,
    tags: ['blog', 'articles', 'content', 'reading'],
    likes: 16,
    views: 94
  },
  {
    id: 10,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fa2486aa396f04a7a86e3007a7fd30c62?alt=media&token=b9ad41a7-2c0b-4db3-8c90-8ecf96c23278&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Footer Design',
    category: 'Navigation',
    type: 'footer',
    featured: false,
    tags: ['footer', 'links', 'sitemap', 'contact'],
    likes: 22,
    views: 132
  },
  {
    id: 11,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2Fa47b10410033491ea0a890658686a33f?alt=media&token=cb796b46-8d13-4c53-a367-3fa13bdbdd5a&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Shopping Cart Interface',
    category: 'E-commerce',
    type: 'cart',
    featured: true,
    tags: ['cart', 'shopping', 'checkout', 'purchase'],
    likes: 48,
    views: 289
  },
  {
    id: 12,
    url: 'https://cdn.builder.io/o/assets%2F4bf015b55143432d9c1c69e328364ff3%2F9fb451dfb4fa4876ba0d15c732d1f646?alt=media&token=c62bdac0-2de8-47d0-a166-a3f6da469334&apiKey=4bf015b55143432d9c1c69e328364ff3',
    title: 'Analytics Dashboard',
    category: 'Analytics',
    type: 'dashboard',
    featured: true,
    tags: ['analytics', 'data', 'charts', 'metrics'],
    likes: 56,
    views: 345
  }
];

const categories = [
  'All Categories',
  'Hero Banners',
  'Product Layouts', 
  'Social Proof',
  'Content Sections',
  'Forms',
  'Marketing',
  'Features',
  'Pricing',
  'Blog',
  'Navigation',
  'E-commerce',
  'Analytics'
];

interface ImageShowcaseProps {
  className?: string;
}

export default function ImageShowcase({ className = '' }: ImageShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');

  const filteredImages = showcaseImages.filter(image => {
    const matchesCategory = selectedCategory === 'All Categories' || image.category === selectedCategory;
    const matchesSearch = image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         image.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredImages = showcaseImages.filter(image => image.featured);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Design Showcase</h3>
          <p className="text-slate-600">Explore design templates and components for your storefront</p>
        </div>
        <div className="flex items-center gap-3">
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
              variant={viewMode === 'masonry' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('masonry')}
              className="h-8"
            >
              <Layers className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Images */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            Featured Designs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredImages.slice(0, 4).map((image) => (
              <Dialog key={image.id}>
                <DialogTrigger asChild>
                  <div className="group relative overflow-hidden rounded-lg border border-slate-200 hover:shadow-lg transition-all cursor-pointer">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors">
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="secondary" className="h-6 w-6 p-0">
                          <ZoomIn className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Badge className="bg-white/90 text-slate-700 border-0 text-xs">
                          {image.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>{image.title}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-80 object-cover rounded-lg"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-slate-900 mb-2">Details</h4>
                        <div className="space-y-2 text-sm text-slate-600">
                          <p><span className="font-medium">Category:</span> {image.category}</p>
                          <p><span className="font-medium">Type:</span> {image.type}</p>
                          <p><span className="font-medium">Tags:</span> {image.tags.join(', ')}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Button className="w-full" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Use Template
                        </Button>
                        <Button variant="outline" className="w-full" size="sm">
                          <Heart className="h-4 w-4 mr-2" />
                          Save to Library
                        </Button>
                        <Button variant="outline" className="w-full" size="sm">
                          <Share className="h-4 w-4 mr-2" />
                          Share Design
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search designs by title or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
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
      </div>

      {/* Image Grid */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" 
        : "columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
      }>
        {filteredImages.map((image) => (
          <Dialog key={image.id}>
            <DialogTrigger asChild>
              <Card className="group cursor-pointer hover:shadow-md transition-all duration-200 border-0 break-inside-avoid">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={image.url}
                      alt={image.title}
                      className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                        viewMode === 'grid' ? 'h-40' : 'h-auto'
                      }`}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors">
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="secondary" className="h-6 w-6 p-0">
                          <ZoomIn className="h-3 w-3" />
                        </Button>
                      </div>
                      {image.featured && (
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
                    <p className="text-sm font-medium text-slate-900 truncate">{image.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{image.category}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-3 text-xs text-slate-500">
                        <span className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {image.likes}
                        </span>
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {image.views}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {image.type}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{image.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-80 object-cover rounded-lg"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 mb-2">Design Details</h4>
                    <div className="space-y-2 text-sm text-slate-600">
                      <p><span className="font-medium">Category:</span> {image.category}</p>
                      <p><span className="font-medium">Type:</span> {image.type}</p>
                      <p><span className="font-medium">Tags:</span> {image.tags.join(', ')}</p>
                      <p><span className="font-medium">Views:</span> {image.views}</p>
                      <p><span className="font-medium">Likes:</span> {image.likes}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Use This Design
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <Palette className="h-4 w-4 mr-2" />
                      Customize Colors
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <Heart className="h-4 w-4 mr-2" />
                      Add to Favorites
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <Share className="h-4 w-4 mr-2" />
                      Share Design
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {/* Stats */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-slate-900">{showcaseImages.length}</p>
              <p className="text-sm text-slate-600">Total Designs</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{featuredImages.length}</p>
              <p className="text-sm text-slate-600">Featured Designs</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600">{categories.length - 1}</p>
              <p className="text-sm text-slate-600">Categories</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {showcaseImages.reduce((sum, img) => sum + img.views, 0).toLocaleString()}
              </p>
              <p className="text-sm text-slate-600">Total Views</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
