"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  MessageCircle, 
  Send, 
  Phone, 
  Video, 
  Paperclip, 
  Image, 
  Calendar,
  Clock,
  CheckCheck,
  Shield,
  AlertCircle,
  Smile,
  X,
  MoreVertical
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  timestamp: Date
  type: 'text' | 'image' | 'document' | 'appointment' | 'system'
  read: boolean
  metadata?: {
    fileName?: string
    fileSize?: string
    imageUrl?: string
    appointmentDetails?: {
      date: string
      time: string
      type: string
    }
  }
}

interface ChatSession {
  id: string
  providerId: string
  providerName: string
  providerAvatar: string
  providerTitle: string
  isOnline: boolean
  lastSeen: Date
  messages: Message[]
  unreadCount: number
  status: 'active' | 'pending' | 'closed'
}

const mockChatSessions: ChatSession[] = [
  {
    id: "chat-1",
    providerId: "dr-mwanza",
    providerName: "Dr. John Mwanza",
    providerAvatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    providerTitle: "General Practitioner",
    isOnline: true,
    lastSeen: new Date(),
    unreadCount: 2,
    status: "active",
    messages: [
      {
        id: "msg-1",
        senderId: "dr-mwanza",
        senderName: "Dr. John Mwanza",
        senderAvatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
        content: "Hello! Thank you for booking an appointment with me. How can I help you today?",
        timestamp: new Date(Date.now() - 3600000),
        type: "text",
        read: true
      },
      {
        id: "msg-2", 
        senderId: "patient",
        senderName: "You",
        content: "Hi Dr. Mwanza, I've been experiencing some headaches lately and wanted to discuss them before our appointment.",
        timestamp: new Date(Date.now() - 3000000),
        type: "text",
        read: true
      },
      {
        id: "msg-3",
        senderId: "dr-mwanza",
        senderName: "Dr. John Mwanza",
        senderAvatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
        content: "I understand your concern. Can you tell me more about the frequency and intensity of these headaches?",
        timestamp: new Date(Date.now() - 1800000),
        type: "text",
        read: true
      },
      {
        id: "msg-4",
        senderId: "dr-mwanza",
        senderName: "Dr. John Mwanza", 
        senderAvatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
        content: "Also, it would be helpful if you could bring any recent medication you've been taking to our appointment.",
        timestamp: new Date(Date.now() - 300000),
        type: "text",
        read: false
      }
    ]
  },
  {
    id: "chat-2",
    providerId: "dr-banda",
    providerName: "Dr. Sarah Banda",
    providerAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    providerTitle: "Clinical Psychologist",
    isOnline: false,
    lastSeen: new Date(Date.now() - 7200000),
    unreadCount: 0,
    status: "active",
    messages: [
      {
        id: "msg-5",
        senderId: "dr-banda",
        senderName: "Dr. Sarah Banda",
        senderAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
        content: "Thank you for reaching out. I'm here to support you through this difficult time.",
        timestamp: new Date(Date.now() - 86400000),
        type: "text",
        read: true
      }
    ]
  }
]

interface ProviderChatProps {
  isOpen: boolean
  onClose: () => void
  selectedProviderId?: string
  providerType?: 'healthcare' | 'fitness' | 'pharmacy'
}

export function ProviderChat({ isOpen, onClose, selectedProviderId, providerType = 'healthcare' }: ProviderChatProps) {
  const { user } = useAuth()
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(mockChatSessions)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedProviderId) {
      const chat = chatSessions.find(c => c.providerId === selectedProviderId)
      if (chat) {
        setSelectedChat(chat)
      }
    } else if (chatSessions.length > 0) {
      setSelectedChat(chatSessions[0])
    }
  }, [selectedProviderId, chatSessions])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [selectedChat?.messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: "patient",
      senderName: "You",
      content: newMessage,
      timestamp: new Date(),
      type: "text",
      read: true
    }

    setChatSessions(prev => prev.map(chat => 
      chat.id === selectedChat.id 
        ? { ...chat, messages: [...chat.messages, message] }
        : chat
    ))

    setNewMessage("")

    // Simulate provider typing and response
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      
      const autoReply: Message = {
        id: `msg-${Date.now() + 1}`,
        senderId: selectedChat.providerId,
        senderName: selectedChat.providerName,
        senderAvatar: selectedChat.providerAvatar,
        content: "Thank you for your message. I'll review this and get back to you shortly.",
        timestamp: new Date(),
        type: "text",
        read: false
      }

      setChatSessions(prev => prev.map(chat => 
        chat.id === selectedChat.id 
          ? { 
              ...chat, 
              messages: [...chat.messages, autoReply],
              unreadCount: chat.unreadCount + 1
            }
          : chat
      ))
    }, 2000 + Math.random() * 3000)
  }

  const markAsRead = (chatId: string) => {
    setChatSessions(prev => prev.map(chat => 
      chat.id === chatId 
        ? { 
            ...chat, 
            unreadCount: 0,
            messages: chat.messages.map(msg => ({ ...msg, read: true }))
          }
        : chat
    ))
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    
    if (diff < 60000) return "Just now"
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
    return date.toLocaleDateString()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl h-[600px] flex overflow-hidden shadow-2xl">
        {/* Chat List Sidebar */}
        <div className="w-1/3 border-r border-slate-200 bg-slate-50">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Provider Chats</CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <div className="p-4 space-y-2 overflow-y-auto h-[520px]">
            {chatSessions.map((chat) => (
              <div
                key={chat.id}
                onClick={() => {
                  setSelectedChat(chat)
                  markAsRead(chat.id)
                }}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedChat?.id === chat.id 
                    ? 'bg-blue-100 border-blue-200' 
                    : 'bg-white hover:bg-slate-100 border-slate-200'
                } border`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={chat.providerAvatar} alt={chat.providerName} />
                      <AvatarFallback>{chat.providerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      chat.isOnline ? 'bg-green-500' : 'bg-slate-400'
                    }`}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-slate-900 truncate">{chat.providerName}</h4>
                      {chat.unreadCount > 0 && (
                        <Badge className="bg-red-500 text-white ml-2 min-w-5 h-5 text-xs flex items-center justify-center">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{chat.providerTitle}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {chat.isOnline ? 'Online' : `Last seen ${formatTime(chat.lastSeen)}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b border-slate-200 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={selectedChat.providerAvatar} alt={selectedChat.providerName} />
                      <AvatarFallback>{selectedChat.providerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-slate-900 flex items-center">
                        {selectedChat.providerName}
                        {selectedChat.isOnline && (
                          <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                        )}
                      </h3>
                      <p className="text-sm text-slate-600">{selectedChat.providerTitle}</p>
                      <p className="text-xs text-slate-500">
                        {selectedChat.isOnline ? 'Online now' : `Last seen ${formatTime(selectedChat.lastSeen)}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                      <Video className="h-4 w-4 mr-2" />
                      Video
                    </Button>
                    <Button variant="outline" size="sm" className="text-purple-600 border-purple-200 hover:bg-purple-50">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
                {selectedChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === 'patient' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                      message.senderId === 'patient' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      {message.senderId !== 'patient' && (
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                          <AvatarFallback className="text-xs">
                            {message.senderName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className={`rounded-lg px-4 py-2 ${
                        message.senderId === 'patient'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-slate-200 text-slate-900'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className={`text-xs ${
                            message.senderId === 'patient' ? 'text-blue-100' : 'text-slate-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </span>
                          {message.senderId === 'patient' && (
                            <CheckCheck className={`h-3 w-3 ml-2 ${
                              message.read ? 'text-blue-200' : 'text-blue-300'
                            }`} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-end space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={selectedChat.providerAvatar} alt={selectedChat.providerName} />
                        <AvatarFallback className="text-xs">
                          {selectedChat.providerName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-white border border-slate-200 rounded-lg px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t border-slate-200 bg-white p-4">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
                    <Image className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex-1 relative">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="pr-12 border-slate-200 focus:border-blue-500"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {/* Chat Guidelines */}
                <div className="mt-3 text-xs text-slate-500 flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  This chat is secure and HIPAA compliant. For emergencies, please call 991.
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-slate-50">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Select a conversation</h3>
                <p className="text-slate-600">Choose a healthcare provider to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
