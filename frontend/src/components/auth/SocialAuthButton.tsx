import React from 'react';
import { authClient } from '@/lib/auth-client';

interface SocialAuthButtonProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  loading,
  setLoading,
  setError,
}) => {
  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: `${window.location.origin}/dashboard`,
      });
    } catch (err: any) {
      setError(err?.message || 'Google Sign-In failed.');
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={loading}
      className="w-full py-2.5 px-4 mb-4 bg-[var(--bg-elevated)] hover:bg-[var(--bg-hover)] border border-[var(--border-soft)] text-[var(--text-hi)] font-medium text-sm rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer shadow-sm font-sans"
    >
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <path
          fill="#EA4335"
          d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
        />
        <path
          fill="#4285F4"
          d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
        />
        <path
          fill="#FBBC05"
          d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.4 0 15.3s.7 5.6 1.9 8l3.7-2.9c-.6-.8-1-1.8-1.2-2.8z"
        />
        <path
          fill="#34A853"
          d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 22.3 12 22.3z"
        />
      </svg>
      <span>Continue with Google</span>
    </button>
  );
};
