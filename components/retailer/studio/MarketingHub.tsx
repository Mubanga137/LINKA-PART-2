"use client";

import { useMemo, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

export function MarketingHub() {
  const [segments, setSegments] = useState<string[]>(["New Customers", "Returning", "High Value"]);
  const [selected, setSelected] = useState<string[]>(["Returning", "High Value"]);

  const perf = useMemo(() => [
    { name: "Email", uv: 4200 },
    { name: "SMS", uv: 3200 },
    { name: "In-App", uv: 5100 },
    { name: "Social", uv: 6100 },
  ], []);

  const toggle = (s: string) => setSelected(prev => prev.includes(s) ? prev.filter(i => i!==s) : [...prev, s]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="rounded-xl border bg-white p-4 shadow-sm lg:col-span-2">
        <div className="mb-3 text-sm font-semibold">Campaign Performance</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={perf}>
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
        <div className="mb-3 text-sm font-semibold">Audience Segmentation</div>
        <div className="flex flex-wrap gap-2">
          {segments.map(s => (
            <button key={s} onClick={()=>toggle(s)} className={`rounded-full border px-3 py-1 text-xs ${selected.includes(s)? 'bg-[#0099cc] text-white border-transparent' : 'bg-white hover:bg-slate-50'}`}>{s}</button>
          ))}
        </div>
        <div className="mt-4 text-sm text-slate-700">
          Target size: <span className="font-semibold">{(selected.length*1240).toLocaleString()}</span>
        </div>
        <div className="mt-2 text-xs text-slate-500">Toggle segments to refine your audience.</div>
      </div>
    </div>
  );
}
