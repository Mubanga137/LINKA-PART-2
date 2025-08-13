import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { AuthProvider } from '@/contexts/auth-context'
import { RetailerAuthProvider } from '@/contexts/retailer-auth-context'
import { MarketplaceProvider } from '@/contexts/marketplace-context'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthRedirectWrapper } from '@/components/auth-redirect-wrapper'
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
  icons: {
    icon: [
      { url: 'https://cdn.builder.io/api/v1/image/assets%2F64659d81f7594bc7853ad37ab97b2333%2Fec5b7aa408204c46a290a3d64bcb02ca?format=ico&width=32', sizes: '32x32', type: 'image/x-icon' },
      { url: 'https://cdn.builder.io/api/v1/image/assets%2F64659d81f7594bc7853ad37ab97b2333%2Fec5b7aa408204c46a290a3d64bcb02ca?format=png&width=16', sizes: '16x16', type: 'image/png' },
      { url: 'https://cdn.builder.io/api/v1/image/assets%2F64659d81f7594bc7853ad37ab97b2333%2Fec5b7aa408204c46a290a3d64bcb02ca?format=png&width=32', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: 'https://cdn.builder.io/api/v1/image/assets%2F64659d81f7594bc7853ad37ab97b2333%2Fec5b7aa408204c46a290a3d64bcb02ca?format=png&width=180', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Linka - Zambian E-Commerce Platform',
    description: 'Connecting local businesses with customers across Zambia',
    url: 'https://linka.zm',
    siteName: 'Linka',
    locale: 'en_ZM',
    type: 'website',
    images: [
      {
        url: 'https://cdn.builder.io/api/v1/image/assets%2F64659d81f7594bc7853ad37ab97b2333%2Fb698d20708434ac697cb59a6650bb8ed?format=webp&width=1200',
        width: 1200,
        height: 630,
        alt: 'Linka - Zambian E-Commerce Platform Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Linka - Zambian E-Commerce Platform',
    description: 'Connecting local businesses with customers across Zambia',
    images: ['https://cdn.builder.io/api/v1/image/assets%2F64659d81f7594bc7853ad37ab97b2333%2Fb698d20708434ac697cb59a6650bb8ed?format=webp&width=1200'],
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
              <MarketplaceProvider>
                <AuthRedirectWrapper>
                  {children}
                </AuthRedirectWrapper>
              </MarketplaceProvider>
            </RetailerAuthProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
