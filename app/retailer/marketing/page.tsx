"use client";

import PremiumDashboardLayout from '@/components/retailer/premium-dashboard-layout';
import PremiumMarketingPage from '@/components/retailer/premium-marketing-page';

export default function MarketingPage() {
  return (
    <PremiumDashboardLayout>
      <PremiumMarketingPage />
    </PremiumDashboardLayout>
  );
}
