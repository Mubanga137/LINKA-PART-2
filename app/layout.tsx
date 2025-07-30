import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { AuthProvider } from '@/contexts/auth-context'
import { CartProvider } from '@/contexts/cart-context'
import { RetailerAuthProvider } from '@/contexts/retailer-auth-context'
import { MarketplaceProvider } from '@/contexts/marketplace-context'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Linka - Zambian E-Commerce Platform',
  description: 'Connecting local businesses with customers across Zambia. Discover amazing products and services from verified retailers.',
  keywords: ['Zambia', 'e-commerce', 'local business', 'online shopping', 'African marketplace'],
  authors: [{ name: 'Linka Team' }],
  creator: 'Linka',
  publisher: 'Linka',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://linka.zm'),
  openGraph: {
    title: 'Linka - Zambian E-Commerce Platform',
    description: 'Connecting local businesses with customers across Zambia',
    url: 'https://linka.zm',
    siteName: 'Linka',
    locale: 'en_ZM',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Linka - Zambian E-Commerce Platform',
    description: 'Connecting local businesses with customers across Zambia',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <RetailerAuthProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </RetailerAuthProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
