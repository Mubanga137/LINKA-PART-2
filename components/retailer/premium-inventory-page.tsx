"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Package,
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  ArrowUpDown,
  Check,
  X,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

interface Item {
  id: string; // SKU
  name: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  sales7d: number;
}

const initialData: Item[] = [
  { id: "SKU-1001", name: "iPhone 15 Pro Max", category: "Phones", price: 19999, stock: 15, minStock: 10, sales7d: 7 },
  { id: "SKU-1002", name: "MacBook Pro M3", category: "Laptops", price: 34999, stock: 8, minStock: 5, sales7d: 3 },
  { id: "SKU-1003", name: "AirPods Pro 2", category: "Audio", price: 3999, stock: 32, minStock: 20, sales7d: 12 },
  { id: "SKU-1004", name: "Samsung S24", category: "Phones", price: 14999, stock: 22, minStock: 10, sales7d: 5 },
  { id: "SKU-1005", name: "iPad Air M2", category: "Tablets", price: 9999, stock: 7, minStock: 15, sales7d: 4 },
  { id: "SKU-1006", name: "Apple Watch S9", category: "Wearables", price: 6999, stock: 0, minStock: 8, sales7d: 2 },
  { id: "SKU-1007", name: "Sony WH-1000XM5", category: "Audio", price: 5599, stock: 19, minStock: 10, sales7d: 9 },
];

const statusColor = (item: Item) => {
  if (item.stock === 0) return "bg-red-100 text-red-700 border-red-200";
  if (item.stock < item.minStock) return "bg-orange-100 text-orange-700 border-orange-200";
  if (item.stock < item.minStock * 1.5) return "bg-yellow-100 text-yellow-700 border-yellow-200";
  return "bg-emerald-100 text-emerald-700 border-emerald-200";
};

const STOCK_COLORS = ["#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#22d3ee", "#34d399", "#60a5fa"];

export default function PremiumInventoryPage() {
  const [items, setItems] = useState<Item[]>(initialData);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"stock" | "price" | "sales">("stock");
  const [onlyLow, setOnlyLow] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState(0);
  const [editStock, setEditStock] = useState(0);
  const uploadRef = useRef<HTMLInputElement>(null);

  const categories = useMemo(() => ["All", ...Array.from(new Set(items.map(i => i.category)))], [items]);

  const filtered = useMemo(() => {
    let rows = items.filter(i =>
      (category === "All" || i.category === category) &&
      (query === "" || i.name.toLowerCase().includes(query.toLowerCase()) || i.id.toLowerCase().includes(query.toLowerCase())) &&
      (!onlyLow || i.stock === 0 || i.stock < i.minStock)
    );
    rows.sort((a, b) => {
      if (sortBy === "stock") return b.stock - a.stock;
      if (sortBy === "price") return b.price - a.price;
      return b.sales7d - a.sales7d;
    });
    return rows;
  }, [items, query, category, sortBy, onlyLow]);

  // Charts: deterministic seed, then refresh client-side
  const [trendData, setTrendData] = useState(
    Array.from({ length: 8 }).map((_, idx) => ({ week: `W${idx + 1}`, sales: 0 }))
  );
  useEffect(() => {
    const id = setInterval(() => {
      setTrendData(prev => prev.map((p, i) => ({ week: p.week, sales: Math.max(0, 20 + (i * 7) % 25 + Math.round(Math.random() * 15)) })));
    }, 5000);
    // initial
    setTrendData(Array.from({ length: 8 }).map((_, i) => ({ week: `W${i + 1}`, sales: 25 + (i * 5) % 20 })));
    return () => clearInterval(id);
  }, []);

  const stockChartData = useMemo(() => {
    return [...items]
      .sort((a, b) => b.stock - a.stock)
      .slice(0, 7)
      .map(i => ({ name: i.name.split(" ")[0], stock: i.stock }));
  }, [items]);

  const categoryDist = useMemo(() => {
    const map = new Map<string, number>();
    items.forEach(i => map.set(i.category, (map.get(i.category) || 0) + i.stock));
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [items]);

  const restock = (id: string, amount = 5) => setItems(prev => prev.map(p => (p.id === id ? { ...p, stock: p.stock + amount } : p)));
  const remove = (id: string) => setItems(prev => prev.filter(p => p.id !== id));
  const startEdit = (it: Item) => {
    setEditing(it.id);
    setEditPrice(it.price);
    setEditStock(it.stock);
  };
  const saveEdit = () => {
    if (!editing) return;
    setItems(prev => prev.map(p => (p.id === editing ? { ...p, price: editPrice, stock: editStock } : p)));
    setEditing(null);
  };

  const onUploadClick = () => uploadRef.current?.click();
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const rows = text.trim().split(/\r?\n/);
    const header = rows.shift()?.split(",");
    if (!header) return;
    const idx = (name: string) => header.findIndex(h => h.trim().toLowerCase() === name);
    const req = ["id", "name", "category", "price", "stock", "minstock", "sales7d"].every(h => idx(h) >= 0);
    if (!req) return;
    const parsed: Item[] = rows.map(r => {
      const c = r.split(",");
      return {
        id: c[idx("id")].trim(),
        name: c[idx("name")].trim(),
        category: c[idx("category")].trim(),
        price: Number(c[idx("price")]),
        stock: Number(c[idx("stock")]),
        minStock: Number(c[idx("minstock")]),
        sales7d: Number(c[idx("sales7d")]),
      };
    });
    setItems(prev => {
      const map = new Map(prev.map(p => [p.id, p] as const));
      parsed.forEach(p => map.set(p.id, p));
      return Array.from(map.values());
    });
    e.target.value = "";
  };

  const exportCSV = () => {
    const header = ["id", "name", "category", "price", "stock", "minStock", "sales7d"].join(",");
    const body = items
      .map(i => [i.id, i.name, i.category, i.price, i.stock, i.minStock, i.sales7d].join(","))
      .join("\n");
    const csv = header + "\n" + body;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inventory.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const mostSold = useMemo(() => [...items].sort((a, b) => b.sales7d - a.sales7d).slice(0, 5), [items]);
  const underPerf = useMemo(() => [...items].sort((a, b) => a.sales7d - b.sales7d).slice(0, 5), [items]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Inventory & Stock</h1>
          <p className="text-muted-foreground">Real-time tracking, alerts, bulk ops, and analytics.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={onUploadClick} variant="secondary" className="bg-gradient-to-r from-orange-50 to-teal-50 border">
            <Upload className="h-4 w-4 mr-2" /> Bulk Upload (CSV)
          </Button>
          <input ref={uploadRef} type="file" accept=".csv" className="hidden" onChange={onFileChange} />
          <Button onClick={exportCSV} variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
          <Button className="bg-gradient-to-r from-orange-500 to-teal-600 text-white hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" /> Add Item
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-4 grid gap-3 md:grid-cols-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name or SKU" value={query} onChange={e => setQuery(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                {categories.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
              <SelectTrigger><SelectValue placeholder="Sort By" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="stock">Stock</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="sales">7d Sales</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input id="lowonly" type="checkbox" className="h-4 w-4" checked={onlyLow} onChange={e => setOnlyLow(e.target.checked)} />
            <label htmlFor="lowonly" className="text-sm">Show only low stock</label>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-0 shadow-lg lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" /> Stock Levels</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="stock" radius={[6, 6, 0, 0]} fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Pie data={categoryDist} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {categoryDist.map((_, i) => (
                    <Cell key={i} fill={STOCK_COLORS[i % STOCK_COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Inventory</CardTitle>
          <div className="text-sm text-muted-foreground">{filtered.length} items</div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead>Health</TableHead>
                <TableHead className="text-right">7d Sales</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(it => (
                <TableRow key={it.id} className="hover:bg-orange-50/40">
                  <TableCell className="font-medium">{it.name}</TableCell>
                  <TableCell>{it.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-teal-200 text-teal-700 bg-teal-50">{it.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {editing === it.id ? (
                      <Input className="w-24 ml-auto" type="number" value={editPrice} onChange={e => setEditPrice(Number(e.target.value))} />
                    ) : (
                      <span>ZMW {it.price.toLocaleString()}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {editing === it.id ? (
                      <Input className="w-20 ml-auto" type="number" value={editStock} onChange={e => setEditStock(Number(e.target.value))} />
                    ) : (
                      <span>{it.stock}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColor(it)}>
                      {it.stock === 0 ? (
                        <span className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Out</span>
                      ) : it.stock < it.minStock ? (
                        <span className="flex items-center gap-1"><TrendingDown className="h-3 w-3" /> Low</span>
                      ) : (
                        <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Healthy</span>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{it.sales7d}</TableCell>
                  <TableCell className="text-right">
                    {editing === it.id ? (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="secondary" onClick={saveEdit}><Check className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditing(null)}><X className="h-4 w-4" /></Button>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => restock(it.id)}>
                          <RefreshCw className="h-3.5 w-3.5 mr-1" /> Restock
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => startEdit(it)}>
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => remove(it.id)}>
                          <Trash2 className="h-3.5 w-3.5 text-red-600" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>7-week Sales Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Most Sold (7d)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mostSold.map(i => (
              <div key={i.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{i.name}</div>
                  <div className="text-xs text-muted-foreground">{i.category} • SKU {i.id}</div>
                </div>
                <Badge className="bg-orange-100 text-orange-700 border-orange-200">{i.sales7d} sold</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Underperforming</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {underPerf.map(i => (
              <div key={i.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{i.name}</div>
                  <span className="text-xs text-muted-foreground">{i.sales7d} sales</span>
                </div>
                <Progress value={Math.min(100, i.sales7d * 5)} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
