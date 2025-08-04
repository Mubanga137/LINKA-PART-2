"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

interface AuthRedirectWrapperProps {
  children: React.ReactNode
  requiredRole?: 'customer' | 'retailer' | 'admin'
  fallbackRoute?: string
}

export function AuthRedirectWrapper({ 
  children, 
  requiredRole, 
  fallbackRoute = '/login' 
}: AuthRedirectWrapperProps) {
  const { user, isLoading, getRoleBasedRedirectUrl } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return // Wait for auth to finish loading

    // If no user and authentication is required
    if (!user && requiredRole) {
      router.replace(fallbackRoute)
      return
    }

    // If user exists but role doesn't match required role
    if (user && requiredRole && user.role !== requiredRole) {
      const correctRedirectUrl = getRoleBasedRedirectUrl(user)
      router.replace(correctRedirectUrl)
      return
    }

    // If user exists but accessing login/signup pages, redirect to dashboard
    if (user && (window.location.pathname === '/login' || window.location.pathname === '/signup')) {
      const redirectUrl = getRoleBasedRedirectUrl(user)
      router.replace(redirectUrl)
      return
    }
  }, [user, isLoading, requiredRole, fallbackRoute, router, getRoleBasedRedirectUrl])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If authentication is required but user is not logged in
  if (requiredRole && !user) {
    return null // Will redirect via useEffect
  }

  // If role is required but user doesn't have the right role
  if (requiredRole && user && user.role !== requiredRole) {
    return null // Will redirect via useEffect
  }

  return <>{children}</>
}
