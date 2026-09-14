import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ExamSimulator } from './components/ExamSimulator';
import { SimplePresentView } from './components/SimplePresentView';
import { PresentContinuousView } from './components/PresentContinuousView';
import { PastSimpleView } from './components/PastSimpleView';
import { ArthurChatBot } from './components/ArthurChatBot';
import { GeminiApiKeyModal } from './components/GeminiApiKeyModal';
import { soundManager } from './utils/soundEffects';
import { hasGeminiApiKey } from './utils/geminiService';
import { GraduationCap, Heart, Code, Sparkles, BookOpen, History, ExternalLink } from 'lucide-react';

export function App() {
  const [activeSection, setActiveSection] = useState('exam');
  const [isDark, setIsDark] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isGeminiModalOpen, setIsGeminiModalOpen] = useState(false);
  const [hasAiKey, setHasAiKey] = useState(() => hasGeminiApiKey());

  // Sincronizar tema con elemento HTML
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    soundManager.playClick();
    setIsDark(!isDark);
  };

  const handleToggleSound = () => {
    const newState = soundManager.toggle();
    setSoundEnabled(newState);
    if (newState) soundManager.playClick();
  };

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">

      {/* Fixed Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        hasAiKey={hasAiKey}
        onOpenGeminiModal={() => setIsGeminiModalOpen(true)}
      />

      {/* Main Content Area (padding-top for fixed navbar) */}
      <main className="flex-1 pt-20 pb-16">
        {activeSection === 'exam' && (
          <ExamSimulator 
            onNavigateToTheory={handleNavigate}
            onOpenGeminiModal={() => setIsGeminiModalOpen(true)}
          />
        )}

        {activeSection === 'present-simple' && (
          <SimplePresentView onGoToExam={() => handleNavigate('exam')} />
        )}

        {activeSection === 'present-continuous' && (
          <PresentContinuousView onGoToExam={() => handleNavigate('exam')} />
        )}

        {activeSection === 'past-simple' && (
          <PastSimpleView onGoToExam={() => handleNavigate('exam')} />
        )}
      </main>

      {/* Arthur AI Interactive Tutor Bot */}
      <ArthurChatBot onOpenGeminiModal={() => setIsGeminiModalOpen(true)} />

      {/* Modal de Configuración de Google Gemini AI */}
      <GeminiApiKeyModal
        isOpen={isGeminiModalOpen}
        onClose={() => setIsGeminiModalOpen(false)}
        onKeyUpdated={(active) => setHasAiKey(active)}
      />

      {/* Modern Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-900 bg-white/80 dark:bg-slate-950/80 py-8 text-xs text-slate-600 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-md bg-brand-600 flex items-center justify-center text-white">
              <Code className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200">EnglishLab TUP</span>
            <span>· Material Oficial de Inglés Técnico I</span>
          </div>

          <div className="flex items-center space-x-6 text-slate-600 dark:text-slate-400">
            <button
              onClick={() => handleNavigate('exam')}
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              Simulador
            </button>
            <button
              onClick={() => handleNavigate('present-simple')}
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              Presente Simple
            </button>
            <button
              onClick={() => handleNavigate('present-continuous')}
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              Presente Continuo
            </button>
            <button
              onClick={() => handleNavigate('past-simple')}
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              Pasado Simple
            </button>
          </div>

          <div className="text-slate-500 text-center sm:text-right">
            © 2026 · EnglishLab UTN. Web by Ornela Mansilla.
          </div>

        </div>
      </footer>

    </div>
  );
}

