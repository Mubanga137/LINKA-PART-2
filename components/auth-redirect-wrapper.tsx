"use client";

import { useAuthRedirect } from '@/hooks/useAuthRedirect';

interface AuthRedirectWrapperProps {
  children: React.ReactNode;
}

export function AuthRedirectWrapper({ children }: AuthRedirectWrapperProps) {
  useAuthRedirect();
  return <>{children}</>;
}
