"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Tag,
  Plus,
  Play,
  Pause,
  Copy,
  Eye,
  Trash2,
  Calendar,
  Percent,
  DollarSign,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface Campaign {
  id: string;
  name: string;
  type: "percentage" | "fixed" | "bundle" | "flash";
  value: number;
  status: "active" | "paused" | "upcoming" | "expired";
  start: string; // ISO date
  end: string;   // ISO date
  reach: number;
  redemptions: number;
  revenue: number;
  previewText: string;
}

const seed: Campaign[] = [
  { id: "camp-1", name: "Weekend Flash Sale", type: "flash", value: 25, status: "active", start: "2024-01-20", end: "2024-01-23", reach: 4200, redemptions: 310, revenue: 78500, previewText: "This weekend: Flash Sale up to 25% off!" },
  { id: "camp-2", name: "Back to School", type: "percentage", value: 15, status: "upcoming", start: "2024-02-01", end: "2024-02-10", reach: 0, redemptions: 0, revenue: 0, previewText: "Gear up for school with 15% off essentials" },
  { id: "camp-3", name: "Bundle & Save", type: "bundle", value: 2, status: "paused", start: "2023-12-01", end: "2024-01-30", reach: 9800, redemptions: 680, revenue: 124300, previewText: "Buy 2 get 1 at 50% off on accessories" },
  { id: "camp-4", name: "Holiday Specials", type: "fixed", value: 50, status: "expired", start: "2023-12-15", end: "2023-12-27", reach: 15200, redemptions: 1000, revenue: 201400, previewText: "Save ZMW 50 on select items" },
];

export default function PremiumPromotionsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(seed);
  const [filter, setFilter] = useState<"all" | Campaign["status"]>("all");

  const [name, setName] = useState("");
  const [type, setType] = useState<Campaign["type"]>("percentage");
  const [value, setValue] = useState(10);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [previewText, setPreviewText] = useState("");

  // Live-ish metrics
  const [chart, setChart] = useState(
    Array.from({ length: 12 }).map((_, i) => ({ m: i + 1, reach: 0, redemptions: 0 }))
  );
  useEffect(() => {
    setChart(Array.from({ length: 12 }).map((_, i) => ({
      m: i + 1,
      reach: 200 + Math.round(Math.random() * 400) + i * 50,
      redemptions: 20 + Math.round(Math.random() * 60) + i * 8,
    })));
    const id = setInterval(() => {
      setChart(prev => prev.map(p => ({ ...p, reach: Math.max(50, p.reach + Math.round(Math.random() * 40 - 20)), redemptions: Math.max(10, p.redemptions + Math.round(Math.random() * 15 - 7)) })));
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const filtered = useMemo(() => (filter === "all" ? campaigns : campaigns.filter(c => c.status === filter)), [campaigns, filter]);

  const createCampaign = () => {
    if (!name || !start || !end) return;
    const c: Campaign = {
      id: "camp-" + Date.now(),
      name,
      type,
      value,
      status: new Date(start) > new Date() ? "upcoming" : "active",
      start,
      end,
      reach: 0,
      redemptions: 0,
      revenue: 0,
      previewText: previewText || defaultPreview(type, value),
    };
    setCampaigns(prev => [c, ...prev]);
    setName(""); setPreviewText(""); setStart(""); setEnd(""); setType("percentage"); setValue(10);
  };

  const toggle = (id: string) => setCampaigns(prev => prev.map(c => (c.id === id ? { ...c, status: c.status === "active" ? "paused" : "active" } : c)));
  const duplicate = (id: string) => setCampaigns(prev => {
    const src = prev.find(c => c.id === id)!;
    const copy: Campaign = { ...src, id: "camp-" + Date.now(), name: src.name + " (Copy)", status: "upcoming", reach: 0, redemptions: 0, revenue: 0 };
    return [copy, ...prev];
  });
  const remove = (id: string) => setCampaigns(prev => prev.filter(c => c.id !== id));

  const totals = useMemo(() => campaigns.reduce((acc, c) => ({
    reach: acc.reach + c.reach,
    redemptions: acc.redemptions + c.redemptions,
    revenue: acc.revenue + c.revenue,
  }), { reach: 0, redemptions: 0, revenue: 0 }), [campaigns]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Promotions & Discounts</h1>
          <p className="text-muted-foreground">Create, schedule, and analyze dynamic campaigns.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-0 shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chart}>
                <defs>
                  <linearGradient id="reach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="redeem" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="m" tickFormatter={m => `M${m}`} />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="reach" stroke="#0ea5e9" fill="url(#reach)" strokeWidth={2} />
                <Area type="monotone" dataKey="redemptions" stroke="#f97316" fill="url(#redeem)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>KPIs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Total Reach</div>
              <div className="font-bold">{totals.reach.toLocaleString()}</div>
            </div>
            <Progress value={Math.min(100, totals.reach / 300)} />
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Redemptions</div>
              <div className="font-bold">{totals.redemptions.toLocaleString()}</div>
            </div>
            <Progress value={Math.min(100, totals.redemptions / 50)} />
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Revenue Impact (ZMW)</div>
              <div className="font-bold">{totals.revenue.toLocaleString()}</div>
            </div>
            <Progress value={Math.min(100, totals.revenue / 5000)} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-0 shadow-lg lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Campaigns</CardTitle>
            <Select value={filter} onValueChange={(v: any) => setFilter(v)}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Filter" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="space-y-4">
            {filtered.map(c => (
              <div key={c.id} className="p-4 rounded-xl border bg-white/70 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gradient-to-r from-orange-500 to-teal-600">{c.type.toUpperCase()}</Badge>
                    <h3 className="font-semibold">{c.name}</h3>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-3 w-3" /> {c.start} → {c.end}
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span>Reach: <b>{c.reach}</b></span>
                    <span>Redemptions: <b>{c.redemptions}</b></span>
                    <span>Revenue: <b>ZMW {c.revenue.toLocaleString()}</b></span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={() => toggle(c.id)}>{c.status === "active" ? <><Pause className="h-4 w-4 mr-1"/>Pause</> : <><Play className="h-4 w-4 mr-1"/>Activate</>}</Button>
                  <Button variant="secondary" onClick={() => duplicate(c.id)}><Copy className="h-4 w-4 mr-1"/>Duplicate</Button>
                  <Button variant="ghost" onClick={() => remove(c.id)}><Trash2 className="h-4 w-4 text-red-600"/></Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Create Campaign</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Campaign name" value={name} onChange={e => setName(e.target.value)} />
            <div className="grid grid-cols-2 gap-2">
              <Select value={type} onValueChange={(v: any) => setType(v)}>
                <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                  <SelectItem value="bundle">Bundle Deal</SelectItem>
                  <SelectItem value="flash">Flash Sale</SelectItem>
                </SelectContent>
              </Select>
              <Input type="number" value={value} onChange={e => setValue(Number(e.target.value))} placeholder={type === "percentage" ? "%" : type === "fixed" ? "Amount" : type === "bundle" ? "Bundle size" : "%"} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input type="date" value={start} onChange={e => setStart(e.target.value)} />
              <Input type="date" value={end} onChange={e => setEnd(e.target.value)} />
            </div>
            <Textarea placeholder="Preview text (optional)" value={previewText} onChange={e => setPreviewText(e.target.value)} />
            <div className="rounded-lg border p-4 bg-gradient-to-br from-blue-50 to-teal-50">
              <div className="text-xs text-muted-foreground">Preview</div>
              <div className="text-sm font-medium mt-1">{previewText || defaultPreview(type, value)}</div>
            </div>
            <Button className="w-full bg-gradient-to-r from-orange-500 to-teal-600 text-white" onClick={createCampaign}>
              <Plus className="h-4 w-4 mr-2"/> Create & Schedule
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function defaultPreview(type: Campaign["type"], value: number) {
  switch (type) {
    case "percentage":
      return `Save ${value}% on your next order!`;
    case "fixed":
      return `Instant ZMW ${value} off select items`;
    case "bundle":
      return `Buy ${value} items and save more!`;
    case "flash":
      return `Flash Sale: ${value}% off for a limited time`;
  }
}
