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
    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen animate-in fade-in duration-200 bg-[#090b10]">
      {/* LEFT AUTH PANEL */}
      <section className="lg:col-span-5 bg-[#0e1017] border-r border-[#1a1e2b] p-8 lg:p-12 flex flex-col justify-between relative z-10">
        <AuthHeader />

        <AuthForm onSuccessAuth={onSuccessAuth} />

        <div className="flex justify-between text-xs text-[#5c6478] mt-8 pt-4 border-t border-[#1a1e2b]">
          <span>© 2026 TradeFXBook</span>
          <a href="#" className="hover:text-[#9aa2b3]">
            Need help?
          </a>
        </div>
      </section>

      {/* RIGHT SHOWCASE SECTION */}
      <AuthShowcase />
    </div>
  );
};
