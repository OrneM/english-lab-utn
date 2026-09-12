import React from 'react';

export function ArthurAvatar({ size = "md", className = "" }) {
  // Dimensiones según el tamaño
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  }[size] || "w-11 h-11";

  return (
    <div className={`relative rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-cyanBrand-500 p-0.5 shadow-lg shadow-brand-500/25 flex items-center justify-center ${sizeClasses} ${className}`}>
      {/* Glow subtle background */}
      <div className="w-full h-full rounded-[14px] bg-slate-950/80 flex items-center justify-center overflow-hidden">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full p-1.5" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="arthurLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="100%" stop-color="#22d3ee" />
            </linearGradient>
          </defs>

          {/* HAT CROWN */}
          <rect 
            x="34" 
            y="17" 
            width="32" 
            height="21" 
            rx="5" 
            stroke="url(#arthurLineGrad)" 
            strokeWidth="4" 
            fill="none"
          />
          
          {/* HAT BAND LINE */}
          <line 
            x1="34" 
            y1="31" 
            x2="66" 
            y2="31" 
            stroke="url(#arthurLineGrad)" 
            strokeWidth="3.5"
          />
          
          {/* HAT BAND SQUARES / DOTS */}
          <rect x="54" y="33" width="2.5" height="2.5" rx="0.5" fill="#22d3ee" />
          <rect x="58.5" y="33" width="2.5" height="2.5" rx="0.5" fill="#22d3ee" />
          <rect x="63" y="33" width="2.5" height="2.5" rx="0.5" fill="#22d3ee" />

          {/* HAT BRIM */}
          <rect 
            x="20" 
            y="38" 
            width="60" 
            height="7.5" 
            rx="3.75" 
            stroke="url(#arthurLineGrad)" 
            strokeWidth="4" 
            fill="#0f172a"
          />

          {/* MONOCLE (LEFT EYE) */}
          {/* Circular Glass */}
          <circle 
            cx="39" 
            cy="59" 
            r="8" 
            stroke="url(#arthurLineGrad)" 
            strokeWidth="4" 
            fill="none"
          />
          {/* Monocle Cord / Arm */}
          <path 
            d="M31 60 H24 V79" 
            stroke="url(#arthurLineGrad)" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none"
          />

          {/* WINKING RIGHT EYE (< shape) */}
          <path 
            d="M66 54 L53 60 L66 66" 
            stroke="url(#arthurLineGrad)" 
            strokeWidth="4.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none"
          />

          {/* MUSTACHE */}
          {/* Left Wing */}
          <path 
            d="M49 71 Q42 77 34 77 Q27 77 28 80 Q35 83 49 71 Z" 
            stroke="url(#arthurLineGrad)" 
            strokeWidth="3.5" 
            strokeLinejoin="round" 
            fill="#22d3ee"
            fillOpacity="0.2"
          />
          {/* Right Wing */}
          <path 
            d="M51 71 Q58 77 66 77 Q73 77 72 80 Q65 83 51 71 Z" 
            stroke="url(#arthurLineGrad)" 
            strokeWidth="3.5" 
            strokeLinejoin="round" 
            fill="#22d3ee"
            fillOpacity="0.2"
          />
        </svg>
      </div>
    </div>
  );
}
