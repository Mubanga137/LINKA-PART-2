"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Flame } from "lucide-react";

export function EnhancedNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const handleHome = () => {
    router.push('/');
  };

  const isHomePage = pathname === '/';

  return (
    <div className="flex items-center gap-2">
      {/* Back Button */}
      {!isHomePage && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 transition-all duration-200 tap-target-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back</span>
        </Button>
      )}

      {/* Home Button */}
      {!isHomePage && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleHome}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 transition-all duration-200 tap-target-sm"
        >
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline">Home</span>
        </Button>
      )}

      {/* Hot Deals Quick Link */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push('/marketplace')}
        className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 tap-target-sm bg-gradient-to-r from-red-50 to-orange-50 border border-red-200/50"
      >
        <Flame className="h-4 w-4" />
        <span className="hidden sm:inline font-semibold">Hot Deals</span>
        <span className="sm:hidden font-semibold">🔥</span>
      </Button>
    </div>
  );
}
