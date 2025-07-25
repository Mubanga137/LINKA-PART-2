import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Clock, CheckCircle, AlertCircle } from "lucide-react"

const orders = [
  {
    id: "#ORD-001",
    customer: "Grace Mulenga",
    product: "Traditional Chitenge Dress",
    amount: "ZMW 250",
    status: "completed",
    time: "2 hours ago",
  },
  {
    id: "#ORD-002",
    customer: "Joseph Banda",
    product: "Copper Wire Elephant",
    amount: "ZMW 180",
    status: "processing",
    time: "4 hours ago",
  },
  {
    id: "#ORD-003",
    customer: "Mary Phiri",
    product: "Handwoven Basket",
    amount: "ZMW 145",
    status: "pending",
    time: "6 hours ago",
  },
  {
    id: "#ORD-004",
    customer: "David Tembo",
    product: "Kalimba Set",
    amount: "ZMW 75",
    status: "completed",
    time: "1 day ago",
  },
]

const statusConfig = {
  completed: { icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-100" },
  processing: { icon: Clock, color: "text-orange-600", bg: "bg-orange-100" },
  pending: { icon: AlertCircle, color: "text-red-600", bg: "bg-red-100" },
}

export function RecentOrders() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-slate-900">
          <div className="flex items-center">
            <Package className="h-5 w-5 mr-2 text-emerald-500" />
            Recent Orders
          </div>
          <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700">
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order, index) => {
            const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
            const statusColor = statusConfig[order.status as keyof typeof statusConfig].color
            const statusBg = statusConfig[order.status as keyof typeof statusConfig].bg

            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl hover:bg-slate-100/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-slate-900">{order.id}</span>
                    <span className="text-sm text-slate-500">{order.time}</span>
                  </div>
                  <div className="text-sm text-slate-600 mb-1">{order.customer}</div>
                  <div className="text-sm text-slate-500">{order.product}</div>
                </div>
                <div className="text-right ml-4">
                  <div className="font-bold text-slate-900 mb-2">{order.amount}</div>
                  <div
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusBg} ${statusColor}`}
                  >
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {order.status}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
