"use client";

import { useMemo } from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";

interface AnalyticsPanelProps { compact?: boolean }

const sales = [
  { d: "Mon", v: 4200 },
  { d: "Tue", v: 5300 },
  { d: "Wed", v: 4800 },
  { d: "Thu", v: 6200 },
  { d: "Fri", v: 7100 },
  { d: "Sat", v: 8600 },
  { d: "Sun", v: 6400 },
];

const categories = [
  { name: "Fashion", value: 38 },
  { name: "Electronics", value: 26 },
  { name: "Home", value: 14 },
  { name: "Food", value: 12 },
  { name: "Crafts", value: 10 },
];

const COLORS = ["#0099cc", "#ff6600", "#0ea5e9", "#f59e0b", "#10b981"]; 

export function AnalyticsPanel({ compact }: AnalyticsPanelProps) {
  const kpis = useMemo(() => ([
    { label: "Total Sales", value: "ZMW 482,900", delta: "+12.4%" },
    { label: "Avg Order", value: "ZMW 142", delta: "+3.1%" },
    { label: "Retention", value: "84%", delta: "+2.2%" },
    { label: "Turnover", value: "2.7x", delta: "+0.6x" },
  ]), []);

  return (
    <div className="space-y-6">
      {!compact && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <motion.div key={k.label} whileHover={{ y: -2 }} className="rounded-xl border bg-white p-4 shadow-sm">
              <div className="text-xs text-slate-600">{k.label}</div>
              <div className="mt-2 text-xl font-bold text-slate-900">{k.value}</div>
              <div className="mt-1 text-xs font-medium text-emerald-600">{k.delta} vs last week</div>
            </motion.div>
          ))}
        </div>
      )}

      <div className={`grid ${compact ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 xl:grid-cols-3"} gap-6`}>
        <div className="rounded-xl border bg-white p-4 shadow-sm">
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
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold">Top Products</div>
            <div className="text-xs text-slate-500">Weekly</div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sales.map((s, i) => ({ name: s.d, uv: [3800,4400,5100,6100,7200,8000,6500][i] }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="uv" radius={[6,6,0,0]} fill="#ff6600" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold">Category Share</div>
            <div className="text-xs text-slate-500">This month</div>
          </div>
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
    </div>
  );
}
