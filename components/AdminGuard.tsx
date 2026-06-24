/**
 * Admin Guard Component
 * Protects admin routes from unauthorized access
 */

'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated && pathname?.startsWith('/admin') && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [mounted, isAuthenticated, pathname, router]);

  if (!mounted) {
    return (
      <div className="p-8">
        <Skeleton count={5} className="h-20" />
      </div>
    );
  }

  if (!isAuthenticated && pathname?.startsWith('/admin') && pathname !== '/admin/login') {
    return null;
  }

  return <>{children}</>;
}
