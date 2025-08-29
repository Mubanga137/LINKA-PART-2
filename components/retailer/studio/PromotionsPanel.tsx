"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ToggleRight } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  type: "percent" | "fixed" | "bundle" | "flash";
  value: number;
  active: boolean;
}

export function PromotionsPanel() {
  const [name, setName] = useState("");
  const [type, setType] = useState<Campaign["type"]>("percent");
  const [value, setValue] = useState(10);
  const [items, setItems] = useState<Campaign[]>([
    { id: "1", name: "Weekend Flash", type: "flash", value: 15, active: true },
    { id: "2", name: "New Arrivals", type: "percent", value: 10, active: false },
  ]);

  const add = () => {
    if (!name.trim()) return;
    setItems(s => [{ id: String(Date.now()), name, type, value, active: true }, ...s]);
    setName("");
  };

  const toggle = (id: string) => setItems(s => s.map(c => c.id===id? { ...c, active: !c.active } : c));

  const preview = useMemo(() => {
    const label = type === 'percent' ? `${value}% OFF` : type === 'fixed' ? `Save ZMW ${value}` : type === 'bundle' ? `Bundle & Save` : `Flash -${value}%`;
    return {
      badge: label,
      gradient: type === 'flash' ? 'from-[#ff6600] to-[#f59e0b]' : 'from-[#0099cc] to-[#06b6d4]'
    }
  }, [type, value]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="rounded-xl border bg-white p-4 shadow-sm lg:col-span-2">
        <div className="mb-3 text-sm font-semibold">Create Campaign</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name (e.g., Summer Sale)" className="rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0099cc]" />
          <select value={type} onChange={e=>setType(e.target.value as any)} className="rounded-lg border px-3 py-2 text-sm shadow-sm">
            <option value="percent">Percentage</option>
            <option value="fixed">Fixed Amount</option>
            <option value="bundle">Bundle Deal</option>
            <option value="flash">Flash Sale</option>
          </select>
          <input type="number" value={value} onChange={e=>setValue(parseInt(e.target.value||'0'))} className="rounded-lg border px-3 py-2 text-sm shadow-sm" />
          <button onClick={add} className="rounded-lg border px-3 py-2 text-sm bg-[#0099cc] text-white hover:brightness-105">Create</button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map(c => (
            <motion.div key={c.id} whileHover={{ y: -2 }} className="rounded-xl border p-4 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900">{c.name}</div>
                  <div className="text-xs text-slate-600 capitalize">{c.type}</div>
                </div>
                <button onClick={()=>toggle(c.id)} className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${c.active? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-700' }`}>
                  <ToggleRight className={`h-4 w-4 ${c.active? 'text-emerald-600' : 'text-slate-500'}`} /> {c.active? 'Active' : 'Inactive'}
                </button>
              </div>
              <div className="mt-3 text-2xl font-bold">
                {c.type==="percent" || c.type==="flash" ? `${c.value}% OFF` : c.type==="fixed" ? `Save ZMW ${c.value}` : 'Bundle & Save'}
              </div>
              <div className="mt-2 text-xs text-slate-600">Redemption Rate: {(Math.random()*20+60).toFixed(1)}%</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="mb-3 text-sm font-semibold">Preview</div>
        <div className={`rounded-xl p-5 text-white shadow-lg bg-gradient-to-br ${preview.gradient}`}>
          <div className="text-xs opacity-90">Campaign</div>
          <div className="mt-1 text-2xl font-extrabold tracking-tight">{name || 'Your Campaign'}</div>
          <div className="mt-4 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-sm font-bold">{preview.badge}</div>
          <div className="mt-10 text-xs opacity-90">As seen on Storefront & App</div>
        </div>
      </div>
    </div>
  );
}
