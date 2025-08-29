"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Bar,
  Legend,
  AreaChart,
  Area,
  ComposedChart,
} from "recharts";
import { useRetailerAuth } from "@/contexts/retailer-auth-context";
import { TrendingUp, Users, Eye, ShoppingBag, ArrowUpRight, ArrowDownRight, Filter, ChevronRight } from "lucide-react";

const COLORS = ["#0099cc", "#ff6600", "#0ea5e9", "#f59e0b", "#10b981"];

function useGreeting(name?: string | null) {
  const hours = new Date().getHours();
  const time = hours < 12 ? "Morning" : hours < 18 ? "Afternoon" : "Evening";
  return `Good ${time}, ${name || "Retailer"}`;
}

const quickStats = [
  { key: "sales", label: "Today’s Sales", value: 18250, currency: "ZK", delta: 8.2 },
  { key: "orders", label: "Total Orders Today", value: 74, delta: 3.4 },
  { key: "customers", label: "New Customers Today", value: 19, delta: 2.1 },
  { key: "views", label: "Store Views Today", value: 1260, delta: -1.9 },
];

const kpiBreakdowns = {
  orders: { new: 18, processing: 42, completed: 12, pending: 2 },
  customers: { active: 421, returning: 122, new: 89 },
};

const trendDaily = [
  { d: "Mon", sales: 4200, visits: 2200, clicks: 910, conv: 3.8 },
  { d: "Tue", sales: 5300, visits: 2400, clicks: 980, conv: 4.1 },
  { d: "Wed", sales: 4800, visits: 2350, clicks: 990, conv: 4.2 },
  { d: "Thu", sales: 6200, visits: 2600, clicks: 1100, conv: 4.7 },
  { d: "Fri", sales: 7100, visits: 3000, clicks: 1240, conv: 5.1 },
  { d: "Sat", sales: 8600, visits: 3420, clicks: 1460, conv: 5.4 },
  { d: "Sun", sales: 6400, visits: 2800, clicks: 1200, conv: 4.9 },
];

const trendWeekly = [
  { d: "Wk 1", sales: 28100, visits: 14500, clicks: 5900, conv: 4.1 },
  { d: "Wk 2", sales: 30560, visits: 15300, clicks: 6220, conv: 4.3 },
  { d: "Wk 3", sales: 31890, visits: 16400, clicks: 6600, conv: 4.5 },
  { d: "Wk 4", sales: 34220, visits: 17100, clicks: 7010, conv: 4.7 },
];

const trendMonthly = [
  { d: "Jan", sales: 121000, visits: 64000, clicks: 25500, conv: 4.0 },
  { d: "Feb", sales: 132400, visits: 66500, clicks: 26800, conv: 4.1 },
  { d: "Mar", sales: 140800, visits: 68800, clicks: 27900, conv: 4.2 },
  { d: "Apr", sales: 152300, visits: 72000, clicks: 29500, conv: 4.3 },
];

const ordersBreakdown = [
  { name: "Pending", value: 14 },
  { name: "Processing", value: 42 },
  { name: "Completed", value: 36 },
  { name: "Cancelled", value: 8 },
];

const recentOrders = [
  { id: "#10241", customer: "Mary Banda", items: "2× Headphones, 1× USB-C Cable", date: "2025-08-27", status: "Completed", value: 945 },
  { id: "#10240", customer: "James Phiri", items: "1× Hoodie", date: "2025-08-27", status: "Processing", value: 320 },
  { id: "#10239", customer: "Chipo Mwila", items: "3× Sports T-Shirt", date: "2025-08-27", status: "Pending", value: 540 },
  { id: "#10238", customer: "John Tembo", items: "1× Smartwatch", date: "2025-08-26", status: "Completed", value: 2150 },
  { id: "#10237", customer: "Loveness Zulu", items: "2× Sneakers", date: "2025-08-26", status: "Processing", value: 1760 },
  { id: "#10236", customer: "Mwansa Chileshe", items: "1× Blender", date: "2025-08-26", status: "Cancelled", value: 650 },
  { id: "#10235", customer: "Mutale Bwalya", items: "1× Wireless Mouse", date: "2025-08-26", status: "Completed", value: 280 },
  { id: "#10234", customer: "Agness Mbewe", items: "1× Dress, 1× Scarf", date: "2025-08-25", status: "Completed", value: 945 },
];


function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Processing: "bg-blue-50 text-blue-700 border-blue-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Cancelled: "bg-rose-50 text-rose-700 border-rose-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${map[status] || "bg-slate-50 text-slate-700 border-slate-200"}`}>
      {status}
    </span>
  );
}

export function OverviewPanel() {
  const { user } = useRetailerAuth();
  const greeting = useGreeting(user?.name);
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily");
  const [revMode, setRevMode] = useState<"week" | "month">("week");

  const trend = useMemo(() => {
    return period === "daily" ? trendDaily : period === "weekly" ? trendWeekly : trendMonthly;
  }, [period]);

  const monthlyTarget = 250000; // ZK
  const monthSales = 175400; // ZK
  const targetPct = Math.min(100, Math.round((monthSales / monthlyTarget) * 100));

  return (
    <div className="space-y-6">
      {/* Header: Greeting + Quick Stats */}
      <div className="rounded-xl border bg-white/90 backdrop-blur p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-semibold bg-gradient-to-r from-[#0099cc] to-[#ff6600] bg-clip-text text-transparent">Welcome back</div>
            <div className="mt-1 text-lg sm:text-xl font-bold tracking-tight text-slate-900">{greeting} 👋</div>
            <div className="text-xs text-slate-600">Here’s what’s happening with your store today</div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
            {quickStats.map((qs, i) => (
              <motion.div key={qs.key} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="group rounded-lg border bg-white px-3 py-2 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between text-[11px] text-slate-600">
                  <span>{qs.label}</span>
                  {qs.delta >= 0 ? (
                    <span className="inline-flex items-center gap-0.5 text-emerald-600 font-medium"><ArrowUpRight className="h-3 w-3" />{qs.delta}%</span>
                  ) : (
                    <span className="inline-flex items-center gap-0.5 text-rose-600 font-medium"><ArrowDownRight className="h-3 w-3" />{Math.abs(qs.delta)}%</span>
                  )}
                </div>
                <div className="mt-1 text-base font-bold text-slate-900">
                  {qs.key === "sales" ? `${qs.currency} ${qs.value.toLocaleString()}` : qs.value.toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Sales Revenue */}
        <div className="group rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Sales Revenue</div>
            <div className="flex gap-1">
              <button onClick={() => setRevMode("week")} className={`rounded-md px-2 py-1 text-xs border ${revMode==='week'? 'bg-[#0099cc] text-white border-transparent' : 'bg-white text-slate-700 border-slate-200'}`}>Weekly</button>
              <button onClick={() => setRevMode("month")} className={`rounded-md px-2 py-1 text-xs border ${revMode==='month'? 'bg-[#ff6600] text-white border-transparent' : 'bg-white text-slate-700 border-slate-200'}`}>Monthly</button>
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">ZK {revMode === 'week' ? '34,220' : '152,300'}</div>
          <div className="text-xs text-emerald-600 font-medium">+6.3% vs prev {revMode}</div>
          <div className="mt-3 h-20">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revMode === 'week' ? trendWeekly : trendMonthly}>
                <defs>
                  <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0099cc" stopOpacity={0.45}/>
                    <stop offset="95%" stopColor="#0099cc" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
                <XAxis dataKey="d" hide />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#0099cc" fillOpacity={1} fill="url(#gradRevenue)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 overflow-hidden transition-all max-h-0 group-hover:max-h-24">
            <div className="text-xs text-slate-600">Breakdown</div>
            <div className="mt-1 grid grid-cols-3 gap-2 text-xs">
              <div className="rounded-md border p-2"><div className="text-slate-600">Avg Order</div><div className="font-semibold text-slate-900">ZK 462</div></div>
              <div className="rounded-md border p-2"><div className="text-slate-600">Top Day</div><div className="font-semibold text-slate-900">Sat</div></div>
              <div className="rounded-md border p-2"><div className="text-slate-600">Refunds</div><div className="font-semibold text-slate-900">1.2%</div></div>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="group rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Total Orders</div>
            <ShoppingBag className="h-4 w-4 text-[#ff6600]" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">1,256</div>
          <div className="text-xs text-emerald-600 font-medium">+3.2% vs last week</div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            <div className="rounded-md border p-2"><div className="text-slate-600">New</div><div className="font-semibold text-slate-900">{kpiBreakdowns.orders.new}</div></div>
            <div className="rounded-md border p-2"><div className="text-slate-600">Completed</div><div className="font-semibold text-slate-900">{kpiBreakdowns.orders.completed}</div></div>
            <div className="rounded-md border p-2"><div className="text-slate-600">Pending</div><div className="font-semibold text-slate-900">{kpiBreakdowns.orders.pending}</div></div>
          </div>
        </div>

        {/* Active Customers */}
        <div className="group rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Active Customers</div>
            <Users className="h-4 w-4 text-[#0099cc]" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">421</div>
          <div className="text-xs text-emerald-600 font-medium">+2.8% engaged</div>
          <div className="mt-2 overflow-hidden transition-all max-h-0 group-hover:max-h-20">
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="rounded-md border p-2"><div className="text-slate-600">Returning</div><div className="font-semibold text-slate-900">{kpiBreakdowns.customers.returning}</div></div>
              <div className="rounded-md border p-2"><div className="text-slate-600">New</div><div className="font-semibold text-slate-900">{kpiBreakdowns.customers.new}</div></div>
              <div className="rounded-md border p-2"><div className="text-slate-600">Churn</div><div className="font-semibold text-slate-900">3.1%</div></div>
            </div>
          </div>
        </div>

        {/* Store Views */}
        <div className="group rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Store Views</div>
            <Eye className="h-4 w-4 text-slate-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">12,604</div>
          <div className="text-xs text-emerald-600 font-medium">+4.5% vs last week</div>
          <div className="mt-2 overflow-hidden transition-all max-h-0 group-hover:max-h-16">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-md border p-2"><div className="text-slate-600">Avg Time</div><div className="font-semibold text-slate-900">3m 40s</div></div>
              <div className="rounded-md border p-2"><div className="text-slate-600">Bounce</div><div className="font-semibold text-slate-900">42%</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* Graphs & Insights */}
      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
        <div className="rounded-xl border bg-white p-4 shadow-sm 2xl:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold flex items-center gap-2"><TrendingUp className="h-4 w-4 text-[#0099cc]"/> Sales Trend</div>
            <div className="flex items-center gap-1 text-xs">
              <button onClick={() => setPeriod("daily")} className={`rounded-md px-2 py-1 border ${period==='daily' ? 'bg-[#0099cc] text-white border-transparent' : 'bg-white text-slate-700 border-slate-200'}`}>Daily</button>
              <button onClick={() => setPeriod("weekly")} className={`rounded-md px-2 py-1 border ${period==='weekly' ? 'bg-[#ff6600] text-white border-transparent' : 'bg-white text-slate-700 border-slate-200'}`}>Weekly</button>
              <button onClick={() => setPeriod("monthly")} className={`rounded-md px-2 py-1 border ${period==='monthly' ? 'bg-slate-800 text-white border-transparent' : 'bg-white text-slate-700 border-slate-200'}`}>Monthly</button>
              <Filter className="ml-1 h-3.5 w-3.5 text-slate-500" />
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={trend}>
                <ComposedChartLike data={trend} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="mb-3 text-sm font-semibold">Orders Breakdown</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={ordersBreakdown} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={4}>
                  {ordersBreakdown.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={24} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Orders Overview */}
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-semibold">Recent Orders</div>
          <button className="text-xs inline-flex items-center gap-1 rounded-md border px-2 py-1 hover:bg-slate-50">View all <ChevronRight className="h-3 w-3"/></button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600 border-b">
                <th className="py-2 pr-4">Order ID</th>
                <th className="py-2 pr-4">Customer</th>
                <th className="py-2 pr-4">Products</th>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4 text-right">Value (ZK)</th>
                <th className="py-2 pl-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o, i) => (
                <motion.tr key={o.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="border-b last:border-0">
                  <td className="py-2 pr-4 font-medium text-slate-900">{o.id}</td>
                  <td className="py-2 pr-4">{o.customer}</td>
                  <td className="py-2 pr-4 text-slate-700">{o.items}</td>
                  <td className="py-2 pr-4 text-slate-600">{o.date}</td>
                  <td className="py-2 pr-4"><StatusBadge status={o.status} /></td>
                  <td className="py-2 pr-4 text-right font-semibold">{o.value.toLocaleString()}</td>
                  <td className="py-2 pl-4 text-right"><button className="rounded-md border px-2.5 py-1 text-xs hover:bg-slate-50">View</button></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions + Gamified */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="mb-3 text-sm font-semibold">Quick Actions</div>
          <div className="grid grid-cols-2 gap-3">
            {["Add New Product","View All Orders","Launch Promotion","Respond to Messages","Update Storefront","View Analytics"].map((label)=> (
              <motion.button
                key={label}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-lg border px-3 py-2 text-sm bg-white hover:bg-slate-50 text-slate-800 shadow-sm"
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Gamified / Motivation */}
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="mb-2 text-sm font-semibold">Monthly Sales Target</div>
          <div className="text-xs text-slate-600">You’ve achieved <span className="font-semibold text-slate-900">{targetPct}%</span> of your monthly target — keep going!</div>
          <div className="mt-2 h-3 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#0099cc] via-[#ff6600] to-[#ff884d]" style={{ width: `${targetPct}%` }} />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            <div className="rounded-md border p-2 text-center">
              <div className="text-slate-600">Orders</div>
              <div className="text-slate-900 font-semibold">982/1,200</div>
            </div>
            <div className="rounded-md border p-2 text-center">
              <div className="text-slate-600">Revenue</div>
              <div className="text-slate-900 font-semibold">ZK {monthSales.toLocaleString()}</div>
            </div>
            <div className="rounded-md border p-2 text-center">
              <div className="text-slate-600">Badge</div>
              <div className="text-slate-900 font-semibold">Rising Star ⭐</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper chart
function ComposedChartLike({ data }: { data: Array<any> }) {
  return (
    <>
      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
      <XAxis dataKey="d" tick={{ fontSize: 12 }} stroke="#94a3b8" />
      <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="sales" name="Sales" stroke="#0099cc" fill="#0099cc20" strokeWidth={2} />
      <Line type="monotone" dataKey="clicks" name="Clicks" stroke="#ff6600" strokeWidth={2} dot={false} />
      <Bar dataKey="visits" name="Visits" fill="#0ea5e9" opacity={0.8} />
    </>
  );
}
