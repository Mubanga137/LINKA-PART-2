"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { LinkaLogo } from "@/components/linka-logo";
import {
  LayoutDashboard,
  Boxes,
  MessageSquare,
  Tag,
  Megaphone,
  BarChart3,
  Store,
  Bell,
  Settings,
} from "lucide-react";
import { StudioSection } from "@/app/retailer/studio/page";

interface DashboardLayoutProps {
  active: StudioSection;
  onSelect: (s: StudioSection) => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const items: { key: StudioSection; label: string; Icon: any }[] = [
  { key: "overview", label: "Dashboard", Icon: LayoutDashboard },
  { key: "inventory", label: "Inventory", Icon: Boxes },
  { key: "messages", label: "Messages", Icon: MessageSquare },
  { key: "promotions", label: "Promotions", Icon: Tag },
  { key: "marketing", label: "Marketing", Icon: Megaphone },
  { key: "analytics", label: "Analytics", Icon: BarChart3 },
  { key: "storefront", label: "Storefront", Icon: Store },
  { key: "notifications", label: "Notifications", Icon: Bell },
  { key: "settings", label: "Settings", Icon: Settings },
];

export function DashboardLayout({ active, onSelect, title, subtitle, children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-70">
        <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full blur-3xl" style={{background: "radial-gradient(closest-side, rgba(0,153,204,0.35), transparent)"}} />
        <div className="absolute top-10 right-0 h-96 w-96 rounded-full blur-3xl" style={{background: "radial-gradient(closest-side, rgba(255,102,0,0.25), transparent)"}} />
      </div>

      <div className="grid grid-cols-[260px,1fr] md:grid-cols-[300px,1fr]">
        <aside className="hidden md:flex h-screen sticky top-0 flex-col border-r bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <LinkaLogo size="md" />
            <div className="text-xs font-semibold bg-gradient-to-r from-[#0099cc] to-[#ff6600] bg-clip-text text-transparent">Retailer Studio</div>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            {items.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => onSelect(key)}
                className={`group flex w-full items-center gap-3 px-5 py-3.5 text-sm font-medium transition-all ${
                  active === key
                    ? "text-slate-900"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span className={`grid h-9 w-9 place-items-center rounded-lg border transition-all ${
                  active === key
                    ? "bg-gradient-to-br from-[#0099cc] to-[#ff6600] text-white border-transparent shadow"
                    : "border-slate-200 group-hover:border-slate-300"
                }`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span>{label}</span>
              </button>
            ))}
          </nav>
          <div className="px-5 py-4 border-t">
            <div className="rounded-xl border p-3 bg-gradient-to-r from-[#0099cc0d] to-[#ff66000d]">
              <div className="text-xs text-slate-600">Tips</div>
              <div className="text-sm font-semibold">Use the panels to manage your store</div>
            </div>
          </div>
        </aside>

        <main className="min-h-screen">
          <header className="sticky top-0 z-20 backdrop-blur border-b bg-white/70">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-slate-600">{subtitle}</p>
                )}
              </div>
              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => onSelect("notifications")}
                className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium shadow-sm transition-colors bg-white hover:bg-slate-50"
              >
                <Bell className="h-4 w-4 text-[#0099cc]" />
                Alerts
              </motion.button>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
