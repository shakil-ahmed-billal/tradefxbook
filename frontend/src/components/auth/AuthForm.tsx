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
      {/* Category Tag */}
      <div className="font-outfit text-[11px] font-extrabold uppercase tracking-widest text-[#2981eb] flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-[#22c58b] shadow-[0_0_8px_rgba(34,197,139,0.5)]" />
        JOURNAL SYSTEM ONLINE
      </div>

      <h1 className="font-sora text-2xl lg:text-3xl font-extrabold text-[var(--text-hi)] tracking-tight mb-2">
        {isSignUp ? 'Create Your Account' : 'Welcome Back, Trader'}
      </h1>
      <p className="font-inter text-sm text-[var(--text-mid)] leading-relaxed mb-6">
        {isSignUp
          ? 'Start tracking your trades and analyzing performance today.'
          : "Sign in to review your open positions and today's journal entries."}
      </p>

      {/* Auth Tab Switcher */}
      <div className="flex bg-[var(--bg-elevated)] p-1 rounded-xl border border-[var(--border-soft)] mb-6">
        <button
          type="button"
          onClick={() => {
            setIsSignUp(false);
            setError(null);
          }}
          className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${!isSignUp
              ? 'bg-[#2981eb] text-white shadow-md shadow-[#2981eb]/20 font-outfit'
              : 'text-[var(--text-mid)] hover:text-[var(--text-hi)] font-outfit'
            }`}
        >
          SIGN IN
        </button>
        <button
          type="button"
          onClick={() => {
            setIsSignUp(true);
            setError(null);
          }}
          className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${isSignUp
              ? 'bg-[#2981eb] text-white shadow-md shadow-[#2981eb]/20 font-outfit'
              : 'text-[var(--text-mid)] hover:text-[var(--text-hi)] font-outfit'
            }`}
        >
          CREATE ACCOUNT
        </button>
      </div>

      {error && (
        <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium font-inter">
          {error}
        </div>
      )}

      {/* Social OAuth Button */}
      <SocialAuthButton loading={loading} setLoading={setLoading} setError={setError} />

      <div className="relative flex items-center justify-center my-5">
        <div className="border-t border-[var(--border-soft)] w-full" />
        <span className="bg-[var(--bg-panel)] px-3 text-[10px] font-bold text-[var(--text-low)] uppercase tracking-widest absolute">
          OR CONTINUE WITH EMAIL
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {isSignUp && (
          <div>
            <label className="block font-outfit text-[11px] font-bold uppercase tracking-wider text-[var(--text-mid)] mb-1.5">
              FULL NAME
            </label>
            <div className="relative flex items-center">
              <UserIcon className="w-4 h-4 text-[var(--text-low)] absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border-soft)] rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-[var(--text-hi)] placeholder:text-[var(--text-low)] outline-none focus:border-[#2981eb] focus:ring-2 focus:ring-[#2981eb]/20 transition-all font-inter"
                required={isSignUp}
              />
            </div>
          </div>
        )}

        <div>
          <label className="block font-outfit text-[11px] font-bold uppercase tracking-wider text-[var(--text-mid)] mb-1.5">
            EMAIL ADDRESS
          </label>
          <div className="relative flex items-center">
            <Mail className="w-4 h-4 text-[var(--text-low)] absolute left-3.5 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@tradingdesk.com"
              className="w-full bg-[var(--bg-elevated)] border border-[var(--border-soft)] rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-[var(--text-hi)] placeholder:text-[var(--text-low)] outline-none focus:border-[#2981eb] focus:ring-2 focus:ring-[#2981eb]/20 transition-all font-inter"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-outfit text-[11px] font-bold uppercase tracking-wider text-[var(--text-mid)] mb-1.5">
            PASSWORD
          </label>
          <div className="relative flex items-center">
            <Lock className="w-4 h-4 text-[var(--text-low)] absolute left-3.5 pointer-events-none" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[var(--bg-elevated)] border border-[var(--border-soft)] rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-[var(--text-hi)] placeholder:text-[var(--text-low)] outline-none focus:border-[#2981eb] focus:ring-2 focus:ring-[#2981eb]/20 transition-all font-inter"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 mt-2 bg-[#2981eb] hover:bg-[#5aa2f2] disabled:opacity-50 text-white font-outfit font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#2981eb]/25 cursor-pointer active:scale-[0.99]"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span>{isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-[var(--text-low)] text-center mt-5 leading-relaxed font-inter">
        By continuing, you agree to our{' '}
        <a href="#" className="underline text-[var(--text-mid)] hover:text-[var(--text-hi)] transition-colors">
          Terms
        </a>{' '}
        and{' '}
        <a href="#" className="underline text-[var(--text-mid)] hover:text-[var(--text-hi)] transition-colors">
          Privacy Policy
        </a>
      </p>
    </div>
  );
};
