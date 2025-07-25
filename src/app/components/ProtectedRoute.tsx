'use client';
import { useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Loader from './Loader';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // redirect to login if not logged in
    }
  }, [user, loading]);

  if (loading || !user) {
    return <div className="text-center mt-10"><Loader/></div>;
  }

  return <>{children}</>;
}
