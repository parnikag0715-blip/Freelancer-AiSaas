import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  TrendingUp,
  Mail,
  MessageSquare,
  Linkedin,
  Copy,
  Check,
  Download,
  Bookmark,
  Share2,
  FileText,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  Layers,
  Search,
  Zap,
  RotateCw,
  Clock,
  Briefcase,
  Globe,
  Phone,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Send,
  Lightbulb,
} from 'lucide-react';
import {
  ActiveTab,
  ProjectAnalysis,
  OpportunityScoreRecommendation,
} from '../types';

interface AnalysisResultsViewProps {
  project: ProjectAnalysis;
  onToggleSave: (projectId: string) => void;
  onNewAnalysis: () => void;
}

export const AnalysisResultsView: React.FC<AnalysisResultsViewProps> = ({
  project,
  onToggleSave,
  onNewAnalysis,
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Outreach Draft State (Editable)
  const [emailSubject, setEmailSubject] = useState(project.outreachDrafts.email.subject);
  const [emailHook, setEmailHook] = useState(project.outreachDrafts.email.openingHook);
  const [emailBody, setEmailBody] = useState(project.outreachDrafts.email.body);
  const [emailCta, setEmailCta] = useState(project.outreachDrafts.email.callToAction);

  const [whatsAppMsg, setWhatsAppMsg] = useState(project.outreachDrafts.whatsApp.message);

  const [linkedInNote, setLinkedInNote] = useState(project.outreachDrafts.linkedIn.connectionNote);
  const [linkedInInMail, setLinkedInInMail] = useState(project.outreachDrafts.linkedIn.inMail);

  const [selectedChannel, setSelectedChannel] = useState<'email' | 'whatsApp' | 'linkedIn'>('email');
  const [selectedTone, setSelectedTone] = useState<
    'Value-First & Direct' | 'Consultative & Strategic' | 'Casual & Warm' | 'Technical & Detailed'
  >('Value-First & Direct');
  const [isRegenerating, setIsRegenerating] = useState(false);

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleRegenerateDraft = async () => {
    setIsRegenerating(true);
    try {
      const res = await fetch('/api/freelancer/regenerate-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectTitle: project.title,
          companyName: project.extractedEntities.companyName,
          keyRequirements: project.extractedEntities.keyRequirements,
          recommendation: project.leadIntelligence.recommendation,
          channel: selectedChannel,
          tone: selectedTone,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (selectedChannel === 'email') {
          if (data.subject) setEmailSubject(data.subject);
          if (data.openingHook) setEmailHook(data.openingHook);
          if (data.body) setEmailBody(data.body);
          if (data.callToAction) setEmailCta(data.callToAction);
        } else if (selectedChannel === 'whatsApp') {
          if (data.message) setWhatsAppMsg(data.message);
        } else if (selectedChannel === 'linkedIn') {
          if (data.connectionNote) setLinkedInNote(data.connectionNote);
          if (data.inMail) setLinkedInInMail(data.inMail);
        }
      }
    } catch (e) {
      console.error('Failed to regenerate draft:', e);
    } finally {
      setIsRegenerating(false);
    }
  };

  const exportJsonReport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(project, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `FreelancerAI_Report_${project.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const rec = project.leadIntelligence.recommendation;
  const isHigh = rec === 'High Potential';
  const isMed = rec === 'Medium Potential';
  const isLow = rec === 'Low Information';

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner & Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-400">
                ID: {project.id}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500">
                Analyzed on {new Date(project.createdAt).toLocaleDateString()}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-medium text-slate-700">
                {project.sourceMarketplace || 'Direct'}
              </span>
            </div>

            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 font-display">
              {project.title}
            </h1>

            {project.extractedEntities.companyName && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 flex-wrap">
                <Building2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-semibold text-slate-900 font-display">
                  {project.extractedEntities.companyName}
                </span>
                {project.businessResearch.officialWebsite && (
                  <a
                    href={project.businessResearch.officialWebsite.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <span>{project.businessResearch.officialWebsite.url}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Score Badges & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Opportunity Score Pill */}
            <div className="px-3.5 sm:px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                  Opportunity Score
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-amber-600 font-display">
                    {project.leadIntelligence.opportunityScore}
                  </span>
                  <span className="text-xs text-slate-400">/100</span>
                </div>
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
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

            {/* Verification Pill */}
            <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Match Confidence
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <ShieldCheck
                  className={`w-4 h-4 ${
                    project.verification.matchConfidenceScore >= 80
                      ? 'text-emerald-600'
                      : project.verification.matchConfidenceScore >= 50
                      ? 'text-amber-600'
                      : 'text-slate-400'
                  }`}
                />
                <span className="text-sm font-bold text-slate-900">
                  {project.verification.matchConfidenceScore}%
                </span>
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  ({project.verification.verdict})
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                id="btn-save-lead"
                onClick={() => onToggleSave(project.id)}
                className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                  project.isSaved
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{project.isSaved ? 'Saved Target' : 'Save Lead'}</span>
              </button>

              <button
                id="btn-export-json"
                onClick={exportJsonReport}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition"
                title="Export JSON Dossier"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto border-t border-slate-200 mt-6 pt-4 scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Executive Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('entities')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'entities'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Extracted Entities</span>
          </button>

          <button
            onClick={() => setActiveTab('research')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'research'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Public Business Research</span>
          </button>

          <button
            onClick={() => setActiveTab('verification')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'verification'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verification & Evidence</span>
          </button>

          <button
            onClick={() => setActiveTab('scoring')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'scoring'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Opportunity Scorecard</span>
          </button>

          <button
            onClick={() => setActiveTab('outreach')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'outreach'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>AI Outreach Generator</span>
          </button>
        </div>
      </div>

      {/* TAB 1: EXECUTIVE OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metric Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold flex items-center gap-1.5 mb-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>Budget</span>
              </div>
              <div className="text-base font-bold text-slate-900">
                {project.extractedEntities.budget.raw || 'Unspecified'}
              </div>
              <span className="text-[10px] text-slate-400 uppercase">
                {project.extractedEntities.budget.type}
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                <span>Timeline</span>
              </div>
              <div className="text-base font-bold text-slate-900">
                {project.extractedEntities.timeline || 'Flexible'}
              </div>
              <span className="text-[10px] text-slate-500 capitalize">
                Urgency: {project.extractedEntities.urgency}
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold flex items-center gap-1.5 mb-1">
                <Layers className="w-3.5 h-3.5 text-amber-600" />
                <span>Complexity</span>
              </div>
              <div className="text-base font-bold text-slate-900">
                {project.projectUnderstanding.projectComplexity}
              </div>
              <span className="text-[10px] text-slate-500">
                {project.extractedEntities.keyRequirements.length} Core Requirements
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold flex items-center gap-1.5 mb-1">
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>Market / Sector</span>
              </div>
              <div className="text-base font-bold text-slate-900 truncate">
                {project.extractedEntities.industries[0] || 'General Web'}
              </div>
              <span className="text-[10px] text-slate-400 truncate block">
                {project.extractedEntities.productsServices[0] || 'Digital Solutions'}
              </span>
            </div>
          </div>

          {/* Core Understanding Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-600 mb-1">
                  Executive Summary
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {project.projectUnderstanding.executiveSummary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-600 mb-1">
                  Core Client Problem
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {project.projectUnderstanding.coreProblem}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-600 mb-2">
                  Client Strategic Goals
                </h3>
                <ul className="space-y-2">
                  {project.projectUnderstanding.clientGoals.map((goal, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-600 mb-1">
                  Ideal Freelancer Profile
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {project.projectUnderstanding.idealFreelancerProfile}
                </p>
              </div>
            </div>
          </div>

          {/* Raw Project Description Accordion */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Original Input Project Description
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {project.rawDescription.length} characters
              </span>
            </div>
            <pre className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 whitespace-pre-wrap font-mono leading-relaxed max-h-56 overflow-y-auto">
              {project.rawDescription}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 2: EXTRACTED ENTITIES */}
      {activeTab === 'entities' && (
        <div className="space-y-6">
          {/* Company & Entity Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2 shadow-xs">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                Company / Legal Entity
              </span>
              <div className="text-base font-bold text-slate-900">
                {project.extractedEntities.companyName || 'Not Disclosed (Anonymous Posting)'}
              </div>
              <p className="text-xs text-slate-500">
                {project.extractedEntities.companyName
                  ? 'Extracted directly from project description'
                  : 'Client did not disclose company name in initial description.'}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2 shadow-xs">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                Identified Contacts / Personnel
              </span>
              <div className="text-sm font-semibold text-slate-800">
                {project.extractedEntities.clientNames.length > 0
                  ? project.extractedEntities.clientNames.join(', ')
                  : 'Anonymous / Role not specified'}
              </div>
              <p className="text-xs text-slate-500">
                Only verified or mentioned roles are documented.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2 shadow-xs">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                Locations & Jurisdiction
              </span>
              <div className="text-sm font-semibold text-slate-800">
                {project.extractedEntities.locations.length > 0
                  ? project.extractedEntities.locations.join('; ')
                  : 'Global / Remote'}
              </div>
              <p className="text-xs text-slate-500">
                Target market and client operational regions.
              </p>
            </div>
          </div>

          {/* Industry & Products */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
            <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Identified Products, Commodities & Verticals
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.extractedEntities.productsServices.map((p, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium"
                >
                  {p}
                </span>
              ))}
              {project.extractedEntities.industries.map((ind, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-medium"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>

          {/* Full Key Requirements List */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Structured Project Requirements ({project.extractedEntities.keyRequirements.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.extractedEntities.keyRequirements.map((req, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700"
                >
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 text-[10px] font-bold border border-indigo-200">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack & Deliverables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Identified Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.extractedEntities.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-slate-50 text-slate-800 border border-slate-200 text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Expected Deliverables
              </h3>
              <ul className="space-y-2">
                {project.extractedEntities.deliverables.map((deliv, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PUBLIC BUSINESS RESEARCH */}
      {activeTab === 'research' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Public Business Overview
              </h3>
              <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Verified Public Domain Knowledge
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {project.businessResearch.companyOverview}
            </p>
          </div>

          {/* Discovered Public Presences */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Discovered Public Records & Presences ({project.businessResearch.publicPresence.length})
            </h3>

            {project.businessResearch.publicPresence.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-slate-200 rounded-lg">
                <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-500">
                  No public presences discovered. Anonymous posting or unlisted entity.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {project.businessResearch.publicPresence.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                          {item.platform}
                        </span>
                        {item.verified && (
                          <span className="text-[10px] text-emerald-700 flex items-center gap-0.5">
                            <Check className="w-3 h-3 text-emerald-600" />
                            Confirmed Match
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-600">{item.snippet}</p>
                    </div>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium inline-flex items-center gap-1.5 shrink-0 transition"
                    >
                      <span>Inspect Source</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Public Contact Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Verified Public Contact Points
              </h3>
              {project.businessResearch.publicContactPoints.length === 0 ? (
                <p className="text-xs text-slate-500">
                  No public contact points available. Adhering to anti-scraping policy: we do not harvest private numbers.
                </p>
              ) : (
                <div className="space-y-2">
                  {project.businessResearch.publicContactPoints.map((pt, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="text-slate-500 block text-[10px]">{pt.type}</span>
                        <span className="text-slate-900 font-mono font-medium">{pt.value}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                        {pt.source}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Audit Trail Sources Tracked */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Sources Audited During Research
              </h3>
              <div className="space-y-2">
                {project.businessResearch.sourcesTracked.map((s, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between"
                  >
                    <div>
                      <span className="text-slate-800 font-medium">{s.name}</span>
                      <span className="text-[10px] text-slate-400 block font-mono truncate max-w-[200px]">
                        {s.url}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {new Date(s.accessedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: VERIFICATION & EVIDENCE */}
      {activeTab === 'verification' && (
        <div className="space-y-6">
          {/* Match Score Meter */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Corporate Identity Verification
                </h3>
                <p className="text-xs text-slate-500">
                  Corroborating declared project entity against public records & domain architecture
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-slate-900">
                  {project.verification.matchConfidenceScore}%
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {project.verification.verdict}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 border border-slate-200 overflow-hidden">
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  project.verification.matchConfidenceScore >= 80
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                    : project.verification.matchConfidenceScore >= 50
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                    : 'bg-gradient-to-r from-red-500 to-amber-500'
                }`}
                style={{ width: `${project.verification.matchConfidenceScore}%` }}
              />
            </div>
          </div>

          {/* Evidence Factors Table */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Corroboration Factors & Evidence
            </h3>
            <div className="space-y-3">
              {project.verification.evidenceFactors.map((factor, i) => {
                const isConfirmed = factor.status === 'confirmed';
                const isProbable = factor.status === 'probable';

                return (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3"
                  >
                    <div className="mt-0.5">
                      {isConfirmed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : isProbable ? (
                        <HelpCircle className="w-4 h-4 text-amber-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900">{factor.factor}</span>
                        <span
                          className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${
                            isConfirmed
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : isProbable
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-slate-200 text-slate-600 border-slate-300'
                          }`}
                        >
                          {factor.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {factor.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Uncertainties & Warnings */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-6 space-y-3 shadow-xs">
            <h3 className="text-sm font-semibold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Known Uncertainties & Outreach Precautions</span>
            </h3>
            <ul className="space-y-2">
              {project.verification.uncertainties.map((u, i) => (
                <li
                  key={i}
                  className="p-3 rounded-lg bg-white border border-amber-200 text-xs text-amber-900 flex items-start gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* TAB 5: OPPORTUNITY SCORECARD */}
      {activeTab === 'scoring' && (
        <div className="space-y-6">
          {/* Score Breakdown Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mb-1">
                Clarity & Specs
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {project.leadIntelligence.scoreBreakdown.clarity}
                <span className="text-xs text-slate-400 font-normal"> / 25</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full"
                  style={{ width: `${(project.leadIntelligence.scoreBreakdown.clarity / 25) * 100}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mb-1">
                Legitimacy & Trust
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {project.leadIntelligence.scoreBreakdown.legitimacy}
                <span className="text-xs text-slate-400 font-normal"> / 25</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: `${(project.leadIntelligence.scoreBreakdown.legitimacy / 25) * 100}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mb-1">
                Budget Quality
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {project.leadIntelligence.scoreBreakdown.budgetQuality}
                <span className="text-xs text-slate-400 font-normal"> / 25</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-amber-500 h-full"
                  style={{ width: `${(project.leadIntelligence.scoreBreakdown.budgetQuality / 25) * 100}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mb-1">
                Scope Feasibility
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {project.leadIntelligence.scoreBreakdown.scopeFeasibility}
                <span className="text-xs text-slate-400 font-normal"> / 25</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-blue-500 h-full"
                  style={{ width: `${(project.leadIntelligence.scoreBreakdown.scopeFeasibility / 25) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Strategic Advice Box */}
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-6 space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-indigo-600" />
              <span>Strategic Freelancer Advice</span>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              {project.leadIntelligence.strategicAdvice}
            </p>
          </div>

          {/* Strengths & Risks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-emerald-200 bg-white p-6 space-y-3 shadow-xs">
              <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Key Project Strengths</span>
              </h3>
              <ul className="space-y-2">
                {project.leadIntelligence.keyStrengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-amber-200 bg-white p-6 space-y-3 shadow-xs">
              <h3 className="text-sm font-semibold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Potential Risks & Watch-Outs</span>
              </h3>
              <ul className="space-y-2">
                {project.leadIntelligence.potentialRisks.map((risk, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Talking Points */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              High-Conversion Talking Points to Win This Client
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.leadIntelligence.talkingPoints.map((tp, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 text-[10px] font-bold">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{tp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: AI OUTREACH GENERATOR */}
      {activeTab === 'outreach' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
            {/* Channel Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => setSelectedChannel('email')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                  selectedChannel === 'email'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Draft</span>
              </button>

              <button
                onClick={() => setSelectedChannel('whatsApp')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                  selectedChannel === 'whatsApp'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Message</span>
              </button>

              <button
                onClick={() => setSelectedChannel('linkedIn')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                  selectedChannel === 'linkedIn'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn InMail & Note</span>
              </button>
            </div>

            {/* Tone Selector & Regenerate */}
            <div className="flex items-center gap-2">
              <select
                value={selectedTone}
                onChange={(e) => setSelectedTone(e.target.value as any)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              >
                <option value="Value-First & Direct">Value-First & Direct</option>
                <option value="Consultative & Strategic">Consultative & Strategic</option>
                <option value="Casual & Warm">Casual & Warm</option>
                <option value="Technical & Detailed">Technical & Detailed</option>
              </select>

              <button
                onClick={handleRegenerateDraft}
                disabled={isRegenerating}
                className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 border border-slate-200 transition flex items-center gap-1.5 disabled:opacity-50"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
                <span>Regenerate</span>
              </button>
            </div>
          </div>

          {/* EMAIL CHANNEL VIEW */}
          {selectedChannel === 'email' && (
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-semibold text-slate-900">
                    Personalized Cold Email Draft
                  </span>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `Subject: ${emailSubject}\n\n${emailHook}\n\n${emailBody}\n\n${emailCta}`,
                      'email-all'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition"
                >
                  {copiedField === 'email-all' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied Entire Email!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Full Email</span>
                    </>
                  )}
                </button>
              </div>

              {/* Subject */}
              <div className="space-y-1">
                <label className="text-xs text-slate-500 font-medium">Subject Line:</label>
                <div className="relative">
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-900 font-semibold focus:outline-none focus:border-indigo-500 focus:bg-white pr-10"
                  />
                  <button
                    onClick={() => copyToClipboard(emailSubject, 'subj')}
                    className="absolute right-2 top-2 text-slate-400 hover:text-slate-700 p-1"
                    title="Copy Subject"
                  >
                    {copiedField === 'subj' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Opening Hook */}
              <div className="space-y-1">
                <label className="text-xs text-slate-500 font-medium">Opening Hook:</label>
                <textarea
                  rows={2}
                  value={emailHook}
                  onChange={(e) => setEmailHook(e.target.value)}
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white font-sans leading-relaxed"
                />
              </div>

              {/* Body */}
              <div className="space-y-1">
                <label className="text-xs text-slate-500 font-medium">Body / Value Proposition:</label>
                <textarea
                  rows={8}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white font-sans leading-relaxed"
                />
              </div>

              {/* Call to Action */}
              <div className="space-y-1">
                <label className="text-xs text-slate-500 font-medium">Call to Action (CTA):</label>
                <input
                  type="text"
                  value={emailCta}
                  onChange={(e) => setEmailCta(e.target.value)}
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>
            </div>
          )}

          {/* WHATSAPP CHANNEL VIEW */}
          {selectedChannel === 'whatsApp' && (
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-semibold text-slate-900">
                    Direct WhatsApp / SMS Client Outreach
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(whatsAppMsg, 'whatsapp')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition"
                >
                  {copiedField === 'whatsapp' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy WhatsApp Message</span>
                    </>
                  )}
                </button>
              </div>

              <textarea
                rows={6}
                value={whatsAppMsg}
                onChange={(e) => setWhatsAppMsg(e.target.value)}
                className="w-full bg-slate-50/70 border border-slate-200 rounded-lg p-3.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white font-sans leading-relaxed"
              />

              <p className="text-[11px] text-slate-500">
                Tip: Only reach out via messaging apps if the client specifically invited WhatsApp contact or publicly published their commercial trading desk number.
              </p>
            </div>
          )}

          {/* LINKEDIN CHANNEL VIEW */}
          {selectedChannel === 'linkedIn' && (
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5 shadow-xs">
              {/* Connection Note */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-slate-900">
                      LinkedIn Connection Request Note
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-500">
                      {linkedInNote.length}/300 chars
                    </span>
                    <button
                      onClick={() => copyToClipboard(linkedInNote, 'ln-note')}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition flex items-center gap-1"
                    >
                      {copiedField === 'ln-note' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>Copy Note</span>
                    </button>
                  </div>
                </div>

                <textarea
                  rows={3}
                  value={linkedInNote}
                  maxLength={300}
                  onChange={(e) => setLinkedInNote(e.target.value)}
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-lg p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white font-sans leading-relaxed"
                />
              </div>

              {/* InMail Pitch */}
              <div className="space-y-2 pt-3 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-900">
                    Full LinkedIn InMail / Message Pitch
                  </span>
                  <button
                    onClick={() => copyToClipboard(linkedInInMail, 'ln-inmail')}
                    className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition flex items-center gap-1"
                  >
                    {copiedField === 'ln-inmail' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>Copy InMail</span>
                  </button>
                </div>

                <textarea
                  rows={8}
                  value={linkedInInMail}
                  onChange={(e) => setLinkedInInMail(e.target.value)}
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-lg p-3.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white font-sans leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* Ethical Disclaimer */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Strict Ethical Safeguard: </span>
              All outreach drafts are designed for user review and personal sending. Automated spam, unsolicited bulk scraping, or bypassing marketplace protections is strictly prohibited.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
