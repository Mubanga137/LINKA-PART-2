"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

interface N { id: string; type: "stock"|"promo"|"message"|"store"; text: string; time: string; read: boolean }

export function NotificationsPanel() {
  const [filter, setFilter] = useState<"all"|N["type"]>("all");
  const [list, setList] = useState<N[]>([
    { id: "1", type: "stock", text: "Low stock: Chitenge Fabric (5 remaining)", time: "2m ago", read: false },
    { id: "2", type: "message", text: "New message from Sarah Mwanza", time: "8m ago", read: false },
    { id: "3", type: "promo", text: "Flash sale campaign reached 12k views", time: "1h ago", read: true },
    { id: "4", type: "store", text: "Banner updated on storefront", time: "3h ago", read: true },
  ]);

  const filtered = useMemo(() => list.filter(n => filter==='all' ? true : n.type===filter), [list, filter]);

  const markAll = () => setList(s => s.map(n => ({ ...n, read: true })));
  const toggle = (id: string) => setList(s => s.map(n => n.id===id? { ...n, read: !n.read } : n));

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold">Notifications</div>
        <button onClick={markAll} className="rounded-lg border px-3 py-1.5 text-xs hover:bg-slate-50">Mark all read</button>
      </div>

      <div className="flex flex-wrap gap-2 mb-3 text-xs">
        {(["all","stock","promo","message","store"] as const).map(k => (
          <button key={k} onClick={()=>setFilter(k)} className={`rounded-full border px-3 py-1 ${filter===k? 'bg-[#0099cc] text-white border-transparent' : 'bg-white hover:bg-slate-50'}`}>{k}</button>
        ))}
      </div>

      <div className="divide-y">
        {filtered.map(n => (
          <div key={n.id} className="flex items-center justify-between gap-3 py-3">
            <div>
              <div className={`text-sm ${n.read? 'text-slate-600' : 'font-semibold text-slate-900'}`}>{n.text}</div>
              <div className="text-[11px] text-slate-500">{n.time}</div>
            </div>
            <button onClick={()=>toggle(n.id)} className={`rounded-full px-3 py-1 text-xs border ${n.read? 'bg-slate-50' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>{n.read? 'Mark unread' : 'Mark read'}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
