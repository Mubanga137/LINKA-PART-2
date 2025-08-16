"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

export interface User {
  id: string
  email: string
  name: string
  role: 'customer' | 'retailer'
  avatar?: string
  phone?: string
  location?: string
  businessName?: string
  verificationStatus?: 'pending' | 'verified' | 'rejected'
  joinedAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>
  getRoleBasedRedirectUrl: (user: User) => string
}

interface SignupData {
  email: string
  password: string
  name: string
  role: 'customer' | 'retailer'
  phone?: string
  businessName?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        if (typeof window === 'undefined') {
          setIsLoading(false)
          return
        }

        const savedUser = localStorage.getItem('linka_user')
        if (savedUser && savedUser.trim() !== '') {
          try {
            const parsed = JSON.parse(savedUser)
            if (parsed && typeof parsed === 'object' && parsed.id) {
              setUser(parsed)
            } else {
              localStorage.removeItem('linka_user')
            }
          } catch (error) {
            console.warn('Error parsing saved user:', error)
            localStorage.removeItem('linka_user')
          }
        }
      } catch (error) {
        console.warn('localStorage access error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      if (user) {
        localStorage.setItem('linka_user', JSON.stringify(user))
      } else {
        localStorage.removeItem('linka_user')
      }
    } catch (error) {
      console.warn('localStorage write error:', error)
    }
  }, [user])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock user data based on email
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.includes('retailer') ? 'John Retailer' : 'Jane Customer',
        role: email.includes('retailer') ? 'retailer' : 'customer',
        avatar: '/placeholder.svg?height=100&width=100',
        phone: '+260 97 123-4567',
        location: 'Lusaka, Zambia',
        businessName: email.includes('retailer') ? 'Sample Business Ltd.' : undefined,
        verificationStatus: 'verified',
        joinedAt: new Date().toISOString()
      }

      setUser(mockUser)
      setIsLoading(false)
      return { success: true, user: mockUser }
    } catch (error) {
      setIsLoading(false)
      return { success: false, error: 'Login failed. Please try again.' }
    }
  }

  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: data.email,
        name: data.name,
        role: data.role,
        phone: data.phone,
        businessName: data.businessName,
        verificationStatus: data.role === 'retailer' ? 'pending' : 'verified',
        joinedAt: new Date().toISOString()
      }

      setUser(newUser)
      setIsLoading(false)
      return { success: true }
    } catch (error) {
      setIsLoading(false)
      return { success: false, error: 'Signup failed. Please try again.' }
    }
  }

  const logout = () => {
    setUser(null)
  }

  const updateProfile = async (data: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'No user logged in' }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      setUser({ ...user, ...data })
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Profile update failed. Please try again.' }
    }
  }

  const getRoleBasedRedirectUrl = (user: User): string => {
    switch (user.role) {
      case 'customer':
        return '/customer-dashboard'
      case 'retailer':
        return '/retailer/dashboard'
      default:
        return '/customer-dashboard'
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      signup,
      logout,
      updateProfile,
      getRoleBasedRedirectUrl
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
