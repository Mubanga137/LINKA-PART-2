import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Check for retailer authentication tokens
  const retailerToken = request.cookies.get('retailer_token')?.value
  const generalToken = request.cookies.get('linka_user')?.value
  
  let isRetailer = false
  
  // Check if user is a retailer from stored data
  if (generalToken) {
    try {
      const userData = JSON.parse(generalToken)
      isRetailer = userData.role === 'retailer'
    } catch (error) {
      // Invalid token, continue
    }
  }
  
  // Also check retailer-specific token
  if (retailerToken) {
    isRetailer = true
  }

  // RETAILER ACCESS CONTROL
  if (isRetailer) {
    // Define pages that retailers CANNOT access
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
      return NextResponse.redirect(new URL('/retailer/dashboard', request.url))
    }

    // Allow homepage access for retailers
    if (pathname === '/') {
      return NextResponse.next()
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
      return NextResponse.redirect(new URL('/retailer/dashboard', request.url))
    }
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
