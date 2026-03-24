'use client';

import { useState, useEffect } from 'react';
import Btn from '@/components/shared/Btn';

const LINES = [
  { text: '> SYSTEM ONLINE', type: 'mono', delay: 300 },
  { text: '> LOADING SCENARIO DATABASE...', type: 'mono', delay: 800 },
  { text: '> 10 FACTIONS DETECTED', type: 'mono', delay: 400 },
  { text: '> 9 TRIGGER EVENTS LOADED', type: 'mono', delay: 400 },
  { text: '> 14 SOCIETAL GROUPS MAPPED', type: 'mono', delay: 400 },
  { text: '> TIMELINE: MARCH 2026 → YOU CHOOSE', type: 'mono', delay: 600 },
  { text: '---', type: 'divider', delay: 400 },
  { text: 'The world is mid-transformation.', type: 'heading', delay: 800 },
  { text: '---', type: 'divider', delay: 300 },
  { text: 'Artificial intelligence has moved from science fiction to the infrastructure of daily life in less than four years. The productivity gains are real. They are flowing almost entirely to the people who own the technology.', type: 'body', delay: 600 },
  { text: 'Nine events will determine the future. You will predict each one. The simulation will build the world your predictions produce.', type: 'body', delay: 600 },
  { text: '---', type: 'divider', delay: 300 },
  { text: '> THREE POSSIBLE FUTURES:', type: 'mono', delay: 500 },
  { text: 'scenarios', type: 'scenarios', delay: 800 },
  { text: 'Your predictions will shift these probabilities. The dominant scenario shapes the world you build.', type: 'accent', delay: 600 },
  { text: '---', type: 'divider', delay: 300 },
  { text: '> AWAITING INPUT...', type: 'mono', delay: 500 },
];

const SCENARIOS = [
  {
    icon: '🚀',
    name: 'THE GOLD RUSH',
    prob: 35,
    color: '#FBBF24',
    desc: 'AI deploys fast. No guardrails. Capital wins.',
  },
  {
    icon: '🔥',
    name: 'THE BACKLASH',
    prob: 25,
    color: '#F43F5E',
    desc: 'Job losses trigger revolt. Workers get protection.',
  },
  {
    icon: '⚖️',
    name: 'THE STALEMATE',
    prob: 40,
    color: '#14B8A6',
    desc: 'Washington gridlocks. EU regulates. Patchwork rules.',
  },
];

interface IntroScreenProps {
  onNext: () => void;
}

export default function IntroScreen({ onNext }: IntroScreenProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (visibleLines >= LINES.length) {
      setTimeout(() => setShowButton(true), 400);
      return;
    }

    const line = LINES[visibleLines];

    // For mono lines, type character by character
    if (line.type === 'mono' && typedChars < line.text.length) {
      const speed = Math.random() * 20 + 15;
      const timer = setTimeout(() => setTypedChars((c) => c + 1), speed);
      return () => clearTimeout(timer);
    }

    // Line is complete, move to next after delay
    const timer = setTimeout(() => {
      setVisibleLines((v) => v + 1);
      setTypedChars(0);
    }, line.type === 'mono' ? 200 : line.delay);

    return () => clearTimeout(timer);
  }, [visibleLines, typedChars]);

  function skipToEnd() {
    setVisibleLines(LINES.length);
    setShowButton(true);
  }

  return (
    <div
      className="min-h-screen bg-vibrant grid-bg flex flex-col items-center justify-center px-5 py-12"
      onClick={visibleLines < LINES.length ? skipToEnd : undefined}
    >
      <div className="w-full max-w-[700px]">
        <div className="cyber-frame border-flow scanlines px-8 py-8 md:px-10 md:py-10">
          {/* Terminal chrome */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold/10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_6px_rgba(255,95,86,0.4)]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_6px_rgba(255,189,46,0.4)]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_6px_rgba(39,201,63,0.4)]" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.15em] text-gold/30">
              AI_FACTIONS://v3.0/SIMULATION_ENGINE
            </span>
          </div>

          {/* Typewriter content */}
          <div className="min-h-[420px] space-y-3">
            {LINES.slice(0, visibleLines + 1).map((line, i) => {
              const isTyping = i === visibleLines && line.type === 'mono' && typedChars < line.text.length;
              const displayText = isTyping ? line.text.slice(0, typedChars) : line.text;

              if (i > visibleLines) return null;

              if (line.type === 'divider') {
                return (
                  <div
                    key={i}
                    className="divider-animated my-4"
                  />
                );
              }

              if (line.type === 'heading') {
                return (
                  <h1
                    key={i}
                    className="font-serif text-4xl font-normal text-center leading-[1.3] py-4 text-shimmer"
                  >
                    {displayText}
                  </h1>
                );
              }

              if (line.type === 'mono') {
                return (
                  <p key={i} className="font-mono text-[11px] tracking-[0.08em] text-gold/50 leading-[1.6]">
                    {displayText}
                    {isTyping && <span className="cursor-blink" />}
                  </p>
                );
              }

              if (line.type === 'scenarios') {
                return (
                  <div key={i} className="flex gap-2 my-3 animate-[fadeIn_0.5s_ease_forwards]">
                    {SCENARIOS.map((s) => (
                      <div
                        key={s.name}
                        className="flex-1 rounded-xl px-3 py-3 text-center"
                        style={{
                          background: `${s.color}0A`,
                          border: `1px solid ${s.color}30`,
                        }}
                      >
                        <div className="text-lg mb-1">{s.icon}</div>
                        <div className="font-mono font-bold text-lg mb-0.5" style={{ color: s.color }}>
                          {s.prob}%
                        </div>
                        <div className="font-mono text-[8px] tracking-[0.1em] font-bold mb-1.5" style={{ color: s.color }}>
                          {s.name}
                        </div>
                        <p className="font-serif text-[10px] text-muted leading-[1.4] m-0">
                          {s.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                );
              }

              if (line.type === 'accent') {
                return (
                  <p
                    key={i}
                    className="font-serif text-[14px] leading-[1.85] text-text animate-[fadeIn_0.5s_ease_forwards] text-center"
                  >
                    {displayText}
                  </p>
                );
              }

              return (
                <p
                  key={i}
                  className="font-serif text-[15px] leading-[1.85] text-body animate-[fadeIn_0.5s_ease_forwards]"
                >
                  {displayText}
                </p>
              );
            })}
          </div>

          {/* Button */}
          {showButton && (
            <div className="text-center pt-4 animate-[fadeIn_0.5s_ease_forwards]">
              <Btn label="▶ INITIALIZE SIMULATION" onClick={onNext} />
            </div>
          )}

          {/* Skip hint */}
          {!showButton && visibleLines < LINES.length && (
            <p className="font-mono text-[9px] text-muted/30 text-center mt-4">
              click anywhere to skip
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
