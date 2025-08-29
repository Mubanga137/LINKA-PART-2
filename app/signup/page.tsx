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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Eye, EyeOff, Mail, Lock, User, Phone, Building2, ArrowRight } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface FormData {
  email: string
  password: string
  confirmPassword: string
  name: string
  phone: string
  businessName: string
  role: 'customer' | 'retailer'
}

export default function SignupPage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    businessName: "",
    role: 'customer'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [agree, setAgree] = useState(true)
  
  const { signup } = useAuth()
  const router = useRouter()

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = (): string | null => {
    if (!formData.email || !formData.password || !formData.name) {
      return "Please fill in all required fields"
    }
    if (formData.password.length < 6) {
      return "Password must be at least 6 characters"
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match"
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "Please enter a valid email address"
    }
    if (formData.role === 'retailer' && !formData.businessName) {
      return "Business name is required for retailers"
    }
    if (!agree) {
      return "You must agree to the Terms and Privacy Policy"
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)

    try {
      const result = await signup({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: formData.role,
        phone: formData.phone || undefined,
        businessName: formData.businessName || undefined
      })
      
      if (result.success) {
        if (formData.role === 'retailer') {
          router.push('/retailer/studio?welcome=true')
        } else {
          router.push('/customer-dashboard?welcome=true')
        }
      } else {
        setError(result.error || "Signup failed")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const social = (provider: "google" | "facebook") => {
    alert(`Social sign up with ${provider} is not configured in this environment.`)
  }

  return (
    <div className="min-h-screen relative">
      <Header />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-28 -right-16 h-80 w-80 rounded-full blur-3xl" style={{background: "radial-gradient(closest-side, rgba(255,102,0,0.20), transparent)"}} />
        <div className="absolute bottom-10 left-0 h-[26rem] w-[26rem] rounded-full blur-3xl" style={{background: "radial-gradient(closest-side, rgba(0,153,204,0.22), transparent)"}} />
      </div>
      
      <main className="py-16">
        <div className="mx-auto max-w-md px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Create your account</h1>
            <p className="text-slate-600">Join Linka and start your journey</p>
          </div>

          <Card className="bg-white/85 backdrop-blur border-white/30 shadow-xl">
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>Choose your account type and fill in your details</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 gap-2 mb-4">
                <Button aria-label="Sign up with Google" variant="outline" className="w-full justify-center gap-2" onClick={() => social("google")}>
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8.1 3.1l5.7-5.7C34.9 6.1 29.7 4 24 4C12.9 4 4 12.9 4 24s8.9 20 20 20s20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.8 16.1 18.9 13 24 13c3.1 0 5.9 1.2 8.1 3.1l5.7-5.7C34.9 6.1 29.7 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"/><path fill="#4CAF50" d="M24 44c5.3 0 10.1-2 13.7-5.3l-6.3-5.2C29.1 35.6 26.7 36.5 24 36.5c-5.3 0-9.7-3.4-11.3-8H5.9l-6.4 5C3 39.5 12.7 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.7l.1.1l6.3 5.2C39 36.6 44 31.1 44 24c0-1.2-.1-2.3-.4-3.5z"/></svg>
                  Sign up with Google
                </Button>
                <Button aria-label="Sign up with Facebook" variant="outline" className="w-full justify-center gap-2" onClick={() => social("facebook")}>
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12a12 12 0 1 0-13.875 11.875v-8.4H7.078V12h3.047V9.356c0-3.007 1.793-4.667 4.533-4.667c1.313 0 2.686.235 2.686.235V7.86h-1.514c-1.492 0-1.956.927-1.956 1.875V12h3.328l-.532 3.475h-2.796v8.4A12.003 12.003 0 0 0 24 12"/><path fill="#fff" d="M16.844 15.475L17.375 12h-3.328V9.735c0-.948.463-1.875 1.956-1.875H17.5V4.924s-1.373-.235-2.686-.235c-2.74 0-4.533 1.66-4.533 4.667V12H7.234v3.475h3.047v8.4a12.103 12.103 0 0 0 3.766 0v-8.4z"/></svg>
                  Sign up with Facebook
                </Button>
              </div>

              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-white px-2 text-slate-500">or</span></div>
              </div>

              <Tabs 
                value={formData.role} 
                onValueChange={(value) => handleChange('role', value)}
                className="mb-6"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="customer">Customer</TabsTrigger>
                  <TabsTrigger value="retailer">Retailer</TabsTrigger>
                </TabsList>
                <TabsContent value="customer" className="mt-4 text-sm text-slate-600">
                  Shop from local retailers and discover amazing products across Zambia.
                </TabsContent>
                <TabsContent value="retailer" className="mt-4 text-sm text-slate-600">
                  Sell your products online and reach customers across the country.
                </TabsContent>
              </Tabs>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="pl-10 focus-visible:ring-[#0099cc]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="pl-10 focus-visible:ring-[#0099cc]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+260 97 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="pl-10 focus-visible:ring-[#0099cc]"
                    />
                  </div>
                </div>

                {formData.role === 'retailer' && (
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="businessName"
                        type="text"
                        placeholder="Enter your business name"
                        value={formData.businessName}
                        onChange={(e) => handleChange('businessName', e.target.value)}
                        className="pl-10 focus-visible:ring-[#0099cc]"
                        required={formData.role === 'retailer'}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      className="pl-10 pr-10 focus-visible:ring-[#0099cc]"
                      required
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      className="pl-10 pr-10 focus-visible:ring-[#0099cc]"
                      required
                    />
                    <button
                      type="button"
                      aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <label className="inline-flex items-center gap-2 select-none">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-[#0099cc] focus:ring-[#0099cc]" checked={agree} onChange={(e)=>setAgree(e.target.checked)} />
                    I agree to the <Link href="/terms" className="text-[#0099cc] hover:underline">Terms</Link> and <Link href="/privacy" className="text-[#0099cc] hover:underline">Privacy Policy</Link>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#0099cc] to-[#ff6600] hover:brightness-105 focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#0099cc]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <span className="text-sm text-slate-600">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[#ff6600] hover:underline font-medium">Sign in</Link>
                  </span>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
