'use client';

import { RetailerGuard } from '@/components/auth/role-guard';

export default function RetailerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RetailerGuard>
      {children}
    </RetailerGuard>
  );
}
