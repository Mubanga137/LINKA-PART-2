"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Store,
} from "lucide-react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/retailer-dashboard", active: true },
  { icon: Package, label: "Products", href: "/retailer-dashboard/products" },
  { icon: ShoppingCart, label: "Orders", href: "/retailer-dashboard/orders" },
  { icon: BarChart3, label: "Analytics", href: "/retailer-dashboard/analytics" },
  { icon: Users, label: "Customers", href: "/retailer-dashboard/customers" },
  { icon: Settings, label: "Settings", href: "/retailer-dashboard/settings" },
]

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={`${collapsed ? "w-20" : "w-64"} transition-all duration-300 bg-white/80 backdrop-blur-sm border-r border-slate-200/50 shadow-lg flex flex-col`}
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-200/50">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Store className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-slate-900">Mwamba Crafts</div>
                <div className="text-sm text-slate-500">Retailer Dashboard</div>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-slate-500 hover:text-slate-700"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group ${
                  item.active
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/25"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/50"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 ${item.active ? "text-white" : "text-slate-500 group-hover:text-slate-700"}`}
                />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200/50">
        <div className="space-y-2">
          <Link
            href="/help"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 transition-all"
          >
            <HelpCircle className="h-5 w-5 text-slate-500" />
            {!collapsed && <span className="font-medium">Help & Support</span>}
          </Link>
          <button className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all w-full">
            <LogOut className="h-5 w-5 text-slate-500" />
            {!collapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  )
}
