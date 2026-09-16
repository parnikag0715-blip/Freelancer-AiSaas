import React, { useState } from 'react';
import {
  Search,
  Bookmark,
  Building2,
  Calendar,
  DollarSign,
  ArrowRight,
  Trash2,
  Download,
  Filter,
  Briefcase,
  Layers,
  Plus,
  ExternalLink,
} from 'lucide-react';
import { ProjectAnalysis, OpportunityScoreRecommendation } from '../types';

interface HistoryLeadsViewProps {
  projects: ProjectAnalysis[];
  onSelectProject: (project: ProjectAnalysis) => void;
  onToggleSave: (projectId: string) => void;
  onDeleteProject: (projectId: string) => void;
  onNewAnalysis: () => void;
}

export const HistoryLeadsView: React.FC<HistoryLeadsViewProps> = ({
  projects,
  onSelectProject,
  onToggleSave,
  onDeleteProject,
  onNewAnalysis,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRec, setFilterRec] = useState<string>('all');
  const [savedOnly, setSavedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.extractedEntities.companyName &&
        p.extractedEntities.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      p.extractedEntities.keyRequirements.some((r) =>
        r.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesRec =
      filterRec === 'all' || p.leadIntelligence.recommendation === filterRec;

    const matchesSaved = !savedOnly || p.isSaved;

    return matchesSearch && matchesRec && matchesSaved;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'score') {
      return b.leadIntelligence.opportunityScore - a.leadIntelligence.opportunityScore;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const exportAllJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(projects, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `FreelancerAI_Leads_Export_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900 font-display">
            Lead Dossiers & Analysis History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Search, filter, and organize all previously analyzed marketplace opportunities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportAllJson}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 border border-slate-200 transition flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Export All ({projects.length})</span>
          </button>

          <button
            onClick={onNewAnalysis}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white shadow-xs transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Analyze New</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by project name, company, or requirement keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Saved Toggle */}
          <button
            onClick={() => setSavedOnly(!savedOnly)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition ${
              savedOnly
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Only</span>
          </button>

          {/* Recommendation Filter */}
          <select
            value={filterRec}
            onChange={(e) => setFilterRec(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Recommendations</option>
            <option value="High Potential">High Potential</option>
            <option value="Medium Potential">Medium Potential</option>
            <option value="Low Information">Low Information</option>
            <option value="Proceed With Caution">Proceed With Caution</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
          >
            <option value="date">Sort: Newest First</option>
            <option value="score">Sort: Highest Score</option>
          </select>
        </div>
      </div>

      {/* Projects List */}
      {sortedProjects.length === 0 ? (
        <div className="p-12 text-center rounded-xl border border-dashed border-slate-200 bg-white">
          <p className="text-sm font-medium text-slate-500">No project dossiers match your filters.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterRec('all');
              setSavedOnly(false);
            }}
            className="mt-3 text-xs text-indigo-600 hover:underline font-medium"
          >
            Reset search and filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedProjects.map((p) => {
            const rec = p.leadIntelligence.recommendation;
            const isHigh = rec === 'High Potential';
            const isMed = rec === 'Medium Potential';

            return (
              <div
                key={p.id}
                className="p-5 rounded-xl border border-slate-200 bg-white hover:border-indigo-200 hover:shadow-xs transition flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => onSelectProject(p)}
                >
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition">
                      {p.title}
                    </h3>

                    {p.extractedEntities.companyName && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {p.extractedEntities.companyName}
                      </span>
                    )}

                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${
                        isHigh
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : isMed
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {rec}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 max-w-3xl leading-relaxed">
                    {p.projectUnderstanding.executiveSummary}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mt-2.5 text-[11px] text-slate-500">
                    <span>Marketplace: {p.sourceMarketplace || 'Direct'}</span>
                    <span>•</span>
                    <span>Budget: {p.extractedEntities.budget.raw || 'Unspecified'}</span>
                    <span>•</span>
                    <span>Timeline: {p.extractedEntities.timeline || 'Flexible'}</span>
                    <span>•</span>
                    <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Right side Score & Actions */}
                <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="text-right">
                    <div className="text-xs text-slate-500 font-medium">Score</div>
                    <div className="text-lg font-bold text-amber-600">
                      {p.leadIntelligence.opportunityScore}
                      <span className="text-xs text-slate-400 font-normal"> / 100</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleSave(p.id)}
                    className={`p-2 rounded-lg border transition ${
                      p.isSaved
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                        : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                    title={p.isSaved ? 'Lead Saved' : 'Save Lead'}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onDeleteProject(p.id)}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-red-50 border border-slate-200 hover:border-red-200 text-slate-500 hover:text-red-600 transition"
                    title="Delete Dossier"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onSelectProject(p)}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition flex items-center gap-1"
                  >
                    <span>View Report</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
