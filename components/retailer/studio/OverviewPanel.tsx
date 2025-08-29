"use client";

import { motion } from "framer-motion";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

const kpis = [
  { label: "Total Sales", value: "ZMW 482,900", delta: "+12.4%" },
  { label: "Revenue (7d)", value: "ZMW 81,240", delta: "+5.6%" },
  { label: "Pending Orders", value: "23", delta: "-3" },
  { label: "Active Promotions", value: "4", delta: "+1" },
];

const sales = [
  { d: "Mon", v: 4200 }, { d: "Tue", v: 5300 }, { d: "Wed", v: 4800 },
  { d: "Thu", v: 6200 }, { d: "Fri", v: 7100 }, { d: "Sat", v: 8600 }, { d: "Sun", v: 6400 },
];

const categories = [
  { name: "Fashion", value: 38 }, { name: "Electronics", value: 26 }, { name: "Home", value: 14 }, { name: "Food", value: 12 }, { name: "Crafts", value: 10 },
];
const COLORS = ["#0099cc", "#ff6600", "#0ea5e9", "#f59e0b", "#10b981"]; 

const activity = [
  { id: "ev1", text: "Order #10234 placed (ZMW 945)", time: "2m" },
  { id: "ev2", text: "Stock updated: T-Shirt +30", time: "12m" },
  { id: "ev3", text: "Promo 'Weekend Flash' activated", time: "1h" },
  { id: "ev4", text: "New customer signed up", time: "2h" },
];

export function OverviewPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.05 }} className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-xs text-slate-600">{k.label}</div>
            <div className="mt-2 text-xl font-bold text-slate-900">{k.value}</div>
            <div className={`mt-1 text-xs font-medium ${k.delta.startsWith('+')? 'text-emerald-600' : 'text-red-600'}`}>{k.delta} vs prev</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="rounded-xl border bg-white p-4 shadow-sm xl:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold">Sales Trend</div>
            <div className="text-xs text-slate-500">7 days</div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="d" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="v" stroke="#0099cc" strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="mb-3 text-sm font-semibold">Category Share</div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categories} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={4}>
                  {categories.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="mb-3 text-sm font-semibold">Goal Progress</div>
          <div className="space-y-3">
            {[{t:'Weekly Sales',v:72,c:'#0099cc'},{t:'Orders Fulfilled',v:58,c:'#10b981'},{t:'Campaign Target',v:41,c:'#ff6600'}].map(g => (
              <div key={g.t} className="space-y-1">
                <div className="flex items-center justify-between text-xs"><span className="text-slate-600">{g.t}</span><span className="font-semibold text-slate-900">{g.v}%</span></div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${g.v}%`, background: `linear-gradient(90deg, ${g.c}, ${g.c}AA)` }} /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-2 rounded-xl border bg-white p-4 shadow-sm">
          <div className="mb-3 text-sm font-semibold">Live Activity</div>
          <div className="space-y-2">
            {activity.map((a, i) => (
              <motion.div key={a.id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i*0.04 }} className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
                <span className="text-slate-700">{a.text}</span>
                <span className="text-[11px] text-slate-500">{a.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
