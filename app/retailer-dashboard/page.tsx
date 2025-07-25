import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { ProductManagement } from "@/components/dashboard/product-management"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

export default function RetailerDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6 lg:p-8">
            <DashboardStats />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
              <div className="xl:col-span-2">
                <DashboardCharts />
              </div>
              <div>
                <RecentOrders />
              </div>
            </div>
            <ProductManagement />
          </main>
        </div>
      </div>
    </div>
  )
}
