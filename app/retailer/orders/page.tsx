import PremiumDashboardLayout from '@/components/retailer/premium-dashboard-layout';
import PremiumOrdersPage from '@/components/retailer/premium-orders-page';

export default function OrdersPage() {
  return (
    <PremiumDashboardLayout>
      <PremiumOrdersPage />
    </PremiumDashboardLayout>
  );
}
