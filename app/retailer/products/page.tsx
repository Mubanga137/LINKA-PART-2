import PremiumDashboardLayout from '@/components/retailer/premium-dashboard-layout';
import PremiumProductsPage from '@/components/retailer/premium-products-page';

export default function ProductsPage() {
  return (
    <PremiumDashboardLayout>
      <PremiumProductsPage />
    </PremiumDashboardLayout>
  );
}
