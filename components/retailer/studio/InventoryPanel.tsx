"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, Edit, Plus, Trash2, Upload } from "lucide-react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";

interface Item {
  id: string;
  name: string;
  category: string;
  sku: string;
  stock: number;
  min: number;
}

const seed: Item[] = [
  { id: "1", name: "Premium Cotton T-Shirt", category: "Fashion", sku: "TSH-1001", stock: 3, min: 12 },
  { id: "2", name: "Wireless Headphones", category: "Electronics", sku: "ELC-5023", stock: 22, min: 10 },
  { id: "3", name: "Chitenge Fabric Pack", category: "Textiles", sku: "TXT-3011", stock: 7, min: 15 },
  { id: "4", name: "Organic Coffee Beans", category: "Food", sku: "FOO-2088", stock: 18, min: 12 },
  { id: "5", name: "Bamboo Home Organizer", category: "Home", sku: "HOM-7781", stock: 41, min: 8 },
  { id: "6", name: "Artisanal Beads", category: "Crafts", sku: "CRF-1107", stock: 9, min: 10 },
];

export function InventoryPanel() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [rows, setRows] = useState<Item[]>(seed);
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => rows.filter(r => {
    const match = r.name.toLowerCase().includes(query.toLowerCase()) || r.sku.toLowerCase().includes(query.toLowerCase()) || r.category.toLowerCase().includes(query.toLowerCase());
    if (status === "low") return match && r.stock <= r.min;
    if (status === "ok") return match && r.stock > r.min;
    return match;
  }), [rows, query, status]);

  const downloadCSV = () => {
    const header = ["id","name","category","sku","stock","min"]; 
    const data = [header.join(","), ...rows.map(r => [r.id, r.name, r.category, r.sku, r.stock, r.min].join(","))].join("\n");
    const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "inventory.csv"; a.click(); URL.revokeObjectURL(url);
  };

  const restock = (id: string) => setRows(s => s.map(r => r.id === id ? { ...r, stock: r.stock + 10 } : r));
  const remove = (id: string) => setRows(s => s.filter(r => r.id !== id));
  const addItem = () => setRows(s => [{ id: String(Date.now()), name: "New Product", category: "Misc", sku: `NEW-${Math.floor(Math.random()*9999)}`, stock: 12, min: 6 }, ...s]);

  const dataByCat = useMemo(() => {
    const map: Record<string, number> = {};
    rows.forEach(r => map[r.category] = (map[r.category] || 0) + r.stock);
    return Object.entries(map).map(([name, uv]) => ({ name, uv }));
  }, [rows]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name, SKU, category"
            className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0099cc]"
          />
          <div className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-slate-400 text-xs">{filtered.length} results</div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setStatus("all")} className={`rounded-lg border px-3 py-2 text-sm ${status==='all'? 'bg-slate-900 text-white' : 'bg-white hover:bg-slate-50'}`}>All</button>
          <button onClick={() => setStatus("low")} className={`rounded-lg border px-3 py-2 text-sm ${status==='low'? 'bg-[#ff6600] text-white border-transparent' : 'bg-white hover:bg-slate-50'}`}>Low</button>
          <button onClick={() => setStatus("ok")} className={`rounded-lg border px-3 py-2 text-sm ${status==='ok'? 'bg-[#0099cc] text-white border-transparent' : 'bg-white hover:bg-slate-50'}`}>OK</button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold">Products</div>
            <div className="flex items-center gap-2">
              <button onClick={addItem} className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm bg-white hover:bg-slate-50"><Plus className="h-4 w-4"/> Add</button>
              <button onClick={downloadCSV} className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm bg-white hover:bg-slate-50"><Download className="h-4 w-4"/> Export</button>
              <label className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm bg-white hover:bg-slate-50 cursor-pointer">
                <Upload className="h-4 w-4"/> Import CSV
                <input type="file" accept=".csv" className="hidden" onChange={(e)=>{ if(e.target.files?.[0]) alert(`Imported: ${e.target.files[0].name}`); }} />
              </label>
            </div>
          </div>

          <div className="overflow-auto rounded-lg border">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-3 py-2 text-left">Name</th>
                  <th className="px-3 py-2 text-left">Category</th>
                  <th className="px-3 py-2 text-left">SKU</th>
                  <th className="px-3 py-2 text-left">Stock</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => {
                  const low = r.stock <= r.min;
                  return (
                    <tr key={r.id} className="border-t hover:bg-slate-50/60">
                      <td className="px-3 py-2 font-medium text-slate-900">{r.name}</td>
                      <td className="px-3 py-2">{r.category}</td>
                      <td className="px-3 py-2">{r.sku}</td>
                      <td className="px-3 py-2">{r.stock}</td>
                      <td className="px-3 py-2">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${low? 'bg-[#ff6600]/10 text-[#ff6600]' : 'bg-[#0099cc]/10 text-[#0099cc]' }`}>
                          {low? 'Low' : 'OK'}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={()=>restock(r.id)} className="rounded-md border px-2 py-1 text-xs hover:bg-slate-50">Restock +10</button>
                          <button onClick={()=>alert('Edit product')} className="rounded-md border px-2 py-1 text-xs hover:bg-slate-50"><Edit className="h-3.5 w-3.5"/></button>
                          <button onClick={()=>remove(r.id)} className="rounded-md border px-2 py-1 text-xs text-red-600 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5"/></button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="mb-3 text-sm font-semibold">Stock by Category</div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataByCat}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="uv" fill="#0099cc" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
