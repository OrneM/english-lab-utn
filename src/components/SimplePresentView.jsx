import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Sparkles, 
  Briefcase, 
  MessageSquare, 
  Clock, 
  Check, 
  XCircle,
  Lightbulb
} from 'lucide-react';
import { THEORY_DATA } from '../data/theoryData';
import { soundManager } from '../utils/soundEffects';

export function SimplePresentView({ onGoToExam }) {
  const data = THEORY_DATA.simplePresent;
  const [activeTab, setActiveTab] = useState('structures'); // 'structures' | 'vocabulary' | 'miniquiz'
  const [openAccordions, setOpenAccordions] = useState({ 0: true, 1: true });
  
  // Estado del mini quiz
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizChecked, setQuizChecked] = useState(false);

  const toggleAccordion = (idx) => {
    soundManager.playClick();
    setOpenAccordions(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleQuizSelect = (qIdx, optIdx) => {
    soundManager.playClick();
    setQuizAnswers(prev => ({
      ...prev,
      [qIdx]: optIdx
    }));
  };

  const handleCheckQuiz = () => {
    let allCorrect = true;
    data.miniQuiz.forEach((q, idx) => {
      if (quizAnswers[idx] !== q.correct) allCorrect = false;
    });

    if (allCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }
    setQuizChecked(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Unidad 1 · Gramática & Vocabulario IT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          {data.title}
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          {data.subtitle}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-center space-x-2 border-b border-slate-800 pb-4">
        {[
          { id: 'structures', label: 'Estructuras Gramaticales', icon: BookOpen },
          { id: 'vocabulary', label: 'Vocabulario IT & Saludos', icon: Briefcase },
          { id: 'miniquiz', label: 'Mini-Quiz de Fijación', icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setActiveTab(tab.id);
              }}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                isActive
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25 ring-2 ring-brand-500/30'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ESTRUCTURAS GRAMATICALES */}
      {activeTab === 'structures' && (
        <div className="space-y-6">
          
          {/* Overview Banner */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-brand-400 font-bold text-sm">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Concepto y Marcadores de Frecuencia</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {data.overview.definition}
            </p>
            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-400 block mb-1.5">Expresiones de tiempo y adverbios comunes:</span>
              <div className="flex flex-wrap gap-1.5">
                {data.overview.timeExpressions.map((exp, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-slate-900 text-cyan-300 border border-slate-800 font-mono">
                    {exp}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Structures Accordions */}
          <div className="space-y-4">
            {data.structures.map((struct, idx) => {
              const isOpen = openAccordions[idx];
              return (
                <div key={idx} className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-md">
                  
                  {/* Accordion Trigger */}
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-5 text-left flex items-center justify-between hover:bg-slate-900/40 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`w-3 h-3 rounded-full ${
                        struct.color === 'emerald' ? 'bg-emerald-400' :
                        struct.color === 'rose' ? 'bg-rose-400' :
                        struct.color === 'indigo' ? 'bg-indigo-400' : 'bg-amber-400'
                      }`} />
                      <h3 className="font-bold text-slate-100 text-base sm:text-lg">
                        {struct.type}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-400 text-xs">
                      <span>{isOpen ? 'Ocultar' : 'Ver detalle'}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Accordion Content */}
                  {isOpen && (
                    <div className="px-5 pb-6 pt-2 space-y-5 border-t border-slate-800/80 animate-fade-in">
                      
                      {/* Formula Box */}
                      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs sm:text-sm text-cyanBrand-300">
                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Estructura Sintáctica:</span>
                        {struct.formula}
                      </div>

                      {/* Rules */}
                      <div className="space-y-2 text-sm text-slate-300">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Reglas Clave:</span>
                        <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                          {struct.rules.map((r, rIdx) => (
                            <li key={rIdx}>{r}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Spelling Rules if present */}
                      {struct.spellingRules && (
                        <div className="space-y-2.5 pt-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                            Reglas de Ortografía para 3ra Persona Singular (He / She / It):
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {struct.spellingRules.map((sp, spIdx) => (
                              <div key={spIdx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                                <span className="font-bold text-slate-200 block">{sp.rule}</span>
                                <div className="text-brand-300 font-mono">{sp.examples.join(' · ')}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Examples */}
                      <div className="space-y-2.5 pt-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                          Ejemplos en Contexto de Programación:
                        </span>
                        <div className="space-y-2">
                          {struct.examples.map((ex, exIdx) => (
                            <div key={exIdx} className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
                              {ex.en && (
                                <p className="font-medium text-slate-100 text-sm">
                                  "{ex.en}"
                                </p>
                              )}
                              {ex.es && (
                                <p className="text-xs text-slate-400">
                                  {ex.es}
                                </p>
                              )}
                              {ex.q && (
                                <div className="space-y-1">
                                  <p className="font-semibold text-slate-200 text-sm">Q: {ex.q}</p>
                                  <div className="flex gap-4 text-xs font-mono">
                                    <span className="text-emerald-400">Aff: {ex.aAff}</span>
                                    <span className="text-rose-400">Neg: {ex.aNeg}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* TAB 2: VOCABULARIO IT & SALUDOS */}
      {activeTab === 'vocabulary' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* IT Jobs Section */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-brand-400" />
              <span>Roles y Profesiones IT (Clase 2)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.vocabularySection.roles.map((role, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1 hover:border-slate-700 transition-colors">
                  <div className="font-bold text-cyanBrand-300 text-sm">{role.role}</div>
                  <div className="text-xs text-slate-400">{role.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Greetings Section */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-cyanBrand-400" />
              <span>Saludos Formales e Informales</span>
            </h3>
            <div className="space-y-2.5">
              {data.vocabularySection.greetings.map((greet, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded ${
                      greet.type.includes('Formal')
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {greet.type}
                    </span>
                    <span className="font-bold text-slate-100 text-sm">"{greet.text}"</span>
                  </div>
                  <span className="text-xs text-slate-400 sm:text-right">{greet.situation}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: MINI QUIZ */}
      {activeTab === 'miniquiz' && (
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Mini-Quiz Rápido de Presente Simple</span>
            </h3>
            <span className="text-xs text-slate-400">3 ejercicios de comprobación</span>
          </div>

          <div className="space-y-5">
            {data.miniQuiz.map((q, qIdx) => {
              const selected = quizAnswers[qIdx];
              const isCorrect = selected === q.correct;

              return (
                <div key={qIdx} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
                  <p className="font-bold text-slate-100 text-sm">
                    {qIdx + 1}. {q.q}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isOptSelected = selected === optIdx;
                      let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                      if (quizChecked) {
                        if (optIdx === q.correct) {
                          btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                        } else if (isOptSelected && !isCorrect) {
                          btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                        }
                      } else if (isOptSelected) {
                        btnStyle = 'bg-brand-600/30 border-brand-500 text-white font-bold ring-2 ring-brand-500/30';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={quizChecked}
                          onClick={() => handleQuizSelect(qIdx, optIdx)}
                          className={`p-2.5 rounded-lg text-xs border text-left transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizChecked && (
                    <div className={`text-xs p-2.5 rounded-lg border ${
                      isCorrect ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                    }`}>
                      <strong>{isCorrect ? '¡Correcto!' : 'Atención:'}</strong> {q.exp}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            {!quizChecked ? (
              <button
                onClick={handleCheckQuiz}
                disabled={Object.keys(quizAnswers).length < data.miniQuiz.length}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  Object.keys(quizAnswers).length >= data.miniQuiz.length
                    ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Comprobar Respuestas
              </button>
            ) : (
              <button
                onClick={() => {
                  soundManager.playClick();
                  setQuizAnswers({});
                  setQuizChecked(false);
                }}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700"
              >
                Reiniciar Mini-Quiz
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
