import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  Minimize2, 
  Maximize2, 
  HelpCircle,
  Code,
  BookOpen
} from 'lucide-react';
import { ArthurAvatar } from './ArthurAvatar';
import { getArthurResponse } from '../utils/arthurBrain';
import { soundManager } from '../utils/soundEffects';

export function ArthurChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'arthur',
      text: "¡Hola! Soy **Arthur**, tu tutor virtual de inglés técnico. 🎩✨\n\nPuedes hacerme cualquier pregunta sobre las Clases 1 a 6: **Presente Simple, Presente Continuo, Pasado Simple, Verbos Irregulares** o las historias de **Margaret Hamilton y Google**. ¿Qué tema te gustaría repasar?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedQuestions: [
        "¿Cuándo uso Present Simple vs Continuous?",
        "¿Cuál es el pasado de 'find' y 'sell'?",
        "¿Quién fue Margaret Hamilton?",
        "Dame un ejercicio de práctica"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showGreetingBadge, setShowGreetingBadge] = useState(true);

  const messagesEndRef = useRef(null);

  // Auto scroll al último mensaje
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    soundManager.playClick();

    // Mensaje del usuario
    const userMsg = {
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simular respuesta inteligente de Arthur con pequeño delay natural
    setTimeout(() => {
      const response = getArthurResponse(text);
      soundManager.playClick();
      
      const arthurMsg = {
        sender: 'arthur',
        text: response.text,
        suggestedQuestions: response.suggestedQuestions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, arthurMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleClearChat = () => {
    soundManager.playClick();
    setMessages([
      {
        sender: 'arthur',
        text: "¡Conversación reiniciada! ¿En qué otra duda o ejercicio de inglés técnico te puedo colaborar? 🎩",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: [
          "Reglas de 3ra persona (-s, -es, -ies)",
          "Verbos de estado (Stative Verbs)",
          "¿Cómo se formula una pregunta con 'didn't'?",
          "Ponme a prueba con un ejercicio"
        ]
      }
    ]);
  };

  // Función de Text to Speech para pronunciar inglés en voz alta
  const handleSpeakText = (text) => {
    if ('speechSynthesis' in window) {
      soundManager.playClick();
      window.speechSynthesis.cancel();
      // Extraer solo fragmentos en inglés o texto limpio
      const cleanText = text.replace(/[*#`•]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'en-US';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Renderizar texto formateado simple
  const renderFormattedText = (rawText) => {
    const lines = rawText.split('\n');
    return (
      <div className="space-y-1.5 leading-relaxed text-xs sm:text-sm">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;

          // Procesar negrita (**texto**) y código (`código`)
          const parts = line.split(/(\*\*.*?\*\*|`.*?`|\*.*?\*)/g);

          return (
            <p key={idx}>
              {parts.map((part, pIdx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={pIdx} className="font-extrabold text-white">{part.slice(2, -2)}</strong>;
                }
                if (part.startsWith('`') && part.endsWith('`')) {
                  return <code key={pIdx} className="px-1.5 py-0.5 rounded bg-slate-900 text-cyan-300 font-mono text-[11px] border border-slate-700/60">{part.slice(1, -1)}</code>;
                }
                if (part.startsWith('*') && part.endsWith('*')) {
                  return <em key={pIdx} className="text-slate-300 italic">{part.slice(1, -1)}</em>;
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
      {/* BOTÓN FLOTANTE (TRIGGER) */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center space-x-3">
        
        {/* Tooltip / Greeting Badge cuando está cerrado */}
        {!isOpen && showGreetingBadge && (
          <div 
            onClick={() => {
              setIsOpen(true);
              setShowGreetingBadge(false);
            }}
            className="hidden sm:flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-slate-900/90 text-slate-200 border border-brand-500/40 shadow-2xl backdrop-blur-md cursor-pointer hover:border-brand-400 animate-slide-up"
          >
            <Sparkles className="w-4 h-4 text-cyanBrand-400 animate-pulse" />
            <span className="text-xs font-semibold">¿Dudas con inglés? ¡Pregúntale a **Arthur**!</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowGreetingBadge(false);
              }}
              className="text-slate-500 hover:text-slate-300 pl-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Floating Action Button */}
        <button
          id="btn-arthur-toggle"
          onClick={() => {
            soundManager.playClick();
            setIsOpen(!isOpen);
            if (!isOpen) setShowGreetingBadge(false);
          }}
          className="relative group focus:outline-none transition-transform duration-200 hover:scale-105 active:scale-95"
          title="Abrir tutor Arthur"
        >
          {/* Avatar Icon */}
          <ArthurAvatar size="md" className="ring-2 ring-brand-400/40 shadow-2xl" />
          
          {/* Online green indicator */}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 shadow"></span>
        </button>

      </div>

      {/* VENTANA DE CHAT FLOTANTE */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[410px] h-[580px] max-h-[85vh] rounded-3xl glass-card border border-slate-700/80 shadow-2xl flex flex-col overflow-hidden animate-slide-up backdrop-blur-xl">
          
          {/* HEADER DEL CHAT */}
          <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ArthurAvatar size="sm" />
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="font-extrabold text-sm text-slate-100">Arthur</h3>
                  <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                    Tutor IA
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                  <span>Inglés Técnico I · Clases 1 a 6</span>
                </p>
              </div>
            </div>

            {/* Controles del header */}
            <div className="flex items-center space-x-1 text-slate-400">
              <button
                onClick={handleClearChat}
                title="Reiniciar conversación"
                className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-slate-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setIsOpen(false);
                }}
                title="Cerrar chat"
                className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CUERPO DE MENSAJES */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-slate-200">
            {messages.map((msg, idx) => {
              const isArthur = msg.sender === 'arthur';

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
                    <div className={`p-3.5 rounded-2xl shadow-md border ${
                      isArthur 
                        ? 'bg-slate-900/90 border-slate-800 text-slate-100 rounded-tl-none' 
                        : 'bg-brand-600 border-brand-500 text-white rounded-tr-none'
                    }`}>
                      {renderFormattedText(msg.text)}

                      {/* Botón de pronunciación en voz alta */}
                      {isArthur && (
                        <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-800/80 text-[10px] text-slate-400">
                          <span>{msg.timestamp}</span>
                          <button
                            onClick={() => handleSpeakText(msg.text)}
                            title="Escuchar pronunciación en inglés"
                            className="flex items-center space-x-1 hover:text-cyanBrand-400 transition-colors"
                          >
                            <Volume2 className="w-3 h-3" />
                            <span>Escuchar</span>
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
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-950/80 hover:bg-brand-600/30 text-cyanBrand-300 hover:text-white border border-slate-800 hover:border-cyanBrand-500/50 transition-all text-left"
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
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-400 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]"></span>
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
            className="p-3 border-t border-slate-800 bg-slate-950/90 flex items-center space-x-2"
          >
            <input
              id="input-arthur-message"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Pregúntale a Arthur sobre gramática o verbos..."
              className="flex-1 py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyanBrand-400 focus:ring-1 focus:ring-cyanBrand-400 text-slate-100 placeholder-slate-500 text-xs sm:text-sm transition-all"
            />
            <button
              id="btn-arthur-send"
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className={`p-2.5 rounded-xl font-bold transition-all ${
                inputValue.trim() && !isTyping
                  ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-500/25'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
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
