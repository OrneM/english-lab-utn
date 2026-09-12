// Sistema de persistencia de métricas y evolución de rendimiento
// Almacena el historial de simulacros de examen y prácticas de Arthur en localStorage

const STORAGE_KEY_EXAMS = 'englishlab_exam_history_v1';
const STORAGE_KEY_ARTHUR = 'englishlab_arthur_stats_v1';

export function getExamHistory() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EXAMS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error reading exam history:", e);
    return [];
  }
}

export function saveExamResult(result) {
  if (typeof window === 'undefined') return;
  try {
    const history = getExamHistory();
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      score: Number(result.score),
      percentage: Number(result.percentage),
      correctCount: result.correctCount,
      total: result.total,
      timeSpentSeconds: result.timeSpentSeconds,
      timeSpentFormatted: result.timeSpent,
      avgTimePerQuestion: result.avgTimePerQuestion,
      topicStats: result.topicStats,
      gradeStatus: result.gradeStatus?.label || 'Completado'
    };

    // Mantener los últimos 25 intentos
    const updated = [newEntry, ...history].slice(0, 25);
    localStorage.setItem(STORAGE_KEY_EXAMS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Error saving exam result:", e);
  }
}

export function getEvolutionMetrics() {
  const history = getExamHistory();
  if (history.length === 0) {
    return {
      totalExams: 0,
      avgScore: 0,
      bestScore: 0,
      avgSpeed: 0,
      improvementPct: 0,
      hasData: false,
      history: []
    };
  }

  const totalExams = history.length;
  const avgScore = (history.reduce((acc, h) => acc + h.score, 0) / totalExams).toFixed(1);
  const bestScore = Math.max(...history.map(h => h.score)).toFixed(1);
  const avgSpeed = Math.round(history.reduce((acc, h) => acc + (h.avgTimePerQuestion || 0), 0) / totalExams);

  // Calcular tendencia de mejora (último intento vs primer intento histórico)
  let improvementPct = 0;
  if (totalExams >= 2) {
    const newest = history[0].percentage;
    const oldest = history[history.length - 1].percentage;
    improvementPct = newest - oldest;
  }

  return {
    totalExams,
    avgScore,
    bestScore,
    avgSpeed,
    improvementPct,
    hasData: true,
    history
  };
}

export function clearExamHistory() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY_EXAMS);
  } catch (e) {}
}
