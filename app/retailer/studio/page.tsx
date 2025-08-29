"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/components/retailer/studio/DashboardLayout";
import { InventoryPanel } from "@/components/retailer/studio/InventoryPanel";
import { MessagesPanel } from "@/components/retailer/studio/MessagesPanel";
import { PromotionsPanel } from "@/components/retailer/studio/PromotionsPanel";
import { MarketingHub } from "@/components/retailer/studio/MarketingHub";
import { AnalyticsPanel } from "@/components/retailer/studio/AnalyticsPanel";
import { StorefrontPanel } from "@/components/retailer/studio/StorefrontPanel";
import { NotificationsPanel } from "@/components/retailer/studio/NotificationsPanel";
import { ProfileSettingsPanel } from "@/components/retailer/studio/ProfileSettingsPanel";
import { OverviewPanel } from "@/components/retailer/studio/OverviewPanel";

export type StudioSection =
  | "overview"
  | "inventory"
  | "messages"
  | "promotions"
  | "marketing"
  | "analytics"
  | "storefront"
  | "notifications"
  | "settings";

export default function RetailerStudioPage() {
  const [active, setActive] = useState<StudioSection>("overview");

  const title = useMemo(() => {
    switch (active) {
      case "inventory":
        return "Inventory & Stock";
      case "messages":
        return "Messages";
      case "promotions":
        return "Promotions & Discounts";
      case "marketing":
        return "Marketing Hub";
      case "analytics":
        return "Analytics & Insights";
      case "storefront":
        return "Storefront Manager";
      case "notifications":
        return "Notifications Center";
      case "settings":
        return "Profile & Settings";
      default:
        return "Dashboard Overview";
    }
  }, [active]);

  return (
    <DashboardLayout
      active={active}
      onSelect={setActive}
      title={title}
      subtitle="Control center for products, orders, marketing, and insights"
    >
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {active === "overview" && <OverviewPanel />}
            {active === "inventory" && <InventoryPanel />}
            {active === "messages" && <MessagesPanel />}
            {active === "promotions" && <PromotionsPanel />}
            {active === "marketing" && <MarketingHub />}
            {active === "analytics" && <AnalyticsPanel />}
            {active === "storefront" && <StorefrontPanel />}
            {active === "notifications" && <NotificationsPanel />}
            {active === "settings" && <ProfileSettingsPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
