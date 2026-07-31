'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthView } from '@/components/views/AuthView';
import { UserProfile } from '@/types';
import { authClient } from '@/lib/auth-client';

const LS_USER_KEY = 'tradefxbook_user';
const LS_AUTH_KEY = 'tradefxbook_authenticated';

export default function LoginPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // If already logged in, redirect to dashboard immediately
  useEffect(() => {
    if (!isPending && session) {
      router.replace('/dashboard');
    }
  }, [session, isPending, router]);

  const handleSuccessAuth = (user: UserProfile) => {
    // Persist to localStorage so dashboard works even if backend is temporarily offline
    if (typeof window !== 'undefined') {
      localStorage.setItem(LS_USER_KEY, JSON.stringify({ ...user, isAuthenticated: true }));
      localStorage.setItem(LS_AUTH_KEY, '1');
    }
    router.push('/dashboard');
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#090b10] flex items-center justify-center">
        <div className="w-7 h-7 rounded-full border-2 border-[#2981eb] border-t-transparent animate-spin" />
      </div>
    );
  }

  return <AuthView onSuccessAuth={handleSuccessAuth} />;
}
