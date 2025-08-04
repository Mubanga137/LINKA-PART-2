import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check for retailer authentication tokens
  const retailerToken = request.cookies.get('retailer_token')?.value
  const generalToken = request.cookies.get('linka_user')?.value

  let isRetailer = false
  let userRole = null
  let isAuthenticated = false

  // Check if user is a retailer from stored data
  if (generalToken) {
    try {
      const userData = JSON.parse(generalToken)
      isRetailer = userData.role === 'retailer'
      userRole = userData.role
      isAuthenticated = true
    } catch (error) {
      // Invalid token, clear it
      const response = NextResponse.next()
      response.cookies.delete('linka_user')
      return response
    }
  }

  // Also check retailer-specific token
  if (retailerToken) {
    isRetailer = true
    userRole = 'retailer'
    isAuthenticated = true
  }

  // RETAILER ACCESS CONTROL - Allow homepage but redirect authenticated users to dashboards
  if (isRetailer) {
    // Define pages that retailers are FORBIDDEN from accessing
    const prohibitedPaths = [
      '/marketplace',
      '/marketplace-simple',
      '/hot-deals',
      '/customer-dashboard',
      '/become-retailer',
      '/for-retailers',
      '/retailers',
      '/shop',
      '/categories',
      '/services',
      '/entertainment',
      '/financial-services',
      '/industries',
      '/cart',
      '/wishlist',
      '/checkout'
    ]

    // Check if retailer is trying to access prohibited content
    const isProhibitedPath = prohibitedPaths.some(path => {
      return pathname.startsWith(path)
    })

    // If retailer is on prohibited pages, redirect to dashboard
    if (isProhibitedPath) {
      console.log(`Retailer attempted prohibited path access: ${pathname}`)
      return NextResponse.redirect(new URL('/retailer/dashboard', request.url))
    }

    // If retailer is not on a retailer-specific route and not on allowed pages, redirect to dashboard
    if (!pathname.startsWith('/retailer/') &&
        !pathname.startsWith('/login') &&
        !pathname.startsWith('/signup') &&
        !pathname.startsWith('/api/') &&
        !pathname.startsWith('/_next/') &&
        !pathname.startsWith('/favicon') &&
        pathname !== '/' &&
        pathname !== '/about' &&
        pathname !== '/contact') {
      console.log(`Retailer attempted non-retailer route access: ${pathname}`)
      return NextResponse.redirect(new URL('/retailer/dashboard', request.url))
    }
  }

  // CUSTOMER ACCESS CONTROL - prevent customers from accessing retailer routes
  if (userRole === 'customer' && pathname.startsWith('/retailer/')) {
    console.log(`Customer attempted retailer route access: ${pathname}`)
    return NextResponse.redirect(new URL('/', request.url))
  }

  // UNAUTHENTICATED ACCESS CONTROL - protect retailer routes from logged-out users
  if (!isAuthenticated && pathname.startsWith('/retailer/')) {
    console.log(`Unauthenticated user attempted retailer route access: ${pathname}`)
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Add security headers to prevent caching of protected content
  const response = NextResponse.next()

  if (pathname.startsWith('/retailer/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
