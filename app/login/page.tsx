"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const { login, user, isLoading: authLoading, getRoleBasedRedirectUrl } = useAuth()
  const router = useRouter()

  // Redirect if user is already logged in
  useEffect(() => {
    if (!authLoading && user) {
      const redirectUrl = getRoleBasedRedirectUrl(user)
      router.replace(redirectUrl)
    }
  }, [user, authLoading, router, getRoleBasedRedirectUrl])

  // Prevent rendering if already authenticated
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return null // Prevent flash of content while redirecting
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await login(email, password)
      
      if (result.success) {
        // The useEffect above will handle redirection once user state is updated
        // No need to manually redirect here
      } else {
        setError(result.error || "Login failed")
        setIsLoading(false)
      }
    } catch (err) {
      setError("An unexpected error occurred")
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async (role: 'customer' | 'retailer' | 'admin') => {
    const demoCredentials = {
      customer: { email: 'customer@demo.com', password: 'demo123' },
      retailer: { email: 'retailer@demo.com', password: 'demo123' },
      admin: { email: 'admin@demo.com', password: 'demo123' }
    }

    const creds = demoCredentials[role]
    setEmail(creds.email)
    setPassword(creds.password)
    setError("")
    setIsLoading(true)

    try {
      const result = await login(creds.email, creds.password)
      
      if (result.success) {
        // The useEffect above will handle redirection once user state is updated
      } else {
        setError(result.error || "Demo login failed")
        setIsLoading(false)
      }
    } catch (err) {
      setError("An unexpected error occurred")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      
      <main className="py-20">
        <div className="mx-auto max-w-md px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-600">
              Sign in to your Linka account
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-white/30 shadow-xl">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-slate-500">Try Demo Accounts</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin('customer')}
                    disabled={isLoading}
                    className="flex flex-col items-center py-3 h-auto"
                  >
                    <span className="text-lg mb-1">🛍️</span>
                    <span className="text-xs">Customer</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin('retailer')}
                    disabled={isLoading}
                    className="flex flex-col items-center py-3 h-auto"
                  >
                    <span className="text-lg mb-1">🏪</span>
                    <span className="text-xs">Retailer</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin('admin')}
                    disabled={isLoading}
                    className="flex flex-col items-center py-3 h-auto"
                  >
                    <span className="text-lg mb-1">⚙️</span>
                    <span className="text-xs">Admin</span>
                  </Button>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-slate-500">
                    Demo accounts redirect to role-specific dashboards
                  </p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              <div className="mt-4 text-center">
                <span className="text-sm text-slate-600">
                  Don't have an account?{" "}
                  <Link 
                    href="/signup" 
                    className="text-indigo-600 hover:text-indigo-700 hover:underline font-medium"
                  >
                    Sign up
                  </Link>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
