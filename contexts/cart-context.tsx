"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  subcategory?: string
  description: string
  inStock: boolean
  stockQuantity: number
  retailerId: string
  retailerName: string
  retailerLocation: string
  rating: number
  reviewCount: number
  features: string[]
  variants?: {
    size?: string[]
    color?: string[]
    material?: string[]
  }
  shippingInfo: {
    freeShipping: boolean
    estimatedDays: number
    shippingCost: number
  }
  tags: string[]
}

export interface CartItem {
  product: Product
  quantity: number
  selectedVariants?: {
    size?: string
    color?: string
    material?: string
  }
  addedAt: string
}

interface CartContextType {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  isLoading: boolean
  addToCart: (product: Product, quantity?: number, variants?: CartItem['selectedVariants']) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getItemQuantity: (productId: string) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('linka_cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error parsing saved cart:', error)
        localStorage.removeItem('linka_cart')
      }
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('linka_cart', JSON.stringify(items))
  }, [items])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

  const addToCart = (product: Product, quantity = 1, variants?: CartItem['selectedVariants']) => {
    setIsLoading(true)
    
    setTimeout(() => {
      setItems(prevItems => {
        const existingItemIndex = prevItems.findIndex(item => 
          item.product.id === product.id && 
          JSON.stringify(item.selectedVariants) === JSON.stringify(variants)
        )

        if (existingItemIndex > -1) {
          // Update existing item
          const updatedItems = [...prevItems]
          updatedItems[existingItemIndex].quantity += quantity
          return updatedItems
        } else {
          // Add new item
          const newItem: CartItem = {
            product,
            quantity,
            selectedVariants: variants,
            addedAt: new Date().toISOString()
          }
          return [...prevItems, newItem]
        }
      })
      setIsLoading(false)
    }, 300)
  }

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getItemQuantity = (productId: string) => {
    const item = items.find(item => item.product.id === productId)
    return item ? item.quantity : 0
  }

  return (
    <CartContext.Provider value={{
      items,
      totalItems,
      totalPrice,
      isLoading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getItemQuantity
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
