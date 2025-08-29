"use client";

import PremiumDashboardLayout from '@/components/retailer/premium-dashboard-layout';
import PremiumMessagesPage from '@/components/retailer/premium-messages-page';

export default function MessagesPage() {
  return (
    <PremiumDashboardLayout>
      <PremiumMessagesPage />
    </PremiumDashboardLayout>
  );
}
