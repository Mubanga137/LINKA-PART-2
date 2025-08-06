"use client";

import Link, { LinkProps } from 'next/link';
import { forwardRef } from 'react';

interface SafeLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

// Safe Link component that disables prefetching to prevent fetch errors
export const SafeLink = forwardRef<HTMLAnchorElement, SafeLinkProps>(
  ({ children, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      try {
        onClick?.(e);
      } catch (error) {
        console.error('Link click error:', error);
        e.preventDefault();
      }
    };

    return (
      <Link
        {...props}
        ref={ref}
        prefetch={false} // Disable prefetching to prevent fetch errors
        onClick={handleClick}
      >
        {children}
      </Link>
    );
  }
);

SafeLink.displayName = 'SafeLink';
