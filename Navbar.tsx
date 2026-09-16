import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  BookmarkCheck,
  Zap,
  Settings,
  ShieldCheck,
  User,
  LogOut,
  ExternalLink,
  Type,
} from 'lucide-react';
import { AppScreen, UserProfile } from '../types';

interface NavbarProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  user: UserProfile;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  user,
  onOpenAuth,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand / Logo */}
          <div className="flex items-center gap-3">
            <button
              id="nav-logo-btn"
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2.5 text-left group transition"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition font-display">
                Freelancer<span className="text-indigo-600">AI</span>
              </span>
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              id="nav-dashboard-btn"
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs lg:text-sm font-semibold transition ${
                currentScreen === 'dashboard'
                  ? 'bg-slate-100 text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-slate-500" />
              <span>Dashboard</span>
            </button>

            <button
              id="nav-new-analysis-btn"
              onClick={() => onNavigate('new-analysis')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs lg:text-sm font-semibold transition ${
                currentScreen === 'new-analysis'
                  ? 'bg-slate-100 text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-indigo-600" />
              <span>New Analysis</span>
            </button>

            <button
              id="nav-history-btn"
              onClick={() => onNavigate('history')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs lg:text-sm font-semibold transition ${
                currentScreen === 'history'
                  ? 'bg-slate-100 text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookmarkCheck className="w-4 h-4 text-slate-500" />
              <span>Saved Leads & History</span>
            </button>

            <button
              id="nav-credits-btn"
              onClick={() => onNavigate('credits')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs lg:text-sm font-semibold transition ${
                currentScreen === 'credits'
                  ? 'bg-slate-100 text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Usage & Credits</span>
            </button>

            <button
              id="nav-settings-btn"
              onClick={() => onNavigate('settings')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs lg:text-sm font-semibold transition ${
                currentScreen === 'settings'
                  ? 'bg-slate-100 text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Settings className="w-4 h-4 text-slate-500" />
              <span>Settings</span>
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Credits pill */}
            <button
              id="nav-credit-badge-btn"
              onClick={() => onNavigate('credits')}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium hover:bg-amber-100 transition"
              title="Click to view credits & quota"
            >
              <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="font-semibold">{user.creditsRemaining}</span>
              <span className="text-amber-800/80">/ {user.creditsTotal} Credits</span>
            </button>

            {/* Quick CTA */}
            <button
              id="nav-cta-analyze"
              onClick={() => onNavigate('new-analysis')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Analyze Project</span>
              <span className="sm:hidden">Analyze</span>
            </button>

            {/* User Profile */}
            <button
              id="nav-user-profile-btn"
              onClick={onOpenAuth}
              className="flex items-center gap-2 pl-2 border-l border-slate-200 hover:opacity-80 transition"
              title="Account & Auth"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
                {user.name.slice(0, 2).toUpperCase()}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200 bg-white px-1 py-1 text-xs font-medium text-slate-500">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] px-2 py-1 gap-1 transition ${currentScreen === 'dashboard' ? 'text-indigo-600 font-semibold' : 'text-slate-600'}`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="whitespace-nowrap text-[11px]">Dashboard</span>
        </button>
        <button
          onClick={() => onNavigate('new-analysis')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] px-2 py-1 gap-1 transition ${currentScreen === 'new-analysis' ? 'text-indigo-600 font-semibold' : 'text-slate-600'}`}
        >
          <PlusCircle className="w-4 h-4" />
          <span className="whitespace-nowrap text-[11px]">Analyze</span>
        </button>
        <button
          onClick={() => onNavigate('history')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] px-2 py-1 gap-1 transition ${currentScreen === 'history' ? 'text-indigo-600 font-semibold' : 'text-slate-600'}`}
        >
          <BookmarkCheck className="w-4 h-4" />
          <span className="whitespace-nowrap text-[11px]">Saved</span>
        </button>
        <button
          onClick={() => onNavigate('credits')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] px-2 py-1 gap-1 transition ${currentScreen === 'credits' ? 'text-indigo-600 font-semibold' : 'text-slate-600'}`}
        >
          <Zap className="w-4 h-4" />
          <span className="whitespace-nowrap text-[11px]">Credits</span>
        </button>
        <button
          onClick={() => onNavigate('settings')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] px-2 py-1 gap-1 transition ${currentScreen === 'settings' ? 'text-indigo-600 font-semibold' : 'text-slate-600'}`}
        >
          <Settings className="w-4 h-4" />
          <span className="whitespace-nowrap text-[11px]">Settings</span>
        </button>
      </div>
    </header>
  );
};
