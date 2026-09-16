import React, { useState } from 'react';
import {
  Building2,
  Globe,
  Upload,
  FileText,
  X,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  RotateCw,
  Cpu,
} from 'lucide-react';
import { ProjectAnalysis } from '../types';

interface NewAnalysisViewProps {
  onAnalyze: (payload: {
    rawDescription: string;
    sourceMarketplace: string;
    optionalUrls: string[];
    attachedDocuments: Array<{ name: string; size: number }>;
  }) => Promise<void>;
  isLoading: boolean;
  currentStep: number;
}

const PRESET_LIXBOR = `A company called LIXBOR AURON LLP is looking for a modern premium website for an international trading business dealing in Polymers, Chemicals and Fertilizers.

Requirements include:
- Responsive, world-class corporate design suited for global B2B buyers
- Dedicated product catalog pages for Polymers, Industrial Chemicals, and Agricultural Fertilizers
- Rich media display (high-res images, product demonstration videos, and interactive spec sheets)
- Easy content management / admin access for staff to update commodity listings
- High-conversion international inquiry forms & lead capture with instant email routing
- Exceptional loading speed and core web vitals
- Foundational B2B SEO (meta tags, structured data for products, sitemap)
- Enterprise security (SSL, form spam protection, secure authentication)
- Custom domain setup & cloud hosting connection

Timeline: 4-6 weeks
Budget: $3,500 - $5,000 USD (Milestone-based)
Target audience: Commercial import/export partners in Europe, Middle East, and Asia.`;

const PRESET_NOVAPAY = `NovaPay Labs (Delaware C-Corp, Seed Stage) is seeking a Senior React/TypeScript engineer to build the frontend MVP for our cross-border FX settlements dashboard.

Scope:
- Multi-currency wallet balance overview (USD, EUR, GBP, SGD)
- Transaction ledger with instant search, filtering, and export to CSV/PDF
- Interactive FX rate converter with live simulated WebSocket stream
- KYC / business verification document upload flow with drag-and-drop
- Dark / Light mode UI with WCAG AA compliance
- Clean REST API integration with our backend team (Swagger specs ready)

Budget: $6,000 - $8,000 USD
Duration: 6-8 weeks`;

const PRESET_SHOPIFY = `Need someone to fix our Shopify store speed immediately. PageSpeed is 22 on mobile, want it above 85. Also checkout drops off too high. Fix app bloat and compress images.

Urgent job. Start today.`;

export const NewAnalysisView: React.FC<NewAnalysisViewProps> = ({
  onAnalyze,
  isLoading,
  currentStep,
}) => {
  const [rawDescription, setRawDescription] = useState<string>(PRESET_LIXBOR);
  const [sourceMarketplace, setSourceMarketplace] = useState<string>('Direct / Upwork Enterprise');
  const [urlInput, setUrlInput] = useState<string>('https://lixborauron.com');
  const [urls, setUrls] = useState<string[]>(['https://lixborauron.com']);
  const [documents, setDocuments] = useState<Array<{ name: string; size: number }>>([
    { name: 'Lixbor_Auron_Commodities_Spec.pdf', size: 1840000 },
  ]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    let formatted = urlInput.trim();
    if (!/^https?:\/\//i.test(formatted)) {
      formatted = `https://${formatted}`;
    }
    if (!urls.includes(formatted)) {
      setUrls([...urls, formatted]);
    }
    setUrlInput('');
  };

  const handleRemoveUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newDocs: Array<{ name: string; size: number }> = [];
    Array.from(e.target.files).forEach((file) => {
      newDocs.push({ name: file.name, size: file.size });
    });
    setDocuments([...documents, ...newDocs]);
  };

  const handleRemoveDoc = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawDescription.trim() || rawDescription.trim().length < 15) {
      setErrorMessage('Please provide a project description of at least 15 characters to analyze.');
      return;
    }
    setErrorMessage(null);
    try {
      await onAnalyze({
        rawDescription: rawDescription.trim(),
        sourceMarketplace,
        optionalUrls: urls,
        attachedDocuments: documents,
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Analysis failed. Please try again.');
    }
  };

  const STEPS = [
    { title: 'Receiving Input', desc: 'Sanitizing text & validating parameters' },
    { title: 'AI Entity Extraction', desc: 'Extracting company, tech stack, requirements & budget' },
    { title: 'Public Business Research', desc: 'Corroborating registries, domains & public presences' },
    { title: 'Identity Verification', desc: 'Calculating match confidence & evidence factors' },
    { title: 'Opportunity Scoring', desc: 'Evaluating clarity, legitimacy, budget & feasibility' },
    { title: 'Generating Outreach Drafts', desc: 'Tailoring Email, WhatsApp & LinkedIn messages' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Title Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
          <span>Project Analysis Engine</span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900 font-display">
          New Project Intelligence Analysis
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm md:text-base mt-1">
          Paste any project posting to automatically discover legitimate public business records, calculate lead potential, and generate user-controlled outreach drafts.
        </p>
      </div>

      {/* Preset Pickers */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Quick-Load Benchmarks (Prompt Approved)
          </span>
          <span className="text-[11px] text-slate-400">Click to autofill</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setRawDescription(PRESET_LIXBOR);
              setSourceMarketplace('Direct / Upwork Enterprise');
              setUrls(['https://lixborauron.com']);
              setDocuments([{ name: 'Lixbor_Auron_Commodities_Spec.pdf', size: 1840000 }]);
            }}
            className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-medium transition flex items-center gap-1.5 shadow-xs"
          >
            <Building2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Test Case: LIXBOR AURON LLP</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRawDescription(PRESET_NOVAPAY);
              setSourceMarketplace('Upwork');
              setUrls(['https://novapaylabs.io']);
              setDocuments([{ name: 'NovaPay_API_Swagger_v1.json', size: 450000 }]);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium transition flex items-center gap-1.5 shadow-xs"
          >
            <span>FinTech MVP: NovaPay Labs</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRawDescription(PRESET_SHOPIFY);
              setSourceMarketplace('Fiverr');
              setUrls([]);
              setDocuments([]);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium transition flex items-center gap-1.5 shadow-xs"
          >
            <span>Uncertain / Anonymous E-Commerce</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRawDescription('');
              setUrls([]);
              setDocuments([]);
            }}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 text-xs font-medium transition"
          >
            Clear Form
          </button>
        </div>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Text Area */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-2">
              <span>Project Description</span>
            </label>
            <span className="text-[11px] text-slate-400 font-mono">
              {rawDescription.length} characters
            </span>
          </div>

          <textarea
            id="input-project-description"
            rows={10}
            value={rawDescription}
            onChange={(e) => setRawDescription(e.target.value)}
            disabled={isLoading}
            placeholder="Paste the full job posting from Upwork, Freelancer, Fiverr, LinkedIn, or a client email here...
Example: 'A company called LIXBOR AURON LLP is looking for a modern premium website for an international trading business dealing in Polymers, Chemicals and Fertilizers...'"
            className="w-full rounded-lg bg-slate-50/70 border border-slate-200 p-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:bg-white leading-relaxed font-sans transition"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-500 font-medium">Source Marketplace:</label>
              <select
                value={sourceMarketplace}
                onChange={(e) => setSourceMarketplace(e.target.value)}
                disabled={isLoading}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              >
                <option value="Direct / Upwork Enterprise">Upwork / Upwork Enterprise</option>
                <option value="Freelancer.com">Freelancer.com</option>
                <option value="Fiverr Pro">Fiverr Pro</option>
                <option value="Direct Client / Email">Direct Client / Inbound Email</option>
                <option value="LinkedIn Job / Post">LinkedIn Job / Post</option>
                <option value="Other Marketplace">Other Marketplace</option>
              </select>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Input is processed securely on backend server</span>
            </div>
          </div>
        </div>

        {/* Optional URLs & Documentation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* URL Input Box */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
            <label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <span>Optional Reference URLs</span>
            </label>
            <p className="text-[11px] text-slate-500">
              Provide client website, job link, or design references if available:
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddUrl();
                  }
                }}
                disabled={isLoading}
                placeholder="https://company.com"
                className="flex-1 rounded-lg bg-slate-50/70 border border-slate-200 px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
              <button
                type="button"
                onClick={handleAddUrl}
                disabled={isLoading}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 font-medium transition"
              >
                Add
              </button>
            </div>

            {urls.length > 0 && (
              <div className="space-y-1.5 pt-1">
                {urls.map((url, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs bg-slate-50 px-2.5 py-1 rounded border border-slate-200 text-slate-700"
                  >
                    <span className="truncate max-w-[240px] font-mono text-[11px]">{url}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveUrl(i)}
                      className="text-slate-400 hover:text-red-500 transition"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Document Upload Box */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
            <label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5 text-indigo-600" />
              <span>Attached Documents (Optional)</span>
            </label>
            <p className="text-[11px] text-slate-500">
              Attach project briefs, Swagger specs, or RFQs (PDF, DOCX, JSON, TXT):
            </p>

            <label className="border border-dashed border-slate-300 hover:border-indigo-500 rounded-lg p-3 block text-center cursor-pointer bg-slate-50/50 hover:bg-indigo-50/20 transition group">
              <input
                type="file"
                multiple
                accept=".pdf,.docx,.txt,.json,.csv"
                onChange={handleFileUpload}
                disabled={isLoading}
                className="hidden"
              />
              <Upload className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 mx-auto mb-1 transition" />
              <span className="text-xs text-slate-700 font-medium">Click to upload documents</span>
              <span className="text-[10px] text-slate-400 block">Up to 25MB total</span>
            </label>

            {documents.length > 0 && (
              <div className="space-y-1.5 pt-1">
                {documents.map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs bg-slate-50 px-2.5 py-1 rounded border border-slate-200 text-slate-700"
                  >
                    <div className="flex items-center gap-1.5 truncate max-w-[220px]">
                      <FileText className="w-3 h-3 text-indigo-600 shrink-0" />
                      <span className="truncate text-[11px]">{doc.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveDoc(i)}
                      className="text-slate-400 hover:text-red-500 transition"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="text-xs text-red-800">
              <p className="font-semibold">Analysis Notice</p>
              <p className="mt-0.5 text-red-700">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            id="btn-run-analysis"
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-xs transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin text-white" />
                <span>Running Lead Intelligence Engine...</span>
              </>
            ) : (
              <>
                <span>Analyze Project & Extract Intelligence</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Loading Progress Modal / Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mx-auto">
                <Cpu className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Generating Project Intelligence Dossier
              </h3>
              <p className="text-xs text-slate-500">
                Executing multi-step entity extraction, public corroboration, scoring, and draft synthesis
              </p>
            </div>

            {/* Stepper */}
            <div className="space-y-3">
              {STEPS.map((step, idx) => {
                const isCurrent = currentStep === idx;
                const isPassed = currentStep > idx;

                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 p-2.5 rounded-xl border transition ${
                      isCurrent
                        ? 'border-indigo-400 bg-indigo-50/60'
                        : isPassed
                        ? 'border-slate-200 bg-slate-50'
                        : 'border-slate-100 bg-slate-50/30 opacity-40'
                    }`}
                  >
                    <div className="mt-0.5">
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : isCurrent ? (
                        <RotateCw className="w-4 h-4 text-indigo-600 animate-spin" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300 text-[10px] font-mono flex items-center justify-center text-slate-400">
                          {idx + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold ${isCurrent ? 'text-indigo-800' : isPassed ? 'text-slate-900' : 'text-slate-400'}`}>
                          {step.title}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-mono text-indigo-600 font-semibold uppercase tracking-wider">
                            Processing...
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500 text-center">
              Adhering to ethical public data matching standards.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
