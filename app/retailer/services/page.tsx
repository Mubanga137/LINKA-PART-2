'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  Copy, 
  Calendar, 
  Clock,
  MapPin,
  Star,
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings,
  Image as ImageIcon,
  Download,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RetailerDashboardLayout from '@/components/retailer/retailer-dashboard-layout';

// Mock service data
const services = [
  {
    id: 'SRV-001',
    name: 'Professional Photography',
    category: 'Photography',
    type: 'appointment',
    description: 'Professional photo sessions for events, portraits, and commercial projects',
    price: {
      basic: 300,
      standard: 600,
      premium: 1200
    },
    duration: {
      basic: '2 hours',
      standard: '4 hours', 
      premium: '8 hours'
    },
    status: 'active',
    bookings: 45,
    revenue: 18900,
    rating: 4.8,
    reviews: 34,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=100&h=100&fit=crop',
    availability: 'available',
    location: 'Lusaka, Zambia',
    created: '2024-01-15',
    updated: '2024-01-20',
    nextBooking: '2024-01-25T10:00:00Z',
    equipment: ['Canon 5D Mark IV', 'Professional Lighting', 'Backdrop'],
    packages: [
      { name: 'Basic Session', price: 300, duration: '2 hours', bookings: 15 },
      { name: 'Standard Session', price: 600, duration: '4 hours', bookings: 20 },
      { name: 'Premium Session', price: 1200, duration: '8 hours', bookings: 10 }
    ]
  },
  {
    id: 'SRV-002',
    name: 'Custom Tailoring',
    category: 'Fashion',
    type: 'appointment',
    description: 'Bespoke tailoring services for traditional and modern clothing',
    price: {
      basic: 150,
      standard: 300,
      premium: 600
    },
    duration: {
      basic: '1 week',
      standard: '2 weeks',
      premium: '3 weeks'
    },
    status: 'active',
    bookings: 67,
    revenue: 15800,
    rating: 4.9,
    reviews: 28,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop',
    availability: 'busy',
    location: 'Kitwe, Zambia',
    created: '2024-01-10',
    updated: '2024-01-18',
    nextBooking: '2024-01-24T14:00:00Z',
    equipment: ['Sewing Machines', 'Measuring Tools', 'Fabric Selection'],
    packages: [
      { name: 'Basic Alterations', price: 150, duration: '1 week', bookings: 25 },
      { name: 'Custom Garment', price: 300, duration: '2 weeks', bookings: 30 },
      { name: 'Complete Wardrobe', price: 600, duration: '3 weeks', bookings: 12 }
    ]
  },
  {
    id: 'SRV-003',
    name: 'Event Planning',
    category: 'Events',
    type: 'project',
    description: 'Complete event planning and coordination services for weddings and corporate events',
    price: {
      basic: 800,
      standard: 1500,
      premium: 3000
    },
    duration: {
      basic: '2-4 weeks',
      standard: '4-8 weeks',
      premium: '8-12 weeks'
    },
    status: 'active',
    bookings: 23,
    revenue: 32400,
    rating: 4.7,
    reviews: 19,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=100&h=100&fit=crop',
    availability: 'available',
    location: 'Lusaka, Zambia',
    created: '2024-01-05',
    updated: '2024-01-19',
    nextBooking: '2024-01-28T09:00:00Z',
    equipment: ['Event Coordination Tools', 'Vendor Network', 'Decoration Supplies'],
    packages: [
      { name: 'Basic Package', price: 800, duration: '2-4 weeks', bookings: 8 },
      { name: 'Premium Package', price: 1500, duration: '4-8 weeks', bookings: 10 },
      { name: 'Luxury Package', price: 3000, duration: '8-12 weeks', bookings: 5 }
    ]
  },
  {
    id: 'SRV-004',
    name: 'Home Cleaning',
    category: 'Home Services',
    type: 'recurring',
    description: 'Professional home cleaning services with flexible scheduling',
    price: {
      basic: 80,
      standard: 150,
      premium: 250
    },
    duration: {
      basic: '2 hours',
      standard: '4 hours',
      premium: '6 hours'
    },
    status: 'active',
    bookings: 156,
    revenue: 18200,
    rating: 4.6,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
    availability: 'available',
    location: 'Ndola, Zambia',
    created: '2024-01-08',
    updated: '2024-01-17',
    nextBooking: '2024-01-23T08:00:00Z',
    equipment: ['Cleaning Supplies', 'Vacuum Cleaners', 'Eco-friendly Products'],
    packages: [
      { name: 'Basic Clean', price: 80, duration: '2 hours', bookings: 60 },
      { name: 'Deep Clean', price: 150, duration: '4 hours', bookings: 70 },
      { name: 'Premium Clean', price: 250, duration: '6 hours', bookings: 26 }
    ]
  },
  {
    id: 'SRV-005',
    name: 'Car Detailing',
    category: 'Automotive',
    type: 'appointment',
    description: 'Professional car washing and detailing services',
    price: {
      basic: 50,
      standard: 120,
      premium: 200
    },
    duration: {
      basic: '1 hour',
      standard: '3 hours',
      premium: '5 hours'
    },
    status: 'low_bookings',
    bookings: 12,
    revenue: 1840,
    rating: 4.4,
    reviews: 8,
    image: 'https://images.unsplash.com/photo-1520340356521-88ad69842a7b?w=100&h=100&fit=crop',
    availability: 'available',
    location: 'Lusaka, Zambia',
    created: '2024-01-12',
    updated: '2024-01-16',
    nextBooking: '2024-01-26T11:00:00Z',
    equipment: ['Pressure Washers', 'Detailing Tools', 'Premium Wax'],
    packages: [
      { name: 'Basic Wash', price: 50, duration: '1 hour', bookings: 5 },
      { name: 'Standard Detail', price: 120, duration: '3 hours', bookings: 5 },
      { name: 'Premium Detail', price: 200, duration: '5 hours', bookings: 2 }
    ]
  },
  {
    id: 'SRV-006',
    name: 'Garden Maintenance',
    category: 'Home Services',
    type: 'recurring',
    description: 'Professional garden and landscaping maintenance services',
    price: {
      basic: 100,
      standard: 200,
      premium: 400
    },
    duration: {
      basic: '2 hours',
      standard: '4 hours',
      premium: '8 hours'
    },
    status: 'paused',
    bookings: 34,
    revenue: 6800,
    rating: 4.5,
    reviews: 12,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&h=100&fit=crop',
    availability: 'unavailable',
    location: 'Livingstone, Zambia',
    created: '2024-01-14',
    updated: '2024-01-21',
    nextBooking: null,
    equipment: ['Gardening Tools', 'Lawn Mower', 'Landscaping Equipment'],
    packages: [
      { name: 'Basic Maintenance', price: 100, duration: '2 hours', bookings: 15 },
      { name: 'Full Service', price: 200, duration: '4 hours', bookings: 15 },
      { name: 'Landscaping', price: 400, duration: '8 hours', bookings: 4 }
    ]
  }
];

const categories = ['All Categories', 'Photography', 'Fashion', 'Events', 'Home Services', 'Automotive', 'Beauty', 'Fitness'];
const statuses = ['All Status', 'Active', 'Paused', 'Low Bookings', 'Draft', 'Inactive'];
const serviceTypes = ['All Types', 'Appointment', 'Project', 'Recurring'];

export default function ServiceManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showAddService, setShowAddService] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case 'paused':
        return <Badge className="bg-yellow-100 text-yellow-700">Paused</Badge>;
      case 'low_bookings':
        return <Badge className="bg-orange-100 text-orange-700">Low Bookings</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-700">Draft</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-700">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'available':
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" />Available</Badge>;
      case 'busy':
        return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="h-3 w-3 mr-1" />Busy</Badge>;
      case 'unavailable':
        return <Badge className="bg-red-100 text-red-700"><XCircle className="h-3 w-3 mr-1" />Unavailable</Badge>;
      default:
        return <Badge>{availability}</Badge>;
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || service.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All Status' || 
                         service.status === selectedStatus.toLowerCase().replace(' ', '_');
    const matchesType = selectedType === 'All Types' || service.type === selectedType.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesStatus && matchesType;
  });

  const handleSelectService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSelectAll = () => {
    setSelectedServices(
      selectedServices.length === filteredServices.length 
        ? [] 
        : filteredServices.map(s => s.id)
    );
  };

  const serviceStats = {
    total: services.length,
    active: services.filter(s => s.status === 'active').length,
    totalBookings: services.reduce((sum, service) => sum + service.bookings, 0),
    totalRevenue: services.reduce((sum, service) => sum + service.revenue, 0),
    averageRating: services.reduce((sum, service) => sum + service.rating, 0) / services.length,
    lowPerforming: services.filter(s => s.status === 'low_bookings').length
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <RetailerDashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Service Management</h1>
            <p className="text-gray-600 mt-1">Manage your service offerings, bookings, and availability</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </Button>
            <Dialog open={showAddService} onOpenChange={setShowAddService}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Service
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Add New Service</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="pricing">Pricing</TabsTrigger>
                    <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="serviceName">Service Name</Label>
                        <Input id="serviceName" placeholder="Enter service name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.slice(1).map(category => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Service Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="appointment">Appointment</SelectItem>
                            <SelectItem value="project">Project</SelectItem>
                            <SelectItem value="recurring">Recurring</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="Service location" />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Service description" rows={3} />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label>Service Images</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Drag and drop images here or click to upload</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="pricing" className="space-y-4">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Service Packages</h3>
                      
                      {['Basic', 'Standard', 'Premium'].map((packageType) => (
                        <Card key={packageType}>
                          <CardHeader>
                            <CardTitle className="text-base">{packageType} Package</CardTitle>
                          </CardHeader>
                          <CardContent className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label>Price (ZMW)</Label>
                              <Input type="number" placeholder="0.00" />
                            </div>
                            <div className="space-y-2">
                              <Label>Duration</Label>
                              <Input placeholder="e.g., 2 hours" />
                            </div>
                            <div className="space-y-2">
                              <Label>Features</Label>
                              <Input placeholder="Package features" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="scheduling" className="space-y-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Availability Status</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select availability" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="available">Available</SelectItem>
                              <SelectItem value="busy">Busy</SelectItem>
                              <SelectItem value="unavailable">Unavailable</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Booking Buffer (minutes)</Label>
                          <Input type="number" placeholder="15" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Working Hours</Label>
                        <div className="grid grid-cols-7 gap-2">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                            <div key={day} className="space-y-2">
                              <Label className="text-xs">{day}</Label>
                              <div className="space-y-1">
                                <Input type="time" className="text-xs" />
                                <Input type="time" className="text-xs" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Equipment/Requirements</Label>
                        <Textarea placeholder="List equipment or special requirements" rows={3} />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setShowAddService(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setShowAddService(false)}>
                    Create Service
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Service Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Services</p>
                  <p className="text-2xl font-bold text-gray-900">{serviceStats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Settings className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-gray-600">{serviceStats.active} active</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{serviceStats.totalBookings}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+12% this month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Service Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">K{(serviceStats.totalRevenue / 1000).toFixed(0)}k</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+8.3% growth</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{serviceStats.averageRating.toFixed(1)}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-gray-600">Excellent rating</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Top Category</p>
                  <p className="text-lg font-bold text-gray-900">Home Services</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-sm text-gray-600">190 bookings</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Needs Attention</p>
                  <p className="text-2xl font-bold text-gray-900">{serviceStats.lowPerforming}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-sm text-gray-600">Low bookings</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search services by name, category, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {selectedServices.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''} selected
                </p>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Bulk Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Update Availability
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Services Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Services ({filteredServices.length})</span>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Columns
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedServices.length === filteredServices.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Price Range</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedServices.includes(service.id)}
                        onCheckedChange={() => handleSelectService(service.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{service.name}</p>
                          <p className="text-sm text-gray-500">Updated {service.updated}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{service.category}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{service.type}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      K{service.price.basic} - K{service.price.premium}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{service.bookings}</p>
                        {service.nextBooking && (
                          <p className="text-sm text-gray-500">
                            Next: {formatDate(service.nextBooking)}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">K{service.revenue.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{service.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({service.reviews})</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(service.status)}</TableCell>
                    <TableCell>{getAvailabilityBadge(service.availability)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedService(service)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Service Details - {service.name}</DialogTitle>
                            </DialogHeader>
                            {selectedService && (
                              <div className="space-y-6">
                                {/* Service Overview */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="flex items-center">
                                        <Settings className="h-5 w-5 mr-2" />
                                        Service Information
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div className="flex items-center space-x-3">
                                        <img
                                          src={selectedService.image}
                                          alt={selectedService.name}
                                          className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div>
                                          <h3 className="font-semibold text-lg">{selectedService.name}</h3>
                                          <p className="text-gray-600">{selectedService.category} • {selectedService.type}</p>
                                          <div className="flex items-center space-x-2 mt-1">
                                            {getStatusBadge(selectedService.status)}
                                            {getAvailabilityBadge(selectedService.availability)}
                                          </div>
                                        </div>
                                      </div>
                                      <p className="text-gray-600">{selectedService.description}</p>
                                      <div className="flex items-center text-sm text-gray-500">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        {selectedService.location}
                                      </div>
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="flex items-center">
                                        <TrendingUp className="h-5 w-5 mr-2" />
                                        Performance Metrics
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <p className="text-sm text-gray-500">Total Bookings</p>
                                          <p className="text-2xl font-bold">{selectedService.bookings}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm text-gray-500">Total Revenue</p>
                                          <p className="text-2xl font-bold">K{selectedService.revenue.toLocaleString()}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm text-gray-500">Average Rating</p>
                                          <div className="flex items-center">
                                            <Star className="h-5 w-5 text-yellow-400 mr-1" />
                                            <span className="text-xl font-bold">{selectedService.rating}</span>
                                            <span className="text-sm text-gray-500 ml-1">({selectedService.reviews} reviews)</span>
                                          </div>
                                        </div>
                                        <div>
                                          <p className="text-sm text-gray-500">Revenue per Booking</p>
                                          <p className="text-xl font-bold">K{(selectedService.revenue / selectedService.bookings).toFixed(0)}</p>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>

                                {/* Service Packages */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle>Service Packages</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                      {selectedService.packages.map((pkg, index) => (
                                        <div key={index} className="p-4 border rounded-lg">
                                          <h4 className="font-semibold">{pkg.name}</h4>
                                          <p className="text-2xl font-bold text-blue-600 my-2">K{pkg.price}</p>
                                          <p className="text-sm text-gray-600 mb-2">{pkg.duration}</p>
                                          <p className="text-sm">
                                            <span className="font-medium">{pkg.bookings}</span> bookings
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </CardContent>
                                </Card>

                                {/* Equipment & Requirements */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle>Equipment & Requirements</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                      {selectedService.equipment.map((item, index) => (
                                        <Badge key={index} variant="outline">{item}</Badge>
                                      ))}
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Service
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              Manage Schedule
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </RetailerDashboardLayout>
  );
}
