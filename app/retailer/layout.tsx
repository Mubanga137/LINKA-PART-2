import type { Metadata } from 'next'

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
    <div className="retailer-layout">
      {children}
    </div>
  )
}
