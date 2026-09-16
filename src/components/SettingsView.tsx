import React, { useState } from 'react';
import {
  User,
  Settings,
  ShieldCheck,
  Save,
  Trash2,
  Download,
  Check,
  Briefcase,
  Globe,
  Lock,
} from 'lucide-react';
import { UserProfile } from '../types';

interface SettingsViewProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onClearHistory: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  onUpdateUser,
  onClearHistory,
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [niche, setNiche] = useState(user.niche);
  const [portfolioUrl, setPortfolioUrl] = useState(user.portfolioUrl || 'https://freelancer-portfolio.dev');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name,
      email,
      role,
      niche,
      portfolioUrl,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900 font-display">Platform Settings</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your consultant profile, default outreach signature, and data privacy safeguards.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5 shadow-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              Freelancer & Consultant Profile
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-600 font-medium">Full Name / Agency Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-600 font-medium">Professional Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-600 font-medium">Professional Title</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Senior Full-Stack & B2B Solutions Architect"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-600 font-medium">Primary Specialization / Niche</label>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="Industrial & B2B Web Platforms, FinTech MVPs"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs text-slate-600 font-medium">Portfolio or Agency Website URL</label>
              <input
                type="url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://portfolio.dev"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Ethical Safeguards Policy */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              Safety, Privacy & Anti-Spam Compliance
            </h2>
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
              <Lock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">No Automated Spam Dispatching:</strong>
                All generated outreach templates remain strictly under your control. The platform does not integrate automated email blast pipelines or mass contact senders.
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Verified Public Data Sources Only:</strong>
                Entity extraction and research only consults publicly accessible corporate filings, domain registration records, and official company portals.
              </div>
            </div>
          </div>
        </div>

        {/* Data Persistence & History Controls */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Trash2 className="w-4 h-4 text-red-600" />
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              Local Storage & Session Management
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-800 font-semibold">Reset Local Project Dossiers</p>
              <p className="text-[11px] text-slate-500">
                Wipes all stored project analyses from your browser local storage cache.
              </p>
            </div>
            <button
              type="button"
              onClick={onClearHistory}
              className="px-3.5 py-2 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-semibold transition"
            >
              Clear Analysis Cache
            </button>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {savedSuccess && (
            <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
              <Check className="w-4 h-4" />
              Settings saved successfully!
            </span>
          )}

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
