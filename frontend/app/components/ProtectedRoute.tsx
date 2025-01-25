'use client'

import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/login?from=${window.location.pathname}`);
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? children : null;
}