"use client"

import { useState } from "react"
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
  
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await login(email, password)
      
      if (result.success) {
        // Get user from auth context to check role
        const redirectUrl = new URLSearchParams(window.location.search).get('redirect')

        // Role-aware redirection based on email patterns (in real app, use user.role)
        if (email.includes('admin')) {
          router.push('/admin')
        } else if (email.includes('retailer')) {
          router.push('/retailer/dashboard')
        } else {
          // Customer redirect - always redirect to customer dashboard
          router.push('/customer-dashboard')
        }
      } else {
        setError(result.error || "Login failed")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async (role: 'customer' | 'retailer' | 'admin') => {
    // For retailer, redirect directly to retailer dashboard
    if (role === 'retailer') {
      router.push('/retailer/dashboard')
      return
    }

    const demoCredentials = {
      customer: { email: 'customer@demo.com', password: 'demo123' },
      admin: { email: 'admin@demo.com', password: 'demo123' }
    }

    const creds = demoCredentials[role as 'customer' | 'admin']
    setEmail(creds.email)
    setPassword(creds.password)

    // Auto-submit after brief delay
    setTimeout(() => {
      handleSubmit(new Event('submit') as any)
    }, 100)
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
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
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
                  >
                    Customer
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin('retailer')}
                    disabled={isLoading}
                  >
                    Retailer
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin('admin')}
                    disabled={isLoading}
                  >
                    Admin
                  </Button>
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
