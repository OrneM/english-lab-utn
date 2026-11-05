import React, { useState, useEffect, useRef } from 'react';
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
  Code,
  ChevronDown,
  ChevronRight,
  Zap,
  Target
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { UNIT3_CLASSES } from '../data/unit3TheoryData';

export function Navbar({ 
  activeSection, 
  onNavigate, 
  onStartExamWithConfig, 
  isDark, 
  onToggleTheme, 
  soundEnabled, 
  onToggleSound, 
  hasAiKey, 
  onOpenGeminiModal 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(true);
  const dropdownRef = useRef(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'exam', label: 'Simulador', icon: GraduationCap, badge: 'Exámenes' },
    { id: 'unit3', label: '2do Parcial (U3)', icon: Sparkles, badge: 'Clases 8-14', isNew: true, isDropdown: true },
    { id: 'present-simple', label: 'Presente Simple', icon: BookOpen, badge: 'Unidad 1' },
    { id: 'present-continuous', label: 'Presente Continuo', icon: Layers, badge: 'Unidad 1' },
    { id: 'past-simple', label: 'Pasado Simple', icon: History, badge: 'Unidad 2' },
  ];

  const handleNavClick = (id) => {
    soundManager.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleClassExamClick = (classId) => {
    soundManager.playClick();
    if (onStartExamWithConfig) {
      onStartExamWithConfig({ parcial: '2', targetClass: classId });
    } else {
      onNavigate('exam');
    }
    setDropdownOpen(false);
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

              // Renderizado especial con Dropdown para "2do Parcial (U3)"
              if (item.isDropdown) {
                return (
                  <div key={item.id} className="relative" ref={dropdownRef}>
                    <button
                      id={`nav-${item.id}`}
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setDropdownOpen(!dropdownOpen);
                      }}
                      className={`relative flex items-center space-x-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        isActive || dropdownOpen
                          ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30 ring-2 ring-brand-400/30'
                          : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive || dropdownOpen ? 'text-white' : 'text-cyan-500 dark:text-cyan-400 animate-pulse'}`} />
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-white' : 'text-slate-400'}`} />
                      {!isActive && (
                        <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-400/40">
                          Simulacros
                        </span>
                      )}
                    </button>

                    {/* Popover Dropdown Desktop */}
                    {dropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-96 rounded-2xl bg-white/95 dark:bg-slate-950/95 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl p-3 z-50 animate-scale-up space-y-2.5">
                        
                        {/* Header informativo */}
                        <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-800/80">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black uppercase tracking-wider text-brand-600 dark:text-cyanBrand-400 flex items-center space-x-1.5">
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>2do Parcial · Unidad 3</span>
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300">
                              Clases 8 a 14
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                            Elige estudiar la teoría o poner a prueba tus conocimientos con el simulacro de cada clase.
                          </p>
                        </div>

                        {/* Opción 1: Ir a la teoría */}
                        <button
                          onClick={() => handleNavClick('unit3')}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 transition-colors flex items-center justify-between group"
                        >
                          <div className="flex items-center space-x-2.5">
                            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:scale-105 transition-transform">
                              <BookOpen className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-bold text-xs text-slate-900 dark:text-slate-100">
                                📘 Ver Contenidos y Teoría
                              </div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                                Vocabularios técnicos, audios de pronunciación y lecturas
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                        </button>

                        {/* Opción 2: Simulacro Completo */}
                        <button
                          onClick={() => handleClassExamClick('all')}
                          className="w-full text-left p-2.5 rounded-xl bg-gradient-to-r from-brand-600/10 via-indigo-600/10 to-cyan-500/10 hover:from-brand-600/20 hover:to-cyan-500/20 border border-brand-500/30 transition-all flex items-center justify-between group"
                        >
                          <div className="flex items-center space-x-2.5">
                            <div className="p-2 rounded-lg bg-brand-600 text-white shadow-sm group-hover:scale-105 transition-transform">
                              <Zap className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-extrabold text-xs text-brand-900 dark:text-cyanBrand-300 flex items-center space-x-1.5">
                                <span>⚡ Simulacro Completo 2do Parcial</span>
                              </div>
                              <div className="text-[10px] text-slate-600 dark:text-slate-400">
                                105 preguntas combinadas de Clases 8 a 14
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-brand-600 text-white">
                            Integral
                          </span>
                        </button>

                        {/* Sección: Simulacros por clase */}
                        <div className="pt-1">
                          <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 pb-1.5 flex items-center space-x-1">
                            <Target className="w-3 h-3 text-cyan-500" />
                            <span>Simulacros Oficiales por Clase:</span>
                          </div>

                          <div className="grid grid-cols-2 gap-1.5 max-h-64 overflow-y-auto pr-1">
                            {UNIT3_CLASSES.map((c) => (
                              <button
                                key={c.id}
                                onClick={() => handleClassExamClick(c.id)}
                                className="text-left p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-brand-50 dark:hover:bg-brand-950/40 border border-slate-200 dark:border-slate-800 hover:border-brand-400 transition-all group flex flex-col justify-between"
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center space-x-1">
                                    <span>{c.emoji}</span>
                                    <span>{c.label}</span>
                                  </span>
                                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                                    {c.questionCount}q
                                  </span>
                                </div>
                                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-1 group-hover:text-slate-700 dark:group-hover:text-slate-300">
                                  {c.shortTitle}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                );
              }

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
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 px-4 pt-3 pb-5 space-y-2 shadow-2xl animate-fade-in max-h-[85vh] overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            if (item.isDropdown) {
              return (
                <div key={item.id} className="rounded-xl border border-brand-500/30 overflow-hidden bg-brand-50/30 dark:bg-brand-950/20">
                  <button
                    onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold text-slate-900 dark:text-slate-100"
                  >
                    <div className="flex items-center space-x-3">
                      <Sparkles className="w-5 h-5 text-cyan-500" />
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-400/40">
                        Simulacros & Teoría
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubmenuOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {mobileSubmenuOpen && (
                    <div className="px-3 pb-3 pt-1 space-y-1.5 border-t border-brand-500/20 bg-white/80 dark:bg-slate-900/80">
                      <button
                        onClick={() => handleNavClick('unit3')}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                      >
                        <span className="flex items-center space-x-2">
                          <BookOpen className="w-4 h-4 text-cyan-500" />
                          <span>📘 Ver Teoría y Contenidos (Clases 8 a 14)</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>

                      <button
                        onClick={() => handleClassExamClick('all')}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-extrabold bg-brand-600 text-white shadow-sm"
                      >
                        <span className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-cyan-300" />
                          <span>⚡ Simulacro Completo 2do Parcial (105 preg)</span>
                        </span>
                        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/20">All</span>
                      </button>

                      <div className="pt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                        Simulacros por Clase:
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                        {UNIT3_CLASSES.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => handleClassExamClick(c.id)}
                            className="p-2 rounded-lg text-left bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-800 dark:text-slate-200 flex flex-col justify-between"
                          >
                            <div className="flex items-center justify-between w-full">
                              <span>{c.emoji} {c.label}</span>
                              <span className="text-[9px] font-mono text-cyan-600 dark:text-cyan-400 font-bold">{c.questionCount}q</span>
                            </div>
                            <span className="text-[10px] text-slate-500 truncate mt-0.5">{c.shortTitle}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

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
