import type { Metadata } from 'next'
import { ErrorBoundary } from '@/components/error-boundary'

export const metadata: Metadata = {
  title: 'Retailer Dashboard - Linka',
  description: 'Manage your business with Linka\'s comprehensive retailer dashboard',
}

export default function RetailerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ErrorBoundary>
      <div className="retailer-layout">
        {children}
      </div>
    </ErrorBoundary>
  )
}
