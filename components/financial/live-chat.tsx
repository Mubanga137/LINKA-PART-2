"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  MessageCircle, 
  Send, 
  X, 
  Minimize2, 
  Maximize2,
  Phone,
  Video,
  Paperclip,
  Smile,
  MoreVertical,
  CheckCheck,
  Check,
  Clock,
  Users,
  Star,
  Headphones
} from "lucide-react"

interface Message {
  id: string
  content: string
  sender: 'user' | 'agent'
  timestamp: Date
  status: 'sending' | 'sent' | 'delivered' | 'read'
  type: 'text' | 'file' | 'quick-reply'
}

interface Agent {
  id: string
  name: string
  title: string
  avatar: string
  status: 'online' | 'away' | 'busy'
  rating: number
  specialties: string[]
  responseTime: string
}

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [currentMessage, setCurrentMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm Sarah, your financial advisor. How can I help you today?",
      sender: 'agent',
      timestamp: new Date(Date.now() - 60000),
      status: 'delivered',
      type: 'text'
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentAgent: Agent = {
    id: "agent-1",
    name: "Sarah Nakato",
    title: "Senior Financial Advisor",
    avatar: "/avatars/sarah.jpg",
    status: 'online',
    rating: 4.9,
    specialties: ["Loans", "Investments", "Insurance", "Tax Planning"],
    responseTime: "< 2 min"
  }

  const quickReplies = [
    "I need help with loans",
    "Tell me about investments",
    "Insurance options",
    "Tax planning advice",
    "Business banking"
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setUnreadCount(messages.filter(m => m.sender === 'agent' && m.status !== 'read').length)
    } else {
      setUnreadCount(0)
    }
  }, [isOpen, messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = (content: string) => {
    if (!content.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date(),
      status: 'sending',
      type: 'text'
    }

    setMessages(prev => [...prev, newMessage])
    setCurrentMessage("")

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => prev.map(m => 
        m.id === newMessage.id ? { ...m, status: 'sent' } : m
      ))
    }, 500)

    setTimeout(() => {
      setMessages(prev => prev.map(m => 
        m.id === newMessage.id ? { ...m, status: 'delivered' } : m
      ))
    }, 1000)

    // Simulate agent typing
    setTimeout(() => {
      setIsTyping(true)
    }, 1500)

    // Simulate agent response
    setTimeout(() => {
      setIsTyping(false)
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAgentResponse(content),
        sender: 'agent',
        timestamp: new Date(),
        status: 'delivered',
        type: 'text'
      }
      setMessages(prev => [...prev, agentResponse])
    }, 3000)
  }

  const getAgentResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('loan')) {
      return "I'd be happy to help you with loan options! We have personal loans starting from 15% APR with quick approval. What type of loan are you interested in?"
    } else if (message.includes('investment')) {
      return "Great choice thinking about investments! We offer various investment products including unit trusts, government bonds, and LuSE stocks. What's your risk tolerance?"
    } else if (message.includes('insurance')) {
      return "We provide comprehensive insurance coverage including health, motor, and life insurance. Let me know your specific needs and I'll recommend the best options."
    } else if (message.includes('business')) {
      return "For business banking, we offer specialized accounts, business loans, and merchant services. Are you looking to start a new business or expand an existing one?"
    } else {
      return "Thank you for your message! I'm here to help with all your financial needs. Could you tell me more about what specific financial service you're looking for?"
    }
  }

  const handleQuickReply = (reply: string) => {
    sendMessage(reply)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sending':
        return <Clock className="h-3 w-3 text-slate-400" />
      case 'sent':
        return <Check className="h-3 w-3 text-slate-400" />
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-slate-400" />
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500'
      case 'away':
        return 'bg-yellow-500'
      case 'busy':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          <MessageCircle className="h-8 w-8" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-96 bg-white shadow-2xl border-0 transition-all duration-300 ${
        isMinimized ? 'h-16' : 'h-[600px]'
      }`}>
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-10 h-10 border-2 border-white">
                  <AvatarFallback className="bg-white text-blue-600 font-bold">
                    {currentAgent.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(currentAgent.status)} rounded-full border-2 border-white`}></div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{currentAgent.name}</h3>
                <p className="text-xs text-white/80">{currentAgent.title}</p>
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-300 fill-current" />
                    <span>{currentAgent.rating}</span>
                  </div>
                  <span>•</span>
                  <span>Responds in {currentAgent.responseTime}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-2"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-2"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Action Buttons */}
            <div className="p-3 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Video className="h-4 w-4 mr-2" />
                  Video
                </Button>
                <Button size="sm" variant="outline">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <CardContent className="p-0 h-80 overflow-y-auto">
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-l-2xl rounded-tr-2xl' 
                        : 'bg-slate-100 text-slate-900 rounded-r-2xl rounded-tl-2xl'
                    } p-3`}>
                      <p className="text-sm">{message.content}</p>
                      <div className={`flex items-center gap-1 mt-1 ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}>
                        <span className={`text-xs ${
                          message.sender === 'user' ? 'text-white/70' : 'text-slate-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {message.sender === 'user' && getStatusIcon(message.status)}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 rounded-r-2xl rounded-tl-2xl p-3">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="p-3 border-t border-slate-200 bg-slate-50">
                <p className="text-xs text-slate-600 mb-2">Quick options:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => handleQuickReply(reply)}
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="p-2">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type your message..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage(currentMessage)}
                    className="pr-10"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 p-2"
                  onClick={() => sendMessage(currentMessage)}
                  disabled={!currentMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
