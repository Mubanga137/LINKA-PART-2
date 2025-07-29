'use client';

import { useState } from 'react';
import { 
  Search, 
  Send, 
  Paperclip, 
  Star, 
  Archive, 
  MoreHorizontal, 
  Phone, 
  Video, 
  Settings, 
  Filter,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Package,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Smile
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import RetailerDashboardLayout from '@/components/retailer/retailer-dashboard-layout';

// Mock conversations data
const conversations = [
  {
    id: 'CONV-001',
    customer: {
      name: 'Alexandra Chen',
      email: 'alexandra.chen@email.com',
      avatar: 'AC',
      isOnline: true,
      lastSeen: '2024-01-22T15:30:00Z'
    },
    lastMessage: {
      content: 'Thank you for the quick delivery! The headphones are amazing.',
      timestamp: '2024-01-22T15:30:00Z',
      sender: 'customer',
      type: 'text'
    },
    unreadCount: 0,
    status: 'active',
    priority: 'normal',
    tags: ['satisfied', 'delivery'],
    orderId: 'ORD-2024-001',
    rating: 5
  },
  {
    id: 'CONV-002',
    customer: {
      name: 'Marcus Johnson',
      email: 'marcus.j@email.com',
      avatar: 'MJ',
      isOnline: false,
      lastSeen: '2024-01-22T10:15:00Z'
    },
    lastMessage: {
      content: 'When will my smartwatch be shipped?',
      timestamp: '2024-01-22T10:15:00Z',
      sender: 'customer',
      type: 'text'
    },
    unreadCount: 2,
    status: 'pending',
    priority: 'high',
    tags: ['shipping', 'inquiry'],
    orderId: 'ORD-2024-002',
    rating: null
  },
  {
    id: 'CONV-003',
    customer: {
      name: 'Sofia Rodriguez',
      email: 'sofia.r@email.com',
      avatar: 'SR',
      isOnline: true,
      lastSeen: '2024-01-22T14:45:00Z'
    },
    lastMessage: {
      content: 'Can I get a refund for the damaged item?',
      timestamp: '2024-01-22T14:45:00Z',
      sender: 'customer',
      type: 'text'
    },
    unreadCount: 1,
    status: 'urgent',
    priority: 'high',
    tags: ['refund', 'damaged'],
    orderId: 'ORD-2024-003',
    rating: null
  },
  {
    id: 'CONV-004',
    customer: {
      name: 'David Kim',
      email: 'david.kim@email.com',
      avatar: 'DK',
      isOnline: false,
      lastSeen: '2024-01-21T18:20:00Z'
    },
    lastMessage: {
      content: 'Perfect! The camera lens exceeded my expectations.',
      timestamp: '2024-01-21T18:20:00Z',
      sender: 'customer',
      type: 'text'
    },
    unreadCount: 0,
    status: 'resolved',
    priority: 'normal',
    tags: ['satisfied', 'review'],
    orderId: 'ORD-2024-004',
    rating: 5
  },
  {
    id: 'CONV-005',
    customer: {
      name: 'Emma Thompson',
      email: 'emma.t@email.com',
      avatar: 'ET',
      isOnline: false,
      lastSeen: '2024-01-21T12:30:00Z'
    },
    lastMessage: {
      content: 'Hi, I need help with my order cancellation.',
      timestamp: '2024-01-21T12:30:00Z',
      sender: 'customer',
      type: 'text'
    },
    unreadCount: 3,
    status: 'pending',
    priority: 'normal',
    tags: ['cancellation', 'help'],
    orderId: 'ORD-2024-005',
    rating: null
  }
];

// Mock messages for selected conversation
const mockMessages = [
  {
    id: 'MSG-001',
    content: 'Hi! I just received my order and I\'m really happy with the product quality.',
    timestamp: '2024-01-22T14:00:00Z',
    sender: 'customer',
    type: 'text'
  },
  {
    id: 'MSG-002',
    content: 'Thank you so much for your feedback! We\'re thrilled to hear you\'re satisfied with your purchase. Is there anything else we can help you with?',
    timestamp: '2024-01-22T14:15:00Z',
    sender: 'retailer',
    type: 'text'
  },
  {
    id: 'MSG-003',
    content: 'Actually, yes! Could you recommend similar products? I might be interested in more items from your store.',
    timestamp: '2024-01-22T14:20:00Z',
    sender: 'customer',
    type: 'text'
  },
  {
    id: 'MSG-004',
    content: 'Absolutely! Based on your recent purchase, I think you might like these products:',
    timestamp: '2024-01-22T14:25:00Z',
    sender: 'retailer',
    type: 'text'
  },
  {
    id: 'MSG-005',
    content: 'Product recommendations sent',
    timestamp: '2024-01-22T14:26:00Z',
    sender: 'retailer',
    type: 'product_recommendation',
    productData: [
      { name: 'Wireless Gaming Mouse', price: 79.99, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop' },
      { name: 'Ergonomic Office Chair', price: 199.99, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop' }
    ]
  },
  {
    id: 'MSG-006',
    content: 'Thank you for the quick delivery! The headphones are amazing.',
    timestamp: '2024-01-22T15:30:00Z',
    sender: 'customer',
    type: 'text'
  }
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>;
      case 'urgent':
        return <Badge className="bg-red-100 text-red-700">Urgent</Badge>;
      case 'resolved':
        return <Badge className="bg-blue-100 text-blue-700">Resolved</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="outline" className="border-red-200 text-red-700">High</Badge>;
      case 'normal':
        return <Badge variant="outline" className="border-gray-200 text-gray-700">Normal</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-blue-200 text-blue-700">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.lastMessage.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || conv.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || conv.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 3600);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: `MSG-${Date.now()}`,
      content: newMessage,
      timestamp: new Date().toISOString(),
      sender: 'retailer' as const,
      type: 'text' as const
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
  const urgentCount = conversations.filter(conv => conv.status === 'urgent').length;
  const resolvedToday = conversations.filter(conv => conv.status === 'resolved').length;

  return (
    <RetailerDashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customer Messages</h1>
            <p className="text-gray-600 mt-1">Communicate with your customers and manage support requests</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Message Settings
            </Button>
          </div>
        </div>

        {/* Message Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Conversations</p>
                  <p className="text-2xl font-bold text-gray-900">{conversations.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                  <p className="text-2xl font-bold text-gray-900">{totalUnread}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Urgent Messages</p>
                  <p className="text-2xl font-bold text-gray-900">{urgentCount}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved Today</p>
                  <p className="text-2xl font-bold text-gray-900">{resolvedToday}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Messages Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Conversations</CardTitle>
                <Button variant="ghost" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex space-x-2">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterPriority} onValueChange={setFilterPriority}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[450px]">
                <div className="space-y-2 p-3">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedConversation.id === conversation.id
                          ? 'bg-blue-50 border border-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                              {conversation.customer.avatar}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.customer.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {conversation.customer.name}
                            </p>
                            <div className="flex items-center space-x-1">
                              {conversation.unreadCount > 0 && (
                                <Badge className="bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center p-0">
                                  {conversation.unreadCount}
                                </Badge>
                              )}
                              <span className="text-xs text-gray-500">
                                {formatTime(conversation.lastMessage.timestamp)}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 truncate mt-1">
                            {conversation.lastMessage.content}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2">
                              {getStatusBadge(conversation.status)}
                              {getPriorityBadge(conversation.priority)}
                            </div>
                            {conversation.orderId && (
                              <span className="text-xs text-gray-400 font-mono">
                                {conversation.orderId}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Message Thread */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                      {selectedConversation.customer.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedConversation.customer.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{selectedConversation.customer.email}</span>
                      {selectedConversation.customer.isOnline ? (
                        <Badge className="bg-green-100 text-green-700 text-xs">Online</Badge>
                      ) : (
                        <span>Last seen {formatTime(selectedConversation.customer.lastSeen)}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Package className="mr-2 h-4 w-4" />
                        View Orders
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Star className="mr-2 h-4 w-4" />
                        Mark Important
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="mr-2 h-4 w-4" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Flag className="mr-2 h-4 w-4" />
                        Report
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(selectedConversation.status)}
                {getPriorityBadge(selectedConversation.priority)}
                {selectedConversation.orderId && (
                  <Badge variant="outline" className="font-mono text-xs">
                    {selectedConversation.orderId}
                  </Badge>
                )}
                {selectedConversation.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <ScrollArea className="h-[350px] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'retailer' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${
                        message.sender === 'retailer'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      } rounded-lg p-3`}>
                        {message.type === 'text' && (
                          <p className="text-sm">{message.content}</p>
                        )}
                        {message.type === 'product_recommendation' && (
                          <div>
                            <p className="text-sm mb-3">{message.content}</p>
                            <div className="space-y-2">
                              {message.productData?.map((product, index) => (
                                <div key={index} className="flex items-center space-x-2 p-2 bg-white bg-opacity-20 rounded">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-8 h-8 rounded object-cover"
                                  />
                                  <div className="flex-1">
                                    <p className="text-xs font-medium">{product.name}</p>
                                    <p className="text-xs opacity-80">K{product.price}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <p className={`text-xs mt-2 ${
                          message.sender === 'retailer' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <Separator />
              
              {/* Message Input */}
              <div className="p-4">
                <div className="flex items-end space-x-2">
                  <div className="flex-1">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      rows={2}
                      className="resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Quick Responses */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setNewMessage('Thank you for your message. I\'ll look into this right away.')}
                  >
                    Thank you
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setNewMessage('I apologize for any inconvenience. Let me help you resolve this.')}
                  >
                    Apologize
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setNewMessage('Your order is being processed and will be shipped soon.')}
                  >
                    Order Update
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setNewMessage('Could you please provide more details about your concern?')}
                  >
                    More Info
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RetailerDashboardLayout>
  );
}
