'use client';

import { useState, useEffect } from 'react';
import Btn from '@/components/shared/Btn';

const LINES = [
  { text: '> SYSTEM ONLINE', type: 'mono', delay: 300 },
  { text: '> LOADING SCENARIO DATABASE...', type: 'mono', delay: 800 },
  { text: '> 10 FACTIONS DETECTED', type: 'mono', delay: 400 },
  { text: '> 9 TRIGGER EVENTS LOADED', type: 'mono', delay: 400 },
  { text: '> 14 SOCIETAL GROUPS MAPPED', type: 'mono', delay: 400 },
  { text: '> TIMELINE: MARCH 2026 → JANUARY 2028', type: 'mono', delay: 600 },
  { text: '---', type: 'divider', delay: 400 },
  { text: 'The world is mid-transformation.', type: 'heading', delay: 800 },
  { text: '---', type: 'divider', delay: 300 },
  { text: 'Artificial intelligence has moved from science fiction to the infrastructure of daily life in less than four years. The productivity gains are real. They are flowing almost entirely to the people who own the technology.', type: 'body', delay: 600 },
  { text: 'Ten factions are fighting to shape what comes next. Tech billionaires, labor unions, European regulators, military officials, artists — each with their own vision for the future.', type: 'body', delay: 600 },
  { text: 'Nine events will determine what kind of world exists on January 1, 2028. You will predict each one. The simulation will build the world your predictions produce.', type: 'accent', delay: 600 },
  { text: '---', type: 'divider', delay: 300 },
  { text: '> AWAITING INPUT...', type: 'mono', delay: 500 },
];

interface IntroScreenProps {
  onNext: () => void;
}

export default function IntroScreen({ onNext }: IntroScreenProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [typingIdx, setTypingIdx] = useState(0);
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
      const speed = Math.random() * 20 + 15; // 15-35ms per char
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

  // Skip animation on click
  function skipToEnd() {
    setVisibleLines(LINES.length);
    setShowButton(true);
  }

  return (
    <div
      className="min-h-screen bg-bg grid-bg flex flex-col items-center justify-center px-5 py-12"
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
          <div className="min-h-[380px] space-y-3">
            {LINES.slice(0, visibleLines + 1).map((line, i) => {
              const isTyping = i === visibleLines && line.type === 'mono' && typedChars < line.text.length;
              const displayText = isTyping ? line.text.slice(0, typedChars) : line.text;

              if (i > visibleLines) return null;

              if (line.type === 'divider') {
                return (
                  <div
                    key={i}
                    className="h-px my-4"
                    style={{ background: 'linear-gradient(90deg, transparent, #C9A84C33, transparent)' }}
                  />
                );
              }

              if (line.type === 'heading') {
                return (
                  <h1
                    key={i}
                    className="font-serif text-4xl font-normal text-text text-center leading-[1.3] py-4 gold-glow"
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

              if (line.type === 'accent') {
                return (
                  <p
                    key={i}
                    className="font-serif text-[15px] leading-[1.85] text-text animate-[fadeIn_0.5s_ease_forwards]"
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
