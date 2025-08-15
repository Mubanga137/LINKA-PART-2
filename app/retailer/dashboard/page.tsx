'use client';

import PremiumDashboardLayout from '@/components/retailer/premium-dashboard-layout';
import PremiumDashboardOverview from '@/components/retailer/premium-dashboard-overview';

export default function RetailerDashboardPage() {
  return (
    <PremiumDashboardLayout>
      <PremiumDashboardOverview />
    </PremiumDashboardLayout>
  );
}
