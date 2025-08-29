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
import { Loader2, Eye, EyeOff, Mail, Lock, ArrowRight, CheckSquare, Shield, Sparkles, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [mode, setMode] = useState<'login' | 'signup'>("login")
  const [role, setRole] = useState<'customer' | 'retailer'>("customer")
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { login, signup, isLoading: authLoading, getRoleBasedRedirectUrl, signInDemo } = useAuth()
  const router = useRouter()

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0099cc0d] via-white to-[#ff66000d] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0099cc] mx-auto mb-4"></div>
          <p className="text-slate-600">Preparing login...</p>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (mode === 'login') {
        const result = await login(email, password)
        if (!result.success) {
          setError(result.error || "Login failed")
          setIsLoading(false)
        } else {
          if (remember) {
            try { localStorage.setItem("linka_remember", "1") } catch {}
          } else {
            try { localStorage.removeItem("linka_remember") } catch {}
          }
          const dest = getRoleBasedRedirectUrl(result.user!)
          router.replace(dest)
        }
      } else {
        if (password !== confirmPassword) {
          setError("Passwords do not match")
          setIsLoading(false)
          return
        }
        const result = await signup({ email, password, name: fullName || email.split('@')[0], role })
        if (!result.success) {
          setError(result.error || "Signup failed")
          setIsLoading(false)
        } else {
          const dest = role === 'retailer' ? '/retailer/studio' : '/customer-dashboard'
          router.replace(dest)
        }
      }
    } catch (err) {
      setError("An unexpected error occurred")
      setIsLoading(false)
    }
  }

  const social = (provider: "google" | "facebook") => {
    alert(`Social login with ${provider} is not configured in this environment.`)
  }

  const handleDemo = async (role: 'retailer' | 'customer') => {
    setError("")
    setIsLoading(true)
    try {
      const res = await signInDemo(role)
      const dest = getRoleBasedRedirectUrl(res.user) + "?demo=1"
      router.replace(dest)
    } catch (e) {
      setError("Demo sign-in failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative">
      <Header />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <motion.div className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl" style={{background: "radial-gradient(closest-side, rgba(0,153,204,0.25), transparent)"}} animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 8 }} />
        <motion.div className="absolute top-32 right-0 h-[28rem] w-[28rem] rounded-full blur-3xl" style={{background: "radial-gradient(closest-side, rgba(255,102,0,0.18), transparent)"}} animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 10 }} />
      </div>

      <main className="py-16">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Brand + Benefits */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="hidden lg:block">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs bg-white/80 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#ff6600]" />
              <span className="font-medium text-slate-700">Secure, fast, and modern</span>
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">
              Welcome Back
            </h1>
            <p className="mt-2 text-slate-600">Sign in to continue to your dashboard</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border bg-white/80 p-4 shadow-sm">
                <div className="flex items-center gap-2 text-slate-700 font-medium"><Shield className="h-4 w-4 text-[#0099cc]"/> Enterprise-grade security</div>
                <p className="mt-1 text-xs text-slate-600">Your data is protected with strict safeguards.</p>
              </div>
              <div className="rounded-xl border bg-white/80 p-4 shadow-sm">
                <div className="flex items-center gap-2 text-slate-700 font-medium"><BarChart3 className="h-4 w-4 text-[#ff6600]"/> Real-time analytics</div>
                <p className="mt-1 text-xs text-slate-600">Track sales, orders, and engagement live.</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Auth Card */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }} className="w-full">
            <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#0099cc40] via-white to-[#ff660040] shadow-xl">
              <Card className="bg-white/90 backdrop-blur border-white/40">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{mode === 'login' ? 'Sign In' : 'Create Account'}</CardTitle>
                    <div className="inline-flex items-center rounded-lg border bg-white p-1 text-xs">
                      <button type="button" aria-label="Switch to Login" onClick={()=>setMode('login')} className={`px-2 py-1 rounded-md ${mode==='login'?'bg-[#0099cc] text-white':'text-slate-700'}`}>Login</button>
                      <button type="button" aria-label="Switch to Sign up" onClick={()=>setMode('signup')} className={`px-2 py-1 rounded-md ${mode==='signup'?'bg-[#ff6600] text-white':'text-slate-700'}`}>Sign up</button>
                    </div>
                  </div>
                  <CardDescription>{mode === 'login' ? 'Use your email and password, or explore a demo' : 'Create your account to get started'}</CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Role Cards */}
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 }} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {(["customer","retailer"] as const).map(r => (
                      <div key={r} className={`rounded-xl border p-4 bg-white/80 shadow-sm ${role===r? 'ring-2 ring-[#0099cc]':''}`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-semibold text-slate-800">{r==='customer'?'Customer':'Retailer'}</div>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${r==='retailer'?'bg-[#ff66001a] text-[#ff6600]':'bg-[#0099cc1a] text-[#0099cc]'}`}>{r==='retailer'?'Business':'Shopping'}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button type="button" variant="outline" className="relative overflow-hidden group justify-center hover:shadow-lg" onClick={()=>{setRole(r); setMode('login')}}>
                            <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                            Login
                          </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button type="button" variant="outline" className="relative overflow-hidden group justify-center hover:shadow-lg" onClick={()=>{setRole(r); setMode('signup')}}>
                            <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                            Sign up
                          </Button>
                          </motion.div>
                          <motion.div className="col-span-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button type="button" variant="outline" className="relative overflow-hidden group w-full justify-center hover:shadow-lg" onClick={()=>handleDemo(r)}>
                            <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                            {r==='customer'?'Try as Customer':'Try as Retailer'}
                          </Button>
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="grid grid-cols-1 gap-2 mb-4">
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Button aria-label="Continue with Google" variant="outline" className="relative overflow-hidden group w-full justify-center gap-2 hover:shadow-lg" onClick={() => social("google")}>
                        <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8.1 3.1l5.7-5.7C34.9 6.1 29.7 4 24 4C12.9 4 4 12.9 4 24s8.9 20 20 20s20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.8 16.1 18.9 13 24 13c3.1 0 5.9 1.2 8.1 3.1l5.7-5.7C34.9 6.1 29.7 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"/><path fill="#4CAF50" d="M24 44c5.3 0 10.1-2 13.7-5.3l-6.3-5.2C29.1 35.6 26.7 36.5 24 36.5c-5.3 0-9.7-3.4-11.3-8H5.9l-6.4 5C3 39.5 12.7 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.7l.1.1l6.3 5.2C39 36.6 44 31.1 44 24c0-1.2-.1-2.3-.4-3.5z"/></svg>
                        Continue with Google
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Button aria-label="Continue with Facebook" variant="outline" className="relative overflow-hidden group w-full justify-center gap-2 hover:shadow-lg" onClick={() => social("facebook")}>
                        <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12a12 12 0 1 0-13.875 11.875v-8.4H7.078V12h3.047V9.356c0-3.007 1.793-4.667 4.533-4.667c1.313 0 2.686.235 2.686.235V7.86h-1.514c-1.492 0-1.956.927-1.956 1.875V12h3.328l-.532 3.475h-2.796v8.4A12.003 12.003 0 0 0 24 12"/><path fill="#fff" d="M16.844 15.475L17.375 12h-3.328V9.735c0-.948.463-1.875 1.956-1.875H17.5V4.924s-1.373-.235-2.686-.235c-2.74 0-4.533 1.66-4.533 4.667V12H7.234v3.475h3.047v8.4a12.103 12.103 0 0 0 3.766 0v-8.4z"/></svg>
                        Continue with Facebook
                      </Button>
                    </motion.div>
                  </motion.div>


                  <div className="relative my-5">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
                    <div className="relative flex justify-center text-xs"><span className="bg-white px-2 text-slate-500">{mode==='login'?'or sign in with email':'or sign up with email'}</span></div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4" noValidate aria-label={mode==='login'?'Login form':'Sign up form'}>
                    {mode==='signup' && (
                      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="space-y-2">
                        <Label htmlFor="fullName">Full name</Label>
                        <div className="relative">
                          <Input id="fullName" type="text" placeholder="Your name" value={fullName} onChange={(e)=>setFullName(e.target.value)} disabled={isLoading} className="focus-visible:ring-[#0099cc]" />
                        </div>
                      </motion.div>
                    )}

                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 focus-visible:ring-[#0099cc]"
                          required
                          disabled={isLoading}
                          autoComplete="email"
                        />
                      </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder={mode==='login'?"Enter your password":"Create a password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`pl-10 pr-10 focus-visible:ring-[#0099cc] ${password.length>=6?'border-emerald-300':''}`}
                          required
                          disabled={isLoading}
                          autoComplete={mode==='login'?"current-password":"new-password"}
                        />
                        <button
                          type="button"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 disabled:opacity-50"
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </motion.div>

                    {mode==='signup' && (
                      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`pl-10 pr-10 focus-visible:ring-[#0099cc] ${confirmPassword && confirmPassword===password?'border-emerald-300':''}`}
                            required
                            disabled={isLoading}
                            autoComplete="new-password"
                          />
                        </div>
                      </motion.div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <label className="inline-flex items-center gap-2 select-none">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-300 text-[#0099cc] focus:ring-[#0099cc]"
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                        />
                        <span className="text-slate-600">Remember me</span>
                      </label>
                      <Link href="/forgot-password" className="text-[#0099cc] hover:underline">Forgot password?</Link>
                    </div>

                    {error && (
                      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                        <Alert variant="destructive">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      </motion.div>
                    )}

                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Button
                        type="submit"
                        className="relative overflow-hidden group w-full bg-gradient-to-r from-[#0099cc] to-[#ff6600] hover:brightness-105 focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#0099cc] hover:shadow-lg"
                        disabled={isLoading}
                      >
                        <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {mode==='login'?'Signing In...':'Creating Account...'}
                          </>
                        ) : (
                          <>
                            {mode==='login'?'Sign In':'Create Account'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </motion.div>

                    <p className="mt-2 text-xs text-slate-500 text-center">
                      By continuing you agree to our{' '}
                      <Link href="/terms" className="text-[#0099cc] hover:underline">Terms</Link> and{' '}
                      <Link href="/privacy" className="text-[#0099cc] hover:underline">Privacy Policy</Link>.
                    </p>

                    <div className="text-center">
                      <span className="text-sm text-slate-600">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="text-[#ff6600] hover:underline font-medium">Sign up</Link>
                      </span>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
