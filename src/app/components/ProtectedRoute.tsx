'use client';
import { useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // redirect to login if not logged in
    }
  }, [user, loading]);

  if (loading || !user) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return <>{children}</>;
}
