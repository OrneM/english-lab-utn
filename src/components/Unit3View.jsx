import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Sparkles, 
  Scale, 
  Code, 
  Briefcase, 
  Clock, 
  Layers, 
  HelpCircle, 
  Check, 
  CheckCircle2, 
  XCircle, 
  RotateCw, 
  Volume2, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Laptop, 
  Cpu, 
  FileText, 
  Glasses, 
  Zap, 
  ShieldCheck, 
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  Target,
  ArrowRight
} from 'lucide-react';
import { UNIT3_THEORY, UNIT3_CLASSES } from '../data/unit3TheoryData';
import { soundManager } from '../utils/soundEffects';

function ClassExamCtaBanner({ classId, onGoToExam }) {
  const c = UNIT3_CLASSES.find(item => item.id === classId);
  if (!c) return null;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand-500/10 via-cyan-500/10 to-indigo-500/10 border border-brand-500/20 dark:border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center space-x-3.5">
        <div className="p-3 rounded-xl bg-brand-600 text-white shadow-md flex-shrink-0">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center space-x-2">
            <span>¿Listo para evaluar {c.label}?</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold">
              {c.questionCount} preguntas
            </span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Pon a prueba tus conocimientos con el simulacro oficial de {c.title}.
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          soundManager.playClick();
          if (onGoToExam) onGoToExam({ parcial: '2', targetClass: c.id });
        }}
        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer flex-shrink-0"
      >
        <Zap className="w-4 h-4 text-cyan-300" />
        <span>Hacer Simulacro de {c.label}</span>
      </button>
    </div>
  );
}

function shuffleArray(arr) {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function getRandomQuestions(pool, count = 5) {
  if (!pool || pool.length === 0) return [];
  const shuffledQuestions = shuffleArray(pool).slice(0, Math.min(count, pool.length));

  return shuffledQuestions.map(q => {
    const correctAnswerText = q.options[q.correct];
    const shuffledOptions = shuffleArray(q.options);
    const newCorrectIndex = shuffledOptions.indexOf(correctAnswerText);

    return {
      ...q,
      options: shuffledOptions,
      correct: newCorrectIndex
    };
  });
}

// Pronunciación de frases en inglés usando Web Speech API
function speakEnglishText(text) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }
}

export function Unit3View({ onGoToExam }) {
  const [activeTab, setActiveTab] = useState('clase8'); // 'clase8' | 'clase9' | 'clase10' | 'clase12' | 'clase13' | 'clase14'
  const [openAccordions, setOpenAccordions] = useState({ 0: true, 1: true, 2: true });

  // Quizzes por clase
  const [quizState, setQuizState] = useState(() => ({
    clase8: { questions: getRandomQuestions(UNIT3_THEORY.clase8.miniQuiz, 5), answers: {}, checked: false },
    clase9: { questions: getRandomQuestions(UNIT3_THEORY.clase9.miniQuiz, 5), answers: {}, checked: false },
    clase10: { questions: getRandomQuestions(UNIT3_THEORY.clase10.miniQuiz, 5), answers: {}, checked: false },
    clase12: { questions: getRandomQuestions(UNIT3_THEORY.clase12.miniQuiz, 5), answers: {}, checked: false },
    clase13: { questions: getRandomQuestions(UNIT3_THEORY.clase13.miniQuiz, 5), answers: {}, checked: false },
    clase14: { questions: getRandomQuestions(UNIT3_THEORY.clase14.miniQuiz, 5), answers: {}, checked: false }
  }));

  const handleSelectAnswer = (classKey, qIdx, optIdx) => {
    soundManager.playClick();
    setQuizState(prev => ({
      ...prev,
      [classKey]: {
        ...prev[classKey],
        answers: {
          ...prev[classKey].answers,
          [qIdx]: optIdx
        }
      }
    }));
  };

  const handleCheckQuiz = (classKey) => {
    const curr = quizState[classKey];
    let allCorrect = true;
    curr.questions.forEach((q, idx) => {
      if (curr.answers[idx] !== q.correct) allCorrect = false;
    });

    if (allCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }

    setQuizState(prev => ({
      ...prev,
      [classKey]: {
        ...prev[classKey],
        checked: true
      }
    }));
  };

  const handleResetQuiz = (classKey, pool) => {
    soundManager.playClick();
    setQuizState(prev => ({
      ...prev,
      [classKey]: {
        questions: getRandomQuestions(pool, 5),
        answers: {},
        checked: false
      }
    }));
  };

  const toggleAccordion = (idx) => {
    soundManager.playClick();
    setOpenAccordions(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const tabs = [
    { id: 'clase8', number: 8, label: 'Clase 8', title: 'Cuantificadores & Dispositivos', icon: Scale, badge: 'Quantifiers' },
    { id: 'clase9', number: 9, label: 'Clase 9', title: 'Comparativos & Lenguajes', icon: Sparkles, badge: 'Python vs C' },
    { id: 'clase10', number: 10, label: 'Clase 10', title: 'Present Perfect & CV IT', icon: Briefcase, badge: 'Writing a CV' },
    { id: 'clase12', number: 12, label: 'Clase 12', title: 'Futuro & Entrevistas', icon: Clock, badge: 'Will vs Going to' },
    { id: 'clase13', number: 13, label: 'Clase 13', title: 'Conectores & Dispositivo AI', icon: Layers, badge: 'Connectors' },
    { id: 'clase14', number: 14, label: 'Clase 14', title: 'Adverbios & Repaso Integral', icon: Zap, badge: 'Review All Tenses' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-fade-in">
      
      {/* Top Banner / Hero */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 bg-gradient-to-br from-indigo-900 via-brand-900 to-slate-950 text-white shadow-2xl border border-indigo-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-wider border border-cyan-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Segundo Parcial Oficial · Unidad 3</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Guía Maestra · Clases 8 a 14
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Base de conocimiento interactiva con toda la gramática, vocabulario técnico, lecturas oficiales de tecnología y cuestionarios de práctica para aprobar el 2do parcial de Inglés Técnico I (UTN TUP).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                soundManager.playClick();
                if (onGoToExam) onGoToExam({ parcial: '2', targetClass: 'all' });
              }}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyanBrand-500 to-brand-500 hover:from-cyanBrand-400 hover:to-brand-400 text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2 transition-transform active:scale-95 cursor-pointer"
            >
              <Target className="w-4 h-4" />
              <span>Simular 2do Parcial Completo</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Class Selector Bar (Pills) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setActiveTab(tab.id);
              }}
              className={`p-3.5 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between space-y-2 cursor-pointer ${
                isActive
                  ? 'bg-brand-600 text-white border-brand-500 shadow-lg shadow-brand-500/25 ring-2 ring-brand-400'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-brand-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {tab.label}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`} />
              </div>
              <div>
                <p className={`font-bold text-xs line-clamp-1 ${isActive ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>
                  {tab.title}
                </p>
                <p className={`text-[10px] mt-0.5 ${isActive ? 'text-brand-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  {tab.badge}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Hub de Simulacros por Clase */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800/80 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                <span>🎯 Simulacros de Examen por Clase (2do Parcial)</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Practica de forma focalizada clase por clase o realiza el simulacro completo de 105 preguntas.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              if (onGoToExam) onGoToExam({ parcial: '2', targetClass: 'all' });
            }}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            <span>⚡ Simulacro Completo (105 preg)</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {UNIT3_CLASSES.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                soundManager.playClick();
                if (onGoToExam) onGoToExam({ parcial: '2', targetClass: c.id });
              }}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 hover:bg-brand-50 dark:hover:bg-brand-950/30 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 transition-all text-left group flex flex-col justify-between cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-extrabold text-xs text-slate-900 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-cyan-300">
                  {c.emoji} {c.label}
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20">
                  {c.questionCount}q
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-1.5 group-hover:text-slate-700 dark:group-hover:text-slate-300">
                {c.shortTitle}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* CLASE 8 VIEW */}
      {/* ======================================================== */}
      {activeTab === 'clase8' && (
        <div className="space-y-6">
          <ClassExamCtaBanner classId={8} onGoToExam={onGoToExam} />
          
          {/* Header Info */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center space-x-2 text-brand-600 dark:text-cyanBrand-400 text-xs font-bold uppercase tracking-wider">
              <Scale className="w-4 h-4" />
              <span>Contenido Oficial Clase 8 · Unidad 2 / Unidad 3</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {UNIT3_THEORY.clase8.grammar.topic}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {UNIT3_THEORY.clase8.grammar.definition}
            </p>
          </div>

          {/* Grammar Rules Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {UNIT3_THEORY.clase8.grammar.rules.map((rule, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                    {rule.name}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-500/20">
                    Regla #{idx + 1}
                  </span>
                </div>
                
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 font-mono text-xs text-brand-700 dark:text-cyan-300 border border-slate-200 dark:border-slate-800">
                  {rule.formula}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                  {rule.explanation}
                </p>

                <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800/60">
                  {rule.examples.map((ex, exIdx) => (
                    <div key={exIdx} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950/60 text-xs flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{ex.en}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px]">{ex.es}</p>
                      </div>
                      <button
                        onClick={() => speakEnglishText(ex.en)}
                        title="Escuchar pronunciación"
                        className="p-1 rounded-md text-slate-400 hover:text-brand-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex-shrink-0"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Vocabulary Section */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center space-x-2">
              <Laptop className="w-5 h-5 text-cyan-500" />
              <span>Vocabulario: Dispositivos, Internet y Verbos IT</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Devices */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block border-b pb-1">
                  Dispositivos & Hardware (12)
                </span>
                <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                  {UNIT3_THEORY.clase8.vocabulary.devices.map((d, i) => (
                    <div key={i} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-slate-100">{d.term}</span>
                        <span className="text-[11px] text-brand-600 dark:text-brand-400">{d.translation}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">{d.definition}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Internet */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block border-b pb-1">
                  The Internet (8)
                </span>
                <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                  {UNIT3_THEORY.clase8.vocabulary.internet.map((net, i) => (
                    <div key={i} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-slate-100">{net.term}</span>
                        <span className="text-[11px] text-cyan-600 dark:text-cyan-400">{net.translation}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">{net.definition}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verbs */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block border-b pb-1">
                  Acciones & Verbos IT (12)
                </span>
                <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                  {UNIT3_THEORY.clase8.vocabulary.verbs.map((v, i) => (
                    <div key={i} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{v.verb}</span>
                        <span className="text-[11px] text-slate-700 dark:text-slate-300">{v.translation}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">{v.definition}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Reading Case Study */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-brand-950/40 border border-brand-200 dark:border-brand-500/20 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Lectura Obligatoria de la Clase 8</span>
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
              {UNIT3_THEORY.clase8.reading.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {UNIT3_THEORY.clase8.reading.summary}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {UNIT3_THEORY.clase8.reading.keyQuestions.map((kq, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 block">{kq.item}</span>
                  <span className="font-bold text-brand-600 dark:text-cyanBrand-400 mt-0.5 block">→ {kq.answer}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Mini Quiz */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                  Mini Test Interactivo · Clase 8
                </h3>
              </div>
              <button
                onClick={() => handleResetQuiz('clase8', UNIT3_THEORY.clase8.miniQuiz)}
                className="text-xs text-brand-600 dark:text-brand-400 hover:underline flex items-center space-x-1"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Nuevas preguntas</span>
              </button>
            </div>

            <div className="space-y-4">
              {quizState.clase8.questions.map((q, qIdx) => {
                const userAns = quizState.clase8.answers[qIdx];
                const isChecked = quizState.clase8.checked;
                return (
                  <div key={qIdx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 space-y-2">
                    <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {qIdx + 1}. {q.q}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAns === optIdx;
                        const isCorrect = q.correct === optIdx;
                        let btnStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300';
                        if (isSelected) {
                          btnStyle = 'bg-brand-500/10 border-brand-500 text-brand-600 dark:text-brand-400 font-bold';
                        }
                        if (isChecked) {
                          if (isCorrect) {
                            btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold';
                          } else if (isSelected && !isCorrect) {
                            btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-300';
                          }
                        }
                        return (
                          <button
                            key={optIdx}
                            onClick={() => !isChecked && handleSelectAnswer('clase8', qIdx, optIdx)}
                            disabled={isChecked}
                            className={`p-2.5 rounded-lg text-left text-xs border transition-all ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {isChecked && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 p-2 rounded-md">
                        💡 <strong>Explicación:</strong> {q.exp}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              {!quizState.clase8.checked ? (
                <button
                  onClick={() => handleCheckQuiz('clase8')}
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md transition-transform active:scale-95"
                >
                  Comprobar Respuestas
                </button>
              ) : (
                <button
                  onClick={() => handleResetQuiz('clase8', UNIT3_THEORY.clase8.miniQuiz)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Reintentar con Otras Preguntas</span>
                </button>
              )}
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* CLASE 9 VIEW */}
      {/* ======================================================== */}
      {activeTab === 'clase9' && (
        <div className="space-y-6">
          <ClassExamCtaBanner classId={9} onGoToExam={onGoToExam} />
          
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center space-x-2 text-brand-600 dark:text-cyanBrand-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Contenido Oficial Clase 9 · Unidad 2 / Unidad 3</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {UNIT3_THEORY.clase9.grammar.topic}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {UNIT3_THEORY.clase9.grammar.definition}
            </p>
          </div>

          {/* Comparatives vs Superlatives Tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Comparatives Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                  <span>1. Adjetivos Comparativos (2 cosas)</span>
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold">
                  Two things
                </span>
              </div>
              <div className="space-y-2.5">
                {UNIT3_THEORY.clase9.grammar.comparativeRules.map((r, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 dark:text-slate-200">{r.type}</span>
                      <span className="text-[11px] font-mono text-brand-600 dark:text-cyan-400">{r.rule}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {r.examples.map((ex, exIdx) => (
                        <span key={exIdx} className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-400">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Superlatives Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                  <span>2. Adjetivos Superlativos (3+ cosas)</span>
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                  Three or more
                </span>
              </div>
              <div className="space-y-2.5">
                {UNIT3_THEORY.clase9.grammar.superlativeRules.map((r, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 dark:text-slate-200">{r.type}</span>
                      <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400">{r.rule}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {r.examples.map((ex, exIdx) => (
                        <span key={exIdx} className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-400">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* IT Case Studies (Python vs C, Java vs Go, Python vs JS) */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center space-x-2">
              <Code className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>Lecturas IT Oficiales: Comparación Técnica de Lenguajes</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {UNIT3_THEORY.clase9.itComparisons.map((c, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                        {c.pair}
                      </h4>
                      <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-brand-500/10 text-brand-500">
                        IT Case
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {c.summary}
                    </p>
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {c.readingHighlights.map((rh, rhIdx) => (
                      <div key={rhIdx} className="text-[11px] p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
                        <span className="font-bold text-brand-600 dark:text-cyan-400">{rh.feature}: </span>
                        <span className="text-slate-600 dark:text-slate-400">{rh.details}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Glossary Card */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="font-black text-sm text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Glosario Oficial de la Clase 9
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {UNIT3_THEORY.clase9.glossary.map((g, i) => (
                <div key={i} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{g.term}</span>
                    <span className="text-[10px] text-brand-600 dark:text-brand-400">{g.translation}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{g.definition}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mini Quiz Clase 9 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                  Mini Test Interactivo · Clase 9
                </h3>
              </div>
              <button
                onClick={() => handleResetQuiz('clase9', UNIT3_THEORY.clase9.miniQuiz)}
                className="text-xs text-brand-600 dark:text-brand-400 hover:underline flex items-center space-x-1"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Nuevas preguntas</span>
              </button>
            </div>

            <div className="space-y-4">
              {quizState.clase9.questions.map((q, qIdx) => {
                const userAns = quizState.clase9.answers[qIdx];
                const isChecked = quizState.clase9.checked;
                return (
                  <div key={qIdx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 space-y-2">
                    <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {qIdx + 1}. {q.q}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAns === optIdx;
                        const isCorrect = q.correct === optIdx;
                        let btnStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300';
                        if (isSelected) {
                          btnStyle = 'bg-brand-500/10 border-brand-500 text-brand-600 dark:text-brand-400 font-bold';
                        }
                        if (isChecked) {
                          if (isCorrect) {
                            btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold';
                          } else if (isSelected && !isCorrect) {
                            btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-300';
                          }
                        }
                        return (
                          <button
                            key={optIdx}
                            onClick={() => !isChecked && handleSelectAnswer('clase9', qIdx, optIdx)}
                            disabled={isChecked}
                            className={`p-2.5 rounded-lg text-left text-xs border transition-all ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {isChecked && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 p-2 rounded-md">
                        💡 <strong>Explicación:</strong> {q.exp}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              {!quizState.clase9.checked ? (
                <button
                  onClick={() => handleCheckQuiz('clase9')}
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md transition-transform active:scale-95"
                >
                  Comprobar Respuestas
                </button>
              ) : (
                <button
                  onClick={() => handleResetQuiz('clase9', UNIT3_THEORY.clase9.miniQuiz)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Reintentar con Otras Preguntas</span>
                </button>
              )}
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* CLASE 10 VIEW */}
      {/* ======================================================== */}
      {activeTab === 'clase10' && (
        <div className="space-y-6">
          <ClassExamCtaBanner classId={10} onGoToExam={onGoToExam} />
          
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center space-x-2 text-brand-600 dark:text-cyanBrand-400 text-xs font-bold uppercase tracking-wider">
              <Briefcase className="w-4 h-4" />
              <span>Contenido Oficial Clase 10 · Unidad 3</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {UNIT3_THEORY.clase10.grammar.topic}
            </h2>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 font-mono text-xs text-brand-700 dark:text-cyan-300 border border-slate-200 dark:border-slate-800 inline-block">
              {UNIT3_THEORY.clase10.grammar.formula}
            </div>
          </div>

          {/* Present Perfect Rules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {UNIT3_THEORY.clase10.grammar.rules.map((r, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center justify-between">
                  <span>{r.name}</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                  {r.detail}
                </p>
                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {r.examples.map((ex, exIdx) => (
                    <div key={exIdx} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{ex.en}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px]">{ex.es}</p>
                      </div>
                      <button
                        onClick={() => speakEnglishText(ex.en)}
                        className="p-1 rounded text-slate-400 hover:text-brand-500 flex-shrink-0"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Writing a CV for IT */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-indigo-500" />
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                {UNIT3_THEORY.clase10.cvWriting.topic}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Essential Verbs */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block border-b pb-1">
                  10 Verbos Esenciales de Acción para tu CV
                </span>
                <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
                  {UNIT3_THEORY.clase10.cvWriting.essentialVerbs.map((v, i) => (
                    <div key={i} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-brand-600 dark:text-brand-400">{v.verb}</span>
                        <span className="text-[11px] text-slate-600 dark:text-slate-300">({v.meaning})</span>
                      </div>
                      <p className="text-[10px] text-slate-500 italic mt-0.5 font-mono">"{v.example}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Vocabulary */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block border-b pb-1">
                  Términos Clave de Selección IT (10)
                </span>
                <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
                  {UNIT3_THEORY.clase10.cvWriting.keyVocabulary.map((kv, i) => (
                    <div key={i} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-cyan-600 dark:text-cyan-400">{kv.term}</span>
                        <span className="text-[11px] text-slate-600 dark:text-slate-300">{kv.meaning}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">{kv.example}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Martina Lopez Resume Highlight */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-1.5">
                <FileText className="w-4 h-4 text-brand-500" />
                <span>Modelo de CV Analizado: Martina López (Junior IT Developer)</span>
              </span>
              <p className="text-slate-600 dark:text-slate-400">
                • <strong>Perfil:</strong> {UNIT3_THEORY.clase10.cvWriting.sampleResume.role} - {UNIT3_THEORY.clase10.cvWriting.sampleResume.education}
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                • <strong>Skills:</strong> {UNIT3_THEORY.clase10.cvWriting.sampleResume.skills}
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                • <strong>Proyecto:</strong> {UNIT3_THEORY.clase10.cvWriting.sampleResume.project}
              </p>
            </div>
          </div>

          {/* Mini Quiz Clase 10 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                  Mini Test Interactivo · Clase 10
                </h3>
              </div>
              <button
                onClick={() => handleResetQuiz('clase10', UNIT3_THEORY.clase10.miniQuiz)}
                className="text-xs text-brand-600 dark:text-brand-400 hover:underline flex items-center space-x-1"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Nuevas preguntas</span>
              </button>
            </div>

            <div className="space-y-4">
              {quizState.clase10.questions.map((q, qIdx) => {
                const userAns = quizState.clase10.answers[qIdx];
                const isChecked = quizState.clase10.checked;
                return (
                  <div key={qIdx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 space-y-2">
                    <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {qIdx + 1}. {q.q}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAns === optIdx;
                        const isCorrect = q.correct === optIdx;
                        let btnStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300';
                        if (isSelected) {
                          btnStyle = 'bg-brand-500/10 border-brand-500 text-brand-600 dark:text-brand-400 font-bold';
                        }
                        if (isChecked) {
                          if (isCorrect) {
                            btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold';
                          } else if (isSelected && !isCorrect) {
                            btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-300';
                          }
                        }
                        return (
                          <button
                            key={optIdx}
                            onClick={() => !isChecked && handleSelectAnswer('clase10', qIdx, optIdx)}
                            disabled={isChecked}
                            className={`p-2.5 rounded-lg text-left text-xs border transition-all ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {isChecked && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 p-2 rounded-md">
                        💡 <strong>Explicación:</strong> {q.exp}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              {!quizState.clase10.checked ? (
                <button
                  onClick={() => handleCheckQuiz('clase10')}
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md transition-transform active:scale-95"
                >
                  Comprobar Respuestas
                </button>
              ) : (
                <button
                  onClick={() => handleResetQuiz('clase10', UNIT3_THEORY.clase10.miniQuiz)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Reintentar con Otras Preguntas</span>
                </button>
              )}
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* CLASE 12 VIEW */}
      {/* ======================================================== */}
      {activeTab === 'clase12' && (
        <div className="space-y-6">
          <ClassExamCtaBanner classId={12} onGoToExam={onGoToExam} />
          
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center space-x-2 text-brand-600 dark:text-cyanBrand-400 text-xs font-bold uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>Contenido Oficial Clase 12 · Unidad 3</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {UNIT3_THEORY.clase12.grammar.topic}
            </h2>
          </div>

          {/* Will vs Going To Contrast */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {UNIT3_THEORY.clase12.grammar.rules.map((rule, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 border-b pb-2">
                  {rule.aspect}
                </h3>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs space-y-1">
                  <span className="font-bold text-brand-600 dark:text-cyan-400">WILL:</span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">{rule.will}</p>
                </div>
                {rule.goingTo && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs space-y-1">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">BE GOING TO:</span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">{rule.goingTo}</p>
                  </div>
                )}
                {rule.contrastExample && (
                  <p className="text-[11px] p-2 rounded bg-amber-500/10 text-amber-800 dark:text-amber-300 font-mono whitespace-pre-line">
                    {rule.contrastExample}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Job Interview DOs and DON'Ts */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-emerald-500" />
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                {UNIT3_THEORY.clase12.interviewGuide.topic}
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {UNIT3_THEORY.clase12.interviewGuide.introduction}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* 5 DOs */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block border-b border-emerald-500/20 pb-1">
                  5 Recomendaciones Clave (DOs)
                </span>
                <div className="space-y-2">
                  {UNIT3_THEORY.clase12.interviewGuide.dos.map((d, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/20 text-xs space-y-0.5">
                      <span className="font-bold text-emerald-800 dark:text-emerald-300">{d.number}. {d.title}</span>
                      <p className="text-slate-600 dark:text-slate-400">{d.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5 DON'Ts */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 block border-b border-rose-500/20 pb-1">
                  5 Errores a Evitar (DON'Ts)
                </span>
                <div className="space-y-2">
                  {UNIT3_THEORY.clase12.interviewGuide.donts.map((d, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-500/20 text-xs space-y-0.5">
                      <span className="font-bold text-rose-800 dark:text-rose-300">{d.number}. {d.title}</span>
                      <p className="text-slate-600 dark:text-slate-400">{d.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* AI Smart Glasses Case Study */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-50 to-indigo-50 dark:from-slate-900 dark:to-cyan-950/30 border border-cyan-200 dark:border-cyan-500/20 space-y-2 text-xs">
            <span className="font-black text-cyan-800 dark:text-cyan-300 text-sm flex items-center space-x-1.5">
              <Glasses className="w-4 h-4" />
              <span>{UNIT3_THEORY.clase12.smartGlassesReading.title}</span>
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {UNIT3_THEORY.clase12.smartGlassesReading.summary}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {UNIT3_THEORY.clase12.smartGlassesReading.vocabulary.map((v, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px]">
                  <strong>{v.en}:</strong> {v.es}
                </span>
              ))}
            </div>
          </div>

          {/* Mini Quiz Clase 12 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                  Mini Test Interactivo · Clase 12
                </h3>
              </div>
              <button
                onClick={() => handleResetQuiz('clase12', UNIT3_THEORY.clase12.miniQuiz)}
                className="text-xs text-brand-600 dark:text-brand-400 hover:underline flex items-center space-x-1"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Nuevas preguntas</span>
              </button>
            </div>

            <div className="space-y-4">
              {quizState.clase12.questions.map((q, qIdx) => {
                const userAns = quizState.clase12.answers[qIdx];
                const isChecked = quizState.clase12.checked;
                return (
                  <div key={qIdx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 space-y-2">
                    <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {qIdx + 1}. {q.q}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAns === optIdx;
                        const isCorrect = q.correct === optIdx;
                        let btnStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300';
                        if (isSelected) {
                          btnStyle = 'bg-brand-500/10 border-brand-500 text-brand-600 dark:text-brand-400 font-bold';
                        }
                        if (isChecked) {
                          if (isCorrect) {
                            btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold';
                          } else if (isSelected && !isCorrect) {
                            btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-300';
                          }
                        }
                        return (
                          <button
                            key={optIdx}
                            onClick={() => !isChecked && handleSelectAnswer('clase12', qIdx, optIdx)}
                            disabled={isChecked}
                            className={`p-2.5 rounded-lg text-left text-xs border transition-all ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {isChecked && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 p-2 rounded-md">
                        💡 <strong>Explicación:</strong> {q.exp}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              {!quizState.clase12.checked ? (
                <button
                  onClick={() => handleCheckQuiz('clase12')}
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md transition-transform active:scale-95"
                >
                  Comprobar Respuestas
                </button>
              ) : (
                <button
                  onClick={() => handleResetQuiz('clase12', UNIT3_THEORY.clase12.miniQuiz)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Reintentar con Otras Preguntas</span>
                </button>
              )}
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* CLASE 13 VIEW */}
      {/* ======================================================== */}
      {activeTab === 'clase13' && (
        <div className="space-y-6">
          <ClassExamCtaBanner classId={13} onGoToExam={onGoToExam} />
          
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center space-x-2 text-brand-600 dark:text-cyanBrand-400 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Contenido Oficial Clase 13 · Unidad 3</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {UNIT3_THEORY.clase13.grammar.topic}
            </h2>
          </div>

          {/* Connectors Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {UNIT3_THEORY.clase13.grammar.connectors.map((c, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-base text-brand-600 dark:text-brand-400">{c.word}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Conector</span>
                  </div>
                  <p className="font-semibold text-xs text-slate-800 dark:text-slate-200">{c.meaning}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{c.rules}</p>
                </div>
                <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {c.examples.map((ex, exIdx) => (
                    <div key={exIdx} className="p-1.5 rounded bg-slate-50 dark:bg-slate-950 text-[11px]">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{ex.en}</p>
                      {ex.es && <p className="text-slate-500 text-[10px]">{ex.es}</p>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* OpenAI Device Reading */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              <span>{UNIT3_THEORY.clase13.reading.title}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {UNIT3_THEORY.clase13.reading.summary}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
              {UNIT3_THEORY.clase13.reading.vocabularyMatch.map((vm, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                  <span className="font-bold text-brand-600 dark:text-brand-400 block">{vm.word}</span>
                  <span className="text-[10px] text-slate-500 block">{vm.defEs}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mini Quiz Clase 13 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                  Mini Test Interactivo · Clase 13
                </h3>
              </div>
              <button
                onClick={() => handleResetQuiz('clase13', UNIT3_THEORY.clase13.miniQuiz)}
                className="text-xs text-brand-600 dark:text-brand-400 hover:underline flex items-center space-x-1"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Nuevas preguntas</span>
              </button>
            </div>

            <div className="space-y-4">
              {quizState.clase13.questions.map((q, qIdx) => {
                const userAns = quizState.clase13.answers[qIdx];
                const isChecked = quizState.clase13.checked;
                return (
                  <div key={qIdx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 space-y-2">
                    <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {qIdx + 1}. {q.q}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAns === optIdx;
                        const isCorrect = q.correct === optIdx;
                        let btnStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300';
                        if (isSelected) {
                          btnStyle = 'bg-brand-500/10 border-brand-500 text-brand-600 dark:text-brand-400 font-bold';
                        }
                        if (isChecked) {
                          if (isCorrect) {
                            btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold';
                          } else if (isSelected && !isCorrect) {
                            btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-300';
                          }
                        }
                        return (
                          <button
                            key={optIdx}
                            onClick={() => !isChecked && handleSelectAnswer('clase13', qIdx, optIdx)}
                            disabled={isChecked}
                            className={`p-2.5 rounded-lg text-left text-xs border transition-all ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {isChecked && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 p-2 rounded-md">
                        💡 <strong>Explicación:</strong> {q.exp}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              {!quizState.clase13.checked ? (
                <button
                  onClick={() => handleCheckQuiz('clase13')}
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md transition-transform active:scale-95"
                >
                  Comprobar Respuestas
                </button>
              ) : (
                <button
                  onClick={() => handleResetQuiz('clase13', UNIT3_THEORY.clase13.miniQuiz)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Reintentar con Otras Preguntas</span>
                </button>
              )}
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* CLASE 14 VIEW */}
      {/* ======================================================== */}
      {activeTab === 'clase14' && (
        <div className="space-y-6">
          <ClassExamCtaBanner classId={14} onGoToExam={onGoToExam} />
          
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center space-x-2 text-brand-600 dark:text-cyanBrand-400 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Contenido Oficial Clase 14 · Unidad 3</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {UNIT3_THEORY.clase14.grammar.adverbsOfManner.topic}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {UNIT3_THEORY.clase14.grammar.adverbsOfManner.use}
            </p>
          </div>

          {/* Adverb Position and Alert */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                Posición y Ortografía de Adverbios de Modo
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {UNIT3_THEORY.clase14.grammar.adverbsOfManner.position}
              </p>
              <div className="space-y-1.5">
                {UNIT3_THEORY.clase14.grammar.adverbsOfManner.spellingRules.map((sr, i) => (
                  <div key={i} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs">
                    <span className="font-bold text-brand-600 dark:text-brand-400 block">{sr.rule}</span>
                    <span className="text-[10px] text-slate-500">{sr.examples.join(' · ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning -ly Adjectives */}
            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/30 shadow-sm space-y-3">
              <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-black text-sm">
                  {UNIT3_THEORY.clase14.grammar.adverbsOfManner.warningLyAdjectives.title}
                </h3>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {UNIT3_THEORY.clase14.grammar.adverbsOfManner.warningLyAdjectives.rule}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {UNIT3_THEORY.clase14.grammar.adverbsOfManner.warningLyAdjectives.words.map((w, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-500/40 text-xs font-bold text-amber-800 dark:text-amber-300">
                    {w}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Master Table of All Tenses */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                <Layers className="w-5 h-5 text-brand-600 dark:text-cyanBrand-400" />
                <span>Tabla Maestra de Repaso: Todos los Tiempos Verbales</span>
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 font-black">
                A2 / Parcial
              </span>
            </div>

            <div className="space-y-3">
              {UNIT3_THEORY.clase14.grammar.allTensesMasterTable.map((t, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-brand-600 dark:text-cyanBrand-400">{t.tense}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Fórmula: {t.formula}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    <strong>Usos:</strong> {t.uses}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                    <strong>Marcadores de tiempo:</strong> {t.markers}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mini Quiz Clase 14 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                  Mini Test Interactivo · Clase 14
                </h3>
              </div>
              <button
                onClick={() => handleResetQuiz('clase14', UNIT3_THEORY.clase14.miniQuiz)}
                className="text-xs text-brand-600 dark:text-brand-400 hover:underline flex items-center space-x-1"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Nuevas preguntas</span>
              </button>
            </div>

            <div className="space-y-4">
              {quizState.clase14.questions.map((q, qIdx) => {
                const userAns = quizState.clase14.answers[qIdx];
                const isChecked = quizState.clase14.checked;
                return (
                  <div key={qIdx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 space-y-2">
                    <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {qIdx + 1}. {q.q}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAns === optIdx;
                        const isCorrect = q.correct === optIdx;
                        let btnStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300';
                        if (isSelected) {
                          btnStyle = 'bg-brand-500/10 border-brand-500 text-brand-600 dark:text-brand-400 font-bold';
                        }
                        if (isChecked) {
                          if (isCorrect) {
                            btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold';
                          } else if (isSelected && !isCorrect) {
                            btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-300';
                          }
                        }
                        return (
                          <button
                            key={optIdx}
                            onClick={() => !isChecked && handleSelectAnswer('clase14', qIdx, optIdx)}
                            disabled={isChecked}
                            className={`p-2.5 rounded-lg text-left text-xs border transition-all ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {isChecked && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 p-2 rounded-md">
                        💡 <strong>Explicación:</strong> {q.exp}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              {!quizState.clase14.checked ? (
                <button
                  onClick={() => handleCheckQuiz('clase14')}
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md transition-transform active:scale-95"
                >
                  Comprobar Respuestas
                </button>
              ) : (
                <button
                  onClick={() => handleResetQuiz('clase14', UNIT3_THEORY.clase14.miniQuiz)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Reintentar con Otras Preguntas</span>
                </button>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
