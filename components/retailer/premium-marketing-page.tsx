"use client";

import { useEffect, useMemo, useState } from "react";
import { Megaphone, Mail, Bell, Globe, Instagram, Twitter, CheckCircle2, Sparkles, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface ChannelState { email: boolean; inapp: boolean; facebook: boolean; instagram: boolean; x: boolean; }

export default function PremiumMarketingPage() {
  const [campaignName, setCampaignName] = useState("");
  const [objective, setObjective] = useState("engagement");
  const [channels, setChannels] = useState<ChannelState>({ email: true, inapp: true, facebook: true, instagram: true, x: false });
  const [message, setMessage] = useState("Announcing our new arrivals! Enjoy exclusive deals this week.");

  const [data, setData] = useState(Array.from({ length: 10 }).map((_, i) => ({
    t: i + 1,
    reach: 0,
    clicks: 0,
    revenue: 0,
  })));
  useEffect(() => {
    setData(Array.from({ length: 10 }).map((_, i) => ({ t: i + 1, reach: 300 + i * 40, clicks: 60 + i * 10, revenue: 200 + i * 50 })));
    const id = setInterval(() => {
      setData(prev => prev.map(p => ({ t: p.t, reach: Math.max(50, p.reach + Math.round(Math.random() * 40 - 20)), clicks: Math.max(10, p.clicks + Math.round(Math.random() * 20 - 10)), revenue: Math.max(0, p.revenue + Math.round(Math.random() * 30 - 10)) })));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const kpis = useMemo(() => ({
    reach: data.reduce((a, b) => a + b.reach, 0),
    clicks: data.reduce((a, b) => a + b.clicks, 0),
    revenue: data.reduce((a, b) => a + b.revenue, 0),
    ctr: data.reduce((a, b) => a + b.clicks, 0) / Math.max(1, data.reduce((a, b) => a + b.reach, 0)),
  }), [data]);

  // Segmentation
  const [seg, setSeg] = useState({ highValue: true, newCust: false, loyal: true, churnRisk: false });
  const targeted = useMemo(() => (seg.highValue ? 1200 : 0) + (seg.newCust ? 800 : 0) + (seg.loyal ? 1500 : 0) + (seg.churnRisk ? 500 : 0), [seg]);

  // A/B testing
  const [expName, setExpName] = useState("Homepage Banner Copy");
  const [aClicks, setAClicks] = useState(320);
  const [bClicks, setBClicks] = useState(280);
  const winner = aClicks === bClicks ? "Tie" : aClicks > bClicks ? "Variant A" : "Variant B";

  const recommendation = useMemo(() => {
    if (kpis.ctr < 0.12) return "Improve copy and visuals. Try shorter headlines and clearer CTAs.";
    if (channels.email && !channels.x) return "Enable X (Twitter) to expand reach in tech-savvy audiences.";
    if (channels.instagram && kpis.revenue < 5000) return "Test product-focused Instagram Reels with promo codes.";
    return "Scale budget on top-performing channels and iterate creatives weekly.";
  }, [kpis.ctr, channels, kpis.revenue]);

  const launch = () => {
    if (!campaignName) return;
    // no-op: UI feedback only
    alert(`Launched ${campaignName} across ${Object.entries(channels).filter(([_, v]) => v).length} channels with objective: ${objective}`);
    setCampaignName("");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Marketing Hub</h1>
          <p className="text-muted-foreground">Multi-channel campaigns, segmentation, A/B testing, and insights.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-0 shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="t" tickFormatter={t => `T${t}`} />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="reach" fill="#0ea5e933" stroke="#0ea5e9" strokeWidth={2} />
                <Bar dataKey="clicks" barSize={18} fill="#f97316" radius={[6,6,0,0]} />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between"><span>Total Reach</span><b>{kpis.reach.toLocaleString()}</b></div>
            <Progress value={Math.min(100, kpis.reach / 400)} />
            <div className="flex items-center justify-between"><span>Total Clicks</span><b>{kpis.clicks.toLocaleString()}</b></div>
            <Progress value={Math.min(100, kpis.clicks / 80)} />
            <div className="flex items-center justify-between"><span>CTR</span><b>{(kpis.ctr * 100).toFixed(2)}%</b></div>
            <Progress value={Math.min(100, kpis.ctr * 200)} />
            <div className="flex items-center justify-between"><span>Revenue (ZMW)</span><b>{kpis.revenue.toLocaleString()}</b></div>
            <Progress value={Math.min(100, kpis.revenue / 800)} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-0 shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle>Launch Multi-channel Campaign</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Campaign name" value={campaignName} onChange={e => setCampaignName(e.target.value)} />
            <Textarea placeholder="Message / Creative brief" value={message} onChange={e => setMessage(e.target.value)} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-3 rounded-lg border bg-white/70"><div className="flex items-center gap-2"><Mail className="h-4 w-4 text-blue-600"/> Email</div><Switch checked={channels.email} onCheckedChange={v => setChannels(s => ({...s, email: v}))}/></div>
              <div className="flex items-center justify-between p-3 rounded-lg border bg-white/70"><div className="flex items-center gap-2"><Bell className="h-4 w-4 text-teal-600"/> In-app</div><Switch checked={channels.inapp} onCheckedChange={v => setChannels(s => ({...s, inapp: v}))}/></div>
              <div className="flex items-center justify-between p-3 rounded-lg border bg-white/70"><div className="flex items-center gap-2"><Globe className="h-4 w-4 text-blue-500"/> Facebook</div><Switch checked={channels.facebook} onCheckedChange={v => setChannels(s => ({...s, facebook: v}))}/></div>
              <div className="flex items-center justify-between p-3 rounded-lg border bg-white/70"><div className="flex items-center gap-2"><Instagram className="h-4 w-4 text-pink-500"/> Instagram</div><Switch checked={channels.instagram} onCheckedChange={v => setChannels(s => ({...s, instagram: v}))}/></div>
              <div className="flex items-center justify-between p-3 rounded-lg border bg-white/70"><div className="flex items-center gap-2"><Twitter className="h-4 w-4 text-sky-500"/> X (Twitter)</div><Switch checked={channels.x} onCheckedChange={v => setChannels(s => ({...s, x: v}))}/></div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Objective</span>
                <Select value={objective} onValueChange={setObjective}>
                  <SelectTrigger className="w-48"><SelectValue placeholder="Objective"/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engagement">Engagement</SelectItem>
                    <SelectItem value="traffic">Traffic</SelectItem>
                    <SelectItem value="conversions">Conversions</SelectItem>
                    <SelectItem value="retention">Retention</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-orange-500 to-teal-600 text-white" onClick={launch}><Rocket className="h-4 w-4 mr-2"/>Launch</Button>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Segmentation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between"><span>High value</span><Switch checked={seg.highValue} onCheckedChange={v => setSeg(s => ({...s, highValue: v}))}/></div>
            <div className="flex items-center justify-between"><span>New customers</span><Switch checked={seg.newCust} onCheckedChange={v => setSeg(s => ({...s, newCust: v}))}/></div>
            <div className="flex items-center justify-between"><span>Loyalty tier</span><Switch checked={seg.loyal} onCheckedChange={v => setSeg(s => ({...s, loyal: v}))}/></div>
            <div className="flex items-center justify-between"><span>Churn risk</span><Switch checked={seg.churnRisk} onCheckedChange={v => setSeg(s => ({...s, churnRisk: v}))}/></div>
            <div className="rounded-lg p-3 bg-gradient-to-br from-blue-50 to-teal-50 text-sm">Targeted audience size: <b>{targeted.toLocaleString()}</b></div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-0 shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle>A/B Testing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Experiment name" value={expName} onChange={e => setExpName(e.target.value)} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-xl border p-4">
                <div className="font-medium mb-2">Variant A</div>
                <Input type="number" value={aClicks} onChange={e => setAClicks(Number(e.target.value))} />
                <div className="text-xs text-muted-foreground mt-2">Clicks</div>
              </div>
              <div className="rounded-xl border p-4">
                <div className="font-medium mb-2">Variant B</div>
                <Input type="number" value={bClicks} onChange={e => setBClicks(Number(e.target.value))} />
                <div className="text-xs text-muted-foreground mt-2">Clicks</div>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2"><CheckCircle2 className="h-4 w-4"/> Winner: <b>{winner}</b></div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-lg p-3 bg-gradient-to-r from-orange-50 to-teal-50 border">{recommendation}</div>
            <ul className="list-disc pl-5 space-y-1">
              <li>Rotate creatives weekly to prevent fatigue.</li>
              <li>Reuse top-performing copy across channels.</li>
              <li>Segment loyal users with early access offers.</li>
            </ul>
            <div className="text-xs text-muted-foreground">Tips are generated from recent engagement trends.</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
