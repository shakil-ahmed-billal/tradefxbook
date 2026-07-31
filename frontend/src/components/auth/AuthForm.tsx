import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, ArrowRight, Loader2 } from 'lucide-react';
import { UserProfile } from '@/types';
import { authClient } from '@/lib/auth-client';
import { SocialAuthButton } from './SocialAuthButton';

interface AuthFormProps {
  onSuccessAuth: (user: UserProfile) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSuccessAuth }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        const res = await authClient.signUp.email({
          email,
          password,
          name: name.trim() || email.split('@')[0],
        });

        if (res.error) {
          setError(res.error.message || 'Registration failed. Please try again.');
          setLoading(false);
          return;
        }

        const userName = name.trim() || email.split('@')[0];
        onSuccessAuth({
          name: userName,
          email,
          plan: 'FREE',
          avatarInitials: userName.charAt(0).toUpperCase(),
          isAuthenticated: true,
        });
      } else {
        const res = await authClient.signIn.email({
          email,
          password,
        });

        if (res.error) {
          setError(res.error.message || 'Invalid email or password.');
          setLoading(false);
          return;
        }

        const nameFromEmail = email.split('@')[0];
        const userName =
          res.data?.user?.name || nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
        onSuccessAuth({
          name: userName,
          email,
          plan: 'FREE',
          avatarInitials: userName.charAt(0).toUpperCase(),
          isAuthenticated: true,
        });
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto my-auto">
      <div className="font-mono text-xs uppercase tracking-widest text-[#5aa2f2] flex items-center gap-2 mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-[#22c58b] shadow-[0_0_0_3px_rgba(34,197,139,0.18)]" />
        Journal online
      </div>

      <h1 className="font-outfit text-2xl lg:text-3xl font-bold text-[#f4f6fa] tracking-tight mb-2">
        {isSignUp ? 'Create your account' : 'Welcome back, trader'}
      </h1>
      <p className="text-sm text-[#9aa2b3] leading-relaxed mb-6">
        {isSignUp
          ? 'Start tracking your trades and analyzing performance today.'
          : "Sign in to review your open positions and today's journal entries."}
      </p>

      {/* Auth Tab Switcher */}
      <div className="flex bg-[#141824] p-1 rounded-xl border border-[#212636] mb-6">
        <button
          type="button"
          onClick={() => {
            setIsSignUp(false);
            setError(null);
          }}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            !isSignUp ? 'bg-[#2981eb] text-white shadow-md' : 'text-[#9aa2b3] hover:text-white'
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => {
            setIsSignUp(true);
            setError(null);
          }}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            isSignUp ? 'bg-[#2981eb] text-white shadow-md' : 'text-[#9aa2b3] hover:text-white'
          }`}
        >
          Create Account
        </button>
      </div>

      {error && (
        <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
          {error}
        </div>
      )}

      {/* Social OAuth Button */}
      <SocialAuthButton loading={loading} setLoading={setLoading} setError={setError} />

      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-[#212636] w-full" />
        <span className="bg-[#0e1017] px-3 text-[11px] font-semibold text-[#5c6478] uppercase tracking-wider absolute">
          or continue with email
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {isSignUp && (
          <div>
            <label className="block text-xs font-semibold text-[#9aa2b3] mb-1.5">Full Name</label>
            <div className="relative flex items-center">
              <UserIcon className="w-4 h-4 text-[#5c6478] absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full bg-[#141824] border border-[#212636] rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-[#f4f6fa] outline-none focus:border-[#2981eb]"
                required={isSignUp}
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-[#9aa2b3] mb-1.5">Email address</label>
          <div className="relative flex items-center">
            <Mail className="w-4 h-4 text-[#5c6478] absolute left-3.5 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@tradingdesk.com"
              className="w-full bg-[#141824] border border-[#212636] rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-[#f4f6fa] outline-none focus:border-[#2981eb]"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#9aa2b3] mb-1.5">Password</label>
          <div className="relative flex items-center">
            <Lock className="w-4 h-4 text-[#5c6478] absolute left-3.5 pointer-events-none" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#141824] border border-[#212636] rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-[#f4f6fa] outline-none focus:border-[#2981eb]"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 mt-2 bg-[#2981eb] hover:bg-[#5aa2f2] disabled:opacity-50 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#2981eb]/25"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              {isSignUp ? 'Create Account' : 'Sign In'}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-[#5c6478] text-center mt-5 leading-relaxed">
        By continuing, you agree to our{' '}
        <a href="#" className="underline text-[#9aa2b3]">
          Terms
        </a>{' '}
        and{' '}
        <a href="#" className="underline text-[#9aa2b3]">
          Privacy Policy
        </a>
      </p>
    </div>
  );
};
