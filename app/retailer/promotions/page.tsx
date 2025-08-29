"use client";

import PremiumDashboardLayout from '@/components/retailer/premium-dashboard-layout';
import PremiumPromotionsPage from '@/components/retailer/premium-promotions-page';

export default function PromotionsPage() {
  return (
    <PremiumDashboardLayout>
      <PremiumPromotionsPage />
    </PremiumDashboardLayout>
  );
}
