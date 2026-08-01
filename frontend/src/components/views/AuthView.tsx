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
    <div className="min-h-screen w-full flex items-center justify-center p-4 lg:p-8 bg-[var(--bg-deep)] text-[var(--text-hi)] relative overflow-hidden transition-colors duration-200 font-sans">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2981eb]/10 dark:bg-[#2981eb]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#10b981]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Dual-Panel Floating Container */}
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 bg-[var(--bg-panel)] border border-[var(--border-soft)] rounded-3xl overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/50 relative z-10 transition-all duration-200">
        {/* Left Form Column */}
        <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
          <AuthHeader />

          <AuthForm onSuccessAuth={onSuccessAuth} />

          <div className="mt-8 pt-4 border-t border-[var(--border-soft)] flex items-center justify-between text-xs text-[var(--text-low)] font-sans">
            <span>© 2026 TradeFXBook</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-[var(--text-hi)] transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-[var(--text-hi)] transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-[var(--text-hi)] transition-colors">
                Help
              </a>
            </div>
          </div>
        </div>

        {/* Right Showcase Column */}
        <AuthShowcase />
      </div>
    </div>
  );
};
