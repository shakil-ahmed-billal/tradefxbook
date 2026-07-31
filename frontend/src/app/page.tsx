import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, LineChart, Shield, Zap, Target, BarChart3, Clock, Star } from 'lucide-react';
import { ModeToggle } from '@/components/shared/ModeToggle';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0d14] text-[#eef1f8] font-sans selection:bg-[#2981eb]/30 overflow-hidden">
      {/* GLOBAL STYLES FOR ANIMATIONS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}} />

      {/* BACKGROUND GLOWS */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#2981eb] opacity-20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-[#00d9a3] opacity-10 blur-[150px] rounded-full pointer-events-none" />

      {/* NAVBAR */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2981eb] to-[#00d9a3] flex items-center justify-center">
            <LineChart className="w-5 h-5 text-white" />
          </div>
          <span className="font-sora font-bold text-xl tracking-tight">TradeFXBook</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#8d94a8]">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#testimonials" className="hover:text-white transition-colors">Testimonials</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link href="/login" className="text-sm font-medium text-[#8d94a8] hover:text-white transition-colors">Log in</Link>
          <Link href="/dashboard" className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#eef1f8] text-[#0a0d14] text-sm font-bold hover:bg-white transition-transform hover:scale-105 active:scale-95">
            Get Started <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-24 pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161b27] border border-[#232a3a] text-xs font-medium text-[#7aa0ff] mb-8 animate-fade-up">
          <span className="w-2 h-2 rounded-full bg-[#00d9a3] animate-pulse" />
          TradeFXBook v2.0 is now live
        </div>
        
        <h1 className="font-sora text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mb-8 leading-[1.1] animate-fade-up delay-100">
          Master your edge. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2981eb] via-[#7aa0ff] to-[#00d9a3]">
            Elevate your trading.
          </span>
        </h1>
        
        <p className="text-[#8d94a8] text-lg md:text-xl max-w-2xl mb-12 animate-fade-up delay-200">
          The most advanced, intuitive, and beautifully designed trading journal to track, analyze, and optimize your market performance.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-up delay-300">
          <Link href="/login" className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#2981eb] hover:bg-[#4c7dff] text-white text-base font-bold shadow-[0_0_40px_rgba(41,129,235,0.4)] transition-all hover:shadow-[0_0_60px_rgba(41,129,235,0.6)] hover:-translate-y-1">
            Start Journaling for Free <ChevronRight className="w-5 h-5" />
          </Link>
          <a href="#demo" className="px-8 py-4 rounded-full bg-[#161b27] border border-[#232a3a] text-[#eef1f8] text-base font-bold hover:bg-[#1c2230] hover:border-[#2a2f42] transition-colors">
            View Live Demo
          </a>
        </div>
      </section>

      {/* DASHBOARD MOCKUP */}
      <section className="relative z-20 px-6 max-w-7xl mx-auto -mt-10 animate-fade-up delay-300">
        <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden border border-[#232a3a] bg-[#10141d]/80 backdrop-blur-xl shadow-2xl p-2 animate-float">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-transparent to-transparent opacity-80 z-10 pointer-events-none" />
          <div className="rounded-xl md:rounded-[1.5rem] overflow-hidden border border-[#1a2029]">
            <img 
              src="/images/dashboard_mockup_1785486191713.jpg" 
              alt="TradeFXBook Dashboard" 
              className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* LOGOS SECTION */}
      <section className="py-24 px-6 border-b border-[#1a2029]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-semibold text-[#565e73] tracking-widest uppercase mb-8">Trusted by prop firm funded traders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
            <span className="text-xl font-bold font-sora">FTMO</span>
            <span className="text-xl font-bold font-sora">The Funded Trader</span>
            <span className="text-xl font-bold font-sora">True Forex Funds</span>
            <span className="text-xl font-bold font-sora">MyForexFunds</span>
            <span className="text-xl font-bold font-sora">E8 Funding</span>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-32 px-6 relative">
        <div className="absolute top-[20%] left-[-10%] w-[30%] h-[30%] bg-[#a78bfa] opacity-10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-sora text-3xl md:text-5xl font-bold mb-6">Everything you need to <br/><span className="text-[#00d9a3]">find your edge.</span></h2>
            <p className="text-[#8d94a8] text-lg max-w-2xl mx-auto">Stop guessing. Start measuring. TradeFXBook gives you the exact metrics required to achieve consistency.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-[#10141d] border border-[#232a3a] rounded-3xl p-8 hover:border-[#4c7dff] transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4c7dff] opacity-10 blur-[50px] group-hover:opacity-30 transition-opacity" />
              <div className="w-12 h-12 rounded-2xl bg-[#4c7dff]/15 text-[#4c7dff] flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="font-sora text-xl font-bold mb-3">Deep Analytics</h3>
              <p className="text-[#565e73] leading-relaxed">Instantly visualize your win rate, profit factor, drawdown, and expectancy with institutional-grade charts.</p>
            </div>
            {/* Feature 2 */}
            <div className="bg-[#10141d] border border-[#232a3a] rounded-3xl p-8 hover:border-[#00d9a3] transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d9a3] opacity-10 blur-[50px] group-hover:opacity-30 transition-opacity" />
              <div className="w-12 h-12 rounded-2xl bg-[#00d9a3]/15 text-[#00d9a3] flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-sora text-xl font-bold mb-3">Strategy Optimization</h3>
              <p className="text-[#565e73] leading-relaxed">Break down performance by day of week, session time, asset class, and long vs short to cut out losing habits.</p>
            </div>
            {/* Feature 3 */}
            <div className="bg-[#10141d] border border-[#232a3a] rounded-3xl p-8 hover:border-[#a78bfa] transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#a78bfa] opacity-10 blur-[50px] group-hover:opacity-30 transition-opacity" />
              <div className="w-12 h-12 rounded-2xl bg-[#a78bfa]/15 text-[#a78bfa] flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-sora text-xl font-bold mb-3">Automated Sync</h3>
              <p className="text-[#565e73] leading-relaxed">Connect your MT4/MT5 or Exness accounts and watch your journal populate automatically in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-32 px-6 bg-[#10141d] border-y border-[#1a2029]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-sora text-3xl md:text-5xl font-bold mb-6">Loved by traders worldwide.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#161b27] border border-[#232a3a] p-8 rounded-3xl">
              <div className="flex gap-1 mb-4 text-[#f2b84b]">
                <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-[#eef1f8] mb-6 text-lg">"The UI is absolutely stunning. It makes journaling something I actually look forward to doing every day after my session."</p>
              <div className="flex items-center gap-4">
                <img src="/images/avatar1_1785486209220.jpg" alt="User" className="w-12 h-12 rounded-full object-cover border-2 border-[#232a3a]" />
                <div>
                  <h4 className="font-bold text-sm">Alex M.</h4>
                  <p className="text-[#565e73] text-xs">Prop Firm Funded</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#161b27] border border-[#232a3a] p-8 rounded-3xl">
              <div className="flex gap-1 mb-4 text-[#f2b84b]">
                <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-[#eef1f8] mb-6 text-lg">"I finally found my edge using the session analytics feature. TradeFXBook showed me I was losing all my money during the Asian session."</p>
              <div className="flex items-center gap-4">
                <img src="/images/avatar2_1785486226120.jpg" alt="User" className="w-12 h-12 rounded-full object-cover border-2 border-[#232a3a]" />
                <div>
                  <h4 className="font-bold text-sm">Sarah T.</h4>
                  <p className="text-[#565e73] text-xs">Full-time Day Trader</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#161b27] border border-[#232a3a] p-8 rounded-3xl">
              <div className="flex gap-1 mb-4 text-[#f2b84b]">
                <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-[#eef1f8] mb-6 text-lg">"The best trading journal on the market by far. The performance dashboard looks like it belongs on a Bloomberg Terminal."</p>
              <div className="flex items-center gap-4">
                <img src="/images/avatar3_1785486239502.jpg" alt="User" className="w-12 h-12 rounded-full object-cover border-2 border-[#232a3a]" />
                <div>
                  <h4 className="font-bold text-sm">Raj Patel</h4>
                  <p className="text-[#565e73] text-xs">Swing Trader</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2981eb]/10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-sora text-4xl md:text-6xl font-bold mb-8">Ready to transform your trading?</h2>
          <p className="text-[#8d94a8] text-xl mb-10">Join thousands of professional traders tracking their edge.</p>
          <Link href="/auth" className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-white text-[#0a0d14] text-lg font-bold hover:bg-[#eef1f8] transition-transform hover:scale-105">
            Create Free Account <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-[#1a2029]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <LineChart className="w-5 h-5 text-[#7aa0ff]" />
            <span className="font-sora font-bold text-lg">TradeFXBook</span>
          </div>
          <div className="flex gap-6 text-sm text-[#565e73]">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-sm text-[#565e73]">© 2026 TradeFXBook. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
