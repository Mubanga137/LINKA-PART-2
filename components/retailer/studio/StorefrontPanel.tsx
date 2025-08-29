"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Item { id: string; title: string; price: number; img: string }

const initial: Item[] = [
  { id: "1", title: "Handmade Basket", price: 95, img: "https://images.unsplash.com/photo-1598965436792-5b7d6d0e3521?q=80&w=800&auto=format&fit=crop" },
  { id: "2", title: "Wireless Earbuds", price: 620, img: "https://images.unsplash.com/photo-1585386959984-a41552231698?q=80&w=800&auto=format&fit=crop" },
  { id: "3", title: "Chitenge Fabric", price: 250, img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop" },
];

export function StorefrontPanel() {
  const [items, setItems] = useState<Item[]>(initial);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("text/plain", id);
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    const id = e.dataTransfer.getData("text/plain");
    if (!id) return;
    const srcIdx = items.findIndex(i => i.id === id);
    const tgtIdx = items.findIndex(i => i.id === targetId);
    if (srcIdx < 0 || tgtIdx < 0) return;
    const next = [...items];
    const [moved] = next.splice(srcIdx, 1);
    next.splice(tgtIdx, 0, moved);
    setItems(next);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="rounded-xl border bg-white p-4 shadow-sm lg:col-span-2">
        <div className="mb-3 text-sm font-semibold">Live Storefront Preview</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {items.map(i => (
            <div key={i.id} draggable onDragStart={(e)=>onDragStart(e, i.id)} onDragOver={e=>e.preventDefault()} onDrop={(e)=>onDrop(e, i.id)} className="group rounded-xl border overflow-hidden bg-white shadow-sm">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={i.img} alt={i.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="p-3">
                <div className="text-sm font-semibold text-slate-900 line-clamp-1">{i.title}</div>
                <div className="text-xs text-slate-600">ZMW {i.price}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-slate-600">Drag cards to reorder featured placement.</div>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="mb-3 text-sm font-semibold">Visibility</div>
        <div className="space-y-2 text-sm">
          {items.map(i => (
            <label key={i.id} className="flex items-center justify-between rounded-md border px-3 py-2">
              <span className="font-medium">{i.title}</span>
              <input defaultChecked type="checkbox" className="h-4 w-4 accent-[#0099cc]" />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
