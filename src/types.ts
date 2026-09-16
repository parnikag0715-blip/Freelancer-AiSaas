export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
  tier: 'Free Trial' | 'Freelancer Pro' | 'Agency Studio';
  creditsRemaining: number;
  creditsTotal: number;
  niche: string;
  portfolioUrl?: string;
}

export type OpportunityScoreRecommendation =
  | 'High Potential'
  | 'Medium Potential'
  | 'Low Information'
  | 'Proceed With Caution';

export interface ScoreBreakdown {
  clarity: number; // Max 25
  legitimacy: number; // Max 25
  budgetQuality: number; // Max 25
  scopeFeasibility: number; // Max 25
}

export interface ExtractedEntities {
  companyName: string | null;
  clientNames: string[];
  websites: string[];
  emails: string[];
  phones: string[];
  locations: string[];
  industries: string[];
  productsServices: string[];
  budget: {
    raw: string | null;
    type: 'fixed' | 'hourly' | 'unspecified';
    estimatedAmount?: string;
    currency?: string;
  };
  timeline: string | null;
  urgency: 'high' | 'medium' | 'low' | 'flexible';
  keyRequirements: string[];
  techStack: string[];
  deliverables: string[];
}

export interface ProjectUnderstanding {
  executiveSummary: string;
  coreProblem: string;
  clientGoals: string[];
  idealFreelancerProfile: string;
  projectComplexity: 'Simple' | 'Moderate' | 'High' | 'Enterprise';
}

export interface PublicSourceItem {
  platform: 'Official Website' | 'LinkedIn' | 'Corporate Registry' | 'Twitter/X' | 'GitHub' | 'Public Directory' | 'Google Business';
  title: string;
  url: string;
  snippet: string;
  verified: boolean;
  sourceType: 'domain' | 'registry' | 'search' | 'social';
}

export interface PublicContactPoint {
  type: 'Official Email' | 'Public Phone' | 'Contact Form' | 'Office Address';
  value: string;
  source: string;
  confidence: 'verified' | 'probable' | 'unconfirmed';
}

export interface KeyPersonnel {
  name: string;
  role: string;
  profileUrl?: string;
  source: string;
}

export interface BusinessResearch {
  companyOverview: string;
  officialWebsite?: {
    url: string;
    verified: boolean;
    title?: string;
    description?: string;
  };
  publicPresence: PublicSourceItem[];
  publicContactPoints: PublicContactPoint[];
  keyPersonnel: KeyPersonnel[];
  sourcesTracked: Array<{
    name: string;
    url: string;
    type: string;
    accessedAt: string;
  }>;
}

export interface EvidenceFactor {
  factor: string;
  status: 'confirmed' | 'probable' | 'unverified' | 'mismatch';
  explanation: string;
}

export interface VerificationResult {
  matchConfidenceScore: number; // 0 to 100
  verdict: 'High Confidence Match' | 'Probable Match' | 'Uncertain / Ambiguous' | 'No Legitimate Match Found';
  evidenceFactors: EvidenceFactor[];
  uncertainties: string[];
}

export interface LeadIntelligence {
  opportunityScore: number; // 0 to 100
  recommendation: OpportunityScoreRecommendation;
  scoreBreakdown: ScoreBreakdown;
  keyStrengths: string[];
  potentialRisks: string[];
  talkingPoints: string[];
  strategicAdvice: string;
}

export interface OutreachDrafts {
  email: {
    subject: string;
    openingHook: string;
    body: string;
    callToAction: string;
  };
  whatsApp: {
    message: string;
  };
  linkedIn: {
    connectionNote: string;
    inMail: string;
  };
}

export interface ProjectAnalysis {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  rawDescription: string;
  sourceMarketplace?: string;
  optionalUrls?: string[];
  attachedDocuments?: Array<{ name: string; size: number }>;
  isSaved: boolean;
  status: 'idle' | 'analyzing' | 'completed' | 'failed';
  extractedEntities: ExtractedEntities;
  projectUnderstanding: ProjectUnderstanding;
  businessResearch: BusinessResearch;
  verification: VerificationResult;
  leadIntelligence: LeadIntelligence;
  outreachDrafts: OutreachDrafts;
  notes?: string;
}

export type ActiveTab =
  | 'overview'
  | 'entities'
  | 'research'
  | 'verification'
  | 'scoring'
  | 'outreach';

export type AppScreen =
  | 'dashboard'
  | 'new-analysis'
  | 'results'
  | 'history'
  | 'credits'
  | 'settings';

export interface AnalysisReport {
  dataset_name?: string;
  question?: string;
  title: string;
  executive_summary?: string;
  generated_at?: string;
  [key: string]: any;
}
