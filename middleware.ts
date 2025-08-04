import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check for retailer authentication tokens
  const retailerToken = request.cookies.get('retailer_token')?.value
  const generalToken = request.cookies.get('linka_user')?.value

  let isRetailer = false
  let userRole = null

  // Check if user is a retailer from stored data
  if (generalToken) {
    try {
      const userData = JSON.parse(generalToken)
      isRetailer = userData.role === 'retailer'
      userRole = userData.role
    } catch (error) {
      // Invalid token, continue
    }
  }

  // Also check retailer-specific token
  if (retailerToken) {
    isRetailer = true
    userRole = 'retailer'
  }

  // STRICT RETAILER ACCESS CONTROL
  if (isRetailer) {
    // Define pages that retailers are COMPLETELY FORBIDDEN from accessing
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

    // CRITICAL: Block homepage access for retailers - redirect to dashboard
    if (pathname === '/' || pathname === '/home') {
      console.log(`Retailer attempted homepage access, redirecting to dashboard: ${pathname}`)
      return NextResponse.redirect(new URL('/retailer/dashboard', request.url))
    }

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

  // Allow request to continue
  return NextResponse.next()
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
