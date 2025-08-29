"use client";

import PremiumDashboardLayout from '@/components/retailer/premium-dashboard-layout';
import PremiumInventoryPage from '@/components/retailer/premium-inventory-page';

export default function InventoryPage() {
  return (
    <PremiumDashboardLayout>
      <PremiumInventoryPage />
    </PremiumDashboardLayout>
  );
}
