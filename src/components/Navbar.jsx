import React, { useState } from 'react';
import { 
  GraduationCap, 
  Clock, 
  BookOpen, 
  Sparkles, 
  History, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Menu, 
  X,
  Layers,
  Code
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export function Navbar({ activeSection, onNavigate, isDark, onToggleTheme, soundEnabled, onToggleSound, hasAiKey, onOpenGeminiModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'exam', label: 'Práctica de Examen', icon: GraduationCap, badge: 'Simulador' },
    { id: 'present-simple', label: 'Presente Simple', icon: BookOpen, badge: 'Unidad 1' },
    { id: 'present-continuous', label: 'Presente Continuo', icon: Sparkles, badge: 'Unidad 1' },
    { id: 'past-simple', label: 'Pasado Simple', icon: History, badge: 'Unidad 2' },
  ];

  const handleNavClick = (id) => {
    soundManager.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavClick('exam')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-cyanBrand-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform duration-200">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-brand-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                  EnglishLab
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">
                  UTN TUP
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Inglés Técnico I</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-200/80 dark:bg-slate-900/60 p-1.5 rounded-2xl border border-slate-300 dark:border-slate-800/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyanBrand-400 animate-pulse"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center space-x-2">
            {/* Gemini AI Settings Button */}
            <button
              id="btn-gemini-settings"
              onClick={() => {
                soundManager.playClick();
                if (onOpenGeminiModal) onOpenGeminiModal();
              }}
              title={hasAiKey ? 'Google Gemini Activo (Configurar)' : 'Activar Google Gemini AI Gratuito'}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                hasAiKey
                  ? 'bg-gradient-to-r from-cyan-500/20 to-brand-500/20 border-cyan-400/50 text-cyan-700 dark:text-cyan-300 hover:border-cyan-400 shadow-sm'
                  : 'bg-slate-200/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-300'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${hasAiKey ? 'text-cyan-500 dark:text-cyan-400 animate-pulse' : 'text-amber-500 dark:text-amber-400'}`} />
              <span className="hidden sm:inline">{hasAiKey ? 'Gemini IA' : 'Configurar IA'}</span>
            </button>

            {/* Sound Toggle */}
            <button
              id="btn-toggle-sound"
              onClick={onToggleSound}
              title={soundEnabled ? 'Silenciar efectos' : 'Activar sonido'}
              className={`p-2 rounded-xl text-xs font-medium border transition-colors ${
                soundEnabled
                  ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-500/30 hover:bg-brand-500/20'
                  : 'bg-slate-200/80 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Dark / Light Toggle */}
            <button
              id="btn-toggle-theme"
              onClick={onToggleTheme}
              title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="p-2 rounded-xl bg-slate-200/80 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700/50 hover:bg-slate-300 dark:hover:bg-slate-800 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Mobile menu button */}
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-200/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700/50"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 px-4 pt-3 pb-5 space-y-1.5 shadow-2xl animate-fade-in">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-brand-700 text-cyan-200' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400'
                }`}>
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
