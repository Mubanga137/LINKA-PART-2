"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  MoreHorizontal,
  ImageIcon,
  AlertCircle,
  CheckCircle,
  Upload,
  X
} from "lucide-react"
import { Product } from "@/lib/types"
import { productService } from "@/services/product-service"

interface ProductFormData {
  name: string
  description: string
  category: string
  subcategory: string
  price: number
  originalPrice?: number
  stockQuantity: number
  features: string[]
  tags: string[]
  variants: {
    size?: string[]
    color?: string[]
    material?: string[]
  }
  shippingInfo: {
    freeShipping: boolean
    estimatedDays: number
    shippingCost: number
  }
}

const initialFormData: ProductFormData = {
  name: '',
  description: '',
  category: '',
  subcategory: '',
  price: 0,
  stockQuantity: 0,
  features: [],
  tags: [],
  variants: {},
  shippingInfo: {
    freeShipping: false,
    estimatedDays: 3,
    shippingCost: 0
  }
}

const categories = [
  { id: 'jewelry-accessories', name: 'Jewelry & Accessories' },
  { id: 'fashion-textiles', name: 'Fashion & Textiles' },
  { id: 'food-beverages', name: 'Food & Beverages' },
  { id: 'agriculture-natural', name: 'Agriculture & Natural' },
  { id: 'tools-hardware', name: 'Tools & Hardware' },
  { id: 'art-culture', name: 'Art & Culture' },
  { id: 'traditional-crafts', name: 'Traditional Crafts' },
]

export function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<ProductFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newFeature, setNewFeature] = useState('')
  const [newTag, setNewTag] = useState('')

  // Load products
  useEffect(() => {
    loadProducts()
  }, [])

  // Filter products
  useEffect(() => {
    let filtered = products

    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (filterCategory) {
      filtered = filtered.filter(product => product.category === filterCategory)
    }

    setFilteredProducts(filtered)
  }, [products, searchQuery, filterCategory])

  const loadProducts = async () => {
    setIsLoading(true)
    try {
      const result = await productService.getProducts()
      setProducts(result.products)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const productData = {
        ...formData,
        image: '/placeholder.svg?height=400&width=400&text=' + encodeURIComponent(formData.name),
        inStock: formData.stockQuantity > 0,
        retailerId: 'ret-current',
        retailerName: 'Your Business',
        retailerLocation: 'Lusaka, Zambia',
        rating: 0,
        reviewCount: 0
      }

      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, productData)
      } else {
        await productService.addProduct(productData)
      }

      await loadProducts()
      setIsAddDialogOpen(false)
      setEditingProduct(null)
      setFormData(initialFormData)
    } catch (error) {
      console.error('Error saving product:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      subcategory: product.subcategory || '',
      price: product.price,
      originalPrice: product.originalPrice,
      stockQuantity: product.stockQuantity,
      features: product.features,
      tags: product.tags,
      variants: product.variants || {},
      shippingInfo: product.shippingInfo
    })
    setIsAddDialogOpen(true)
  }

  const handleDelete = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(productId)
        await loadProducts()
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()]
      })
      setNewFeature('')
    }
  }

  const removeFeature = (feature: string) => {
    setFormData({
      ...formData,
      features: formData.features.filter(f => f !== feature)
    })
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      })
      setNewTag('')
    }
  }

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    })
  }

  const getStockBadge = (product: Product) => {
    if (!product.inStock) {
      return <Badge variant="destructive">Out of Stock</Badge>
    }
    if (product.stockQuantity <= 5) {
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Low Stock</Badge>
    }
    return <Badge className="bg-green-100 text-green-800 border-green-200">In Stock</Badge>
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-white/30">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Product Management
          </CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </DialogTitle>
                <DialogDescription>
                  {editingProduct ? 'Update your product information' : 'Create a new product for your store'}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="shipping">Shipping</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Product Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(category => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        rows={3}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="price">Price (ZMW) *</Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="originalPrice">Original Price (ZMW)</Label>
                        <Input
                          id="originalPrice"
                          type="number"
                          value={formData.originalPrice || ''}
                          onChange={(e) => setFormData({...formData, originalPrice: parseFloat(e.target.value) || undefined})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="stock">Stock Quantity *</Label>
                        <Input
                          id="stock"
                          type="number"
                          value={formData.stockQuantity}
                          onChange={(e) => setFormData({...formData, stockQuantity: parseInt(e.target.value) || 0})}
                          required
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="space-y-4">
                    <div>
                      <Label>Features</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          placeholder="Add a feature"
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                        />
                        <Button type="button" variant="outline" onClick={addFeature}>
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {feature}
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => removeFeature(feature)} 
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Tags</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Add a tag"
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        />
                        <Button type="button" variant="outline" onClick={addTag}>
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-1">
                            #{tag}
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => removeTag(tag)} 
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="shipping" className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="freeShipping"
                        checked={formData.shippingInfo.freeShipping}
                        onCheckedChange={(checked) => setFormData({
                          ...formData,
                          shippingInfo: { ...formData.shippingInfo, freeShipping: checked as boolean }
                        })}
                      />
                      <Label htmlFor="freeShipping">Free Shipping</Label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="estimatedDays">Estimated Delivery Days</Label>
                        <Input
                          id="estimatedDays"
                          type="number"
                          value={formData.shippingInfo.estimatedDays}
                          onChange={(e) => setFormData({
                            ...formData,
                            shippingInfo: { ...formData.shippingInfo, estimatedDays: parseInt(e.target.value) || 3 }
                          })}
                        />
                      </div>
                      {!formData.shippingInfo.freeShipping && (
                        <div>
                          <Label htmlFor="shippingCost">Shipping Cost (ZMW)</Label>
                          <Input
                            id="shippingCost"
                            type="number"
                            value={formData.shippingInfo.shippingCost}
                            onChange={(e) => setFormData({
                              ...formData,
                              shippingInfo: { ...formData.shippingInfo, shippingCost: parseFloat(e.target.value) || 0 }
                            })}
                          />
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsAddDialogOpen(false)
                      setEditingProduct(null)
                      setFormData(initialFormData)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : editingProduct ? 'Update' : 'Create'} Product
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Products List */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                {searchQuery || filterCategory ? 'No products found' : 'No products yet'}
              </h3>
              <p className="text-slate-600 mb-4">
                {searchQuery || filterCategory 
                  ? 'Try adjusting your search or filters' 
                  : 'Add your first product to get started'
                }
              </p>
              {!searchQuery && !filterCategory && (
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Product
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group">
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-medium text-slate-900">{product.name}</h4>
                      <p className="text-sm text-slate-600 line-clamp-1">{product.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {categories.find(c => c.id === product.category)?.name}
                        </Badge>
                        {getStockBadge(product)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-bold text-slate-900">ZMW {product.price.toLocaleString()}</div>
                      <div className="text-sm text-slate-600">{product.stockQuantity} in stock</div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Product
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(product)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Product
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Summary */}
          {filteredProducts.length > 0 && (
            <div className="border-t pt-4 mt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-slate-900">{filteredProducts.length}</div>
                  <div className="text-sm text-slate-600">Total Products</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">
                    {filteredProducts.filter(p => p.inStock).length}
                  </div>
                  <div className="text-sm text-slate-600">In Stock</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-yellow-600">
                    {filteredProducts.filter(p => p.inStock && p.stockQuantity <= 5).length}
                  </div>
                  <div className="text-sm text-slate-600">Low Stock</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-red-600">
                    {filteredProducts.filter(p => !p.inStock).length}
                  </div>
                  <div className="text-sm text-slate-600">Out of Stock</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
