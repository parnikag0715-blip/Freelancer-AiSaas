import React from 'react';
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building2,
  Bookmark,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileText,
  Clock,
  Briefcase,
  Zap,
  Plus,
} from 'lucide-react';
import { ProjectAnalysis, UserProfile } from '../types';

interface DashboardViewProps {
  projects: ProjectAnalysis[];
  user: UserProfile;
  onSelectProject: (project: ProjectAnalysis) => void;
  onNewAnalysis: () => void;
  onLoadSample: (sampleId: string) => void;
  onToggleSave: (projectId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  projects,
  user,
  onSelectProject,
  onNewAnalysis,
  onLoadSample,
  onToggleSave,
}) => {
  const totalAnalyzed = projects.length;
  const highPotentialCount = projects.filter(
    (p) => p.leadIntelligence.recommendation === 'High Potential'
  ).length;
  const savedCount = projects.filter((p) => p.isSaved).length;
  const avgScore = totalAnalyzed
    ? Math.round(
        projects.reduce((acc, p) => acc + p.leadIntelligence.opportunityScore, 0) /
          totalAnalyzed
      )
    : 0;

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 md:p-8 shadow-xs">
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-2 font-display">
            Welcome back, {user.name}
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-6 max-w-2xl">
            Transform raw project descriptions into structured lead dossiers. Extract business entities, verify legitimate public records, score opportunities, and generate hyper-personalized outreach drafts in seconds.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              id="dashboard-cta-new-analysis"
              onClick={onNewAnalysis}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition active:scale-95 min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span>Analyze Project Description</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              id="dashboard-btn-load-lixbor"
              onClick={() => onLoadSample('lixbor-auron-trading')}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-medium border border-slate-300 shadow-xs transition min-h-[44px]"
            >
              <Building2 className="w-4 h-4 text-amber-600" />
              <span>Load Sample: LIXBOR AURON LLP</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider">Total Analyzed</span>
            <FileText className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-slate-900">{totalAnalyzed}</span>
            <span className="text-xs text-slate-500">Projects</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Dossiers generated this month</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider">High Potential</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-emerald-700">{highPotentialCount}</span>
            <span className="text-xs text-slate-500">
              ({totalAnalyzed ? Math.round((highPotentialCount / totalAnalyzed) * 100) : 0}%)
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Verified clients with solid budgets</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider">Avg Opportunity</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-amber-700">{avgScore}</span>
            <span className="text-xs text-slate-500">/ 100</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Across clarity & feasibility</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider">Saved Leads</span>
            <Bookmark className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-indigo-700">{savedCount}</span>
            <span className="text-xs text-slate-500">Targets</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Bookmarked for immediate pitch</p>
        </div>
      </div>

      {/* Quick Launch & Guidance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sample Loaders Box */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Pre-Loaded Class Benchmark Projects</h2>
              <p className="text-xs text-slate-500">Inspect real-world test cases directly from the prompt specification</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              onClick={() => onLoadSample('lixbor-auron-trading')}
              className="p-4 rounded-xl border border-slate-200 hover:border-indigo-400 bg-slate-50/70 hover:bg-white transition cursor-pointer group shadow-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  High Potential · Score 94
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition mb-1">
                LIXBOR AURON LLP
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                International trading platform for Polymers, Chemicals & Fertilizers. Includes full verification against Companies House records.
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                <span>Budget: $3.5k-$5k</span>
                <span>•</span>
                <span>Match: 92% Confirmed</span>
              </div>
            </div>

            <div
              onClick={() => onLoadSample('novapay-mvp-platform')}
              className="p-4 rounded-xl border border-slate-200 hover:border-indigo-400 bg-slate-50/70 hover:bg-white transition cursor-pointer group shadow-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  High Potential · Score 96
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition mb-1">
                NovaPay Labs Inc.
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                FinTech Cross-Border FX Dashboard MVP. Seed-stage Delaware C-Corp with Swagger API specs and WebSocket requirements.
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                <span>Budget: $6k-$8k</span>
                <span>•</span>
                <span>Match: 95% Confirmed</span>
              </div>
            </div>

            <div
              onClick={() => onLoadSample('shopify-speed-gig')}
              className="p-4 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50/70 hover:bg-white transition cursor-pointer group shadow-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                  Low Information · Score 54
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 group-hover:text-amber-700 transition mb-1">
                Anonymous E-Commerce Gig
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                Shopify speed & checkout optimization without company name or store URL. Demonstrates uncertain identity handling.
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                <span>Budget: Unspecified</span>
                <span>•</span>
                <span>Match: 25% Ambiguous</span>
              </div>
            </div>

            <div
              onClick={onNewAnalysis}
              className="p-4 rounded-xl border border-dashed border-slate-300 hover:border-indigo-500 bg-slate-50/50 hover:bg-indigo-50/30 transition cursor-pointer flex flex-col items-center justify-center text-center group shadow-xs"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2 group-hover:scale-110 transition">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition">
                Paste Custom Marketplace Description
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5">
                Upwork, Fiverr, Freelancer, or direct email
              </span>
            </div>
          </div>
        </div>

        {/* Verification Philosophy Box */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 mb-2">Public Intelligence Contract</h2>
            <p className="text-xs text-slate-600 leading-relaxed space-y-2">
              Freelancer AI adheres strictly to ethical B2B intelligence principles:
            </p>
            <ul className="mt-3 space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Only public corporate records, public websites & open registries are researched.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Zero fabricated contacts: Missing information is honestly flagged as unverified.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>User-controlled drafts: You review and edit all outreach before sending.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
            Compliant with legitimate lead research standards.
          </div>
        </div>
      </div>

      {/* Recent Analyses List */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Project Analyses</h2>
            <p className="text-xs text-slate-500">Click any dossier to view full intelligence report and outreach drafts</p>
          </div>
          <span className="text-xs text-slate-500 font-medium">{projects.length} Saved in Session</span>
        </div>

        {projects.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-slate-800">No project analyses yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Paste a project description from any freelancing platform to extract business entities and verify legitimate records.
            </p>
            <button
              onClick={onNewAnalysis}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white shadow-xs"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>Start First Analysis</span>
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {projects.map((project) => {
              const rec = project.leadIntelligence.recommendation;
              const isHigh = rec === 'High Potential';
              const isMed = rec === 'Medium Potential';
              const isLow = rec === 'Low Information';

              return (
                <div
                  key={project.id}
                  className="p-4 sm:p-5 hover:bg-slate-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => onSelectProject(project)}
                  >
                    <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                      <h3 className="text-sm font-semibold text-slate-900 hover:text-indigo-600 transition">
                        {project.title}
                      </h3>
                      {project.extractedEntities.companyName && (
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          {project.extractedEntities.companyName}
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${
                          isHigh
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : isMed
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        {rec}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-1 max-w-3xl leading-relaxed">
                      {project.projectUnderstanding.executiveSummary}
                    </p>

                    <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3 text-slate-400" />
                        {project.sourceMarketplace || 'Marketplace'}
                      </span>
                      <span>•</span>
                      <span>Budget: {project.extractedEntities.budget.raw || 'Unspecified'}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Right Score & Actions */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 justify-end">
                        <span className="text-xs text-slate-500">Score:</span>
                        <span className="text-base font-bold text-slate-900">
                          {project.leadIntelligence.opportunityScore}
                          <span className="text-slate-400 text-xs font-normal">/100</span>
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {project.verification.matchConfidenceScore}% Match Confidence
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleSave(project.id)}
                      className={`p-2 rounded-lg border transition ${
                        project.isSaved
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                          : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                      }`}
                      title={project.isSaved ? 'Lead Saved' : 'Save Lead'}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onSelectProject(project)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition"
                    >
                      View Dossier
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
