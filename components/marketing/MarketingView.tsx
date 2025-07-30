"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Megaphone, 
  Plus, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Users,
  DollarSign,
  ArrowRight,
  Sparkles
} from "lucide-react";
import type { DashboardData } from "@/lib/types";
import styles from "@/styles/marketplace.module.scss";

interface MarketingViewProps {
  data: DashboardData;
}

export function MarketingView({ data }: MarketingViewProps) {
  const revenueGrowth = data?.revenue?.growth ?? 0;
  const isPositiveGrowth = revenueGrowth > 0;

  return (
    <section 
      aria-labelledby="marketing-heading" 
      className="w-full"
    >
      <Card className={`${styles.card} ${styles.cardHover} ${styles.marketingCard}`}>
        <CardHeader className={styles.cardHeader}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 mr-4">
                <Megaphone className="h-6 w-6 text-white" aria-hidden />
              </div>
              <div>
                <CardTitle
                  id="marketing-heading"
                  className="text-xl font-bold text-slate-900 mb-1"
                >
                  Marketing Hub
                </CardTitle>
                <p className="text-sm text-slate-600">
                  Boost your reach and track performance
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge 
                variant="secondary" 
                className="bg-green-100 text-green-800 border-green-200 px-3 py-1"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                Active
              </Badge>
              <Button className={`${styles.primaryButton} ${styles.focusable}`}>
                <Plus className="h-4 w-4 mr-2" aria-hidden />
                New Campaign
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className={styles.marketingContent} style={{ padding: '2rem' }}>
            {/* Content Section */}
            <div className={styles.marketingText}>
              <h3 className={styles.title}>
                Amplify Your Business Growth
              </h3>
              <p className={styles.description}>
                Launch targeted campaigns, track performance metrics, and convert more
                visitors with our comprehensive marketing toolkit. Advanced analytics 
                and automation features help you optimize every touchpoint.
              </p>

              {/* Stats Grid */}
              <div className={styles.statsGrid}>
                <div className={`${styles.statCard} bg-blue-50 border-blue-200`}>
                  <p className={styles.statLabel}>Revenue Growth</p>
                  <div className="flex items-center justify-center gap-1">
                    <h4 className={`${styles.statValue} revenue`}>
                      {Intl.NumberFormat(undefined, {
                        style: "percent",
                        minimumFractionDigits: 1,
                      }).format(revenueGrowth)}
                    </h4>
                    <TrendingUp 
                      className={`h-4 w-4 ${isPositiveGrowth ? 'text-green-600' : 'text-red-600'}`} 
                    />
                  </div>
                </div>

                <div className={`${styles.statCard} bg-green-50 border-green-200`}>
                  <p className={styles.statLabel}>Campaign Status</p>
                  <h4 className={`${styles.statValue} status`}>
                    Optimized
                  </h4>
                </div>

                <div className={`${styles.statCard} bg-purple-50 border-purple-200`}>
                  <p className={styles.statLabel}>Reach</p>
                  <h4 className={`${styles.statValue} text-purple-700`}>
                    45.2K
                  </h4>
                </div>

                <div className={`${styles.statCard} bg-orange-50 border-orange-200`}>
                  <p className={styles.statLabel}>Conversion</p>
                  <h4 className={`${styles.statValue} text-orange-700`}>
                    3.8%
                  </h4>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3 mt-6">
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`${styles.outlineButton} ${styles.focusable}`}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`${styles.outlineButton} ${styles.focusable}`}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Audiences
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`${styles.outlineButton} ${styles.focusable}`}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Campaigns
                </Button>
              </div>
            </div>

            {/* Visual Section */}
            <div className="order-1 md:order-2">
              <div className={`${styles.mediaFrame} ${styles.fadeIn} relative`}>
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
                  alt="Modern analytics dashboard showing marketing performance metrics and campaign insights"
                  width={1200}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover w-full h-80 md:h-96"
                />
                
                {/* Overlay with key metrics */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-600 mb-1">Live Performance</p>
                        <p className="font-semibold text-slate-900">Campaign Metrics</p>
                      </div>
                      <div className="flex items-center text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">+24%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature highlights */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                  <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-blue-900">ROI Tracking</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                  <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-green-900">Smart Targeting</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA Section */}
          <div className="bg-gradient-to-r from-blue-50 via-white to-green-50 border-t border-slate-200 p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">
                  Ready to scale your marketing?
                </h4>
                <p className="text-sm text-slate-600">
                  Get advanced insights and automation tools
                </p>
              </div>
              <Button 
                className={`${styles.secondaryButton} ${styles.focusable}`}
                asChild
              >
                <Link href="/marketing/dashboard">
                  View Dashboard
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
