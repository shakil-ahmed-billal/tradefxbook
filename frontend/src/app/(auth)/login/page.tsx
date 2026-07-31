'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AuthView } from '@/components/views/AuthView';
import { UserProfile } from '@/types';

export default function LoginPage() {
  const router = useRouter();

  const handleSuccessAuth = (user: UserProfile) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tradefxbook_user', JSON.stringify(user));
    }
    router.push('/dashboard');
  };

  return <AuthView onSuccessAuth={handleSuccessAuth} />;
}
