import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { AuthProvider } from '@/contexts/auth-context'
import { RetailerAuthProvider } from '@/contexts/retailer-auth-context'
import { MarketplaceProvider } from '@/contexts/marketplace-context'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthRedirectWrapper } from '@/components/auth-redirect-wrapper'
import { ErrorBoundary } from '@/components/error-boundary'
import { ThemeCustomizationProvider } from '@/contexts/theme-customization-context'
import './globals.css'
import '../styles/dashboard-animations.css'
import '../styles/theme-customization.css'

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
        url: 'https://cdn.builder.io/api/v1/image/assets%2F64659d81f7594bc7853ad37ab97b2333%2Fec5b7aa408204c46a290a3d64bcb02ca?format=webp&width=1200',
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
    images: ['https://cdn.builder.io/api/v1/image/assets%2F64659d81f7594bc7853ad37ab97b2333%2Fec5b7aa408204c46a290a3d64bcb02ca?format=webp&width=1200'],
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
        {/* Theme color meta tags for browser chrome */}
        <meta name="theme-color" content="#0073e6" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#FF6B00" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light dark" />

        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};

  /* Linka theme system integration */
  --linka-primary: #0073e6;
  --linka-accent: #FF6B00;
  --theme-mode: light;
}

html[data-theme="dark"] {
  --theme-mode: dark;
}

html[data-theme="light"] {
  --theme-mode: light;
}

/* Auto-detect system theme preference */
@media (prefers-color-scheme: dark) {
  html:not([data-theme]) {
    --theme-mode: dark;
  }
}

/* Performance optimization for logo animations */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Prevent cumulative layout shift for logos */
.linka-logo-container {
  contain: layout style paint;
}
        `}</style>

        <script dangerouslySetInnerHTML={{
          __html: `
            // Enhanced fetch error handling for development
            if (typeof window !== 'undefined') {
              // Store original fetch
              const originalFetch = window.fetch;

              // Override fetch with error handling
              window.fetch = function(...args) {
                const url = args[0];
                return originalFetch.apply(this, args).catch(error => {
                  // Check if this is an HMR or webpack related request
                  // Handle both string URLs and Request objects
                  const urlString = typeof url === 'string' ? url : (url && url.url) || '';
                  const isHMRRequest = urlString && (
                    urlString.includes('_next') ||
                    urlString.includes('webpack') ||
                    urlString.includes('hot-update') ||
                    urlString.includes('__nextjs_original-stack-frame')
                  );

                  if (error.message.includes('Failed to fetch') && isHMRRequest) {
                    // Log but don't propagate HMR fetch errors
                    console.warn('[HMR] Non-critical fetch error:', error.message);
                    return Promise.resolve(new Response('{}', { status: 200 }));
                  }

                  // Re-throw other errors
                  throw error;
                });
              };

              // Handle unhandled promise rejections
              window.addEventListener('unhandledrejection', function(event) {
                if (event.reason && event.reason.message &&
                    typeof event.reason.message === 'string' &&
                    event.reason.message.includes('Failed to fetch')) {
                  const isHMRError = event.reason.stack &&
                    typeof event.reason.stack === 'string' && (
                    event.reason.stack.includes('webpack') ||
                    event.reason.stack.includes('_next') ||
                    event.reason.stack.includes('hmr')
                  );

                  if (isHMRError) {
                    console.warn('[HMR] Handled unhandled rejection:', event.reason.message);
                    event.preventDefault();
                  }
                }
              });
            }
          `
        }} />
      </head>
      <body>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <RetailerAuthProvider>
                <MarketplaceProvider>
                  <ThemeCustomizationProvider>
                    <AuthRedirectWrapper>
                      {children}
                    </AuthRedirectWrapper>
                  </ThemeCustomizationProvider>
                </MarketplaceProvider>
              </RetailerAuthProvider>
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
