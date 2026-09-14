import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Volume2, 
  Square,
  RotateCcw, 
  HelpCircle,
  Languages,
  Zap,
  Bot,
  Move
} from 'lucide-react';
import { ArthurAvatar } from './ArthurAvatar';
import { getArthurResponse } from '../utils/arthurBrain';
import { askArthurWithGemini, hasGeminiApiKey } from '../utils/geminiService';
import { soundManager } from '../utils/soundEffects';

export function ArthurChatBot({ onOpenGeminiModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAi, setHasAi] = useState(() => hasGeminiApiKey());
  
  // Posición flotante del avatar de Arthur (arrastrable con el mouse o táctil)
  const [position, setPosition] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('englishlab_arthur_pos_v2');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed.x === 'number' && typeof parsed.y === 'number') {
            return {
              x: Math.max(16, Math.min(parsed.x, window.innerWidth - 80)),
              y: Math.max(80, Math.min(parsed.y, window.innerHeight - 80))
            };
          }
        }
      } catch (e) {}
      return {
        x: Math.max(16, window.innerWidth - 84),
        y: Math.max(80, window.innerHeight - 84)
      };
    }
    return { x: 300, y: 600 };
  });

  const [isDragging, setIsDragging] = useState(false);
  const dragInfoRef = useRef({
    startX: 0,
    startY: 0,
    elemStartX: 0,
    elemStartY: 0,
    hasMoved: false
  });

  // Reajustar posición si se redimensiona la ventana
  useEffect(() => {
    const handleResize = () => {
      setPosition(prev => ({
        x: Math.max(16, Math.min(window.innerWidth - 80, prev.x)),
        y: Math.max(80, Math.min(window.innerHeight - 80, prev.y))
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [messages, setMessages] = useState([
    {
      sender: 'arthur',
      text: "¡Hola! Soy **Arthur**, tu tutor virtual de inglés técnico. 🎩✨\n\nPuedo ayudarte con **traducciones de palabras y términos IT**, explicarte **gramática** (Presente Simple, Continuo, Pasado Simple, verbos irregulares) o ponerte a prueba con ejercicios. ¿En qué te ayudo hoy?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedQuestions: [
        "Traducir 'software developer' o 'debug'",
        "¿Qué significa 'step down' o 'raise money'?",
        "¿Cuándo uso Present Simple vs Continuous?",
        "Dame un ejercicio de práctica"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showGreetingBadge, setShowGreetingBadge] = useState(true);

  // Estado del reproductor de voz
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMessageIdx, setSpeakingMessageIdx] = useState(null);

  const messagesEndRef = useRef(null);

  // Actualizar estado de IA cuando se abre el chat
  useEffect(() => {
    if (isOpen) {
      setHasAi(hasGeminiApiKey());
    }
  }, [isOpen]);

  // Manejar el arrastre con el mouse / touch
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;

    dragInfoRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      elemStartX: position.x,
      elemStartY: position.y,
      hasMoved: false
    };

    const handlePointerMove = (moveEvent) => {
      const dx = moveEvent.clientX - dragInfoRef.current.startX;
      const dy = moveEvent.clientY - dragInfoRef.current.startY;

      if (!dragInfoRef.current.hasMoved && Math.hypot(dx, dy) > 4) {
        dragInfoRef.current.hasMoved = true;
        setIsDragging(true);
      }

      if (dragInfoRef.current.hasMoved) {
        const newX = Math.max(16, Math.min(window.innerWidth - 80, dragInfoRef.current.elemStartX + dx));
        const newY = Math.max(80, Math.min(window.innerHeight - 80, dragInfoRef.current.elemStartY + dy));
        setPosition({ x: newX, y: newY });
      }
    };

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      
      if (dragInfoRef.current.hasMoved) {
        setTimeout(() => setIsDragging(false), 50);
        setPosition(finalPos => {
          try {
            localStorage.setItem('englishlab_arthur_pos_v2', JSON.stringify(finalPos));
          } catch (e) {}
          return finalPos;
        });
      } else {
        setIsDragging(false);
        soundManager.playClick();
        setIsOpen(prev => !prev);
        setShowGreetingBadge(false);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  // Auto scroll al último mensaje
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Detener voz al desmontar o cerrar chat
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    soundManager.playClick();

    // Mensaje del usuario
    const userMsg = {
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInputValue('');
    setIsTyping(true);

    // Detener cualquier audio previo
    handleStopSpeech();

    try {
      let response = null;

      // Intentar primero con Gemini AI si hay clave
      if (hasGeminiApiKey()) {
        response = await askArthurWithGemini(text, nextHistory);
      }

      // Si no hay clave de Gemini o falló la consulta, usar motor local
      if (!response) {
        response = getArthurResponse(text);
      }

      soundManager.playClick();
      
      const arthurMsg = {
        sender: 'arthur',
        text: response.text,
        suggestedQuestions: response.suggestedQuestions,
        isAI: Boolean(response.isAI),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, arthurMsg]);
    } catch (err) {
      console.error("Error generating response:", err);
      const fallback = getArthurResponse(text);
      setMessages(prev => [...prev, {
        sender: 'arthur',
        text: fallback.text,
        suggestedQuestions: fallback.suggestedQuestions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    soundManager.playClick();
    handleStopSpeech();
    setMessages([
      {
        sender: 'arthur',
        text: "¡Conversación reiniciada! ¿En qué otra duda, traducción o ejercicio de inglés técnico te puedo colaborar? 🎩",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: [
          "Traducir 'database' o 'server farm'",
          "Reglas de 3ra persona (-s, -es, -ies)",
          "¿Cómo se formula una pregunta con 'didn't'?",
          "Ponme a prueba con un ejercicio"
        ]
      }
    ]);
  };

  // Función de Text to Speech para pronunciar inglés en voz alta con botón de STOP
  const handleSpeakText = (text, idx) => {
    if (!('speechSynthesis' in window)) return;

    // Si ya está reproduciendo este mismo mensaje, detenerlo (toggle stop)
    if (isSpeaking && speakingMessageIdx === idx) {
      handleStopSpeech();
      return;
    }

    soundManager.playClick();
    window.speechSynthesis.cancel();

    // Limpiar caracteres especiales de markdown para pronunciación natural
    const cleanText = text
      .replace(/[*#`•]/g, '')
      .replace(/🎩|✨|💻|⚠️|✅|❌|💬|📌|💡|🇬🇧|🇪🇸/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Configurar voz natural (preferentemente en-US)
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setSpeakingMessageIdx(idx);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingMessageIdx(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingMessageIdx(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleStopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingMessageIdx(null);
    }
  };

  // Renderizar texto formateado simple con soporte para negrita, código y cursiva
  const renderFormattedText = (rawText) => {
    const lines = rawText.split('\n');
    return (
      <div className="space-y-1.5 leading-relaxed text-xs sm:text-sm">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;

          const parts = line.split(/(\*\*.*?\*\*|`.*?`|\*.*?\*)/g);

          return (
            <p key={idx} className="text-slate-900 dark:text-slate-100">
              {parts.map((part, pIdx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={pIdx} className="font-extrabold text-slate-950 dark:text-white">{part.slice(2, -2)}</strong>;
                }
                if (part.startsWith('`') && part.endsWith('`')) {
                  return <code key={pIdx} className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-brand-700 dark:text-cyan-300 font-mono text-[11px] border border-slate-300 dark:border-slate-700">{part.slice(1, -1)}</code>;
                }
                if (part.startsWith('*') && part.endsWith('*')) {
                  return <em key={pIdx} className="text-slate-700 dark:text-slate-300 italic">{part.slice(1, -1)}</em>;
                }
                return part;
              })}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* BOTÓN FLOTANTE ARRASTRABLE (TRIGGER) */}
      <div 
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          touchAction: 'none'
        }}
        className="fixed z-50 flex items-center select-none"
      >
        {/* Tooltip / Greeting Badge cuando está cerrado y no se arrastra */}
        {!isOpen && showGreetingBadge && !isDragging && (
          <div 
            onClick={() => {
              setIsOpen(true);
              setShowGreetingBadge(false);
            }}
            className={`hidden sm:flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-brand-500/40 shadow-2xl backdrop-blur-md cursor-pointer hover:border-brand-400 animate-slide-up ${
              position.x > (typeof window !== 'undefined' ? window.innerWidth / 2 : 500)
                ? 'mr-3 -translate-x-full'
                : 'ml-16'
            }`}
            style={{ position: 'absolute' }}
          >
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyanBrand-400 animate-pulse" />
            <span className="text-xs font-semibold whitespace-nowrap">¿Dudas o traducir? ¡Pregúntale a <strong className="text-slate-950 dark:text-white">Arthur</strong>!</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowGreetingBadge(false);
              }}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 pl-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Floating Action Button Draggable */}
        <div
          id="btn-arthur-toggle"
          onPointerDown={handlePointerDown}
          className={`relative group focus:outline-none transition-transform duration-150 ${
            isDragging 
              ? 'cursor-grabbing scale-110 shadow-2xl ring-4 ring-cyanBrand-400/50' 
              : 'cursor-grab hover:scale-105 active:scale-95'
          }`}
          title="Arrastra con el mouse a cualquier lugar de la pantalla o haz clic para abrir"
        >
          {/* Avatar Icon */}
          <ArthurAvatar size="md" className="ring-2 ring-brand-400/40 shadow-2xl" />
          
          {/* Online green indicator */}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 shadow"></span>
          
          {/* Drag handle icon hint on hover */}
          <span className="absolute -top-1.5 -right-1.5 p-1 rounded-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm pointer-events-none">
            <Move className="w-2.5 h-2.5" />
          </span>
        </div>
      </div>

      {/* VENTANA DE CHAT FLOTANTE */}
      {isOpen && (
        <div 
          className={`fixed bottom-20 z-50 w-[92vw] sm:w-[420px] h-[590px] max-h-[85vh] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 shadow-2xl flex flex-col overflow-hidden animate-slide-up backdrop-blur-xl ${
            position.x <= (typeof window !== 'undefined' ? window.innerWidth / 2 : 500)
              ? 'left-4 sm:left-6'
              : 'right-4 sm:right-6'
          }`}
        >
          
          {/* HEADER DEL CHAT */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/85 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ArthurAvatar size="sm" />
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">Arthur</h3>
                  <button
                    onClick={() => {
                      if (onOpenGeminiModal) onOpenGeminiModal();
                    }}
                    title={hasAi ? "Gemini 2.5 Flash Activo - Clic para configurar" : "Modo Local - Clic para conectar Gemini AI"}
                    className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full border transition-all flex items-center space-x-1 ${
                      hasAi 
                        ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-500/40 hover:bg-cyan-200' 
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border-slate-300 dark:border-slate-700 hover:text-cyan-600 dark:hover:text-cyan-300'
                    }`}
                  >
                    <Sparkles className={`w-3 h-3 ${hasAi ? 'text-cyan-600 dark:text-cyan-400 animate-pulse' : 'text-slate-500 dark:text-slate-400'}`} />
                    <span>{hasAi ? 'Gemini AI' : 'Conectar IA'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  <span>Inglés Técnico I · Gramática & Vocabulario</span>
                </p>
              </div>
            </div>

            {/* Controles del header */}
            <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
              
              {/* Botón de Parar Audio Global si está hablando */}
              {isSpeaking && (
                <button
                  onClick={handleStopSpeech}
                  title="Detener audio en reproducción"
                  className="px-2 py-1 rounded-lg bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-500/40 text-[11px] font-bold flex items-center space-x-1 animate-pulse mr-1 hover:bg-rose-200"
                >
                  <Square className="w-3 h-3 fill-current" />
                  <span>Detener</span>
                </button>
              )}

              <button
                onClick={handleClearChat}
                title="Reiniciar conversación"
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => {
                  soundManager.playClick();
                  handleStopSpeech();
                  setIsOpen(false);
                }}
                title="Cerrar chat"
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CUERPO DE MENSAJES */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-950/50">
            {messages.map((msg, idx) => {
              const isArthur = msg.sender === 'arthur';
              const isThisSpeaking = isSpeaking && speakingMessageIdx === idx;

              return (
                <div 
                  key={idx} 
                  className={`flex flex-col ${isArthur ? 'items-start' : 'items-end'} space-y-2`}
                >
                  <div className={`flex items-start space-x-2 max-w-[88%] ${isArthur ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}>
                    
                    {/* Avatar en mensaje de Arthur */}
                    {isArthur && (
                      <div className="flex-shrink-0 mt-1">
                        <ArthurAvatar size="sm" className="w-7 h-7" />
                      </div>
                    )}

                    {/* Burbuja de mensaje */}
                    <div className={`p-3.5 rounded-2xl shadow-sm border ${
                      isArthur 
                        ? `bg-white dark:bg-slate-900/95 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none ${isThisSpeaking ? 'ring-2 ring-brand-500/50' : ''}` 
                        : 'bg-brand-600 border-brand-500 text-white rounded-tr-none shadow-md shadow-brand-600/20'
                    }`}>
                      {renderFormattedText(msg.text)}

                      {/* Botón de pronunciación en voz alta con STOP */}
                      {isArthur && (
                        <div className="flex items-center justify-between pt-2 mt-1.5 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400">
                          <span>{msg.timestamp}</span>
                          
                          <button
                            onClick={() => handleSpeakText(msg.text, idx)}
                            title={isThisSpeaking ? "Detener pronunciación" : "Escuchar pronunciación en inglés"}
                            className={`flex items-center space-x-1.5 px-2 py-0.5 rounded-md transition-colors ${
                              isThisSpeaking 
                                ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30' 
                                : 'text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-cyanBrand-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            {isThisSpeaking ? (
                              <>
                                <Square className="w-3 h-3 fill-current text-rose-600 dark:text-rose-400" />
                                <span className="font-bold text-rose-700 dark:text-rose-300">Detener</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3 h-3 text-brand-600 dark:text-cyanBrand-400" />
                                <span>Escuchar</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Sugerencias de preguntas de Arthur */}
                  {isArthur && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pl-9 pt-1">
                      {msg.suggestedQuestions.map((q, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => handleSendMessage(q)}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white dark:bg-slate-950/80 hover:bg-brand-50 dark:hover:bg-brand-600/30 text-brand-700 dark:text-cyanBrand-300 hover:text-brand-900 dark:hover:text-white border border-slate-300 dark:border-slate-800 hover:border-brand-400 dark:hover:border-cyanBrand-500/50 shadow-sm transition-all text-left"
                        >
                          💬 {q}
                        </button>
                      ))}
                    </div>
                  )}

                </div>
              );
            })}

            {/* Animación de Arthur escribiendo */}
            {isTyping && (
              <div className="flex items-start space-x-2 animate-fade-in">
                <ArthurAvatar size="sm" className="w-7 h-7" />
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center space-x-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT FORM */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/90 flex items-center space-x-2"
          >
            <input
              id="input-arthur-message"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Traduce una palabra (ej: 'debug') o haz una pregunta..."
              className="flex-1 py-2.5 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 focus:border-brand-500 dark:focus:border-cyanBrand-400 focus:ring-1 focus:ring-brand-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm transition-all"
            />
            <button
              id="btn-arthur-send"
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className={`p-2.5 rounded-xl font-bold transition-all ${
                inputValue.trim() && !isTyping
                  ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-500/25'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
