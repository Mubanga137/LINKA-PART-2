"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PremiumMarketplaceRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new Premium Listings page
    router.replace("/marketplace/premium-listings");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-lg text-slate-600">Redirecting to Premium Listings...</p>
      </div>
    </div>
  );
}
