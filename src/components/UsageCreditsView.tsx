import React from 'react';
import {
  Zap,
  CheckCircle2,
  ShieldCheck,
  Server,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Cpu,
} from 'lucide-react';
import { UserProfile } from '../types';

interface UsageCreditsViewProps {
  user: UserProfile;
}

export const UsageCreditsView: React.FC<UsageCreditsViewProps> = ({ user }) => {
  const percentUsed = Math.round(
    ((user.creditsTotal - user.creditsRemaining) / user.creditsTotal) * 100
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900 font-display">
          Usage, Intelligence Credits & System Status
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Monitor your project analysis quota, AI model performance, and public data verification status.
        </p>
      </div>

      {/* Plan Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-indigo-600">
              Active Tier
            </span>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <span>{user.tier}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                Active
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Production plan tailored for active B2B freelance consultants and independent agencies.
            </p>
          </div>

          <div className="text-right sm:border-l sm:border-slate-200 sm:pl-6">
            <div className="text-xs text-slate-500">Next Quota Renewal</div>
            <div className="text-sm font-semibold text-slate-900">October 1, 2026</div>
            <div className="text-[11px] text-slate-400">Auto-renews monthly</div>
          </div>
        </div>

        {/* Meter */}
        <div className="mt-6 pt-5 border-t border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-700 font-medium">Monthly Project Analysis Credits</span>
            <span className="font-mono text-slate-900">
              <strong className="text-amber-600 font-bold">{user.creditsRemaining}</strong> of{' '}
              {user.creditsTotal} remaining
            </span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-3 border border-slate-200 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${100 - percentUsed}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>{percentUsed}% consumed this billing cycle</span>
            <span>1 credit per comprehensive lead dossier</span>
          </div>
        </div>
      </div>

      {/* Engine & Architecture Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              AI Analysis Engine
            </span>
            <Cpu className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Gemini 3.8 Flash</span>
          </div>
          <p className="text-xs text-slate-500">
            Server-side execution with strict JSON schema adherence and prompt sandboxing.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Public Registry Corroboration
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Live Corroborator Online</span>
          </div>
          <p className="text-xs text-slate-500">
            Searches legitimate open registries, ICANN WHOIS records, and verified public web domains.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Outreach Synthesis
            </span>
            <Cpu className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Multi-Channel Studio</span>
          </div>
          <p className="text-xs text-slate-500">
            Generates high-conversion, non-spammy Email, WhatsApp, and LinkedIn drafts.
          </p>
        </div>
      </div>

      {/* Credit Consumption Breakdown */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          What is included in each Analysis Credit?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600">
              <strong className="text-slate-900 block">Deep Entity Extraction:</strong>
              Identifies companies, key roles, tech stack, budget ranges, and explicit deliverables.
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600">
              <strong className="text-slate-900 block">Identity Verification & Evidence:</strong>
              Calculates match confidence (0-100%) against public registries and highlights uncertainties.
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600">
              <strong className="text-slate-900 block">Opportunity Scoring (0-100):</strong>
              Evaluates clarity, legitimacy, budget quality, and scope feasibility with strategic guidance.
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600">
              <strong className="text-slate-900 block">3-Channel Outreach Synthesis:</strong>
              Generates tailored Email, WhatsApp, and LinkedIn InMail drafts with customizable angles.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
