"use client";

import { motion } from "framer-motion";
import { Lightbulb, Bell, Sparkles, Plus, Megaphone, Package } from "lucide-react";

export function ContextPanel() {
  const alerts = [
    { id: "a1", text: "Low stock: Chitenge Fabric (5 remaining)", time: "2m" },
    { id: "a2", text: "New order #10234 placed (ZMW 945)", time: "12m" },
    { id: "a3", text: "Flash Sale campaign CTR up 8.2%", time: "1h" },
  ];

  const suggestions = [
    { id: "s1", icon: Package, title: "Restock Suggestion", desc: "Reorder 40 units of Bamboo Organizer (sell-through 78%)." },
    { id: "s2", icon: Megaphone, title: "Promo Tip", desc: "Bundle Tech Accessories for +12% AOV during weekend." },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-4 w-4 text-[#0099cc]" />
          <div className="text-sm font-semibold">Quick Actions</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-50 inline-flex items-center gap-2"><Plus className="h-4 w-4"/> New Product</button>
          <button className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-50 inline-flex items-center gap-2"><Megaphone className="h-4 w-4"/> New Campaign</button>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="h-4 w-4 text-[#ff6600]" />
          <div className="text-sm font-semibold">AI Recommendations</div>
        </div>
        <div className="space-y-3">
          {suggestions.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.06 }} className="rounded-lg border p-3">
              <div className="flex items-start gap-2">
                <s.icon className="h-4 w-4 text-slate-600 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-slate-900">{s.title}</div>
                  <div className="text-xs text-slate-600">{s.desc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Bell className="h-4 w-4 text-[#0099cc]" />
          <div className="text-sm font-semibold">Live Alerts</div>
        </div>
        <div className="space-y-3">
          {alerts.map((n, i) => (
            <motion.div key={n.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i*0.05 }} className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
              <span className="text-slate-700">{n.text}</span>
              <span className="text-[11px] text-slate-500">{n.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
