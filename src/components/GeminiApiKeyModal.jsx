import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Key, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  ShieldCheck, 
  Trash2,
  RefreshCw,
  Zap,
  Bot
} from 'lucide-react';
import { 
  getGeminiApiKey, 
  setGeminiApiKey, 
  testGeminiApiKey 
} from '../utils/geminiService';
import { soundManager } from '../utils/soundEffects';

export function GeminiApiKeyModal({ isOpen, onClose, onKeyUpdated }) {
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null); // { success: boolean, message: string }
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const current = getGeminiApiKey();
      setApiKeyInput(current || '');
      setTestResult(null);
      setIsSaved(Boolean(current));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = async () => {
    soundManager.playClick();
    const cleanKey = apiKeyInput.trim();
    
    if (!cleanKey) {
      setGeminiApiKey('');
      setIsSaved(false);
      setTestResult({ success: true, message: 'Se eliminó la API Key. El sistema volverá al motor local offline.' });
      if (onKeyUpdated) onKeyUpdated(false);
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    const test = await testGeminiApiKey(cleanKey);
    setIsTesting(false);
    setTestResult(test);

    if (test.success) {
      setGeminiApiKey(cleanKey);
      setIsSaved(true);
      soundManager.playCorrect();
      if (onKeyUpdated) onKeyUpdated(true);
    } else {
      soundManager.playIncorrect();
    }
  };

  const handleRemove = () => {
    soundManager.playClick();
    setGeminiApiKey('');
    setApiKeyInput('');
    setIsSaved(false);
    setTestResult({ success: true, message: 'API Key removida exitosamente.' });
    if (onKeyUpdated) onKeyUpdated(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-brand-500/30 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden animate-slide-up">
        
        {/* Glow ambient background */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-500/10 dark:bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyanBrand-500/10 dark:bg-cyanBrand-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-brand-50 dark:bg-gradient-to-br dark:from-brand-500/20 dark:to-cyanBrand-500/20 border border-brand-200 dark:border-brand-500/30 text-brand-600 dark:text-brand-300">
              <Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyanBrand-400 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                <span>Google Gemini AI</span>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30">
                  Gratuito
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Preguntas inéditas y Arthur con IA en tiempo real</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Benefits Box */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
          <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px] block text-brand-700 dark:text-cyanBrand-400">
            ¿Qué desbloqueas con Gemini AI?
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <div className="flex items-start space-x-2">
              <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <span><strong>Generación Ilimitada:</strong> Crea preguntas nunca antes vistas para el simulacro.</span>
            </div>
            <div className="flex items-start space-x-2">
              <Bot className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
              <span><strong>Arthur Inteligente:</strong> Responde dudas espontáneas y traduce oraciones enteras.</span>
            </div>
          </div>
        </div>

        {/* Input & Action */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center space-x-1.5">
              <Key className="w-3.5 h-3.5 text-brand-600 dark:text-cyanBrand-400" />
              <span>Tu Google Gemini API Key</span>
            </span>
            {isSaved && (
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Activa y Guardada</span>
              </span>
            )}
          </label>

          <div className="relative">
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="Pega tu clave AIzaSy..."
              className="w-full py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:border-brand-500 dark:focus:border-cyanBrand-400 focus:ring-1 focus:ring-brand-500 text-slate-900 dark:text-slate-100 font-mono text-xs sm:text-sm placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          {/* Test / Feedback message */}
          {testResult && (
            <div className={`p-3 rounded-xl border text-xs flex items-center space-x-2 animate-fade-in ${
              testResult.success 
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300' 
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-500/30 text-rose-800 dark:text-rose-300'
            }`}>
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0" />
              )}
              <span className="leading-snug">{testResult.message}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 pt-1">
            <button
              onClick={handleSave}
              disabled={isTesting}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 via-indigo-600 to-cyanBrand-600 hover:from-brand-500 hover:to-cyanBrand-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-brand-500/25 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
            >
              {isTesting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span className="text-white">Verificando Clave...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span className="text-white">Guardar y Activar Gemini</span>
                </>
              )}
            </button>

            {isSaved && (
              <button
                onClick={handleRemove}
                title="Quitar API Key"
                className="p-3 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 hover:bg-rose-100 dark:hover:bg-rose-950/40 hover:border-rose-300 dark:hover:border-rose-500/40 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 3-Step Guide to Get a Free Key */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800/90 space-y-2.5 text-xs">
          <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-bold">
            <span className="flex items-center space-x-1.5 text-slate-800 dark:text-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>¿Cómo obtener tu clave gratuita (30 seg)?</span>
            </span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 dark:text-cyanBrand-400 hover:text-brand-700 dark:hover:text-cyanBrand-300 flex items-center space-x-1 font-semibold"
            >
              <span>Google AI Studio</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <ol className="list-decimal list-inside space-y-1.5 text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
            <li>Ingresa gratis a <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-cyanBrand-400 underline">aistudio.google.com</a> con tu cuenta de Google.</li>
            <li>Haz clic en el botón azul <strong>«Create API Key»</strong>.</li>
            <li>Copia la clave generada (comienza con <code>AIzaSy...</code>) y pégala en el campo de arriba.</li>
          </ol>

          <p className="text-[10px] text-slate-500 italic pt-1 border-t border-slate-200 dark:border-slate-800/60">
            🔒 Tu clave se almacena exclusivamente de forma local en tu navegador y nunca es compartida con terceros.
          </p>
        </div>

      </div>
    </div>
  );
}
