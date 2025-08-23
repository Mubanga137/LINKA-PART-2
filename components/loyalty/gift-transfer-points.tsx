"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Gift, 
  Send, 
  Users, 
  Coins, 
  Heart, 
  Search, 
  Check, 
  X, 
  ArrowRight,
  Sparkles,
  Star,
  Coffee,
  ShoppingBag,
  Calendar,
  UserPlus,
  History,
  AlertCircle,
  PartyPopper
} from "lucide-react"

interface Friend {
  id: string
  name: string
  email: string
  avatar?: string
  tier: string
  lastActive: string
  canReceivePoints: boolean
}

interface GiftTemplate {
  id: string
  name: string
  description: string
  icon: any
  message: string
  occasion: string
  suggestedAmount: number
}

interface TransferHistory {
  id: string
  recipient: Friend
  amount: number
  message: string
  date: Date
  status: 'completed' | 'pending' | 'failed'
}

interface GiftTransferPointsProps {
  isOpen: boolean
  onClose: () => void
  currentPoints: number
  friends: Friend[]
  transferHistory: TransferHistory[]
  onTransfer: (recipientId: string, amount: number, message: string) => Promise<boolean>
  onAddFriend: () => void
}

const GIFT_TEMPLATES: GiftTemplate[] = [
  {
    id: 'birthday',
    name: 'Birthday Gift',
    description: 'Celebrate their special day',
    icon: PartyPopper,
    message: '🎉 Happy Birthday! Hope you have an amazing day filled with joy!',
    occasion: 'Birthday',
    suggestedAmount: 500
  },
  {
    id: 'thank-you',
    name: 'Thank You',
    description: 'Show your appreciation',
    icon: Heart,
    message: '💝 Thank you so much! Your kindness means the world to me.',
    occasion: 'Appreciation',
    suggestedAmount: 200
  },
  {
    id: 'coffee',
    name: 'Coffee Treat',
    description: 'Buy them a coffee',
    icon: Coffee,
    message: '☕ Here are some points for your next coffee! Enjoy!',
    occasion: 'Casual',
    suggestedAmount: 100
  },
  {
    id: 'shopping',
    name: 'Shopping Boost',
    description: 'Help with their next purchase',
    icon: ShoppingBag,
    message: '🛍️ Found something you like? These points are on me!',
    occasion: 'Shopping',
    suggestedAmount: 300
  },
  {
    id: 'celebration',
    name: 'Celebration',
    description: 'Celebrate their achievement',
    icon: Star,
    message: '🌟 Congratulations on your achievement! You deserve this!',
    occasion: 'Achievement',
    suggestedAmount: 400
  },
  {
    id: 'custom',
    name: 'Custom Message',
    description: 'Write your own message',
    icon: Gift,
    message: '',
    occasion: 'Custom',
    suggestedAmount: 250
  }
]

export function GiftTransferPoints({
  isOpen,
  onClose,
  currentPoints,
  friends,
  transferHistory,
  onTransfer,
  onAddFriend
}: GiftTransferPointsProps) {
  const [step, setStep] = useState<'select-friend' | 'choose-amount' | 'add-message' | 'confirm' | 'success'>('select-friend')
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<GiftTemplate | null>(null)
  const [amount, setAmount] = useState('')
  const [customMessage, setCustomMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isTransferring, setIsTransferring] = useState(false)
  const [transferSuccess, setTransferSuccess] = useState(false)
  const [error, setError] = useState('')

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const availableFriends = filteredFriends.filter(friend => friend.canReceivePoints)

  const resetForm = () => {
    setStep('select-friend')
    setSelectedFriend(null)
    setSelectedTemplate(null)
    setAmount('')
    setCustomMessage('')
    setSearchTerm('')
    setError('')
    setTransferSuccess(false)
  }

  const handleTemplateSelect = (template: GiftTemplate) => {
    setSelectedTemplate(template)
    setAmount(template.suggestedAmount.toString())
    setCustomMessage(template.message)
    setStep('add-message')
  }

  const handleTransfer = async () => {
    if (!selectedFriend || !amount) return

    const transferAmount = parseInt(amount)
    
    if (transferAmount > currentPoints) {
      setError('Insufficient points for this transfer')
      return
    }

    if (transferAmount < 10) {
      setError('Minimum transfer amount is 10 points')
      return
    }

    setIsTransferring(true)
    setError('')

    try {
      const success = await onTransfer(selectedFriend.id, transferAmount, customMessage)
      
      if (success) {
        setTransferSuccess(true)
        setStep('success')
      } else {
        setError('Transfer failed. Please try again.')
      }
    } catch (err) {
      setError('An error occurred during the transfer')
    } finally {
      setIsTransferring(false)
    }
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-full max-w-2xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                  >
                    <Gift className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <CardTitle className="text-2xl">Gift Points</CardTitle>
                    <p className="text-white/80">Share the joy with friends and family</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Progress Steps */}
              <div className="flex items-center gap-2 mt-4">
                {['select-friend', 'add-message', 'confirm', 'success'].map((stepName, index) => (
                  <motion.div
                    key={stepName}
                    className={`flex-1 h-2 rounded-full ${
                      ['select-friend', 'add-message', 'confirm', 'success'].indexOf(step) >= index
                        ? 'bg-white'
                        : 'bg-white/30'
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: index * 0.1 }}
                  />
                ))}
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <AnimatePresence mode="wait">
                {/* Step 1: Select Friend */}
                {step === 'select-friend' && (
                  <motion.div
                    key="select-friend"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Who would you like to gift points to?</h3>
                      
                      {/* Search Bar */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search friends..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>

                      {/* Current Points Display */}
                      <div className="flex items-center gap-2 mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                        <Coins className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-green-800">
                          Available Points: {currentPoints.toLocaleString()}
                        </span>
                      </div>

                      {/* Friends List */}
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {availableFriends.length === 0 ? (
                          <div className="text-center py-8">
                            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 mb-4">No friends available for point transfers</p>
                            <Button
                              onClick={onAddFriend}
                              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                            >
                              <UserPlus className="h-4 w-4 mr-2" />
                              Add Friends
                            </Button>
                          </div>
                        ) : (
                          availableFriends.map((friend) => (
                            <motion.div
                              key={friend.id}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              className={`p-4 border border-gray-200 rounded-lg cursor-pointer transition-all ${
                                selectedFriend?.id === friend.id
                                  ? 'border-purple-500 bg-purple-50'
                                  : 'hover:border-gray-300 hover:bg-gray-50'
                              }`}
                              onClick={() => setSelectedFriend(friend)}
                            >
                              <div className="flex items-center gap-4">
                                <Avatar className="w-12 h-12">
                                  <AvatarImage src={friend.avatar} alt={friend.name} />
                                  <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-500 text-white">
                                    {friend.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900">{friend.name}</h4>
                                  <p className="text-sm text-gray-600">{friend.email}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                      {friend.tier}
                                    </Badge>
                                    <span className="text-xs text-gray-500">
                                      Active {friend.lastActive}
                                    </span>
                                  </div>
                                </div>
                                
                                {selectedFriend?.id === friend.id && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
                                  >
                                    <Check className="h-4 w-4 text-white" />
                                  </motion.div>
                                )}
                              </div>
                            </motion.div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={handleClose}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => setStep('add-message')}
                        disabled={!selectedFriend}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                      >
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Add Message and Amount */}
                {step === 'add-message' && (
                  <motion.div
                    key="add-message"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Choose a gift template or create custom
                      </h3>
                      
                      {/* Selected Friend Display */}
                      {selectedFriend && (
                        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200 mb-6">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={selectedFriend.avatar} alt={selectedFriend.name} />
                            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-500 text-white">
                              {selectedFriend.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-gray-900">Gifting to {selectedFriend.name}</h4>
                            <p className="text-sm text-gray-600">{selectedFriend.email}</p>
                          </div>
                        </div>
                      )}

                      {/* Gift Templates */}
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                        {GIFT_TEMPLATES.map((template) => (
                          <motion.div
                            key={template.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-4 border border-gray-200 rounded-lg cursor-pointer text-center transition-all ${
                              selectedTemplate?.id === template.id
                                ? 'border-purple-500 bg-purple-50'
                                : 'hover:border-gray-300 hover:bg-gray-50'
                            }`}
                            onClick={() => handleTemplateSelect(template)}
                          >
                            <template.icon className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                            <h4 className="font-medium text-sm text-gray-900">{template.name}</h4>
                            <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                            <Badge className="mt-2 bg-purple-100 text-purple-800 text-xs">
                              {template.suggestedAmount} pts
                            </Badge>
                          </motion.div>
                        ))}
                      </div>

                      {/* Amount Input */}
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="amount">Points Amount</Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min="10"
                            max={currentPoints}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Minimum: 10 points • Maximum: {currentPoints.toLocaleString()} points
                          </p>
                        </div>

                        {/* Message Input */}
                        <div>
                          <Label htmlFor="message">Personal Message</Label>
                          <Textarea
                            id="message"
                            placeholder="Add a personal message..."
                            value={customMessage}
                            onChange={(e) => setCustomMessage(e.target.value)}
                            rows={3}
                            maxLength={200}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            {customMessage.length}/200 characters
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={() => setStep('select-friend')}
                        variant="outline"
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={() => setStep('confirm')}
                        disabled={!amount || parseInt(amount) < 10 || parseInt(amount) > currentPoints}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                      >
                        Review Gift
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Confirm Transfer */}
                {step === 'confirm' && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Confirm Your Gift</h3>
                      
                      {/* Gift Summary Card */}
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                        <div className="text-center mb-6">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4"
                          >
                            <Gift className="h-8 w-8 text-white" />
                          </motion.div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">
                            {amount} Points Gift
                          </h4>
                          {selectedTemplate && (
                            <Badge className="bg-purple-100 text-purple-800">
                              {selectedTemplate.name}
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center py-2 border-b border-purple-200">
                            <span className="text-gray-600">Recipient:</span>
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={selectedFriend?.avatar} alt={selectedFriend?.name} />
                                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-500 text-white text-xs">
                                  {selectedFriend?.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-semibold">{selectedFriend?.name}</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center py-2 border-b border-purple-200">
                            <span className="text-gray-600">Amount:</span>
                            <span className="font-semibold flex items-center gap-1">
                              <Coins className="h-4 w-4 text-yellow-600" />
                              {amount} points
                            </span>
                          </div>
                          
                          {customMessage && (
                            <div className="py-2">
                              <span className="text-gray-600 block mb-2">Message:</span>
                              <div className="bg-white p-3 rounded border border-purple-200 text-sm">
                                {customMessage}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800">
                          <AlertCircle className="h-5 w-5" />
                          <span className="text-sm">{error}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={() => setStep('add-message')}
                        variant="outline"
                        className="flex-1"
                        disabled={isTransferring}
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleTransfer}
                        disabled={isTransferring}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                      >
                        {isTransferring ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Gift
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Success */}
                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Check className="h-10 w-10 text-white" />
                    </motion.div>
                    
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-2xl font-bold text-gray-900 mb-4"
                    >
                      Gift Sent Successfully! 🎉
                    </motion.h3>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-gray-600 mb-8"
                    >
                      Your {amount} points have been sent to {selectedFriend?.name}.
                      They'll receive a notification about your thoughtful gift!
                    </motion.p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        onClick={() => setStep('select-friend')}
                        variant="outline"
                        className="flex-1"
                      >
                        Send Another Gift
                      </Button>
                      <Button
                        onClick={handleClose}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                      >
                        Done
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
