import React from 'react';
import { 
  Home,
  LayoutDashboard, 
  Briefcase, 
  BookOpen, 
  LineChart, 
  TrendingUp, 
  Sparkles, 
  History, 
  Users, 
  Wrench, 
  Settings, 
  HelpCircle, 
  ChevronRight,
  ChevronDown,
  FileText,
  BarChart2,
  LogIn,
  LogOut
} from 'lucide-react';
import { NavTab, UserProfile } from '../types';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  user: UserProfile;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  onOpenAuth?: () => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  user,
  isOpenMobile = false,
  onCloseMobile,
  onOpenAuth,
  onLogout,
}) => {
  const [analysisExpanded, setAnalysisExpanded] = React.useState(
    currentTab === 'performance' || currentTab === 'trade-analysis'
  );

  React.useEffect(() => {
    if (currentTab === 'performance' || currentTab === 'trade-analysis') {
      setAnalysisExpanded(true);
    }
  }, [currentTab]);

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-[264px] bg-[#0e1017] border-r border-[#1a1e2b]
        flex flex-col p-5 z-50 transition-transform duration-200 ease-in-out overflow-y-auto shrink-0
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Row */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 px-2 pb-5 pt-1 cursor-pointer select-none"
        >
          <svg className="h-5 w-auto text-[#f4f6fa] shrink-0" viewBox="0 0 443 209" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M154.851 31.749C156.716 31.749 158.129 33.4327 157.806 35.2694L151.113 73.2694C150.86 74.7034 149.614 75.749 148.158 75.749H103.942C102.487 75.749 101.241 76.7938 100.988 78.227L78.3641 206.271C78.1109 207.704 76.8654 208.749 75.4099 208.749H26.0027C24.1371 208.749 22.7239 207.064 23.0485 205.227L45.3039 79.271C45.6285 77.4338 44.2153 75.749 42.3496 75.749H3.00082C1.13582 75.749 -0.277217 74.0654 0.0462986 72.2286L6.73948 34.2286C6.99207 32.7946 8.23791 31.749 9.694 31.749H154.851Z" fill="currentColor"></path>
            <path d="M391.523 31.749C407.523 31.749 419.939 34.9158 428.773 41.249C437.773 47.4157 442.273 56.499 442.273 68.499C442.273 71.3324 442.023 74.4157 441.523 77.749C439.689 88.0823 435.439 96.8324 428.773 103.999C423.987 109.024 418.513 112.847 412.353 115.467C410.437 116.282 410.428 119.751 412.315 120.629C417.366 122.977 421.435 126.267 424.523 130.499C429.189 136.499 431.523 143.582 431.523 151.749C431.523 154.416 431.273 157.249 430.773 160.249C428.106 175.749 420.856 187.749 409.023 196.249C397.356 204.582 381.939 208.749 362.773 208.749H272.407C271.163 208.749 270.221 207.626 270.437 206.401L281.183 145.535C281.464 143.942 283.423 143.325 284.567 144.469L313.037 172.939C316.187 176.089 321.572 173.859 321.573 169.404V33.749C321.573 32.6445 322.468 31.749 323.573 31.749H391.523ZM333.92 161.914C333.712 163.135 334.653 164.249 335.891 164.249H358.773C363.773 164.249 367.606 163.332 370.273 161.499C373.106 159.499 374.856 156.332 375.523 151.999C375.689 151.166 375.773 150.082 375.773 148.749C375.773 142.416 371.523 139.249 363.023 139.249H339.461C338.486 139.249 337.653 139.952 337.49 140.914L333.92 161.914ZM344.947 98.3947C344.726 99.6214 345.669 100.749 346.915 100.749H366.023C371.023 100.749 374.939 99.7489 377.773 97.749C380.606 95.749 382.356 92.6656 383.023 88.499C383.189 87.6657 383.273 86.5824 383.273 85.249C383.273 81.9157 382.189 79.499 380.023 77.999C378.023 76.4992 374.856 75.749 370.523 75.749H350.695C349.727 75.749 348.898 76.4421 348.727 77.3947L344.947 98.3947Z" fill="currentColor"></path>
            <path d="M125.644 207.097C125.475 208.052 124.645 208.749 123.674 208.749H89.3091C88.0653 208.749 87.1231 207.626 87.3397 206.401L101.309 127.405C101.384 126.979 101.595 126.589 101.91 126.294L143.063 87.7252C144.466 86.4105 146.734 87.639 146.4 89.5322L125.644 207.097ZM314.511 159.674C314.511 161.456 312.357 162.349 311.097 161.089L274.985 124.976C274.227 124.219 273.007 124.193 272.218 124.917L180.925 208.749H180.924L180.923 208.748L192.313 143.654C192.48 142.697 193.311 141.999 194.283 141.999H240.929C241.898 141.999 242.727 141.306 242.898 140.353L249.679 102.603C249.9 101.376 248.957 100.249 247.711 100.249H202.479C201.238 100.249 200.296 99.1302 200.508 97.9072L204.065 77.4072C204.231 76.4488 205.062 75.749 206.035 75.749H272.174C273.144 75.749 273.975 75.052 274.143 74.096L281.189 34.096C281.404 32.8715 280.462 31.749 279.219 31.749H182.586C182.055 31.749 181.547 31.5383 181.172 31.1632L153.423 3.41421C152.163 2.15428 153.055 0 154.837 0H312.511C313.616 0 314.511 0.89543 314.511 2V159.674Z" fill="#2981EB"></path>
          </svg>
          <span className="font-outfit font-bold text-[15.5px] tracking-tight">
            TradeFX<span className="text-[#5aa2f2]">Book</span>
          </span>
          <span className="font-mono text-[9px] tracking-wider text-[#5aa2f2] bg-[rgba(41,129,235,0.14)] border border-[rgba(41,129,235,0.3)] px-1.5 py-0.5 rounded ml-0.5">
            BETA
          </span>
        </div>

        {/* User Card */}
        <div 
          onClick={onOpenAuth}
          className="flex items-center gap-2.5 bg-[#141824] border border-[#212636] rounded-xl p-2.5 mb-5 cursor-pointer hover:border-[#2a2f42] transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2981eb] to-[#1a5bb0] flex items-center justify-center font-outfit font-bold text-xs text-white shrink-0 relative">
            {user.avatarInitials}
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22c58b] border-2 border-[#141824]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-[#f4f6fa] truncate">{user.name}</span>
              <span className="font-mono text-[9px] tracking-wider text-[#9aa2b3] bg-[#1a1f2c] px-1.5 py-0.5 rounded">
                {user.plan}
              </span>
            </div>
            <span className="text-[11px] text-[#5c6478] block truncate">{user.email}</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#5c6478]" />
        </div>

        {/* Menu Section */}
        <span className="font-mono text-[10px] tracking-widest text-[#5c6478] px-2.5 mb-2 block font-semibold">
          MENU
        </span>

        <div className="flex flex-col gap-0.5 mb-5">
          <button
            onClick={() => handleNavClick('home')}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors relative w-full text-left ${
              currentTab === 'home' 
                ? 'bg-[rgba(41,129,235,0.14)] text-[#5aa2f2]' 
                : 'text-[#9aa2b3] hover:bg-[#1a1f2c] hover:text-[#f4f6fa]'
            }`}
          >
            {currentTab === 'home' && (
              <span className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-0.75 h-4 bg-[#2981eb] rounded-r" />
            )}
            <Home className="w-4 h-4 shrink-0" />
            <span>Home</span>
          </button>

          <button
            onClick={() => handleNavClick('dashboard')}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors relative w-full text-left ${
              currentTab === 'dashboard' 
                ? 'bg-[rgba(41,129,235,0.14)] text-[#5aa2f2]' 
                : 'text-[#9aa2b3] hover:bg-[#1a1f2c] hover:text-[#f4f6fa]'
            }`}
          >
            {currentTab === 'dashboard' && (
              <span className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-0.75 h-4 bg-[#2981eb] rounded-r" />
            )}
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => handleNavClick('trades')}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors relative w-full text-left ${
              currentTab === 'trades' 
                ? 'bg-[rgba(41,129,235,0.14)] text-[#5aa2f2]' 
                : 'text-[#9aa2b3] hover:bg-[#1a1f2c] hover:text-[#f4f6fa]'
            }`}
          >
            {currentTab === 'trades' && (
              <span className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-0.75 h-4 bg-[#2981eb] rounded-r" />
            )}
            <Briefcase className="w-4 h-4 shrink-0" />
            <span>Trades</span>
          </button>

          <button
            onClick={() => handleNavClick('journal')}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors relative w-full text-left ${
              currentTab === 'journal' 
                ? 'bg-[rgba(41,129,235,0.14)] text-[#5aa2f2]' 
                : 'text-[#9aa2b3] hover:bg-[#1a1f2c] hover:text-[#f4f6fa]'
            }`}
          >
            {currentTab === 'journal' && (
              <span className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-0.75 h-4 bg-[#2981eb] rounded-r" />
            )}
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>Journal</span>
          </button>

          {/* Analysis Menu item with Submenu */}
          <div>
            <button
              onClick={() => {
                setAnalysisExpanded(!analysisExpanded);
                if (!analysisExpanded) handleNavClick('performance');
              }}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors relative w-full text-left ${
                (currentTab === 'performance' || currentTab === 'trade-analysis')
                  ? 'bg-[rgba(41,129,235,0.14)] text-[#5aa2f2]' 
                  : 'text-[#9aa2b3] hover:bg-[#1a1f2c] hover:text-[#f4f6fa]'
              }`}
            >
              {(currentTab === 'performance' || currentTab === 'trade-analysis') && (
                <span className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-0.75 h-4 bg-[#2981eb] rounded-r" />
              )}
              <LineChart className="w-4 h-4 shrink-0" />
              <span>Analysis</span>
              <ChevronDown className={`w-3.5 h-3.5 ml-auto transition-transform ${analysisExpanded ? 'rotate-180' : ''}`} />
            </button>

            {analysisExpanded && (
              <div className="flex flex-col gap-0.5 my-1 ml-7 pl-2.5 border-l border-[#212636]">
                <button
                  onClick={() => handleNavClick('performance')}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[12.5px] font-medium transition-colors w-full text-left ${
                    currentTab === 'performance'
                      ? 'text-[#5aa2f2] bg-[rgba(41,129,235,0.12)]'
                      : 'text-[#5c6478] hover:bg-[#1a1f2c] hover:text-[#f4f6fa]'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Performance</span>
                </button>

                <button
                  onClick={() => handleNavClick('trade-analysis')}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[12.5px] font-medium transition-colors w-full text-left ${
                    currentTab === 'trade-analysis'
                      ? 'text-[#5aa2f2] bg-[rgba(41,129,235,0.12)]'
                      : 'text-[#5c6478] hover:bg-[#1a1f2c] hover:text-[#f4f6fa]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Trade Analysis</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('market')}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors relative w-full text-left ${
              currentTab === 'market' 
                ? 'bg-[rgba(41,129,235,0.14)] text-[#5aa2f2]' 
                : 'text-[#9aa2b3] hover:bg-[#1a1f2c] hover:text-[#f4f6fa]'
            }`}
          >
            {currentTab === 'market' && (
              <span className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-0.75 h-4 bg-[#2981eb] rounded-r" />
            )}
            <TrendingUp className="w-4 h-4 shrink-0" />
            <span>Market</span>
          </button>

          <button
            onClick={() => handleNavClick('ai-report')}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors relative w-full text-left ${
              currentTab === 'ai-report' 
                ? 'bg-[rgba(41,129,235,0.14)] text-[#5aa2f2]' 
                : 'text-[#9aa2b3] hover:bg-[#1a1f2c] hover:text-[#f4f6fa]'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0 text-[#5aa2f2]" />
            <span>AI Report</span>
            <span className="ml-auto font-mono text-[9px] font-semibold text-[#5aa2f2] bg-[rgba(41,129,235,0.14)] border border-[rgba(41,129,235,0.3)] px-1.5 py-0.5 rounded">
              PRO
            </span>
          </button>

          <button
            onClick={() => handleNavClick('backtesting')}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors relative w-full text-left ${
              currentTab === 'backtesting' 
                ? 'bg-[rgba(41,129,235,0.14)] text-[#5aa2f2]' 
                : 'text-[#9aa2b3] hover:bg-[#1a1f2c] hover:text-[#f4f6fa]'
            }`}
          >
            <History className="w-4 h-4 shrink-0" />
            <span>Backtesting</span>
            <span className="ml-auto font-mono text-[9px] font-semibold text-[#f5c451] bg-[rgba(245,196,81,0.1)] border border-[rgba(245,196,81,0.3)] px-1.5 py-0.5 rounded">
              ELITE
            </span>
          </button>

          <button
            onClick={() => handleNavClick('traders-lounge')}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors relative w-full text-left ${
              currentTab === 'traders-lounge' 
                ? 'bg-[rgba(41,129,235,0.14)] text-[#5aa2f2]' 
                : 'text-[#9aa2b3] hover:bg-[#1a1f2c] hover:text-[#f4f6fa]'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>Traders Lounge</span>
          </button>

          <button
            onClick={() => handleNavClick('tools')}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors relative w-full text-left ${
              currentTab === 'tools' 
                ? 'bg-[rgba(41,129,235,0.14)] text-[#5aa2f2]' 
                : 'text-[#9aa2b3] hover:bg-[#1a1f2c] hover:text-[#f4f6fa]'
            }`}
          >
            <Wrench className="w-4 h-4 shrink-0" />
            <span>Tools</span>
          </button>
        </div>

        {/* Support Section */}
        <div className="mt-auto pt-3.5 border-t border-[#1a1e2b]">
          <span className="font-mono text-[10px] tracking-widest text-[#5c6478] px-2.5 mb-2 block font-semibold">
            SUPPORT
          </span>
          <div className="flex flex-col gap-0.5">
            <button
              onClick={() => handleNavClick('settings')}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors w-full text-left ${
                currentTab === 'settings' ? 'bg-[rgba(41,129,235,0.14)] text-[#5aa2f2]' : 'text-[#9aa2b3] hover:bg-[#1a1f2c] hover:text-[#f4f6fa]'
              }`}
            >
              <Settings className="w-4 h-4 shrink-0" />
              <span>Settings</span>
            </button>

            <button
              onClick={() => handleNavClick('help')}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors w-full text-left ${
                currentTab === 'help' ? 'bg-[rgba(41,129,235,0.14)] text-[#5aa2f2]' : 'text-[#9aa2b3] hover:bg-[#1a1f2c] hover:text-[#f4f6fa]'
              }`}
            >
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>Help & Support</span>
            </button>

            <button
              onClick={user.isAuthenticated ? onLogout : onOpenAuth}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium text-[#ef4b5c]/80 hover:text-[#ef4b5c] hover:bg-[#ef4b5c]/10 transition-colors w-full text-left mt-1"
            >
              {user.isAuthenticated ? (
                <>
                  <LogOut className="w-4 h-4 shrink-0" />
                  <span>Sign Out</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 shrink-0 text-[#5aa2f2]" />
                  <span className="text-[#5aa2f2]">Sign In</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
