import React, { useState, useMemo } from 'react';
import { 
  History, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  BookOpen, 
  Lightbulb, 
  Building2, 
  Check, 
  CheckCircle2, 
  RotateCw, 
  Zap,
  Volume2,
  X,
  Filter
} from 'lucide-react';
import { THEORY_DATA } from '../data/theoryData';
import { IRREGULAR_VERBS } from '../data/irregularVerbs';
import { soundManager } from '../utils/soundEffects';

function getRandomQuestions(pool, count = 5) {
  if (!pool || pool.length === 0) return [];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function PastSimpleView({ onGoToExam }) {
  const data = THEORY_DATA.pastSimple;
  const [activeTab, setActiveTab] = useState('verbs'); // 'verbs' | 'structures' | 'readings' | 'glossary' | 'miniquiz'
  const [openAccordions, setOpenAccordions] = useState({ 0: true, 1: true });

  // Mini Quiz state con rotación aleatoria
  const [activeQuestions, setActiveQuestions] = useState(() => getRandomQuestions(data.miniQuiz, 5));
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizChecked, setQuizChecked] = useState(false);

  const handleQuizSelect = (qIdx, optIdx) => {
    soundManager.playClick();
    setQuizAnswers(prev => ({
      ...prev,
      [qIdx]: optIdx
    }));
  };

  const handleCheckQuiz = () => {
    let allCorrect = true;
    activeQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] !== q.correct) allCorrect = false;
    });

    if (allCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }
    setQuizChecked(true);
  };

  const handleResetQuiz = () => {
    soundManager.playClick();
    setQuizAnswers({});
    setQuizChecked(false);
    setActiveQuestions(getRandomQuestions(data.miniQuiz, 5));
  };

  // Buscador de Verbos Irregulares
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all' | 'it_frequent' | 'no_change' | 'common'

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleAccordion = (idx) => {
    soundManager.playClick();
    setOpenAccordions(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Filtrado reactivo de verbos
  const filteredVerbs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return IRREGULAR_VERBS.filter(v => {
      const matchesSearch = 
        !q ||
        v.base.toLowerCase().includes(q) ||
        v.past.toLowerCase().includes(q) ||
        v.translation.toLowerCase().includes(q) ||
        (v.itContext && v.itContext.toLowerCase().includes(q));

      const matchesCategory = 
        categoryFilter === 'all' || v.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  // Coincidencia exacta o destacada para el héroe del buscador
  const highlightedMatch = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;
    
    // Buscar coincidencia exacta por base o traducción
    const exactBase = IRREGULAR_VERBS.find(v => v.base.toLowerCase() === q);
    if (exactBase) return exactBase;

    const exactPast = IRREGULAR_VERBS.find(v => v.past.toLowerCase().includes(q));
    if (exactPast) return exactPast;

    const exactTrans = IRREGULAR_VERBS.find(v => v.translation.toLowerCase().includes(q));
    if (exactTrans) return exactTrans;

    // Primer resultado filtrado si tiene longitud >= 2
    if (q.length >= 2 && filteredVerbs.length > 0) {
      return filteredVerbs[0];
    }
    return null;
  }, [searchQuery, filteredVerbs]);

  // Flashcard activa
  const currentFlashcard = IRREGULAR_VERBS[flashcardIndex];

  const handleNextFlashcard = () => {
    soundManager.playClick();
    setIsFlipped(false);
    setFlashcardIndex(prev => (prev + 1) % IRREGULAR_VERBS.length);
  };

  const handlePrevFlashcard = () => {
    soundManager.playClick();
    setIsFlipped(false);
    setFlashcardIndex(prev => (prev - 1 + IRREGULAR_VERBS.length) % IRREGULAR_VERBS.length);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
          <History className="w-3.5 h-3.5" />
          <span>Unidad 2 · Pasado Simple, Historias IT & Verbos Irregulares</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          {data.title}
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          {data.subtitle}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-800 pb-4">
        {[
          { id: 'verbs', label: 'Buscador de Verbos Irregulares', icon: Search },
          { id: 'structures', label: 'Estructuras & Verbos Regulares', icon: BookOpen },
          { id: 'readings', label: 'Historias IT (Apollo 11 / Google)', icon: Sparkles },
          { id: 'glossary', label: 'Glosario Empresarial IT', icon: Building2 },
          { id: 'miniquiz', label: 'Mini-Quiz Pasado & Verbos', icon: CheckCircle2 },
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
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25 ring-2 ring-amber-500/30'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: BUSCADOR DE VERBOS IRREGULARES (FUNCIONALIDAD CLAVE) */}
      {activeTab === 'verbs' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Search Box Header */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 flex items-center justify-center sm:justify-start space-x-2">
                <Search className="w-6 h-6 text-amber-400" />
                <span>Buscador Dinámico de Verbos Irregulares</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Escribe cualquier verbo en infinitivo (forma base) o en español para consultar al instante su conjugación en pasado simple.
              </p>
            </div>

            {/* Live Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="search-irregular-verb"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ejemplo: 'find', 'sell', 'meet', 'write', 'comprar'..."
                className="w-full pl-12 pr-12 py-4 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 text-slate-100 placeholder-slate-500 text-base font-medium transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-semibold flex items-center space-x-1 mr-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filtro:</span>
                </span>
                {[
                  { id: 'all', label: `Todos (${IRREGULAR_VERBS.length})` },
                  { id: 'it_frequent', label: 'Frecuentes en IT' },
                  { id: 'common', label: 'Uso General' },
                  { id: 'no_change', label: 'Sin Cambio (cut/cost/set)' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      soundManager.playClick();
                      setCategoryFilter(c.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      categoryFilter === c.id
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <span className="text-xs text-slate-400">
                Mostrando {filteredVerbs.length} verbos
              </span>
            </div>

            {/* HERO HIGHLIGHT: DESTACADO DINÁMICO CUANDO EL USUARIO BUSCA */}
            {highlightedMatch && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-amber-950/30 border-2 border-amber-500/40 shadow-2xl space-y-4 animate-slide-up">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    ⚡ Coincidencia Destacada
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Traducción: {highlightedMatch.translation}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  
                  {/* Base form */}
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Infinitivo / Base</span>
                    <span className="text-xl sm:text-2xl font-black text-slate-100 font-mono">{highlightedMatch.base}</span>
                  </div>

                  {/* Past simple form (PROMINENT!) */}
                  <div className="p-4 rounded-xl bg-amber-500/20 border-2 border-amber-400 text-center shadow-lg transform sm:scale-105">
                    <span className="text-[10px] uppercase font-extrabold text-amber-300 block tracking-wider">
                      PASADO SIMPLE (PAST)
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-amber-200 font-mono">
                      {highlightedMatch.past}
                    </span>
                  </div>

                  {/* Participle */}
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Participio Pasado</span>
                    <span className="text-xl sm:text-2xl font-black text-slate-300 font-mono">{highlightedMatch.participle}</span>
                  </div>

                </div>

                {/* Example sentence */}
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs sm:text-sm space-y-1">
                  <span className="text-slate-400 font-semibold block">Ejemplo en contexto IT / Programación:</span>
                  <p className="text-amber-100 font-medium italic">
                    "{highlightedMatch.example}"
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Complete Verbs Table */}
          <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-slate-100 text-sm sm:text-base">
                Tabla Completa de Verbos Irregulares
              </h3>
              <span className="text-xs text-slate-400">Total: {filteredVerbs.length} registros</span>
            </div>

            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="sticky top-0 bg-slate-950/95 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider z-10">
                  <tr>
                    <th className="py-3 px-4">Infinitivo (Base)</th>
                    <th className="py-3 px-4 text-amber-400 font-bold">Pasado Simple</th>
                    <th className="py-3 px-4">Participio</th>
                    <th className="py-3 px-4">Traducción</th>
                    <th className="py-3 px-4 hidden md:table-cell">Ejemplo IT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {filteredVerbs.map((v, idx) => (
                    <tr 
                      key={idx} 
                      className="hover:bg-slate-900/60 transition-colors group cursor-pointer"
                      onClick={() => setSearchQuery(v.base)}
                    >
                      <td className="py-3 px-4 font-bold text-slate-100">{v.base}</td>
                      <td className="py-3 px-4 font-extrabold text-amber-300 text-sm sm:text-base bg-amber-500/5 group-hover:bg-amber-500/10">
                        {v.past}
                      </td>
                      <td className="py-3 px-4 text-slate-300">{v.participle}</td>
                      <td className="py-3 px-4 font-sans text-slate-300">{v.translation}</td>
                      <td className="py-3 px-4 font-sans text-slate-400 text-xs hidden md:table-cell italic">
                        {v.example}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Irregular Verbs Flashcard Trainer */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-100 text-base sm:text-lg flex items-center space-x-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <span>Entrenador Rápido de Memoria (Flashcards)</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {flashcardIndex + 1} / {IRREGULAR_VERBS.length}
              </span>
            </div>

            {/* Flashcard Box */}
            <div 
              onClick={() => {
                soundManager.playClick();
                setIsFlipped(!isFlipped);
              }}
              className="min-h-[180px] p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-slate-800 hover:border-amber-500/40 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center space-y-3 shadow-xl"
            >
              {!isFlipped ? (
                <>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                    ¿Cuál es el pasado simple de?
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-slate-100 font-mono">
                    {currentFlashcard.base}
                  </div>
                  <span className="text-xs text-slate-500">
                    ({currentFlashcard.translation}) · Haz clic para revelar
                  </span>
                </>
              ) : (
                <div className="space-y-2 animate-fade-in">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                    Pasado Simple:
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-amber-300 font-mono">
                    {currentFlashcard.past}
                  </div>
                  <p className="text-xs text-slate-300 max-w-md pt-2 italic">
                    "{currentFlashcard.example}"
                  </p>
                </div>
              )}
            </div>

            {/* Flashcard Controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handlePrevFlashcard}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800"
              >
                Anterior
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setIsFlipped(!isFlipped);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30"
              >
                {isFlipped ? 'Ocultar' : 'Voltear Tarjeta'}
              </button>
              <button
                onClick={handleNextFlashcard}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow"
              >
                Siguiente
              </button>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: ESTRUCTURAS & REGLAS GRAMATICALES */}
      {activeTab === 'structures' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Regular Verbs Rules */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <span>Reglas para Verbos Regulares (Terminación -ED)</span>
            </h3>
            <p className="text-sm text-slate-300">
              {data.regularVsIrregular.regular.rule}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {data.regularVsIrregular.regular.spelling.map((sp, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                  <span className="font-bold text-slate-200 block">{sp.rule}</span>
                  <div className="text-emerald-300 font-mono">{sp.examples.join(' · ')}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Structures Accordions */}
          <div className="space-y-4">
            {data.structures.map((struct, idx) => {
              const isOpen = openAccordions[idx];
              return (
                <div key={idx} className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-md">
                  
                  {/* Trigger */}
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

                  {/* Content */}
                  {isOpen && (
                    <div className="px-5 pb-6 pt-2 space-y-5 border-t border-slate-800/80 animate-fade-in">
                      
                      {/* Formula */}
                      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs sm:text-sm text-amber-300">
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

                      {/* Examples */}
                      <div className="space-y-2.5 pt-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                          Ejemplos de las Clases y Exámenes:
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

      {/* TAB 3: HISTORIAS IT (READING COMPREHENSION) */}
      {activeTab === 'readings' && (
        <div className="space-y-6 animate-fade-in">
          {data.readingCaseStudies.map((study, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-slate-100 text-lg sm:text-xl">
                  {study.title}
                </h3>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {study.content}
              </p>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
                {study.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-xs px-2.5 py-1 rounded-md bg-slate-900 text-cyan-300 border border-slate-800 font-mono">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: GLOSARIO EMPRESARIAL IT */}
      {activeTab === 'glossary' && (
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 animate-fade-in">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-cyanBrand-400" />
              <span>Glosario de Evolución de Compañías IT (Clase 6)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Términos empresariales y técnicos clave evaluados en el primer parcial.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.businessGlossary.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors">
                <span className="font-bold text-amber-300 text-sm block font-mono">
                  {item.term}
                </span>
                <p className="text-xs text-slate-300">
                  {item.meaning}
                </p>
                <div className="pt-1 text-[11px] text-slate-400 italic">
                  "{item.example}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: MINI QUIZ */}
      {activeTab === 'miniquiz' && (
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Mini-Quiz Rápido de Pasado Simple & Verbos</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Preguntas seleccionadas aleatoriamente del banco temático ({activeQuestions.length} ejercicios)
              </p>
            </div>
            <button
              onClick={handleResetQuiz}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium underline self-start sm:self-auto"
            >
              Cargar otras preguntas
            </button>
          </div>

          <div className="space-y-5">
            {activeQuestions.map((q, qIdx) => {
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
                        btnStyle = 'bg-amber-600/30 border-amber-400 text-white font-bold ring-2 ring-amber-500/30';
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
                disabled={Object.keys(quizAnswers).length < activeQuestions.length}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  Object.keys(quizAnswers).length >= activeQuestions.length
                    ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/25'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Comprobar Respuestas
              </button>
            ) : (
              <button
                onClick={handleResetQuiz}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700"
              >
                Reiniciar con Nuevas Preguntas
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
