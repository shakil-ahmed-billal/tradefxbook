import React from 'react';
import { UserProfile } from '../../types';
import { AuthHeader } from '../auth/AuthHeader';
import { AuthForm } from '../auth/AuthForm';
import { AuthShowcase } from '../auth/AuthShowcase';

interface AuthViewProps {
  onSuccessAuth: (user: UserProfile) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onSuccessAuth }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen animate-in fade-in duration-300 bg-[var(--bg-deep)] text-[var(--text-hi)]">
      {/* LEFT AUTH PANEL */}
      <section className="lg:col-span-5 bg-[var(--bg-panel)] border-r border-[var(--border-soft)] p-8 lg:p-12 flex flex-col justify-between relative z-10 shadow-xl transition-colors duration-200">
        <AuthHeader />

        <AuthForm onSuccessAuth={onSuccessAuth} />

        <div className="flex items-center justify-between text-xs text-[var(--text-low)] mt-8 pt-4 border-t border-[var(--border-soft)] font-inter">
          <span className="font-mono text-[11px] tracking-wider uppercase">© 2026 TRADEFXBOOK</span>
          <a href="#" className="hover:text-[var(--text-hi)] transition-colors font-medium">
            Need help?
          </a>
        </div>
      </section>

      {/* RIGHT SHOWCASE SECTION */}
      <AuthShowcase />
    </div>
  );
};
