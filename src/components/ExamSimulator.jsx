import React, { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle, 
  RotateCcw, 
  Play, 
  HelpCircle, 
  Award, 
  TrendingUp, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Flag, 
  BookOpen, 
  Sparkles,
  BarChart2,
  Zap,
  CheckCheck,
  History,
  Trash2,
  Flame,
  Target,
  Gauge,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { EXAM_QUESTIONS } from '../data/questions';
import { soundManager } from '../utils/soundEffects';
import { 
  getExamHistory,
  saveExamResult,
  getEvolutionMetrics,
  clearExamHistory 
} from '../utils/storageHistory';

export function ExamSimulator({ onNavigateToTheory }) {
  // Configuración
  const [questionCount, setQuestionCount] = useState(20);
  const [timerMinutes, setTimerMinutes] = useState(20);
  const [examMode, setExamMode] = useState('exam'); // 'exam' | 'practice'
  
  // Estado del Examen
  const [gameState, setGameState] = useState('setup'); // 'setup' | 'active' | 'results'
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: 'a' | 'b' ... }
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [instantChecked, setInstantChecked] = useState({}); // For practice mode: { [qId]: boolean }
  
  // Métricas de evolución persistentes
  const [metricsState, setMetricsState] = useState(() => getEvolutionMetrics());
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Temporizador
  const [secondsRemaining, setSecondsRemaining] = useState(null);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);
  const timerRef = useRef(null);

  // Filtro de revisión
  const [resultsFilter, setResultsFilter] = useState('all'); // 'all' | 'incorrect' | 'correct'

  // Refrescar métricas al entrar en setup o results
  useEffect(() => {
    if (gameState === 'setup' || gameState === 'results') {
      setMetricsState(getEvolutionMetrics());
    }
  }, [gameState]);

  // Iniciar Examen
  const handleStartExam = () => {
    soundManager.playClick();
    
    // Mezclar y seleccionar preguntas
    const shuffled = [...EXAM_QUESTIONS].sort(() => 0.5 - Math.random());
    const count = questionCount === 'all' ? shuffled.length : Math.min(questionCount, shuffled.length);
    const selected = shuffled.slice(0, count);
    
    setCurrentQuestions(selected);
    setCurrentIndex(0);
    setUserAnswers({});
    setFlaggedQuestions(new Set());
    setInstantChecked({});
    
    if (timerMinutes > 0) {
      setSecondsRemaining(timerMinutes * 60);
    } else {
      setSecondsRemaining(null);
    }
    setTimeSpentSeconds(0);
    setGameState('active');
  };

  // Timer Tick
  useEffect(() => {
    if (gameState === 'active') {
      timerRef.current = setInterval(() => {
        setTimeSpentSeconds(prev => prev + 1);
        
        if (secondsRemaining !== null) {
          setSecondsRemaining(prev => {
            if (prev <= 1) {
              clearInterval(timerRef.current);
              handleFinishExam(true);
              return 0;
            }
            if (prev === 60 || prev === 120) {
              soundManager.playTick();
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState, secondsRemaining]);

  // Manejar selección de opción
  const handleSelectOption = (questionId, optionId) => {
    soundManager.playClick();
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  // En modo práctica, verificar de inmediato
  const handleCheckInstant = (qId) => {
    const q = currentQuestions.find(item => item.id === qId);
    if (!q || !userAnswers[qId]) return;

    const isCorrect = userAnswers[qId] === q.correctAnswer;
    if (isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }

    setInstantChecked(prev => ({
      ...prev,
      [qId]: true
    }));
  };

  // Marcar / Desmarcar pregunta con bandera
  const toggleFlag = (qId) => {
    soundManager.playClick();
    setFlaggedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  // Formatear segundos en MM:SS
  const formatTime = (secs) => {
    if (secs === null || secs === undefined) return '--:--';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Finalizar Examen
  const handleFinishExam = (isTimeout = false) => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Calcular estadísticas
    let correctCount = 0;
    const topicStats = {};

    currentQuestions.forEach(q => {
      const isCorrect = userAnswers[q.id] === q.correctAnswer;
      if (isCorrect) correctCount++;

      const topic = q.topic || 'General';
      if (!topicStats[topic]) {
        topicStats[topic] = { total: 0, correct: 0 };
      }
      topicStats[topic].total += 1;
      if (isCorrect) topicStats[topic].correct += 1;
    });

    const total = currentQuestions.length;
    const percentage = Math.round((correctCount / total) * 100);
    const score = ((correctCount / total) * 10).toFixed(1);
    
    let gradeStatus = {
      label: 'A Recuperar',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      badge: 'Menor a 60%',
      desc: 'Te recomendamos repasar los temas teóricos antes de volver a intentar el simulacro.'
    };

    if (percentage >= 80) {
      gradeStatus = {
        label: '¡Promocionado!',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        badge: 'Nota ≥ 8 (Sobresaliente)',
        desc: '¡Excelente dominio de los contenidos! Cumples con todos los criterios de promoción directa de la UTN.'
      };
    } else if (percentage >= 60) {
      gradeStatus = {
        label: 'Aprobado',
        color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
        badge: 'Nota entre 6 y 7.9',
        desc: 'Has alcanzado el puntaje mínimo de aprobación. Puedes reforzar los puntos débiles para buscar la promoción.'
      };
    }

    // Persistir métricas de resolución y scoring en localStorage
    saveExamResult({
      score,
      percentage,
      correctCount,
      total,
      timeSpentSeconds,
      timeSpent: formatTime(timeSpentSeconds),
      avgTimePerQuestion: Math.round(timeSpentSeconds / (total || 1)),
      topicStats,
      gradeStatus
    });

    setMetricsState(getEvolutionMetrics());

    // Si aprobó, lanzar confeti y fanfarria
    if (percentage >= 60) {
      soundManager.playFanfare();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    } else {
      soundManager.playIncorrect();
    }

    setGameState('results');
  };

  const handleClearHistory = () => {
    if (window.confirm("¿Seguro que deseas reiniciar el historial de métricas y scoring?")) {
      soundManager.playClick();
      clearExamHistory();
      setMetricsState(getEvolutionMetrics());
    }
  };

  // Cálculos para la pantalla de resultados
  const stats = useMemo(() => {
    if (gameState !== 'results' || currentQuestions.length === 0) return null;

    let correctCount = 0;
    const topicStats = {};

    currentQuestions.forEach(q => {
      const isCorrect = userAnswers[q.id] === q.correctAnswer;
      if (isCorrect) correctCount++;

      const topic = q.topic || 'General';
      if (!topicStats[topic]) {
        topicStats[topic] = { total: 0, correct: 0 };
      }
      topicStats[topic].total += 1;
      if (isCorrect) topicStats[topic].correct += 1;
    });

    const total = currentQuestions.length;
    const percentage = Math.round((correctCount / total) * 100);
    const score = ((correctCount / total) * 10).toFixed(1);
    
    let gradeStatus = {
      label: 'A Recuperar',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      badge: 'Menor a 60%',
      desc: 'Te recomendamos repasar los temas teóricos antes de volver a intentar el simulacro.'
    };

    if (percentage >= 80) {
      gradeStatus = {
        label: '¡Promocionado!',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        badge: 'Nota ≥ 8 (Sobresaliente)',
        desc: '¡Excelente dominio de los contenidos! Cumples con todos los criterios de promoción directa de la UTN.'
      };
    } else if (percentage >= 60) {
      gradeStatus = {
        label: 'Aprobado',
        color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
        badge: 'Nota entre 6 y 7.9',
        desc: 'Has alcanzado el puntaje mínimo de aprobación. Puedes reforzar los puntos débiles para buscar la promoción.'
      };
    }

    return {
      correctCount,
      total,
      percentage,
      score,
      gradeStatus,
      topicStats,
      timeSpent: formatTime(timeSpentSeconds),
      avgTimePerQuestion: Math.round(timeSpentSeconds / total)
    };
  }, [gameState, currentQuestions, userAnswers, timeSpentSeconds]);

  // Pregunta activa actual
  const currentQ = currentQuestions[currentIndex];

  // --------------------------------------------------------------------------
  // PANTALLA 1: SETUP / CONFIGURACIÓN DEL EXAMEN
  // --------------------------------------------------------------------------
  if (gameState === 'setup') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in space-y-8">
        
        {/* Hero Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyanBrand-400" />
            <span>Simulador Oficial Basado en el Parcial UTN TUP</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Práctica y Simulacro de Examen
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Ejercicios múltiples choice generados estrictamente con el formato del primer parcial de inglés. Pon a prueba tus conocimientos gramaticales y vocabulario técnico.
          </p>
        </div>

        {/* Dashboard de Métricas de Evolución y Scoring */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-slate-100 text-base flex items-center space-x-2">
                  <span>Métricas de Evolución & Scoring Histórico</span>
                </h2>
                <p className="text-xs text-slate-400">Seguimiento de calificaciones, velocidad de respuesta y curva de aprendizaje.</p>
              </div>
            </div>

            {metricsState.hasData && (
              <button
                onClick={handleClearHistory}
                title="Reiniciar métricas guardadas"
                className="self-start sm:self-auto text-xs text-slate-500 hover:text-rose-400 flex items-center space-x-1 px-2.5 py-1 rounded-lg border border-slate-800 hover:border-rose-500/40 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Limpiar Historial</span>
              </button>
            )}
          </div>

          {metricsState.hasData ? (
            <div className="space-y-4">
              {/* 4 Tarjetas de KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                
                {/* 1. Calificación Promedio */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Nota Promedio</span>
                    <Target className="w-3.5 h-3.5 text-brand-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-100">
                    {metricsState.avgScore} <span className="text-xs text-slate-500 font-bold">/10</span>
                  </div>
                  <div className="text-[11px] font-semibold text-cyan-400">
                    {Number(metricsState.avgScore) >= 8 ? '🌟 Nivel Promoción' : Number(metricsState.avgScore) >= 6 ? '✅ Nivel Aprobado' : '⚠️ A Reforzar'}
                  </div>
                </div>

                {/* 2. Mejor Calificación (Récord) */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Mejor Calificación</span>
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-300">
                    {metricsState.bestScore} <span className="text-xs text-slate-500 font-bold">/10</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    Récord personal registrado
                  </div>
                </div>

                {/* 3. Velocidad Promedio */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Velocidad Promedio</span>
                    <Gauge className="w-3.5 h-3.5 text-cyanBrand-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono">
                    {metricsState.avgSpeed}s
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    Por cada pregunta
                  </div>
                </div>

                {/* 4. Tendencia de Evolución */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Evolución / Tendencia</span>
                    <Flame className="w-3.5 h-3.5 text-rose-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black flex items-center space-x-1">
                    {metricsState.improvementPct > 0 ? (
                      <span className="text-emerald-400 flex items-center">
                        <ArrowUpRight className="w-6 h-6 inline" />
                        +{metricsState.improvementPct}%
                      </span>
                    ) : metricsState.improvementPct < 0 ? (
                      <span className="text-rose-400 flex items-center">
                        <ArrowDownRight className="w-6 h-6 inline" />
                        {metricsState.improvementPct}%
                      </span>
                    ) : (
                      <span className="text-slate-300 text-xl font-bold">Estable</span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    {metricsState.totalExams} {metricsState.totalExams === 1 ? 'simulacro realizado' : 'simulacros realizados'}
                  </div>
                </div>

              </div>

              {/* Lista compacta de últimos intentos */}
              {metricsState.history && metricsState.history.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
                    <span className="flex items-center space-x-1.5">
                      <History className="w-3.5 h-3.5 text-slate-400" />
                      <span>Historial de Últimos Intentos:</span>
                    </span>
                    <span>Mostrando {Math.min(5, metricsState.history.length)} de {metricsState.history.length}</span>
                  </div>

                  <div className="space-y-2">
                    {metricsState.history.slice(0, 5).map((entry, idx) => (
                      <div 
                        key={entry.id || idx}
                        className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs"
                      >
                        <div className="flex items-center space-x-3">
                          <span className={`w-8 h-8 rounded-lg font-black text-xs flex items-center justify-center border ${
                            entry.percentage >= 80 
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                              : entry.percentage >= 60 
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' 
                              : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          }`}>
                            {entry.score}
                          </span>
                          <div>
                            <span className="font-bold text-slate-200 block text-xs sm:text-sm">
                              {entry.correctCount} / {entry.total} Correctas ({entry.percentage}%)
                            </span>
                            <span className="text-[11px] text-slate-400">{entry.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 text-slate-400 text-right">
                          <div>
                            <span className="font-mono text-slate-300 block">{entry.timeSpentFormatted || '--:--'}</span>
                            <span className="text-[10px] text-slate-500">{entry.avgTimePerQuestion || 0}s / preg</span>
                          </div>
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase border ${
                            entry.percentage >= 80 
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                              : entry.percentage >= 60 
                              ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' 
                              : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          }`}>
                            {entry.gradeStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto text-brand-400">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-200 text-sm">Aún no tienes exámenes registrados</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Completa tu primer simulacro abajo. El sistema medirá automáticamente tu velocidad de respuesta, porcentaje de aciertos y evolución de notas para el parcial.
              </p>
            </div>
          )}
        </div>

        {/* Config Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl border border-slate-800">
          
          {/* Opción 1: Cantidad de preguntas */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-brand-400" />
                <span>1. Cantidad de Preguntas</span>
              </label>
              <span className="text-xs text-slate-400">Banco total: +40 preguntas</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { val: 10, label: '10 Preguntas', sub: 'Práctica Rápida (~8 min)' },
                { val: 20, label: '20 Preguntas', sub: 'Formato Estándar (~15 min)' },
                { val: 30, label: '30 Preguntas', sub: 'Examen Completo (~25 min)' },
                { val: 'all', label: 'Todas (+40)', sub: 'Maratón de Estudio' },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  id={`btn-qcount-${item.val}`}
                  onClick={() => {
                    soundManager.playClick();
                    setQuestionCount(item.val);
                  }}
                  className={`p-4 rounded-xl text-left border transition-all duration-200 ${
                    questionCount === item.val
                      ? 'bg-brand-600/20 border-brand-500 text-white shadow-lg shadow-brand-500/10 ring-2 ring-brand-500/30'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="font-bold text-base text-slate-100 flex items-center justify-between">
                    <span>{item.label}</span>
                    {questionCount === item.val && (
                      <Check className="w-4 h-4 text-brand-400" />
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Opción 2: Temporizador */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
                <Clock className="w-4 h-4 text-cyanBrand-400" />
                <span>2. Tiempo Límite / Temporizador</span>
              </label>
              <span className="text-xs text-slate-400">Control de velocidad</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {[
                { val: 5, label: '5 Min' },
                { val: 10, label: '10 Min' },
                { val: 20, label: '20 Min' },
                { val: 38, label: '38 Min (UTN)' },
                { val: 0, label: 'Sin Tiempo' },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  id={`btn-timer-${item.val}`}
                  onClick={() => {
                    soundManager.playClick();
                    setTimerMinutes(item.val);
                  }}
                  className={`py-3 px-3 rounded-xl text-center border font-semibold text-sm transition-all duration-200 ${
                    timerMinutes === item.val
                      ? 'bg-cyanBrand-500/20 border-cyanBrand-400 text-cyan-300 shadow-md ring-2 ring-cyanBrand-500/20'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Opción 3: Modo de Examen */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>3. Modo de Evaluación</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                id="btn-mode-exam"
                onClick={() => {
                  soundManager.playClick();
                  setExamMode('exam');
                }}
                className={`p-4 rounded-xl text-left border transition-all ${
                  examMode === 'exam'
                    ? 'bg-brand-600/20 border-brand-500 ring-2 ring-brand-500/30'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-slate-100">
                  <span className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-brand-400" />
                    <span>Simulacro Formal</span>
                  </span>
                  {examMode === 'exam' && <Check className="w-4 h-4 text-brand-400" />}
                </div>
                <p className="text-xs text-slate-400 mt-1.5">
                  Respuestas ocultas hasta el final. Genera calificación en escala UTN (0-10) y desglose por temas al entregar.
                </p>
              </button>

              <button
                type="button"
                id="btn-mode-practice"
                onClick={() => {
                  soundManager.playClick();
                  setExamMode('practice');
                }}
                className={`p-4 rounded-xl text-left border transition-all ${
                  examMode === 'practice'
                    ? 'bg-brand-600/20 border-brand-500 ring-2 ring-brand-500/30'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-slate-100">
                  <span className="flex items-center space-x-2">
                    <CheckCheck className="w-4 h-4 text-cyanBrand-400" />
                    <span>Práctica con Feedback Inmediato</span>
                  </span>
                  {examMode === 'practice' && <Check className="w-4 h-4 text-brand-400" />}
                </div>
                <p className="text-xs text-slate-400 mt-1.5">
                  Verifica cada respuesta al instante con colores verde/rojo y explicación gramatical detallada mientras avanzas.
                </p>
              </button>
            </div>
          </div>

          {/* Temas Incluidos */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Temas Evaluados en este Simulacro:
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                'Presente Simple (Afirmativo/Negativo/Preguntas)',
                'Presente Continuo (-ing, reglas y excepciones)',
                'Simple Present vs Present Continuous (Contraste)',
                'Pasado Simple (Regulares -ed e Irregulares)',
                'Vocabulario IT & Roles (Clase 2)',
                'Saludos Formales e Informales (Clase 2)',
                'Historia de Apollo 11 & Margaret Hamilton (Clase 5)',
                'Historia de Google, Sergey Brin & Larry Page (Clase 6)',
                'Vocabulario Empresarial IT (Clase 6)',
                'Adverbios de Frecuencia (Clase 1)'
              ].map((t, idx) => (
                <span key={idx} className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button
            id="btn-start-exam"
            type="button"
            onClick={handleStartExam}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-600 via-indigo-600 to-cyanBrand-600 hover:from-brand-500 hover:to-cyanBrand-500 text-white font-extrabold text-base shadow-xl shadow-brand-500/25 flex items-center justify-center space-x-2 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Comenzar Simulacro de Examen</span>
          </button>

        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // PANTALLA 2: EXAMEN ACTIVO
  // --------------------------------------------------------------------------
  if (gameState === 'active' && currentQ) {
    const isAnswered = userAnswers[currentQ.id] !== undefined;
    const isFlagged = flaggedQuestions.has(currentQ.id);
    const isInstant = examMode === 'practice';
    const isChecked = instantChecked[currentQ.id];
    const isTimeCritical = secondsRemaining !== null && secondsRemaining < 120;
    const answeredCount = Object.keys(userAnswers).length;

    return (
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
        
        {/* Top Control Bar */}
        <div className="glass-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg border border-slate-800">
          
          {/* Progress badge */}
          <div className="flex items-center space-x-3">
            <span className="font-extrabold text-slate-100 text-sm sm:text-base">
              Pregunta {currentIndex + 1} de {currentQuestions.length}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {answeredCount} / {currentQuestions.length} respondidas
            </span>
          </div>

          {/* Timer & Flag & Finish */}
          <div className="flex items-center space-x-3">
            
            {/* Timer */}
            {secondsRemaining !== null ? (
              <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-mono font-bold text-sm border ${
                isTimeCritical
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                  : 'bg-slate-900 text-cyan-300 border-slate-700'
              }`}>
                <Clock className="w-4 h-4" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-900 text-slate-400 border border-slate-800 text-xs font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>Modo Libre</span>
              </div>
            )}

            {/* Flag Button */}
            <button
              id="btn-flag-question"
              onClick={() => toggleFlag(currentQ.id)}
              title={isFlagged ? 'Quitar marca' : 'Marcar para revisar luego'}
              className={`p-2 rounded-xl border transition-colors ${
                isFlagged
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Flag className={`w-4 h-4 ${isFlagged ? 'fill-current' : ''}`} />
            </button>

            {/* Finish Button */}
            <button
              id="btn-finish-exam-early"
              onClick={() => handleFinishExam(false)}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold border border-rose-500/50 shadow transition-colors"
            >
              Entregar Examen
            </button>
          </div>

        </div>

        {/* Question Progress Bar */}
        <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
          <div 
            className="bg-gradient-to-r from-brand-500 to-cyanBrand-400 h-2 transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / currentQuestions.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-800">
          
          {/* Question Metadata */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg bg-brand-500/10 text-brand-400 border border-brand-500/20">
              {currentQ.topic}
            </span>
            <span className="text-xs text-slate-500">
              {currentQ.source || 'Primer Parcial UTN'}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 leading-relaxed">
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt) => {
              const isSelected = userAnswers[currentQ.id] === opt.id;
              
              // Color de feedback en modo práctica verificado
              let optionStyle = 'bg-slate-900/60 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-850';
              
              if (isInstant && isChecked) {
                if (opt.id === currentQ.correctAnswer) {
                  optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/30';
                } else if (isSelected && opt.id !== currentQ.correctAnswer) {
                  optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-200 ring-2 ring-rose-500/30';
                } else {
                  optionStyle = 'bg-slate-900/30 border-slate-850 text-slate-500 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'bg-brand-600/20 border-brand-500 text-white ring-2 ring-brand-500/30 shadow-md';
              }

              return (
                <button
                  key={opt.id}
                  id={`opt-${opt.id}`}
                  disabled={isInstant && isChecked}
                  onClick={() => handleSelectOption(currentQ.id, opt.id)}
                  className={`w-full p-4 rounded-xl text-left border flex items-center justify-between transition-all duration-150 ${optionStyle}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs uppercase border ${
                      isSelected
                        ? 'bg-brand-500 text-white border-brand-400'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {opt.id}
                    </span>
                    <span className="font-medium text-sm sm:text-base">
                      {opt.text}
                    </span>
                  </div>

                  {/* Feedback icon in practice mode */}
                  {isInstant && isChecked && (
                    <div>
                      {opt.id === currentQ.correctAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      )}
                      {isSelected && opt.id !== currentQ.correctAnswer && (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation in Practice Mode */}
          {isInstant && (
            <div className="pt-2">
              {!isChecked ? (
                <button
                  id="btn-verify-answer"
                  disabled={!isAnswered}
                  onClick={() => handleCheckInstant(currentQ.id)}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                    isAnswered
                      ? 'bg-cyanBrand-600 hover:bg-cyanBrand-500 text-white shadow-lg shadow-cyanBrand-600/25'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Comprobar Respuesta Ahora
                </button>
              ) : (
                <div className={`p-4 rounded-xl border text-sm space-y-2 animate-fade-in ${
                  userAnswers[currentQ.id] === currentQ.correctAnswer
                    ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                }`}>
                  <div className="flex items-center space-x-2 font-bold">
                    {userAnswers[currentQ.id] === currentQ.correctAnswer ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>¡Respuesta Correcta!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span>Respuesta Incorrecta</span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    <strong className="text-white">Explicación: </strong>
                    {currentQ.explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            
            {/* Previous */}
            <button
              id="btn-prev-question"
              disabled={currentIndex === 0}
              onClick={() => {
                soundManager.playClick();
                setCurrentIndex(prev => Math.max(0, prev - 1));
              }}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm border transition-colors ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-900 border-slate-800 text-slate-600'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            {/* Next or Finish */}
            {currentIndex < currentQuestions.length - 1 ? (
              <button
                id="btn-next-question"
                onClick={() => {
                  soundManager.playClick();
                  setCurrentIndex(prev => prev + 1);
                }}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/25 transition-all"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="btn-finish-exam-last"
                onClick={() => handleFinishExam(false)}
                className="flex items-center space-x-2 px-6 py-2.5 rounded-xl font-extrabold text-sm bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-lg shadow-emerald-500/25 transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Finalizar y Ver Scoring</span>
              </button>
            )}

          </div>

        </div>

        {/* Question Palette / Grid Navigator */}
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>Navegador de Preguntas:</span>
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-500 inline-block"></span>
                <span>Respondida</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                <span>Marcada</span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {currentQuestions.map((q, idx) => {
              const isCurr = idx === currentIndex;
              const isAns = userAnswers[q.id] !== undefined;
              const isFlg = flaggedQuestions.has(q.id);

              let btnClass = 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700';
              if (isCurr) {
                btnClass = 'bg-cyanBrand-500 text-slate-950 font-extrabold border-cyan-400 shadow-md ring-2 ring-cyanBrand-400/40';
              } else if (isFlg) {
                btnClass = 'bg-amber-500/20 text-amber-300 border-amber-500/50';
              } else if (isAns) {
                btnClass = 'bg-brand-600/30 text-brand-300 border-brand-500/40';
              }

              return (
                <button
                  key={q.id}
                  id={`nav-q-${idx + 1}`}
                  onClick={() => {
                    soundManager.playClick();
                    setCurrentIndex(idx);
                  }}
                  className={`w-9 h-9 rounded-lg font-bold text-xs border transition-all ${btnClass}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    );
  }

  // --------------------------------------------------------------------------
  // PANTALLA 3: RESULTADOS Y SCORING INTEGRAL
  // --------------------------------------------------------------------------
  if (gameState === 'results' && stats) {
    const filteredReviewQuestions = currentQuestions.filter(q => {
      const isCorrect = userAnswers[q.id] === q.correctAnswer;
      if (resultsFilter === 'correct') return isCorrect;
      if (resultsFilter === 'incorrect') return !isCorrect;
      return true;
    });

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
        
        {/* Main Score Header Banner */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-800 text-center space-y-6 shadow-2xl relative overflow-hidden">
          
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyanBrand-500/20 rounded-full blur-3xl pointer-events-none"></div>

          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-sm"
               style={{}}
          >
            <span className={`px-3 py-1 rounded-full border ${stats.gradeStatus.color}`}>
              {stats.gradeStatus.label}
            </span>
          </div>

          {/* Score Numbers */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <div className="space-y-1">
              <div className="text-5xl sm:text-7xl font-black bg-gradient-to-r from-brand-400 via-indigo-200 to-cyan-400 bg-clip-text text-transparent tracking-tight">
                {stats.score}
                <span className="text-2xl sm:text-3xl text-slate-500 font-bold"> / 10</span>
              </div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Calificación UTN</p>
            </div>

            <div className="h-12 w-px bg-slate-800 hidden sm:block"></div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-black text-slate-100 tracking-tight">
                {stats.percentage}%
              </div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                {stats.correctCount} de {stats.total} Aciertos
              </p>
            </div>
          </div>

          <p className="text-slate-300 max-w-xl mx-auto text-sm leading-relaxed">
            {stats.gradeStatus.desc}
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-2">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Tiempo Empleado</span>
              <span className="font-mono font-bold text-slate-100 text-sm sm:text-base">{stats.timeSpent}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Promedio x Pregunta</span>
              <span className="font-mono font-bold text-slate-100 text-sm sm:text-base">{stats.avgTimePerQuestion}s</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-[11px] text-slate-400 block">Efectividad</span>
              <span className="font-bold text-cyanBrand-400 text-sm sm:text-base">{stats.percentage >= 60 ? 'Aprobatorio' : 'A reforzar'}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              id="btn-retry-exam"
              onClick={handleStartExam}
              className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-sm shadow-lg shadow-brand-500/25 flex items-center space-x-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reintentar este Examen</span>
            </button>
            <button
              id="btn-new-exam-setup"
              onClick={() => {
                soundManager.playClick();
                setGameState('setup');
              }}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-cyanBrand-400" />
              <span>Configurar Nuevo Simulacro</span>
            </button>
          </div>

        </div>

        {/* Breakdown by Topic */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="font-bold text-slate-100 text-base flex items-center space-x-2">
            <BarChart2 className="w-5 h-5 text-brand-400" />
            <span>Desglose de Rendimiento por Tema</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(stats.topicStats).map(([topic, data]) => {
              const pct = Math.round((data.correct / data.total) * 100);
              return (
                <div key={topic} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-200">{topic}</span>
                    <span className="text-slate-400 font-mono">{data.correct}/{data.total} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        pct >= 80 ? 'bg-emerald-400' : pct >= 60 ? 'bg-cyan-400' : 'bg-rose-400'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Evolución vs Promedio Histórico */}
        {metricsState.hasData && (
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-100 text-base flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-cyanBrand-400" />
                <span>Evolución vs. Tu Promedio Histórico</span>
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                {metricsState.totalExams} {metricsState.totalExams === 1 ? 'intento' : 'intentos'} en total
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Comparación de Nota */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                <span className="text-xs text-slate-400 block font-semibold">Nota en este Examen</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-black text-slate-100">{stats.score}</span>
                  <span className="text-xs text-slate-500">vs prom {metricsState.avgScore}</span>
                </div>
                <div className="text-[11px] font-bold">
                  {Number(stats.score) > Number(metricsState.avgScore) ? (
                    <span className="text-emerald-400 flex items-center">
                      <ArrowUpRight className="w-3.5 h-3.5 mr-0.5 inline" />
                      +{(Number(stats.score) - Number(metricsState.avgScore)).toFixed(1)} pts superior a tu promedio
                    </span>
                  ) : Number(stats.score) < Number(metricsState.avgScore) ? (
                    <span className="text-rose-400 flex items-center">
                      <ArrowDownRight className="w-3.5 h-3.5 mr-0.5 inline" />
                      -{(Number(metricsState.avgScore) - Number(stats.score)).toFixed(1)} pts debajo de tu promedio
                    </span>
                  ) : (
                    <span className="text-cyan-400">Igual a tu promedio histórico</span>
                  )}
                </div>
              </div>

              {/* Comparación de Velocidad */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                <span className="text-xs text-slate-400 block font-semibold">Velocidad x Pregunta</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-black text-cyan-300 font-mono">{stats.avgTimePerQuestion}s</span>
                  <span className="text-xs text-slate-500">vs prom {metricsState.avgSpeed}s</span>
                </div>
                <div className="text-[11px] font-bold">
                  {stats.avgTimePerQuestion < metricsState.avgSpeed ? (
                    <span className="text-emerald-400 flex items-center">
                      <ArrowUpRight className="w-3.5 h-3.5 mr-0.5 inline" />
                      {metricsState.avgSpeed - stats.avgTimePerQuestion}s más rápido que tu promedio
                    </span>
                  ) : stats.avgTimePerQuestion > metricsState.avgSpeed ? (
                    <span className="text-amber-400 flex items-center">
                      <ArrowDownRight className="w-3.5 h-3.5 mr-0.5 inline" />
                      Resolución más pausada y reflexiva
                    </span>
                  ) : (
                    <span className="text-cyan-400">Ritmo idéntico a tu media</span>
                  )}
                </div>
              </div>

              {/* Récord Personal */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                <span className="text-xs text-slate-400 block font-semibold">Récord Personal</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-black text-amber-300">{metricsState.bestScore}</span>
                  <span className="text-xs text-slate-500">/10 récord</span>
                </div>
                <div className="text-[11px] font-bold text-slate-400">
                  {Number(stats.score) >= Number(metricsState.bestScore) ? (
                    <span className="text-amber-400 flex items-center">
                      <Flame className="w-3.5 h-3.5 mr-0.5 inline" />
                      ¡Nuevo récord o máxima nota alcanzada!
                    </span>
                  ) : (
                    <span>A {(Number(metricsState.bestScore) - Number(stats.score)).toFixed(1)} pts de tu récord personal</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Question Review */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-100 text-lg">Revisión Detallada de Respuestas</h3>
              <p className="text-xs text-slate-400">Consulta las correcciones y la fundamentación gramatical de cada ítem.</p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center space-x-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
              {[
                { id: 'all', label: `Todas (${currentQuestions.length})` },
                { id: 'incorrect', label: `Incorrectas (${stats.total - stats.correctCount})` },
                { id: 'correct', label: `Correctas (${stats.correctCount})` },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => {
                    soundManager.playClick();
                    setResultsFilter(f.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    resultsFilter === f.id
                      ? 'bg-brand-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* List of Questions */}
          <div className="space-y-4">
            {filteredReviewQuestions.map((q, idx) => {
              const userAns = userAnswers[q.id];
              const isCorrect = userAns === q.correctAnswer;
              const selectedOpt = q.options.find(o => o.id === userAns);
              const correctOpt = q.options.find(o => o.id === q.correctAnswer);

              return (
                <div 
                  key={q.id}
                  className={`p-5 rounded-xl border space-y-3 transition-all ${
                    isCorrect
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : 'bg-rose-950/20 border-rose-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {q.topic}
                    </span>
                    <span className={`flex items-center space-x-1 text-xs font-extrabold ${
                      isCorrect ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Correcta</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" />
                          <span>Incorrecta</span>
                        </>
                      )}
                    </span>
                  </div>

                  <p className="font-bold text-slate-100 text-base">
                    {q.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className={`p-2.5 rounded-lg border ${
                      isCorrect ? 'bg-emerald-900/30 border-emerald-500/40 text-emerald-200' : 'bg-rose-900/30 border-rose-500/40 text-rose-200'
                    }`}>
                      <span className="font-semibold block text-[10px] uppercase opacity-75">Tu Respuesta:</span>
                      <span>{selectedOpt ? `(${selectedOpt.id.toUpperCase()}) ${selectedOpt.text}` : 'No respondida'}</span>
                    </div>

                    {!isCorrect && (
                      <div className="p-2.5 rounded-lg bg-emerald-900/30 border border-emerald-500/40 text-emerald-200">
                        <span className="font-semibold block text-[10px] uppercase opacity-75">Respuesta Correcta:</span>
                        <span>({correctOpt.id.toUpperCase()}) {correctOpt.text}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                    <strong className="text-slate-100">Fundamentación: </strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    );
  }

  return null;
}
