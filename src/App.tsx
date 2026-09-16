import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { NewAnalysisView } from './components/NewAnalysisView';
import { AnalysisResultsView } from './components/AnalysisResultsView';
import { HistoryLeadsView } from './components/HistoryLeadsView';
import { UsageCreditsView } from './components/UsageCreditsView';
import { SettingsView } from './components/SettingsView';
import { AuthModal } from './components/AuthModal';
import { SAMPLE_PROJECTS } from './data/sampleProjects';
import { AppScreen, ProjectAnalysis, UserProfile } from './types';
import { Check, AlertCircle } from 'lucide-react';

const STORAGE_KEY_PROJECTS = 'freelancer_ai_projects_v1';
const STORAGE_KEY_USER = 'freelancer_ai_user_v1';

const DEFAULT_USER: UserProfile = {
  id: 'usr_freelance_101',
  name: 'Alex Rivera',
  email: 'alex.rivera@solutions.dev',
  role: 'Senior B2B Solutions Architect & Consultant',
  tier: 'Freelancer Pro',
  creditsRemaining: 48,
  creditsTotal: 50,
  niche: 'B2B Enterprise Web Portals, Commodities & FinTech MVPs',
  portfolioUrl: 'https://alexrivera.dev',
};

export function App() {
  // Load initial projects from localStorage or default to SAMPLE_PROJECTS
  const [projects, setProjects] = useState<ProjectAnalysis[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse stored projects:', e);
    }
    return SAMPLE_PROJECTS;
  });

  // User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse stored user:', e);
    }
    return DEFAULT_USER;
  });

  const [currentScreen, setCurrentScreen] = useState<AppScreen>('dashboard');
  const [activeProject, setActiveProject] = useState<ProjectAnalysis | null>(() => projects[0] || null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to persist projects:', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to persist user:', e);
    }
  }, [user]);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectProject = (project: ProjectAnalysis) => {
    setActiveProject(project);
    setCurrentScreen('results');
  };

  const handleToggleSave = (projectId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const updated = !p.isSaved;
          showToast(updated ? 'Lead saved to target list!' : 'Lead removed from saved targets.');
          return { ...p, isSaved: updated };
        }
        return p;
      })
    );
    if (activeProject && activeProject.id === projectId) {
      setActiveProject((prev) => (prev ? { ...prev, isSaved: !prev.isSaved } : null));
    }
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    showToast('Project dossier removed.');
    if (activeProject?.id === projectId) {
      setActiveProject(projects.find((p) => p.id !== projectId) || null);
    }
  };

  const handleClearHistory = () => {
    setProjects(SAMPLE_PROJECTS);
    setActiveProject(SAMPLE_PROJECTS[0]);
    showToast('Analysis history reset to benchmark samples.');
  };

  const handleLoadSample = (sampleId: string) => {
    const sample = SAMPLE_PROJECTS.find((p) => p.id === sampleId) || projects.find((p) => p.id === sampleId);
    if (sample) {
      setActiveProject(sample);
      setCurrentScreen('results');
      showToast(`Loaded benchmark dossier: ${sample.title}`);
    }
  };

  const handleRunAnalysis = async (payload: {
    rawDescription: string;
    sourceMarketplace: string;
    optionalUrls: string[];
    attachedDocuments: Array<{ name: string; size: number }>;
  }) => {
    setIsLoading(true);
    setAnalysisStep(0);

    // Simulated progress increments for visual feedback during model inference
    const stepTimer1 = setTimeout(() => setAnalysisStep(1), 700);
    const stepTimer2 = setTimeout(() => setAnalysisStep(2), 1600);
    const stepTimer3 = setTimeout(() => setAnalysisStep(3), 2600);
    const stepTimer4 = setTimeout(() => setAnalysisStep(4), 3800);
    const stepTimer5 = setTimeout(() => setAnalysisStep(5), 5000);

    try {
      const response = await fetch('/api/freelancer/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Server error occurred during analysis');
      }

      const analyzedProject: ProjectAnalysis = await response.json();

      // Deduct 1 credit
      setUser((prev) => ({
        ...prev,
        creditsRemaining: Math.max(0, prev.creditsRemaining - 1),
      }));

      // Add to beginning of projects
      setProjects((prev) => [analyzedProject, ...prev]);
      setActiveProject(analyzedProject);
      setCurrentScreen('results');
      showToast('Project intelligence dossier ready!');
    } catch (err: any) {
      console.error('Analysis error:', err);
      throw err;
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      clearTimeout(stepTimer4);
      clearTimeout(stepTimer5);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-900">
      {/* Navigation Bar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <AnimatePresence mode="wait">
          {currentScreen === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <DashboardView
                projects={projects}
                user={user}
                onSelectProject={handleSelectProject}
                onNewAnalysis={() => setCurrentScreen('new-analysis')}
                onLoadSample={handleLoadSample}
                onToggleSave={handleToggleSave}
              />
            </motion.div>
          )}

          {currentScreen === 'new-analysis' && (
            <motion.div
              key="new-analysis"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <NewAnalysisView
                onAnalyze={handleRunAnalysis}
                isLoading={isLoading}
                currentStep={analysisStep}
              />
            </motion.div>
          )}

          {currentScreen === 'results' && activeProject && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <AnalysisResultsView
                project={activeProject}
                onToggleSave={handleToggleSave}
                onNewAnalysis={() => setCurrentScreen('new-analysis')}
              />
            </motion.div>
          )}

          {currentScreen === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <HistoryLeadsView
                projects={projects}
                onSelectProject={handleSelectProject}
                onToggleSave={handleToggleSave}
                onDeleteProject={handleDeleteProject}
                onNewAnalysis={() => setCurrentScreen('new-analysis')}
              />
            </motion.div>
          )}

          {currentScreen === 'credits' && (
            <motion.div
              key="credits"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <UsageCreditsView user={user} />
            </motion.div>
          )}

          {currentScreen === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <SettingsView
                user={user}
                onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
                onClearHistory={handleClearHistory}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-xl text-xs font-medium"
          >
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth / Profile Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={user}
        onSwitchUser={(newUser) => {
          setUser(newUser);
          showToast(`Switched account to ${newUser.name}`);
        }}
      />
    </div>
  );
}

export default App;
